---
title: Sales enablement
sidebar: Handbook
showTitle: true
---

Product marketers make sales enablement material for the products they own. This page is about how to make material that doesn't suck, and that GTM folks actually use. [Per-product sales enablement](/handbook/growth/sales/why-buy-posthog#per-product-sales-enablement) links some examples. It isn't a full list – keep the material for your product current in your product's own handbook pages.

These notes come from the first training sessions that product marketers ran for the sales team.

## Start with the products that are hardest to sell

Ask GTM folks to rank products from easiest to hardest to sell, and work on the hardest first. Established categories and visual products, such as Product Analytics, Session Replay, and Replay Vision, are easier (nobody needs a training session to sell a product that demos itself). Products with less to show on screen, such as the data warehouse, Error Tracking, and Logs, need more help.

## Tell GTM folks who to call, and when

This is the part GTM folks use the most. Many customers understand a product in theory, but it's the wrong time or the wrong person. Give ready-to-buy signals specific enough that someone can open their book after the session and pick the accounts to call. A signal can be usage data, a change at the company, or something the customer said on a call.

## Explain why it's worth selling

Show how the product helps hit quota. A rough number is fine, for example how much a customer might spend on data warehouse sources compared to Product Analytics. If a product mostly keeps customers instead of adding revenue, say that (retention counts too).

## Demo the result, not the setup

For a product that is hard to show, demo the answer it gives. The data foundations demo shows an insight that combines product data with external data. It doesn't add a source, because a new source takes time to sync (and a loading spinner is not a pitch). If there is no good customer data to show, use a [sandbox](/handbook/growth/sales/sandboxes).

## Collect objections, not only FAQs

An FAQ is a question about the product: how pricing works, which sources we support, or what is on the roadmap. Write those yourself from the docs (future you will be glad to send a link instead of answering the same Slack message again).

An objection is a reason a customer gives not to buy:

- "I already have a data warehouse. Why do I need yours?"
- "PostHog doesn't do advanced modeling, does it?"
- "We can build this ourselves for less."

Objections are the good stuff, and you can't write them at your desk. They come from user interviews and from GTM folks who pitch to real customers. So:

- Before the session, ask GTM folks for the objections they hear most, and go through them live.
- Sit in on some customer calls.
- Ask again a few times as the pitch matures, and update your battle cards. Customers always find new ones.

Answer honestly, even when the answer is "we can't do that yet" (they'll find out on a call anyway, so it's better they hear it from you). For "We can build this ourselves for less," the honest answer is that we don't compete on price with a homegrown solution, and nobody does. It costs less in vendor fees, but the customer's team has to build and maintain it, and that costs engineering time.

## Present for less time than you take questions

The data foundations session had 15 to 20 minutes of content and 45 minutes of questions. The questions were the most useful part, because they showed what GTM folks didn't understand and what to write next (yes, even after all that time on the slides). Record the session and link the recording from your material.

## Write it for agents too

Many GTM folks prepare for calls with an agent such as Claude Code or PostHog Desktop, connected to PostHog, Granola, and Slack (see [AI investigation tools](/handbook/growth/sales/sales-and-cs-tools#ai-investigation-tools)). Agents are bad at reading decks. After the session, put the content in Markdown: a handbook page such as [data foundations](/handbook/growth/sales/data-foundations), or a skill in the <PrivateLink url="https://us.posthog.com/project/2/llm-analytics/skills">PostHog skills store</PrivateLink>. Then someone can ask their agent "Which of my accounts are ready for the data warehouse?" and get an answer that uses your signals and objection answers. [Turning knowledge into agent skills](/handbook/growth/sales/turning-knowledge-into-agent-skills) explains how.

## Let scouts watch for signals

PostHog can check some signals automatically in our own project. A [scout](/docs/self-driving/scouts) can check a usage signal on a schedule and send the matching accounts to their owner in Slack. A [Replay Vision scanner](/docs/replay-vision) can watch session recordings for behavior that events don't show, such as a user who tries a product and gets stuck. A [scout on the scanner](/docs/replay-vision/scouts) then sends a digest of those sessions. If a signal works this way, put the scout instructions or the scanner prompt in your material so GTM folks can copy them.

## Keep it alive after the session

After the data foundations session, GTM folks sent messages about their pitches for about a week, and then the messages stopped. Earlier guides had the same problem: we announced them once, nobody maintained them, and they went out of date (every marketer has a folder of launch docs nobody opens). Update the material when the product changes, and bring it back regularly, for example in the [SME update calls](/handbook/growth/sales/product-enablement#staying-current). If the pitch doesn't work, change it.
