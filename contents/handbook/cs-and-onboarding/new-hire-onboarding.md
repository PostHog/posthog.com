---
title: New starter onboarding
sidebar: Handbook
showTitle: true
---

## Your first few weeks

Welcome to the PostHog Customer Success & Onboarding team!  We only hire about 1 in 400 applicants, so you've done well to make it here!  Unlike a lot of companies, we don't have a super-long onboarding process and would prefer you to be up and running with your customer base as quickly as possible.  Here are the things you should focus on in your first few weeks at PostHog to help you achieve that. 

Ramping up is mostly self serve - we won't sit you down in a room for training for 2 weeks. If you're not sure who is supposed to make something below happen, the person responsible is almost certainly you!

Also look at the [sales team's onboarding page](/handbook/growth/sales/new-hire-onboarding) for guidance on what _not_ to do when you start. In general, there's a lot of good resources within [sales](/handbook/growth/sales/overview) to reference (as we were previously one team!)

### Day 1

- Familiarize yourself with [how we work at PostHog](/handbook/company/culture).
- Meet with [Dana](/community/profiles/32545) who will run through this plan and answer any questions you may have. In addition, come equipped to talk about any nuances around how you prefer to work (e.g. schedules, family time etc.).
- Setup relevant [Sales & CS Tools](/handbook/growth/sales/sales-and-cs-tools)
  - Integrate Gmail with Salesforce and Vitally to enable centralized communication history
- If you start on a Monday, join your first PostHog All Hands (at 4.30pm UK/8.30am PT) and be prepared to have a strong opinion on whether pineapple belongs on pizza.
- If you start on a Monday, join your first CS standup.
  - We fill in a GitHub issue every week before this meeting so we are prepared for the discussion topics. Dana will add your GitHub handle to the template.


### Rest of week 1

 - Confirm that you have been added as a member to the [PostHog organization in GitHub](https://github.com/PostHog?view_as=member). [Fraser](/community/profiles/30207) can add you if you haven't.
 - Work your way through your GitHub onboarding issue that a member of the <SmallTeam slug="people" /> created and sent a link to.
 - Ask team members in your region to be invited to some customer calls so you can gain an understanding of how we work with customers.
 - Check out some [BuildBetter](https://app.buildbetter.app/) calls and add yourself to a bunch of Slack channels - get immersed in what our customers are saying.
   - There are a few BuildBetter playlists to start with – [customer training calls](https://app.buildbetter.app/folders/15381), [PostHog knowledge calls](https://app.buildbetter.app/folders/14593), [onboarding specialist calls](https://app.buildbetter.app/folders/14521), add to them as you listen! 
 - Learn and practise a [demo](https://youtu.be/2jQco8hEvTI) of PostHog.
   - For familiarization and self-led training, follow the [curriculum](/handbook/cs-and-onboarding/new-hire-onboarding#posthog-curriculum). You can work through this with the [HogFlix Demo App project](https://eu.posthog.com/project/29925) which is already populated with data. Alternatively, you can create a new [project](/docs/settings/projects) in [EU](https://eu.posthog.com/) PostHog instances and [hook it up](/docs/getting-started/install) to your own app or [HogFlix instance](https://github.com/PostHog/posthog-demo-3000).
 - Read all of the CS section in the Handbook as well as the Sales section, and [update it as you learn more](https://posthog.com/handbook/company/new-to-github#creating-a-pull-request).
 - Meet with [Charles](/community/profiles/28625), the exec responsible for Customer Success.

### Week 2

- During your first week, Dana will figure out your initial book of business (around 30 accounts). We will review these at the start of your second week, and make sure you understand how your targets are set. 
- Shadow more live calls and listen to more [BuildBetter](https://app.buildbetter.app/) recordings.
- Explore Vitally and [Metabase](https://github.com/PostHog/company-internal/wiki/Onboarding-Workflows#metabase-account-analysis) – take note of any questions you have to go through during in-person onboarding.
- Once you have your book of business, try running through the [onboarding exercise](/handbook/cs-and-onboarding/new-hire-onboarding-exercise) that [Kaya](/community/profiles/34037) designed to test your skills for working with customer accounts.
- Towards the end of the week, schedule a demo and feedback session with Dana. We might need to do a couple of iterations over the next few weeks as you take on board feedback, don't worry if that's the case!
- Get comfortable with the PostHog [Docs](/docs) around our main products.
- Prioritize your current book of customers, and start reaching out! You should check conversations in Vitally to see if someone else has a prior relationship as they can make a warm intro for you.

### In-person onboarding

This typically happens in Week 2 or 3 and runs 3-4 days with a few existing team members, covering:

- Demo practice session with the team.
- The data we track on customers in PostHog and some hands-on exercises to get you comfortable using PostHog itself.
- Deep dive on Vitally tracking.
- No stupid questions session.

### Weeks 3-4

- Focus on taking more and more ownership on calls so that team members are just there as a safety net.  
- Make sure all your tooling and automation are fully set up (health indicators etc.)
- Continue to meet with your book of customers.

### How do I know if I'm on track?

By the end of month 1:
 - Be starting to solve technical problems for your book with occasional help
 - Be leading customer calls and demos on your own
 - Successfully made contact with _everyone_ in your book of business
 - Update this page and other relevant handbook pages with what you learned during onboarding

By the end of month 2:
 - Saved your first 'we're going to churn' - it's going to happen, but you're going to save them!
 - Be leading evaluations on your own

By the end of month 3:
  - Be independently working with your entire book to solve tricky technical problems with minimal assistant
  - On track to consistently hit your retention targets
  - You've suggested and made changes to our systems that enable you to do your job better
  - Think about customer health scores and add/change anything you learn here

## PostHog curriculum

PostHog has a lot of products! To help you figure out how to start and continue build your knowledge, here's a recommended list of topics to work through. 

Add and modify this list as you work through it.

### Fundamental

#### Product analytics
[Quick primer on Product analytics](https://www.loom.com/share/645de3987e4947ba8164b4d7b7cc719b?sid=ae5f8a50-dc56-4cc4-93d5-d398b398d5a0)
1. [Creating insights](/docs/product-analytics/insights): everything in Trends, Funnels, User paths
   - Retention, Stickiness, Lifecycle
   - How to [filter out test users](/docs/product-analytics/trends/filters#filtering-internal-and-test-users)?
2. Persons
   - What are [persons](/docs/data/persons) and how are they created?
   - [Identify()](/docs/product-analytics/identify)
   - [identified vs anonymous events](/docs/data/anonymous-vs-identified-events)
   - Pricing
3. Session replay – masking, cutting costs, filtering
4. [Toolbar](/docs/toolbar) – [heatmaps](/docs/toolbar/heatmaps), [actions](/docs/toolbar/create-toolbar-actions)
5. [Groups](/docs/product-analytics/group-analytics) – what is it? what is the use case? how is it charged?

#### Implementation
1. How is PostHog implemented?
2. [Autocapture](/docs/product-analytics/autocapture) – how do you customize autocapture? How do you leverage autocapture?
3. What are [custom events](/tutorials/event-tracking-guide#setting-up-custom-events)? How do you set [custom properties](/tutorials/event-tracking-guide#2-properties)?
4. What is identify? How do you set custom [person properties](/docs/product-analytics/person-properties)? How do you [merge users](/docs/product-analytics/identify#how-to-merge-users)? What is alias?
5. What are groups? How do you set group properties?
6. Projects, [Cross-domain tracking](/tutorials/cross-domain-tracking), [reverse proxy](/docs/advanced/proxy), cookie consent (EU)

### Intermediate

#### Feature flags
1. [Creating](/docs/feature-flags/creating-feature-flags) and using them in code
    - How do I ensure flags are loaded before capturing any events?
    - Can you evaluate feature flags using properties that haven't been ingested yet?
2. Locally testing feature flags [using toolbar](/docs/feature-flags/testing#method-3-use-the-posthog-toolbar)
3. Insights based on feature flags:
    - Some users have access to a beta feature. How do I filter insights for these users?
4. [Local evaluation](/docs/feature-flags/local-evaluation)
5. Client-side bootstrapping
6. [Troubleshooting](/docs/feature-flags/common-questions)

#### Experiments
1. [Creating an experiment](/docs/experiments/creating-an-experiment) from PostHog UI
2. Understanding MDE, primary metrics, secondary metrics, interpreting results
3. [Traffic allocation](/docs/experiments/traffic-allocation) - configuring it and validating it. What are some reasons why 80/20 split may not be an 80/20 split?
4. Returning users: user sees variant A in session 1, does not convert; user sees variant B in session 2, does convert
    - Does this happen? Can the same user see different variants in different sessions? If so, how does this affect the results?
5. [No-code web experiments](/docs/experiments/no-code-web-experiments)
    - Implementation requirements
    - Landing page experiments – how to deal with flickering of content when page is first loaded?

#### Others
1. [Creating cohorts](/docs/data/cohorts#how-to-create-a-cohort) – [static vs dynamic](/docs/data/cohorts#static-and-dynamic-cohorts)
2. RBAC, Platform add-ons
3. Data pipelines

### Advanced

1. SPA (single page apps)
2. User paths
    - wildcard groups
    - path cleaning rules
3. API

## Alerting setup (for team leads)

We have certain automations in Vitally that your team lead needs to add you to. Please ask your team lead to add you.

- <PrivateLink url="https://posthog.vitally-eu.io/settings/playbooks/170c8d04-db4c-4036-997c-8967946a1fd8">Vitally name trait playbook</PrivateLink>: create a new branch that matches assigned CSM to new team member. In this branch, add action to update account trait `CSM name` to name of the new team member. This is used to populate account owner info in tickets created by customers we own, so support knows who to reach out to. 
