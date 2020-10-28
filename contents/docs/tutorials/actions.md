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

### Sorting Through Your Events with Actions

With the goal of making it easier to sort through your events, PostHog introduced the concept of [actions](/docs/features/actions), which are a way to tag and combine events you care about.

The relationship between events and actions can be both one-to-one or many-to-one. What this means is that you can create an action from one event only, such as a "Pageview" action for a `$pageview` event, as well as an action targeting multiple events, like a "Sign Up" action targeting the events `clicked button with text "Sign Up"` and `clicked button with text "Sign Up Now"`.

Not only that, you can also create actions based on the URL where an event happened. This could lead to actions such as "Clicked Sign Up on About Page".

![Action from event image](../../images/tutorials/actions/action-from-event.png)
<small class='centered'>_Creating actions from the events table_</small>

There are two main reasons for creating actions:

1. Tagging events that you especially care about
2. Combining multiple events into one action 

Regarding the first reason, the idea is to simply filter out the noise from all your events 