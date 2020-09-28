---
title: Analyzing Your Conversion with Funnels
sidebar: Docs
showTitle: true
---
<br />

<small class="note-block centered">_Estimated Reading Time: 7 minutes ☕☕_</small>

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

**Note:** It can also be useful to have some [actions](/docs/tutorials/toolbar#creating-actions) set up, but not necessary.

## When You Should Use Funnels

Funnels are great for when your users should perform actions in succession. That is, if you need your user to do something _and then_ do something else, funnels are a great way to gather insights into that process.

Funnels can have as many steps as you like and offer a good look into both what percentage of users are converting from one step to another, as well as who are the users who are converting and the ones who aren't.

A standard but very useful funnel is looking at the sign up process from end to end, for example. You can set up a funnel starting from the moment the user lands on your page to when they actually complete the process. You are then able to find out where users are dropping off, and work on improving those areas.

## Creating Your First Funnel

### Step 1: Navigate to 'Funnels'

Our 'Funnels' feature is located in 'Insights'. After navigating to 'Insights' on the sidebar, click on the 'Funnels' tab to get to this page:

![Funnels Page](../../images/tutorials/funnels/funnels-page.png)

### Step 2: Adding Steps to Your Funnel

Once you're on the 'Funnels' page, you can then start to create your funnel.

Click on the blue 'Add action/event' button and select the action or event you want to use as the starting point for your funnel.

You can then add a filter to that specific action now or a general filter to the entire funnel later on ('Filters' -> 'Add filter'). 

It's also worth noting how the PostHog funnels work in terms of what counts as a conversion to the next step. When your funnel is ready, you will have the ability to specify a time range for your funnel, such as "Last 7 days", "Last 48 hours", or a custom range. 

Then, based on that time range, PostHog will determine conversion based on if the user performed one action after the other _at any point during the time period_. That means that if my time range is set to 2 weeks, a user may perform step 1 on day 2 and step 2 on day 13 and it will still count as a conversion. 

### Step 3: Calculating Funnel

Once you're satisfied with all the steps you've added, you can then click 'Calculate' to generate the funnel.

This should yield something like this (without the red rectangles):

![Funnels Page](../../images/tutorials/funnels/finished-funnel.png)

Let's go over the highlighted areas on this image:

**$pageview**

First step of the funnel. Created from the `$pageview` _event_. It has a filter added to the event specifically.

**Clicked 'Star Repo' Button**

Second step of the funnel. Created from a custom _action_. 

**Save**

The 'Save' button lets you save your funnel once it has been created. It will then appear under 'Saved Funnels' at the bottom left of the page. 

**Last 48 hours**

Clicking here will let you configure the time range for your funnel. 

**Update Dashboard**

For you, this button might say 'Add to Dashboard'. This lets you add your funnel to one of your custom dashboards. If you are editing a funnel that is already on a dashboard, this button will then say 'Update Dashboard'.

**History**

The 'History' button is available at every tab on Insights. It lets you go back through the charts and funnels you have created in the past so that you can make sure you never lose your work.

### Step 4: Adding Funnel to Dashboard

If you click the 'Add to Dashboard' button on the top right, this will open up the following modal:

![Funnels Page](../../images/tutorials/funnels/add-to-dashboard.png)

Here you can set a name for your funnel and add the funnel to one of your dashboards (or create a new one).

Once on the dashboard, you can resize panels as you wish, change colors, or share the dashboard publicly. To learn more about how to use our Dashboards feature you should visit our [dedicated page](/docs/features/dashboards). 

### Start Gathering Insights

You're good to go! 

Now that you know how to create funnels, you can start gathering significant insights to improve your UX and the performance of your business metrics, by focusing your work on the areas that need it most. 

To explore more in-depth how funnels can be useful in your product analytics processes, it's worth watching this [short video about the AARRR Framework](https://www.youtube.com/watch?v=irjgfW0BIrw). 