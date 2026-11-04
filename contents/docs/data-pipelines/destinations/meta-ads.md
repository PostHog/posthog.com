---
title: Send PostHog conversion events to Meta Ads
templateId:
    - template-meta-ads
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"
import AdDestinationPersonDataFaq from "../_snippets/ad-destination-person-data-faq.mdx"


You'll also need access to the relevant Meta Ads account.

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.

2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=meta) tab.

3. Search for **Meta Ads Conversions** and click **+ Create**.

4. Visit the [Meta Events Manager](https://business.facebook.com/events_manager2/overview).
   1. If you’ve already set up a Pixel for your website, we recommend that you use the same Pixel ID for your browser and server events.
      1. To create a new Pixel, click **Connect data** and select **Web**.
      2. For the connection method, select **Set up manually** and **Conversions API**.
   2. Go to your Pixel via **Data sources**.
   3. Switch to the **Settings** tab and your Pixel ID will be listed as **Dataset ID**.
   4. You can create an access token by clicking **Generate access token**.

5. Back in PostHog, add the access token and Pixel ID to the destination configuration.

6. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing required data.

7. If your Meta Pixel also sends any of these conversions, set **Event ID** to an ID that the Pixel sends too. Otherwise, Meta counts the conversion twice. See [how to stop Meta from counting a conversion twice](#how-do-i-stop-meta-from-counting-a-conversion-twice).

8. Press **Create & enable**, test your destination, and then watch your conversions get sent to Meta Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

<AdDestinationPersonDataFaq />

### How do I stop Meta from counting a conversion twice?

When your Meta Pixel and this destination both send the same conversion, Meta keeps one copy only if:

- Both copies have the same event name, for example `Purchase`.
- The Pixel's `eventID` is the same as the destination's **Event ID**.
- Both copies go to the same Pixel ID, and Meta receives them within 48 hours of the first copy.

**Event ID** defaults to `{event.uuid}`, the ID of the PostHog event. Your Pixel doesn't know this ID, so Meta keeps both copies. Use an ID that the browser and your server both have. For a purchase, use the order ID. In the Pixel, `eventID` is the fourth argument of the `fbq` call:

```js
fbq("track", "Purchase", { value: 49.0, currency: "EUR" }, { eventID: "order_10482" })
```

Then set **Event ID** in the destination to the property that holds the same order ID, for example `{event.properties.order_id}`. Use a different ID for each new conversion. To confirm that Meta merged the two copies, check the event's deduplication details in Events Manager.

For example values for each input of this destination, including `fbc` and `fbp`, see the [PostHog Meta Ads integration guide from 99Ways](https://99ways.io/how-to-send-posthog-conversion-events-to-meta-ads/#common-fields).

### Does Meta discard events sent with a test event code?

No. Meta [keeps events that you send with a test event code](https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api#testEvents) and uses them for targeting and ads measurement. Use the **Test Event Code** input only while you test, and remove the code before you send real traffic.

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/meta_ads/meta.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
