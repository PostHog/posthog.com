---
title: Merch store
sidebar: Handbook
showTitle: true
---

We have a [merch store](/merch) where our community can purchase high quality PostHog-branded merch. The People & Ops team is responsible for managing merch inventory, fulfillment etc. even though multiple people contribute, and Kendal is the point person.

We use [Micromerch](https://www.micromerch.com/) to manufacture and fulfill our merch. Anyone can suggest a product for us to sell or give away. 

The Brand team ultimately decide on what items we wish to sell or give away (including how many and sizes), and Lottie provide assets to produce and order these items in to stock.

We generally try to launch new products in line with the typical fashion cycle (spring/summer and fall/winter). However, this doesn't mean we can't do fun side quests! If you are looking to do an off-cycle merch run, just make sure you keep Kendal in the loop so the admin side goes smoothly.

## How to reorder merch

All of our permanent merch items are reordered via Micromerch. To do this you need to:

1. Request a restock quote for the item(s) in the Slack channel and enter the quantity you need
2. Approve the estimate that will be sent from Micromerch
3. Pay the invoice via Brex once it comes in (usually in 1-2 days after estimate approval)

It's really important that we do not allow stock levels to run low as restocking items can take a couple of weeks, so the Ops team will regularly check inventory levels. However, if you happen to see anything looking amiss, just let Kendal know ahead of time!

## Big orders

If you want to place a big order for a customer that may affect our stock levels a lot, just let Kendal know ahead of time!

Before sending a large merch order to another country, check with Kendal and Micromerch to confirm that we have an importer of record in the destination country.

If you send merch to a hotel, use the hotel only for the address. Always name a specific person as the recipient, with their own contact details. Never name the hotel or use its contact details. If the hotel is the recipient, customs contacts the hotel, and the hotel usually will not act as the importer or claim the package. The shipment then stays at customs.

## Adding new items

Micromerch is integrated with our Shopify store, so all orders are made and processed through there. To add new products to Shopify, [follow these instructions.](/handbook/engineering/posthog-com/merch-store).

## Shipping

Shipping is also done through Micromerch (in partnership with Shiphero) - they can ship to over 200 territories worldwide:

* When orders come in from our Shopify store they will automatically be shipped to the people who order them via Shiphero
* If you want to ship merch for an event or as part of a giveaway, do this from the Shopify dashboard.

## Merch giveaways

### Customers

Give a code when someone outside PostHog goes out of their way to help us: a merged PR, a clear bug report, useful feedback, or a forum answer that saves someone else time. There's no checklist, so use your judgment. If you're debating whether something counts, it probably does.

As a rough guide, we give $30 for feedback, bug reports, and general thanks (enough for a t-shirt) and $50 for code contributions. Feedback calls have their own amounts in [talking to users](/handbook/product/user-feedback). We don't put expiration dates on codes.

Send the code privately, by email or DM. Codes are single use, so one posted in a forum reply or GitHub comment goes to whoever spots it first. On the forum, thank the person in your reply and ask them to email you for the code.

For smaller forum contributions, moderators can [gift community points](/handbook/community/points#gifting-points) instead, which members redeem for stickers and merch credit.

The quickest way to make a code is to ask JokerHog in Slack. Tag `@.JokerHog` in any channel (most people use <PrivateLink url="https://posthog.slack.com/archives/C07TQR0V16U">#at-posthog-anything</PrivateLink>) and ask for a code, e.g. "can you make me a merch code for $30 for a bug report?". It creates the discount code in Shopify and replies with the code, so you don't need to log in yourself.

If you'd rather do it manually, create a discount code in <PrivateLink url="https://admin.shopify.com/store/posthog/discounts">Shopify admin</PrivateLink>. You don't need to be invited to Shopify, instead the login details are stored in [1Password](https://start.1password.com/signin?l=en).

To log into Shopify using 1Password:

1. Sign in with the email from 1Password
2. Log in with the saved passkey when the pop-up appears — this is the preferred way to log in
3. You're logged in!

If you aren't prompted for the passkey, use the password and authentication code instead:

1. Click "Log in using a different method"
2. Click "Continue with password"
3. Use the password from 1Password and click "Log in"
4. On the "Use your passkey" screen, click "Use the authentication app" — you can then use 1Password to enter the authentication code
5. You're logged in!

When creating the discount, select "amount off products" then choose if it is a percentage off or a fixed amount. Then you can choose "specific collections" and choose "All Products". 

> Limit the use to one use only (_not_ one use per customer), otherwise it's unlimited free stuff for them, unlimited high cost for us! 

If you need any help just send a message to the <PrivateLink url="https://posthog.slack.com/archives/C04DWKH7DM3">#merch</PrivateLink> channel and somebody will be happy to help.

If you want to send physical merch to a customer instead of a merch code, this can be done in Shopify by creating an order, selecting the chosen merch and applying a discount for the whole price of the item (don't forget to do this step otherwise it'll try and charge the customer!)

### PostHog team

If you want more, <PrivateLink url="https://wiki.posthog.com/reference/merch"> here's how to get it! </PrivateLink> 

As always, we expect you to use this with restraint and with your own good judgement. The merch store should not become your sole source of clothing for your wardrobe, nor where you go any time a friend has a birthday. But sure, go ahead and buy your mom (or yourself) a hat or a hoodie!

Please note that any free merch received outside of your birthday kit, work anniversary kit, or new hire kit is considered a taxable benefit in most jurisdictions and may be subject to tax. If you have questions about how this applies to you, we recommend checking with your local tax advisor. We will send the details of any free merch you have claimed to payroll once a year (usually in December) and any tax due will be deducted from that payroll (please note this is jurisdiction dependent, and also depends on your employment type at PostHog).

For select exclusive or higher-value items, a cost-price discount code will be shared at the time of launch in lieu of the complimentary allowance, this will always be clearly communicated in advance. 

### YC Deal

You can find instructions for this on the dedicated [YC Deal page](/handbook/marketing/startups).

## Troubleshooting customer orders

Sometimes customers get in touch with us because their order hasn't arrived. There are a couple of things you can do:

1. Check the <PrivateLink url="https://admin.shopify.com/store/posthog/orders">Shopify</PrivateLink>. This will show you the status of the order, if something looks amiss, please mention this in the #merch channel immediately so Kendal can look into it.

> **Note:** There have been some issues with fulfilling orders to Brazil due to the country's customs policies.

If for some reason their second order attempt doesn't make it through, refund their money and apologetically let them know that unfortunately our supplier is having issues shipping to their address. It's better to stop the back-and-forth at that point, rather than having a frustrated customer placing multiple orders that don't work. We aren't an e-commerce business, so ensuring a flawless merch store experience for a handful of edge case orders is not a priority!

If the customer was given a merch code to thank them for submitting a PR, you can offer to make a donation on their behalf for the equivalent amount to a company of their choice on [Open Collective](https://opencollective.com/search?q=&type=COLLECTIVE) instead. 
