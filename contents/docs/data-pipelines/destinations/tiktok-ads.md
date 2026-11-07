---
title: Send PostHog conversion events to TikTok Ads
templateId: 
   - template-tiktok-ads
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"
import AdDestinationPersonDataFaq from "../_snippets/ad-destination-person-data-faq.mdx"


You should be aware that this destination relies on creating third-party cookies. You'll also need access to the relevant TikTok Ads account.

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.

2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=tiktok) tab.

3. Search for **TikTok Ads Conversions** and click **+ Create**.

4. Visit the [TikTok Events Manager](https://ads.tiktok.com/i18n/events_manager/home).
   1. If you’ve already set up a Pixel for your website, we recommend that you use the same Pixel for your browser and server events.
      1. To create a new Pixel, click **Connect data source** and select **Web**.
      2. Skip the **Add your website** step.
      3. For the connection method, select **Manual setup** and **Events API**.
      4. Enter a name for your Pixel and click **Create**.
   2. Go to your Pixel via **Data sources**.
   3. Switch to the **Settings** tab and your Pixel ID will be listed as **ID**.
   4. You can create an access token by clicking **Generate Access Token**.

5. Back in PostHog, add the Pixel ID and Access token to the destination configuration.

6. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing required data.

7. If your TikTok Pixel also sends any of these conversions, set **Event ID** to an ID that the Pixel sends too. Otherwise, TikTok counts the conversion twice. See [how to stop TikTok from counting a conversion twice](#how-do-i-stop-tiktok-from-counting-a-conversion-twice).

8. Press **Create & enable**, test your destination, and then watch your conversions get sent to TikTok Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

<AdDestinationPersonDataFaq />

### How do I stop TikTok from counting a conversion twice?

When your TikTok Pixel and this destination both send the same conversion, TikTok keeps one copy only if both copies have the same Pixel ID, event name, and `event_id`, and TikTok receives them within 48 hours of the first copy. See [TikTok's event deduplication rules](https://ads.tiktok.com/help/article/event-deduplication).

**Event ID** defaults to `{event.uuid}`, the ID of the PostHog event. Your Pixel doesn't know this ID, so TikTok keeps both copies. Use an ID that the browser and your server both have. For a purchase, use the order ID. In the Pixel, `event_id` goes in the third argument of `ttq.track`:

```js
ttq.track("CompletePayment", { value: 49.0, currency: "EUR" }, { event_id: "order_10482" })
```

Then set **Event ID** in the destination to the property that holds the same order ID, for example `{toString(event.properties.order_id)}`. Use a different ID for each new conversion.

For example values for each input of this destination, see the [PostHog TikTok Ads integration guide from 99Ways](https://99ways.io/how-to-send-posthog-conversion-events-to-tiktok-ads/#event-id-and-time).

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/tiktok_ads/tiktok.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
