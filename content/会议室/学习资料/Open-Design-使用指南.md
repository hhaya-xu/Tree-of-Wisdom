# Open Design 使用指南

> 给新手主公 | 玄策整理 | 2026-05-25

---

## 一、这是什么

Open Design 是一个设计平台。你写一句话描述想要什么，它调用 Codex 帮你生成网页、PPT、海报、图片、视频。

**Codex = 设计引擎，Open Design = 驾驶舱。**

---

## 二、启动

双击 `D:\ai\open design\Open Design.exe` 即可。启动后浏览器打开 `http://localhost:5173`（或它自动弹窗）。

## 三、三步出图

### 第 1 步：选 Design System（视觉风格）

左上角下拉框有 **129 套品牌风格**，比如：
- Neutral Modern（现代极简，默认）
- Warm Editorial（温暖编辑风）
- Swiss International（瑞士国际风）
- Playful（趣味风）

选不同的 Design System，同样一句话会生成完全不同的视觉。

### 第 2 步：选 Skill（功能类型）

中间下拉框，按用途分组：

| 模式 | 做什么 | 适合你 |
|------|--------|--------|
| Prototype | 网页原型（落地页、仪表盘、定价页等） | ✅ 最常用 |
| Deck | PPT 幻灯片 | ✅ |
| Template | 模板（博客、文档、FAQ 等） | |
| Image | 图片生成（海报、配图等） | ✅ |
| Video | 视频生成 | 未来用 |

### 第 3 步：写 Prompt → 点 Send

用自然语言描述，比如：

> 做一个咖啡品牌官网，首屏要有大图、标语、三个卖点

Codex 会流式生成 HTML，右侧实时预览。满意后点 **Save to disk**。

---

## 四、实用技巧

- **改设计不断生成**：换一个 Design System，同样 prompt 再跑一次，效果完全不同
- **不满意就继续改**：在 prompt 里说"把标题加大、背景改成暖色"
- **导出**：生成后可导出为 HTML / PDF / PPTX / MP4

---

## 五、和 Hallmark 的区别

| | Hallmark | Open Design |
|---|---|---|
| 定位 | 防止 AI 味 | 全套设计引擎 |
| 风格数 | 22 套 | 129 套 |
| 产出 | 网页 | 网页 + PPT + 图片 + 视频 |
| 安装 | 手动 clone | 官方安装包 |

你用 Open Design 就够了，hallmark 删得不冤。

---

## 六、第一个练习

试试这个：

1. Design System：选 **Warm Editorial**
2. Skill：选 **web-prototype**
3. Prompt：

> 做一个独立书店的网站，要有书卷气，暖色为主，首屏放一句里尔克的诗

然后看 Codex 怎么跑。

---

*有问题随时喊我*
