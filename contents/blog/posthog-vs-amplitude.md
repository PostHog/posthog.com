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
categories: ["Guides", "Open source", "Comparisons"]
---

PostHog and Amplitude are both product analytics tools. That means they tell you where users are coming from and how they interact with your product, so that you can find ways to make it better.

But we think PostHog is a more powerful tool for building better products. Not only does offer it more features and tools for engineers to understand their users, it's an open platform that you can self-host and customize to your needs.

**Contents:**

- [How is PostHog different to Amplitude?](#how-is-posthog-different-from-amplitude)
- [PostHog vs Amplitude feature comparison](#feature-comparison)
- [Integrations and data sources](#integrations-and-data-sources)
- [Strengths of PostHog](#strengths-of-posthog)
- [Strengths of Amplitude](#strengths-of-amplitude)
- [Coming soon to PostHog](#coming-soon-to-posthog)

## How is PostHog different from Amplitude?

Let's start with the core differences. Over 9,000 companies already use PostHog, and [many have switched from Amplitude](/customers/saga). Here are a few reasons why.

### 1. You control your data
You can self-host PostHog and keep total control of your data. That means no third-party cookies, no data sharing, and straightforward [GDPR](/docs/privacy/gdpr-compliance) and [HIPAA compliance](/docs/privacy/hipaa-compliance). We also offer PostHog Cloud for those who prefer a fully-managed SaaS experience, while partners like [Altinity](/marketplace/altinity) can manage a self-hosted instance on your behalf.

### 2. It's built for engineers
Unlike Amplitude, PostHog is built for software developers. PostHog autocaptures events, so you don't need to waste time instrumenting events every time you update your app or website. Our pricing is transparent, and we're entirely self-serve. You can setup PostHog and start paying us without ever speaking to a sales rep, but we have an [awesome customer success team](/signup/self-host/get-in-touch?plan=scale&demo=scale#demo) if you have questions.

### 3. It's open source
Our MIT License isn’t just for show. You can access [our source code](https://github.com/PostHog/posthog), raise your own issues and PRs, and use it to [build your own plugins](/docs/plugins/build) or even add extra functionality. You also benefit from the work of other teams who build their own plugins. And we're not just an open-source tool; we're an open-source company. Our [company handbook](/handbook) is open to everyone, as is [how we pay people](/handbook/people/compensation).

<ArrayCTA /> 

## Feature comparison

This table compares the Amplitude Analytics 'Growth' plan to PostHog Cloud, our fully-managed SaaS offering, and [PostHog Scale](/pricing) – the paid tier of our self-hosted platform. 

We also offer [PostHog Enterprise](/enterprise), which includes everything from Scale but adds enhanced training and support, SLA with downtime developer pairing, SSO, SAML, instance monitoring, and more.  

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
            <td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Amplitude Analytics</strong></td>
        	<td className="w-3/12 text-center"><strong>PostHog Cloud</strong></td>
        	<td className="w-3/12 text-center"><strong>PostHog Scale</strong></td>
    	</tr>
	</thead>
	<tbody>
    	<tr>
        	<td><strong>Platform</strong></td>
        	<td></td>
        	<td></td>
        	<td></td>
    	</tr>
		<tr>
			<td>Host yourself</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
			<td>Open source</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Transparent pricing</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
       	<td>100% self-serve</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
       	    <td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>1st-party cookies</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
   		</tr>
    	<tr>
        	<td>Custom plugins</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
       	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Multi-site</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Unlimited users</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Autocapture</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>GDPR compliance</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>HIPAA compliance</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td><strong>Features</strong></td>
        	<td></td>
        	<td></td>
        	<td></td>
    	</tr>
    	<tr>
        	<td>Feature Flags</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span>*</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Heatmaps</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Session Recording</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Event tracking</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Experimentation</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span>*</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Funnel analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Cohort analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Retention tracking</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Dashboards</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Correlation analysis</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Predictive analytics</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Hedgehogs</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td></td>
        	<td></td>
        	<td className="text-center"><a href="/pricing">Learn more</a></td>
        	<td className="text-center"><a href="/pricing">Learn more</a></td>
    	</tr>
	</tbody>
</table>
</div>

*Feature Flags and Experimentation are part of a separate Amplitude product that's an additional cost on top of its core analytics suite.

## Integrations and data sources

Both Amplitude and PostHog integrate with a large number of data sources. The table below is a snapshot of what each platform offers - but check out [PostHog's integration library](/integrations) for a full list of what's available.

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
        	<td className="text-center"><span className="text-green text-lg">✔</span>*</td>
    	</tr>
    	<tr>
        	<td>Google Cloud Storage</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span>**</td>
    	</tr>
    	<tr>
        	<td>Snowflake</td>
			<td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span>**</td>
    	</tr>
    	<tr>
        	<td>Amazon S3</td>
			<td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span>**</td>
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

*[Redshift to PostHog import plugin](/integrations/redshift-import-plugin-(beta)) currently in beta

**Import available via [reverse ETL integration by Hightouch](/blog/hightouch-posthog-reverse-etl-integration)

## Strengths of PostHog

### Hosting flexibility and privacy

PostHog offers the option to either [self-host your analytics](/docs/self-host) or use a managed cloud service, whereas Amplitude is strictly a cloud-only platform. While self-hosting isn't for everyone, it's often the best solution for a number of use cases. 

Cloud platforms are incompatible with any business who values user privacy – many PostHog users use us because they handle sensitive client data – or those who need to comply with privacy legislation, such as HIPAA in the US. 

HIPAA requires that any third-party handling personal health information enter into a legal agreement, but Amplitude doesn't offer this option. Self-hosting PostHog doesn't require any additional legal agreements as data never leaves your infrastructure. Read our [HIPAA guidance](/docs/privacy/hipaa-compliance) for more information.

### Integrated session recording
While Amplitude and PostHog share many features, PostHog has [Session Recording](/product/session-recording) built in as standard.

Session recording is an incredibly powerful tool for understanding what people are actually doing in your product. The tight integration within PostHog means you can go from viewing a funnel insight to watching real users interact with the funnel, making it easy to diagnose problems and find solutions.

Amplitude doesn't have session recording, so you have to run a third-party tool [like Hotjar or FullStory](/blog/best-open-source-session-replay-tools) as well – an added expense that lacks the tight integration afforded by a built-in app.

### Experimentation and Feature Flags

Feature Flags and Experimentation (A/B testing and multivariate tests) are core PostHog features, available for free for anyone generating fewer than 1 million events per month. Feature Flags are also free as part of [PostHog Open Source](/signup/self-host)

Amplitude Analytics doesn't include feature flags or experimentation by default, instead bundling them as part of a separate product, Amplitude Experiment, an additional cost on top of its core analytics product.

### Transparent pricing

All versions of PostHog are transparently priced – even the [Enterprise version](/pricing), which adds single sign-on (SAML), team training, instance monitoring, and more. Paid tiers (excluding Enterprise) are free up to 1 million events per month, and pricing calculators show exactly how much you'll pay when you go over 1 million. The more you use, the cheaper it gets per event.

Amplitude doesn't share its pricing publibly, so you have to speak to their sales team to get up and running, and negotiate a price based on your usage. It's a bit like a really expensive restaurants. It looks fancy and expensive, but you only find out how expensive it is when you're already sat at your table.

## Strengths of Amplitude

### Personalization engine and machine learning

In addition to its analytics product, Amplitude offers Amplitude Recommend, a personalization engine powered by machine learning. It allows teams to create custom experiences, such as product recommendations or priority ordering, based on machine learning predictions. This is a potentially powerful tool for large e-commerce businesses who are looking to create an Amazon-style shopping experience.

Amplitude also uses machine learning to power what it calls predictive analytics, which estimates future outcomes (e.g. future conversion rate) based on current and historical data. This could be useful for performance forecasting, especially for marketing teams.

### Free up to 10 million events per month

Amplitude's entry-level tier is free to use up to 10 million events per month, which compares very favorably to rivals like Mixpanel (up to 100k monthly users), Pendo (up to 1,000 monthly users) and Heap (up to 10,000 sessions per month). Once you exceed 10 million events, you'll need to speak to Amplitude's sales team to proceed further.

PostHog Cloud and PostHog Scale are free up to 1 million events per month, but unlike Amplitude you get premium features like Experimentation, Correlation Analysis, Group Analytics and user permissions for free when you're under this limit.

PostHog Open Source is free for life, but is limited to one project. It includes all the core analytics features, such as Funnels, Trends, Cohorts, Paths, Feature Flags, and Session Recording, but doesn't have Experimentation or Correlation Analysis.

## Coming soon to PostHog

We ship weirdly fast. Here's a quick snapshot of what we're working on right now:

- Console log tracking in recordings
- Insight experience overhaul
- Export and share visualizations as image file
- Automated insight recommendations
- Session analysis 2.0
- Lightning fast querying at billion event and person scale
- Enhanced plugin development experience
- Rapid ingestion pipeline

You can also take a look at [recent issues](https://github.com/PostHog/posthog/issues) and [pull requests](https://github.com/PostHog/posthog/pulls) on the [PostHog repo](https://github.com/PostHog/posthog) to see what we're working on.

At PostHog, nearly everything we do is done in the open. You can chat with our engineers directly in the [community Slack](/slack), or ask them questions on [any of our docs pages](/docs). 

You can read all about how we work in our [company handbook](/handbook/getting-started/start-here).

<ArrayCTA /> 