---
title: Onboarding a new CSM (team lead guide)
sidebar: Handbook
showTitle: true
---

So you've got a new CSM joining your team! Here's what to prepare and when. The joiner-facing plan is [new starter onboarding](/handbook/cs-and-onboarding/new-hire-onboarding) - this page is for Team Leads.

## At a glance

1. **Before they join** - prepare their book, book the 1:1s, plan the in-person week
2. **First week** - welcome 1:1, get the team sharing calls and tips
3. **In-person week** (usually week 2) - 4 days working together, agenda template below
4. **First month** - less structured: use 1:1s to pick up what onboarding couldn't cover

## Before they join

**Prepare their book of business.** Accounts come from a few places: Simon pulls net-new accounts, overloaded teammates can offload some of theirs (a new CSM is a good opportunity!), and product-led sales and new business sales often have accounts waiting for a CSM handover - shoot them an ask. Tee up ~20 accounts so they're not at capacity immediately - it also leaves room for late handovers. Follow the [capacity model](/handbook/cs-and-onboarding/how-we-work), and bonus points if accounts can line up with their previous experience.

**Book the 1:1s.** Welcome 1:1 on day 1, a recurring 1:1, and (optionally) an extended 1:1 every 4 weeks.

**Plan the in-person onboarding.** Dates and location - for EU that's usually the HedgeHouse in London, 4 working days with travel either side. [The agenda below](#in-person-week-usually-week-2) is what we've been running. Logistics that help:

- Put sessions in your own calendar so you’re actively blocking time for onboarding
- Ask the team who can drop by for a session - demo practice and an account review shadow are good candidates
- Dinners / social: post in the local city channel about the onboarding and organize a big dinner - it's nice for the new CSM to meet PostHog people from different teams! Be mindful of social battery when you schedule socials as a new job and a new team can be overwhelming.

## First week

**The welcome 1:1.** Things to talk through:

- Walk through their [onboarding plan](/handbook/cs-and-onboarding/new-hire-onboarding) and the plan for in-person onboarding.
- What week 1 looks like - a lot of reading, watching and shadowing, probably not much doing. It'll feel unproductive!
- How we work - sprint planning, account review, ask in public by default.
- Feedback - our feedback culture, and give them their SuperDay feedback.
- How you want to use 1:1 time - management at PostHog is [relatively light-touch](/handbook/company/management), worth calling out why and resetting expectations up front, especially if they're used to heavier structure.
- Ask for their GitHub handle and add it to the sprint issue template so they get tagged.
- Additional things if there’s time:
  - Share your readme.
  - Ask them to post their first five customer calls in the team channel for feedback - gets them used to sharing in public early.
  - Ask how they like to receive feedback (and praise!)

<details>
<summary>Example welcome 1:1 agenda</summary>

- 1:1s
  - Let's use this doc as our shared agenda for 1:1s and other chats - you set the agenda
  - In the 2nd or 3rd 1:1, bring: an email or outreach message you sent to a customer, a call with a customer, and questions you need my help on
  - Share your first 5 calls in the team channel
- Onboarding
  - Here's your [plan](/handbook/cs-and-onboarding/new-hire-onboarding) for the next few weeks (emphasise!)
  - Week 1 is a lot of reading! watching! shadowing! - probably not a lot of doing, which will feel weird. the aim is to load up on context so you're ready to go in onboarding week. 
    - Share calls to watch - a few recent good ones, ask the team for picks
    - Suggested reading:
      - PostHog - the company:
        - Why: [why does PostHog exist](/handbook/why-does-posthog-exist), [where are we going](/handbook/future)
        - What: [who we build for](/handbook/who-we-build-for), [how we make money](/handbook/how-we-make-money)
        - How: [what we value](/handbook/values), [a wide company](/handbook/wide-company) with [small teams](/handbook/company/small-teams)
      - GTM / Customer Success:
        - [GTM overview](/handbook/growth/sales/overview)
        - [CS overview](/handbook/cs-and-onboarding/customer-success) + have a skim of the follow-on links
        - [Use case selling](/handbook/growth/use-case-selling/use-case-selling)
        - [CSM + TAM](/handbook/growth/sales/account-allocation)
        - [Contract rules](/handbook/growth/sales/contract-rules)
  - Work through your onboarding plan - make sure to prioritize Drata
  - Practice your demo
  - The plan for onboarding week
- How we work
  - The sprint planning issue on GitHub
  - By default ask questions in #team-customer-success unless it needs to be private
- Questions from me
  - What's your GitHub handle so I can add you to the sprint template?
  - What do I need to know about you to help you do your best work?

</details>

**Ask the team to share things!** And for calls the new CSM can shadow on.

**Optionally, a check-in 1:1 on day 3.** The first week is a lot of solo reading - a midweek touchpoint helps.

## In-person week (usually week 2)

[In-person onboarding](/handbook/people/onboarding#in-person-onboarding) covers the company-wide stuff - budget, travel, the shared onboarding calendar. Below is how we run the CSM week.

**What the week is for.** By the end of the week they should know how to work with the data we have to reason whether a customer is getting value from PostHog, prioritize their book, and plan out next steps. They should have their own Vitally / Customer Analytics views set up, know how to find and verify answers, and a first outreach drafted - maybe even sent! Sessions tend to work best as observe, do, review - you do it in front of them, they try it on their own book, you give feedback.

### Topics to cover
Grouped roughly in the order we run them: context first, then one customer, then the whole book, then acting on it. 

**Context**:

- CSM overview (who we cover, why we exist, how comp works, CSM + TAM overlay) and how we work (sprint planning, account review, quarterly goal)
- Tool access check - in particular Vitally (needs `Leader` role) and a Slack channel check
- Agent setup - MCPs hooked up, a PostHog repo clone, impersonation, and a curated list of team skills from the [skills store](/docs/ai-engineering/skills-store) to start from
- Finding info - where to look (handbook vs repo vs Slack), maybe even a working exercise (e.g. "what is the Teams plan?")

**Understand a customer's usage end to end** - go through 1-2 accounts together, then they do the same on their own book:

- What are they using PostHog for? - the products they pay for, the events they capture, what they do with the data. The goal is a sense of their use cases
- How's the relationship? - who the active users are and what they're doing in PostHog (these are candidates for outreach), recent tickets and calls, and which PostHog humans they've talked to - AE, onboarding, TAM, CSM
- Assessing the customer's setup - are they implemented well, are they getting value? i.e. [foundation check](/handbook/cs-and-onboarding/foundation-check) and [health check](/handbook/cs-and-onboarding/health-checks)
- Commercials, in two parts:
  - Monthly usage - forecasted MRR, billing limits, platform add-ons
  - The contract, if they're on one - how much credit they bought, when they renew, are they on track? Talk through [contract rules](/handbook/growth/sales/contract-rules) and the tools we use (QuoteHog, PandaDoc, Salesforce)

**Prioritizing across the book + deciding next steps:**

- Prioritizing a book - when you first get assigned as well as on an ongoing basis: the signals we look at and which ones are more worrisome than others, setting up their own Vitally views
- Deciding next steps - at this point, the new CSM should have a good idea of where each account's at (or know how to find out). Use next steps that haven't been covered yet as opportunities to talk them through - e.g. a new Slack channel (invite you + support-hog), an upcoming renewal (how renewals work)

**Throughout the week**:

- Demo practice with feedback
- No stupid questions sessions
- Their feedback on the week at the end

**Optional / depends:**

- A walkthrough of PostHog fundamentals - depending on their familiarity with the product
- Working with support - how tickets flow, [handling customer issues](/handbook/cs-and-onboarding/handling-customer-issues)
- A quarterly goal brainstorm - useful when they join near the start of a quarter
- Vitally playbook indicators, billing-limit grace periods and trust scores, credit reason codes, invoice-overdue rules, the spike detector

**Suggested agenda:** [4-day agenda template](https://posthog.slack.com/docs/TSS5W8YQZ/F0BNBPN78EP) - create it as a canvas in their onboarding channel to reference from and adapt throughout the week. It’s also useful to keep a running "no stupid questions" list at the bottom of the canvas and ask them to add questions there as they go through onboarding.

## First month

From here it's much less structured - what to cover and when is your call. Use the 1:1s to go through anything you couldn't fit into the onboarding week, and be okay with repeating things that were covered - onboarding is a lot to take in.

- Ask for feedback on the onboarding week, especially on the content covered, so we can keep improving it
- Optional: a book walkthrough around week 3-4 - they walk you through their read of their book
- Optional: another practice demo, async
