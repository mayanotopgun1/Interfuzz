import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
// Shared handler for seed generation API
async function handleGenerateSeeds(req, res) {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end('Method Not Allowed');
        return;
    }
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', async () => {
        try {
            const payload = body ? JSON.parse(body) : {};
            const iterations = typeof payload.iterations === 'number' ? payload.iterations : (payload.iterations ? Number(payload.iterations) : 100);
            const count = typeof payload.count === 'number' ? payload.count : (payload.count ? Number(payload.count) : 3);
            const stream = payload.stream === true;
            console.log(`[Seed Generator] Generating ${count} seeds with ${iterations} iterations, stream=${stream}`);
            // 如果是流式请求，设置SSE头
            if (stream) {
                res.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive'
                });
                res.write('data: {"type":"started"}\n\n');
            }
            // 使用相对路径,从当前项目根目录开始
            const projectRoot = path.resolve(__dirname);
            const tsxPath = path.join(projectRoot, 'node_modules', '.bin', 'tsx');
            const scriptPath = path.join(projectRoot, 'backend', 'batch_gen_seed', 'batch_gen_seed.ts');
            console.log(`[Seed Generator] Working directory: ${projectRoot}`);
            console.log(`[Seed Generator] tsx path: ${tsxPath}`);
            console.log(`[Seed Generator] script path: ${scriptPath}`);
            console.log(`[Seed Generator] Running: ${tsxPath} ${scriptPath} -i ${iterations} -s ${count} --no-cleanup`);
            // 使用相对路径运行 tsx
            const tsNode = spawn(tsxPath, [scriptPath, '-i', String(iterations), '-s', String(count), '--no-cleanup'], {
                cwd: projectRoot,
                env: process.env
            });
            let stdout = '';
            let stderr = '';
            let currentCase = 0;
            tsNode.stdout.on('data', (d) => {
                const chunk = d.toString();
                stdout += chunk;
                console.log(`[TypeScript stdout] ${chunk}`);
                // 如果是流式请求，解析进度并发送
                if (stream) {
                    // 解析 "Generating test case X/Y" 格式
                    const progressMatch = chunk.match(/Generating test case (\d+)\/(\d+)/);
                    if (progressMatch) {
                        currentCase = parseInt(progressMatch[1]);
                        const total = parseInt(progressMatch[2]);
                        const progress = Math.floor((currentCase / total) * 100);
                        res.write(`data: ${JSON.stringify({
                            type: 'progress',
                            current: currentCase,
                            total: total,
                            progress: progress,
                            message: `正在生成测试用例 ${currentCase}/${total}`
                        })}\n\n`);
                    }
                    // 解析成功/失败信息
                    if (chunk.includes('✓ Generation completed')) {
                        res.write(`data: ${JSON.stringify({
                            type: 'case_success',
                            case: currentCase,
                            message: `测试用例 ${currentCase} 生成成功`
                        })}\n\n`);
                    }
                    if (chunk.includes('✗ Failed to generate')) {
                        res.write(`data: ${JSON.stringify({
                            type: 'case_error',
                            case: currentCase,
                            message: `测试用例 ${currentCase} 生成失败`
                        })}\n\n`);
                    }
                }
            });
            tsNode.stderr.on('data', (d) => {
                stderr += d.toString();
                console.error(`[TypeScript stderr] ${d.toString()}`);
            });
            tsNode.on('close', async (code) => {
                if (code !== 0) {
                    console.error(`[Seed Generator] Script exited with code ${code}`);
                    console.error(`[Seed Generator] stderr: ${stderr}`);
                    console.error(`[Seed Generator] stdout: ${stdout}`);
                    if (stream) {
                        res.write(`data: ${JSON.stringify({
                            type: 'error',
                            error: 'Script failed',
                            details: `Exit code: ${code}`,
                            stderr: stderr
                        })}\n\n`);
                        res.end();
                    }
                    else {
                        res.statusCode = 500;
                        res.setHeader('content-type', 'application/json');
                        res.end(JSON.stringify({
                            success: false,
                            error: 'Script failed',
                            details: `Exit code: ${code}`,
                            stderr: stderr,
                            stdout: stdout,
                            code
                        }));
                    }
                    return;
                }
                try {
                    let outputDir = null;
                    const projectRoot = path.resolve(__dirname);
                    const workingDir = path.join(projectRoot, 'backend', 'batch_gen_seed');
                    const m = stdout.match(/Output directory:\s*(.+)/);
                    if (m) {
                        outputDir = path.join(workingDir, m[1].trim());
                    }
                    else {
                        const files = await fs.promises.readdir(workingDir, { withFileTypes: true });
                        const dirs = files.filter((f) => f.isDirectory() && f.name.startsWith('generated_tests_')).map((d) => d.name);
                        if (dirs.length > 0) {
                            dirs.sort((a, b) => {
                                const sa = fs.statSync(path.join(workingDir, a)).mtime.getTime();
                                const sb = fs.statSync(path.join(workingDir, b)).mtime.getTime();
                                return sb - sa; // Sort descending (newest first)
                            });
                            outputDir = path.join(workingDir, dirs[0]);
                        }
                    }
                    if (!outputDir)
                        throw new Error('Could not determine output directory');
                    console.log(`[Seed Generator] Reading test cases from: ${outputDir}`);
                    // 读取所有测试用例文件夹
                    const all = await fs.promises.readdir(outputDir);
                    const testCaseDirs = all.filter((f) => {
                        const fullPath = path.join(outputDir, f);
                        return fs.statSync(fullPath).isDirectory() && f.startsWith('test_case_');
                    });
                    // 为每个测试用例读取所有文件
                    const testCases = [];
                    for (const tcDir of testCaseDirs) {
                        const tcPath = path.join(outputDir, tcDir);
                        const files = [];
                        // 递归读取测试用例文件夹中的所有文件
                        async function readDirRecursive(dir, relativePath = '') {
                            const items = await fs.promises.readdir(dir, { withFileTypes: true });
                            for (const item of items) {
                                const itemPath = path.join(dir, item.name);
                                const itemRelativePath = relativePath ? path.join(relativePath, item.name) : item.name;
                                if (item.isDirectory()) {
                                    await readDirRecursive(itemPath, itemRelativePath);
                                }
                                else if (item.isFile()) {
                                    const content = await fs.promises.readFile(itemPath, 'utf8');
                                    files.push({
                                        name: item.name,
                                        content,
                                        path: itemRelativePath
                                    });
                                }
                            }
                        }
                        await readDirRecursive(tcPath);
                        testCases.push({ name: tcDir, files });
                    }
                    console.log(`[Seed Generator] Successfully generated ${testCases.length} test cases`);
                    if (stream) {
                        res.write(`data: ${JSON.stringify({
                            type: 'complete',
                            success: true,
                            testCases,
                            outputDir,
                            message: `成功生成 ${testCases.length} 个测试用例`
                        })}\n\n`);
                        res.end();
                    }
                    else {
                        res.setHeader('content-type', 'application/json');
                        res.end(JSON.stringify({ success: true, testCases, outputDir }));
                    }
                }
                catch (err) {
                    console.error(`[Seed Generator] Error processing seeds: ${err?.message}`);
                    console.error(`[Seed Generator] Stack: ${err?.stack}`);
                    if (stream) {
                        res.write(`data: ${JSON.stringify({
                            type: 'error',
                            error: err?.message || String(err),
                            details: err?.stack
                        })}\n\n`);
                        res.end();
                    }
                    else {
                        res.statusCode = 500;
                        res.setHeader('content-type', 'application/json');
                        res.end(JSON.stringify({
                            success: false,
                            error: err?.message || String(err),
                            details: err?.stack || 'No stack trace available',
                            stderr: stderr,
                            stdout: stdout
                        }));
                    }
                }
            });
        }
        catch (err) {
            console.error(`[Seed Generator] Request error: ${err?.message}`);
            console.error(`[Seed Generator] Stack: ${err?.stack}`);
            res.statusCode = 500;
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({
                success: false,
                error: err?.message || 'Invalid request',
                details: err?.stack || String(err)
            }));
        }
    });
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // Middleware plugin: handle seed generation API for both dev and preview modes
        {
            name: 'seed-generator-api',
            configureServer(server) {
                server.middlewares.use('/api/generate-seeds', handleGenerateSeeds);
            },
            configurePreviewServer(server) {
                server.middlewares.use('/api/generate-seeds', handleGenerateSeeds);
            }
        }
    ]
});
