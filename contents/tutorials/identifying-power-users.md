---
date: 2024-09-24
title: "How to learn from your power users"
rootPage: /blog
author: ["danilo-campos"]
featuredTutorial: false
tags: ["Product Analytics", "Session Replay", "Cohorts", "Events", "Persons"]
---

Not every user of your product will become a true believer. But some are so committed, so dedicated to discovering an advantage, they go deep.

They try things you didn't expect, combining features in ways that surprise you, and best of all: they succeed. They win with your product in ways that build loyalty, so they tell their friends, tell your story, and show off their discoveries.

Let's walk through how you can use PostHog to discover and learn from your power users:

- How PostHog stores properties, events and replays for the people who use your product
- How to think about power users for *your* product
- Using signals from person profiles and insights
- Gathering profiles into cohorts

---

# Person profiles hold the clues

PostHog assembles a *[profile](https://posthog.com/docs/data/persons)* for every user of your product, providing information like:

- **Properties:** [Things we know](https://posthog.com/docs/getting-started/person-properties) about a given user. This spans everything from [UTM values](https://posthog.com/docs/data/utm-segmentation) that were set on their first and latest session, IP geolocation values, browser and platform details, plus any properties you choose to log, which can include account details like name and email address.

- **Events:** An [event](https://posthog.com/docs/getting-started/send-events) stream detailing everything this person has done in your product, ordered chronologically. Autocapture stores many things without your having to lift a finger, including pageviews and form interactions. You can also log events manually in your own code, revealing fine-grain detail about funnel progress. Your events can also include [custom properties](https://posthog.com/docs/getting-started/send-events#sending-custom-properties-on-an-event), like the value of purchases made via your product.

- **Recordings:** If you've enabled [session replay](https://posthog.com/docs/session-replay), any recordings associated with a given user are available via their profile. This provides a clear window into behavior, roadblocks and persuasive content. Seeing replays of the people most relevant to your business goals can provide potent insights.

With profiles, PostHog catalogs vast detail about people and their behavior so you can research the effectiveness of your product's design, communication and architecture.

But you shouldn't try to manually fish your power users out of a sea of profiles. We've got tools to find the ones you most want to learn from.

## Decide what power means to you

There's no single definition of 'power user.' Like an [ideal customer](https://posthog.com/newsletter/ideal-customer-profile-framework), it varies from product to product, and sometimes even from different stages of maturity in the same product.

Take some time to think about what it would mean to really push your product to its ceiling:

- Frequency of use
- Interaction with specific features
- Adoption of paid tiers
- Combined use of multiple features

In PostHog, for example, power users leverage [HogQL](https://posthog.com/docs/hogql) to go beyond the basics exposed by our UI. In the heyday of Twitter, power users, already posting a lot, began to write lengthy, viral threads.

We'll talk through some power user signals you can detect using PostHog, then explore some example queries to let you surface these users on an ongoing basis.

# Power user signals

Try the simplest thing that works, then observe and iterate.

Note that you can use a composite of these approaches using PostHog's query building interface. You're not locked into a single marker of power users.

## Autocapture events and user properties

[Autocapture](https://posthog.com/docs/product-analytics/autocapture) will log events as your user moves through your product. If specific paths – like a pageview at `/product/our-advanced-new-feature` — are enough to reveal your power users, you're all set.

It’s possible you already know your power users because you’ve been talking to them – or they’ve been talking to you, demanding new features that bulk up your roadmap.

You can [identify users](https://posthog.com/docs/product-analytics/identify) in PostHog, attaching their email address and other properties to their profile. Next time you get a lengthy feature request email, you'll be able to look up your correspondent's latest activity in detail.

If your product has a paid tier tailored to power user patterns, you could also create a subscription tier [property](https://posthog.com/docs/getting-started/person-properties#how-to-set-person-properties).

## Stickiness and engagement frequency

In some products, what makes a power user is raw engagement.

If you want to find the users who just keep coming back, you can try a **[Stickiness](https://posthog.com/docs/product-analytics/stickiness)** insight. This way, you can see the users who are committed enough to return, and how often they do it. You can learn the stickiness not just of your product in general, but also of a specific path, feature or behavior.

[TK screenshot of a Stickiness graph with the People list hover box displayed]

To dig into the profiles of sticky users, click a data point on the graph. You'll get a list of profiles, and you can save them as a cohort to review later (more on these shortly). 

You can also query for *repetition* of any event PostHog tracks.

## Flag with custom events

If the above approaches aren't enough, you can log custom events in your code that flag your power users.

Pick a milestone in your feature's workflow where you feel the user has committed to using it – perhaps after a save button is clicked. There you can send an event in PostHog, attaching this milestone to the user's event stream:

```
//TK the code that does this
```

If you're going to the trouble of custom code to identify your power users, it may make more sense to use events than, say, setting a user property like `power_user: true`. Your definition of power users is likely to evolve over time, so sending events you can use as changeable inputs to this definition will be more flexible and long-term useful.

If your power user is someone who uses multiple features in combination, you can repeat this process across those feature workflows.

## Surveys

[Surveys](https://posthog.com/tutorials/feedback-interviews-site-apps) require more effort – you have to write them, your users have to complete them. But if your definition of power user is hard to derive from behavior or inference, they can be a great option.

If your product is in its early days, you may find that merely being willing to take the survey is itself a signal that your user is highly engaged and committed to your long term success.

Otherwise, think about power user signals you could gather from a survey:

- An [NPS survey](https://posthog.com/templates/nps-survey) could mark users who are thrilled with what you've built
- A multiple choice survey asking which features a user most wants you to build next could reveal would-be power users waiting to be unleashed

Survey submissions are stored as events in a person profile, allowing you to query them later.

# Building cohorts

These are just a few examples – be creative with how you use your PostHog data.

Once you've picked signals for identifying power users, assemble [cohorts](https://posthog.com/docs/data/cohorts) that gather and surface them. These enable you and your teammates to dive deep on usage patterns, create insights and review replays.

## Static cohorts

When reviewing insights, like [funnels](https://posthog.com/docs/product-analytics/funnels) or stickiness, you can save the list of users the report describes as a static cohort.

These cohorts won't change unless you update them yourself.

## Dynamic cohorts built from queries

PostHog cohorts can also be *dynamic:* as users trigger the events that mark them as power users, PostHog will update the list of users responsive to your query.

To accomplish this, you'll use the query building UI to specify *what makes a power user*.

Queries can combine multiple criteria, looking for the union of people who did *this* **AND** *that*. They can also find everyone who has done *this* **OR** *that*.

You can further create multiple *groups* of criteria, for more complex queries that return users who satisfy **ALL** or **ANY** criteria groups you set out.

Here are some examples.

### Querying by events

Imagine we've built an exciting new feature at the path `/tools/discombobulator`. Imagine our product also sports an array of experimental widgets, whose paths all start with `/widgets/experimental/`.

We could surmise that anyone who engages with both paths is really pushing the limits of our newest work.

Create a new **Cohort** in **People and groups**. A query to show us everyone who fits this description could look like:

[TK screenshot of the query]

We query for users who **Completed event** **Pageview**, filter it by the **Path Names** we care about, and make sure that we are **AND**ing these together, showing us users who have both kinds of events in their history.

Give the cohort a name, save it, and you'll have an ongoing list of potential power usr profiles you can review.

The same approach works with any custom events your product sends to PostHog as well.

### Querying by frequency of event

If frequency of a given event is a meaningful signal – how many times a user visited the `/tools/discombobulator` path, for example – use **Completed an event multiple times**, and set the number you want to query for.

[TK variation on the above screenshot, now showing the multiple times option]

### Querying user properties

Perhaps we're logging `subscription_tier` as a property, and think our power users are clustered into the `pro` tier.

A new cohort querying this could look like:

[TK screenshot of a property query]

We'll ask for persons who **Have the property** **subscription_tier**, equal to **pro**.

As more pro subscribers convert, this cohort will grow.

### Querying survey completion

When a user submits a PostHog survey, a `survey sent` event is created including their response data.

You can create a cohort based on these submissions, including filters to show you only users who chose a specific response.

[TK an explainer on the best way to build a cohort from such data, based on what we agree makes sense given the Bug Situation we've discovered may be at play; also a screenshot]

# Now what?

So you've taken a swing at some signals that might indicate a power user, and built a cohort to gather their profiles.

Now you can dig into the details. Check out event streams and replays. Does this look like the kind of behavior you've been hoping to find? Maybe it's close, but reveals something more specific you could try as new criteria?

Like everything in building a product, treat this as an iterative process. Experiment, check your results, and keep trying.

Create a [notebook](https://posthog.com/docs/notebooks) to keep track of profiles and replays you can learn from. Keep an eye out for friction that emerges across users.