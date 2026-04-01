---
name: competitor-data-verifier
description: Verify and update competitor product data by scraping competitor websites using WebFetch/WebSearch. Use when the user asks to verify, check, or update competitor information in competitorData files (like amplitude.tsx, mixpanel.tsx), or when they want to ensure competitor feature data is accurate and current. This skill systematically checks product features, pricing, platform details, and generates update recommendations with source URLs for verification.
---

# Competitor Data Verifier

Verify and update competitor product data in `src/hooks/competitorData/*.tsx` by scraping competitor websites.

## Tools Used

- **WebSearch**: Find current pages and gather info across multiple sources
- **WebFetch**: Scrape specific competitor pages for detailed feature/pricing data
- **Read**: Load current competitor data files
- **Glob**: Find all competitor data files

## Core Workflow

### 1. Load Current Data

Read the competitor data file and understand what needs verifying:

```
Read src/hooks/competitorData/{competitor}.tsx
```

If any feature key is unclear (e.g. `instant_rollbacks`, `persist_across_auth`), check the matching feature definition file in `src/hooks/featureDefinitions/` for the human-readable label and description. For example, feature keys under `feature_flags.management.features` are defined in `src/hooks/featureDefinitions/feature_flags.tsx`. This tells you exactly what the feature means so you can search for the right thing on the competitor's site.

### 2. Scrape in Parallel Batches

**This is the most important optimization.** Launch multiple WebFetch and WebSearch calls in parallel — don't do them one at a time.

**Batch 1 — Direct page fetches + searches in parallel:**
```
WebFetch: {competitor}.com/pricing           → pricing, plan names, free tier limits
WebFetch: {competitor}.com/session-replay     → session replay features
WebSearch: "{Competitor} features documentation site:{competitor}.com"
WebSearch: "{Competitor} security compliance SOC2 HIPAA site:{competitor}.com"
```

**Batch 2 — Fill gaps** (for anything Batch 1 missed or 404'd):
```
WebFetch: URLs discovered from Batch 1 search results
WebSearch: "{Competitor} {product} free tier limit {current_year}"
WebSearch: "{Competitor} integrations {specific_tool_name}"
```

**Batch 3 — Targeted follow-ups** for remaining unknowns. Try docs subdomains (`docs.{competitor}.com`) which scrape more reliably than marketing pages.

### 3. Handle Common Failures

WebFetch often returns incomplete content (nav/footer only) on JS-heavy pages. When this happens:

1. **Try WebSearch instead** — search results often contain the key facts in snippets
2. **Try the docs subdomain** — `docs.{competitor}.com` pages are usually static and scrape well
3. **Try third-party sources** — G2, Spendflo, and blog reviews often have current pricing/feature data (mark as Medium confidence)
4. **Try alternative URL patterns** — competitors reorganize pages frequently:
   - `/pricing` vs `/plans` vs `/buy`
   - `/security` vs `/trust` vs `/compliance`
   - `/analytics` vs `/product-analytics` vs `/products/analytics`
   - `/integrations` vs `/data-connections` vs `/marketplace`

### 4. Analyze and Compare

For each field in the competitor data file, classify as:

- **Verified accurate** — source confirms current value
- **Needs updating** — source shows different value (include old → new)
- **Needs manual verification** — couldn't find definitive source
- **New capability found** — competitor added something not in our data

### 5. Generate Report

Use this streamlined format (see `references/report-template.md` for full template):

```markdown
# Competitor Data Verification: {Name}
Date: {date} | File: src/hooks/competitorData/{competitor}.tsx

## High-Confidence Changes (recommend applying)

**{field_path}**
Current: `{old}` → Recommended: `{new}`
Source: {url} | Quote: "{exact quote}"

## Needs Manual Verification

| Field | Current | Question | Source |
|-------|---------|----------|--------|

## Proposed Diff
```

### 6. Important Rules

- **Never auto-modify competitor data files** — always present recommendations for user review
- **Always include source URLs** — every claim needs a link
- **Be conservative** — when uncertain, mark as "Needs manual verification"
- **Assign confidence levels**:
  - **High**: Direct statement on official page, pricing table, feature comparison
  - **Medium**: Blog post, third-party review, implied from docs
  - **Low**: Marketing copy, inferred, conflicting sources
- **Use the current year in searches** — competitor data changes frequently

## Efficiency Tips

- Launch 3-4 WebFetch calls in parallel per batch (they're independent)
- WebSearch is better than WebFetch for pricing data (pricing pages are often JS-rendered)
- The `/pricing` page is the single highest-value page — it reveals plan names, feature gates, and free tier limits all at once
- Docs pages (`docs.{competitor}.com`) scrape more reliably than marketing pages
- If a page 404s, don't retry — search for an alternative URL instead
