# Haven · 发布与上架方案（存档）

> 这份文档记录 2026-09 讨论过的所有可选路线，方便以后直接照着做。

## 0. 当前状态

| 项目 | 现状 |
| --- | --- |
| 代码仓库 | GitHub：`https://github.com/7TEEEEN/-app`（分支 `main`） |
| 线上地址 | Vercel 导入该仓库后得到 `https://xxx.vercel.app`（自动部署，push 即更新） |
| 形态 | 纯静态单页应用（`index.html` + `styles.css` + `app.js` + `i18n.js`），已支持 PWA（可添加到 iPhone 主屏幕） |
| 数据 | ✅ 已接 **Supabase**（Project `iookfvtevixmdtjubpwn`）：投稿在云数据库、照片在 Storage，**所有人共享**；本机 localStorage 只作离线缓存 |
| 管理员 | 审核台密码默认 `8888`，可在审核台里修改 |
| 地图 | MapLibre GL JS + MapTiler（key 在前端，建议限制域名） |
| 路线规划 | 驾车 / 步行 走 OSRM 公共路由；公共交通跳系统地图 |
| 语言 | 简体中文 / 繁體中文 / English，默认跟随系统语言 |

**关键结论（2026-09 已解决）：数据已上云，朋友打开同一个链接就能看到相同内容。** 之前“只存在浏览器本地、朋友看不到”的问题已由 Supabase 解决；下面各节保留当时的方案对比，供以后扩展参考。

---

## 1. 后端（数据共享）选项

### 推荐：Supabase（免费、免运维）

- 一次给齐：Postgres 数据库 + Storage（存照片）+ Auth（权限）+ 可视化控制台
- 免费额度：500MB 数据库 / 1GB 存储，朋友圈规模足够
- 区域选 Singapore（香港访问快），**不需要 ICP 备案**
- 注意：免费项目连续 1 周无访问会被暂停（控制台一键恢复）；升级 Pro 约 $25/月可避免
- 接入方式：把 `app.js` 里读写 localStorage 的几个函数换成 Supabase 读写，保留离线兜底
- 需要你提供：Project URL + anon public key

### 备选

| 方案 | 优点 | 代价 |
| --- | --- | --- |
| Firebase | iOS 生态好、免费额度大、有 Swift SDK | Google 服务，国内访问不稳定 |
| CloudKit | Apple 原生、零成本、随 iCloud 同步 | 只能在 Apple 设备之间共享，需 Xcode 配 entitlement |
| 阿里云 ECS（香港）+ Node + SQLite/MySQL + OSS | 最可控，最适合将来商用；香港节点**免备案** | 要买服务器（约 ¥24–60/月）、配域名与 HTTPS 证书，后端要我另写 |
| 阿里云 OSS + 函数计算 FC | 全托管不用运维 | 配置项多，调试麻烦 |
| Cloudflare Pages + Workers + D1 + R2 | 免费额度大、不暂停、速度快 | API 要手写在 Worker 里，配置比 Supabase 麻烦 |

**什么时候不需要后端**：如果 App 只是你个人工具、不需要朋友看到你的投稿，可以完全不用后端（本地存手机上即可）。

---

## 2. 分享给你的朋友试用

| 方式 | 步骤 | 限制 |
| --- | --- | --- |
| 同一 Wi-Fi（最快） | `node server.js --lan` → 终端会打印 `http://192.168.x.x:3000` | 局域网是 http，浏览器**禁用定位**；数据仍不共享 |
| 免费 HTTPS 托管（推荐） | 把 `haven-分享版.zip` 拖到 Netlify Drop / tiiny.host / Cloudflare Pages | 定位可用；数据仍不共享 |
| Vercel | 已用 GitHub 仓库接入 | 同上 |
| 临时公网隧道 | `cloudflared tunnel --url http://localhost:3000` → 得到临时 https 链接 | 需要装 cloudflared；本机要开着 |

---

## 3. iOS App 的三条路

### A. PWA（已完成，0 成本）

- iPhone 用 Safari 打开网址 → 分享 → **添加到主屏幕** → 得到带图标的「Haven」，全屏运行
- 不需要 Mac、不需要 Apple 账号
- 不能上架 App Store；推送/后台能力受 Safari 限制

### B. Capacitor 套壳（推荐用于上架）

- 把现有 HTML/CSS/JS 直接装进原生 iOS 壳，**界面和功能不用重写**，产出真正的 `.ipa`
- 要做的事：加 `@capacitor/ios` + 原生权限声明（定位、相册、相机）、处理安全区/状态栏
- 需要打包环境（见下）

### C. 原生重写（SwiftUI / React Native）

- 体验最原生，但 UI 与逻辑要重做一遍
- 只有确定长期做产品、需要强原生能力（实时滤镜、后台定位、复杂动画）时才值得

---

## 4. 没有 Mac 怎么打包和上架

| 工具 | 说明 |
| --- | --- |
| **Codemagic**（首选） | 云端 macOS 构建机，内置自动签名 + 一键上传 TestFlight / App Store，有免费额度 |
| GitHub Actions（macOS runner） | 私有仓库每月免费 2000 分钟，配 fastlane 也能自动上传；workflow 我可以写 |
| Bitrise / Ionic Appflow | 同类替代 |
| 租云 Mac（MacinCloud 等） | 约 $25–30/月，想自己在 Xcode 里操作就选这个 |

**必需账号**：Apple Developer Program，$99/年。没有它只能在自己设备上装（免费签名 7 天失效），**无法给朋友发 TestFlight**。

---

## 5. 上架注意事项（重要）

1. **App 备案**：上架**中国大陆区** App Store 必须提供 App ICP 备案号（流程不短）；上架**香港区 / 其他区不需要**。你在香港，建议上香港区。
2. **审核规则 4.2**：App Store 会拒「纯网页壳」。过审通常需要原生能力加持：原生相机直拍、推送通知、离线缓存、原生分享等。
3. **TestFlight**：内部测试员最多 100 人、不需审核；外部测试员需要走一次快速审核（最多 10000 人）。
4. **权限文案**：定位/相机/相册需在 `Info.plist` 写明用途，否则审核会被问。
5. **MapTiler key**：前端可见，上线前在 MapTiler 后台把 key 限制为你的域名（Allowed origins）。
6. **Vercel Hobby** 免费版仅限非商业用途；商用需升级或搬到云服务器。

---

## 6. 推荐路线图（按顺序做）

1. **上传真实内容**：先用现在这版把真实地点和照片传进去（本地保存）
2. **接 Supabase**：把数据搬上云 → 朋友打开链接/App 就能看到你的投稿（可顺手做一个「把本地已有投稿一键同步到云端」的功能，避免重传）
3. **打包 iOS**：加 Capacitor → 用 Codemagic 云构建出 `.ipa` → 装到自己 iPhone / 发 TestFlight
4. **上架**：注册 Apple Developer → 上香港区 → 补原生能力（相机直拍、推送、离线）
5. **想商用**：再把后端搬到阿里云香港节点 + 自有域名，前端代码不用动

---

## 7. 常用命令

```bash
# 本地预览（仅本机）
node server.js

# 本地预览 + 同一 Wi-Fi 可访问
node server.js --lan

# 提交并推送（Vercel 会自动重新部署）
git add -A
git commit -m "说明"
git push origin main
```
