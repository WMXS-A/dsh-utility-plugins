# dsh-utility-plugins

Two small, dependency-light client plugins for DeepSeek Harness (dsh):

| Package | What it does | Category |
|---|---|---|
| [dsh-skill-cheatsheet](packages/dsh-skill-cheatsheet) | Composer 🧩 button opening a skill catalog panel with Chinese titles, purposes, usage examples, and a "new skill pending catalog" notice. | ui |
| [dsh-bootcheck](packages/dsh-bootcheck) | Quiet per-session environment check that flags skills missing from the cheatsheet dictionary, showing a report only when something is found. | usage |

Both are pure client plugins: they read the skill catalog through the official client API (`connection.api.skills.list({ sessionId })`), register UI into product slots, and carry no host-side behaviour.

## Repository layout

```
dsh-utility-plugins/
├── packages/
│   ├── dsh-skill-cheatsheet/   # installable dsh plugin (dsh.bundle + client)
│   └── dsh-bootcheck/          # installable dsh plugin (dsh.bundle + client)
```

## Install / 安装

```sh
dsh plugin --profile web add dsh-skill-cheatsheet
dsh plugin --profile web add dsh-bootcheck
```

Requires a dsh web profile. Install each package's subdirectory entry from the awesome-dsh-plugin list to get them from the storefronts. / 需要 dsh web profile；两个插件分别作为独立条目收录于 awesome-dsh-plugin 精选列表。

## License

MIT
