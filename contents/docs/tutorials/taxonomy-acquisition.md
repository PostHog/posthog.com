---
title: Set up deep dive acquisition dashboards
sidebar: Docs
showTitle: true
---

This tutorial will help you:

1. send the _right_ events into PostHog, and:
1. set up dashboards

so your product and growth teams can answer the most important questions about user acquisition.

# Pre-Requisites

To follow this tutorial along, you need to:

1. Have [deployed PostHog](/docs/deployment).
1. Have started receiving events via our [snippet](/docs/integrate/client/js), one of our [integrations](/docs/integrate), via pushing from a data warehouse, or our [API](/docs/api).

# Dashboard setup

This tutorial recommends three levels of dashboard:

- Acquisition (amongst other key metrics - Activation, Retention, Revenue and Referral)
  - Deep dive: acquisition. This details Where acqusition is coming from (ie a change to conversion/traffic/untracked conversions)
    - Deep dive: traffic. This details where traffic is coming from.

Note - we only break down traffic further, we don't do the same for conversion or untracked conversions.

# Event taxonomy required

Now you've a sense of how to breakdown acquisition, it's time to figure out which dashboard _items_ (ie the range of graphs that appear within a dashboard) should look.

!> All of the following should be plotted as a time series. That means you can understand which metric moved, causing another metric to move.

You need to define these events within your product, and to push them to PostHog. For example, "traffic" may mean people visiting your website, visiting an individual landing page and so on. Or show both if either could be relevant.

- _Acquisition dashboard:_ [User acqusition](#user-acquisition) over time (this should be placed alongside Activation, Retention, Referral and Revenue - tutorials for those to come another time).
  - _Deep dive: Acquisition dashboard:_ [Users - traffic](#users--traffic)
    - _Deep dive: traffic dashboard:_ [Users - traffic - by utm_source](#users--traffic--by-utmsource)
    - _Deep dive: traffic dashboard:_ [Users - traffic - by utm_medium](#users--traffic--by-utmmedium)
    - _Deep dive: traffic dashboard:_ [Users - traffic - by utm_campaign]((#users--traffic--by-utmcampaign))
    - _Deep dive: traffic dashboard:_ [Users - traffic - by utm_content]((#users--traffic--by-utmcontent))
    - _Deep dive: traffic dashboard:_ [Users - traffic - by utm_term](#users--traffic--by-utmterm)
    - _Deep dive: traffic dashboard:_ [Users - traffic - by initial referring domain](#users--traffic--by-initial-referring-domain)
  - _Deep dive: acqusition dashboard:_ [Users - sign ups - conversion rate](#users--sign-ups--conversion-rate)
  - _Deep dive: acqusition dashboard:_ Optional: [Users - sign ups - non-funnel](#users--signups--nonfunnel)
 
## Taxonomy definitions

### User acquisition

This helps you understand how many users your product is getting.

How many users created an account so you can identify them.

These users do not need to have activated.

If you're a B2B company focused on product-led growth, we'd suggest focusing on _users_ not _customers_. This is because by focusing on building for end users, you will build a product that users want to use, and from that revenue will follow.

### Users - traffic

More traffic to the top page of your funnel means more sign ups.

You should use _unique_ pageviews for this, as the volume of users appearing is more relevant.

You also have the option of considering traffic _only_ on the top part of your funnel, _or_ traffic to your overall website.

If you take an overall traffic approach, which we'd recommend (especially if you do lots of top of funnel awareness-building content), you should consider that your funnel's top step needs to include _every_ page you count here, _and_ it's then worth also including a dashboard item to show traffic to specific pages on which people can sign up. You could even include a funnel showing your conversion from _any_ landing page without a signup action to pages _with_ a signup action.

### Users - traffic - by utm_source

Same as [Users - traffic](#users--traffic), but broken down by utm_source.

If users land on your website with [utm parameters](https://blog.hootsuite.com/how-to-use-utm-parameters/) passed to the url (ie example.com/?utm_source=google), PostHog will automatically capture their values (if you're using our javascript snippet).

utm_source is typically used to track the traffic source - ie Bing/Google/Facebook/Instagram.

### Users - traffic - by utm_medium

Same as [Users - traffic - by utm_source](#users--traffic--by-utmsource), except with a different parameter.

utm_medium is designed to track which category of marketing channels your visitors came from. For example, social media, organic search, pay per click, email or affiliates.

### Users - traffic - by utm_campaign

Same as [Users - traffic - by utm_source](#users--traffic--by-utmsource), except with a different parameter.

utm_campaign is designed to track which marketing efforts led to this user finding your website or product.

### Users - traffic - by initial referring domain

You won't always have utm parameters for inbound traffic, for example - imagine a blogger had organically dropped a link to your website from theirs, or if you get traffic from search engines.

Seeing traffic by initial referring domain helps you understand how these link sources that you don't control are performing.

### Users - signups - non-funnel

You may be signing up users outside of your funnel. Typical examples of when this happens:

* Your own team creates these manually. This happens with many companies who don't have a self serve signup process.
* For B2B, the second, third, fourth, etc users added into an existing team may come through the rest of their team using your platform already. We'll write future tutorials about how to track referrals like this.