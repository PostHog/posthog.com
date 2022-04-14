---
title: PostgreSQL Export documentation
showTitle: true
topics:
    - postgres-export
---

## What does the PostgreSQL Export app do?
The PostgreSQL Export app enables you to export events from PostHog to a PostgreSQL instance on ingestion. 

## What are the requirements for this app?

Using the PostgreSQL Export app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

You'll also need access to the PostgreSQL instance you want to export to. 

## How do I install the PostgreSQL Export app?
Firstly, make sure that PostHog can access your PostgreSQL instance. Wherever your instance is hosted, make sure it is set to accept incoming connections so that PostHog can connect to the database and insert events. If this is not possible in your case, consider using the S3 Export app and then setting up your own system for getting data into your Postgres instance.

You will also need to create a user with table creation privileges in your PostgreSQL instance, as well as a new table to store events and execute INSERT queries. You can and should block PostHog from doing anything else on any other tables. Giving PostHog table creation permissions should be enough to ensure this:

```
CREATE USER posthog WITH PASSWORD '123456yZ';
GRANT CREATE ON DATABASE your_database TO posthog;
```

Finally, follow the steps below.

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'PostgreSQL' and select the app, press Install.
3. Add the connection details at the plugin configuration step in PostHog.

## Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Postgres Export app](https://github.com/PostHog/postgres-plugin) is available on GitHub. 

## Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and community member [Michael Shanks](https://github.com/mjashanks) for creating the Postgres Export app. Thanks, both!

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.