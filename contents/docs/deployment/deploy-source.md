---
title: Deploying to Source
sidebar: Docs
showTitle: true
---

## Why Source Install

To install from source, you need to build the source code and take care of the dependencies yourself. Likewise, you also need to be aware of all the features of the package so that you can build it accordingly.

Although it may be time consuming and difficult to manage, installing from source has a few advantages:

- Always stay updated, whether it be a security patch or a new feature.
- Trim down the features while installing so as to suit your needs.
- Add features which may not be provided in the binary.
- Install it in a location you wish.

In short, installing from source gives you heavy customization but**takes a lot of effort**; on the other hand, installation from binary is easier but you can't **customize** as you wish.

If there is no desire to customize your source, we strongly recommend other deployment options like Heroku, Docker, etc.

## Prerequisites

- [Python] >= v3.7 and pip installed
- Have [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) installed
- have a running Postgres and Redis server

## Step By Step Installation

1. Run the following:

    ```bash
    git clone https://github.com/posthog/posthog.git
    yarn build
    pip install -r requirements.txt
    export DATABASE_URL=''
    export REDIS_URL=''
    python manage.py runserver
    python manage.py collectstatic
    ```

2. To start the server and worker, run:

    ```bash
    ./bin/docker-server & ./bin/docker-worker
    ```

    > We reccomend using something like [Supervisor](https://github.com/Supervisor/supervisor) to keep this command running.
