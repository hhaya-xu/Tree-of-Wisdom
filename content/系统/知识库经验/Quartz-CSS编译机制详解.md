---
title: Quartz CSS 编译机制详解
date: 2026-05-25
tags: [quartz, css, 编译, 知识库经验]
---

# Quartz v4.5.2 CSS 编译机制详解

## 一、核心发现：base.scss 是死文件

经过完整源码扫描，没有任何文件 import base.scss。它虽然存在于 quartz/styles/ 目录下，但不会进入编译输出。

验证依据：
- 源码搜索：所有 .tsx / .ts / .scss 均无 base.scss 引用
- 输出验证：base.scss 独特规则（scroll-behavior:smooth、grid-template-areas）在 public/index.css 中不存在

这意味着之前关于"base.scss 与 custom.scss 冲突"的调试假设是错误的。

## 二、真正的 CSS 编译链

### 入口

quartz/plugins/emitters/componentResources.ts

### 编译顺序（joinStyles 内部）

1. Google Fonts 内联样式表（fontOrigin: "googleFonts" 时）
2. 所有组件 SCSS（从 getComponentResources() 收集）
3. custom.scss（import styles from "../../styles/custom.scss"）
4. :root CSS 变量（joinStyles() 动态从 theme 配置生成，追加在最末尾）

### joinStyles() 源码逻辑

```ts
function joinStyles(theme: Theme, ...stylesheet: string[]) {
  return `
${stylesheet.join("\n\n")}

:root {
  --light: ${theme.colors.lightMode.light};
  --bodyFont: "${...}", ...;
}
:root[saved-theme="dark"] { ... }
`
}
```

### 组件 SCSS 文件清单（按加载顺序）

| 文件 | 来源组件 |
|------|---------|
| backlinks.scss | Backlinks.tsx |
| breadcrumbs.scss | Breadcrumbs.tsx |
| clipboard.scss | Body.tsx |
| contentMeta.scss | ContentMeta.tsx |
| darkmode.scss | Darkmode.tsx |
| explorer.scss | Explorer.tsx |
| footer.scss | Footer.tsx |
| graph.scss | Graph.tsx |
| listPage.scss | FolderContent/TagContent.tsx |
| popover.scss | 全局启用时注入 |
| readermode.scss | ReaderMode.tsx |
| recentNotes.scss | RecentNotes.tsx |
| search.scss | Search.tsx |
| sidebar-zones.scss | SidebarZones.tsx |
| legacyToc.scss + toc.scss | TableOfContents.tsx |
| topbar.scss | Topbar.tsx |

## 三、关键机制：CSS 覆盖优先级

### 同选择器：后加载者胜

组件 SCSS（先）-> custom.scss（后）-> :root 变量（最后）

### :root CSS 变量的特殊位置

:root 块在 joinStyles() 末尾生成，位于所有 SCSS 之后。

后果：
- custom.scss 中设置 --bodyFont: "xxx" -> 会被 joinStyles 的 :root 覆盖
- 组件 SCSS 中设置 --bodyFont -> 同样被覆盖
- 只有带 !important 的声明能战胜 joinStyles :root

### 文姬的 fonts.scss 为何有效

fonts.scss 放在 custom.scss 末尾（@import "fonts.scss"），利用：

1. !important 优先级：CSS 中 author !important > author normal，不受源顺序影响
2. :root + html,body 双重锁定：变量层面 + 元素层面同时设置

```scss
:root {
  --bodyFont: "Geist", ... !important;   // 胜过后面的 :root
}
html, body {
  font-family: var(--bodyFont) !important;  // 直接锁定元素
}
```

### 验证：构建输出中确实有两个 :root 块

```css
/* fonts.scss 的 :root — 带 !important */
:root{--bodyFont:"Geist",...!important;...}

/* joinStyles 的 :root — 不带 !important */
:root{--bodyFont:"Geist", system-ui,...;...}
```

两者共存，但 fonts.scss 的 !important 声明生效。

## 四、常见坑与对策

### 坑 1：以为 custom.scss 是最后一道防线

错误认知：custom.scss -> 最终输出
真实情况：custom.scss -> joinStyles :root -> 最终输出
对策：需要覆盖 :root 变量时，必须用 !important。

### 坑 2：误以为 base.scss 在编译链中

错误认知：base.scss 的 grid/sidebar padding 和 custom.scss 冲突
真实情况：base.scss 从未编译，所有冲突实际是组件 SCSS 和 custom.scss 之间
对策：调试时只关注 custom.scss 和组件 SCSS，忽略 base.scss。

### 坑 3：字体设置被覆盖但看不到原因

在 custom.scss 设置 --bodyFont -> 无效
因为 joinStyles :root 在后面重新声明了 --bodyFont
对策：要么用 !important，要么在 quartz.config.ts 中直接修改 theme.typography。

### 坑 4：组件 SCSS 的 font-family 直接写死了

组件 SCSS 中的 font-family: "Inter" -> 无法通过 :root 覆盖
需要通过 custom.scss 提高选择器 specificity 覆盖
对策：用浏览器 DevTools 查看具体哪个选择器设置了字体，针对性覆盖。

## 五、推荐工作流

### 修改字体（最稳定方案）

```scss
// fonts.scss（通过 custom.scss @import 引入）
:root {
  --bodyFont: "你的字体", ... !important;
  --headerFont: "你的标题字体", ... !important;
  --codeFont: "你的代码字体", ... !important;
}
html, body { font-family: var(--bodyFont) !important; }
h1, h2, h3, h4, h5, h6 { font-family: var(--headerFont) !important; }
code, pre { font-family: var(--codeFont) !important; }
```

### 修改颜色/布局

直接修改 quartz.config.ts 的 theme.colors，它通过 joinStyles :root 注入到 CSS 末尾。

### 覆盖组件样式

在 custom.scss 中使用比组件 SCSS 更高 specificity 的选择器。

## 六、构建工具链

| 工具 | 作用 |
|------|------|
| esbuild | JavaScript/TypeScript 打包 |
| esbuild-sass-plugin | SCSS -> CSS 编译（type: "css-text"） |
| lightningcss | CSS 压缩/优化 |
| joinStyles() | 拼接所有 CSS + 注入 :root 变量 |

## 七、总结

```
                编译链全景
┌─────────────────────────────────────────────┐
|  Google Fonts | 组件 SCSS x16 | custom.scss │
|  (内联)       | (组件样式)    | (用户覆盖)  │
|     ↓         |     ↓         |     ↓       │
|  ─────────────joinStyles() 拼接─────────────│
|                      ↓                      │
|              :root CSS 变量追加              │
|                      ↓                      │
|              lightningcss 压缩               │
|                      ↓                      │
|              public/index.css               │
└─────────────────────────────────────────────┘

! base.scss -> 不存在于链中（死文件）
! :root 变量在最后 -> 覆盖前面所有 --var 声明
! !important 是唯一能战胜 :root 的手段
```