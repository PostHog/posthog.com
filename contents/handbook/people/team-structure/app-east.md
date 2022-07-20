---
title: Team App East
sidebar: Handbook
showTitle: true
hideAnchor: true
---

## People

- Marius Andra (Team lead)
- Ben White (Full Stack Engineer)
- Emanuele Capparelli (Growth Engineer)
- Michael Matloka (Full Stack Engineer)
- Paul D'Ambra (Full Stack Engineer)

## Mission

Makers everywhere get better at building products because of PostHog

## Q3 2022 Goals

### Objective 1

Make it **easy to build** new features quickly that fit in with our design system.

* **Key Results:**
  * 50% reduction in custom and inline CSS styles. Exact metric TBD.
* **Rationale:**
  * PostHog engineers are slowed down with our legacy frontend practices.
* **Status:**
  * [RFC](https://github.com/PostHog/meta/pull/58) out for design systems.
  * Meeting planned 2022-07-20 to plan the work.
  * Rough ideas to pursue are outlined in [this shared document](https://docs.google.com/document/d/12vqTSOgkj5bxAH6tx67uWrYrPfvn7xVzmzCQnbT9pwY). Some of them are:
    * Create a light process for requesting component updates, creating new components, deprecating old components.
    * Identify a core list of components that are used most or that are the least consistent right now. Focus on standardizing those. Forms come to mind.
    * Build reusable components for filtering events (e.g. UI from cohorts that can be used to find events / recordings)
    * Payback tech debt with current custom CSS to make it easier for teams to build on top of existing features
    * Remove antd as a direct dependency of posthog (keep it in lemon-ui)
    * Introduce tailwind or similar to reduce css class noise
    * Introduce visual regression tests in Storybook
    * Interconnect figma and storybook such that each mirrors each other. It should be easy to find the corresponding figma link from storybook and vice versa.
    * Standardize load times

### Objective 2

* **Key Results:**
  * Increase in [retention](https://app.posthog.com/insights/bj3-djOy): week 4 retention from the previous week goes from 21.5% to 30%.
* **Rationale:**
  * To nail self-serve we need every new organization that signs up to have a smooth and easy experience, from ingesting their first event to understanding how to use product analytics to inviting their team to share insights
* **Status:**
  * We identified __4 product areas__ to improve. These are shared below, and with raw notes in [a shared document](https://docs.google.com/document/d/12vqTSOgkj5bxAH6tx67uWrYrPfvn7xVzmzCQnbT9pwY).
  * Work on scoping them further will begin a sprint after the design system work starts.
* **Product Areas:**
    1. **Visualizations**
       * Improve breadth of visualization options (i.e. include stacked area graphs)
         * Why? People are exporting data from PostHog to analyze in excel today they would easily churn from PostHog and rely entirely on other tools if we cannot offer them the visualizations they need 
       * Improve the querying experience for Insights 
         * Why? We have experimented a number of times with different configuration panels but none have been quite right, ship a new experience that makes querying easier to help new users keep coming back
    2. **Notifications**
        * Centralized alerting for actionable notifications 
          * Why? Users expect to receive timely feedback of asynchronous and long running actions. Our system of bespoke emails and popup notifications will not scale to meet the multitude of new notification types. 
        * Better notifications
          * Some ideas what we can build with a centralised system:
            * Receive results as soon as an experiment is significant 
            * Set threshold on insights and notify if it’s crossed 
            * Send notification for new recordings including a certain event 
            * Introduce subscriptions to correlations 
            * If something correlates really well with a key metric, notify me 
            * Allow all of the above via email, slack, or webhook 
            * Horizontal goal annotations with notifications as you move towards or away
    3. **Onboarding**
        * Improve first time user experience 
          * Why? Some people don’t retain because they don’t fully understand how to use the product, they play around but haven’t truly activated, ensuring users can perform multiple meaningful discoveries will lead to more retained users 
        * Remind people who’ve forgotten about PostHog to come back via email 
          * Why? Some people like PostHog but have been moved to a different project for a few weeks and may forget about it, bringing them back will increase attention
    4. **Upselling**
        * Make the experience of upgrading to paid seamless and consistent 
          * Why? Customers using our paid features have a very high retention rate, if we can get more customers subscribed to paid features this will increase our overall retention rate




## Roadmap

### 3 year goals
* You can explore data across all insights and dimensions
* You can trivially share any insight anywhere
* Onboarding is as easy as a video game
* Tight integration with developer workflows
* No more complex than it is today
* Using PostHog sparks joy
* We support trillion event querying

## Feature ownership
You can find out more about the features we own [here](/handbook/engineering/feature-ownership)
