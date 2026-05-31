---
title: Quartz 全量踩坑经验帖
date: 2026-06-01
tags: [quartz, 经验, 踩坑]
---

# Quartz 全量踩坑经验帖

> 每次操作 Quartz 前先读此帖。发现新坑追加到末尾。

---

## 一、编译与构建

### 1.1 修改 JS/TS 后必须清缓存

修改 `explorer.inline.ts` 或任何组件 TSX 后，**必须**删除 `public/` 和 `.quartz-cache/` 再 build。

```powershell
Remove-Item -Recurse -Force public,.quartz-cache -ErrorAction SilentlyContinue
npx quartz build
```

不删缓存 → 旧 JS 残留 → 线上不生效 → 浪费大量时间排查。

### 1.2 构建命令

```powershell
$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH
cd D:\AI\my-knowledge-base
npx quartz build
```

### 1.3 本地预览

```powershell
npx quartz build --serve
# 浏览器打开 http://localhost:8080
```

---

## 二、Dart Sass 限制

### 2.1 双冒号伪元素被静默丢弃

Dart Sass **不支持** `::after` / `::before`（双冒号）。编译时静默丢弃，不报错。

**必须使用单冒号：** `:after` / `:before`

```scss
/* ❌ 会被丢弃 */
body::before { content: ""; }

/* ✅ 正确 */
body:before { content: ""; }
```

这是最容易踩的坑——CSS 写对了但编译后消失，没有任何错误提示。

### 2.2 @import 即将废弃

`@import` 在 Dart Sass 3.0 将被移除，目前是 warning。`fonts.scss` 目前还用 `@import`，以后需迁移到 `@use`。

---

## 三、文件编码

### 3.1 禁止 PowerShell Set-Content 写文件

`Set-Content` 会破坏 UTF-8 编码，导致中文乱码、SCSS 语法错误。

```powershell
# ❌ 禁止
Set-Content file.scss -Value $content

# ❌ 禁止
Set-Content file.scss -Value $content -NoNewline
```

**必须用 Node.js 写文件：**

```javascript
const fs = await import("fs/promises");
await fs.writeFile(path, content, "utf-8");
```

### 3.2 Git CRLF 警告

Windows 下 Git 可能报 CRLF→LF 转换警告，不影响功能，可忽略。

---

## 四、custom.scss 注意事项

### 4.1 joinStyles() 在 custom.scss 之后执行

编译顺序：组件 SCSS → custom.scss → joinStyles() 生成 :root 变量。

`:root` 中的 CSS 自定义属性如果同名，joinStyles 的会覆盖 custom.scss 的。覆盖 Quartz 内置变量（如 `--bodyFont`）**必须用 `!important`**。

自定义变量（如 `--bg`、`--fg`）与 Quartz 变量不重名则不会被覆盖。

### 4.2 base.scss 是死文件

全源码无一引用，不进入编译。之前关于 "base.scss 与 custom.scss 冲突" 的假设是错误的。

### 4.3 重复 CSS 块

custom.scss 中可能存在**多个同名选择器块**（如两次 `.folder-container svg.folder-icon`）。用字符串替换时，正则可能只命中一处。**用独立属性替换**比用整块替换更可靠：

```javascript
// ✅ 可靠：逐属性替换
c = c.replace(/width: 14px !important;/g, "width: 11px !important;");
c = c.replace(/height: 14px !important;/g, "height: 11px !important;");

// ❌ 不可靠：整块替换（属性顺序不同会漏）
c = c.replace(/width: 14px.*
.*min-width: 14px.*
.*height: 14px/g, "...");
```

### 4.4 @zone 锚点体系

custom.scss 已预埋 8 个 `@zone:` 标记，用于精确替换：

| 锚点 | 区域 |
|------|------|
| `@zone:viewport` | 视口锁定 |
| `@zone:paper` | 纸纹肌理 |
| `@zone:layout` | Grid 三栏 |
| `@zone:topbar` | 顶栏+搜索 |
| `@zone:left-sidebar` | 左栏 Explorer |
| `@zone:center` | 中栏正文 |
| `@zone:right-sidebar` | 右栏图谱 |
| `@zone:footer` | 页脚 |

---

## 五、Explorer（文件树）

### 5.1 JS 动态渲染

Explorer 文件树由 `explorer.inline.ts` **在浏览器运行时**动态生成。抓取静态 HTML 拿不到文件树内容。

### 5.2 SVG 重复属性

HTML 中同名属性出现两次时，**第一个生效**。修改 Explorer.tsx 模板时确保不产生重复的 `width`/`height` 属性。

### 5.3 folder-count 计数

`explorer.inline.ts` 原生**没有**计数注入逻辑。需要手动在 `createFolderNode()` 中添加 `<span class="folder-count">` 的创建代码。注意避免重复注入。

---

## 六、字体

### 6.1 CJK 字形

Fraunces、Geist 等拉丁字体**不含中文字形**（glyph）。全站中文时浏览器全部回退到系统默认。

推荐中文字体：Noto Serif SC（思源宋体）、Noto Sans SC（思源黑体）、LXGW WenKai（霞鹜文楷）。

### 6.2 fonts.scss 加载

`fonts.scss` 在 custom.scss 顶部通过 `@import` 加载。Google Fonts URL 直接写在 fonts.scss 中。

---

## 七、布局

### 7.1 .page-header 包裹层

Quartz 编译产物中 header 被 `<div class="page-header">` 包裹。缺少此包裹层 → CSS Grid 定位失败 → 顶栏跑到错误位置。

### 7.2 三栏 Grid 依赖 min-width

`@media (min-width: 1200px)` 才启用三栏布局。窄屏时左/右栏会隐藏或折叠。

### 7.3 body 标签

body 标签属性为 `data-slug="index"`（首页）或对应页面 slug。不要替换为 `class="single-page"` 否则可能影响样式。

---

## 八、内容

### 8.1 Frontmatter 必须

所有 `content/` 下的 `.md` 文件**必须**有 frontmatter：

```yaml
---
title: 页面标题
date: 2026-06-01
---
```

### 8.2 4字节 Emoji

Quartz 构建管线不处理 4 字节 emoji（如 😐😮），用纯中文替代。

### 8.3 ContentMeta 日期

日期取自 `date` frontmatter 字段，不是文件修改时间。首页日期需手动更新。

---

## 九、部署

### 9.1 GitHub Pages 环境保护规则

GitHub Actions 部署时，environment `github-pages` 可能有分支保护规则。需在仓库 Settings → Environments → github-pages 中允许 main 分支部署。

### 9.2 CNAME 自定义域名

`quartz/static/CNAME` 文件包含 `www.lifeart.xin`。自定义域名配置在 GitHub Pages Settings 中。

### 9.3 提交推送

```powershell
cd D:\AI\my-knowledge-base
git add -A
git commit -m '描述'
git push
```

`git add -A` 偶尔因 CRLF 问题漏文件，push 后可用 `git show --stat` 确认。

---

## 十、预览文件

### 10.1 preview-base.html 生成

从 Quartz 构建产物生成可视化预览：

1. `npx quartz build`
2. 读取 `public/index.html` body 内容
3. 替换 Explorer 区（空模板 → 硬编码导航）
4. 内联 `public/index.css`
5. 输出为独立 HTML

### 10.2 结构验证方法

```javascript
// 提取所有标签+class/id 序列
function tags(html) {
  const re = /<(\w+)([^>]*)>/g;
  // ...匹配 tag.class#id
}
// 对比 built vs preview
```

---

## 十一、常见错误速查

| 症状 | 根因 | 解决 |
|------|------|------|
| CSS 写了不生效 | `::after` 被 Dart Sass 丢弃 | 改用 `:after` |
| 修改 JS 后线上不变 | 缓存未清 | 删 `public/` + `.quartz-cache/` |
| 文件写入后乱码 | PowerShell `Set-Content` | 用 Node.js `fs.writeFile` |
| Explorer 文件树为空 | JS 动态渲染，静态抓取不到 | 用硬编码 nav 或 `--serve` 后浏览器取 |
| `:root` 变量被覆盖 | joinStyles 在 custom.scss 之后执行 | 自定义变量不重名，或加 `!important` |
| SVG 尺寸改不动 | 模板有重复 `width` 属性，第一个生效 | 去重，只留一个 |
| CSS 替换漏改 | 同名选择器出现多次，属性顺序不同 | 用独立属性替换而非整块匹配 |
| 中文字体不生效 | 拉丁字体不含 CJK 字形 | 用 Noto Serif/Sans SC |

---

> 最后更新：2026-06-01 · 伯喈
