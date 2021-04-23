---
title: Funnels
sidebar: Docs
showTitle: true
---

If you need your users to carry out a series of actions in a row, funnels are a way of working out where users are dropping off.

There are many valuable use cases for this data:

* If you need users to sign up and then perform a key action, you can easily analyze the percentage that are dropping out.
* If you need users to come back repeatedly to perform an action, you can see how many “first time” users return.
* If you are trying to understand where in your marketing funnel that you are getting drop off, funnel analytics will make clear what you need to focus on to grow.
 
A funnel is a series of actions and/or events.

## Learning Resources

### Demo Video

If you'd like to watch a video about our Funnels feature, check out our demo video below. It is set to start on the Funnels section:

<iframe width="560" height="315" src="https://www.youtube.com/embed/aUILrrrlu50?start=515" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Tutorial

For a comprehensive tutorial on how funnels work, what you can use them for, and how to create your own, we highly recommend reading our [Step-By-Step Funnels Tutorial](/docs/tutorials/funnels).

![Tutorial Banner](../../images/tutorials/banners/funnels.png)

<br />

## Creating a Funnel

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

### Filter Funnels by Time

You can also filter funnels by time intervals. By default, funnels will show actions completed over the last 7 days, but this can be changed by selecting the time interval next to 'Add to dashboard'

![funnels by time](../../images/04/funnels-by-time.gif)
<br />

## Funnel Drop-off User Breakdown

We can go even further with PostHog – to see which users were in this funnel, and how each of them behaved:

![Funnel dropoff user breakdown](../../images/02/Screenshot-2020-02-09-at-21.00.26.png)

From here, it’s easy to click an individual user, to see their entire Events history – all you have to do is click the provided link.

## Important Note on Funnels

It is important to note that funnels calculate the drop off percentage between steps based on unique users *only*.

This means "action chains" are not calculated individually, but rather compiled based on a user's entire set of actions.

For example, if User X did Step 1 of a certain funnel 5 times, but then only did Step 2 a single time, this will still be shown as 100% conversion between the steps, instead of 20%. 

This happens because the conversion on that step for the user was 100%, even if the *individual conversion per action* was not.

