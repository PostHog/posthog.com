---
title: Roadmap
sidebar: Handbook
showTitle: true
---

## Themes

### 1 - Parity (current phase)

> Create something that helps product teams do their jobs, that developers actually want to implement.

The objective of this phase is to meet the product team's typical use cases of product analytics tools, in a way that developers can easily implement.

Whilst we have most of the major features needed, we need to focus on scalability to get a greater amount of B2C / enterprise adoption.

### 2 - Developer specific features

> Enable developers to understand the impact of their work.

#### Feature flags

Integrate with git repos so developers can assess the impact of each Pull Request or feature they build. This will turn us from a "parity" tool to best in class.

* Developers understand the impact of each pull request (/ feature) on metrics.
* Multiple developers can run experiments simultaneously.
* Helps task-focussed developers to focus on getting the company's metrics to improve.

#### Local environment

Developers usually use an IDE and have a browser open locally whilst they code. We want a very easy way for developers to access usage stats as they work.

* Hovering over elements on the localhost page quickly displays usage info.

#### Analytics metadata

Developers often have to write complex SQL to create exports of certain user groups. PostHog already provides the ability to create analytics metadata through the front end, such as cohorts of users.

Making this data very accessible through API, and by promoting it in the docs, will allow developers to use this data in other tools internally.

## Strategy

### Open core business model

We aim for every company that builds software to be using PostHog.

* The open source platform is designed to be installed by a developer when they start a new project, before a product team is in place. There is no competition at this stage.
* The open source platform is also well suited to adoption in an existing startup, midmarket or enterprise customer as it has no information security and no vendor risk management requirements. We are much lower friction.
* Providing self-hosted capabilities means we have complete flexibility over how we charge customers. This means we can align with higher volume customers.

### Becoming a piece of infrastructure

It is key that we don't see companies grow out of PostHog over time.

The more PostHog can become part of our customers' infrastructure, the better.

The ways to achieve this are (i) becoming a data store and (ii) extensibility by integrating with other tools (iii) the breadth of users powered by the tool in the clients that adopt us.

### Data store

PostHog already generates a large volume of data about customers and their behavior. However, in the market, there are many tools that already capture user data and event data so there seems little point in competing there.

However, PostHog is positioned to store analytics metadata as objects for use throughout the organization. For example:

* Users:
 * Engaged users (upsells)
 * Users who have signed in (page layout)
 * Users who have visited certain pages, not others (remarketing)
 * Users who have used certain functionality, but not others (onboarding experience)
* Events
 * New trends in events (is the app behaving as expected)

### Integrating with other tools

Product led growth is an [early trend](https://trends.google.com/trends/explore?date=2017-05-03%202020-04-05&q=product%20led%20growth) that currently is taking place in marketing and some product teams. Within startups, this is often viewed as a key part of the strategy, and that will eventually feed through to most software companies. Many of the world's most succesful companies have taken such an approach:

* Facebook
* LinkedIn
* Slack

This means that the way users interact with products will eventually become the key focus of not just product teams, but also engineering, sales and marketing.

In the short run, bringing analytics data into the tools that engineers use, allows them to understand the impact of their work.

In the longer run, PostHog data can be pushed into other tools, such as email marketing software or Salesforce, to drive those teams.

### Breadth of adoption

PostHog can become a more valuable tool if more teams are using it in their day to day work.

In the product analytics market, all the existing tools are targeted at product teams.

PostHog started by building features that product teams will need, in a way that is easier for engineers to implement.

This is why we are now focussed on building features for engineers specifically to use.