---
title: How the Migrator 3000 app works
showTitle: true
topics:
    - migrator
---

## What does the Migrator 3000 app do?
The Migrator app enables you to move events from one PostHog instance to another, so that you can move from a self-hosted instance to a PostHog Cloud deployment, or vice versa. 

## Does the Migrator 3000 app move all content to the new instance?
No, this app will only migrate events and objects derived from events, such as persons. Dashboards, Insights, Feature Flags, etc. will not be migrated and must be manually recreated on the new instance. 

## How do I install the Migrator 3000 app for PostHog Cloud?

The plugin is already installed as default for PostHog Cloud users. Simply click 'Apps' on the left-hand tool bar and enable the app to get started. 

## How do I install the Migrator 3000 app on a self-hosted deployment?

The plugin is already installed as default for PostHog Cloud users. Simply click 'Apps' on the left-hand tool bar and enable the app to get started. 

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Migrator 3000' press 'Install'
4. Configure the by app by following the instructions below. 

## How do I configure the Migrator 3000 app?

To configure the app, follow the configuration steps once the app is enabled and enter the following information. 

- **Host** - This is the host of your PostHog instance (without http or https). Set this to `app.posthog.com` if you are migrating to PostHog Cloud.

- **Project API Key** - This is the project API key (token) of the instance you wish to migrate to.

- **Date to start exporting from** - How much historic data do you want to export? Use the format YYYY-MM-DD.

- **PostHog version** - Self-hosted users can find their PostHog version from /instance/status

## Were there 2999 earlier versions of this app?

No, it's just a cool name. A _very_ cool name.

## Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Migrator 3000](https://github.com/posthog/posthog-plugin-migrator3000) is available on GitHub. 

## Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri), [Tim Glaser](https://github.com/timgl), [James Hawkins](https://github.com/jamesefhawkins) and [Marius Andra](https://github.com/mariusandra) for creating the Migrator 3000. 

Nobody has yet stepped forward to take credit for the name, however.

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.