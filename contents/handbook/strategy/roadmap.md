---
title: Roadmap
sidebar: Handbook
showTitle: true
---

Our mission is to 

> "Increase the number of successful products in the world."

Our vision for 2023 is:

> “Everyone building a product has a clear path to making it successful without losing control of their data.”

Our roadmap for the rest of 2021 will do three things:
1. Collaboration
2. Easy to deploy, maintain, and extend
3. Experimentation

## 1. Collaboration

As larger teams and more complex organizations grow on PostHog, they need to work together to share insights and make decisions. Our focus on collaboration is key, not only to improve the quality and quantity of insights every user gets from PostHog, but also to ensure that users of PostHog get access to **only** the sensitive data which they **need** to access, ensuring user privacy.

Collaboration is also key to ensure all team members (including those less-technical) can access, interpret, and share insights about their product.

## 2. Easy to deploy, scale, and extend

We now offer ClickHouse to everyone as a way to super-scale your PostHog deployment - and unlock a ton of new more complex analytics capabilities (e.g. breakdowns in funnels). We intend to continue to focus on making PostHog easier to deploy and maintain for everyone hosting themselves. 

We are continually investing in performance an reliability to ensure that PostHog can scale further and further without diminishing performance for our users.

We see a ton of usecases, like integrating PostHog into an existing data warehouse, pulling in stats from other APIs, and pushing data into other services.

There will be work on three main fronts:
- Building plugins ourselves
- Giving our community the tools to create their own
- Promote adoption of these plugins

## 3. Experimentation

In order to validate the impact of any change you make, its key to be able to measure the effects on the metrics you care about. We intend aim to provide the foundational tools you need to run an A/B or multi-variate test and get a feel for how confident you can be about the results being positive or negative, without overcomplicating the experience with lots of raw and complex statistical analysis techniques.

Status: we provide simple A/B and multi-variate testing today.
