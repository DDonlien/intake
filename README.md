# Intake

Track meals, sync real calories burned, and manage your daily nutrition budget with AI.

## 项目概述

Intake 是一款 iOS 饮食摄入与实时热量预算 App。通过 Apple 健康同步身体数据、静息消耗、活动消耗和运动数据，结合营养数据库、手动饮食记录、语音输入与 AI 拍照识别，帮助用户管理每日热量预算、蛋白质目标和长期饮食趋势。

- 产品名称：Intake
- 一句话简介：AI-powered nutrition budget for everyday meals.
- 解决的问题：实时热量预算管理、蛋白质目标追踪、饮食记录
- 目标用户：关注每日热量预算和蛋白质目标的 iOS 用户
- 当前状态：MVP 界面实现阶段，4 个核心页面已实现可切换

## 当前能力

- 4 个核心页面首页已实现：Log（默认首页）、Me、Bank、Record
- 底栏 Tab 导航支持 4 页面来回切换
- iOS 26 原生 Liquid Glass 视觉风格（使用 `.glassEffect()`、`.buttonStyle(.glass)`、`GlassEffectContainer` 等 API）
- 各页面包含完整的 Mock 数据展示
- `reference/ts/` 已升级为 React + TypeScript 本地优先 Web App 原型，包含邮箱注册/登录、本机分用户数据、Log/Me/Bank/Add 功能闭环和 iOS 主屏幕 PWA 元信息，用于先在 Web 中验证 P0.1 体验

## 页面结构

- **Log（默认首页）**：日期切换卡片、语音输入入口、Energy Ring 能量环、宏量营养进度、Health Sync 健康同步、Meals 餐次列表
- **Me**：个人资料、Goal Summary 目标摘要、Plan Settings 计划设置、Health Data 健康数据、Log & Trends 趋势入口、Favorites 收藏、Settings 设置
- **Bank**：食物搜索、筛选标签（All/Foods/Meals/Brands/Custom/Recent）、食物目录列表、展开查看营养详情
- **Record**：拍照区域、餐次选择、Auto-fill 开关、搜索框、快捷操作（Scan/Voice/Favorites/Recent/Custom）、最近食物列表

## 目录结构

```text
.
├── AGENTS.md
├── README.md
├── REQUIREMENTS.md
├── DESIGN.md
├── agent-log/
├── reference/
│   ├── ts/
│   │   ├── package.json
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── styles.css
│   │       └── vite-env.d.ts
│   ├── h5/
│   │   └── intake_liquid_glass_h5_v7_progress.html
│   └── image/
│       ├── me.png
│       ├── log.png
│       ├── bank.png
│       └── record.png
├── Intake.xcodeproj/
│   ├── project.pbxproj
│   └── xcshareddata/xcschemes/
│       └── Intake.xcscheme
└── Intake/
    ├── IntakeApp.swift
    ├── ContentView.swift
    ├── Info.plist
    ├── Assets.xcassets/
    ├── Preview Content/
    ├── Views/
    │   ├── LogView.swift
    │   ├── MeView.swift
    │   ├── BankView.swift
    │   └── RecordView.swift
    └── Models/
        └── DataModels.swift
```

## 文档入口

- Agent 协作规范：`AGENTS.md`
- 需求与验收追踪：`REQUIREMENTS.md`
- 视觉规范：`DESIGN.md`
- 执行日志：`agent-log/`

## 快速开始

1. 在 Xcode 16+ 中打开 `Intake.xcodeproj`
2. 选择 iOS 26+ 模拟器或真机
3. 按 Cmd+R 运行

## 运行与验证

- 开发：Xcode 16.0+，iOS 26.0+ 模拟器/真机
- 测试：Cmd+U（当前无测试文件，需后续补充）
- 构建：Cmd+B
- 发布：Xcode Archive & Distribute
- TS 原型开发：进入 `reference/ts/` 后执行 `npm install`、`npm run dev`
- TS 原型生产构建：进入 `reference/ts/` 后执行 `npm run build`
- TS 原型本地静态预览：构建后可执行 `python3 -m http.server 5173 --bind 127.0.0.1 --directory dist`
- TS 原型支持 hash 直达页面：`#log`、`#me`、`#bank`、`#add`

## 边界与限制

- SwiftUI 主应用当前为 UI 首页实现，点击和跳转功能暂未实现（按需求要求）；`reference/ts/` 用于先验证可操作的 Web 功能闭环
- 数据为 Mock 数据，未接入真实 Apple Health 和营养数据库
- AI 拍照识别、语音输入等能力为 UI 占位
- 未实现订阅/付费边界、数据同步、云存储等后端功能
- 需要 iOS 26.0+ SDK（Xcode 16+）编译运行，使用 `.glassEffect()` 等原生 Liquid Glass API
