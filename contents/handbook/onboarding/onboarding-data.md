---
title: Onboarding Data
sidebar: Handbook
showTitle: true
---

## Data architecture overview

Data used by Onboarding Specialists comes from three main sources:

**Billing Postgres**
[_admin panel view_](https://billing.posthog.com/admin/)
- Customer account, subscription, and invoice type data
- Usage reports and consumption metrics
- Revenue amortization calculations
- Billing forecast / spike calculations

**Production Postgres**
[_admin panel view (US)_](https://us.posthog.com/admin/)

- Organizations and projects configuration
- User accounts and permissions
- Product settings and feature flags
- Warehouse tables, pipeline source/destination info

**ClickHouse**
- Event and person data for all teams (projects)
- person to distinct_id mappings

### Query capabilities

- **Metabase** queries production databases directly but cannot combine Postgres and ClickHouse in a single query
- **PostHog analytics** limited to Team 2 data, but can query across databases in a single query

- **Cross-organization analysis** requires Metabase for customer event analysis, including:
  - Library usage breakdowns
  - Event volume metrics
  - Implementation diagnostics

## Key data tables

For onboarding analysis, these tables provide essential data:

| Table | Purpose | Key fields |
|-------|---------|------------|
| `invoice_with_annual` | Billing data with revenue amortization | Revenue (mrr), billing period, type (annual, completed, upcoming, etc) |
| `posthog_organization` | Org-level configurations | Settings, feature access, creation date |
| `posthog_project` | Project/team settings | Project configuration, team members |
| `billing_spike` | Usage anomaly detection | Spike timestamps, magnitude, affected metrics |


