---
title: Quartz样式转译技能
date: 2026-05-30
---

## 约束层级（由上至下不可逆）

| 层 | 约束方 | 核心约束 | 违规后果 |
|----|--------|----------|----------|
| 1 | GitHub Pages | 静态托管，Actions构建 | 部署失败 |
| 2 | **Quartz v4.5** | SCSS编译顺序、CSS优先级、DartSass语法、inline.ts缓存、frontmatter必须 | 样式/JS不生效 |
| 3 | Obsidian | Markdown+wikilinks，无HTML嵌入 | 内容无法渲染 |
| 4 | 伯喈 | Node.js写文件，git show --stat验证 | 漏提交 |

---

## Quartz 编译机制（关键）

### SCSS 编译顺序
组件SCSS → custom.scss → joinStyles :root
后面覆盖前面。同一选择器只在 custom.scss 改才生效。

### Dart Sass 语法限制
- **禁止** ::after / ::before（双冒号） → 编译后丢弃
- **必须用** :after / :before（单冒号）
- @import 已弃用但当前仍可用

### CSS 优先级
Quartz 默认选择器 0,2,0~0,3,0。自定义需提升：.folder-outer>ul(0,1,0) → .explorer-content .folder-outer>ul(0,3,0)

### inline.ts 编译缓存
改 *.inline.ts 后必须删 public + .quartz-cache 再 build。

### frontmatter
所有 content/ 下 .md 必须含：
```
---
title: xxx
date: YYYY-MM-DD
---
```

---

## 转译规则表（文姬预览 → Quartz DOM）

| 文姬类名 | Quartz选择器 | 元素 | 注 |
|----------|-------------|------|-----|
| .sidebar-left | .left.sidebar | aside | padding:0, flex column |
| .explorer-scroll | .explorer .explorer-content | div | flex:1, overflow-y:auto |
| .explorer-header | .explorer .title-button | button | 含h2+svg.fold |
| .tree-section-title | .folder-container .folder-button | button | JS动态生成 |
| .tree-item | .explorer-ul li > a | a | template克隆 |
| .tree-item.sub | .folder-outer .content > li > a | a | 嵌套ul |
| .tree-item:hover | li > a:hover | a | border-left + bg |
| .tree-item.active | li > a.active | a | Quartz自动加 |
| .folder-chevron | .folder-container svg.folder-icon | svg | 内联 |
| .item-count | .folder-count (JS) | span | 改explorer.inline.ts |

---

## 部署验证清单

- [ ] npx quartz build 通过
- [ ] git show --stat 确认预期文件在commit中
- [ ] public/index.css 含目标选择器
- [ ] 改过.inline.ts → 确认删过public + .quartz-cache
- [ ] git push 成功
- [ ] GitHub Actions 部署完成
- [ ] 线上fetch验证关键文案/CSS

---

## 已知陷阱

| 陷阱 | 现象 | 解决 |
|------|------|------|
| DartSass双冒号 | ::after/::before不编译 | 改单冒号 :after/:before |
| inline.ts缓存 | JS改动不生效 | 删public + .quartz-cache |
| git漏提交 | 线上与本地不一致 | commit后git show --stat |
| PowerShell写SCSS | UTF-8 BOM | 统一用Node.js writeFile |
| 缺frontmatter | build YAML parse错 | 所有md加title头 |
| CSS优先级不够 | 被Quartz覆盖 | 提升到0,3,0级 |
