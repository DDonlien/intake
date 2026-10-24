# 配置推送后自动部署Intake至Vercel

- ID：`0.2.0-CI-A-000`。
- 类型：`CI`。
- 状态：已完成（沿用原需求记录；本轮未重新执行产品验收）。
- 版本管理：Git。
- 实施提交：未核实（现有记录未提供可直接对应本任务的实施提交；来源快照、当前 HEAD 和文档迁移提交不代替实施版本）。
- 来源：`REQUIREMENTS.md` @ `7cc7662690da9954451252d2e452a4e1737274a2`；标题路径：任务清单 / Phase - v0.2.0 - 可用的 TS Web 应用（数据、账户体系、注册） / CI-A：Vercel 自动部署。
- 原稳定 ID：`0.2.0-CI-A-000`, `0.2.0-CI-A-001`, `0.2.0-CI-A-002`, `0.2.0-CI-A-003`；不改写或重编号这些既有 ID。
- 迁移文件来源：`issue/issue-0.2.0-CI-A-000-CI-vercel-deployment-versioncontrolid.md`（改名前工作副本；基准 HEAD `1faab300f862fc674278a618d28220ef33f84529`，不作为实施版本；SHA-256 `0f578cd755d8194ed6267e10028971aa237256d37607dfbf8760377bec4cb0d6`）。

## 当前需求与范围

- [x] [0.2.0-CI-A-000] 建立推送自动部署到 Vercel #ops #P0.2 #phase-0-2
  - [x] [0.2.0-CI-A-001] 推送代码后自动部署 TS 应用前端到 intake.ddonlien.com
  - [x] [0.2.0-CI-A-002] 后端服务随前端一起部署到 intake.ddonlien.com/api/*
  - [x] [0.2.0-CI-A-003] Git 集成已连接（Vercel Dashboard），push 到 main 自动触发部署

## 检查与验收边界

以上勾选与结果沿用迁移前的当前需求文档；历史记录中的实现、测试、编译、视觉与用户验收彼此独立。本次只迁移文档并检查结构 / 引用，没有重新执行产品构建或用户验收，也没有凭历史日志新增完成勾选。

## Comments

### 2026-10-23 17:44:33 UTC — Agent（文档迁移）

按原有功能 / 工作目标标题拆分需求，保留原 ID、勾选、依赖、最新补充及来源。没有稳定根 ID或旧 ID 在不同上下文重用时，采用由来源路径和标题确定的迁移 Issue ID，原 ID 仍在正文保留。完整旧内容可从来源版本读取；独有未提交内容的版本化副本见迁移映射。

### 20260622003658-utcp8-kimi.md — 历史证据迁移

来源：`agent-log/20260622003658-utcp8-kimi.md` @ `7cc7662690da9954451252d2e452a4e1737274a2`。日期 / 时区沿用原记录；以下摘录不自动改变当前完成状态。

#### 用户原始 prompt

在requirement里增加这几条任务到恰当的phase，注意规范：
- 每次推送代码，自动把ts应用前端部署到app.intake.ddonlien.com、把后端部署到admin.intake.ddonlien.com、把ts介绍页部署到intake.ddonlien.com，他们现在都由vercel host
- 后续所有的开发工作要确保代码和数据隔离，目前数据主要有2个部份：食品库、用户注册数据；用户的使用数据存储在local storage，照例说只需要保持代码兼容性，数据本身不会被推送影响

#### 完成工作

- 在 `REQUIREMENTS.md` 的 `Phase - v0.2.0` 中新增 `CI-A` 和 `ARCH-A` 两个任务区块
- 共新增 8 条需求（含 2 个父任务 + 6 个子任务），均使用稳定 ID 并遵循 Markdown checkbox 格式

#### 更新的需求 ID

- `[0.2.0-CI-A-000]` 建立推送自动部署到 Vercel
  - `[0.2.0-CI-A-001]` 自动部署 TS 应用前端到 app.intake.ddonlien.com
  - `[0.2.0-CI-A-002]` 自动部署后端服务到 admin.intake.ddonlien.com
  - `[0.2.0-CI-A-003]` 自动部署 TS 介绍页到 intake.ddonlien.com
- `[0.2.0-ARCH-A-000]` 建立代码与数据隔离约束
  - `[0.2.0-ARCH-A-001]` 食品库数据与代码部署隔离
  - `[0.2.0-ARCH-A-002]` 用户注册数据与代码部署隔离
  - `[0.2.0-ARCH-A-003]` 用户本地使用数据（LocalStorage）保持代码兼容性

#### 验证方式

- 检查 `REQUIREMENTS.md` 行 571-590 区域包含新增的两个三级任务区块
- 确认所有新增任务 ID 格式正确：`[0.2.0-{区块}-{序号}]`
- 确认新增区块遵循规范：`### CI-A：xxx` 和 `### ARCH-A：xxx` 命名格式

#### 备注

- 本次为纯文档维护任务，未修改代码，未执行 git commit。
- 数据隔离任务明确区分了服务端数据（食品库、用户注册）与客户端数据（LocalStorage），与 v0.2.0 的 TS Web 应用架构一致。
- 自动部署任务覆盖了用户指定的三个 Vercel 托管子域名，补充了 v0.1.0 阶段 GitHub Pages 部署到 intake.ddonlien.com 的演进路线。

#### 补充修改（2026-06-22 00:37:40）

**补充 prompt 原文：**
修改，改用 intake.ddonlien.com/app 和 /admin 和 /api

**修改内容：**
将 CI-A 子任务中的三个子域名部署路径改为同域名路径：
- `[0.2.0-CI-A-001]` `app.intake.ddonlien.com` → `intake.ddonlien.com/app`
- `[0.2.0-CI-A-002]` `admin.intake.ddonlien.com` → `intake.ddonlien.com/admin`
- `[0.2.0-CI-A-003]` `intake.ddonlien.com` → `intake.ddonlien.com/api`

### 2026-10-24 07:11:21 UTC — Agent（纠正迁移命名）

按原语言和具体任务范围纠正文件名；保留原 ID、勾选、依赖、来源、最新补充和验收边界。实施版本未核实，省略版本后缀。
