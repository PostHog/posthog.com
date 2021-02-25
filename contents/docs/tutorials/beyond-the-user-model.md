---
title: Going Beyond the User Model
sidebar: Docs
showTitle: true
---

<br />

<small class="note-block centered">_Estimated Reading Time: 12 minutes ☕☕☕_</small>

<br />

<span class="larger-image">

![Revenue Tracking Banner Image](../../images/tutorials/banners/revenue.png)

</span>

<br />

When using PostHog or any other product analytics tool, there are two key entities that underpin all of your analytics: events and users.

Every event that you capture is associated with a user, which generally corresponds to a person.

However, what if you want your analytics to be based on an entity larger than one person, such as an organization, or smaller than one person, such as a project created by a user? 

In this tutorial, we will explain how to structure your analytics to fit these needs. We will use PostHog Cloud as an example, and show how we could track our events on an organization basis, rather than a person basis, aiming to answer the following questions:

- How many organizations are in PostHog Cloud?
- How many total users are there?
- What is the average number of users per organization?
- How many total projects were created?
- What is the average number of projects per organization?
- What is the average revenue per organization?
- How many organizations are there at each pricing tier? 


### Pre-Requisites

To follow this tutorial along, you need to:

1. Have [deployed PostHog](/docs/deployment).
1. Have started receiving events via our [snippet](/docs/integrations/js-integration), one of our [integrations](/docs/integrations), or our [API](/docs/api/overview).


### Identifying Users

Every event in PostHog has an associated distinct ID, which determines which user the event "belongs" to.

When using PostHog in your backend, you will always specify this distinct ID yourself, whereas in the frontend we derive it for you.

Now, what happens when a user lands on your website and there's no record of them in PostHog already? Well, PostHog provisions an anonymous yet unique ID for the user which ensures that we can differentiate between unique users in our analytics. 

However, when the user does something identifiable on your app, like logging in, you are then able to identify them yourself, in order to be able to:

- Track a user across platforms or browsers (e.g. web to mobile)
- Specify a more human-friendly identifier for this user
- Associate this user with an ID that is already used elsewhere in your application
- Combine the activity of a user from before they're logged to after

In most cases, users are identified using either email, username, or an internal unique identifier. This helps us differentiate between one person and another. 

If you're unfamiliar with how to identify users, here's an example from our JavaScript integration:

```js
posthog.identify('your desired id')
```

However, if we want to do organization-based, rather than person-based analytics, we can use `posthog.identify` to our advantage. 

Using the PostHog Cloud example, when a user logs in, we can either identify them by something unique to the person, like an email:

```js
posthog.identify(user.email)
```

Or, instead, we could identify them based on their organization:

```js
posthog.identify(user.org)
```

So what are the implications of doing things this way?

Above all, you first want to make sure organization names are unique, to prevent events being merged across organizations.

With that criterion fulfilled, what will now happen is that all events from people in that organization will be associated with the same PostHog user. 

As such, if we were to filter a PostHog chart by 'Active Users', we will actually be looking at unique organizations, rather than unique persons that performed an event.

If we still want to keep some record of an event coming from a specific person, we can do that by either passing a person-unique identifier with our event calls:

```js
/* 
* Event will be associated with the organization, but we have 
* a way of tracing it back to the individual person if we want to.
*/
posthog.capture('some event', { personEmail: user.email })
```

When using our JavaScript library, you can also simplify this with `posthog.register`:

```js
/* 
* From now on, every event from this user will
* come with the personEmail property.
*/
posthog.register({ personEmail: user.email })
```

With this in place, if we then set up the following chart in PostHog:

INSERT PIE CHART HERE

We are able to determine the total number of unique organizations using PostHog. 

> Note: The `$pageview` event in the chart is a proxy for counting the number of users. This can be any event that all users will certainly have, such as `account_created`, `sign_up`, etc.

### Calculating Total Users

When user comes into org, send event.

### Average Users Per Org

Formula: total user events divided by active user orgs

### Total Projects

Project created, send event

### Average Projects per org

Total projects by active orgs.

Also do $set example here.

### Revenue per org

Same

### Revenue breakdown

Multiple events, different filters

