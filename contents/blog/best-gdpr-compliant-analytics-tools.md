---
date: 2022-08-12
title: The 6 best GDPR-compliant analytics tools
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["joe-martin", "andy-vandervell"]
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
categories: ["Guides", "Privacy"]
---

The GDPR places significant restrictions on how you can use tools like Google Analytics to track and collect user data.

And, while there is **no universal legal definition** of what constitutes "GDPR-compliant analytics", there are some fundamental principles you can follow:

1. **You must acquire "unambiguous consent":** Tucking a notice away in your terms and conditions isn't enough. This is why cookie banners are a thing. You need user consent if you're collecting [personally identifiable information](/blog/what-is-personal-data-pii).

2. **Data must be handled securely:** GDPR punishes breaches of privacy and security severely. Data must be held securely and staff  trained in how to handle data. You must also delete any personal data you hold if a user requests it.

3. **Don't transfer EU personal data to the US:** Non-anonymized identifiable information on EU citizens can't be transferred to the US. This is a hot button issue due to [recent rulings against websites](https://isgoogleanalyticsillegal.com/) that transeferred the personal data of EU citizens (e.g. IP addresses) to Google's US-based servers.

## The best GDPR-compliant analytics

There are numerous ways to achieve GDPR compliance, which you can broadly categorize as either good, better or best:

- **Good:** Data transferred to the US is anonymized
- **Better:** Data is stored in EU cloud servers
- **Best:** You self-host and control all data / no personal data is collected

All the tools in this list offer one or more of these methods. We've also chosen a broad range of tools that includes in-depth product analytics platforms, lightweight "privacy first" platforms and open source Google Analytics alternatives.

### 1. [PostHog](https://posthog.com/product)

![PostHog - best gdpr compliant analytics tools](../images/blog/gdpr-compliant-analytics/posthog-gdpr-compliant.png)

PostHog is an all-in-one, [open source analytics platform](/blog/best-open-source-analytics-tools) that combines  [Product Analytics](/product/#product-analytics), [Session Recording](/product/session-recording), [Feature Flags](/product/feature-flags), [Heatmaps](/product/heatmaps), and [Experimentation](/product/experimentation-suite) into a single platform.

(Think Amplitude + Hotjar + LaunchDarkly in one platform and you're pretty close.)

Unlike [alternative to tools like Amplitude](/blog/posthog-vs-amplitude) and Mixpanel, PostHog can be self-hosted on your own infrastructure, which means you can control exactly where user information is stored and how it is processed – ideal for GDPR and HIPAA compliance. It also supports event auto capture, so you can start collecting useful data immediately without instrumenting events by hand.

#### Who is PostHog for?
PostHog is especially helpful for product teams that want to understand how users use their product. As it's open source, it's great for early-stage startups, but the powerful toolset and [range of integrations](/apps) means it scales to suit any business size.

#### Features & benefits
- An all-in-one analytics suite
- Easy to use, no SQL required
- Self-hosting and cloud-hosting available
- Complete control of your data and PostHog instance
- Feature Flags, Heatmaps, Session Recording and more
- Apps to integrate with data warehouses
- Unlimited ability to scale
- Open source, via MIT license

#### PostHog and GDPR compliance

- **Open Source:** <span className="text-green text-lg">✔</span>
- **Self Hosting:** <span className="text-green text-lg">✔</span>
- **EU Cloud Hosting:** Coming Q4 2022
- **Cookieless Tracking:** <span className="text-green text-lg">✔</span>

PostHog can be deployed onto your own infrastructure, so you retain full control over who your data is shared with and where it is hosted. A cloud-hosted version of PostHog is also available, if you prefer, with servers hosted in the US – PostHog provides guidance on how to [use PostHog Cloud in compliance with GDPR](/docs/privacy/gdpr-compliance).

While PostHog uses cookies by default, it can be [configured not to use cookies](/tutorials/cookieless-tracking). To use PostHog without cookies, data is stored in a Javascript object in `memory` that only lasts the duration of the pageview.

#### How much does PostHog cost?

All paid editions of PostHog are [free to use up to 1 million events per month](/pricing). Paid plans include support for multiple projects, and advanced features like [A/B and multivariate testing](/docs/user-guides/experimentation), [Correlation Analysis](/docs/user-guides/correlation), [Cohorts](/user-guides/cohorts) and [Group Analytics](/docs/user-guides/group-analytics). The open source edition is free to self-host and includes the core product analytics features,  Session Recording and support for one project only. 

### 2. [Plausible](https://plausible.io/)

![Plausible Analytics - open source analytics tools](../images/blog/open-source-analytics-tools/plausible-screenshot.png)

Plausible is a lightweight alternative to tools such as Google Analytics. It offers an effective way to track simple web metrics, such as page views and the number of unique visitors, but lacks the depth of a full product analytics platform such as Mixpanel or PostHog. 

Plausible’s lightweight nature does offer several benefits however, such as a small script size which means it has a minimal impact on page performance. This further distinguishes it from the bloat of Google Analytics.

Plausible’s intense focus on privacy makes it an attractive option for individuals, but also imposes restrictions on how data can be used and stored. There’s no way to identify users or track behavior across multiple sessions or devices, for example. 

#### Who is Plausible for?
Plausible is an alternative to Google Analytics and is a good fit for small content and marketing teams who need to track simple website metrics, or for freelancers and bloggers who only need to monitor small sites. 

#### Features & benefits
- Lightweight script with minimal page speed impact
- No need for any cookies, at all
- Minimal data collection for users
- No tracking across sessions, devices or sites

#### Plausible and GDPR compliance

- **Open Source:** <span className="text-green text-lg">✔</span>
- **Self Hosting:** <span className="text-green text-lg">✔</span>
- **EU Cloud Hosting:** <span className="text-green text-lg">✔</span>
- **Cookieless Tracking:** <span className="text-green text-lg">✔</span>

Plausible is made and hosted in the EU. It collects no personally identifiable information at all, making it ideal if you want basic, GDPR compliant analytics. It's doesn't collect any personal data, such as IP addresses, so you don't need to acquire permission from users to comply with GDPR.

#### How much does Plausible cost?

Plausible charges by pageview with 1 million pageviews costing €69 per month – approx. $71. Paying annually grants you two free months per year – i.e. €69 per month becomes €690 per year. The open source version is free to self-host via Docker.

### 3. [Fathom](https://usefathom.com/)

![Fathom - GDPR compliant analytics](../images/blog/gdpr-compliant-analytics/fathom.png)

Fathom is a popular, privacy-friendly alternative to Google Analytics that's built with user privacy at its core. It tracks common web statistics like unique visitors, page views, time on site, bounce rate, and referral data. It also has a basic event tracking system for measuring things like downloads, mailing list signups, and purchases.

While based in Canada, Fathom offers EU-hosting. It also employs what it calls intelligent routing. This ensures that non-EU users are routed via its US servers, while EU users are routed via its EU-based and owned servers. Fathom claims this means non-EU visitors get better performance compared to other, similar services that use EU-only hosting.

#### Who is Fathom for?

Fathom is ideal for individual users and companies who only require basic web analytics. Unlike GA and other more advanced alternatives, such as PostHog or Matomo, Fathom is a simple, single-page application. It tracks all the basic analytics most people need, but can't offer much insight into user behavior. It's also useful for agencies as it supports up to 50 websites on its core pricing plans.

#### Features & benefits

- Fast and lightweight tracking script
- No cookie banner required
- EU isolation and intelligent routing
- Email reports
- Multi-domain tracking

#### Fathom and GDPR compliance

- **Open Source:** <span className="text-red text-lg">✖</span>
- **Self Hosting:** <span className="text-red text-lg">✖</span>
- **EU Cloud Hosting:** <span className="text-green text-lg">✔</span>
- **Cookieless Tracking:** <span className="text-green text-lg">✔</span>

As a privacy-first solution, Fathom is GDPR compliant out-of-the-box with no compromises. It's also a cookie-less solution, so you don't need cookie banners when using it.

#### How much does Fathom cost?

Like Plausible, Fathom charges by pageview, though it's a bit cheaper than Plausible. A website generating 1 million pageviews per month would pay $54 per month, compared to around $71 with Plausible. Fathom also offers two months free use for paying annually, but there is no free-to-use open sourcre version.

### 4. [Countly](https://count.ly/)

![Countly - open source analytics tools](../images/blog/open-source-analytics-tools/countly-screenshot.png)

Like PostHog, Countly is an extendable product analytics platform that offers self-hosted open source and enterprise editions, or cloud deployments, for organizations that want to understand product performance and user journeys in greater detail. 

Countly offers a robust suite of features and an extensive range of integrations, including a Net Promoter Score (NPS) survey plugin. The ability to track crashes and errors, and to issue push notifications to mobile users, are also useful additions over most other analytics tools.

#### Who is Countly for?

Countly's range of features make it particularly attractive to mobile app developers, especially those working on multi-platform apps across iOS, Mac, Windows, and Android. Its open source Community Edition is available on a AGPL v3 license, though this version removes the majority of its user behavior features, such as retention, revenue tracking, user tracking, cohorts, funnels, and user flow.   

#### Features & benefits

- Support for mobile, web, desktop and IoT devices
- Extensible via plugins
- Self-hosting and private cloud deployments available
- Push notifications and crash analytics

#### Countly and GDPR compliance

- **Open Source:** <span className="text-green text-lg">✔</span>
- **Self Hosting:** <span className="text-green text-lg">✔</span>
- **EU Cloud Hosting:** <span className="text-green text-lg">✔</span>
- **Cookieless Tracking:** <span className="text-red text-lg">✖</span>

Like PostHog, Countly can be deployed onto your own infrastructure, or in cloud servers based in the EU, so that data isn't stored in servers outside of GDPR jurisdiction. It doesn't offer a cookie-less tracking option, but it does have consent systems built in.

#### How much does Countly cost?

Countly doesn't publish pricing on its website. You have to contact sales. Its open source Community Edition is free to self-host, but it exlcudes most of its user behavior features. 

### 5. Matomo

![Matomo - open source analytics tools](../images/blog/open-source-analytics-tools/matomo-screenshot.png)

Matomo is one of the most popular Google Analytics alternatives because it enables teams to collect a comparable level of information, but can be deployed on-premises so that you don’t need to share information with third-parties. Like PostHog, it’s also open source. 

One of Matomo’s most appealing features is the ability to import existing Google Analytics data into Matomo when getting started, so that you don’t lose any previous insights.

Matomo offers a wealth of other features, from custom alerts to tag managers and media analytics, though many of these are sold under per-feature subscriptions which can make the cost of on-premise deployments hard to predict. 

#### Who is Matomo for?
Matomo is suitable for businesses of all sizes which need an alternative to Google Analytics. The cloud version of Matomo is also easy to setup, making it ideal for non-technical users.

#### Features & benefits
- Cloud hosting on European servers
- Self-hosting version available
- All-in-one Google Analytics replacement
- Google Analytics importer
- Open source, via GPL 3.0

#### Matomo and GDPR compliance

- **Open Source:** <span className="text-green text-lg">✔</span>
- **Self Hosting:** <span className="text-green text-lg">✔</span>
- **EU Cloud Hosting:** <span className="text-green text-lg">✔</span>
- **Cookieless Tracking:** <span className="text-green text-lg">✔</span>

Matomo offers first-party cookies by default and robust tools to ensure personally identifiable information (PII) is anonymized. Additionally, it can be deployed either on-premises, or into EU-based cloud servers. Yes. Matomo offers the option of cookie-less tracking, though this does reduce the quality of data it collects.

#### How much does Matomo cost?

Matomo's core open source analytics is free to self-host. More advanced features, such as A/B testing and Custom resports, are add-ons charged for annually at varying rates. Its managed cloud service charges by hits (any pageview, event, download etc.) with 1 million hits costing £139 (approx. $170) per month.

**Related:** [PostHog and Matomo compared](/blog/posthog-vs-matomo)

### 6. [GoAccess](https://goaccess.io/)

![GoAccess - open source analytics tools](../images/blog/gdpr-compliant-analytics/goaccess-gdpr-compliant.png)

GoAccess is a completely open source web log analyzer and viewer which runs in a browser-based terminal to give you an overview of the most common website metrics. This means it can act as a replacement for tools such as Google Analytics, though it falls short of a product analytics platform in capabilities. 

Functioning in real-time, GoAccess is useful for spotting who is using up your bandwidth and identifying aggressive crawlers or bots, as well as tracking site metrics such as page views, visitors and time-on-page. The toolset, design and reliance on a terminal make it a popular choice for sysadmins. 

#### Who is GoAccess for?

GoAccess is for system administrators and software engineers who need to track web performance across smaller sites. It’s unsuitable for those needing a self-service analytics platform or who need easy integration with other tools or data warehouses. 

#### Features & benefits

- Open source, via MIT license
- Completely real-time tracking
- Customizable dashboards
- Runs inside a terminal or browser

#### GoAccess and GDPR compliance

- **Open Source:** <span className="text-green text-lg">✔</span>
- **Self Hosting:** <span className="text-green text-lg">✔</span>
- **EU Cloud Hosting:** <span className="text-green text-lg">✔</span>
- **Cookieless Tracking:** <span className="text-green text-lg">✔</span>

You can configure GoAccess to either not collect IP addresses or anonymize them, so it can be used without cookie banners.

#### How much does GoAccess cost?

GoAccess is open source and has no paid tiers.

 <NewsletterForm compact />
