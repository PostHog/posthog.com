---
title: Deploying to Heroku
sidebar: Docs
showTitle: true
---

## Why Heroku

Heroku is currently the **quickest** way to get a production PostHog environment up and running!

If you've never heard of Heroku or what it does, feel free to check out [this doc](https://www.heroku.com/about) that provides a quick gist of the product.

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

    - If you want to review add ons and other details of the instance, simply click the **Manage App** button or access the instance from your **Dashboard** *(click on the 9 dots by your profile on the top right)*.

    - Within the **Manage App** screen, simply click **Open App** on the top right to start your PostHog environment.

## Add-Ons

By default, we install a `hobby-dev` Postgres and Redis add-on to the app - these can be found in the **Manage App** screen under **Installed add-ons**.

### Upgrading From Free Tier Add-ons (Recommended)

Heroku provides **10k** rows for free on **Postgres**, which you will hit fairly quickly - even on smaller websites.

- To upgrade your Postgres plan, check out this [doc](https://devcenter.heroku.com/articles/updating-heroku-postgres-databases) by Heroku that outlines the process step-by-step.

Similarly, you might also want to **upgrade your Redis** instance if you have a larger PostHog deployment:

1. navigate back to the **Manage App** screen.

1. click on the *Configure Add-ons* link by the **Installed add-ons** section.

1. click on the button to the right of both the `Heroku Postgres` and `Heroku Redis` add-on.
    - _it looks like an up and down symbol you'd see by an elevator._

1. click on `Modify Plan` and pick your desired one!

## Upgrading Heroku

```bash
git clone https://github.com/PostHog/posthog.git
cd posthog
git remote add heroku https://git.heroku.com/[your-heroku-posthog-app-name].git
git push -f heroku master
```

### Upgrading Dyno Type

By default, Heroku uses a hobby-dev dyno, which sleeps if there hasn't been any activity for **30 minutes**. If PostHog is constantly used, eventually you'll exceed your [free hours](https://devcenter.heroku.com/articles/free-dyno-hours) and Heroku will put your app to sleep.

To avoid this, we strongly recommend upgrading to at least a "Hobby" dyno:

1. navigate back to the **Manage App** screen.

1. click on the *Configure Dynos* link by the **Dyno Formation** section.

1. click on the **Change Dyno Type** button.

1. choose your desired tier!

### Upgrading from before 1.0.11?

PostHog is now using Redis with a worker to process events and other background tasks. If you're getting a `REDIS_URL is required` error or seeing a `Configuration Error` in the interface, you'll need to setup a redis server and run the worker process.

A new Heroku Redis addon should be enabled automatically with the free plan. We recommend to switch to at least the first paid plan (premium-0) to enable [persistence](https://devcenter.heroku.com/articles/heroku-redis#persistence) and protect yourself against data loss. You will also see a new dyno type `worker`, which may or may not be deployed automatically. You will need to deploy at least one `worker` dyno for the background tasks to work.

### Upgrading from before 3 March 2020?

If you last updated PostHog before 3 March 2020, AND you have a lot of events, there is one migration (0027) that might take a long time.

To avoid this, _before_ you migrate, run `python manage.py migrate_elementgroup` to pre-migrate elements across.

If you only have a few thousand events, you probably don't need to worry about this.
