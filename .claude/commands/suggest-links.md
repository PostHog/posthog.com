---
description: Suggest internal links for a blog post, newsletter, or other content using the internal linking resource
---

# Suggest Internal Links

> **Model:** Run this with Opus or higher. Matching a candidate sentence's topic to a new post's section (and judging whether an anchor phrase reads naturally) requires more nuanced language understanding than this skill's mechanical steps suggest — weaker models tend to force keyword matches that don't actually fit. If you're on Sonnet or below, tell the user to switch models before running this skill.

Analyze a piece of content and suggest specific internal links based on PostHog's internal linking resource. The user will provide a file path: $ARGUMENTS

## Core constraint: link existing text only

**Never suggest adding, rewriting, or expanding content** — not in the post being analyzed, and not in the posts being linked to. Every suggestion must wrap a link around text that *already exists* in the file. You are only ever adding `[...]()` markup around words that are already on the page. If a good link target exists but there's no existing text to attach it to, do not invent a sentence, clause, or "further reading" line to host it — skip it instead.

## Step 1: Get the content

Read the file at the provided path. If no argument is provided, ask the user which file to analyze.

## Step 2: Load the internal linking resource

Read the CSV file at `.claude/skills/InternalLinkData.csv` (relative to the repo root).

This CSV has columns: `Product`, `Anchor text examples`, `Relative URL`, `Type`, `Use when writing about...`

The `Type` column categorizes links as: Product page, Docs, Blog, Tutorial, Prod. Engineers, Founders, Newsletter, or Competitor comparison.

## Step 3: Suggest forward links (new post → other posts)

Scan the content for opportunities to add internal links. For each suggestion, provide:

1. **Line number** and the exact text that should be linked
2. **Suggested link** (the relative URL from the CSV)
3. **Why** — brief reason this link fits here (based on the "Use when writing about..." context)
4. **Priority**: High (unlinked mention of a PostHog product/feature), Medium (related concept that would benefit from a link), Low (nice-to-have deeper reading)

### Forward link rules

- **Don't suggest links for text that's already linked.** Parse the markdown and skip any text inside `[...]()` or `<a>` tags.
- **Prefer product pages** for first/prominent mentions of a PostHog feature (e.g., link "feature flags" to `/feature-flags` not `/docs/feature-flags`). Use docs links for technical/setup references.
- **Prefer blog and product engineer posts** for conceptual mentions (e.g., "A/B testing" → `/product-engineers/ab-testing`).
- **Don't over-link.** Each unique concept should only be linked once (on first mention). Don't suggest linking every occurrence.
- **Match the content type.** If the post is a tutorial, prefer linking to other tutorials and docs. If it's a blog post, prefer blog and product page links. If it's a newsletter, prefer blog posts and product pages.
- **Consider context.** A mention of "funnels" in a sentence about user behavior should link to the funnels product page, while "funnels" in a sentence about setup should link to the docs.
- **Aim for 5-15 suggestions** depending on post length. Short posts (< 500 words) might only need 3-5. Long posts (2000+ words) could use 10-15.
- **Flag if the post has fewer than 3 internal links** — this is below the minimum recommended in the style guide.

## Step 4: Suggest backlinks (existing posts → new post)

Find at least 3 existing posts in `contents/` that would naturally link to the new content. For each:

1. Read the candidate file to find an **existing** sentence whose topic closely matches a specific section of the new post — one that already contains words you can wrap a link around. If no such sentence exists, skip that candidate rather than writing one.
2. Suggest wrapping the link around existing text in that sentence — do not reword the sentence beyond what's needed to insert the `[...]()` markup. **Prefer linking to a specific section anchor** (e.g., `/founders/my-post#section-name`) rather than just the root URL, so readers land in the most relevant part.
3. Write anchor text that fits naturally into the surrounding sentence. **Do not use the article title as anchor text.** The link should feel like it belongs in the prose, not like a citation. Good examples:
   - "making those traits [queryable across every team](/founders/growth-metrics-for-startups#2-make-customer-traits-queryable-across-all-functions)"
   - "[Consistent growth in ICP customers](/founders/growth-metrics-for-startups#4-be-opinionated-but-defensible-with-your-numbers) who pay..."
   - "tracking growth for [non-standard SaaS models](/founders/growth-metrics-for-startups#3-focus-on-consistency-over-accuracy)"

### Backlink rules

- **Find the most relevant existing posts** by searching for content that discusses the same concepts as the new post's sections. Use `grep` or `Bash` if needed.
- **Match section to section.** Don't just link to the new post's root — link to the specific `#anchor` that matches the concept being discussed in the existing post. Derive the anchor from the heading text (lowercase, spaces → hyphens, punctuation removed).
- **The backlink must fit within an existing sentence.** Wrap the link around words already present in the candidate post. Never propose a new sentence, clause, or "further reading" line to carry the link — if there's no existing text to attach it to, skip the candidate.
- **Don't use the new article's title as anchor text.** Describe the concept, not the article.

## Step 5: Output

Print the suggestions directly to the console.

### Forward links, grouped by priority (High → Medium → Low):

```
### High priority

- **Line X**: "exact text to link"
  → anchor text (/relative-url) — Reason this fits here

### Medium priority

...
```

### Backlinks (existing posts → this post):

For each suggested backlink, show:

```
### Backlinks

- **existing-post.md, line X** — existing sentence: "quoted existing text"
  → linked version: "...same sentence with [natural anchor text](/new-post#section-anchor) wrapped around existing words..."
  Why: one-line reason this existing post's topic connects to that section
```

At the end, include a summary line: "Found X forward link opportunities (Y high, Z medium, W low) and Z backlink opportunities. Post currently has N internal links."
