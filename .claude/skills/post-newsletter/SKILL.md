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
- Format section headers as `##` and subsections as `###`. **Do not modify header text** — copy it exactly as it appears in the source, including any numbering format (e.g. `1.`, `2.`, not `Rule 1:`, `Rule 2:`).
- For quote blocks: Substack sometimes renders pull quotes or highlighted excerpts as italicized text in quotation marks (e.g. `*"Quote text here."*`). Convert these to markdown blockquotes: `> Quote text here.` — drop the surrounding quotation marks and italics.
- Place `<NewsletterForm />` once mid-article (after the first major section) and once at the very end.
- For images: write a placeholder in the format `![PLACEHOLDER: description of image](PLACEHOLDER)` so the user knows where to upload. **Detection tip:** a sentence that ends with a colon (`:`) followed by a blank line almost always precedes an inline image in the Substack source — treat those as image locations even if the scraper didn't return an `<img>` tag.
- For code blocks: preserve the language and exact content.
- For footnotes: use markdown footnote syntax — `[^1]` inline, and `[^1]: text` at the bottom.

### What to omit

These are Substack-specific and should NOT appear in the posthog.com version:

- Subtitles (the italicized tagline below the title, e.g. *"The magic behind our AI onboarding wizard"*)
- Bylines (e.g. *"Words by X who declares..."*)
- Related texts / recommended reading sections
- Job listings / open positions sections
- Subscribe CTAs (the `<NewsletterForm />` component replaces these)

### Preserve original links

All inline links from the Substack source must be preserved exactly as-is in the output — both external URLs (e.g. GitHub links, third-party sites) and posthog.com links. "Verbatim" means links too. If the scraper returns link text and href, write it as `[text](href)` in the markdown.

The only transformation allowed: convert absolute `https://posthog.com/...` links to relative `/...` links.

## Step 3: Upload images to Cloudinary

Images in Substack posts must be uploaded to Cloudinary via the posthog.com Strapi backend. Do this before running `/suggest-links`.

### 3a: Get the hero image

Ask the user if they have the hero image file locally. If they provide a path, note it for upload in step 3c. If not, leave the frontmatter `featuredImage` as the placeholder and skip hero upload.

### 3b: Get images from Substack

Fetch the Substack URL again with this prompt:
> "For each image in the article body, tell me: what tip number, section, or paragraph it appears after, and a brief description of what the image shows. List them in order of appearance."

Also run a second fetch to extract the raw image URLs:
> "List all image src URLs from the article body in order of appearance. Include only article body images, not avatar or profile images."

### 3c: Authenticate and upload

Ask the user for their **PostHog community credentials** (the account used to sign in at posthog.com/community — not their PostHog app login):

> Please run: `! export SQUEAK_EMAIL=you@posthog.com SQUEAK_PASSWORD=yourpassword`

Once credentials are set, authenticate and upload all images with a shell script:

```bash
# Authenticate
JWT=$(curl -s -X POST "https://better-animal-d658c56969.strapiapp.com/api/auth/local" \
  -H "Content-Type: application/json" \
  -d "{\"identifier\":\"${SQUEAK_EMAIL}\",\"password\":\"${SQUEAK_PASSWORD}\"}" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['jwt'])")

# Upload hero (if local file provided)
# curl -s -X POST "https://better-animal-d658c56969.strapiapp.com/api/upload" \
#   -H "Authorization: Bearer $JWT" \
#   -F "files=@/path/to/hero.png;filename={slug}-hero.png" \
#   | python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['url'])"

# For each body image: download from Substack S3 URL, then upload
upload() {
  local url="$1" name="$2" tmpfile
  tmpfile=$(mktemp /tmp/${name}.XXXXXX.png)
  curl -s -L "$url" -o "$tmpfile"
  curl -s -X POST "https://better-animal-d658c56969.strapiapp.com/api/upload" \
    -H "Authorization: Bearer $JWT" \
    -F "files=@${tmpfile};filename=${name}.png" \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['url'])"
  rm -f "$tmpfile"
}
```

Name each image descriptively: `{slug}-tip{N}-{description}` (e.g. `how-to-demo-tip4-phone-number`).

The upload response returns a Cloudinary URL in the format:
`https://res.cloudinary.com/dmukukwp6/image/upload/v.../filename.png`

### 3d: Update the markdown

Replace all `[PLACEHOLDER_...]` and `![PLACEHOLDER: ...](PLACEHOLDER)` entries with the real Cloudinary URLs and descriptive alt text. Use the position mapping from step 3b to insert images in the right places.

**Indentation rule:** Example paragraphs and images that follow a numbered tip and illustrate it should be indented as list continuations (3 spaces for tips 1–9, 4 spaces for tips 10+). Checklists inside a tip should be wrapped in a blockquote (`>`).

## Step 4: Run /suggest-links on the new file

Prioritize backlinks as forward links should already be set. But, if the article has almost no forward links, recommend forward links, too.

After writing the file, invoke the `/suggest-links` skill passing the path to the new newsletter file as the argument. The skill will:

- Suggest forward links (PostHog product/feature mentions to link in the new post)
- Find backlink candidates in existing content and suggest exact inline edits with section anchors

Apply all **High priority** forward link suggestions. Apply backlink suggestions to all 3 candidate files.

## Step 4: Report to the user

After all edits, report:

1. **Image placeholders** — list each one so the user knows what to upload.
2. **Sections omitted** — confirm what Substack-only content was removed.
3. **Author slug** — flag if the author slug may not exist yet in the codebase (check with Grep for the slug in `contents/`).
