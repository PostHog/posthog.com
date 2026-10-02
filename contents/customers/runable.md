---
title: How Runable builds an agent for small business owners and tracks everything in PostHog
customer: Runable
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/LEGIT_2b37bf6d2f.png
date: 2026-09-23
---

[Runable](https://runable.com) is an AI platform that turns natural language prompts into apps, websites, pitch decks, ad campaigns, and more. The company recently closed a $21M Series A – momentum that’s reflected in their product data sent to PostHog: event volume surged from 317k in August 2025 to **40M** in August 2026.

Most of Runable's users are small business owners who want to leverage AI without setting up agents or API keys. "Almost 80% of the world still doesn’t use agents," says Eshaan Pawan, Head of Growth. "Because it's hard."

When Runable started in mid-2025, no one knew what a general-purpose agent should look like. "Last year, it was still pretty new to anyone outside the AI sphere" says Ankit Kumar, an SDE at Runable. With no playbook to copy, the team had to learn from how people actually used it.

Their first step was setting up [Product Analytics](/product-analytics) and [Session Replay](/session-replay), to see where people got stuck in the product. [Error Tracking](/error-tracking) and [Logs](/logs) followed for debugging, then [Feature Flags](/feature-flags) to safely roll out new features.

For Ankit, LLM traces in [AI Observability](/ai-observability) were the big win. "The main feature in Runable is the agent run – how the agent is responding to user messages," he says. His team needs to see where runs get stuck in order to set engineering priorities. In addition to using the default [AIO](/docs/ai-observability/surfaces/web-app) dashboard to track cost, latency, tokens, and error rate across models, features, and users, they build a dashboard for each failure mode, fix the worst issues first, then focus on cutting token use and tuning caching.

<OSQuote
  customer="runable"
  author="ankit_kumar"
  quote={0}
 />

## Testing big changes with small rollouts

In February, Runable tried a pricing page that built a custom plan around each user's use case instead of offering four or five fixed ones. It went out behind a feature flag to 10–20% of users, and the data showed it hurt conversion.

"We noticed that users found the UI a bit confusing," Ankit says. About six weeks in, they scrapped it. "That decision was totally dependent on feature flags and event tracking in PostHog." Since only a slice of users ever saw it, there was no announcement to walk back and no flood of complaints – just a flag to turn off.

That's how most things ship at Runable, which has 39 flags live in production right now. A new model that's better for one kind of user can be worse for another, so the team doesn't ship everything to everyone at once. They split their [ICP](/newsletter/ideal-customer-profile-framework) into personas such as freelancers, social media creators, and first-timers. [Traces](/docs/ai-observability/traces) and events show what each segment is prompting for, so new features go out behind flags to the group they suit best.

The growth team uses flags too, for dynamic pricing and credits. An agent sets them up, then Eshaan checks the logic in the PostHog Web UI. "It's directly impacting the product," he says. "I can't leave it to the agent completely."

![Runable home page](https://res.cloudinary.com/dmukukwp6/image/upload/runable_home_d7e83d3b82.png)

## A refreshing use of dashboards

At his last company, Eshaan worked with 40–50 people whose whole job was tying acquisition data to retention and product analytics. At Runable, he does the same work with a team of two. "Ankit set up the product metrics and I set up the acquisition metrics," he says. "And that's it. That's our team." He puts that down to having one source of truth: "It has really helped us cut down the number of people required."

Eshaan is a power user of both AI and UI. He might actually be the heaviest [dashboard](/docs/product-analytics/dashboards) user we've met, with over 500 insight tiles and about 100 he checks four or five times a day. "I'm the guy who's just refreshing all the dashboards every hour," he says. "I'm using it like people use Databricks plus Tableau."

He didn't build them by hand. First, he connected 13 sources to Runable's [Context Warehouse](/context-warehouse), including Stripe, six ad platforms, AppsFlyer, Dub, and the Google Sheets where he logs influencer campaigns. Then he pointed the Runable agent at the PostHog API, with his own config and skills, and had it build the insights.

The result is the whole [funnel](/docs/product-analytics/funnels) in one place: impression → page view → sign-up → first prompt → first artifact → free credit limit → paid, broken down by source, country, and device. PostHog also sends his conversion events straight to Google Ads and Meta, so he no longer needs Google Tag Manager.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_light_61b3bab3b6.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_dark_5f2002f750.png"
  classes="rounded"
  alt="Example of a PostHog dashboard"
/>

<OSQuote
  customer="runable"
  author="eshaan_pawan"
  quote={0}
 />

The rest of Runable's team also uses both the Web UI and agents. 71 people have used PostHog in the last six months (about 30 of them daily), some clicking through insights and some asking an agent to pull the numbers. In the last month alone, their agents made 7,562 [tool calls](/docs/model-context-protocol/tools) from Claude Code, Codex, and Runable itself. Two thirds were SQL, the rest mostly logs and error tracking: ranking issues by how many users they hit, and pulling exception payloads to find the failing method.

## Session replay monthly marathon

When the numbers can't explain something, Eshaan watches user behavior directly in Session Replay. Once or twice a month, he blocks off a day to binge [recordings](/docs/session-replay/how-to-watch-recordings). "You're just obsessed with the problem," he says. "If you're not able to get it through data, you have to go and look at the session and see what's wrong."

Ankit's team uses replays the same way, to spot where people get stuck or confused in the UI. That's about to matter even more as Runable rebuilds its whole website (new UI, new internal structure) and moves its agents to a new sandbox provider.

Both will ship the way everything else does at Runable: tested behind flags, watched in replays, and measured on dashboards. It's a setup that covers acquisition, product, retention, and costs, all without a data team. So what would happen if PostHog disappeared tomorrow?

"It'll set me back by, like, a month," Eshaan says. "Everything is integrated with PostHog."

<OSQuote
  customer="runable"
  author="eshaan_pawan"
  quote={1}
 />
