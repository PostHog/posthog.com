---
title: Overview
sidebar: Handbook
showTitle: true
---

## How RevOps works
RevOps at PostHog is the Product Manager for Sales, Marketing, and Executive teams. Just as PMs help engineering teams build better products by connecting user needs with technical solutions, RevOps helps go to market teams make better decisions by connecting different parts of the business together.

We do this by combining data from marketing, sales, product usage, and customer success to show what's working and what isn't. While individual teams deeply understand their specific areas, we provide insights about how different parts of the business affect each other and help teams see these connections to drive revenue growth for PostHog.

## RevOps values
1. Make data simple
2. Build for self service
3. Automate relentlessly

### 1. Make data simple
PostHog has data everywhere: product usage, sales pipelines, support tickets, revenue numbers. 
With this wealth of data comes complexity. We turn this scattered data into clear insights 
teams can use.

This means:
- Creating reliable, unified views that combine data from multiple sources
- Building clear abstractions that hide unnecessary complexity
- Maintaining source of truth definitions for key metrics
- Finding useful patterns in customer behavior
- Showing how each team's work affects our customers

Creating views to show total monthly MRR, per product MRR, and per product usage, and filters out the anomalies to make sure make sure analyses are accurate and consistent across teams was one of the early steps we took in this direction. Unifying data from our billing system, Salesforce, and Vitally to have full context on biggest [gainers](https://us.posthog.com/project/2/insights/ZcynB70W) and [losers](https://us.posthog.com/project/2/insights/5V4mvAej) queries to show full context on which customers' spend changed the most was another one to simplify access to this info and quickly take action when needed.


### 2. Build for self service
Teams should get the information they need without waiting for RevOps. Like engineers ship without PM approval, go to market teams should be able to analyze and act on data without asking us.

This means:
- Making all our data and processes visible by default
- Helping teams answer their own questions

For example, we built a self-managing [lead pool](https://posthog.com/handbook/growth/sales/crm#lead-pool-process-experimental) where leads automatically move if they haven't been touched in 7 days. Instead of leads getting stuck with specific AEs, any sales team member can now pick up and run with these potential opportunities. This keeps leads fresh and moving while giving everyone on the team a chance to work with promising accounts, no RevOps intervention needed.


### 3. Automate relentlessly
Manual work wastes time and doesn't scale. If someone has to do something twice, we automate it. We rely on teams to tell us what's not working because they see the problems first.

If a team at PostHog struggles with revenue operations, we've probably:
- Not automated enough tasks
- Tried to automate something we shouldn't
- Made data too hard to access
- Miss important customer data

For example we built an automated workflow that identifies [product qualified leads](https://posthog.com/handbook/growth/sales/product-led-sales) in real-time. When a company hits key milestones (like having 5+ active users and using multiple products) and matches [our ICP](https://posthog.com/handbook/growth/marketing/icp) they're automatically flagged as a new lead in Salesforce with their usage data so the sales team can now instantly see which customers can benefit from outreach and why instead of having to piece this information together themselves.


## RevOps vision

### Things we want to be brilliant at
**Standardize key metrics:** Own and maintain clear, consistent definitions for our most important business metrics including:
- How we recognize revenue (annual vs monthly plans, upfront vs usage based payments)
- Revenue retention calculations (what counts as expansion vs new business)
- Customer definitions (who's an active customer, who's usage qualified)
- How we forecast revenue (how do we predict future revenue based on current usage patterns, conversion rates, and expansion signals)

This ensures everyone across the company uses the same language and measures success the same way.

**Connect the dots:** Help teams understand how their work impacts others, things like:
- Track how specific marketing campaigns drive upsell and cross sell
- Measure what corraletes with strong retention rates
- Monitor which product features lead to customers expanding their usage

**Rapid insights:** Build self service tools that help teams quickly answer their own questions:
- Dashboards to easily track real time changes in key metrics
- Alerts when important customers change their usage patterns
- Easy ways to analyze customer behavior without needing SQL
  
### Things we want to do next
**Revenue attribution:** Understand how customers move from free to paid, including what features 
they use, how long it takes, and what influences faster conversions. When a customer upgrades or 
buys more, know exactly why: was it reading docs? using a specific feature? talking to support?

**Predictive analytics:** Build on our work around identifying expansion signals to get ahead of 
customer behavior, find customers likely to buy more before they ask, and identify unhappy customers 
before they leave.

### Things we don't want to spend time on
**Being the "data police":** We don't want to spend time enforcing data formats or policing how teams 
use tools. We focus on making it easy to do the right thing, not enforcing rules

**Running reports for people:** If someone regularly needs data, we should teach them how to get it themselves.

**Clean up projects:** If we're constantly cleaning up data problems, we've built the wrong systems, and should 
fix the source problems instead.

## Responsibilities

### What RevOps owns
Revenue insights:
- Reporting company wide metrics: revenue, retention, expansion, churn
- Help sales, marketing, and exec teams understand what drives revenue
- Identify patterns in customer behavior
- Build shared understanding of revenue and retention reporting across teams

Sales tech stack including:
- Salesforce administration and optimization
- Enrichment and intelligence tools (e.g. Clay, Clearbit, Sales Navigator)
- Contract management systems (Pandadoc)
[SalesOps section in handbook](https://posthog.com/handbook/growth/sales/crm) has more information.

### What RevOps supports but doesn't own

Revenue reporting and forecasting: RevOps provides recommendations and improvements but does not own implementation and maintenance. This is currently owned by the Growth team. 

Marketing operations: Marketing owns their campaigns and analytics, we help connect marketing data with revenue outcomes.

Product operations: Product teams own their metrics and experimentation, but we help track how they impact overall revenue.

### What RevOps doesn't do
- Financial accounting (though we work closely with Finance)
- Individual sales deal management
- Billing/invoicing platforms, and data infrastructure for revenue reporting owned by the Growth team
