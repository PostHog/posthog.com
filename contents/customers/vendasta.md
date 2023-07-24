---
title: How Vendasta replaced Snowplow and cut onboarding drop-off by 50%
customer: Vendasta
logo: ../images/customers/vendasta/logo.svg
logoDark: ../images/customers/vendasta/logo_dark.svg
featuredImage: ../images/customers/vendasta/featured.png
industries:
    - SaaS
users:
    - Product
    - Engineering
toolsUsed:
    - Experimentation
    - Plugins
    - Apps
date: 2022-03-07
---

Since launching in 2008, [Vendasta](https://www.vendasta.com/) has become the world’s leading end-to-end platform for channel partners selling digital solutions to small- and medium-sized businesses. Its 600+ staff now support more than 60,000 channel partners, who use the software to sell to over 5.5 million businesses, franchises, and brands globally.

This rapid growth hasn’t come without some friction however, especially for the Business Intelligence (BI) team who in 2021 became frustrated at the amount of time spent making dashboards using [Snowplow](https://snowplowanalytics.com/)’s behavioral data platform. 

“We had some very talented people who were spending a lot of time just on simple requests, like how many visitors per week,” said Vendasta Staff Developer Dylan Knowles. “It’s not a problem when you have a single team, but when you have 20 product teams? It doesn’t scale well.”

Recognizing the need for a self-serve solution, Kedar Page, a Data Scientist at Vendasta, pushed to move off Snowplow and find an analytics platform which was more suitable for Vendasta’s scale.

“PMs, designers and strategists wanted insights at their fingertips, but it invariably required an analyst and the turnaround time wasn’t quick enough to facilitate data driven decision making,” explained Kedar. “So, I started exploring tools that would enable non-analysts to get the information they needed.”

“We tried [Mixpanel](/customers/why-i-ditched-mixpanel-for-posthog) and Segment, but you’re totally bound by how they’ve set up the ETL pipeline,” added Vendasta Staff Engineer Jesse Redl. “Our senior engineering team didn’t like the [GDPR compliance](/blog/best-gdpr-compliant-analytics-tools) aspect either because you don’t own your own data. They say you do, but you don’t really. That’s when we decided to deploy PostHog.”

## Cutting onboarding drop-off by 50% with a self-serve solution

“I’m always trying to find the next [experiment](/docs/user-guides/experimentation) to run with PostHog,” says Product Manager Taric Santos de Andrade, who leads the product team responsible for Vendasta’s growth metrics. “I use it to check user behaviors and share reports everyday, but I’m also always looking to push boundaries or test new hypotheses.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/taric.jpg"
    size="md"
    name="Taric Santos de Andrade"
    title="Product Manager, Vendasta "
    quote={`“I use PostHog on a daily basis. My team has four engineers, as well as designers, and we need to collaborate closely across areas of the product we own, such as our onboarding flow.”`}
/>
</BorderWrapper>

One example of a recent experiment is in Vendasta’s account creation process, where analysis revealed one step where users can provide optional information correlated to drop-off later down the funnel. So, Vendasta is experimenting with removing the option to skip this step so users provide information which results in the best experience later. 

“I made my own [dashboards](/docs/user-guides/dashboards) to share with my team so everyone can track the results,” said Taric. “We had a drop-off of around 60% before, but this experiment cuts that in half to a 30% drop-off — a 50% improvement without a single user complaining!”

## Replacing Snowplow with an open-source ETL app

With a self-serve solution in place to deliver on the needs of the rest of the organization, Vendasta’s Business Intelligence team is freed to focus on higher-level problems and queries. Meanwhile, the Engineering team has been able to thoroughly embed PostHog into its tech stack in a way no closed-source tool could match. 

"A lot of our backend is in Golang," explains Staff Developer Jesse Redl. "Before, we were using Snowplow Insights, which gave us access to an ETL pipeline that's largely backed by [Google Cloud Dataflow and Pub/Sub](/apps/google-pub-sub-connector)."

"Now, thanks to [the open source app system](/integrations), we've written our own Pub/Sub app where each event is published to Google Cloud Pub/Sub as it's processed, enabling us to hook into events. PostHog has replaced Snowplow — and, because it's open source, we've released that app to PostHog's library too."

“This open-source aspect is going to be interesting as our organization continues to evolve and grow. We’re not a start-up anymore. We’re becoming more data driven in the decisions we make…and PostHog has been a natural fit for that.”
