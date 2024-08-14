---
title: Linking Zendesk as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

The Zendesk connector can link brands, groups, organizations, tickets, users, and sla policies.

To link Zendesk:

1. Go to the [data warehouse tab](https://us.posthog.com/data-warehouse) in PostHog
2. Click **Link Source** and select Zendesk
3. Provide the subdomain of your zendesk account (`https://posthoghelp.zendesk.com/` -> "posthoghelp" is the subdomain)
4. Provide the [API token](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API#topic_bsw_lfg_mmb) and email associated with it
5. *Optional:* Add a prefix to your table names
6. Click **Next**

The data warehouse then starts syncing your Zendesk data. You can see details and progress in the [data warehouse settings tab](https://us.posthog.com/data-warehouse/settings).