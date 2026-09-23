---
title: New starter onboarding
sidebar: Handbook
showTitle: true
---

Welcome to the PostHog Forward Deployed Engineering team! We only hire about 1 in 400 applicants, so you've done well to make it here!

Onboarding here is mostly self-serve – we won't sit you in a room for training for two weeks, and unlike a lot of companies, we'd prefer you get up and running with quickly. If you're not sure who's supposed to make something below happen, the person responsible is almost certainly you.

Below is a rough plan for your first month – use it as a guide, not a contract. The handbook itself is a work in progress, so you'll find gaps as you ramp up, things you needed to know that weren't written down. That's normal, and when you find a gap your job is to fill it in so the next person has it easier.

## Day 1

- Meet with Simon who will run through this plan and answer any questions you may have. In addition, come equipped to talk about any nuances around how you prefer to work (e.g. schedules, family time etc.)
- If you start on a Monday, join your first FDE standup.
    - We fill in a GitHub issue every week before this meeting so we are prepared for the discussion topics. Ask one of your fellow FDEs to add your GitHub handle to the automation which creates the sprint issue.
- If you start on a Monday, join your first PostHog All Hands (at 4.30pm UK/11.30am ET). 
    - Advice: You should keep a fun fact about yourself in your back pocket and be prepared to have a strong opinion on whether pineapple belongs on pizza. 

**General onboarding / tool set up**

- Complete your onboarding tasks <PrivateLink url="https://ops.posthog.dev/">in our ops platform</PrivateLink> to get yourself set up as a PostHog employee. It's okay if you don't manage to get this all completed on Day 1.
- Install your favorite LLM of choice.
- Set up tools like Zoom, Gong, Granola and Calendly so that you can talk with customers in our standard way. Our Sales and CSM colleagues have a guide on how to set up our [canonical call stack](/handbook/growth/sales/sales-and-cs-tools#our-canonical-call-stack). Ask Simon for access to these.
- Read the [FDE sections](/handbook/forward-deployed-engineering/overview) of the handbook.

## Rest of week 1

The rest of week 1 is about getting to grips with the PostHog concepts that you'll come across most frequently as an FDE.

**Self-guided product learning:**

For each of these steps after you are finished record a short video (we use Loom mainly) explaining what you've done and learned and share it into your onboarding channel.  We have deliberately left links to the documentation out of this section so that you can learn to navigate our website and docs.

- Build a demo app using your favorite JS framework and server-side language (assuming they are in our supported libraries of course).
- Set up PostHog in the app.  Avoid using the wizard/other helpers as most customers you encounter will have been through a manual integration process.
- Set up identity resolution on both the client and server side.  Make sure your users are stitched together properly between client and server.
- Implement sensible session replay controls.
- Implement client-side feature flags and a realistic experiment which uses those flags.
- Switch your feature flags to use server-side local evaluation.  What are the differences in process?  How do we bill for these two approaches?
- Integrate error tracking both on client and server.
- Add in any other products as you see fit. We have a useful [framework](/handbook/cs-and-onboarding/new-hire-onboarding#learning-posthog) which can be used as a guide.

- Rerun the integration above with the [PostHog Wizard](/docs/ai-engineering/ai-wizard) to see how much easier it is, then ask it to audit your app. This is how other teams [self-serve discovery](/handbook/forward-deployed-engineering/how-to-get-fde-involved) before they bring the scope conversation to the FDE team.

At the end of the week share a full retro of what you've done and learned with the team, and also submit a PR to this page to improve it for future new starters.

## Week 2 – start working with customers

> The <PrivateLink url="https://github.com/PostHog/fde-vault/">FDE Vault</PrivateLink> is where we share what we're working on. Whenever you pick up a ticket, task, or intake, write it up in the vault using our shared format, so it's easy for the other FDEs to follow along and give feedback. Set it up from the README in the root of the repository, and learn the rest as you record your own work.

This is when you start working with your customers. Ask the vault for the current in-flight engagements we have, and then work with the FDE on that engagement to see which tasks you can pick up. Ask for their review once you're done. When you pick up a task, ask the vault how we solved similar problems for other customers.

**Support tickets:**

For weeks 2 and 3, also pick up support tickets, usually 1-2 per day, depending on your workload. A ticket is the quickest test of what you learned in week 1: a real customer problem, your answer, and their reply.

- Before your first ticket, do the [support hero training](/handbook/people/onboarding#support-hero-training) with a support engineer. It covers where tickets live, how to claim one, and how to reply.
- Ask in #team-fde which ticket view to pick from. Choose tickets in the areas customers bring to FDE, like feature flags, migrations, and instrumentation.
- Ask an FDE to review your answer before it goes out.
- Note each ticket that looked like it needed an FDE engagement instead of an answer, and why. Bring those notes to the team at the end of week 3. They show the [line between support and FDE](/handbook/forward-deployed-engineering/working-with-customers#boundaries-with-support) from the support side.

## Weeks 3 and 4 – take on more customer work

> We will normally do in-person onboarding in week 3 – this will mainly be focused around a review of your first couple of weeks, how the wider GTM organization works as well as in-person work on the below.

Keep working on your engagement tasks, and take on more of the work yourself.

Simultaneously, for any new engagements that crop up after your second week, start to run intake for those engagements (the vault should help you out with what to do here)

## What good looks like at the end of week 4

Things are going well if:

- You have significantly leveled up your PostHog product knowledge from when you started
- Your work is visible and reviewable: it's recorded in the FDE Vault and passes its checks
- You've started to work on customer engagements
- You've run your first intake
- You've answered support tickets and can say which ones needed an FDE engagement
- You've improved the way we as a team work
  
## Month 2 and beyond

**By the end of month 2:**

- You'll have completed your first end-to-end customer engagement
- You'll have continued to improve the way we work
- You'll have contributed something of value back to PostHog (the product)

## New hire frequently asked questions

### What are some useful Slack channels?

PostHog has a transparent culture when it comes to [communication](/handbook/company/communication) so here are some useful Slack channels. You can invite yourself to these channels without needing to ask for permission:

- #team-fde: the Forward Deployed Engineering team. This is where we spend most of our time working with each other.
- #group-cs-sales-support: cross-team discussion for everyone who owns customers.
- #team-customer-success: the Customer Success team.
- #team-product-led-sales: the Product-led sales team.
- #team-new-business-sales: the New Business sales team.
- #team-onboarding: the Onboarding team.
- #team-people-and-ops: for any ops-related topics.
- #customer-churn: discussion of potential and actual customer churn.
- #changelog: product launches.
- #incidents: for notifications of incidents which may impact customers. Make sure you set this to alert you for every message so that you know when something is up.
- #ask-max: bot focused on internal processes and questions. This should be your first port of call if you need to self-serve an answer.
- #ask-posthog-anything: when you can't self-serve an answer to a question from our handbook, docs, Slack, code repos or #ask-max.
- #tell-posthog-anything: For company-wide announcements or notifications about PostHog people, products, policies, projects etc. 
- #team-fde-tests: Channel used to test out any automation / Slack workflows (without spamming the main #team-fde channel)

We aren't all about work 24/7 here at PostHog so here are some more fun channels:
- #random: For non-PostHog stuff.
- #whereintheworld: Posting cool things from around the world
- #merch: Anything merch-related (because we love merch)
- #no-context-posthog: If we told you what this is for, that would be providing context.

Here are also tips for Slack:
- Ask one of your fellow to add you to the Team FDE Slack User Group. This will notify you anytime someone mentions @fde in any chat. 
- Set up "Channel keywords" so you can notified about topics you care about. We recommend starting with "fde" as the first keyword but feel free to add your own. 
- To help you focus on your most important notifications, you can set specific people as VIPs to make their messages stand out. Maybe your fellow FDEs can be VIPs?
