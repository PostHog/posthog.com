---
title: Merch store
sidebar: Handbook
showTitle: true
---

We have a [merch store](https://merch.posthog.com/) where our community can purchase high quality PostHog-branded merch. As we have a limited number of Shopify admins on our current plan, message Grace or Charles in the #team-people-and-ops channel if you need any help sending out merch or gift cards, as you probably won't be able to do it yourself. 

## How do we think about merch?

We care about:

* **Quality** - our merch _must_ be something you would personally want to wear or use
* **Sustainability** - our merch shouldn't be something that's never used or made in an unsustainable way
* **Shippability** - we should do our best to ensure anyone in our community anywhere in the world can receive merch easily

## How do we manufacture merch?

We use [Printfection](https://app.printfection.com/account/dashboard_merchandise.php) to manufacture and store our merch - request access from the Marketing team or Grace if required. Anyone can suggest a product for us to sell or give away. 

1. The Marketing team ultimately decide on what items we wish to sell or give away (including how many and sizes)
2. Lottie provide assets to produce and order these items in to stock

## How do we ship merch?

Shipping is also done through [Printfection](https://app.printfection.com/account/dashboard_merchandise.php) - they can ship to over 200 territories worldwide:

* When orders come in from our Shopify store they will automatically be shipped to the people who order them via Printfection
* If you want to ship merch for an event or as part of a giveaway, create a one-off [campaign](https://help.printfection.com/hc/en-us/articles/208654107-Collection-campaigns-How-to-collect-review-and-approve-orders-via-external-ordering-or-csv)

## How do we sell merch?
We sell it through our [merch store](https://merch.posthog.com/) store on Shopify - request access to our [admin portal](https://posthog.myshopify.com/) from Marketing team if required. 

## How do we give away merch for free?

### Individuals

Create a gift card in [Shopify admin](https://posthog.myshopify.com/admin/gift_cards). You can either copy the code, or create a 'new customer' and send them the code directly. For contributions we tend to do $50, with no expiration date.

Alternatively, if you want to send them a specific product via Printfection, you can create a 'New Order' under [this campaign](https://app.printfection.com/account/campaign/manage.php?storeid=304946). 

### YC Deal

You can find instructions for this on the dedicated [YC Deal page](/handbook/growth/sales/yc-onboarding).

### Events
Follow Printfection's instructions on creating a giveaway [campaign](https://help.printfection.com/hc/en-us/articles/208654107-Collection-campaigns-How-to-collect-review-and-approve-orders-via-external-ordering-or-csv) for this.

## How are Prinfection and Shopify connected?

We integrated the two via Zapier. Unfortunately this part is a little complex - [here are the details on exactly how the integration is set up.](https://help.printfection.com/hc/en-us/articles/218014268-Integrating-Shopify-Printfection-via-Zapier-)

If you need to make any changes to how the two are connected, reference the article above and follow it _very_ carefully.

In summary:

1. Order is created when someone checks out on Shopify
2. This order is picked by our PostHog Zapier account (details in 1Password)
3. Zapier then sends this order to Printfection along with delivery details

## How do I add a new product to Shopify?

If you have created a new product in Printfection, adding it to Shopify is quite straightforward but a little nuanced - and _very_ important to get right:

1. Go to Shopify, click 'Products' -> 'Add Product'
2. Add all the details about the product, including images, description, title etc.
3. Add the IDs from Printfection (this is essential for the integration to work). To do this review the section "1. Add products and required ID fields to your store" from [this setup document](https://help.printfection.com/hc/en-us/articles/218014268-Integrating-Shopify-Printfection-via-Zapier-).
4. Select "Track Inventory" and set it to match what is available in Printfection by adding the quantity to the Printfection location name.
5. Set the product to 'Active'.

If you're confused at any point, take a look at an existing product to ensure you have all the right details.

> Warning: If you have something with different sizes, it's a little more complex, so make sure you read the documentation carefully.

## Legacy setups

We have integrations with many other providers from Printify to Printful and Gelato. For the most part you can ignore anything that references these as these are legacy settings from previous fulfillment channels that are no longer used. 
