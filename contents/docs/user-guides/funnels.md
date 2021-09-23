---
title: Funnels
sidebar: Docs
showTitle: true
---

# Funnels

## Why do funnels matter?

For every flow throughout your product, more people will start it than complete it successfully. The primary value of funnels comes from the ability to inspect the journey of everyone going through that flow simultaneously, and understanding where the bottlenecks and friction points are in that flow. Once you can isolate these bottlenecks and understand what’s causing them you’ll be able to significantly improve the success of your users. 

One example from Hasura: “Using PostHog, we observed drop-offs at very particular stages of our onboarding flows, as a result, we took several actions such as moving these steps further down the funnel. These changes helped us deliver a 10-20% improvement in our conversion rate.”


## Use cases



* Understand where people are getting stuck during your flow
* Find out who is successful and who is not
* Identify the steps which have the highest friction and time to convert
* Identify possible causes of failure or success
* Understand how your changes are improving your activation flow
* Understand seasonality in your conversion rates
* Refining your funnel to filter out noise


## Getting Started


### Setting up a funnel

**Step 1: Open up the funnels insight**

Using the side menu - navigate to insights and then funnels - this will present you with a blank funnel screen.

<img width="1360" alt="funnels screenshot" src="https://user-images.githubusercontent.com/85295485/134478357-d99d48ae-0d59-4f40-829b-b6f19c53ed0e.png" />

**Step 2: Add and refine steps in your funnel**

Select the steps you wish to include in your funnel, ideally starting with the first event/action a user will trigger in the flow you wish to measure. Next, add intermediate events you believe users need to go through to be successful and finish with the event which you consider to be the success for this flow. It's best to start with the simplest flow and avoid using optional steps to ensure you don’t filter out or skew valuable results.

![image](https://user-images.githubusercontent.com/85295485/134485100-23d02b5b-c3ad-4704-90d9-fc3d4db93c39.png)

You may wish to refine your steps further, filtering out certain types of users or event properties (e.g. by country of a user), click the “filter” icon next to the step you wish to refine further and select the filter you would like to add or set a global filter under the filters section on the right.

<img width="442" alt="image" src="https://user-images.githubusercontent.com/85295485/134478622-df444540-7962-436e-bb86-98481b8563ab.png">

**Step 3: Set your time range**

You should now have a basic funnel showing in the main analysis pane, you can now modify the time range for which you would like to look at the funnel. A good place to start is to look at a time range of 30 days to ensure the effects of any day to day variations will be reduced.

![image](https://user-images.githubusercontent.com/85295485/134479552-fa5a3eeb-762e-4a01-b5ab-01c43877f120.png)

You should now be able to see where people are struggling in your flow.


### Saving a funnel

**Step 1: Click save**

If you’re measuring something recurrently  or you’d like to share it with others or easily return to it again in the future, hit the “disk” icon in the top left of the configuration pane.

**Step 2: Naming funnel and selecting dashboard**

Select a dashboard where you would like to save the funnel and give it a name

**Step 3: Finding saved funnel**

You can find your funnel any time by navigating to the dashboard you’ve saved it in.

Recently saved funnels are also available within the funnel configuration screen

### Modifying a funnel

Once you have your funnel setup, you may like to tweak the step ordering or filters, this is easy. Steps can be dragged around by clicking and holding down the icon to the left of the step number in the configuration area of the screen.

## Analyzing Funnels


### Understand where people are getting stuck during your flow

The most common use case when it comes to Analyzing a funnel is to understand where people are getting stuck or dropping off in your flow.

![image](https://user-images.githubusercontent.com/85295485/134479685-35702219-96e2-497e-a837-04f999fead00.png)

Quickly looking at this funnel we can see there are a number of drop-offs between steps, absolute drop-off is a great way to understand where you’re losing the most people, but if you want to identify the areas which are having the greatest negative impact on your overall conversion rate - you’ll want to understand the relative drop-off. Switch to relative drop-off by clicking “% Overall conversion” and switching to “% Relative to previous step”

![image](https://user-images.githubusercontent.com/85295485/134480083-6cf799ba-8720-43e5-a88a-bc1fcaa338f3.png)

You can use this to see where the biggest opportunity for improvement is, usually on the step with the lowest relative conversion rate.


### Find out who is successful and who is not

Once you have a funnel drop off you’d like to explore further, the first step is to take a look at who was affected, this will enable you to quickly identify whether it’s a specific client or users that are having the problem and do a number of things to find out why they were struggling (from reaching out to them to replaying their session).

Click on the number next to the drop off, this will open a modal window with the list of people who did not successfully complete this step.

[Screenshot of people modal from step drop-off]

From here you can explore the individual people further including viewing session recordings to see exactly what they were doing when they dropped-off. You can also use this feature to watch a successful user go through your funnel. Understanding what successful users do can also help you identify improvement points for those who aren’t successful.


### Identify the steps which have highest friction and time to convert

Some steps are really easy to complete, others can take a lot of time and effort, one of the causes of people dropping off can be the raw effort required to complete the step. Perhaps it includes a complex form or requires them to go to their emails or another tool to get the information they require to complete the step.

A fast way to get a feel for whether or not a step has high friction is to look at the average time to convert, steps with a long time to convert are likely much harder than steps with a short time to convert.

![image](https://user-images.githubusercontent.com/85295485/134480340-22b8db02-c542-4643-867a-c126993b472f.png)

However it might not be so simple as just looking at the average conversion time between steps. To dig deeper click on the conversion time and you will be presented with a distribution histogram of time to convert.

![image](https://user-images.githubusercontent.com/85295485/134484128-6760fe89-16ae-425d-a94d-83a5dfe2a6a4.png)

If all the data is grouped in one bar (known as a bin - in histogram speak), you can increase the number of bins to get a more granular view of the conversion time distribution.

![image](https://user-images.githubusercontent.com/85295485/134484797-d30a5aeb-c2fe-4b6b-96bb-ef21689699e1.png)

This graph illustrates how common it is to go through these steps at different paces, if you graph is skewed towards the left, this means most people are going through this step very fast, if the graph is skewed towards the right this means that people are going through this step slowly.

You may see other patterns in the graph, including a double hump where you have two peaks in your graph, this indicates that there are two distinct types of experience or user, where some are going through fast and others slower. The group which are taking more time are likely experiencing significantly more friction than the group who are going through fast.


### Identify possible causes of failure and success

Now you have a funnel and can see people are struggling on certain steps. You now want to work out why. We have a tool designed specifically for this use case - to start you’ll want to think of a hypothesis of what might be causing the issue. A common one is people often struggle to use a web based product on a mobile device since it’s not optimized fully.

Click on the breakdown in the configuration pane and select OS (Operating System) this will break down the funnel by operating system.

![image](https://user-images.githubusercontent.com/85295485/134480856-9389ab45-8c49-4150-8e9a-5e6529595e0c.png)

You can instantly see that the conversion rate is lower on Linux, this gives us an indication that it could be a cause of drop-off in this funnel. To validate it, click through to the persons modal to watch a session recording (if enabled on your instance) or try the flow yourself on the mobile device.

You can break down by a number of user and event properties (e.g. browser, country, …) to help quickly validate the initial hypothesis you may have.

Automating the solution to highlight potential problems and hypotheses for you is something we’re actively working on so, take a look on our roadmap if you’re interested to learn more about what we’re building here.


### Understand how your changes are improving your flow

There are multiple ways to understand how your changes, fixes and new features are affecting your funnel success rate - the simplest and most common is to look at how the conversion rate changes over time.

In the configuration pane, switch to historical trends, this will show you how your conversion rate has changed over time. If you have launched a new feature a few weeks ago and expect it to improve your conversion rate - you should be able to see it through a change in the trend on the graph. You may wish to change the granularity and time range to focus on what happened after specific changes.

![image](https://user-images.githubusercontent.com/85295485/134481517-ef493268-2f47-4020-a9ce-9928bf0959d8.png)

A slightly more advanced approach is to use feature flags to run a simple A/B test, you can create a feature flag and assign 50% of people to the test group and 50% to the control group.

You can then break down your funnel by this feature flag, you can then compare the conversion rate for the people in the test (feature flag on) and control (feature flag off) to see if there is a significant difference.

N.B. When it comes to A/B testing - it’s important to recognize that there can be a lot of noise in experiments and if you have a very small improvement in your conversion rate is more likely to be due to some bias or noise than your feature being worse or better. Over time we will build out more advanced A/B testing capabilities with built-in statistical analysis to help you understand the confidence level in the results, check out our roadmap to learn more.


### Understand seasonality in your conversion rates

It’s unlikely that your conversion rate will remain stable every day or every week, throughout the year there will be external factors that cause your conversion rates to fluctuate - this is natural but it’s important to get a feel for them so you don’t jump to conclusions too quickly when analyzing a big change or drop-off.

To look at the seasonality of your conversion rates click through to the historical trends view over the time period you might expect seasonal variations.

A common seasonality to watch out for is weekends, particularly if your product is aimed at businesses it’s much more likely that they will use the product during the week than on the weekends. Perhaps you have a yearly sale such as “Black Friday” which increases the number of people coming to your site, but also increases the expectation of discounts.

In this view you can adjust the date ranges to observe key seasonal trends and ensure when you look at your funnel you can tell whether it’s just a seasonal trend affecting it or whether something has materially changed in your product making the experience better or worse.


### Refining your funnel to filter out noise

When you’ve dialed in your funnel and you’re comfortable getting results and identifying the biggest drop-offs, you can take further steps to improve the signal to noise ratio.

The most common configurations you might consider tweaking are:

* **Conversion window limit:** This sets how long we should wait to consider someone a failure if they don’t achieve the success event - reducing this conversion window will ensure we see people you went through the funnel in a short space of time, increasing it will capture people who went part way through the funnel went a away and came back at a later time to complete it. Setting up an appropriate conversion window limit will also ensure your conversion rate is not changing over time as you’re measuring it (because of users who complete it much after).
* **Step order:**
    * **Sequential:** When you want to measure people who’ve gone through the steps in your funnel in the order set and they have triggered any other number of events in between (e.g. when measuring the effect of an ad on conversion, if someone sees the ad before coming to your product or after they come to your product you’d expect there to be a different conversion rate)
    * **Strict Order:** When you only want to measure people who’ve gone through the steps in your funnel in order and not triggered any other events in between (e.g. if you want to exclude users who have searched for another product after initially finding a product in a checkout funnel)
    * **Any Order:** When you want to measure people who’ve gone through all of the steps in your funnel but they could have completed them in any order (e.g. when there are many paths to the final stage of the funnel, e.g. subscribing to a podcast, people may subscribe immediately or they may listen to an episode first or they may follow the author first, etc.)
