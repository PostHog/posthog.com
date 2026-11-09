---
title: Observability positioning
sidebar: Handbook
showTitle: true
---

This page covers positioning, messaging, pricing, and competitors. For the basics, read [observability foundations](/handbook/growth/sales/observability-foundations). For cross-sell plays, read [observability use case selling](/handbook/growth/use-case-selling/observability).

**Resources**

- <PrivateLink url="https://www.figma.com/file/yHjzK2vmjWdbkcNA9Ee4ph?type=slides">Sales training deck</PrivateLink>
- <PrivateLink url="https://docs.google.com/presentation/d/1ZXiYUwFmF5LYstM-eFhz0oVBkYYllzR6/edit">Leo's demo slides</PrivateLink> and <PrivateLink url="https://drive.google.com/file/d/1CV-fg2OPxivSgvyooCLJeaIMXA7XhllV/view">demo video</PrivateLink>
- <PrivateLink url="https://docs.google.com/document/d/1Rswft51xDkYtkldt5BZXNYQewNjQCGMQ5V80MAvwQmg/edit?tab=t.0">Customers who switched to PostHog</PrivateLink>, with their quotes, why they moved, and what to watch out for (internal only).

## Positioning

**Market category:** product observability. Observability for product-led engineering teams who care about user impact, not just infrastructure. Datadog sells infrastructure observability. We tie errors, replays, logs and traces to how the problem shows up in the product, for the user who hit it.

**Who it's for:** engineering leads, platform, backend and product engineers at product-led companies, usually scaling startups to mid-market. Best fit: already on PostHog for analytics or replay, and running 3 to 4 disconnected tools (for example Sentry + LogRocket + Datadog).

**Unique belief:** when something breaks, debugging is an investigation across tools. The error is in one place, the replay in another, the logs in a third, and the user's journey in your analytics. PostHog built observability on top of analytics, so errors, replays and logs share the same user and session.

## Key messages

**Value prop:** product observability that already knows who your users are.

| Every bug comes with the user attached | One product, one bill, no syncing | Ask your agent, skip the tabs |
| --- | --- | --- |
| See their replay, properties and events on every issue | Errors, replays, logs and traces together | Your coding agent queries errors, logs, traces and replays through the PostHog MCP |
| Log lines link to the replay and error | No data to pipe between tools | Works in Cursor, Claude Code and VS Code, or use PostHog AI |
| Go from a slow span to the user who waited | Analytics, flags and experiments right next to them | |
| Sort issues by how many users they hit, and see which ones hurt conversion | | |

## Customer pains and what we say

| Pain | What we say |
| --- | --- |
| Bouncing between tools to find which user got hit | The error, replay and log already share the same user and session |
| Sampling or capping data to save money | Usage-based pricing with free tiers and billing limits you control |
| Running out of quota mid-month | Billing limits are yours to set, per product |
| Drowning in noise | Sort issues by how many users they hit, and fix those first |
| Tools built for SREs, not product teams | Debug from the user's side, with the same events as your analytics |

## Pricing basics

No per-seat charges and a $0 base price. Every product has a free tier every month, and startups can get $50K in credits.

| Product | Free every month | Then |
| --- | --- | --- |
| [Error tracking](/error-tracking/pricing) | 100K exceptions | $0.00037 each up to 325K, $0.00014 up to 10M, $0.000115 above |
| [Session replay](/session-replay/pricing) | 5K recordings | $0.005 each, dropping in steps to $0.0015 above 500K |
| [Logs](/logs/pricing) and [traces](/tracing/pricing) (one shared meter) | 10 GB | $0.25/GB up to 300 GB, $0.15/GB above |
| Metrics | Free in alpha | Not set yet |
| [Product analytics events](/product-analytics/pricing) | 1M events | From $0.00005 each, dropping to $0.000009 |

- Logs and traces are kept 14 days by default. Custom retention is $0.05/GB-month.
- Events are kept 1 year on free plans and 7 years on paid plans.
- Logs and traces share one meter, so a customer doesn't need to guess the split between them.

## Competitive positioning and pricing

At list prices, the same volumes cost roughly 2 to 5 times more on Datadog, mostly because of log indexing and per-host APM.

> Find example deal sizes in the <PrivateLink url="https://www.figma.com/slides/yHjzK2vmjWdbkcNA9Ee4ph">sales training deck</PrivateLink>.

| Competitor | Where we win | Where they win |
| --- | --- | --- |
| Sentry | User context on every error, and customers say we act on feedback much faster | More mature error tracking, feature for feature |
| Datadog | Product context, usage-based pricing, no per-host APM | Infrastructure, Kubernetes, synthetics |
| New Relic | Product context, no per-seat pricing | Far more mature APM |

## Battle cards

More detailed battle cards are in the making.

| Competitor | Where they're strong | Where we win | Say this |
| --- | --- | --- | --- |
| Sentry | Mature error tracking with wide SDK coverage, plus performance and profiling | Errors sit next to product analytics, flags, experiments and replay with the same user. No seats. | Keep the error, add the user who hit it and what they did |
| Datadog | Full infra and APM: hosts, Kubernetes, service maps, profiling | Price, the user side (replay and product analytics), and no per-host pricing | We're not replacing your infra monitoring. We're the part that knows the user |
| New Relic | Full-stack monitoring in one platform | No per-user pricing (New Relic charges per Pro full user) and the product side of the story | Everyone on the team can use it without a seat bill |
| FullStory, LogRocket | Replay and digital experience analytics | Replay sits next to errors, logs and traces, so devs can fix what they watch | Watch the bug, then see the error and the logs behind it |
| Grafana | Open source dashboards and infra metrics, self-hosting | User context, and nothing to run | Grafana tells you the system is sad. PostHog tells you which user and why |

## What we're not

- **Enterprise APM for infra teams.** For Kubernetes or service latency, Datadog or New Relic fit better.
- **Sentry, feature for feature.** Sentry's error tracking is more mature today. We win on user context.
- **The cheapest single tool.** For logs or replay alone, a point tool may cost less.
- **Built for 24/7 SRE on-call.** Alert-heavy, runbook-driven teams will find us thin.
- **Uptime or synthetic monitoring.** We don't have it today.
- **A fight with a happy DevOps team.** If DevOps owns Datadog and likes it, your contact can't switch.

Don't push alpha products to large managed customers. Losing their data creates churn risk where there wasn't any.

## Personas

Error tracking is usually bought by backend and full-stack engineers, replay by product engineers and support, logs by platform engineers. The bundle decision usually sits with an engineering lead who's consolidating tools.

| Persona | Cares about | Say | Lead with |
| --- | --- | --- | --- |
| Product engineer | Shipping fast and seeing what users do | "Click an error and watch the user hit it." | Error tracking + replay |
| Backend engineer | Readable stack traces and less noise | "Fix the bugs that hit the most users first." | Error tracking |
| Platform engineer | OpenTelemetry and the cost of logs and traces | "See the user behind every request." | Logs + traces |
| Engineering lead | Fewer tools and bills they can predict | "One product instead of three." | The whole stack |

## Proof

| Customer | Moved from | Quote |
| --- | --- | --- |
| [CloudPeek](/customers/cloudpeek) | Log files on the server, to PostHog logs + error tracking | "We spot an exception in Error Tracking and pivot straight into Logs to understand the full context of what went wrong." |
| [11x](/customers/11x) | Hotjar + FullStory, to PostHog | "Now, all our engineers use PostHog replays when looking into issues like that." |

**Heard a great story?** Flag customers who switched from another tool, can name a result, praise us unprompted, or that other customers would recognize. Send [Sara](/community/profiles/35224) the customer, the product and what they said.

> **What customers are saying this week.** <PrivateLink url="https://posthog.slack.com/archives/C0C80AWLWQ0">#observability-intel-bots</PrivateLink> posts a roundup twice a week from sales calls and Slack: new switches, objections, competitor moves and Replay Vision feedback. Join it to stay current, and reply in the thread if something's wrong or missing.

## Objections and answers

| They say | We say |
| --- | --- |
| "We're locked into Datadog" | Don't rip and replace. Start where we're different: errors and replays with the user attached. Logs can come straight from the Datadog Agent they already run. |
| "We don't want another tool" | If they already use PostHog for analytics, it's the same SDK, the same people and the same bill. Errors and replay run on the posthog-js they already have. |
| "Your logs and tracing are new" | Be honest. There are no span alerts, service map or profiling. If they need infra monitoring, that stays where it is. We're the product side of observability. |
| "Sentry is good enough" | For the error alone, maybe. Ask how they find out who hit it and what that person did right before. |
| "We'll build it on OpenTelemetry and Grafana" | PostHog takes OpenTelemetry, so they're not locked in. The hard part isn't collecting data, it's linking it to the user. |
| "Why not send logs as events?" | Events are for users, logs are for the system. 100M lines is around $1.5K to $2K as events and around $25 as logs (assuming about 1 KB per line). |
| "We can't have PII in logs" | Logs support PII scrubbing, drop rules and sampling, so they control what's kept. |
