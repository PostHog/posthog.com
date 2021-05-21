---
title: Plugin Server
sidebar: Docs
showTitle: true
---

The [PostHog Plugin Sever](https://github.com/PostHog/posthog-plugin-serve) is a standalone project that PostHog uses to support plugins. Despite being developed separately, the plugin server is packaged with the main PostHog project, allowing you to run it by simply installing PostHog.

### Running the server

To run the plugin server from within the PostHog app, you can simply run the following from the PostHog root directory:

```shell
cd plugins && yarn start
```

### Options

Here are the configuration options for the plugin server:

```shell
Options:
      --version                        Show version number                                         [boolean]
  -c, --config                         Config options JSON.                                         [string]
      --celery-default-queue           celery outgoing queue [celery]                               [string]
      --database-url                   url for postgres [postgres://localhost:5432/posthog]         [string]
      --plugins-celery-queue           celery incoming queue [posthog-plugins]                      [string]
      --redis-url                      url for redis [redis://localhost/]                           [string]
      --base-dir                       base path for resolving local plugins [.]                    [string]
      --plugins-reload-pubsub-channel  redis channel for reload events [reload-plugins]             [string]
      --disable-web                    do not start the web service [false]                        [boolean]
      --web-port                       port for web server [3008]                                   [number]
      --web-hostname                   hostname for web server [0.0.0.0]                            [string]
      --worker-concurrency             number of concurrent worker threads [0]                      [number]
      --tasks-per-worker               number of parallel tasks per worker thread [10]              [number]
      --log-level                      minimum log level [info]                                     [string]
      --sentry-dsn                     sentry ingestion url [null]
      --help                           Show help                                                   [boolean]
```

These can also be passed as environment variables. Just convert the config key to uppercase and replace "-" with "_". For example,`--database-url` becomes `DATABASE_URL`.