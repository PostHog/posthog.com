---
date: 2022-05-09
title: PostHog vs Amplitude
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
author: ["andy-vandervell", "joe-martin"]
categories: ["Guides", "Open source"]
---

PostHog and Amplitude are both product analytics tools. They tell you how people are using your product, not just where they come from, and help you find ways to make your product better.

But we think PostHog is a more powerful tool for building better products. Not only does offer more features and tools for engineers to understand their users, it's an open platform that you can self-host and customize for your needs.

## How is PostHog different from Amplitude?

Let's start with the core differences. Over 9,000 companies already use PostHog, and many have switched from Amplitude. Here are a few reasons why.

### 1. It's open source
Our MIT License isn’t just for show. You can access [our source code](https://github.com/PostHog/posthog), raise your own issues and PRs, and use it to [build your own plugins](/docs/plugins/build) or even add extra functionality. You also benefit from the work of other teams who build their own plugins. And we're not just an open-source tool; we're an open-source company. Our [company handbook](/handbook) is open to everyone, as is [how we pay people](/handbook/people/compensation).

### 2. It's built for engineers
Unlike Amplitude, PostHog is built for software developers. PostHog autocaptures events, so you don't need to waste time instrumenting events every time you update your app or website. Our pricing is transparent, and we're entirely self-serve. You can setup PostHog and start paying us without ever speaking to a sales rep, but we have an [awesome customer success team](/signup/self-host/get-in-touch?plan=scale&demo=scale#demo) if you have questions.

### 3. You control your data
You can self-host PostHog and keep total control of your data. That means no third-party cookies, no data sharing, and straightforward [GDPR](/docs/privacy/gdpr-compliance) and [HIPAA compliance](/docs/privacy/hipaa-compliance). We also offer [PostHog Cloud](/pricing#cloud) for those who prefer a fully-managed SaaS experience, while partners like [Altinity](/marketplace/altinity) can manage a self-hosted instance on your behalf.

<ArrayCTA /> 

## Amplitude vs PostHog feature comparison

## Strengths of PostHog 

### Integrated session recording
While Amplitude and PostHog share many features, PostHog has [Session Recording](/product/session-recording) built into all editions of PostHog, including PostHog Open Source. 

Session recording is an incredibly powerful tool for understanding what people are actually doing in your product. The tight integration within PostHog means you can go from viewing a funnel insight to watching real users interact with the funnel, making it easy to diagnose problems and find solutions.

Amplitude doesn't have session recording, so you have to run a third-party tool like Hotjar or FullStory as well – an added expense that lacks the tight integration afforded by a built-in app.

### Experimentation and Feature Flags

All paid plans of PostHog include our Experimentation suite, while feature flags and session recording are no additional cost features on all versions of PostHog, including [PostHog Open Source](/signup/self-host).  

Amplitude doesn't include feature flags or experimentation by default, instead bundling them as part of a separate product, Amplitude Experiment. Like all Amplitude products, Experiment is a price on application only product. 

### Transparent pricing

All versions of PostHog are transparently priced – even the [Enterprise version](/pricing), which adds single sign-on, team training, instance monitoring, and more. Paid tiers (excluding Enterprise) are free up to 1 million events per month, and [pricing calculators](/pricing#cloud) show exactly how much you'll pay when you go over 1 million. The more you use, the cheaper it gets per event.  

Amplitude is strictly price on application.

### Hosting flexibility and privacy

PostHog offers the option to either self-host your analytics or use a managed cloud service, whereas Amplitude is strictly a cloud-only platform. While self-hosting isn't for everyone, it's often the best solution for a number of use cases. 

Cloud platforms are incompatible with any business who values user privacy – many PostHog users use us because they handle sensitive client data – or those who need to comply with privacy legislation, such as HIPAA in the US. 

HIPAA requires that any third-party handling personal health information enter into a legal agreement (known as BAA), but Amplitude doesn't offer this option. Self-hosting PostHog doesn't require any additional legal agreements as data never leaves your infrastructure. Read our [HIPAA guidance](/docs/privacy/hipaa-compliance) for more information.

## Strengths of Amplitude

### Personalization engine and machine learning

In addition to its analytics product, Amplitude offers Amplitude Recommend, a personalization engine powered by machine learning. It allows teams to create custom experiences, such as product recommendations or priority ordering, based on machine learning predictions. This is a potentially powerful tool for large e-commerce businesses who are looking to create an Amazon-style shopping experience.

Amplitude also uses machine learning to power it calls predictive analytics, which estimates future outcomes (e.g. future conversion rate) based on current and historical data. This is useful for performance forecasting, especially for marketing teams.

PostHog lacks this kind of forecasting functionality, but it does have Correlation Analysis. Correlation analysis is part of PostHog's Funnels insight and shows you correlated events and properties based on the funnel, e.g. "people who converted were 27x more likely to this event". Read [how to build, analyze and optimize conversion funnels](/tutorials/funnels) for more information on this feature.

### Free up to 10 million events per month

Amplitude's entry-level tier is free to use up to 10 million events per month, which compares very favorably to rivals like Mixpanel (up to 100k monthly users), Pendo (up to 1,000 monthly users) and Heap (up to 10,000 sessions per month). Once you exceed 10 million events, you'll need to speak to Amplitude's sales team to proceed further.

PostHog's model is slightly different. PostHog Open Source, which [anyone can self-host](/docs/self-host), is totally free for life. PostHog Cloud is free up to 1 million events per month, and this includes premium features like Experimentation and Correlation Analysis not available on Amplitude's free Starter tier.

## Coming soon to PostHog

Here are a few of things we're working on right now:

- Thing here
- Thing here
- Thing here
- Thing here

<ArrayCTA /> 