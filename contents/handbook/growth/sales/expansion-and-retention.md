---
title: Retention, Expansion & Cross-sell
sidebar: Handbook
showTitle: true
---

As an AE, you'll spend as much time managing your existing book of business as you will closing [new deals](/handbook/growth/sales/new-sales). Your first priority is retaining them - we have to work twice as hard if we're trying to close new deals and make up for lost customers. You'll typically be assigned a bunch of customers who are paying monthly - this means they could turn off PostHog at any time. 

Once you're confident that a customer isn't going anywhere, then you want to think about how you can expand their usage. Usually (but not always) this is after they've signed an annual contract. 

In order of priority, your objectives should be:

- Retention - establish multiple strong lines of communication
- Expansion - cross-sell additional products
- Retention - secure an annual commitment (maybe, but not always!)
- Expansion - expand usage of the same product into new teams
- Expansion - expand usage of the same product in the same team

The reason why we put cross-sell so high up the list is that we have seen that by _far_ the happiest and best-retained PostHog users, including from a revenue retention perspective, are those who have adopted 2+ products. It makes sense - it's relatively straightforward to replace PostHog if you're just using product analytics, but it's much tougher if you're using analytics + experiments + session replay. 

## Retention

Your objectives are to:

1. Get people to talk to you
2. Get a longer term commitment (maybe!)

### 1. Get people to talk to you

This is usually the most difficult bit! Sometimes customers will proactively reach out to us because they see their bill rocketing, but we have many customers who have happily self-served to a very high level of spend without feeling any need to talk to us. In particular, engineers have no interest in jumping on a call with you 99% of the time. These are some of the tactics we have found to be helpful:

- Offer to optimize their usage/reduce their billing - if they are pointlessly tracking a bunch of junk, tell them! Otherwise they'll just find out themselves and churn anyway.
- Tell them about new or upcoming features or products that they may not be aware of which you know could be a great fit for them (and let them try them out for free).
- Use multiple channels - email is usually the worst way to reach our ICP. Slack, in-app Surveys or even Telegram are all usually better. But try email first anyway.
- Loom videos sharing your observations about their usage/account provide a personalized and human touch which can go a long way to building lasting relationships.  Ask Simon for an invitation to our company account if you don't have access.
- Adding the contact on LinkedIn and sending a very human video or audio message can work really well - even for technical people (use the LinkedIn mobile app).  
- Figure out what the non-technical people in their team need and then go out and talk to them - get someone who isn’t an engineer to talk to us given engineers don’t want to.
- If they submit a support request, jump in and respond yourself to try and build a relationship. 
- Ask the wider team for help - we have to get creative here! As a last resort, deploying the founder card can be surprisingly effective. 

Don't do clickbaity things or trick people into talking to you - it'll just annoy them. And definitely don't just offer a generic checkin 'to see how things are going'!  

Ideally you want to get multiple people into a [shared Slack channel[(/handbook/growth/sales/new-sales#4-product-evaluation), as we've found this enables the best communication and allows us to provide them with great support. 

### 2. Get a longer term commitment (maybe!)

Once you've established contact, you basically want to get them into the same flow as if they were a new customer (and give them the same level of attention). You will be doing a combo of [discovery and commercial evaluation](/handbook/growth/sales/new-sales#sales-process), as the customer will want to figure out whether an annual contract with PostHog makes sense vs. what they've already got.

> Do not push for an annual contract no matter what - consider what actually makes sense here! Some customers are very highly likely to stick with PostHog even if they are paying monthly, e.g. if they have many users regularly logging in, lots of product activity, multi-product adoption etc. It can be actively harmful to turn up to a new customer and the first thing they hear from us is 'would you like an annual contract?'

You'll also go through the same [contracting process](/handbook/growth/sales/contracts#annual-plans-and-more) with them. We usually find that convincing a customer happily paying monthly to switch to annual is quite difficult, especially if they are a fast-growing startup (who tend to value flexibility over pure cost saving). This means that the discounts may not be as effective. If you're finding this is the case, you can get them on an annual plan but paying monthly or quarterly and halve the discount you offer. 

## Expansion & Cross-sell

AEs also do expansion at PostHog. This is because we are constantly on a sales footing with customers - for the most part, we don't do steady state account management with an arbitrary 10% uplift at renewal team. There are two primary ways we look to drive expansion with a customer:

### Identifying cross-sell opportunities

We use a combination of proactive outreach and automated alerts in Vitally to identify cross-sell opportunities:

- FF Opp (High Engineer %): Triggers when a company has a high % of engineers but isn't using feature flags
- Replay Upsell Opp: Triggers for companies with customer success, sales, product, or customer service roles as PostHog users but no session replay usage
- FF Opp (No Experiments): Triggers for companies who have users in product, marketing, leadership, or engineering roles haven't viewed any experiments
- B2B Group Analytics Opp: Triggers when group count is 0, group analytics plan is null, and the company type is B2B
- Web Analytics Opp (Marketing): Triggers when companies with marketing roles, >50 employees, and no visits to the web analytics page are identified

You can use these signals alongside regular customer interactions to prioritize outreach.

### How to run a cross-sell process

- First you need to find out who cares about the problem that our other products solve - is it the existing team or the new team?
  - Use a tool like [The Org](https://theorg.com/) or [Chartloop](https://www.chartloop.com/#) to help you identify new people. 
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

These are typically combinations of products that we've seen be successful:

- Product analytics + Web analytics
- Product/Web analytics + Replay
- Product/Web analytics + Data warehouse
- Feature flags + Surveys

### Expansion within existing product usage

The best way to do this is to expand usage of existing product with _new_ teams at the same company. This is a bit more straightforward conceptually, but may be harder to execute because you're likely to be starting with a new team from scratch. You may want to consider expanding usage of the same product within the same team if there is obvious scope to do so here, but this is difficult as it depends on the individual success of their product, which you can't control. 

- Make sure you are asking for intros to other teams during the regularly scheduled checkin calls - ‘who else would benefit from this?’, 'are there other teams with similar pain points?'
- In-person visits can help accelerate this

### Principles for visiting customers

If you offer to do a meeting in person with a customer, they’ll then feel obliged to introduce you to other people to make good use of your time. Trying to get them to adopt more products can be a good trigger, but generally you should be matching the cadence for in-person meetings with the size of contract (ie. more regular for Very Large, less regular for Large). 

Generally speaking you should be trying to regularly see customers in your book of business who are $60k+ annually, or could get there. Occasionally you can pull in James/Tim if they are traveling to SF/NY especially, or if the customer is in London. 

If you regularly visit customers, you can (and should) take some sweet merch. You can self-serve this using [a discount code pinned in our team Slack channel](https://posthog.slack.com/archives/C01MGUHFH6G/p1734015156043549) to get 100% off your order.

## Steady state retention

These are customers that are happily using PostHog long term, and are neither a churn risk nor likely to have expansion potential. Managing this group is much more automated and taken care of by CSMs, who do things like tracking usage and setting up alerts in Vitally to trigger outreach from us when a customer changes their usage behavior (either up or down). 

An important part of retention here is also to ensure support issues are fixed in a timely manner. We deliberately don't want to invest a huge amount in hands-on customer success here, because that can often paper over cracks in the product experience or quality of our customer support, so staying hands-off here is an intentional strategy. In the future, we will build out this playbook a lot more. 
