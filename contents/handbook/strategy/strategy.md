---
title: Strategy overview
sidebar: Handbook
showTitle: true
---

## TL;DR
Our mission is to increase the number of successful products in the world.

We started by building an open-source product analytics platform with all the basic things you'd need to understand user behavior - funnels, trends, session recording, feature flags, and many more features. Within a year, we had thousands of customers using us and we started generating revenue.

We focused on our paid product earlier in 2021. We quickly hit a milestone for the first 5 reference customers and we've kept selling since. The next step on our journey is to figure out how to accelerate our top of funnel growth, while achieving larger order values from our Enterprise product.

## Context

We’ve grown a lot - tens of thousands of sign ups - but it’s clear that the many of our users use us *despite* a bad experience, with complex deployment and maintenance a particular issue. This is a great problem to have, as it means we’re solving a hair-on-fire problem - product analytics that you can self-host.

For any company, nothing matters more than product market fit. If we get that right, it’ll be much easier for customer success, marketing or sales teams to succeed.

## Mission

**_“Increase the number of successful products in the world”_**

## Long-term vision (for 2026)

**Where do we want to get to?**

In 2026 we will _go public with $100M ARR._ To achieve this, Posthog will need to be _the standard devtool for building better products._

**How do we get there?**

* Build for unserved customers that can’t use cloud offerings because of data control or scale
* Grow a strong and successful developer community around Posthog
* Convert our biggest users to paying customers
* Go broad and develop all the tools our customers need to build better products
* Partner with others to build plugins and deploy our tools
* Ride the industry wave of increasing data control that has been triggered by growing privacy regulation


### What should we be working on today?

**The mechanics of success**

Revenue is critical for us to go public _but we won't set short-term revenue targets_ as revenue is an output metric to several other inputs. Instead, we think it is more appropriate to focus on [metrics within our control that contribute more to our revenue in the long-term.](https://app.posthog.com/dashboard/20464)

* **[Quality signups](https://app.posthog.com/insights/ujGv0WqI?events=%5B%5D&actions=%5B%7B%22id%22%3A%2212308%22%2C%22math%22%3A%22dau%22%2C%22name%22%3A%22High%20quality%20sign%20ups%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A0%7D%5D&display=ActionsLineGraph&insight=TRENDS&interval=week&date_from=-90d&new_entity=%5B%5D&properties=%5B%7B%22key%22%3A%22is_organization_first_user%22%2C%22type%22%3A%22event%22%2C%22value%22%3A%5B%22true%22%5D%2C%22operator%22%3A%22exact%22%7D%2C%7B%22key%22%3A%22hubspot_score%22%2C%22type%22%3A%22person%22%2C%22value%22%3A%2270%22%2C%22operator%22%3A%22gt%22%7D%5D&breakdown_type&filter_test_accounts=true#fromDashboard=20464):** Volume of quality organizations signing up 
* **[Conversion to paid](https://app.posthog.com/insights/M5KDFdvX?events=%5B%5D&actions=%5B%7B%22id%22%3A%2212308%22%2C%22name%22%3A%22High%20quality%20sign%20ups%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A0%2C%22properties%22%3A%5B%7B%22key%22%3A%22is_organization_first_user%22%2C%22type%22%3A%22event%22%2C%22value%22%3A%5B%22true%22%5D%2C%22operator%22%3A%22exact%22%7D%2C%7B%22key%22%3A%22realm%22%2C%22type%22%3A%22event%22%2C%22value%22%3A%5B%22cloud%22%5D%2C%22operator%22%3A%22exact%22%7D%5D%7D%2C%7B%22id%22%3A%2212299%22%2C%22name%22%3A%22User%20paid%20on%20cloud%20or%20self%20hosted%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A1%7D%5D&display=FunnelViz&insight=FUNNELS&interval=week&date_from=-30d&exclusions=%5B%5D&properties=%5B%5D&funnel_to_step=1&funnel_viz_type=trends&funnel_from_step=0&filter_test_accounts=true&funnel_window_interval=12&funnel_window_interval_unit=month#fromDashboard=20464):** Rate at which quality sign-ups become paid customers
* **Ease of deployment (TBD):** Effort required to deploy and maintain a Posthog instance at scale
    * Contributing Metrics: Customer sentiment (TBD), time spent on maintenance (TBD) and [scale of instances](https://app.posthog.com/insights/x8T5a1J4?insight=TRENDS&interval=day&actions=%5B%5D&events=%5B%7B%22id%22%3A%22instance%20status%20report%22%2C%22name%22%3A%22instance%20status%20report%22%2C%22type%22%3A%22events%22%2C%22order%22%3A0%2C%22properties%22%3A%5B%7B%22key%22%3A%22events_count_total%22%2C%22value%22%3A%22100000000%22%2C%22operator%22%3A%22gt%22%2C%22type%22%3A%22group%22%2C%22group_type_index%22%3A1%7D%5D%2C%22math%22%3A%22unique_group%22%2C%22math_group_type_index%22%3A1%7D%5D&properties=%5B%5D&filter_test_accounts=false&new_entity=%5B%5D&display=ActionsBarValue&date_from=-90d)
* **[Discoveries](/handbook/product/metrics#what-is-a-discovery):** Can be tracked in [this dashboard](https://app.posthog.com/dashboard/14719). The volume of meaningful insights discovered using Posthog.
    * Contributing Metrics: [Insight viewed](https://app.posthog.com/insights/rK1gVlAi/edit?insight=TRENDS&display=ActionsLineGraph&actions=%5B%5D&events=%5B%7B%22id%22%3A%22insight%20viewed%22%2C%22name%22%3A%22insight%20viewed%22%2C%22type%22%3A%22events%22%2C%22order%22%3A0%7D%5D&properties=%5B%5D&filter_test_accounts=false&new_entity=%5B%5D&interval=week&date_from=-90d), insights shared (TBD), [products used across users](https://app.posthog.com/insights/7lCZsIPO?events=%5B%7B%22id%22%3A%22insight%20loaded%22%2C%22math%22%3A%22unique_group%22%2C%22name%22%3A%22insight%20loaded%22%2C%22type%22%3A%22events%22%2C%22order%22%3A0%2C%22math_group_type_index%22%3A0%7D%5D&actions=%5B%7B%22id%22%3A%224959%22%2C%22name%22%3A%22KFA%20-%20Feature%20flags%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A1%7D%2C%7B%22id%22%3A%223091%22%2C%22name%22%3A%22KFA%20-%20Session%20recordings%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A2%7D%2C%7B%22id%22%3A%226868%22%2C%22name%22%3A%22Tried%20Plugins%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A3%7D%5D&display=FunnelViz&insight=FUNNELS&interval=day&date_from=-90d&exclusions=%5B%5D&properties=%5B%5D&funnel_to_step=3&funnel_viz_type=steps&funnel_from_step=0&funnel_order_type=unordered&filter_test_accounts=true&funnel_window_interval=12&funnel_window_interval_unit=month#fromDashboard=20464), [avg active users per organization](https://app.posthog.com/insights/09GUvJKq/edit?insight=TRENDS&display=ActionsLineGraph&actions=%5B%7B%22id%22%3A%225043%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A1%2C%22name%22%3A%22App%20Pageview%20-%20Logged%20in%22%2C%22math%22%3A%22dau%22%7D%5D&events=%5B%7B%22id%22%3A%22%24pageview%22%2C%22name%22%3A%22%24pageview%22%2C%22type%22%3A%22events%22%2C%22order%22%3A0%2C%22math%22%3A%22unique_group%22%2C%22math_group_type_index%22%3A0%7D%5D&properties=%5B%5D&filter_test_accounts=false&new_entity=%5B%5D&formula=B%2FA&interval=week&date_from=-90d), [rate from insight viewed to analyzed](https://app.posthog.com/insights/2PnHWW87?insight=TRENDS&display=ActionsLineGraph&actions=%5B%5D&events=%5B%7B%22id%22%3A%22insight%20viewed%22%2C%22name%22%3A%22insight%20viewed%22%2C%22type%22%3A%22events%22%2C%22order%22%3A0%7D%2C%7B%22id%22%3A%22insight%20analyzed%22%2C%22type%22%3A%22events%22%2C%22order%22%3A1%2C%22name%22%3A%22insight%20analyzed%22%7D%5D&properties=%5B%5D&filter_test_accounts=false&new_entity=%5B%5D&formula=B%2FA&interval=week&date_from=-90d)

We discuss how we track against our high-level metrics once a week during PostHog news. 

### How should we prioritize between competing directions?

While there is value in the items on the right, we value the items on the left more.

**Breadth vs. depth of capabilities**

* _Breadth_: build basic versions of every feature needed rather than a small set of sophisticated ones, so our customers can consolidate.

**High quality users vs. high paying businesses**

* _High quality users_: focus on acquiring more high quality users over big ticket contracts, so we can get better feedback and learn faster.

**Plugin-based platform vs one-stop-shop**

* _Plugin-based platform_: integrate with the best services and data sources to solve customer problems faster

**Self-hosted vs. Cloud**

* _Self-hosted_: focus on customers who need to self-host, as there is a huge untapped market and we’re uniquely placed to win.

**Reject the [“modern data stack”](https://www.analytics8.com/blog/what-is-the-modern-data-stack-and-why-should-you-be-excited-about-it/) vs. adapt to it**

* _Reject_: We enable our customers to ingest, store and analyze data on their infrastructure, we don't believe sending sensitive data to multiple cloud providers the right approach

## Direction for 2022

 * 2 word summary: **Nail Enterprise**
    * **Customers**
        * **Focus on Enterprise.** E.g. Large initial contracts (~$200k/year+) and smaller deals in organizations that will eventually become very large. 
        * **Non Goal:** Start doing outbound sales
    * **Product**
        * **Goals:**
            * **Quality:** Our core features (insights, recordings, feature-flags / experimentation) work like a Swiss watch
            * **Extensibility:** You can instantly connect PostHog to any other system 
            * **Deployments:** PostHog is the easiest self-hosted product to deploy and scale in the world
        * **Non Goals:**
            * Build lots of new low quality / partial features
            * Build everything a single enterprise customer wants just to close a deal

## Target customers for 2022

Our ideal customer is an Enterprise who meets as many of these these criteria as possible:

* _Needs_
  * Need to control their user data
  * Need to excel at product led growth
* _Haves_
  * Have budget and savvy engineers are the decision makers
  * Have a central analytics or devops function
  * Have deployed our open source product successfully
