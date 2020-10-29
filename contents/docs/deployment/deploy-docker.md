---
title: Deploying with Docker
sidebar: Docs
showTitle: true
---

## Why Docker

Through Docker, PostHogers can install specific versions of the app while also having it within a containerized environment.

We currently have [three types of images](https://hub.docker.com/r/posthog/posthog):

- `posthog/posthog:latest` - builds the most up-to-date release
- `posthog/posthog:release-[version number]` - builds a specific app version
- `posthog/posthog:preview` - builds a preview image

> We recommend using `posthog/posthog:latest`, so you have the latest features and security updates!

## Step By Step Installation

If you are deploying with Docker on AWS or Digital Ocean, you can check our individual specific tutorials instead of following this generic tutorial:

- [Docker Deployment on AWS](/docs/deployment/deploy-aws)
- [Docker Deployment on Digital Ocean](/docs/deployment/deploy-digital-ocean)
<br>
<br>

#### Generic Docker Installation Tutorial


1. Install [Docker Engine](https://docs.docker.com/engine/install/ubuntu)
1. Then install [Docker Compose](https://docs.docker.com/compose/install/)
1. [Setup Docker to run without root priviledges](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) (optional but strongly recommended)
1. Install `git`:
```bash
sudo apt-get update && sudo apt-get install git
```
1. To clone the PostHog repository and enter the new directory, run: 
```bash
git clone https://github.com/posthog/posthog.git && cd posthog
```
1. Generate a `SECRET_KEY` that is unique to your instance. 

    **⚠️ Note: Do not use our placeholder key! Read more about the importance of this key [here](/docs/configuring-posthog/securing-posthog).**

    First, run: `openssl rand -hex 32`. This will generate a new key for you. You'll need this in the next step.

    Then, open the `docker-compose.yml` file with the command: `nano docker-compose.yml`

    Lastly, substitute `"<randomly generated secret key>"` for the key you got from the key generation command.

    This means the `SECRET_KEY: "<randomly generated secret key>"` line will end up looking something like this (with your key, of course):

    ```
    SECRET_KEY: "cd8a182315defa70d995452d9258908ef502da512f52c20eeaa7951d0bb96e75"
    ```

1. Then, to run PostHog, do:
```bash
docker-compose up -d
```
1. You're good to go! PostHog should be accessible on the domain you set up or the IP of your instance.

<blockquote class='warning-note'>

**Important:** If you do not have a TLS/SSL certificate set up for your domain/IP, accessing the address of your PostHog instance _will not work_. To get around this, you need to edit the `docker-compose.yml` file manually and add the environment variables   `DISABLE_SECURE_SSL_REDIRECT: 'true'` and `SECURE_COOKIES: 'false'` under `services > web > environment`. This is a manual process because PostHog should not be run without a certificate (i.e. over HTTP). 

Doing this and restarting the service will allow you to access PostHog over HTTP, but might require configuring browser settings to allow HTTP traffic depending on what browser you use. 

</blockquote>

### Local Installation

If you're running locally, use our `docker-compose.dev.yml` file:

```bash
docker-compose -f docker-compose.dev.yml up
```

### External Postgres Database

If you're running your Postgres database elsewhere (i.e. RDS, or a different server) you can edit the docker-compose file and do the following:

- Set the `DATABASE_URL` property to the location of your database
- Remove `services -> db` and `depends_on: - db`

### Docker one line preview

If you would like to run the software locally, you can use a Docker preview. Note that this is **not** meant for production use.

Paste the following snippet into your terminal:

```bash
docker run -t -i --rm --publish 8000:8000 -v postgres:/var/lib/postgresql posthog/posthog:preview
```

## Upgrading PostHog with Docker

Upgrading PostHog with Docker depends on how you've deployed with Docker.

> **Note:** You may need to store your secret key and update the `docker-compose.yml` file after upgrading. [Here's](/docs/configuring-posthog/securing-posthog#secret-key-with-docker-compose) how to setup your secret key with Docker Compose.

- For docker-compose, run `docker-compose pull web`

If you've pinned a version, see [CHANGELOG.md](https://github.com/PostHog/posthog/blob/master/CHANGELOG.md) for the latest version.

### Upgrading from before 1.0.11?

PostHog is now using Redis with a worker to process events and other background tasks. If you're getting a `REDIS_URL is required` error or you see `Configuration Error` in the interface, you'll need to setup a Redis server and run the worker process.

If you're using a docker-compose file, either pull the latest version from `master`, or add the following to your docker-compose file:

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

If you last updated PostHog before 3 March 2020 **AND** you have a lot of events, there is one migration (0027) that might take a long time.

To avoid this, _before_ you migrate, run `python manage.py migrate_elementgroup` to pre-migrate elements across.

If you only have a few thousand events, you probably don't need to worry about this.
