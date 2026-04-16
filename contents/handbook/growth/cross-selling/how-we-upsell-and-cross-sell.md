---
title: How we upsell and cross-sell
sidebar: Handbook
showTitle: false
---

## **How to cross-sell and upsell additional PostHog products**

Cross-selling is a primary focus across all growth oriented teams. In fact, "cross-sell" is mentioned here as many times as **success**... applying to customer-facing roles including AEs, CSMs, and TAMs. 

Success at PostHog comes from identifying genuine customer needs and demonstrating how additional related products solve real problems. The never ending objective is helping customers extract more value from PostHog, which naturally leads to increased product adoption. 

Equally important is cross-selling exposure inherent from teams such as product and marketing. If the product, brand, onboarding, and what we are telling customers day to day is inconsistent, we're going to have a bad time. 

### What does cross-selling mean?

These descriptions below will describe the overall who/what/why and we will evolve specific motions people have found useful to cover the how/when. For a baseline, we will use these general definitions with specific context following for PostHog:
- Cross-sell: selling additional products that are useful and complementary to existing customer adoption
- Expansion: customer is or will be needing more of already adopted products, in the form of more volume or different business groups and teams in a similar pattern
- Upsell (upgrades): offering advanced functionality to an already adopted product, or they're a candidate for an add-on, both of which have higher costs 

There are many ways a customer can signal or be primed for growth. All forms we will lay out here which may be in the form of usage, by voicing it directly, or you introducing the right products at the right time. 

### Wait! What should the relationship look like before you attempt cross-sell?

The relationship is first.

Leading with a cross sell motion is a bit like coming out the gate with offers related to contract billing terms and credits. While there are some limited circumstances where this makes sense, we should almost always start by focusing on the relationship.

The best way to build that relationship is to help the customer. That could be leaning in on a support ticket, offering recommendations around getting more our of PostHog, reducing spend, or even helping clarify docs.

Customers genuinely like PostHog, so engage them like a friendly acquaintance. Being hyper responsive to requests is a great way to build up good will. Another way is to own problems and follow them through to conclusion. Even if support is taking the lead, stay engaged and tie up any loose ends.

Here is a general checklist that should be met before putting a plan to cross-sell.  Specific product motions may have additional pre-requsites. 

- You have an active relationship with the customer – there are regular touchpoints and they are responsive to your outreach.
- You understand their product and PostHog implementation. You know which technologies they are using, and how PostHog fits into their setup.
- There are no major open issues with their PostHog implementation. They are happy with their current setup and aren’t voicing major frustrations.
- There is no active risk to their renewal, and you aren’t already negotiating that renewal.
- Clear path to talk to the right people
  - Ask your current champion who the interesting likely people would be to talk to
  - Be prepared to identify the right ICPs within the customer team
  - Identify teams that are responsible for critical paths/functions within their codebase, some examples across products are
    - Billing teams
    - Authentication & authorization teams
    - Data API teams (e.g. REST or GraphQL teams, that see a high volume of queries)
    - Management API teams (who have to deal with orchestration failures across projects)
    - Support tooling teams
    - Job titles that would be interesting are e.g. Platform Engineers, Backend Engineers (especially if they are on one of the teams mentioned above), anybody owning reliability or infrastructure

### Growth best practices

**Do:**

* Focus on solving documented customer problems 
* Provide trial access for evaluation  
* Share relevant case studies and documentation  
* Set clear success criteria before expansion 
* Optimize their implementation before introducing new things 
* Follow up on product experiments, even small ones

Generally, this is all to provide them with a solution that will make their life better (and make them look better!). It’s a win-win.

**Don't:**

* Recommend products without clear use cases (it’s okay to give awareness or suggest trying out something new)  
* Create urgency where none exists  
* Introduce expansion topics during crisis moments  
* Overwhelm customers with too many products at once

### We are friends, now what?
As you build a relationship with the account, learning about who they are, how they make money, and what they care about should naturally happen. Even so, you may need to dig in further, especially if their business is complex. Doing everything you can on your end to understand their business before asking business questions is another way to establish your expertise and build that good will.

There's a balance as any time you put additional burden on your champion or a stakeholder, you are less likely to help them achieve a positive outcome for us or for them. This is common as additional products require additional work to implement. 

Then, opportunities! 

## **Identifying growth opportunities**

We use a combination of proactive outreach, insights, and automated alerts in tools such as Vitally to identify cross-sell opportunities. Below are some examples and we will go in more detail on specific motions. 

You can use these signals which are documented on [health-tracking](/handbook/cs-and-onboarding/health-tracking) alongside regular customer interactions to prioritize outreach.

The best opportunities connect products to customer outcomes using their terminology and context. 

### Example signals of cross-sell opportunities

- Web Analytics Opp (Marketing): Triggers when companies with marketing roles, >50 employees, and no visits to the web analytics page are identified
- B2B Group Analytics Opp: Triggers when group count is 0, group analytics plan is null, and the company type is B2B
- Replay Upsell Opp: Triggers for companies with customer success, sales, product, or customer service roles as PostHog users but no session replay usage
- FF Opp (High Engineer %): Triggers when a company has a high % of engineers but isn't using feature flags
- FF Opp (No Experiments): Triggers for companies who have users in product, marketing, leadership, or engineering roles haven't viewed any experiments

### Strong expansion signals

* Consistent usage approaching billing limits  
* Multiple departments accessing PostHog  
* Questions about problems that other PostHog products solve  
* 20%+ month-over-month event volume growth  
* Custom implementations replicating native PostHog features  
* Actively using PostHog competitors identified by using BuiltWith, Wappalyzer, or internal [SDK Scanner](https://sdk-scanner.posthog.dev).

## How to run a cross-sell process

You made it here! You have the relationship, and you have the hunch (clear signals) a customer is good for cross-sell. Let's put it in to standard practice by following and building upon [cross-selling motions](/handbook/growth/cross-selling/cross-sell-motions) 

Here's a taste of what follows: 

- First you need to find out who cares about the problem that our other products solve - is it the existing team or the new team?
  - Use a tool like [The Org](https://theorg.com/) to help you identify new people. 
  - Make sure you are asking for introductions to other teams during the regularly scheduled checkin calls - ‘who else would benefit from this?’, 'are there other teams with similar pain points?'. They will know better than any outside tool to gap organizational relationships. 
  - In-person visits can help accelerate this
- Then you need to find out what are they using now to solve the problem (if anything) - surface this during the check in calls that you already have scheduled as part of onboarding if it's the existing team. If you're talking a new team, you'll effectively run this as a [new sales process](/handbook/growth/sales/new-sales). 
- Your approach will depend on the product that makes sense here:
  - If it's already a mature product we have shipped, you should aim to show how the product complements what they _already_ are using in PostHog - don't just arbitrarily sell in a product for the sake of it. For example, you can say ‘other customers that look like you are doing X, this is what we’re seeing’.
  - If it's something in beta or coming soon, you should start giving them sneak peeks of what's on our [roadmap](/roadmap). You can also schedule a feedback session with the relevant product engineer if they’re a great fit - customers _love_ this. Again, consider playing the founder card for something _really_ new and big.
- Understanding the blockers to using other products - these could be:
  - Privacy/compliance concerns (e.g. viewing session recordings) - we have a lot of documentation on this
  - Already doing it in house/with something else - demonstrated cool ways in which the products integrate and save their team time
  - May be too far down the line with their own data warehouse - it is hard to do a replacement at this stage, so instead talk about how you can enrich their data in PostHog with what's already in their data warehouse
  - Not ready to invest the time and resources to implement more tools - tie this to the pain of _not_ having an additional solution in place and emphasize time to value is extremely quick with PostHog e.g. with autocapture, session replay, and (soon) no-code experiments. 

> Pro tip - if a customer isn't using a PostHog product and there is no obvious reason why they shouldn't, ask them directly why they're not using it!

