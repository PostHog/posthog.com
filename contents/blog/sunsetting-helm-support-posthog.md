---
date: 2023-02-08
title: "Sunsetting Kubernetes support for PostHog"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["tim-glaser"]
featuredImage: ../images/blog/k8s-sunset/posthog-bye-kubernetes.png
featuredImageType: full
category: PostHog news
tags:
  - Product updates
---

We're sunsetting support for our Kubernetes deployment for PostHog. This means we will no longer support a _paid_, self-hosted product. Because we're an open source company, I want to be transparent about what this change means, and why we're making it. 

In this blog post I'll explain:

1. Why we're making this important change
2. How this impacts existing self-hosted customers
3. The steps we're taking to support impacted customers

> **Important:** Right now, _about 3.5% of our users use Kubernetes_, so this change only affects a small subsection of our users. This decision **doesn't impact free open source users** on Docker Compose deployments (also known as the "hobby" deployment). We remain totally committed to being open source and are actively exploring ways to make that experience even better.

## Why are we doing this?

PostHog has grown incredibly fast over the last three years. 23,000 companies have signed up to PostHog. Last year, [we grew revenue 6x](/blog/2022-review), we're default alive and will likely be profitable in 2023.

One thing that hasn't grown much is the number of users using Kubernetes. We started offering our Kubernetes deployment, alongside a paid supported version, about 2 years ago. Over the last 6 months, we've realized that self-hosting a Kubernetes deployment does not serve either free users or our paid customers.

When we launched our Kubernetes deploy, we were hoping we could get to a stage where we battle tested enough of the components. We hoped that we could automate enough to make self hosting and scaling PostHog seamless, with a minimum amount of effort.

Hosting PostHog at scale is complex. With our Kubernetes users, we've seen issues crop up in every part of the stack. In event ingestion, Kafka, ClickHouse, Postgres, Redis and within the application itself. Sometimes the fix is simple ("increase disk space"), but often the issue is something a couple of layers deep and very hard to debug, involving long calls with expensive engineers on both sides. Even something as simple as a full disk would cause their instance of PostHog to be down for hours or days.

We also learned that the tools to do that automation just don't exist. We kept finding new failure modes. When onboarding a new customer we would have to vet their engineering team for Kubernetes experience so that we'd be confident they could help us debug issues in their PostHog deploy. Folks that didn't have infra experience would often be able to get something set up, only to get stuck when something went wrong.

Despite our continued efforts to help customers and improve the experience, our small infrastructure team is spending an outsized amount of time supporting the 3.5% of users who haven't moved to PostHog Cloud or our open source Docker deployment.

By not supporting Kubernetes, we will free up a lot of time to focus on our main infrastructure priorities, which are PostHog Cloud and the open source Docker Compose deployment. Ultimately, this will lead to a better experience for the vast majority of our users.

## What's next?

Regular updates to our Helm chart will cease **after May 31, 2023**. Security updates on the last available version will continue for **at least the next 12 months**.

We've already written to paying customers on Kubernetes deployments outlining how we'll support them in transitioning to PostHog Cloud, or an alternative PostHog deployment.

To ease any transition to PostHog Cloud, we are:
- Deep into the process of acquiring SOC 2 compliance for PostHog Cloud. We expect to have completed our SOC 2 audit by the end of Q2 2023. [**Update 17/04/2023:** PostHog Cloud is now SOC 2 certified.]

- Making our cloud HIPAA compliant and will provide security updates for the customers requiring HIPAA until then. 

If you're currently using Kubernetes to deploy PostHog, you have three options.

1. **[Migrate to PostHog Cloud](/docs/migrate/migrate-between-cloud-and-self-hosted)** – PostHog Cloud means you always have the latest features and it usually works out much cheaper, too. We now offer [PostHog EU Cloud](/eu) for folks who need to keep their data in the EU.

2. **[Migrate to our Docker Compose deployment](/docs/self-host/open-source/deployment)** – Our Docker Compose deployment is suitable for smaller event volumes and it's much simpler to set up and manage than Kubernetes. Self-hosted open-source deployment is provided under MIT license without guarantee.

3. **Continue on Kubernetes** – You can also continue using PostHog on Kubernetes. As noted already, we'll still provide security updates for at least the next 12 months, but you won't benefit from new features or technical support after May 31.

Finally, there will no longer be numbered releases of PostHog. Instead, we'll build a Docker image for each commit that happens in our GitHub repo. This means folks using our Docker Compose deployment will benefit immediately from new features and bugfixes, just like those on PostHog Cloud. You'll also be able to pin a version or roll back where necessary.

Thank you to everyone who continues to support and contribute to PostHog. We'll continue to build in public and work transparently, and I highly recommend you check out [our public roadmap](/roadmap) to see and give feedback on the exciting things we're building right now.

– Tim Glaser, Co-founder and CTO
