---
title: Sales enablement
sidebar: Handbook
showTitle: true
---

Product marketers make sales enablement material for the products they own. This page explains how to make material that the sales team uses. The sales team finds the current material in [per-product sales enablement](/handbook/growth/sales/why-buy-posthog#per-product-sales-enablement). Add your material to that list when you finish it.

These notes come from the first training sessions that product marketers ran for the sales team.

## Start with the products that are hardest to sell

Ask the sales team to rank products from easiest to hardest to sell, and work on the hardest first. Established categories and visual products, such as Product Analytics, Session Replay, and Replay Vision, are easier. Products with less to show on screen, such as the data warehouse, Error Tracking, and Logs, need more help.

## Tell salespeople who to call, and when

Salespeople use this part the most. Many customers understand a product in theory, but it is the wrong time or the wrong person. Give ready-to-buy signals that are specific enough for a salesperson to open their book after the session and pick the accounts to call. A signal can be usage data, a change at the company, or something the customer said on a call.

## Explain why a salesperson should sell it

Salespeople have quotas, so show how the product helps them hit theirs. A rough number helps, even an approximate one. For example, how much a customer might spend on data warehouse sources compared to what they spend on Product Analytics. If a product mostly keeps customers instead of adding revenue, say that, and explain why retention is worth their time.

## Demo the result, not the setup

For a product that is hard to show, demo the answer it gives. The data foundations demo shows an insight that combines product data with external data. It doesn't add a source, because a new source takes time to sync. If there is no good customer data to show, use a [sandbox](/handbook/growth/sales/sandboxes).

## Write down honest answers to objections

Collect the questions that salespeople actually ask, and answer them, including the answers that don't make us look good. In the data foundations session, salespeople asked about pricing, how to sell to enterprise customers, and where we are best in class and where we are not feature-complete yet.

One question was "Do we compete on price with a homegrown solution?" The honest answer is no, and nobody does. A homegrown solution costs less in vendor fees, but the customer's team has to build and maintain the infrastructure, and that costs engineering time.

## Present for less time than you take questions

The data foundations session had 15 to 20 minutes of content and 45 minutes of questions. Most of the value came from the questions, because they showed what the sales team didn't understand and what to write next. Record the session and link the recording from your material.

## Write it for agents too

Many salespeople prepare for calls with an agent such as Claude Code or PostHog Desktop, connected to PostHog, Granola, and Slack (see [AI investigation tools](/handbook/growth/sales/sales-and-cs-tools#ai-investigation-tools)). An agent can't read a deck well. After the session, put the content in Markdown: a handbook page such as [data foundations](/handbook/growth/sales/data-foundations), or a skill in the <PrivateLink url="https://us.posthog.com/project/2/llm-analytics/skills">PostHog skills store</PrivateLink>. Then a salesperson can ask their agent "Which of my accounts are ready for the data warehouse?" and get an answer that uses your signals and objection answers. [Turning knowledge into agent skills](/handbook/growth/sales/turning-knowledge-into-agent-skills) explains how.

## Let scouts watch for signals

PostHog can check some signals automatically in our own project. A [scout](/docs/self-driving/scouts) can check a usage signal on a schedule and send the accounts that match to a salesperson in Slack. A [Replay Vision scanner](/docs/replay-vision) can watch session recordings for behavior that events don't show, such as a user who tries a product and gets stuck. A [scout on the scanner](/docs/replay-vision/scouts) then sends a digest of those sessions. If a signal works this way, include the scout instructions or the scanner prompt in your material, so that a salesperson can copy them.

## Keep it alive after the session

After the data foundations session, salespeople sent messages about their pitches for about a week, and then the messages stopped. Earlier guides had the same problem. We announced them once, nobody maintained them, and they went out of date. Update the material when the product changes, ask salespeople how the pitch works for them, and bring the material back regularly, for example in the [SME update calls](/handbook/growth/sales/product-enablement#staying-current). If the pitch doesn't work, or doesn't help salespeople hit their quota, change it.
