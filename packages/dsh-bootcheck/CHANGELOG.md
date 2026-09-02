# Changelog

## 1.0.0 (2026-09-02)

- Initial public release as part of the `dsh-utility-plugins` monorepo.
- Runs a quiet environment check once per session, automatically.
- Flags skills that are visible to the session but missing from the
  skill-cheatsheet dictionary.
- Report card shows the number of skills checked.
- Does not open when there is nothing to report.
- Retries the check when the skills API is unavailable or fails.
