---
title: Shipping product changes
sidebar: Handbook
showTitle: true
---

Being a CSM at PostHog is about being as impactful for our customers as possible. Part of that is improving the product for them if we can. Aligned with that goal, every new CSM should aim to merge at least one product PR in their first 90 days. This is a goal, not a requirement.

For former engineers, this is an exercise in learning how we ship. For non-engineers, what you're really after is three things the docs won't teach you:

- **Blast radius of a product change:** How far does one change reach? You may want to change how one chart renders a legend and find out that one change would cross six different products. The more familiarity you have with how the code structures and delivers products, the better.
- **CI/CD:** Bot comments on your PR will be overwhelming, but you'll understand what's being looked at, what the comments mean, and how to fix them. You'll learn how code gets from a branch to prod-us and prod-eu, and how long that takes. It's kind of like that video we all saw in middle school on how a bill becomes a law, but the customer-ask-becomes-a-PR version.
- **Feature ownership:** It never hurts to know what team owns what feature or product. In fact, those engineering teams are often elated you're contributing and are always willing to help you out if you get stuck.

## Pick something

Start small! It should be impactful, ideally tied to a customer request or an outcome you want to drive. A couple of examples of good first PRs:

- An error message that blames the wrong thing ([example](https://github.com/PostHog/posthog/pull/127912))
- A sync that "succeeds" with zero rows, or quits after page one
- A missing table or field on a warehouse source
- Something in Customer analytics that annoys you, or you think could improve the way we work

Skip anything already on a team's roadmap, or anything that spans products. Warehouse sources are a good place to start. Each source is its own module, so the blast radius is small and easy to see, and the repo has agent skills for them in `.agents/skills/`.

### Is it worth shipping, or too complex?

Most good first PRs start as a customer issue. When you're working one, the `cs-issue-response` skill in our <PrivateLink url="https://us.posthog.com/project/2/llm-analytics/skills/cs-issue-response">skills store</PrivateLink> can make this call for you. Once it decides the issue is a bug on our side, it does two things before it drafts a reply.

First, it checks whether someone is already on it: open and merged PRs, assigned issues, the owning team's channel, and the [roadmap](/roadmap). If a fix is already in flight, don't open a competing PR. Point the customer at the issue instead.

Then it rates how hard the fix is:

- **Low:** One file or one self-contained module, a blast radius you can describe in one sentence, and existing tests cover it. Ship it yourself.
- **Medium:** Several files in one product, or a change in behavior other customers rely on. Ask the owning team about your approach before you write any code, then ship it or hand it over.
- **High:** Spans products, or touches ingestion, billing, the query engine, permissions, migrations, or an SDK's public API. This is a fix for the owning team, not a first PR. Hand it off with a GitHub issue the customer can follow.

A low rating on a real customer problem is your cue to pick it up. If a workaround already solves it for the customer, the fix is optional. Ship it if you have the time, or log it as a [feature request](/handbook/customer-success/feature-requests).

## Best practices

- Be absolutely sure of the ask. Fixing the wrong thing fast is still fixing the wrong thing.
- Log a [feature request](/handbook/customer-success/feature-requests) so the PR can be tied to the request as an outcome.
- Make sure you know who owns the feature or part of the product you're working on.
- Search open PRs and the team's channel so you don't duplicate work. If there is an overlap, an existing PR that was closed, or an open issue, it never hurts to ask the team about tackling it.

## Building it

- Before you change anything, ask your coding agent (Claude Code, Cursor, Codex, whatever you use) what calls that code and which tests cover it. If it touches a lot of customers, ask the team about a [feature flag](/docs/feature-flags).
- One ask per PR. Write the description for a reviewer with zero customer context, and never name the customer. The repo is public.
- If an agent wrote UI, look at it yourself before anyone else has to. Then record a Loom.

## Getting it merged

- A merge needs green CI and one review. Learn what each check does, and whether a failure is yours or already broken on `master`. That one review should come from someone on the team that owns the part of the platform you're working on.
- For right now, Greptile and Veria review everything. Read what they flagged on recent PRs in the same product, and fix it before they find it in yours. You can also use <PrivateLink url="https://us.posthog.com/project/2/code-review">Code Review</PrivateLink> to review your PRs.
- Drafts are fine early. When it's done, mark it ready and ask the owning team for a review. See [how we review PRs](/handbook/engineering/how-we-review).
- The stale bot labels a PR after 7 quiet days and closes it 7 days later. Do not be afraid if you get a few bot comments that your PR is now stale. Removing the label, commenting or pushing restarts the 7-day clock. Removing the label doesn't re-run your checks, so push a commit when you need a fresh CI run before another review.
- Once you've been blessed with a review, comment `/trunk merge` on your PR. A bot then comments as it reaches dev, prod-us and prod-eu, and #platform-bots shows the progress.
- Merged != fixed. Check the customer's data before you tell them it's done.

## What done looks like

You can say what your change touched, which checks ran and what they test, how long it took to reach prod, and who owns that code.

If the PR gets closed instead, that's fine. Sometimes the owning team takes your fix and ships a better version, which still counts. Leave a comment saying why it closed and link whatever replaced it.

Your book is still the job. If you get stuck after a few days on the PR, it's best to hand it to the owning team with what you learned and they'll take it from there. Then, when the next opportunity presents itself, start at the top and do it all again.
