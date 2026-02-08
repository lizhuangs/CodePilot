<img src="docs/icon-readme.png" width="32" height="32" alt="CodePilot" style="vertical-align: middle; margin-right: 8px;" /> CodePilot
===

**Claude Code 的原生桌面客户端** -- 通过可视化界面进行对话、编码和项目管理，无需在终端中操作。

[English](./README.md)

[![GitHub release](https://img.shields.io/github/v/release/op7418/CodePilot)](https://github.com/op7418/CodePilot/releases)
[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows-lightgrey)](https://github.com/op7418/CodePilot/releases)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## ✨ 功能特性

- 💬 **实时对话编码** -- 流式接收 Claude 的响应，支持完整的 Markdown 渲染、语法高亮代码块和工具调用可视化
- 📂 **会话管理** -- 创建、重命名、归档和恢复聊天会话。所有对话本地持久化存储在 SQLite 中，重启不丢失
- 🎯 **项目感知上下文** -- 为每个会话选择工作目录。右侧面板实时展示文件树和文件预览，随时了解 Claude 正在查看的内容
- 🔐 **权限控制** -- 逐项审批、拒绝或自动允许工具使用，可选择不同的权限模式
- 🎭 **多种交互模式** -- 在 *Code*、*Plan* 和 *Ask* 模式之间切换，控制 Claude 在每个会话中的行为方式
- 🤖 **模型切换** -- 在对话中随时切换 Claude 模型（Opus、Sonnet、Haiku）
- 🔌 **MCP 服务器管理** -- 直接在扩展页面添加、配置和移除 Model Context Protocol 服务器。支持 `stdio`、`sse` 和 `http` 传输类型
- ⚡ **自定义技能** -- 定义可复用的提示词技能（全局或项目级别），在聊天中作为斜杠命令调用
- ⚙️ **设置编辑器** -- 可视化和 JSON 编辑器管理 `~/.claude/settings.json`，包括权限和环境变量配置
- 📊 **Token 用量追踪** -- 每次助手回复后查看输入/输出 Token 数量和预估费用
- 🌓 **深色/浅色主题** -- 导航栏一键切换主题
- 💻 **斜杠命令** -- 内置 `/help`、`/clear`、`/cost`、`/compact`、`/doctor`、`/review` 等命令
- 📦 **Electron 打包** -- 原生桌面应用，隐藏标题栏，内置 Next.js 服务器，自动端口分配

## 📸 截图

![CodePilot](docs/screenshot.png)

---

## 📋 环境要求

| 要求 | 最低版本 |
|------|---------|
| **Node.js** | 18+ |
| **Claude Code CLI** | 已安装并完成认证（`claude --version` 可正常运行） |
| **npm** | 9+（Node 18 自带） |

> **注意**：CodePilot 底层调用 Claude Code Agent SDK。请确保 `claude` 命令在 `PATH` 中可用，并且已完成认证（`claude login`）。

---

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/op7418/CodePilot.git
cd CodePilot

# 安装依赖
npm install

# 以开发模式启动（浏览器）
npm run dev

# -- 或者启动完整的 Electron 桌面应用 --
npm run electron:dev
```

然后打开 [http://localhost:3000](http://localhost:3000)（浏览器模式）或等待 Electron 窗口弹出。

---

## 📥 下载

预编译版本可在 [Releases](https://github.com/op7418/CodePilot/releases) 页面下载。

### 支持平台

- **macOS** -- 支持 arm64（Apple Silicon）和 x64（Intel）架构的 `.dmg` 安装包
- **Windows** -- 提供 `.zip` 压缩包，解压即用
- **Linux** -- 支持 x64 和 arm64 架构，提供 `.AppImage`、`.deb` 和 `.rpm` 格式

---

## 🔧 安装问题排查

CodePilot 尚未进行代码签名，因此操作系统在首次打开时会显示安全警告。

### macOS

你会看到一个对话框提示 **"无法验证开发者"** 或 **"Apple 无法检查其是否包含恶意软件"**。

**方案一 -- 右键打开**

1. 在访达中右键（或 Control-点击）`CodePilot.app`
2. 从右键菜单中选择 **打开**
3. 在确认对话框中点击 **打开**

**方案二 -- 系统设置**

1. 打开 **系统设置** > **隐私与安全性**
2. 向下滚动到 **安全性** 部分
3. 你会看到关于 CodePilot 被阻止的提示，点击 **仍要打开**
4. 如有提示则输入密码验证，然后启动应用

**方案三 -- 终端命令**

```bash
xattr -cr /Applications/CodePilot.app
```

此命令会移除隔离属性，macOS 将不再阻止该应用。

### Windows

Windows SmartScreen 会阻止安装程序或可执行文件。

**方案一 -- 仍要运行**

1. 在 SmartScreen 对话框中，点击 **更多信息**
2. 点击 **仍要运行**

**方案二 -- 关闭应用安装控制**

1. 打开 **设置** > **应用** > **高级应用设置**
2. 将 **应用安装控制**（或"选择获取应用的位置"）切换为允许任何来源

---

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | [Next.js 16](https://nextjs.org/)（App Router） |
| 桌面壳 | [Electron 40](https://www.electronjs.org/) |
| UI 组件 | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| 样式 | [Tailwind CSS 4](https://tailwindcss.com/) |
| 动画 | [Motion](https://motion.dev/)（Framer Motion） |
| AI 集成 | [Claude Agent SDK](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk) |
| 数据库 | [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)（嵌入式，用户独立） |
| Markdown | react-markdown + remark-gfm + rehype-raw + [Shiki](https://shiki.style/) |
| 流式传输 | [Vercel AI SDK](https://sdk.vercel.ai/) + Server-Sent Events |
| 图标 | [Hugeicons](https://hugeicons.com/) + [Lucide](https://lucide.dev/) |
| 测试 | [Playwright](https://playwright.dev/) |
| 构建打包 | electron-builder + esbuild |

---

## 📂 项目结构

```
codepilot/
├── electron/                # Electron 主进程和预加载脚本
│   ├── main.ts              # 窗口创建、内嵌服务器生命周期管理
│   └── preload.ts           # Context bridge
├── src/
│   ├── app/                 # Next.js App Router 页面和 API 路由
│   │   ├── chat/            # 新建对话页面和 [id] 会话页面
│   │   ├── extensions/      # 技能 + MCP 服务器管理
│   │   ├── settings/        # 设置编辑器
│   │   └── api/             # REST + SSE 接口
│   │       ├── chat/        # 会话、消息、流式传输、权限
│   │       ├── files/       # 文件树和预览
│   │       ├── plugins/     # 插件和 MCP 增删改查
│   │       ├── settings/    # 设置读写
│   │       ├── skills/      # 技能增删改查
│   │       └── tasks/       # 任务追踪
│   ├── components/
│   │   ├── ai-elements/     # 消息气泡、代码块、工具调用等
│   │   ├── chat/            # ChatView、MessageList、MessageInput、流式消息
│   │   ├── layout/          # AppShell、NavRail、Header、RightPanel
│   │   ├── plugins/         # MCP 服务器列表和编辑器
│   │   ├── project/         # FileTree、FilePreview、TaskList
│   │   ├── skills/          # SkillsManager、SkillEditor
│   │   └── ui/              # 基于 Radix 的基础组件（button、dialog、tabs...）
│   ├── hooks/               # 自定义 React Hooks（usePanel 等）
│   ├── lib/                 # 核心逻辑
│   │   ├── claude-client.ts # Agent SDK 流式封装
│   │   ├── db.ts            # SQLite 数据库、迁移、CRUD
│   │   ├── files.ts         # 文件系统工具函数
│   │   ├── permission-registry.ts  # 权限请求/响应桥接
│   │   └── utils.ts         # 通用工具函数
│   └── types/               # TypeScript 接口和 API 类型定义
├── electron-builder.yml     # 打包配置
├── package.json
└── tsconfig.json
```

---

## 💻 开发

```bash
# 仅运行 Next.js 开发服务器（在浏览器中打开）
npm run dev

# 运行完整的 Electron 桌面应用（开发模式）
# （先启动 Next.js，等待就绪后打开 Electron）
npm run electron:dev

# 生产构建（Next.js standalone）
npm run build

# 构建 Electron 可分发包 + Next.js
npm run electron:build

# 打包 macOS DMG
npm run electron:pack
```

### 说明

- Electron 主进程（`electron/main.ts`）会 fork Next.js standalone 服务器，通过 `127.0.0.1` 上的随机可用端口进行连接
- 聊天数据存储在 `~/.codepilot/codepilot.db`（开发模式下为 `./data/`）
- 应用使用 SQLite WAL 模式，并发读取性能优秀

---

## 🤝 贡献

欢迎贡献代码。开始之前：

1. Fork 本仓库并创建功能分支
2. 使用 `npm install` 安装依赖
3. 运行 `npm run electron:dev` 在本地测试你的更改
4. 确保 `npm run lint` 通过后再提交 Pull Request
5. 向 `main` 分支提交 PR，并附上清晰的变更说明

请保持 PR 聚焦 -- 每个 PR 只包含一个功能或修复。

---

## 📄 许可证

MIT
