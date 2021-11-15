---
title: Self-Host PostHog
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---


## Deploy

Getting a shiny, running production environment of PostHog is probably one the first things you want to do!

Lucky for you, our platform is incredibly easy to use and affordable to host with any provider. Below, we have several step-by-step guides outlining how to set up hosting on a variety of different services.

### Deployment options

- [AWS](/docs/self-host/deploy/aws)
- [Azure](/docs/self-host/deploy/azure)
- [DigitalOcean](/docs/self-host/deploy/digital-ocean)
- [Google Cloud Platform](/docs/self-host/deploy/gcp)
- [Other platforms](/docs/self-host/deploy/other)

If you don't know what to pick [DigitalOcean](/docs/self-host/deploy/digital-ocean) is likely the simplest.

### Choosing the right deployment 

| Deployment | Event Capacity | Ease of setup | Scalable |
|------------|----------------|---------------|----------|
| [Magic Curl](https://github.com/posthog/deployment#if-you-want-a-quick-install-on-an-ubuntu-vm) | < 1M Events per Month | Easy | Vertically |
| [Helm Chart](/docs/self-host/deploy/other) | > 1M per Month | Medium to Hard | Horizontally |
| [Helm Chart + External Services](/docs/self-host/configure/external-providers) | > 1B per Month | Medium to Hard | Horizontally|
| [Cloud](https://app.posthog.com) | 0 to 50B Events per Month | Easy | Horizontally |

>Definitions:
> - **Vertically scalable** means that you will only be able to scale your instance up on one compute node. Once you grow beyond the size of the largest available instance type that you have access to you will no longer be able to scale this instance. 
> - **Horizontally scalable** means that you can scale the PostHog installation out both vertically (larger instances) and horizontally with *more* instances. This means that in terms of actual scalability you are not constrained by anything but cost of resources. 

## Configure

There are various ways to configure and personalize your PostHog instance to better suit your needs. In this section you will find all the information you need about settings and options you can configure to get what you need out of PostHog.

- [Environment variables](/docs/self-host/configure/environment-variables)
- [Upgrading PostHog](/docs/self-host/configure/upgrading-posthog)
- [Securing PostHog](/docs/self-host/configure/securing-posthog)
- [Running behind proxy](/docs/self-host/configure/running-behind-proxy)
- [Email configuration](/docs/self-host/configure/email)
- [Using external providers](/docs/self-host/configure/external-providers)

<BorderWrapper>
    <Quote
        imageSource="/images/customers/joe.png"
        size="md"
        name="Joe Saunderson"
        title="Software Engineer, Mention Me"
        quote={`“We self-hosted PostHog because we needed to keep everything on our infrastructure. Our clients’ privacy is very important to us and we have obligations to store their data safely.”`}
    />
</BorderWrapper>