---
title: Send PostHog person data to beehiiv
templateId:
    - template-beehiiv
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

You can use PostHog person and event data to create new subscribers in a beehiiv publication and update existing subscribers' custom fields.

## Before you start

You need:

- Access to the beehiiv workspace and publication you want to connect
- A beehiiv API key with access to that publication
- The publication ID, which begins with `pub_`
- Existing beehiiv custom fields for any person properties you want to sync

## Configure beehiiv

1. In beehiiv, open **Settings**.
2. Under **Workspace Settings**, select **API**.
3. Click **Create New API Key**, copy the key, and store it securely. beehiiv only shows it once.
4. Optionally restrict the key to the publication you are connecting.
5. Copy the publication ID for the publication you want PostHog to update.

## Configure PostHog's beehiiv destination

1. In PostHog, open **[Data pipelines](https://app.posthog.com/data-management/destinations)**.
2. Click **Destinations** and then **New destination**.
3. Search for **beehiiv** and click **+ Create**.
4. Enter your beehiiv API key and publication ID.
5. Confirm where PostHog should read the subscriber email. It defaults to `{person.properties.email ?? event.properties.email}`.
6. Map PostHog values to any existing beehiiv custom fields. The default mapping sends `first_name` and `last_name` to the beehiiv fields `First Name` and `Last Name`.
7. Configure the welcome email, reactivation, and attribution options.
8. Click **Create & Enable**.

## Subscriber behavior

For each matching PostHog event, the destination:

1. Looks up a beehiiv subscription using its URL-encoded email address.
2. Creates the subscription if it does not exist.
3. Updates mapped custom fields if the subscription already exists.

The default filters run on `$identify` and `$set` events. Adjust the filters if your subscription consent event uses a different name.

### Welcome emails

**Send welcome email** applies only when beehiiv creates a new subscription. It does not resend a welcome email when an existing subscriber is updated.

### Reactivation and consent

**Reactivate existing subscription** can reactivate someone who previously unsubscribed. Enable it only when the person has knowingly asked to resubscribe. Leave it disabled for ordinary profile updates and configure event filters so only consented subscribers are sent to beehiiv.

### Custom fields

beehiiv custom fields must exist before this destination can populate them. If the destination sends an unknown custom field, beehiiv discards that field and may return a warning while still accepting the subscription.

<HideOnCDPIndex>

## Testing

After configuring the destination, click **Start testing** and then **Test function**. Confirm that:

- The request uses the expected beehiiv publication ID.
- The subscriber email comes from the intended PostHog property.
- New subscribers appear in the beehiiv audience.
- Existing subscribers receive the configured custom-field updates.

If a test fails, check the destination logs. A `401` usually indicates an invalid API key. A `404` from requests for a publication can mean that the publication does not exist or that the API key is restricted from accessing it.

## Configuration

<TemplateParameters />

## FAQ

### Does this destination unsubscribe people from beehiiv?

No. This destination creates subscribers and updates their mapped custom fields. It only sends an explicit active state when **Reactivate existing subscription** is enabled.

### Can it update acquisition fields for existing subscribers?

beehiiv's create-subscription API accepts UTM and referring-site fields. Its update-by-email API does not expose those acquisition fields, so this destination only sends them when creating a subscription.

### Is the source code for this destination available?

PostHog is open-source, and the destination source is available in [`nodejs/src/cdp/templates/_destinations/beehiiv/beehiiv.template.ts`](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/beehiiv/beehiiv.template.ts).

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
