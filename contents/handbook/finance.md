---
title: Not running out of money
sidebar: Handbook
showTitle: true
---
## Stay calm and default alive

We don't optimize for short-run revenue growth, but we do make sure we have enough money to never feel dependent on future fundraising.

If we average 5% MoM growth, we are default alive (i.e. we'll become profitable before we run out of capital). If we average 7.5% we'll hit $100m by the end of 2026.

Maintaining a strong financial position helps us optimize for long-term revenue growth. For example, we've [removed products and revenue](/blog/sunsetting-helm-support-posthog) for long-term gains.

## Fundraising principles

Rule #1: Never have to fundraise – and only fundraise if all the following are true:

* It will speed us up.
* We can use the money effectively.
* The partner would improve our board.
* The increased chance of success offsets dilution.
* It reduces stress.

## How do we spend it

PostHog grows by shipping, whereas most software companies grow linearly with the number of salespeople they hire.

The advantage of our approach is that it's more efficient – $1 spent on product will _forever_ improve things, unlike investing $1 in cold calls. We can easily choose to be profitable if we just sit default alive and let revenue grow "automatically" based on the product we have already shipped.

The disadvantage is that scaling an engineering team is, in our opinion, harder than scaling a sales team. Since engineers' work very heavily overlaps, there is more complexity to getting this right. We may not be able to grow beyond a certain rate, no matter how much we spend. 

The final disadvantage is that it's harder to predict how fast we'll grow compared to a company that grows by hiring salespeople with targets, so it takes more thought and often requires more faith!

## The metrics we track and how to read our financials

The financial numbers we publish each month/quarter lives in the [internal Finance Updates dashboard]([url](https://us.posthog.com/project/2/dashboard/1631977)).

We group them into **monthly financials** (the basics — what we made, what we spent) and **quarterly SaaS metrics** (the efficiency lens to determine if we're growing well).

### Financial reports

**Revenue, COGS, gross profit** — the money we made, the cost of delivering it, and what's left. Everyone has a stake, especially product and engineering — they influence both halves of this, what we charge for and what it costs to run. We want revenue and gross profit to grow; COGS grows too (more customers), but ideally, slower than revenue.

**Gross margin** — gross profit as a % of revenue, i.e. what we keep from each revenue dollar after the cost of delivering the product. The cleanest read on whether the product itself is profitable, before any other spend. Most relevant to engineering and FinOps, because COGS is mostly infra, hosting and costs of direct labour. Higher is better; a great SaaS business sits at 75%. Below that, we're pricing too low or our infra is too expensive.

**Bad debt as a % of revenue** — the share of billed revenue we never collect. Tells us about who we're selling to and how tight our billing and collections are. Most relevant to billing, finance, and sales. Lower is better — under 2% is our limit, under 1% is great.

**Operating expenses (S&M, R&D, G&A)** — the three big spend buckets: sales & marketing, R&D (mostly engineering), and general & admin. Where the money goes to run the business. Direction isn't as simple as "lower is better" — absolute dollars grow as we scale, and that's expected. What we want falling over time is **OpEx as a % of revenue** — that's operating leverage. R&D staying strong is a feature for a product-led company.

### Quarterly SaaS metrics

**ARR per employee** — annual recurring revenue ÷ headcount. Tells us whether we're scaling efficiently or just adding people. Higher is better; IPO-stage SaaS sits around $580k.

**Burn multiple** — cash burned per $1 of new ARR. Tells us whether our growth is worth what it costs. Lower is better — under 1x is good, under 0.3x is top quartile.

**SaaS magic number** — new ARR earned per $1 of sales & marketing spend. A test of whether our go-to-market spend is paying off. Higher is better — above 1x means we're earning more in new ARR than we're spending to get it.

**Rule of 40** — revenue growth % + profit margin %. Forces the trade-off question: are we growing fast at the expense of profit, or profitable at the expense of growth? Above 40% is the bar.

**Cash balance** — cash on hand at the end of the quarter. The most concrete measure of staying default alive. Everyone has a stake. Higher is better, obviously — but the goal isn't to not raise more; it's to not need to.

**Cash runway (quarters)** — how many quarters our cash lasts at our current burn. The cash balance question, framed against how fast we're spending. Relevant to everyone, especially anyone making hiring or major spend decisions. Longer is better. Default alive means we reach profitability before this hits zero.

[Curious about our revenue metrics?](/handbook/growth/revops/retention-metrics)
