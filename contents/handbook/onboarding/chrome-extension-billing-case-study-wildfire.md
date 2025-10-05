---
title: Chrome Extension Billing Case Study: Wildfire Systems
sidebar: Handbook
showTitle: true
---

### Summary

<PrivateLink url="https://posthog.vitally-eu.io/customers/0195813b-45fa-0000-7223-0ca3ec1f188a-793cf903/dashboards/7ca5e210-3473-4cf0-b048-df00d1acd0b2/conversations/active/5cac43a2-b9c6-4194-838e-3b852f7a0391">
  Wildfire Systems
</PrivateLink> implemented PostHog in a Chrome Extension environment. Due to how extensions handle session and identity persistence, they experienced unusually high event volume and feature flag calls, which led to inflated billing.

This document explains the technical causes, the customer's solution, and how to identify similar cases using Metabase.

### Technical Root Cause

| Issue | Explanation |
|------|-------------|
| PostHog re-initialized on every extension wake | Chrome extensions create a new runtime context when switching from idle to active. Each context re-initialized PostHog without access to prior storage. |
| A new `distinct_id` was created each time | Since local storage is isolated per context, the PostHog SDK could not persist the ID. This triggered a new anonymous ID on each wake cycle. |
| `identify()` was called repeatedly | Each new ID triggered a comparison to the persisted UUID. Since they always differed, `identify()` was called each time. |
| `identify()` triggered `reloadFeatureFlags()` | Every call to `identify()` refreshed feature flags. |
| `/flags` requests were billed, even when quota-limited | PostHog counted these requests toward the usage quota, even if the response returned no flags. |
| Added budget mid-cycle had no effect | When the team increased their billing limit, it did not retroactively unlock flags. Only new requests after the monthly reset were allowed. |

### Fix Implemented by the Customer

The Wildfire team applied the correct approach:

1. **Persisted a shared UUID via `chrome.storage.local`**
   This ID was generated once, then reused across all extension contexts.

2. **Bootstrapped PostHog with the UUID**
   On every initialization, the `distinct_id` was passed via `bootstrap`.

3. **Avoided calling `identify()` unnecessarily**
   The team checked if the existing `distinct_id` matched the UUID before calling `identify()`.

4. **Minimized `/flags` requests**
   Bootstrapped feature flag values were passed during init, reducing the need for real-time flag fetches.

5. **Used PostHog dashboard to monitor**
   The "My PostHog Billable Usage" dashboard showed real-time data to verify that fixes worked.

### How to Spot This in Metabase

If a customer is using a Chrome Extension without proper initialization, you will often see the following patterns in the usage dashboard:

#### 1. Extremely high `identify` event counts
- `identify` makes up more than 70 to 90 percent of all events
- Often accompanied by minimal actual user activity events (clicks, views, etc)

#### 2. `/flags` usage is abnormally high
- Feature flags represent a significant portion of the total volume or cost
- Check the forecasted bill by product to confirm this

#### 3. Total event volume appears inflated without a matching frontend footprint
- Session volume may be high without corresponding actions
- Repeated initialize-then-identify patterns from ephemeral clients can drive this

#### 4. Usage patterns appear to "pulse" or reset regularly
- Graphs show sharp daily spikes at regular intervals
- Indicates extension wake cycles creating new sessions and IDs

#### 5. No Batch Exports, minimal standard library usage
- Chrome extensions often do not use session replay, heatmaps, or full web libraries
- You may see a custom library version or just raw SDK usage

#### 6. High `$set`, `$identify`, `$groupidentify` volume with few custom events
- Suggests backend or SDK-driven implementations without user interaction data

When you see these signs together, it is a good idea to ask: "Are you using PostHog in a browser extension product or other ephemeral context?"

If confirmed, you can share bootstrapping and identity persistence best practices.

---

### Recommendations for Extension Developers

| Task | Details |
|------|---------|
| Persist ID manually | Use `chrome.storage.local` to persist UUID |
| Bootstrap identity | Pass the UUID during `posthog.init()` with `bootstrap.distinctID` |
| Avoid repeated `identify()` | Only call `identify()` if the ID has changed |
| Reduce `/flags` usage | Use `bootstrap.featureFlags` and disable polling if needed |
| Monitor proactively | Use the "My PostHog Billable Usage" dashboard |
| Educate early | Customers should be aware that extensions require manual handling |
