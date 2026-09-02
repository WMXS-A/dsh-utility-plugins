# dsh-skill-cheatsheet · 技能速查

A composer toolbar button that opens a skill catalog panel for the current session. / 在输入框工具栏加一个 🧩 按钮，点开即可查看当前会话的全部技能。

## Features / 功能

- One 🧩 button in the composer toolbar (no restart needed after install). / 输入框工具栏常驻 🧩 按钮，安装即生效，无需重启。
- Panel lists every skill available to the current session. / 面板列出当前会话可用的全部技能。
- Each entry shows the Chinese title, a one-line purpose, usage examples (💬) and source. / 每个技能显示中文标题、一句话用途、实操例句（💬）与来源。
- Skills found on the host but not yet in the built-in dictionary are grouped at the top as "new · pending catalog". / 检测到已安装但尚未录入内置词典的新技能时，在面板顶部集中提示「新·待收录」。
- Theme-aware (uses `--dsw-alias-*` tokens, glassy translucent panel). / 面板半透明毛玻璃、跟随界面主题变量。

## Install / 安装

```sh
dsh plugin --profile web add dsh-skill-cheatsheet
```

Or install the whole monorepo via the entries listed on [awesome-dsh-plugin](https://awesome-dsh-plugin.com). / 也可通过 awesome-dsh-plugin 精选列表收录后一键安装。

## Usage / 使用

Click the 🧩 button in the composer toolbar, or click the "技能速查" row inside the latest plugin run card. Click ✕ or anywhere outside to close. / 点击输入框工具栏的 🧩 按钮即可打开；点 ✕ 或面板外任意处关闭。

## How it works / 工作原理

Pure client plugin: it reads skills through the official client API (`connection.api.skills.list({ sessionId })`), matches them against a built-in Chinese dictionary, and renders the panel into product slots (`conversation.input.left` + `shell.overlay`). No host-side code, no private RPC. / 纯客户端插件：通过官方 client API 读取技能列表，与内置中文词典匹配后渲染到产品插槽；无 Host 代码、无私有 RPC。

## License

MIT
