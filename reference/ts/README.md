# Intake TS Prototype

这是 Intake 的 TypeScript 前端交互原型，放在 `reference/ts/` 下，与主 iOS SwiftUI 工程隔离。

## 运行

```bash
npm install
npm run dev
```

## 画布标准

- 设备画布：`402px × 874px`
- 页面内容：画布内部纵向滚动
- 外层预览：桌面浏览器中居中展示手机画布
- 视觉方向：参考 iOS 26 Liquid Glass，使用半透明材质、柔和高光、空间层级和克制的信息密度

## 工程边界

- 本工程只作为 iOS App 的交互、信息结构和视觉基准原型。
- 本工程不替代 SwiftUI 生产实现。
- 原型资产和 TS 工程文件均应放在 `reference/ts/` 内。
