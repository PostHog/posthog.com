---
title: Developing locally
sidebar: Docs
showTitle: true
---

> ❗️ This guide is intended only for development of PostHog itself. If you're looking to deploy PostHog
> for your product analytics needs, go to [Self-host PostHog](/docs/self-host).

## What does PostHog look like on the inside?

Before jumping into setup, let's dissect a PostHog.

The app itself is made up of 4 components that run simultaneously:

-   Django server
-   Celery worker (handles execution of background tasks)
-   Node.js plugin server (handles event ingestion and apps/plugins)
-   React frontend built with Node.js

These components rely on a few external services:

-   ClickHouse – for storing big data (events, persons – analytics queries)
-   Kafka – for queuing events for ingestion
-   MinIO – for storing files (session recordings, file exports)
-   PostgreSQL – for storing ordinary data (users, projects, saved insights)
-   Redis – for caching and inter-service communication
-   Zookeeper – for coordinating Kafka and ClickHouse clusters

When spinning up an instance of PostHog for development, we recommend the following configuration:

-   the external services run in Docker over `docker compose`
-   PostHog itself runs on the host (your system)

This is what we'll be using in the guide below.

> It is also technically possible to run PostHog in Docker completely, but syncing changes is then much slower, and for development you need PostHog dependencies installed on the host anyway (such as formatting or typechecking tools).
> The other way around – everything on the host, is not practical due to significant complexities involved in instantiating Kafka or ClickHouse from scratch.

The instructions here assume you're running macOS.

For Linux, adjust the steps as needed (e.g. use `apt` or `pacman` in place of `brew`).

Windows isn't supported natively. But, Windows users can run a Linux virtual machine. The latest Ubuntu Desktop is recommended. (Ubuntu Server is not recommended as debugging the frontend will require a browser that can access localhost.)

In case some steps here have fallen out of date, please tell us about it – feel free to [submit a patch](https://github.com/PostHog/posthog.com/tree/master/contents/docs/contribute/developing-locally.mdx)!

## macOS Prerequisites

1. Install Xcode Command Line Tools if you haven't already: `xcode-select --install`.

2. Install the package manager Homebrew by following the [instructions here](https://brew.sh/).

<blockquote class="warning-note">
    After installation, make sure to follow the instructions printed in your terminal to add Homebrew to your{' '}
    <code>$PATH</code>. Otherwise the command line will not know about packages installed with <code>brew</code>.
</blockquote>

3. Install [Docker Desktop](https://www.docker.com/products/docker-desktop) and in its settings give Docker **at least 4 GB of RAM** (or 6 GB if you can afford it) and at least 4 CPU cores.

4. Append line `127.0.0.1 kafka clickhouse` to `/etc/hosts`. You can do it in one line with:

    ```bash
    sudo echo '127.0.0.1 kafka clickhouse' | sudo tee -a /etc/hosts
    ```

    ClickHouse and Kafka won't be able to talk to each other without these mapped hosts.

5. Clone the [PostHog repository](https://github.com/posthog/posthog). All future commands assume you're inside the `posthog/` folder.

    ```bash
    git clone https://github.com/PostHog/posthog && cd posthog/
    ```

## Get things up and running

### 1. Spin up external services

In this step we will start all the external services needed by PostHog to work.

We'll be using `docker compose`, which is the successor to `docker-compose`. One of its features is better compatibility with ARM environments like Apple Silicon Macs. ([See Docker documentation for details.](https://docs.docker.com/compose/#compose-v2-and-the-new-docker-compose-command))

```bash
docker compose -f docker-compose.dev.yml up
```

> **Friendly tip 1:** If you see `Error while fetching server API version: 500 Server Error for http+docker://localhost/version:`, it's likely that Docker Engine isn't running.

> **Friendly tip 2:** If you see "Exit Code 137" anywhere, it means that the container has run out of memory. In this case you need to allocate more RAM in Docker Desktop settings.

> **Friendly tip 3:** You _might_ need `sudo` – see [Docker docs on managing Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall).

>**Friendly tip 4:** If you see `Error: (HTTP code 500) server error - Ports are not available: exposing port TCP 0.0.0.0:5432 -> 0.0.0.0:0: listen tcp 0.0.0.0:5432: bind: address already in use`,  - refer this [stackoverflow answer](https://stackoverflow.com/questions/38249434/docker-postgres-failed-to-bind-tcp-0-0-0-05432-address-already-in-use) in most of the case stopping Postgreql service will help. 
On Linux use this command to stop Postgresql if runing already in background.
```bash
sudo service postgresql stop
```

Second, verify via `docker ps` and `docker logs` (or via the Docker Desktop dashboard) that all these services are up and running. They should display something like this in their logs:

```shell
# docker ps                                                                                     NAMES
CONTAINER ID   IMAGE                               COMMAND                  CREATED         STATUS          PORTS                                                                                            NAMES
567a4bb735be   clickhouse/clickhouse-server:22.3   "/entrypoint.sh"         3 minutes ago   Up 24 seconds   0.0.0.0:8123->8123/tcp, 0.0.0.0:9000->9000/tcp, 0.0.0.0:9009->9009/tcp, 0.0.0.0:9440->9440/tcp   posthog-clickhouse-1
9dc22c70865d   bitnami/kafka:2.8.1-debian-10-r99   "/opt/bitnami/script…"   3 minutes ago   Up 24 seconds   0.0.0.0:9092->9092/tcp                                                                           posthog-kafka-1
add6475ae0db   postgres:12-alpine                  "docker-entrypoint.s…"   3 minutes ago   Up 24 seconds   0.0.0.0:5432->5432/tcp                                                                           posthog-db-1
6037fb28659b   minio/minio                         "sh -c 'mkdir -p /da…"   3 minutes ago   Up 24 seconds   9000/tcp, 0.0.0.0:19000-19001->19000-19001/tcp                                                   posthog-object_storage-1
d80a9304f4a7   zookeeper:3.7.0                     "/docker-entrypoint.…"   3 minutes ago   Up 24 seconds   2181/tcp, 2888/tcp, 3888/tcp, 8080/tcp                                                           posthog-zookeeper-1
d2d00eae3fc0   redis:6.2.7-alpine                  "docker-entrypoint.s…"   3 minutes ago   Up 24 seconds   0.0.0.0:6379->6379/tcp                                                                           posthog-redis-1                                                                       posthog-redis-1

# docker logs posthog-db-1 -n 1
2021-12-06 13:47:08.325 UTC [1] LOG:  database system is ready to accept connections

# docker logs posthog-redis-1 -n 1
1:M 06 Dec 2021 13:47:08.435 * Ready to accept connections

# docker logs posthog-clickhouse-1 -n 1
Saved preprocessed configuration to '/var/lib/clickhouse/preprocessed_configs/users.xml'.

# docker logs posthog-kafka-1
[2021-12-06 13:47:23,814] INFO [KafkaServer id=1001] started (kafka.server.KafkaServer)

# docker logs posthog-zookeeper-1
# Because ClickHouse and Kafka connect to Zookeeper, there will be a lot of noise here. That's good.
```

> **Friendly tip:** Kafka is currently the only x86 container used, and might segfault randomly when running on ARM. Restart it when that happens.

Finally, install Postgres locally. Even planning to run Postgres inside Docker, we need a local copy of Postgres (version 11+) for its CLI tools and development libraries/headers. These are required by `pip` to install `psycopg2`.

- On macOS

```bash
brew install postgresql
```

- On Linux

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

This installs both the Postgres server and its tools. DO NOT start the server after running this.

On Linux you often have separate packages: `postgres` for the tools, `postgres-server` for the server, and `libpostgres-dev` for the `psycopg2` dependencies. Consult your distro's list for an up-to-date list of pacakages.

### 2. Prepare the frontend

1. Install nvm: https://github.com/nvm-sh/nvm. If using fish, you may instead prefer https://github.com/jorgebucaran/nvm.fish.

<blockquote class="warning-note">
    After installation, make sure to follow the instructions printed in your terminal to add NVM to your{' '}
    <code>$PATH</code>. Otherwise the command line will use your system Node.js version instead.
</blockquote>

2. Install the latest Node.js 16 (the version used by PostHog in production) with `nvm install 16`. You can start using it in the current shell with `nvm use 16`.

3. Install yarn with `npm install -g yarn@1`.

4. Install Node packages by running `yarn`.

5. Run `yarn typegen:write` to generate types for [Kea](https://kea.js.org/) state management logics used all over the frontend.

> The first time you run typegen, it may get stuck in a loop. If so, cancel the process (`Ctrl+C`), discard all changes in the working directory (`git reset --hard`), and run `yarn typegen:write` again. You may need to discard all changes once more when the second round of type generation completes.

### 3. Prepare app/plugin server

Assuming Node.js is installed, run `yarn --cwd plugin-server` to install all required packages. We'll run this service in a later step.

### 4. Prepare the Django server

1. Install a few dependencies for SAML to work. If you're on macOS, run the command below, otherwise check the official [xmlsec repo](https://github.com/mehcode/python-xmlsec) for more details.

    - On macOS
    ```bash
    brew install libxml2 libxmlsec1 pkg-config
    ```
    - On Linux
    ```bash
    sudo apt-get install libxml2 libxmlsec1-dev pkg-config
    ```

1. Install Python 3.8. You can do so with Homebrew: `brew install python@3.8`. Make sure when outside of `venv` to always use `python3` instead of `python`, as the latter may point to Python 2.x on some systems.

    **Friendly tip:** Need to manage multiple versions of Python on a single machine? Try [pyenv](https://github.com/pyenv/pyenv).

1. Create the virtual environment in current directory called 'env':

    ```bash
    python3 -m venv env
    ```

1. Activate the virtual environment:

    ```bash
    # For bash/zsh/etc.
    source env/bin/activate

    # For fish
    source env/bin/activate.fish
    ```

1. Install requirements with pip

    If your workstation is ARM-based (e.g. Apple Silicon), the first time your run `pip install` you must pass it custom OpenSSL headers:
    - On macOS
    ```bash
    brew install openssl brotli
    CFLAGS="-I /opt/homebrew/opt/openssl/include" LDFLAGS="-L /opt/homebrew/opt/openssl/lib" GRPC_PYTHON_BUILD_SYSTEM_OPENSSL=1 GRPC_PYTHON_BUILD_SYSTEM_ZLIB=1 pip install -r requirements.txt
    ```

    - On Linux
    ```bash
    apt-get update
    sudo apt-get install brotli libpq-dev -y
    CFLAGS="-I /opt/homebrew/opt/openssl/include" LDFLAGS="-L /opt/homebrew/opt/openssl/lib" GRPC_PYTHON_BUILD_SYSTEM_OPENSSL=1 GRPC_PYTHON_BUILD_SYSTEM_ZLIB=1 pip install -r requirements.txt
    ```

    These will be used when installing `grpcio` and `psycopg2`. After doing this once, and assuming nothing changed with these two packages, next time simply run:

    ```bash
    pip install -r requirements.txt
    ```

    If on an x86 platform, simply run the latter version.

1. Install dev requirements

    ```bash
    pip install -r requirements-dev.txt
    ```

### 5. Prepare databases

We now have the backend ready, and Postgres and ClickHouse running – these databases are blank slates at the moment however, so we need to run _migrations_ to e.g. create all the tables:

```bash
DEBUG=1 ./bin/migrate
```

> **Friendly tip:** The error `fe_sendauth: no password supplied` connecting to Postgres happens when the database is set up with a password and the user:pass isn't specified in `DATABASE_URL`. Try `export DATABASE_URL=postgres://posthog:posthog@localhost:5432/posthog`.

> **Another friendly tip:** You may run into `psycopg2` errors while migrating on an ARM machine. Try out the steps in this [comment](https://github.com/psycopg/psycopg2/issues/1216#issuecomment-820556849) to resolve this.

### 6. Start PostHog

Now start all of PostHog (backend, worker, app server, and frontend – simultaneously) with:

```bash
./bin/start
```

Open [http://localhost:8000](http://localhost:8000) to see the app.

> **Note:** The first time you run this command you might get an error that says "layout.html is not defined". Make sure you wait until the frontend is finished compiling and try again.

To see some data on the frontend, you should go to the `http://localhost:8000/demo` and play around with it. This will give you a Hogflix test project containing some data data in the app.

### 7. Develop

This is it! You can now change PostHog in any way you want. To commit changes, create a new branch based on `master` for your intended change, and develop away. Just make sure not use to use `release-*` patterns in your branches unless putting out a new version of PostHog, as such branches have special handling related to releases.

## Testing

For a PostHog PR to be merged, all tests must be green, and ideally you should be introducing new ones as well – that's why you must be able to run tests with ease.

For backend, simply use:

```bash
pytest
```

You can narrow the run down to only files under matching paths:

```bash
pytest posthog/test/test_entity_model.py
```

Or to only test cases with matching function names:

```bash
pytest posthog/test/test_entity_model.py -k test_inclusion
```

To see debug logs (such as ClickHouse queries), add argument `--log-cli-level=DEBUG`.

For Cypress end-to-end test, run `bin/e2e-test-runner`. This will temporarily install required dependencies inside the project, spin up a test instance of PostHog, and show you the Cypress interface, from which you'll manually choose tests to run.

Once you're done, terminate the command with cmd + C. Be sure to wait until the command terminates gracefully so temporary dependencies are removed from `package.json` and you don't commit them accidentally.

For frontend tests, all you need is `yarn test`.

## Extra: Working with feature flags

When developing locally with environment variable `DEBUG=1` (which enables a setting called `SELF_CAPTURE`),
all analytics inside your local PostHog instance is based on that instance itself – more specifically, the currently selected project.
This means that your activity is immediately reflected in the current project, which is potentially useful for testing features
– for example, which feature flags are currently enabled for your development instance is decided by the project you have open at the very same time.

So, when working with a feature based on feature flag `foo-bar`, [add a feature flag with this key to your local instance](http://localhost:8000/feature_flags/new) and release it there.

If you'd like to have ALL feature flags that exist in PostHog at your disposal right away, run `python3 manage.py sync_feature_flags` – they will be added to each project in the instance, fully rolled out by default.

This command automatically turns any feature flag ending in `_EXPERIMENT` as a multivariate flag with `control` and `test` variants.

## Extra: Debugging the backend in PyCharm

With PyCharm's built in support for Django, it's fairly easy to setup debugging in the backend. This is especially useful when you want to trace and debug a network request made from the client all the way back to the server. You can set breakpoints and step through code to see exactly what the backend is doing with your request.

1. Setup Django configuration as per JetBrain's [docs](https://blog.jetbrains.com/pycharm/2017/08/develop-django-under-the-debugger/).
2. Click Edit Configuration to edit the Django Server configuration you just created.
3. Point PyCharm to the project root (`posthog/`) and settings (`posthog/posthog/settings.py`) file.
4. Add these environment variables

```
DEBUG=1;
KAFKA_HOSTS=kafka:9092;
DATABASE_URL=postgres://posthog:posthog@localhost:5432/posthog
```
