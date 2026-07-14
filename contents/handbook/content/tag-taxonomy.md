---
title: Tag taxonomy (proposal)
sidebar: Handbook
showTitle: true
---

This is a working reference for cleaning up the tags used across our editorial content (blog, newsletter, founders, product engineers) and tutorials. Over time our `tags:` have drifted – the same concept exists under several spellings (`AI Observability` vs `ai-observability`), casings (`Growth engineering` vs `Growth Engineering`), and plurals (`session replay` vs `session replays`).

The goal here is to **agree on a canonical list** before we mass-edit post front matter. Nothing below has been applied yet – this is for review.

<CalloutBox icon="IconInfo" title="How to read this" type="fyi">
The numbers in parentheses are how many posts currently use that exact tag string. They're a snapshot and will drift as new posts are published.
</CalloutBox>

## How tags work today

Tags come from the `tags:` field in each post's front matter, e.g.:

```yaml
tags:
  - Culture
  - People
```

There are **two separate tag namespaces**:

- **Editorial** – `contents/blog`, `contents/newsletter`, `contents/founders`, `contents/product-engineers`. These share the same reader ("Edition") and one tag namespace. **65 distinct tags across ~836 uses.** Convention is roughly **sentence case** (`Session replay`, `Feature flags`).
- **Tutorials** – `contents/tutorials`. A separate, **lowercase** taxonomy (`product analytics`, `feature flags`), partly enumerated in `src/components/Tutorials/constants/tags.tsx`. **46 distinct tags across ~381 uses.**

Blog posts also have a separate `category:` field. That is a *different* taxonomy from `tags:` and is out of scope for this document.

## Proposed rules

1. **One canonical string per concept.** Pick one spelling and merge the rest into it.
2. **Sentence case for editorial tags**, matching our [style guide](/handbook/content/posthog-style-guide) – `AI observability`, not `AI Observability`. Proper nouns keep their casing (`ClickHouse`, `DuckDB`, `PostHog news`, `Y Combinator`).
3. **Lowercase for tutorials tags** – keep the existing tutorials convention; just remove duplicates within it.
4. **No plurals-vs-singular splits** – pick one (`Session replay`, not both).

## Proposed editorial merges

### Unambiguous duplicates (casing / plural / format only)

| Current variants | → Canonical |
|---|---|
| `Growth engineering` (7) + `Growth Engineering` (1) | **Growth engineering** |
| `Inside PostHog` (7) + `Inside Posthog` (1) | **Inside PostHog** |
| `AI Observability` (4) + `ai-observability` (2) | **AI observability** |
| `data warehouse` (2) + `Data warehouse` (1) | **Data warehouse** |

### Semantic near-duplicates

| Current variants | → Canonical |
|---|---|
| `Ops & finance` (8) + `Ops` (1) + `Finance & ops` (1) | **Ops & finance** |

### Sentence-case normalization

Tags whose only issue is title-casing a non-proper-noun:

- `Customer Analytics` (1) → **Customer analytics**
- (plus `Growth Engineering` and `AI Observability`, already covered above)

### Judgment calls (need a decision)

These are defensible either way – flagged for discussion, not yet decided:

- **`AI` (10) + `LLM` (5) + `AI observability` (4)** – keep all three, or fold `LLM` into `AI`?
- **`Feature flags` (7) + `Feature management` (8)** – one concept or two?
- **`Founders` (51) + `Being a founder` (14)** – merge or keep distinct?
- **Low-value singletons** – likely retire or reassign: `Blog`, `Data`, `General`, `Support`, `Hardware`, `YouTube`, `Lifecycle messaging`.

### Full current editorial tag list

By usage count:

```
Comparisons 80        Feature management 8    Startups 4
Product updates 79    Ops & finance 8         CEO diaries 3
Product engineers 60  Feature flags 7         Logs 3
Engineering 55        Growth engineering 7    Workflows 3
Founders 51           Inside PostHog 7        ai-observability 2
Release notes 50      User research 7         data warehouse 2
Guides 45             Launch week 6           DuckDB 2
Culture 38            Privacy 6               Fundraising 2
Product 36            Revenue 6               General 2
People 30             Sales & CS 6            Session replay 2
Growth 24             LLM 5                   Surveys 2
Marketing 24          AI Observability 4      + 18 singletons:
Explainers 22         Offsites 4              Alerts, Blog, Customer Analytics,
Being a founder 14    Open source 14          Data, data pipelines, Data warehouse,
Product analytics 13  Product metrics 11      Endpoints, Error tracking, Finance & ops,
ClickHouse 12         Product-market fit 11   Growth Engineering, Hardware, Hiring,
Y Combinator 11       AI 10                   Infrastructure, Inside Posthog,
Experiments 10        PostHog news 10         Lifecycle messaging, Ops, Support, YouTube
```

## Proposed tutorials merges

Keep the lowercase convention; fix duplicates within it.

| Current variants | → Canonical |
|---|---|
| `product os` (24) + `product-os` (1) | **product os** |
| `session replay` (18) + `session replays` (1) | **session replay** |

Also worth aligning with the enumerated list in `src/components/Tutorials/constants/tags.tsx` so every tag used in a tutorial has a matching entry there.

### Full current tutorials tag list

By usage count:

```
product analytics 57   trends 8         user paths 2
feature flags 50       actions 7        zapier 2
configuration 32       AI Observability 6  subscriptions 2
experimentation 31     data warehouse 6    funnels 2
product os 24          toolbar 4        heatmaps 2
surveys 19             cdp 4            + 14 singletons:
session replay 18      data management 4   site-apps, lifecycle, Automation,
events 17              cohorts 3           Tutorials, stickiness, retention,
insights 16            error tracking 3    filters, settings, group analytics,
persons 11             Workflows 2         MCP, product-os, session replays,
sql 10                 sessions 2          experiments, A/B testing
web analytics 9        AI 2                DeskHog 2
apps 8                 dashboards 2
```

Note tutorials also mixes cases (`AI Observability`, `Workflows`, `Automation`, `Tutorials`, `DeskHog`, `MCP`) into an otherwise-lowercase set – a second-order cleanup once the canonical list is agreed.

## Next steps

1. Agree on the canonical strings above (especially the judgment calls).
2. Do a scripted find-and-replace across post front matter to apply the merges.
3. For tutorials, reconcile the final list with `src/components/Tutorials/constants/tags.tsx`.
