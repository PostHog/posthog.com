---
title: Deploying to Docker
sidebar: Docs
showTitle: true
---

## Why Docker

Through Docker, PostHog-ers can install specific versions of the app while also having it within a containerized environment.

We currently have [three types of images](https://hub.docker.com/r/posthog/posthog):

- `posthog/posthog:latest` - builds the most up-to-date release
- `posthog/posthog:release-[version number]` - builds a specific app version
- `posthog/posthog:preview` - builds a preview image

> We recommend using `posthog/posthog:latest`, so you have the latest features and security updates!

## Step By Step Installation

If you are deploying with Docker on AWS or Digital Ocean, you can check our individual specific tutorials instead of following this generic tutorial.

- [Docker Deployment on AWS](/docs/deployment/deploy-digital-ocean)
- [Docker Deployment on Digital Ocean]

1. Install [Docker Engine](https://docs.docker.com/engine/install/ubuntu)

2. [Install Docker Compose](https://docs.docker.com/compose/install/)

3. Run the following:

```bash
sudo apt-get install git
git clone https://github.com/posthog/posthog.git
cd posthog
docker-compose up -d
```

### Local Installation

If you're running locally:

- Make sure to **add** `DEBUG=1` as an environment variable - this will prevent an infinite loop of SSL redirects.
- PostHog assumes you want to use SSL and will redirect you to `https://...`. To avoid this, set `DISABLE_SECURE_SSL_REDIRECT=1`

- With these two recommendations you're new `docker-compose` statement will look like this:

```bash
docker-compose up -d -e DEBUG=1 DISABLE_SECURE_SSL_REDIRECT=1
```

### External Postgres Database

If you're running your Postgres database elsewhere (i.e. RDS, or a different server) you can edit the docker-compose file and do the following:

- set the `DATABASE_URL` property to the location of your database
- remove `services -> db` and `depends_on: - db`

### Docker one line preview

If you would like to run the software locally, you can use a Docker preview. Note that this is _not_ meant for production use.

Copy the following into your terminal:

```bash
docker run -t -i --rm --publish 8000:8000 -v postgres:/var/lib/postgresql posthog/posthog:preview
```

## Upgrading Docker

Upgrading Docker depends on how you've deployed Docker.

- If you deployed with docker-compose, run `docker-compose pull web`

If you've pinned a version, see [CHANGELOG.md](https://github.com/PostHog/posthog/blob/master/CHANGELOG.md) for the latest version.

### Upgrading from before 1.0.11?

PostHog is now using Redis with a worker to process events and other background tasks. If you're getting a "REDIS_URL is required" error or you see "Configuration Error" in the interface, you'll need to setup a redis server and run the worker process.

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

### Upgrading from before 3 March 2020?

If you last updated PostHog before 3 March 2020, AND you have a lot of events, there is one migration (0027) that might take a long time.

To avoid this, _before_ you migrate, run `python manage.py migrate_elementgroup` to pre-migrate elements across.

If you only have a few thousand events, you probably don't need to worry about this.
