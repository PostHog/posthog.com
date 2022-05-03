---
title: Communication
sidebar: Handbook
showTitle: true
---

# PostHog Merch Store

We have a [merch store](https://merch.posthog.com/) where our community can purchase themeselves with high quality PostHog branded merch.

## How do we think about Merch?
PostHog merch will be carried out (quite literally) into the wider world where people who've never heard of us will see our brand, it's important that our Merch is:

* **Quality** - Our merch must be something you'd want to wear
* **Sustainable** - Our merch shouldn't be something that's never used or made in an unsustainable way
* **Shippable** - Any one of our community no-matter where in the world they live should be able to receive our merch

## How do we manufacture merch

We use printfection to manufacture our merch (request access from Marketing team if required).

1. Marketing team decide on what items we wish to sell or give away (including how many and sizes)
2. Design provide assets to produce and order these items in to stock

## How do we ship merch

Shipping is also done through printfection, they can ship to over 200 territories worldwide:
* When orders come in from our Shopify store they will automatically be shipped to the people who order them
* If we want to ship merch for an event or as part of a giveaway we can create a one-off [campaign](https://help.printfection.com/hc/en-us/articles/208654107-Collection-campaigns-How-to-collect-review-and-approve-orders-via-external-ordering-or-csv) for this

**N.B. During March 2022: Approval will be required on all merch store orders just to ensure everything is working correctly**

## How do we sell merch
We sell it through our [merch store](https://merch.posthog.com/) store on Shopify (request access from Marketing team if required), our URL is: https://posthog.myshopify.com/

People can search through our available merch and make an order themselves within our store, for single or multiple items.

## How do we give away merch for free

### Individuals
In shopify admin at https://posthog.myshopify.com/admin:

1. Go to the "discounts" tab
2. Click "Create Discount" then "Discount Code"
3. Click "Generate Code" button to generate the code to send the customer
4. Set "Fixed Amount" and the "Discount Value" to the amount of free merch you wish to give (e.g. $100)
5. IMPORTANT: Set "Limit number of times this discount can be used in total" to 1 (so it can only be used once)
6. Set a reasonable timeframe for this to be used (e.g. 3 months)
7. Send the code to the customer and let them purchase some free merch

### Events
Follow prinfection instructions on creating a giveaway [campaign](https://help.printfection.com/hc/en-us/articles/208654107-Collection-campaigns-How-to-collect-review-and-approve-orders-via-external-ordering-or-csv) for this

## How is Prinfection and Shopify connected?
Unfortunately this part is a little complex, [details on exactly how the integration is setup](https://help.printfection.com/hc/en-us/articles/218014268-Integrating-Shopify-Printfection-via-Zapier-)

If you need to make any changes to how the two are connected please reference the article above and follow it very carefully.

In summary:
1. Order is created when someone checks-out on Shopify
2. This order is picked by by Zapier (Request access from Ops team if required)
3. Zapier then sends this order to printfection along with delivery details

## How do I add a new product to Shopify?

If you have created a new product in Printfection to add it to Shopify is quite straight forward, but a little nuanced - and very important to get right:

1. Go to Shopify click Products -> Add Product
2. Add all the details about the product, including images, description, title etc
3. Add the IDs from printfection (this is essential for the integration to work) - To do this review the section "1. Add products and required ID fields to your store " from [this setup document](https://help.printfection.com/hc/en-us/articles/218014268-Integrating-Shopify-Printfection-via-Zapier-)
4. Select "track inventory" and set it to match what is available in printfection (Adding the quantity to the printfection location name)
5. Set the product to active

If you're confused at any point - take a look at an existing product to ensure you have all the right details

Warning: If you have something with different sizes, it's a little more complex, so read the documentation carefully

## Legacy setups

We have integrations with many other providers from Printify to Printful and Gelato. For the most part you can ignore anything that references these as these are legacy settings from previous fulfillment channels.
