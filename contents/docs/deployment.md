---
title: Deploying PostHog
sidebar: Docs
showTitle: true
---


Getting a shiny, running production environment of PostHog is probably one the first things you want to do!

Lucky for you, our platform is incredibly easy to use and affordable to host with any provider. Below, we have several step-by-step guides outlining how to set up hosting on a variety of different services.

<span class='table-no-borders'>

||||
| --- | --- | --- | --- |
| [![](../../src/images/deploy-docker.svg)](/docs/deployment/deploy-docker) | [![](../../src/images/deploy-kubernetes.svg)](/docs/deployment/deploy-kubernetes) | [![](../../src/images/deploy-aws.svg)](/docs/deployment/deploy-aws) | [![](../../src/images/deploy-source.svg)](/docs/deployment/deploy-source) |

</span>


### **Deployment Options (ClickHouse):**

If (i) you're looking to track more than 1k users/month, or (ii) you're planning on doing lots of queries, or (iii) you may in future want to upgrade an existing instance to PostHog Scale (our paid product for growth stage or enterprise users), you're better off using PostHog backed by ClickHouse. If you are not comfortable with deploying Helm charts we recommend either using Postgres (see below) or [PostHog Cloud](/pricing)

- [Deploy using Helm chart](https://github.com/PostHog/charts-clickhouse)

### **Deployment Options (Postgres):**

All these options are backed by Postgres which is great up to about 1k tracked monthly users.

We recommend:

- [Deploying to AWS](/docs/deployment/deploy-aws)
- [Deploying to GCS](/docs/deployment/deploy-gcs)
- [Deploying to Digital Ocean](/docs/deployment/deploy-digital-ocean)

Other options include: 

- [Deploying to Heroku](/docs/deployment/deploy-heroku)
- [Deploying to Microsoft Azure](/docs/deployment/deploy-azure)
- [Deploying to Qovery](/docs/deployment/deploy-qovery)
- [Deploying with Docker](/docs/deployment/deploy-docker)
- [Deploying with Kubernetes/Helm Chart](/docs/deployment/deploy-kubernetes)
- [Deploying from Source](/docs/deployment/deploy-source)


### **You May Also Be Interested In:**

- [Environment Variables](/docs/configuring-posthog/environment-variables)
- [Upgrading PostHog](/docs/configuring-posthog/upgrading-posthog)
- [Scaling PostHog](/docs/configuring-posthog/scaling-posthog)
- [Securing PostHog](/docs/configuring-posthog/securing-posthog)
- [Running Behind Proxy](/docs/configuring-posthog/running-behind-proxy)
- [Configuring Email](/docs/configuring-posthog/email)
- [Hosting Costs](/docs/deployment/hosting-costs)
