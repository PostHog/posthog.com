---
title: Deploying from Source
sidebarTitle: From Source
sidebar: Docs
showTitle: true
---

## Why Source Install

To install from source, you need to build the source code and take care of the dependencies yourself. Likewise, you also need to be aware of all the features of the package so that you can build it accordingly.

Although it may be time consuming and difficult to manage, installing from source has a few advantages:

- Just like our other deployments, always stay updated, whether it be a security patch or a new feature!
- Add features which may not be provided in the binary.
- Install it in a location you wish.

In short, installing from source gives you access to enhanced customization but **takes a lot of effort**. On the other hand, installation from a a pre-pacakged binary (e.g. Heroku One-Click Install or Docker Image) is easier but you can't **customize** as you wish.

If there is no desire to customize your source, we strongly recommend other deployment options like [Heroku](/docs/self-host/deploy/heroku), [Docker](/docs/self-host/deploy/docker), etc.

## Prerequisites

- [Python](https://www.python.org/downloads/) >= v3.7 and pip installed
- Have [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) installed
- Have a running [PostgreSQL](https://www.postgresql.org/) server
- Have a running [Redis](https://redis.io/) server

## Step By Step Installation

1. Generate a unique `SECRET_KEY`. This is **essential** for security and PostHog will not work without it. 

    ```bash
    openssl rand -hex 32
    ```

    The command above will generate a key. Copy and make a note of it. You should keep this key **secret**, as the name implies.
    We will also be needing it in the next step.

2. Run the following:

    ```bash
    git clone https://github.com/posthog/posthog.git 
    cd posthog && yarn build
    pip install -r requirements.txt
    export DATABASE_URL='<Your Database URL>'
    export REDIS_URL='<Your Redis URL'
    export SECRET_KEY='<Your secret key>'
    python manage.py runserver
    python manage.py collectstatic
    ```

3. To start the server and worker, run:

    ```bash
    ./bin/docker-server & ./bin/docker-worker
    ```

<br />

> We recommend using something like [Supervisor](https://github.com/Supervisor/supervisor) to keep this command running. This is important because once you exit the current shell the process will stop. This happens for example when you terminate an SSH session. As such, you need to run these commands in detached mode, which Supervisor allows you to do. 
