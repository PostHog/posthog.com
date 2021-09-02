---
title: Setting up an Acquisition Taxonomy
sidebar: Docs
showTitle: true
---

This tutorial will help you send the right events into PostHog to get a deep understanding of 

Getting the taxonomy right for Acquisition will help your product and growth teams understand very deeply how to find more users.

# Pre-Requisites

To follow this tutorial along, you need to:

1. Have [deployed PostHog](/docs/deployment).
1. Have started receiving events via our [snippet](/docs/integrate/client/js), one of our [integrations](/docs/integrate/overview), or our [API](/docs/api/overview)

# Taxonomy

- User acqusition
  - Users - traffic
    - Users - traffic - by utm_source
    - Users - traffic - by utm_medium
    - Users - traffic - by utm_campaign
    - Users - traffic - by utm_content
    - Users - traffic - by utm_term
    - Users - traffic - by initial referring domain
  - Users - sign ups - conversion rate
  - Optional: Users - sign ups - non-funnel
 
## Taxonomy definitions

### User acquisition

This helps you understand how many users your product is getting.

How many users created an account so you can identify them.

These users do not need to have activated.

If you're a B2B company focussed on product-led growth, we'd suggest focussing on _users_ not _customers_. This is because by focussing on building for end users, you will build a product that users want to use, and from that revenue will follow.

### Users - traffic

More traffic to the top page of your funnel means more sign ups.

You should use _unique_ pageviews for this, as the volume of users appearing is more relevant.

You also have the option of considering traffic _only_ on the top part of your funnel, _or_ traffic to your overall website.

If you take an overall traffic approach, you should consider that your funnel's top step needs to include _every_ page you count here, _or_

### Users - traffic - by utm_source

Same as [Users - traffic](#users--traffic), but broken down by utm_source.

If users land on your website with utm parameters passed to the url (ie example.com/?utm_source=google), PostHog will automatically capture their values.

utm_source is typically used to track the traffic source - ie Bing/Google/Facebook/Instagram.

### Users - traffic - by utm_medium

Same as [Users - traffic - by utm_source](#users--traffic--by-utmsource), except with a different parameter.

utm_medium is designed to track which category of marketing channels your visitors came from. For example, social media, organic search, pay per click, email or affiliates.

### Users - traffic - by utm_campaign

Same as [Users - traffic - by utm_source](#users--traffic--by-utmsource), except with a different parameter.

utm_campaign is designed to track which marketing efforts led to this user finding your website or product.

### Users - traffic - by initial referring domain

You won't always have UTM tags for inbound traffic, for example - imagine a blogger had dropped a link to your website from theirs, or if you get traffic from Google.

Seeing traffic by initial referring domain helps you understand how these link sources that you don't control are performing.

### Non funnel users

You may be signing up users outside of your funnel. Typical examples of when this happens:

* Your own team creates these manually.
* For B2B, the second, third, fourth, etc users added into an existing team may come through a dif