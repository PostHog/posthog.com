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

The instructions here assume you're running macOS or the current Ubuntu Linux LTS (22.04).

For other Linux distros, adjust the steps as needed (e.g. use `dnf` or `pacman` in place of `apt`).

Windows isn't supported natively. But, Windows users can run a Linux virtual machine. The latest Ubuntu LTS Desktop is recommended. (Ubuntu Server is not recommended as debugging the frontend will require a browser that can access localhost.)

In case some steps here have fallen out of date, please tell us about it – feel free to [submit a patch](https://github.com/PostHog/posthog.com/blob/master/contents/handbook/engineering/developing-locally.md)!

## Developing with CodeSpaces

This is a faster alternative to get up and running. If you don't want to or can't use Codespaces continue from the next section.


1. Create your codespace
![](https://user-images.githubusercontent.com/890921/231489405-cb2010b4-d9e3-4837-bfdf-b2d4ef5c5d0b.png)
2. Update it to 8-core machine type (the smallest is probably too small to get PostHog running properly). Consider also changing "Open in ..." to be your favorite editor.
![](https://user-images.githubusercontent.com/890921/231490278-140f814e-e77b-46d5-9a4f-31c1b1d6956a.png)
3. Open a terminal window and run `docker compose -f docker-compose.dev.yml up`
4. Open a terminal window and run `./bin/migrate` and then `./bin/start`
5. Open browser to http://localhost:8000/

## macOS prerequisites

1. Install Xcode Command Line Tools if you haven't already: `xcode-select --install`.

2. Install the package manager Homebrew by following the [instructions here](https://brew.sh/).

<blockquote class="warning-note">
    After installation, make sure to follow the instructions printed in your terminal to add Homebrew to your{' '}
    <code>$PATH</code>. Otherwise the command line will not know about packages installed with <code>brew</code>.
</blockquote>

3. Install [Docker Desktop](https://www.docker.com/products/docker-desktop) and in its settings give Docker **at least 4 GB of RAM** (or 6 GB if you can afford it) and at least 4 CPU cores.

## Ubuntu prerequisites

1. Install Docker following [the official instructions here](https://docs.docker.com/engine/install/ubuntu/).

2. Install the `build-essential` package:

    ```bash
    sudo apt install -y build-essential optipng
    ```

## Common prerequisites for both macOS & Linux

1. Append line `127.0.0.1 kafka clickhouse` to `/etc/hosts`. You can do it in one line with:

    ```bash
    echo '127.0.0.1 kafka clickhouse' | sudo tee -a /etc/hosts
    ```

    ClickHouse and Kafka won't be able to talk to each other without these mapped hosts.

    > If you are using a newer (>=4.1) version of Podman instead of Docker, the host machine's `/etc/hosts` is used as the base hosts file for containers by default, instead of container's `/etc/hosts` like in Docker. This can make hostname resolution fail in the ClickHouse container, and can be mended by setting `base_hosts_file="none"` in [`containers.conf`](https://github.com/containers/common/blob/main/docs/containers.conf.5.md#containers-table).

2. Clone the [PostHog repository](https://github.com/posthog/posthog). All future commands assume you're inside the `posthog/` folder.

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

> **Friendly tip 3:** You _might_ need `sudo` – see [Docker docs on managing Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall). Or look into [Podman](https://podman.io/getting-started/installation) as an alternative that supports rootless containers.

>**Friendly tip 4:** If you see `Error: (HTTP code 500) server error - Ports are not available: exposing port TCP 0.0.0.0:5432 -> 0.0.0.0:0: listen tcp 0.0.0.0:5432: bind: address already in use`,  - refer to this [stackoverflow answer](https://stackoverflow.com/questions/38249434/docker-postgres-failed-to-bind-tcp-0-0-0-05432-address-already-in-use). In most cases, you can solve this by stopping the `postgresql` service.
```bash
sudo service postgresql stop
```

Second, verify via `docker ps` and `docker logs` (or via the Docker Desktop dashboard) that all these services are up and running. They should display something like this in their logs:

```shell
# docker ps                                                                                     NAMES
CONTAINER ID   IMAGE                                      COMMAND                  CREATED          STATUS                    PORTS                                                                                            NAMES
5a38d4e55447   temporalio/ui:2.10.3                       "./start-ui-server.sh"   51 seconds ago   Up 44 seconds             0.0.0.0:8081->8080/tcp                                                                           posthog-temporal-ui-1
89b969801426   temporalio/admin-tools:1.20.0              "tail -f /dev/null"      51 seconds ago   Up 44 seconds                                                                                                              posthog-temporal-admin-tools-1
81fd1b6d7b1b   clickhouse/clickhouse-server:23.6.1.1524   "/entrypoint.sh"         51 seconds ago   Up 50 seconds             0.0.0.0:8123->8123/tcp, 0.0.0.0:9000->9000/tcp, 0.0.0.0:9009->9009/tcp, 0.0.0.0:9440->9440/tcp   posthog-clickhouse-1
f876f8bff35f   bitnami/kafka:2.8.1-debian-10-r99          "/opt/bitnami/script…"   51 seconds ago   Up 50 seconds             0.0.0.0:9092->9092/tcp                                                                           posthog-kafka-1
d22559261575   temporalio/auto-setup:1.20.0               "/etc/temporal/entry…"   51 seconds ago   Up 45 seconds             6933-6935/tcp, 6939/tcp, 7234-7235/tcp, 7239/tcp, 0.0.0.0:7233->7233/tcp                         posthog-temporal-1
5313fc278a70   postgres:12-alpine                         "docker-entrypoint.s…"   51 seconds ago   Up 50 seconds (healthy)   0.0.0.0:5432->5432/tcp                                                                           posthog-db-1
c04358d8309f   zookeeper:3.7.0                            "/docker-entrypoint.…"   51 seconds ago   Up 50 seconds             2181/tcp, 2888/tcp, 3888/tcp, 8080/tcp                                                           posthog-zookeeper-1
09add699866e   maildev/maildev:2.0.5                      "bin/maildev"            51 seconds ago   Up 50 seconds (healthy)   0.0.0.0:1025->1025/tcp, 0.0.0.0:1080->1080/tcp                                                   posthog-maildev-1
61a44c094753   elasticsearch:7.16.2                       "/bin/tini -- /usr/l…"   51 seconds ago   Up 50 seconds             9200/tcp, 9300/tcp                                                                               posthog-elasticsearch-1
a478cadf6911   minio/minio:RELEASE.2022-06-25T15-50-16Z   "sh -c 'mkdir -p /da…"   51 seconds ago   Up 50 seconds             9000/tcp, 0.0.0.0:19000-19001->19000-19001/tcp                                                   posthog-object_storage-1
91f838afe40e   redis:6.2.7-alpine                         "docker-entrypoint.s…"   51 seconds ago   Up 50 seconds             0.0.0.0:6379->6379/tcp                                                                           posthog-redis-1

# docker logs posthog-db-1 -n 1
2021-12-06 13:47:08.325 UTC [1] LOG:  database system is ready to accept connections

# docker logs posthog-redis-1 -n 1
1:M 06 Dec 2021 13:47:08.435 * Ready to accept connections

# docker logs posthog-clickhouse-1 -n 1
Saved preprocessed configuration to '/var/lib/clickhouse/preprocessed_configs/users.xml'.

# ClickHouse writes logs to `/var/log/clickhouse-server/clickhouse-server.log` and error logs to `/var/log/clickhouse-server/clickhouse-server.err.log` instead of stdout/stsderr. It can be useful to `cat` these files if there are any issues:
# docker exec posthog-clickhouse-1 cat /var/log/clickhouse-server/clickhouse-server.log
# docker exec posthog-clickhouse-1 cat /var/log/clickhouse-server/clickhouse-server.err.log

# docker logs posthog-kafka-1
[2021-12-06 13:47:23,814] INFO [KafkaServer id=1001] started (kafka.server.KafkaServer)

# docker logs posthog-zookeeper-1
# Because ClickHouse and Kafka connect to Zookeeper, there will be a lot of noise here. That's good.
```

> **Friendly tip:** Kafka is currently the only x86 container used, and might segfault randomly when running on ARM. Restart it when that happens.

Finally, install Postgres locally. Even if you are planning to run Postgres inside Docker, we need a local copy of Postgres (version 11+) for its CLI tools and development libraries/headers. These are required by `pip` to install `psycopg2`.

- On macOS:
    ```bash
    brew install postgresql
    ```

This installs both the Postgres server and its tools. DO NOT start the server after running this.

- On Debian-based Linux:
    ```bash
    sudo apt install -y postgresql-client postgresql-contrib libpq-dev
    ```

This intentionally only installs the Postgres client and drivers, and not the server. If you wish to install the server, or have it installed already, you will want to stop it, because the TCP port it uses conflicts with the one used by the Postgres Docker container. On Linux, this can be done with `sudo systemctl disable postgresql.service`.

On Linux you often have separate packages: `postgres` for the tools, `postgres-server` for the server, and `libpostgres-dev` for the `psycopg2` dependencies. Consult your distro's list for an up-to-date list of packages.

### 2. Prepare the frontend

1. Install nvm, with `brew install nvm` or by following the instructions at https://github.com/nvm-sh/nvm. If using fish, you may instead prefer https://github.com/jorgebucaran/nvm.fish.

<blockquote class="warning-note">
    After installation, make sure to follow the instructions printed in your terminal to add NVM to your{' '}
    <code>$PATH</code>. Otherwise the command line will use your system Node.js version instead.
</blockquote>

2. Install the latest Node.js 18 (the version used by PostHog in production) with `nvm install 18`. You can start using it in the current shell with `nvm use 18`.

3. Install pnpm with `npm install -g pnpm`.

4. Install Node packages by running `pnpm i`.

5. Run `pnpm typegen:write` to generate types for [Kea](https://keajs.org/) state management logics used all over the frontend.

> The first time you run typegen, it may get stuck in a loop. If so, cancel the process (`Ctrl+C`), discard all changes in the working directory (`git reset --hard`), and run `pnpm typegen:write` again. You may need to discard all changes once more when the second round of type generation completes.

### 3. Prepare plugin server

Assuming Node.js is installed, run `pnpm i --dir plugin-server` to install all required packages. You'll also need to install the `brotli` compression library:

- On macOS:
    ```bash
    brew install brotli
    ```
- On Debian-based Linux:
    ```bash
    sudo apt install -y brotli
    ```

We'll run the plugin server in a later step.

> Note: If you face an error like `ld: symbol(s) not found for architecture arm64`, most probably your openssl build flags are coming from the wrong place. To fix this, run:
```bash
export CPPFLAGS=-I/opt/homebrew/opt/openssl/include
export LDFLAGS=-L/opt/homebrew/opt/openssl/lib
pnpm i --dir plugin-server
```

### 4. Prepare the Django server

1. Install a few dependencies for SAML to work. If you're on macOS, run the command below, otherwise check the official [xmlsec repo](https://github.com/mehcode/python-xmlsec) for more details.

    - On macOS:
        ```bash
        brew install libxml2 libxmlsec1 pkg-config
        ```
    - On Debian-based Linux:
        ```bash
        sudo apt install -y libxml2 libxmlsec1-dev pkg-config
        ```

1. Install Python 3.10.

    - On macOS, you can do so with Homebrew: `brew install python@3.10`.

    - On Debian-based Linux:
        ```bash
        sudo add-apt-repository ppa:deadsnakes/ppa -y
        sudo apt update
        sudo apt install python3.10 python3.10-venv python3.10-dev -y
        ```

Make sure when outside of `venv` to always use `python3` instead of `python`, as the latter may point to Python 2.x on some systems. If installing multiple versions of Python 3, such as by using the `deadsnakes` PPA, use `python3.10` instead of `python3`.

You can also use [pyenv](https://github.com/pyenv/pyenv) if you wish to manage multiple versions of Python 3 on the same machine.

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

1. Upgrade pip to the latest version:

    ```bash
    pip install -U pip
    ```

1. Install requirements with pip

    If your workstation is an Apple Silicon Mac, the first time your run `pip install` you must set custom OpenSSL headers:

    ```bash
    brew install openssl
    CFLAGS="-I /opt/homebrew/opt/openssl/include $(python3.10-config --includes)" LDFLAGS="-L /opt/homebrew/opt/openssl/lib" GRPC_PYTHON_BUILD_SYSTEM_OPENSSL=1 GRPC_PYTHON_BUILD_SYSTEM_ZLIB=1 pip install -r requirements.txt
    ```

    > **Friendly tip:** If you see `ERROR: Could not build wheels for xmlsec`, refer to this [issue](https://github.com/xmlsec/python-xmlsec/issues/254).

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

Now start all of PostHog (backend, worker, plugin server, and frontend – simultaneously) with:

```bash
./bin/start
```

Open [http://localhost:8000](http://localhost:8000) to see the app.

> **Note:** The first time you run this command you might get an error that says "layout.html is not defined". Make sure you wait until the frontend is finished compiling and try again.

To get some practical test data into your brand-new instance of PostHog, run `DEBUG=1 ./manage.py generate_demo_data`. For a list of useful arguments of the command, run `DEBUG=1 ./manage.py generate_demo_data --help`.

### 7. Develop

This is it! You can now change PostHog in any way you want. See [Project Structure](/handbook/engineering/project-structure) for an intro to the repository's contents.

To commit changes, create a new branch based on `master` for your intended change, and develop away. Just make sure not use to use `release-*` patterns in your branches unless putting out a new version of PostHog, as such branches have special handling related to releases.

## Testing

For a PostHog PR to be merged, all tests must be green, and ideally you should be introducing new ones as well – that's why you must be able to run tests with ease.

### Frontend

For frontend unit tests, run:

```bash
pnpm test:unit
```

You can narrow the run down to only files under matching paths:

```bash
pnpm jest --testPathPattern=frontend/src/lib/components/IntervalFilter/intervalFilterLogic.test.ts
```

To update all visual regression test snapshots, make sure Storybook is running on your machine (you can start it with `pnpm storybook` in a separate Terminal tab), and then run:

```bash
pnpm test:visual-regression
```

To only update snapshots for stories under a specific path, run:

```bash
pnpm test:visual-regression:stories frontend/src/lib/Example.stories.tsx
```

### Backend

For backend tests, run:

```bash
pytest
```

You can narrow the run down to only files under matching paths:

```bash
pytest posthog/test/test_example.py
```

Or to only test cases with matching function names:

```bash
pytest posthog/test/test_example.py -k test_something
```

To see debug logs (such as ClickHouse queries), add argument `--log-cli-level=DEBUG`.

### End-to-end

For Cypress end-to-end tests, run `bin/e2e-test-runner`. This will spin up a test instance of PostHog and show you the Cypress interface, from which you'll manually choose tests to run. Once you're done, terminate the command with Cmd + C.

## Extra: Working with feature flags

When developing locally with environment variable `DEBUG=1` (which enables a setting called `SELF_CAPTURE`),
all analytics inside your local PostHog instance is based on that instance itself – more specifically, the currently selected project.
This means that your activity is immediately reflected in the current project, which is potentially useful for testing features
– for example, which feature flags are currently enabled for your development instance is decided by the project you have open at the very same time.

So, when working with a feature based on feature flag `foo-bar`, [add a feature flag with this key to your local instance](http://localhost:8000/feature_flags/new) and release it there.

If you'd like to have ALL feature flags that exist in PostHog at your disposal right away, run `DEBUG=1 python3 manage.py sync_feature_flags` – they will be added to each project in the instance, fully rolled out by default.

This command automatically turns any feature flag ending in `_EXPERIMENT` as a multivariate flag with `control` and `test` variants.

## Extra: Debugging the backend in PyCharm

With PyCharm's built in support for Django, it's fairly easy to setup debugging in the backend. This is especially useful when you want to trace and debug a network request made from the client all the way back to the server. You can set breakpoints and step through code to see exactly what the backend is doing with your request.

### Setup PyCharm

1. Open the repository folder.
2. Setup the python interpreter (Settings… > Project: posthog > Python interpreter > Add interpreter): Select "Existing" and set it to `path_to_repo/posthog/env/bin/python`.
3. Setup Django support (Settings… > Languages & Frameworks > Django):
   - Django project root: `path_to_repo`
   - Settings: `posthog/settings/__init__py`
  
### Start the debugging environment

1. Instead of manually running `docker compose` you can open the `docker-compose.dev.yml` file and click on the double play icon next to `services`
2. From the run configurations select:
   - "PostHog" and click on debug
   - "Celery" and click on debug (optional)
   - "Frontend" and click on run
   - "Plugin server" and click on run

## Extra: Adding an enterprise license (PostHog employees only)

If you're a PostHog employee, you can add an enterprise license to your local instance by following this [internal guide](https://github.com/PostHog/billing/blob/main/docs/running-posthog-with-billing.md). This is particularly useful if developing enterprise features or testing billing-related functionality.
