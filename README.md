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
- Liquid Glass 视觉风格应用（使用系统 Material API）
- 各页面包含完整的 Mock 数据展示

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
    ├── Models/
    │   └── DataModels.swift
    └── Components/
        └── SharedComponents.swift
```

## 文档入口

- Agent 协作规范：`AGENTS.md`
- 需求与验收追踪：`REQUIREMENTS.md`
- 视觉规范：`DESIGN.md`
- 执行日志：`agent-log/`

## 快速开始

1. 在 Xcode 中打开 `Intake.xcodeproj`
2. 选择 iOS 17+ 模拟器或真机
3. 按 Cmd+R 运行

## 运行与验证

- 开发：Xcode 15.0+，iOS 17.0+ 模拟器/真机
- 测试：Cmd+U（当前无测试文件，需后续补充）
- 构建：Cmd+B
- 发布：Xcode Archive & Distribute

## 边界与限制

- 当前为 UI 首页实现，点击和跳转功能暂未实现（按需求要求）
- 数据为 Mock 数据，未接入真实 Apple Health 和营养数据库
- AI 拍照识别、语音输入等能力为 UI 占位
- 未实现订阅/付费边界、数据同步、云存储等后端功能
