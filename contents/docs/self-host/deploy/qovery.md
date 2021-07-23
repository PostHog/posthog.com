---
title: Deploying to Qovery
sidebarTitle: Qovery
sidebar: Docs
showTitle: true
---

### Why Qovery

> This deployment method and documentation its are a community contribution. Thank you [@evoxmusic](https://github.com/evoxmusic)!

Qovery provides a one-click production-ready PostHog deployment. 

Deploying PostHog with Qovery provides:
* A pre-configured PostHog instance for production.
* A free managed PostgreSQL instance.
* A free managed Redis instance.
* Free SSL.
* Optional: custom domain

[Qovery](https://www.qovery.com) provides free Cloud hosting with databases, SSL, a global CDN, and automatic deploys with Git.

### Step-by-step PostHog deployment

#### 1. Create a Qovery Account
Visit [the Qovery dashboard](https://start.qovery.com) to create an account if you don't already have one.

#### 2. Create a project
* Click on the "Create a project" button and give a name to your project. e.g. `ProductAnalytics`
* Click "Next".

#### 3. Deploy PostHog
* Click on the "Use a template" button.
* Select "PostHog".
* Select your GitHub or Gitlab repository where Qovery will save your configuration files (Qovery use Git as the source of truth).
* Click on "deploy".

Congrats 🔥 - Your PostHog is deployed and ready to be used 🎉