---
title: Replay SDK fetch wrapper incident
showByline: true
date: 2026-01-17
author:
    - tue-haulund
    - paul-dambra
tags:
    - Post mortems
---

**Date:** January 14-19, 2026

**Severity:** Critical

**Status:** Resolved

## Summary

A customer reported a critical issue in the PostHog SDK's Fetch API wrapper that rendered their site unusable. The issue had started a week earlier and was caused by the wrapper failing to pass the RequestInit object through to window.fetch, resulting in a TypeError for requests with a ReadableStream body.

Two SDK releases were made in an attempt to fix this bug. However, both introduced different but related regressions affecting other customers. Because the changes were in the lazy-loaded Replay extension rather than the core SDK, the issues also impacted customers who had not updated their SDK during this period.

After these regressions were reported, a bugfix release (1.327.0) was prepared. When this failed to resolve the issues, a follow-up release (1.328.0) rolled back all fetch wrapper changes.

Due to a recently introduced manual step in the process for publishing SDKs to the PostHog CDN, neither the bugfix nor the rollback was actually deployed. As a result, even customers pinned to version 1.328.0 continued to receive the broken lazy-loaded script from the CDN. The issue persisted for an additional two days until the missing deployment was identified and completed.

The original customer issue remains unresolved, but the customer has been provided with a temporary workaround.

## Impact

- At least 6 customers reported issues with the PostHog SDK after the changes were released, not including the customer that reported issues with the SDK initially
- At least 4 customers reported critical issues with their production systems
- Customers were forced to remove the PostHog SDK entirely to restore functionality if they did not identify that only network header/body capture needed to be disabled
- The issue persisted across 5 SDK versions (1.323.0 – 1.328.0)
- Even customers who use a fixed SDK version and did not update the SDK during this incident were affected

## Timeline

| Time (UTC) | Event |
|------------|-------|
| Jan 14, 10:18 AM | A customer reached out to inform us that they had removed the PostHog SDK from their site as it was causing fetch requests to fail with a TypeError. They had first become aware of this issue a week prior and this was a high-severity issue for them that rendered their site unusable. |
| Jan 15, 5:33 PM | A new version (1.323.0) of the PostHog SDK was released with an [attempted fix](https://github.com/PostHog/posthog-js/commit/584657a0686c80c439261a1a90bb69fe45e873d0) for the TypeError issue. |
| Jan 16, 5:44 AM | The customer informed us that the fix in version 1.323.0 was not effective. |
| Jan 16, 12:52 PM | A new version (1.325.0) of the PostHog SDK was released with an [amended fix](https://github.com/PostHog/posthog-js/commit/262cb4b6ef5c62aad4e2ef047f5349b6220fd2f9) for the TypeError issue. |
| Jan 17, 3:31 AM | Another customer reached out to inform us that their site was down due to issues with the integrity of fetch requests and that disabling PostHog immediately caused the issues to resolve. |
| Jan 17, 6:43 AM | A [GitHub issue](https://github.com/PostHog/posthog-js/issues/2922) was submitted describing an issue with the fetch wrapper in the PostHog SDK causing mismatched FormData boundaries. |
| Jan 17, 8:43 AM | A new version (1.327.0) of the PostHog SDK was released with [a fix](https://github.com/PostHog/posthog-js/commit/b8b7f9058cba58b2ff2eb76ab49776304dabef1c) for the mismatched FormData boundaries. |
| Jan 17, 7:38 PM | More customer reports of critical issues with the fetch wrapper in the PostHog SDK surfaced and the decision was made to roll back all recent changes. |
| Jan 17, 8:13 PM | A new version (1.328.0) of the PostHog SDK was released, [undoing all recent changes](https://github.com/PostHog/posthog-js/commit/ce4566d9107c7fd7d802274c1b8ccf477b8ccd0d) to the fetch wrapper, restoring it to the last known working version. |
| Jan 19, 4:04 PM | We became aware that the SDK version bump had not been merged into the primary PostHog repository, meaning that even for customers who had pinned their SDK version to 1.328.0, the faulty lazy-loaded script was still being served by our CDN and was still causing issues. |

## Root cause

The initial issue was caused by the SDK fetch wrapper being too simplistic and not passing on request options that are sometimes required – specifically any request with a body of type `ReadableStream` must include the request option `duplex: half` or `duplex: full` on all modern browsers. Even if the customer site _does_ provide this option, the fetch wrapper does not pass it down to the original `window.fetch` method, resulting in a `TypeError`.

The fixes that were introduced to attempt to address this caused another issue. The updated fetch wrapper was creating a new `Request` object and passing both this object _and_ the request options to downstream wrappers and `window.fetch`. This was causing the request body to be consumed multiple times which is not a problem for most requests but which results in mismatching boundaries for `FormData` requests. When the FormData boundaries do not match, the request is typically rejected by the server.

A fix for this issue was released (1.327.0) but due to the missing manual approval step, this fix was never actually deployed to the CDN. Customers continued to report problems and, believing the fix to be ineffective, the decision was made to roll back all changes to the fetch wrapper rather than attempt to diagnose further.

The decision to roll back was delayed due to a lack of understanding of the scope of the issue – ultimately we had to rely on reports from customers to get the full picture. This also contributed to the incident not being handled within the usual incident response process.

The incident was prolonged because a recently introduced process requiring manual intervention to publish SDK releases to the PostHog CDN was not followed. There was no verification step to confirm that releases were successfully deployed to the CDN. As a result, the bugfix (1.327.0) and rollback (1.328.0) releases were never actually served to customers.

## Resolution

All recent changes to the fetch wrapper were reverted, including on the CDN, restoring it to the simple, original implementation:

```typescript
const req = new Request(url, init)
return originalFetch(req)
```

The original `TypeError` issue remains.

## Insights

1. **Fetch wrapper changes are high-risk:** The fetch API is fundamental to web applications; changes require extensive testing across diverse use cases, which our current test suite does not fully cover.

2. **Use feature flags for high-risk changes:** Feature flags would have enabled rapid rollback without requiring a new release.

3. **Issues with the SDK can be hard to detect:** Unlike issues with our backend systems, we do not get alerts when the SDK fails and so we relied entirely on customer feedback.

4. **There should never be a mismatch between the latest SDK version deployed to NPM and the latest version being served up by our CDN:** This is a sign that something has gone wrong in the release process.

5. **Multiple fix attempts signal deeper issues:** When fixes don't resolve the problem, step back to understand the root cause rather than iterating on partial solutions.

6. **Changes to lazy-loaded SDK extensions affect all customers:** We only test changes to the SDK extensions with the latest version of the core SDK but then we release it to customers running (much) older versions of the core SDK, without testing.

## Action items

We are committed to:

- Adding comprehensive integration tests for fetch wrapper with FormData, ReadableStream, and chained wrappers
    - https://github.com/PostHog/posthog-js/pull/2935
    - https://github.com/PostHog/posthog-js/pull/2936
- Establishing a more robust testing strategy for the PostHog SDK – we should test lazy loaded extensions with _all_ past versions of the core SDK or implement a way to pin a version of the extensions
- Implementing monitoring and alerting for SDK errors – consider tracking SDK exception rates, failed network requests, or other client-side signals in PostHog itself to detect issues proactively rather than relying on customer reports
- Documenting and communicating SDK release process changes to the team
- Adding an automated verification step to confirm releases are successfully deployed to the CDN
- Implementing an automated notification polling on-call engineers to manually approve new SDK releases
- Implement an easier mechanism for customers to opt in to lazy loading without opting in to auto-updating
