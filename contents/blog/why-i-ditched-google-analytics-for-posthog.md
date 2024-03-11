---
date: 2022-05-26
title: Why I ditched Google Analytics and Mixpanel for PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-engineering-blog.png
author:
  - colin-wren
category: General
tags:
  - Comparisons
---

_By Colin Wren, Co-founder of [Reciprocal.dev](https://reciprocal.dev/)._

It took me until I built my second product, [Reciprocal.dev](https://reciprocal.dev/), to really understand the value of analytics. I’d always thought of such tools as being an invasion of privacy and questioned the need for front-end scripts when properly configured server logs could provide the same information. But, after learning how customer behaviour metrics are key to performing the iterative small tweaks needed to align a product to customer needs, I took a second look at how analytics were used in my existing products.

Until this point, Google Analytics had always been my go-to analytics platform. This wasn’t based on any real knowledge of the analytics space. I just used it because I knew that others did.

In my opinion though, Google Analytics is a mess. It’s good for quantitative metrics, but not qualitative metrics. There are two different UIs for the same data (Firebase Analytics and Google Analytics), two different versions of tracking tag to pick from (v3 and v4; some JS libraries only support v3) and the Goals feature doesn’t easily lend itself to building up a clear picture of what users are actually doing.

<BorderWrapper>
    <Quote
        size="md"
        quote={`“I’ve found PostHog to be miles ahead of the other tools I’ve tried and I’m a little miffed that I didn’t find it straight away and wasted time with Mixpanel.”`}
    />
</BorderWrapper>

I was getting so little value from Google Analytics that I started to look for a new tool that would provide more qualitative data. I picked Mixpanel because the UI looked good and it had funnel reports that allowed me to see conversions easily.

### Switching from Mixpanel to PostHog
Initially Mixpanel delivered the value we had hoped for. We were able to see how our app was used, see which areas of the product weren’t converting and use that data in discussions about improvements to the product. However, Mixpanel’s free tier is _very_ limited and only lets you create five funnels. They want you to pay for their services, but we found them too expensive to justify. 

So, I started looking for a [Mixpanel alternative](/blog/best-mixpanel-alternatives) we could self-host. By [self-hosting our analytics](/docs/self-host) we would only have to pay for the server the analytics tool was running on, which would be around one fifth of the cost of Mixpanel's lowest pricing tier. We would also have more control over our user data. 

During my research I came across PostHog. It offered the same funnel views that Mixpanel did, could be self-hosted and even offered a free tier that offered unlimited funnels. It was a no-brainer for us to switch.

Moving to PostHog required a few changes in our codebase, but because I’d abstracted the analytics events into a single function I only had to update that function and the analytics initialization. I used an options object which allows custom event data to be defined, which can then be used to filter out events or to tailor reports:

```
export function recordEvent(eventName: string, options: AnalyticsOptions): void {
  if (getAnalyticsConsent()) {
-    ReactGA.event({
-      category: 'User',
-      action: eventName,
-      ...options,
-    });
-    mixPanel.track(eventName);
+    posthog.capture(eventName, options)
  }
}
```

After this, [building funnels in PostHog](/docs/user-guides/funnels) was really easy. I built a sequence of events trigger as a user performs actions in the app and [saved these insights into a dashboard](/docs/user-guides/dashboards) so there would be a single place to collect insights for a particular behaviour or section of the product.

There are also tools that make it easier to track which iteration of the product events are being captured against, such as [feature flags](/docs/user-guides/feature-flags) and [apps that integrate with release management tools](/integrations). Overall, I’ve found PostHog to be miles ahead of the other tools I’ve tried and I’m a little miffed that I wasted time with Mixpanel.

<BorderWrapper>
    <Quote
        size="md"
        quote={`“PostHog better enables us to grow our product and, with self-hosting, we're more in control of our analytics usage overall.”`}
    />
</BorderWrapper>

### How switching to PostHog worked for us
As an early stage start-up our priority is to get the most out of our tools for the lowest price possible. Mixpanel gave us a qualitative dataset of how users were using our app, but the limitations and cost meant there was very little value in the tool. It wasn’t something we could use to grow the product.

PostHog gave us the means to build a qualitative dataset and didn’t limit us on how we dissected data. As a result, PostHog better enables us to grow the product and, with self-hosting as an option, we’re more in control of our analytics usage overall. By moving to PostHog we’ve been able to identify significant friction points in our sign-up process and make improvements that lead to an increase in people creating an account.

_This article was written by Colin Wren, Co-founder of [Reciprocal.dev](https://reciprocal.dev/), who originally shared his experience on [Medium](https://colinwren.medium.com/why-i-ditched-google-analytics-mixpanel-for-posthog-841fa77bb8cb). It is shared here with his permission._

<ArrayCTA />
