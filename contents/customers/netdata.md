---
title: How Netdata uses PostHog and BigQuery to build modern devtools
customer: Netdata
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/netdata/netdata_logo.svg
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/netdata/netdata_logo_dark.svg
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/netdata/netdata_featured.png
industries:
  - SaaS
  - Developer tool
users:
  - Product
  - Engineering
toolsUsed:
  - Session replay
  - Autocapture
  - PostHog Cloud
  - Apps
date: 2022-08-23T00:00:00.000Z
---

Netdata is an open source monitoring and troubleshooting platform used by engineers at many of the biggest technology companies in the world, including Microsoft, Amazon and Nvidia. In 2020, Netdata’s teams began looking for a way to track and analyze user behavior, considering many different tools in the process.  

“At my last company, we paid hundreds of thousands of dollars for tools like [Google Analytics](https://isgoogleanalyticsillegal.com/) 360,” said Andrew Maguire, Netdata’s Analytics and Machine Learning Lead. “But when I joined Netdata I wanted to look at new tools. I looked at [Mixpanel](/blog/best-mixpanel-alternatives), [Amplitude](https://posthog.com/docs/migrate/migrate-from-amplitude)... but they’re all old and stodgy and I didn’t want to go near them because they’re built for enterprises, not start-ups like Netdata.”

“I looked at modern, open source solutions. When I found PostHog I loved how easy it was to get going and the developer-centric, event-based approach. And then there’s autocapture — turning that on makes sure you get a lot of the magic, right out of the box.”

## Finding product-market fit with analytics and empathy

[Autocapture](/blog/is-autocapture-still-bad) enabled Netdata to start collecting data immediately, so the team could focus on moving towards product market fit, rather than complex instrumentation. Using autocapture alongside some custom events has enabled the team to identify trends and iterate quickly. 

“Whenever we launch a feature, we create a dashboard in PostHog,” said Andrew. “I have one for our anomaly detection feature, for example, which shows the funnel of how many people use it, how many get good results... this is our flagship machine-learning feature, and PostHog helps us make it better and understand how to achieve product market fit.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/andrewmaguire.jpeg"
    size="md"
    name="Andy Maguire"
    title="Analytics & Machine Learning Lead, Netdata"
    quote={`“I just trust that, when PostHog does something, it will do it the right way because it's not just open source code, it's all developed in the open too. You'd never get that modern thinking with the likes of Mixpanel, or other more 'Old School' platforms.”`}
/>
</BorderWrapper>

Netdata knows there’s more to getting product market fit than just the data, however. Teams also need to have empathy with their users and understand how they actually use the platform. [Session replay](/product/session-recording) is therefore an essential tool for Netdata.

“I turned on session replay in PostHog,” said Andrew. “It’s so much better than Smartlook, which we used to use, because you can tie it to every individual event and user. If someone in our community has a problem we can get their user ID, look at their events and see how they’re using the product. We don’t have to ask for so much info… it makes a real difference.”

## Forwarding analytics data to BigQuery

Getting value from product data is so important to Netdata that the analysis doesn’t stop in PostHog — instead, Netdata uses [PostHog’s open-source app platform](/docs) to forward all events to a BigQuery instance. This enables the team to run detailed analysis of data from multiple platforms, in addition to the work they do in PostHog. 

“The app platform is really useful,” said Andrew. “We’ve built our own apps out of cobbled-together JavaScript and any sort of data transformations that would be useful, I put them in the app too. Then I have them in BigQuery, and in PostHog.”

“Slack has been really useful for this too,” added Andrew. “When we have a question, or need support we don’t have to file a ticket in Zendesk or anything. We don’t have to go speak to our GA account manager first. We can reach out over Slack and talk to the PostHog engineers directly. It’s so much better. The difference is night and day.”
