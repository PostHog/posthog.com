---
title: How CloudPeek cut debugging time by 10x with PostHog Logs and Error Tracking
customer: CloudPeek
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/cloudpeek_posthog.png
date: 2026-03-10
---

[CloudPeek](https://cloudpeek.io) is an agentic platform for next-generation cybersecurity. It sits above an organisation's existing security stack as a reasoning and orchestration layer – connecting to any tool, understanding the specific environment, and letting operators automate complex workflows with full control and auditability.

Craig Hollington leads the engineering team at CloudPeek – and when PostHog launched [Logs](/docs/logs), his team jumped on it immediately.

## The debugging gap

Before PostHog launched Logs, CloudPeek's team didn't have a dedicated logging tool. They were already using PostHog for [error tracking](/error-tracking), so they'd see exceptions fire – but tracing back to a root cause meant SSHing into servers and searching local log files with grep.

_"We used to get exception logs come through on PostHog, and then I'd have to log onto the server manually and search our log files which were written locally."_

For a fast-moving team shipping AI-driven security tooling across diverse environments, this created a real bottleneck. Issues on a server were manageable. But when something happened on a less accessible device, the trail often went cold.

_"If it was on something a bit more niche like a laptop, it became harder or almost impossible to actually diagnose a root cause."_

Craig had used dedicated logging tools in previous roles but both were too costly and cumbersome to set up for what CloudPeek needed at this stage. They also looked at Amazon CloudWatch, given their heavy AWS usage, but the setup overhead and custom logging requirements ruled it out.

## How CloudPeek debugs now

Today, the team uses two primary debugging workflows. The first starts from a specific exception: they take the URL or ID from the fired alert, narrow the time window down to about a minute either side, and trace through exactly what happened to cause the issue.

_"We try to really narrow down our point of time, so it's only like maybe a minute either side of when the alarm fired. So we can trace through very granularly what happened."_

The second approach uses PostHog's MCP integration to search more broadly when they don't have a precise starting point.

The team also uses AI-generated test scripts to simulate edge cases and user behavior. They fire these scripts, then watch the logs live to see what breaks and what doesn't – which lets them ship hot fixes quickly.

_"We automatically get AI to write triage scripts and fire them to see what works, and then from there we review the log files to see what it did and what it didn't do."_

## Why OpenTelemetry was the deciding factor

CloudPeek works with customers who have strict audit requirements, particularly in the UK government. The fact that PostHog Logs uses OpenTelemetry under the hood turned out to be the single biggest factor in their adoption.

Because it's built on an open standard, CloudPeek can tell customers who want their own logs to simply set a few environment variables and point to their own collector. No custom integrations, no bespoke pipelines.

_"It was a drop-in change for us. Instead of us having to deal with anything custom, we can just tell them: 'You want your own logs? Great. Set these environment variables and you're good to go.'"_

This was also the reason they passed on CloudWatch – OpenTelemetry meant they didn't need to support multiple custom logging systems or rebuild anything when a new customer had different requirements.

## The results: 5–10x faster debugging and better reliability

<OSQuote
  customer="cloudpeek"
  author="craig_hollington"
  quote={0}
 />

That collaboration piece has been just as important as the speed. When two or three developers are working on the same issue, they can share links to specific log entries, add comments, and split up the investigation – one person tracing the root cause while another reviews the affected service. Their overall service reliability has improved significantly as a result, with the team now able to identify and resolve issues before they compound.

## From Error Tracking into Logs: one investigation flow

One of the most impactful changes for CloudPeek is how error tracking and logs work together.

<OSQuote
  customer="cloudpeek"
  author="craig_hollington"
  quote={1}
 />

This workflow replaced what used to be a completely disconnected process: seeing an error in one place, then manually hunting through server files in another. Now the investigation stays inside one tool, and the whole team can follow the same trail.

The team has also found that watching Logs live during testing has changed how they ship. When AI-generated test scripts run edge cases against the platform, developers monitor the log output in real time, spot unhandled cases immediately, and push hot fixes without waiting for a bug report.

## Why it all works: one tool, one place

CloudPeek's philosophy is that observability shouldn't require jumping between a dozen different dashboards. Having [Logs](/docs/logs), [Error tracking](/error-tracking), and [LLM analytics](/llm-analytics) in a single platform means the team spends their time investigating problems rather than context-switching between tools.

_"We don't want to pivot between 10 different windows, 10 different tools to find a problem. We want to be in one place only."_
