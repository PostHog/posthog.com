---
date: 2020-07-30
title: The ethics of open source product analytics
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
---

A topic that strikes fear into the hearts of many working on open source projects - telemetry. So much so, I was a little nervous about writing this piece!

## A framework for considering what is ethical

### Duty-based ethics

Morality is based on duty. That means that the measure of morality isn't the outcome of an act, but is rather based on the intention of the act itself.

Stealing a packet of chips to save your child from starving would be considered wrong under duty-based ethics. Lying to save your friend from a murderer? Tut tut.

### Utilitarian-based ethics

Moral behavior means opting for the greatest common good. An act is moral if it increases the happiness or decreases the misery of the greatest number of people. The results are the measure of moral behavior, not the intent.

Stealing those chips? Go for it.

## So, is it ok for open source projects to track users?

Open source projects are zero expectation - they may contain bugs, security risks, or have confusingly outdated documentation. Remember that time you lost hours on a project that just didn't work in the first place?

The fact it's acceptable for open source software not to work is a _great_ thing - it makes it easier for anyone to contribute. Mistakes, or half-baked projects included. You can't have innovation without a lot of people being able to contribute and make mistakes, or give up.

From a utilitarian perspective, we believe that tracking the minimum data possible to build useful technology, in a way that doesn't share that data with 3rd parties, means that you have the right approach to product analytics in your open source project.

From a duty-based perspective, we'd argue that transparency is key to covering intent. Since most people won't assume they're being tracked, that means being upfront in the docs and not relying on people digging through your code.

## Minimizing your tracking

### What you track

The first step is to work out how much, if anything, you really need to track.

#### Nothing

Nada, zilch. You've no idea what's going on.

If you're building it for fun, for yourself only, or to get better at a particular technology, then we don't think putting extra tracking in makes much sense.

In fact, you'll struggle not to get some sense of popularity - issues or GitHub stars, and the basic stats (clones / repo visits) that GitHub provides if that's your preferred place to put code!

#### Aggregated tracking

This helps you validate if the concept of your project is valuable - do people install your thing? Do they actually use it at all?

It also means you can get a sense of the setup flow. Can anyone work out how to implement things? At PostHog, early on, we tracked if people were able to get through the setup process. Many didn't, so we've kept tweaking it - and we still have work to do here :)

Unfortunately, you cannot work out the unique users, which means repeat visitors are likely to skew your statistics and understanding. You could just have one person manically refreshing things!

#### Anonymized user tracking

This gives a much stronger signal than the above. It means you'll probably need to start using cookies.

It allows you to see if people who started using the product are coming back, and which parts of the product they're returning too.

#### Full user tracking

Asking permission and not doing this by default feels like the only acceptable way.

Tracking the actual users can really help understand the kinds of companies, and it means you can message them to find out more.

If you're building a company around a project, then this is very likely to become important to you.

Some users are happy to be tracked in return for a great project, but we think this is unacceptable invasive by default and you must ask permission up front. Let alone, GDPR, CCPA and those other privacy based laws that are appearing.

### How you track it

#### First party tracking is easier than ever

An easy step to minimizing the cost to your users of tracking them, is not to use third party software to do this. The great news is that you've several choices here.

Historically, we've seen people setting up a data pipeline, data lake, and some sort of dashboarding tool like Metabase. This means you can manage all of the user data yourself, whilst understanding behavior within your product. That gives you a powerful setup, but it means integrating and setting up several pieces of software that aren't particularly inviting for non technical users.

We built PostHog for this reason. It means you can grab everything you need to do event-based analytics, designed to track a product's use, on your own infrastructure. You can choose to send or not send personal data to your instance too. Given you've full access to the code and database, you can also plugin things like Metabase or your data lake if you need them :) There are some less product focussed, more website-based analytics libraries that are also pretty cool - Matomo or Plausible are definitely worth a look depending on your use case.

There are many third party SAAS tools (Amplitude/Mixpanel/Heap) that help with this use case, but you will need to send data to them to use them.

## How this influenced our approach

It's easy to think the two ethical methods outlined here are contradictory.

For example, being transparent about your use of tracking may reduce adoption, which could harm your ability to build more stuff.

In our case, PostHog usually doesn't know who individual users are since most people opt out of sharing this with us when they install the product. If we did, and those users were at huge corporations, then we'd find it easier to raise more money, to hire more engineers, to build more cool stuff for the world. 

However, we knew when we started that PostHog's [open source library](https://github.com/posthog/posthog) would be designed for developers to use.

With that in mind, we felt we'd get a better and happier community by thinking about the intent of the action of tracking and not just trying to sneakily track as much as possible to tell the best short term VC story about adoption. Developers are, after all, some of the most sensitive people about how data is tracked, since we are the people dealing with data all of the time.

For PostHog, that meant being up front about what we track and what we don't track, and giving users the choice if they opt themselves into full user tracking. Most don't, and that's ok!