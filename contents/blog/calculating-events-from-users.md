---
date: 2022-06-21
title: The two ways to estimate your monthly event usage
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/data-management-feature/posthog-data-management.png
featuredImageType: full
author:
  - simon-fisher
category: Using PostHog
tags:
  - Guides
---

When talking through our editions and pricing options with potential customers I'm often asked "How can I estimate my event count?"

If you're not already using an analytics tool, or it doesn't readily give you a count of tracked events, it can be quite tricky to figure out how much adopting an event-based platform like PostHog is going to cost you.

This guide explains why we price by event and offers some tips for estimating your usage.

## Why we price based on events

Pricing software is hard. It's a delicate balance between being affordable for your [ideal customer profile](/newsletter/ideal-customer-profile-framework), competitive in the marketplace, while still allowing you to grow and fund further development in the product.

We settled on event-based pricing for two main reasons:

1. Events are the main thing we store in our Clickhouse database in PostHog Cloud. The more events we store, the higher our own infrastructure costs.  It's only fair that we incorporate those running costs into our pricing.

2. Product analytics is all about visualizing data about events which your users trigger. The more events available to you for analysis, the richer that analysis will be.

Although point one is mainly focused on our own Cloud, we wanted pricing parity between our Cloud and self-hosted editions so that it was easy to migrate between the two. Hence event-based pricing for all editions.

## Ok, that makes sense, but how do I calculate my event count?

There are two ways to estimate your event count. One takes a bit of time but will give you a very accurate estimate; the second is much quicker but is more of a guestimate.

### 1. Start sending event data to PostHog Cloud

The most accurate way to figure out your event count is to take advantage of our [1 million event per month free tier](/pricing) on PostHog Cloud.

Simply use one of our [libraries](/docs/integrate#libraries) to send your event data to PostHog ([autocapture](/docs/integrate/ingest-live-data#use-autocapture) is easiest) and check your event usage on the [Billing](https://app.posthog.com/organization/billing) page in the app.

Once you've sent a typical week's worth of data then you can do some multiplication to project your monthly event count. 

If you get close to the 1 million event limit then you can stop sending events and project forward based on how many days worth of data has already been captured.

### 2. Estimate based on MAU and your product category

Most people who come to us not knowing their event count will have a handle on their monthly active user (MAU) number.  

This can be a useful starting point, but user interaction patterns vary by type of product, industry and target persona:

* For a banking app I might log in, check my balance, look at a few offers and then log out, generating a few events

* For a social media app I might log in, check what my friends had for dinner, watch endless videos of cats jumping off things, find an appropriate GIF to send to my cousin for her birthday, all generating hundreds of events

* For an infrastructure monitoring product I could be checking it in the morning and then only visiting the app if I'm alerted to a problem, generating events sporadically

Event counts also vary based upon whether you are using [autocapture](/docs/integrate/ingest-live-data#use-autocapture), [custom capture](/docs/integrate/ingest-live-data#capture-user-events) or a combination of both.  

As autocapture generates events for every pageview and click, it can start to get quite noisy, however there are things that can be done to limit that.

## Example event counts from PostHog users

For a little more context, we took a look at PostHog Cloud customers to get a better understanding of how event counts map to MAUs.

As a rule of thumb, most fell within the range of 50-100 tracked events per MAU per month. 

We then did a deeper analysis of the different types of customers and came up with the following list of product types and expected monthly events per MAU.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
	<thead>
    	<tr>
			<td className="w-3/12"><strong>Product</strong></td>
        	<td className="w-3/12 text-center"><strong>B2B / B2C</strong></td>
        	<td className="w-3/12 text-center"><strong>Monthly events per MAU</strong></td>
        	<td className="w-3/12 text-center"><strong>Autocapture</strong></td>
        	<td className="w-3/12 text-center"><strong>Platforms</strong></td>
    	</tr>
	</thead>
	<tbody>
		<tr>
			<td>PostHog</td>
        	<td className="text-center">B2B</td>
        	<td className="text-center">87</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>
        	<td className="text-center">Web</td>
      	</tr>
		<tr>
			<td>Financial reporting</td>
        	<td className="text-center">B2B</td>
        	<td className="text-center">44</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>        <td className="text-center">Web</td>
    	</tr>
		<tr>
			<td>Cloud monitoring</td>
        	<td className="text-center">B2B</td>
        	<td className="text-center">22</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>	
          	<td className="text-center">Web</td>
      	</tr>
		<tr>
			<td>Document management</td>
        	<td className="text-center">B2B</td>
        	<td className="text-center">54</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>     	<td className="text-center">Web</td>
      	</tr>
		<tr>
			<td>Speech to text API</td>
        	<td className="text-center">B2B</td>
        	<td className="text-center">583</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>        <td className="text-center">API</td>
     	</tr>
		<tr>
			<td>Crypto wallet</td>
        	<td className="text-center">B2C</td>
        	<td className="text-center">162</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>        <td className="text-center">Browser extension</td>
      	</tr>
		<tr>
			<td>Meditation app</td>
        	<td className="text-center">B2C</td>
        	<td className="text-center">118</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>        <td className="text-center">Android, iOS</td>
      	</tr>
		<tr>
			<td>Fashion retail</td>
        	<td className="text-center">B2C</td>
        	<td className="text-center">31</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>         <td className="text-center">Web</td>
      	</tr>
		<tr>
			<td>Event booking</td>
        	<td className="text-center">B2C</td>
        	<td className="text-center">8</td>
        	<td className="text-center"><span className="text-red text-lg">✖</span></td>        <td className="text-center">React Native</td>
    	</tr>
		<tr>
			<td>Restaurant booking</td>
        	<td className="text-center">B2B2C</td>
        	<td className="text-center">54</td>
        	<td className="text-center"><span className="text-green text-lg">✔</span></td>        <td className="text-center">Web, Mobile</td>
    	</tr>	
	</tbody>
</table>
</div>

As you can see, event counts vary wildly across different types of products, but this should help you get closer to an estimated event count
based on your product and MAU count.

Once you've got this figure you can visit the [pricing](/pricing) page and calculate your estimated costs for adopting PostHog. 

And don't forget, PostHog Cloud and Scale are free for up to 1 million tracked events per month.

<ArrayCTA />
