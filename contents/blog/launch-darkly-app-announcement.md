---
date: 2022-06-27
title: Introducing PostHog’s LaunchDarkly connector
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Release notes", "Product updates"]
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
---

We’re excited to announce that today we have released a new app which enables PostHog to connect with LaunchDarkly, the world’s leading feature management platform. Trusted by organizations such as Square, AMC and Adidas, LaunchDarkly enables product delivery teams to ship new ideas without the risk of breaking things. It does this through feature flags. 

“Wait a minute,” we hear you say, “doesn’t PostHog already have [feature flags of its own](/product/feature-flags)?”

Yes, it does. However, we think that the best tool is often the one you know how to use and that there is therefore tremendous value in integrating with an existing tech stack. That’s why this app exports actions — such as toggling a feature flag —  from LaunchDarkly and into PostHog, so you can analyze it like any other event. 

Curious if a feature flag is causing issues, impacting conversion or affecting user paths? Now you can find out in PostHog by using tools such as Trends, Funnels, Paths and more.

The LaunchDarkly app was made by new team member Emanuele Capparellin and, like everything else we make, is completely open source — so you can check [the repo](LINKHERE), as well as [the documentation](LINKHERE). You can also find out more via [LaunchDarkly’s integration documentation](https://docs.launchdarkly.com/integrations).

The LaunchDarkly app is available now for both PostHog Cloud users, and self-hosted instances — and we’d love to know what you think in [the PostHog Slack](/slack)!

</arrayCTA>
