---
title: Deploying to Source
sidebar: Docs
showTitle: true
---

## Why Source Install

To install from source, you need to build the source code and take care of the dependencies yourself. Likewise, you also need to be aware of all the features of the package so that you can build it accordingly.

Although it may be time consuming and difficult to manage, installing from source has a few advantages:

- Just like our other deployments, always stay updated, whether it be a security patch or a new feature!
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

## Reach Out!

If you need help on any of the above, feel free to create an issue on [our repo](https://github.com/PostHog/posthog), or [join our Slack](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ) where a member of our team can assist you! Chances are that if you have a problem or question, someone else does too - so please don't hesitate to create a new issue or ask us a question :)

Likewise, if you see a way to better our product or our documentation, feel free to checkout our [contributing docs](/docs/contributing); we would love for you to be a part of our open-source family!
