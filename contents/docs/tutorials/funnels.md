---
title: Analyzing Your Conversion with Funnels
sidebar: Docs
showTitle: true
---
<br />

<small class="note-block centered">_Estimated Reading Time: 6 minutes ☕☕_</small>

<br />

<span class="larger-image">

![Funnels Banner Image](../../images/tutorials/banners/funnels.png)

</span>

<br />

For most products, having a user land on your page is just the beginning. 

After all, a pageview isn't worth much if it doesn't lead to anything. 

You want users to sign up, use the product, pay you. 

To determine how well you're achieving these goals, you need to look at **conversion**.

Conversion rates tell you how well (or poorly) you're getting users from one step or action you need them to perform to another. 

For example, after a user visits your landing page, you want them to click a sign up button. Then, you want them to actually complete the signup process.

This process alone raises a lot of important questions for your business metrics, such as:

_"What percentage of users who visit my website actually sign up?"_

To answer those questions, you should really be using funnels.

![Funnel Example](../../images/tutorials/funnels/insights-funnel.png)

Above is a simple example of a PostHog funnel. It was made to answer the question:

_"Out of the PostHog team members who visited the website, how many clicked our 'Star Repo' button?"_

Just like us, you probably have a lot of questions that can be answered with funnels. 

Hence, this tutorial will walk you through creating a funnel step-by-step, while covering some of the use cases and features of PostHog funnels. 

<span class='centered'>...</span>

_Prefer to watch a video? Check out the [Funnels section of our demo video](https://youtu.be/aUILrrrlu50?t=504) for a shorter overview of this functionality._

## Pre-Requisites

To follow this tutorial along, you need to:

1. Have [deployed PostHog](/docs/deployment).
1. Have started receiving events via our [snippet](/docs/integrations/js-integration), one of our [integrations](/docs/integrations), or our [API](/docs/api/overview)
    * **Note:** It can also be useful to have some [actions set up](/docs/tutorials/toolbar#creating-actions), but not necessary.

##

