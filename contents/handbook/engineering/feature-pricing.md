---
title: Pricing principles
sidebar: Handbook
showTitle: true
---

## In an ideal world, Posthog's pricing enables users and organizations to:

1. Use PostHog with generous free allowances if they are hobbyists or pre-PMF.
2. Experience the product before paying for it.
3. Start paying when they are ready, on their own, with few hurdles.
4. Transparently pay for the value they receive.
  - e.g. Usage-based pricing on events, recordings.
  - e.g. Paying per product, so they only pay for what they use.
5. Make it a no-brainer to pick PostHog over other competitors.

## Our goals with these principles are to:

- Keep the engineers at PostHog as close to our customers as possible, so they can build new products or improve existing products in ways that are most impactful for them.
- Maintain low barriers to entry for our customers, so they can see value in PostHog quickly.
- Ensure transparency around the value we provide to our customers.
- Tightly couple our success with that of our customers'. The more we can help them succeed, the more we will succeed.

It's important we evaluate all new features, and shifts in our pricing plans, to ensure they align with our pricing values.

## In the real world

Sometimes these principles still leave room for questions – what, if anything, should be available in the free tier? What about enterprise customers? 

For these types of questions, we've defined a runbook for deciding which plans, and at what limits, features should be assigned to.

### Usage-based pricing as the default, with exceptions

The more a customer uses a product, generally the higher their bill should be. This has several benefits: 

- A customer only pays for what they use, not more, not less
- As our costs for providing a product scale through increased usage, so does our revenue
- A customer's bill, and therefore our revenue, scales with their success (more users, more usage of our platform, etc.). This means our incentives are aligned

There can be exceptions to the rule: for some products the engineering time is the most expensive part, and in these cases we should consider tiered fees, monthly flat fees, or seat-based pricing where it makes sense.

### Each product should pay for itself

When picking the pricing for a new product, we should ensure we pick a pricing that allows the product to pay for itself in the mid term.

While we don't have loss leaders, we accept that we might not fully understand our cost base and make money on every product on day one. We welcome this pressure to do things more efficiently and get the costs down over time.

A good pricing structure allows us to bring costs down over time with pricing staying fixed, thus increasing our margins.

### For products in an established market, we should roughly match the cheapest competitor

In general, we should roughly match the pricing of the cheapest big competitor for that product, so long as the unit economics make sense, to make it a no-brainer to use PostHog. To qualify for this, a competitor must be _making actual revenue_ at significant scale – we won't match the pricing random startups or new products at existing competitors offer, since these products and GTMs aren't mature yet.

We can do this because we can upsell customers multiple of our other products. The total ACV is higher even if the per-product ACV is lower.

It's better for customers because they get all these tools that are well integrated for the cheapest possible price.

For innovative products where there is no established market, we are also the innovator on price. For such products, pricing should match our pricing principles, but we shouldn't be afraid to experiment. This includes changing pricing early if it doesn't work out (e.g. if the product fails to pay for itself, or the usage-based unit we picked is unappealing to customers).

### Every product should be priced separately

Whenever we build a product, like feature flags, or product experimentation, we should have a specific price for that product by itself. Being consistent here is less confusing than randomly combining products for example, even though it will sometimes mean more items to explain to a customer.

It means that customers who want just one product can compare each of our products to our competitors', seeing that we are cheaper everywhere, improving our self-serve top-of-funnel.

This also makes the value of each product more tangible. Usage and value are not the same thing – willingness to pay is the best indicator of the value our customers are getting from each product.

However, when one of our products has a fundamental dependency on another of our products, we should aim to bundle the cost of the dependencies in with the product's pricing so customers only pay once for using a given product.

For example, when someone calls a feature flag, we send a `$feature_flag_called` event so we can have stats. In this case, we don't charge for those events, as the events are solely related to feature flags.

### Products or features that are core to interacting with our platform, or increase our stickiness, should be free, or priced close to cost

**Interaction example:** PostHog AI allows users to explore data in ways that weren't possible before, or interact with products more naturally through chat. While our costs of providing an agentic experience are high, we should charge close to cost, so we don't put users off using it.

**Stickiness example:** If someone were to consider moving from PostHog to some other provider, cohorts would need to be manually recreated in the other provider, which would be tedious. Since the costs of cohorts are partially covered through other products (e.g. product analytics), this allows us to provide cohorts to our users for free.

### Products should work independently but shine together

Each product should be usable on its own. For example, session replay can be enabled independently of other products. But to get the most value out of it, it's best to use it together with our other products. This enables users to have rich filters using the data from the other parts of PostHog. Similarly, you can use error tracking on its own, but it's a lot more powerful if you also use session replay, enabling you to easily click through to the recording of a session where the error occurred.

### Other guidelines

- We accept pricing complexity for the benefit of the users. Usage-based pricing is inherently more complex (for users and for us) than e.g. flat rates, but it ensures that users only pay for what they use, and allows us to understand the true value that they're getting out of each product.

- We should always ask ourselves how newly released features should be priced, even if it's launching as a free product. A default behavior is good, but it shouldn't be used as a replacement for critically thinking about where something fits into our pricing scheme.

- For products we are expecting to have high costs or low margins (e.g. AI products), we should consider launching them with pricing even during beta, to not have our costs spiral out of control.

- Our default assumption for new features is that full usage is only available on the paid plans.

- Features that need to be experienced in order to demonstrate value should be available on the free plan but with a reasonable limit.

- Features that have the potential to grow our word-of-mouth should be free – e.g. we shouldn't (and don't) charge for extra users in an organization because the more people we get inside PostHog, the better.

- Features that are focused around extra security, permissioning, compliance, or other enterprise-style upgrades should be reserved for our enterprise pricing tier.

- Grandfathering is expensive for us to maintain, so we don't do it by default for everyone and follow these guidelines:
	- Free users don't get legacy pricing. Once they start to pay, they pay our current prices.
	- Self-serve paid customers get a limited transition period (e.g. three months) with grandfathered pricing. This ensures that there's a clear deadline for the new pricing taking effect, while showing goodwill to customers who were already paying us. This also applies to customers who have a contract with us.
	- Nobody gets legacy pricing forever. If you think a customer needs an exception, that should be a time-boxed decision, and not the default.

### Deciding on a free volume, and making changes to it

- When choosing a free volume for a new product, we should choose a value that is in line with our pricing principles: It should give customers the opportunity to experience the product before paying for it, and we should roughly match our competitors if they offer a free tier.

- Keep in mind: It's easy to increase the free tier for existing customers, but it's very painful to decrease it (since we don't want existing customers to pay more).

- If we decide to lower the free tier as part of a wider pricing change (primarily when we lower our prices), in principle we should roll out the new pricing **and** the new free tier to existing customers, because they will likely save money. An exception should be made for customers who are forecasted to pay more. In these cases we should enroll them in the new pricing, but grandfather the higher free tier.

### Yearly pricing evaluations & raising prices

Each product should run a yearly pricing evaluation. The evaluation should look at:

- Competitive market
- New features
- Costs & margins
- etc.

Use the yearly pricing evaluation template to do this, and submit it as an RFC for others to review.

The goal with the pricing evaluation is to make sure we are not undercharging or overcharging. Though we aim to be generous, things like inflation, increasing provider costs, and new features can mean that our margins get thinner and that PostHog becomes less healthy as a business. Business health is critical to making sure we can continue to provide great services for our customers.

Pricing evaluations might result in a recommendation to raise prices. This should be done respectfully – customers should always be notified of the price change with plenty of advance warning (e.g. 60 days) and should be given resources for how to maintain their current spend (e.g. tuning event volume).
