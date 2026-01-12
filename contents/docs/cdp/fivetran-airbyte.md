---
title: Using Fivetran, Airbyte or other ETL tools with PostHog
sidebar: Docs
showTitle: true
---

While ETL tools like Fivetran, Airbyte, and similar platforms often offer unofficial PostHog connectors, **we do not recommend using those** to move data from PostHog to other destinations (like a data warehouse). They're not well-suited for the high-volume, real-time nature of product analytics data. PostHog's [data pipelines](/docs/cdp) are purpose-built for this use case and offer significant advantages, including being **much cheaper**.

## ETL tools

ETL tools like Fivetran and Airbyte are designed for traditional business data with predictable volumes and update patterns, but product analytics data is fundamentally different. PostHog customers often generate billions of events per day with bursty traffic patterns that can overwhelm ETL tool rate limits and quotas. These tools typically sync on hourly or daily schedules, which doesn't meet the real-time requirements of most of our customers. In addition, the way that these tools grab data (uncompressed rest API requests in small increments) requires disproportionally large amounts of resources, which means we often need to rate limit those requests.

When data doesn't appear in your warehouse, ETL tools make it extremely difficult to diagnose issues due to their black box processing and limited error visibility. The complex dependency chains mean ETL tools add another layer of infrastructure that can fail independently of PostHog. Additionally, ETL tools introduce unnecessary costs and complexity through additional licensing fees based on data volume and data duplication as your data gets copied multiple times (PostHog → ETL tool → warehouse).

## Why use PostHog's data pipelines

PostHog's batch exports are purpose-built for product analytics, offering direct data access by reading from PostHog's optimized ClickHouse database to ensure data consistency. They're designed with analytics-optimized schemas in formats like Parquet with compression, built to scale with PostHog's infrastructure to support billions of events per day, and offer real-time capabilities with 5 minute exports for near real-time data freshness.

Batch exports provide superior reliability and debugging through enterprise-grade workflow orchestration built on Temporal, comprehensive logging that shows exactly what data was exported and when, automatic retries with exponential backoff for temporary failures, and built-in testing to validate destinations before creating exports. Since PostHog owns the entire pipeline, our team can provide direct support to help debug any issues that arise.

Using PostHog's data pipelines is also often much cheaper than using an external ETL tool.

## Supported destinations

PostHog batch exports support all major data warehouses:

- [BigQuery](/docs/cdp/batch-exports/bigquery)
- [Snowflake](/docs/cdp/batch-exports/snowflake)
- [Redshift](/docs/cdp/batch-exports/redshift)
- [Databricks](/docs/cdp/batch-exports/databricks)
- [Postgres](/docs/cdp/batch-exports/postgres)
- [S3](/docs/cdp/batch-exports/s3) (for custom destinations)
- [Azure Blob Storage](/docs/cdp/batch-exports/azureblob)

## Real-time alternatives

For use cases requiring real-time data, consider:

- [Real-time destinations](/docs/cdp/real-time) for streaming data to external systems
- [Webhooks](/docs/webhooks) for event-driven integrations

## Migration from ETL tools

If you're currently using an ETL tool with PostHog, migrating to batch exports is straightforward:

1. **Create a new batch export** in PostHog's [Data pipelines](https://app.posthog.com/pipeline) interface
2. **Configure your destination** using the same credentials you used with the ETL tool
3. **Test the configuration** using PostHog's built-in testing
4. **Start the export** and verify data appears in your warehouse
5. **Disable the ETL tool** once you're confident the batch export is working
