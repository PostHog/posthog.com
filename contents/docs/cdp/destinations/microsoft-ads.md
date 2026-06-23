---
title: Send PostHog conversion events to Microsoft Ads
templateId:
  - template-microsoft-ads
---

import FeedbackQuestions from "../\_snippets/feedback-questions.mdx"
import PostHogMaintained from "../\_snippets/posthog-maintained.mdx"

> **IMPORTANT:** This is an experimental destination using Microsoft's Conversions API (CAPI), which we do not currently provide official support for. CAPI is currently in pilot, and you'll need to contact your Microsoft Advertising account manager to enable it on your account.

You'll also need access to the relevant Microsoft Advertising account.

## Installation

1. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.

2. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=microsoft) tab.

3. Search for **Microsoft Ads Conversions** and click **+ Create**.

4. Get your UET Tag ID from Microsoft Advertising:
   1. Log in to [Microsoft Advertising](https://ads.microsoft.com/).
   2. Go to **Tools** > **UET tag**.
   3. Copy the **Tag ID** for your UET tag.

5. Get your Conversions API token:
   1. In Microsoft Advertising, select your UET tag.
   2. Click **Use Conversions API** (you may need to contact your account manager to enable this pilot feature).
   3. Generate and copy the API token.

6. Back in PostHog, enter your **UET Tag ID** and **Conversions API token** in the destination configuration.

7. Configure your event mapping:
   - **Event name** (required) – must match the event name configured on your conversion goal in Microsoft Advertising
   - **Microsoft Click ID** – automatically uses `msclkid` from person properties for attribution
   - **Event time** – defaults to the event timestamp (must be within the last seven days)
   - **Event ID** – used for deduplication against UET tag events
   - **Conversion value** and **Currency** – for revenue tracking
   - **Email** and **Phone** – for enhanced conversions (automatically SHA-256 hashed)

8. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing data like `msclkid`.

9. Press **Create & enable**, test your destination, and then watch your conversions get sent to Microsoft Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### What is the Microsoft Click ID (msclkid)?

The `msclkid` is Microsoft's click identifier that gets appended to URLs when users click on your Microsoft Ads. PostHog automatically looks for this in `person.properties.msclkid` or `person.properties.$initial_msclkid`. Make sure you're capturing this parameter from your URLs.

### Why do I need to contact my account manager?

The Microsoft Advertising Conversions API (CAPI) is currently in pilot. You need to request access from your Microsoft Advertising account manager before you can use this destination.

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/microsoft_ads/microsoft.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
