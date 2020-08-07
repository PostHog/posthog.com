---
title: Developing Locally
sidebar: Docs
showTitle: true
---

## Using Docker

First clone the repository:
```bash
git clone https://github.com/PostHog/posthog
```

Then start the instance with `docker-compose`:

```bash
docker-compose -f docker-compose.dev.yml up
```

## Using virtualenv

1. Make sure you have python 3 installed `python3 --version`
2. Make sure you have [Redis installed](https://redis.io/download) and running. 

    On MacOS, this is done with: `brew install redis && brew services start redis`
3. Make sure you have [PostgreSQL installed](https://www.postgresql.org/download/) and running.

    On MacOS, this is done with: `brew install postgresql && brew services start postgresql`

 
4. Create the Database: `createdb posthog`
5. Navigate into the correct folder (project's root directory): `cd posthog` 
6. Run `python3 -m venv env` (creates virtual environment in current direction called 'env')
7. Run `source env/bin/activate` (activates the virtual environment)
8. Run `pip install -r requirements.txt`. 

    If you have problems with this step (TLS/SSL error), then run `~ brew update && brew upgrade` followed by `python3 -m pip install --upgrade pip`, then retry the requirements.txt install.
9. Install dev requirements: `pip install -r requirements/dev.txt`
10. Run migrations: `DEBUG=1 python3 manage.py migrate`
11. Make sure you have [Yarn installed](https://classic.yarnpkg.com/en/docs/install/):

    On MacOS, this is done with: `brew install yarn`

12. Run `DEBUG=1 ./bin/start` to start the backend, worker and frontend simultaneously

    *_Note:_ The first time you run this command you might get an error that says "layout.html is not defined". Make sure you wait until the frontend is finished compiling and try again.*

Now open [http://localhost:8000](http://localhost:8000) to see the app.

To see some data on the frontend, you should go to the `http://localhost:8000/demo` and play around with it, so you can see some data on dashboard

### Running backend separately (Django)

Run `DEBUG=1 ./bin/start-backend`

### Running background worker separately (Celery)

Run `DEBUG=1 ./bin/start-worker`

### Running frontend separately (React)

If at any point, you get "command not found: nvm", you need to install nvm, then use that to install node.

Run `./bin/start-frontend`

### Running backend tests

Run `./bin/tests`

<br>


## Using Porter
Porter allows you to develop remotely without having to run or setup Docker on your local machine. It runs the same Docker containers in the cloud and lets you develop directly inside the remotely hosted container while still using your favorite local tools. 

### Get Started with 1-click

<a target="_blank" href="http://api.getporter.dev/account/login?redirect=https://dashboard.getporter.dev/auth/check?initialize=posthog"><img src="https://storage.googleapis.com/porter-asssets/porter-develop.svg" width="170px" /></a>

### Installing the Porter CLI
1. `npm install -g porter-cli` (yarn is not supported at the moment) 
2. After installation, log in through the Porter CLI via `porter login`.
3. Clone the PostHog repository into your local folder and initialize:
```bash
git clone https://github.com/PostHog/posthog.git
cd posthog
porter init
...
(choose the posthog container)
...
porter logs
```

4. Once you confirm that everything has been compiled successfully from the logs, start syncing the folder via `porter sync`.
