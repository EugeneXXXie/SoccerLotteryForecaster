# SoccerLotteryForecaster

A football total-goals betting assistant built with **Vue 3 + Vite + Naive UI**. It helps users fetch match odds, manually adjust betting ratios, calculate stake allocation across total-goals outcomes, and estimate expected returns for single-match analysis.

一个基于 **Vue 3 + Vite + Naive UI** 开发的竞彩足球总进球数投注辅助计算工具。项目支持获取比赛赔率、手动调整赔率输入、计算各进球数结果的投注分配，并估算预期回报，用于单场总进球数玩法的分析辅助。

---

## ✨ Overview / 项目简介

`SoccerLotteryForecaster` is a lightweight single-page web application focused on the **Total Goals** betting scenario in football lottery analysis.  
It retrieves public match and odds data, allows manual input when needed, and calculates stake allocation for outcomes from **0 goals to 7+ goals** based on the user’s total budget.

`SoccerLotteryForecaster` 是一个轻量级单页面工具项目，主要面向竞彩足球中的 **总进球数** 场景。  
它可以获取公开比赛与赔率数据，也支持用户手动输入赔率，并根据用户输入的总预算，对 **0 球到 7+ 球** 的各结果进行投注分配计算。

The application is designed as a practical calculator-style tool rather than a content platform. Its main purpose is to provide a clear and fast way to evaluate expected investment distribution and possible returns for a single match.

该项目更偏向实用型计算工具，而不是内容展示平台。它的主要目标是为单场比赛提供一种清晰、快速的投注分配与预期收益分析方式。

---

## 🧱 Tech Stack / 技术栈

- **Vue 3**
- **Vite**
- **Vue Router 4**
- **Pinia**
- **Naive UI**
- **Axios**
- **Vitest**

---

## 📦 Core Features / 核心功能

- Fetch football match data and total-goals odds from a public API  
  从公开接口获取比赛数据和总进球数赔率

- Match selector with automatic odds filling  
  选择比赛后自动填充赔率

- Support manual odds input through custom mode  
  支持通过自定义模式手动输入赔率

- Input validation with error highlighting and shake animation  
  支持输入校验、错误高亮与抖动提示

- Automatic stake allocation across 8 goal-result options  
  对 8 个进球数结果自动进行投注分配

- Display expected stake, amount invested, and expected return  
  展示预期股数、投入金额与预期回报

- Simple profitability suggestion after calculation  
  计算后给出简单的收益提示

- Responsive layout based on Naive UI grid components  
  基于 Naive UI 栅格组件实现响应式布局

---

## 🧩 Main Workflow / 主要使用流程

1. Select a football match from the dropdown list  
   从下拉列表中选择比赛

2. Let the system auto-fill odds, or switch to custom input mode  
   让系统自动填充赔率，或切换为手动输入模式

3. Enter the total planned budget  
   输入预计投入金额

4. Click **Start Calculation**  
   点击 **开始计算**

5. View the generated allocation table and expected returns  
   查看系统生成的投注分配表和预期回报结果

---

## ⚙️ Calculation Logic / 计算逻辑说明

The application takes odds for 8 possible total-goals outcomes (`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7+`) and a total planned budget as input.  
It then applies a custom allocation algorithm to distribute stakes across the outcomes, with the goal of generating a more structured betting plan and helping the user estimate overall return coverage.

项目以 8 个总进球结果（`0`、`1`、`2`、`3`、`4`、`5`、`6`、`7+`）的赔率和总预算作为输入。  
随后通过一套自定义分配算法，将预算分散到不同结果中，以生成更具结构化的投注方案，并辅助用户评估整体回报覆盖情况。

> Note / 说明  
> This project is a calculation and analysis tool. It does **not** guarantee profit and should be treated as a technical utility rather than financial advice.  
> 本项目是一个计算与分析工具，**不保证盈利**，应视为技术型辅助工具，而非任何形式的收益承诺。

---

## 📁 Project Structure / 项目结构

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   └── HomeView.vue
│   ├── App.vue
│   └── main.js
├── package.json
└── vite.config.js
```

---

## 🖥️ UI Notes / 界面说明

- The project uses a single main page as the core working area  
  项目以单个主页面作为核心操作区域

- Odds inputs are displayed for all goal-result ranges from `0` to `7+`  
  页面展示 `0` 到 `7+` 各进球结果的赔率输入框

- The result area presents allocation data in a tabular form  
  结果区域以表格形式展示投注分配数据

- Input errors are visually highlighted for easier correction  
  输入错误会通过视觉反馈高亮提示，方便纠正

---

## 🔌 Data Source / 数据来源

Match and odds data are retrieved from the public Sporttery football API used in the project code.

项目中的比赛与赔率数据来源于代码中调用的公开 Sporttery 足球数据接口。

---

## 🚀 Getting Started / 安装与启动

Install dependencies:

安装依赖：

```bash
npm install
```

Run the development server:

启动开发环境：

```bash
npm run dev
```

Build for production:

构建生产版本：

```bash
npm run build
```

Preview the production build:

预览生产构建结果：

```bash
npm run preview
```

Run unit tests:

运行单元测试：

```bash
npm run test:unit
```

---

## 🛠️ Development Notes / 开发说明

- Built with **Vite** for fast local development  
  使用 **Vite** 提供快速本地开发体验

- Uses **Vue Router** for route management  
  使用 **Vue Router** 进行路由管理

- Uses **Naive UI** for UI components and layout  
  使用 **Naive UI** 作为主要组件库与布局方案

- Uses **Axios** for remote data requests  
  使用 **Axios** 进行远程数据请求

---

## 📄 License / 许可证

This project is licensed under the [MIT License](./LICENSE).

本项目基于 [MIT License](./LICENSE) 开源。

