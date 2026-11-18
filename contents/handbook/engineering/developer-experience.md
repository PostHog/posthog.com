---
title: Developer Experience
sidebar: Handbook
showTitle: true
---

The <SmallTeam slug="developer-experience" /> owns the path code takes from an engineer's editor, or an agent's, to production: the local stack, CI, the merge queue, the bots that review and approve PRs, and the structure of the monorepo itself. When something slows every team down a little but no single team enough to fix it, it's usually ours.

The current goal is to make 10,000 merged PRs a month easy. What we're working on this quarter is on the [team page](/teams/developer-experience).

## How to reach us

- **#team-devex** in Slack for questions, requests, and anything in the list below.
- **`hogli devex:feedback "<message>"`** from your terminal sends feedback straight to the team. Add `-c bug`, `-c idea`, `-c praise`, or `-c question`. Local agents can run it too when a hogli command or dev workflow breaks.
- **#alerts-devex** is where alerts for a red master and CI friction go.

## Scope

| Area | What's owned |
|------|------------|
| **Merging** | Trunk merge queue, required checks, keeping master green |
| **CI** | GitHub Actions workflows, Depot CI, speed and cost, flaky tests and quarantine, Playwright and Storybook jobs |
| **Review and approval** | Stamphog, PostHog Review (ReviewHog), visual review, `@posthog` commands in PRs and Slack |
| **Code ownership** | `owners.yaml` and how reviews get routed to teams |
| **Product architecture** | Product folder structure, the isolation model, product boundaries, guardrails |
| **API contracts** | OpenAPI generation, generated TypeScript clients, MCP tool codegen, schema integrity |
| **Webhooks and outbound calls** | The shared webhook ingress package, egress domains, GitHub API rate limits |
| **Migrations** | Safe migration tooling, migration checks, squashing |
| **Upgrades and dependencies** | Django, Python, TypeScript, React, and build tool upgrades, Renovate, security sync, package and image publishing |
| **Local dev** | hogli, phrocs, flox, worktrees, devboxes, PR previews |
| **Agents in the repo** | `AGENTS.md`, repo skills, how agents handle reviews, queue ejections, and flaky tests |
| **Engineering analytics** | CI and PR data for every team, including merge times and flaky tests |

## Things you can use

### Shipping a PR

- **Merge queue**: PRs merge through Trunk, which tests them against the latest master before they land.
- **Stamphog**: the AI approval agent. It can approve eligible human-authored PRs. See [How we review PRs](/handbook/engineering/how-we-review#enabling-stamphog-on-a-repo).
- **PostHog Review**: our code review bot. It reviews the whole PR, then only what each push changes.
- **Visual review**: screenshot regression checks with an approval flow.
- **`@posthog` commands**: trigger stamps, reviews, and other actions from a PR comment or a Slack mention.

### Local dev

- **hogli CLI**: start the stack, run tests, format, lint, generate types. `hogli start`
- **phrocs TUI**: manage local services, restart them, view logs
- **Intent system**: only start the services you need. `hogli dev:setup`
- **Devboxes**: remote dev environments on Coder, for agents or a laptop that can't run the full stack. `hogli devbox:setup`, then see [the setup guide](/handbook/engineering/developing-locally#option-2-developing-with-coder-workspaces-posthog-employees-only)

### Code quality

- **Generated API types**: TypeScript clients generated from Django serializers through OpenAPI, so frontend and backend stay in sync
- **Formatting and linting**: oxfmt, oxlint, ruff, and markdownlint in CI
- **Product isolation**: enforced boundaries between products, so one product can't reach into another's internals
- **Guardrails**: checks for API codegen, webhooks, outbound calls, product layout, migrations, and URLs
- **Repo skills**: agent guidance for hogli, migrations, DRF endpoints, stacking PRs, and more

## How to work with us

**Report what's slowing you down.** Flaky tests, slow builds, a PR stuck in the queue, local dev friction, tooling that doesn't work right. We know about a lot of it, but not all of it, and `hogli devex:feedback` is the quickest way to tell us.

**Loop us in early.** If your team is making decisions that touch shared tooling, CI, code architecture, or conventions, bring DevEx into the conversation. It's easier than cleaning up afterwards. Think new products, new services, big refactors, dependency changes, and CI workflow changes.

**Expect a DevEx reviewer on some PRs.** `owners.yaml` routes edits to guardrails, shared CI workflows, and new files at the repo root to us. It keeps shared rules from changing by accident.
