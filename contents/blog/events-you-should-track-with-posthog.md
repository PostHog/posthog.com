---
date: 2022-10-10
title: 5 events all teams should track with PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - joe-martin
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Using PostHog
tags:
  - Guides
---

It can be tricky to know which events you should start tracking first if you haven’t used product analytics before. That’s why we recommend using PostHog’s [autocapture](/docs/data/autocapture). It's also why we give everyone their first million events for free, every month – so you can track many of the events you need out of the box and without worrying about cost. 

But what if you don’t want to use autocapture, or you’re struggling to separate the signal from the noise when it comes to which events to focus on? 

This guide outlines five of the most essential events we recommend tracking with PostHog. You may need to adjust them slightly so they map to your product – a free product won’t need to track purchases, for example – but these events should be common to most organizations. 

> Not sure how to start tracking a new event? Find out in our [complete guide to event tracking](/tutorials/event-tracking-guide). Or skip right to our guide on [how to create new events the easy way!](/tutorials/how-to-capture-events-the-easy-way)

## 1. Pageviews
Pageviews are the most basic, essential event you should be tracking — essentially, how many people look at an individual page. 

Pageviews are foundational for a number of important queries and discoveries. You can filter by UTM, for example, to measure the performance of a marketing campaign. Or, you can look at pageviews across your documentation to see where users may need more help. You can even use the `initial referring domain` property to get a sense for where your overall traffic comes from. Either way, pageviews are an essential event to track and play nicely with other events on this list. 

> 💡 **PostHog Tip:** Pageviews are part of the Acquisition step in a traditional AARRR funnel. We recommend [creating an AARRR funnel in PostHog](/blog/aarrr-pirate-funnel), so you can track the whole user experience. 

## 2. Sign-ups
If your product includes an account creation or sign-up flow then it’s an essential event to track. If not, it’s still worth tracking whatever you’d count as an acquisition event, whether that’s an anonymous comment on your site, a new email subscription or something else entirely. 

Ideally, we recommend tracking each step of the sign-up flow separately, so you can measure the flow using a funnel insight. At PostHog, for example, we track account creation and event ingestion as two distinct events even though they’re closely linked — this helps us see where drop-offs are and if we need to make improvements. 

> 💡 **PostHog Tip:** Comparing pageviews on your site with sign-ups can help you measure your overall conversion rate. Using [a funnel insight](/manual/funnels), for example, you can measure how people progress from your homepage, to your pricing page, to a sign-up. 

## 3. Feature adoption
So, your customers have signed up. What do they do next? Answering this question is why it’s important to track feature usage, whether that constitutes a specific feature in a B2B platform or a product-discovery feature in a B2C marketplace. 

Tracking feature usage enables you to see what is catching a customers’ attention and how users find value in your platform. Armed with this information you can decide where to focus your engineering efforts, what to prioritize on your roadmap and how to give users a better experience. 

> 💡 **PostHog Tip:** Want to explore which features in a B2B product are driving user retention? Use a [retention insight](/manual/retention) to visualize which features get return users.

## 4. Payments 
If your payment events are separate from your sign-up flow, you’ll need a separate event to track purchases. This can give you a clear view of revenue trends and is vital if you offer a free product tier, so you don’t get misled by surging sign-ups which don’t bring actual revenue.

Tracking payments in PostHog also enables you to calculate several important business metrics using other events on this list, including your average basket value (ABV) and average revenue per user (ARPU). For the best results, we suggest tracking each of these on a dedicated dashboard. 

> 💡 **PostHog Tip:** Curious how users behave in the lead-up to a purchase? Use your purchase event as a filter in [session recordings](/manual/recordings) to watch videos of successful purchases (minus the payment information).

## 5. Invitations or shares
Most modern software products will enable users to share some part of it with their network, whether it’s by sharing content to social media or by inviting teammates to collaborate on a platform. Tracking this event in PostHog enables you to understand your word-of-mouth growth, which is one of the best ways to grow your product.

Referral events aren’t limited to just invitations and shares, however. Depending on your product you could consider product reviews as a replacement, or sharing content from your blog. If you have an incentivised referral program you can track referrals and acceptance separately in order to see if you need a better incentive.

> 💡 **PostHog Tip:** Does this feel like a lot of events to track? Here's [how to create new events the easy way!](/tutorials/how-to-capture-events-the-easy-way)
