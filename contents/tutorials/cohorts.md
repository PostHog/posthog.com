---
title: Analyzing user behavior with cohorts
sidebar: Docs
showTitle: true
author: ['yakko-majuri']
date: 2020-11-02
featuredImage: ../images/tutorials/banners/cohorts.png
topics: ["cohorts", "feature flags", "configuration"]
---

_Estimated reading time: 8 minutes_ ☕☕

Each person uses your product slightly differently from the next, and some groups might use your app in a completely different way from others.

This happens for a variety of reasons, including software versions, user profiles, accessibility needs, culture, understanding of the product, and individual goals, among many other variables.

Cohort analysis is an established technique for performing analytics, where users are split into different cohorts according to certain characteristics. You can then evaluate metrics for each specific cohort, rather than performing your analytics on the entire collection of users.

Here are some examples:

**Segmenting by engagement level**

One useful way of grouping users is by their engagement with your product. How do power users use your product differently? 

**Segmenting by profile data**

When users sign up, you'll often gather information about them such as their role. For example, understanding how people in different roles use your product can help you work out how to solve for their unique needs.

**Segmenting by previous behavior**

Users who performed a certain defining action might use your product differently from those who haven't. At PostHog, for example, we have a dedicated cohort for people who have accessed our Docs, as we see users who have used them are more likely to be successful.

**Segmenting by marketing source**

PostHog grabs [UTM tags](https://en.wikipedia.org/wiki/UTM_parameters) from URLs by default, as well as capturing information such as 'Referrer URL' and 'Initial Referrer Domain' as properties on Events. This allows you to segment users based on where they came from, so you can determine if users from a certain marketing campaign or channel is working better than another.

**Segmenting by browser or device**

This allows you to determine if your UX is problematic on certain browsers. This can be indicated by a lower retention, worse conversion in your Funnels, or certain Events not being captured. A common issue is desktop web products not rendering correctly for users on mobile devices.

### Defining a group of users: Setting up a Cohort in PostHog

User group segmentation for cohort analysis is built into PostHog via our Cohorts feature. Cohorts let you group users by properties in common, as well as by actions over a time period.

For example, you could define the following cohorts:

- Users who did action 'Sign Up' in the last month
- Users with property `email` containing `@posthog.com` _or_ property `company` equal to `PostHog`
- Users who have property `role` equal to `Software Engineer` _or_ triggered action `Used API` in the last 7 days

These cohorts can then be used in 'Insights' to compare metrics across groups. 

**Creating a cohort**

To create a cohort, click on 'Cohorts' on the sidebar and then click '+ New Cohort'. 

![Cohorts Page](../images/tutorials/cohorts/cohorts-page.png)

This opens up the following page:

![Create Cohort](../images/tutorials/cohorts/create-cohort.png)

Here, you have a few options:

**Performed action or event**

You can group users by an [Action](/docs/user-guides/actions) or Event they have performed, as well as the timeframe they performed it in.

**Properties**

Creating cohorts by user properties works by using the same person property filter from 'Insights'. That means you can specify cohorts of users by a property that they have in common or a property that they do not have, as well as more complex operations such as "property matches regex".

You can also specify a filter by cohort here, allowing you to create cohorts that are subsets of others. For example, "power users" would be a subset of "users who signed up".

**Add Matching Criteria**

This new set of matching criteria lets you add another condition for the cohort, enabling you to mix and match events, actions, and person properties as you like. 

> This is an `OR` operation. Users who match _any_ of the specified conditions will be added to the cohort.

### Using cohorts to determine important metrics

Cohorts can be used in combination with most of PostHog's features in powerful ways.

#### Feature flags

![Feature flags by cohort](../images/tutorials/cohorts/feature-flags.png)

You can create [feature flags](/docs/tutorials/feature-flags) that target specific cohorts in order to roll out features to specific users first, or simply to see how features perform against different cohorts. 

Examples:

- Rolling out beta features to cohort "Beta Testers"
- Rolling out new functionality to 50% of the cohort "Power Users"

Not only are you able to roll out features by cohort, but you are also able to concretely measure the impact of each flag _by_ cohort using Insights (see below). 

Only cohorts based on user properties can be used for feature flags - Event- and Action-based cohorts are not supported.

#### Insights

Cohorts can be used as filters on all PostHog Insights.

Cohorts are especially useful for determining the retention and conversion of different groups. They can help answer questions like:

- Are we retaining more users from Industry A or Industry B?
- Do 'Software Developers' convert better than 'Product Managers' from sign up to payment?

To answer questions like these, just filter your queries by cohort when using Insights by clicking 'Add filter':

![Cohort filter](../images/tutorials/cohorts/filter.png)

This will give you the query that only includes events from users in that specific cohort.

If you want to see comparisons across cohorts side-by-side, you can also add the designated panels to a dashboard. This works for charts, tables, and [funnels](/docs/user-guides/funnels).

Finally, you are also able to see how different cohorts perform on the same chart/table when in 'Trends'. Instead of filtering, you should add a breakdown by cohort, selecting the relevant cohorts to include in the chart:

![Cohort breakdown](../images/tutorials/cohorts/trends-breakdown.png)

This is a useful way of seeing metrics for different cohorts in one single chart, helping you determine what user groups perform better with respect to your KPIs, for example.
