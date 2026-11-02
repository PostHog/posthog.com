---
title: Migrating from Fivetran
sidebar: Docs
showTitle: true
---

Move your Fivetran connections to PostHog with your AI agent and our migration skill. The agent uses the PostHog MCP server to read your Fivetran account, recreate each connection as a source, and point it at the same destination Fivetran was writing to.

You enter your passwords. Everything else (connector settings, schemas, destination config) is filled in for you.

Your Fivetran setup stays as it is, so you can run both side by side and check the data before switching over.

## Before you start

You need:

- An MCP client (like Claude Code, Cursor, or Claude Desktop) with the [PostHog MCP server](/docs/model-context-protocol) installed
- The Fivetran migration skill (_TODO: name and install steps_)
- A Fivetran API key and secret. You can generate these in Fivetran under your user settings ([Fivetran docs](https://fivetran.com/docs/rest-api/getting-started))
- Credentials for each source and destination you want to migrate. Fivetran's API doesn't return passwords, so you'll re-enter them

If other teams own some of your connections, you don't need their credentials up front. You can skip those connections and hand them off (see step 3).

## Step 1: Connect your Fivetran account

In PostHog, go to _TODO: UI path_ and add your Fivetran API key and secret. PostHog uses these to read your connections and destinations.

You only do this once. If you skip it, the agent tells you how to do it when you start the migration.

## Step 2: Ask your agent to start the migration

In your MCP client, ask:

```
Move my Fivetran setup into PostHog
```

The agent reads your Fivetran account, lists your connections, and builds a migration plan. It warns you which credentials you'll need before it creates anything.

## Step 3: Choose which connections to migrate

You don't have to move everything at once. Tell the agent which connections to migrate and which to skip, in plain language. For example:

```
Skip every source except the Postgres one
```

For connections someone else owns, skip them and delegate. Another team can run the migration later with their own credentials and pick up where you left off.

## Step 4: Create your sources

For each connection you're migrating, the agent gives you a link to the new source in PostHog. The form is pre-filled with your Fivetran settings, like host, port, database, and user.

1. Open the link.
2. Enter the password.
3. Save.

The agent then creates the source, and it starts syncing into the PostHog data warehouse.

## Step 5: Recreate your destinations

By default, a new source syncs to the PostHog data warehouse only. If Fivetran was writing to your own database or warehouse, ask the agent to add the same destination:

```
Add the same destination as Fivetran for this source
```

The agent gives you another link to a destination form in PostHog.

1. Open the link.
2. Check the host and user, and enter the password.
3. Choose the schema to write to. We recommend a new schema (like `posthog_migration`) so PostHog's data lands next to Fivetran's, not on top of it.
4. Save.

The agent shows any caveats for that destination before it finishes. _TODO: list the common caveats._

## Step 6: Check your data and switch over

Refresh the sources and destinations pages in PostHog to see the new connections. Once the first sync finishes, compare the PostHog schema with the Fivetran one in your destination.

When you're happy with the data:

1. Point anything downstream (dashboards, dbt models, queries) at the new schema.
2. Pause the connection in Fivetran.
3. Delete it in Fivetran once you're sure you don't need it.

## Limitations and troubleshooting

- **Not every Fivetran connector has a PostHog equivalent.** The agent tells you which connections it can't migrate. _TODO: link to supported sources list._
- **You always enter passwords yourself.** The agent pre-fills everything else, and you enter passwords in PostHog, not in the chat.
- **Destinations aren't recreated automatically.** Ask the agent to add them (step 5).
- **The agent can't find my Fivetran connections.** Check your Fivetran API key and secret are saved in PostHog (step 1) and that the key has access to the right Fivetran group.
- **A source saved but isn't syncing.** Check the source's status in PostHog. Wrong credentials are the most common cause.

Stuck? Ask the agent what went wrong, or [contact support](/support).
