#!/usr/bin/env node
/**
 * InterFuzz Batch Test Case Generator - TypeScript Implementation
 * 
 * This script automates the generation of multiple test cases using InterFuzz.jar
 * by calling it multiple times with different seed files and packaging the results.
 */

import { spawn } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getScriptDir(): string {
  return __dirname
}

function getProjectRoot(): string {
  return path.resolve(__dirname, '..', '..')
}

// 使用内置JDK（相对于项目根目录）
const JAVA_BIN = path.join(getProjectRoot(), 'backend', 'temurin-17.0.7', 'bin', 'java')
const JDK_PATH = path.join(getProjectRoot(), 'backend', 'temurin-17.0.7', 'bin')

interface LogFile {
  write: (message: string) => void
  close: () => void
}

let logFile: LogFile | null = null

function log(message: string, toConsole = false): void {
  if (logFile) {
    logFile.write(message + '\n')
  }
  if (toConsole) {
    console.log(message)
  }
}

function getSeedFiles(seedsDir: string): string[] {
  const seedFiles: string[] = []
  
  if (!fs.existsSync(seedsDir)) {
    log(`Error: Seeds directory not found: ${seedsDir}`)
    return []
  }
  
  const files = fs.readdirSync(seedsDir)
  files
    .filter(file => file.startsWith('Test') && file.endsWith('.java'))
    .sort()
    .forEach(file => {
      const seedName = path.basename(file, '.java')
      seedFiles.push(seedName)
    })
  
  return seedFiles
}

function runInterfuzz(
  jarPath: string,
  seedsDir: string,
  targetSeed: string,
  genIters: number
): Promise<{ success: boolean; output: string; hasError: boolean }> {
  return new Promise((resolve) => {
    const cmd = [
      '-jar',
      jarPath,
      '--seeds_path',
      seedsDir,
      '--target_seed',
      targetSeed,
      '--max_iter',
      String(genIters),
      '--jdk',
      JDK_PATH
    ]
    
    const workingDir = path.join(getProjectRoot(), 'backend')
    const cmdStr = `${JAVA_BIN} ${cmd.join(' ')}`
    log(`\n${'='.repeat(60)}`)
    log(`Running: ${cmdStr}`)
    log(`Working directory: ${workingDir}`)
    log(`${'='.repeat(60)}\n`)
    
    console.log(`\n[CMD] Executing: ${cmdStr}`)
    console.log(`[CMD] Working directory: ${workingDir}`)
    
    const java = spawn(JAVA_BIN, cmd, {
      cwd: workingDir,
      env: process.env
    })
    
    let stdout = ''
    let stderr = ''
    
    java.stdout.on('data', (data) => {
      const chunk = data.toString()
      stdout += chunk
      log(chunk)
    })
    
    java.stderr.on('data', (data) => {
      const chunk = data.toString()
      stderr += chunk
      log(chunk)
    })
    
    java.on('close', (code) => {
      const combinedOutput = stdout + stderr
      const outputLower = combinedOutput.toLowerCase()
      const hasError = outputLower.includes('fail') || outputLower.includes('error')
      
      if (code !== 0) {
        log(`Error: InterFuzz.jar exited with code ${code}`)
        resolve({ success: false, output: combinedOutput, hasError: true })
        return
      }
      
      if (hasError) {
        log(`Warning: Output contains 'fail' or 'error' keywords`)
      }
      
      resolve({ success: true, output: combinedOutput, hasError })
    })
  })
}

async function runInterfuzzWithRetry(
  jarPath: string,
  seedsDir: string,
  targetSeed: string,
  genIters: number,
  maxRetries = 3
): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    if (attempt > 1) {
      log(`\n${'!'.repeat(60)}`)
      log(`Retry attempt ${attempt}/${maxRetries}`)
      log(`${'!'.repeat(60)}\n`)
    }
    
    const startTime = Date.now()
    const { success, hasError } = await runInterfuzz(jarPath, seedsDir, targetSeed, genIters)
    const elapsedTime = (Date.now() - startTime) / 1000
    
    if (success && !hasError) {
      if (attempt > 1) {
        log(`✓ Succeeded on retry attempt ${attempt}`)
      }
      return true
    }
    
    if (attempt === maxRetries) {
      log(`\n✗ Failed after ${maxRetries} attempts`)
      return false
    }
    
    log(`\n⚠ Generation failed or has errors, will retry...`)
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  return false
}

function findLatestMutantFolder(mutantsDir: string, seedName: string): string | null {
  if (!fs.existsSync(mutantsDir)) {
    return null
  }
  
  const pattern = `${seedName}_`
  const matchingFolders = fs.readdirSync(mutantsDir)
    .filter(name => name.startsWith(pattern))
    .map(name => path.join(mutantsDir, name))
    .filter(p => fs.statSync(p).isDirectory())
  
  if (matchingFolders.length === 0) {
    return null
  }
  
  // Sort by creation time and return the latest
  matchingFolders.sort((a, b) => {
    return fs.statSync(b).ctimeMs - fs.statSync(a).ctimeMs
  })
  
  return matchingFolders[0]
}

function copyTestCase(
  mutantFolder: string,
  outputFolder: string,
  caseIndex: number,
  genIters: number
): boolean {
  // The final iteration folder is named as (gen_iters - 1)
  let finalIterFolder = path.join(mutantFolder, String(genIters - 1))
  
  if (!fs.existsSync(finalIterFolder)) {
    log(`Warning: Final iteration folder not found: ${finalIterFolder}`)
    // Try to find the highest numbered folder
    const iterFolders = fs.readdirSync(mutantFolder)
      .filter(name => /^\d+$/.test(name))
      .map(name => path.join(mutantFolder, name))
      .filter(p => fs.statSync(p).isDirectory())
    
    if (iterFolders.length > 0) {
      iterFolders.sort((a, b) => {
        return parseInt(path.basename(b)) - parseInt(path.basename(a))
      })
      finalIterFolder = iterFolders[0]
      log(`Using folder: ${finalIterFolder}`)
    } else {
      return false
    }
  }
  
  // Create destination folder
  const destFolder = path.join(outputFolder, `test_case_${String(caseIndex).padStart(4, '0')}`)
  fs.mkdirSync(destFolder, { recursive: true })
  
  try {
    // Copy all contents from final iteration folder
    const items = fs.readdirSync(finalIterFolder)
    for (const item of items) {
      const srcPath = path.join(finalIterFolder, item)
      const destPath = path.join(destFolder, item)
      
      if (fs.statSync(srcPath).isDirectory()) {
        copyRecursive(srcPath, destPath)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
    
    log(`✓ Copied test case ${caseIndex} from ${path.basename(finalIterFolder)}`)
    return true
  } catch (err) {
    log(`Error copying test case: ${err}`)
    return false
  }
}

function copyRecursive(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true })
  const items = fs.readdirSync(src)
  
  for (const item of items) {
    const srcPath = path.join(src, item)
    const destPath = path.join(dest, item)
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function cleanupMutantsFolder(mutantsDir: string): void {
  if (fs.existsSync(mutantsDir)) {
    try {
      fs.rmSync(mutantsDir, { recursive: true })
      fs.mkdirSync(mutantsDir, { recursive: true })
      log(`✓ Cleaned up mutants folder`)
    } catch (err) {
      log(`Warning: Could not clean up mutants folder: ${err}`)
    }
  }
}

interface Options {
  genIters: number
  seedsSize: number
  jarPath?: string
  seedsDir?: string
  outputName?: string
  noCleanup?: boolean
  maxRetries?: number
}

async function main(): Promise<void> {
  // Parse command line arguments
  const args = process.argv.slice(2)
  const options: Partial<Options> = {}
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if ((arg === '-i' || arg === '--gen_iters') && i + 1 < args.length) {
      options.genIters = parseInt(args[++i])
    } else if ((arg === '-s' || arg === '--seeds_size') && i + 1 < args.length) {
      options.seedsSize = parseInt(args[++i])
    } else if ((arg === '-j' || arg === '--jar_path') && i + 1 < args.length) {
      options.jarPath = args[++i]
    } else if ((arg === '-d' || arg === '--seeds_dir') && i + 1 < args.length) {
      options.seedsDir = args[++i]
    } else if ((arg === '-o' || arg === '--output_name') && i + 1 < args.length) {
      options.outputName = args[++i]
    } else if (arg === '--no-cleanup') {
      options.noCleanup = true
    } else if ((arg === '-r' || arg === '--max-retries') && i + 1 < args.length) {
      options.maxRetries = parseInt(args[++i])
    }
  }
  
  if (!options.genIters || !options.seedsSize) {
    console.error('Error: --gen_iters (-i) and --seeds_size (-s) are required')
    console.error('Usage: node batch_gen_seed.js -i <iterations> -s <count>')
    process.exit(1)
  }
  
  // Setup paths
  const scriptDir = getScriptDir()
  const projectRoot = getProjectRoot()
  
  const jarPath = options.jarPath || path.join(scriptDir, 'InterFuzz.jar')
  const seedsDir = options.seedsDir || path.join(projectRoot, 'backend', 'jf-seeds', 'tests')
  const mutantsDir = path.join(projectRoot, 'backend', 'mutants')
  const maxRetries = options.maxRetries || 3
  
  // Create output folder
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').replace('T', '_')
  const outputName = options.outputName || `generated_tests_${timestamp}`
  const outputFolder = path.join(scriptDir, outputName)
  fs.mkdirSync(outputFolder, { recursive: true })
  
  // Create log file
  const logPath = path.join(outputFolder, 'generation.log')
  const logStream = fs.createWriteStream(logPath, { flags: 'w' })
  logFile = {
    write: (message: string) => logStream.write(message),
    close: () => logStream.end()
  }
  
  log(`Batch Test Case Generation - ${timestamp}`)
  log('='.repeat(60))
  
  // Validate paths
  if (!fs.existsSync(jarPath)) {
    const errorMsg = `Error: InterFuzz.jar not found at: ${jarPath}`
    log(errorMsg, true)
    console.error(`[ERROR] ${errorMsg}`)
    logFile.close()
    process.exit(1)
  }
  
  if (!fs.existsSync(seedsDir)) {
    const errorMsg = `Error: Seeds directory not found at: ${seedsDir}`
    log(errorMsg, true)
    console.error(`[ERROR] ${errorMsg}`)
    logFile.close()
    process.exit(1)
  }
  
  // Note: Skipping Java binary check since we use system Java from PATH
  
  // Get available seed files
  const seedFiles = getSeedFiles(seedsDir)
  
  if (seedFiles.length === 0) {
    const errorMsg = `Error: No seed files found in ${seedsDir}`
    log(errorMsg, true)
    console.error(`[ERROR] ${errorMsg}`)
    logFile.close()
    process.exit(1)
  }
  
  // Print output directory for parsing
  console.log(`Output directory: ${outputName}`)
  
  log(`Found ${seedFiles.length} seed files: ${seedFiles.slice(0, 10).join(', ')}${seedFiles.length > 10 ? '...' : ''}`)
  log(`Iterations per seed: ${options.genIters}`)
  log(`Number of test cases: ${options.seedsSize}`)
  log(`JAR path: ${jarPath}`)
  log(`Seeds directory: ${seedsDir}`)
  log(`Output folder: ${outputFolder}`)
  log(`Log file: ${logPath}`)
  log('='.repeat(60) + '\n')
  
  console.log('\n' + '='.repeat(60))
  console.log('Batch Test Case Generation')
  console.log('='.repeat(60))
  console.log(`Generating ${options.seedsSize} test cases with ${options.genIters} iterations each`)
  console.log(`JAR path: ${jarPath}`)
  console.log(`Seeds directory: ${seedsDir}`)
  console.log(`Output folder: ${outputFolder}`)
  console.log(`Log file: ${logPath}`)
  console.log('='.repeat(60) + '\n')
  
  let successfulCases = 0
  let failedCases = 0
  
  // Generate test cases
  for (let i = 0; i < options.seedsSize; i++) {
    const seedIndex = i % seedFiles.length
    const targetSeed = seedFiles[seedIndex]
    
    log(`\n${'*'.repeat(60)}`)
    log(`Generating test case ${i + 1}/${options.seedsSize}`)
    log(`Target seed: ${targetSeed}`)
    log(`${'*'.repeat(60)}`)
    
    console.log(`\n${'*'.repeat(60)}`)
    console.log(`[INFO] Generating test case ${i + 1}/${options.seedsSize}`)
    console.log(`[INFO] Target seed: ${targetSeed}`)
    console.log(`${'*'.repeat(60)}`)
    
    const success = await runInterfuzzWithRetry(
      jarPath,
      seedsDir,
      targetSeed,
      options.genIters,
      maxRetries
    )
    
    if (!success) {
      log(`✗ Failed to generate test case ${i + 1}`)
      console.log(`[ERROR] ✗ Failed to generate test case ${i + 1}`)
      failedCases++
      continue
    }
    
    log(`✓ Generation completed`)
    console.log(`[SUCCESS] ✓ Generation completed`)
    
    // Find the generated mutant folder
    const mutantFolder = findLatestMutantFolder(mutantsDir, targetSeed)
    
    if (!mutantFolder) {
      log(`✗ Could not find generated mutant folder for ${targetSeed}`)
      failedCases++
      continue
    }
    
    log(`Found mutant folder: ${path.basename(mutantFolder)}`)
    
    // Copy test case to output folder
    if (copyTestCase(mutantFolder, outputFolder, i + 1, options.genIters)) {
      successfulCases++
    } else {
      failedCases++
    }
  }
  
  // Summary
  log(`\n${'='.repeat(60)}`)
  log(`Generation Summary`)
  log(`${'='.repeat(60)}`)
  log(`Successful: ${successfulCases}/${options.seedsSize}`)
  log(`Failed: ${failedCases}/${options.seedsSize}`)
  log(`${'='.repeat(60)}\n`)
  
  console.log(`\n${'='.repeat(60)}`)
  console.log(`Generation Summary`)
  console.log(`${'='.repeat(60)}`)
  console.log(`Successful: ${successfulCases}/${options.seedsSize}`)
  console.log(`Failed: ${failedCases}/${options.seedsSize}`)
  console.log(`${'='.repeat(60)}\n`)
  
  if (successfulCases === 0) {
    const errorMsg = 'No test cases were generated successfully.'
    log(errorMsg, true)
    logFile.close()
    process.exit(1)
  }
  
  log(`✓ All done!`)
  log(`Output folder: ${outputFolder}`)
  log(`Log file: ${logPath}`)
  
  console.log(`✓ All done!`)
  console.log(`Output folder: ${outputFolder}`)
  console.log(`Log file: ${logPath}`)
  
  // Cleanup mutants folder if requested
  if (!options.noCleanup) {
    cleanupMutantsFolder(mutantsDir)
  }
  
  logFile.close()
}

// Run main function
main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
