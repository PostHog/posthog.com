---
date: 2021-04-30
title: How we monetized our open source devtool
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - mo-shehu
tags:
  - Open source
  - Startups
---

So, you’ve decided to build an open-source product.

While your choice is highly commendable, the resounding applause from devs on GitHub and Hacker News won’t pay the bills. At some point, you’ll need to monetize your product to sustain its development (and your team) in the long run.

Just one thing: **you need to build a community.**

<iframe src="https://giphy.com/embed/OF0yOAufcWLfi" width="480" height="238" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>

Open-source requires a decently-sized, highly engaged community for any business model to work. People have to believe in your solution enough to contribute code, comments, or cash to it. If money is a priority for your business, open-source might not be the path for you.

At PostHog, we’ve been fortunate enough to build an engaged community of contributors over the years, and we celebrate our top contributors with each new release. You can check out our [contributor page](https://posthog.com/contributors), see our [GitHub repo](http://github.com/PostHog/), and join our [Slack community](https://posthog.com/slack) of users.

Let’s now look at how we’ve managed to turn a buck with PostHog over the past few months — plus 3 other business models to explore for your own product.	

## Option #1: Support
Support involves helping large companies deploy, use, maintain, and upgrade your software. These companies usually lack the time, expertise, or inclination to do all that by themselves, and as the developer, you’re in a better position to tailor the deployment to their specific situation, deploy updates as needed, and extract a lot of value.

The downside is that support-based open source business models tend to return lower margins. This is fine if you’re bootstrapping, but trying to raise VC money becomes a [schlep](https://www.google.com/search?q=schlep) as VC firms generally prefer high-margin startups.

At PostHog, we started with the support model before running into one problem: developers typically want to wrangle your software themselves before paying for help or maintenance. 

<iframe src="https://giphy.com/embed/pVsn5LJEgMKxa" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

This makes it a hard sell, but you can overcome this if you have more ‘clout’ by being a large project with hundreds of contributions and thousands of commits. [RedHat](https://www.redhat.com/en) is a good example of a support-based open source company.

## Option #2: Hosted vs. Self-Hosted
With this option, you offer users the option to either host your product on their own servers or host it on yours. The value prop is similar to that of the support model: companies don’t want the hassle of hosting your product themselves and are willing to pay you for it. The benefit here is that you only have to maintain one edition of your product, which makes it easier and more financially feasible to plan your roadmap and hire a smaller team.

The downside of the hosted model is that it’s not very defensible. You’ll likely face competition from hosting providers who simply host your free edition and charge their users for extra value-adds, cutting you out of the deal completely. 

<iframe src="https://giphy.com/embed/j4ksBQ70a3ECh2VObN" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

The hosting business model is also much harder to pull off without a solid, popular product. [MongoDB](https://www.mongodb.com/) and [Sentry](https://sentry.io) are two examples of products that lets you self-host or host with a 3rd party provider.

## Option #3: Open core
This option requires you to build and maintain two editions of your product: the open-source edition (under an MIT or Apache-type license), and a ‘source-available’ edition with features designed for larger businesses. Your customers can deploy the source-available edition on their own infrastructure, but they need to pay you to use those added features. This is the approach that PostHog uses; you can access our [community edition](http://github.com/PostHog/) on GitHub.

The major advantage of this approach — and one of our biggest selling points — is that you don’t need to process user data through 3rd parties. This makes it easier to gain adoption in larger companies that hold data privacy as a core part of their ethos.

<iframe src="https://giphy.com/embed/3HELB2Qwfu9dV1ZGYY" width="480" height="282" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>


The downside is that you have to build and maintain two editions of your product: the community edition and the source-available edition. This means hiring a larger, costlier engineering team and possibly raising venture capital at the start to fund your operations. Due to these factors, it might take longer for you to get to revenue. And because you’re maintaining two editions of your product, you’ll need to clearly indicate which features contributors can work on and which ones are off-limits.

At PostHog, we launched a (paid) hosted edition first before moving to an open-core model and allowing self-hosting. Many other companies are experimenting with the concept of ‘buyer-based open core,’ which means that you [charge differently](https://www.heavybit.com/library/video/commercial-open-source-business-strategies/) for features depending on who cares the most about them. Company executives always want more functionality and tend to be less price-sensitive than, say, a developer or individual contributor, so there’s more room to expand your codebase and make money. The downside is that it takes a lot of work to separate your open-source code from your proprietary code.

<iframe src="https://giphy.com/embed/9Y74y9h95QBizsNfd8" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

## Option #4: Donations
This approach is great if you created your product as a hobby and are fine with earning a minimal amount of money each month to cover small expenses. It quickly becomes unfeasible if you want to maintain an entire engineering team on donations. You can enjoy quite a bit of success going the donation route if you have a stellar product, but these are outliers and shouldn’t be used as revenue benchmarks. Besides, if you already have a great product that’s raking in donations, you probably shouldn’t be reading this post.

<iframe src="https://giphy.com/embed/3o6Zt3OhbsQ5VLPmBW" width="480" height="338" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

## Pick what works for you

There are many ways to monetize open-source software, and the approach you choose will depend on how much maintenance you’d like to take on, how large a team you’d like to assemble, and how much money you’re looking to raise — whether in organic revenue or through venture capital. Whichever approach you take, focus on building an outstanding product and an engaged community at all times, as those advantages accrue to you indefinitely.
