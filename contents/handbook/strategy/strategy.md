---
title: Strategy overview
sidebar: Handbook
showTitle: true
---

## TL;DR
Our mission is to “Increase the number of successful products in the world”.

We started by building an open-source product analytics platform with all the basic things you'd need to understand user behavior - funnels, trends, session recording, feature flags and many more features. Within a year we had thousands of customers using us and we started generating revenue.

We focused on our paid product earlier this year. We quickly hit a milestone for the first 5 reference customers, and we've kept selling since. The next step on our journey is to figure out how to accelerate our top of funnel growth, whilst achieving larger order values from our Enterprise product.

## Context

We’ve grown a lot (10s of thousands of sign ups), but it’s clear that the many of our users use us *despite* a bad experience - complex deployment and maintenance, in particular. This is a great problem to have. It means we’re solving a hair on fire problem - product analytics that you can self host.

For any company, nothing matters more than product market fit. If we get that right, it’ll be much easier for customer success, marketing or sales teams to succeed.

## Mission

**_“Increase the number of successful products in the world”_**

## Long-term vision (for 2026)

**Where do we want to get to?**

In 2026 we will **IPO with $100M ARR.** To achieve this, Posthog will need to be **the standard devtool for building better products**

**How do we get there?**

* **Unlock unserved segments:** Build for customers that can’t use cloud offerings because of data control or scale
* **Grow our community:** Build a strong and successful developer community around Posthog
* **Convert customers:** Convert our biggest users to paying customers
* **Go broad:** Build all the tools our customers need to build better products
* **Build partnerships:** Partner with others to build plugins and deploy our tools
* **Ride the privacy wave:** Ride the wave of data control triggered by growing in privacy regulation


### What should we be working on today?

**The mechanics of success**

Revenue is critical for us to IPO** **but we won't set short-term revenue targets. We focus on [metrics within our control that contribute more to our revenue in the long-term.](https://app.posthog.com/dashboard/20464)

* **[Quality signups](https://app.posthog.com/insights/ujGv0WqI?events=%5B%5D&actions=%5B%7B%22id%22%3A%2212308%22%2C%22math%22%3A%22dau%22%2C%22name%22%3A%22High%20quality%20sign%20ups%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A0%7D%5D&display=ActionsLineGraph&insight=TRENDS&interval=week&date_from=-90d&new_entity=%5B%5D&properties=%5B%7B%22key%22%3A%22is_organization_first_user%22%2C%22type%22%3A%22event%22%2C%22value%22%3A%5B%22true%22%5D%2C%22operator%22%3A%22exact%22%7D%2C%7B%22key%22%3A%22hubspot_score%22%2C%22type%22%3A%22person%22%2C%22value%22%3A%2270%22%2C%22operator%22%3A%22gt%22%7D%5D&breakdown_type&filter_test_accounts=true#fromDashboard=20464):** Volume of quality organizations signing up 
* **[Conversion to paid](https://app.posthog.com/insights/M5KDFdvX?events=%5B%5D&actions=%5B%7B%22id%22%3A%2212308%22%2C%22name%22%3A%22High%20quality%20sign%20ups%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A0%2C%22properties%22%3A%5B%7B%22key%22%3A%22is_organization_first_user%22%2C%22type%22%3A%22event%22%2C%22value%22%3A%5B%22true%22%5D%2C%22operator%22%3A%22exact%22%7D%2C%7B%22key%22%3A%22realm%22%2C%22type%22%3A%22event%22%2C%22value%22%3A%5B%22cloud%22%5D%2C%22operator%22%3A%22exact%22%7D%5D%7D%2C%7B%22id%22%3A%2212299%22%2C%22name%22%3A%22User%20paid%20on%20cloud%20or%20self%20hosted%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A1%7D%5D&display=FunnelViz&insight=FUNNELS&interval=week&date_from=-30d&exclusions=%5B%5D&properties=%5B%5D&funnel_to_step=1&funnel_viz_type=trends&funnel_from_step=0&filter_test_accounts=true&funnel_window_interval=12&funnel_window_interval_unit=month#fromDashboard=20464):** Rate at which quality sign-ups become paid customers
* **Ease of deployment (TBD):** Effort required to deploy and maintain a Posthog instance at scale
    * Contributing Metrics: Customer sentiment (TBD), time spent on maintenance (TBD) and [scale of instances](https://app.posthog.com/insights/x8T5a1J4?insight=TRENDS&interval=day&actions=%5B%5D&events=%5B%7B%22id%22%3A%22instance%20status%20report%22%2C%22name%22%3A%22instance%20status%20report%22%2C%22type%22%3A%22events%22%2C%22order%22%3A0%2C%22properties%22%3A%5B%7B%22key%22%3A%22events_count_total%22%2C%22value%22%3A%22100000000%22%2C%22operator%22%3A%22gt%22%2C%22type%22%3A%22group%22%2C%22group_type_index%22%3A1%7D%5D%2C%22math%22%3A%22unique_group%22%2C%22math_group_type_index%22%3A1%7D%5D&properties=%5B%5D&filter_test_accounts=false&new_entity=%5B%5D&display=ActionsBarValue&date_from=-90d)
* **[Discoveries](https://app.posthog.com/insights/O4R-Frza?events=%5B%5D&actions=%5B%7B%22id%22%3A%2210784%22%2C%22math%22%3A%22total%22%2C%22name%22%3A%22Discoveries%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A0%7D%5D&display=ActionsLineGraph&insight=TRENDS&interval=week&date_from=-90d&new_entity=%5B%5D&properties=%5B%5D&breakdown_type&filter_test_accounts=true#fromDashboard=20464):** The volume of meaningful insights discovered using Posthog
    * Contributing Metrics: [Insight viewed](https://app.posthog.com/insights/rK1gVlAi/edit?insight=TRENDS&display=ActionsLineGraph&actions=%5B%5D&events=%5B%7B%22id%22%3A%22insight%20viewed%22%2C%22name%22%3A%22insight%20viewed%22%2C%22type%22%3A%22events%22%2C%22order%22%3A0%7D%5D&properties=%5B%5D&filter_test_accounts=false&new_entity=%5B%5D&interval=week&date_from=-90d), insights shared (TBD), [products used across users](https://app.posthog.com/insights/7lCZsIPO?events=%5B%7B%22id%22%3A%22insight%20loaded%22%2C%22math%22%3A%22unique_group%22%2C%22name%22%3A%22insight%20loaded%22%2C%22type%22%3A%22events%22%2C%22order%22%3A0%2C%22math_group_type_index%22%3A0%7D%5D&actions=%5B%7B%22id%22%3A%224959%22%2C%22name%22%3A%22KFA%20-%20Feature%20flags%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A1%7D%2C%7B%22id%22%3A%223091%22%2C%22name%22%3A%22KFA%20-%20Session%20recordings%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A2%7D%2C%7B%22id%22%3A%226868%22%2C%22name%22%3A%22Tried%20Plugins%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A3%7D%5D&display=FunnelViz&insight=FUNNELS&interval=day&date_from=-90d&exclusions=%5B%5D&properties=%5B%5D&funnel_to_step=3&funnel_viz_type=steps&funnel_from_step=0&funnel_order_type=unordered&filter_test_accounts=true&funnel_window_interval=12&funnel_window_interval_unit=month#fromDashboard=20464), [avg active users per organization](https://app.posthog.com/insights/09GUvJKq/edit?insight=TRENDS&display=ActionsLineGraph&actions=%5B%7B%22id%22%3A%225043%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A1%2C%22name%22%3A%22App%20Pageview%20-%20Logged%20in%22%2C%22math%22%3A%22dau%22%7D%5D&events=%5B%7B%22id%22%3A%22%24pageview%22%2C%22name%22%3A%22%24pageview%22%2C%22type%22%3A%22events%22%2C%22order%22%3A0%2C%22math%22%3A%22unique_group%22%2C%22math_group_type_index%22%3A0%7D%5D&properties=%5B%5D&filter_test_accounts=false&new_entity=%5B%5D&formula=B%2FA&interval=week&date_from=-90d), [rate from insight viewed to analyzed](https://app.posthog.com/insights/2PnHWW87?insight=TRENDS&display=ActionsLineGraph&actions=%5B%5D&events=%5B%7B%22id%22%3A%22insight%20viewed%22%2C%22name%22%3A%22insight%20viewed%22%2C%22type%22%3A%22events%22%2C%22order%22%3A0%7D%2C%7B%22id%22%3A%22insight%20analyzed%22%2C%22type%22%3A%22events%22%2C%22order%22%3A1%2C%22name%22%3A%22insight%20analyzed%22%7D%5D&properties=%5B%5D&filter_test_accounts=false&new_entity=%5B%5D&formula=B%2FA&interval=week&date_from=-90d)


### How should we prioritize between competing directions?

While there is value in the items on the right, we value the items on the left more

**Breadth vs depth of capabilities**

* **Breadth:** Build basic versions of every feature needed rather than a small set of sophisticated ones, so our customers can consolidate

**High Quality Users vs High paying businesses**

* **High Quality Users:** Focus on acquiring more high quality users over big ticket contracts to get better feedback and learn faster

**Plugin based platform vs one-stop-shop**

* **Plugin based:** To move faster, look for ways to integrate with the best tools to solve customer problems over building every feature ourselves

**Self-hosted vs Cloud**

* **Self-hosted:** Focus on customers who need to self-host, there’s a huge untapped market and we’re uniquely placed to win

**Reject the [“modern data stack”](https://www.analytics8.com/blog/what-is-the-modern-data-stack-and-why-should-you-be-excited-about-it/) vs adapt to it**

* **Reject:** We have a single product for ingesting, storing and analyzing data, we create more value by making this easy to self-host than by being a small part of a cloud stack

## Target audience (for 2021)

Our customers are a combination of users, businesses and the products themselves. In order to understand where we should focus our efforts, below is a proposed breakdown of our target audience based on attributes of a product. 

* Needs
  * Need to control their user data
  * Need to excel at product led 
* Haves
  * Have budget and savvy engineers are the decision makers
  * Have achieved product market fit
  * Have a central analytics function
  * Have deployed our open source product successfully
