---
title: MoEngage
platformLogo: moengage
---

## Objective

Forwarding events from MoEngage to PostHog.

## Why is this useful?

[MoEngage](https://www.moengage.com/) is a customer engagement platform that helps you understand customer behavior and engage with them across multiple channels. By integrating MoEngage with PostHog, you can:

- Forward events tracked in MoEngage to your PostHog dashboard
- Analyze customer engagement data alongside your product analytics
- Create a unified view of customer interactions across platforms
- Build cohorts and analyze user behavior based on MoEngage engagement events

## Prerequisites

To follow this tutorial, you should:

1. Have a [PostHog account](https://us.posthog.com/signup) (Cloud or self-hosted)
2. Have a [MoEngage account](https://www.moengage.com/) with access to Connector Campaigns

## Step-by-step instructions

### Creating a Connector Campaign in MoEngage

1. Log in to your [MoEngage dashboard](https://dashboard.moengage.com/).
2. Navigate to **Create Campaign** > **Connectors** > **Custom**.
3. Choose the delivery type that suits your needs:
   - **Event Triggered**: Fires when a specific event occurs
   - **Periodic**: Runs on a schedule
4. Select the event that will trigger the campaign (e.g., "Purchased", "App Opened").

### Configuring the PostHog connector

1. In the connector configuration, set up the HTTP request:
   - **Method**: `POST`
   - **URL**: Your PostHog capture endpoint
     - PostHog Cloud US: `https://us.posthog.com/capture/`
     - PostHog Cloud EU: `https://eu.posthog.com/capture/`
     - Self-hosted: `https://your-instance.com/capture/`

2. Add the following headers:
   - **Content-Type**: `application/json`

3. Configure the request body with your event data:

```json
{
  "api_key": "<ph_project_api_key>",
  "event": "moengage_event_name",
  "distinct_id": "{{user_id}}",
  "properties": {
    "source": "moengage",
    "campaign_name": "{{campaign_name}}",
    "email": "{{email}}"
  }
}
```

Replace the placeholders:
- `{{user_id}}`: MoEngage user attribute for the distinct ID
- `{{campaign_name}}`: The MoEngage campaign name variable
- `{{email}}`: User's email address (or other relevant attributes)

### Mapping event data

You can include any MoEngage user attributes or event properties in your PostHog event. Common mappings include:

| MoEngage Variable | PostHog Property | Description |
|-------------------|------------------|-------------|
| `{{user_id}}` | `distinct_id` | Unique user identifier |
| `{{email}}` | `properties.email` | User email |
| `{{first_name}}` | `properties.first_name` | User's first name |
| `{{event_name}}` | `event` | Name of the triggered event |
| `{{campaign_name}}` | `properties.campaign_name` | MoEngage campaign name |

### Testing the integration

1. In MoEngage, use the **Test** feature to send a test event.
2. Verify the event appears in your [PostHog Activity tab](https://app.posthog.com/activity/explore).
3. Check that all properties are correctly mapped.
4. Once confirmed, activate the campaign.

### Example: Tracking purchase events

To forward purchase events from MoEngage to PostHog:

1. Create an **Event Triggered** Connector Campaign.
2. Set the trigger to the "Purchased" event.
3. Configure the request body:

```json
{
  "api_key": "<ph_project_api_key>",
  "event": "purchase_completed",
  "distinct_id": "{{user_id}}",
  "properties": {
    "source": "moengage",
    "amount": "{{purchase_amount}}",
    "product_name": "{{product_name}}",
    "currency": "{{currency}}"
  }
}
```

## Sending user properties

To update user properties in PostHog, you can also send identify calls:

```json
{
  "api_key": "<ph_project_api_key>",
  "event": "$identify",
  "distinct_id": "{{user_id}}",
  "$set": {
    "email": "{{email}}",
    "name": "{{first_name}} {{last_name}}",
    "moengage_segment": "{{segment_name}}"
  }
}
```

## FAQ

### Where can I find out more?

Check [PostHog's API documentation](/docs/api) for more information on the capture endpoint. Further information about the integration is available in [MoEngage's documentation](https://partners.moengage.com/hc/en-us/articles/20172577208084-PostHog).

### Who maintains this integration?

This integration uses MoEngage's Connector Campaigns feature with PostHog's API. If you have issues with the integration, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this integration?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)!

### Can I use this with a self-hosted PostHog instance?

Yes! Simply use your self-hosted instance URL as the capture endpoint in the connector configuration.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal).

