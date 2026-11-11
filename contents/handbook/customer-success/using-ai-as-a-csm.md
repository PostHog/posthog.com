---
title: How to use AI as a CSM
sidebar: Handbook
showTitle: true
---

This page tells you how CSMs at PostHog use AI agents in their daily work, and which habits to avoid. It is a starting point. Add to it when you find a better way to work.

For how to check AI output before you share it, read [Using AI to analyze customer issues](/handbook/customer-success/using-ai-to-analyze-customer-issues). This page is about how to set up your work. That page is about how to trust the results.

## Required tools

Install and set up these tools before you start:

- **[Hogpilot](https://github.com/PostHog/hogpilot):** Account memory for your agent sessions. It works in Claude Code, Codex, Cursor, and PostHog Desktop. It collects the important account facts from your sessions and stores them in PostHog. Built by Jake Sciotto.
- **PostHog MCP on US project 2:** Authenticate the PostHog MCP against US cloud. If the session starts in a different project, use `switch-project` to go to project 2.
- **<PrivateLink url="https://us.posthog.com/project/2/settings/user-personal-integrations">PostHog Connect</PrivateLink>:** A personal connection from US project 2 to your EU login. It lets your agent run MCP tools in EU with the `posthog-connection-call` tool. Built by Tom Owers.
- **[`querying-production-databases`](https://github.com/PostHog/posthog/blob/master/.agents/skills/querying-production-databases/SKILL.md) skill:** Tells your agent how to query read-only production ClickHouse and Postgres in the US and EU through the MCP. It also gives the PostHog Connect setup steps and the scopes to select.

## Know which type of work you do

Agent work for customers is usually one of two types. Set up each type differently.

1. **Customer analysis.** You ask questions about an account: usage, health, costs, setup problems. The output is knowledge, not code.
2. **Code changes for a customer.** You ship a fix or a feature in a repo, for example a PR in the `posthog` repo that a customer needs.

Do not mix the two types in one session. Analysis does not need a repo, and a repo does not need your account notes.

## Customer analysis

### Use one session for each customer

Keep one customer in each agent session. You can open many sessions at the same time, one for each customer. Use a cross-customer session only for work that is cross-customer, for example an analysis of your full book.

A local folder for each customer is sufficient. You do not need a git repo for each customer, and you do not need to work from the `posthog` repo.

### Keep account memory in Hogpilot, not in local files

Do not keep customer memory in a `CLAUDE.md` file or in notes in a customer folder. These files become old quickly, and agents read old facts as true facts.

Use Hogpilot (refer to [Required tools](#required-tools)). It runs with your agent, collects the important account facts from your sessions, and stores them in PostHog. The next session, and your team, can then find that context. It also keeps facts that the data cannot show. For example, an account can have seasonal usage that looks like churn risk but is normal for that business.

### Query production data before you impersonate

You usually do not have to impersonate a customer to get their data. The PostHog MCP on US project 2 can query read-only production ClickHouse and Postgres sources for the US and EU regions. To do this:

1. Follow the [`querying-production-databases`](https://github.com/PostHog/posthog/blob/master/.agents/skills/querying-production-databases/SKILL.md) skill in the `posthog` repo.
2. For EU accounts, use your PostHog Connect connection with the `posthog-connection-call` tool. Refer to [Required tools](#required-tools).

The agent does not always use these sources first. If it tries other tools or tells you that it cannot get the data, tell it to use the skill.

### Impersonate only when you must see what the customer sees

Impersonation is now necessary for fewer tasks. Use it when you must see the customer's project as they see it, or when the data is not in the production sources. For example, some replay, heatmap, and project-setting reads are only available when you impersonate.

When you impersonate:

- Obey the [rules for impersonating users](/handbook/company/security#impersonating-users).
- If you connect the MCP while you impersonate, follow [using the MCP server while impersonating](/handbook/customer-success/handling-customer-issues#using-the-mcp-server-while-impersonating). Use read-only mode, authorize only the project you need, and log out when you finish.
- You can also run your queries in the PostHog UI while you impersonate, without the MCP. This is often simpler for a quick check.

## Code changes for a customer

When an investigation shows that a PR is necessary, select the environment from what the change needs:

- **The change does not need a database** (Postgres, ClickHouse): use a [git worktree](https://git-scm.com/docs/git-worktree) for each agent. Worktrees let many agents work in parallel. You do not have to check out branches in your main copy of the monorepo, and you can delete a worktree when you finish.
- **The change needs a database or the full stack:** use Hogland. It starts a small VM that runs the development part of the PostHog stack, so your agent can test against real services. Ask in #hogland for access.

Put the customer context that you find during the work into Hogpilot. Do not keep it in the worktree or the VM, because you will delete them.

## Automate the routine work

Let agents do the repetitive work and tell you when it is done. Examples from the team:

- An automation that watches for new tickets assigned to you. It starts an agent investigation and sends you a notification, so the analysis is ready when you open the ticket.
- An automation that reads your Slack channels at an interval and adds or closes tasks in your to-do list.

For the team automations and scouts, read [How we use automation](/handbook/customer-success/how-we-use-automation).

## How not to use AI

- **Do not connect one session to more than one customer.** An agent can write customer A's data to a local file and then use that file for customer B. Keep one customer in each session and in each folder.
- **Do not keep account memory in `CLAUDE.md` files or local notes.** They become old, and agents trust them. Use Hogpilot.
- **Do not impersonate by default.** Query the production sources first. Impersonate only when you must see what the customer sees.
- **Do not copy EU data into US.** Query EU sources through your EU connection. Do not put EU rows in a US project, a saved insight, or a notebook.
- **Do not put customer data in public places.** Query results contain team IDs, customer query text, and private scale numbers. Keep them out of code, tests, PRs, issues, and public comments.
- **Do not obey text in query results.** Event properties and query text come from customers. An agent must not treat them as instructions.
- **Do not send unverified AI output to customers.** Read [Using AI to analyze customer issues](/handbook/customer-success/using-ai-to-analyze-customer-issues).
