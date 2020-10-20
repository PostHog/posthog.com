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

### Configure docker-compose.yml

You can also go through production-ready `docker-compose.yml` setup using our `docker-compose-config.py` configurator. It will guide you through relevant settings and explain them along the way. How to use it:

1. Install PostHog's Python dependencies.
```bash
python3 -m pip install -r requirements.txt
```
1. Run the configurator:
```bash
python3 ./docker-compose-config.py
```
1. Follow instructions and make changes where you see fit – or don't, and stick to default values.
1. Enjoy PostHog with the new configuration:
```bash
docker-compose up -d
```
or
```bash
docker-compose restart -d
```

### Local Installation

If you're running locally:

- Make sure to **add** `DEBUG=1` as an environment variable - this will prevent an infinite loop of SSL redirects.
- PostHog assumes you want to use SSL and will redirect you to `https://...`. To avoid this, set `DISABLE_SECURE_SSL_REDIRECT=1`

- With these two recommendations your new `docker-compose` statement will look like this:

```bash
docker-compose up -d -e DEBUG=1 DISABLE_SECURE_SSL_REDIRECT=1
```

### External Postgres Database

If you're running your Postgres database elsewhere (i.e. RDS, or a different server) you can edit the docker-compose file and do the following:

- Set the `DATABASE_URL` property to the location of your database
- Remove `services -> db` and `depends_on: - db`

### Docker One-Line Preview

If you would like to run the software locally, you can use a Docker preview. Note that this is **not** meant for production use.

Paste the following snippet into your terminal:

```bash
docker run -t -i --rm --publish 8000:8000 -v postgres:/var/lib/postgresql posthog/posthog:preview
```

## Upgrading PostHog with Docker

Upgrading PostHog with Docker depends on how you've deployed with Docker.

**Note:** You may need to store your secret key and update the `docker-compose.yml` file after upgrading. [Here's](/docs/configuring-posthog/securing-posthog#secret-key-with-docker-compose) how to setup your secret key with Docker Compose.

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
