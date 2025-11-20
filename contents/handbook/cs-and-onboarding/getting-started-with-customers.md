---
title: Getting started with customers
sidebar: Handbook
showTitle: true
---

As a CSM, it is your responsibility to be the expert on each of your customers, whether or not they choose to engage with you. Obviously, you’ll learn more about customers that you actually talk to, but there are still plenty of ways to get to know an account, learn their use cases, and track their journey from all of the data available.

Many customers have never spoken to PostHog – some happily welcome our help, others are strongly independent. In order to be successful as a CSM, we want to understand our customers and be helpful.

[Get people to talk to you](/handbook/growth/sales/expansion-and-retention#1-get-people-to-talk-to-you) also has good, helpful tactics.

# Newly assigned accounts

When you're assigned a new customer account, your approach will vary depending on the existing relationship between the customer and PostHog. This guide walks you through some key steps you can take when welcoming new customers to your book.

## Determine which category your customer falls into

### No/low interaction with PostHog humans

These are customers who have been using PostHog but haven't had much direct contact with our team. You should conduct a more thorough assessment before your first call with them. If you haven't done your initial outreach yet, you can also use the assessment to customize your message with a specific tip from your learning.

#### Account and business audit

Start by gathering context about who they are and how they're using PostHog:

**Understanding their business:**
- What industry are they in? What products do they make?
- If you have other customers in their industry, does their usage of PostHog fit what you've seen before?
- For an even deeper dive on their business, the Sales team has a thorough [account planning template](/handbook/growth/sales/account-planning) that they use for cross-sell/expansion that you can take guidance from.

**Reviewing their PostHog setup:**
- What PostHog products are they using?
- What PostHog products are they *not* using?
- Does their setup look complete? Are they paying for products they don't use?
  - Going over the [customer deployment health check guide](/handbook/cs-and-onboarding/health-checks) will help you answer these questions.
- Review their [product onboarding](/handbook/growth/sales/account-allocation#product-onboarding) status.

**Data management assessment:**
In their project(s), check the data management tab:
- Do they have custom events defined?
  - If not and they're using autocapture, have they defined [actions](/docs/data/actions)?
- Do custom events have relevant [properties](/docs/getting-started/send-events#sending-custom-properties-on-an-event) defined?
- If they're identifying persons or groups, have they defined a meaningful set of properties on those profiles?

Answering these questions helps you identify the most important things to focus on in your initial engagements. Take a look at our [basic account review](https://posthog.com/handbook/cs-and-onboarding/foundation-check) page for additional things to check.

# Introduce yourself

Once you've completed your audit, start reaching out. If this is an account that's being handed over from an existing contact:

- Review the [Sales > CSM Handover](/handbook/growth/sales/account-allocation#handing-over-customers) process.
- Get introduced in their existing Slack/Teams channel or via email.
- Coordinate with the previous point of contact to ensure continuity.

If you don't have an established contact, introduce yourself to the widest blast range: org owner, org admin, users who have recently raised tickets, and users who have logged in in the last month. Even if there _seems_ to be a point of contact, things probably changed – multi-thread! 

Your intro message should:

-   Introduce yourself as their new CSM
-   Describe the value of CSM – dedicated point of contact, go-to person for help or questions, help the customer use PostHog effectively, e.g., through training or strategic guidance. Many customers misunderstand the CSM role as 'just support', so make sure to distinguish your role as a CSM apart from that.
-   Value nugget: show how you can help by delivering value-add

### Examples of a value nugget

Take a look at your customer's account in Vitally and Metabase to identify ways you can be helpful. Some examples include:

-   Increase/decrease in events: make sure this is expected and things are implemented correctly
-   Recently opened a support ticket: follow up to make sure their issue is resolved
-   Concrete ways a customer can [optimize their spending](/handbook/cs-and-onboarding/health-checks#are-they-paying-for-things-they-dont-need) or [improve their implementation](/handbook/cs-and-onboarding/health-checks#have-they-implemented-tracking-incorrectly)
-   Invitation to a shared Slack channel so it's easier to connect with our team.
-   Lots of new users or low user engagement: offer a training session on how to use PostHog effectively
-   On a legacy pricing plan: "We've moved off the legacy plan for more than a year, and I'd like to transition you to standard pricing. Happy to discuss the changes."

If there's an established Slack channel you are inheriting, do it in Slack.

### Example subject lines:

You should find what you're comfortable with whilst keeping a sense of PostHog's tone of voice. Some examples include:

-   Hello 👋 from your new CSM at PostHog + hook
-   hi from PostHog
-   Checking in from PostHog

In Vitally, you can see how other team members have reached out to customers in the past by going to an account's Active conversations tab for inspiration.

If there is no response, follow up after 2-3 business days, targeting individuals in the engineering, product, or data team. Emphasize the purpose of your reaching out - you're not trying to sell them something, you want to understand their use case and help optimize their PostHog integration.

## Connect with champion

1-1 email or Slack message

Aim: start the relationship with a champion, ideally in the engineering, product, or data team

Content: Acknowledge that their time is valuable and that you will not be selling or pitching. You want to understand how to better serve the customer by understanding how they use PostHog. Would they be open for a 15-minute call? Offer to do this async as well.

Pro tip: If they're not already in Slack, don't ask; add them to Slack by sending them a direct invitation. If this is an account without an established Slack channel, you can follow our guide on [shared Slack channels](https://posthog.com/handbook/growth/sales/slack-channels) to set one up.

### Getting-to-know-you discovery call

This is one of the most effective ways to learn what you need to know about a customer, as you can ask direct questions and spend a lot of time listening to their responses. A quick call upfront is often better than a month of back-and-forth in Slack. 

Typically, this is a 15-30 minute conversation aimed at establishing rapport, understanding pain points, and beginning to formulate how you can best assist them.

Your discovery call should help you determine the level of engagement you'll have with the customer going forward. Think through the following questions:
- What is the goal you want to achieve with this customer? (Keep an eye on them vs. become more deeply embedded as a strategic partner)
  - Do they need help fixing their current setup?
  - Do they have plans/interest in implementing new PostHog products?
    - If the answer to either is yes, you can be their strategic partner and collaborate on setting up a detailed [success plan](/handbook/cs-and-onboarding/onboarding-success-plan).
  - Some customers may not want to engage deeply, and that is okay; still, continue to monitor their usage/spend and check in with them when appropriate. 

### Preparation before your call

Some things to consider before your call:

1. Understand the customer’s PostHog usage:
    1. What products are they using? How are they using it? What metrics do they care about from those products?
    2. What products are they **not** using? This means products that make sense for them to use, and you want to understand why they aren’t using them.
        1. For example, product analytics and web analytics are closely coupled. If the customer is using product analytics but not web analytics, understand why. Is there a reason for that? What’s the objection?
2. Call out feature preview ✨
    1. Explain what feature preview is and how to enable it
    2. Recommend PostHog AI as it's usually relevant regardless of customer use case
    3. Otherwise, recommend new products that the customer likely already has (e.g., Messaging, CRM) – position it as 'You probably already have [product], this is a product we’re trying to launch and would love to see how you would use it / any feedback you have. Keen to relay or rope in the engineering team directly with your feedback.'
3. Q&A on product
4. Next steps and ideal catch-up cadence.

#### Additional questions to consider for your call

Here are some recommended questions you could use. Please do not simply interrogate a customer with each of these questions; this is more of a question bank to use for inspiration!

- What is your role at the company, and what team are you on?
- What does your company do?
- What are your immediate and overall goals?
- Can you describe your current analytics setup and any specific tools or libraries you use alongside PostHog?
- Which user flows or features do you most want to understand better?
- Are there any areas you feel like there are blind spots or gaps in understanding?
- What problems have you encountered with analytics (e.g., ad blockers, data privacy, endpoint reliability)?
- For your team, what does success look like after implementing a new analytics solution?
- Are you more comfortable with direct SQL or do you prefer visual dashboards?
- How do you make decisions about scaling, feature adoption, and pricing flexibility?
- Who will be the main users of PostHog on your side?
- Do you have any concerns about compatibility or integration with your current stack?
- Anything weird happening in PostHog?
- What metrics do you deeply care about?
- Do you feel you are set up for success with your current PostHog setup?
- Which teams are currently active in using PostHog at your company?
- Are there opportunities for other teams to adopt PostHog?
- Would you mind making introductions to champions on other teams to learn about their use case?
- [Review and discuss their current implementation](/handbook/cs-and-onboarding/foundation-check) and if they have any concerns.
- Would training or workshop sessions be useful for you and your team?
- How do you feel about PostHog overall?

# Customer Prioritization

- Consider a separate approach for monthly and annual customers:
  - Annual plans: prioritize accounts with contract renewals in the next 3-4 months
  - Monthly plans: look for significant growth within the last quarter
- Accounts with platform packages
  - Customers on legacy "Teams" add-on ($450/month) could save $200 by switching to the "Boost" add-on if they do not require SAML SSO or managed reserve proxy. The teams add-on has now been split into:
    - [Boost add-on](/platform-packages#boost-add-on) ($250/month)
    - [Scale add-on](/platform-packages#scale-add-on) ($750/month)

## Analyzing product usage

While PostHog itself is (obviously) the gold standard for understanding how customers are using our product, we also make it very easy to view this information within the account context in Vitally and in Metabase.

We use the PostHog CDP to send product events to Vitally so that we can see which specific users are most active, MAUs on an account, and how many paid products they use.
We can see more specifics in the Metabase dashboard, as well.

These sources will both help you identify potential cross-sell and upsell opportunities, in the name of helping customers maximize their value in the product.

## Past conversations, tickets, and Slack channels

A very valuable part of account research is also reviewing past conversations. This will give you an idea of what level of contact we’ve had, who the main contacts may be, what issues they’ve faced, and so on.

The key places to look for this information:

- **BuildBetter**: will contain recordings of customer success, sales, or onboarding calls. Once in BuildBetter, you can use the <PrivateLink url="https://app.buildbetter.app/people">"People"</PrivateLink> data section to search for companies or individual contacts and then see the history of calls, or you can do a direct search or AI chat.
- **Pylon**: will contain the Slack channel history. You can view the <PrivateLink url="https://app.usepylon.com/accounts">"account"</PrivateLink> page, which is linked to Salesforce accounts for any of your accounts that have a Slack channel. You can filter on "Owner", which should also be mapped to the account owner from Salesforce, which lets you view all Slack or Teams interactions from accounts you own.
- **Vitally**: will contain Zendesk and email conversations under the <PrivateLink url="https://posthog.vitally-eu.io/conversations/active/">"Active Conversations"</PrivateLink> section. This will allow you to see who the key contacts were, which support, sales, or CS individuals they have worked with in the past, and so on. It's also really helpful to see how frequently they raise tickets and what issues they have faced.

## Recommended approach
The best recommendation is to find your own rhythm for how you, as an individual, prefer to learn about your customers. There's not a strict playbook. This is a compilation of the most reliable sources of knowledge to use for researching an account.