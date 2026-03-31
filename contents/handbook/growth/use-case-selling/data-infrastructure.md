---
title: 'Data Infrastructure'
showTitle: true
hideAnchor: false
---
 
## What is the job to be done?
 
"Help me unify product data with business data and get it where it needs to go."
 
- Bring external data *into* PostHog from Stripe, HubSpot, Salesforce, databases, and other sources
- Combine PostHog event data with revenue data, CRM data, or other business data for unified analysis
- Query across product events and business data without building and maintaining custom ETL pipelines
- Export PostHog data to existing warehouses (Snowflake, BigQuery, Redshift) so it's part of the company's data stack
- Feed enriched data to downstream tools: BI platforms, ad platforms, CRMs, marketing tools
 
This is the "stickiness" use case. Once PostHog is part of a company's data infrastructure, receiving data from Stripe, HubSpot, and databases AND feeding data out to their BI layer, it becomes very hard to rip out. This also makes their product data more valuable as it is enriched with additional business context. Data infrastructure customers also tend to have the highest retention rates.
 
However, this is also the hardest use case to sell into. Data teams are skeptical of analytics tools playing in the data engineering space. Product maturity matters a lot here.
 
## What PostHog products are relevant?
 
- **[Data Warehouse](/docs/data-warehouse) (core)** — Bring external data into PostHog. Connect Stripe, HubSpot, Salesforce, Postgres, MySQL, Snowflake, BigQuery, and [many more sources](/docs/cdp/sources). Query across PostHog events and external data using HogQL. Build unified dashboards that combine product behavior with revenue, CRM, and business data.
- **[Data Pipelines / Batch Exports](/docs/cdp) (core)** — Send PostHog data out to external destinations. [Batch exports](/docs/cdp/batch-exports) to S3, Snowflake, BigQuery, Postgres, Redshift, Databricks, Azure Blob. [Realtime destinations](/docs/cdp/destinations) to Slack, HubSpot, Salesforce, ad platforms, and more. [Transformations](/docs/cdp/transformations) to clean, enrich, or filter data before it lands.
- **[Product Analytics](/docs/product-analytics)** — The query engine for unified data. Once external data is in the Data Warehouse, Product Analytics becomes the interface for querying across all of it. HogQL gives SQL access to everything. Dashboards combine product events with business metrics.
 
## Adoption path and expansion path
 
### Entry point
 
Usually **Data Warehouse** or **Batch Exports**. Two common patterns:
 
1. **Data out (Batch Exports first):** Data team wants to export PostHog event data to their existing warehouse (Snowflake, BigQuery, Redshift) so it can be queried alongside other business data in their BI tool. This is the "PostHog as a data source" entry point. They're not replacing their warehouse. They're adding PostHog data to it. Ideally, we want PostHog to be the hub of their data, but this is typically an indicator that they're beginning to think of their data holistically. 
2. **Data in (Data Warehouse first):** Data team (or product/other team) wants to bring external data *into* PostHog to enrich product analytics. "Show me retention by Stripe plan" or "Which HubSpot leads are actually active in the product?" requires combining PostHog events with external data. This is the strongest entry point because it keeps teams inside PostHog for analysis.

 
### Primary expansion path
 
**Data Warehouse (bring external data IN) → + Product Analytics (query unified data) → + Batch Exports (send PostHog data OUT)**

**The logic of each step:**

- Data Warehouse → Product Analytics: They've connected external data (Stripe, HubSpot, databases). Now they use Product Analytics (and HogQL) as the query interface for unified data. Dashboards combine product events with revenue data, CRM data, and more. PostHog becomes the single analytics interface.
- Product Analytics → Batch Exports: They're doing all their analysis in PostHog, but other teams or BI tools still need access to PostHog event data. Batch exports feed their warehouse so the rest of the org can benefit too.
 
### Alternate expansion paths
 
**Starting from Realtime Destinations:** They want to push PostHog events to downstream tools in real-time. Conversion events to ad platforms (Meta, Google Ads). User activity to CRM (HubSpot, Salesforce). Alerts to Slack. This pulls in Data Pipelines and naturally leads to "if we can push data out, can we pull data in?" which is the Data Warehouse.
 
**Starting from Product Analytics (HogQL power users):** Advanced analytics users writing HogQL queries hit the ceiling of PostHog-only data. They want to join against their Stripe data, their CRM data, or their database. Data Warehouse is the answer.
 
## Business impact of solving the problem
 
**This is the highest-stickiness use case.** When PostHog is both receiving data from Stripe/HubSpot/databases and feeding data out to Snowflake/BigQuery/BI tools, ripping it out means rebuilding multiple data pipelines. This creates deep infrastructure-level lock-in that goes beyond any single user or team.
 
**Data infrastructure customers have the highest retention rates.** Accounts with active batch exports and warehouse connections churn at significantly lower rates than analytics-only accounts. The integration depth creates switching costs that product satisfaction alone doesn't.
 
**However, this is the hardest use case to sell into.** Data teams are skeptical. They've built their stack around tools like Fivetran, dbt, Snowflake, and Looker. They see PostHog as an analytics tool, not a data infrastructure tool. Credibility with data engineers requires demonstrating real technical capability, not just talking about consolidation.
 
**The "lightweight warehouse" pitch resonates with early-stage companies.** Teams that don't yet have a Snowflake/BigQuery setup find PostHog's Data Warehouse attractive because it gives them warehouse capabilities (join external data, run SQL) without a separate warehouse vendor. For these teams, PostHog isn't replacing their warehouse. It *is* their warehouse.
 
## Personas to target
 
| Persona | Role Examples | What They Care About | How They Evaluate |
|---|---|---|---|
| Data Engineer | Data Eng, Analytics Eng, Data Platform | Pipeline reliability, query performance, schema flexibility, not maintaining custom ETL | "Is the sync reliable? Can I run complex joins? What's the query latency on large datasets?" |
| Data Team Lead | Head of Data, Director of Analytics, Data Lead | Tool consolidation, cost, team productivity, data governance | "Does this reduce our pipeline maintenance burden? What's the cost vs. Fivetran?" |
| Product Ops / BizOps | Product Ops, RevOps, BizOps | Unified view of product and business data, self-serve dashboards | "Can I see product usage next to Stripe revenue and HubSpot pipeline without asking the data team?" |
| Founder (early stage) | CTO, technical founder, first data hire | Not building a data warehouse yet. Wants unified analytics without a complex stack. | "Can I query my Stripe data alongside PostHog events without setting up Snowflake?" |
 
## Signals in Vitally & PostHog
 
### Vitally indicators this use case is relevant
 
| Signal | Where to Find It | What It Means |
|---|---|---|
| Active batch exports | `active_batch_exports` in Vitally traits | They're already exporting data. The Data Warehouse (bringing data in) is the natural next step, and they're likely not thinking of PostHog being their data warehouse. |
| Active external data schemas | `active_external_data_schemas` in Vitally traits | They've connected external data sources. They're using PostHog as a data platform, not just analytics. |
| High rows synced (30 day) | `rowsSyncedLast30DaysIfSendingData` | Significant data movement. Data Infrastructure is an active use case. |
| Customer mentions Fivetran, Snowflake, or "data warehouse" in notes | Vitally notes / conversations | Data team is involved. This use case may be relevant. |
| HogQL usage is high | Usage metrics | Power users writing SQL. They're likely to want to query across external data too, or have more complex analytics needs/capabilities. |
 
### PostHog usage signals
 
| Signal | How to Check | What It Means |
|---|---|---|
| Batch exports configured and running | Pipeline configuration | They're exporting data. Explore whether bringing data in (Data Warehouse) would add value. What are they doing with the PostHog data in the warehouse? |
| External data sources connected (Stripe, HubSpot, etc.) | Data Warehouse source list | Active Data Infrastructure use case. Look for expansion: more sources, more query complexity. |
| HogQL queries joining external data | Saved insights with warehouse tables | They're doing unified analysis. This is the power use case. Encourage more connections. |
| High realtime destination volume | Pipeline metrics | They're pushing events to downstream tools. Explore whether they need more destinations or more complex transformations. They may also be solving in point solutions when they could simplify in PostHog. |
 
## Command of the Message
 
### Discovery questions
 
- Where does your product data live today? How do you combine it with business data (revenue, CRM, etc.)?
- Do you have a data warehouse (Snowflake, BigQuery, Redshift)? How does PostHog data get there?
- When someone asks "what's our retention by Stripe plan?" or "which HubSpot leads are active in the product?", how long does it take to answer?
- How many custom ETL pipelines are you maintaining? How much engineering time goes into keeping them running?
- What tools do you use for data pipelines today? (Fivetran? Airbyte? Custom scripts?)
- Do you push PostHog data to any downstream tools? (BI, CRM, ad platforms)
- If you could query your Stripe/HubSpot/database data alongside PostHog events in one place, what questions would you ask first?
 
### Negative consequences (of not solving this)
 
- Product data and business data live in separate silos. Answering cross-domain questions requires custom ETL, manual exports or switching between multiple tools/dashboards
- Just as bad as difficult to answer questions - teams give different answers to the same question
- Data engineers spend time maintaining pipelines between PostHog and the warehouse instead of doing analysis
- "Which cohort of users drives the most revenue?" requires stitching data from PostHog, Stripe, and the CRM, which takes days instead of minutes
- PostHog events aren't in the warehouse, so BI dashboards that need product behavior data are stale or incomplete
- Conversion events don't flow back to ad platforms, so marketing can't optimize campaigns against real product data
 
### Desired state
 
- External data automatically flows into PostHog for enriched product analytics
- Product events, revenue data, CRM data, and database data queryable in one place
- Anyone can build a dashboard that combines product behavior with business outcomes
- No custom ETL pipelines to maintain between PostHog and the rest of the data stack
- PostHog data automatically flows to the warehouse for BI and downstream analysis
 
### Positive outcomes
 
- Deeper product analytics: join against revenue, CRM, and business data for richer insights
- Faster time-to-answer for cross-domain questions (retention by plan, revenue by feature, engagement by lead score)
- Reduced engineering time maintaining data pipelines
- External data available in PostHog for teams that prefer PostHog's analytics interface
- Account becomes deeply embedded in PostHog's ecosystem (high switching cost, low churn risk)
- PostHog data available in BI tools for teams that prefer Looker/Mode/Metabase
 
### Success metrics
 
**Customer-facing:**
 
- Cross-domain queries (product + business data) that previously took days now take minutes
- Pipeline maintenance burden decreases (fewer custom ETL jobs)
- More teams can self-serve analytics because the data is unified
- Every team is working from the same data
 
**TAM-facing:**
 
- External data sources connected grows (more data flowing in)
- HogQL queries increasingly reference warehouse tables (unified analysis happening)
- Account retention strengthens (infrastructure-level stickiness)
- Batch export volume grows (more data flowing out)
 
## Competitive positioning
 
### Our positioning
 
- **Query across everything with HogQL.** Join PostHog events with Stripe revenue data, HubSpot contacts, or your Postgres database in a single SQL query. No separate BI tool required for many use cases.
- **Built into the analytics platform.** The Data Warehouse isn't a separate product. It's integrated with Product Analytics, dashboards, cohorts, and every other PostHog feature. External data becomes first-class data.
- **Lightweight warehouse for early-stage teams.** Teams without Snowflake/BigQuery get warehouse capabilities as part of PostHog. No separate vendor, no separate setup.
- **Bidirectional data flow.** Data Warehouse brings external data *into* PostHog. Batch Exports and Pipelines push PostHog data *out*. Two-way integration with the customer's data stack, not just one direction.
 
### Competitor quick reference
 
| Competitor | What They Do | Our Advantage | Their Advantage |
|---|---|---|---|
| Snowflake / BigQuery | Cloud data warehouse | We have analytics built on top; no BI tool needed for product questions; simpler for teams that just need PostHog + business data | Real data warehouse: unlimited scale, advanced SQL, mature ecosystem, governance |
| Fivetran | Managed data pipelines (sources to warehouse) | We're the analytics platform AND the pipe; data stays in PostHog for analytics; simpler for early-stage teams | Far more source connectors; more mature data governance; enterprise-grade reliability |
| Census / Hightouch | Reverse ETL (warehouse to business tools) | We push data from PostHog directly, no warehouse intermediate step needed; simpler architecture | More destination integrations; audience management features; built for marketing/ops teams |
| Segment | CDP (collect events, route to destinations) | We're the analytics platform AND the pipe; no separate CDP needed | More destination integrations; more mature event collection; established in enterprise CDP workflows |
 
**Honest assessment:** We are not trying to replace Snowflake or BigQuery. For teams with a mature data stack (Fivetran + Snowflake + dbt + Looker), PostHog's Data Warehouse is a complement, not a replacement. Batch Exports feed PostHog data into their stack; Data Warehouse brings their data into PostHog for product-specific analysis. The full replacement pitch only works for early-stage teams that don't have a warehouse yet and want PostHog to serve double duty. Early stage teams may also have experience with the complexity of layering in data systems, so may be more open to centralizing tooling, and Batch Exports always allow teams to not feel vendor lock-in. Be calibrated about which accounts can realistically adopt this as infrastructure vs. a convenience feature.
 
## Pain points & known limitations
 
| Pain Point | Impact | Workaround / Solution |
|---|---|---|
| Data Warehouse query performance at very large scale | Teams with billions of rows in external sources may hit performance limits | PostHog's Data Warehouse is optimized for product analytics query patterns, not general-purpose warehousing. For very large datasets, batch exports to Snowflake/BigQuery may be more appropriate. |
| Source connector coverage doesn't match Fivetran | Some niche data sources may not be supported | Check [available sources](/docs/cdp/sources). For unsupported sources, the API and S3/GCS import paths can bridge the gap. |
| Data engineering teams may not trust PostHog as a warehouse | Credibility gap: "you're an analytics tool, not a data platform" | Don't oversell. Position as a complement to their existing stack (batch exports out, key sources in) rather than a full replacement. Demonstrate HogQL query capability with their actual data to build credibility. |
| Batch export latency may not meet real-time requirements | Teams needing sub-minute data freshness in their warehouse | Batch exports are periodic (hourly default). For real-time needs, use Realtime Destinations instead. Set expectations on latency during evaluation. |
 
## Getting a customer started
 
### What does an evaluation look like?
 
- **Scope:** Connect one external data source (usually Stripe or their primary database) to PostHog Data Warehouse. Set up one batch export to their warehouse if they have one. Build a dashboard that joins PostHog events with external data.
- **Timeline:** 1 to 3 days to connect sources and exports. 1 week to build meaningful unified dashboards.
- **Success criteria:** Can you query across PostHog events and external data in HogQL? Can you build a dashboard showing "retention by Stripe plan" or "engagement by CRM stage"? Is the batch export reliably delivering data to their warehouse?
- **PostHog investment:** Data Warehouse free tier covers 1M rows/month + free historical syncs. Batch Exports free tier covers 1M rows/month.
- **Key requirement:** They need API credentials for the external data sources they want to connect. For batch exports, they need write access to their warehouse.
 
### Onboarding checklist
 
- [ ] Connect primary external data source to [Data Warehouse](/docs/data-warehouse) (usually Stripe or primary database)
- [ ] Verify data is syncing correctly and queryable via HogQL
- [ ] Build a unified query: join PostHog events with external data (e.g., "retention by Stripe plan")
- [ ] Set up [batch export](/docs/cdp/batch-exports) to their warehouse (Snowflake, BigQuery, Redshift, S3)
- [ ] Verify batch export is running reliably with expected data freshness
- [ ] Configure at least one [Realtime Destination](/docs/cdp/destinations) if they need event data in downstream tools (Slack alerts, CRM sync, ad platform conversions)
- [ ] Build a "Unified Analytics" dashboard combining product events with business data
- [ ] Introduce the data team to HogQL if they're SQL-comfortable ([HogQL docs](/docs/product-analytics/sql))
- [ ] Identify additional data sources to connect (CRM, other databases, ad platforms)
 
## Cross-sell pathways from this use case
 
| If Using... | They Might Need... | Why | Conversation Starter |
|---|---|---|---|
| Batch Exports only | Data Warehouse (bring data in) | They're pushing PostHog data out. Bringing business data in would let them do unified analysis in PostHog directly. | "You're exporting PostHog data to Snowflake. What if you could bring your Stripe data *into* PostHog and skip the context-switch?" |
| Data Warehouse (Stripe connected) | Revenue Analytics | They've connected Stripe data. Revenue Analytics gives them pre-built MRR, LTV, and churn dashboards. | "You've got Stripe connected. Have you seen Revenue Analytics? It gives you MRR, churn, and LTV dashboards out of the box." |
| Data Pipelines to CRM | Growth & Marketing | They're pushing data to HubSpot/Salesforce. The growth team could use more of the marketing analytics stack. | "You're syncing data to your CRM. Has the marketing team seen Web Analytics and Marketing Analytics for attribution?" |
| Data Warehouse + Product Analytics | Product Intelligence (for the product team) | They're doing unified data analysis. The product team should be using the full analytics suite. | "Your data team is doing advanced queries. Are your PMs using funnels, retention, and session replay for product decisions?" |
| Data team in PostHog | Any use case for other teams | Data team is in PostHog and advocates for it. Expand to product, engineering, or growth. | "Your data team loves PostHog. Which other teams could benefit? Product? Engineering? Growth?" |
 
## Internal resources
 
- **Data Warehouse docs:** [Data Warehouse](/docs/data-warehouse) · [Sources](/docs/cdp/sources) · [HogQL](/docs/product-analytics/sql)
- **Data Pipelines docs:** [CDP overview](/docs/cdp) · [Batch exports](/docs/cdp/batch-exports) · [Realtime destinations](/docs/cdp/destinations) · [Transformations](/docs/cdp/transformations)
- **Revenue Analytics docs:** [Getting started](/docs/revenue-analytics/start-here) · [Dashboard](/docs/revenue-analytics/dashboard)
- **External data source guides:** [Stripe](/docs/cdp/sources/stripe) · [HubSpot](/docs/cdp/sources/hubspot) · [Salesforce](/docs/cdp/sources/salesforce) · [Postgres](/docs/cdp/sources/postgres)
- **Batch export guides:** [S3](/docs/cdp/batch-exports/s3) · [Snowflake](/docs/cdp/batch-exports/snowflake) · [BigQuery](/docs/cdp/batch-exports/bigquery)

 
## Appendix: Company archetype considerations
 
| Archetype + Stage | Framing | Key Products | Buyer |
|---|---|---|---|
| AI Native — Early | "You don't need a data warehouse yet. PostHog connects to Stripe and your database, so you can query everything in one place without setting up Snowflake." Lightweight warehouse pitch. | Data Warehouse, Product Analytics (HogQL) | CTO, founding engineer, first data hire |
| AI Native — Scaled | "You're scaling and your data team is building a proper stack. PostHog batch exports feed your warehouse, and Data Warehouse brings key business data in for product analytics." Complement, not replace. | Data Warehouse, Batch Exports, Pipelines | Data team lead, analytics engineer |
| Cloud Native — Early | "Same as AI Native early. PostHog as the lightweight warehouse for teams that don't want a separate data stack yet." | Data Warehouse, Product Analytics (HogQL) | CTO, first data hire |
| Cloud Native — Scaled | "Your data stack is mature. PostHog fits in as both a data source (batch exports to Snowflake) and an analytics destination (Data Warehouse pulls in Stripe/HubSpot). No custom ETL needed." | Batch Exports, Data Warehouse, Pipelines | Data engineering team, analytics engineering team |
| Cloud Native — Enterprise | "Multiple teams, multiple data sources, complex pipeline requirements. PostHog integrates bidirectionally with your existing stack and gives product/growth teams self-serve analytics over unified data." Governance, reliability, and scale matter here. | Full Data Infrastructure stack + Enterprise package | Head of Data, Director of Analytics, Data Platform Lead |

## Appendix: PostHog data maturity

| Stage | Primary Tool | Data Sources | Who Owns | PostHog Position |
|---|---|---|---|---|
| 1 | Point solutions (GA, prod DB) | Scattered | Nobody | Not yet adopted |
| 2 | PostHog | Product events | Prod/Eng | Primary analytics |
| 3 | PostHog + Data Pipelines | Product + Business | Cross-functional | Hub for analytics |
| 4 | PostHog + Data Pipelines + Warehouse | Everything | Cross-functional | Source of truth |
| 5 | PostHog + Batch Exports + External warehouse | Everything | Data Team | Source + destination |

