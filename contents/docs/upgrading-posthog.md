---
title: Upgrading PostHog
sidebar: Docs
showTitle: true
---

We want to make sure upgrading PostHog is as smooth as possible. We use Django's standard migrations to make sure any database migrations are atomic, easy to roll back and generally safe to run.

Because some data migrations require touching the Events table which can get very large for some instances, some migrations are a little more involved. We will explicitly mention this in the change log and on this page. We aim to minimise these types of migrations as much as possible, and their frequency will decrease over time. Every time, we will make sure there is a management command you can run in parallel, so you can minimise the amount of downtime to seconds. 

If you need help, feel free to create an issue, or [join our Slack](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ).

## Heroku

The easiest way to upgrade Heroku is.

- `git clone https://github.com/PostHog/posthog.git`
- `cd posthog`
- `git remote add heroku https://git.heroku.com/[your-heroku-posthog-app-name].git`
- `git push -f heroku master`

## Docker

Upgrading Docker depends on how you've deployed Docker.

- For docker-compose, run `docker-compose pull web`

If you've pinned a version, see [CHANGELOG.md](https://github.com/PostHog/posthog/blob/master/CHANGELOG.md) for the latest version.

## Upgrading from before 1.0.11?

PostHog is now using Redis with a worker to process events and other background tasks. If you're getting a "REDIS_URL is required" error or you see "Configuration Error" in the interface, you'll need to setup a redis server and run the worker process. 

For Heroku deployments, a new Heroku Redis addon should be enabled automatically with the free plan. We recommend to switch to at least the first paid plan (premium-0) to enable [persistence](https://devcenter.heroku.com/articles/heroku-redis#persistence) and protect yourself against data loss. You will also see a new dyno type `worker`, which may or may not be deployed automatically. You will need to deploy at least one `worker` dyno for the background tasks to work.

If you're using a docker-compose file, either pull the latest version from master, or add the following to your docker-compose file:

```yaml
  redis:
    image: "redis:alpine"
    container_name: posthog_redis
  web:
    ...
    environment:
      ...
      REDIS_URL: "redis://redis:6379/"
    depends_on:
      - db
      - redis
    links:
      - db:db
      - redis:redis
```


## Upgrading from before 3 March 2020?

If you last updated PostHog before 3 March 2020, AND you have a lot of events, there is one migration (0027) that might take a long time.

To avoid this, _before_ you migrate, run `python manage.py migrate_elementgroup` to pre-migrate elements across.

If you only have a few thousand events, you probably don't need to worry about this.
