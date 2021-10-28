---
title: Lifecycle
sidebar: Docs
showTitle: true
---

The lifecycle tool is designed to enable you to understand how your active users break down, highlighting those who have recently stopped being active or those who have just become active for the first time.

This enables you to understand both what is driving the growth of active users in your product and gives you a place to start investigating issues like increased churn or a slowing aquisition of new users.

## Accessing lifecycle

1. Click 'Insights' on the left sidebar
2. Click the 'Lifecycle' tab

### Configuring your lifecycle

Lifecycle breaks down whether a user has been active in your selected time interval or not and by whether they were also active in the previous internal.

To start with, you'll need to select an event that best describes activity for your product, this might be something as simple as logging into your app or loading the page. For example: in a messaging product, you might consider someone active if they've sent a message within the interval.

You can see here that I have selected the Message Sent event to define my user activity metric:
![image](https://user-images.githubusercontent.com/85295485/139204932-dfd438d7-cb86-407c-8a0e-efb6a906f3d3.png)

As with other tools in PostHog, you can add filters if you wish to focus on a subset of these events.

Next set the time interval you are interested in, here were' looking at "Daily" active since we expect people to be sending messages every day, but depending on how people use your product, you might want to change the interval to "Week" or "Month". You can also set how far back you would like to consider this data over.

![image](https://user-images.githubusercontent.com/85295485/139205269-21790a9d-6f4c-471a-ae0a-76b2b6557646.png)

Next set the time interval you are interested in, here were' looking at "Daily" active since we expect people to be sending messages every day, but depending on how people use your product, you might want to change the interval to "Week" or "Month". You can also set how far back you would like to consider this data over.

### Interpreting your lifecycle

Our lifecycle chart for "Message sent" looks like this:

![image](https://user-images.githubusercontent.com/85295485/139205374-d891ef11-2ed2-4e92-abcb-80726795d881.png)

Everything above the zero line on the horizontal access represents a user who was active in the interval:
* **New** - This was someone who not been active previously becoming active (e.g. Sending a message for the first time)
* **Resurrecting** - This is someone who was not active in the previous interval becoming active once again (e.g. did not send a message yesterday but sent one today)
* **Returning** - This is someone who was active in the previous interval and also active in the current interval (e.g. sent a message yesterday and also sent a message today)

Everything below the zero line represents a user who as not active in the interval:
* **Dormant** - These are users who are not active in the current interval, irrespective if they were active in previous intervals (e.g. someone who has not sent a message today)

## Going Deeper

Now you have an overview of your lifecycle you can now dig into ares which look problematic, in our graph we can see a big drop in active users on the 23 October. If you click on the graph of "Dormant users" we will show you the users who became dormant here:

![image](https://user-images.githubusercontent.com/85295485/139206407-40bfa178-76d8-47a5-8482-fbf0f682c1d6.png)

You can then click thourgh to look at these individual users behavior in the events or recordings tools 

![image](https://user-images.githubusercontent.com/85295485/139206528-bbdce478-97d9-48ad-888d-3220b50e2b42.png)

Or create a cohort for further analysis in the trends tool.

