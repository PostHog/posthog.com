---
date: "2026-05-07"
title: "4,063 errors closed without a human opening PostHog – here's what we learned"
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/Template_cover_14_0da4d45933.jpg
author:
  - sara-miteva
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: Engineering
tags:
  - AI
  - Error tracking
  - Engineering
  - Research
---

Last month, our customers deployed AI agents to PostHog projects to try and solve 6,124 errors in their products. They resolved 4,063 issues. They suppressed 1,751 more. They routed 310 to the right team. Almost none of those agents opened the PostHog UI to do it.

The numbers track with our bet on [self-driving products](/blog/self-driving-product) – the more agents understand your codebase and your data, the more of the routine work they take off your plate, and triage is one of the first places that shift becomes visible.

We were obviously interested to find out what types of problems users were addressing with the MCP.

Here's what we found.

## Agents do three different jobs in your error backlog

We grouped 30 days of MCP-driven error triage actions, and they sorted cleanly into three buckets:

**Resolve a.k.a. "We fixed it."** This is the headline number. Over 4,000 issues were marked as done by an agent after either generating a fix, confirming a fix had shipped, or tracing the root cause and concluding the issue had already self-resolved.

**Suppress a.k.a. "Stop showing me this."** About 1,750 issues marked as known noise – third-party SDK warnings, expected exceptions, the canonical browser garbage you've seen a thousand times (`Script error.`, `ResizeObserver loop completed...`, `Object Not Found Matching Id`). Agents are quietly maintaining the noise filter you keep meaning to maintain yourself.

**Route a.k.a. "Wrong owner."** Over 300 issues reassigned to a different person or team – sometimes alongside a freshly-created Linear ticket so the new owner has a place to track the work.

Three different outcomes, three different reasons users invoked the tool. Our initial perception of the agent doing only triage was too coarse. What actually happened is more like "the agent does whatever needs to be done and then marks the issue accordingly."

## What we learned

A few things stood out from watching agent-driven triage in the wild.

### Smaller, sharper tools win

When we first shipped MCP support for error tracking, `error-tracking-query-issue` was one combined endpoint covering several jobs at once. Watching agents in practice, we kept seeing them want those jobs separately. In late April we split the tool into three – `issues-list`, `issue`, and `issue-events`. Bulk-triage flows got noticeably smoother right after.

### Triage isn't one motion

We started thinking about MCP triage as a single workflow – "the agent updates the issue." In practice, three distinct things are happening: things get fixed and resolved, things get filtered as known noise, and things get rerouted to the right owner. These are three different jobs with three different prompts and three different definitions of success. The next round of skills we ship will treat them that way.

### Errors are starting points, not endings

When agents engage with an error, they rarely stop at the issue. They drill into the surrounding events, pull the affected users, check which feature flags were on, and follow into session recordings. The MCP is most powerful when it carries an investigation across products without anyone having to context-switch.

### Search behaviour told us something we didn't expect

About half of the searches we see look like what you'd expect – error strings, exception types, common JS patterns. The other half are organised by business surface: checkout, billing, auth, embed. People aren't just hunting "the latest TypeErrors." They're asking "what's broken in checkout this week." That's a clear signal that business-surface filtering needs to be as easy as exception-type filtering, and it's now on our short list.

### Bulk work is the real win

Single-issue debugging was always doable in the UI. What MCP-driven triage does best is the kind of bulk operation that used to take an hour of clicking – "suppress every variant of this third-party noise across the last 90 days" or "route every iOS crash to the mobile team." One sentence, and it's done. That's where the time savings actually live.

Here are some fun facts too: 

![error tracking mcp fun facts](https://res.cloudinary.com/dmukukwp6/image/upload/Error_tracking_MCP_3_bd6f36e242.png)

## The kinds of errors agents handle best

There are four categories where MCP-driven triage really earns its keep.

### Frontend noise that everyone has and nobody cleans up

Browser quirks, deprecated SDK warnings, third-party tracker exceptions. The "we know about it, it doesn't matter" pile that grows until your dashboard becomes unreadable. Try:

```
Suppress any errors matching `Script error.`, `ResizeObserver loop completed`, or `Object Not Found Matching Id` from the last 90 days.
```

[Try it with PostHogAI](https://app.posthog.com/#panel=max:Suppress%20any%20errors%20matching%20Script%20error.%2C%20ResizeObserver%20loop%20completed%2C%20or%20Object%20Not%20Found%20Matching%20Id%20from%20the%20last%2090%20days.)

### Network and auth errors that need filtering, not fixing

`Failed to fetch`, `AuthRetryableFetchError`, timeout exceptions – usually transient, often best handled by suppression combined with alerting on real spikes. Try:

```
Create a suppression rule for `Failed to fetch` errors from `api.thirdparty.com`, but keep me alerted if the rate exceeds 100 per hour.
```

[Try it with PostHogAI](https://app.posthog.com/#panel=max:Create%20a%20suppression%20rule%20for%20Failed%20to%20fetch%20errors%20from%20api.thirdparty.com%2C%20but%20keep%20me%20alerted%20if%20the%20rate%20exceeds%20100%20per%20hour.)

### Business-area errors that need routing

`TypeError` in your checkout flow, `ChunkLoadError` after a deploy, payment webhook failures. Group by route or service and reassign to the team that owns the surface. Try:

```
Group every error on `/checkout` from the last week by exception type, and assign each group to the team that owns the relevant service.
```

[Try it with PostHogAI](https://app.posthog.com/#panel=max:Group%20every%20error%20on%20%2Fcheckout%20from%20the%20last%20week%20by%20exception%20type%2C%20and%20assign%20each%20group%20to%20the%20team%20that%20owns%20the%20relevant%20service.)

### Platform-specific crashes

iOS, Android, server-side errors that only some teammates can investigate. Try:

```
Reassign every iOS crash from the last release to the mobile team, and create a Linear ticket linking back to the PostHog issue.
```

[Try it with PostHogAI](https://app.posthog.com/#panel=max:Reassign%20every%20iOS%20crash%20from%20the%20last%20release%20to%20the%20mobile%20team%2C%20and%20create%20a%20Linear%20ticket%20linking%20back%20to%20the%20PostHog%20issue.)

## Prompts worth trying

Once your agent is connected to PostHog Error Tracking, these prompts map onto real work people are already doing.

### For weekly cleanup

- "Show me the top 10 errors from the last 7 days. For each, tell me whether it's growing, stable, or shrinking."
- "Resolve any issues that haven't fired in the last 30 days."
- "Suppress every error matching the patterns I'll list below."

### For incident triage

- "What errors started spiking in the last hour? Show me the full stack trace for the top three."
- "Find any errors that began appearing after my latest deploy."
- "Which user is most affected by this error, and what were they doing right before it happened?"

### For routing and ownership

- "Create an assignment rule that sends all `TypeError` exceptions to the frontend team."
- "Any error containing `stripe` should route to the payments team."
- "For every active issue tagged `mobile`, create a Linear ticket and assign it to the mobile owner."

### For root-cause investigation

- "For this error, find the matching session recordings and summarise what the user did before it fired."
- "What changed in our codebase right before this error started appearing?"
- "Show me which feature flags were on for the users hitting this error."

## Try the MCP

Install the MCP server in your preferred client – the AI wizard handles setup for Claude, Cursor, Windsurf, VS Code, and others:

```bash
npx @posthog/wizard mcp add
```

Or [configure it manually](https://posthog.com/docs/model-context-protocol#manual-install).
