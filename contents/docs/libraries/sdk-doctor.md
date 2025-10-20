# SDK Doctor (Beta)

SDK Doctor helps you monitor and maintain your PostHog SDK integrations by automatically detecting version issues, configuration problems, and implementation patterns across your applications.

> **Note:** SDK Doctor is currently in beta. [Give feedback](https://github.com/PostHog/posthog/issues/new?labels=feature%2Fsdk-doctor).

## What is SDK Doctor?

SDK Doctor is a diagnostic tool that monitors your PostHog SDK version to identify:

- **Outdated SDK versions** – Notifies you when your SDKs are far behind the latest release
- **Version fragmentation** – Shows you if multiple versions of the same SDK are in use in recent events 

SDK Doctor runs when you open PostHog, analyzing recent events to provide actionable insights about the health of yourPostHog integration. You can also run it again with the `Scan events` button
## Supported SDKs

SDK Doctor currently monitors 12 PostHog SDKs:

- **Web** (posthog-js)
- **Python** (posthog-python)
- **Node.js** (posthog-node)
- **React Native** (posthog-react-native)
- **Flutter** (posthog-flutter)
- **iOS** (posthog-ios)
- **Android** (posthog-android)
- **Go** (posthog-go)
- **PHP** (posthog-php)
- **Ruby** (posthog-ruby)
- **Elixir** (posthog-elixir)
- .NET (posthog-dotnet)

## How it works

SDK Doctor analyzes recently ingested events to extract SDK version information, and detect implementation patterns. For each SDK, it:

1. **Tracks versions in use** – Identifies which SDK versions are sending events
2. **Compares against latest releases** – Checks versions and release dates on our GitHub repos
### Version outdatedness detection

SDK Doctor's approach tries to reduce noise from our frequent releases, but still lets you know when your SDK version is too outdated for comfort:

- **Grace period**: Versions less than 7 days old are never flagged, even if newer versions exists.
- **Major versions**: Always flagged if you're not on the current major version (e.g., you're still using v1.x when v2.x is available) or if your version is over 1 year old
- **Minor versions**: Flagged if 3+ minor versions behind, or more than 6 months old
- **Patch versions**: Flagged if 5+ patch versions behind, or more than 3 months old

## Accessing SDK Doctor

SDK Doctor is available in the righthand side panel. The SDK Doctor button will be added to the righthand side panel if you have one or more outdated SDKs in need of an update.

1. Click the three vertical dots in the lower-right corner of any page.
2. In the resulting menu, click `SDK Doctor`
3. View detected SDKs, their versions, and notes about issues found
4. Click the provided links to view available versions and documentation

## Understanding SDK Doctor badges

SDK Doctor uses badges to quickly communicate SDK status:
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

SDK Doctor only shows SDKs that have sent events recently. If you've just installed an SDK or it's in a low-traffic environment, it may take time to appear.
### How often does SDK Doctor update?

SDK Doctor samples your recent events when you open PostHog. Event samples, and SDK versions with release dates from GitHub, are cached for your entire team for 24 hours. Use the `Scan events` button to re-sample
### What happens when I update an SDK?

Once you deploy an updated SDK and it starts sending events, SDK Doctor will detect the new version within 24 hours. 

Or, after you've ingested a few dozen events from the latest SDK version, you can click the `...` menu in the upper-right of SDK Doctor's panel, and select `Scan events` to have SDK Doctor check again.
### Does SDK Doctor affect my event ingestion?

No. SDK Doctor analyzes only events that have already been ingested. 
## Giving feedback

SDK Doctor is actively being developed. We'd love your feedback:

- [Report bugs ](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml)or [request features](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&projects=&template=feature_request.yml) 
- Use the feedback link at the top of the SDK Doctor side panel

