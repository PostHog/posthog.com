---
title: Grafana
platformLogo: grafana
---

[Grafana](https://grafana.com/) is an open source observability and data visualization platform. Grafana's echo service captures frontend usage events from your Grafana instance, and as of Grafana v13.1 it can forward them to PostHog. With this integration, you can:

- Track how your team uses Grafana, including pageviews and UI interactions
- See which dashboards and features get the most use
- Capture frontend performance metrics and JavaScript errors from your Grafana instance
- Analyze Grafana usage alongside the rest of your product data in PostHog

## Prerequisites

1. Have a [PostHog account](https://app.posthog.com/signup)
2. Run a self-managed [Grafana instance](https://grafana.com/docs/grafana/latest/setup-grafana/) on version 13.1 or later

## Configuring Grafana

1. In PostHog, copy your project token from [your project settings](https://app.posthog.com/settings/project).
2. Open your Grafana configuration file (`grafana.ini`, or `custom.ini` on Windows).
3. Add your project token to the `[analytics]` section. The integration is disabled unless a token is set.

   ```ini
   [analytics]
   posthog_token = <ph_project_token>
   ```

4. If you use PostHog Cloud EU, also set `posthog_host`. It defaults to `https://us.i.posthog.com` if not set.

   ```ini
   [analytics]
   posthog_token = <ph_project_token>
   posthog_host = https://eu.i.posthog.com
   ```

5. Restart Grafana for the changes to take effect.

If you run Grafana in Docker or Kubernetes, you can use Grafana's standard environment variable overrides instead of editing the configuration file:

```shell
GF_ANALYTICS_POSTHOG_TOKEN=<ph_project_token>
GF_ANALYTICS_POSTHOG_HOST=https://eu.i.posthog.com
```

## Verifying the integration

1. Open your Grafana instance and click around a few dashboards.
2. Check that events appear in your [PostHog activity tab](https://app.posthog.com/activity/explore).

## What data is sent?

Grafana forwards all of its echo event types to PostHog:

| Grafana event | PostHog event |
|---------------|---------------|
| Pageview | `$pageview`, with the page path |
| Interaction | Captured under the interaction name, with its properties |
| Experiment view | `experiment_viewed`, with `experiment_id`, `experiment_group`, and `experiment_variant` |
| Meta analytics | Captured under the meta analytics event name |
| Performance | `performance_metric`, with `metric_name` and `metric_value` |
| Grafana JavaScript agent | `grafana_javascript_agent_event` |

If the signed-in Grafana user has an analytics identifier, Grafana also identifies them in PostHog with their `email`, `name`, `orgId`, `orgName`, and `orgRole` as person properties.

## Frequently asked questions

### Where can I find out more?

See Grafana's [configuration documentation](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#posthog_token) for more information on the `posthog_token` and `posthog_host` settings.

### Who maintains this integration?

This integration is part of Grafana core and was contributed by PostHog. If you have issues with the integration not functioning as intended, [let us know in-app](http://app.posthog.com/home#supportModal).

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal).
