# DESIGN.md

## 视觉主题

- 产品家族：继承 Pulse 视觉系统
- 平台风格：iOS 26 原生 Liquid Glass
- 关键词：实时能量预算、健康仪表盘、轻量科技、克制高级、运动感
- 整体气质：像 Apple Health + Apple Fitness + visionOS 空间深度
- 应避免：卡通减肥 App、女性化食谱 App、财务记账式流水账、过度装饰的食物插画、扁平 iOS 7 风格模糊

## Liquid Glass 设计核心原则（iOS 26）

Liquid Glass 不是简单的半透明模糊，而是一种**具有物理真实感的材质**：

1. **反射与折射（Reflection & Refraction）**：像真实玻璃一样反射和折射周围环境内容
2. **动态镜面高光（Dynamic Specular Highlights）**：边缘和表面有随光线角度变化的高光
3. **颜色由环境决定（Environment-Adaptive Color）**：玻璃颜色由背后内容决定，在明暗环境中智能适应
4. **真实厚度感（Physical Thickness）**：有层次感的深度，不是一层薄纸
5. **visionOS 启发的空间深度（Spatial Depth）**：控件有明确的 Z 轴空间层次
6. **实时渲染（Real-time Rendering）**：响应运动的动态光影效果

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
  - 背景：系统背景（让 Liquid Glass 自动折射）
  - 表面：Liquid Glass material（`.thinMaterial` / `.ultraThinMaterial` / `.regularMaterial`）
  - 边缘高光：白色（20-40% opacity）用于 specular highlights
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
- 卡片内边距：18pt（更厚的玻璃需要更多内部空间）
- 卡片圆角：24pt（大卡片，连续曲线）/ 20pt（标准卡片）/ 16pt（小卡片/芯片）
- 移动端布局原则：垂直滚动，单栏布局，卡片堆叠，强调空间深度
- 底栏高度：系统 Tab Bar 高度 + 安全区

## 组件风格 — Liquid Glass 实现规范

### Liquid Glass Card（核心容器）
- 使用 **多层叠加** 实现真实玻璃感：
  - 底层：`.thinMaterial` / `.regularMaterial` / `.ultraThinMaterial`
  - 内层折射：微弱白色描边（8% opacity）模拟光线穿过玻璃
  - 边缘高光：多层描边叠加——
    - 第一层：白色 `0.3` opacity（主高光）
    - 第二层：渐变描边（`0.4` → `0.05` → `0.0`）从 topLeading 到 bottom，模拟角度反射
  - 顶部表面反射：`.overlay` 渐变（`0.18` → `0.0` 从 top 到 center），模拟光源照射
- 阴影：使用 `.shadow` 深色低 opacity（`0.12`），radius 16pt，y 8pt，创造深度感
- 圆角：`.continuous` 圆角，24pt（主卡片）

### Glass Button / Pill
- 胶囊形，使用 `.ultraThinMaterial` 或 `.regularMaterial`（prominent）
- 边缘 specular highlight：渐变描边 `0.4` → `0.1` → `0.0`
- 顶部表面反射：渐变 overlay
- 阴影：`0.1` opacity，radius 8pt

### Glass Circle Button（Record Tab 加号）
- 使用 `.regularMaterial` 获得更厚的玻璃感
- 多层环形描边：
  - 基础描边：白色 `0.3` opacity
  - 角度高光：AngularGradient 从 `0.5` → `0.1` → `0.0` → `0.2`
- 顶部径向反射：RadialGradient 从 topLeading 向外扩散
- 阴影：radius 12pt，创造浮动感

### Glass Search Bar
- 背景：`.ultraThinMaterial`
- 边缘：双层描边——基础白色 `0.3` + 渐变高光 `0.35` → `0.08`
- 顶部反射：渐变 overlay `0.1` → `0.0`

### Glass Icon Container
- 背景：圆形 `.ultraThinMaterial`
- 边缘：白色 `0.25` opacity 描边
- 顶部反射：RadialGradient 从 topLeading

### Glass Progress Bar
- 轨道：`.ultraThinMaterial` + 白色边缘描边 `0.15`
- 填充：LinearGradient 主色 + 顶部高光 overlay（白色 `0.25` → `0.0`）
- 创造"填充的液态玻璃"效果

### Glass Energy Ring
- 背景环：`.ultraThinMaterial` stroke
- 填充环：AngularGradient（主色变化）+ 动画
- 镜面高光：白色 `0.3` opacity 的叠加环，带 blur(2)
- 动画：`easeInOut` 1.2 秒平滑过渡

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
- 玻璃动画原则：所有运动需要感觉"物理可信"——玻璃材质应该有重量感和阻尼感

## 可访问性

- 玻璃背景上必须保证文字对比度（使用 Material 自动处理，但需测试）
- 关键营养数字不能只依赖颜色区分（使用文字标签 + 颜色）
- 支持 Reduce Transparency：准备纯色 fallback（当 `.ultraThinMaterial` 等失效时）
- 支持 Reduce Motion：禁用玻璃折射动画，保留基本状态
- 超标、缺口、目标变化使用中性语言（见文案约束）

## Do / Don't

- Do：使用多层叠加实现真实玻璃质感（material + 内折射 + 边缘高光 + 表面反射）
- Do：使用 `.continuous` 圆角（超椭圆曲线）
- Do：使用 AngularGradient 和 RadialGradient 创造动态反射效果
- Do：使用 `.shadow` 创造空间深度感（radius 16+）
- Do：保持页面信息密度适中，卡片间有足够呼吸感（20pt+）
- Do：使用 SF Symbols 保持一致性
- Don't：只用一层 `.thinMaterial` + 简单描边——那不是 Liquid Glass
- Don't：自己硬画伪玻璃效果（如手动 blur + 半透明 layer）——使用系统 Material API
- Don't：使用大面积卡通插画
- Don't：使用密集表格布局
- Don't：使用高饱和度红色表达"失败"
- Don't：圆角过小（< 16pt）——Liquid Glass 需要大圆角展现连续折射

## 参考实现技术

- 使用 SwiftUI 原生 Material API 作为基础层：`.background(.thinMaterial)` / `.background(.regularMaterial)`
- 使用 `.overlay` + `.clipShape` 实现边缘高光和表面反射
- 使用 `LinearGradient` / `AngularGradient` / `RadialGradient` 创建动态光照
- 使用 `.stroke` + 多层描边实现折射和反射边缘
- 使用 `.shadow` 创造空间深度
- 使用 `Color.clear` + `background` + `overlay` 模式构建完整玻璃组件
- 系统 `TabView` 使用原生 `.tabBar` 材质，在 iOS 26 中会自动升级为 Liquid Glass
- 圆形进度使用 `Shape` + `trim(from:to:)` + `.stroke(style:)` + `AngularGradient` + 白色高光 overlay

## 与 visionOS 的关联

Liquid Glass 是从 visionOS 中提炼出的设计语言。核心差异：
- visionOS：全空间计算，玻璃面板悬浮在真实空间中
- iOS 26：玻璃材质在 2D 屏幕上模拟 3D 深度感
- 共同点：材质反射/折射、空间层次、边缘高光、物理真实感
- 在 iOS 上实现时，通过 shadow + overlay gradients + 多层描边来模拟 visionOS 的空间玻璃效果
