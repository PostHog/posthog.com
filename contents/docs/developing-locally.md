---
title: Developing Locally
sidebar: Docs
showTitle: true
---

## Using Docker

> **Note:** Currently Docker does not support Apple Silicon. Please use the virtualenv setup instead.

First clone the repository:
```bash
git clone https://github.com/PostHog/posthog
```

Then start the instance with `docker-compose`:

```bash
docker-compose -f docker-compose.dev.yml up
```

> **It may take several minutes to build the system for the first time**. If you see an error message once your app has launched saying the front-end is not built, please wait for the Yarn dependencies to be installed (the logs will output a `✔ Webpack: Compiled successfully` message once the frontend is ready).

## Using virtualenv

1. Clone the repository:
```bash
git clone https://github.com/PostHog/posthog
```
2. Make sure you have Python 3.8 installed `python3 --version`. [pyenv](https://github.com/pyenv/pyenv) is recommended to manage multiple Python versions and make sure you don't use the system version.
3. Make sure you have [Redis installed](https://redis.io/download) and running. We recommend using version 5 or higher.

    ```bash
    # macOS (Homebrew)
    brew install redis && brew services start redis
    ```

4. Make sure you have [PostgreSQL installed](https://www.postgresql.org/download/) and running. We recommend using version 11 or higher. You may also try [Postgres.app](https://postgresapp.com/), but remember to follow the instructions to add `psql` to your `$PATH` if you do.

    ```bash
    # macOS (Homebrew)
    brew install postgresql && brew services start postgresql
    ```

5. Create the Postgres database with the command `createdb posthog` on the shell or by using the Postgres interactive terminal:
    ```
    psql -d postgres
    CREATE DATABASE posthog;
    CREATE DATABASE posthog_e2e_test;
    CREATE USER posthog WITH ENCRYPTED PASSWORD 'posthog';
    GRANT ALL PRIVILEGES ON DATABASE posthog, posthog_e2e_test TO posthog;
    ```
6. Navigate into the correct folder (project's root directory): `cd posthog`
7. Run `python3 -m venv env` (creates virtual environment in current directory called 'env')
8. Run `source env/bin/activate` (activates the virtual environment)
9. Run `pip install -r requirements.txt`.

    If you have problems with this step (TLS/SSL error), then run `~ brew update && brew upgrade` followed by `python3 -m pip install --upgrade pip`, then retry the requirements.txt install.
10. Install dev requirements: `pip install -r requirements-dev.txt`
11. Run migrations: `DEBUG=1 python3 manage.py migrate`
12. Make sure you have [Yarn installed](https://classic.yarnpkg.com/en/docs/install/):

    ```bash
    # macOS (Homebrew)
    brew install yarn
    ```

13. Make sure you have [NodeJS installed](https://nodejs.org/en/download/):

    ```bash
    # macOS (Homebrew)
    brew install node
    ```

> **Note:** For Apple Silicon support, please use NodeJS >= v15.0

14. Run `DEBUG=1 ./bin/start` to start the backend, worker and frontend simultaneously

    *_Note:_ The first time you run this command you might get an error that says "layout.html is not defined". Make sure you wait until the frontend is finished compiling and try again.*

Now open [http://localhost:8000](http://localhost:8000) to see the app.

To see some data on the frontend, you should go to the `http://localhost:8000/demo` and play around with it, so you can see some data on dashboard.

> **Friendly tip:** Homebrew services can be stopped with `brew services stop <service_name>`

### Running backend separately (Django)

Run `DEBUG=1 ./bin/start-backend`

### Running background worker separately (Celery)

Run `DEBUG=1 ./bin/start-worker`

### Running frontend separately (React)

If at any point, you get "command not found: nvm", you need to install nvm, then use that to install node.

Run `./bin/start-frontend`

### Running backend tests

Run `./bin/tests`
