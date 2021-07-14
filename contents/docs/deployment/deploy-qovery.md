---
title: Deploying to Qovery
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
* Click on **Create project** and give a name to your project.
* Click on **Next**.

![Create a project](https://hub.qovery.com/img/heroku/heroku-2.png)

#### 3. Create a new environment
* Click on **Create environment** and give a name (e.g. staging, production).

![Create a new environment](https://hub.qovery.com/img/heroku/heroku-3.png)

### 4. Add your PostHog app
* Click on **Create an application**, give a name and select your GitHub or GitLab repository where your PostHog app is located.
* Define the main branch name and the root application path.
* Click on **Create**.

![Add your application](https://hub.qovery.com/img/rust/rust.png)

After the application is created:

* Navigate to your application **Settings**
* Select **Port**
* Add port used by your PostHog application

#### 5. Deploy a database
Create and deploy a new database PostgreSQL database

To learn how to do it, you can [follow this guide](https://hub.qovery.com/guides/getting-started/create-a-database)

#### 6. Setup your configuration
To use PostgreSQL provided by Qovery, you can use the built-in secrets and environment variables. You can read more about environment variables and secrets in our [configuration section](https://hub.qovery.com/docs/using-qovery/configuration/environment-variable/).

#### 7. Deploy the app on Qovery
All you have to do now is to navigate to your application and click on **Deploy**

![Deploy the app](https://hub.qovery.com/img/heroku/heroku-1.png)

That's it. Watch the status and wait till the app is deployed.

To open the application in your browser, click on **Action** and **Open** in your application overview

### Support
Chat with Qovery developers on [Discord](https://discord.qovery.com) if you need help.
