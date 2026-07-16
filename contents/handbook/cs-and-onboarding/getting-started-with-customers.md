---
title: Getting started with customers
sidebar: Handbook
showTitle: true
---

When a customer is assigned to you, your job is to understand their business, learn how they use PostHog, and find ways to be useful — whether or not they choose to engage. This page walks through how to research, reach out, and run your first call.

Also read [Get people to talk to you](/handbook/growth/sales/expansion-and-retention#1-get-people-to-talk-to-you) for tactics.

## 1. Audit the account

Before you reach out, build context. The more you bring to your first conversation, the faster you get to relevant recommendations.

### Their business

- What industry are they in? What products do they make?
- If you have other customers in their industry, does their PostHog usage match what you've seen before?
- For a deeper dive, the Sales team's [account planning template](/handbook/growth/sales/account-planning) is a good reference.

### Their PostHog setup

- Which PostHog products are they using?
- Which are they *not* using?
- Does their setup look complete? Are they paying for products they don't use? Run the [customer deployment health check](/handbook/cs-and-onboarding/health-checks).
- Review their [product onboarding](/handbook/growth/sales/account-allocation#product-onboarding) status.

### Data management

In their project(s), check the data management tab:

- Do they have custom events defined?
- If they use autocapture, have they defined [actions](/docs/data/actions)?
- Do custom events have meaningful [properties](/docs/getting-started/send-events#sending-custom-properties-on-an-event)?
- If they identify persons or groups, are the profile properties meaningful?

Also worth running through the [basic account review](/handbook/cs-and-onboarding/foundation-check) checklist.

## 2. Reach out

How you reach out depends on whether you're inheriting an existing contact or starting cold.

### Handover from Sales

If you're inheriting an existing contact:

- Review the [Sales → CSM Handover](/handbook/growth/sales/account-allocation#handing-over-customers) process.
- Get introduced in the existing Slack/Teams channel or via email.
- Coordinate with the previous owner for continuity.

### Cold (no established contact)

Cast a wide net — org owner, org admin, recent ticket raisers, anyone active in the last month. Even if there *seems* to be a point of contact, things probably changed — multi-thread by reaching out to several people.

### Your intro message

Cover:

- A value nugget — grabs attention and shows you've already done your homework.
- Who you are and that you're their new CSM.
- What a CSM does — their dedicated PostHog human, go-to for help, questions, training, and strategic guidance. Many customers misunderstand CSMs as "just support" — distinguish yourself.

### Value nugget ideas

Pull from Vitally and Metabase to find something specific to mention:

- Event count spike or drop — make sure it's expected and tracking is correct.
- Recent support ticket — follow up to confirm it's resolved.
- Concrete ways to [optimize spend](/handbook/cs-and-onboarding/health-checks#are-they-paying-for-things-they-dont-need) or [improve implementation](/handbook/cs-and-onboarding/health-checks#have-they-implemented-tracking-incorrectly).
- Invite to a shared Slack channel.
- High user count or low engagement — offer a training session.
- Legacy pricing plan: "We moved off legacy plans over a year ago. I'd like to transition you to standard pricing — happy to walk through the changes."
- New feature for their use case - Highlight a new PR or functionality for an app you know they use.

If you're inheriting an existing Slack channel, do the intro in Slack.

### Subject lines

Find what feels natural to you — keep it in PostHog's voice. Examples:

- "Hello 👋 from your new CSM at PostHog + hook"
- "hi from PostHog"
- "Checking in from PostHog"

In Vitally, an account's Active conversations tab is a good place to see how teammates have reached out in the past.

### No response?

Follow up after 2-3 business days. Try engineering, product, or data folks. Emphasize that you're not selling — you want to understand their use case and help optimize their PostHog integration. Reach out to users directly, avoid large group messages.

### Connecting with a champion

Once you've got someone responsive, aim to build a 1-1 relationship — ideally with someone in engineering, product, or data.

Acknowledge their time, make clear you're not pitching, and ask for a 15-minute call (async works too).

**Pro tip:** if they're not in Slack yet, don't ask — send them a direct invite. For accounts without a shared Slack channel, follow the [shared Slack channels guide](/handbook/growth/sales/slack-channels) to set one up.

## 3. Your first call

A quick discovery call is one of the most effective ways to learn about a customer. It beats a month of back-and-forth in Slack.

Typically 15-30 minutes. Aim: rapport, pain points, and a sense of where you can help.

### Goals to clarify

Use the call to figure out how deeply you'll work with this customer. Think through:

- What do you want to achieve with this customer? Keep an eye on them, or go deeper as their partner?
- Do they need help fixing their current setup?
- Do they have plans to implement new PostHog products?

If they need help or are expanding their use, that's an opening to work with them more closely — collaborate on a detailed [success plan](/handbook/cs-and-onboarding/onboarding-success-plan). Some customers won't want to engage deeply, and that's fine — keep monitoring their usage and check in when appropriate.

### Prep

Before the call:

- **Understand their PostHog usage.** Which products are they using and how? What metrics do they care about? Which products are they *not* using that should make sense for them? E.g. if they use product analytics but not web analytics, understand why.
- **Show them feature previews.** Recommend PostHog AI (relevant to most customers). Otherwise, recommend new products they likely already use (Messaging, CRM) — frame it as "you probably already have this — we're trying to launch it, would love your feedback."
- **Leave room for Q&A on the product.**
- **Plan next steps and an ideal cadence.**

### Question bank

Don't interrogate the customer — pick a few that are relevant.

- What's your role and team?
- What does your company do?
- What are your immediate and overall goals?
- Can you describe your current analytics setup and any tools you use alongside PostHog?
- Which user flows or features do you most want to understand better?
- Any blind spots or gaps in understanding?
- What problems have you had with analytics (ad blockers, data privacy, endpoint reliability)?
- What does success look like after implementing a new analytics solution?
- Are you more comfortable with direct SQL or do you prefer visual dashboards?
- How do you make decisions about scaling, feature adoption, and pricing flexibility?
- Who are the main users of PostHog on your side?
- Any concerns about compatibility or integration with your current stack?
- Anything weird happening in PostHog?
- What metrics do you deeply care about?
- Do you feel set up for success with your current PostHog setup?
- Which teams currently use PostHog at your company?
- Are there opportunities for other teams to adopt PostHog?
- Could you introduce me to champions on other teams to learn about their use case?
- [Review their current implementation](/handbook/cs-and-onboarding/foundation-check) — any concerns?
- Would training or workshops be useful for you and your team?
- How do you feel about PostHog overall?

## 4. Ongoing

### Prioritization

Prioritize potential churn risks, low engagement, and accounts where something is changing (for better or worse):

- **Upcoming renewals:** accounts with renewals in the next 3-4 months.
- **Low engagement:** customers who aren't using PostHog or engaging with us.
- **MRR variance:** significant decline or growth in the last quarter.

### Account research

A lot of valuable context lives in past conversations:

- **BuildBetter** — recordings of customer success, sales, and onboarding calls. Use <PrivateLink url="https://app.buildbetter.app/people">People</PrivateLink> to search companies or contacts and see call history, or use direct search / AI chat.
- **[SupportHog](/handbook/growth/sales/slack-channels)** — Slack channel history. Our own tool links [shared Slack (and MS Teams) channels](/handbook/growth/sales/slack-channels) to Salesforce accounts so you can view Slack/Teams interactions for your accounts.
- **Vitally** — Zendesk and email conversations under <PrivateLink url="https://posthog.vitally-eu.io/conversations/active/">Active Conversations</PrivateLink>. See who the key contacts have been, who's supported them in the past, and how frequently they raise tickets.

### Product usage analysis

PostHog is the best place to see how customers actually use our product. We also pipe product events to Vitally via the CDP, so you can see active users, MAUs, and which paid products an account uses.

Metabase has more detail, including cross-sell and upsell signals.

### News alerts

We use [Watch Tower](https://gotwatchtower.com/) to track news about companies in your book of business.

To set up:

1. Create an account with your PostHog email.
2. Create a list and import your book from Vitally or Salesforce.
3. Check that company names and domains are correct — Vitally and Salesforce often have inaccurate domains, and Watch Tower uses the domain for context.
4. Set up notifications (email by default, Slack also available).

Watch Tower will scan the news daily and ping you when there's a match.

## Find your own rhythm

There's no strict playbook. Use whichever sources work best for you.
