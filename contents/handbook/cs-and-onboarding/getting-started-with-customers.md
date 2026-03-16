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

#### External research

The existing "Account and business audit" section covers what to check inside PostHog and our internal tools. But for accounts that have never spoken to us, that only tells you *what* they're doing — not *who* they are, *why* they chose PostHog, or what else is going on in their world. Spending 15-20 minutes on external research before your first message is the difference between sounding like a vendor and sounding like someone who gets their business.

For a deeper, structured account review, use the [account planning template](/handbook/growth/sales/account-planning) — it's designed for ongoing account management and covers business info, stakeholders, product usage, and risks in detail. The process below is the quick tactical version: how to get smart on a new account fast before your first outreach.

##### Where to look

**LinkedIn**

- **Match PostHog users to real roles.** The person building growth dashboards is probably the Head of Growth or a PM. The person who set up custom event instrumentation is probably an engineer. LinkedIn titles confirm or correct these guesses.
- **Team shape.** How big is engineering vs product vs marketing? This tells you who your likely stakeholders are and what language to use.
- **Hiring and tenure signals.** Job postings reveal where the company is headed (the [account planning template](/handbook/growth/sales/account-planning#iii-hiring-roles--goals) covers how to dig deeper here). For quick research, the headlines matter: are they scaling engineering, hiring their first data person, or posting for a role that implies a tool migration? Also check tenure — a new VP of Product in the last 3 months may be actively re-evaluating the tool stack. A recently departed champion is a churn risk signal.

**Company website, blog, and engineering blog**

- **What does the product actually do?** You need to understand their business to understand their data.
- **Pricing model.** Subscription, usage-based, freemium, enterprise? This directly shapes which PostHog features matter most.
- **Engineering blog is gold.** If a company publishes how they build products, you get their stack, their architectural values, their decision-making process, and often which tools they're evaluating or migrating away from. An engineering blog post about "how we moved from Segment to building our own CDP" tells you exactly what conversation to have. A post about their release process tells you how to position feature flags and experiments. This is the highest-signal external source for technical accounts.

**Try their product**

If you can sign up and use the customer's product, do it. Five minutes as an actual user gives you better conversation material than an hour of desk research. You'll see their onboarding flow, understand the core experience, spot where PostHog could help them measure or improve things, and have something concrete to reference in your first message. "I signed up and went through your onboarding — the quiz flow is really clean, but I noticed the transition to checkout felt abrupt. Have you looked at drop-off there?" is a fundamentally different first impression than anything you could write from LinkedIn alone. The [account planning template](/handbook/growth/sales/account-planning#ii-product-impressions) has a more structured framework for product impressions if you want to go deeper.

**Funding and stage**

- **Crunchbase or similar.** Series A companies have different priorities than Series D. Recent funding usually means scaling, hiring, and needing better tooling — good timing for outreach. Bootstrapped companies are more cost-sensitive — lead with efficiency and consolidation, not features. The [account planning template](/handbook/growth/sales/account-planning#a-business-stage) covers how to use this context in more depth.

**GitHub (especially for dev tool companies)**

- Open source? Check contributor activity, issues, and discussions for signals about their user base and priorities.
- Public repos reveal their stack, which helps you speak their language and understand integration needs.

##### Run a deep research session

Before reaching out to a high-priority account, it's worth running a focused research session using an AI tool (ChatGPT deep research, Perplexity, Claude, or similar) to pull together intel you'd otherwise spend an hour gathering manually. Give it the company name and ask it to find:

- **Recent news.** Funding rounds, product launches, partnerships, leadership changes, layoffs, acquisitions. Any of these changes your outreach timing and angle.
- **Competitor tool references.** Search for any public mentions of the company alongside tools like Amplitude, Mixpanel, LaunchDarkly, Sentry, Datadog, Segment, or Heap. Blog posts, conference talks, job postings that mention specific tools, Stack Overflow answers from their engineers, even tweets. If they've written "how we use Mixpanel for product analytics" or a job posting says "experience with LaunchDarkly required," that tells you exactly what they're using alongside (or instead of) PostHog and where the consolidation conversation starts.
- **How they build products.** Engineering blog posts, conference talks, podcast appearances by their team. You're looking for how they ship, how they make decisions, how technical the culture is, and what they care about. A company that blogs about data-driven product development is a very different conversation than one that doesn't talk about measurement at all.
- **Community presence and conversations.** Are their engineers active in community Discords, Slacks, forums, Hacker News, Reddit? What are they saying? What questions are they asking? Someone from the company asking "has anyone migrated from Mixpanel to something self-hostable?" in a dev tools Discord is the strongest possible buying signal. Even less direct things — asking about event schema design, complaining about analytics costs, discussing A/B testing frameworks — tell you what's on their mind and give you a natural opening. If you're already in the relevant communities for your accounts' industries, keep an eye out. All intel is good intel.
- **Forward-looking signals.** Most research tells you where a company is today. The most valuable intel tells you where they're going next. Look for: product roadmap blog posts, conference talks about what they're building, job postings that reveal new directions (hiring their first data engineer means they're about to get serious about analytics infrastructure), public OKR or strategy posts, even founder tweets about what they're excited about. If you can walk into a conversation already knowing their next quarter's priority, you can position PostHog as part of that plan rather than an afterthought.

This doesn't replace reading the PostHog instance — it complements it. The PostHog data tells you what they're doing with us; the deep research tells you everything around it.

**Important: research gives you hypotheses, not answers.** It's easy to look at a company's website and conclude "they're an analytics company" or "they're focused on enterprise." But that's your interpretation from the outside, and it might be wrong — or it might be where they *were* six months ago, not where they're headed. The goal of external research is to form a working theory of what the customer cares about, then *test that theory* in your first conversation. "Based on what I'm seeing, it looks like you're investing heavily in your onboarding flow — is that where the team's focus is right now?" is much better than assuming you already know. The research earns you the right to ask a sharp question, not to skip the question entirely.

> **Note:** The account news alerts project is working on automating the ongoing version of this — surfacing funding rounds, leadership changes, and other external signals for accounts in your book. The deep research session described here is for the initial deep-dive when you first pick up an account; account news alerts will keep that context current over time.

##### Mapping PostHog users to real people

Once you've done both internal and external research, the most useful thing you can do is match them up. PostHog usage patterns map to roles more reliably than you'd expect:

| PostHog signal | Likely role | How to confirm |
|---|---|---|
| Built growth/acquisition dashboards | Product manager, growth lead | LinkedIn title match |
| Runs experiments and feature flags | PM, engineering lead | LinkedIn + who created the flags |
| Views session replays | UX researcher, PM, QA | LinkedIn |
| Built custom event instrumentation | Engineer | GitHub profile, LinkedIn |
| Admin/billing actions | Founder, eng manager, finance | LinkedIn seniority |

For smaller companies (under ~30 people), one person often wears multiple hats. The founder who set up PostHog might also be running experiments. For larger companies, look for who's *currently* active, not who originally created the org — the person who set it up two years ago may have moved on.

This contact map directly informs who you reach out to first, through which channel, and with what angle. The person running experiments gets a different first message than the person watching session replays.

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

# Prioritizing your book of business

When you pick up a new book or get assigned additional accounts, you can't deep-dive every account at once. You need a quick way to sort what needs attention now versus what can wait. This isn't a rigid scoring system — it's a set of signals to glance at so you can make fast, defensible decisions about where to spend your time this week.

## Signals that tell you where to look first

Not all signals carry equal weight. Some demand immediate action; others are context that shapes your approach over weeks.

### High-urgency signals (act this week)

- **Billing risk.** PAYG customers with no credit commitment can leave at any time. If a PAYG account's usage is declining or they've visited the billing page recently, that's a conversation you need to have now — not in two weeks.
- **Usage dropping.** A meaningful decline in event volume, active users, or product engagement over the last 2-4 weeks. Especially dangerous if it's a single-product account, because there's less holding them to PostHog.
- **Open support issues going stale.** A customer with an unresolved ticket that's been sitting for days is actively forming an opinion about PostHog right now. Get on top of it.
- **Key person departure.** If your champion or primary contact has left the company (you'll catch this from LinkedIn or account news alerts), the relationship needs to be re-established with someone new before the account drifts.

### Medium-urgency signals (engage within two weeks)

- **Single-product accounts.** Customers using only one PostHog product are the easiest to replace and represent your highest churn risk *and* your best expansion opportunity. Worth a proactive check-in to understand whether there's a natural cross-sell or whether they're getting enough value from what they have.
- **Growing bill, flat adoption.** Revenue increasing because of organic traffic growth, not because they're using PostHog more deeply. They're paying more but not getting more value — that's a cost conversation waiting to happen, either from them or from you proactively.
- **New to your book.** Accounts recently assigned to you with no prior CS relationship. The longer you wait to make first contact, the harder it gets. Prioritize your intro outreach for these.
- **Credit balance running low.** Accounts approaching 20% remaining on their prepaid credits. This is a natural moment to check in — not to sell, but to make sure the next credit package conversation happens with context and value, not as a surprise invoice.
- **External signals suggest a shift.** Funding round, leadership change, new product launch, hiring surge — anything that suggests the company's priorities are changing. A customer that was steady-state last quarter might be about to scale hard or pivot direction. These signals turn a "check in next month" account into a "reach out this week" account. (See [External research](#external-research) for where to find these.)
- **Accounts with platform packages.** Customers on legacy "Teams" add-on ($450/month) could save $200 by switching to the "Boost" add-on if they do not require SAML SSO or managed reverse proxy. The teams add-on has now been split into [Boost add-on](/platform-packages#boost-add-on) ($250/month) and [Scale add-on](/platform-packages#scale-add-on) ($750/month).

### Lower-urgency signals (monitor, engage within a month)

- **Healthy multi-product accounts.** Customers using three or more PostHog products with stable or growing usage. These accounts have data gravity — switching costs are high and they're getting real value. Check in, but don't over-rotate here at the expense of accounts that need you more.
- **Steady-state annual commitments.** Accounts on prepaid credits with months left, stable usage, no support issues. A quarterly check-in cadence is probably right. Use the time to look for expansion opportunities but don't force it.
- **Strong ICP fit, low current spend.** Accounts that match PostHog's ideal customer profile but are small today. Worth nurturing — they could grow into significant accounts — but not at the cost of protecting the revenue you already have.

## Putting it together

The practical version: when you sit down on Monday morning, scan your book for the high-urgency signals first. Those are your week. Then look at the medium-urgency signals — those are your next actions to schedule. The lower-urgency accounts get your attention when the first two groups are stable.

Consider a separate approach for monthly and annual customers:
- Annual plans: prioritize accounts with contract renewals in the next 3-4 months
- Monthly plans: look for significant growth within the last quarter

A few principles:

- **No signal is also a signal.** An account with no support tickets, no Slack activity, no dashboard creation, and no login activity isn't "fine" — it's silent, and silence from a paying customer is worth investigating.
- **ARR amplifies everything.** A usage drop on a $80K account is a different problem than the same drop on a $12K account. The signals above apply everywhere, but the speed and depth of your response should scale with what's at stake.
- **Reassess regularly.** Priorities shift. A steady-state account can become urgent overnight if their champion leaves or their usage drops. Build a habit of scanning the signals weekly rather than setting priorities once and forgetting.

This framework helps you make the first cut. The deeper research process (see [External research](#external-research)) then tells you *what's actually going on* and shapes your specific outreach for each account.

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