---
title: Deploying with Docker
sidebar: Docs
showTitle: true
---

## Why Docker

Through Docker, PostHoggers can install specific versions of the app while also having it within a containerized environment.

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
1. [Setup Docker to run without root privileges](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) (optional but strongly recommended)
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

### Configure docker-compose.yml

You can also go through production-ready `docker-compose.yml` setup using our `docker-compose-config.py` configurator. It will guide you through relevant settings and explain them along the way. Here's how to use it:

1. Enter PostHog's directory with `cd` like so:
```bash
cd ~/Developer/posthog/
```
1. Run the configurator:
```bash
./docker-compose-config.sh
```
1. Follow the instructions and make changes where you see fit – or don't, sticking to default values.
1. Enjoy PostHog with the new configuration:
```bash
docker-compose up -d
```
or
```bash
docker-compose restart -d
```

### Local Installation

If you're running locally, use our `docker-compose.dev.yml` file:

```bash
docker-compose -f docker-compose.dev.yml up
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

> **Note:** You may need to store your secret key and update the `docker-compose.yml` file after upgrading. [Here's](/docs/configuring-posthog/securing-posthog#secret-key-with-docker-compose) how to setup your secret key with Docker Compose.

- For docker-compose, run `docker-compose pull web`

If you've pinned a version, see [CHANGELOG.md](https://github.com/PostHog/posthog/blob/master/CHANGELOG.md) for the latest version.


## Running PostHog Behind a Proxy or Load Balancer

If you're running PostHog on Docker behind a proxy or load balancer, you should use the `docker-compose-config.py` script to expose the appropriate port in `docker-compose.yml`. By default port 80 is exposed, causing a port conflict between the PostHog Docker container and the proxy.

For more information, visit our [dedicated page for running PostHog behind a proxy](/docs/configuring-posthog/running-behind-proxy).
