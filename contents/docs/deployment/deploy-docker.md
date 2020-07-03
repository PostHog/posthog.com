---
title: Deploying to Docker
sidebar: Docs
showTitle: true
---

## Why Docker

Through Docker, PostHog users can install specific versions of the app while also having it within a containerized environment.

We currently have [three types of images](https://hub.docker.com/r/posthog/posthog):

- `posthog/posthog:latest` - builds the latest release straight out of master
- `posthog/posthog:release-[version number]` - builds a specific app version
- `posthog/posthog:preview` - builds a preview image

> We recommend using `posthog/posthog:latest`, so you have the latest features and security updates!

## Step By Step Installation

1. [Install Docker](https://docs.docker.com/installation/ubuntulinux/)
2. [Install Docker Compose](https://docs.docker.com/compose/install/)
3. Run the following:

```bash
sudo apt-get install git
git clone https://github.com/posthog/posthog.git
cd posthog
docker-compose up -d
```

If you're running locally:

1. Make sure to add `DEBUG: 1` as an environment variable, otherwise you'll get stuck in an infinite loop of SSL redirects.
1. PostHog assumes you want to use SSL and will redirect you to `https://...`. To avoid this, set `DISABLE_SECURE_SSL_REDIRECT=1`

If you run your Postgres database somewhere else (like RDS, or just a different server) you can set the DATABASE_URL property, and remove `services -> db` and `depends_on: - db` from your docker-compose file.

### Docker one line preview

If you would like to run the software locally, you can use a Docker preview. This is _not_ meant for production use.

Copy the following into your terminal:

```bash
docker run -t -i --rm --publish 8000:8000 -v postgres:/var/lib/postgresql posthog/posthog:preview
