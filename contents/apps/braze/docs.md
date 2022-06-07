---
title: Braze Import app documentation
showTitle: true
topics:
    - braze
---

### What does the Braze Import app for PostHog do?

This app sends Braze analytics data series to PostHog. It is currently in beta and is to be used at your own risk.

The data series is imported into PostHog once a day, in a time window corresponding to 00:00AM UTC to 12:00PM UTC of the previous day.

Campaigns, Canvases, News Card Feeds and Segments will only be tracked if any activity was recorded in the last 24 hours time window.

### Why is this app in beta?

As a community app, this has not been fully tested with Braze. There may be risks or bugs that arise while using it and users must do so at their own risk.

### What are the requirements for this app?

Using the this app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

### How should I configure API permissions for the Braze Import app?

Depending on what kind of analytics you want to export from Braze to PostHog, you need to give your API Key the correct permissions.

Campaigns:

```
campaigns.list
campaign.data_series
campaigns.details
```

Canvas:

```
canvas.list
canvas.data_series
canvas.details
```

Custom Events:

```
events.list
events.data_series
```

KPIs:

```
kpi.mau.data_series
kpi.dau.data_series
kpi.new_users.data_series
kpi.uninstalls.data_series
```

News Feed Cards:

```
feed.list
feed.data_series
feed.details
```

Segments:

```
segments.list
segments.data_series
segments.details
```

Sessions:

```
sessions.data_series
```

### Where can I find out more?

You can read more about [Braze REST API Key permissions](https://www.braze.com/docs/api/api_key/#how-can-i-use-it) in Braze's docs. 


### How do I install the Braze Import app for PostHog?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Braze' and select the app, press Install.
3. Follow the steps to configure the app.
3. Watch events roll in to PostHog. 

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Braze Import app](https://github.com/posthog/posthog-braze-plugin) is available on GitHub. 

### Who created this app?

We'd like to thank PostHog team member [Emanuele Capparelli](https://github.com/kappa90) for his work creating this app. Thank you, Emanuele!

### Who maintains this app?

This app is maintained by the community. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/posthog/posthog-braze-plugin) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our FAQ page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
