---
date: 2023-03-17
title: Building a new feature end-to-end
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - yakko-majuri
category: Engineering
tags:
  - Guides
  - Product engineers
---

Having spent most of my time during the past few years working deep in our backend, I recently found myself building out a new client-facing feature ([sampling](/manual/sampling)) end-to-end.

Doing so gave me a renewed perspective on what a the process for shipping new features should look like, so I thought I'd share a bit about how things went. Hopefully I can provide some insight on how to approach building something new and seeing it all the way through to the end - having it live and with usage!

## Should we build this?

We had an intuition that sampling was a valuable feature to have, and so we felt the need was "obvious". 

However, particularly in a startup context, you shouldn't always build something that will "obviously have a benefit", at least not _now_. It's all about tradeoffs - how much of a benefit will this bring? At what cost?

So I got to benchmarking.

I pulled some real queries from large customers in production and ran them with and without sampling to see what impact sampling would have. 

And turns out, it had a great impact. 

My initial testing was done with an arbitrary sampling rate of 10% and that led to speed improvements between 3-10x for our largest customer's queries, with accuracy deviating from the real results by only 1-2%. 

In some ways, this proved the obvious: sampling techniques help speed things up a ton and generally produce very accurate results when the dataset is large enough.

However, it guaranteed to us that:

* **This will actually work:** we rely on ClickHouse for sampling and while I ❤️ ClickHouse, it's not uncommon to run into bugs when trying out some of its features
- **This was worth doing, now:** the impact of doing this would be huge for our largest customers, and our customers are large enough such that sampling doesn't bork the results

## v0

Having decided this should be built, the process for getting "clearance" to work on it at PostHog is pretty straightforward. 

I declared "I'm working on this" and explained why (see previous section) and nobody challenged me. So I was off.

At PostHog we [empower engineers to move _very fast_ early on](/handbook/engineering/product-design), so there's very little process for getting experimental features in front of a few users. In many cases, it's OK to only loop in Product and Design a little bit later.

Thus, the first thing I did was set up a [feature flag](/docs/feature-flags/manual) that was only enabled for our organization and then picked one insight type to work on (lifecycle was easiest), updated the API, built a quick UI (not much of a UI for sampling anyway) and shipped it.

And that's how it went for the most part. The feature wasn't widely released, so I changed the API and UI at will and shipped many PRs with promises to revisit certain nits later (trust me, I did). This meant I moved extremely fast, and often within hours of writing up sampling support locally for an insight I was testing it out in production with production data. 

## v0.5

With a few insights supporting sampling, I then started to polish things a bit more. I asked our team to try out the feature, wrote some docs, and had a chat with our Head of Product Luke about what sampling should look like, how it should feel, etc. I also started to take Michael's UI feedback more seriously :D

Having the docs early on was important, because it helped me scope out certain aspects of sampling more clearly, allowed our team to understand the feature better, and ensured it was ready to be turned on for customers in a second.

But wasn't this only an internal feature at this point? 

Indeed it was, but besides it being best practice to have some docs ready, we're generally very open with our customers about getting them on early tester programs - even when things are still quite rough - if we feel that we might be able to improve their experience a bit. This is also a fantastic way to get real feedback early on. 

So soon enough, our support hero started tagging me in a few places where they felt sampling might help our customers out. Through this, we were both able to improve the experience for customers without having a feature fully ready, as well as we found new use cases for it that I hadn't thought of (e.g. sampling for experiments results, sampling on the toolbar).

This is another reason why feature flags are so powerful: if a user requests access to a feature we're just testing out, it takes a few seconds to get it enabled for them.


## v1 (Beta)

Throughout the process, I made sure to demo the new things I was building at all-hands and by sharing demo videos on Slack, while constantly asking for feedback. The simple UI for the sampling selector changed four times, but ultimately we got to a state we were happy with. Things weren't perfect (the notice on dashboard panels still isn't great) but we we were happy putting this in front of users.

I set up some instrumentation to track the feature's usage (share image of data we can share) and updated the feature flag to be rolled out to 25% of all organizations in PostHog. 

As for analyzing usage and iterating, here's what my flow looks like now:

- I keep key metrics in a dashboard and dig into them a few times a day
- I watch session recordings of the feature being used to see if it's having the intended impact or causing any confusion (I've fixed a few visual regressions as a result of this)
- I'm using an internal feature flag-based system we built to show a prompt calling for a user interview for the users that have tried sampling
- The more confident I get that things aren't broken, I increase the rollout percentage a bit more on the flag and start from the top again


