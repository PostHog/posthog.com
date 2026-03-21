---
title: Lifecycle of CSM engagement
sidebar: Handbook
showTitle: true
---

> This page covers more of the operational details of how our team generally works - for a broader overview of roles and responsibilities, visit the [customer success team page](/handbook/cs-and-onboarding/customer-success).

## Introduction

When starting out as a Technical Customer Success Manager (CSM) at PostHog, you are assigned a book of business with ~30 accounts to work with. It is helpful to think of customer engagement in stages to help us identify how we should connect with customers at each stage.

### Stage 1: Getting started with customers

We've written a lengthy guide on how to [get started with customers](/handbook/cs-and-onboarding/getting-started-with-customers), so rather than rehash some of that information here, go read that guide instead.

### Stage 2: Establishing trust

Once you've gone through your entire book of business and have completed stage 1, the next stage in our journey is to develop deep trust with our champions. Trust is built over time, based on our interactions and how we manage and nurture those relationships.

Some key examples that really help with building trusts with your customers:

- **Show, not tell**: Whenever a customer has a support question, or indicates they are trying to accomplish a goal, if possible, help create the solution rather than simply sending them to our docs. It is an opportunity to create an insight or dashboard for the customer, confirm if this is what they wanted, and share with them how you were able to create such an insight or dashboard so they could do it themselves later. Be careful to balance this and not create a dependency situation where customers rely on you to create stuff for them.

- **Be timely on notifications**: We have automated alerts set up to flag unusual behavior on an account. This includes things like event spikes or decreases. Sometimes this is unexpected behavior for the customer. Being quick to draw this to their attention can be helpful for the customer to investigate and showcase your helpfulness. If there are other signals, act on it accordingly. If there's public news, such as the company just raised a new funding round, reach out to your champion on this to congratulate them earnestly. 

- **Go beyond the basics**: In getting started with customers, you focused on getting to know your customers, understanding their business goals, helping with implementation, and optimizing their use. Now is a great time to focus on how you can help them optimize for success. This could be looking at how they're currently engaging with PostHog products, whether there are things they haven't done that might be helpful to implement. For example, have they set up custom tracking funnels for high value metrics, created alerts on customer actions to track, have they tried PostHog AI, or considered implementing other features to augment the data they have (such as error tracking to figure out why conversions drop off). This is a good opportunity to cross sell but also presents an opportunity to help customers understand where they can get more value out of PostHog.

Establishing trust can take time, and your communication style and actions can play a significant role. It may be worth offering recurring calls with your champion to establish more face-to-face contact, as this can help you maintain an ongoing pulse on what's happening.

### Stage 3: Getting deeply embedded with customers

At this stage, we're interested in conducting a deep dive and becoming more deeply embedded with their team to work through some of their goals. This could help establish new workflows or setups to gain deeper insights beyond what they've achieved.

### How to identify accounts ready for Stage 3
Not every account needs or wants this level of engagement, so look for these signals:
- They're using multiple products, but they're starting to ask questions about our capabilities that go beyond the scope of their current setup. Typically, these questions reflect a higher-level priority that you should investigate further. The fact that they're considering PostHog in their area of curiosity is a strong signal to us that we're critical to helping them achieve their own KPIs.
- They have a specific business goal that requires deeper instrumentation. The key signal is that what they're trying to accomplish requires additional implementation work, and they're motivated to do it. They should have a clear outcome in mind (if they don't, help them get there by asking really good questions about their business!) and need hands-on collaboration to get there.
- They're centralizing external data sources inside PostHog. This further reinforces our position as a core part of their infrastructure.
- You have access to (or a path to) their engineering team. Stage 3 doesn't work if you're only talking to an IC who can't prioritize or decide implementation work for their team. You need either a direct relationship with an engineer or a champion who can make an introduction.
- The account has expansion potential or strategic importance. This level of investment should be reserved for accounts where going deep will meaningfully impact retention or growth. It's not suitable for every account in your book.  

Here are a couple examples that have came up previously:

- **Building a custom recommendation engine**: An ecommerce customer we were working with had implemented PostHog to track key metrics they cared about but wanted to take it a step further and use us as source of truth in customizing visitor experiences to their site. Each returning visitor would see a custom feed just for them based on prior product views, searches, or purchases. This went way beyond the scope of simply tracking events and building dashboards, and there were potential opportunities to work with the customer here on how to custom track events, push data to their backend, and more.

- **Real time alerts**: A couple customers had high value actions they wanted to track and get real time notifications on. One customer wanted to track product views, present related purchases for upsell, and get notified when a customer didn't complete a purchase. Another wanted to track downloads and figure out when visitors attempt to access a file but runs into an error. This presented opportunies to understand high value signals for our customer and how we can help them implement a custom solution using PostHog to accomplish their goals.

## What "deeply embedded" actually looks like
At this stage, you're "deployed" in the field with them and collaborating on implementation decisions:
- Providing custom solutions: Working with their engineers to define and implement custom events that map to their core business metrics. For example, you're meeting with them and mapping their user journeys to specific tracking plans. You're properly embedded at this point, almost like their own team member who's an expert at PostHog.
- Further deepening their connection with PostHog via real-time destinations and usage of our data warehouse; your presence on their team should accelerate the centralization of their data.
- Helping their team design a structured experimentation program using our suite of products — what to test, how to measure it, and what it means for shipping new features on their end. You have influence as a trusted subject matter expert, so they should look to you for how to design programs that ladder up to *their* business goals.
- **Note**: While you're embedded, make sure to document any new setups, experiment designs, etc so their team can maintain it without you.

## How to scope an embedded deployment
Your goal is to deliver a specific, measurable outcome.
- Start with one problem. On a call with your champion (and ideally an engineer), or via Slack/email, identify the single highest-impact thing they're trying to accomplish with PostHog that they haven't been able to do on their own. They might share this with you proactively, but a few exploratory questions can go a long way here! (i.e. "What's one thing you wish you could measure or do with your data right now that you haven't been able to?").
- Make it clear on what success looks like. Be as specific as possible on what you want to accomplish as an embedded CSM.
- Communicate a timebound commitment. Ideally, each "deployment" shouldn't last longer than two to four weeks.
- Add your deployment and success indicators to the customer's success plan (remember to update it in Slack Canvas if they're on Slack!) This keeps both sides accountable and gives you something to reference in your check-ins.

## How to measure success on your embedded deployment
- Did the customer achieve the goal we aligned on at the start of the deployment?
- Did it unlock new usage? After the engagement, are more people on their team using PostHog? Are they using products they weren't using before?
- Did it deepen our relationship with them? Do you now have relationships with engineers or team leads you didn't have before? 
- Did it create expansion opportunities? This level of engagement creates the possibility for product adoption from new stakeholders!

The goal at this stage is to help our customers succeed by getting them the key metrics they care about, and often times, requires us to connect with their team to implement custom code changes at a deeper level to accomplish this. 

If your champion is in a key decision making position who can get these changes through, that's great, but if not, this is also a great opportunity to ask your champion for an introduction to the key decision maker so you can work close with them to ensure changes can be prioritized. Another method is to reach out to the team lead, such as the head of engineering or head of product, armed with what their quarterly goals are, and offer your assistance directly. You may establish another strong connection this way.

Companies have conflicting priorities but by demonstrating you understand what their core goal is, and how PostHog could solve the problem, and finding the key decision maker, you have a higher chance of convincing the team to prioritize the changes now rather than wait to add value.
