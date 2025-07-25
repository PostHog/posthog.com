---
title: Grafana
sidebar: Handbook
showTitle: true
---

We use Grafana for monitoring our infrastructure and application metrics across all environments.

## Access

Our Grafana instances are environment-specific and accessible via these endpoints:

- **Production US**: [https://grafana.prod-us.posthog.dev/](https://grafana.prod-us.posthog.dev/)
- **Production EU**: [https://grafana.prod-eu.posthog.dev/](https://grafana.prod-eu.posthog.dev/)
- **Development**: [https://grafana.dev.posthog.dev](https://grafana.dev.posthog.dev)

## Dashboard management

You can edit dashboards directly in any of the Grafana instances. Changes are automatically synced across all environments every hour through our [Grafana sync GitHub Action](https://github.com/PostHog/posthog-cloud-infra/actions/workflows/grafana-sync-dashboards.yml).

This workflow can also be triggered manually if you need to sync changes immediately by clicking "Run workflow" in the GitHub Actions interface.