---
title: Deploying to Qovery
sidebar: Docs
showTitle: true
---

## Why Qovery

Qovery provides a one-click production-ready PostHog deployment. 

Deploying PostHog with Qovery provides:
* A pre-configured PostHog instance for production.
* A free managed PostgreSQL.
* A free managed Redis.
* A free SSL
* Optional: custom domain

[Qovery](https://www.qovery.com) provides free Cloud hosting with databases, SSL, a global CDN, and automatic deploys with Git.

## Step-by-step PostHog deployment

### 1. Create a Qovery Account
Visit [the Qovery dashboard](https://start.qovery.com) to create an account if you don't already have one.

### 2. Create a project
* Click on the "create a project" button and give a name to your project. Eg. `ProductAnalytics`
* Click on "next".

### 3. Deploy PostHog
* Click on the "use a template" button.
* Select "PostHog".
* Select your Github or Gitlab repository where Qovery will save your configuration files (Qovery use Git as the source of truth).
* Click on "deploy".

Congrats 🔥 - Your PostHog is deployed and ready to be used 🎉