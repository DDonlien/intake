# DB-B：本地业务数据与多用户隔离

- ID：`0.2.0-DB-B-000`。
- 类型：`DB`。
- 状态：进行中（原文同时包含已完成与未完成项）。
- 版本管理标识：`versioncontrolid`（含义待定义，不推断为 commit、branch 或 change）。
- 来源：`REQUIREMENTS.md` @ `7cc7662690da9954451252d2e452a4e1737274a2`；标题路径：任务清单 / Phase - v0.2.0 - 可用的 TS Web 应用（数据、账户体系、注册） / DB-B：本地业务数据与多用户隔离。
- 原稳定 ID：`0.2.0-DB-B-000`, `0.2.0-DB-B-001`, `0.2.0-DB-B-002`, `0.2.0-DB-B-003`, `0.2.0-DB-B-004`, `0.2.0-DB-B-005`, `0.2.0-DB-B-006`, `0.2.0-DB-B-007`, `0.2.0-DB-B-008`, `0.2.0-DB-B-009`, `0.2.0-DB-B-010`, `0.2.0-DB-B-011`, `0.2.0-DB-B-012`, `0.2.0-DB-B-013`, `0.2.0-DB-B-014`, `0.2.0-DB-B-015`, `0.2.0-DB-B-016`, `0.2.0-DB-B-017`, `0.2.0-DB-B-018`, `0.2.0-DB-B-019`, `0.2.0-DB-B-020`, `0.2.0-DB-B-033`, `0.2.0-DB-B-034`, `0.2.0-DB-B-035`, `0.2.0-DB-B-021`, `0.2.0-DB-B-022`, `0.2.0-DB-B-023`, `0.2.0-DB-B-024`, `0.2.0-DB-B-025`, `0.2.0-DB-B-026`, `0.2.0-DB-B-027`, `0.2.0-DB-B-028`, `0.2.0-DB-B-029`, `0.2.0-DB-B-030`, `0.2.0-DB-B-031`, `0.2.0-DB-B-032`；不改写或重编号这些既有 ID。

## 当前需求与范围

- [ ] [0.2.0-DB-B-000] 建立真实 LocalStorage 本地数据层 #feature #P0.2 #phase-0-2（原 ID：REAL-DATA-000）（原 ID：0.2.0-DB-A-000）
  - Multica 同步：TB-15（193d7c30-a778-4d4e-b0d8-247e9fd262cc），状态 in_progress，负责人 Kimi，版本 tag `v0.2.0`。
  - [ ] [0.2.0-DB-B-001] 所有业务数据保存在 LocalStorage #phase-0-2（原 ID：REAL-DATA-001）（原 ID：0.2.0-DB-A-001）
    - [x] [0.2.0-DB-B-002] 餐次记录保存在 LocalStorage（原 ID：0.2.0-DB-A-002）
    - [x] [0.2.0-DB-B-003] 食物记录保存在 LocalStorage（原 ID：0.2.0-DB-A-003）
    - [x] [0.2.0-DB-B-004] 目标设置保存在 LocalStorage（原 ID：0.2.0-DB-A-004）
    - [x] [0.2.0-DB-B-005] 个人资料保存在 LocalStorage（原 ID：0.2.0-DB-A-005）
    - [x] [0.2.0-DB-B-006] 收藏保存在 LocalStorage（原 ID：0.2.0-DB-A-006）
    - [x] [0.2.0-DB-B-007] 最近使用保存在 LocalStorage（原 ID：0.2.0-DB-A-007）
    - [ ] [0.2.0-DB-B-008] 页面偏好保存在 LocalStorage（原 ID：0.2.0-DB-A-008）
    - [x] [0.2.0-DB-B-009] 本阶段不把业务数据上传到认证服务或其他远端（原 ID：0.2.0-DB-A-009）
  - [x] [0.2.0-DB-B-010] 按登录账户隔离本地数据 #phase-0-2（原 ID：REAL-DATA-002）（原 ID：0.2.0-DB-A-010）
    - [x] [0.2.0-DB-B-011] 每个账户使用稳定 userId 作为 LocalStorage 命名空间（原 ID：0.2.0-DB-A-011）
    - [x] [0.2.0-DB-B-012] A 账户登录只能读取 A 账户本地数据（原 ID：0.2.0-DB-A-012）
    - [x] [0.2.0-DB-B-013] B 账户登录只能读取 B 账户本地数据（原 ID：0.2.0-DB-A-013）
    - [x] [0.2.0-DB-B-014] 同一设备多个账户数据互不覆盖（原 ID：0.2.0-DB-A-014）
    - [x] [0.2.0-DB-B-015] 退出 A 再登录 B 后，不显示 A 的餐次、目标、收藏或历史（原 ID：0.2.0-DB-A-015）
  - [ ] [0.2.0-DB-B-016] 首次登录初始化真实本地数据 #phase-0-2（原 ID：REAL-DATA-003）（原 ID：0.2.0-DB-A-016）
    - [x] [0.2.0-DB-B-017] 新账户首次登录时创建默认 Profile（原 ID：0.2.0-DB-A-017）
    - [x] [0.2.0-DB-B-018] 新账户首次登录时创建默认 Goal（原 ID：0.2.0-DB-A-018）
    - [x] [0.2.0-DB-B-019] 新账户首次登录时创建空饮食历史或明确的示例导入选择（原 ID：0.2.0-DB-A-019）
      - 实现：新账户从 `makeEmptyData` 启动（profile/goals 全零，foods/entries/favorites 都空），不再注入默认 demo；MePage Settings 新增 "Load demo data" 主动加载示例数据。
    - [x] [0.2.0-DB-B-020] 默认数据结构与后续 SwiftData 迁移保持字段可映射（原 ID：0.2.0-DB-A-020）
    - [x] [0.2.0-DB-B-033] AppData 携带 accountId 字段并校验 #phase-0-2（原 ID：新增）
      - 实现：`AppData.accountId` 字段；保存时强制 stamp 当前 `account.id`；加载时若发现 `accountId` 与当前账号不匹配则视为外来数据并初始化为空；老数据（无 `accountId` 字段）首次加载时自动 stamp 当前账号并保留内容。
    - [x] [0.2.0-DB-B-034] 登录态可视化 #phase-0-2（原 ID：新增）
      - 实现：MePage 顶部 profile-card 用蓝色 pill 显示 "Signed in as <email>"，avatar fallback 用 email 首字母，profile.name 为空时也用 email 显示。
    - [x] [0.2.0-DB-B-035] 服务端邮箱密码校验 #phase-0-2（原 ID：REAL-AUTH 关联）
      - 验证：`POST /api/auth/login` 对未注册邮箱返回 401 `Email not found`，对错误密码返回 401 `Wrong password`，对重复注册返回 400 `This email is already registered`。
  - [ ] [0.2.0-DB-B-021] 本地数据版本化与迁移 #phase-0-2（原 ID：REAL-DATA-004）（原 ID：0.2.0-DB-A-021）
    - [ ] [0.2.0-DB-B-022] LocalStorage 数据包含 schemaVersion（原 ID：0.2.0-DB-A-022）
    - [ ] [0.2.0-DB-B-023] 读取旧版本数据时执行迁移（原 ID：0.2.0-DB-A-023）
    - [ ] [0.2.0-DB-B-024] 迁移失败时给出可恢复提示（原 ID：0.2.0-DB-A-024）
    - [x] [0.2.0-DB-B-025] 提供清除当前账户本地数据的入口（原 ID：0.2.0-DB-A-025）
      - 实现：`main.tsx` 新增 `clearLocalData` 函数 + `makeEmptyData` 工厂 + MePage 新增"Clear local data"红色按钮（与"Reset demo data"区分）；点击后真正清空 profile/goals/entries/health/foods/favorites/recentFoodIds。
    - [x] [0.2.0-DB-B-026] 提供重置当前账户 demo / seed 数据的入口（原 ID：0.2.0-DB-A-026）
  - [ ] [0.2.0-DB-B-027] 本地数据可靠性约束 #phase-0-2（原 ID：REAL-DATA-005）（原 ID：0.2.0-DB-A-027）
    - [ ] [0.2.0-DB-B-028] 写入 LocalStorage 前校验关键字段（原 ID：0.2.0-DB-A-028）
    - [ ] [0.2.0-DB-B-029] LocalStorage 容量不足时提示用户（原 ID：0.2.0-DB-A-029）
    - [x] [0.2.0-DB-B-030] JSON 解析失败时不导致应用白屏（原 ID：0.2.0-DB-A-030）
    - [x] [0.2.0-DB-B-031] 关键数据变更后立即持久化（原 ID：0.2.0-DB-A-031）
    - [x] [0.2.0-DB-B-032] 刷新页面后保留当前账户的饮食、目标、收藏和历史（原 ID：0.2.0-DB-A-032）

## 检查与验收边界

以上勾选与结果沿用迁移前的当前需求文档；历史记录中的实现、测试、编译、视觉与用户验收彼此独立。本次只迁移文档并检查结构 / 引用，没有重新执行产品构建或用户验收，也没有凭历史日志新增完成勾选。

## Comments

### 2026-10-23 17:44:33 UTC — Agent（文档迁移）

按原有功能 / 工作目标标题拆分需求，保留原 ID、勾选、依赖、最新补充及来源。没有稳定根 ID或旧 ID 在不同上下文重用时，采用由来源路径和标题确定的迁移 Issue ID，原 ID 仍在正文保留。完整旧内容可从来源版本读取；独有未提交内容的版本化副本见迁移映射。

### 20260626164028-utcp8-mvs.md — 历史证据迁移

来源：`agent-log/20260626164028-utcp8-mvs.md` @ `7cc7662690da9954451252d2e452a4e1737274a2`。日期 / 时区沿用原记录；以下摘录不自动改变当前完成状态。

#### 用户原始 prompt

> 检查一下进度，继续往下做，完成ts版本，我现在删除数据按钮按了没用

#### 2. 用户反馈确认

- 问用户期望是什么，回答："点击后什么都没有发生。我的今天、昨天、前天还是有卡路里记录，而且我还有 remaining 的卡路里和我的体重信息，这些信息都没有消失。"
- 确认用户期望"删除数据"= 真正清空（不恢复默认 demo）

#### 4. 验证

| 字段 | Before | After Click "Clear local data" |
|------|--------|-------------------------------|
| entriesDays | 3（today/yesterday/dayBefore） | 0 ✓ |
| healthDays | 0 | 0 ✓ |
| profileName | "MyName" | "" ✓ |
| profileWeight | 75 | 0 ✓ |
| foodCount | 14 | 0 ✓ |
| favoriteCount | 2 | 0 ✓ |

确认 confirm 弹框文案："Delete all local data for this account? Meals, goals, profile, food library and favorites will be removed. This cannot be undone."

"Reset demo data" 按钮回归测试通过——点击后恢复到 "Tao"/78.4kg/14 foods/0 entries（与原行为一致）。

#### 完成工作

- 新增 `clearLocalData` + `makeEmptyData` + `DangerActionRow` 组件 + `.danger-action-row` 样式
- MePage Settings 列表新增"Clear local data"红色按钮，与"Reset demo data"并存
- 双按钮在 dev 模式下完整验证（清空 vs 重置两条路径都跑通）
- 构建出新 bundle，hash 与生产不同，部署后自动覆盖旧 PWA 缓存

#### 更新的需求 ID

- `[0.2.0-DB-B-025]`：未完成 → 完成

#### 验证方式

- `cd reference/ts && npx vite build`：构建成功，0 错误，bundle 255KB
- Playwright 自动化测试：注册 → 注入 3 天数据 + 自定义 profile → 点 Clear → 确认全部清空
- 回归测试：Reset demo data 仍能正常恢复到默认数据

#### 备注

- 用户原始反馈"删除按钮按了没用"实际上是两层问题的叠加：
  1. 按钮命名"Reset"（重置）≠"Delete"（删除），用户期待 Delete 行为
  2. SPEC `[0.2.0-DB-A-025]` 一直没实现，没有真正的"清除"入口
- 本次修复同时解决了两个问题
- 下一步：等用户验收，commit 改动；Vercel 推送后用户从 PWA 打开会自动拉新 bundle
- 后续可考虑：在 MePage 顶部根据 `data.entries` 是否为空显示空状态引导（"你还没有记录，添加第一顿饭"）—— 配合 Clear 按钮一起做更好

### 20260626171601-utcp8-mvs.md — 历史证据迁移

来源：`agent-log/20260626171601-utcp8-mvs.md` @ `7cc7662690da9954451252d2e452a4e1737274a2`。日期 / 时区沿用原记录；以下摘录不自动改变当前完成状态。

#### 用户原始 prompt

> 生产环境上现在存在以下问题：
> 1. 账号权限校验缺失 —— 目前任何账号都能登录，系统并没有检查该账号是否已经注册。
> 2. 数据隔离失效 —— 虽然数据存储在 local storage，但 local storage 内部缺少与账号关联的标签。系统应该确保只有登录对应账号后，才能看到属于该账号的数据，但目前这一逻辑尚未实现。
> 这导致我现在登录后，所有人看到的都是同一套数据

#### 3. 验证

用 Playwright 在 dev mode 跑了 4 个场景：

| 场景 | 期望 | 实际 |
|------|------|------|
| 新注册用户 | 全部为空（profile/goals/foods/entries 都空） | ✓ accountId 正确，profileName="", weight=0, dailyKcal=0, foodCount=0, entriesDays=0 |
| 跨账号数据注入 | 注入 `accountId=attacker` 的数据，重新登录当前账号 → 视为外来，初始化为空 | ✓ accountId 仍为当前账号，profileName="", weight=0, entriesDays=0 |
| 老数据迁移 | 注入无 `accountId` 字段的 legacy data，重新加载 → stamp 当前账号，**保留原内容** | ✓ accountId 自动加上, profileName="OldUser", weight=65.5, foodCount=1, entriesDays=1, favorites 保留 |
| Load demo data | 主动加载 demo 后内容 = Tao/78.4kg/14 foods | ✓ confirm 弹出，数据正确切换 |

#### 完成工作

- `AppData` 类型新增 `accountId: string`
- `makeDefaultData(accountId)` / `makeEmptyData(accountId)` 工厂签名加入 accountId
- `normalizeData(raw, accountId)` 接受 nullable raw + 强制 accountId
- `useState` 初始化 + `useEffect[account]` 数据加载：迁移兼容 + 跨账号防护
- `useEffect[account, data]` 保存时强制 stamp accountId
- 新增 `loadDemoData` 函数
- MePage 接收 `onLoadDemo` prop
- MePage Settings 新增 "Load demo data" 按钮
- profile-card 显示 "Signed in as {email}" 蓝色 pill + avatar email fallback
- CSS 加 `.account-email` pill 样式

#### 更新的需求 ID

- `[0.2.0-DB-B-019]`：未完成 → 完成（新账户空启动 + 明确示例入口）
- `[0.2.0-DB-A-025]`：完成（上一次提交）
- `[0.2.0-DB-B-033]` 新增并完成（AppData.accountId + 跨账号防护）
- `[0.2.0-DB-B-034]` 新增并完成（登录态可视化）
- `[0.2.0-DB-B-035]` 新增并完成（服务端邮箱密码校验验证）
- `[0.2.0-ARCH-A-003]` 补充实现说明

#### 验证方式

- `npx tsc -b` 类型检查通过
- `npx vite build` 构建通过
- Playwright 4 个场景全部通过（新用户 / 跨账号 / 老数据迁移 / Load demo）
- 已有 `Reset demo data` 和 `Clear local data` 按钮回归测试通过

#### 备注

- 服务端校验**已经是对的**，本次主要是把客户端的"可观察证据"补齐
- 用户说"账号权限校验缺失"的体感来源是：登录后看不到明确的"我是谁"，现在用 "Signed in as {email}" pill 直接展示
- 用户说"数据隔离失效"的体感来源是：所有新用户默认跑同一份 demo 数据，**key 是隔离的但内容看着一样**，现在新用户从空开始
- 不破坏老数据：无 `accountId` 的 legacy data 首次加载自动 stamp，**保留全部内容**
