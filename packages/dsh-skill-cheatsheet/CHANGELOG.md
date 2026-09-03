# Changelog

## 1.1.0 (2026-09-03)

- One-click cataloguing of newly installed skills: uncatalogued skills appear at the top with a "＋ 收录" button; the inline form saves a local Chinese entry (title / purpose / source) to browser storage, taking effect immediately and surviving restarts.
- Skill detection is now part of the panel itself (no separate health-check popup).

## 1.0.0 (2026-09-02)

- Initial public release as part of the `dsh-utility-plugins` monorepo.
- Composer 🧩 button that opens a session skill catalog panel.
- Chinese titles, purposes, usage examples and sources per skill.
- "New skill · pending catalog" group for skills not yet in the built-in dictionary.
- Live skill count badge in the panel header.
- Retry button shown when skill loading fails.
- Pure client plugin: reads skills through the official client API
  (`connection.api.skills.list({ sessionId })`); no host-side behaviour.
