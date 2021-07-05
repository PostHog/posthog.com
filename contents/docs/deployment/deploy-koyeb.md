---
title: Deploying to Koyeb
sidebar: Docs
showTitle: true
---

## Why Koyeb

Koyeb is a developer-friendly serverless platform to deploy apps globally. The platform lets you seamlessly run Docker containers, web apps, and APIs with git-based deployment, native autoscaling, free SSL, a global edge network, and built-in service mesh and discovery.

If you want to learn more about Koyeb, visit [this page](https://www.koyeb.com).


## Requirements

To successfully deploy PostHog on Koyeb, you need:

- A [Koyeb account](https://app.koyeb.com/auth/signup) to deploy and run PostHog
- The [Koyeb CLI](https://github.com/koyeb/koyeb-cli) installed to interact with Koyeb from the command line
- A running [PostgreSQL](https://www.postgresql.org/) database Koyeb can access

## Step By Step Installation


### Create a new Koyeb App to deploy PostHog

Start by creating a new Koyeb App we will deploy and run PostHog. In a terminal execute the following commands to create a new App and use it by default:

```bash
koyeb app create posthog
koyeb app switch posthog
```

### Deploy Redis

With the PostHog Koyeb App created, we now can deploy the Redis service required by PostHog. In a terminal, execute the following command to deploy the Redis instance:


```bash
koyeb service create redis --docker redis:6-alpine --ports 6379:tcp --routes ""
```

### Deploy PostHog

1. Generate a `SECRET_KEY` that is unique to your PostHog instance. 

 **⚠️ Note: Do not use our placeholder key! Read more about the importance of this key [here](/docs/configuring-posthog/securing-posthog).**

To create your `SECRET_KEY`, in a terminal execute:

```bash
openssl rand -hex 32 | koyeb secret create posthog-secret-key --value-from-stdin
```

The command below generates a new key and creates a new Koyeb Secret `posthog-secret` to securely store the key on Koyeb.

2. Create a Koyeb secret to securely store your PostgreSQL connection URL.

In the terminal execute the following command and replace the following values with your own:

- `<DB_USERNAME>`: PostgreSQL username
- `<DB_PASSWORD>`: PostgreSQL password
- `<DB_HOST>`: PostgreSQL host
- `<DB_PORT>`: PostgreSQL port
- `<DB_NAME>`: PostgreSQL database name
- 
```bash
$koyeb secret create posthog-db-url
✔ Enter your secret: postgres://<DB_USERNAME>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_NAME>
```


1. Deploy PostHog

All the previous steps completed, you can now Deploy PostHog. In the terminal execute:

```bash
koyeb service create posthog --docker posthog/posthog:latest --ports 8000:http --routes /:8000 --env REDIS_URL=redis://redis --env SECRET_KEY=@posthog-secret-key --env DATABASE_URL=@posthog-db-url --env IS_BEHIND_PROXY=1
```

Within a few minutes you will be able to access your PostHog instance available at `https://posthog-<YOUR_KOYEB_ORG_NAME>.koyeb.app/`

You can track the deployment logs running in a terminal:

```
koyeb service logs posthog
```