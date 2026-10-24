# 实现拍照留档AI识别份量估算与确认入账流程

- ID：`0.3.0-API-C-000`。
- 类型：`API`。
- 状态：进行中（原文同时包含已完成与未完成项）。
- 版本管理：Git。
- 实施提交：未核实（现有记录未提供可直接对应本任务的实施提交；来源快照、当前 HEAD 和文档迁移提交不代替实施版本）。
- 来源：`REQUIREMENTS.md` @ `7cc7662690da9954451252d2e452a4e1737274a2`；标题路径：任务清单 / Phase - v0.3.0 - iOS Swift App / API-C：拍照与 AI 记录。
- 原稳定 ID：`0.3.0-API-C-000`, `0.3.0-API-C-001`, `0.3.0-API-C-002`, `0.3.0-API-C-003`, `0.3.0-API-C-004`, `0.3.0-API-C-005`, `0.3.0-API-C-006`, `0.3.0-API-C-007`, `0.3.0-API-C-008`, `0.3.0-API-C-009`, `0.3.0-API-C-010`, `0.3.0-API-C-011`；不改写或重编号这些既有 ID。
- 迁移文件来源：`issue/issue-0.3.0-API-C-000-API-ai-versioncontrolid.md`（改名前工作副本；基准 HEAD `1faab300f862fc674278a618d28220ef33f84529`，不作为实施版本；SHA-256 `c2592642ff15029d24cbd41dfb7bbd0488879472ef8f607a6194bddddbfbed02`）。

## 当前需求与范围

- [ ] [0.3.0-API-C-000] 实现拍照与 AI 记录流程 #feature #P1 #phase-4（原 ID：PHOTO-A-000）（原 ID：0.6.0-API-B-000）
  - Multica 同步：TB-31（d3fd530c-fc67-4673-994e-3f6085c26f59），状态 todo，负责人 Antigravity，版本 tag `v0.3.0`。
  - [x] [0.3.0-API-C-001] 用户可以在 Record 页面拍照 #phase-4（原 ID：PHOTO-A-001）（原 ID：0.6.0-API-B-001）
    - 实现：`Intake/Components/CameraCaptureSheet.swift` 封装 `UIImagePickerController(sourceType: .camera)` 为 `UIViewControllerRepresentable`；RecordView 通过 `fullScreenCover` 弹出，权限通过 `AVCaptureDevice.requestAccess(for: .video)` 走 async 流程，被拒时弹 alert 引导去 Settings；Info.plist 加 `NSCameraUsageDescription` / `NSPhotoLibraryUsageDescription` / `NSPhotoLibraryAddUsageDescription` / `NSMicrophoneUsageDescription`（2026-06-26 接入）
  - [x] [0.3.0-API-C-002] 用户可以只拍照不识别 #phase-4（原 ID：PHOTO-A-002）（原 ID：0.6.0-API-B-002）
    - 实现：拍完或选完图后直接显示在 camera area 右上角带 retake 按钮，**不**自动触发 AI 识别，符合"用户确认才入账"原则
  - [ ] [0.3.0-API-C-002] 用户可以只拍照不识别 #phase-4（原 ID：PHOTO-A-002）（原 ID：0.6.0-API-B-002）
  - [ ] [0.3.0-API-C-003] 用户可以关闭自动填充 #phase-4（原 ID：PHOTO-A-003）（原 ID：0.6.0-API-B-003）
  - [ ] [0.3.0-API-C-004] 免费版拍照后进入手动选择食物流程 #phase-4（原 ID：PHOTO-A-004）（原 ID：0.6.0-API-B-004）
  - [ ] [0.3.0-API-C-005] 付费版可使用 AI 识别食物 #phase-4（原 ID：PHOTO-A-005）（原 ID：0.6.0-API-B-005）
  - [ ] [0.3.0-API-C-006] AI 可匹配营养数据库 #phase-4（原 ID：PHOTO-A-006）（原 ID：0.6.0-API-B-006）
  - [ ] [0.3.0-API-C-007] AI 可估算份量 #phase-4（原 ID：PHOTO-A-007）（原 ID：0.6.0-API-B-007）
  - [ ] [0.3.0-API-C-008] AI 结果必须经用户确认后才能入账 #phase-4（原 ID：PHOTO-A-008）（原 ID：0.6.0-API-B-008）
  - [ ] [0.3.0-API-C-009] 用户可以修改 AI 识别结果 #phase-4（原 ID：PHOTO-A-009）（原 ID：0.6.0-API-B-009）
  - [ ] [0.3.0-API-C-010] 用户可以删除 AI 识别出的食物项 #phase-4（原 ID：PHOTO-A-010）（原 ID：0.6.0-API-B-010）
  - [ ] [0.3.0-API-C-011] AI 低置信度时提示用户手动确认 #phase-4（原 ID：PHOTO-A-011）（原 ID：0.6.0-API-B-011）

## 检查与验收边界

以上勾选与结果沿用迁移前的当前需求文档；历史记录中的实现、测试、编译、视觉与用户验收彼此独立。本次只迁移文档并检查结构 / 引用，没有重新执行产品构建或用户验收，也没有凭历史日志新增完成勾选。

## Comments

### 2026-10-23 17:44:33 UTC — Agent（文档迁移）

按原有功能 / 工作目标标题拆分需求，保留原 ID、勾选、依赖、最新补充及来源。没有稳定根 ID或旧 ID 在不同上下文重用时，采用由来源路径和标题确定的迁移 Issue ID，原 ID 仍在正文保留。完整旧内容可从来源版本读取；独有未提交内容的版本化副本见迁移映射。

### 20260626172327-utcp8-mvs.md — 历史证据迁移

来源：`agent-log/20260626172327-utcp8-mvs.md` @ `7cc7662690da9954451252d2e452a4e1737274a2`。日期 / 时区沿用原记录；以下摘录不自动改变当前完成状态。

#### 用户原始 prompt

> 可以，但还有个问题：相机权限现在没用；先搞定ios

#### 4. 构建验证

```
xcodebuild -project Intake.xcodeproj -scheme Intake \
  -destination 'platform=iOS Simulator,id=076E90E1-B3D5-41E6-B31A-F04ECCFB3F6B' \
  -configuration Debug build

→ ** BUILD SUCCEEDED ** （0 警告 0 错误）
```

App 实际启动验证：
- `xcrun simctl install booted Intake.app` 成功
- `xcrun simctl launch booted com.intake.app` 返回 PID 62766
- 截图确认 Log 页正常渲染（Liquid Glass 风格能量环、日期条、底部 tab）

视觉点击验证受限（AppleScript 模拟器无障碍权限、simctl 没有 tap 子命令），但 build + 启动 + 渲染全过；按钮 wiring 在代码层已 review 完毕。

#### 5. 没动 / 留给后续

- **Voice 按钮**：仍是 `action: {}`，用户说"先搞定ios"但只点名相机；Voice 涉及到 Speech framework 和 NSMicrophoneUsageDescription（已经加），但 iOS 26 的 SpeechAnalyzer + AVAudioApplication 流程比较重，先放
- **图片识别**：相机拍完 / 选完图后，**没有**接 AI 识别（mock 也好真也好），只是把图显示在 camera area。这块是下一轮"AI 拍照识别"的内容
- **保存到相册**：Info.plist 加了 `NSPhotoLibraryAddUsageDescription` 但代码没调 `UIImageWriteToSavedPhotosAlbum` —— 后续真用再加

#### 完成工作

- Info.plist 补齐 4 个 usage description
- 新建 `CameraCaptureSheet.swift` 桥接 UIImagePickerController + 权限封装
- RecordView 重写：相机/相册/拍照全 wiring，按钮带 accessibilityLabel
- pbxproj 把新文件加进 build

#### 更新的需求 ID

待补充到 `REQUIREMENTS.md`（v0.3.0 iOS 区块）：
- `[0.3.0-API-C-001]` 相机权限与真实启动（新增）

#### 验证方式

- `xcodebuild ... build` 通过，0 警告
- App 实际启动到 Log 页（截图已确认）
- 相机/相册按钮代码层 wiring 已 review（handleCameraTap → CameraPermission → fullScreenCover → UIImagePickerController → onResult → capturedImage）
- Info.plist 4 个 usage description 全部存在

#### 备注

- 这次没有 commit，等用户验收
- iOS 模拟器没相机硬件，`UIImagePickerController.isSourceTypeAvailable(.camera)` 在模拟器上返回 false → 会走 `permissionAlert = .unsupported` 分支，提示用 library。**真机**才有真相机预览。
- iOS 26 Xcode 26 build phases 里有 `appintentsmetadataprocessor` 跳过的 warning（无 AppIntents framework 依赖），跟我们的改动无关
- 顺手把 main actor 警告修了（`CameraPermission.current` / `request` 标 `@MainActor`），符合 Swift 6 方向

### 2026-10-24 07:11:21 UTC — Agent（纠正迁移命名）

按原语言和具体任务范围纠正文件名；保留原 ID、勾选、依赖、来源、最新补充和验收边界。实施版本未核实，省略版本后缀。
