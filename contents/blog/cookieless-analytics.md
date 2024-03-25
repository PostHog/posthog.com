---
date: 2021-08-23
title: >-
  Google is about to make it a lot harder to track website and app users without
  third-party cookies
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - marcus-hyett
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/cookieless-analytics.png
featuredImageType: full
category: General
tags:
  - Privacy
---

Google [says](https://blog.google/products/chrome/updated-timeline-privacy-sandbox-milestones/) they intend to deprecate the use of third-party cookies in 2023. But why is this important, and how will this affect product analytics?

## What are third-party cookies?

Cookies are small files stored on a user’s machine, helping you identify a repeat user to your product or website. This makes things like staying logged in over multiple days possible, but it also makes it possible to track whether the person who followed an ad yesterday came back today to purchase something. 

Third-party cookies are provided by an external service and not your website directly. This external service can be a tool or marketing product that you work with to optimize ads.

## What happens when third-party cookies go away?

When third-party cookies are deprecated, any external tools you use in your product or website to track users - either for analytics or marketing purposes - will stop working correctly. Every visit to your website from the same user will look like a brand new user, making it difficult to attribute outcomes to your ad campaigns or understand whether a single person is avidly using your product or many people use it casually.

## What are the alternative solutions?

It’s key to note that if people are logged into your product or website - you should still be able to track them (with any tool) - since you’ll be relying on first-party cookies. However, for anonymous or first-time visitors to your product or website, it’s going to be a lot harder. The key solution here is to move away from third-party cookies to using first-party cookies, meaning you’ll need to host the tracking service from your domain.

## What is PostHog’s approach?

At PostHog, we’ve built a suite of product analytics tools which you can host on your own domain, enabling you to deploy first-party cookies that let you keep tracking anonymous users effectively.

## 2023 is a long way out - why should I do something about this today?

Safari started blocking third-party cookies back in 2017 and they account for 19% of internet traffic, so you’re likely already having a degraded analytics experience if you rely on third-party cookies for Safari users. It’s better to start putting backup systems in place early to avoid such outcomes. One other benefit of starting early is that ad blockers focus on third-party cookies as a way to restrict ads and tracking, which can significantly corrupt the results you get in your analytics. Moving to a first-party cookie approach lets you continue getting high quality tracking for users who install ad blockers.

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />
