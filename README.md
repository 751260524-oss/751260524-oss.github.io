# 个人服务站

网站：https://751260524-oss.github.io/

仓库：https://github.com/751260524-oss/751260524-oss.github.io

React + TypeScript + Vite + Tailwind CSS + Framer Motion + lucide-react。无需图片素材，所有大文件通过外部网盘提供。

## 本地运行

需要 Node.js 24 和 npm。

```sh
npm install
npm run dev
```

生产构建与预览：

```sh
npm run build
npm run preview
```

## 修改内容

修改 `src/data/siteConfig.ts` 中的网站名称、昵称、介绍、价格、联系方式和推荐入口。资源已独立到 `src/data/resources.json`。

## 图片插槽

图片统一放在 `public/images/`，不放图时会自动显示渐变占位，不会出现破图。可直接替换以下同名文件：

```text
hero-main.webp
showcase-01.webp … showcase-06.webp
current-game-cover.webp
current-game-01.webp
current-game-02.webp
avatar.webp
service-cover.webp
```

新增资源只需在 `resources` 数组中增加对象：

```ts
{ "id": "unique-resource-id", "title": "资源名称", "category": "教程", "description": "一句话说明", "url": "", "enabled": true, "featured": false }
```

`id` 必须唯一。支持教程、工具、游戏、软件、学习资料、其他。`enabled: false` 会暂时下架但保留数据；`featured: true` 会显示在资源区的“正在运行”推荐区域。空链接或无效链接显示禁用的“暂未提供”；填写完整的 https 网盘分享地址后显示“立即下载”。页面有分类和搜索，搜索标题、简介和分类。联系方式点击复制，QQ群没有分享链接时显示群号并可复制。

`currentGame: true` 才会进入“正在运行”区域，和 `featured` 完全分开。建议同时只保留一个当前运行游戏；更换时把旧条目的 `currentGame` 改为 `false`，再把新条目改为 `true`。

## 本机资源管理器

打开 `tools/resource-manager/index.html`（建议使用最新版 Edge 或 Chrome）。点击“打开 resources.json”，选择项目中的 `src/data/resources.json`。管理器支持新增、编辑、搜索、分类筛选、复制链接、下架/恢复和删除；点击“保存到 JSON”才会写回文件。保存后重新运行构建并推送，网站会自动显示更新。

管理器使用浏览器 File System Access API，只在本机读写你明确选择的文件，没有登录、数据库或服务器后台。浏览器不支持该 API 时可直接编辑 JSON。

服务分发价格已确认采用 60元/月、130元/年、200元/无限时长。页面包含拓飞云和酷客游戏的独立合作入口，以及 751260524、shirenziyuanzhan、784662149 三个联系方式。

## GitHub Pages

当前部署配置用于用户站点 `https://<username>.github.io/`，Vite `base` 为 `/`，使用页面锚点，无需 SPA 路由回退。

1. 登录 GitHub，创建公共仓库 `<username>.github.io`。如果该仓库已经存在，先检查现有内容，不要覆盖旧站点。
2. 在仓库 Settings → Pages → Build and deployment 中选择 **GitHub Actions**。
3. 将本地 main 分支推送到该仓库。`.github/workflows/deploy.yml` 自动执行 `npm ci`、构建、上传 `dist`、部署 Pages。
4. Actions 中部署成功后，打开环境中给出的网址，检查导航、资源和联系方式。

以后更新内容：

```sh
git add .
git commit -m "Update site content"
git push
```

不需要购买域名，也不需要 CNAME。公共仓库中的文件公开可见；联系方式属于公开展示内容，勿添加密码、Token、私钥或私人资源。原始需求文件保留在本地；首次代码提交仅包含网站与说明文件。

官方资料（开发时已读取）：

- https://docs.github.com/en/pages/quickstart
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

已为本机仓库设置 Git HTTP 代理 `http://127.0.0.1:7890`，沿用现有系统代理以完成推送；没有修改全局 Git 设置。如果以后不使用该代理，可运行 `git config --local --unset http.proxy`。
