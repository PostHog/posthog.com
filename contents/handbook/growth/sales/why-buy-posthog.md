---
title: Why buy PostHog
sidebar: Handbook
showTitle: true
---

AKA our Value Proposition, these are some of the things we've found useful to share when chatting to customers about why PostHog is different and better than our competitors. As a company, the primary user persona we are building for are Product Engineers, so we focus on them first. We then provide messaging for the other roles we may encounter in an inbound sales cycle, and still want to be successful when selling to them.

## Product Engineers

### One-liner

> We help you debug and ship your product faster.

### Summary

By integrating PostHog into your app, you’ll be able to track and diagnose errors, roll out and test new features and gain a better understanding of your user behavior.  With that greater understanding, you'll then be able to take action on it and respond to your user needs quickly and effectively.  Getting all of these capabilities through one SDK means you reduce the overhead of maintaining your app and can focus on shipping your product.

### Use cases
- [Automated error tracking](/error-tracking) for front and back end, coupled with other capabilities like product analytics and session replay lets you understand where the biggest issues are in your app, see them happening in real time and then diagnose and fix them.
- [Target new features](/feature-flags) at a segment of your user base, see them experiencing them in real time and get feedback via surveys on what’s working and what’s not.
- [Test out new features](/experiments) by splitting old and new experiences between users - PostHog’s statistical model will help you understand which variant of a feature to choose and then safely roll that out to all of your users.
- [Understand and debug](/ai-observability) how your users consume AI in your product and monitor performance and cost when using different models.
- [Respond to churn](/surveys) by triggering a survey when a subscription is canceled to understand what went wrong for them and how you can improve your product.

## Product Managers

### One-liner

> Self-serve analytics without needing to ask your engineers or data team for help.

### Summary

After your engineers integrate the PostHog SDK, you’ll be able to self-serve analytics without asking your data team for insights.  We automatically track user interactions with your app and then let you tag key events for use in analytics.  You’ll also be able to navigate from the data to individual user interactions to see how users interact with your app and make informed product decisions, and then finally use behavioral triggers to send feedback surveys and more all without engineering effort.

### Use cases
- [Create trends, funnels and other insights](/product-analytics) without asking your engineers to instrument events.  We automatically track pageviews, clicks, rageclicks etc and then make it easy to visualize these with insights Product Managers will be familiar with.
- [Easily uncover user friction](/session-replay) by following the drop-offs in a funnel to replays to understand what the user experiences.  Surface any errors to your engineering team via issue assignment to get your user problems solved quickly.
- [Enrich your product data](/bi) with revenue and other data to gain a deeper understanding of what drives revenue growth in your product.  It’s only a few clicks to integrate most data sources and then you’ll be able to enrich your user data with additional metrics without a data team.  We do the heavy lifting for you.
- [Ask questions of your product](/ai) - We create the insights for you, all you need to do is ask PostHog AI questions about your product.
- [Respond to churn](/surveys) by triggering a survey when a subscription is canceled to understand what went wrong for them.
- [Create event-driven workflows](/workflows) to automatically reach out to customers who hit a certain point in your product journey.


## Marketing

### One-liner

> A familiar analytics experience with all of the integrations you need to decide where to focus your marketing efforts.

### Summary

By deploying our simple JavaScript snippet on your website you’ll capture all of the data you need to measure channel performance, and then visualize that data in a familiar format without any additional report writing.  Optionally hook up Stripe or other revenue sources to measure revenue attribution.

### Use cases
- [Replace Google Analytics](/web-analytics) to get a view on your marketing data which is familiar to experienced marketers.  Recent updates to GA4 have not sat well with that persona so folks are looking for something more familiar.
- [Define conversion funnels](/funnels) to understand which content drives your users to sign up to your product.  
- [View aggregated page engagement](/heatmaps) with heatmaps and scroll depth tracking understanding what’s popular in your content.
- [Ad platform connection](/docs/data-pipelines/destinations/google-ads) provides pre-built insights to help you understand your campaign performance and associated costs.

## Data Engineers

### One-liner

> A complete developer platform which fits into your existing data stack.

### Summary

Using PostHog's [CDP](/cdp) lets you aggregate data from multiple technologies and platforms.  It takes a few clicks to set up exports of that data to your data warehouse, and your product and engineering teams can self-serve their own analytics from within PostHog.

### Use cases
- Aggregate your user and error data from web and mobile apps, backend systems, ad platforms and others into your data warehouse via our simple to set up [batch exports](/docs/data-pipelines/batch-exports).  Avoid needing to set up ETL jobs from disparate sources and figuring out APIs.
- Let your engineers and product team self-serve analytics and error tracking from within a familiar platform.

# General talking points for all roles

- By having [all of the products you need in one place](/handbook/why-does-posthog-exist), you reduce the burden of navigating and paying for different tools on all of your teams.  
- [We only build products which we know people use today already](/handbook/which-products) (e.g. have product market fit) but provide them in an integrated and cost-effective manner.  
- Analytics is an after-the-fact passive activity, but your events in PostHog can be so much more than that. You can use PostHog events to react to customer behaviors, without investing engineering time to make those workflows.
- Our [usage-based pricing](/handbook/how-we-make-money) means that you’ll only pay for what you use and have full control of those costs, unlike opaque software contracts, where the prices go up every year with zero innovation attached.  
- Plus, [the way we do sales is different](/sales).

## Per-product sales enablement

Product marketers on the [Developer Marketing team](/teams/developer-marketing) make sales enablement material for the products they own. Current material:

- [Data foundations](/handbook/growth/sales/data-foundations) – how to sell the data warehouse and the rest of the data stack, with the training deck and a recording of the session
- [Managed data warehouse (Trino)](https://docs.google.com/document/d/19P0SajrkCf7IS0jJEh08y5kqKANEGPq5S6ZqTpyFKts/edit?usp=sharing)
- TODO: Sara Miteva to add the title and link of their deck

If you want material for a different product, ask in the **#team-marketing** Slack channel.

### How to make sales enablement material

These notes come from the first training sessions that product marketers ran for the sales team.

#### Start with the products that are hardest to sell

Ask the sales team to rank products from easiest to hardest to sell, and work on the hardest first. Established categories and visual products, such as Product Analytics, Session Replay, and Replay Vision, are easier. Products with less to show on screen, such as the data warehouse, Error Tracking, and Logs, need more help.

#### Tell salespeople who to call, and when

Salespeople use this part the most. Many customers understand a product in theory, but it is the wrong time or the wrong person. Give ready-to-buy signals that are specific enough for a salesperson to open their book after the session and pick the accounts to call. A signal can be usage data, a change at the company, or something the customer said on a call.

#### Explain why a salesperson should sell it

Salespeople have quotas, so show how the product helps them hit theirs. A rough number helps, even an approximate one. For example, how much a customer might spend on data warehouse sources compared to what they spend on Product Analytics. If a product mostly keeps customers instead of adding revenue, say that, and explain why retention is worth their time.

#### Demo the result, not the setup

For a product that is hard to show, demo the answer it gives. The data foundations demo shows an insight that combines product data with external data. It doesn't add a source, because a new source takes time to sync. If there is no good customer data to show, use a [sandbox](/handbook/growth/sales/sandboxes).

#### Write down honest answers to objections

Collect the questions that salespeople actually ask, and answer them, including the answers that don't make us look good. In the data foundations session, salespeople asked about pricing, how to sell to enterprise customers, and where we are best in class and where we are not feature-complete yet.

One question was "Do we compete on price with a homegrown solution?" The honest answer is no, and nobody does. A homegrown solution costs less in vendor fees, but the customer's team has to build and maintain the infrastructure, and that costs engineering time.

#### Present for less time than you take questions

The data foundations session had 15 to 20 minutes of content and 45 minutes of questions. Most of the value came from the questions, because they showed what the sales team didn't understand and what to write next. Record the session and link the recording from your material.

#### Write it for agents too

Many salespeople prepare for calls with an agent such as Claude Code or PostHog Desktop, connected to PostHog, Granola, and Slack (see [AI investigation tools](/handbook/growth/sales/sales-and-cs-tools#ai-investigation-tools)). An agent can't read a deck well. After the session, put the content in Markdown: a handbook page such as [data foundations](/handbook/growth/sales/data-foundations), or a skill in the <PrivateLink url="https://us.posthog.com/project/2/llm-analytics/skills">PostHog skills store</PrivateLink>. Then a salesperson can ask their agent "Which of my accounts are ready for the data warehouse?" and get an answer that uses your signals and objection answers. [Turning knowledge into agent skills](/handbook/growth/sales/turning-knowledge-into-agent-skills) explains how.

#### Let scouts watch for signals

PostHog can check some signals automatically in our own project. A [scout](/docs/self-driving/scouts) can check a usage signal on a schedule and send the accounts that match to a salesperson in Slack. A [Replay Vision scanner](/docs/replay-vision) can watch session recordings for behavior that events don't show, such as a user who tries a product and gets stuck. A [scout on the scanner](/docs/replay-vision/scouts) then sends a digest of those sessions. If a signal works this way, include the scout instructions or the scanner prompt in your material, so that a salesperson can copy them.

#### Keep it alive after the session

After the data foundations session, salespeople sent messages about their pitches for about a week, and then the messages stopped. Earlier guides had the same problem. We announced them once, nobody maintained them, and they went out of date. Update the material when the product changes, ask salespeople how the pitch works for them, and bring the material back regularly, for example in the [SME update calls](/handbook/growth/sales/product-enablement#staying-current). If the pitch doesn't work, or doesn't help salespeople hit their quota, change it.
