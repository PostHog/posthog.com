---
title: New starter onboarding
sidebar: Handbook
showTitle: true
---

Welcome to the PostHog Forward Deployed Engineering team! We only hire about 1 in 400 applicants, so you've done well to make it here!

Onboarding here is mostly self-serve - we won't sit you in a room for training for two weeks, and unlike a lot of companies, we'd prefer you get up and running with quickly. If you're not sure who's supposed to make something below happen, the person responsible is almost certainly you.

Below is a rough plan for your first month - use it as a guide, not a contract. The handbook itself is a work in progress, so you'll find gaps as you ramp up, things you needed to know that weren't written down. That's normal, and when you find a gap your job is to fill it in so the next person has it easier.

## Day 1 - Welcome!

- Meet with Simon who will run through this plan and answer any questions you may have. In addition, come equipped to talk about any nuances around how you prefer to work (e.g. schedules, family time etc.)
- If you start on a Monday, join your first FDE standup.
    - We fill in a GitHub issue every week before this meeting so we are prepared for the discussion topics. Ask one of your fellow FDEs to add your GitHub handle to the automation which creates the sprint issue.
- If you start on a Monday, join your first PostHog All Hands (at 4.30pm UK/8.30am PT). 
    - Advice: You should keep a fun fact about yourself in your back pocket and be prepared to have a strong opinion on whether pineapple belongs on pizza. 

**General onboarding / tool set up**

- Complete your onboarding tasks <PrivateLink url="https://ops.posthog.dev/">in our ops platform</PrivateLink> to get yourself set up as a PostHog employee. It's okay if you don't manage to get this all completed on Day 1.
- Install your favorite LLM of choice.
- Set up tools like Zoom, Gong, Granola and Calendly so that you can talk with customers in our standard way. Our Sales and CSM collegagues have a guide on how to set up our [canonical call stack](/handbook/growth/sales/sales-and-cs-tools#our-canonical-call-stack). Ask Simon for access to these.
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

- If you have a chance, rerun the integration above but use the [PostHog Wizard](/docs/ai-engineering/ai-wizard) to understand how much easier it is. 

At the end of the week share a full retro of what you've done and learned with the team, and also submit a PR to this page to improve it for future new starters.

## Week 2 – get acquainted with the FDE Vault

The <PrivateLink url="https://github.com/PostHog/fde-vault/">FDE Vault</PrivateLink> is the main place we store internal context about how we work, and track specific customer engagements.  Once up and running as an FDE you'll be using this daily to track and inform your work.

To get started, follow the set up steps in the README in the root of the repository.

Once connected, you can ask your AI of choice questions about the vault and process.  The rough order you should think about doing things is:

- Read, in order: README → FDE manifesto → AGENTS.md → engagement process
- How we work: standards, judgment, and the culture
- Common FDE work patterns - for each of the implementation areas you covered in week 1 use the vault to find customer engagements where we have solved problems related to those areas.  What had drifted from our recommended best practice?  What did we do about it?

At the end of the week, revisit the [DevShip repo](https://github.com/PostHog/devship-app) from the SuperDay.  Seed the project in a new PostHog project and rerun the audit using the knowledge you have obtained from your first two weeks here.  Share a write up highlighting any gaps in your original submission (ask the team if you don't still have this to hand). 
- If you have time, ask the PostHog Wizard to complete an automated audit. This is typically how other teams [self-serves discovery](/handbook/forward-deployed-engineering/how-to-get-fde-involved) before bringing the scope conversation back to the FDE team.


> As you go through the vault if anything is unclear ask your onboarding team mates for help and clarification.  Once you learn something new, make sure you submit it as a PR to the vault or handbook.

## Weeks 3 and 4 – start working with customers

> We will normally do in-person onboarding in week 3 - this will mainly be focused around a review of your first couple of weeks, how the wider GTM organisation works as well as in-person work on the below.

This is when you start working with your customers. Ask the vault for the current in-flight engagements we have, and then work with the FDE on that engagement to see which tasks you can pick up.  Ask for their review once you're done.

Simultaneously, for any new engagements that crop up after your second week, start to run intake for those engagements (the vault should help you out with what to do here)

## What good looks like at the end of week 4

Things are going well if:

- You have significantly leveled up your PostHog product knowledge from when you started
- You're comfortable with the vault and how to contribute to it
- You've started to work on customer engagements
- You've run your first intake
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
