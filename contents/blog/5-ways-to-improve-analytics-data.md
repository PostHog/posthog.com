---
date: 2023-09-0
title: 5 ways to improve your analytics data
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - anna-debenham
featuredImage: ../images/blog/posthog-blog-at-desk.png
featuredImageType: full
category: General
tags:
  - Product analytics
---

> This is a guest post by [Anna Debenham](https://www.linkedin.com/in/anna-debenham/). Anna is a former developer and director of product at [Snyk](https://snyk.io/), the open source cybersecurity company. She is currently an operating partner at [Boldstart](https://boldstart.vc/), a VC firm supporting developer-first, infra, and saas startups. 

Any data scientist will tell you that the worst part of their job is dealing messy and unstructured analytics data. Usually, this is caused by software engineers carelessly logging analytics – without giving a second thought on how the data will be used later. The result is bad data that leads to bad decisions.

In this post, we'll cover the best practices on how to build a scalable analytics foundation that you can trust (and that your data scientist doesn't hate!).

## 1. Implement a naming convention

As your product grows, the amount of analytics data grows with it. Without naming conventions, your data quickly becomes difficult to work with. For example, your frontend developer may name an event `Account created`, while your iOS developer names the same event `create account`, and your android developer calls it `user_sign_up`. And so now you need to remember all these differences when looking at your data! Annoying!

To ensure consistency, we recommend the following convention for event names and properties:

- Only use lowercase letters.

- Use present-tense verbs e.g., "submit" and "create" instead of "submitted" and "created".

- Use snake case i.e., `account_create`

- For event names, use the `Category:object_action` framework:
  - `Category` describes the context the event took place in – e.g., `account_settings` or `signup_flow` 
  - `object` is a noun that refers to the component or location the event took place in, like `forget_password_button` or `pricing_page`.
  - `action` is a verb that describes what happened, like `click`, `submitted`, or `create`
  - Putting all of these together, you get `account_settings:forget_password_button_click` or `signup_flow:pricing_page_view`

- Create a dedicated list of allowed verbs, and don't deviate from it. Here's ours:
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

- For property names:
  - After the descriptor, add a noun that explains the specific aspect of that descriptor. For instance: `user_id`, `item_price`, or `member_count`.
  - Use `is/has` prefixes for boolean properties. For example: `is_subscribed`, `has_seen_upsell`.
  - If the property's value is a date or timestamp, include _date or _timestamp at the end. For example, `user_creation_date`, `last_login_timestamp`.

## 2. Prefer backend to frontend events

Backend analytics are more reliable than frontend analytics. There are two reasons for this:

1. Many users have tracking disabled on their browsers (especially tech-savvy users).
2. Frontend analytics often rely on JavaScript execution, which can be interrupted by various factors – such as network issues, CORS, browser settings and more.

Thus, when possible, you should log events on your server instead of on your client.

That doesn't mean that frontend analytics are completely useless, though. As long as you're aware that they're only showing a segment of your data, they can be still be a useful guide. Just make sure you're validating any business critical metrics against backend events or what's stored in your database! For example, instead of relying on frontend events to see how many users have signed up, rather query your database.

## 3. Deploy a reverse proxy

As mentioned above, tracking blockers can prevent your events from being sent. To make your frontend analytics more reliable, you can capture your events using a reverse proxy.

A reverse proxy enables you to send events to your analytics provider by using your own domain, instead of using your provider's domain. This makes events less likely to be intercepted by tracking blockers.

> **Tip:** If you're using PostHog to capture events, you can read our docs on [how to set up a reverse proxy](https://posthog.com/docs/advanced/proxy).

## 4. Version your events

As your application evolves, so will the events you track. Implementing a versioning system for your events ensures that you can easily distinguish between older events and newer ones, especially when significant changes occur.

For example, if you initially tracked an event as `registration:sign_up_button_click` and 
later revamp your registration flow, you can introduce a new version of this event `registration_v2:sign_up_button_click`. This way, you preserve historical data on the old event while making it easy to compare the impact of the changes you've made.


## 5. Filter out internal users

When developing or testing your own app, your actions skew your data and paint an inaccurate picture of real user activity. Thus it's important to filter out events sent by your own team (although this becomes less important as your userbase grows, since you're less likely to skew your data then).

There are a few ways to do this:

- Filter out internal emails.
- Add a property on your events `is_employee` or `is_test_user` and filter events where these are `true`.
- Exclude internal IPs from your analytics tracking.
- Filter events by domain host e.g., exclude `localhost:3000`, `staging.yourapp.com`.

> **Tip:** For a detailed guide on how to do this, see our tutorial on [how to filter out internal users in PostHog](https://posthog.com/tutorials/filter-internal-users).
