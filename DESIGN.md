# DESIGN.md

## 视觉主题

- 产品家族：继承 Pulse 视觉系统
- 平台风格：iOS 26 原生 Liquid Glass
- 关键词：实时能量预算、健康仪表盘、轻量科技、克制高级、运动感
- 整体气质：像 Apple Health + Apple Fitness + visionOS 空间深度
- 应避免：卡通减肥 App、女性化食谱 App、财务记账式流水账、过度装饰的食物插画

## Liquid Glass 设计核心原则（iOS 26）

Liquid Glass 是 Apple 在 iOS 26 中引入的动态材质，**不是简单的半透明模糊**，而是具有物理真实感的玻璃材质：

1. **反射与折射（Reflection & Refraction）**：像真实玻璃一样反射和折射周围环境内容
2. **动态镜面高光（Dynamic Specular Highlights）**：边缘和表面有随光线角度变化的高光
3. **颜色由环境决定（Environment-Adaptive Color）**：玻璃颜色由背后内容决定，在明暗环境中智能适应
4. **真实厚度感（Physical Thickness）**：有层次感的深度
5. **visionOS 启发的空间深度（Spatial Depth）**：控件有明确的 Z 轴空间层次
6. **实时渲染（Real-Time Rendering）**：响应运动的动态光影效果

## 实现方式：使用 iOS 26 原生 API（非手动模拟）

### 核心 Modifier
- `.glassEffect()` — 应用默认 Liquid Glass 效果
- `.glassEffect(.regular)` — 标准玻璃厚度
- `.glassEffect(.clear)` — 最轻玻璃，几乎透明
- `.glassEffect(.regular.tint(.color))` — 着色玻璃
- `.glassEffect(.regular.interactive())` — 可交互玻璃（响应触摸/悬停）
- `.glassEffect(.regular, in: .rect(cornerRadius:))` — 自定义形状
- `.glassEffect(.clear, in: .circle)` — 圆形玻璃
- `.glassEffect(.regular, in: .capsule(style: .continuous))` — 胶囊玻璃

### 按钮样式
- `.buttonStyle(.glass)` — 标准玻璃按钮
- `.buttonStyle(.glassProminent)` — 强调玻璃按钮（更高视觉层级）
- `.buttonStyle(.glassProminent).tint(.color)` — 着色强调按钮

### 容器优化
- `GlassEffectContainer { ... }` — 优化同组多个 glass 元素的渲染性能
- 同组玻璃元素应放入 `GlassEffectContainer` 中

### 导航与 Tab Bar
- iOS 26 中 `NavigationStack` 导航栏和 `TabView` 自动应用 Liquid Glass
- 使用新 `Tab` API 替代旧 `tabItem`：
  ```swift
  Tab("Label", systemImage: "icon", value: 0) { ContentView() }
  Tab("Search", systemImage: "magnifyingglass", value: 1, role: .search) { SearchView() }
  ```
- `.tabViewBottomAccessory { ... }` — 在 Tab Bar 上方添加 accessory 视图
- `.tabBarMinimizeBehavior(.onScrollDown)` — 滚动时最小化 Tab Bar
- Toolbar 按钮使用 `.buttonStyle(.glassProminent)` 或 `.buttonStyle(.glass)`

### 背景延伸
- `.backgroundExtensionEffect()` — 将内容延伸到边缘玻璃背景之下
- 用于创建 edge-to-edge 内容体验，让玻璃自然折射背景内容

### Morph 动画
- `glassEffectID("id", in: namespace)` — 标识玻璃元素用于变形动画
- `withAnimation { ... }` + `Namespace` 实现玻璃元素间的平滑过渡

## 色彩

- 主背景：系统背景（浅色/深色自适应），由 Liquid Glass 材质自动折射
- 玻璃材质本身：无固定颜色，由环境内容决定
- 主色：Energy Lime / 柠檬能量绿，用于剩余热量、主要 CTA、正向状态
- 辅助色：
  - Protein Blue：蛋白质进度
  - Carb Amber：碳水信息
  - Fat Cream：脂肪信息
  - Deficit Purple：热量缺口
- 语义色：
  - 成功：目标达成
  - 警告：预算接近用完
  - 错误：不是"失败"，只表达"超出预算"
  - 信息：HealthKit 同步、AI 估算、数据来源
- 中性色：
  - 背景：系统背景
  - 表面：Liquid Glass material（`.glassEffect()` 自动处理）
  - 正文：系统标签色（`primary` / `secondary`）

## 字体

- 标题字体：SF Pro / system
- 正文字体：SF Pro / system
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
- 卡片间距：20pt（更大的呼吸感）
- 卡片内边距：18pt
- 卡片圆角：24pt（大卡片）/ 20pt（标准卡片）/ 16pt（小卡片/芯片）
- 使用 `.continuous` 连续曲线圆角
- 移动端布局原则：垂直滚动，单栏布局，卡片堆叠，强调空间深度
- 底栏高度：系统 Tab Bar 高度 + 安全区（自动 Liquid Glass）

## 组件风格 — 使用原生 API

### 玻璃卡片
- 使用 `.glassEffect(.regular, in: .rect(cornerRadius: 24, style: .continuous))`
- 同组卡片放入 `GlassEffectContainer` 优化性能
- **不需要**手动添加描边、高光、overlay——`.glassEffect()` 自动处理反射、折射、边缘高光
- 内容自然地从玻璃背景中折射出来

### 玻璃按钮
- 使用 `.buttonStyle(.glass)` 或 `.buttonStyle(.glassProminent)`
- 强调按钮使用 `.glassProminent`，可配合 `.tint(.color)` 着色
- **不需要**手动创建 ZStack + Material + stroke

### 玻璃图标容器
- 使用 `.glassEffect(.clear, in: .circle)` 或 `.glassEffect(.clear, in: .rect(cornerRadius:))`
- 小图标使用 `.clear` 获得最轻的玻璃质感

### 玻璃搜索栏
- 使用 `.glassEffect(.regular, in: .rect(cornerRadius: 16, style: .continuous))`
- 直接应用于 HStack + 内容

### 玻璃筛选标签
- 使用 `.glassEffect(.clear, in: .capsule(style: .continuous))` 为未选中
- 使用 `.glassEffect(.regular.tint(.blue), in: .capsule(style: .continuous))` 为选中

### 能量环（自定义）
- 使用 `.ultraThinMaterial` 作为背景环（系统材质）
- 使用 `AngularGradient` + `trim` + `stroke` 创建填充环
- 玻璃中心内容自然折射背景

## 图标与图像

- 图标风格：SF Symbols，线框风格，2pt 线宽
- 系统图标：person.fill, chart.bar.fill, building.columns.fill, plus.circle.fill
- 餐次图标：sunrise（早餐）、sun.max（午餐）、moon（晚餐）、cup.and.saucer（加餐）
- 标签图标：flame（活动能量）、drop（静息能量）、shoe（步数）、bolt（运动）
- 食物使用 emoji 作为占位图，实际应用中替换为照片

## 动效

- 数据变化：平滑数字滚动（系统默认过渡）
- HealthKit 同步后：预算环轻微更新动画（1.2 秒 easeInOut）
- AI 识别过程：扫描/浮动光效（后续实现）
- 餐次保存后：卡片轻微吸附动画
- 禁止使用：夸张弹跳、游戏化爆炸动效
- 玻璃动画原则：使用 `glassEffectID` + `Namespace` + `withAnimation` 实现变形过渡

## 可访问性

- 玻璃背景上必须保证文字对比度（`.glassEffect()` 自动处理，但需测试）
- 关键营养数字不能只依赖颜色区分（使用文字标签 + 颜色）
- 支持 Reduce Transparency：系统会自动降低玻璃透明度
- 支持 Reduce Motion：禁用玻璃折射动画
- 超标、缺口、目标变化使用中性语言（见文案约束）

## Do / Don't

- **Do**：使用 `.glassEffect()` 原生 API——这才是真正的 Liquid Glass
- **Do**：使用 `GlassEffectContainer` 优化同组玻璃元素
- **Do**：使用 `.buttonStyle(.glass)` / `.glassProminent` 而非手动构建
- **Do**：使用新 `Tab` API 替代旧 `tabItem`
- **Do**：保持页面信息密度适中，卡片间有足够呼吸感（20pt+）
- **Do**：使用 SF Symbols 保持一致性
- **Do**：使用 `.continuous` 圆角风格
- **Don't**：手动创建 ZStack + Material + stroke + overlay 模拟玻璃——这不是 Liquid Glass
- **Don't**：手动添加白色描边模拟高光——`.glassEffect()` 自动处理 specular highlights
- **Don't**：使用旧版 `tabItem` API——在 iOS 26 中使用 `Tab`
- **Don't**：使用大面积卡通插画
- **Don't**：使用密集表格布局
- **Don't**：使用高饱和度红色表达"失败"

## 正确的实现示例（iOS 26）

```swift
// ✅ 正确的玻璃卡片
Text("Content")
    .padding(18)
    .glassEffect(.regular, in: .rect(cornerRadius: 24, style: .continuous))

// ✅ 正确的玻璃按钮
Button("Action") { }
    .buttonStyle(.glassProminent)
    .tint(.purple)

// ✅ 正确的玻璃容器
GlassEffectContainer(spacing: 0) {
    Text("Item 1")
        .glassEffect(.regular)
    Text("Item 2")
        .glassEffect(.regular.tint(.yellow))
}

// ✅ 正确的导航
NavigationStack {
    ContentView()
}
.toolbar {
    ToolbarItem(placement: .topBarTrailing) {
        Button("Action", systemImage: "pencil") { }
            .buttonStyle(.glassProminent)
            .tint(.green)
    }
}

// ✅ 正确的 Tab
TabView(selection: $selectedTab) {
    Tab("Log", systemImage: "chart.bar.fill", value: 0) {
        LogView()
    }
    Tab("Search", systemImage: "magnifyingglass", value: 1, role: .search) {
        SearchView()
    }
}

// ❌ 错误的手动模拟（不要这样做）
ZStack {
    RoundedRectangle(cornerRadius: 24)
        .fill(.thinMaterial)  // 这不是 Liquid Glass
    RoundedRectangle(cornerRadius: 24)
        .stroke(.white.opacity(0.3), lineWidth: 1)  // 手动高光不对
    RoundedRectangle(cornerRadius: 24)
        .overlay(
            LinearGradient(...)  // 手动反射不对
        )
}
```

## 版本要求

- iOS 26.0+
- iPadOS 26.0+
- macOS Tahoe (26.0)+
- tvOS 26.0+
- watchOS 26.0+
- Swift 6.0+
- Xcode 16.0+（或支持 iOS 26 SDK 的版本）
