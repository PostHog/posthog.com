---
title: How to capture events from Calendly webhooks
date: 2023-09-21
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-14.png
tags: ['events']
---

Webhooks enable you to send data from one platform to another when an event happens. This enables you to run workflows and code to handle those events.

To showcase the power of webhooks, we are going to capture Calendly meeting data into PostHog using Val Town, a platform for writing and running JavaScript functions in your browser. 

> **Note:** Calendly webhooks requires subscribing their professional plan.

## Set up your Val Town webhook handler

Before we set anything up in Calendly, we set up our webhook handler function in [Val Town](https://val.town/). 

To get started, we'll create a variable file in Val Town with your PostHog API key. 

You can get your project API key from your [project settings](https://app.posthog.com/project/settings). Then, go to Val Town, create a function with the code `let phProjectAPIKey = ‘<ph_project_api_key>’` and press "Run". This saves the value for us to reference as `@me.phProjectAPIKey` later.

![Project API key Val](../images/tutorials/calendly-webhooks/val.png)

Next, we create our function to capture a Calendly webhook. It takes a request, parses the JSON, gets the data we want, and then uses PostHog to capture it.

> Val Town enables you to reference or fork functions other people wrote, like the `capturePostHogEvent` [function](https://www.val.town/v/ianvph.capturePostHogEvent) we can use here.

Altogether, this function looks like:

<iframe src="https://www.val.town/embed/ianvph.captureCalendlyWebhook" height="635" frameBorder="0" allowFullScreen></iframe>

You can fork this function to customize it to your needs. 

Once, done click "Save," set as unlisted, click the three dots, hover the "endpoints" options, and click "copy web endpoint." This is the URL we use for our Calendly webhook trigger. It is in the format `https://{username}-{valname}.web.val.run`.

## Setting up your Calendly webhook

Once you upgrade your Calendly account, you can create a webhook through their API. To start, you need a personal access token which you can create on the [API webhooks integration page](https://calendly.com/integrations/api_webhooks). 

![Token](../images/tutorials/calendly-webhooks/token.png)

Next, use your access token to get your organization (`current_organization` key) and user (`uri` key) values. They are URLs starting with `https://api.calendly.com/`. You can do this on [their API page](https://developer.calendly.com/api-docs/005832c83aeae-get-current-user) or in a cURL request like this:

```bash
curl --request GET \
  --url https://api.calendly.com/users/me \
  --header 'Authorization: Bearer {your access token here}' \
  --header 'Content-Type: application/json'
```

With these values, we can make another API request with our Val Town web URL, organization, and user values to create a webhook subscription. Again, you can do this on [their API page](https://developer.calendly.com/api-docs/c1ddc06ce1f1b-create-webhook-subscription) or in a cURL request like this:

```bash
curl --request POST \
  --url https://api.calendly.com/webhook_subscriptions \
  --header 'Authorization: Bearer {your access token here}' \
  --header 'Content-Type: application/json' \
  --data '{
  "url": "https://{username}-{valname}.web.val.run",
  "events": [
    "invitee.created",
    "invitee.canceled"
  ],
  "organization": "https://api.calendly.com/organizations/{current_organization}",
  "user": "https://api.calendly.com/users/{uri}",
  "scope": "user"
}'
```

Once done, create a test event using your booking URL. You should see it trigger your webhook handler in Val Town and then create an event in your PostHog account.

![Event in PostHog](../images/tutorials/calendly-webhooks/event.png)

Now, every time someone creates (or cancels) a meeting using Calendly, you capture an event with details for your PostHog instance. You can use this event in your insights like signup funnels. You can also use a similar setup for other webhooks you want to capture into PostHog.

## Further reading

- [How to capture new RSS items in PostHog (releases, blogs, status)](/tutorials/rss-item-capture)
- [How to use session replays to improve your support experience](/tutorials/session-recordings-for-support)
- [How to build, analyze and optimize conversion funnels in PostHog](/tutorials/funnels)