---
title: Tracking endpoints and ad blockers
sidebarTitle: Ad blockers
sidebar: Docs
showTitle: true
---

PostHog provides a range of services that help teams build great products.

Part of that range are web and product analytics, which send usage event reporting back to PostHog. We encourage our customers to be transparent about this reporting, provide several [privacy-preserving options](/docs/product-analytics/privacy) in our tools, and fully comply with data privacy laws, including GDPR.

Nevertheless, privacy-focused users of the web may wish to prevent any such data collection. Ad and tracking blockers should target these endpoints:

`https://us.i.posthog.com/capture`

`https://eu.i.posthog.com/capture`

PostHog provides other tools unrelated to event reporting and analytics. These can be vital to the sites which rely on them. You **should not block** these endpoints, at risk of breaking site functionality:

`https://us.i.posthog.com/decide`

`https://eu.i.posthog.com/decide`

`https://us-assets.i.posthog.com/static/`

`https://eu-assets.i.posthog.com/static/`

As we may add further endpoints in this category in the future, we encourage you to carefully target any blocking logic, rather than using a blanket approach.

## Further reading

- [GDPR compliance](/docs/privacy/gdpr-compliance)
- [CCPA compliance](/docs/privacy/ccpa-compliance)
- [HIPAA compliance](/docs/privacy/hipaa-compliance)
