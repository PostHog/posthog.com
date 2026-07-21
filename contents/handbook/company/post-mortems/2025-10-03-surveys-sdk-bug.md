---
title: Surveys SDK bug
showByline: true
date: 2025-10-03
author:
    - lucas-faria
tags:
    - Post mortems
---

On October 3, 2025, a backwards compatibility issue in the PostHog Surveys SDK (version 1.270.0) caused widespread JavaScript exceptions for customers using SDK versions older than 1.257.1. The issue lasted 5 hours and 26 minutes, affecting 305 teams and disrupting both survey functionality and error tracking metrics.

## Summary

A backwards compatibility break in SDK version 1.270.0 introduced a dependency on the `isDisabled` function from the `PostHogPersistence` class, which was only added in version 1.257.1 (July 2025). The issue manifested when the asynchronously-loaded survey extension attempted to call this function on older SDK versions where it didn't exist, causing JavaScript exceptions in customer applications. The incident was initially detected through customer support tickets rather than automated monitoring, leading to a 4+ hour detection delay and extended customer impact.

## Timeline

All times in UTC.

- **10:45** – SDK version 1.270.0 deployed to production with backwards compatibility issue
- **14:59** – [Support engineer notices two similar customer reports in tickets](https://posthog.slack.com/archives/C075D3C5HST/p1759503579040139)
- **15:25** – Issue confirmed by surveys team. Begin reverting suspected PRs: [Backend PR](https://github.com/PostHog/posthog/pull/39108/files) and [SDK PR](https://github.com/PostHog/posthog-js/pull/2397)
- **16:00** – [Error Tracking team independently notices spike in exception throughput](https://posthog.slack.com/archives/C087FAT5FK5/p1759507228619759)
- **16:11** – Reverts deployed, issue mitigated. SDK version 1.270.1 released
- **16:25** – [Formal incident declared retroactively](https://posthog.slack.com/archives/C09JR5WV0JG/p1759508704952599)
- **16:45** – Customer communications sent to affected teams
- **22:28** – Incident closed, post-mortem phase begins

**Total impact duration:** 5 hours 26 minutes (10:45 – 16:11 UTC)
**Detection delay:** 4 hours 14 minutes

## Root cause analysis

[The culprit PR](https://github.com/PostHog/posthog-js/pull/2355) introduced the backwards compatibility issue.

### The technical problem

The PR modified the surveys SDK to use `posthog.persistence` instead of accessing `localStorage` directly – a reasonable architectural improvement. To ensure backwards compatibility, the code needed to check whether `posthog.persistence` was available before attempting to use it.

The implementation used the `isDisabled` function from the `PostHogPersistence` class, adding a utility in `survey-utils.ts` to verify persistence availability. However, this function was only introduced in [a PR merged on July 11](https://github.com/PostHog/posthog-js/pull/2082) and first made available in SDK version 1.257.1.

### Why it failed

When PR #2355 was merged, both the main SDK code (`posthog-surveys.ts`) and the extension code (`extensions/surveys.tsx`) relied on the `isDisabled` function.

For the main SDK bundle, this worked correctly – customers on older versions never loaded the new code containing the reference to `isDisabled`.

However, the survey extension creates an asymmetric loading scenario:

1. The customer's application loads the SDK at whatever version they have installed (potentially months or years old)
2. The survey extension is loaded asynchronously from our CDN and **always downloads the latest version**

This created a version mismatch where:

- The old SDK (< 1.257.1) didn't have the `isDisabled` function
- The new extension (1.270.0) expected it to exist
- JavaScript threw `TypeError: isDisabled is not a function` exceptions

### Why it wasn't caught

1. **No version compatibility testing**: We lack automated tests that verify new extension code works with older SDK versions
2. **Code review gaps**: We don't have a process to flag when new APIs are added to main SDK files that might be called by extensions
3. **No static analysis**: No linter rules prevent extensions from calling functions that may not exist in older SDK versions
4. **Detection gaps**: No monitoring alerted us to the spike in customer-side exceptions – we learned about it from support tickets

## Impact

**Severity:** Major (High Impact, Service Degradation)

**Affected customers:** 305 teams running SDK versions < 1.257.1

**User-facing impact:**

- All Survey functionality completely broken (surveys failed to load or display)
- Increased error tracking bill for affected customers due to exception volume
- JavaScript exceptions thrown in customer applications, potentially affecting their own application functionality and exception-tracking bills in other platforms

**Duration:** 5 hours 26 minutes of active impact

**Error tracking billing impact:**

- Initially 305 teams saw increased exception volumes
- Successfully filtered out the most common exception pattern via [this PR](https://github.com/PostHog/posthog/pull/39126), reducing billable impact to 90 teams
- The remaining 215 teams' exceptions were successfully excluded from their bills
- The 90 teams still affected experienced other related exception patterns that couldn't be automatically filtered

## Remediation

We reverted the problematic changes and released SDK version 1.270.1, which restored compatibility with all SDK versions.

### Immediate actions

- Reverted the backwards-incompatible changes and released version 1.270.1
- Issued credits / refunds to all customers affected by increased error tracking bills
- Sent communications to all 305 affected teams explaining the issue and resolution

**Action item:** Start incidents earlier. We should declare incidents as soon as we confirm an issue (around 14:59), not almost two hours after mitigation. This enables proper coordination and customer communication. Owner: @lucasheriques

### Short-term improvements

- **API compatibility layer**: Modify the `isDisabled` function check in `posthog-persistence.ts` to be nullable and provide a safe fallback when undefined. This will prevent similar issues when extensions call potentially-unavailable functions. [PR](https://github.com/PostHog/posthog-js/pull/2428)

- **Ignore PostHog SDK exceptions:** By default we should not capture exceptions known to be caused by the PostHog SDK. Offering a config option to toggle this parameter would allow teams (especially our own) to configure this setting. [[PR](https://github.com/PostHog/posthog-js/pull/2430)]

- **Monitor suspicious exceptions:** The error tracking team should monitor the number of exceptions that look likely to be coming from our own SDK. Adding alerting to this metric would allow us to detect anomalies sooner. [[PR](https://github.com/PostHog/posthog/pull/39377)]

### Long-term improvements (Target: Q4 2025 – Q1 2026)

- **Version compatibility testing**: Add automated tests that run the latest extension code against the last N minor. Owner: @lucasheriques

- **Static analysis tooling**: Implement a linter rule or TypeScript checking to flag when extension code calls SDK functions that aren't marked as "stable API" or don't have proper fallback handling. This should run in CI and block PRs. Owner: @lucasheriques

- **Client-side error monitoring**: Set up monitoring and alerting for exception spikes in customer applications that use our SDK. This would have detected the issue within minutes instead of hours. Owner: @lucasheriques

## Lessons learned

### What went well

- **Quick mitigation once identified**: From confirmation (15:25) to mitigation (16:11) was only 46 minutes
- **Cross-team collaboration**: Support, Error Tracking, and Surveys teams all contributed to identifying and resolving the issue
- **Effective customer remediation**: Successfully filtered out most exceptions to reduce billing impact from 305 to 90 teams

### What went poorly

- **Detection delay**: 4+ hours from deployment to detection is unacceptable for an issue affecting 305 customers. We relied on customer reports rather than proactive monitoring
- **Backwards compatibility blindspot**: Our development and review process had no safeguards against this class of bug
- **Incident declaration timing**: We declared the incident after it was resolved, missing the opportunity for coordinated response and timely customer communication
- **Testing gaps**: No integration tests covering the extension/SDK version compatibility scenario

### Key takeaways

This incident revealed a critical architectural weakness in how our asynchronously-loaded extensions interact with versioned SDK code. The assumption that extensions can safely call any SDK function breaks down when we have customers on old SDK versions but always serve them the latest extension code.

[We also had this similar issue in another incident here](https://github.com/PostHog/product-internal/pull/815/files).

The 4+ hour detection delay highlights gaps in our observability for client-side errors. We lack visibility into exceptions occurring in customer applications using our SDK.

The improvements outlined above will address both the immediate technical issue and the systemic gaps in testing, monitoring, and deployment practices that allowed this to reach production and persist for over 5 hours.
