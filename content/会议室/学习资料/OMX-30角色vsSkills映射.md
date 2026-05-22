# OMX 30 角色与 Codex 王国 Skills 映射研究

> 创建：2026-05-22 | 来源：oh-my-codex | 状态：待命（玄策待深入）

---

## OMX 四组 30 角色

### 构建与分析组（explore / analyst / planner / architect / debugger / executor / verifier）

| OMX 角色 | 对应我们哪个角色 | 对应 Skill |
|----------|----------------|-----------|
| explore（代码探索）| 明远 | playwright |
| analyst（需求澄清）| 明远 + 玄策策略文档 | brainstorming |
| planner（任务规划）| 玄策（§5 策略模板）| writing-plans（待装）|
| architect（系统设计）| 明远 | executing-plans（待装）|
| debugger（根因分析）| 明远/严律 | systematic-debugging |
| executor（代码实现）| 明远 | — |
| verifier（完成验证）| 严律 | verification-before-completion |

### 代码评审组（6 个）

| OMX 角色 | 对应严律维度 | 对应 Skill |
|----------|------------|-----------|
| style-reviewer | 整洁维度 | 🟡 待补 |
| quality-reviewer | 效率+整洁 | systematic-debugging |
| api-reviewer | 接口设计 | 🟡 待补 |
| security-reviewer | 安全维度 | security-best-practices |
| performance-reviewer | 效率维度 | 🟡 待补 |
| code-reviewer | 综合 | verification-before-completion |

### 领域专家组

| OMX 角色 | 我们覆盖？ |
|----------|----------|
| test-engineer | 🟡 test-driven-development（待装）|
| designer | ❌ 无 |
| writer | ❌ 无 |
| git-master | 🟡 玄策基本操作 |
| researcher | 🟡 find-skills |
| dependency-expert | ❌ 无 |
| qa-tester | 🟡 严律审查覆盖部分 |
| scientist | ❌ 无 |

### 产品+协调组

| OMX 角色 | 我们覆盖？ |
|----------|----------|
| product-manager | 🟡 玄策策略文档 |
| ux-researcher | ❌ 无 |
| information-architect | ❌ 无 |
| product-analyst | ❌ 无 |
| critic（唱反调）| ⭐ 建议融入严律 |
| vision（读图）| 🟡 imagegen skill + 识图搁置 |

---

## 结论

- **已覆盖**：7 个角色
- **待装 skill 后可覆盖**：5 个角色
- **三人体系不需要**：8 个角色（太细，你不是团队）
- **建议引入**：critic（唱反调）融入严律

---

*OMX 映射研究 · 玄策 · 待命*