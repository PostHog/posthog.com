---
title: Health checks (Beta)
sidebar: Docs
showTitle: true
---

Health checks continuously inspect your PostHog setup for problems that quietly degrade your data – a missing SDK, traffic that bypasses your reverse proxy, a broken materialized view, and more. When a check finds an issue, PostHog surfaces it in the relevant **Health** section of the app, can notify you through alerts, and – if you use [PostHog Code](/docs/posthog-code) – can investigate and fix it for you automatically.

> **Note:** Health checks are currently in beta. The set of checks below is expanding over time.

{/*SCREENSHOT PLACEHOLDER: the Health section overview in the PostHog app*/}

## What are health checks?

A health check is a scheduled job that looks at recent events, project settings, and pipeline state across your project and flags anything that looks wrong. Each check:

1. **Runs on a schedule** – Most checks run daily and look back over a recent window (usually 1–30 days).
2. **Writes an issue when something's wrong** – Issues appear in the matching Health page, tagged with a severity.
3. **Resolves automatically** – Once a later run sees the problem is gone (e.g. events start arriving again), the issue clears on its own.

[SDK doctor](/docs/sdk-doctor) was the first of these checks. It's now one section of a larger health system that also covers web analytics, ingestion, and your data pipelines.

### Severity levels

Every issue has a severity that determines how prominently it's surfaced and how it's prioritized for automatic fixing:

| Severity | Meaning | Signal priority |
|----------|---------|-----------------|
| 🔴 **Critical** | Data is missing or broken right now | P1 |
| 🟠 **Warning** | Data is degraded or at risk | P2 |
| 🔵 **Info** | Worth knowing, low urgency | P3 |

## Fixing issues automatically with Signals and PostHog Code

Most health checks emit a [Signal](/docs/posthog-code/inbox/sources) into the **PostHog Code Inbox**. If you've connected your repository to [PostHog Code](/docs/posthog-code), you can let an agent take it from there:

1. **Enable health checks as a signal source** – In PostHog Code, open **Inbox → Configure sources** and turn on health checks. See [signal sources](/docs/posthog-code/inbox/sources).
2. **The agent researches the issue** – It reads the issue, queries your data with the [PostHog MCP](/docs/model-context-protocol), and locates the cause in your codebase. Learn more about [research tasks](/docs/posthog-code/inbox/research).
3. **It opens a fix** – Where the fix lives in your code (an SDK config flag, a dependency bump, a proxy route), the [implementation agent](/docs/posthog-code/inbox/implementation) can open a PR for you to review. Where the fix is a PostHog setting or model, it uses the MCP tools to apply it.

This integration was added in [PostHog/posthog#61955](https://github.com/PostHog/posthog/pull/61955). Each check below notes the most direct way to resolve it both manually and through Signals.

> Some issues can't be fixed by an agent – for example, [external data sync failures](#external-data-sync-failures) often come down to rotated credentials, which only you can re-enter. These still appear as alerts, but won't open a PR.

{/*SCREENSHOT PLACEHOLDER: a health-check signal in the PostHog Code Inbox*/}

## Getting notified

When an issue fires or resolves, PostHog emits `$health_check_issue_firing` and `$health_check_issue_resolved` events. You can route these to Slack, email, or a webhook using [destinations](/docs/cdp/destinations) so the right team hears about problems without watching the Health pages.

---

## SDK health

### Outdated SDKs

**What it means:** You're sending events from a PostHog SDK version that's significantly behind the latest release.

**Why it matters:** Outdated SDKs miss bug fixes, performance improvements, and new features, and may carry known issues.

**How to fix it:** Open the **SDK Health** page to see every SDK you're sending events from, the versions in use, and how far behind each is. Bump the dependency in your package manager (npm/yarn/pnpm, pip/poetry, gem, `go get`, etc.) and redeploy. For snippet installs, make sure you're loading the latest snippet. See [SDK doctor](/docs/sdk-doctor) for the full breakdown of how versions are evaluated and [keeping SDKs current](/docs/sdk-doctor/keeping-sdks-current).

**Automate it:** With [PostHog Code](/docs/posthog-code), the agent identifies the outdated SDK, bumps it in the right manifest, updates the lockfile, and checks the changelog for breaking changes before opening a PR.

{/*SCREENSHOT PLACEHOLDER: SDK Health page*/}

## Web analytics health

These checks live on the **Web analytics health** page.

### No live events

**What it means:** No `$pageview` or `$screen` events have arrived in the last 30 days. _(Critical)_

**Why it matters:** Web and product analytics stay empty until capture is restored. It usually means the snippet/SDK isn't installed, was removed, or is misconfigured.

**How to fix it:** Confirm the PostHog snippet or SDK is installed and initialized with the correct project API key, then load a page and watch **Activity → Live events** for events arriving in real time.

**Automate it:** [PostHog Code](/docs/posthog-code) checks whether any events are landing at all, finds your `posthog.init` call, verifies the API key and that pageview autocapture is enabled, and fixes the initialization.

### No reverse proxy detected

**What it means:** None of your traffic is coming through a [reverse proxy](/docs/advanced/proxy).

**Why it matters:** Without one, ad blockers can silently drop a meaningful share of events, undercounting traffic and skewing analytics.

**How to fix it:** Set up a reverse proxy on your own domain (managed reverse proxy, Cloudflare, Vercel, AWS CloudFront, nginx, etc.), point your SDK's `api_host` at it, and redeploy. See the [reverse proxy guide](/docs/advanced/proxy).

**Automate it:** [PostHog Code](/docs/posthog-code) can stand up a [managed reverse proxy](/docs/advanced/proxy/managed-reverse-proxy) or add the proxy route for your stack (Next.js rewrite, `vercel.json` route, nginx `location`, Cloudflare worker), then update `api_host` and open a PR.

### Partial reverse-proxy coverage

**What it means:** Some of your hostnames route through a reverse proxy, but others don't.

**Why it matters:** Traffic from the unproxied hosts is more likely to be blocked by ad blockers and to have inaccurate geolocation, so analytics is inconsistent across your domains.

**How to fix it:** The health page lists the hostnames that aren't proxied. Point each one's SDK `api_host` at the same proxy your other domains use and redeploy.

**Automate it:** [PostHog Code](/docs/posthog-code) reads the unproxied hosts from the issue, verifies coverage per host, and updates `api_host` for the affected deployments.

### No authorized URLs configured

**What it means:** Your project has no authorized URLs (app URLs) set.

**Why it matters:** The toolbar can't launch on your site and some web-analytics filters won't work correctly.

**How to fix it:** Go to **Project settings → Authorized URLs** and add each domain you run on, including staging and subdomains (wildcards are supported).

**Automate it:** Authorized URLs are a security boundary, so [PostHog Code](/docs/posthog-code) treats it carefully – it discovers candidate domains from your events but always asks you to confirm which you actually own before appending them via the project settings, never clobbering existing entries.

### Missing `$pageleave` events

**What it means:** You're sending `$pageview` events but no `$pageleave` events.

**Why it matters:** Missing `$pageleave` breaks bounce rate, session duration, and scroll-depth metrics. It usually means pageleave capture is disabled in the SDK.

**How to fix it:** Update to a recent `posthog-js` with pageview autocapture enabled, which emits `$pageleave` automatically. If you capture pageviews manually, send a matching `$pageleave` on route changes / unload.

**Automate it:** [PostHog Code](/docs/posthog-code) locates your `posthog.init` call and enables pageleave capture (or adds the manual `$pageleave` call) in your codebase.

### Missing web vitals

**What it means:** You're sending `$pageview` events but no `$web_vitals` events.

**Why it matters:** Core Web Vitals (LCP, CLS, INP, FCP) won't appear in web analytics. It usually means performance capture is disabled in the SDK.

**How to fix it:** Make sure you're on a recent `posthog-js` and that `capture_performance` (web vitals) hasn't been turned off. See [web vitals](/docs/web-analytics/web-vitals).

**Automate it:** [PostHog Code](/docs/posthog-code) bumps `posthog-js` and enables `capture_performance: { web_vitals: true }` in your `posthog.init` config.

### Scroll-depth tracking disabled

**What it means:** Your `$pageleave` events carry no scroll-depth metadata.

**Why it matters:** Scroll-depth reports in web analytics will be empty. It usually means scroll-depth autocapture is disabled.

**How to fix it:** Update to a recent `posthog-js` and make sure autocapture (and DOM / scroll tracking) hasn't been disabled.

**Automate it:** [PostHog Code](/docs/posthog-code) bumps `posthog-js` and checks that your `posthog.init` config doesn't disable autocapture or scroll tracking.

## Ingestion

### Ingestion warnings

**What it means:** PostHog raised one or more [ingestion warnings](/docs/data/ingestion-warnings) for your project – events being dropped, mis-merged, or degraded on the way in. Severity escalates to critical past per-type volume thresholds.

**Why it matters:** The affected data is incomplete or inaccurate. Warning types include oversized messages, illegal distinct IDs, already-identified merges, timestamps too far out of range, and more.

**How to fix it:** Open the **Ingestion warnings** page. It groups warnings by type with example events – use those to trace the warning back to the instrumentation that produced it, then fix how those events are sent.

**Automate it:** [PostHog Code](/docs/posthog-code) reads the warning type and pulls example offending events, then fixes the `posthog.capture` (or autocapture) call sites – e.g. dropping oversized properties, correcting timestamps, or aligning event names.

## Data pipelines

### Materialized view failures

**What it means:** A [materialized view](/docs/data-warehouse/views) failed to refresh.

**Why it matters:** Queries and insights reading from it serve stale data. Common causes are a query that no longer compiles (a renamed column or table), a failing upstream source, or a timeout on a heavy query.

**How to fix it:** Open **Data modeling**, find the failing view, open its latest materialization run, read the error, fix the view's SQL or upstream dependency, then re-run the materialization.

**Automate it:** [PostHog Code](/docs/posthog-code) reads the view name and error, inspects the warehouse schema, runs the query to pinpoint what broke, and proposes the corrected query.

### External data sync failures

**What it means:** An [external data source](/docs/cdp/sources) failed to sync (or hit a billing limit).

**Why it matters:** The connected data is stale or incomplete. The most common causes are expired or rotated credentials, a permissions change, or an upstream schema change.

**How to fix it:** Open the **Pipeline status** page, find the failing source, open its latest run, and read the error. Reconnect or update the credentials, re-grant access, or update the schema mapping, then trigger a new sync.

> This check surfaces as an alert but **does not** open an automatic fix. Fixing it usually requires re-entering credentials, which can't be done over the API – so it's the one check [PostHog Code](/docs/posthog-code) intentionally leaves to you.

## Giving feedback

Health checks are actively being developed. We'd love your feedback:

- [Report bugs](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml) or [request features](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&projects=&template=feature_request.yml)
- Use the feedback link in the Health section of the app
</content>
</invoke>
