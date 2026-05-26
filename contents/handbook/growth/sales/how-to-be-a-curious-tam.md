---
title: How to be a curious TAM
sidebar: Handbook
showTitle: true
---

One of the best ways to be successful as a TAM at PostHog is to be relentlessly curious. We hire for curious people, and with the way that we work, curiosity is essential for keeping up! At the end of the day, curiosity often comes down to asking the right questions at the right time. This guide covers some of the best questions to be asking, and how to answer them.

## Immediate term questions

These are the kind of questions that a customer may ask you live on a call, or that you should be able to quickly answer off the cuff.

### How does this part of the product work?

RTFD! Read the handbook/docs is a refrain you will hear often - we strive to document well and if someone tells you to read them, it just means we are proud that we have a single place to go for answers. That said, the product moves fast and you may have specific and/or complicated questions. If that is the case, here are some first steps:

1. Really, read the docs. They are quite thorough and a great place to start.
2. Ask Max. We have a Slack bot called Ask Max that connects to our documentation and additional context stores built for answering questions about PostHog. 
3. Review Slack conversations. You can query Slack through the Slack Bot or the [Slack MCP](https://slack.com/help/articles/48855576908307-Guide-to-the-Slack-MCP-server). We're a chatty bunch - odds are good that someone has had a similar question before and you can lean on the response they got.
4. Ask the product itself - your agent (Claude Code, Codex, etc) generally does a very good job of working out what functionality is available for different products. Just point it at the [official PostHog repo](https://github.com/PostHog/posthog) and ask away!
4. Ask your *official* Subject Matter Expert - for reference, see the [GTM SME assignments](/handbook/growth/sales/product-enablement).

### Is this a bug or a feature (or, is this the product or the user)?

Sometimes, a customer may run to you, all guns blazing, claiming there is a BIG bug with PostHog and it is affecting their ability to do something. In general, our customers are quite sophisticated and have a good idea of what is truly a product failure. However, it is good practice to ask "is this really or a bug, or is there something about the way the customer is using the product?". 

### How does pricing work/what does pricing and usage look like for this customer?

[QuoteHog](https://quote.posthog.com) is the place to go for all things pricing! It has an integration with Salesforce so you can quickly spin up a quote for a given customer based on their historical usage, or you can build one fresh. All pricing at Posthog is usage based, but we have the ability to provide discounts on up-front credit purchases. For more info on how we do billing and contracts on the PLS team, check out the [Contracts and Billing](https://posthog.com/handbook/growth/sales/contract-rules) section of the handbook.
 
## Medium term questions

These are questions that you should be asking yourself regularly (daily/weekly). When you're reviewing your book, can you answer each of these confidently for each of your customers?

### How is this customer/lead using PostHog right now?

This question is probably one you already know to ask, but it can also be overwhelming given the sheer amount of information that we have available to us. There are so many places to learn about how a customer is engaged with the product, so here are some resources followed by some strategies for how to start ingesting all of the info.

[Gong](https://us-26000.app.gong.io/home?r=t&workspace-id=8823646477612786274) for history of calls with a customer.

[Vitally](https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/690a3358-6c49-4963-84de-641ef26761dd) for summary level information. This is your home base and provides info + links for multiple sources.

[Metabase](https://metabase.prod-us.posthog.dev/dashboard/139-customer-usage-breakdown?tab=35-events&organization_id=&project_id=&lookback_days=30&search_event=%20) for individual company level usage breakdown.

[Pylon](https://app.usepylon.com/support/issues/views/all-issues) for support history.

[Setting up a live user event feed](https://posthog.com/handbook/growth/sales/user-event-streams)

Slack for a history of conversations between us and the customer

The [PostHog MCP](https://posthog.com/docs/model-context-protocol) and Skills. It should not surprise you that we use the PostHog MCP heavily, and it is fantastic for pulling up information on how different customers are using the product. We also maintain a [Skills Store](https://posthog.com/docs/prompt-management/skills-store) that includes a number of useful skills for understanding usage. Just ask your agent what is available, and maybe give the workload-analysis skill a try on one of your accounts!

#### How to start understanding all of this:

The best way to start wading through all of the information is to know what you're looking for. What is the context of your investigation? Are you:

 - Investigating a new lead? See the next question.
 - Taking over a customer from another TAM or from Onboarding? Check Gong and Slack for conversation history, then review Vitally and Metabase to learn about their setup and users. Run a workload-analysis from the MCP to see patterns and understand where there usage is strongest or could use improvement.
 - Jumping into a CSM managed account? Work with your CSM to understand the relationship thus far and why they are pulling you in, then start your investigation as usual.

### Is this a good lead?

There's a [whole handbook page](https://posthog.com/handbook/growth/sales/product-led-lead-qualification) on this!

### Has anything newsworthy happened with my customer lately (IPOs, raises, launches, etc)?

Setting Google News alerts or querying news with [Exa](https://exa.ai/) are both good ways to keep up to date with what's going on with your customers. However you choose to stay informed, knowing what your customers are showing up in the news for is important for outreach as well as identifying risks and opportunities.

### Are we shipping/working on something that my customer is interested in?

The first step to this is understanding what your customers are interested in. This should come from your account level investigation, as well as conversations you're having. The second part is where it gets fun - we ship fast.

Relastically, in order to know when we are shipping things that customers care about, you will need to watch both Github and Slack channels. Most teams create a [Sprint planning artifact](https://github.com/PostHog/posthog/issues/56537) which you can reference to understand their goals during a given sprint. Next, set up Slack alerts for feature keywords and keep an eye on team Slack channels for updates on when things ship.

## Long term questions

These are generally broader, more strategic questions. They're the kind of questions you should be asking yourself when you are determining long term goals for an account, PostHog itself, or your own professional development.

### What is the overall strategic plan with this customer/lead?

This will always come down to your own judgement, but we have lots of guidance for how to think about things the PostHog way. In order to start building a strategy it can be helpful to start thinking of things in terms of each goal you want to accomplish with an account, and then lay out the steps required to achieve that goal.

Your goals should be based on where a customer is at, and where you want to get them - thinking of this in terms of activated [use cases](https://posthog.com/handbook/growth/use-case-selling/use-case-selling) is a great way to start.

In terms of building an expansion plan for achieving your goals, you can go [broad or deep](https://posthog.com/handbook/growth/sales/expansion-strategies). The appropriate strategy is up to you.

### Should I involve an FDE on this relationship?

See [this handbook page](https://posthog.com/handbook/growth/sales/professional-services) from the Growth team on when to involve an FDE.
