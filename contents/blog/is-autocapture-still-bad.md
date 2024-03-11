---
date: 2022-07-25
title: Is autocapture ‘still’ bad?
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - joe-martin
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: General
tags:
  - Explainers
---

Is autocapture bad? Has it ever been good? Earlier this year Amplitude posed these questions in a blogpost by Product Evangelist Adam Greco. Yes, he said, ‘[Auto-track is still bad](https://amplitude.com/blog/autotrack-is-bad)’ – and he went on to explain the four main reasons why.

Unlike Amplitude (which requires manual instrumentation), PostHog offers both. You can [track custom events manually](/tutorials/event-tracking-guide), you can use autocapture, or you can use a mixture. We’ve long thought this approach is best because it offers teams more flexibility and choice, so we were naturally curious about the arguments against this approach.

So, why does Amplitude think it’s better to give users a more limited product? In the article there are four main arguments against autocapture:

1. Autocapture means you capture more data. Too much data, in Amplitude’s opinion.

2. Changes to your product will cause autocapture to track bad data, creating a lack of trust in your analytics.
 
3. Autocapture doesn’t save time, because it creates more work for analysts and product managers.
 
4. Autocapture may accidentally capture sensitive or private data. 

Let's tackle these arguments one by one. 

## 1. Autocapture creates information overload

To quote Tony Stark: “An intelligence agency which fears intelligence is, historically, not awesome.” 

Yes, too much data can make it hard to separate the signal from the noise, but that’s why it’s important to have the correct tools at your disposal. Too much data is only an issue if you’re unable to interrogate data effectively, or don’t know what you’re looking for. 

A well-designed product analytics platform that is shaped by user feedback will enable you to sort the wheat from the data chaff easily. Especially when the [infrastructure is designed to function at scale](https://posthog.com/blog/clickhouse-announcement).

Also, what's the alternative here? Having less data because you can only track the handful of data points you've planned for in advance? That sounds far less appealing.

## 2. Autocapture creates bad data

Amplitude argues autocapture means you need someone to police and clean the data. This may have been an issue for teams in the past, but with modern tools it’s possible to simply give users the information they need instead. 

At PostHog, we do this through our [Data Management suite](/docs/user-guides/data-management), which lets you to add tags, descriptions and more to every event you track — whether autocaptured or not. At a glance you can see when an event has been created,  modified, deleted or gone ‘stale’.

The article also raises the point that someone may make changes to your product which throw off your data without your knowledge. However this isn’t a risk that’s exclusive to autocapture, as it can happen with manual instrumentation as well. Ultimately, no analytics platform can protect your codebase from rogue engineers!

## 3. Autocapture takes the same/more time

Amplitude suggests that autocapture saves time for product managers because they don’t need to plan which events to track in advance, but it creates more work for analysts who need to deal with the extra information. 

But the article neglects to mention the opposite is also true: manual instrumentation saves time for data quality teams, but creates more work for product managers and engineers. 

Manual instrumentation also takes longer to implement initially and can have an opportunity cost when you realize, three months in, that you’re not tracking all the data you need. 

In either case, the optimum approach isn't one or the other – it's both. Autocapture to get you started quickly with a minimum overhead, but with manual instrumentation for the nitty gritty where you need to invest more time.

## 4. Autocapture isn’t secure enough

At last, something we agree on. Sort of. 

In theory, autocapture definitely creates a risk of accidentally capturing private data — so it’s something we take incredibly seriously. It’s why we made PostHog’s autocapture very selective about the data it captures from any user inputs, only collecting the `name`, `id`, and `class` attributes from `input` tags. Nothing more. 

It's also why PostHog offers the option to self-host your analytics so that user data never leaves your control, offers information about [how to remain HIPAA compliant](/docs/privacy/hipaa-compliance), and enables you to automatically filter unwanted information before it is ingested. 

If security and user privacy are concerns, whether because of HIPAA regulations or personal principle, PostHog offers a number of ways to protect your users.

## So, is autocapture ‘still’ bad?

Amplitude repeatedly argues that autocapture is bad and that the correct approach is to create an exhaustive list of data to track in advance, then manually tracking those events only.

But how many of us have perfect foresight and can accurately predict the needs of so many, so far in advance, for example? What opportunities are lost in the meantime? What happens when circumstances change, or someone asks a question you didn’t anticipate? What about fast-moving businesses where the needs of teams are likely to change regularly?

As [one of my colleagues puts it](https://github.com/PostHog/posthog.com/issues/3593#issuecomment-1160197161): “Manual instrumentation is for the world we wish existed; autocapture is for the world that actually exists.”

Again, this is why PostHog offers both — because different teams need different solutions. Autocapture is best for some, manual is best for others and, for most, a mixture of both is preferable. Ultimately, it’s only by understanding and adapting to these needs that anyone, including PostHog, can build the best product. 

It’s ironic that Amplitude doesn’t realize that. 
