---
title: Linking Neo4j as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
beta: true
sourceId: Neo4j
---

import AlphaRelease from "../\_snippets/alpha-release.mdx"
import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

<AlphaRelease />

The Neo4j connector syncs nodes and relationships from your Neo4j graph database into PostHog, so you can query graph data alongside your product data using SQL.

PostHog discovers every node label and relationship type in your database and creates a table for each one. Node tables are prefixed `node_` and relationship tables are prefixed `rel_`.

## Prerequisites

- A Neo4j Aura instance, or a self-managed Neo4j 5.19+ deployment with a **public HTTPS endpoint**. Self-managed versions before 5.25 require the [Query API to be enabled](https://neo4j.com/docs/operations-manual/current/) explicitly.

- A database user with **read access**. PostHog only reads data.

- The database credentials (username and password) you received when you created the Aura instance, or equivalent credentials from your database administrator.

## Adding a data source

<SourceSetupIntro />

When linking Neo4j, you need:

- **HTTPS host** – the public URL of your Neo4j instance, for example `https://your-instance.databases.neo4j.io`. Must be HTTPS with no path, query string, or embedded credentials.

- **Database** – the name of the database to connect to, for example `neo4j`.

- **Username** – your Neo4j username, typically `neo4j` on Aura instances.

- **Password** – the password for the database user.

PostHog validates the host, authenticates with Basic auth, and discovers available tables automatically.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

### How tables are discovered

PostHog calls `db.labels()` and `db.relationshipTypes()` to discover every node label and relationship type in the connected database. Each label becomes a `node_<label>` table and each relationship type becomes a `rel_<type>` table.

### Node tables (`node_<label>`)

| Column             | Description                                      |
| ------------------ | ------------------------------------------------ |
| `element_id`       | The node identifier assigned by Neo4j.           |
| `labels`           | The labels attached to the node.                 |
| _property columns_ | One column for each property found on the nodes. |

### Relationship tables (`rel_<type>`)

| Column             | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `element_id`       | The relationship identifier assigned by Neo4j.           |
| `start_element_id` | The identifier of the start node.                        |
| `end_element_id`   | The identifier of the end node.                          |
| _property columns_ | One column for each property found on the relationships. |

### Sync behavior

- **Full refresh only** – every sync re-downloads all rows. Incremental and append syncs aren't supported.

- **Row limit** – each table is limited to 1,000,000 rows. If a table exceeds this limit, the import fails rather than silently truncating data.

- **Unlabeled nodes** are excluded. Nodes with multiple labels appear in each corresponding `node_` table.

- **Reserved column names** – if a node or relationship has a property named `element_id`, `labels`, `start_element_id`, or `end_element_id`, the import for that table fails. Rename the conflicting property in Neo4j before syncing.

- **No durable resume** – if a sync is interrupted, it restarts from the beginning. Neo4j doesn't guarantee `elementId` identity across transactions, so there's no reliable checkpoint.

- **Concurrent changes** – because paging uses `SKIP`/`LIMIT` ordering, concurrent writes to the graph can shift rows between pages during a sync.

## Troubleshooting

### Authentication failed

Check your database username and password. On Aura, use the credentials from when you created the instance. If the password has expired, reset it in the Neo4j console before reconnecting.

### Query API not found

Verify that:

1. The **HTTPS host** is correct and publicly reachable.
2. The **database name** matches an existing database.
3. The Query API is enabled. Aura enables it by default. Self-managed deployments on versions before 5.25 may need to [enable it manually](https://neo4j.com/docs/operations-manual/current/).

### Row limit exceeded

The table contains more than 1,000,000 rows. Filter your graph data by using a more specific label or relationship type, or reduce the dataset before syncing.

### Property conflicts with a reserved column name

A property on your nodes or relationships uses one of the reserved column names (`element_id`, `labels`, `start_element_id`, or `end_element_id`). Rename the conflicting property in Neo4j and re-sync.

<TroubleshootingLink />
