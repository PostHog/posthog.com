---
date: 2023-09-06
title: 5 ways to improve your analytics data
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - anna-debenham
featuredImage: ../images/blog/super-hog-pink.png
featuredImageType: full
category: General
tags:
  - Product analytics
---

> This is a guest post by [Anna Debenham](https://www.linkedin.com/in/anna-debenham/). Anna is a former developer and director of product at cybersecurity company [Snyk](https://snyk.io/). She is currently an operating partner at [boldstart](https://boldstart.vc/), a VC firm supporting developer-first, infra, and SaaS startups. 

Any data scientist will tell you the worst part of their job is dealing with messy and unstructured analytics data. This is often due to software engineers capturing analytics without knowing how the data will be used by someone else. The result is data that hard to work with, or that teams don't trust.

In this post, I'll cover some basics on how to build a solid and scalable analytics foundation you can trust (and your data scientist won't hate).

## 1. Implement a naming convention

As your product grows, the amount of analytics data grows with it. Without naming conventions, your data quickly becomes difficult to work with. 

For example, let's say you're capturing signup metrics. Your team might capture events differently and with multiple names: 

- Web developer: Captures `Create Account` when a user clicks a button to begin signing up.
- iOS developer: Captures the same event but names it `user_sign_up`.
- Android developer: Calls it `create account` but this is only captured when they have finished signing up.

Now you have 3 names for the same thing that you'll need to combine, and it's unclear exactly what action triggered that event – whether a user clicked a particular button on the sign up page, or whether their account was created by the system because another user invited them. Using a naming convention prevents these problems. 

### Suggested naming guide

- Only use lowercase letters.

- Use present-tense verbs, e.g., "submit" and "create" instead of "submitted" and "created".

- Use snake case, i.e., `signup_button_click`

- Create a dedicated list of allowed verbs, and don't deviate from it. Here's a list of the most common ones you're likely to use:
  ```
  - click
  - submit
  - create
  - view
  - add
  - invite
  - update
  - delete
  - remove
  - start
  - end
  - cancel
  - fail
  - generate
  - send
  ```

- For event names, use the `category:object_action` framework:
  - `category` describes the context the event took place in – e.g., `account_settings` or `signup_flow` 
  - `object` is a noun that refers to the component or location the event took place in, like `forget_password_button` or `pricing_page`.
  - `action` is a verb that describes what happened, like `click`, `submitted`, or `create`
  - Putting all of these together, you get `account_settings:forget_password_button_click` or `signup_flow:pricing_page_view` – The order is important as it makes it easier to find a specific event within a long list.
- For property names:
  - Use the `object_adjective` pattern. For instance: `user_id`, `item_price`, or `member_count`.
  - Use `is/has` prefixes for boolean properties. For example: `is_subscribed`, `has_seen_upsell`.
  - If the property's value is a date or timestamp, include _date or _timestamp at the end. For example, `user_creation_date`, `last_login_timestamp`.

> **Tip:** If you're tracking any events that are triggered by the system and not a user, such as automatically importing something on a regular basis, ensure you're marking these in a way that you can filter out later so they don't skew your active user metrics.

## 2. Filter out internal users

A common mistake I see is developers inadvertently inflating their own metrics by not filtering out their own usage. This can lead to massive bias in data, particularly for startups where usage may be low.

For this reason, it's important to filter out events sent by your own team. There are a few ways to do this:

- Filter out events from users signed up with internal emails.
- Add a property on your events `is_employee` or `is_test_user` and filter events where these are `true`.
- Exclude internal IPs from your analytics tracking.
- Filter events by domain host e.g., exclude `localhost:3000`, `staging.yourapp.com`.
- Turn off tracking in development using a `localhost`, `dev`, or config check.

> **Tip:** Rather than add these filters to each new [insight](/docs/product-analytics/insights) you create, set it as your default filter.
> 
> For a detailed guide on how to do this in PostHog, see the tutorial on [how to filter out internal users in PostHog](/tutorials/filter-internal-users).

## 3. Prefer backend to frontend tracking

Depending on the type of data you need, you might want to query your backend analytics rather than your frontend analytics. Backend analytics can be more reliable for the following reasons:

1. Many users have tracking disabled or blocked on their browsers (especially tech-savvy users), so not all frontend events will be captured.
2. Frontend analytics often rely on JavaScript execution, which can be interrupted by various factors – such as network issues, CORS, browser settings, and more.
3. You have complete control of your backend implementation and execution.

Where possible, it's a good idea to log events on your server instead of on your client. Here's a guide to help you decide when to rely on frontend or backend analytics:

- Use frontend analytics where getting partial data is acceptable, and you want to:
  - Understand user journeys, such as the sequence of pages a user visits.
  - Track user interactions like clicks, scrolls, or form submissions.
  - Gather data on client-side performance, like page load times and responsiveness.
- Use backend analytics (or query your database) if:
  - You need accurate data – e.g., the number of users that signed up in the last week.
  - You want to analyze data alongside other business metrics.

## 4. Deploy a reverse proxy

As mentioned above, tracking blockers can prevent your events from being sent. To make your frontend analytics more reliable, you can capture your events using a reverse proxy.

A reverse proxy enables you to send events to your analytics provider through your domain instead of your provider's. This makes events less likely to be intercepted by tracking blockers.

> **Tip:** If you're using PostHog to capture events, here's how you can [set up a reverse proxy](/docs/advanced/proxy).

## 5. Version your events

As your application evolves, so should the events you track. Implementing a versioning system for events ensures you can easily distinguish between older and newer events, especially when significant changes occur.

For example, if you initially tracked an event as `registration:sign_up_button_click` and later revamped your registration flow, you can introduce a new version of this event `registration_v2:sign_up_button_click`. This way, you preserve historical data on the old event while making it easy to compare the impact of your new changes.

## Maintain your foundations

I hope this guide will help you get the most out of the data, make it more trustworthy, and also make it easier for more members of your team to work with. Make sure you're reviewing your data regularly, clearing out anything you don't need, and making sure you're filtering out anything that could bias your metrics. While it can be hard to find the time, you're spending it wisely if you're investing in building some solid data foundations that help you get the most out of your data so you can make smarter business decisions.