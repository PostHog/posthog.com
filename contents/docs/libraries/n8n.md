---
title: n8n
platformLogo: n8n
---

## Objective

Integrating PostHog with n8n for workflow automation.

## Why is this useful?

[n8n](https://n8n.io/) is an open source workflow automation tool that enables you to connect various services together. With the PostHog node in n8n, you can:

- Capture events in PostHog from any of n8n's 400+ integrations
- Create user identities and aliases
- Track page views and screen views
- Build automated workflows that sync data to PostHog

This is particularly useful for product teams who want to track events from tools that don't have native PostHog SDKs, or for creating complex automation workflows that involve analytics tracking.

## Prerequisites

To follow this tutorial, you should:

1. Have a [PostHog account](https://us.posthog.com/signup) (Cloud or self-hosted)
2. Have an [n8n instance](https://n8n.io/) (Cloud or self-hosted)

## Step-by-step instructions

### Setting up PostHog credentials in n8n

1. In your n8n instance, go to **Settings** > **Credentials**.
2. Click **Add Credential** and search for **PostHog**.
3. Select **PostHog API** from the list.
4. Enter the following details:
   - **URL**: Your PostHog instance URL
     - PostHog Cloud US: `https://us.posthog.com`
     - PostHog Cloud EU: `https://eu.posthog.com`
     - Self-hosted: Your instance URL
   - **API Key**: A [PostHog Personal API Key](https://app.posthog.com/settings/user-api-keys?preset=n8n)
5. Click **Save** to store the credentials.

![Credentials](https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/pasted_image_2025_12_31_T16_56_56_433_Z_c5db606108.png)

### Creating a workflow with PostHog

1. In n8n, click **New Workflow** to create a new workflow.
2. Add a trigger node (e.g., Webhook, Schedule, or any app trigger).
3. Click the **+** button to add a new node and search for **PostHog**.
4. Select the PostHog node.

### Configuring PostHog operations

The PostHog node supports the following operations:

#### Capture Event

Send a custom event to PostHog.

1. Set **Resource** to **Event**.
2. Set **Operation** to **Create**.
3. Configure the fields:
   - **Event**: Name of the event to track (required)
   - **Distinct ID**: Enter a unique identifier for the user. You can map this from your trigger data (e.g., email address, user ID). This ID should uniquely identify a specific user - you'll be able to see all events from a single user inside PostHog.
     - Do NOT use a hardcoded ID for all your events here. If these events don't belong to a user generate a random UUID.
   - **Additional Fields**: Add any extra properties
     - **Properties**: Custom event properties as key-value pairs
     - **Timestamp**: Override the event timestamp

Example configuration:

| Field | Value |
|-------|-------|
| Distinct ID | `{{ $json.email }}` |
| Event | `purchase_completed` |
| Properties | `{"amount": 99.99, "currency": "USD"}` |

![Example capture event](https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/pasted_image_2025_12_31_T16_56_24_779_Z_e499e5239f.png)

#### Create Alias

Link two distinct IDs together (useful for connecting anonymous users to identified users).

1. Set **Resource** to **Alias**.
2. Set **Operation** to **Create**.
3. Configure the fields:
   - **Distinct ID**: The new distinct ID
   - **Alias**: The existing distinct ID to link

#### Create Identity

Create or update a user identity with properties.

1. Set **Resource** to **Identity**.
2. Set **Operation** to **Create**.
3. Configure the fields:
   - **Distinct ID**: Unique identifier for the user
   - **Additional Fields**: Add user properties
     - **Properties**: User properties as key-value pairs

### Testing your workflow

1. Click **Test Workflow** to execute the workflow.
2. Verify events appear in your [PostHog Activity tab](https://us.posthog.com/activity/explore).
3. Once confirmed, activate the workflow by toggling it on.

## FAQ

### Where can I find out more?

Check [PostHog's API documentation](/docs/api) for more information on events and user properties. Further information about n8n's PostHog node is available in [n8n's documentation](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.posthog/).

### Who maintains this integration?

This integration is maintained by n8n. If you have issues with the integration not functioning as intended please reach out to n8n.

### What if I have feedback on this integration?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)!

### Can I use this with a self-hosted PostHog instance?

Yes! Simply enter your self-hosted instance URL when configuring the PostHog credentials in n8n.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal).
