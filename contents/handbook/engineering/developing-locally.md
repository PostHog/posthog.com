---
title: Developing locally
sidebar: Docs
showTitle: true
---

> **Note:** This page refers to our [main product repository](https://github.com/PostHog/posthog), not our website. For developing the website, see [developing the website](/handbook/engineering/posthog-com/developing-the-website).

## Getting started

To develop PostHog locally, follow the instructions in the [PostHog repository README](https://github.com/PostHog/posthog#developing-locally).

We use [hogli](https://github.com/PostHog/hogli), a unified CLI for PostHog developer workflows, to manage local development. It handles starting services, running migrations, and more.

### Prerequisites

- [Flox](https://flox.dev/) (optional, recommended for reproducible environments)
- Docker and Docker Compose
- Node.js (managed via hogli)
- Python (managed via hogli)

## Troubleshooting

### Node.js process not starting

If the Node.js process (formerly plugin-server) isn't starting or behaving correctly, try resetting your node_modules:

```bash
rm -rf node_modules
pnpm store prune
pnpm install --force
```

This forces a complete rebuild of node modules and can resolve issues caused by corrupted or stale dependencies.

### IPv6 issues with Kafka

If you're experiencing issues with event ingestion and librdkafka is defaulting to IPv6, you may need to comment out the IPv6 line in your `/etc/hosts` file:

```bash
# Before
127.0.0.1 kafka clickhouse clickhouse-coordinator objectstorage
::1 kafka clickhouse clickhouse-coordinator objectstorage

# After (comment out IPv6)
127.0.0.1 kafka clickhouse clickhouse-coordinator objectstorage
# ::1 kafka clickhouse clickhouse-coordinator objectstorage
```

### Services not starting correctly

If services aren't starting after a cold reset:

1. Restart Docker Compose to ensure all containers are running
2. Check hogli output for errors on each service
3. Run migrations again: topics and tables may not have been initialized when services first started
4. Regenerate demo data if needed

### General debugging tips

- Check mprocs output for service health - note that it may show "healthy" even if a process has exited
- Cymbal may crash loop due to missing Kafka topics until some error tracking events are submitted
- Some services require environment variables (e.g., embedding-worker needs an OpenAI key)
