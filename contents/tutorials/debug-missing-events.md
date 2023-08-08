---
title: How to troubleshoot missing events
date: 2023-08-08
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-10.png
tags: ['guides']
---

Missing events can be a pain to troubleshoot. This guide aims to help you diagnose and address the issue efficiently. There are three potential areas where the problem might originate:

1. The library is being used incorrectly. (this is usually the issue)
2. There is a bug within the library being used.
3. Events are not ingested after being received by PostHog.

## The library is being used incorrectly. (this is usually the issue)

1. Visit [webhook.site](https://webhook.site/) and copy “Your unique URL”.
2. Replace [posthog.com](https://app.posthog.com) (or [eu.posthog.com](https://eu.posthog.com) if using the EU Cloud) with “Your unique URL”.
3. Make sure that the SDK sends a couple of events.
4. See if the incoming events arrive as expected.

## There is a bug within the library being used.

1. Open the devtools and switch to the network tab.
2. Look for the request that appears to be incorrect.
3. [Send a support ticket via the app](https://app.posthog.com/home#supportModal) including the network request.

## Events are not ingested after being received by PostHog.

1. Open the devtools and switch to the network tab.
2. Right click one of the network requests to posthog.com (or eu.posthog.com if using the EU Cloud) and select Copy -> Copy as cURL.
3. [Send a support ticket via the app](https://app.posthog.com/home#supportModal) and include the copied cURL command.

##  Still encountering issues?
If those steps did not fix the issue, feel free to [get in touch with the support](https://posthog.com/docs/support-options). We try to respond to as many of these as we can.

## Further reading

- [Deploying a reverse proxy to PostHog Cloud](/docs/advanced/proxy)