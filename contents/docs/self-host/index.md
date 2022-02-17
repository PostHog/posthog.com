---
title: Self-host PostHog
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---


## Deploy

Getting a shiny, running production environment of PostHog is probably one the first things you want to do!

Lucky for you, our platform is incredibly easy to use and affordable to host with any provider. Below, we have several step-by-step guides outlining how to set up hosting on a variety of different services.

> Note: when choosing to self-host you'll be managing the service yourself, which means running regular upgrades, scaling as needed etc. If you're looking for a more hands-off experience we recommend checking out [PostHog Cloud](/docs/cloud).

### Deployment options

- [Hobby](/docs/self-host/deploy/hobby) - for testing or very small hobby projects
- [AWS](/docs/self-host/deploy/aws)
- [DigitalOcean](/docs/self-host/deploy/digital-ocean) - likely the simplest option for production use cases
- [Google Cloud Platform](/docs/self-host/deploy/gcp)

The following options are in Beta
- [Azure](/docs/self-host/deploy/azure)
- [Other platforms](/docs/self-host/deploy/other)

## Configure

There are various ways to configure and personalize your PostHog instance to better suit your needs. In this section you will find all the information you need about settings and options you can configure to get what you need out of PostHog.

- [Environment variables](/docs/self-host/configure/environment-variables)
- [Upgrading PostHog](/docs/self-host/configure/upgrading-posthog)
- [Securing PostHog](/docs/self-host/configure/securing-posthog)
- [Running behind proxy](/docs/self-host/configure/running-behind-proxy)
- [Email configuration](/docs/self-host/configure/email)

<BorderWrapper>
    <Quote
        imageSource="/images/customers/joe.png"
        size="md"
        name="Joe Saunderson"
        title="Software Engineer, Mention Me"
        quote={`“We self-hosted PostHog because we needed to keep everything on our infrastructure. Our clients’ privacy is very important to us and we have obligations to store their data safely.”`}
    />
</BorderWrapper>
