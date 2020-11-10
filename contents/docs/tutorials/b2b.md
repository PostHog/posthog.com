---
title: Tracking Key B2B Product Metrics
sidebar: Docs
showTitle: true
---

<br />

<small class="note-block centered">_Estimated Reading Time: 10 minutes ☕☕☕_</small>

<br />

<span class="larger-image">

![B2B Tutorial Banner Image](../../images/tutorials/banners/b2b.png)

</span>

<br />

While there is some overlap between the analytics processes of B2C and B2B businesses, there are significant differences in the business model that need to be accounted for when tracking key performance metrics.

As such, this tutorial will walk you through how to track usage of your B2B product, going over key metrics and how you can set up your analytics views to reflect them.

### Pre-Requisites

To follow this tutorial along, you need to:

1. Have [deployed PostHog](/docs/deployment).
1. Have started receiving events via our [snippet](/docs/integrations/js-integration), one of our [integrations](/docs/integrations), or our [API](/docs/api/overview)

> **Pro Tip:** To make the most out of this tutorial, we recommend that you have some [actions](/docs/tutorials/actions#sorting-through-your-events-with-actions) set up, as well as have tried sending some [custom events](/docs/tutorials/actions#using-custom-events-to-track-advanced-behaviors). These are explained in detail in our [Complete Guide to Event Tracking](/docs/tutorials/actions). Additionally, it is also beneficial to be familiar with [Cohorts](/docs/tutorials/cohorts).
 

### Determining Product-Market Fit

The first question you should seek an answer to is: _Is my product being used?_

Given that the answer is a _yes_, you should then ask: _Who's using it?_

These questions are essential to determining product-market fit for your business. Essentially, you want to solve a pain point for one or more groups of users, ensuring that you provide a product that strongly meets their use-case. 

To analyze this, let's see how PostHog can help you answer those two questions individually.

#### Is my product being used?

To determine if your product is being used, let's start in 'Trends' (under 'Insights').

By default, this will give you a chart of pageviews over time, which is a reasonable start to understand if your product is being used. However, this chart might include a lot of data that doesn't tell you much about the usage of your product.

This can be the case if you use PostHog to track multiple websites or applications, such as your landing page and your web app. Thus, as a first step, we can set a filter for the 'Current URL' property to focus only on our product pageviews. 

At PostHog, for example, we set a filter for 'Current URL does not contain `https://posthog.com`'. This filters out pageviews from our website so that we can focus on actual product usage.

Next, you might also want to filter your own team out of the data. The best way to do so is by using a [Cohort](/docs/tutorials/cohorts). Your cohort can define who your team is or isn't by matching properties such as `company_name`, `email`, or `team_id`, depending on the logic you use to identify users. Keep in mind that these are [properties that you have to set yourself](/docs/integrations/js-integration#sending-user-information).

Here's what your chart might look like after the aforementioned setup:

![Trends Screenshot](../../images/tutorials/b2b/trends.png)

Depending on your PostHog setup, you might need or want to narrow this view even further. For this, you can set as many filters you like, to ensure you're measuring users that really did use your product. For example, you might want to filter based on a specific URL, or change the event from `$pageview` to a custom action that you set up. You could, for instance, determine that to count an active user, the user needs to use a certain part of your product. As such, you could represent that by a button click or [custom event](/docs/tutorials/actions#using-custom-events-to-track-advanced-behaviors).

#### Who's using my product?

Having established the usage of your product, it is then important to ask yourself who those users are. This is where the 'Break Down By' option comes in. 

Using the breakdown functionality is useful to segment your data into groups of users that share certain relevant characteristics, so you can derive conclusions about what groups of users engage the most with your product.

As a B2B business, an obvious yet valuable segmentation would be a breakdown by the different companies that use your product. To do this, you first need to make sure you are setting a property to identify this on your users. Internally, you might track the different businesses that use your product by a specific ID, by company name, or some other identifier. By passing this internal identifier to PostHog, you will then be able to segment your data by the companies that use your product. 

For example, at PostHog, we use the properties `team_id` and `company_name` to do this. As such, we can create a chart like the following:

![Breakdown Screenshot](../../images/tutorials/b2b/breakdown.png)

Here, we can clearly see the usage of our product by company. This can be useful for a variety of reasons, such as:

- It can help you determine what types of companies use your product the most
- It lets you contact companies that have not been using the product much
- It allows you to determine what companies you have a better chance of converting to a premium plan

Additionally, you can also break down data by any other property you like, as well as by specific cohorts you have set. This lets you compare metrics across marketing campaigns, referral domains, software version, browser, and anything else that is valuable to you. You are also able to compare between features when using [feature flags](/docs/tutorials/feature-flags).

### Your Key Metrics in One Place

Rather than flipping back and forth between tabs, you probably want to have your key metrics in one place, so you can quickly get an overview of how your product is performing. 

What should be in each of your dashboards is entirely up to you, and they could look something like this:

![Demo Dashboard Screenshot](../../images/tutorials/b2b/demo-dashboard.png)

Any chart, table, funnel, and graph from our 'Insights' can be added to a dashboard. To do so, once you are happy with a certain view you created, just click 'Add to Dashboard' on the top-right corner. This will let you select what dashboard you want to add the panel to. 

> **Pro Tip:** We found it very useful to create a dashboard to represent AARRR metrics - Acquisition, Activation, Retention, Referral, and Revenue. You need to determine how to track each of these metrics for your product, but it provides a great overview of performance and is a good first step for setting context-specific KPIs. 

Dashboards can be customized as you wish - you can change the color, size, and name of panels, as well as you can update their content whenever you want. You are also able to pin dashboards that you especially care about to the sidebar, as well as create a shareable link for each dashboard. These links can be used to share dashboards across teams, such as between Sales and Marketing teams within your company.

> **Note:** If you want to learn more about dashboards, check out our [dedicated Dashboards page](/docs/features/dashboards).

### Keep track of new signups

If you want to stay on top of new signups (or any other specific action), you can use webhooks to send messages to platforms like Slack and Microsoft Teams.

> **Note:** To set up webhooks, visit our dedicated documentation pages for [Slack](/docs/integrations/slack) and [Microsoft Teams](/docs/integrations/microsoft-teams)

Once configured in setup, you are able to set custom messages to be sent to you when a certain action is triggered. You can set this on each new action that you create, on the action creation page:

![Demo Dashboard Screenshot](../../images/tutorials/b2b/slack.png)

If you create actions with our [Toolbar](/docs/tutorials/toolbar), you can set this up by clicking on the desired action from the 'Actions' page ('Events' -> 'Actions').

With everything configured, you will start receiving messages like these:

![Slack Message](../../images/slack-message.png)

These messages can help keep your team up-to-date with key user events such as signups without leaving the team's chat platform.

### Rolling out new features by company

B2B businesses can also greatly benefit from using feature flags. 

> **Note:** For an in-depth walkthrough of our Feature Flags functionality, check out the [dedicated tutorial](/docs/tutorials/feature-flags).

If you're unaware, feature flags are a PostHog feature that allows you to safely deploy and roll back new features. It means you can deploy features and then slowly roll them out to your users. If something has gone wrong, you can roll back new features without having to re-deploy your application.

Feature flags make sense especially for B2B businesses because they allow you to roll out features by company, in order to meet the specific use-cases of your clients. For example, a company might need a feature quickly and be willing to be a Beta tester for it, 
while another company might be more conservative and want to always be using a stable version of your product.

As such, you can roll out certain features to some companies first, as well as roll them back easily if there's ever an issue.

You can then see how the new feature impacted your key retention, conversion, and aggregate usage metrics, in order to determine if it should be rolled out to all users or not. 

### Providing metrics for your own users

Depending on your type of product, you may also want to provide usage metrics for your own clients using PostHog. 

If you serve a few large enterprise clients, you can do this via setting up personalized dashboards for each client, which you can share with them as a customized report of their performance. This can be a premium service you provide to top clients, giving them valuable insights as to how your product has impacted their metrics.

However, to do this dynamically, you can also use our [API](/docs/api/overview) to pull relevant data that you then display to your clients as you wish. This is yet to be documented as an established use-case, but our team will be happy to help you set this up if it is something you think would be particularly valuable to you. You can contact us on [Slack](/slack) for more information.

### Conversion and Retention

Finally, two important metrics you should have a grasp of are retention and conversion. If you would like some help setting these up, you can refer to our step-by-step tutorials:

- [Measuring Retention and Tracking Churn](/docs/tutorials/retention)
- [Analyzing Your Conversion with Funnels](/docs/tutorials/funnels)

