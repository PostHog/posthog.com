---
title: Hosting costs
sidebar: Docs
showTitle: true
---

Charges on various platforms can be confusing to understand as loadbalancers (which we have 1 in the default configuration) and storage (default configuration has 64Gi) are often charged separately from compute. Plus potential network utilization or other miscellaneous costs.

## Hobby ($10/mo)

See [Hobby Deployment](hobby) for details on volumes.

## DigitalOcean

See [DigitalOcean Kubernetes pricing](https://www.digitalocean.com/pricing#kubernetes).

At the time of writing the suggested default setup is as follows:
1. $48 for compute (2x basic nodes of 4GB & 2vcpu each)
1. $6.4 for storage (64Gi block storage)
1. $10 for load balancer (1x small LB)

Making the total \~$65 / month

## AWS

At the time of writing the suggested default setup is as follows:
1. $70 for compute (2x m5.large). Note that reserved instances are about 40% cheaper if you can commit to a year.
1. $6.4 for storage (64Gi block storage). Note that potentially you'll get charged for snapshots extra.
1. $20 for load balancer (18.25 + 0.008 / GB of data was processed)

Making the total around \~$100 per month for a minimum viable setup.

## Infrastructure costs at higher event volumes

How much will it cost to run PostHog at 1M / 10M / 100M / 1B events per month?

We often get asked to estimate the infrastructure costs at a given event volume, however in practice this is extremely difficult. This is because ballpark numbers depend many factors, such as: 

- Cloud provider pricing (most have usage discounts, so if you're already using other services, adding more is cheaper)
- Type of instance and setup used

A few examples should help to illustrate why:

- An installation running services on dedicated nodes will cost significantly more than one on non-dedicated hardware, etc.
- External (managed) services will cost significantly more than using self-hosted services, etc.
- Running an installation at 90% CPU or on slow disks will result in very slow UI and response times, but it will cost way less than a fast installation with responsive UI. (You can set up [monitoring](https://github.com/PostHog/charts-clickhouse/blob/554ecd8ccb63098d77002051ecd6912de9f554d2/charts/posthog/Chart.yaml#L56-L60) in your PostHog install to monitor this)

Given the nearly limitless possible infrastructure configurations, it's impossible to provide a single estimate based on event volume alone, however if you hop into our [community Slack](/slack), an engineer from our platform team can help chat through this quickly.

We recommend taking your planned configuration and plugging it into the pricing calculator for your hosting provider:

- [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator)
- [AWS Pricing Calculator](https://calculator.aws/#/)
- [Azure Pricing Calculator](https://azure.microsoft.com/pricing/calculator/)
- [DigitalOcean Pricing Calculator](https://www.digitalocean.com/pricing/calculator)

## Help us make this guide better

If you've deployed PostHog on platforms not listed here or are seeing different costs, please let us know how much you're roughly spending so we can improve this guide. 

You can contact us at _[hey@posthog.com](mailto:hey@posthog.com)_ or submit a pull request to our [Docs repository](https://github.com/PostHog/posthog.com).
