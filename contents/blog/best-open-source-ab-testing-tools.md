---
date: 2022-05-24
title: The 5 best free and open-source A/B testing tools
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/experiments.jpeg
featuredImageType: full
categories: ["Open source", "Guides"]
author: ["hanna-crombie"]
---

Also known as split testing or multivariate testing, A/B testing is the implementation of experiments which split your audience to test variations of a product design, new feature, call to action, landing page – anything you can imagine, really.

Here, we’re sharing our guide to the best free and [open-source tools](/blog/best-open-source-analytics-tools) for experimenting with A/B tests because the best things in life are free (and open source, obviously).

## 1. [PostHog](https://posthog.com)

![PostHog - best open source ab testing tools](../images/blog/open-source-testing-tools/img1_PostHog.png)

PostHog is an [all-in-one product analytics suite](/product) that integrates all of the essential features you need to understand your users. It collects and visualizes data on how people are using your products, provides insights into trends and retention, and helps to remove bottlenecks and reduce churn.

Our A/B testing capabilities, which we call our Experimentation Suite, is complemented by other tools like [Feature Flags](/product/feature-flags), [Session Recording](/prodcut/session-recording), [Heatmaps](/product/heatmaps), [User Paths](/product/user-paths) and more, making it one of the most comprehensive analytics platforms around – open source, or otherwise.

[PostHog’s Experimentation suite](https://posthog.com/docs/user-guides/experimentation) allows you to flexibly test your hypotheses with up to three test variants. A control group is also assigned and PostHog will automatically estimate the number of users exposed, and we use Bayesian analysis to calculate the results and ensure they're significant.

### Who is PostHog for?

PostHog is a great choice for any team that wants a complete view how people use their product. Not only is the testing functionality comprehensive, it’s tightly integrated with a complete suite of product analytics tools – you don’t need any external tools. You can also [self-host PostHog](/signup/self-host), so data never leaves your infrastructure.

### Strengths

- Full product analytics suite
- Easy to get set up – no SQL necessary
- Ability to select segments for experiments
- Feature flags for incremental roll outs
- Event pipelines for integration with data warehouses
- Traffic visualization with user path analysis
- Self-hosted and cloud-hosted options available

### How much does it cost?

We’re confident PostHog is the number one choice here, but if you want to test our theory you can [try our self-serve plans for free](/pricing). 

If you want to self-host, you can use Experimentation with our Scale plan, but you can also use PostHog Cloud if you prefer a fully-managed option with no infrastructure to deploy. 

Both PostHog Scale and Cloud are [free up to 1 million events per month](/pricing).

### Open source license

PostHog Open Source is available under an MIT license. You can [see further details on GitHub]. Experimentation isn't part of our open source release as it requires a Scale license, but Scale is free to use up to 1 million events per month and you can set event limits to ensure you don’t go over. Read our docs for more on [how to self-host PostHog](https://posthog.com/docs/self-host).

<ArrayCTA />

**Further reading:**
- [The best open source Hotjar and FullStory alternatives](/blog/best-open-source-session-replay-tools)
- [What we've learned about running effective A/B tests](/blog/experiments)
- [The differences between PostHog and Amplitude](/blog/posthog-vs-amplitude)

## 2. [GrowthBook](https://www.growthbook.io/)

![GrowthBook - best open source ab testing tools](../images/blog/open-source-testing-tools/growthbook.png)

GrowthBook is an open-source platform for feature flags and A/B tests which helps teams to deploy code efficiently and analyze experiments. Built by engineers who wanted better adoption insights into their releases, it is a modular solution that promotes feature flagging as an essential step in the development process and can be used as a full-stack platform, a plugin feature flagging tool or an analysis engine.

### Who is GrowthBook for?

GrowthBook is built for data, engineering and product teams who need the power of a customizable platform without having to build it in house.

### Strengths

- Modular platform to adapt to your needs
- Lightweight SDKs for speed
- Easy to implement – no need for data or engineering resources
- Self-hosted and managed options available

### How much does it cost?

GrowthBook open source is free and includes unlimited experiments. A hosted version includes a visual A/B test editor and is free up to 5 users, with pricing at $20 per user per month after.

### Open sources license

GrowthBook is available under an MIT license. Visit the [Growthbook GitHub repo](https://github.com/growthbook/growthbook/) for more info. 

## 3. [Unleash](https://www.getunleash.io/)

![Unleash - best open source ab testing tools](../images/blog/open-source-testing-tools/img2_Unleash.png)

Unleash is a feature management platform which provides an overview of all features across your applications and services. The platform empowers engineering teams to implement A/B tests via feature toggles and offers accurate user targeting.

You can use Unleash to define the rules of your experiments, however the platform doesn’t provide all the tools you need to manage A/B tests end-to-end and you will need to connect your experiment with an analytics platform like Google Analytics or Mixpanel in order to visualize results.

### Who is Unleash for?

Unleash is for autonomous development teams who want to be free from constraints and get on with testing and validating new features safely. They build with key developer concerns in mind: integration, privacy, resilience and performance.

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

Mojito is fully free and open source and you don’t need an account to get started.

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
