---
date: 2022-04-27
title: Introducing the Avo Inspector app
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: PostHog news
tags:
  - Product updates
---

We're excited to announce that we have launched a new app with [Avo](https://www.avo.app/), a leading data governance platform which enables you track data consistently and scalably across multiple platforms. 

Connecting PostHog to Avo is great if, for example, you're worried about data going missing due to naming issues or because event details aren't reliably maintained. 

The new app, which is available immediately for users on PostHog Cloud or self-hosted deployments, works by streaming event schema (but _not_ event data) to the Avo Inspector as it is ingested. Once the app is connected, Avo reads the event schemas we send so that you can monitor the quality of your tracking without any code changes and without exposing any user info. Simple.

The app is maintained by PostHog - [check the repo here](https://github.com/PostHog/posthog-avo-plugin) - but we recommend checking out [Avo's documentation](https://www.avo.app/docs/workspace/connect-inspector-to-posthog) to learn more about how to setup the connection quickly. You can even check the Loom below where Avo demonstrates how to setup the connection in less than 90s! 

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/7601e527e64e4d48855de25c3ee25028" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
<br/>

We recently got the chance to meet the Avo team in Iceland at our last PostHog offsite, so we're delighted to have been able to work together on this app so quickly. We're also interested to hear your feedback as always, so [let us know what you think](https://app.posthog.com/home#supportModal)

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_

