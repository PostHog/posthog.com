---
date: 2022-05-13
title: PostHog vs Amplitude
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-vs-amplitude/posthog-vs-amplitude.jpg
featuredImageType: full
author:
  - andy-vandervell
  - joe-martin
category: General
tags:
  - Guides
  - Comparisons
---

**Contents:**

- [How is PostHog different to Amplitude?](#how-is-posthog-different-from-amplitude)
- [PostHog vs Amplitude feature comparison](#feature-comparison)
- [Integrations and data sources](#integrations-and-data-sources)
- [Strengths of PostHog](#strengths-of-posthog)
- [Strengths of Amplitude](#strengths-of-amplitude)
- [Coming soon to PostHog](#coming-soon-to-posthog)

## How is PostHog different from Amplitude?

Over 10,000 companies already use PostHog, and many have switched from Amplitude. Here are a few reasons why.

### 1. It's an all-in-one platform
PostHog is more than a product analytics tool, it's an all-in-one Product OS that replaces multiple tools in your data stack. You could run Amplitude for analytics, LaunchDarkly for feature flagging, Hotjar for session recording, and Optimizely for A/B testing, or you could just use PostHog for everything. One platform, one price: seamless integration.

### 2. It's built for engineers
Unlike Amplitude, PostHog is built for software developers. PostHog autocaptures data, so you don't have to spend time instrumenting events every time you update your app or website – we also offer robust tools for capturing custom events and actions when you need to. Our pricing is transparent, and we're entirely self-serve. You can setup PostHog and start paying us without ever speaking to a sales rep, but we have an [awesome customer success team](/get-in-touch#contact) if you have questions.

### 3. It's open source
Our MIT License isn’t just for show. You can access [our source code](https://github.com/PostHog/posthog), raise your own issues and PRs, and use it to [build your own apps](/docs/apps/build) or even add extra functionality. You also benefit from the work of other teams who build their own apps. And we're not just an open-source tool; we're an open-source company. Our [company handbook](/handbook) is open to everyone, as is [how we pay people](/handbook/people/compensation).

## Feature comparison

This table compares the Amplitude Analytics 'Growth' plan to PostHog Cloud, our fully-managed SaaS offering.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
            <td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Amplitude Analytics</strong></td>
        	<td className="w-3/12 text-center"><strong>PostHog Cloud</strong></td>
    	</tr>
	</thead>
	<tbody>
    	<tr>
        	<td><strong>Platform</strong></td>
        	<td></td>
        	<td></td>
    	</tr>
		<tr>
			<td>Host yourself</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Transparent pricing</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
       	<td>100% self-serve</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
       	    <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>1st-party cookies</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
   		</tr>
    	<tr>
        	<td>Custom plugins</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Multi-site</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Unlimited users</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Event autocapture</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>GDPR compliance</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>HIPAA compliance</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td><strong>Features</strong></td>
        	<td></td>
        	<td></td>
    	</tr>
    	<tr>
        	<td>Funnel analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Cohort analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Conversion tracking</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Retention tracking</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Revenue tracking</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>UTM tracking</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Event tracking</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Feature Flags</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span>*</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Heatmaps</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Session Recording</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Experimentation</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span>*</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Predictive analytics</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Hedgehogs</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
	</tbody>
</table>
</div>

*Feature Flags and Experimentation are part of a separate Amplitude product that's an additional cost on top of its core analytics suite.

## Integrations and data sources

Both Amplitude and PostHog integrate with a large number of data sources. The table below is a snapshot of what each platform offers – check out the [PostHog App Store](/apps) for a full list of what's available.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
        	<td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Amplitude Analytics</strong></td>
        	<td className="w-3/12 text-center"><strong>PostHog</strong></td>
    	</tr>
	</thead>
	<tbody>
    	<tr>
        	<td><strong>Export</strong></td>
        	<td></td>
        	<td></td>
    	</tr>
    	<tr>
        	<td>Redshift</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Google Cloud Storage</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
       	<td>Snowflake</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
       	    <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Amazon S3</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
   		</tr>
    	<tr>
        	<td>Google BigQuery</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Google Pub/Sub</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>RudderStack</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Hubspot</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Salesforce</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Sentry</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>API</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td><strong>Import</strong></td>
        	<td></td>
        	<td></td>
    	</tr>
    	<tr>
        	<td>Redshift</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Google Cloud Storage</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Snowflake</td>
			<td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Amazon S3</td>
			<td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Segment</td>
			<td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>      
    	</tr>
    	<tr>
        	<td>Sentry</td>
			<td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>        
    	</tr>
    	<tr>
        	<td>Zendesk</td>
			<td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>       
    	</tr>
    	<tr>
        	<td>API</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
	</tbody>
</table>
</div>

## Strengths of PostHog

![PostHog screenshot](../images/blog/gdpr-compliant-analytics/posthog-gdpr-compliant.png)

### Integrated session recording
While Amplitude and PostHog share many features, PostHog has [Session Recording](/product/session-recording) built in as standard.

Session recording is an incredibly powerful tool for understanding what people are actually doing in your product. The tight integration within PostHog means you can go from viewing a funnel insight to watching real users interact with the funnel, making it easy to diagnose problems and find solutions.

Amplitude doesn't have session recording, so you have to run a third-party tool [like Hotjar or FullStory](/blog/best-open-source-session-replay-tools) as well – an added expense that lacks the tight integration afforded by a built-in app.

### Experimentation and Feature Flags

Feature Flags and Experimentation (A/B testing and multivariate tests) are core PostHog features, available for free for anyone generating fewer than 1 million events per month. Feature Flags are also free as part of [PostHog Open Source](/signup/self-host)

Amplitude Analytics doesn't include feature flags or experimentation by default, instead bundling them as part of a separate product, Amplitude Experiment, an additional cost on top of its core analytics product.

### Transparent pricing

All versions of PostHog are transparently priced – even the [Enterprise version](/pricing), which adds single sign-on (SAML), team training, instance monitoring, and more. Paid tiers (excluding Enterprise) are free up to 1 million events per month, and pricing calculators show exactly how much you'll pay when you go over 1 million. The more you use, the cheaper it gets per event.

Amplitude doesn't share its pricing publibly, so you have to speak to their sales team to get up and running, and negotiate a price based on your usage. It's a bit like a really expensive restaurant. It looks fancy and expensive from the outside, but you only find out just how expensive it is when you're already sat at your table.

## Strengths of Amplitude

![Amplitude](../images/blog/posthog-vs-amplitude/amplitude-screenshot.png)

### Personalization engine and machine learning

In addition to its analytics product, Amplitude offers Amplitude Recommend, a personalization engine powered by machine learning. It allows teams to create custom experiences, such as product recommendations or priority ordering, based on machine learning predictions. This is a potentially powerful tool for large e-commerce businesses who are looking to create an Amazon-style shopping experience.

Amplitude also uses machine learning to power what it calls predictive analytics, which estimates future outcomes (e.g. future conversion rate) based on current and historical data. This could be useful for performance forecasting, especially for marketing teams.

### Free up to 10 million events per month

Amplitude's entry-level tier is free to use up to 10 million events per month, which compares very favorably to rivals like Mixpanel (up to 100k monthly users), Pendo (up to 1,000 monthly users) and Heap (up to 10,000 sessions per month). Once you exceed 10 million events, you'll need to speak to Amplitude's sales team to proceed further.

PostHog Cloud and PostHog Self-Hosted are free up to 1 million events per month, but unlike Amplitude you get premium features like Experimentation, Correlation Analysis, Group Analytics and user permissions for free when you're under this limit.

PostHog Open Source is free for life, but is limited to one project. It includes all the core analytics features, such as Funnels, Trends, Cohorts, Paths, Feature Flags, and Session Recording, but doesn't have Experimentation or Correlation Analysis.

## Coming soon to PostHog

We ship weirdly fast. Here's a quick snapshot of what we're working on right now:

- SOC 2 compliance
- PostHog Customer Data Platform
- See Users & Recordings linked to feature flags ([GitHub issue](https://github.com/PostHog/posthog/issues/12360))
- Direct access to data via SQL ([GitHub issue](https://github.com/PostHog/posthog/issues/12352))
- Feature flags platform for Android, iOS and Flutter
- Mobile session recordings
- Interlinking recordings and analytics

You can view and vote on issues on [our public roadmap](/roadmap).

You can also take a look at [recent issues](https://github.com/PostHog/posthog/issues) and [pull requests](https://github.com/PostHog/posthog/pulls) on the [PostHog repo](https://github.com/PostHog/posthog) to see what we're working on.

At PostHog, nearly everything we do is done in the open. You can chat with our engineers directly in the [community Slack](/slack), or ask them questions on [any of our docs pages](/docs). 

You can read all about how we work in our [company handbook](/handbook/getting-started/start-here).

<ArrayCTA /> 
