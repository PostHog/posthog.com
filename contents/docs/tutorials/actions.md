---
title: Going Beyond Autocapture
sidebar: Docs
showTitle: true
---
<br />

<small class="note-block centered">_Estimated Reading Time: 6 minutes ☕☕_</small>

<br />

<span class="larger-image">

![Actions banner image](../../images/tutorials/banners/actions.png)

</span>

<br />

One of the features we're very proud of at PostHog is event autocapture.

Autocapture is great because it ensures you don't miss out on any data that could potentially be relevant to your product. If you restructure your frontend, for example, autocapture will continue to collect relevant events without you needing to update your codebase each time. 

However, for more advanced product analytics, autocapture is not enough. 

First, event autocapture can be a bit overwhelming. On high volume instances, where events come in by the thousands every minute, the events table provided by PostHog can contain so much information that it can be difficult to determine exactly what you care about. 

Second, autocapture is a general solution that provides value for most users, but, to get the most out of PostHog, you should be using custom events. Custom events let you track _exactly_ the things that you care about, ranging from a user hovering over a certain part of your app, to a specific function being called on your backend.

This tutorial will address these two points, walking you through how to create actions and send custom events step-by-step, so you can make the most out of PostHog.

### Pre-Requisites

To follow this tutorial along, you need to:

1. Have [deployed PostHog](/docs/deployment).

### Sorting Through Your Events with Actions

With the goal of making it easier to sort through your events, PostHog introduced the concept of [actions](/docs/features/actions), which are a way to tag and combine events you care about.

The relationship between events and actions can be both one-to-one or many-to-one. What this means is that you can create an action from one event only, such as a "Pageview" action for a `$pageview` event, as well as an action targeting multiple events, like a "Sign Up" action targeting the events `clicked button with text "Sign Up"` and `clicked button with text "Sign Up Now"`.

Not only that, you can also create actions based on the URL where an event happened. This could lead to actions such as "Clicked Sign Up on About Page".

There are two main reasons for creating actions:

**1. Tagging events that you especially care about**

Filter out the noise from all your events to make it easier for you to execute your analytics processes.

**2. Combining multiple events into one action**

Let's say you have multiple sign up buttons spread across your website. For some types of analysis it could be useful to know which specific button was clicked, however, it might also be the case that you just care that the user signed up, irrespective of what they clicked to do so.

Actions fit this use-case perfectly, since events are combined using `OR` operations. That means that if an action is composed of multiple events, it will be registered if _any of the events composing it_ are triggered. 

In other words, using the example from above, if you have an action called "Sign Up" that targets the clicks on all your sign up buttons, if your user clicks any of the buttons, the action will be registered.

> **Note:** Actions also work retroactively, meaning that they also tag events that happened in the past, not only events that happened after the action was created.

### Creating Actions

There are many ways to create actions in PostHog. These are:

**1. Through our toolbar (recommended for actions based on frontend elements)**

To learn how to create actions using our toolbar, you can visit our [dedicated tutorial](/docs/tutorials/toolbar/#creating-actions).

**2. From the events table**

To create actions from the events table, just click on the plus sign on the left of any event to reveal a button allowing you to create an action from that specific event. You will also be able to customize the action further in the following steps (such as add another event). 

![Action from event image](../../images/tutorials/actions/action-from-event.png)
<small class='centered'>_Creating actions from the events table_</small>


**3. From the 'Actions' page**

Lastly, you can of course create actions from the 'Actions' page under 'Events':

![Actions page image](../../images/features/actions/actions-page.png)


**Action Options**

Visit our [dedicated actions page](/docs/features/actions/) for a comprehensive explanation of all the options available when creating an action.

### Upgrading Your Analytics Game with Custom Events

Now that we've learned how to sort through events, let's go through how to create events that PostHog doesn't automatically capture for you.

Custom events can be created from any of our [libraries](/docs/integrations), as well as our [API](/docs/api/overview). They can be triggered from both the backend and the frontend. 

