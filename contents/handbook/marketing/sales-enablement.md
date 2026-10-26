---
title: Sales enablement
sidebar: Handbook
showTitle: true
---

Product marketers make sales enablement material for the products they own. This page explains how to make material that the sales team uses. [Per-product sales enablement](/handbook/growth/sales/why-buy-posthog#per-product-sales-enablement) links some examples of finished material. It is not a full list – keep the material for your product current in your product's own handbook pages.

These notes come from the first training sessions that product marketers ran for the sales team.

## Start with the products that are hardest to sell

Ask the sales team to rank products from easiest to hardest to sell, and work on the hardest first. Established categories and visual products, such as Product Analytics, Session Replay, and Replay Vision, are easier. Products with less to show on screen, such as the data warehouse, Error Tracking, and Logs, need more help.

## Tell the sales team who to call, and when

The sales team uses this part the most. Many customers understand a product in theory, but it is the wrong time or the wrong person. Give ready-to-buy signals that are specific enough for a TAM or CSM to open their book after the session and pick the accounts to call. A signal can be usage data, a change at the company, or something the customer said on a call.

## Explain why the sales team should sell it

TAEs and TAMs have quotas, so show how the product helps them hit theirs. For TAMs, each extra paid product adds 0.2x to their [quota multiplier](/handbook/growth/sales/how-we-work#how-commission-works---technical-account-managers), so a second or third product counts for more than its revenue alone. A rough number helps, even an approximate one. For example, how much a customer might spend on data warehouse sources compared to what they spend on Product Analytics. If a product mostly keeps customers instead of adding revenue, say that, and explain why retention is worth their time. CSMs care about this most.

## Demo the result, not the setup

For a product that is hard to show, demo the answer it gives. The data foundations demo shows an insight that combines product data with external data. It doesn't add a source, because a new source takes time to sync. If there is no good customer data to show, use a [sandbox](/handbook/growth/sales/sandboxes).

## Collect objections, not only FAQs

An FAQ and an objection are different things. An FAQ is a question about the product: how pricing works, which sources we support, or what is on the roadmap. You can write the FAQ yourself from the docs and the product team, and you should, because it stops the sales team asking you the same questions.

An objection is a reason a customer gives not to buy. For example:

- "I already have a data warehouse. Why do I need yours?"
- "PostHog doesn't do advanced modeling, does it?"
- "We can build this ourselves for less."

Objections are more valuable than FAQs, but you can't write them at your desk. They come from user interviews and from TAEs, TAMs, and CSMs who pitch the product to real customers. To collect them:

- Before the session, ask the sales team to send the objections they hear most. Go through them live.
- Join some customer calls and listen to how customers push back.
- Ask the sales team again a few times as the pitch matures. New objections come up as more customers hear the pitch, so update your battle cards each time.

Give an honest answer to each objection, including when the honest answer is that we can't handle it yet. For "We can build this ourselves for less," the honest answer is that we don't compete on price with a homegrown solution, and nobody does. A homegrown solution costs less in vendor fees, but the customer's team has to build and maintain the infrastructure, and that costs engineering time.

## Present for less time than you take questions

The data foundations session had 15 to 20 minutes of content and 45 minutes of questions. Most of the value came from the questions, because they showed what the sales team didn't understand and what to write next. Record the session and link the recording from your material.

## Write it for agents too

Many sales folks prepare for calls with an agent such as Claude Code or PostHog Desktop, connected to PostHog, Granola, and Slack (see [AI investigation tools](/handbook/growth/sales/sales-and-cs-tools#ai-investigation-tools)). An agent can't read a deck well. After the session, put the content in Markdown: a handbook page such as [data foundations](/handbook/growth/sales/data-foundations), or a skill in the <PrivateLink url="https://us.posthog.com/project/2/llm-analytics/skills">PostHog skills store</PrivateLink>. Then a TAM can ask their agent "Which of my accounts are ready for the data warehouse?" and get an answer that uses your signals and objection answers. [Turning knowledge into agent skills](/handbook/growth/sales/turning-knowledge-into-agent-skills) explains how.

## Let scouts watch for signals

PostHog can check some signals automatically in our own project. A [scout](/docs/self-driving/scouts) can check a usage signal on a schedule and send the accounts that match to their owner in Slack. A [Replay Vision scanner](/docs/replay-vision) can watch session recordings for behavior that events don't show, such as a user who tries a product and gets stuck. A [scout on the scanner](/docs/replay-vision/scouts) then sends a digest of those sessions. If a signal works this way, include the scout instructions or the scanner prompt in your material, so that the sales team can copy them.

## Keep it alive after the session

After the data foundations session, sales folks sent messages about their pitches for about a week, and then the messages stopped. Earlier guides had the same problem. We announced them once, nobody maintained them, and they went out of date. Update the material when the product changes, ask the sales team how the pitch works for them, and bring the material back regularly, for example in the [SME update calls](/handbook/growth/sales/product-enablement#staying-current). If the pitch doesn't work, or doesn't help TAEs and TAMs hit their quota, change it.
