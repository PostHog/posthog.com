---
title: Zapier
platformLogo: zapier
---

## Objective

Sending events to PostHog using Zapier.

## Why is this useful?

[Zapier](https://zapier.com/) is an automation platform that connects thousands of apps together. With the PostHog Zapier integration, you can automatically send events to PostHog from any of the 8,000+ apps Zapier supports.

This is useful for:

- Tracking events from tools that don't have a native PostHog integration
- Syncing data from CRMs, payment processors, form builders, and more
- Creating automated workflows that capture important business events in PostHog

> **Note:** This guide covers sending events **to** PostHog from Zapier. If you want to trigger Zaps based on PostHog events, see our [Zapier destination documentation](/docs/cdp/destinations/zapier).

## Prerequisites

To follow this tutorial, you should:

1. Have a [PostHog account](https://us.posthog.com/signup) (Cloud or self-hosted)
2. Have a [Zapier account](https://zapier.com/sign-up)

## Step-by-step instructions

### Setting up the PostHog app in Zapier

1. Log in to your [Zapier dashboard](https://zapier.com/app/zaps).
2. Click **Create > New Zap** to start a new automation.
3. Set up your trigger by choosing the app and event that will initiate the Zap (e.g., "New Form Submission" in Typeform, "New Customer" in Stripe).
4. Configure the trigger according to your chosen app's requirements.

### Adding PostHog as an action

1. After setting up your trigger, click **Add a step** and search for **PostHog**.
2. Select **PostHog** from the list of apps.
3. Choose **Capture Event** as the action event.
4. Click **Continue**.

![Zapier Configuration](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/pasted_image_2025_12_31_T16_17_45_030_Z_849e42d846.png)

### Connecting your PostHog account

1. Click **Sign in to PostHog**.
2. Create a PostHog [Personal API key](https://app.posthog.com/settings/user-api-keys?preset=zapier)  inside PostHog and add it under "Personal API Key".
   1. You'll need some specific permissions to make this work, the link above already enables them by default.
3. If you're using PostHog Cloud EU or a self-hosted instance you'll need to configure `API Host` appropriately:
   - **PostHog Cloud US:** `https://us.posthog.com`
   - **PostHog Cloud EU:** `https://eu.posthog.com`
   - **Self-hosted:** Your PostHog instance URL
4. Click **Yes, Continue to PostHog** to connect your account.

### Configuring the Capture Event action

1. **Organization** (required): What organization we should create the event on.
2. **Project** (required): What project we should create the event on.
3. **Event Name** (required): Enter the name of the event you want to track (e.g., `form_submitted`, `payment_completed`).
4. **User PostHog Distinct ID** (required): Enter a unique identifier for the user. You can map this from your trigger data (e.g., email address, user ID). This ID should uniquely identify a specific user - you'll be able to see all events from a single user inside PostHog.
   1. Do NOT use a hardcoded ID for all your events here. If these events don't belong to a user generate a random UUID.
5. **Properties** (optional): Add any additional properties you want to include with the event. You can map data from your trigger to create rich event properties.

![Example configuration](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/pasted_image_2025_12_31_T16_24_16_158_Z_4bb2f54149.png)


### Testing and enabling your Zap

1. Click **Test step** to send a test event to PostHog.
2. Verify the event appears in your [PostHog Activity tab](https://us.posthog.com/activity/explore).
3. Once confirmed, click **Publish** to enable your Zap.

## Available actions

The PostHog Zapier integration supports the following action:

| Action | Description |
|--------|-------------|
| **Capture Event** | Send a custom event to PostHog with a distinct ID, event name, and optional properties |

## FAQ

### Where can I find out more?

Check [PostHog's API documentation](/docs/api) for more information on events and properties. The PostHog Zapier integration is [open source on GitHub](https://github.com/PostHog/posthog-zapier).

### Who maintains this integration?

This integration is maintained by PostHog. If you have issues with the integration not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this integration?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)!

### Can I use this with a self-hosted PostHog instance?

Yes! When connecting your PostHog account in Zapier, simply enter your self-hosted instance URL instead of the Cloud URL.

### What's the difference between this and the PostHog Zapier destination?

- **This integration** (Zapier app): Sends events **to** PostHog from other apps via Zapier
- **[Zapier destination](/docs/cdp/destinations/zapier)**: Sends events **from** PostHog to trigger Zaps when actions occur

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal).

