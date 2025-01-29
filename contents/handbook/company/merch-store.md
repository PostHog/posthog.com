---
title: Merch store
sidebar: Handbook
showTitle: true
---

We have a [merch store](/merch) where our community can purchase high quality PostHog-branded merch.

Instructions for how to get a merch code to our customers is [below](https://posthog.com/handbook/company/merch-store#customers), however if you need any help just send a message to the <PrivateLink url="https://posthog.slack.com/archives/C04DWKH7DM3">#merch</PrivateLink> channel and somebody will be happy to help.

Merch codes can also be generated directly from within Zendesk.

## How do we think about merch?

We care about:

* **Quality** - our merch _must_ be something you would personally want to wear or use
* **Sustainability** - our merch shouldn't be something that's never used or made in an unsustainable way
* **Shippability** - we should do our best to ensure anyone in our community anywhere in the world can receive merch easily

## How do we manufacture merch?

We use [Brilliant](https://www.brilliantmade.com/) to manufacture and fulfill our merch. Anyone can suggest a product for us to sell or give away. 

1. The Words & Pictures team ultimately decide on what items we wish to sell or give away (including how many and sizes)
2. Lottie provide assets to produce and order these items in to stock

## How do we ship merch?

Shipping is also done through Brilliant - they can ship to over 200 territories worldwide:

* When orders come in from our Shopify store they will automatically be shipped to the people who order them via Brilliant
* If you want to ship merch for an event or as part of a giveaway, do this from the Brilliant dashboard.

## How do we sell merch?
We sell it through our [merch store](/merch) store on Shopify - access details are in 1Password.

## How do we give away merch for free?

### Customers

Create a discount code in <PrivateLink url="https://admin.shopify.com/store/posthog/discounts">Shopify admin</PrivateLink>. When creating the discount, select "amount off products" then choose if it is a percentage off or a fixed amount - usually we do fixed amounts of $50 or $100 depending on the purpose. The you can choose "specific collections" and choose "All Products". Limit the use to one use per customer, otherwise it's unlimited free stuff for them, unlimited high cost for us! For code contributions we tend to do $50, with no expiration date.

### PostHog team

If you want more, <PrivateLink url="https://github.com/PostHog/runbooks/blob/main/docs/merch.md"> here's how to get it! </PrivateLink> 

As always, we expect you to use this with restraint and with your own good judgement. The merch store should not become your sole source of clothing for your wardrobe, nor where you go any time a friend has a birthday. But sure, go ahead and buy your mom (or yourself) a hat or a hoodie!

### YC Deal

You can find instructions for this on the dedicated [YC Deal page](/handbook/growth/sales/yc-onboarding).

## How are Brilliant and Shopify connected?

The Website & Vibes team built the integration with Brilliant. It relies on webhooks to check stock levels and sends orders to Brilliant via their API.

## How do I add a new product to Shopify?

[Follow these instructions.](/handbook/engineering/posthog-com/merch-store)

## Troubleshooting customer orders

Sometimes customers get in touch with us because their order hasn't arrived. There are a couple of things you can do:

1. Check the <PrivateLink url="https://app.brilliantmade.com/store/3002/history">orders status</PrivateLink> in Brilliant.
1. If you don't see the order listed in Brilliant, check <PrivateLink url="https://admin.shopify.com/store/posthog/orders">Shopify</PrivateLink>. If the order is listed there, there may have been a problem with transmitting the order from Shopify to Brilliant. Please mention this in the #merch channel immediately so the Website & Vibes team can look into it.

> **Note:** There have been some issues with fulfilling orders to Brazil due to the country's customs policies.

If for some reason their second order attempt doesn't make it through, refund their money and apologetically let them know that unfortunately our supplier is having issues shipping to their address. It's better to stop the back-and-forth at that point, rather than having a frustrated customer placing multiple orders that don't work. We aren't an e-commerce business, so ensuring a flawless merch store experience for a handful of edge case orders is not a priority!

If the customer was given a merch code to thank them for submitting a PR, you can offer to make a donation on their behalf for the equivalent amount to a company of their choice on [Open Collective](https://opencollective.com/search?q=&type=COLLECTIVE) instead. 
