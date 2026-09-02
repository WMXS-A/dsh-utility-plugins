# dsh-bootcheck · 环境体检

Runs a quiet environment check when a session starts and only shows a report card when something needs attention. / 每次进入会话时静默体检，仅在发现问题时弹出简报卡片。

## Features / 功能

- Fires once per session, automatically, with no user action. / 每次会话自动执行一次，无需手动触发。
- Checks whether every skill visible to the session is already catalogued in the skill-cheatsheet dictionary. / 检查当前会话可见的每个技能是否已录入技能速查词典。
- Newly installed, uncatalogued skills are listed as warnings. / 新安装、未录入词典的技能会以警告形式列出。
- Nothing to report means nothing is shown — no noise. / 一切正常时不弹任何东西，保持安静。
- Theme-aware report card that closes reliably (click ✕ or outside). / 简报卡片随主题渲染，点击 ✕ 或卡片外即可可靠关闭。

## Install / 安装

```sh
dsh plugin --profile web add dsh-bootcheck
```

Or install the whole monorepo via the entries listed on [awesome-dsh-plugin](https://awesome-dsh-plugin.com). / 也可通过 awesome-dsh-plugin 精选列表收录后一键安装。

## Usage / 使用

Nothing to configure. Open a session; the check runs once. If a skill is missing from the dictionary, a "🔍 环境体检报告" card appears near the top. Close it with ✕ or by clicking outside. / 无需配置。打开会话即自动体检；如有未收录技能，顶部会出现「🔍 环境体检报告」，点 ✕ 或外部关闭。

## Notes / 说明

The checked dictionary mirrors `dsh-skill-cheatsheet`'s built-in list. Keeping the two packages in the same monorepo keeps them in sync. / 检查所用的词典与 `dsh-skill-cheatsheet` 的内置列表一致；两个插件同仓库维护便于同步。

## License

MIT
