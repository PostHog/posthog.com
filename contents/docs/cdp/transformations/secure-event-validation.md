---
title: Secure event validation
templateId:
    - template-secure-events
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"
import { CalloutBox } from 'components/Docs/CalloutBox'

Validates events using a shared secret to verify `distinct_id` authenticity. Events can be marked as verified or dropped if validation fails.

This transformation uses HMAC-SHA256 to verify that events were sent from a trusted source. It checks a hash value in the event properties against a hash generated from the `distinct_id` and your shared secret.

<CalloutBox icon="IconInfo" title="Best suited for authenticated users" type="info">

This approach is only effective for securing events where you know the identity of your users (i.e., logged-in users). The verification hash must be generated server-side using a known `distinct_id`, which means anonymous users with client-generated IDs cannot be securely validated.

If you enable **Enforce secure mode**, events from anonymous users will be dropped since there is no way to generate a valid verification hash for them.

</CalloutBox>

## Requirements

You'll need to configure your application to generate an HMAC-SHA256 hash of the `distinct_id` using a shared secret and include it in the event properties as `$distinct_id_hash`.

## Installation

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.
2. Click the [Transformations](https://us.posthog.com/pipeline/transformations) tab.
3. Search for **Secure event validation** and click **+ Create**.
4. Add your shared secret at the configuration step.
5. Press **Create & Enable** to start validating your events.

## How it works

When an event arrives, this transformation:

1. Looks for a `$distinct_id_hash` property on the event
2. Generates an HMAC-SHA256 hash of the `distinct_id` using your configured shared secret
3. Compares the two hashes to verify authenticity
4. Either marks the event with `$verified_distinct_id: true/false` or drops invalid events (depending on your configuration)

## Client-side implementation

To use this transformation, you need to generate the verification hash **on your server** and pass it to the frontend. The hash must be generated server-side to keep your shared secret secure — never expose the secret in client-side code.

### Generating the hash server-side

<MultiLanguage>

```js file=Node.js
import crypto from 'crypto'

function generateDistinctIdHash(distinctId) {
    const sharedSecret = process.env.POSTHOG_SHARED_SECRET
    return crypto
        .createHmac('sha256', sharedSecret)
        .update(distinctId)
        .digest('hex')
}

// When rendering your page or handling an API request,
// generate the hash and pass it to the frontend
const distinctId = 'user_123'
const distinctIdHash = generateDistinctIdHash(distinctId)

// Pass these values to your frontend (e.g., via template variables, API response, etc.)
```

```python file=Python
import hmac
import hashlib
import os

def generate_distinct_id_hash(distinct_id):
    shared_secret = os.environ['POSTHOG_SHARED_SECRET']
    return hmac.new(
        shared_secret.encode(),
        distinct_id.encode(),
        hashlib.sha256
    ).hexdigest()

# When rendering your page or handling an API request,
# generate the hash and pass it to the frontend
distinct_id = 'user_123'
distinct_id_hash = generate_distinct_id_hash(distinct_id)

# Pass these values to your frontend (e.g., via template context, API response, etc.)
```

</MultiLanguage>

### Using the hash in the browser

Once you've passed the hash from your server to the frontend, you need to ensure it's included with **every event**. Use `posthog.register()` to set it as a [super property](/docs/libraries/js/usage#super-properties) that will automatically be sent with all subsequent events:

```js
// These values come from your server (e.g., embedded in the page or fetched via API)
const distinctId = window.__POSTHOG_DISTINCT_ID__
const distinctIdHash = window.__POSTHOG_DISTINCT_ID_HASH__

// Register the hash as a super property so it's sent with every event
posthog.register({
    $distinct_id_hash: distinctIdHash
})

// Identify the user
posthog.identify(distinctId)
```

All subsequent events captured by PostHog will automatically include the `$distinct_id_hash` property and can be validated by the transformation.

### Using the hash in backend SDKs

When capturing events from your backend, include the `$distinct_id_hash` property directly with each event:

<MultiLanguage>

```js file=Node.js
import crypto from 'crypto'
import { PostHog } from 'posthog-node'

const posthog = new PostHog('<ph_project_api_key>')

function generateDistinctIdHash(distinctId) {
    const sharedSecret = process.env.POSTHOG_SHARED_SECRET
    return crypto
        .createHmac('sha256', sharedSecret)
        .update(distinctId)
        .digest('hex')
}

const distinctId = 'user_123'

posthog.capture({
    distinctId,
    event: 'user_signed_up',
    properties: {
        $distinct_id_hash: generateDistinctIdHash(distinctId)
    }
})
```

```python file=Python
import hmac
import hashlib
import os
from posthog import Posthog

posthog = Posthog('<ph_project_api_key>')

def generate_distinct_id_hash(distinct_id):
    shared_secret = os.environ['POSTHOG_SHARED_SECRET']
    return hmac.new(
        shared_secret.encode(),
        distinct_id.encode(),
        hashlib.sha256
    ).hexdigest()

distinct_id = 'user_123'

posthog.capture(
    distinct_id,
    'user_signed_up',
    {
        '$distinct_id_hash': generate_distinct_id_hash(distinct_id)
    }
)
```

</MultiLanguage>

## Rotating secrets

This transformation supports a secondary shared secret for key rotation. When rotating secrets:

1. Add your new secret as the primary shared secret
2. Move your old secret to the secondary shared secret field
3. Update your application to use the new secret
4. Once all clients are updated, remove the secondary secret

Events signed with either secret will be accepted during the rotation period.

## Enforcing secure mode

By default, this transformation marks events as verified or unverified but still ingests all events. This allows you to monitor verification status without risking data loss.

When you're ready to block unverified events, you can enable **Enforce secure mode** in the configuration.

<CalloutBox icon="IconWarning" title="Before enabling enforce mode" type="warning">

Only enable enforce mode after you have confirmed that all events you care about have `$verified_distinct_id: true`. Once enabled, **any event without a valid `$distinct_id_hash` will be permanently dropped**.

This includes events from **anonymous users** — since anonymous users have client-generated `distinct_id` values, there is no way to securely generate a verification hash for them. If you rely on tracking anonymous users before they log in, do not enable enforce mode.

Before enabling:

1. Deploy the verification hash generation to all your applications
2. Run with enforce mode disabled and monitor the `$verified_distinct_id` property on incoming events
3. Use PostHog insights to check what percentage of events are being marked as verified
4. Only enable enforce mode once you're confident all legitimate events include valid hashes

</CalloutBox>

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### What happens when validation fails?

By default, events that fail validation are marked with `$verified_distinct_id: false` but still ingested. If you enable **Enforce secure mode**, invalid events are dropped entirely and will not be ingested.

### What if an event doesn't have a distinct_id hash?

Events without a `$distinct_id_hash` property are treated as unverified. With enforce mode disabled, they're marked as `$verified_distinct_id: false`. With enforce mode enabled, they're dropped.

### Is the source code for this transformation available?

PostHog is open-source and so are all the transformations on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_transformations/secure-events/secure-events.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
