---
title: Migrating from Fivetran
sidebar: Docs
showTitle: true
---

Move your Fivetran connections to PostHog with your AI agent and our migration skill. The agent reads your Fivetran account, then uses the PostHog MCP server to recreate each connection as a source and point it at the same destination Fivetran was writing to.

You enter your credentials. Everything else (connector settings, schemas, destination config) is filled in for you.

The agent only reads from Fivetran, so your Fivetran setup stays as it is. You can run both side by side and check the data before switching over.

## Before you start

You need:

- An MCP client (like Claude Code, Cursor, or Claude Desktop) with the [PostHog MCP server](/docs/model-context-protocol) installed
- The `migrating-from-fivetran` agent skill. It ships with the [PostHog MCP server](/docs/model-context-protocol), so there's nothing extra to install: ask your agent to move your Fivetran setup and it loads the skill. You can also get it from the [PostHog AI plugin](https://github.com/PostHog/ai-plugin), or download `skills.zip` from the [latest skills release](https://github.com/PostHog/posthog/releases/tag/agent-skills-latest). See [Skills](/docs/skills) for more.
- A way to read your Fivetran account, using either:
  - A Fivetran API key and secret (recommended). The key can be read-only. You can generate these in Fivetran under your user settings ([Fivetran docs](https://fivetran.com/docs/rest-api/getting-started))
  - The Fivetran MCP server. All of your Fivetran setup goes through the model, so this uses more tokens, especially if your setup is large
- Credentials for each source and destination you want to migrate, like a password, an API key, or OAuth access. Fivetran's API doesn't return these, so you'll re-enter them

If other teams own some of your connections, you don't need their credentials up front. You can skip those connections and hand them off (see step 3).

## Step 1: Ask your agent to start the migration

In your MCP client, ask:

```
Migrate my setup from Fivetran to PostHog
```

## Step 2: Connect your Fivetran account

The agent asks whether to read Fivetran with an API key or the Fivetran MCP server. If you pick an API key, it gives you a link where you enter your key and secret. Save, then go back to your agent and tell it you're done.

The agent then reads your Fivetran account, lists your connections, and builds a migration plan. It warns you which credentials you'll need before it creates anything.

## Step 3: Choose which connections to migrate

Before anything is created, the agent shows you a report of any sources you have set up in Fivetran that PostHog doesn't support yet.

You don't have to move everything at once. Tell the agent which connections to migrate and which to skip, in plain language. For example:

```
Skip every source except the Postgres one
```

For connections someone else owns, skip them and delegate. Another team can run the migration later with their own credentials and pick up where you left off. Migration links only work for people in the same PostHog project, and they show who prepared them.

## Step 4: Recreate your destinations

Before it creates your sources, the agent asks whether you want to recreate each destination, so a source writes to the right place from its first sync. A source with your own destination writes its data there, not to the PostHog data warehouse.

If you add a destination to a source that has already synced, it [starts a full resync](/docs/data-pipelines/destinations/elt-destinations#setting-a-destination), and every destination is billed for the rows it receives.

The agent also asks which schema to write to. It suggests `posthog_<prefix>`, with one schema per connection (for example, `posthog_postgres_neon1`), so PostHog and Fivetran never write into the same tables.

The agent then gives you a link to a destination form in PostHog for each destination.

1. Open the link.
2. Check the config shown so you know what you're setting up. Confirm the host, port, and user before you enter the password, especially if someone else prepared the migration.
3. Enter the password.
4. Save.

Go back to your agent and tell it you're done. It confirms that the destination is created and healthy.

## Step 5: Create your sources

For each connection you're migrating, the agent gives you a link to the new source in PostHog. The form is pre-filled with your Fivetran settings, like host, port, database, and user.

1. Open the link.
2. Check the config shown so you know what you're setting up. For a database, confirm the host before you enter the password, especially if someone else prepared the migration. If the details aren't what you want, use the link on the form to set up a new source instead.
3. Enter the password or API key, or authorize with OAuth. This depends on the source, so check its [setup guide](/docs/data-pipelines/sources) if you're not sure.
4. Save. This creates the source.

Go back to your agent and tell it you're done. It confirms the migration and shows that the first sync is running.

## Step 6: Check your data and switch over

Refresh the sources and destinations pages in PostHog to see the new connections. Once the first sync finishes, compare the PostHog schema with the Fivetran one in your destination.

When you're happy with the data:

1. Point anything downstream (dashboards, dbt models, queries) at the new schema.
2. Pause the connection in Fivetran.
3. Delete it in Fivetran once you're sure you don't need it.

## Limitations and troubleshooting

- **Not every Fivetran connector has a PostHog equivalent.** The agent's report in step 3 shows which sources it can't migrate. See the [list of supported sources](/docs/data-pipelines/sources).
- **You always enter credentials yourself.** The agent pre-fills everything else, and you enter credentials in PostHog, not in the chat.
- **You changed Fivetran mid-migration.** Ask the agent to read it again. Connections you've applied or skipped stay as they are.
- **The agent can't find my Fivetran connections.** If you're using an API key, check that the key has access to the right Fivetran group. If you're using the Fivetran MCP server, check that it's connected to your MCP client.
- **A source saved but isn't syncing.** Check the source's status in PostHog. Wrong credentials are the most common cause.

Stuck? Ask the agent what went wrong, or [contact support](/support).

Using a source we don't support yet? [Request it here](https://app.posthog.com/data-management/sources#panel=support%3Asupport%3Afalse).
