---
date: 2022-05-25
title: The 5 best free and open-source A/B testing tools
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/experiments.jpeg
featuredImageType: full
author:
  - hanna-crombie
category: General
tags:
  - Guides
  - Open source
  - Comparisons
---

Also known as split testing or multivariate testing, A/B testing is the practice of splitting your audience to test variations of a product design, new feature, call to action, landing page – anything you can imagine, really.

Here, we’re sharing our guide to the best free and [open-source tools](/blog/best-open-source-analytics-tools) for experimenting with A/B tests, which will be especially useful if you're looking for an [alternative to Google Optimize](/blog/google-optimize-alternatives) after Google confirmed it is sunsetting the product.

## 1. [PostHog](https://posthog.com)

![PostHog - best open source ab testing tools](../images/blog/open-source-testing-tools/img1_PostHog.png)

PostHog is an [all-in-one analytics suite](/product) that integrates all the essential features you need to understand your users. It collects and visualizes data on how people are using your products, provides insights into trends and retention, and helps to remove bottlenecks and reduce churn.

Our A/B testing features, which we call our experimentation suite, are complemented by other tools like [feature flags](/product/feature-flags), [session recording](/product/session-recording), [heatmaps](/product/heatmaps), [user paths](/product/user-paths) and more, making it one of the most comprehensive analytics platforms around – open source, or otherwise.

[PostHog’s experimentation suite](https://posthog.com/docs/user-guides/experimentation) allows you to flexibly test your hypotheses. PostHog will automatically estimate the number of users exposed, and we use Bayesian analysis to calculate the results and ensure they're significant.

### Who is PostHog for?

PostHog is a great choice for any team that wants a complete view of how people use their product. Not only is the testing functionality comprehensive, it’s tightly integrated with a complete product analytics suite – you don’t need any external tools.

### Strengths

- Full product analytics suite
- Easy to get set up – no SQL necessary
- Ability to select segments for experiments
- Feature flags for incremental roll outs
- Event pipelines for integration with data warehouses
- Traffic visualization with user path analysis
- Self-hosted and cloud-hosted options available

### How much does it cost?

While Experimentation isn't currently part of the open source release, it's [free to use up to 1 million events per month](/pricing) on PostHog Cloud when you enter a card. You can set billing limits to prevent surprise bills.

### Open source license

PostHog Open Source is available under an [MIT license](https://github.com/PostHog/posthog). Read our docs for more on [how to self-host PostHog](https://posthog.com/docs/self-host).

<ArrayCTA />

**Further reading:**
- [The best open source Hotjar and FullStory alternatives](/blog/best-open-source-session-replay-tools)
- [What we've learned about running effective A/B tests](/blog/experiments)
- [The differences between PostHog and Amplitude](/blog/posthog-vs-amplitude)

## 2. [GrowthBook](https://www.growthbook.io/)

![GrowthBook - best open source ab testing tools](../images/blog/open-source-testing-tools/growthbook.png)

GrowthBook is an [open-source platform for feature flags](/blog/best-open-source-feature-flag-tools) and A/B tests which helps teams to deploy code efficiently and analyze experiments. Built by engineers who wanted better insights on new releases, it is a modular solution that promotes feature flagging as an essential step in the development process and can be used as a full-stack platform, a plugin feature flagging tool or an analysis engine.

### Who is GrowthBook for?

GrowthBook is built for data, engineering and product teams who need the power of a customizable platform without having to build it in house.

### Strengths

- Modular platform to adapt to your needs
- Lightweight SDKs for speed
- Easy to implement – no need for data or engineering resources
- Self-hosted and managed options available

### How much does it cost?

GrowthBook open source is free and includes unlimited experiments. A hosted version includes a visual A/B test editor and is free up to 5 users, with pricing at $20 per user per month thereafter.

### Open sources license

GrowthBook is available under an MIT license. Visit the [Growthbook GitHub repo](https://github.com/growthbook/growthbook/) for more info. 

## 3. [Unleash](https://www.getunleash.io/)

![Unleash - best open source ab testing tools](../images/blog/open-source-testing-tools/img2_Unleash.png)

Unleash is a feature management platform which provides an overview of all features across your applications and services. The platform empowers engineering teams to implement A/B tests via feature toggles and offers accurate user targeting.

You can use Unleash to define the rules of your experiments, but the platform doesn’t provide all the tools you need to manage A/B tests end-to-end. Instead, you'll need to connect your experiment with an analytics platform like Google Analytics or Mixpanel in order to visualize results.

### Who is Unleash for?

Unleash is for autonomous development teams who want a lightweight way to test, validate and rollout new features safely. They build with key developer concerns in mind: integration, privacy, resilience and performance.

### Strengths

- Accurate user targeting
- Fast toggle evaluation so performance issues are spotted fast
- Extensive APIs
- Self-hosted and managed service available

### How much does it cost?

Unleash’s basic open source self-hosted plan includes A/B experimentation and is free for two environments. A managed version is also available starting from $80 a month.

### Open source license

The open source version is available under an Apache license. Visit the [Unleash GitHub repo](https://github.com/Unleash/unleash) for more info.

## 4. [Mojito](https://mojito.mx/)

![Unleash - best open source ab testing tools](../images/blog/open-source-testing-tools/img3_Mojito.png)

Mojito is an open split testing stack that lets you build, launch and analyze experiments via Git/CI. The stripped-down tool consists of three modular components – a front-end library for bucketing users and tracking them, data models and events for fast reporting, and reporting templates and functions so you can build your own visualizations for experiment analysis.

### Who is Mojito for?

Mojito is a fully source-controlled stack for developers and technical product teams who want a simple solution with unlimited customisation.

### Strengths

- Simple APIs and unlimited customisation
- No need for 3rd party analytics
- Error tracking and handling
- Lightweight solution for optimized page load speed

### How much does it cost?

Mojito is fully free and open source, and you don’t need an account to get started.

### Open source license

Mojito is available under a BSD 3-clause license so you can build upon it as you wish. Take a look at [Mojito on GitHub](https://github.com/mint-metrics/mojito) to learn more.

## 5. [Flagsmith](https://flagsmith.com)

![Flagsmith - best open source ab testing tools](../images/blog/open-source-testing-tools/img4_Flagsmith.png)

Flagsmith is an open-source feature flag and remote configuration service which lets you manage features across mobile, web and server-side applications. You can use Flagsmith’s Multivariate Flags feature as a bucketing engine to place users into testing buckets and control the specific user experience that is being tested. Flagsmith doesn’t provide analytics for multivariate tests, however. You’ll need to use a 3rd-party provider to receive the stream of event data derived from the behavior of the user.

### Who is Flagsmith for?

Flagsmith is targeted at data-driven front end and user experience teams who want to increase efficiency in their feature development.

### Strengths

- Manage flags across multiple platforms
- Powerful segmenting rules
- Integrations with a number of popular analytics platforms
- Remote configuration allows you to toggle features without changing code

### How much does it cost?

Flagsmith offers a cloud solution for free up to 50,000 requests per month. For teams looking to manage their infrastructure, Flagsmith can be hosted entirely on-premises with pricing available on request.

### Open source license

Flagsmith is open source and available on a BSD 3-clause license. Explore [Flagsmith on GitHub](https://github.com/Flagsmith/flagsmith) for more info.
