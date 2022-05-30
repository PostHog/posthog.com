---
date: 2022-05-30
title: PostHog vs Matomo
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Guides, Comparisons"]
author: ["andy-vandervell"]
---

PostHog and Matomo are both [open-source analytics platforms](/blog/best-open-source-analytics-tools) you can self-host on your own infrastructure, giving you complete control over your data and unrivaled privacy compliance. However, there are some important differences between the two platforms.

Matomo is primarily pitched as a Google Analytics alternative for marketing analytics, and offers useful tools for migrating GA data into Matomo for a seamless transition. Its focus on session tracking makes it ideal for running analytics on large content and e-commerce websites

In contrast, PostHog is a product analytics platform designed to show you what your users do in your product. PostHog is event-based, so it tracks not just what pages users are visiting and how they got there, but also helps you detect, understand and fix user experience problems. 

**Contents:**

- [How is PostHog different to Matomo?](#how-is-posthog-different-from-matomo)
- [PostHog vs Matomo feature comparison](#feature-comparison)
- [Integrations and data sources](#integrations-and-data-sources)
- [Strengths of PostHog](#strengths-of-posthog)
- [Strengths of Matomo](#strengths-of-matomo)
- [Coming soon to PostHog](#coming-soon-to-posthog)

## How is PostHog different from Matomo?

### 1. It's an all-in-one product analytics platform
Matomo charges extra for product analytics features like funnel analysis, cohorts, path analysis, and session recording, and they're not tightly integrated. In PostHog, these are core features in all editions, including the open source release, while Experimentation is a no cost feature at [less than 1 million events per month](/pricing).

### 2. Seamless integration with modern data stacks
PostHog is built to work seamlessly with your data stack. That means we offer data [import and export integrations with most popular data warehouses](#integrations-and-data-sources), as well as numerous integrations with CRMs (Hubspot, Salesforce), data platforms (Segment, Airbyte, Rudderstack), engineering tools (PagerDuty, Sentry), and more via the [PostHog App Store](/apps).

### 3. It's built for engineers
PostHog is about giving engineering and product teams the tools they need to build better products. The core product analytics tools are part of this, but we go further by providing market-leading feature flag functionality, and integrating Session Recording so you can deploy one platform that does everything, rather than integrating multiple discrete tools into your stack.

<ArrayCTA />

## Feature comparison

This table compares three self-hosted plans: Matomo On-Premise, PostHog Open Source, and PostHog Scale. 

Matomo On-Premise ships with a robust set of core web analytics features, while advanced product analytics features are available at various prices from the Matomo On-Premise Marketplace.

All features in PostHog Open Source are totally free, including core product analytics tools. 

PostHog Scale is a paid edition that adds Experimentation, Group Analytics, support for multiple projects, and numerous team management tools. It's priced on a per event basis and is free up to 1 million events per month.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
          <td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Matomo On-Premise</strong></td>
        	<td className="w-3/12 text-center"><strong>PostHog Open Source</strong></td>
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
			<td>Open source</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Host yourself</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>1st-party cookies</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
   		</tr>
    	<tr>
        	<td>Custom plugins</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
       	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Multiple projects</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Unlimited users</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Event autocapture</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>GDPR compliance</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>HIPAA compliance</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>API access</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Cookie-less option</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
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
        	<td>Correlation Analysis</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Content tracking</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Campaign tracking</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>User tracking</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>User profiles</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Activity logs</td>
        	<td className="text-center">29 to 89 EUR pa</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Funnel analysis</td>
        	<td className="text-center">179 to 529 EUR pa</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Cohorts</td>
        	<td className="text-center">89 to 259 EUR pa</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Path analysis</td>
        	<td className="text-center">89 to 259 EUR pa</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Multi-Channel Attribution</td>
        	<td className="text-center">79 to 229 EUR pa</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Session Recording & Heatmaps</td>
        	<td className="text-center">199 to 599 EUR pa</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Experimentation</td>
        	<td className="text-center">199 to 599 EUR pa</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Roll-up reporting</td>
        	<td className="text-center">199 to 599 EUR pa</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
    	</tr>
    	<tr>
        	<td>Hedgehogs</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
	</tbody>
</table>
</div>

## Integrations and data sources

Matomo doesn't offer many dedicated integrations for syncing data with other platforms, but its Tracking and Reporting APIs allow you query a large range of parameters.

In addition to extensive selection of integrations, PostHog [offers two APIs](/docs/api): a public API for pushing data into PostHog, and a private API for exporting data and performing various actions.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
        	<td className="w-3/12"></td>
        	<td className="w-3/12 text-center"><strong>Matomo</strong></td>
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
        	<td>API</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Redshift</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
          <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Google Cloud Storage</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
       	<td>Snowflake</td>
      		<td className="text-center"><span className="text-red text-lg">✖</span></td>
       	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Amazon S3</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td> 
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
   		</tr>
    	<tr>
        	<td>Google BigQuery</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td> 
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
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Salesforce</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Sentry</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Zapier</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Hubspot</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Salesforce</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td><strong>Import</strong></td>
        	<td></td>
        	<td></td>
    	</tr>
    	<tr>
        	<td>API</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Redshift</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Google Cloud Storage</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Snowflake</td>
			<td className="text-center"><span className="text-red text-lg">✖</span></td>
          <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Amazon S3</td>
			<td className="text-center"><span className="text-red text-lg">✖</span></td>
          <td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Sentry</td>
			<td className="text-center"><span className="text-red text-lg">✖</span></td>
          <td className="text-center"><span className="text-green text-lg">✔</span></td>        
    	</tr>
		<tr>
        	<td>Hubspot</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Salesforce</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
		<tr>
        	<td>Zapier</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
    	</tr>
    	<tr>
        	<td>Zendesk</td>
			<td className="text-center"><span className="text-red text-lg">✖</span></td>
          <td className="text-center"><span className="text-green text-lg">✔</span></td>       
    	</tr>
	</tbody>
</table>
</div>

## Strengths of PostHog

![PostHog screenshot](../images/blog/gdpr-compliant-analytics/posthog-gdpr-compliant.png)

### Feature Flag functionality

Feature Flags are at the core what makes PostHog a great tool for product-lead businesses. They're especially useful for gradually rolling out new features, and quickly rolling back if you detect problems, but they can be used in other creative ways. 

Need feedback on a design change? Roll it out to internal users first to gather feedback. Need to optimize messaging for different regions or demographics? Use a feature flag targeted on user properties. Want to change something without the CEO noticing? Create a flag just for them. Ok, we don't actually recommend the latter, but you get the idea.

### Automatic event tracking

PostHog and Matomo both support event tracking, but PostHog goes one step further by autocapturing events so you don't have to instrument every single thing before you start tracking it. This means you start capturing useful data from the moment you deploy PostHog, but it also makes rolling out updates much easier as you don't have to update your event instrumentation  

### Privacy compliance

Self-hosting PostHog means data never leaves your infrastructure, which makes protecting user privacy a breeze. GDPR and HIPAA compliance are vastly simplified this way, and you can go one step further by [running PostHog without any cookies](/docs/integrate/client/js#persistence) and therefore without the need for cookie banners.

## Strengths Matomo

![Matomo - open source analytics tools](../images/blog/open-source-analytics-tools/matomo-screenshot.png)

### E-commerce and marketing analytics

Matomo is especially well-suited to content and e-commerce websites. Unlike GA, it doesn't employ any data sampling, and it offers a wide-range of features specifically designed to aid marketing teams. For example, Matomo's Multi Channel Conversion Attribution reports (a paid feature) allow marketing teams to understand how all their activities impacted a conversion, not just the last interaction. 

### Privacy compliance and optional cookie-less tracking

Like PostHog, Matomo is a good option for anyone seeking a privacy-respecting analytics platform. While by default it uses cookies, it also offers the option for cookie-less tracking, and features a built-in GDPR Manager utility to help simplify and monitor your compliance. The European Union uses a forked version of Matomo on all its websites.

### Integration with popular content management systems

Matomo is ideal for anyone who uses popular off-the-shelf content management systems or e-commerce platforms. Websites with fewer than 50,000 page views per month can safely install Matomo straight from the WordPress plugin library, and Matomo offers an official integration with WooCommerce as well. There are community integrations for numerous other platforms, including Drupal, Joomla, DatoCMS, Pimcore, and Adobe Commerce.  

## Coming soon to PostHog

We ship new features fast. Here's a quick snapshot of what we're working on right now:

- Console log tracking in recordings
- Insight experience overhaul
- Export and share visualizations as image file
- Automated insight recommendations
- Lightning fast querying at billion event scale
- Multiple cloud environments
- Rapid ingestion pipeline
- Session analysis 2.0

Got a question? [Ask them here](/questions).

You can read about how we work in the open in [our company handbook](/handbook/getting-started/start-here).

<ArrayCTA />