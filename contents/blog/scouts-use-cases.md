---
date: 2026-08-27
title: "We put agents on a schedule and now they keep finding work"
author:
  - cleo-lant
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: Blog
tags:
  - Product
  - AI
seo:
  metaTitle: "How we use scouts at PostHog"
  metaDescription: "Real examples of PostHog scouts finding product problems, sales opportunities, marketing ideas, and useful work nobody remembered to ask for."
---

Every morning, an agent reads everything that merged into the PostHog repo and tells us what mattered.

Another reads customer calls and finds the ones that need an engineer. Another reads nice things people say about PostHog and turns the good bits into an ad shortlist. One watches for flaky tests. One checks whether our broken links are still broken. Several keep an eye on customer accounts and suggest a reason to get in touch.

Nobody prompts them. They're [scouts](/docs/self-driving/scouts), and we have them poking around almost every part of PostHog.

Some are built into PostHog. We made the rest ourselves, usually because someone said, "I wish a person checked this every day," and realized a person absolutely did not want to check it every day.

Here's what they're doing.

## The one where it fixed links nobody knew were broken

Our website 404 scout watches two things: broken links we ship ourselves, and old URLs people still try to visit.

It doesn't forward a list of every 404. That would be useless. Asset requests, scanners, mistyped URLs, and other internet sludge get filtered out. A URL only clears the bar when the scout can prove real demand and name the fix.

Recently, it noticed two handbook pages still linked to an old audience page. A normal page load worked because `vercel.json` redirected the browser. Gatsby's client-side prefetch behaved differently: it requested the old page's `page-data.json`, which didn't exist.

The scout traced the requests back to the exact source files, wrote the two-line fix, and filed the report as immediately actionable. An agent picked it up and opened [PostHog/posthog.com#19520](https://github.com/PostHog/posthog.com/pull/19520). It merged the same day.

Then the scout kept watching. It recorded the PR against the dead URL in its memory, waited for the change to ship, and checked that the remaining requests were falling instead of opening the same report again.

This is the scout loop in miniature: notice, investigate, fix, remember, and check the fix held.

## The one where it caught a two-minute flaky test

The flaky-test scout watches events from Trunk when a test changes from healthy to flaky. It then reads the test, finds the CI job, and looks for a failure mechanism it can defend.

One Rust test checked that a feature flag request increments the right billing counter. The test read the current two-minute billing bucket, sent the request, then polled the original bucket. If the request crossed the bucket boundary, production wrote to the new bucket while the test stared at the old one until it timed out.

The scout proposed reading both sides of the request and polling every bucket in that range. The resulting [PostHog/posthog#86914](https://github.com/PostHog/posthog/pull/86914) fixed the quarantined test and three siblings with the same race.

The interesting part is what happens when the evidence isn't good enough. In recent runs, the scout found newly flaky tests with plausible causes, including an async Storybook interaction and a test that touches a live sandbox. It filed nothing because Trunk hadn't provided a test-specific failure log. It wrote both candidates to memory and waited.

This is not an error-monitoring rule with an LLM stapled on. The useful behavior is judgment: "I have a theory" is not the same as "someone should review a PR."

## The one where it watches a funnel after everyone goes home

PostHog's built-in Product Analytics scout reads the funnels, retention reports, lifecycle insights, and paths a team has already saved. It watches the rate those insights produce, not whether raw traffic happens to be up or down.

It recently found a sharp drop between a warehouse onboarding task being queued and the user selecting **Continue**. Entrants increased, so lower traffic couldn't explain the change. The break also persisted across complete daily windows.

The scout filed one report, saved the earlier rate as its baseline, and set a date to check again. Later runs updated that report with fresh evidence rather than spawning a new one. On incomplete days, it did nothing.

This is a [canonical scout](/docs/self-driving/scout-examples), so every PostHog customer can use the same basic skill. The scout discovers which saved flows matter for each project and learns their normal shape over time.

You don't have to write every scout yourself. Start with the built-in troop. Add custom scouts when your definition of "this looks wrong" depends on context only your company knows.

## The one where it gives sales a reason to call

"Your contract renews soon" is a reason to email someone. It is not a particularly good one.

Our account-outreach scouts look for what a customer actually did: a sustained usage change, a new project, more teammates, a product tried for the first time, a support ticket, or a visit to the billing page. They join Product Analytics data with account ownership, billing, support, and CRM data in the [data warehouse](/docs/data-warehouse).

One scout recently found an account that had added several projects and a group of new teammates while usage stayed strong. It checked that the account belonged to the right owner, confirmed nobody had reached out recently, and wrote a suggested message: ask what drove the expansion, then offer onboarding and workspace-governance help to the new teams.

That's much better than "just checking in."

Most runs end with no report. The scout checks the account book, finds no fresh change worth a human touch, advances its cursor, and goes away. A steady customer is not a sales alert.

## The one where it reads Gong so an FDE doesn't have to

Our Forward Deployed Engineering scout reads AI-generated briefs from customer calls. It looks for work with a clear customer goal, a reason normal support won't solve it, and enough detail for an engineer to act.

In one call, a customer described two linked problems: unnecessary event volume was increasing costs, and their PostHog funnel didn't reconcile with their CRM. Fixing it competed with product work their engineers already wanted to ship.

The scout classified the account as having implementation friction, suggested a focused event-taxonomy and funnel workshop, and surfaced an awkward but important detail: limited engineering capacity makes an FDE engagement more likely to help, but also increases the risk of doing one-off work that never compounds.

The skill explicitly tells the scout not to resolve that tension. Its job is to put the tradeoff in front of the person making the call.

Plenty of scouts end in code. This one ends in a better allocation decision.

## The one where compliments become an ad shortlist

Our brand feed contains posts from Reddit, X, LinkedIn, YouTube, and other places people discuss PostHog. The ad-mentions scout reads the positive ones once a week.

First, it throws most of them away. Staff posts, bots, company accounts, promotional fluff, competitor-only mentions, and vague praise don't qualify. The author must describe first-hand product usage.

Then it scores what remains:

- Concrete outcome or number: up to three points
- Explicit current usage: two points
- A short, usable line: two points
- A competitive-switch story: one point
- A credible real-name author: one point
- Heavy editing or backhanded praise: points off

Only mentions scoring seven or more make the weekly digest. The scout sorts them into product lanes, picks the strongest example, explains why each one works, and reminds marketing that using it as an ad still requires the author's permission.

It doesn't make the ads. It removes the part where someone spends Friday afternoon reading a social-listening firehose in the hope of finding one good quote.

## The one where marketing finds stories inside the scout fleet

Our case-study scout watches the other scouts.

Every few days, it looks across recent self-driving reports for stories with an actual arc: a problem appeared, the agent did meaningful work, a person reacted, and something changed. It ranks those stories by outcome and narrative quality, rejects routine fixes and repeats, and labels which customer examples need permission.

The result is a shortlist for the content team. Some become social clips. Some deserve a longer case study. Some are good product evidence but bad stories, which is also useful to know before anyone spends a day interviewing the customer.

This is one of several scouts that turns scout output into another input. We also run scouts that:

- Find novel custom scouts people are building and group them into emerging use cases
- Review whether web-analytics reports contain a real action and a success criterion
- Recheck resolved reports after a soak period to confirm the fix worked
- Pick one interesting self-driving report each day and reconstruct it as a full case-study notebook

Yes, we have scouts scouting the scouts. It sounds ridiculous right up until one finds a pattern across work no person could reasonably read.

## The one where a founder can skip 200 pull request tabs

A founder does not need every merged PR. They need to know what direction the product moved in, what broke, and which changes carry risk.

Our repo-summary scout reads the Git history every morning. It ranks changes by type, blast radius, migrations, new modules, reverts, and hotfixes. It opens the full GitHub description only when a commit title can't explain itself, then groups the important changes into a handful of workstreams.

The output isn't a changelog. It is a short briefing that says, for example, "the Inbox and cloud tasks changed substantially," then names the few PRs that prove it. Routine dependency bumps and test chores become a count, not a paragraph.

The industry-news scout does the same kind of compression for our internal reading list. A single link is never the signal. It looks for a repeated theme, a major move by a company in PostHog's space, or a thread several teammates decided was worth discussing. Recently, it surfaced an open-source data company joining AWS because the move could affect how we think about our own warehouse roadmap.

These are founder-shaped scouts: less dashboard monitoring, more "tell me what changed while I was busy with everything else."

## A scout is a job description with a schedule

[Andy has explained the technical guts already](/blog/what-is-a-scout), but the current version is pleasantly small.

A scout has:

1. A **skill** – Markdown instructions that describe the job, the evidence bar, the things to ignore, and what action to suggest.
2. A **schedule** – an interval or cron expression that decides when it wakes up.
3. The **PostHog MCP** – the same tools an agent uses to query events, insights, replays, warehouse tables, logs, errors, and the rest of PostHog.
4. A **scratchpad** – durable memory containing baselines, things already reported, noise, follow-up dates, and open questions.

The agent runs the skill, investigates through the MCP, updates its memory, then chooses one of three outputs:

- File or update an [Inbox report](/docs/self-driving/reports) when the research is complete and someone should act
- Emit a weaker [signal](/docs/self-driving/signals) that becomes useful when combined with other evidence
- Record structured data when the job is measurement rather than interruption

That last option is useful for subjective metrics. Our churn scout judges accounts against a schema containing risk level, driver, commercial change, usage change, and owner. It records every valid judgment as a `$scout_structured_output` event, so we can chart the result like any other event. It only interrupts a person when the evidence clears a much higher report bar.

The scout's judgment becomes the measuring instrument. PostHog turns it into a time series.

## The useful scouts mostly shut up

A scheduled query is easy. A scheduled agent that messages you every time a number moves is an elaborate way to create a channel everyone mutes.

Good scout skills spend more words on disqualifiers than triggers. They define which environments, users, accounts, events, and movements don't count. They require complete time windows, stable denominators, multiple sources, or a concrete next action.

When a finding isn't ready, the scout saves it with a promotion rule. A second independent complaint might turn a vague concern into a theme. Another week of low conversion might turn a wobble into a regression. A test-specific failure log might turn a theory into a fix.

Memory also stops repetition. A scout records stable dedupe keys, updates the report it already filed, and sets a follow-up date. Silence doesn't mean the scout failed to run. It often means it checked and decided you had better things to do.

You can start a risky scout in [dry-run mode](/docs/self-driving/scouts#dry-runs), inspect what it would have reported, and enable real output after you trust its judgment.

## Tell it when it gets something wrong

The account-outreach scout once reported a customer's usage collapse as a re-engagement opportunity. A human dismissed the report and explained that the customer had already churned.

On its next runs, the scout could see the dismissal. It eventually filed a report about itself: its account query checked health, usage, and recent contact, but not the CRM's churn date or closed-lost renewal state.

The proposed fix was boring and correct: add those fields, check them before reporting, and remember confirmed churn as addressed.

This feedback loop is built into scouts. When you dismiss or snooze a report and explain why, later runs read that note as steering. A custom scout can also propose a change to its own skill when the same instruction keeps wasting time or producing bad work.

You don't need to anticipate every rule before the first run. Write the job, watch what happens, and correct it like you would a clever junior teammate who takes extremely thorough notes.

## What should your scouts watch?

Start with work somebody cares about but nobody reliably remembers to do.

- **Product:** Watch an activation funnel, onboarding journey, retention insight, or important account segment. Report the rate change, not the traffic change.
- **Engineering:** Watch flaky tests, expensive queries, error clusters, stale flags, documentation drift, third-party API versions, or code without instrumentation.
- **Sales and customer success:** Watch for expansion behavior, adoption gaps, billing intent, new stakeholders, churn signals, or unresolved work hidden in call notes.
- **Marketing:** Watch brand mentions, ad performance, search decline, new product work worth launching, competitor claims, or reports worth turning into case studies.
- **Support:** Watch for several tickets that share one root cause, escalations nobody answered, or feature requests repeating across customer channels.
- **Founder:** Summarize product movement, customer themes, strategic industry changes, and the work your other scouts decided was important.

If the data lives in PostHog, a scout can read it. That includes product events, recordings, errors, logs, CRM tables, billing data, support tickets, Slack channels, GitHub, and any other source you sync into the warehouse.

The hardest part isn't connecting the data. It's writing down what would be worth interrupting you for.

## Make one

PostHog includes scouts for common product surfaces, including Product Analytics, Error Tracking, Session Replay, Experiments, Feature Flags, Surveys, Web Analytics, Logs, and AI Observability.

Turn those on first. Then tell PostHog what else you wish somebody watched. It can inspect your project, write the skill, set the schedule, and run it in dry-run mode while you tune the result.

The first version does not need a grand autonomous-agent strategy. Ours often begin as one sentence: "Please check this every day, but only bother me when..."

The bit after "when" is your scout.

<p>
  <CallToAction to="/docs/self-driving/scouts">
    Meet your scouts
  </CallToAction>
</p>
