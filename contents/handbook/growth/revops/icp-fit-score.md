---
title: ICP fit score
sidebar: Handbook
showTitle: true
---

We score every work-email signup on how well it matches [who we build for](/handbook/who-we-build-for): AI-pilled software teams at any scale, backed by leading investors or real revenue. This is the **ICP fit score**. "Fit" because it answers exactly one question: does this company match our definition?

The fit score is **definitional, not a revenue prediction**. A four-person seed-stage AI startup paying us $50/month can score high, and a large non-software enterprise paying us a lot can score low. A separate expected-revenue score (planned) will answer "what is this signup likely to be worth?" The two are consumed together as a fit × revenue quadrant and will disagree on purpose for some accounts.

## Where it lands

The score is stamped on the **organization** in our internal PostHog project as three properties, written at signup and refreshed whenever the org is re-enriched:

| Property | Values |
|---|---|
| `icp_fit_status` | `scored` / `disqualified` / `insufficient_data` / `not_found`. Check this first: a score is only current when the status is `scored` or `disqualified` |
| `icp_fit_score` | 0–100. Never read a missing score as 0 |
| `icp_fit_version` | The formula version the score was computed under (e.g. `v0.5`) |

An organization with no `icp_fit_status` at all was never evaluated. Personal-email signups are not enriched, so they never get one; that is different from `not_found`.

Not to be confused with the legacy `icp_score` property: that is the old Clay-era formula on a different scale, still written in parallel until its existing consumers (cohorts, flags, scanners) migrate to `icp_fit_score`. Thresholds do not translate between the two; roughly, legacy `> 8` corresponds to fit `> 40`.

## How it works

Each signup's company is looked up in [Harmonic](https://harmonic.ai) by the domain of the work email, and the profile is scored in three steps. This page describes the intent and shape of `v0.5`. The exact rules, thresholds, and Harmonic fields live in [`fit_score.py`](https://github.com/PostHog/posthog/blob/master/products/growth/backend/enrichment/fit_score.py), and every score carries the version that produced it.

### 1. Hard disqualifiers: score 0, with a reason code

- Actual schools and universities. This keys off Harmonic's company type, not its market tags, so an ed-tech startup selling to schools is not caught.
- Signups who told us they are a student.

### 2. Insufficient data: no numeric score

A profile that matched but has no headcount, no funding, no tags, and no web traffic gets `insufficient_data` instead of a number. These are mostly brand-new companies. We retry them automatically over the following months rather than treating "no data yet" as "not ICP".

### 3. Weighted components, summing to 100

| Component | Points | What it reads |
|---|---|---|
| **Traction** | 35 | Monthly web traffic level (up to 15) plus 90-day traffic growth (up to 20). Growth only counts above a minimum traffic base, because small-base percentages are noise |
| **Capital** | 30 | Total funding tier (up to 20; a raise Harmonic knows exists but not the amount gets the base tier), plus 10 for a quality investor: a fund on our curated list, any YC batch, or AI Grant. Capped at 30 |
| **AI-pilled** | 15 | Any of: an AI tag, AI language in the company description, or a `.ai` signup domain |
| **Headcount growth** | 10 | 180-day headcount change, by percentage or by net hires |
| **Software relevance** | 10 | Engineering headcount present (10), else software-product tags or software language in the description (7) |

### Metadata flags (don't affect the score)

| Flag | Meaning |
|---|---|
| `low_confidence` | Scored from at most one of the four core signals (headcount, traffic, funding, tags). Read this as "unknown", not "bad" |
| `agency_flag` | Consultancy or agency. Qualifies on its merits, but downstream teams may route differently |
| `nonprofit_flag` | Non-profit |
| `quality_investor` | Backed by a fund on the curated list, YC, or AI Grant |

### Deliberate design choices

- **Missing fields score 0 within a component**, because no enrichment footprint correlates strongly with being outside the ICP. Fully empty profiles become `insufficient_data` instead, so "no data" is never silently confused with "evaluated and low".
- **The filters live in two curated lists**: the [tag lists](https://docs.google.com/spreadsheets/d/1PSev2WdmPPkXU8VPDOb_RwbV0tidj3I4I9L30_cnbWM/edit) (which Harmonic tags count as software-relevant, AI-pilled, or quality capital; internal) and the [quality-investor list](https://docs.google.com/spreadsheets/d/1aFfP_njXD8fy6XhJ2i00VPC1sonnqPPqB9kPx6Q5ypQ/edit) (internal). RevOps owns both and reviews them quarterly. A sheet edit reaches production only when it is synced into a new versioned list config, and each score records which list version it used. YC batches are matched by tag type, so future batches qualify automatically.
- **Growth windows are horizon-tested**: 90 days for traffic (365 days discriminates no better than chance), 180 days for headcount (90 days is one-hire noise on small teams).

## How we validated it

We validated the score as a *definition*, not a predictor: companies that are obviously who we build for should score high, and obvious non-fits should score low.

- **Customer sanity check**: median scores rise monotonically with customer value tiers. This is expected directionally, though we deliberately didn't tune weights against revenue, since this isn't an MRR predictor.
- **Full-cohort run**: across two weeks of work-email signups (about 9.7k), 69% received a score, about 25% were `insufficient_data`, 5% weren't found, and 1% were disqualified. In production the `insufficient_data` share runs higher (about 40% of evaluated signups in August 2026). Threshold choice is therefore a downstream-capacity decision, not an accuracy one.

## Known limitations

- Enrichment coverage is weaker outside the US.
- Generic company domains occasionally match the wrong company, so spot check before high-touch outreach.
- New companies accrete enrichment data over time. Scores are a snapshot; `insufficient_data` and `not_found` signups are retried automatically over the following months.
