---
title: Sales enablement
sidebar: Handbook
showTitle: true
---

Product marketers make sales enablement material for the products they own. This page is about how to make material that's worth spending your time on, and that GTM folks actually use. [Per-product sales enablement](/handbook/growth/sales/why-buy-posthog#per-product-sales-enablement) links some examples.  

## Start with the products that are hardest to sell

Ask GTM folks (TAMs, EAs, CSMs) to rank products from easiest to hardest to sell, and work on the hardest first. Established categories and visual products, such as Product Analytics, Session Replay, and Replay Vision, are easier to pitch. Products with less to show on screen, such as the data warehouse, Error Tracking, and Logs, need more help.

## Narrow down the buying signals

GTM folks know their accounts and find buying signals better than we do, so don't try to tell them who to call. Tell them which customer profile(s) your product fits, and which signals show an account matches. For example:

- **Usage of a related PostHog product is going up.** Session Replay users who watch a lot of recordings are more likely to try Replay Vision.
- **They use a tool that pairs well with your product, or leads into it.** Teams that bill through Stripe are a good fit for revenue analytics.
- **Something changed at the company.** They raised, they're moving into a new market, or they've hired a new role. 
- **The company is at a certain point of maturity.** A team of 20+ is more likely to adopt the Slack app than a team of 2.
- **There's a person in a role that the product suits.** A data analyst is a good fit for the data warehouse. A growth marketer is a good fit for Web Analytics and Experiments.

Many customers understand and like a product in theory, but it's the wrong time to pitch it (or the wrong person at the org to sell it to). Say what "the right time" and "the right person" look like for your product.

## Explain why it's worth selling

Sales folks aren't coin-operated, but it helps to show how the product helps them hit quota. A rough number is fine, for example how much a customer might spend on data warehouse sources compared to Product Analytics. If a product mostly keeps customers instead of adding revenue, say that (retention counts too).

## Demo the result, not the setup

For a product that is hard to show, demo the answer it gives. The data foundations demo shows an insight that combines product data with external data. It doesn't add a source, because a new source takes time to sync (and a loading spinner is not a pitch). If there is no good customer data to show, use a [sandbox](/handbook/growth/sales/sandboxes).

## Collect objections, not only FAQs

An FAQ is a question about the product: how pricing works, which sources we support, or what is on the roadmap. An objection is a reason a customer gives not to buy:

- "I already have a data warehouse. Why do I need yours?"
- "PostHog doesn't do advanced modeling, does it?"
- "We can build this ourselves for less."

Objections are the good stuff. They come from user interviews and from GTM folks who pitch to real customers. So:

- Before a training session, ask GTM folks for the objections they hear most, and go through them live.
- Sit in on some customer calls and user interviews (or schedule your own).
- Ask again a few times as the pitch matures, and update your battle cards. Customers always find new ones.

Answer objections honestly, even when the answer is "I'm sorry Dave. I'm afraid I can't do that" (yet). 

## If you run a session, present for less time than you take questions

The data foundations training session had 15 to 20 minutes of content and 45 minutes of questions. The questions were the most useful part, because they showed what GTM folks didn't understand and what to write next (yes, even after all that time spent making the slides). Record the session and link the recording from your material.

## Write it for agents too

Many GTM folks prepare for calls with an agent such as Claude Code or PostHog Desktop, connected to PostHog, Granola, and Slack (see [AI investigation tools](/handbook/growth/sales/sales-and-cs-tools#ai-investigation-tools)). Agents are generally bad at reading decks. After the session, put the content in Markdown: a handbook page such as [data foundations](/handbook/growth/sales/data-foundations), or a skill in the <PrivateLink url="https://us.posthog.com/project/2/llm-analytics/skills">PostHog skills store</PrivateLink>. Then someone can ask their agent "Which of my accounts are ready for the data warehouse?" and get an answer that uses your signals and objection answers. [Turning knowledge into agent skills](/handbook/growth/sales/turning-knowledge-into-agent-skills) explains how.

## Let scouts watch for signals

PostHog can check some signals automatically in our own project. A [scout](/docs/self-driving/scouts) can check a usage signal on a schedule and send the matching accounts to their owner in Slack. A [Replay Vision scanner](/docs/replay-vision) can watch session recordings for behavior that events don't show, such as a user who tries a product and gets stuck. A [scout on the scanner](/docs/replay-vision/scouts) then sends a digest of those sessions. If a signal works this way, put the scout instructions or the scanner prompt in your material so GTM folks can copy them.

## Keep it alive after the session

After the data foundations session, GTM folks sent messages about their pitches for about a week, and then the messages stopped. Earlier guides had the same problem: we announced them once, nobody maintained them, and they went out of date (every marketer has a folder of launch docs nobody opens). Update the material when the product changes, and bring it back regularly, for example in the [SME update calls](/handbook/growth/sales/product-enablement#staying-current). If the pitch doesn't work, change it.
