---
title: Send PostHog event data to PubNub Pub/Sub
templateId:
    - template-pubnub-pubsub
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"


Before you can send data to PubNub, you'll need to setup a PubNub account, [signup here](https://admin.pubnub.com/register)
You will need your Publish and Subscribe Keys from your PubNub portal. 

## Installation
NB, PostHog doesnt currently have a prefilled PubNub integration, you can set this up using Webhooks.
Your PubNub publish and subcribe keys are part of the URL. 

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.
2. Click the [Destinations](https://us.posthog.com/pipeline/destinations?search=webhook) tab.
3. Search for **Webhook** and click **+ Create**.
4. Input your PubNub URL: Example: https://ps.pndsn.com/publish/pubkey_goes_here/subkey_goes_here/0/posthog_topic_goes_here/0
5. Press **Create & Enable** and watch your 'topic' list get populated in PubNub Pub/Sub!

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/posthog/cdp/templates/google_pubsub/template_google_pubsub.py) is available on GitHub.
PubNubs Docs can be found at [here](https://www.pubnub.com/docs/sdks/rest-api/introduction).

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
