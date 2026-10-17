---
title: Billing limits and alerts
---

To help you avoid surprise bills, PostHog enables you to set billing limits for most of our products ([see the exception](#products-without-a-billing-limit)). Setting a billing limit means we will stop ingesting and processing your data so you are not charged over the set limit. In other words, if you exceed the billing limit you set, your additional data is lost forever.

To set a billing limit:

1. Go to your organization's [billing settings](https://app.posthog.com/organization/billing)
2. View the billing limit section at the bottom of the product and click "Set billing limit."
3. Set your dollar limit in the box and press "Save."

You’ll need to do this for each of the products. You can also remove limits by following the same process and clicking “Remove limit” instead of "Save."

![billing limit image](https://res.cloudinary.com/dmukukwp6/image/upload/2024_07_12_at_09_47_11_2x_47fdd2e176.png)

## Billing alerts

When you set billing limits, the owner of the organization will automatically get alert emails when product usage nears the billing limits. These emails are sent at **80%** and **100%** of the limit. These emails are also sent when you reach **80%** and **100%** of the free allotment.

Spike detection complements other billing and usage monitoring features, such as [spike detection](/docs/billing/spike-detection) and [usage dashboards](/templates/posthog-billable-usage).

## Products without a billing limit

Your Logs billing limit stops ingestion but doesn't cap [Logs custom retention](/docs/logs/pricing#retention), and custom retention can't have a limit of its own. Retention for data you keep is billed on top of the limit. The 80% and 100% alerts don't cover it.