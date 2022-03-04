---
title: Analyzing user behavior with cohorts
sidebar: Docs
showTitle: true
author: ['yakko-majuri']
date: 2020-11-02
featuredImage: ../images/tutorials/banners/cohorts.png
---

_Estimated reading time: 8 minutes_ ☕☕

Each person uses your product slightly differently from the next, and some groups might use your app in a completely different way from others.

This happens for a variety of reasons, including software, user profiles, accessibility needs, culture, understanding of the product, individual goals, among many other variables.

As such, an established technique for performing analytics is known as cohort analysis. When doing cohort analysis, users are split into different cohort according to certain characteristics, and you can then evaluate metrics for each specific cohort, rather than only performing your analytics on the entire collection of users.

Here are some examples:

**Segmenting by engagement level**

One useful way of grouping users is by their engagement with your product. How do power users use your product differently? 

**Segmenting by profile data**

When users sign up, you'll often gather information about them such as their role. For example, understanding how people in different roles use your product can help you work out how to solve for their unique needs.

**Segmenting by previous behavior**

Users who performed a certain defining action might use your product differently from those who haven't. At PostHog, for example, we have a dedicated cohort for people who have accessed our Docs. Looking at these users - we see users who have used our docs are more likely to be successful.

**Segmenting by marketing source**

PostHog grabs [UTM tags](https://en.wikipedia.org/wiki/UTM_parameters) from URLs by default, as well as it captures information such as 'Referrer URL' and 'Initial Referrer Domain' as properties on events. This allows you to segment users based on where they came from, so you can determine if users from a certain marketing campaign or channel is working better than another.

**Segmenting by browser or device**

Allows you to determine if your UX is particularly poor on certain browsers. This can be indicated by a lower retention, bad conversion on your funnels, or a lack of certain events being captured. A common issue is desktop web products not rendering correctly for users on mobile devices.

### Defining a group of users: Setting up a cohort in PostHog

User group segmentation for cohort analysis is built into PostHog via our cohorts feature.

Cohorts let you group users by properties in common, as well as by actions over a time period.

For example, you could define the following cohorts:

- Users who did action 'Sign Up' in the last month
- Users with property `email` containing `@posthog.com` _or_ property `company` equal to `PostHog`
- Users who have property `role` equal to `Software Engineer` _or_ triggered action `Used API` in the last 7 days

These cohorts can then be used in 'Insights' to compare metrics across groups. 

**Creating a cohort**

To create a cohort, navigate to 'Cohorts' on the sidebar. This will bring you to the Cohorts page, where you can create a cohort by clicking '+ New Cohort':

![Cohorts Page](../images/tutorials/cohorts/cohorts-page.png)

Clicking the new button will open up the following page:

![Create Cohort](../images/tutorials/cohorts/create-cohort.png)

Here, you have a few options:

**Performed action or event**

You can group users by an [action](/docs/user-guides/actions) or event they have performed, as well as the timeframe they performed it in.

**Properties**

Creating cohorts by user properties works by using the same person property filter from 'Insights'. That means you can specify cohorts of users by a property that they have in common, a property that they do not have, as well as more complex operations such as "property matches regex".

You can also specify a filter by cohort here, allowing you to create cohorts that are subsets of others. For example, "power users" would be a subset of "users who signed up".

**Add Matching Criteria**

New set of matching criteria let's you add another condition for the cohort, allowing you to mix and match events, actions and person properties as you like. 

> **Note:** This is an `OR` operation. Users who match _any_ of the specified conditions will be added to the cohort.

### Using cohorts to determine important metrics

Cohorts can be used in most of PostHog's features, so let's go over some of the key places where they might be useful:

#### Feature flags

![Feature flags by cohort](../images/tutorials/cohorts/feature-flags.png)

You can create [feature flags](/docs/tutorials/feature-flags) that target specific cohorts in order to roll out features to specific users first, or simply to see how features perform against different cohorts. 

Examples:

- Rolling out Beta features to cohort "Beta Testers"
- Rolling out new functionality to 50% of the cohort "Power Users"

Not only are you able to roll out features by cohort, but you are also able to concretely measure the impact of each flag by cohort using Insights, which we'll go through next.

Only cohorts based on user properties can be used for feature flags, event and action based cohorts are not supported.

#### Insights

Cohorts can be used on filters on all PostHog Insights.

Regarding business metrics, cohorts are especially useful to determine retention and conversion of different groups. They can help answer questions like:

- Are we retaining more users from Company A or Company B?
- Do 'Software Developers' convert better than 'Product Managers' from sign up to payment?

To answer questions like these, just filter your queries by cohort when using Insights (by clicking 'Add filter'), like so:

![Cohort filter](../images/tutorials/cohorts/filter.png)

This will give you the query only including events from users in that specific cohort.

Additionally, if you want to see comparisons across cohorts side-by-side, you can add the designated panels to a dashboard, which works for charts, tables, and [funnels](/docs/user-guides/funnels).

Finally, you are also able to see how different cohorts perform on the same chart/table when in 'Trends'.

To do so, rather than filtering, you should add a breakdown by cohort, selecting the relevant cohorts to include in the chart:

![Cohort breakdown](../images/tutorials/cohorts/trends-breakdown.png)

This is a useful way of seeing metrics for different cohorts in one single chart, helping you determine what user groups perform better with respect to your KPIs, for example.

### **Recap**
- Cohorts are a way of segmenting users by shared characteristics.
- Users can be grouped by shared actions or properties
- Cohort matching conditions operate on an `OR` basis
- Cohorts can be used in all of PostHog's insights, as well as Feature Flags 
