# Tree of Wisdom — 页面使用说明

## 这是在哪里的

这些文件由 Open Design 生成，是你「伯喈」Obsidian 知识库网站的原型。每个文件可以在浏览器中直接打开预览。

## 视觉系统 (brand-spec.md)

从参考站 https://www.bianjing-hours.art/street-intro 提取：
- **暗色 editorial 风格**：深灰黑底色 (oklch(16% 0.01 250))，琥珀金 accent
- **字体**：Iowan Old Style / Charter 衬线标题 + 系统 sans 正文
- **质感**：grid texture 背景、frosted glass 导航栏

## 页面结构与导航

### 首页 — `index.html`
- 森林隐喻 Hero 区（"Wisdom is a forest. Each path, a thought."）
- 4 个项目入口卡片：入流亡所策展 / 会议室 / 系统 / 内容库
- 底栏快速链接
- 点击任意项目卡片 → 进入对应项目页

### 项目页

**`project-curation.html`** — 入流亡所策展
- 项目概览、进度追踪（阶段 1–4）
- 人物表（参与者/角色/贡献）
- 术语列表（每项可点击进入内容页或图谱）

**`project-meeting.html`** — 会议室
- 三角色架构说明
- 子栏目卡（晨间汇报 / 项目同步 / 深度讨论 / 决策记录）
- 伯喈总管介绍

**`project-system.html`** — 系统
- 伯喈五条信条
- 系统组件：工作流 / 分类体系 / 模板系统 / 索引

### 内容页

**`content-day1.html`** — Day 1 凌晨病发
- 策展叙事正文（时间线格式）
- 群聊对话实录片段
- 底部链接：「查看关系图谱」→ 跳转 `content-graph.html`

### 交互式关系图谱 — `content-graph.html`
- Canvas 力导向图，19 节点 + 25 条边
- 节点类型：实修概念 / 人物 / 方法 / 经典医药
- 操作：拖拽节点、滚轮缩放 (0.3×–2.5×)、悬停显示术语定义、点击平滑聚焦
- 触摸手势支持
- 底部图例标注四类节点

## 与 Obsidian Vault 的关系

这些页面是前端原型——它们展示的是数据最终渲染出来的样子，不等同于你的 Obsidian 笔记本身。

把 Obsidian 内容填入原型的思路：
1. 每个 Obsidian 笔记 = 一个 `content-*.html` 内容页
2. 笔记的 frontmatter 字段（tags, aliases, date）→ 页面 meta 区
3. 笔记的 `[[双向链接]]` → 页面底部「相关笔记」列表
4. 笔记的标签 → 图谱中的节点分类

## 如何扩展

- **新增项目**：复制任意 `project-*.html`，替换内容和卡片链接
- **新增内容页**：复制 `content-day1.html`，替换标题+正文+图谱数据
- **扩充图谱**：编辑 `content-graph.html` 中 `<script>` 里的 `nodes` 和 `edges` 数组

## 文件清单

| 文件 | 用途 |
|------|------|
| `index.html` | 首页，总入口 |
| `project-curation.html` | 入流亡所策展项目页 |
| `project-meeting.html` | 会议室项目页 |
| `project-system.html` | 系统 / 方法论页 |
| `content-day1.html` | Day 1 内容页（叙事 + 对话） |
| `content-graph.html` | 交互式关系图谱 |
| `brand-spec.md` | 视觉系统规范 |
| `_ref-site.html` | 参考站本地缓存（勿删） |

## 下一步建议

- 在浏览器打开 `index.html` 走一遍全部页面
- 确认视觉方向是否合意（颜色、字体、密度）
- 图谱可以扩展为全量知识库节点
- 内容页模板可以批量生成其他 Day
