---
title: Basic foundation model check
sidebar: Handbook
showTitle: true
---

When working with our customers, it is important to do a basic account review to get a better understanding of whether we think the customer has things set up correctly. Below is a simple checklist of things to look for, and address on your discovery call with the customer, to get a better idea of whether they are set up for success or not. It's important to note that we can only check for certain things and some things (like backend implementation) will rely on us speaking to the customer to get a better understanding of their implementation. 

# Checking their events and events properties

A good starting point is verifying what events the customer is tracking, whether they have custom events set up, is autocapture enabled, and if they're collecting any event properties. These could be custom event properties or they could be autocapture attributes that have been added. Two good starting places to look are:

- **Activity**: this showcases recent events 

- **Data management**: under here, you can find a number of definitions available to look at, to see if the customer may have set up custom actions or defined event and property definitions.

One of the things to look for is whether the customer has any custom actions setup. This is quite useful and is often a good sign that customers might have their setup wrong if they have not made use of actions. Some common actions to potentially look for are _renaming of events_ that are more useful to the customer or bundling of events that are common such as `user signups` or `purchases`. 

Additionally its worth flagging if a customer has autocapture enabled and no actions setup, that's probably worth flagging with the customer.

# Check if customer has reverse proxy configured

Another good place to start is to see if the customer has reverse proxy setup. There are two ways you can do this:

- If the customer is using session replay, you can to the appropriate replay video, select **Activity > Inspector > Doctor**, and search for "config", look for PostHog Config, expand the `api_host` and observe whether the URL shown is showing one of our domains i.e. us.i.posthog.com or eu.i.posthog.com, or one of their domains.

- If the customer isn't using session replay, the alternative way you can check this by adding `?__posthog_debug=true` to a URL where PostHog is being called, and pull up console logs and type `posthog.config` and look for the `api_host` property there.

If both methods are unavailable to you because the customer isn't using session replay and the hosted site isn't publicly accessible, you can simply ask the customer on the discovery call.

# Check Persons Properties, Group Properties, and Cohorts

Next, we want to look to see if customers are making use of persons properties, check if there are signs they may be over identifying, and if they are making use of cohorts. It is beneficial to understand what sort of person properties the customer is adding, potentially look for signs of properties they might be missing base on what you understand of their business, and the kind of cohorts, if any, they are using. 

If group analytics is enabled, its worth checking to see if they have group properties set and if the type of properties makes sense. Because group types are limited to five, it's important to make sure the group types are set up in a way that makes sense, and the related persons profile makes sense in the way it's associated with group properties.

# Ecommerce Events

For ecommerce customers specifically, PostHog has a useful guide on [ecommerce events specification](/docs/data/event-spec/ecommerce-events) that is worth checking to see if these customers were aware and have implemented custom events tracking related to the type of events we'd normally like to see (such as `sku`, `product_id`, or `category`).

# Check SDK or library version

Make sure customers are using an up to date SDK or Library version. For this, you'll want to click on **Activity**, click on `Configure columns`, then add `Library` and `Library Version` so you can see versions of the SDK they are using. Then you can reference this against our Github repos for the up-to-date SDK versions to check if they are on the latest versions or not.

Alternatively, you can go to Metabase, look up the `Library version audit` table and see SDK versions there.

# Sign up for an account when possible

If the customer offers a free account you can sign up for, do it and go through the workflow. This is a great way to see if events are firing properly, what events are being tracked, and get a rough idea of what might be missing so that you can make recommendations on your discovery call with the customer.

# What types of dashboards does the customer have setup

Every customer and more specifically, every team, will have a different set of goals they deeply care about. What we want to see here is if they've spent time setting up custom dashboards or insights to track specific trends, engagement, conversion metrics, or other key dashboards that indicates they're measuring the right things beyond basic dashboards included by default. This could be things like `user sign ups`, `retention dashboards`, or `free to paid upgrades`. What you want to do is get a feel for the kind of tracking the customer has setup so that on the discovery call, you can understand if this currently aligns with their immediate goals or if there are key metrics they should be looking at but have not setup.

# Are customers using data pipelines for event notifications

This idea actually came from our own team's use of data pipeline destinations to get notified when specific events occur in Slack. It's a great additional use that could be helpful to companies that didn't consider this use case for data piplines and an easy way to try and upsell.

# Query failure rate

This is a good one to check and is available in Vitally. This usually means the customer is attempting to do something and it didn't work. Great for expanding on the discovery call itself.