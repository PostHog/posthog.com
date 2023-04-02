---
title: Ideal Customer Persona
sidebar: Handbook
showTitle: true
---

PostHog aims to provide all the tools that our ICP needs in one platform. This is a _lot_ of products.

## How do we prioritize?

Tools should either 

We must be able to get in first for any of our tools.

## What makes a tool in-scope or out-of-scope?

The earlier stage a company is, the more likely that they don't have specialist organizations by role, such as engineering, marketing, product, data, customer success, sales.

The more engineering-led the organization, the stronger a fit PostHog is for the customer, and the more likely it is that product engineers are driving all of the above areas. For example, a YC backed startup will typically have two technical cofounders, who will handle every role in the company.

Therefore, any of the above are possible for us to build. Here is a non-exhaustive list, sorted by stack:

Product stack = product tours, feedback and surveys, analytics, recordings, roadmap, beta management (self-serve feature flags), user interviewing, alerting
Engineering stack = feature flags, error handling, APM
Growth stack = experimentation, session recordings, funnels, lead scoring, revenue (and integration)
Data stack = warehouse, CDP / etl / reverse etl, transformations, monitoring and observability, data governance, ML and DS tooling, headless analytics
BI stack = notebooks, querying, visalizations, forecasting
Marketing stack = heatmaps, scrollmaps, ...

## Prioritizing within the range of in-scope tools


## Being able to build all of this stuff

From what we've seen so far, very approximately, simpler products take a team of 2 engineers around 3 months to get into an MVP, 3 more months to get to PMF (ie charging with happy customers), and 3 more months to get profitable. Complex ones (those involving a higher infrastructure workload or much bigger feature set) we imagine will take longer but may be more profitable with higher order values once built.

Once a product hits MVP, we should hire enough that we can either maintain _or_ innovate depending on if we believe the product is a growth engine for us and the feature's success.

## TO DELETE - Rough notes

Other apps
What’s the goal of more apps?
How far do we want to go with the tools?
Get to 80% and then start charging
For products that have PMF, keep investing so they are best-in-class
Stages of product:
MVP = It works
PMF = Charging for it, making money, profitable (feature parity)
Best-in-class/integrated = Best product for ICP, stability matters (does stuff that others can't do, headless
TODO - talk about stages further
Ideally integration is differentation
What's the principles of what we build?
Builds on/enhances product and customer data
Distribute via the SDKs
Has to improve our other products
Selling to our ICP
Give API access to everything
Antiprinciples:
Shouldn't host stuff on behalf of customers
Data warehouse as a focus
Should we start with airbyte and fivetran integrations + dbt
Sequencing of data warehouse, then 20% of airbyte then gives all the value (only imports and tools our ICP would use)
There's a few product for observability and monitoring, but want to get the warehouse successful first
Product stack = product tours, feedback and surveys, analytics, recordings, roadmap, beta management (self-serve feature flags), user interviewing, alerting
Engineering stack = feature flags, error handling, APM
Growth stack = experimentation, session recordings, funnels, lead scoring, revenue (and integration)
Data stack = warehouse, CDP / etl / reverse etl, transformations, monitoring and observability, data governance, ML and DS tooling, headless analytics
BI stack = notebooks, querying, visalizations, forecasting
Marketing stack = heatmaps, scrollmaps, ...
Headless everything? Headless session recording, headless feature flags
Shouldn't build:
CI/CD
Hosting
Product tools
Data tools stack
Under 100m focus on stuff which rolls up to CTO
Extensibility - visualization apps, templates for notebooks/dashboards
Tinybird branding - landing page, copy as curl etc.
Are there tools that are build for different ICPs that will be come under engineering?
Data stream
Product stream
Which ICPs/teams could we expand to?
Product engineer, Growth engineer, Data engineer and analytics engineer, CS, Marketing, Sales
If it goes up to the CTO
By stage of company
Ability to help them build better products vs build better companies
CDP is very wide. Etl, reverse etl, event stream out, people and cohort syncing between tools
Sprig - feedback and user interview scheduling
Metabase and Snowflake. bI tools
Dbt. Metaplane big eye
Data side
Metabase, snowflake,
Snowflake is shipping a transactional database too
Alerting and threshold
Avo analytics
Feedback tools (Sprig). Much depeer integrations. Viable.fit
CS use case - CRM, support
Zapier, N8N, automation tools
Hosting - heroku, fly.io etc.
ML tools?
ChatGPT
BI tools / data workspace
B2B2C, both hogql layer giving real-time analytics and embedded stuff
Getting to 80% quickly, charging for it, then double down on it when it's working
Development tools
https://files.slack.com/files-tmb/TSS5W8YQZ-F0501L55TFF-16dee448cb/screenshot_2023-03-24_at_11.23.39_720.png
Visualization apps
Marketing - customer.io
Error monitoring
June - really guided dashboards, actions etc.
Google analytics style dashboards
Pocus, CRM, Zendesk, Intercom, Customer.io
Unclear - matrix of devtools,
How does Shopify not seen as competitive with the apps?
