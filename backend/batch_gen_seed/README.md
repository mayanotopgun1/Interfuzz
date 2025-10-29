# InterFuzz 批量测试用例生成器# InterFuzz 批量测试用例生成器# InterFuzz 批量测试用例生成器



批量调用 InterFuzz.jar 生成多个测试用例，支持失败重试和进度显示。



## 环境要求批量调用 InterFuzz.jar 生成多个测试用例，支持失败重试和进度显示。批量调用 InterFuzz.jar 生成多个测试用例并打包。



- **Node.js 16+** 和 npm

- **TypeScript / tsx** (已包含在项目依赖中)

- **InterFuzz.jar** (放在当前目录)## 环境要求## 环境要求

- **内置 JDK** (已包含在 `backend/temurin-17.0.7`)

  - ✅ 无需单独安装 Java

  - ✅ 使用 Temurin 17.0.7 版本

  - ✅ 确保所有用户使用相同的 Java 环境- **Node.js 16+** 和 npm- Node.js 16+ 和 npm



## 功能特性- **TypeScript / tsx** (已包含在项目依赖中)- TypeScript / tsx



- ✅ 自动循环调用 InterFuzz.jar 生成多个测试用例- **InterFuzz.jar** (放在当前目录)- InterFuzz.jar（放在当前目录）

- ✅ 从 Test0001 开始依次选择种子文件

- ✅ **智能失败检测**：自动检测输出中的 "fail" 或 "error" 关键字- **Java Runtime Environment** (用于运行 InterFuzz.jar)- Java Runtime Environment（用于运行 InterFuzz.jar）

- ✅ **自动重试机制**：生成失败时自动重试，最多 3 次（可配置）

- ✅ 自动提取每次迭代的最终代码  - Java 17 或更高版本推荐

- ✅ 将所有测试用例保存到时间戳命名的文件夹中

- ✅ 详细的日志记录  - 需要设置 `JAVA_HOME` 或将 `java` 添加到 PATH## 功能特性

- ✅ 使用内置 JDK，无需配置 Java 环境



## 使用方法

## 功能特性- ✅ 自动循环调用 InterFuzz.jar 生成多个测试用例

### 通过 Web 界面使用（推荐）

- ✅ 从 Test0001 开始依次选择种子文件

访问项目的 Web 界面，在"种子生成"模块中：

1. 输入测试用例数量（默认 50）- ✅ 自动循环调用 InterFuzz.jar 生成多个测试用例- ✅ **智能失败检测**：自动检测输出中的 "fail" 或 "error" 关键字

2. 输入迭代次数（默认 20）

3. 点击"生成"按钮- ✅ 从 Test0001 开始依次选择种子文件- ✅ **自动重试机制**：生成失败时自动重试，最多 3 次（可配置）

4. 查看实时进度和预计完成时间

5. 生成完成后，每个测试用例会以卡片形式显示- ✅ **智能失败检测**：自动检测输出中的 "fail" 或 "error" 关键字- ✅ 自动提取每次迭代的最终代码

6. 可以单独下载每个测试用例，或批量下载所有测试用例

- ✅ **自动重试机制**：生成失败时自动重试，最多 3 次（可配置）- ✅ 将所有测试用例保存到时间戳命名的文件夹中

### 命令行使用

- ✅ 自动提取每次迭代的最终代码- ✅ 详细的日志记录

```bash

npx tsx batch_gen_seed.ts --gen_iters <迭代次数> --seeds_size <测试用例数量>- ✅ 将所有测试用例保存到时间戳命名的文件夹中

```

- ✅ 详细的日志记录## 使用方法

#### 参数说明



**必需参数：**

## 使用方法### 通过 Web 界面使用（推荐）

- `--gen_iters`, `-i`: 每个种子的变异迭代次数

- `--seeds_size`, `-s`: 要生成的测试用例数量



**可选参数：**### 通过 Web 界面使用（推荐）访问项目的 Web 界面，在"种子生成"模块中：



- `--jar_path`, `-j`: InterFuzz.jar 路径（默认：./InterFuzz.jar）1. 输入测试用例数量

- `--seeds_dir`, `-d`: 种子文件目录（默认：../jf-seeds/tests/）

- `--output_name`, `-o`: 输出文件夹名称（默认：generated_tests_YYYYMMDD_HHMMSS）访问项目的 Web 界面，在"种子生成"模块中：2. 输入迭代次数

- `--no-cleanup`: 不清理 mutants 文件夹

- `--max-retries`, `-r`: 失败重试次数（默认：3）1. 输入测试用例数量（默认 50）3. 点击"生成"按钮



#### 使用示例2. 输入迭代次数（默认 20）4. 等待进度条完成



```bash3. 点击"生成"按钮5. 下载生成的测试用例 ZIP 文件

# 生成 10 个测试用例，每个迭代 50 次

npx tsx batch_gen_seed.ts -i 50 -s 104. 查看实时进度和预计完成时间



# 指定输出名称5. 生成完成后，每个测试用例会以卡片形式显示### 命令行使用

npx tsx batch_gen_seed.ts -i 100 -s 5 -o my_batch

6. 可以单独下载每个测试用例，或批量下载所有测试用例

# 保留中间文件

npx tsx batch_gen_seed.ts -i 50 -s 10 --no-cleanup```bash



# 自定义 JAR 和种子路径### 命令行使用npx tsx batch_gen_seed.ts --gen_iters <迭代次数> --seeds_size <测试用例数量>

npx tsx batch_gen_seed.ts -i 50 -s 10 -j ../target/InterFuzz-1.0.jar -d ../my-seeds/



# 设置最多重试 5 次

npx tsx batch_gen_seed.ts -i 50 -s 10 --max-retries 5```bash- `--max-retries`, `-r`: 失败重试次数（默认：3）```- ✅ 支持自动清理 mutants 文件夹

```

npx tsx batch_gen_seed.ts --gen_iters <迭代次数> --seeds_size <测试用例数量>

## 输出结构

```

```

batch_gen_seed/

├── generated_tests_20251029_120000/

│   ├── generation.log              # 详细日志文件#### 参数说明### 示例- ✅ 详细的进度显示和错误处理

│   ├── test_case_0001/

│   │   ├── Test0001.java

│   │   └── ... (其他生成的文件)

│   ├── test_case_0002/**必需参数：**

│   │   ├── Test0002.java

│   │   └── ...

│   └── ...

├── InterFuzz.jar- `--gen_iters`, `-i`: 每个种子的变异迭代次数```bash### 参数说明

└── batch_gen_seed.ts

```- `--seeds_size`, `-s`: 要生成的测试用例数量



### 日志说明# 生成 10 个测试用例，每个迭代 50 次



- **命令行输出**：显示进度信息和关键状态**可选参数：**

  - 当前生成的测试用例编号

  - 成功/失败状态python3 batch_gen_seed.py -i 50 -s 10## 环境要求

  - 重试信息

  - 最终统计- `--jar_path`, `-j`: InterFuzz.jar 路径（默认：./InterFuzz.jar）



- **generation.log**：保存所有详细执行日志，包括：- `--seeds_dir`, `-d`: 种子文件目录（默认：../jf-seeds/tests/）

  - InterFuzz.jar 的完整输出

  - 每个测试用例的生成详情- `--output_name`, `-o`: 输出文件夹名称（默认：generated_tests_YYYYMMDD_HHMMSS）

  - 错误信息和重试记录

  - 文件复制和打包过程- `--no-cleanup`: 不清理 mutants 文件夹# 指定输出名称**必需参数：**



## 进度显示- `--max-retries`, `-r`: 失败重试次数（默认：3）



脚本执行时会在控制台显示实时进度：python3 batch_gen_seed.py -i 100 -s 5 -o my_batch



```#### 使用示例

************************************************************

[INFO] Generating test case 3/10- `--gen_iters`, `-i`: 每个种子的变异迭代次数- Python 3.6+

[INFO] Target seed: Test0003

************************************************************```bash



[CMD] Executing: java -jar InterFuzz.jar ...# 生成 10 个测试用例，每个迭代 50 次# 保留中间文件

[CMD] Working directory: /home/user/interfuzz-web/backend

npx tsx batch_gen_seed.ts -i 50 -s 10

[SUCCESS] ✓ Generation completed

```python3 batch_gen_seed.py -i 50 -s 10 --no-cleanup- `--seeds_size`, `-s`: 要生成的测试用例数量- Java Runtime Environment (用于运行 InterFuzz.jar)



在 Web 界面中，会显示：# 指定输出名称

- 实时进度条（基于脚本输出的真实进度）

- 当前进度百分比npx tsx batch_gen_seed.ts -i 100 -s 5 -o my_batch```

- 预计剩余时间

- 当前状态信息



## Java 环境配置# 保留中间文件  - Java 17 或更高版本推荐



脚本使用项目内置的 JDK（位于 `backend/temurin-17.0.7`）：npx tsx batch_gen_seed.ts -i 50 -s 10 --no-cleanup



```typescript## 输出结果

const JAVA_BIN = path.join(getProjectRoot(), 'backend', 'temurin-17.0.7', 'bin', 'java')

const JDK_PATH = path.join(getProjectRoot(), 'backend', 'temurin-17.0.7', 'bin')# 自定义 JAR 和种子路径

```

npx tsx batch_gen_seed.ts -i 50 -s 10 -j ../target/InterFuzz-1.0.jar -d ../my-seeds/**可选参数：**  - 需要设置 `JAVA_HOME` 环境变量或将 `java` 添加到 PATH

**优点：**

- ✅ 无需在系统中安装 Java

- ✅ 确保所有用户使用相同的 Java 版本（Temurin 17.0.7）

- ✅ 避免 Java 版本不兼容问题# 设置最多重试 5 次```

- ✅ 开箱即用，无需配置

- ✅ 路径相对于项目根目录，支持跨平台npx tsx batch_gen_seed.ts -i 50 -s 10 --max-retries 5



如果需要使用其他 JDK 版本，请修改 `batch_gen_seed.ts` 文件中的这两个常量。```batch_gen_seed/- `--jar_path`, `-j`: InterFuzz.jar 路径（默认：./InterFuzz.jar）- InterFuzz.jar (放在 batch_gen_seed 目录下)



## 故障排查



### 问题：找不到 InterFuzz.jar## 输出结构├── generated_tests_YYYYMMDD_HHMMSS/



**解决方案：**

- 确保 InterFuzz.jar 在 `batch_gen_seed` 目录中

- 或使用 `-j` 参数指定正确的路径```│   ├── generation.log              # 详细日志文件- `--seeds_dir`, `-d`: 种子文件目录（默认：../jf-seeds/tests/）



### 问题：找不到种子文件batch_gen_seed/



**解决方案：**├── generated_tests_20251029_120000/│   ├── test_case_0001/

- 检查 `../jf-seeds/tests/` 目录是否存在

- 确保目录中有 Test0001.java、Test0002.java 等文件│   ├── generation.log              # 详细日志文件

- 或使用 `-d` 参数指定正确的种子目录

│   ├── test_case_0001/│   ├── test_case_0002/- `--output_name`, `-o`: 输出文件夹名称（默认：generated_tests_YYYYMMDD_HHMMSS）**支持的平台：**

### 问题：Java 未找到或无法执行

│   │   ├── Test0001.java

**解决方案：**

- 确保 `backend/temurin-17.0.7` 目录存在│   │   └── ... (其他生成的文件)│   └── ...

- 检查 JDK 的 bin 目录中是否有 `java` 可执行文件

- 在 Linux/macOS 上，确保 java 文件有执行权限：│   ├── test_case_0002/

  ```bash

  chmod +x backend/temurin-17.0.7/bin/java│   │   ├── Test0002.java└── generated_tests_YYYYMMDD_HHMMSS.zip- `--no-cleanup`: 不清理 mutants 文件夹- ✅ Linux

  ```

│   │   └── ...

### 问题：生成失败

│   └── ...```

**特点：**

- 脚本会自动重试最多 3 次（可通过 `--max-retries` 调整）├── InterFuzz.jar

- 检查 `generation.log` 查看详细错误信息

- 使用 `--no-cleanup` 保留中间文件以便调试└── batch_gen_seed.ts- `--max-retries`, `-r`: 失败重试次数（默认：3）- ✅ macOS



## 技术细节```



- **语言**: TypeScript### 日志说明

- **运行时**: Node.js + tsx

- **Java 环境**: 内置 Temurin JDK 17.0.7### 日志说明

- **进程管理**: 使用 `child_process.spawn` 调用 Java

- **错误检测**: 正则表达式匹配输出中的失败关键字- ✅ Windows

- **重试策略**: 指数退避，每次重试前等待 2 秒

- **进度报告**: 实时解析脚本输出，通过 SSE 推送到 Web 界面- **命令行输出**：显示进度信息和关键状态



## 与 Web 后端集成  - 当前生成的测试用例编号- **命令行输出**：仅显示进度条和关键信息



脚本通过 `vite.config.ts` 中的 API 端点集成到 Web 应用中：  - 成功/失败状态



- **端点**: `POST /api/generate-seeds`  - 重试信息- **generation.log**：保存所有详细执行日志，包括：### 示例- ✅ WSL (Windows Subsystem for Linux)

- **请求体**: `{ iterations: number, count: number, stream: boolean }`

- **响应**:   - 最终统计

  - 非流式：JSON 格式的测试用例数据

  - 流式：Server-Sent Events (SSE) 实时进度更新  - InterFuzz.jar 的完整输出



## 项目结构- **generation.log**：保存所有详细执行日志，包括：



```  - InterFuzz.jar 的完整输出  - 每个测试用例的生成详情

interfuzz-web/

├── backend/  - 每个测试用例的生成详情

│   ├── batch_gen_seed/

│   │   ├── batch_gen_seed.ts    # 主脚本  - 错误信息和重试记录  - 错误信息和重试记录

│   │   ├── InterFuzz.jar        # InterFuzz 工具

│   │   ├── README.md            # 本文档  - 文件复制和打包过程

│   │   └── tsconfig.json        # TypeScript 配置

│   ├── temurin-17.0.7/          # 内置 JDK  - 文件复制和打包过程```bash### WSL 首次运行准备

│   │   └── bin/

│   │       └── java             # Java 可执行文件## 进度显示

│   └── jf-seeds/

│       └── tests/               # 种子文件目录

│           ├── Test0001.java

│           ├── Test0002.java脚本执行时会在控制台显示实时进度：

│           └── ...

└── ...脚本执行完成后会显示输出文件夹、zip 文件和日志文件的绝对路径。# 生成 10 个测试用例，每个迭代 50 次

```

```

## 许可证

************************************************************

与 InterFuzz 项目保持一致

[INFO] Generating test case 3/10python3 batch_gen_seed.py -i 50 -s 10如果在 WSL 或 Linux 中首次运行，需要给 shell 脚本添加执行权限：

[INFO] Target seed: Test0003

************************************************************



[CMD] Executing: java -jar InterFuzz.jar ...# 指定输出名称```bash

[CMD] Working directory: /home/user/interfuzz-web/backend

python3 batch_gen_seed.py -i 100 -s 5 -o my_batchchmod +x run_batch.sh

[SUCCESS] ✓ Generation completed

``````



在 Web 界面中，会显示：# 保留中间文件

- 实时进度条（基于脚本输出的真实进度）

- 当前进度百分比python3 batch_gen_seed.py -i 50 -s 10 --no-cleanup### Java 环境配置

- 预计剩余时间

- 当前状态信息```



## Java 环境配置脚本会自动检测 Java 可执行文件。如果找不到 Java，请：



脚本默认使用硬编码的 Java 路径：## 输出结果

```typescript

const JAVA_BIN = "/home/qeryu/.jdks/temurin-17.0.7/bin/java"**方式 1: 设置 JAVA_HOME 环境变量（推荐）**

const JDK_PATH = "/home/qeryu/.jdks/temurin-17.0.7/bin"

``````



如果需要修改，请编辑 `batch_gen_seed.ts` 文件中的这两个常量。batch_gen_seed/Linux/macOS/WSL:



## 故障排查├── generated_tests_YYYYMMDD_HHMMSS/```bash



### 问题：找不到 InterFuzz.jar│   ├── test_case_0001/export JAVA_HOME=/path/to/your/jdk



**解决方案：**│   ├── test_case_0002/export PATH=$JAVA_HOME/bin:$PATH

- 确保 InterFuzz.jar 在 `batch_gen_seed` 目录中

- 或使用 `-j` 参数指定正确的路径│   └── ...```



### 问题：找不到种子文件└── generated_tests_YYYYMMDD_HHMMSS.zip



**解决方案：**```Windows:

- 检查 `../jf-seeds/tests/` 目录是否存在

- 确保目录中有 Test0001.java、Test0002.java 等文件```cmd

- 或使用 `-d` 参数指定正确的种子目录

脚本执行完成后会显示输出文件夹和 zip 文件的绝对路径。set JAVA_HOME=C:\Program Files\Java\jdk-17

### 问题：Java 未找到或版本不正确

set PATH=%JAVA_HOME%\bin;%PATH%

**解决方案：**```

- 检查 Java 是否已安装：`java -version`

- 确保使用 Java 17 或更高版本**方式 2: 使用 --java_path 参数**

- 修改脚本中的 JAVA_BIN 和 JDK_PATH 常量

```bash

### 问题：生成失败python3 batch_gen_seed.py -i 50 -s 10 --java_path /usr/bin/java

```

**特点：**

- 脚本会自动重试最多 3 次（可通过 `--max-retries` 调整）**验证 Java 安装**

- 检查 `generation.log` 查看详细错误信息

- 使用 `--no-cleanup` 保留中间文件以便调试```bash

# 测试 Java 检测

## 技术细节python3 test_java_detection.py



- **语言**: TypeScript# 或直接检查 Java 版本

- **运行时**: Node.js + tsxjava -version

- **进程管理**: 使用 `child_process.spawn` 调用 Java```

- **错误检测**: 正则表达式匹配输出中的失败关键字

- **重试策略**: 指数退避，每次重试前等待 2 秒## 使用方法

- **进度报告**: 实时解析脚本输出，通过 SSE 推送到 Web 界面

### 基本用法

## 与 Web 后端集成

**在 WSL (推荐):**

脚本通过 `vite.config.ts` 中的 API 端点集成到 Web 应用中：

```bash

- **端点**: `POST /api/generate-seeds`# 使用 shell 脚本（推荐）

- **请求体**: `{ iterations: number, count: number, stream: boolean }`./run_batch.sh <迭代次数> <测试用例数量>

- **响应**: 

  - 非流式：JSON 格式的测试用例数据# 或直接使用 Python 脚本

  - 流式：Server-Sent Events (SSE) 实时进度更新python3 batch_gen_seed.py --gen_iters <迭代次数> --seeds_size <测试用例数量>

```

## 许可证

**在 Windows:**

与 InterFuzz 项目保持一致

```cmd
REM 使用批处理脚本
run_batch.bat <迭代次数> <测试用例数量>

REM 或直接使用 Python 脚本
python batch_gen_seed.py --gen_iters <迭代次数> --seeds_size <测试用例数量>
```

### 参数说明

**必需参数：**

- `--gen_iters`, `-i`: 每个种子的变异迭代次数
- `--seeds_size`, `-s`: 要生成的测试用例数量

**可选参数：**

- `--jar_path`, `-j`: InterFuzz.jar 的路径（默认：./InterFuzz.jar）
- `--seeds_dir`, `-d`: 种子文件目录路径（默认：../jf-seeds/tests/）
- `--output_name`, `-o`: 输出文件夹名称（默认：generated_tests_YYYYMMDD_HHMMSS）
- `--java_path`: Java 可执行文件路径（默认：自动检测）
- `--no-cleanup`: 不清理 mutants 文件夹（默认会清理）
- `--max-retries`, `-r`: 失败时的最大重试次数（默认：3）

### 使用示例

**示例 1：生成 10 个测试用例，每个迭代 50 次**

WSL:
```bash
./run_batch.sh 50 10
# 或
python3 batch_gen_seed.py --gen_iters 50 --seeds_size 10
```

Windows:
```cmd
run_batch.bat 50 10
REM 或
python batch_gen_seed.py --gen_iters 50 --seeds_size 10
```

**示例 2：生成 5 个测试用例，每个迭代 100 次，保留 mutants 文件夹**

WSL:
```bash
./run_batch.sh 100 5 --no-cleanup
```

Windows:
```cmd
run_batch.bat 100 5 --no-cleanup
```

**示例 3：指定自定义输出文件夹名称**

WSL:
```bash
python3 batch_gen_seed.py -i 50 -s 10 -o my_test_batch_001
```

Windows:
```cmd
python batch_gen_seed.py -i 50 -s 10 -o my_test_batch_001
```

**示例 4：使用自定义 JAR 路径和种子目录**

WSL:
```bash
python3 batch_gen_seed.py -i 50 -s 10 -j ../target/InterFuzz-1.0.jar -d ../my-seeds/
```

Windows:
```cmd
python batch_gen_seed.py -i 50 -s 10 -j ..\target\InterFuzz-1.0.jar -d ..\my-seeds\
```

**示例 5：自定义最大重试次数**

WSL:
```bash
# 设置最多重试 5 次
python3 batch_gen_seed.py -i 50 -s 10 --max-retries 5

# 禁用重试（只尝试 1 次）
python3 batch_gen_seed.py -i 50 -s 10 -r 1
```

Windows:
```cmd
python batch_gen_seed.py -i 50 -s 10 --max-retries 5
```

**示例 6：指定自定义 Java 路径**

WSL/Linux:
```bash
# 使用系统 Java
python3 batch_gen_seed.py -i 50 -s 10 --java_path /usr/bin/java

# 使用自定义 JDK
python3 batch_gen_seed.py -i 50 -s 10 --java_path /home/user/.jdks/temurin-17.0.7/bin/java
```

Windows:
```cmd
python batch_gen_seed.py -i 50 -s 10 --java_path "C:\Program Files\Java\jdk-17\bin\java.exe"
```

## 工作流程

1. **初始化**
   - 验证 InterFuzz.jar 和种子文件目录是否存在
   - 创建输出文件夹（格式：generated_tests_YYYYMMDD_HHMMSS）

2. **批量生成**
   - 循环生成指定数量的测试用例
   - 每次从 Test0001 开始依次选择种子文件
   - 如果种子数量不足，会循环使用（如：Test0001, Test0002, ..., Test0070, Test0001, ...）
   - 调用 InterFuzz.jar 进行变异
   - **智能检测**：自动检查输出中是否包含 "fail" 或 "error" 关键字
   - **自动重试**：如果检测到失败，自动重试最多 3 次
   - 从 mutants 文件夹中提取最终迭代的代码

3. **收集结果**
   - 每个测试用例保存在独立的子文件夹中（test_case_0001, test_case_0002, ...）
   - 子文件夹包含完整的包结构和所有生成的 .java 文件

4. **打包输出**
   - 将所有测试用例打包成 zip 文件
   - 在命令行输出 zip 文件的绝对路径
   - 清理 mutants 文件夹（除非使用 --no-cleanup）

## 输出结构

```
batch_gen_seed/
├── batch_gen_seed.py          # 本脚本
├── InterFuzz.jar              # InterFuzz JAR 文件
├── generated_tests_20251028_143000/    # 输出文件夹
│   ├── test_case_0001/        # 测试用例 1
│   │   ├── initPac/
│   │   │   └── P_xxxx/
│   │   │       ├── ClassA.java
│   │   │       └── ClassB.java
│   │   └── P_yyyy/
│   ├── test_case_0002/        # 测试用例 2
│   │   └── ...
│   └── ...
└── generated_tests_20251028_143000.zip  # 打包的 zip 文件
```

## 输出信息

脚本执行过程中会显示：
- 当前正在生成的测试用例编号和使用的种子文件
- InterFuzz.jar 的执行输出
- 每个测试用例的生成时间
- 成功/失败统计
- 最终 zip 文件的绝对路径

**示例输出：**

```
============================================================
Batch Test Case Generation
============================================================
Iterations per seed: 50
Number of test cases: 10
JAR path: C:\...\InterFuzz.jar
Seeds directory: C:\...\jf-seeds\tests
Output folder: C:\...\generated_tests_20251028_143000
============================================================

************************************************************
Generating test case 1/10
Target seed: Test0001
************************************************************

Running: java -jar InterFuzz.jar --seeds_path ... --target_seed Test0001 --iter 50

[InterFuzz output...]

⚠ Generation failed or has errors, will retry...

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Retry attempt 2/3
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Running: java -jar InterFuzz.jar --seeds_path ... --target_seed Test0001 --iter 50

[InterFuzz output...]

✓ Succeeded on retry attempt 2
✓ Generation completed in 45.32 seconds
Found mutant folder: Test0001_10_28_14_30_15
✓ Copied test case 1 from 49

...

============================================================
Generation Summary
============================================================
Successful: 10/10
Failed: 0/10
============================================================

Creating zip archive: C:\...\generated_tests_20251028_143000.zip
✓ Zip archive created successfully

============================================================
✓ All done!
============================================================
Output folder: C:\qsy\SAS_Lab\R8Fuzzer\InterFuzz\batch_gen_seed\generated_tests_20251028_143000
Zip archive: C:\qsy\SAS_Lab\R8Fuzzer\InterFuzz\batch_gen_seed\generated_tests_20251028_143000.zip
============================================================
```

## 故障排除

**问题：找不到 Java 可执行文件**
```
错误信息：Java executable not found

解决方案：
1. 确保 Java 已安装：java -version
2. 设置 JAVA_HOME 环境变量
3. 将 java 添加到系统 PATH
4. 使用 --java_path 参数指定 Java 路径
5. 运行测试脚本验证：python3 test_java_detection.py
```

**问题：找不到 InterFuzz.jar**
```
解决：使用 --jar_path 参数指定正确的路径
```

**问题：找不到种子文件**
```
解决：使用 --seeds_dir 参数指定正确的种子目录
```

**问题：生成失败**
```
检查：
1. Java 环境是否正确安装（java -version）
2. InterFuzz.jar 是否可执行
3. 种子文件格式是否正确
4. 磁盘空间是否充足
5. 查看详细错误输出
```

**问题：找不到生成的 mutant 文件夹**
```
可能原因：
1. InterFuzz.jar 执行失败
2. mutants 目录权限问题
使用 --no-cleanup 选项保留 mutants 文件夹以便检查
```

**问题：在 WSL 中路径转换问题**
```
WSL 可以访问 Windows 文件系统，路径映射：
- Windows: C:\Users\... → WSL: /mnt/c/Users/...
- 使用绝对路径避免混淆
```

## 注意事项

1. 脚本会在项目根目录下运行 InterFuzz.jar
2. 每次生成会创建临时的 mutants 文件夹（默认会清理）
3. 确保有足够的磁盘空间存储生成的测试用例
4. 建议先用小的 seeds_size 测试脚本是否正常工作
5. 种子文件选择从 Test0001 开始循环，确保种子文件按顺序命名

## 许可证

与 InterFuzz 项目保持一致

