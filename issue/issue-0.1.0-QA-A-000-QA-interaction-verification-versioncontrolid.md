# QA-A：交互与设计闭环验证

- ID：`0.1.0-QA-A-000`。
- 类型：`QA`。
- 状态：已完成（沿用原需求记录；本轮未重新执行产品验收）。
- 版本管理标识：`versioncontrolid`（含义待定义，不推断为 commit、branch 或 change）。
- 来源：`REQUIREMENTS.md` @ `7cc7662690da9954451252d2e452a4e1737274a2`；标题路径：任务清单 / Phase - v0.1.0 - TS 假页面（验证交互和设计） / QA-A：交互与设计闭环验证。
- 原稳定 ID：`0.1.0-QA-A-000`, `0.1.0-QA-A-001`, `0.1.0-QA-A-002`, `0.1.0-QA-A-003`, `0.1.0-QA-A-004`, `0.1.0-QA-A-005`, `0.1.0-QA-A-006`, `0.1.0-QA-A-007`, `0.1.0-QA-A-008`, `0.1.0-QA-A-009`, `0.1.0-QA-A-010`, `0.1.0-QA-A-011`, `0.1.0-QA-A-012`, `0.1.0-QA-A-013`, `0.1.0-QA-A-014`, `0.1.0-QA-A-015`, `0.1.0-QA-A-016`, `0.1.0-QA-A-017`, `0.1.0-QA-A-018`, `0.1.0-QA-A-019`, `0.1.0-QA-A-020`, `0.1.0-QA-A-021`, `0.1.0-QA-A-022`, `0.1.0-QA-A-023`, `0.1.0-QA-A-024`, `0.1.0-QA-A-025`, `0.1.0-QA-A-026`, `0.1.0-QA-A-027`, `0.1.0-QA-A-028`, `0.1.0-QA-A-029`, `0.1.0-QA-A-030`, `0.1.0-QA-A-031`, `0.1.0-QA-A-032`, `0.1.0-QA-A-033`；不改写或重编号这些既有 ID。

## 当前需求与范围

- [x] [0.1.0-QA-A-000] 在 TS Web 应用中验证核心饮食记录闭环 #feature #P0.1 #phase-0-1（原 ID：WEB-B-000）
  - Multica 同步：TB-12（db84cb89-35b7-438e-a7f4-9b5ad0f74b9b），状态 done，负责人 MiniMax，版本 tag `v0.1.0`。
  - [x] [0.1.0-QA-A-001] 验证 Log 页面功能 #phase-0-1（原 ID：WEB-B-001）
    - [x] [0.1.0-QA-A-002] 日期条可表达每日热量缺口、溢出和过低摄入状态
    - [x] [0.1.0-QA-A-003] 日期条缺口数值按摄入减当日目标显示，填充比例按摄入占当日目标计算
    - [x] [0.1.0-QA-A-004] Energy Budget 可根据摄入、目标和消耗数据更新 — Energy Ring 使用 `budget - totals.kcal` 实时计算剩余，budget 含目标 + 活动消耗
    - [x] [0.1.0-QA-A-005] Macros 可展示蛋白质、碳水和脂肪进度 — MacroCard 显示 Protein/Carbs/Fat 的当前值、目标和百分比进度
    - [x] [0.1.0-QA-A-006] Move today 可展示活动、运动和步数摘要 — FitnessCard 展示 Active kcal、Exercise min、Steps
    - [x] [0.1.0-QA-A-007] Meals 使用外层大卡囊括所有餐次 — MealsCard 外层 glass card 包裹所有 meal 卡片
    - [x] [0.1.0-QA-A-008] 每张 Meal 卡可收起和展开 — MealCard 支持 expanded 状态切换
    - [x] [0.1.0-QA-A-009] 每张 Meal 卡可长按拖拽移动顺序
    - [x] [0.1.0-QA-A-010] Snack 每次新增都是独立 Meal 实例，并显示为 Snack 1、Snack 2
    - [x] [0.1.0-QA-A-011] 展开 Meal 后可查看餐内食物明细 — 展开态显示食物 emoji、名称、serving、品牌和热量
    - [x] [0.1.0-QA-A-012] 餐内每道菜可长按拖拽调整顺序或移动到其他 Meal
    - [x] [0.1.0-QA-A-013] 可从 Meal 进入添加食物流程 — 展开 Meal 后"+ "按钮导航到 Add 页面
  - [x] [0.1.0-QA-A-014] 验证 Add 页面功能 #phase-0-1（原 ID：WEB-B-002）
    - [x] [0.1.0-QA-A-015] Add 页面以全屏沉浸式记录场景打开 — 全屏相机预览，隐藏底栏
    - [x] [0.1.0-QA-A-016] 支持关闭后返回进入 Add 前的页面 — returnTabRef 追踪来源页，关闭时导航回退
    - [x] [0.1.0-QA-A-017] 支持选择或展示当前餐次 — 下拉选择器支持所有餐次及 New Snack
    - [x] [0.1.0-QA-A-018] 识别结果拉篮可按阈值拖动展开或收起 — 拖拽阈值 ±72px，松手吸附到 peek/expanded
    - [x] [0.1.0-QA-A-019] 新识别食物可编辑候选项和份量 — MealEditorFoodRow 份量加减和输入
    - [x] [0.1.0-QA-A-020] 份量变化可联动热量 — kcal = kcalPerServing × quantity 实时计算
    - [x] [0.1.0-QA-A-021] 可从搜索、Recent 和 All foods 中选择食物加入餐次 — FoodMiniList 展示 Recent 和搜索结果
    - [x] [0.1.0-QA-A-022] 可区分新识别食物与已加入餐次食物 — "Is new" 和 "Saved" 标签区分
  - [x] [0.1.0-QA-A-023] 验证 Bank 页面功能 #phase-0-1（原 ID：WEB-B-003）
    - [x] [0.1.0-QA-A-024] 食物列表可展示 Recent foods 和完整食物仓库 — 顶部 Recent foods，下方 Food library
    - [x] [0.1.0-QA-A-025] 食物卡可展开查看营养详情 — 展开显示 protein/carbs/fat 明细
    - [x] [0.1.0-QA-A-026] 底部搜索和筛选控件在 Bank 页悬浮锁定 — BankControls 固定在 scroll 区域外
    - [x] [0.1.0-QA-A-027] 筛选 Tab 可过滤 All、Foods、Meals、Brands、Custom — 含 7 个 filter chip（含 Recent 和 Favorites）
    - [x] [0.1.0-QA-A-028] 搜索入口位置和交互适合单手操作 — 搜索框位于底部 dock 区，靠近底栏
  - [x] [0.1.0-QA-A-029] 验证 Me 页面功能 #phase-0-1（原 ID：WEB-B-004）
    - [x] [0.1.0-QA-A-030] Goal summary 数字可在原布局内编辑 — SummaryTile 编辑态显示 input，保持 2x2 布局
    - [x] [0.1.0-QA-A-031] 目标字段更新后可影响预算和宏量营养展示 — 保存后 goals 更新，Log 页 budget 和 macros 实时反映
    - [x] [0.1.0-QA-A-032] Health data 可展示逐项同步状态 — Body data 显示 Synced/Custom 标签
    - [x] [0.1.0-QA-A-033] Settings 入口保持轻量列表结构 — 设置项为 SettingsRow/ActionRow 列表

## 检查与验收边界

以上勾选与结果沿用迁移前的当前需求文档；历史记录中的实现、测试、编译、视觉与用户验收彼此独立。本次只迁移文档并检查结构 / 引用，没有重新执行产品构建或用户验收，也没有凭历史日志新增完成勾选。

## Comments

### 2026-10-23 17:44:33 UTC — Agent（文档迁移）

按原有功能 / 工作目标标题拆分需求，保留原 ID、勾选、依赖、最新补充及来源。没有稳定根 ID或旧 ID 在不同上下文重用时，采用由来源路径和标题确定的迁移 Issue ID，原 ID 仍在正文保留。完整旧内容可从来源版本读取；独有未提交内容的版本化副本见迁移映射。
