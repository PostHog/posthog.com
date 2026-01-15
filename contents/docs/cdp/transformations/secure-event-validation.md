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

## Requirements

You'll need to configure your application to generate an HMAC-SHA256 hash of the `distinct_id` using a shared secret and include it in the event properties as `$verification_hash`.

## Installation

1. In PostHog, click the [Data pipeline](https://us.posthog.com/pipeline/overview) tab in the left sidebar.
2. Click the [Transformations](https://us.posthog.com/pipeline/transformations) tab.
3. Search for **Secure event validation** and click **+ Create**.
4. Add your shared secret at the configuration step.
5. Press **Create & Enable** to start validating your events.

## How it works

When an event arrives, this transformation:

1. Looks for a `$verification_hash` property on the event
2. Generates an HMAC-SHA256 hash of the `distinct_id` using your configured shared secret
3. Compares the two hashes to verify authenticity
4. Either marks the event with `$verified_distinct_id: true/false` or drops invalid events (depending on your configuration)

## Client-side implementation

To use this transformation, you need to generate the verification hash on your server and include it when identifying users or sending events.

Example in Node.js:

```javascript
import crypto from 'crypto'

const sharedSecret = process.env.POSTHOG_SHARED_SECRET
const distinctId = 'user_123'

const verificationHash = crypto
    .createHmac('sha256', sharedSecret)
    .update(distinctId)
    .digest('hex')

posthog.identify(distinctId, {
    $verification_hash: verificationHash
})
```

Example in Python:

```python
import hmac
import hashlib

shared_secret = os.environ['POSTHOG_SHARED_SECRET']
distinct_id = 'user_123'

verification_hash = hmac.new(
    shared_secret.encode(),
    distinct_id.encode(),
    hashlib.sha256
).hexdigest()

posthog.identify(distinct_id, {
    '$verification_hash': verification_hash
})
```

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

Only enable enforce mode after you have confirmed that all events you care about have `$verified_distinct_id: true`. Once enabled, **any event without a valid `$verification_hash` will be permanently dropped**.

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

### What if an event doesn't have a verification hash?

Events without a `$verification_hash` property are treated as unverified. With enforce mode disabled, they're marked as `$verified_distinct_id: false`. With enforce mode enabled, they're dropped.

### Is the source code for this transformation available?

PostHog is open-source and so are all the transformations on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_transformations/secure-events/secure-events.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
