---
title: Per-product cost & margin analysis
sidebar: Handbook
showTitle: true
---

Understanding your product's infrastructure costs helps you make pricing decisions, contextualize growth reviews, and catch problems early. This guide covers how to build per-product cost allocations.

## Why this matters

As products scale, margins matter. A product with healthy margins can afford aggressive pricing; one with tight margins needs to be more careful. You can't know which you're in without understanding costs.

Cost visibility also helps you:
- Spot inefficiencies (why is this component 3x more expensive than expected?)
- Measure engineering wins (did that optimization actually save money?)
- Make pricing decisions (can we afford a price cut?)
- Catch cost spikes before they become problems

## When to do this

This makes sense for:
- Products with product market fit
- Products with meaningful revenue
- Products with non-trivial infrastructure (storage, compute-heavy)
- Products where you're considering pricing changes

For early-stage products, don't bother. Ship first, optimize later.

## The process

### 1. Map your architecture

Before talking to infra, sketch out what your product actually uses.

**Write path:** How does data get in?
- What services process incoming data?
- What queues buffer it?
- Where does it get stored?

**Read path:** How does data get back to users?
- What services handle queries?
- What databases get hit?

**Storage:** Where does data live?
- S3 buckets
- ClickHouse tables
- Redis/caches
- Postgres

You don't need to be perfect. The infra team will validate. But a rough diagram saves time.

### 2. Understand the cost buckets

Infrastructure costs fall into two types:

| Type | What it means | Examples | How to allocate |
|------|---------------|----------|-----------------|
| **Direct** | Tagged specifically for your product | Product-specific k8s nodepools, dedicated S3 buckets | 100% to your product |
| **Shared** | Used by multiple products | Load balancers, reverse proxies, shared caches | Proportional (e.g., 20% of traffic = 20% of cost) |

Direct costs are easy. Shared costs require estimating your product's share of usage.

### 3. Work with infra on tagging

Reach out to #team-infrastructure to kick off the process – they can help you estimate your product's traffic share and navigate the tooling.

We use a FinOps tool for cost allocation. The infrastructure team sets up allocation tags that group AWS resources by product/function.

**What you bring:**
- Your architecture diagram
- List of services that should be allocated to your product
- An engineer who can validate the list is complete

**What infra does:**
- Verifies which resources are already tagged
- Identifies gaps (resources that should be allocated but aren't)
- Sets up allocation rules
- Creates reports you can pull

**Expect iteration.** First allocations are rarely complete. Common gaps:

- Inter-AZ data transfer (network costs between availability zones)
- Shared infrastructure not proportionally allocated
- Read-path resources missing (easy to focus only on write path)

### ClickHouse costs (separate process)

If your product queries ClickHouse, you'll need to work with #team-clickhouse to get query cost attribution. This is separate from FinOps tagging.

ClickHouse costs are attributed by analyzing `query_log` to see which queries belong to your product. The ClickHouse team can help set up a query or dashboard to track this.

For some products (like Session Replay), ClickHouse query costs are a small percentage of total – queries are lightweight (list/fetch metadata). For analytics-heavy products, ClickHouse costs will be a much larger share.

### 4. Interpret the tags

The FinOps tool organizes costs using allocation tags. Here's how to think about them:

**Product-specific tags** (direct costs)

- These capture resources dedicated to your product

- Example: a "session replay" tag might include capture services, message queues, and S3 storage

- Use these as-is – 100% goes to your product

**Shared infrastructure tags** (need a proxy)

- These capture resources used by everyone

- Example: an "ingress" tag might include load balancers and reverse proxies for all products

- You need to estimate your product's share (e.g., "my product is ~20% of traffic, so allocate 20% of ingress costs")

**Network transfer tags**
- Inter-AZ transfer costs show up separately from compute
- Filter these tags to your product's services to get direct network costs

When pulling reports, make sure you're not double-counting. If you select multiple tags, check whether they overlap.

### 5. Build the cost model

Once you have the cost data, build a simple model for unit economics.

**Get the totals:**
- Total cost from FinOps tool (direct + allocated share of shared)
- Total volume from billing tables (recordings, events, whatever your unit is)

**Calculate unit economics:**
```
cost_per_unit = total_cost / total_volume
revenue_per_unit = total_revenue / total_volume
margin = (revenue_per_unit - cost_per_unit) / revenue_per_unit
```

**Break down by component** (optional but useful):
```
cost_per_unit = compute_cost/volume + (storage_rate × avg_size × retention_period)
```

This helps you understand what drives costs. For storage-heavy products, storage might be 50%+ of costs. For compute-heavy products, compute dominates.

### 6. Document your assumptions

Every cost model has assumptions. Write them down so future-you (or someone else) understands what's in vs out.

Common things to document:
- What's included in "direct" costs
- What proxy you used for shared costs (and why)
- How you calculated volume (billable units? ingested units?)
- Retention assumptions for storage costs
- What's explicitly NOT included

### 7. Set up monitoring

Once your allocation is stable, set up alerts:
- Total product cost: alert if week-over-week change > 15%
- Individual components: alert if WoW change > 25%

You want to catch:
- Runaway cost increases
- Broken tagging (cost dropped 50%? probably a bug)
- Optimization wins (did that change save money?)

### 8. Add to growth reviews

Include margin metrics in your growth reviews:

| Metric | Notes |
|--------|-------|
| Total cost | From FinOps tool |
| Cost per unit | Total cost / volume |
| Gross margin | (Revenue - Cost) / Revenue |
| Cost trend | MoM change |

Healthy products have stable or improving margins as they scale. If margins are declining, investigate.

## What to expect

**Timeline:** 2-4 weeks to get a reliable allocation, depending on how well-tagged your resources are.

**Accuracy:** First pass is typically 80-90% complete. Shared resources and edge cases take time. Directionally correct is fine; perfect is not required.

**Maintenance:** Update allocations when architecture changes. New services, new storage backends = ping infra.

## Common mistakes

- **Ignoring shared infrastructure.** Your product uses load balancers, proxies, and other shared resources. If you only count dedicated resources, you're understating costs.

- **Forgetting network costs.** Inter-AZ data transfer is easy to miss. It can be 5-10% of total costs.

- **Expecting precision.** This is cost allocation, not accounting. You're trying to understand rough margins and trends, not get to the penny.

## Worked example

See the [Session Replay unit economics RFC](https://github.com/PostHog/requests-for-comments-internal/pull/964) for a complete example of this process applied to a real product.

## Contacts

- **Infrastructure / cost tooling:** #team-infrastructure
- **ClickHouse cost attribution:** #team-clickhouse
- **Billing data:** Billing team

## Links

- [Per-product growth reviews](/handbook/product/per-product-growth-reviews)