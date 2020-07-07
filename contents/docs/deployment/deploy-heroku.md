---
title: Deploying to Heroku
sidebar: Docs
showTitle: true
---

## Why Heroku

Heroku is currently the **quickest** way to get a production PostHog environment up and running!

If you've never heard of Heroku or what it does, feel free to check out [this doc](https://www.heroku.com/about) that provides a quick gist of the product.

## Prerequisites

- A [Heroku](https://signup.heroku.com/) account set up and verified *(it's free, don't worry :))*.
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

By default, we install a `hobby-dev` Postgres and Redis add-on to the app - these can be found in the **Manage App** screen under *Installed add-ons*.

Since `hobby-dev` is the free tier, there may be significant lag if you visit the app after your site has not been visited for a while. To avoid this, you can upgrade up from the free tier.
