---
date: 2023-01-05
title: "Sunsetting Kubernetes support for PostHog"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["tim-glaser"]
featuredImage: ../images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
category: PostHog news
tags:
  - Product updates
---

We're sunsetting support for our Kubernetes deployment for PostHog. Because we're an open source company, I want to be transparent about what this change means, and why we're making it. Around 3.5% of PostHog users currently use this type of deployment. We will continue to support the docker deployment of PostHog.

## Why are we doing this?

We realized that self-hosting a Kubernetes deployment was too difficult and burdensome for both our free users and our paying customers.

When we launched our Kubernetes deploy, we were hoping we could get to a stage where we battle tested enough of the components. We hoped that we could automate enough to make self hosting and scaling PostHog seamless, with a minimum amount of effort.

Hosting PostHog at scale is complex. With our Kubernetes users, we've seen issues crop up in every part of the stack. In event ingestion, Kafka, ClickHouse, Postgres, Redis and within the application itself. Sometimes the fix is simple ("increase disk space"), but often the issue is something a couple of layers deep and very hard to debug, involving long calls with expensive engineers on both sides. Even something as simple as a full disk would cause their instance of PostHog to be down for hours or days.

We also learned that the tools to do that automation just doesn't exist. We kept finding new failure modes. When onboarding a new customer we would have to vet their engineering team for Kubernetes experience so that we'd be confident they could help us debug issues in their PostHog deploy. Folks that didn't have infra experience would often be able to get something set up, only to get stuck when something went wrong.

We're a small infrastructure team, and as more and more customers moved to PostHog Cloud or our open source Docker deployment, we were spending an outsized amount of engineering time supporting that 3.5% of users.

By not supporting Kubernetes, we will free up a lot of time to focus on our main infrastructure priorities, which are PostHog Cloud and the open source Docker deployment. Ultimately, this will lead to a better experience for the vast majority of our users.

## What changes

We'll no longer provide regular updates to our Helm chart after May 2023. We'll also no longer sell the Enterprise Self-Hosted plan. We will continue to provide security updates on the last available version for at least the next 12 months.

If you're currently using Kubernetes to deploy PostHog, you have three options.

The easiest option is to [migrate to PostHog Cloud](/docs/migrate/migrate-between-cloud-and-self-hosted). PostHog Cloud ensures you always have the latest features and often works out much cheaper too. For folks who had to self host to keep their data in the EU, we now offer [PostHog EU Cloud](/eu). 

You can also continue using PostHog as you are now. We'll still provide security updates for at least the next 12 months. Unfortunately we'll no longer be provide community support for Kubernetes deployments. If you're a paid customer using Kubernetes, we'll contact you shortly.

If you have smaller volumes, you can migrate to our [Docker deployment option](https://posthog.com/docs/self-host/open-source/deployment). It's much simpler to set up and manage.

There will no longer be numbered releases of PostHog. Instead, we'll build a Docker image for each commit that happens in our GitHub repo. Just like on PostHog Cloud, folks using our Docker deployment can benefit immediately from new features and bugfixes. They'll also be able to pin a version or roll back where necessary.

