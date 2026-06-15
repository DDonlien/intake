# DESIGN.md

## 视觉主题

- 产品家族：继承 Pulse 视觉系统
- 平台风格：iOS 原生 Liquid Glass
- 关键词：实时能量预算、健康仪表盘、轻量科技、克制高级、运动感
- 整体气质：像 Apple Health + Apple Fitness + Spotify Now Playing
- 应避免：卡通减肥 App、女性化食谱 App、财务记账式流水账、过度装饰的食物插画

## 色彩

- 主背景：浅色优先（iOS 系统浅色背景），深色模式可扩展
- 主色：Energy Lime / 柠檬能量绿，用于剩余热量、主要 CTA、正向状态
- 辅助色：
  - Protein Blue / 蛋白质蓝：蛋白质进度
  - Carb Amber / 碳水琥珀：碳水信息
  - Fat Cream / 脂肪奶油色：脂肪信息
  - Deficit Purple / 缺口紫：热量缺口
- 语义色：
  - 成功：目标达成
  - 警告：预算接近用完
  - 错误：不是“失败”，只表达“超出预算”
  - 信息：HealthKit 同步、AI 估算、数据来源
- 中性色：
  - 背景：系统浅色背景（`systemBackground`）
  - 表面：半透明玻璃卡片（`ultraThinMaterial` / `thinMaterial`）
  - 边框：微弱边缘高光（白色 10-20% opacity）
  - 正文：系统标签色（`primary` / `secondary`）

## 字体

- 标题字体：系统字体（`SF Pro` / `system`）
- 正文字体：系统字体
- 等宽字体：SF Mono（用于数值显示）
- 标题层级：
  - H1：大号粗体（页面标题如 "Me" / "Log" / "Bank"）
  - H2：中等加粗（区块标题如 "Energy Ring" / "Progress" / "Meals"）
  - H3：小标题（卡片标题、列表项名称）
- 正文：常规 17pt
- 辅助文字：小字号 13-14pt，次要标签

## 间距与布局

- 基础间距单位：8pt
- 页面边距：20pt 左右
- 卡片间距：16pt
- 卡片内边距：16pt
- 卡片圆角：16pt（大卡片）/ 12pt（小卡片）/ 24pt（按钮/圆形）
- 移动端布局原则：垂直滚动，单栏布局，卡片堆叠
- 底栏高度：系统 Tab Bar 高度 + 安全区

## 组件风格

### 按钮
- 主按钮：胶囊形，高亮玻璃材质（`.ultraThinMaterial` + 白色 10% overlay），带轻微边缘高光
- 次按钮：小型 glass chip，圆角 12pt
- 禁用态：透明度降低，不响应点击

### 卡片
- 主卡片：大圆角 16pt，半透明背景（`.thinMaterial`），背景模糊，轻微柔和投影（`shadow(color:opacity:radius:)` 使用低 opacity 暗色）
- 列表卡片：小圆角 12pt，`.thinMaterial`，1pt 边缘高光（白色 15%）
- 选中态：玻璃厚度增加（`.regularMaterial`），边框高亮

### 导航
- 底栏：iOS 原生 Liquid Glass Tab Bar，使用系统 `.tabBar` 材质
- Tab 顺序：Me（最左）→ Log → Bank → Record（最右，圆形加号）
- Record 加号：圆形按钮，使用更强的 Liquid Glass 质感（`.ultraThinMaterial` + 亮色高光），不显示文字

### 弹窗 / Sheet
- 使用系统 sheet（`.sheet`），避免自定义复杂弹窗
- 使用系统 `.presentationBackground` 材质

## 图标与图像

- 图标风格：SF Symbols，线框风格，2pt 线宽
- 系统图标使用：person.fill, chart.bar.fill, building.columns.fill, plus.circle.fill
- 餐次图标：sunrise（早餐）、sun.max（午餐）、moon（晚餐）、cup.and.saucer（加餐）
- 标签图标：flame（活动能量）、drop（静息能量）、shoe（步数）、bolt（运动）

## 动效

- 数据变化：平滑数字滚动（无具体实现要求时，使用系统默认过渡）
- 页面切换：系统 Tab 切换动画
- 卡片交互：轻微缩放反馈（`scaleEffect` 0.97-1.0）
- 玻璃效果：使用系统 `Material` 和 `VisualEffectView`，避免自定义复杂模糊
- 禁止使用：夸张弹跳、游戏化爆炸动效、卡通动画

## 可访问性

- 玻璃背景上必须保证文字对比度（使用 `Material` 自动处理）
- 关键营养数字不能只依赖颜色区分（使用文字标签 + 颜色）
- 支持 Reduce Transparency / Reduce Motion（使用系统 `.accessibilityReduceTransparency` 适配）
- 超标、缺口、目标变化使用中性语言（见文案约束）

## Do / Don't

- Do：使用系统 `Material` 实现玻璃质感
- Do：使用系统 `.tabBar` 和底栏
- Do：保持页面信息密度适中，卡片间有足够呼吸感
- Do：使用 SF Symbols 保持一致性
- Don't：自己硬画伪玻璃效果（如手动写 blur + 半透明 layer）
- Don't：使用大面积卡通插画
- Don't：使用密集表格布局
- Don't：使用高饱和度红色表达“失败”

## 参考实现

- 使用 SwiftUI 原生 Material API：`.background(.ultraThinMaterial)` / `.background(.thinMaterial)` / `.background(.regularMaterial)`
- 使用系统 `TabView` 和 `tabItem`
- 使用系统 `NavigationStack` 和 `.toolbarBackground(.visible, for: .navigationBar)`
- 使用 `.overlay` + `.clipShape` 实现边缘高光
- 使用 `Color.clear` + `background` 模式构建玻璃卡片
- 圆形进度使用 `Shape` + `trim(from:to:)` + `.stroke(style:)` + `.angularGradient`
