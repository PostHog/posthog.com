---
date: 2024-06-24
title: 'PostHog is now up to 80% cheaper'
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog_is_the_cheapest_e77c4ea4a5.jpg
author:
  - james-hawkins
tags:
  - PostHog news
---
import {ProductScreenshot} from 'components/ProductScreenshot'

export const Pricing = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog_pricing_ba910c9535.jpg"
export const PricingDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog_pricing_dark_6b11387d6c.jpg"
export const PricingComparison = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog_pricing_comparison_f0c9e11f40.jpg"
export const PricingComparisonDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog_pricing_comparison_dark_ecf7d726c0.jpg"

## TL;DR

* You can now use our product and web analytics for up to 80% less, making us cheaper than any popular competitive product.

* This is possible because we've introduced a new event processing option that enables you to capture events without person data. 

* Events without person data are cheaper for us to ingest and query. We're passing this saving onto you by introducing cheaper base event pricing and a new 'person profiles' event option, which is charged separately.

* Events with person profiles enabled cost the same as our old event pricing – i.e. base events + person profiles = our previous per event pricing. If you're an existing customer, you'll see a new 'person profiles' line item on your invoice, but your pricing has not increased.

* By default, events are captured with person profiles, but you can change this with a simple [configuration option](#how-do-i-start-using-it) whenever you like.

## How much can I save?

At lower volumes, our new event pricing is 80% cheaper than before. 

In real terms this means:

1. Someone sending us 10 million events per month would **save $9,060 a year** if they disabled person profiles for all events.

2. They would still **save $4,404 a year** if they used person profiles on 50% of their events.  

We expect teams to use a combination of events with and without person profiles depending on their needs, which you can see visualized below.

<br />

<ProductScreenshot
  imageLight={Pricing} 
  imageDark={PricingDark} 
  alt="New PostHog pricing" 
  classes="rounded"
/>

This makes us better value than any popular (>$10M in revenue) product analytics tool.

Here's how our new pricing compares to Mixpanel's:

<ProductScreenshot
  imageLight={PricingComparison} 
  imageDark={PricingComparisonDark} 
  alt="New PostHog pricing compared to Mixpanel" 
  classes="rounded"
/>

And here's a more detailed breakdown of the difference at each pricing tier:

| **Monthly events** | **New base event price** | **Base events + person profiles** | **Percentage diff.** |
|--------------------|--------------------------|-----------------------------------|----------------|
| <strong class="text-15px">Up to 1 million</strong>       | <strong class="text-green">Free</strong>                     | <strong class="text-green">Free</strong>                              | -              |
| <strong class="text-15px">1-2 million</strong>           | <span class="text-[15px] font-semibold">$0.0000500</span><span class="text-sm opacity-70">/event</span>       | <span class="text-[15px] font-semibold">$0.0002480</span><span class="text-sm opacity-70">/event</span>                | <strong class="text-green">-80%</strong>           |
| <strong class="text-15px">2-15 million</strong>          | <span class="text-[15px] font-semibold">$0.0000343</span><span class="text-sm opacity-70">/event</span>       | <span class="text-[15px] font-semibold">$0.0001040</span><span class="text-sm opacity-70">/event</span>                | <strong class="text-green">-67%</strong>           |
| <strong class="text-15px">15-50 million</strong>         | <span class="text-[15px] font-semibold">$0.0000295</span><span class="text-sm opacity-70">/event</span>       | <span class="text-[15px] font-semibold">$0.0000655</span><span class="text-sm opacity-70">/event</span>                | <strong class="text-green">-55%</strong>           |
| <strong class="text-15px">50-100 million</strong>        | <span class="text-[15px] font-semibold">$0.0000218</span><span class="text-sm opacity-70">/event</span>       | <span class="text-[15px] font-semibold">$0.0000364</span><span class="text-sm opacity-70">/event</span>                | <strong class="text-green">-40%</strong>           |
| <strong class="text-15px">100-250 million</strong>       | <span class="text-[15px] font-semibold">$0.0000150</span><span class="text-sm opacity-70">/event</span>      | <span class="text-[15px] font-semibold">$0.0000187</span><span class="text-sm opacity-70">/event</span>               | <strong class="text-green">-20%</strong>           |
| <strong class="text-15px">250+ million</strong>              | <span class="text-[15px] font-semibold">$0.0000090</span><span class="text-sm opacity-70">/event</span>       | <span class="text-[15px] font-semibold">$0.0000100</span><span class="text-sm opacity-70">/event</span>                | <strong class="text-green">-10%</strong>           |

## Who is this for?

Tracking events without person data is useful if:

- You want to track your marketing website and your product, but you don't need detailed information about visitors to your marketing website.
- You're willing to [lose some functionality](#whats-the-downside) for lower bills.
- You want to track API or server events, especially at high volumes. 
- You run a large e-commerce or content website with millions of users.
- You're not tracking a high-volume event because it would be prohibitively expensive.
- You want to use [autocapture](/docs/product-analytics/autocapture) to track events, but have turned it off to save money.

We recommend most people use the `identified_only` [configuration option](#how-do-i-start-using-it) for person profiles. This automatically captures person profiles for logged-in users of your product and website, but doesn't capture them for unidentified users where aggregate data is sufficient. 

This is how we've configured our own product and website tracking.

## What's the downside?

When sending events without person data, you cannot:

- Filter on persons (e.g. an individual user)
- Create cohorts filtered on person properties (e.g. paying vs non-paying users)
- Target by person properties for feature flags, A/B tests, and surveys.
- Receive initial UTM values for tracking marketing campaign performance (only the most recent).
- View a person’s profile in the app, or query the persons table in our SQL insights.
- Use [groups functionality](/docs/product-analytics/group-analytics) on standard events (without person profiles).

If you need the above functionality for all your traffic, you don't need to change anything. Continue to send person data with your events.

Person profiles are not all-or-nothing. You can use them on any traffic where you need more detailed information, and skip them when you don't need that detail. Read more about this in our [persons documentation](/docs/data/persons).

## Why are we doing this?

The short answer? Because we can.

The slightly longer answer? Because it's the right thing to do for both our users and our business.

Most of our competitors are inefficient. They employ huge [outbound sales teams](/founders/negotiate-software-better) to grow revenue. Their salaries and commissions for closing deals are passed onto their customers through higher prices.

In contrast, we're 100% inbound, we [grow mostly through word of mouth](/handbook/how-we-get-users), and we charge based on actual usage. 

We don't believe in loss leaders, so we make a modest positive margin on each event sold, but what we charge is directly connected to what it costs us, not what we think we can get away with charging.

We grow our revenue through helping you grow, and onboarding you onto other tools, like session replay, feature flags, and surveys as well.

We think this is better than trying to squeeze you for every cent you have. You have a great experience, and we'll enjoy better retention and word of mouth for doing the right thing.

## How do I start using it?

For most people, it only requires a simple config change to include `process_persons: "identified_only"` in the initialization of your JavaScript Web SDK or snippet.

This will track anonymous traffic without person profiles, and start collecting person data any time an identifying action is taken (i.e. using `identify()`, `group()`, setting person properties with `$set`, etc).

You can get more details on this and other use cases, like server-side events, in our [persons documentation](/docs/data/persons).

> ## FAQ
>
> #### Will my bill go up if I continue to use person profiles?
>
> No. Events with person profiles enabled cost the same as our old pricing. You'll see a new line item on your invoice, but what you pay won't change if you send person profiles on every event. 
>
> #### Why aren't you making the events with person profiles cheaper?
>
> Because events with person profiles cost a lot more for us to ingest and query. Not sending person data for certain events, however, saves us money, so we're passing that on.
>
> This aligns our interests with our customers, and means we can make a positive margin on all events ingested (beyond our free tier), so it is sustainable but not greedy!
>
> We're also working on reducing costs for events with person profiles enabled. When we do, we'll pass this saving on, too.
>
> #### I have a question you haven't answered...
>
> First, check out our [person](/docs/data/persons) and [person properties](/docs/product-analytics/person-properties) docs. 
>
> If those don't answer your question, you can leave a comment on this post, or ask a question in [our community forum](/questions).
>
> If it's an account specific question, get in touch with your account manager or raise a ticket in the app.