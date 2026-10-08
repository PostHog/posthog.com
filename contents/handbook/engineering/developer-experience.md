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

### Devboxes

A devbox is a remote PostHog dev environment on our internal Coder deployment. Use one when you want an isolated workspace for an agent, or when your laptop doesn't have the CPU, memory, or disk to run the full stack.

Setup takes six steps:

1. Connect Tailscale to the `posthog.com` tailnet. Coder is only reachable from there, and our other tailnets don't route to devboxes.
2. Make sure `hogli` runs in your PostHog checkout. It needs the repo's flox or uv environment, which [developing locally](/handbook/engineering/developing-locally) sets up.
3. Run `hogli devbox:setup`. It installs the Coder CLI at the server's version, signs you in, and writes your SSH config, then asks for optional settings: Git identity, a dotfiles repo, a region, and a Claude Code token.
4. Run `hogli devbox:start`. The first run creates your box, and every run after that resumes it.
5. Connect with `hogli devbox:ssh`, or open an editor with `hogli devbox:open --vscode`, `--cursor`, or `--web`.
6. Run `hogli devbox:stop` when you're done. Your files stay on the box and compute billing stops.

When a command fails, run `hogli devbox:doctor` before anything else. It checks your tailnet, access, auth, and SSH config, and names the likely cause. If a command prints `Coder CLI vX does not match server vY`, rerun `hogli devbox:setup` to reinstall the matching CLI. Don't use a Homebrew `coder`, because its version drifts away from the server's.

A coding agent can run this whole setup with the `setting-up-devbox` skill if you ask it to "set up my devbox". Everything past setup, such as sync, sharing, secrets, and running the app, lives in [Coder workspaces](https://github.com/PostHog/posthog/blob/master/docs/internal/coder-workspaces.md) in the monorepo. Questions go in [#project-devboxes](https://posthog.slack.com/archives/C0AMVFGJY7Q).

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
