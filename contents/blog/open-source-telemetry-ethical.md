---
date: 2020-09-29
title: Should open source projects track you?
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: General
tags:
  - Open source
---

Many open source projects now track their usage in some way, shape, or form.

So much user tracking is horrible. It's usually buried deep in the legalese of a size 8 terms and conditions policy, and kept intentionally vague.

*All tracking is bad*, many say. We disagree. Done right, it enables more and better software in the world. When it's applied to open source, it often enables more free software for anyone to use.

That said, it is a topic that has to be approached with extreme caution. It is an ethical and business minefield - if you're working on open source, how do you decide what's ok?

## An ethics framework

Well, it seems a good starting point is to define what is ethical. It turns out, there are two main approaches, broadly accepted today:

### Duty-based ethics

This approach defines morality as being based on duty. That means that the measure of morality isn't the outcome of an act, but is rather based on the *intention* of the act itself.

Stealing a packet of chips to save your child from starving would be considered wrong under duty-based ethics. Lying to save your friend from a murderer? Those would be considered wrong with this way of thinking.

### Utilitarian-based ethics

In this case, moral behavior is whatever generates greatest common good. An act is moral if it increases the happiness or decreases the misery of the greatest number of people. The results are the *outcome* of moral behavior, not the intent.

Stealing those chips? Go for it.

## So, is it ok for open source projects to track users?

Open source projects are based on the concept of "zero expectations". This means they may contain bugs, security risks, or have confusingly outdated documentation. Remember that time you lost hours on a project that just didn't work in the first place?

However, the fact it's acceptable for open source software not to work is a _great_ thing. This makes it easy for anyone to contribute because there are no hurdles from what your work must include or not include - it's up to you. Mistakes, or half-baked projects included. You can't have innovation without a lot of people being able to contribute and make mistakes, or give up.

From a utilitarian perspective, we believe that tracking the minimum data possible to build useful technology, in a way that doesn't share that data with 3rd parties, means that you have the right approach to product analytics in your open source project.

From a duty-based perspective, we'd argue that transparency is key to covering intent. Since most people won't assume they're being tracked, that means being upfront in the docs and not relying on people digging through your code.

## Sorting the good from the questionable

First of all, open source is exactly that. That's a big step up from SAAS - you can immediately inspect the code or run it on a computer with no internet connection if needed. However, the precise function of the telemetry has user implications.

### What is being tracked

The first step is to think about how much, if anything, a project really needs to track.

#### Nothing

Nada, zilch. 

If an open source project exists for fun, for one person only, or to get better at a particular technology, then we don't think putting extra tracking in makes sense.

In practice, however, it's pretty much impossible not to track more than you need in this case.

If a project is hosted on GitHub, it automatically provides basic stats (clones / repo visits) for all repos.

#### Aggregated tracking

This helps projects validate if the concept of what they're working on is valuable - do people install it? Do they actually use it at all?

It also means they can get a sense of how accessible their software is by looking at how many people work out how to use it. At PostHog, early on, we tracked if people were able to get through the setup process. Many didn't, so we've kept tweaking it - and we still have work to do here :)

With aggregated tracking, a project cannot by definition identify unique users. This means repeat visitors are likely to skew the statistics, and therefore, the understanding of user behavior.

#### Anonymized user tracking

This means not knowing *who* users are, but having a user id against their profile.

This gives a much stronger signal than the above. It means you'll probably need to start using cookies or some way of obfuscating the user id from their behavior.

It allows projects to see if people who started using the product are coming back, and which parts of the product they're returning too.

#### Full user tracking

Asking permission and not doing this by default feels like the only acceptable way from a user perspective.

Tracking the actual users can really help understand the kinds of user profiles that find the software valuable. For example, is the project used by those at big companies, or with certain job roles? Those things help inform product decisions. If a project is part of an open source company, then this is very likely to be of critical importance to them. Your project is easier to make more valuable if it's tailored to its users better.

Some users are happy to be tracked personally in return for a great project, but we think in most cases that this is unacceptably invasive by default, and it's important to ask permission up front. Let alone, GDPR, CCPA and those other privacy-based laws that are appearing.

## It's not just the data, it's how the tracking works too

An easy step is not to use third party software to do this.

We built PostHog for this reason. It means you can grab everything you need to do event-based analytics, designed to track a product's use, on your own infrastructure. You can choose to send or not send personal data to your instance too. Given you've got full access to the code and database, you can also plug in things like Metabase or your data lake if you need them. There are some less product-focused, more website-based analytics libraries that are also pretty cool - Matomo or [Plausible](/blog/posthog-vs-plausible) are definitely worth a look, depending on your use case.

There are many third party SaaS tools (Amplitude/Mixpanel/Heap) that can provide tracking, but a project would have to send user data to them to use them, we think hence why they're rarely (ever?) seen in the open source world.

## How this influenced our approach

It's easy to think the two ethical methods outlined here are contradictory.

For example, being transparent about your use of tracking may reduce adoption, which could harm your ability to build more stuff.

In our case, PostHog usually doesn't know who individual users are since most people (90%) opt out of sharing this with us when they install the product. If we did, and those users were at huge corporations, then we'd find it easier to raise more money, to hire more engineers, to build more cool stuff for the world. 

However, we knew when we started that PostHog's [open source library](https://github.com/posthog/posthog) would be designed for developers to use.

With that in mind, we felt we'd get a better and happier community by thinking about the intent of the action of tracking and not just trying to sneakily track as much as possible to tell the best short term VC story about adoption. Developers are, after all, some of the most sensitive people about how data is tracked, since we are the people dealing with data all of the time.

For PostHog, that meant being up front about what we track and what we don't track, and giving users the choice if they opt themselves into full user tracking. Most don't, and that's ok!

<NewsletterForm />
