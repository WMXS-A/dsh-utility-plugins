# dsh-utility-plugins

A small, dependency-light client plugin for DeepSeek Harness (dsh).

| Package | What it does | Category |
|---|---|---|
| [dsh-skill-cheatsheet](packages/dsh-skill-cheatsheet) | Composer wrench button opening a skill catalog panel with Chinese titles, purposes, usage examples, plus one-click cataloguing of newly installed skills (saved locally). | ui |

It is a pure client plugin: it reads the skill catalog through the official client API (`connection.api.skills.list({ sessionId })`), registers UI into product slots, and carries no host-side behaviour. Uncatalogued skills are listed at the top with a "＋ 收录" action that stores a local Chinese entry (title/purpose/source) in browser storage — no rebuild or republish needed.

## Repository layout

```
dsh-utility-plugins/
└── packages/
    └── dsh-skill-cheatsheet/   # installable dsh plugin (dsh.bundle + client)
```

## Install / 安装

```sh
dsh plugin --profile web add dsh-skill-cheatsheet
```

Requires a dsh web profile. Install the subdirectory entry from the awesome-dsh-plugin list to get it from the storefronts. / 需要 dsh web profile；插件经 awesome-dsh-plugin 精选列表收录后可一键安装。

## License

MIT
