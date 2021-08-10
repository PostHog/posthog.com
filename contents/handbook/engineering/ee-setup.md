---
title: Setting up PostHog EE
sidebar: Handbook
showTitle: true
---

Rough instructions on how to "get the EE version running in all its glory". **Currently for internal use only.**


There are multiple ways to run your EE setup depending on your preferences and needs.

### Option A (Recommended). Backend docker-based & frontend locally.
Use our handy command prebuilt command to run. Everything will run on Docker. Frontend will be built and KEA typegen will be run on the background so you can work on the frontend too.

```
yarn start-ch-dev
```

If you're running into problems, such as Kafka connection errors, frontend not building, etc. we recommend starting fresh by cleaning your Docker installation.

```
yarn clear-ch-dev
```
### Option B. Running Python + Webpack locally
- Run all the services
  - Stop local postgres, kafka, clickhouse and zookeeper instances if you have them
  - Same for redis, though it doesn't really matter much
  - `docker-compose -f ee/docker-compose.ch.yml up db redis zookeeper kafka clickhouse`
- Run the frontend
  - `yarn build`
  - `yarn start` or click "▶️" next to `"start"` in the scripts section of package.json.
- Run the backend
  - `export DEBUG=1`
  - `export PRIMARY_DB=clickhouse`
  - `export DATABASE_URL=postgres://posthog:posthog@localhost:5432/posthog`
  - `export KAFKA_ENABLED=true`
  - `export KAFKA_HOSTS=localhost:9092`
  - Run migrations: `python manage.py migrate && python manage.py migrate_clickhouse`
  - Run the app: `python manage.py runserver` (or set it up via your IDE)
  - Run the worker: `./bin/start-worker`
- Setting up PyCharm debugging
  - Copy the env when needed:
      - `;DEBUG=1;PRIMARY_DB=clickhouse;DATABASE_URL=postgres://posthog:posthog@localhost:5432/posthog`
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

### Option C. Running everything but ClickHouse locally
- Follow the [local development setup without Docker](/docs/developing-locally)
- Run `docker-compose -f ee/docker-compose.ch.yml up clickhouse`
- In `/etc/hosts`, add a line with `127.0.0.1       kafka clickhouse`
- Set environment variables:
  - `export PRIMARY_DB=clickhouse`
  - `export CLICKHOUSE_SECURE=False`
  - `export KAFKA_ENABLED=true`
  - `export KAFKA_HOSTS=localhost:9092`
- Run PostHog: `./bin/start`

### Option D. Running ClickHouse, Kafka and Zookeeper on a Cloud Server

This is useful if you have an Apple Silicon Mac.

The following commands set up ClickHouse, Kafka and Zookeeper to run on a cloud server, and forward their ports to `localhost`. For your app it will look like all these services are running locally.

1. Get SSH access to any recent Ubuntu cloud server, e.g. a droplet from Digital Ocean.
2. `ssh -L 8123:localhost:8123 -L 9000:localhost:9000 -L 9440:localhost:9440 -L 9009:localhost:9009 -L 9092:localhost:9092 root@DROPLET.IP.ADDRESS`
3. `apt update && apt -y upgrade`
4. `apt install -y docker.io docker-compose git`
5. `git clone https://github.com/PostHog/posthog`
6. `cd posthog`
7. Run the commands on the server:
  - start: `docker-compose -f ee/docker-compose.ch.yml up zookeeper kafka clickhouse`
  - stop: `docker-compose -f ee/docker-compose.ch.yml down`
  - cleanup: `docker-compose -f ee/docker-compose.ch.yml rm -v zookeeper kafka clickhouse`

8. Add `127.0.0.1 kafka clickhouse redis db` to your local `/etc/hosts` file.
9. Set local environment variables:
  - `export DEBUG=1`
  - `export PRIMARY_DB=clickhouse`
  - `export DATABASE_URL=postgres://posthog:posthog@localhost:5432/posthog`
  - `export KAFKA_ENABLED=true`
  - `export KAFKA_HOSTS=localhost:9092`
10. To migrate ClickHouse locally: `DEBUG=1 python manage.py migrate_clickhouse`

While the SSH connection is active, ports from Kafka and ClickHouse are forwarded to your computer and behave just as the services are running locally.

In case you also want to run Postgres and Redis on the cloud, append `-L 5432:localhost:5432 -L 6379:localhost:6379` to the SSH command and the `db redis` services to the `docker-compose` commands.

Caveats:

- Please note that stale persons in Postgres may affect ingestion to ClickHouse. E.g. persons already seen in postgres won't be added to ClickHouse, resulting in broken analytics. If this happens, either run all services in the cloud or dump your `posthog_person*` tables.
- Using SSH to tunnel into ports which are not open on the remote host may result in many INFO-level messages like `channel 5: open failed: connect failed: Connection refused`. While it may be useful to know that all your services may not be running, it will interfere with your terminal session significantly. You may wish to set the logging level to QUIET with `-q` or any other level with `-o`.
- If you encounter `ECONNRESET` or `EAI_AGAIN` errors, you may need to flush your DNS cache. On MacOS, run `sudo dscacheutil -flushcache`.

### Post Development Cleanup

Awesome! You've made your fix/feature/contribution and you're ready to call it day. Follow proper Docker etiquette and make sure to `docker-compose down` your app to setup a blank slate for the next time you develop with Docker.

`docker compose -f ee/docker-compose.ch.yml down`
