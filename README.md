# tabby-sidebar-autohide

Tabby 插件：在 SSH 连接成功后自动隐藏 **tabby-better-sidebar** 侧栏，并可用快捷键切换显示/隐藏。

## 功能

- SSH 连接成功后自动收起 better-sidebar
- 快捷键切换侧栏（默认 `⌘⇧B` / `Ctrl+Shift+B`）
- 可在 `config.yaml` 中关闭自动隐藏

## 依赖

- [Tabby](https://tabby.sh/)（macOS 等）
- 已安装并启用 **tabby-better-sidebar**

> Tabby 只会加载包名以 `tabby-` / `terminus-` 开头的插件。

## 安装

```bash
git clone git@github.com:huangtingzhong/tabby-sidebar-autohide.git
cd tabby-sidebar-autohide
npm install
./install.sh
```

脚本会：

1. 执行 `npm run build`
2. **实拷**产物到 `~/Library/Application Support/tabby/plugins/node_modules/tabby-sidebar-autohide/`（不用软链）
3. 写入 plugins 的 `package.json` 依赖项

然后 **完全退出** Tabby（`Cmd+Q`）再重新打开。

## 配置

`~/Library/Application Support/tabby/config.yaml`：

```yaml
sidebarAutohide:
  autoHideOnConnect: true   # false 则只保留快捷键，不自动隐藏

hotkeys:
  sidebar-autohide-toggle:
    - '⌘-Shift-B'
```

也可在 Tabby「设置 → 热键」中搜索 `sidebar-autohide` 修改。

## 开发

```bash
npm install
npm run build    # 生产构建
npm run watch    # 开发监听
./install.sh     # 安装到本机 Tabby
```

## License

MIT
