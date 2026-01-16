---
title: SDK doctor (Beta)
sidebar: Docs
showTitle: true
---

[SDK doctor](https://app.posthog.com/#panel=sdk-doctor) helps you monitor and maintain your PostHog SDK integrations by automatically detecting version issues, configuration problems, and implementation patterns across your applications.

> **Note:** SDK doctor is currently in beta. Give feedback by [raising an issue](https://github.com/PostHog/posthog/issues/new?labels=feature%2Fsdk-doctor).

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/sdk_light_0e172bf201.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/sdk_dark_4c91c12471.png"
  alt="SDK Doctor"
  classes="rounded"
/>

## What is SDK doctor?

SDK doctor is a diagnostic tool that monitors your PostHog SDK version to identify:

- **Outdated SDK versions** – Notifies you when your SDKs are far behind the latest release
- **Version fragmentation** – Shows you if multiple versions of the same SDK are in use in recent events 

SDK doctor analyzes recent events to provide actionable insights about your PostHog integrations. It analyzes recent events when you open PostHog, and you can run it manually with the **Scan events** button.

## Supported SDKs

SDK doctor currently monitors 12 PostHog SDKs:

| Platform | Package name | Documentation link |
|----------|--------------|-------------------|
| **Web** | `posthog-js` | [JavaScript](/docs/libraries/js) |
| **Python** | `posthog-python` | [Python](/docs/libraries/python) |
| **Node.js** | `posthog-node` | [Node.js](/docs/libraries/node) |
| **React Native** | `posthog-react-native` | [React Native](/docs/libraries/react-native) |
| **Flutter** | `posthog-flutter` | [Flutter](/docs/libraries/flutter) |
| **iOS** | `posthog-ios` | [iOS](/docs/libraries/ios) |
| **Android** | `posthog-android` | [Android](/docs/libraries/android) |
| **Go** | `posthog-go` | [Go](/docs/libraries/go) |
| **PHP** | `posthog-php` | [PHP](/docs/libraries/php) |
| **Ruby** | `posthog-ruby` | [Ruby](/docs/libraries/ruby) |
| **Elixir** | `posthog-elixir` | [Elixir](/docs/libraries/elixir) |
| **.NET** | `posthog-dotnet` | [.NET](/docs/libraries/dotnet) |

## How it works

SDK doctor analyzes recently ingested events to extract SDK version information, and detect implementation patterns. For each SDK, it:

1. **Tracks versions in use** – Identifies which SDK versions are sending events
2. **Compares against latest releases** – Checks versions and release dates on our GitHub repos

### Version outdatedness detection

SDK doctor's approach tries to reduce noise from our frequent releases, but still lets you know when your SDK version is too outdated for comfort:

- **Grace period**: Versions less than 7 days old are never flagged, even if newer versions exists.
- **Major versions**: Always flagged if you're not on the current major version (e.g., you're still using v1.x when v2.x is available)
- **Minor versions**: Flagged if 3+ minor versions behind, or more than 6 months old
- **Patch versions**: Never flagged

SDK doctor will also notify you if your SDK version isn't officially "outdated", but is old enough that an update is recommended. For mobile SDKs, you'll see a warning if the version is more than 6 months old. For all other SDKs, the threshold is 4 months. Upgrading to a newer version helps you benefit from recent fixes and features.

## Accessing SDK doctor

SDK doctor is available in the [right side panel](https://app.posthog.com/#panel=sdk-doctor). The SDK doctor button will be added to the right side panel if you have one or more outdated SDKs in need of an update.

1. Click the three vertical dots in the lower-right corner of any page.
2. In the resulting menu, click `SDK doctor`
3. View detected SDKs, their versions, and notes about issues found
4. Click the provided links to view available versions and documentation

## Understanding SDK doctor badges

SDK doctor uses badges to quickly communicate SDK status:

### Version badges

- 🟢 **Current**: SDK version is up to date
- 🟢 **Recent**: SDK version is slightly behind, but within acceptable thresholds
- 🔴 **Outdated**: SDK version is significantly behind, really should be updated
- **Unavailable**: SDK version information could not be retrieved from GitHub (check the provided link for available versions)

## Common issues and solutions

### Outdated SDK version

**What it means**: Your SDK version is significantly behind the latest release.

**Why it matters**: Outdated SDKs lack important bug fixes, performance improvements, and new features.

**How to fix**:
1. Follow the provided link for info on the latest release
2. Follow the provided link to the SDK's documentation for install instructions

## Frequently asked questions

### Why don't I see all my SDKs?

SDK doctor only shows SDKs that have sent events in the last 7 days. If you've just installed an SDK or it's in a low-traffic environment, it may take time to appear.

### How often does SDK doctor update?

SDK doctor samples your recent events when you open PostHog. Event samples and SDK versions are cached for 24 hours for your team. Use the `Scan events` button to re-sample.

### Why am I seeing several versions for the same SDK?

This means that events have been detected from multiple SDK versions within the last 7 days. If you’ve recently upgraded your SDK, seeing multiple versions is expected and can be safely ignored. However, if it’s been a while since your last upgrade, it could indicate that different versions of the SDK are still running at the same time. In that case, review your deployment to ensure older versions aren’t still in use.

### What happens when I update an SDK?

Once you deploy an updated SDK and it starts sending events, SDK doctor will detect the new version within 24 hours. 

You can also refresh SDK doctor manually by clicking the **Scan events** button. This will only work after your updated SDK has ingested a few dozen events.

### Does SDK doctor affect my event ingestion?

No. SDK doctor analyzes only events that have already been ingested. 

## Giving feedback

SDK doctor is actively being developed. We'd love your feedback:

- [Report bugs](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml) or [request features](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&projects=&template=feature_request.yml) 
- Use the feedback link at the top of the SDK doctor side panel

