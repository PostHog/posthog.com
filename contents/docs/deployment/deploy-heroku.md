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

By default, we install a `hobby-dev` Postgres and Redis add-on to the app - these can be found in the **Manage App** screen under **Installed add-ons**.

### Upgrading From Free Tier

Since `hobby-dev` is the free tier, there may be significant lag if you visit the app after your site has not been visited for a while.

To avoid this, you can upgrade up from the free tier; this can be done through the same **Manage App** screen by clicking on the *Configure Add-ons* link by the **Installed add-ons** section. Once in the add-ons screen:

- To upgrade your Redis plan, **click on the button** to the right of both the `Heroku Postgres` and `Heroku Redis` add-on (it looks like an up and down symbol you'd see by an elevator). From here, click on `Modify Plan` and pick your desired one!
- To upgrade your Postgres plan, the process is a bit more complex. Check out this [doc](https://devcenter.heroku.com/articles/updating-heroku-postgres-databases) by Heroku that outlines the process step-by-step.

## Upgrading Heroku

```bash
git clone https://github.com/PostHog/posthog.git
cd posthog
git remote add heroku https://git.heroku.com/[your-heroku-posthog-app-name].git
git push -f heroku master
```

### Upgrading from before 1.0.11?

PostHog is now using Redis with a worker to process events and other background tasks. If you're getting a `REDIS_URL is required` error or seeing a `Configuration Error` in the interface, you'll need to setup a redis server and run the worker process.

A new Heroku Redis addon should be enabled automatically with the free plan. We recommend to switch to at least the first paid plan (premium-0) to enable [persistence](https://devcenter.heroku.com/articles/heroku-redis#persistence) and protect yourself against data loss. You will also see a new dyno type `worker`, which may or may not be deployed automatically. You will need to deploy at least one `worker` dyno for the background tasks to work.

### Upgrading from before 3 March 2020?

If you last updated PostHog before 3 March 2020, AND you have a lot of events, there is one migration (0027) that might take a long time.

To avoid this, _before_ you migrate, run `python manage.py migrate_elementgroup` to pre-migrate elements across.

If you only have a few thousand events, you probably don't need to worry about this.

## Reach Out!

If you need help on any of the above, feel free to create an issue on [our repo](https://github.com/PostHog/posthog), or [join our Slack](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ) where a member of our team can assist you! Chances are that if you have a problem or question, someone else does too - so please don't hesitate to create a new issue or ask us a question :)

Likewise, if you see a way to better our product or our documentation, feel free to checkout our [contributing docs](/docs/contributing); we would love for you to be a part of our open-source family!
