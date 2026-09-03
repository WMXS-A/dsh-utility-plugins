# dsh-skill-cheatsheet · 技能速查

A composer toolbar button that opens a skill catalog panel for the current session. / 在输入框工具栏加一个扳手按钮，点开即可查看当前会话的全部技能。

## Features / 功能

- A wrench button in the composer toolbar (no restart needed after install). / 输入框工具栏常驻扳手按钮，安装即生效。
- Panel lists every skill available to the current session. / 面板列出当前会话可用的全部技能。
- Each entry shows the Chinese title, a one-line purpose, usage examples (💬) and source. / 每个技能显示中文标题、一句话用途、实操例句（💬）与来源。
- Newly installed skills that are not yet catalogued appear at the top with a "＋ 收录" button. / 新安装但未录入词典的技能显示在顶部，可一键「收录」。
- One-click cataloguing stores a local Chinese entry (title / purpose / source) in browser storage — instant, survives restarts, no rebuild or republish. / 点「收录」后在行内填写中文标题、用途与来源，保存到浏览器本地存储，立即生效且重启不丢。
- Theme-aware (uses `--dsw-alias-*` tokens, glassy translucent panel). / 面板半透明毛玻璃、跟随界面主题变量。

## Install / 安装

```sh
dsh plugin --profile web add dsh-skill-cheatsheet
```

Or install via the entry listed on [awesome-dsh-plugin](https://awesome-dsh-plugin.com). / 也可通过 awesome-dsh-plugin 精选列表收录后一键安装。

## Usage / 使用

Click the wrench button in the composer toolbar. Uncatalogued skills appear under "🆕 新技能·待收录"; click "＋ 收录", fill in the Chinese title, purpose and source, then save. Click ✕ or anywhere outside to close. / 点击输入框工具栏的扳手按钮打开；未收录技能在顶部，点「＋ 收录」填中文信息后保存；点 ✕ 或外部关闭。

## How it works / 工作原理

Pure client plugin: it reads skills through the official client API (`connection.api.skills.list({ sessionId })`), merges the built-in Chinese dictionary with user-catalogued local entries, and renders the panel into product slots (`conversation.input.left` + `shell.overlay`). No host-side code, no private RPC. / 纯客户端插件：通过官方 client API 读取技能列表，合并内置中文词典与本机收录条目后渲染到产品插槽；无 Host 代码、无私有 RPC。

## License

MIT
