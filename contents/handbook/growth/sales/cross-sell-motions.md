---
title: Cross Sell Motions
sidebar: Handbook
showTitle: true
---

## Problem statement

Cross sell is a primary focus for product led sales team , but we don't have a specific playbook / motion / plan on how to do cross sell well. As a result, TAM managed accounts are only *slightly* better than average when it comes to product adoption. We can change this. We have the technology.

## Goal
Get existing PostHog customers to adopt more products. Move from an average 4.8 products adopted currently to 6 products adopted for TAM managed accounts over the next two quarters.

## Expected outcomes
1. Increase Revenue / product usage
2. Increase stickiness
3. Offer real value of the "platform" to users

### Metrics to track
Since we have different folks at different stages of ramp and onboarding, instead of making these metrics flat or percentage based, we are looking for an increase quarter over quarter.

1. Number of business value conversations
	1. These could be QBRs or other one off calls, but we want to increase the number of calls that are primarily discussing business value
2. Number of in-person visits
3. Product adoption quarter over quarter
4. Churn rate by total number of products
5. Churn rate by specific products
	1. i.e. are there products that once adopted lead to a noticeably lower (or higher) churn rate.
6. Percentage of revenue from a customer spread across products
	1. i.e. is all the revenue for a customer coming from person profiles or is is spread between recordings, events, feature flags, and exceptions

## First the relationship
Leading with cross sell is a bit like coming out the gate with an annual plan. While there are some limited circumstances where this makes sense, we should almost always look to build a relationship first.

The best way to build that relationship is to help the customer. That could be leaning in on a support ticket, offering recommendations around getting more our of PostHog, reducing spend, or even helping clarify docs.

Customers genuinely like PostHog, so engage them like a friendly acquaintance. Being hyper responsive to requests is a great way to build up good will. Another way is to own problems and follow them through to conclusion. Even if support is taking the lead, stay engaged and tie up any loose ends.

We also firmly believe that adopting more products leads to a better experience and higher satisfaction with PostHog. We should couch any product recommendations in terms of seeing this as a win for the customer.

As a part of this process you are also determining whether they are a good opportunity for cross-sell motions.
### Accounts that are a good fit
- Smaller / startup size accounts that don't have existing tooling and can grow with PostHog - it is much easier to grow into using multiple products than it is to try to supplant an existing product.
- Engineer heavy - direct technical contacts that have influence in adoption
	- Product engineers
	- Technically minded leadership like CTO
	- Technically adept product manager
- Pushing the limits of PostHog - support engagement isn't "how do I do this simple thing" but "how do I tackle this complex concept"
- Heavily engaged users - we'd prefer 10 heavily engaged users over 100 low engagement accounts
- Volume of product use tied to revenue - does an increase in PostHog usage correlate to increase in revenue for them?
- Ability to ship quickly
- Being open source is a plus - it gives us insight into their implementation as well as their adoption of other tools

### Timing Matters
Optimal timeline if a customer is on an annual contract:

- **Months 1-2**: Pure adoption focus, no cross-sell
- **Months 3-6**: Prime cross-sell window
- **Months 7-9**: Reinforce value of expanded stack if adopted
- **Months 10-12**: Focus on "Why stay with PostHog" rather than expansion/cross-sell (it's too late)

Warning Signs to pause cross-sell:

- Complaining about price, actively seeking reduction
- High volume of support tickets related to performance/UX
- Usage declining for 4+ weeks
- Key champion leaves company
- Data Engineer takes over ownership of PostHog
## We are friends, now what?
As you build a relationship with the account, learning about who they are, how they make money, and what they care about should naturally happen. Even so, you may need to dig in further, especially if their business is complex. Doing everything you can on your end to understand their business before asking business questions is another way to establish your expertise and build that good will.
### Hypothetical play book
One way of approaching this that we have seen work is a research -> QBR -> recommended cross-sell 

1. Account research and understanding the business
2. Some sort of engagement (QBRs?) to understand business priorities and tie them to PostHog
3. Make specific recommendations around what to adopt and how it will help with business priorities

For example, customer B2C SaaS has a business model selling subscription plans. Digging in to understand the differentiators of the plans and reviewing their custom events to ensure they are collecting the appropriate data. Come to the QBR ready to discuss the particulars of their situation. You may or may not have the info you need to make a recommendation on the call, but at the very least, you should have a direction to suggest. You could recommend revenue analytics beta, experiments for plan adoption, and surveys for user feedback given what you know about their business model.

This doesn't always need to be a formal QBR process, but some form of research -> discovery / interaction / recommendation is the basic flow here.

#### The Why Evolve Framework for Cross-Selling

1. **Document Results**
    - Start every cross-sell conversation by quantifying their wins with current PostHog products
    - Example: "Your team has tracked 50M events, identified 3 major UX issues that were costing 12% conversion"
2. **Highlight Evolving Pressures**
    - Frame new needs as natural progression, not disruption
    - "As your user base grows internationally, you're facing new questions about region-specific behavior patterns"
3. **Share Hard Truths**
    - Be transparent about gaps without undermining current success
    - "Your analytics show what's happening, but your team still spends hours in user interviews trying to understand why"
4. **Emphasize Risk of No Change**
    - Show what they miss without additional products
    - "Without session replay, you're making UX decisions based on incomplete data"
5. **Describe Upside Opportunity**
    - Paint vision of complete analytics stack
    - "You'll move from guessing why users drop off to seeing exactly what frustrated them"

## Suggested bundles
If we want customers to use more products, we should incentivize new product adoption. This could be in the form of credits for a specific timeframe to cover adoption and usage of the specific product. For example, if a customer wants to try out data warehouse, we offer 2-3 months of credit for any data warehouse usage as they figure out how they would use it and where it provides additional insight.

These sorts of cross sell / bundles fit well within PostHog, and can be pitched in grouping by feature or by user needs:

### Features
- [Product analytics + error tracking](/handbook/growth/sales/cross-selling)
- Replay + error tracking - see the errors a user is encountering
- Feature flag + mobile replay - use for sampling / roll out that is not natively supported by mobile replay
- Experiments + surveys - run A/B/n tests and offer surveys to back up / validate insights
- LLM analytics + data warehouse - enrich LLM analytics with data from other sources like Stripe or Supabase
- Revenue analytics + data warehouse - natural fit between connecting up stripe and enriching data further
- Experiments / feature flags + error tracking - insight into errors for new / beta features, and seeing the impact of those errors on conversion rates is valuable
- Feature flags + LLM analytics - ability to granularly segment features based on cost / engagement of users. i.e. you can release higher cost models to users who have already shown a willingness to spend

### User Needs
#### The "early stage growth" stack

**Products**: Analytics + Session Replay + Surveys  
**Value story**: "You know what users do, see how they struggle, and can ask them why"  
**Ideal for**: B2C companies with conversion optimization focus

#### The "ship fast without breaking" stack

**Products**: Feature Flags + Error Tracking + Experiments  
**Value story**: "Roll out safely, catch issues instantly, measure impact scientifically"  
**Ideal for**: High-velocity teams with continuous deployment

### The "revenue optimization" stack

**Products**: Analytics + Experiments + Revenue Analytics (via Data Warehouse)  
**Value story**: "Track user behavior, test pricing changes, measure revenue impact" 
**Ideal for**: B2B businesses focused on LTV/CAC

#### The "vibey AI startup" stack
**Products**: Analytics + Flags + LLM Analytics + Error tracking
**Value story**: "Tie user behavior to run cost, launching features that are both user requested and revenue generating"
**Ideal for:** AI-focused startups optimizing for cost efficiency and user engagement
## Incentivizing adoption
We have opportunities to get creative with how we incentivize new product adoption with users. A few ideas are: 

- Bring them over at competitor pricing for X months
	- We could eat Launch Darkly's lunch
- Free trial / $0 product usage for X months
	- Related to the above suggestion for credits, this would be a more "on rails" approach
- Give them additional credits on top of their new product usage
	- If they adopt data warehouse, don't just cover their usage, give them an additional 5% for each new product adopted
- Could we offer in app notifications about good combinations of products?
	- If a user is using feature flags heavily, we should suggest experiments
- Easier migration for competitors products
- Each additional paid product adopted above 3 adds 5% discount

## What to look for when cross selling
We've already seen indicators that are worth paying attention to when it comes to success cross-selling.

1. New PostHog product launch - did we launch a product that is a good fit for their use case? Did we add a new data pipeline source or destination?
	1. Reach with details on the new product
	2. Offer to credit them back their first month of usage so they can try it out risk free
2. Raising funding - did the customer just raise money?
	1. Congratulate the founder on the raise
	2. Lead with product that can capitalize on their opportunity to bring in more revenue / usage
		1. i.e. if they are B2C, pitching experiments to maximize conversion
3. PostHog price change - did we change pricing to make adoption more palatable?
	1. Let your main point of contact know how much they will save with the new pricing if they currently use the product
	2. If they don't suggest adoption based on the new rate and offer credits to offset learning curve
4. Revenue increase - is the customer seeing an increase in revenue?
	1. Depending on how you know about it, either congratulate them (or don't)
	2. Recommend a product that would capitalize on that revenue
		1. Error tracking to clean up issues
		2. Feature flags to launch new user features
5. New customer product launch - is the customer launching a new product that could benefit from additional PostHog goodness?
	1. Check out the product yourself (if applicable)
	2. Congratulate them on the new launch
	3. Suggest products that would help with the success of the new launch
		1. i.e. surveys for feedback, feature flags for new features
6. Competitor drops (or lacks) SDK support - does a competitor lack critical support or have they dropped support?
	1. Reach out proactively to main technical contact if there is overlap
	2. Mention our support (and lack of competitor support)
	3. Send any pertinent docs
	4. Follow up regularly with status updates and additional resources
7. Eng/marketing hiring - is the customer hiring more technical roles? Could we do this through LinkedIn?
	1. Prep PostHog onboarding for new user
	2. Offer call / support for getting them up to speed
	3. Suggest products that make that new hire's life easier
		1. i.e. error tracking to figure out where the gremlins are
8. New users from other business units - are we aware of / seeing people from other parts of the business asking about (or even using) PostHog?
	1. Make note of who the new users / units are
	2. Ask for a warm intro from current main point of contact
	3. Reach out 1:1 to new users to get feedback / offer help
9. Customer expanding into new geography / territory - is the customer moving into a market they weren't previously in?
	1. Ensure they are capturing the correct custom events / properties
	2. Pitch products that help with differentiating location experience
		1. i.e. feature flags for unique features based on GeoIP
10. When an owner leaves PostHog or a new owner is added - is the new owner open to other products that can help solve the problems they care about?
	1. Reach out to new owner to understand their priorities
	2. Hit any products that were previously suggested to the other owner
	3. Offer credits for adoption of the new product
11. Shift in customer business model - is the customer introducing a new type of subscription, going from on-prem to cloud, changing their fundamental offering?
	1. Dig in to understand the changes
	2. Suggest flags / experiments as a good way to get feedback / modify the experience for the new model
### Alerts
What alerts would be helpful to have that would indicate good cross sell opportunities.
1. Could we use our PostHog to flag when an account's revenue is increasing on their end? (not spend with PostHog, but their actual revenue)
2. Could we use signals in Vitally / PostHog to notify about new power users?
3. Could we get an alert when an account tries a new product for the first time?

## Example questions to ask

The questions below are designed to spark thoughtful conversations with customers. They help uncover how teams are currently solving problems and whether there might be simpler or more effective ways to do so using PostHog. 

Use these questions in preparing for calls and use them as examples for developing your own questions. Each includes the **question**, the **pain revealed**, and the **PostHog advantage**.

### Error Tracking

| Question | Pain Revealed | PostHog Advantage |
| --- | --- | --- |
| When an error occurs, how easy is it for you to see exactly which user actions led up to it and how it affected the experience? | Debugging relies often relies on reproducing error | Error Tracking tied directly to replays makes root cause and impact obvious. |
| If you’ve built your own error tracking, how much effort goes into maintaining and correlating it with analytics? | Time wasted maintaining infra, blind spots in analysis. | Lightweight SDK that's tightly integrated with other products. |
| How do you decide which errors to fix first? | Prioritizing by gut feeling or frequency, not business impact. | Error Tracking + Product & Revenue Analytics can show which errors have the greatest impact. |

### LLM Analytics

| Question | Pain Revealed | PostHog Advantage |
| --- | --- | --- |
| When your LLM-driven features underperform, how do you pinpoint why? | No clear visibility into model errors or user friction. | LLM Analytics shows usage, performance, and cost data together. |
| How do you know which LLM features are helping vs hurting users? | No clear way to measure LLM impact on user behavior or business outcomes. | LLM Analytics + Session Replay shows which interactions drive value vs cause drop-offs. |
| How do you evaluate your LLM analytics in the context of broader product goals? | Standalone tools miss product context. | Integration ties LLM performance to actual product outcomes. |

### Session Replay

| Question | Pain Revealed | PostHog Advantage |
| --- | --- | --- |
| When debugging, how often do you rely on logs or secondhand reports to reconstruct what happened? | Time lost piecing together events. | Session Replay shows exact user journey, reducing guesswork. |
| How do you confirm if a bug is isolated or widespread across users? | Hard to prioritize fixes without scope clarity. | Replays + analytics show impact |
| How do you identify user friction today? | Lacks visibility into real interactions without PM background. | Session Replay gives direct user perspective for product calls. |

### Feature Flags

| Question | Pain Revealed | PostHog Advantage |
| --- | --- | --- |
| When launching a new feature, how do you manage risk of rollouts failing? | “Big bang” releases increase risk + stress. | Feature Flags enable safe, gradual rollouts & rollbacks. |
| How do you measure whether users actually engage with a feature once it’s enabled? | No feedback loop between rollout and usage metrics. | PostHog connects flags directly to analytics & experiments. |
| What’s your process for debugging an experiment if users drop off unexpectedly? | Experiments may fail without clarity on root cause. | Session Replay + Error Tracking pinpoint where the experience broke down. |
| How do you currently measure the business impact (e.g., revenue, retention) of an experiment? | Results limited to engagement metrics, missing real business outcomes. | Revenue Analytics + Product Analytics + Data Warehous show both engagement and business impact. |

### Revenue Analytics

| Question | Pain Revealed | PostHog Advantage |
| --- | --- | --- |
| How do you measure the direct revenue impact of your features? | Work disconnected from business outcomes. | Revenue Analytics ties feature usage to revenue & LTV. |
| How do you weigh roadmap decisions against revenue impact today? | Guesswork in prioritization. | Revenue Analytics reveals which features drive business outcomes. |

### Surveys

| Question | Pain Revealed | PostHog Advantage |
| --- | --- | --- |
| When analyzing survey responses, how easy is it to connect them to specific user behaviors or outcomes? | Responses are siloed, making it hard to correlate feedback with analytics or events. | Surveys integrate natively with Product Analytics and Session Replay, linking responses to user journeys and metrics. |
| How do you target surveys to the right users without manual segmentation or guesswork? | Less targeted surveys lead to low relevance and response rates. Custom targeting requires dev time. | Display conditions use cohorts, feature flags, and events to show surveys only to specifics users, with built-in response limits. |


## Next steps for tactical execution
1. Build out example playbooks for bundles above
2. Case studies on specific cross-product adoption goodness
3. Data models to predict next product adoption
4. Look into alerting on data
