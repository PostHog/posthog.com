---
date: 2022-10-18
title: "The best GA4 alternatives for apps and websites"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["andy-vandervell"]
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
categories: ["Guides"]
---

In July 2023, Google will sunset Universal Analytics (UA), forcing users to switch to Google Analytics 4 (GA4) or another provider.

This hasn't proved a popular decision. Not only is GA4 a radical departure for existing users, it's very difficult to migrate existing UA data to GA4.

To further complicate matters, Google Analytics is [under fire from European regulators](https://isgoogleanalyticsillegal.com/) due to its imperfect GDPR compliance, further driving users towards alternatives.

In this guide we'll cover:

- How GA4 and Universal Analytics differ
- Why existing users are looking to switch
- The best GA4 alternatives for different use cases

## GA4 vs Universal Analytics... what's the difference?

In simple terms, the core difference comes from how UA and GA4 track activity:

**Universal Analytics** is a session-based analytics platform. It's designed for a time when desktop websites were the norm, and people didn't think much about what cookies were. It's good at tracking things like the number of sessions on a website, how many pageviews they generated, and where they came from.

**Google Analytics 4** uses an event-based tracking system. It's  designed for tracking what people actually do, such as when they click a button, complete an action, or when when they fail to do so. It can still track things like pageviews and website referrers, but its event-based model is more flexible and powerful.

### So, why do people hate GA4?

If event-based tracking is so great, why do people hate GA4 so much?

People tend to fall into one or more of the following camps:

- **Users who miss pre-defined reports:** Google's changes go beyond the tracking model. It's also eliminated many of the pre-defined reports users relied on to do their jobs. Stuff is just harder to find in GA4, unnecessarily so. Some speculate popular reports will make a return one day, but there's no guarantee they will.

- **Users who lack data science support:** Universal Analytics is popular among small business users and marketing teams, but GA4 caters to large corporate users and app developers. GA4's greater emphasis on exporting data to Data Studio or BigQuery for analysis is hard for users who lack data science and analytics support.

- **App developers who need more features:**  While GA4 courts app developers, it still falls short of the [numerous alternatives](/blog/categories/comparisons) that lured customers away from Universal Analytics in the first place. To many, GA4 is too little, too late.

- **Users concerned about privacy compliance:** The collapse of the [EU-US privacy shield](/blog/gdpr-google-analytics-privacy-shield) makes using Google Analytics in Europe problematic. GA4 attempts to improve privacy, but not enough according to many data protection agencies. GA4 is also incompatible with the US health legislation, so can't be used in healthcare settings.

## Alternatives to GA4

The following GA4 alternatives all solve one or more the above issues. Some provide a similar experience to UA, while others focus on unimpeachable privacy, or greater insights. In each case, we've highlighted the strengths of each tool and the ideal use cases.  

### PostHog

![PostHog - best gdpr compliant analytics tools](../images/blog/gdpr-compliant-analytics/posthog-gdpr-compliant.png)

- **Best for:** Mobile and desktop apps
- **Tracking method:** Event-based
- **GDPR compliance:** <span className="text-green text-lg">✔</span> (via self-hosting or EU Cloud)
- **GA data import:** <span className="text-red text-lg">✖</span>

PostHog is an [all-in-one suite](/product) of product and data tools that includes product analytics, session recording and A/B testing – pretty much everything you need to track user behavior in an app or website, basically. Like GA4, PostHog is an event-based platform – it's priced on per event used, though it offers a generous 1 million events for free each month.

As an open source product, you can see exactly what the team is working on via the [PostHog repo on GitHub](https://github.com/PostHog/posthog). This open source approach also affords a wide degree of flexibility. PostHog can be [self-hosted on your infrastructure](/docs/self-host), which is ideal for keeping control of data and compliance with privacy regulations. PostHog Cloud is available for those who want a managed SaaS experience, and there's an [EU hosting option](/eu) if you need to keep data in the EU for GDPR compliance. 

#### PostHog vs Google Analytics 4

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
        	<td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Google Analytics 4</strong></td>
        	<td className="w-3/12 text-center"><strong>PostHog</strong></td>
    	</tr>
	</thead>
	<tbody>
		<tr>
        	<td>Website analytics</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Funnels</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>User Paths</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
          <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Retention</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
       	<td>Revenue tracking</td>
      		<td className="text-center"><span className="text-green text-lg">✔</span></td>
       	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>User profiles</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
   		</tr>
    	<tr>
        	<td>Cohort analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>A/B testing</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Session recording</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Feature flags</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Self-hosting</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
	</tbody>
</table>
</div>

#### Verdict

[PostHog](https://posthog.com/) is an all-in-one platform for tracking user behavior in apps and websites. While it's a [powerful tool for marketing)(/blog/posthog-marketing) in the right hands, it's best deployed by product and engineering teams seeking deep insights into how users use their product.

### Matomo

![Matomo - open source analytics tools](../images/blog/open-source-analytics-tools/matomo-screenshot.png)

- **Best for:** Content, marketing and e-commerce websites
- **Tracking method:** Session-based
- **GDPR compliance:** <span className="text-green text-lg">✔</span>
- **GA data import:** <span className="text-green text-lg">✔</span>

[Matomo](https://matomo.org/) is one the most popular Google Analytics alternatives around. Like UA, it's based on a session-based tracking model, and it even allows new users to import data from an existing Google Analytics account.

It also shares some of the weaknesses of Google Analytics. While Matomo has added more advanced analytics features, it's better suited to traditional website analytics than tracking desktop and mobile apps. Like PostHog, it's open source, so can be self-hosted if you prefer.

#### Matomo vs Google Analytics 4  

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
        	<td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Google Analytics 4</strong></td>
        	<td className="w-3/12 text-center"><strong>Matomo</strong></td>
    	</tr>
	</thead>
	<tbody>
		<tr>
        	<td>Website analytics</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Funnels</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>User Paths</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
          <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Retention</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
       	<td>Revenue tracking</td>
      		<td className="text-center"><span className="text-green text-lg">✔</span></td>
       	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>User profiles</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
   		</tr>
    	<tr>
        	<td>Cohort analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>A/B testing</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Session recording</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Feature flags</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
		<tr>
        	<td>Self-hosting</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
	</tbody>
</table>
</div>

#### Verdict

Matomo has feature parity with GA4 and even goes further thanks to its A/B testing and session recording features. Universal Analytics users will feel right at home using Matomo, too, making it a great choice for content and marketing teams.

### TelemetryDeck

![telemetrydeck](../images/blog/ga4-alternatives/telemetrydeck.png)

- **Best for:** Mobile apps
- **Tracking method:** Event-based
- **GDPR compliance:** <span className="text-green text-lg">✔</span>
- **GA data import:** <span className="text-red text-lg">✖</span>

While it can be used on websites, [TelemetryDeck](https://telemetrydeck.com/) is primarily a privacy-minded analytics tool for mobile apps. As such, it uses an event-based tracking model – TelemetryDeck calls them signals. It has first-party SDKs for Swift (iOS, macOS etc. apps), Kotlin (Android and Java apps), and Javascript (node and web apps).

TelemetryDeck makes it easy for app developers to track things like active users, OS version, app version, and basic user metadata like user location. It also supports basic retention and conversion funnel insights. TelemetryDeck only collects basic user metadata, so you don't need tracking consent banners.

#### TelemetryDeck vs Google Analytics 4

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
        	<td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Google Analytics 4</strong></td>
        	<td className="w-3/12 text-center"><strong>TelemetryDeck </strong></td>
    	</tr>
	</thead>
	<tbody>
		<tr>
        	<td>Website analytics</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Funnels</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>User Paths</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
          <td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Retention</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
       	<td>Revenue tracking</td>
      		<td className="text-center"><span className="text-green text-lg">✔</span></td>
       	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>User profiles</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
   		</tr>
    	<tr>
        	<td>Cohort analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>A/B testing</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Session recording</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Feature flags</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
		<tr>
        	<td>Self-hosting</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
	</tbody>
</table>
</div>

#### Verdict

TelemetryDECK is a good option for those who want basic app analytics, but it falls someway short of feature parity with GA4.

### Plausible

![Plausible Analytics - open source analytics tools](../images/blog/open-source-analytics-tools/plausible-screenshot.png)

- **Best for:** Content and marketing websites
- **Tracking method:** Session-based
- **GDPR compliance:** <span className="text-green text-lg">✔</span>
- **GA data import:** <span className="text-green text-lg">✔</span>

[Plausible](https://plausible.io/) is a leader in the trend of lightweight, privacy-orientated analytics tools. It's easy to use and doesn't collect any personally identifiable information. This makes it ideal for complying with GDPR, but this comes at the cost of functionality. 

Plausible, and others like it, are only able to track very basic website metrics like pageviews, session duration, and referrer information. This makes it useless for apps, and significantly less powerful than Google Analytics and other alternatives in this list.

#### Plausible vs Google Analytics 4

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
        	<td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Google Analytics 4</strong></td>
        	<td className="w-3/12 text-center"><strong>Plausible</strong></td>
    	</tr>
	</thead>
	<tbody>
		<tr>
        	<td>Website analytics</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Funnels</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>User Paths</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
          <td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Retention</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
       	<td>Revenue tracking</td>
      		<td className="text-center"><span className="text-green text-lg">✔</span></td>
       	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>User profiles</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
   		</tr>
    	<tr>
        	<td>Cohort analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>A/B testing</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Session recording</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Feature flags</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
		<tr>
        	<td>Self-hosting</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
	</tbody>
</table>
</div>

#### Verdict

While it lacks many of the advanced features of GA4, Plausible is a good option for content and marketing teams who just want easy to use, basic analytics functionality.

### Piwik PRO

![piwik pro](../images/blog/ga4-alternatives/piwik-pro.png)

- **Best for:** Content, marketing and e-commerce websites
- **Tracking method:** Session-based
- **GDPR compliance:** <span className="text-green text-lg">✔</span>
- **GA data import:** <span className="text-red text-lg">✖</span>

[Piwik PRO](https://piwik.pro/) is a commercial spinoff of Matomo – Matomo used be called Piwik. As such, there are some similarities between the two, such as session-based tracking and superficial UX similarities.

Piwik PRO's main differentiators are enterprise level support and the integration of a customer data platform (CDP). Like Matomo, it also puts an emphasis on privacy compliance by integrating a consent manager.

#### Piwik PRO vs Google Analytics 4

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
        	<td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Google Analytics 4</strong></td>
        	<td className="w-3/12 text-center"><strong>Piwik PRO</strong></td>
    	</tr>
	</thead>
	<tbody>
		<tr>
        	<td>Website analytics</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Funnels</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-gren text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>User Paths</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
          <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Retention</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
       	<td>Revenue tracking</td>
      		<td className="text-center"><span className="text-green text-lg">✔</span></td>
       	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>User profiles</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
   		</tr>
    	<tr>
        	<td>Cohort analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>A/B testing</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Session recording</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Feature flags</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
		<tr>
        	<td>Self-hosting</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
	</tbody>
</table>
</div>

#### Verdict

Unsurprisingly, Piwik PRO's roots in Matomo make it a popular choice for users who are familiar with Universal Analytics. It's less feature-rich than Matomo in some respects, but may be a better choice for larger organisations who require more support and scale.

### Fathom

![Fathom - GDPR compliant analytics](../images/blog/gdpr-compliant-analytics/fathom.png)

- **Best for:** Content and marketing websites
- **Tracking method:** Session-based
- **GDPR compliance:** <span className="text-green text-lg">✔</span>
- **GA data import:** <span className="text-red text-lg">✖</span>

[Fathom](https://usefathom.com/) is another leading privacy-focused analytics tool that's similar in scope to Plausible. It's ideal for small and medium-size marketing websites, but it lacks the deeper features typical Google Analytics users will demand. It doesn't currently support GA data import, though it is in development. 

#### Fathom vs Google Analytics 4

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
        	<td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Google Analytics 4</strong></td>
        	<td className="w-3/12 text-center"><strong>Plausible</strong></td>
    	</tr>
	</thead>
	<tbody>
		<tr>
        	<td>Website analytics</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Funnels</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>User Paths</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
          <td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Retention</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
       	<td>Revenue tracking</td>
      		<td className="text-center"><span className="text-green text-lg">✔</span></td>
       	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>User profiles</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
   		</tr>
    	<tr>
        	<td>Cohort analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>A/B testing</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Session recording</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Feature flags</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
		<tr>
        	<td>Self-hosting</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
	</tbody>
</table>
</div>

#### Verdict

There isn't much to choose between Fathom and the other privacy-first option on this list, Plausible. Again, if you want lightweight website analytics without the feature bloat of Google, you can't go wrong with Fathom.
