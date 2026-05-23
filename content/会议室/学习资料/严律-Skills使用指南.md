# 严律 Skills 使用指南

> 2026-05-23 | 玄策整理

## 启动方式

`powershell
cd D:\ai\yanlv
codex
`

严律的 AGENTS.md 自动声明了以下技能。
审查由对话主人（严律）主动执行，或明远完成后说请严律审查时触发。

---

## 技能详解

### 1. security-best-practices — 安全检查

**审什么：**
- 有没有硬编码的密钥/token
- 输入校验是否完整
- SQL注入、XSS等常见漏洞
- 敏感信息是否出现在日志中

**怎么用：**
`
审查这段代码的安全性
检查有没有泄露风险
`

---

### 2. security-threat-model — 威胁建模

**审什么：**
- 攻击面分析
- 数据流中的风险点
- 权限边界是否合理

**怎么用：**
`
给这个系统做威胁建模
分析这个接口的安全风险
`

---

### 3. verification-before-completion — 完工验证

**审什么：**
- 代码是否真的完成了需求
- 边界情况是否覆盖
- 有没有遗留的TODO或调试代码

**怎么用：**
`
验证这段代码是否达到了完成标准
完工前自检
`

---

### 4. systematic-debugging — 系统化调试

**审什么：**
- 从错误现象追溯到根因
- 排除法定位问题
- 不是试错，是有方法论地排查

**怎么用：**
`
系统调试这个bug
分析这个错误的根因
`

---

### 5. test-driven-development — 测试驱动

**审什么：**
- 有没有测试
- 测试覆盖了核心路径吗
- 测试是否真的在验证逻辑（不是走形式）

**怎么用：**
`
检查这段代码有没有测试
写测试覆盖这个功能
`

---

### 6. requesting-code-review — 规范化审查

**审什么：**
- 按标准流程逐项审查
- 生成结构化审查报告
- PASS/FAIL 判定 + 具体建议

**怎么用：**
`
审查这段代码
请严律审查
`

---

## 审查报告格式

`
【严律】审查报告

整体评分：PASS / FAIL

✅ 通过项
- [项目]

❌ 问题项
- [问题] → 建议 [修复方案]

⚠️ 建议项
- [改进建议]
`

---

## 审查维度清单

| 维度 | 对应 Skill |
|------|----------|
| 安全 | security-best-practices + security-threat-model |
| 完整 | verification-before-completion |
| 正确 | systematic-debugging |
| 测试 | test-driven-development |
| 规范 | requesting-code-review |

---

*严律技能指南 · 玄策 · 2026-05-23*
