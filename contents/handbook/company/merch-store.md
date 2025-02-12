---
title: Merch store
sidebar: Handbook
showTitle: true
---

We have a [merch store](/merch) where our community can purchase high quality PostHog-branded merch. The People & Ops team is responsible for managing merch inventory, fulfillment etc. even though multiple people contribute, and Kendal is the point person.

We use [Brilliant](https://www.brilliantmade.com/) to manufacture and fulfill our merch. Anyone can suggest a product for us to sell or give away. 

The Words & Pictures team ultimately decide on what items we wish to sell or give away (including how many and sizes), and Lottie provide assets to produce and order these items in to stock.

We generally try to launch new products in line with the typical fashion cycle (spring/summer and fall/winter). However, this doesn't mean we can't do fun side quests! If you are looking to do an off-cycle merch run, just make sure you keep Kendal in the loop so the admin side goes smoothly.

## How to reorder merch

All of our permanent merch items are reordered via Brilliant. To do this you need to:

1. Request a restock quote for the item(s) and enter the quantity you need
2. Approve the estimate that will be sent from Brilliant (this will trigger the order to start being worked on)
3. Pay the invoice via Brex once it comes in (usually in 1-2 days after estimate approval)

It's really important that we do not allow stock levels to run low as restocking items can take a couple of weeks, so the Ops team will regularly check inventory levels. However if you happen to see anything looking amiss, or you know you want to place a big order for a customer that may affect our stock levels a lot, just let Kendal know ahead of time!

## Adding new items

The Website & Vibes team built the integration with Brilliant. It relies on webhooks to check stock levels and sends orders to Brilliant via their API. To add new products to Shopify, [follow these instructions.](/handbook/engineering/posthog-com/merch-store).

## Shipping

Shipping is also done through Brilliant - they can ship to over 200 territories worldwide:

* When orders come in from our Shopify store they will automatically be shipped to the people who order them via Brilliant
* If you want to ship merch for an event or as part of a giveaway, do this from the Brilliant dashboard.

## Merch giveaways

### Customers

Create a discount code in <PrivateLink url="https://admin.shopify.com/store/posthog/discounts">Shopify admin</PrivateLink>. When creating the discount, select "amount off products" then choose if it is a percentage off or a fixed amount - usually we do fixed amounts of $50 or $100 depending on the purpose. The you can choose "specific collections" and choose "All Products". Limit the use to one use per customer, otherwise it's unlimited free stuff for them, unlimited high cost for us! For code contributions we tend to do $50, with no expiration date.

If you need any help just send a message to the <PrivateLink url="https://posthog.slack.com/archives/C04DWKH7DM3">#merch</PrivateLink> channel and somebody will be happy to help. Merch codes can also be generated directly from within Zendesk.

### PostHog team

If you want more, <PrivateLink url="https://github.com/PostHog/runbooks/blob/main/docs/merch.md"> here's how to get it! </PrivateLink> 

As always, we expect you to use this with restraint and with your own good judgement. The merch store should not become your sole source of clothing for your wardrobe, nor where you go any time a friend has a birthday. But sure, go ahead and buy your mom (or yourself) a hat or a hoodie!

### YC Deal

You can find instructions for this on the dedicated [YC Deal page](/handbook/growth/sales/yc-onboarding).

## Troubleshooting customer orders

Sometimes customers get in touch with us because their order hasn't arrived. There are a couple of things you can do:

1. Check the <PrivateLink url="https://app.brilliantmade.com/store/3002/history">orders status</PrivateLink> in Brilliant.
1. If you don't see the order listed in Brilliant, check <PrivateLink url="https://admin.shopify.com/store/posthog/orders">Shopify</PrivateLink>. If the order is listed there, there may have been a problem with transmitting the order from Shopify to Brilliant. Please mention this in the #merch channel immediately so the Website & Vibes team can look into it.

> **Note:** There have been some issues with fulfilling orders to Brazil due to the country's customs policies.

If for some reason their second order attempt doesn't make it through, refund their money and apologetically let them know that unfortunately our supplier is having issues shipping to their address. It's better to stop the back-and-forth at that point, rather than having a frustrated customer placing multiple orders that don't work. We aren't an e-commerce business, so ensuring a flawless merch store experience for a handful of edge case orders is not a priority!

If the customer was given a merch code to thank them for submitting a PR, you can offer to make a donation on their behalf for the equivalent amount to a company of their choice on [Open Collective](https://opencollective.com/search?q=&type=COLLECTIVE) instead. 
