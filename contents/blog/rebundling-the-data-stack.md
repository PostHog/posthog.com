---
title: "We unbundled the data stack. Now everyone's rebundling it."
date: 2026-11-03
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - lizzie-epton
ogImage: generated
category: General
tags:
    - Data warehouse
seo:
    metaTitle: "We unbundled the data stack. Now everyone's rebundling it."
    metaDescription: "Fivetran and dbt Labs merged, and Snowflake and Databricks are buying up the stack. Here's how to keep your options open as the data stack rebundles."
---

On 1 June 2026, Fivetran and dbt Labs [finished merging](https://www.getorchestra.io/guides/fivetran-dbt-merger-what-it-means-for-the-modern-data-stack). The two logos that defined the modern data stack now share a CEO and [about $600M in revenue](https://rudderstack.com/blog/fivetran-dbt-merger-modern-data-stack).

This is an interesting move if you remember 2021 and the dawn of the modern data stack, which promised you could pick the best tool for every layer. The two layers with the biggest monopoly on their part of the stack have now picked each other.

Plenty of people have called this the death of the modern data stack, but I think that's a bit dramatic. Software categories unbundle, sprawl, then rebundle. Data tools have just reached the rebundle step.

What matters now is who holds the bundle, and how tightly you're locked into it.

## A brief history of the modern data stack

Unbundling made sense in 2021. Cloud warehouses made storage cheap, so teams loaded everything first and transformed it later. That's ELT, and it reshaped the way data pipelines were built to allow for a fragmented stack.

After standalone ELT tools came modeling, orchestration, reverse ETL, observability, catalogs, semantic layers and metrics stores. Around each layer sprung a host of startups, and over the last five years, the main players have emerged.

Each tool ultimately drove compute to a warehouse, and the warehouse's sales team brought it to customers. The more the warehouse sold, the faster every other tool in the stack could grow.

But in 2022 the Federal Reserve started raising rates to fight inflation, and [by mid-2023 they were above 5%](https://www.benzinga.com/economics/macro-economic-events/23/07/33400037/fed-raises-interest-rates-to-5-5-the-highest-since-early-2001). Venture funding dropped sharply from its 2021 peak, and investors started rewarding efficiency instead of growth. Finance teams started asking what all these tools returned and which could be cut or consolidated into a single tool with a lower price tag.

## Fragmentation frustrated data professionals

The Modern Data Company [surveyed 232 senior data professionals](https://www.accessnewswire.com/newsroom/en/computers-technology-and-internet/new-report-from-the-modern-data-company-reveals-how-data-architec-1063545) in late 2024. They found that seven in ten juggle five to ten tools every day. 85% rank integrating them as a top-three challenge, with 63% of respondents spending over a fifth of their time on pipeline maintenance.

Now picture who's doing that maintenance. Metabase's [community survey](https://discourse.metabase.com/t/the-metabase-community-data-stack-report-is-here/260892) found most data teams have one to three people, even at big companies, which is an incredibly small team. They also found people [rate their individual tools higher](https://metabase.com/blog/metabase-community-data-stack-report-2025-key-analysis) than their stack as a whole. This suggests data professionals think each layer of the stack works well on its own, but the constant need to maintain integrations causes disillusionment with the system.

Pricing makes the ten-tool stack even more confusing. Each tool is charged based on something different: rows, credits, seats, model runs. Nobody can forecast the total, and surprise bills are commonplace.

## Everyone's rebundling to protect their piece of the pie

Rebundling is now coming from two directions at once:

### Individual vendors are buying more layers of the stack

The biggest example of this happening is Fivetran. In about 13 months, Fivetran have assembled every layer of the stack except compute:

- **May 2025:** bought [Census](https://www.fivetran.com/press/fivetran-signs-agreement-to-acquire-census-delivering-the-first-end-to-end-data-movement-platform-for-the-ai-era), the reverse ETL tool. It's now Fivetran Activations.
- **September 2025:** bought Tobiko Data, the company behind [SQLMesh](https://peliqan.io/blog/dbt-fivetran-merger-explained/).
- **October 2025:** announced the dbt Labs merger, which closed in June 2026.

### Warehouses are expanding their offering

Snowflake launched [Openflow](https://www.infoworld.com/article/4000742/snowflake-launches-openflow-to-tackle-ai-era-data-ingestion-challenges.html) in June 2025, a native ingestion service built on Apache NiFi. Databricks has [Lakeflow Connect](https://events.databricks.com/emea-daiwt), its own connectors for SaaS apps and databases.

Then they went after your app database too. Databricks bought Neon, a serverless Postgres company, for [about $1B](https://aimresearch.co/?p=16024) in May 2025. Three weeks later, Snowflake bought Crunchy Data for about $250M.

Both camps want to own every layer of your stack. Once one company owns it all, leaving their stack will mean rebuilding everything. That makes you a customer who can't walk away, and a customer who can't walk away pays whatever the renewal says.

## A simpler stack shouldn't come with caveats

We like rebundling. Fewer contracts and fewer late night hunts for whichever tool broke, and nobody will miss the context switching that comes with five tools.

But what's the cost? Your stack might be getting simpler by getting harder to leave.

You should be able to cut tools without signing up to someone's whole platform and paying for features that you didn't want to be included in the deal. Simplicity you can't walk away from is just lock-in with a bigger dashboard.

That's the philosophy we built our ELT tool with. It syncs your data into whichever warehouse you already run. If you'd rather not run one, it syncs into PostHog's warehouse instead, and if you change your mind, you can add an [ELT destination](/docs/data-pipelines/destinations/elt-destinations) to send the same tables to your own warehouse. Adding one starts a full resync that's billed per row, so check your row counts first. You don't need any other PostHog product to use it, it just does what it says on the tin.

The pricing doesn't trap you either. Historical syncs are free for the first seven days after you connect a new source (up to 100M rows on the free plan, unlimited on paid), and the [first 1M rows each month are free](/data-pipelines/pricing), then it's $0.000015 a row, dropping to $0.000001 at volume. There's no per-connection minimum.

## To bundle or not to bundle: how to keep your options open

You're probably being bundled whether you planned for it or not; there are pros and cons to both. Here's what to know to keep your options open to make sure you get the best deal.

1. **Read your renewal:** Bundles change pricing. Fivetran [moved to per-connection billing](https://weld.app/blog/fivetran-pricing) in March 2025. In January 2026 it added a $5 minimum per connection. Deletes and history-mode changes [now count as billable rows](https://www.getorchestra.io/guides/fivetran-pricing) too.
2. **Count your hops:** Pick one real question that you need answering on a regular basis and trace it from source to answer. Every tool it passes through costs you time, money or both.
3. **Keep an exit open:** Favor open formats and tools you could run yourself. Fivetran and dbt Labs say [dbt Core stays open](https://www.getorchestra.io/guides/fivetran-dbt-merger-what-it-means-for-the-modern-data-stack) under its current license. Check the same for everything you depend on.
4. **Price the exit:** Before you add a tool, work out how you'd take it out. If the answer is a six-month migration, you'd never do it; you'd just keep paying the price increases.
5. **Model a bad month:** Row-based pricing means your bill month to month is unpredictable. Backfills, schema changes and high-churn tables all land on the bill. Price the worst-case-scenario month, and no bill will arrive unexpectedly.

## Pick your bundle on purpose

With the market moving in the direction of rebundling, you can't opt out, but you can choose whose bundle you sit in.

If you want yours to stay swappable, [here's how our ELT tool works](/data-pipelines) and [what it costs](/data-pipelines/pricing). You can backfill your history alongside your current tooling for 7 days without paying for those historical rows.
