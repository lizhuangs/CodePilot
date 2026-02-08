# CLAUDE.md

## Project Overview

CodePilot — Claude Code 的原生桌面 GUI 客户端，基于 Electron + Next.js。

## Release Checklist

**发版前必须更新版本号：**

1. `package.json` 中的 `"version"` 字段
2. `package-lock.json` 中的对应版本（运行 `npm install` 会自动同步）
3. 构建命令：`npm run electron:pack:mac`（macOS）/ `npm run electron:pack:win`（Windows）
4. 上传产物到 GitHub Release 并编写 release notes

## Development Rules

**提交前必须详尽测试：**
- 每次提交代码前，必须在开发环境中充分测试所有改动的功能，确认无回归
- 涉及前端 UI 的改动需要实际启动应用验证（`npm run dev` 或 `npm run electron:dev`）
- 涉及构建/打包的改动需要完整执行一次打包流程验证产物可用
- 涉及多平台的改动需要考虑各平台的差异性

**新增功能前必须详尽调研：**
- 新增功能前必须充分调研相关技术方案、API 兼容性、社区最佳实践
- 涉及 Electron API 需确认目标版本支持情况
- 涉及第三方库需确认与现有依赖的兼容性
- 涉及 Claude Code SDK 需确认 SDK 实际支持的功能和调用方式
- 对不确定的技术点先做 POC 验证，不要直接在主代码中试错

## Build Notes

- macOS 构建产出 DMG（arm64 + x64），Windows 产出 NSIS 安装包或 zip
- `scripts/after-pack.js` 会在打包时显式重编译 better-sqlite3 为 Electron ABI，确保原生模块兼容
- 构建前清理 `rm -rf release/ .next/` 可避免旧产物污染
- 构建 Windows 包后需要 `npm rebuild better-sqlite3` 恢复本地开发环境
- macOS 交叉编译 Windows 需要 Wine（Apple Silicon 上可能不可用），可用 zip 替代 NSIS
