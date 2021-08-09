---
title: Hosting Costs
sidebar: Docs
showTitle: true
---

Charges on various platforms can be confusing to understand as loadbalancers (which we have 1 in the default configuration) and storage (default configuration has 64Gi) are often charged separately from compute. Plus potential network utilization or other miscellaneous costs.

## DigitalOcean (56$/month)

See [DigitalOcean Kubernetes pricing](https://www.digitalocean.com/pricing#kubernetes).

At the time of writing the suggested default setup is as follows:
1. 40$ for compute (2x smallest prod nodes)
1. 6.4$ for storage (64Gi block storage)
1. 10$ for load balancer (1x small LB)

Making the total 56.4$ / month.

## AWS (100$/month)

At the time of writing the suggested default setup is as follows:
1. 70$ for compute (2x m5.large). Note that reserved instances are about 40% cheaper if you can commit to a year.
1. 6.4$ for storage (64Gi block storage). Note that potentially you'll get charged for snapshots extra.
1. 20$ for load balancer (18.25 + 0.008 / GB of data was processed)

Making the total around 100$ / month.

## Help us make this guide better

If you've deployed PostHog on platforms not listed here or are seeing different costs, please let us know how much you're roughly spending so we can improve this guide. 


You can contact us at _[hey@posthog.com](mailto:hey@posthog.com)_ or submit a Pull Request to our [Docs Repository](https://github.com/PostHog/posthog.com) :-).
