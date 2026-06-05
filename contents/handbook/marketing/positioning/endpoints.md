---
title: Endpoints
sidebar: Handbook
showTitle: true
---

> **Owner:** [Lizzie Epton (PMM)](/community/profiles/43387)

## Elevator pitch

PostHog Endpoints turns any saved insight or SQL query into a stable, authenticated HTTP endpoint. No backend to build, pipeline to maintain, or data engineer needed.

Other tools tell you what happened. PostHog lets you act on your data, and now, easily share it with your customers.

## The unique belief (in terms of Endpoints)

PostHog is building the infrastructure for self-driving product development. The product autonomy loop only closes when data can flow freely; into agents, into products, into every surface that needs it.

**Endpoints is the egress layer for that loop.** The data is already in PostHog. The hard part was getting it out: building a custom API, maintaining it, versioning it, rate-limiting it, keeping it from breaking when someone tweaked a query. Endpoints removes all of that.

For teams building AI-native products, it goes further. Endpoints exposes PostHog data directly to your MCP, and any agent runtime via clean HTTP with no additional infrastructure required. The warehouse stores the context. Endpoints delivers it.

Tinybird and custom-built analytics APIs solve the same surface problem. They don't solve the underlying one: the data still isn't in PostHog, which means agents can't query it natively, flags can't act on it, and experiments can't measure it. With Endpoints, you can use data from any source connected to PostHog, shared externally wherever your customers need to see it, including your MCP.

## Who this is for

* Existing customers already using two or more of these — Product Analytics, SQL/Logs, Dashboards, Surveys 
* If you've heard a customer say any of the following, you should pitch them Endpoints:
   * "We're exporting CSVs and pasting numbers into a slide every Monday."
   * “We want to show our customers their own usage data inside our product."
   * "We're thinking about Tinybird / building a custom analytics API."
   * "Our data team is the bottleneck on getting numbers out of PostHog."

## Who this isn't for

* Teams who only use session replay or feature flags and don't have product analytics queries to expose.
* Teams whose needs are fully met by PostHog's native dashboards and don't need data surfaced anywhere else.

## Messaging

### Message 1: Reliable APIs, without building a backend

**Problem:** The data is in PostHog. Getting it out means either exporting CSVs by hand, or building a custom API and owning it forever. That's slow, fragile, and doesn't scale.

**Solution:** Endpoints turns any saved insight or SQL query into a stable, versioned, authenticated URL. Embed it in your product, power an internal dashboard, give your MCP access. No backend. No pipelines. No maintenance.

**Supporting features:**
* Materialized queries for fast response times, even on large datasets
* Configurable cache TTL per endpoint
* Versioning - pin a query snapshot so upstream edits don't break callers
* 2,400 req/hr rate limit, production-ready
* Parameterized queries for per-user / per-tenant scoping

### Message 2: A simpler way to ship customer facing analytics

**Problem:** Getting PostHog data into a product, report, or customer dashboard used to mean one of three things: file a ticket and wait for engineering, buy another tool (Tinybird, a custom API service), or build and maintain a backend yourself. All of those options are slow, and unavailable to a PM or marketer on a Tuesday afternoon.

**Solution:** Endpoints is self-serve for anyone who can save an insight. PostHog handles the query, caching, rate limits, and the schema, you get a URL you can use anywhere. No data science background needed or custom API to maintain.

**Supporting features:**
* We handle the query, cache, rate limits, and schema, you have nothing to build or own
* Your data is already in PostHog, no pipeline to Tinybird, no additional vendor
* PMs, marketers, and ops leads can ship an Endpoint without engineering help
* Parameterization for safe per-user / per-tenant scoping
* Versioning so query tweaks don't break what you've already shipped

### Message 3: The data layer for your AI workflows

**Problem:** Agents running the product autonomy loop need live product signals as context: event counts, funnel states, metric comparisons. Wiring that up today means custom retrieval infrastructure on top of an already complex pipeline.

**Solution:** Endpoints exposes PostHog data over HTTP to any agent runtime, or MCP-compatible tool. PostHog already has the data. Endpoints makes it fetchable without exposing your entire database.

**Supporting features:**
* Stable URLs - build agent prompts that reliably resolve to fresh data
* Clean HTTP - works with any agent runtime, no SDK required
* Parameterization for query-time filtering

## Battle cards

### vs Tinybird

**Their approach:** A real-time data platform that turns data sources into queryable HTTP APIs. Powerful for teams that want to build analytics APIs from scratch on top of arbitrary data sources.

**Where PostHog wins:**
* Zero additional infrastructure, if you're using PostHog, the data is already there
* No data movement required, no custom pipeline into Tinybird, no schema mapping
* Data stays in PostHog, no separate tool to maintain and bill to pay

### vs Custom-built analytics APIs

**The DIY approach:** Engineers build a purpose-made backend including a query layer, caching, rate limiting, auth, versioning. Fits exactly what the team needs.

**Where PostHog wins:**
* Endpoints takes minutes to set up
* Zero ongoing maintenance, no infrastructure to monitor, scale, or fix
* Works without an engineer, PMs, marketers, ops leads can ship an Endpoint themselves
* Versioning, caching, and rate limiting are built in, not bolted on

## Objections

### "We already built our own analytics API"

**Follow-up:** How much engineering time goes into keeping it working? What happens when someone changes a query?

**Answer:** You've already proven the use case. Endpoints removes the maintenance treadmill. Versioning means query changes don't break callers, materialization means you're not running expensive queries on every request, and rate limiting is handled. Same outcome, one less thing to own.

### "This sounds like it needs a developer"

**Follow-up:** Walk them through saving an insight in PostHog.

**Answer:** If they can save an insight, they can ship an Endpoint. The demo is the best answer here and if you can demonstrate the MCP doing it all for you even better. A PM or marketer can go from query to production API.

### "We're thinking about Tinybird"

**Follow-up:** Where is your data right now, and what would you need to move it?

**Answer:** Tinybird is a great product if you need to build an analytics API on top of data that lives outside PostHog. If your data is already in PostHog, Endpoints gives you the same outcome, authenticated, cached, rate-limited HTTP endpoints, without a second tool, a data pipeline, or a separate bill. PostHog customers suitable for Endpoints will have data in PostHog already. With PostHog you can connect all your data sources easily, with Tinybird you need to build a custom pipeline for every data source.

### "Is it production-ready?"

**Answer:** Yes. 2,400 req/hr, materialized queries, configurable caching, versioning, parameterization. Beta customers ran customer-facing dashboards on it before GA. The reliability story is the same as the rest of PostHog.

## Selling to enterprise

Enterprise Endpoints conversations follow the same rules as the rest of PostHog: pricing is published, terms are clear, and we don't oversell.

The enterprise pitch is the data egress story. Large organizations often have PostHog deployed across multiple teams and use cases, but data still escapes via manual exports and one-off scripts. Endpoints replaces that pattern with something versioned, auditable, and self-serve — without requiring a data engineering queue.

The honest pitch: Endpoints wins when the data is already in PostHog and the team is tired of the work required to get it anywhere else. If a prospect's data isn't in PostHog, the right conversation is data pipelines and the data warehouse first.