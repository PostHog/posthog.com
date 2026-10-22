---
title: How AI changes the way PostHog is used
date: 2026-10-22
author:
  - ian-vanagas
rootpage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: General
tags:
  - AI
---

People can't stop talking about how AI changed the way products are used. We can't stop writing about it. 

And although theorizing is fun, hard numbers are better. Here's really how AI has changed the way PostHog is being used based on the real data we capture.

> **Note:** Most of this data is a snapshot from September 2026, and a lot of it is new:
>
> - MCP Analytics was only released into alpha in June. 
> - The source of object creation (human vs AI) was set up at different times for different products.
> - Data from PostHog's own agents wasn't always separated. 
>
> This can cause AI trends to seem sharper than they actually are. 

## AI creates a majority of dashboards and insights

When you look at our most popular products and count  creation through our MCP, CLI, installation wizard, Slack app, Scouts, and PostHog AI as "AI," you'll see that AI creates a huge share of objects across PostHog: 

| Product       | AI        | Web UI | API   |
| ------------- | --------- | ------ | ----- |
| Insights      | **58.7%** | 15.0%  | 25.3% |
| Dashboards    | **56.4%** | 23.6%  | 18.4% |
| Workflows     | **47.4%** | 33.2%  | 19.5% |
| Experiments   | **45.8%** | 27.7%  | 26.3% |
| Feature flags | **36.1%** | 36.6%  | 21.8% |

AI dashboard creation is mostly flat compared to April 2026, up from 54%. Others have seen more recent and rapid adoption:

- Insights is up from 43% to 59%
- Experiments is up from 19.9% to 45.8%
- Feature flags is up from 14.3% to 36.1%

## The UI is not dead, even for agent users

Counting "viewed" as being looked at 24+ hours after being created (within 30 days), insights shows the biggest gap between views to AI vs UI created objects. 

| Product     | Viewed in UI (AI) | Viewed in UI (UI) | Still viewed day 15–30 (AI / UI) |
| :---------- | ----------------: | ----------------: | -------------------------------: |
| Insights    |            **7%** |           **24%** |                          2% / 9% |
| Dashboards  |           **52%** |           **54%** |                        28% / 30% |
| Experiments |           **63%** |           **71%** |                        31% / 41% |
| Workflows   |           **34%** |           **47%** |                        14% / 19% |

Just because someone uses agents, doesn't mean they give up on the UI either. 96% of agent-heavy users (meaning they made 200+ calls through their agent in September) still use the UI. People who start using agents kept the same number of days with a UI pageview (median of 9), while similar users who didn't start with agents fell from 8 to 5. 30% of experiments created through the MCP were later edited in the UI, and about of a third of their launches happened there too. 

## Agents speak SQL

74% of MCP queries are SQL (as opposed to trend, funnel, or schema queries), while in the UI only 43% are. Overall, `execute-sql` is our most popular MCP tool at 52.3% of all tool calls. It's used 4x more than any other tool.

Interestingly, across people who use both, Claude calls `execute-sql` a lot more than Codex (66% to 38%). Codex relies more on schema lookups (21% to 8%), while Claude is willing to fail and try again. 5.2% of Claude's SQL calls fail compared to only 3.6% of Codex's.

## Agents and humans prefer different products

If you compare MCP tool calls with UI pageviews, you get a sense of what products are more used by one or the other. 

- UI-dominant products include: replay (0.04 MCP tool calls per UI pageview), dashboards (0.06), web analytics (0.07), and surveys (0.07).
- Agent-heavy products include logs (1.10), error tracking (0.61), insights (0.50), and warehouse/CDP (0.49).

Although this undercounts unassignable SQL tool calls, you can see the split here. Watching and browsing happens in the UI, investigating and debugging happen with AI.

## The surface shapes the work

- The wizard is for setup. 64% of its tool calls are for writing things. Much higher than the next largest write source (WebMCP at 22%).
- Slack is almost the opposite. 78% is SQL and schema lookups. Only 5% writes.
- Cursor is a leader for error tracking usage. 5.8% of its calls are related to error tracking, compared to 2.9% of Codex's and 2.1% of Claude's.
- OpenAI reads the docs. `docs-search` is 5.5% of Codex's calls, but only 0.7% of Claude Code's.

## Agent users do more

Usage across PostHog is up. Between July 2025 and September 2026, the median PostHog creator went from 3 objects a month to 6. Among people who created something in both September 2025 and September 2026, those who started using agents went from a median of 5 objects created to 11. Those who didn't went from 4 to 3.

They also use more products beyond just product analytics like session replay, feature flags, error tracking, and logs. For orgs with over 1M events:

| Org type       | Extra products in use | Orgs with 3+ extra products |
| -------------- | --------------------- | --------------------------- |
| No AI          | 1.33                  | 14%                         |
| 100+ MCP calls | 3.46                  | 68%                         |

After first using the MCP, 28–37% of orgs added a product within two months, against 4–8% of non-adopting controls, depending on their start month and size. 

## A lot of users don't use AI at all, but customers do

77.6% of free organizations don't use AI, but that's only 22.3% for paying orgs. 

86% of enterprise, scale, and teams orgs used AI. Only 9% of "big spenders" used no AI, making an average of 4,004 calls per month. For free orgs using the MCP, this is 136 calls per month, but most free orgs make zero calls.

Our new ICP of "AI-pilled software teams" is looking pretty good right about now.