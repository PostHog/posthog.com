---
date: 2021-08-13
title: Cookieless Analytics - How To Track Website and App Users Without Third-Party Cookies
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: marcus-hyett
featuredImage: ../images/blog/filename.png
featuredImageType: full
---

Google has stated that they intend to deprecate the use of 3rd party cookies in 2023. But why is this important, and how will this affect product analytics?

## What are 3rd party cookies?

Cookies are small files stored on the user’s machine, helping you identify a repeat user to your product or website. This makes things like staying logged in over multiple days possible, but it also makes it possible to track whether the person who followed an ad yesterday came back today to purchase something.
3rd party cookies are a particular flavour of cookie provided by an external service and not your website directly. This external service can be a tool or marketing product that you work with to optimize ads.

## What happens when third-party cookies go away?

When 3rd party cookies are deprecated, any external tools you use in your product or website to track users - either for analytics or marketing purposes - will cease to work correctly.
Every visit to your website from the same user will look the same as a brand new user, making it difficult to attribute outcomes to your ad campaigns or understand whether a single person is avidly using your product or it’s a number of users using it casually.

## What are the alternative solutions?

It’s key to note that if people are logged into your product or website - you should still be able to track them (with any tool) - since you’ll be relying on first party cookies.
However, for anonymous users or people coming to your product or website for the first time, it’s going to be a lot harder. The key solution here is to move away from 3rd party cookies to using first party cookies, meaning you’ll need to host the tracking service so it comes from your domain and not the website of an external tool.

## What is PostHog’s approach?

At PostHog, we’ve built a suite of product analytics tools which you can host on your own domain, enabling you to deploy first party cookies that will let you keep tracking anonymous user effectively even after 3rd party cookies are deprecated.

## 2023 is a long way out, why should I do something about this today?

Safari started blocking 3rd party cookies back in 2017 and they account for 19% of internet traffic, so you’re likely already having a degraded analytics experience for Safari users if you rely on 3rd party cookies. It’s better to start putting backup systems in place early to avoid such outcomes.
One other benefit of starting early is that ad blockers focus on 3rd party cookies as a way to restrict ads and tracking, which can significantly corrupt the results you get in your analytics. Moving to a first party cookie approach today lets you continue getting high quality tracking for users who install ad blockers.

Deploy a [free self-hosted version of PostHog](https://posthog.com/signup) today.

_Loved this? Subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._
