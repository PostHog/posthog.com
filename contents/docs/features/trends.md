---
title: Trends
sidebar: Docs
showTitle: true
---

Trends are a very powerful way to visualize how actions or events are varying over time.

These are useful for monitoring which parts of your products are being used repeatedly, how usage is changing as well as the engagement levels of your users.

You can watch our two-minute Trends training videos here:
<br>


##### Video: Setting up Trends Graph
<br>

[![](http://img.youtube.com/vi/q39B-QAFZUI/0.jpg)](http://www.youtube.com/watch?v=q39B-QAFZUI)

##### Video: Filtering and Breakdown Trend Graphs
<br>

[![](http://img.youtube.com/vi/8IsCrLOpRCw/0.jpg)](http://www.youtube.com/watch?v=8IsCrLOpRCw) 

<br>

## Viewing Action Trends

Go to ’Trends’ in the left hand navigation:

![Left hand navigation - trends highlighted](../../images/04/Posthog-13.png)
<br>

Select the actions or events you want to see trends of in the menu:

![Trends, action and event selection](../../images/04/trends-actions-events.gif)

You can now see the trend in these actions over time.

![Action trends](../../images/04/Posthog-14.png)

Dotted lines show data collected so far but that which is not determined by the time interval selected.


## Trend Filtering

There are a few ways to filter this information.

- Date range
- Time interval
- Graphical Display
- Property

Date range, time intervals, and the graphical display can be changed at the top of the graph:

![Trend filtering](../../images/04/Posthog-15.png)

The date range can be selected as an actual date range or common time intervals like the last week or the last 90 days, the graphical display can be displayed as a line chart, table or pie graph. 

Depending on your segmentation and other filters not all graphical displays will be available.

Time intervals can be by the minute, hour, day, week or month.

![interval gif](../../images/04/interval-time-trends.gif)
<br>

Filtering by property can be selected underneath the actions or events you have selected. 

![Filter by property](../../images/04/filterby-property.gif)

### Filtering Trend graphs by Daily Active Users (DAUs)

When selecting actions or trends PostHog will display the total count of those actions or events. You also have the option to filter this by daily active users, which will give you a count of unique users who have completed that action/event instead of the total count. 

![Total or DAU](../../images/04/Posthog-16.png)


## Trend Segmentation

It is possible to segment the data using the ‘Breakdown by’ menu. This allows you to see how trends in Actions vary by the Event properties.

This segmentation has many use cases.

For example, one of the Event properties is the UTM tags – which allows you as a marketer to understand exactly how different ad campaigns are performing.

Another example is that as a product-person, you can see if different devices or different browsers affect usage. Maybe people using your web-based application on mobiles are generally inactive because the interface is hard to use:

![Trend segmentation](../../images/02/Screenshot-2020-02-09-at-17.31.36.png)
<br>

You can filter the event data too, based on the Event property. This means instead of breaking out more lines or rows in the table, you can just display the exact Action trends you care about when the Event property is something specific.

You can also use this at the same time as the ‘Breakdown by’ option.

### Trend Segmentation by Event Property

For example, if you ran a movie streaming service, you could monitor ‘Play button – clicked’ for just one movie at a particular URL:

![trend segmentation by event property](../../images/02/Screenshot-2020-02-09-at-17.35.24.png)

### Trend Segmentation by Stickiness

Trend graphs will show numbers by volume as default, it is possible to show this as stickiness. Instead of the total number of times this action had been completed it will chart the graph as the number of consecutive days a unique user has performed that action. This will allow you to optimize for repeatable actions. 

To do this select 'Shown As':

![stickiness](../../images/03/Posthog-6.png)
<br>

And the graph will convert to Stickiness.

![stickiness image 2](../../images/03/Posthog-7.png)
<br>

This pairs nicely with [Retention](/docs/features/retention), which is essentially stickiness for website visits.
<br>

### Trend Segmentation by User

If you chart your Trend Graph as a line chart you can see all the users that have performed that action on that day. This can help you understand the context behind the aggregated data as you can look at the individual users behind it.

Just click on the day you would like to inspect.

![users in trends 1](../../images/04/Fullscreen_4_1_20__5_23_PM_png-2.png)

And the users will load into a table

![users in trends 2](../../images/04/Posthog.png)

