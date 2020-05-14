---
title: Developing locally
sidebar: Docs
showTitle: true
---

# Developing locally

## Using Docker

```bash
docker-compose -f docker-compose.dev.yml up
```

## Using virtualenv

1. Make sure you have python 3 installed `python3 --version`
2. Make sure you have redis installed and running `brew install redis && brew services start redis`
3. Make sure you have postgres installed and running `brew install postgres && brew services start postgresql`
4. Create Database `createdb posthog`
5. Navigate into the correct folder `cd posthog`
6. Run `python3 -m venv env` (creates virtual environment in current direction called 'env')
7. Run `source env/bin/activate` (activates virtual environment)
8. Run `pip install -r requirements.txt`. If you have problems with this step (TLS/SSL error), then run `~ brew update && brew upgrade` followed by `python3 -m pip install --upgrade pip`, then retry the requirements.txt install.
9. Install dev requirements `pip install -r requirements/dev.txt`
10. Run migrations `DEBUG=1 python3 manage.py migrate`
11. Run `DEBUG=1 ./bin/start` to start the backend, worker and frontend simultaneously

Now open [http://localhost:8000](http://localhost:8000) to see the app.

To see some data on the frontend, you should go to the `http://localhost:8000/demo` and play around with it, so you can see some data on dashboard

### Running backend separately (Django)

Run `DEBUG=1 ./bin/start-backend`

### Running background worker separately (Celery)

Run `DEBUG=1 ./bin/start-worker`

### Running frontend separately (React)

If at any point, you get "command not found: nvm", you need to install nvm, then use that to install node.

Run `./bin/start-frontend`


## Running backend tests

Run `./bin/tests`

