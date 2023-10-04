---
date: 2023-09-13
title: The 14 best open-source (and self-hosted) analytics tools
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - joe-martin
  - andy-vandervell
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
category: General
tags:
  - Open source
  - Guides
---
**Author:** [Andy Vandervell](https://posthog.com/community/profiles/62)

There's no shortage of high-quality open-source analytics tools. In this guide we've split them into two categories:

- [Analytics tools](#the-best-open-source-analytics-tools) that collect data and help you understand user behavior. This includes product analytics platforms, but also web analytics, session recording, and AB testing tools.

- [Dashboarding tools](#the-best-open-source-dashboard-and-bi-tools) that connect to data sources (e.g. a data warehouse) for building dashboards, insights, interactive visualizations, and real-time data logging.

We've chosen each entry carefully based on a broad range factors, community size and activity, our own experience using them, and publicly available feedback.

We have separate guides on [open-source feature flag tools](/blog/best-open-source-feature-flag-tools) and [open-source AB testing products](/blog/best-open-source-ab-testing-tools).

> **Changelog** 
> - **Mar 14, 2022:** Added Umami; updates to copy and screenshots
> - **Jun 16, 2022:** Added Fathom Lite, GrowthBook, OpenReplay
> - **Aug 24, 2022:** Removed Fathom Lite, added Apache Superset, Redash
> - **Sep 13, 2023:** Added Ackee and Open Web Analytics

## The best open-source analytics tools

This section is dedicated to tools that actively collect data on user behavior. These range from the very simple, such as the privacy-focused Plausible, to broad analytics tools like Matomo.

### PostHog
![PostHog - best open source analytics tools](../images/blog/gdpr-compliant-analytics/posthog-gdpr-compliant.png)

- **GitHub Stars:** 13.3k
- **Language(s):** TypeScript (53%) and Python (42%)
- **Alternative to:** [Mixpanel](/blog/best-mixpanel-alternatives), Amplitude, Hotjar, FullStory, LaunchDarkly
- [PostHog on GitHub](https://github.com/PostHog/posthog)

[PostHog](https://posthog.com/) is an all-in-one platform designed to give engineers and product managers a complete view of user behavior. It's built on the highly-scalable ClickHouse OLAP database.

Features include a comprehensive product analytics suite (e.g. trend analysis, dashboards, funnels, path analysis, retention tracking etc.), feature flags for feature control, experimentation (A/B and multivariate testing), session recording, heatmaps and [more](/product).

It’s entirely self-serve, with the ability to autocapture event information out of the box. PostHog can also be self-hosted on your existing infrastructure using Docker Compose, making it ideal if you don't want to share data with third parties. 

It's a good option if you're after an [open-source session recording tool](/blog/best-open-source-session-replay-tools), too. 

#### Who is PostHog for?
PostHog is useful for engineering, data science, and product teams. As an all-in-one platform, it can replace multiple tools (e.g. Mixpanel, LaunchDarkly, Hotjar) so you can simplify your tech stack. [PostHog customers](/customers) include the likes of [Hasura](/customers/hasura), [Netdata](/customers/netdata), and [Phantom](/customers/phantom).  

#### Strengths
- All-in-one analytics suite
- Easy-to-use, no SQL required
- Self-hosting and cloud-hosting available
- Feature flags for safely deploying changes
- Multivariate experimentation suite for testing ideas
- Session recording for gathering insights
- Event pipelines to integrate with data warehouses
- Built on the ultra-fast ClickHouse OLAP database

#### Open source license and monetization

[PostHog Open Source](https://github.com/PostHog/posthog) is free to use for life and is distributed under an MIT license. The open source version includes the core product analytics, feature flag, and session recording features, but has a one project limit. There's also a [FOSS edition](https://github.com/PostHog/posthog-foss) that removes all proprietary code. 

Subscribing to PostHog Cloud removes the project limit and adds numerous paid-only features, including experimentation, correlation analysis, group analytics for tracking organizations, and advanced cohorts. PostHog Cloud is [free up to 1 million events per month](/pricing).

### Matomo
![Matomo - open source analytics tools](../images/blog/open-source-analytics-tools/matomo-screenshot.png)

- **GitHub Stars:** 18.1k
- **Languages:** PHP (78%), JavaScript (8.1%)
- **Alternative to:** Google Analytics
- [Matomo on GitHub](https://github.com/matomo-org/matomo) 

[Matomo](https://matomo.org/) is an open-source platform for website analytics. It's one of the most popular open-source [alternatives to Google Analytics](/blog/ga4-alternatives) for website owners and marketing teams. It even offers a data import tool for Google Analytics, so you can bring your data with you. You can run it on-premise or use Matomo's own cloud hosting service.

#### Who is Matomo for?
Matomo is intended for marketing and website teams looking to track content performance and marketing attribution. It's suitable for both SMBs and enterprises – the European Union runs a version of Matomo on all its websites.

#### Strengths
- Google Analytics data importer
- Easy to set up on WordPress and WooCommerce
- Marketing metrics and attribution
- Integrations with popular off-the-shelf CMS
- Built-in GDPR and tag managers

#### Open source license and monetization
Matomo on-premise is available under a AGPLv3 license. It includes Matomo's core web analytics reports, such as ecommerce tracking, real-time analytics, and content tracking, and supports an unlimited number of websites and users. Numerous premium add-ons (e.g. roll-up reporting, A/B testing, cohorts, funnels etc.) are charged for on a per-user basis. Cloud hosting is also available, which is billed on hits.

**Related:** [In-depth PostHog vs Matomo comparison](/blog/posthog-vs-matomo)

### Countly
![Countly - open source analytics tools](../images/blog/open-source-analytics-tools/countly-screenshot.png)

- **GitHub Stars:** 5.2k
- **Languages:** JavaScript (82%), HTML (9.4%)
- **Alternative to:** Mixpanel, Amplitude, LogRocket
- [Countly on GitHub](https://github.com/Countly/countly-server)

Like PostHog, [Countly](https://count.ly/) offers a wide range of tools to help you build better products. It has a strong focus on mobile and desktop applications, and enables you to bring together both qualitative and quantitative insights. However many features, such as dashboards, funnel analysis, and retention tracking are only available in the enterprise-level product.

#### Who is Countly for?
Countly is suitable for both small teams and enterprise businesses, especially those which focus on mobile apps. The crash analytics tools make it useful for customer support and engineering teams, too. 

#### Strengths
- Wide range of analysis tools
- Focus on mobile and desktop app development
- Crash analytics to diagnose bugs
- Run surveys to get qualitative insights

#### Open source license and monetization
Countly's Community Edition is available under a AGPLv3 license, but it's somewhat limited. It includes versions of its core analytics features, but customer behavior insights (e.g. retention, cohorts, funnels, user paths) are only available in the paid Enterprise Edition. Countly doesn't provide public pricing information.

### Plausible Analytics
![Plausible Analytics - open source analytics tools](../images/blog/open-source-analytics-tools/plausible-screenshot.png)

- **GitHub Stars:** 16k
- **Languages:** Elixir (74%), JavaScript (14%)
- **Alternative to:** Google Analytics
- [Plausible on Github](https://github.com/plausible/analytics/)

[Plausible Analytics](https://plausible.io/) is focused on providing website analytics that don’t infringe on user privacy. That means Plausible doesn’t rely on cookies and is naturally compliant with regulations like GDPR. 

Unlike Matomo, Plausible is a very streamlined tool rather than a feature-equivalent Google Analytics alternative. As a result, it's a great fit for smaller teams who prefer ease of use to in-depth reporting, or hobby deployments if you just want basic analytics for a website or blog.

#### Who is Plausible Analytics for?
Plausible is intended for marketing teams and website owners who want to track top-level website metrics, such as pageviews, bounce rate and visit duration, but it's not an ideal tool for understanding user behavior.

#### Strengths
- Easy to use and focused on essential web metrics
- Lightweight integration script won’t impact page performance
- No cookies required, GDPR compliant out of the box 

#### Open source license and monetization
Plausible Analytics is available under a AGPLv3 license and can be self-hosted via Docker Compose. Pricing for its hosted version starts at €9 per month for 10,000 monthly pageviews.

> **Also consider:** Plausible is one of a large subset of privacy-first analytics products that have proven popular in the wake of GDPR and less permissive attitudes to user tracking. [Umami](https://umami.is/) is another popular, open-source product in this space. Read our [GDPR analytics guide](/blog/best-gdpr-compliant-analytics-tools) for more options.

### Umami

![umami analytics](../images/blog/open-source-analytics-tools/umami.png)

- **GitHub Stars:** 16.9k
- **Languages:** 91% JavaScript
- **Alternative to:** Google Analytics
- [Umami on GitHub](https://github.com/umami-software/umami)

[Umami](https://umami.is/) is another popular privacy-first website analytics tool. Like Plausible, it tracks basic website analytics, doesn't collect any personal information, and is extremely fast. You can also track basic events, such button clicks, using CSS classes or JavaScript. Unlike Plausible, it doesn't currently offer a cloud-hosted option, though one is in beta. 

#### Who is Umami for?

Hobbyists who want basic website analytics that doesn't collect any personal data.

#### Strengths

- Fast and lightweight, no impact on website performance
- Doesn't collect any personally identifiable information
- Easy to self-host and configure

#### Open source license and monetization

Umami is available via an MIT license. There is no monetized features or hosting options at present, though it is currently running an open beta for managed cloud version that Umami will charge for.

### Ackee

![ackee](../images/blog/open-source-analytics-tools/ackee.png)

- **GitHub Stars:** 4k
- **Languages:** 85% JavaScript
- **Alternative to:** Google Analytics
- [Ackee on GitHub](https://github.com/electerious/Ackee)

[Ackee](https://ackee.electerious.com/) is a barebones Node.js based analytics tool with a strong focus on privacy. It doesn't store any cookies, and supports numerous methods of self-hosted deployments. You can also build custom tools upon Ackee using its GraphQL API.

#### Who is Ackee for?

Ackee is ideally suited to engineers who need analytics for hobby projects. You can track as many domains as you like and retain complete control of your data.

#### Strengths

- Simple, lightweight analytics
- Extendable via GraphQL API
- No cookie banners needed
- Unlimited domain tracking

#### Open source license and monetization
Ackee is an entirely free project that's distributed under a permissive MIT license.

### Open Web Analytics

![open web analytics](../images/blog/open-source-analytics-tools/owa.png)

- **GitHub Stars:** 2.2k
- **Languages:** 67% PHP, 23 JavaScript
- **Alternative to:** Google Analytics
- [OWA on GitHub](https://github.com/Open-Web-Analytics/Open-Web-Analytics)

[Open Web Analytics](https://www.openwebanalytics.com/) is an entirely free, open-source alternative to Google Analytics. In addition to usual web analytics basics, it includes a basic heatmap feature, and the ability to track clicks on all DOM elements. It's less focused on privacy than others in this list, so you can use OWA to track when users come back, and perform basic campaign and e-commerce tracking. In comparative terms, it's more advanced than Plausible and Umami, but less advanced than Matomo or PostHog, though the interface is somewhat dated. 

#### Who is Open Web Analytics for?

OWA will suit any developer who wants self-hosted analytics, but desires more tracking capabilities than privacy-focused alternatives like Plausible.

#### Strengths

- Simple GDPR compliance
- Control over your own data
- Heatmap and DOM element tracking
- Basic campaign and e-commerce tracking

#### Open source license and monetization
Open Web Analytics is distributed under the GPL-2.0 license. There are no paid features.

### OpenReplay

![openreplay - open source analytics tools](../images/blog/open-source-analytics-tools/openreplay.png)

- **GitHub Stars:** 8k
- **Languages:** Python (25%), TypeScript (24%), JavaScript (24%)
- **Alternative to:** LogRocket, Hotjar 
- [OpenReplay on GitHub](https://github.com/openreplay/openreplay) 

[OpenReplay](https://github.com/openreplay/openreplay) is a session replay suite built for developers and privacy conscious companies. While it lacks many core analytics features, it does offer some basic analytics features such as funnel analysis.  

Its session replay feature automatically captures events, and provides useful click maps in addition to detecting rage clicks and slow loading pages. It also offers funnel analysis, performance monitoring, error tracking, and extensive integrations with other logging tools.

#### Who is OpenReplay for?
OpenReplay is primarily for developers, especially due to its focus on error tracking and bug fixing. It's a good option for early-stage products looking to understand user behavior and validate product-market fit.

#### Strengths
- Privacy-friendly
- Error tracking and bug fixing features
- Performance monitoring

#### Open source license and monetization
OpenReplay is available under the ELv2 license. An Enterprise version adds additional reporting features and dedicated support, but there's no public pricing. There's also a cloud version with pricing based on sessions. 

### GrowthBook

![GrowthBook - best open source analytics tools](../images/blog/open-source-testing-tools/growthbook.png)

- **GitHub Stars:** 4.9k
- **Languages:** TypeScript (92%)
- **Alternative to:** LaunchDarkly
- [GrowthBook on GitHub](https://github.com/growthbook/growthbook)

GrowthBook is an [open source A/B testing](/blog/best-open-source-ab-testing-tools) and feature flag tool for teams who want granular control over rolling out new features, and the ability to validate those changes through experiments. 

It supports multiple development environments, each with a unique API endpoint, and its comprehensive feature flag functionality allows for targeting based on user properties.

You don't need to import metric data into GrowthBook as it works with your data wherever it lives, be that a data warehouse or an analytics tool like Mixpanel, but it lacks any additional analytical features.

#### Who is GrowthBook for?

GrowthBook is ideal for engineering teams who want flexible, instant control over what users see in their product and already have, or don't require, a broader analytics platform.

#### Strengths
- Multivariate feature flags
- Support for Mixpanel JQL querying
- A/B testing visual editor
- Can be self-hosted
- No performance impact

#### Open source license and monetization

GrowthBook is distributed under an MIT license and self-hosted is supported at no cost. The cloud version is free for up to three users, and $20 per user per month thereafter. 

## The best open-source dashboard and BI tools

This section is dedicated to data analytics tools that connect to data sources (e.g. data warehouses etc.) rather than actively collecting data. Most are focused on big data analytics and are thus tailored to more technical users, particularly engineering, dev ops, and data science teams.

### Apache Spark
![Apache Spark - open source analytics tool](../images/blog/open-source-analytics-tools/apache-spark-screenshot.png)

- **GitHub Stars:** 35.2k
- **Languages:** Scala (67%), Python (12%)
- **Alternative to:** Google Dataflow, TIBCO
- [Apache Spark on GitHub](https://github.com/apache/spark)

[Apache Spark](https://spark.apache.org/) is a data processing engine specifically for large-scale data analysis — or big data analytics, as it’s commonly known. It can run on a wide range of technologies, including Hadoop, Apache Mesos or Kubernetes, which makes it an incredibly versatile analytics option. It's known for being developer-friendly, and incredibly fast thanks to its in-memory data engine.  

#### Who is Apache Spark for?
Apache Spark is a technical system intended for data engineers and data scientists conducting large-scale analytics in an enterprise setting. Spark's flexibility and petabyte-scale processing ability make it useful for numerous use cases, such as handling real-time data streams, or training machine learning algorithms.

#### Strengths
- Great for very large data volumes
- Use libraries such as MLlib for machine learning
- Works with R, Java, Python, Scala and SQL
- Process data in real-time using clusters

#### Open source license and monetization
Apache Spark is available under the Apache 2.0 license and is entirely free.

### Metabase
![Metabase - open source analytics tools](../images/blog/open-source-analytics-tools/metabase-screenshot.png)

- **GitHub Stars:** 31.7k
- **Languages:** Clojure (49%), JavaScript (33%), TypeScript (17%)
- **Alternative to:** Looker, Tableau, Power BI
- [Metabase on Github](https://github.com/metabase/metabase)

[Metabase](https://www.metabase.com/) is one of the most popular open-source business intelligence (BI) tools in the world, offering teams a way to visualize complex data and run analysis with no coding required. Instead, Metabase’s visual query builder enables you to create shareable dashboards in just a few minutes with a drag-and-drop interface — though a native SQL editor is available for advanced users.

#### Who is Metabase for?
Metabase's drag-and-drop interface makes it accessible for technical and non-technical teams, making it an ideal platform for democratizing data analytics in organizations.

#### Strengths
- Easy-to-use, no SQL required
- Automated reports and interactive dashboards
- Self-hosting and cloud-hosting available
- Integrate with 20+ data sources

#### Open source license and monetization
Metabase is available under a AGPL license. A limited version of the product is available for free, while an Enterprise license is available for a cost. Check [the Metabase repo](https://github.com/metabase/metabase) for more information. 

### Grafana
![Grafana - open source analytics tools](../images/blog/open-source-analytics-tools/grafana-screenshot.png)

- **GitHub Stars:** 54.4k
- **Languages:** TypeScript (57%), Go (37%)
- **Alternative to:** Datadog, Dynatrace 
- [Grafana on Github](https://github.com/grafana/grafana)

[Grafana](https://grafana.com/products/cloud/) is an open-source data observability platform. It focuses on interactive visualization, providing a wide variety of charts, graphs and alerts that can be connected to a wide range of online data sources. As a result, it’s a powerful system for monitoring and analyzing data in real-time.  

#### Who is Grafana for?
Grafana is an ideal choice for engineering, dev ops or data scientists in businesses or teams of any size, including enterprise, who need to observe and monitor data.

#### Strengths
- Great for tracking data in real time
- Multiple products allow you to scale
- Get alerts when anomalous events occur
- Integrates with a wide range of data sources

#### Open source license and monetization
Grafana is available to self-host under an AGPLv3 license. Grafana Cloud also has a free tier, though it's limited to three active users and 14 days retention. Additional tiers remove those limitations.  

### Redash
![Redash - open source analytics tools](../images/blog/open-source-analytics-tools/redash.png)

- **GitHub Stars:** 22.8k
- **Languages:** Python (41%), JavaScript (33%), TypeScript (17%)
- **Alternative to:** Looker, Tableau, Power BI
- [Redash on GitHub](https://github.com/getredash/redash)

Like Metabase, Redash is a tool for connecting to and visualizing data from a number of different sources. Unlike Metabase, you need to be fluent in SQL to get the most from it. Redash supports more data sources than Metabase by default, though how important this is will depend on your specific needs.

#### Who is Redash for?

Redash is ideal for engineering and data teams who want lots of flexibility for accessing and interrogating data.

#### Strengths

- Powerful SQL editor
- Alerts for changes in metrics
- Large selection of charts and visualizations
- Excellent range of natively supported data sources

#### Open source license and monetization

Redash is distributed via a BSD-2-Clause license. It currently has no paid tiers or limitations.

### Apache Superset
![superset - open source analytics tools](../images/blog/open-source-analytics-tools/superset.png)

- **GitHub Stars:** 51k
- **Languages:** TypeScript (37%), Python (33%), JavaScript (13%)
- **Alternative to:** Looker, Tableau, Power BI
- [Superset on GitHub](https://github.com/apache/superset)

Superset is the third of the big open-source business intelligence tools alongside Metabase and Redash. It's also considered the most complex and least accessible for non-technical users, though its range of visualizations and charting options is unmatched.

#### Who is Superset for?

Superset is ideal for enterprises with experienced in-house data teams. It can handle large data sets, and provides extensive permissioning systems, so you can restrict access to sensitive data.

#### Strengths

- Connects to a large range of SQL databases
- Large and active community
- Powerful web-based SQL query editor
- Huge range of charting options
- Deck.GL integration for advanced geographic dataviz

#### Open source license and monetization

Apache Superset is distributed under an Apache-2.0 license. There are no paid features or tiers.