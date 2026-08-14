---
title: ICP scoring
sidebar: Handbook
showTitle: true
---

We score every signup on how well it matches [who we build for](/handbook/who-we-build-for): AI-pilled software teams at any scale, backed by leading investors or real revenue.

The ICP score is **definitional, not a revenue prediction**. A four-person seed-stage AI startup paying us $50/month can score high, or a large non-software enterprise paying us a lot can score low. The score tells us whether a signup is who we build for, not whether they'll be a big account next quarter.

## How it works

Each signup's company domain (from their work email) is enriched via [Harmonic](https://harmonic.ai) (`POST /companies?website_domain=<domain>` with `enrich_missing_company=true`), and the returned company profile is scored 0–100 in three steps. Field paths below refer to that Harmonic response, so any component can be reconstructed or reused independently.

### 1. Hard disqualifiers → score 0, with a reason code

| Rule | Source field |
|---|---|
| Actual school/university | Harmonic `company_type == "SCHOOL"` |
| Self-identified student | `role_at_organization == "student"` on our `user signed up` event |

### 2. Insufficient data → no numeric score

A profile that matched but has **all four** of these empty gets `insufficient_data` instead of a number: `headcount`, `funding.funding_total` / `funding.investors`, `tags_v2`, and `traction_metrics.web_traffic.latest_metric_value`. These are mostly brand-new companies. We re-enrich them after 30–60 days rather than treating "no data yet" as "not ICP".

### 3. Weighted components (sum to 100)

| Component | Pts | Rule | Harmonic source fields |
|---|---|---|---|
| **Traction** | 35 | Traffic level: ≥100k monthly visits → 15, ≥10k → 10, ≥1k → 5. Growth (only when level ≥5k, else small-base % is noise): 90-day change ≥+40% → 20, ≥+15% → 12, >0 → 5 | `traction_metrics.web_traffic.latest_metric_value`; `traction_metrics.web_traffic["90d_ago"].percent_change` |
| **Capital** | 30 | Funding tier: ≥$10M → 20, ≥$2M → 14, >$0 *or* undisclosed-but-exists → 8. Quality-investor bonus +10; capped at 30 | `funding.funding_total`; `funding_attribute_null_status == "EXISTS_BUT_UNDISCLOSED"`; bonus from `funding.investors[].name` matched against a curated investor list, or `tags_v2` entries of type `YC_BATCH` / the AI Grant `ACCELERATOR` tags |
| **AI-pilled** | 15 | Any of: AI tag, AI keyword in description, or `.ai` domain | `tags_v2[].display_value` on a curated AI list (e.g. "Artificial Intelligence", "Developer Operations & AI Building Tools", "Chatbots, Assistants, & AI Search"); regex over `description`; signup domain TLD |
| **Headcount growth** | 10 | 180-day change ≥+15% → 10, ≥+5% *or* ≥3 net hires → 6, >0 → 3 | `traction_metrics.headcount["180d_ago"].percent_change` and `.change` (absolute) |
| **Software relevance** | 10 | Engineering headcount present → 10; software-product tags or software keywords in description → 7; neither → 0 | `traction_metrics.headcount_engineering.latest_metric_value`; `tags_v2[].display_value` on a curated software list; regex ("software", "platform", "API", "SaaS", …) over `description` |

### Metadata flags (don't affect the score)

| Flag | Meaning | Source |
|---|---|---|
| `low_confidence` | Scored from ≤1 of the four core signals. Read this as "unknown", not "bad" | count of non-empty: headcount, traffic, funding, tags |
| `agency_flag` | Consultancy/agency qualifies on its merits, but downstream teams may route differently | `tags_v2` contains "Consulting", "Technology & Digital Consulting", or "Management & Strategy Consulting" |
| `nonprofit_flag` | Non-profit | `tags_v2` contains "Non-Profit & Community Organizations" |
| `quality_investor` | Backed by a fund on the curated list, YC, or AI Grant | see Capital sources |

### Deliberate design choices

- **Missing fields score 0 within components** no enrichment footprint correlates strongly with being outside the ICP, but fully-empty profiles become `insufficient_data`, so "no data" is never silently confused with "evaluated and low".
- **The filters live in two curated lists**: the [tag lists](https://docs.google.com/spreadsheets/d/1PSev2WdmPPkXU8VPDOb_RwbV0tidj3I4I9L30_cnbWM/edit) (which `tags_v2` values count as software-relevant, AI-pilled, or quality-capital — internal) and the [quality-investor list](https://docs.google.com/spreadsheets/d/1aFfP_njXD8fy6XhJ2i00VPC1sonnqPPqB9kPx6Q5ypQ/edit) (internal). RevOps owns both and reviews them quarterly. YC batches are matched by tag *type* (`YC_BATCH`), so future batches qualify automatically.
- **Growth windows are horizon-tested**: 90d for traffic (365d discriminates no better than chance), 180d for headcount (90d is ±1-hire noise on small teams).

## How we validated it

We validated the score as a *definition*, not a predictor: companies that are obviously who we build for should score high, and obvious non-fits should score low.

- **Customer sanity check**: median scores rise monotonically with customer value tiers. This is expected directionally, though we deliberately didn't tune weights against revenue (since this isn't an MRR predictor score)
- **Full-cohort run**: across two weeks of all work email signups (~9.7k), 69% receive a score, ~25% are `insufficient_data`, ~5% aren't found, ~1% disqualified. Threshold choice is therefore a downstream-capacity decision, not an accuracy one.

## Known limitations
- Current enrichment coverage is weaker outside the US.
- Generic company domains occasionally match the wrong enrichment source, worth a spot check before high-touch outreach.
- New companies accrete enrichment data over time. These scores are a snapshot, and `insufficient_data` signups will be re-enriched.
