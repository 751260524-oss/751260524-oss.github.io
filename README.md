# 个人服务站

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

修改 `src/data/siteConfig.ts` 中的网站名称、昵称、介绍、价格、联系方式和链接。网页标题和描述自动读取配置。

新增资源只需在 `resources` 数组中增加对象：

```ts
{ id: 'unique-resource-id', title: '资源名称', category: '教程', description: '一句话说明', url: '' }
```

`id` 必须唯一。支持教程、工具、游戏、软件、学习资料、其他。删除对象即删除资源；资源数量没有固定限制。空链接或无效链接显示禁用的“暂未提供”；填写完整的 https 网盘分享地址后显示“立即下载”。页面有分类和搜索。联系方式点击复制，复制受浏览器限制时可手动选中号码。

服务分发价格已确认采用 60元/月、130元/年、200元/无限时长。

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

远程仓库与首次发布需要实际 GitHub 用户名和账号授权。仅准备工作流不代表已上线。
