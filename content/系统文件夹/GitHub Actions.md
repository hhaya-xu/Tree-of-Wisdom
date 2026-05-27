---
title: GitHub Actions
date: 2026-05-14
---

## GitHub Actions

本知识库使用 GitHub Actions 自动构建和部署。

### 工作流

配置在 `.github/workflows/deploy.yml`：

1. 检测到 git push
2. 安装 Node.js 和依赖
3. 运行 `npx quartz build` 构建网站
4. 部署到 GitHub Pages

### 触发条件

- 推送到 `v4` 分支
- 手动触发（Actions 页面 > Run workflow）
