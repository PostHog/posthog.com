---
name: post-newsletter
description: Convert a Substack newsletter post into a native posthog.com newsletter file. Fetches the content from a Substack URL, formats it with correct frontmatter and markdown, applies internal links, and writes image placeholders. Omits Substack-specific sections (byline, related texts, job posts). Use when the user provides a newsletter.posthog.com URL and asks to post it natively.
---

# Post Newsletter Natively

Convert a Substack newsletter post into a native posthog.com markdown file under `contents/newsletter/`.

The user will provide a Substack URL: $ARGUMENTS

## Step 1: Fetch and reference

Run these in parallel:

1. **Fetch the newsletter content** using WebFetch with this prompt:
   > "Extract the complete text of this newsletter. Include: title, subtitle, all body text verbatim, all links with their href URLs, all image alt text/descriptions, all section headers, and footnotes. Do not summarize — give full verbatim text."

2. **Read an existing newsletter** for frontmatter reference. Use a recent one, e.g. `contents/newsletter/building-ai-agents.md` or `contents/newsletter/vibe-designing.md`.

3. **Check for an existing file** at the expected path. The filename should be a kebab-case slug of the article title under `contents/newsletter/`. Use Glob to check.

4. **Check for a suggested-links file** at the repo root — it follows the pattern `suggested-links-{slug}.md`. Read it if it exists.

## Step 2: Write the file

Write (or overwrite) `contents/newsletter/{slug}.md`.

### Frontmatter

```yaml
---
title: {title in sentence case, lowercase except proper nouns}
date: {YYYY-MM-DD from the Substack post}
author:
  - {author-slug}  # kebab-case of author name, e.g. jina-yoon
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/[PLACEHOLDER_{slug}].png
featuredImageType: full
tags:
  - Product engineers
  - Engineering  # adjust based on content
crosspost:
  - Blog  # omit Founders if not relevant
seo:
  metaTitle: {title — can match the post title exactly}
  metaDescription: >-
    {1–2 sentence summary, ~155 chars, keyword-rich. Expand on the subtitle if
    there is one.}
---
```

### Body

- Copy all writing **verbatim** — do not paraphrase, restructure, or summarize.
- Convert the subtitle (if present) to an italicized line at the top: `*Subtitle text here*`
- Format section headers as `##` and subsections as `###`. **Do not modify header text** — copy it exactly as it appears in the source, including any numbering format (e.g. `1.`, `2.`, not `Rule 1:`, `Rule 2:`).
- For quote blocks: Substack sometimes renders pull quotes or highlighted excerpts as italicized text in quotation marks (e.g. `*"Quote text here."*`). Convert these to markdown blockquotes: `> Quote text here.` — drop the surrounding quotation marks and italics.
- Place `<NewsletterForm />` once mid-article (after the first major section) and once at the very end.
- For images: write a placeholder in the format `![PLACEHOLDER: description of image](PLACEHOLDER)` so the user knows where to upload. **Detection tip:** a sentence that ends with a colon (`:`) followed by a blank line almost always precedes an inline image in the Substack source — treat those as image locations even if the scraper didn't return an `<img>` tag.
- For code blocks: preserve the language and exact content.
- For footnotes: use markdown footnote syntax — `[^1]` inline, and `[^1]: text` at the bottom.

### What to omit

These are Substack-specific and should NOT appear in the posthog.com version:

- Bylines (e.g. *"Words by X who declares..."*)
- Related texts / recommended reading sections
- Job listings / open positions sections
- Subscribe CTAs (the `<NewsletterForm />` component replaces these)

### Preserve original links

All inline links from the Substack source must be preserved exactly as-is in the output — both external URLs (e.g. GitHub links, third-party sites) and posthog.com links. "Verbatim" means links too. If the scraper returns link text and href, write it as `[text](href)` in the markdown.

The only transformation allowed: convert absolute `https://posthog.com/...` links to relative `/...` links.

### Internal links

Apply internal links from two sources (in priority order):

1. **Suggested-links file** (if it exists at repo root): apply all High priority suggestions, and Medium priority ones that fit naturally.
2. **InternalLinkData.csv** at `.claude/skills/InternalLinkData.csv`: scan for unlinked mentions of PostHog products and features.

Rules:
- Link only the **first mention** of each concept — never repeat.
- Convert any absolute `https://posthog.com/...` links to relative `/...` links.
- Do not link text that is already inside a link.
- Prefer product pages for first mentions (e.g. `/feature-flags`), docs for technical/setup references.

## Step 3: Find backlink candidates in existing content

After writing the newsletter file, search for 3 existing blog posts or newsletters that should link back to the new one.

### What to search for

Run Grep searches across `contents/newsletter/` and `contents/blog/` for posts that mention related topics. For each newsletter, the topics will differ — look for overlap with the new post's core themes (section headers are a good guide).

Useful Grep patterns (adjust to the article's topics):
- Specific practices mentioned in the new post (e.g. "traces hour", "dogfood", "MCP")
- Core concepts the new post covers (e.g. "agent", "model context protocol", "skill")
- PostHog products the post mentions that older posts might also cover

### What makes a good backlink candidate

- **Topic overlap**: the older post covers something the new post expands on or approaches from a different angle
- **Natural insertion point**: there's a specific sentence or section end where a cross-reference fits without feeling forced
- **Reader benefit**: a reader of the older post would genuinely click through

### Insertion style

Keep additions short — one sentence, italicized or as a plain sentence at a section end. Examples:

```md
*If you're building an MCP server alongside your agent, [the golden rules of agent-first product engineering](/newsletter/agent-first-product-engineering) goes deeper on how to design those tools well.*
```

```md
For the product engineering principles behind this process, see [the golden rules of agent-first product engineering](/newsletter/agent-first-product-engineering).
```

For `building-ai-features.md`-style insertions where it fits mid-paragraph, append to the relevant sentence rather than adding a new line.

### Make the edits

Edit each of the 3 candidate files to insert the backlink at the identified location.

## Step 4: Report to the user

After all edits, report:

1. **Image placeholders** — list each one so the user knows what to upload.
2. **Forward links applied** — list every link added with anchor text and target URL, so the user can review appropriateness.
3. **Backlinks added** — for each of the 3 files edited, show the file path, the sentence added, and where it was inserted.
4. **Sections omitted** — confirm what Substack-only content was removed.
5. **Author slug** — flag if the author slug may not exist yet in the codebase (check with Grep for the slug in `contents/`).
