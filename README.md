AI API 比价计算器
===

一个用于快速对比主流大模型 API 成本的计算器工具。

功能特性
---

- 支持多种大模型（豆包、GLM、DeepSeek、Qwen、MiniMax、Kimi、Claude、GPT、Gemini 等）
- 输入日均 Token 用量，自动计算各模型月费用
- 支持缓存命中率设置，展示缓存节省效果
- 实时价格对比表，按成本排序
- 推荐最具性价比的模型方案

技术栈
---

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS 3

快速开始
---

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
pnpm build
```

项目结构
---

```
.
├── app/                    # Next.js 应用目录
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── src/                   # 源代码
│   ├── components/        # 组件
│   │   ├── CalculatorSidebar.tsx  # 费用计算器侧边栏
│   │   ├── PricingTable.tsx       # 价格对比表
│   │   └── RecommendationCard.tsx # 推荐卡片
│   ├── data/              # 数据
│   │   └── models.ts      # 模型定价数据
│   ├── types/             # 类型定义
│   │   └── pricing.ts     # 定价相关类型
│   └── utils/             # 工具函数
│       └── calculator.ts  # 费用计算逻辑
└── package.json
```

使用说明
---

1. 输入日均输入/输出 Token 用量
2. 可选设置缓存命中率和每月使用天数
3. 系统自动计算各模型费用并按成本排序
4. 查看推荐的最具性价比方案

价格仅供参考，请以各厂商官方定价为准。