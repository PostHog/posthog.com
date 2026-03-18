---
title: Developer Experience
sidebar: Handbook
showTitle: true
---

The DevEx team owns the shared developer tooling and workflows that cut across all product teams: local dev, CI, builds, framework upgrades, codebase structure, type systems, migration safety, and more. If it affects how fast and safely engineers can work on code and ship it, it's probably this team's thing.

## Scope

| Area | What's owned |
|------|------------|
| **Local dev** | Local stack, hogli CLI, startup time, worktrees, Docker Compose, cloud envs |
| **CI** | Pipeline speed, cost, reliability, flaky test triage, PR previews |
| **Build & tooling** | Frontend/backend build pipelines, formatters, linters |
| **Type system** | Backend/frontend type sync, OpenAPI generation, schema integrity |
| **Upgrades** | Framework/language upgrades (Django, React, TS), dependency & security updates |
| **Architecture** | Product folder structure, isolation model, legacy migration |
| **Migrations** | Safe migration tooling, migration checkers, squashing |

## Things you can use

### Local dev
- **hogli CLI** — start the stack, run tests, format, lint, generate types. `hogli start`
- **phrocs TUI** — manage local services, restart, view logs
- **Intent system** — only start the services you need `hogli dev:setup`

### CI
- **Turborepo product tests** — fast per-product CI instead of full suite
- **Hobby PR previews** — full-stack preview environment for any PR
- **Visual review** — visual regression testing with approval flow
- **PR approval agent** — auto-approve low-risk changes

### Code quality
- **Auto-generated TS types** — OpenAPI from Django serializers via Orval, always in sync
- **Formatting & linting** — oxfmt, oxlint, ruff, markdownlint in CI
- **Claude Code skills** — agent guidance for hogli, migrations, DRF endpoints
- **Product isolation** — tach-enforced boundaries between products

## How to work with this team

**Report what's slowing you down** — flaky tests, slow builds, local dev friction, tooling that doesn't work right. A lot of it is known but there might be stuff that's been missed.

**Loop the team into conversations early** — if your team is making decisions that touch shared tooling, CI, code architecture, or conventions, bring DevEx in. Better to be in the discussion than clean up after it. Think: new products, services, big refactors, dependency changes, CI workflow tweaks.
