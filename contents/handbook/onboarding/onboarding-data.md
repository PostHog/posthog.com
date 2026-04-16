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

## Vitally integration

We sync customer data between Vitally and PostHog bi-directionally

### Data sync pipeline

**To Vitally:**
- Custom traits sync nightly from billing Postgres via [SQL queries in Vitally](https://posthog.vitally-eu.io/integrations/postgresql/f97e26e3-3c73-4cc4-a150-cc0b9cc33cd0/accounts)
- Product engagement events sent through data pipelines using [this action](https://us.posthog.com/project/2/data-management/actions/98141)
- Billing spike detection from `billing_spike` table, defined in [this PostHog function](https://us.posthog.com/project/2/functions/0196f9ab-b695-0000-5385-b1742bc01967)

**From Vitally:**
- All Vitally traits accessible as `` traits.`vitally.custom.traitNameFromVitally` `` in PostHog queries, eg see the `onboarding_accounts_timestamp_check` view)
- JSON storage format (requires cleaning for arrays/complex fields)
- Data syncs via data warehouse connection

### Known limitations

- Conversations table lacks organization/user mapping
  - Messages table implementation status unclear

## Onboarding pipeline tracking

### Pipeline stages

We track customers through defined onboarding stages with automated timestamp capture:

1. **Onboarding segment entry** - Customer enters onboarding criteria
2. **Outreach sent** - Initial contact via email (manual update)
3. **Customer engagement** - Response received (manual update)
4. **Nurture phase** - Post-intro call follow-up (manual update)
5. **Completion/churn** - Final outcome tracking

Each stage transition is managed through Vitally playbooks with automatic timestamp updates.

### Key data tables

For onboarding analysis, these tables provide essential data:

| Table | Purpose | Key fields |
|-------|---------|------------|
| `invoice_with_annual` | Billing data with revenue amortization | Revenue (mrr), billing period, type (annual, completed, upcoming, etc) |
| `vitally_accounts` | Customer properties and traits | All Vitally custom traits, health scores, usage |
| `posthog_organization` | Org-level configurations | Settings, feature access, creation date |
| `posthog_project` | Project/team settings | Project configuration, team members |
| `billing_spike` | Usage anomaly detection | Spike timestamps, magnitude, affected metrics |


