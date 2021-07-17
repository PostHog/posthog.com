---
title: Deploying to Heroku
sidebarTitle: Heroku
sidebar: Docs
showTitle: true
---

## Why Heroku

Heroku is currently the **quickest** way to get a production PostHog environment up and running!

If you've never heard of Heroku or what it does, feel free to check out [this page](https://www.heroku.com/about) that provides a quick gist of the product.

## Prerequisites

- A [Heroku](https://signup.heroku.com/) account set up and verified *(it's free, don't worry :D)*.
    > _Although the deployment is free, ensure that your **credit card information** is entered in your profile. If not, the initial build will fail and prompt you to do so._

## Step By Step Installation

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/posthog/posthog)

1. Click on the button above to go to the app creation screen.

2. Enter the desired name of your PostHog app and hit **Deploy App** on the bottom of the screen.

3. Wait.

    > _Note: This may take a few minutes, so resist the urge to refresh the page or restart the process_

4. Once completed, you will see two options on the bottom of the screen: **Manage App** & **View App**. To go to PostHog, simply click the **View App** button!

    - If you want to review add owns and other details of the instance, simply click the **Manage App** button or access the instance from your **Dashboard** *(click on the 9 dots by your profile on the top right)*.

    - Within the **Manage App** screen, simply click **Open App** on the top right to start your PostHog environment.

### Secret Key

A unique `SECRET_KEY` is essential for the security of your PostHog instance. When using Heroku 1-click deploy, Heroku automatically generates and sets this for you.

However, if you want to set your own key, you can do so as follows:

1. Generate the key and copy it:

    ```bash
    openssl rand -hex 32
    ```

2. Set the key on your instance, by running the following command with your key and Heroku app name:

    ```bash
    heroku config:set SECRET_KEY="<your secret key>" --app <your app name>
    ```




## Add-Ons

By default, we install a `hobby-dev` Postgres and Redis add-on to the app - these can be found in the **Manage App** screen under **Installed add-ons**.

### Upgrading From Free Tier Add-ons (Recommended)

Heroku provides **10k** rows for free on **Postgres**, which you will hit fairly quickly - even on smaller websites.

- To upgrade your Postgres plan, check out this [doc](https://devcenter.heroku.com/articles/updating-heroku-postgres-databases) by Heroku that outlines the process step-by-step.

Similarly, you might also want to **upgrade your Redis** instance if you have a larger PostHog deployment:

1. Navigate back to the **Manage App** screen.

1. Click on the *Configure Add-ons* link by the **Installed add-ons** section.

1. Click on the button to the right of both the `Heroku Postgres` and `Heroku Redis` add-on.
    - _it looks like an up and down symbol you'd see by an elevator._

1. Click on `Modify Plan` and pick your desired one!

## Upgrading PostHog on Heroku

```bash
git clone https://github.com/PostHog/posthog.git
cd posthog
git remote add heroku https://git.heroku.com/[your-heroku-posthog-app-name].git
git push -f heroku master
```

### Upgrading Dyno Type

By default, Heroku uses a hobby-dev dyno, which sleeps if there hasn't been any activity for **30 minutes**. If PostHog is constantly used, eventually you'll exceed your [free hours](https://devcenter.heroku.com/articles/free-dyno-hours) and Heroku will put your app to sleep.

To avoid this, we strongly recommend upgrading to at least a "Hobby" dyno:

1. Navigate back to the **Manage App** screen.

1. Click on the *Configure Dynos* link by the **Dyno Formation** section.

1. Click on the **Change Dyno Type** button.

1. Choose your desired tier!

## Running PostHog Behind a Proxy or Load Balancer

If you're running PostHog behind a proxy or load balancer, you need to set the `IS_BEHIND_PROXY` environment variable to `True`. Depending on your setup, you might also need to set the `ALLOWED_HOSTS` [environment variable](/docs/self-host/configure/environment-variables).


For more information, visit our [dedicated page for running PostHog behind a proxy](/docs/self-host/configure/running-behind-proxy).

## Scaling Heroku Redis

PostHog currently supports Redis v5, while Heroku's Redis add-on now defaults to Redis v6.

This causes a problem when scaling your Redis addon beyond `hobby-dev`, leading PostHog to fail.

As such, if you need to scale Heroku Redis on your PostHog instance, you should do the following:

1. Create a new Redis add-on on version 5, using the desired premium plan (e.g. `premium-0`):
    
    ```shell
    heroku addons:create heroku-redis:premium-0 --version 5 -a your-app-name
    ```

1. Once it has been provisioned, change its max memory policy to `allkeys-lru`, using the add-on name provided to you at the previous step:
   
    ```shell
    heroku redis:maxmemory new-redis-addon-name --policy allkeys-lru -a your-app-name
    ```

1. Promote the add-on to your default Redis instance:
   
    ```shell
    heroku redis:promote new-redis-addon-name -a your-app-name
    ```

1. Delete the old Redis add-on:

    ```shell
    heroku addons:destroy old-redis-addon-name -a your-app-name
    ```

1. That's it! You will only need to do this once, and can now scale your Redis add-on normally if you need to do so again e.g. from `premium-0` to `premium-2`.

## Error connecting to PostgreSQL in the worker

In case the `worker` or `pluginworker` dyno gives you the following error:

```
app[worker.1]: [MAIN] 💥 Launchpad failure! error: no pg_hba.conf entry for host "XXXX", user "XXXX", database "XXXX", SSL off
```

You must make sure the env `DEPLOYMENT` is set to `"Heroku"`. This is [automatically set](https://github.com/PostHog/posthog/blob/4ad6a28e60b9d3c346b3da0a5ecc9af59b7993bf/app.json#L71) if you're using our `app.json`, but might be missing if you have a custom deployment.

Heroku Postgres has a quirk where SSL is required but with slightly unusual and different handling (no hostname verification due to the Heroku's dynamic add-on provisioning mechanism). This environment variable lets PostHog know to employ that handling.
