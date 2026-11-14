---
title: Observability foundations
sidebar: Handbook
showTitle: true
---

This page covers the basics: what observability is, what PostHog offers, and how the data connects. For messaging, pricing, and competitors, read [observability positioning](/handbook/growth/sales/observability-positioning). For cross-sell plays, read [observability use case selling](/handbook/growth/use-case-selling/observability).

**Resources**

- <PrivateLink url="https://www.figma.com/file/yHjzK2vmjWdbkcNA9Ee4ph?type=slides">Sales training deck</PrivateLink>
- <PrivateLink url="https://docs.google.com/presentation/d/1ZXiYUwFmF5LYstM-eFhz0oVBkYYllzR6/edit">Leo's demo slides</PrivateLink> and <PrivateLink url="https://drive.google.com/file/d/1CV-fg2OPxivSgvyooCLJeaIMXA7XhllV/view">demo video</PrivateLink>
- <PrivateLink url="https://docs.google.com/document/d/1Rswft51xDkYtkldt5BZXNYQewNjQCGMQ5V80MAvwQmg/edit?tab=t.0">Customers who switched to PostHog</PrivateLink>, with their quotes, why they moved, and what to watch out for (internal only).

## Every bug leaves clues

When something breaks, each product holds a different clue. Most teams keep each clue in a different tool.

| Clue | What it tells you | Where it runs | What teams use today |
| --- | --- | --- | --- |
| Errors<br />(the crime report) | What crashed, and where in the code | Frontend + backend | Sentry, Bugsnag, Datadog |
| Logs<br />(witness statements) | A diary of everything the app did | Mostly backend | Datadog, Grafana, New Relic |
| Metrics<br />(vital signs) | Numbers over time, like response time | Mostly backend | Datadog, Grafana |
| Traces<br />(CCTV footage) | One request's path through every service | Mostly backend | Datadog, New Relic |
| Session replay<br />(the eyewitness) | What the user saw and did | Frontend | FullStory, LogRocket, Hotjar |

**The result:** each tool has its own bill and its own idea of who the user is. Debugging one bug means a ticket, a check in Sentry, guessing the user from timestamps and emails, finding the replay if it was recorded, then digging through Datadog for the backend.

> *Some things customers have said:*
>
> - "Slack messages, GCP logs, AWS logs… I've been working on it for two and a half weeks"
> - "Multiple error monitoring tools… Bugsnag and Sentry… two different logging systems"
> - "We're recording metrics in four different systems"
> - "More SaaS vendors than employees by about three to one"

## How PostHog connects the clues

![Every clue links back to the same user](https://res.cloudinary.com/dmukukwp6/image/upload/every_clue_links_back_to_the_same_user_007033a0e8.png)

Every clue points back to the same person and session. Errors and replays link out of the box with posthog-js. Logs and spans link when they carry the session ID and distinct ID.

## The same bug in PostHog

![One checkout bug, from alert to fix](https://res.cloudinary.com/dmukukwp6/image/upload/one_checkout_bug_from_alert_to_fix_a864e5e726.png)

1. **Spot it.** An alert fires on a new issue in error tracking. There are lots of errors, so sort issues by users. A noisy error that only hits one internal page isn't the one that matters. A checkout error hitting real customers is.
2. **Size it.** If the team has an insight on revenue (for example, checkouts that failed after the error), show the money at stake. This is an insight they build, not a button in error tracking, so only show it if it exists.
3. **Investigate.** Open the issue. The user's replay, events and properties are already there.
   - The logs show the config change that went out right before.
   - The trace shows the request never reached Stripe.
   - The replay shows what the user saw: they clicked pay and nothing happened.
4. **Fix it.** Ask PostHog AI, or the coding agent they use through the MCP, to explain what happened. A self-driving report can include a drafted PR with the fix. Keep this part short.
5. **Recap.** Go back over what each clue gave you. The error said what broke, the logs said what changed, the trace said where it stopped, and the replay said who it hurt.

The point to land: in most stacks this is four products and four tabs. In PostHog it starts from one issue page.

## Product lineup

| Product | What it does | Status | What it usually replaces |
| --- | --- | --- | --- |
| Error tracking | Catches frontend and backend exceptions and groups them into issues. Each issue has the user's replay, events and properties. Alerts on new issues. | Mature | Sentry, Bugsnag, Rollbar |
| Session replay | Records what users saw and did, with console and network logs | Mature | FullStory, LogRocket, Hotjar |
| Logs | Search, patterns, alerts, drop rules, sampling and PII scrubbing. Log lines link to the replay, person and error. | Newer (GA) | Datadog logs, Better Stack, Grafana Loki |
| Distributed tracing | OpenTelemetry traces from backend services. A slow span links to the replay of the user who waited. | Newer (GA) | Datadog APM, New Relic, Honeycomb for teams who only need request traces |
| Metrics | Time series, including metrics built from logs (10 rules per project) | Alpha | Grafana, Datadog metrics. Best sold as part of the package with logs and tracing, not on its own, since it's still alpha. |

## How data gets in

- **Frontend.** posthog-js already captures exceptions and replays. The posthog-js logger (version 1.368.0 or later) sends logs with the distinct ID and session ID attached automatically.
- **Backend logs.** Through OpenTelemetry. There are guides for Pino and Winston.
- **Backend traces.** Through OpenTelemetry from Node, Python, Go, Java, .NET, PHP and Ruby services. Backend only, there's no browser tracing.
- **Already on Datadog.** The Datadog Agent can send logs to PostHog. Logs only, not traces or metrics.

What makes the clues connect is the session ID and distinct ID. A log line or span without them still works, it just won't link to the replay or the person.

## Agents

Agents debug better with context, and in PostHog the context sits in one place with the user attached.

- **MCP.** Covers errors, logs, traces and replays, so the coding agent they already use can pull an issue and everything around it. Setup is `npx @posthog/wizard mcp add`.
- **PostHog AI.** Can explain a log line in plain words, inside PostHog.
- **Self-driving.** Reports can include a drafted PR with the fix.

## Events for users, logs for the system

When you're trying to sell Logs to an Error Tracking customer, there's a common confusion about what data to start sending as logs and what data should remain as events.

Events are about the user. Logs are the system's diary, a forensic record of what it was doing when something happened. When something breaks, error tracking shows what's wrong, logs show what the system was doing, metrics show if anything is off overall, and traces follow the request through every service.

| Keep as an event | Send as a log |
| --- | --- |
| What the user did: signup, checkout, feature used | What the system did: API calls, retries, timeouts |
| Anything in a funnel, cohort or retention chart | Anything you only look at while debugging |
| Anything you need to look back on for a year or more | Anything you need for days or weeks |
| Product questions: "do users do X?" | Incident questions: "what happened when X broke?" |

**What they gain:**

- **A smaller bill for system data.** Logs are billed per GB, not per event.
- **Better debugging.** Log lines link to the error, person and replay. Patterns, drop rules and sampling cut the noise.
- **Traces, no new tool.** Traces share the same per-GB bill as logs.

Facts: logs are kept 14 days by default (longer is $0.05/GB per month). Events are kept 1 year on free plans and 7 years on paid plans. Logs don't show up in insights, funnels or cohorts. Don't pitch this as moving their events. The customer decides what to keep.

## Glossary

| Term | What it means |
| --- | --- |
| Exception or error | Something in the code that failed |
| Issue | A group of the same exception, so a thousand identical errors show up as one thing to fix |
| Log | A line of text the system writes about what it's doing |
| Trace | The path of one request through every service it touched |
| Span | One step inside a trace, with how long it took |
| Metric | A number tracked over time, like error rate or latency |
| OpenTelemetry (OTel) | The open standard for sending logs, traces and metrics. PostHog takes it, so customers aren't locked in |
| Session replay | A recording of what the user saw and did |
| Distinct ID and session ID | The IDs that link a log line or span to a person and their replay |
| APM | Application performance monitoring. Our internal name for logs, tracing and metrics. Use the product names with customers |
| Observability | Being able to tell what's going on inside an app from the data it sends out: errors, logs, traces and metrics. In PostHog that's error tracking, logs, tracing and metrics, with session replay adding the user's side. |
| AI observability | Watching the LLM calls an AI product makes: prompts, responses, tokens, cost, latency and the tools it used. In PostHog it's its own product, AI Observability, and each trace links to the user, their replay and any errors. It answers how the AI feature behaves, not whether the app is up. |
| Application monitoring | Keeping an eye on an app's health (errors, slow requests, crashes) and getting alerted when something breaks. Often used as another word for APM. |
| RUM (real user monitoring) | Measuring performance and errors from real users' browsers and devices, like page load times, web vitals and front-end errors. Datadog sells it as a product. PostHog covers it with web vitals, error tracking and session replay, not a product called RUM. |
| Web vitals | Google's page experience scores: LCP (loading), INP (responsiveness) and CLS (layout shift). PostHog captures them in web analytics. |
| Telemetry | The data a system sends out about itself: logs, traces and metrics. |
| Sampling | Keeping only a share of the data, like 10% of sessions or log lines, to control cost. |
| Synthetic monitoring | Scripted, fake visits that check a page or flow still works, even when no real user is around. PostHog doesn't do this. |
| Uptime monitoring | Checking on a schedule that a site is up, often with a public status page. PostHog doesn't do this. |
| Infrastructure monitoring | Watching servers, containers and databases: CPU, memory, Kubernetes. PostHog doesn't do this. That's Datadog and Grafana territory. |
