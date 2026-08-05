---
title: Workflow "Wait until condition" steps silently failing
showByline: true
date: 2026-04-27
author:
    - meikel-ratz
tags:
    - Post mortems
---

Between March 30 and April 22, 2026, a bug in our workflow engine caused workflows using "Wait until condition" steps to silently stop resuming. Affected workflows appeared to complete normally in the UI but never executed their downstream actions — such as delivering emails or sending Slack notifications. 48 workflows across 33 customer organizations were impacted, with 11,920 invocations silently blocked. The issue has been fully resolved and affected customers have been contacted and they will see a banner on each impacted workflow with a self-serve option to review and replay the silently-blocked runs. Importantly, 99.7% of all workflows triggered during this period executed normally.

## Summary

PostHog's workflow engine allows customers to build multi-step automations. Some steps, like "Wait until condition," pause execution and periodically re-check whether a condition has been met before continuing.

On March 30, we deployed a deduplication mechanism to fix an earlier incident where ghost workflow runs were causing customers to receive duplicate emails and notifications. The dedup logic worked by comparing the invocation ID of a workflow when it first entered a step against the ID it carried when it resumed. If the IDs didn't match, the resume was treated as a duplicate.

This only affected "hold-state" actions — steps that pause and re-enter themselves ("Wait until condition"). Steps like "Delay" advance to the next action before pausing, so the dedup check on the next action started fresh and never hit the mismatch.

Unfortunately, the issue went undetected far longer than usual as we were lacking observability for the dedup code path.

## Timeline

All times in UTC.

- **2026-03-30**: Deduplication logic deployed to production via [PR #52776](https://github.com/PostHog/posthog/pull/52776) to fix a separate ghost-run incident. This deployment introduced the regression.
- **2026-04-20 13:17**: A customer opened a support ticket reporting a workflow stuck at a "Wait until condition" step, with deduplication warning logs visible in their workflow logs.
- **2026-04-20 – 2026-04-22**: We added metrics and logging to the dedup code path ([PR #55282](https://github.com/PostHog/posthog/pull/55282)) to determine whether the issue was isolated or widespread. In parallel, we investigated the root cause.
- **2026-04-22 00:41**: Root cause identified — the UUIDT-to-UUIDv7 rewrite during re-queuing caused dedup mismatches. A fix-forward PR was opened ([PR #55652](https://github.com/PostHog/posthog/pull/55652)).
- **2026-04-22 06:35**: Incident declared. Instead of fixing forward, we rolled back the entire dedup code path to eliminate any residual risk ([PR #55672](https://github.com/PostHog/posthog/pull/55672)).
- **2026-04-22 08:21**: New image deployed, verified working correctly. Incident resolved.

## Root Cause Analysis

### Invocation ID format mismatch across subsystem boundary

The workflow engine generates invocation IDs using PostHog's UUIDT format. The V1 job queue (`job-queue-postgres.ts`) validates incoming IDs using the npm `uuid` package's `isUuid` check, which rejects UUIDT-format IDs and silently substitutes a fresh UUIDv7.

When a "Wait until condition" step paused and was re-queued through the Postgres V1 path, the invocation ID was rewritten. On resume, the dedup logic compared the stored UUIDT against the new UUIDv7, saw different IDs, and concluded the resume was a duplicate — silently terminating the workflow.

Both sides of this boundary were tested in isolation: the dedup tests called the executor directly (never round-tripping through the queue), and the queue tests used `uuidv4()` instead of the UUIDT generator that production actually uses. Both passed, but neither caught the mismatch that only surfaces when the two subsystems interact.

### Missing observability on a critical code path

The dedup logic was deployed without metrics tracking how many invocations were being filtered. Although legitimate deduplications were expected — thousands of ghost runs were still being correctly blocked — having a baseline would have made the anomalous spike in filtered invocations visible and drawn attention to the issue much sooner.

## Lessons Learned

### What went well

- Once the customer reported the issue, the team quickly added observability and identified the root cause.
- The rollback was clean — reverting the dedup code immediately unblocked all affected workflows with no further intervention needed.
- Customer Success proactively reached out to all potentially-affected organizations.
- Impact analysis was thorough: the team built a log-pattern fingerprint (UUIDT-to-UUIDv7 rewrite combined with pause-resume cycles) to precisely identify affected workflows and distinguish bug-caused blocks from legitimate dedup catches.

### What went poorly

- **23-day detection gap.** The dedup code path lacked dedicated metrics, which delayed detection.
- **Tests didn't cross the subsystem boundary.** Unit tests for dedup and for the job queue each passed independently, but no integration test exercised the full round-trip (engine → queue → resume) with production ID formats.
- **Silent failure mode.** Affected workflows showed as "completed" in the customer-facing UI with no indication that downstream actions were skipped.

### Key takeaways

1. **We've reverted the dedup logic and are investing in building a solution** that fully mitigates this class of problems. The new architecture will also allow us to write more robust end-to-end tests to prevent issues like this from happening again.
2. **We have deployed additional alerting** that will notify the teams immediately for this class of failure case in the future.
