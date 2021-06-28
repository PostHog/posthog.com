---
title: Setting up PostHog EE
sidebar: Handbook
showTitle: true
---

Rough instructions on how to "get the EE version running in all its glory".

Currently for internal use only.

### Getting it up and running
`docker-compose -f ee/docker-compose.ch.yml up`

### Fixing broken frontend build
`docker run ee_web yarn build`

### Running Backend in Docker and Frontend locally

This setup is best if you want to iterate quickly on frontend changes. You get the benefits of hot reloading locally while keeping the backend dockerized.

`yarn start-ch-dev`

### Running Python + Webpack locally
- Run all the services
  - Stop local kafka, clickhouse and zookeeper instances if you have them
  - Same for redis, though it doesn't really matter much
  - `docker-compose -f ee/docker-compose.ch.yml up db redis zookeeper kafka clickhouse`
- Run the frontend
  - `yarn build`
  - `yarn start` or click "▶️" next to `"start"` in the scripts section of package.json.
- Run the backend
  - `export DEBUG=1`
  - `export PRIMARY_DB=clickhouse`
  - `export DATABASE_URL=postgres://posthog:posthog@localhost:5439/posthog` (note the `9` in `5439`)
  - `export KAFKA_ENABLED=true`
  - `export KAFKA_HOSTS=localhost:9092`
  - Run migrations: `python manage.py migrate && python manage.py migrate_clickhouse`
  - Run the app: `python manage.py runserver` (or set it up via your IDE)
  - Run the worker: `./bin/start-worker`
- Setting up PyCharm debugging
  - Copy the env when needed:
      - `;DEBUG=1;PRIMARY_DB=clickhouse;DATABASE_URL=postgres://posthog:posthog@localhost:5439/posthog`
  - Backend config:
      - Set up a `Django Server`
      - For django support, set the project folder to the project root
      - Settings: `./posthog/settings.py`
  - Worker config:
      - Set up a python configuration
      - script_path `./env/bin/celery` (replace `.` with the project dir)
      - parameters `-A posthog worker -B --scheduler redbeat.RedBeatScheduler`
  - Tests:
      - All the same, except skip `DEBUG=1` in the env settings.
      - Set as the "target" in run configuration `ee/clickhouse`

### Post Development Cleanup

Awesome! You've made your awesome fix/feature/contribution and you're ready to call it day. Make sure to `docker-compose down` your app and manually clean up your Clickhouse database:

```
docker compose -f ee/docker-compose.ch.yml down
DEBUG=1;DJANGO_SETTINGS_MODULE=posthog.settings;PRIMARY_DB=clickhouse;CLICKHOUSE_HOST=clickhouse;CLICKHOUSE_DATABASE=posthog;CLICKHOUSE_SECURE=false;CLICKHOUSE_VERIFY=false python migrate.py migrate_clickhouse
```
