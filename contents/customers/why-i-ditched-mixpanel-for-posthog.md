---
title: Why I ditched Google Analytics & MixPanel for PostHog
customer: Reciprocal.dev
logo: ../images/customers/reciprocal/reciprocal.png
featuredImage: 
featuredCustomer: true
industries:
    - Marketing platform
users:
    - Leadership
    - Engineering Team
toolsUsed:
    - Funnel analysis
    - Self-hosting
---
_This story was written by Colin Wren, Co-founder of [Reciprocal.dev](https://reciprocal.dev/)_

Why did I ditch Google Analytics & MixPanel for PostHog?

Well, it took me until I built my second product, [Reciprocal.dev](https://reciprocal.dev/), to really understand the value of analytics. I’d always thought of such tools as being an invasion of privacy and questioned the need for front-end scripts when properly configured server logs could provide the same information.

What changed it for me was reading [Lean Startup](https://en.wikipedia.org/wiki/The_Lean_Startup) and learning how customer behaviour metrics are key to performing the iterative small tweaks needed to align a product to customer needs.Instead of using analytics to count page views and traffic sources they should be used to understand and remove friction from a product for your users. 

With that new found understanding, I started looking at how we’d implemented analytics in my existing products.

### Using Google Analytics
Google Analytics had always been my go-to analytics platform, but this was just based on seeing what others used and wasn’t based on any real knowledge of the analytics space. 

In my personal opinion, Google Analytics is a mess. It’s good for quantitative metrics, but not qualitative metrics. There are two different UIs for the same data (Firebase Analytics and Google Analytics), two different versions of tracking tag to pick from (v3 and v4; some JS libraries only support v3) and the Goals feature doesn’t easily lend itself to building up a clear picture of what users are doing.

<BorderWrapper>
    <Quote
        imageSource="/images/customers/colin.png"
        size="md"
        name="Colin Wren"
        title="Co-founder, Reciprocal"
        quote={`“I’ve found PostHog to be miles ahead of the other tools I’ve tried and I’m a little miffed that I didn’t find it straight away and wasted time with MixPanel.”`}
    />
</BorderWrapper>

I was getting so little value from Google Analytics that I started to look for a secondary tool that would provide more qualitative data. I picked MixPanel because the UI looked good and it had funnel reports that allowed me to see conversions easily.

### Using MixPanel
Initially MixPanel delivered the value we had hoped for. We were able to see how our app was used, see which areas of the product weren’t converting and use that data in discussions about improvements to the product.

However, MixPanel’s free tier is very limited and only provides five saved funnels. That’s enough for you to see the value and want to pay for their services, but we found them too expensive to justify. 

So, I started looking for a self-hosted alternative. By [self-hosting our analytics](https://posthog.com/docs/self-host) we would only have to pay for the server the analytics tool was running on, which would be around $5 a month instead of the $25 MixPanel was asking for at the lowest priced tier.

### Switching to PostHog
During my research I came across PostHog. It offered the same funnel views that MixPanel did, could be self-hosted and their SaaS even offered a free tier that allowed for unlimited funnels. It was a no-brainer for us to switch.

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

After this, [building funnels in PostHog](https://posthog.com/docs/user-guides/funnels) was really easy. I used [the Funnels tool](​​https://posthog.com/docs/user-guides/funnels) to build up a sequence of events that would be triggered as a user performs actions in the app. These [insights can then be saved and used in a dashboard](https://posthog.com/docs/user-guides/dashboards), so there’s a single place to collect insights for a particular behaviour or section of the product being tweaked.

There are also tools that make it easier to track which iteration of the product events are being captured against, such as [feature flags](https://posthog.com/docs/user-guides/feature-flags) and [plugins that integrate with release management tools](https://posthog.com/integrations).

Overall, I’ve found PostHog to be miles ahead of the other tools I’ve tried and I’m a little miffed that I wasted time with MixPanel.

<BorderWrapper>
    <Quote
        imageSource="/images/customers/colin.png"
        size="md"
        name="Colin Wren"
        title="Co-founder, Reciprocal"
        quote={`“PostHog better enables us to grow our product and, with self-hosting, we're more in control of our analytics usage overall.”`}
    />
</BorderWrapper>

### How switching to PostHog worked for us
As an early stage start-up our priority is to get the most out of our tools for the lowest price possible. 

MixPanel gave us a qualitative dataset of how users were using our app, but the limitations of the free tier meant that there was very little value in the tool. It wasn’t something we could use to grow the product.

PostHog’s free tier gave us the means to build a qualitative dataset and didn’t limit us on how we dissected data. As a result, PostHog better enables us to grow the product and, with self-hosting as an option, we’re more in control of our analytics usage overall.

By moving to PostHog we’ve been able to identify significant friction points in our sign-up process and make improvements that lead to an increase in people creating an account.

_This article was written by Colin Wren, Co-founder of [Reciprocal.dev](https://reciprocal.dev/), who originally shared his experience on [Medium](https://colinwren.medium.com/why-i-ditched-google-analytics-mixpanel-for-posthog-841fa77bb8cb)._

