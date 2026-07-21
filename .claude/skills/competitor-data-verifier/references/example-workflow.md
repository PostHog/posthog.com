# Example Verification Workflow

## Step 1: Load Current Data

```
Read src/hooks/competitorData/{competitor}.tsx
```

Identify the key areas to verify: products (with `available` and `pricing.free_tier`), features (boolean/string values), platform settings, and integrations.

Scan the data file to understand which products this competitor covers — not every competitor has every product. Tailor your searches to what's actually in the file.

## Step 2: Batch 1 — Parallel Fetches + Searches

Launch 3-4 calls simultaneously. Start with the pricing page (highest value) and broad searches:

```
WebFetch: https://{competitor}.com/pricing
WebSearch: "{Competitor} features documentation site:{competitor}.com"
WebSearch: "{Competitor} security compliance SOC2 HIPAA site:{competitor}.com"
WebSearch: "{Competitor} pricing plans free tier {current_year}"
```

For competitors with specific products in the data file, also fetch their product pages:
```
WebFetch: https://{competitor}.com/session-replay       (if session_replay in data)
WebFetch: https://{competitor}.com/feature-flags         (if feature_flags in data)
WebFetch: https://{competitor}.com/experimentation       (if experiments in data)
```

**Expect some failures.** Marketing pages are often JS-rendered and return only nav/footer via WebFetch.

## Step 3: Batch 2 — Fill Gaps with WebSearch

For pages that 404'd or returned incomplete content, switch to WebSearch:

```
WebSearch: "{Competitor} {product_name} features {current_year}"
WebSearch: "{Competitor} {product_name} free tier limit {current_year}"
WebSearch: "{Competitor} integrations {specific_tool_name}"
```

WebSearch snippets often contain the exact facts (pricing numbers, plan names) that JS-rendered pages hide from WebFetch.

## Step 4: Batch 3 — Targeted Follow-ups

Based on URLs discovered in earlier search results, fetch specific pages:

```
WebFetch: {discovered_docs_url}
WebFetch: {discovered_feature_page}
```

Also try docs subdomains — they scrape more reliably:
```
WebFetch: https://docs.{competitor}.com/{product}
```

For pricing verification, third-party sources can help (mark as Medium confidence):
```
WebSearch: "{Competitor} pricing plans {current_year}"
```

## Step 5: Generate Report

Focus the report on:
1. **High-confidence changes** with diffs — what should definitely be updated
2. **Manual verification items** as a table — what you couldn't confirm
3. **A proposed diff** — the actual code changes

See `references/report-template.md` for the full template.

## Lessons Learned

### WebSearch vs WebFetch Decision Tree
- **Pricing data** → WebSearch first (pricing tables are often JS-rendered)
- **Feature docs** → WebFetch on docs subdomain (`docs.{competitor}.com`)
- **Security/compliance** → WebSearch with `site:` filter
- **Specific integrations** → WebSearch for "{Competitor} {integration} integration"
- **Product pages** → Try WebFetch first, fall back to WebSearch

### Pages That Commonly Fail with WebFetch
- `/security`, `/trust`, `/compliance` — often 404 or return empty
- `/integrations`, `/marketplace` — usually JS-rendered catalogs
- Generic paths like `/analytics`, `/data` — may not exist or redirect

### Pricing Page Is the Highest-Value Page
A single pricing page often reveals: plan names, free tier limits, feature gates per plan, and product availability. Always start here.

### Always Use the Current Year in Searches
Competitor features change frequently. Include `{current_year}` in WebSearch queries to get the latest information.

### Adapt Searches to Each Competitor
Not every competitor uses the same URL patterns or terminology. A session replay tool won't have `/experiment` pages. Read the data file first to know which products to search for.
