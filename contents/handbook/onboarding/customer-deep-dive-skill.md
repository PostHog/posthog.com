---
title: Customer deep dive skill
sidebar: Handbook
showTitle: true
---

The customer deep dive is a Claude Code skill the onboarding team uses to research a PostHog account before emailing it, replying to it, or joining a call with it. You give it an email address or an account, it pulls everything PostHog knows about that account, and it hands back a draft email or a call-prep brief in chat for you to review.

It lives in the [PostHog/skills repo](https://github.com/PostHog/skills/tree/main/skills/team/onboarding/posthog-customer-deep-dive), and the [README](https://github.com/PostHog/skills/blob/main/skills/team/onboarding/posthog-customer-deep-dive/README.md) there carries the full setup. This page covers what it does and how we use it.

## What it does

The skill resolves whatever you hand it to an account in [Customer Analytics](/docs/customer-analytics/start-here), then reads the account across the sources onboarding already works from:

- The account in Customer Analytics: pipeline stage, eligibility, health score, who holds the account (onboarding, CSM, AE), notes and support tickets.
- What onboarding already did: which `Onboarding::` workflow emails went out and when, and the email sync's record of every thread with the customer.
- Usage and billing from our internal project: product usage over time, the latest invoice against the forecast, billing limits and whether a limit is actually cutting data off, credits and contract dates.
- Product setup per product the account pays for or uses: event mix, identity calls, replay and error volume, flags and experiments, the data warehouse.
- A scan of the customer's public website for the PostHog snippet, its config, and the competing tools installed beside it.
- Optional sources if you connect them: Gong call transcripts, the booking-form answers in your calendar invite, the full body of an email thread in Gmail, Clay enrichment, Slack.

It runs these reads in parallel through subagents, reconciles what they return, and then checks every product claim it plans to make against a live search of the PostHog docs before it writes anything.

## What it produces

The skill picks an output from the account's state. If you ask for something specific, your ask wins.

| Output | When | What you get |
|---|---|---|
| First-touch email | New account, nothing sent yet by hand or by the email sequence | Ranked contacts, cost-first findings, a short outreach email |
| Follow-up email | We reached out, no reply | What changed since the last email, what they acted on, one or two new angles |
| Reply | They wrote back with a question | Their questions answered in order, one paragraph each |
| Call-prep brief | A real meeting is on the calendar | A full internal brief organized around what they said they want from the call, six optimization checks, health flags, and a ready-to-paste prompt for a PostHog AI notebook |
| Account brief | We shouldn't be emailing this account: opted out, held by a CSM, AE or TAM, referred to sales, not eligible, or a teammate is already in touch | The research, the reason there's nothing to send, and who to loop in |

Every output starts with the same header: pipeline stage, what onboarding sent and when, health score, renewal date, last bill against the forecast, paid products, limits set and limits biting, the people on the account, user counts, and links to the org and the account.

Every recommendation in a customer-facing draft carries a link to the docs page it came from.

## When to use it

- Before the first email to an account in the onboarding queue.
- Before a follow-up, to see what changed and whether they acted on the last email.
- When a customer replies with a question about their bill or their setup.
- Before any customer call. This is where it helps the most, because the brief keeps every number in full and you can't go back for a figure mid-call.

You don't need it for a one-line nudge on a thread you already know well.

## Install

It's a Claude Code plugin in the `PostHog/skills` repo. A copy also sits in the skills store of our internal PostHog project, which is what PostHog's own cloud runs, like the `@PostHog` Slack app, pick up for its owners. On your own machine, install the plugin. Pick one route, then restart Claude Code.

In a Claude Code session:

```
/plugin marketplace add PostHog/skills
/plugin marketplace update PostHog-skills
/plugin install posthog-customer-deep-dive@PostHog-skills
```

Three things trip people up. The marketplace name is `PostHog-skills` with the capitals. Run the `update` line even on a first install, since install reads your local cached copy of the marketplace. And nothing applies until you restart.

Or copy the folder instead:

```bash
git clone https://github.com/PostHog/skills.git
cp -r skills/skills/team/onboarding/posthog-customer-deep-dive ~/.claude/skills/
```

Updates are never automatic. The skill checks its own version against the published one at most once a day and prints the update commands when you're behind.

## Setup

Two things are required:

1. **The PostHog MCP**, signed in with your PostHog staff account. Register it with `claude mcp add --transport http posthog https://mcp.posthog.com/mcp -s user`, then run `/mcp` to log in ([docs](/docs/model-context-protocol/claude-code)).
2. **Your own personal API keys**, one on US and one on EU, read-only is enough ([docs](/docs/api/personal-api-keys)). US and EU are separate instances, so a US key won't work on EU. Without the EU key, EU accounts still run, but their raw event reads come back as unavailable instead of measured.

Make your own keys. A personal key carries the identity of whoever created it, so using a colleague's attributes your queries to them and gives you their access instead of yours.

Everything else is optional and gets skipped when it's set to `none`: Gong, your work calendar, Gmail, Clay, the GitHub CLI and Slack. On the first run the skill checks what you have, asks only for what it can't detect (your calendar ID and booking link), and writes your values to a personal config file outside the skill folder, so an update never overwrites them.

The README has a numbered section for each tool, each ending with a check that proves it works.

## Running it

```
/posthog-customer-deep-dive someone@example.com
```

It also takes a domain, an account name, a PostHog org ID or a Customer Analytics account ID. Plain language works too: "prep me for my call with example.com tomorrow", "help me reply to this", "deep dive on example.com".

A typical call-prep run looks like this:

1. You run it with the customer's email the day before the call.
2. It resolves the account, reads the calendar invite for the booking-form answers, and fans out the reads.
3. It splits whatever the customer said they want from the call into separate goals and writes a section per goal, in their words. A goal the data can't answer still gets a section saying what to ask on the call.
4. It verifies each product claim against the docs, then writes the brief into chat, followed by a prompt you can paste into a PostHog AI notebook in the customer's project.
5. A closing note lists what it skipped and why, and how many claims it checked against a fetched docs page.

## Guardrails

- **It never sends, posts or writes anything.** No email to a customer, no account property, note, task, tag or workflow in PostHog, nothing in Salesforce. Every output lands in chat for you to read, edit and send yourself. When the pipeline needs a manual change, like a referral tag or an opt-out, it reminds you to make it.
- **Every number comes from a query it ran in that run, and every product fact from a docs search it ran in that run.** Nothing from memory. Derived figures show their arithmetic so a slipped digit is visible. Where it can't verify something, it gives you the question to ask the customer instead.
- **A claim about the customer's code quotes the code.** Usage data shows an effect, so the skill only names a cause, like an identity or billing setup, when the site scan found the code behind it.
- **Opted-out accounts get no onboarding email**, even if you ask for one. You get an account brief instead. A reply to a billing or support question they asked is still allowed.
- **It flags and never blocks.** If an account looks already handled (a CSM on it, a teammate's live thread, a terminal stage), the flag leads the output and the research still runs in full.
- **It surfaces disagreements between sources** with both figures, instead of picking one.
- **Product state is never written into the skill.** Prices, tiers and where a setting lives are searched live every run.

## Known limits

- **It depends on data that changes.** Customer Analytics, the onboarding model behind it, the email sync and the `Onboarding::` workflows are all still being built, and warehouse tables change too. A read that comes back empty can be a stale query rather than a real zero, and the skill says when it couldn't measure something.
- **It's a draft tool, not an autopilot.** A human reads every output before anything reaches a customer.
- **Some reads are out of reach without impersonation**, like a customer's own replay and heatmap tables on US, or Actions and property definitions on EU. The skill names these gaps, and you can fill them yourself with the [impersonation toolkit](https://github.com/PostHog/skills/tree/main/skills/team/customer-success/impersonation-toolkit).
- **The email sync only keeps a short snippet of the latest message.** For the full thread it needs Gmail, and Gmail only reads your own mailbox, so a teammate's thread needs their copy.
- **Call prep is the heaviest run.** It fans out many reads plus a verification pass and shares query capacity with anyone else running it, so don't start it in the minutes before the call.

## Who to ask

[Daniel](/community/profiles/34722) maintains the skill. Ask in `#team-onboarding`, or open an issue on the [PostHog/skills repo](https://github.com/PostHog/skills). If you change a file in the skill, bump the version in `.claude-plugin/plugin.json` in the same PR, or nobody's installed copy will update.
