---
description: Suggest internal links for a blog post, newsletter, or other content using the internal linking resource
---

# Suggest Internal Links

Analyze a piece of content and suggest specific internal links based on PostHog's internal linking resource. The user will provide a file path: $ARGUMENTS

## Step 1: Get the content

Read the file at the provided path. If no argument is provided, ask the user which file to analyze.

## Step 2: Load the internal linking resource

Read the CSV file at `.claude/skills/InternalLinkData.csv` (relative to the repo root).

This CSV has columns: `Product`, `Anchor text examples`, `Relative URL`, `Type`, `Use when writing about...`

The `Type` column categorizes links as: Product page, Docs, Blog, Tutorial, Prod. Engineers, Founders, Newsletter, or Competitor comparison.

## Step 3: Analyze and suggest links

Scan the content for opportunities to add internal links. For each suggestion, provide:

1. **Line number** and the exact text that should be linked
2. **Suggested link** (the relative URL from the CSV)
3. **Why** — brief reason this link fits here (based on the "Use when writing about..." context)
4. **Priority**: High (unlinked mention of a PostHog product/feature), Medium (related concept that would benefit from a link), Low (nice-to-have deeper reading)

### Rules

- **Don't suggest links for text that's already linked.** Parse the markdown and skip any text inside `[...]()` or `<a>` tags.
- **Prefer product pages** for first/prominent mentions of a PostHog feature (e.g., link "feature flags" to `/feature-flags` not `/docs/feature-flags`). Use docs links for technical/setup references.
- **Prefer blog and product engineer posts** for conceptual mentions (e.g., "A/B testing" → `/product-engineers/ab-testing`).
- **Don't over-link.** Each unique concept should only be linked once (on first mention). Don't suggest linking every occurrence.
- **Match the content type.** If the post is a tutorial, prefer linking to other tutorials and docs. If it's a blog post, prefer blog and product page links. If it's a newsletter, prefer blog posts and product pages.
- **Consider context.** A mention of "funnels" in a sentence about user behavior should link to the funnels product page, while "funnels" in a sentence about setup should link to the docs.
- **Aim for 5-15 suggestions** depending on post length. Short posts (< 500 words) might only need 3-5. Long posts (2000+ words) could use 10-15.
- **Flag if the post has fewer than 3 internal links** — this is below the minimum recommended in the style guide.

## Step 4: Output

Print the suggestions directly to the console, grouped by priority (High → Medium → Low). Format each suggestion as:

```
### High priority

- **Line X**: "exact text to link"
  → anchor text (/relative-url) — Reason this fits here

### Medium priority

...
```

At the end, include a summary line: "Found X link opportunities (Y high, Z medium, W low). Post currently has N internal links."
