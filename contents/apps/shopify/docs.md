---
title: Shopify Connector documentation
showTitle: true
topics:
    - shopify
---

### What does the Shopify Connector app do?

The Shopify Connector for PostHog enables you to sync customer and order data from Shopify, into PostHog. 

This app will:

- Associate your Shopify customers with PostHog users
- Create a PostHog user from a Shopify customer if it doesn't exist
- Create events for every new order

If there is an error while fetching orders, the next run of `runEveryMinute()` will try to re-read information from where it was previously interupted. 

### What are the requirements for this app?

Using this app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

### How do I install this app for PostHog?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Shopify' and select the app, press 'Install'.
3. Follow the steps below to configure the app.

### How do I configure the Shopify Connector for PostHog?

To configure the Shopify Connector you will need to set the store name from your Shopify account. 

Additionally, you will need to create a Shopify Access Token, which the Shopify Connector app will call to fetch orders into PostHog. 

To create a Shopify Access Token, create an app on the admin page of your Shopify Account and generate `Admin API access token` in the API Credentials tab or your newly created Shopify app. 

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Shopify Connector app](https://github.com/sreeo/posthog-shopify-sync-plugin) is available on GitHub. 

### Who created this app?

We'd like to thank community member [Sreeraj Rajan](https://github.com/sreeo) for his work creating this app. Thank you, Sreeraj!

### Where can I find out more?

Check the [Shopify API reference docs](https://shopify.dev/api) for more information about connecting services to Shopify. 

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.