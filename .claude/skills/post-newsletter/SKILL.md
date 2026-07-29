---
name: post-newsletter
description: Convert a Substack newsletter post into a native posthog.com newsletter file. Fetches the content from a Substack URL, formats it with correct frontmatter and markdown, applies internal links, and re-hosts its images on Cloudinary. Omits Substack-specific sections (byline, related texts, job posts). Use when the user provides a newsletter.posthog.com URL and asks to post it natively.
---

# Post Newsletter Natively

Convert a Substack newsletter post into a native posthog.com markdown file under `contents/newsletter/`.

The user will provide a Substack URL: $ARGUMENTS

## Step 1: Fetch and reference

Run these in parallel:

1. **Fetch the newsletter content from Substack's API**, not with WebFetch. WebFetch routes the page through a summarizing model that will usually refuse to reproduce a full article verbatim ("I can't reproduce the full text verbatim…") and hand back a summary instead — useless when the whole job is copying text exactly. Substack exposes the post as JSON with no auth:

   ```bash
   curl -sL "https://newsletter.posthog.com/api/v1/posts/{substack-slug}" -o /tmp/post.json
   ```

   The response includes `title`, `subtitle`, `post_date`, `cover_image`, and `body_html` — the article body as HTML. Write `body_html` to a file and convert it to markdown with a script (unwrap Substack's `<span>` soup, turn `<figure>` blocks into image markers carrying both the `src` and the `<figcaption>`, and convert `<a>` to `[text](href)`). This gives you exact text, exact links, and image positions in one pass, and it doubles as the ground truth for Step 5.

   Keep the JSON and the converted markdown around — Step 3b and Step 5 both reuse them.

2. **Read an existing newsletter** for frontmatter reference. Use a recent one, e.g. `contents/newsletter/building-ai-agents.md` or `contents/newsletter/vibe-designing.md`.

3. **Check for an existing file** at the expected path. The filename is **the Substack post's own slug** (the last path segment of the URL), not a slug derived from the article title — the two often differ, e.g. `code-review-tips.md` holds "Stop being the code review bottleneck". Getting this wrong breaks the inbound `/newsletter/{slug}` links other posts already point at. Use Glob to confirm the file doesn't exist yet, and grep `contents/` for `/newsletter/{slug}` to see which posts already link to it.

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
- For images: write a placeholder in the format `![PLACEHOLDER: description of image](PLACEHOLDER)` to mark the position. Step 3 replaces each one with a real Cloudinary URL, so none should survive into the finished file. **Detection tip:** a sentence that ends with a colon (`:`) followed by a blank line almost always precedes an inline image in the Substack source — treat those as image locations even if the scraper didn't return an `<img>` tag.
- For image captions (italicized text directly below an image in Substack): use the `<Caption>` component instead of plain markdown italics, e.g. `<Caption>Caption text here</Caption>` — see `contents/newsletter/building-ai-agents.md` for examples. It renders centered by default, unlike bare `*italic*` text. If the caption contains a link, keep it as an inline `<a href="...">` tag inside the component (per "Preserve original links" below) rather than dropping it — this is easy to miss since the caption reads like a quote at first glance.
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

The only transformations allowed: convert absolute `https://posthog.com/...` links to relative `/...` links, and strip any query string (e.g. `?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=...`) from links pointing at another posthog.com page. Leave external links (GitHub, third-party sites, etc.) completely untouched, query strings included.

## Step 3: Upload images to Cloudinary

Images in Substack posts must be uploaded to Cloudinary via the posthog.com Strapi backend. Do this before running `/suggest-links`.

### 3a: Get the hero image

Ask the user two things:

1. Do they have the hero image file locally? If they provide a path, note it for upload in step 3c. **Remind them that posthog.com's hero image is a wider aspect ratio than Substack's** (Substack's is closer to square) — if they only have the Substack version, flag that it may need to be re-cropped rather than reused as-is.
2. If not: **ask whether the hero image is actually embedded in the Substack article itself**, or whether it only shows up on the Substack homepage/social card. Substack's `og:image` (the social-preview image) is not always the same as an image inside the article body, and posthog.com always needs a real featured image in frontmatter — don't assume the `og:image` is the right one without confirming with the user. If they're unsure or say it's not in the article, leave the frontmatter `featuredImage` as the placeholder and skip hero upload rather than guessing.

### 3b: Get images from Substack

Read the images out of the `body_html` you already fetched in Step 1 — you do not need another network fetch, and you should not use one. Deriving images from a second, independent fetch can disagree with the first on count or order (an image dropped from one but not the other), and zipping the two back together by position silently shifts every image after the mismatch onto the wrong caption. This has happened before (PR #18012) and produced a missing image plus a run of wrong images for the rest of the post. Taking the `src`, the preceding text, and the `<figcaption>` from a single parse of one `body_html` makes that class of bug impossible.

For each `<figure>` in document order, pull: (1) the original image URL — prefer the `<a class="image-link" href="...">` wrapper, which points at the full-size `substack-post-media.s3.amazonaws.com` original, over the resized `substackcdn.com/image/fetch/...` `<img src>`; (2) the text immediately before it; (3) the `<figcaption>`, if any.

Count the images found against the number of `![PLACEHOLDER: ...]` entries already written in step 2. If the counts don't match, stop and tell the user which section appears to be missing an image instead of guessing.

**Look at the images before you place them.** Download each one and Read it — the images are diagrams, and a caption-less diagram is easy to attach to the wrong section. Confirm what each one actually depicts matches the section it's going into. This is also the moment you'll catch text errors rendered into the image itself (a misspelled label, a stale product name); flag those to the user, since they can only be fixed by regenerating the asset.

### 3c: Authenticate and upload

Uploads go through the posthog.com Strapi backend, which needs a bearer token.

**PostHog staff cannot use email/password — ask for a browser token instead.** Strapi refuses the password grant for any `@posthog.com` account, because staff accounts are SSO-only:

```
400 BadRequestError: "PostHog employees must log in with PostHog"
```

There is no password to send, so don't ask for one. Ask the user to hand you the session token the site is already using:

> While logged in to posthog.com, open your browser console and run `localStorage.getItem('jwt')`, then paste the result here.

That's the same token every authenticated request from the site carries — `src/hooks/useUser.tsx` reads and writes it under the `jwt` key. It's valid for about 30 days, so a token from an earlier session in the same conversation is usually still good.

**Only for non-staff accounts** (an external contributor signing in at posthog.com/community with a password) does the credential grant work:

> Please run: `! export SQUEAK_EMAIL=you@example.com SQUEAK_PASSWORD=yourpassword`

Note that `!`-prefixed commands run in the **user's** shell, not yours — the exported variables will NOT be visible to your Bash tool, and `${SQUEAK_EMAIL}` will expand to an empty string. Read the values out of the user's message and pass them inline instead.

Then upload all images with a shell script:

```bash
# Staff: use the JWT the user pasted.
JWT='eyJhbGciOi...'

# Non-staff only: exchange credentials for a JWT.
# JWT=$(curl -s -X POST "https://better-animal-d658c56969.strapiapp.com/api/auth/local" \
#   -H "Content-Type: application/json" \
#   -d "{\"identifier\":\"${SQUEAK_EMAIL}\",\"password\":\"${SQUEAK_PASSWORD}\"}" \
#   | python3 -c "import sys,json; print(json.load(sys.stdin)['jwt'])")

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
    | python3 -c "
import sys, json
d = json.load(sys.stdin)
# A failed upload returns an error object, not a list — surface it instead of
# crashing on d[0], which hides the real cause (usually an expired token).
print(d[0]['url'] if isinstance(d, list) else 'ERROR ' + json.dumps(d)[:400])
"
  rm -f "$tmpfile"
}
```

If an upload returns `401 Unauthorized`, the token has expired — ask for a fresh one rather than retrying.

Name each image descriptively: `{slug}-tip{N}-{description}` (e.g. `how-to-demo-tip4-phone-number`).

The upload response returns a Cloudinary URL in the format:
`https://res.cloudinary.com/dmukukwp6/image/upload/v1783662227/filename.png`

**Nothing may sit between `/upload/` and the filename in the `featuredImage` URL.** The build derives a Cloudinary public ID by taking *everything* after `/upload/` (`gatsby/onCreateNode.ts` → `getPublicID`), so any prefix gets baked into the ID, misses the Cloudinary metadata cache, and makes `gatsbyImageData` resolve to `null`. The hero then fails **silently** — `ReaderView` renders an empty `<GatsbyImage>` because `featuredImage` is still truthy, and there's no `publicURL` fallback. The direct image URL still returns 200, so you cannot catch this by checking the link.

Two prefixes cause it, and the upload response hands you the first one:

- **Version segment.** Uploads return `.../upload/v1783662227/filename.png` → ID becomes `v1783662227/filename`. Strip `v<digits>/`.
- **Transformation params.** A URL copied from elsewhere on the site may carry them: `.../upload/q_auto,f_auto/filename.jpg` → ID becomes `q_auto,f_auto/filename`. Strip those too.

A **missing file extension** breaks it differently but just as silently: `getPublicID` does `substring(0, lastIndexOf('.'))`, and with no dot that yields an empty string.

Write it as `https://res.cloudinary.com/dmukukwp6/image/upload/<public-id>.<ext>`. Folder paths *inside* the public ID are fine and common (`.../upload/posthog.com/contents/images/foo/bar.png` works) — it's only a leading version or transform segment that breaks.

This applies to `featuredImage` (and the other transformed frontmatter fields: `thumbnail`, `logo`, `logoDark`, `icon`). Body images are plain `<img>` tags and render fine either way.

One false alarm to know about: PR previews restore a Cloudinary metadata cache that is only refreshed daily at 06:00 UTC (`.github/workflows/cache-warmup.yml`). An image uploaded after the last refresh is absent from that cache, so its hero can look blank **in the preview** even with a correct URL. Production builds crawl Cloudinary fresh and are unaffected. If the URL has no prefix and the hero is still blank in preview, suspect this before rewriting the URL.

### 3d: Update the markdown

Replace all `[PLACEHOLDER_...]` and `![PLACEHOLDER: ...](PLACEHOLDER)` entries with the real Cloudinary URLs and descriptive alt text. Remember that the `featuredImage` URL must have nothing between `/upload/` and the filename (see 3c). Match each uploaded image to its placeholder using the quoted anchor text from step 3b — find that exact sentence or heading in the file and insert the image there — never by list position or order. Before moving on, re-read the finished file and confirm each image's description actually matches the paragraph it now sits next to.

**Indentation rule:** Example paragraphs and images that follow a numbered tip and illustrate it should be indented as list continuations (3 spaces for tips 1–9, 4 spaces for tips 10+). Checklists inside a tip should be wrapped in a blockquote (`>`).

## Step 4: Run /suggest-links on the new file

Prioritize backlinks as forward links should already be set. But, if the article has almost no forward links, recommend forward links, too.

After writing the file, invoke the `/suggest-links` skill passing the path to the new newsletter file as the argument. The skill will:

- Suggest forward links (PostHog product/feature mentions to link in the new post)
- Find backlink candidates in existing content and suggest exact inline edits with section anchors

Apply all **High priority** forward link suggestions. Apply backlink suggestions to all 3 candidate files.

## Step 5: Verify against the source

Before reporting to the user, spawn a subagent (via the Agent tool, `subagent_type: general-purpose`) to independently check the finished markdown file against the original newsletter — it should read both fresh rather than trust anything from this conversation.

**Ground truth, in order of preference:**

1. **The `body_html` you saved in Step 1.** This is the preferred ground truth: it comes from Substack's own API, so it's the authoritative source text rather than a model's rendering of the page. Point the subagent at the saved file and tell it to strip tags with a script rather than eyeballing raw HTML. Pass along the API JSON too, so it can check `title` and `post_date` against the frontmatter.
2. A saved HTML export of the Substack page, if the user provided one. Large and mostly boilerplate — instruct the subagent to locate the article body (typically inside a `<div class="body markup">`-style container) and strip tags with a quick script rather than reading the whole file.
3. Last resort: have the subagent WebFetch the newsletter URL fresh. Expect this to be weak — WebFetch will usually refuse to reproduce full verbatim text and return only a summary with short quotes. If that happens the subagent should say so explicitly and verify what it can (structure, links, image count and placement, footnote count) rather than silently downgrading to a shallow check.

**Tell the subagent what's allowed to differ** so it doesn't flag intentional transformations as bugs:

- Absolute `https://posthog.com/...` links relativized to `/...`, with UTM query params stripped from links to other posthog.com pages. External links must be byte-identical, query params included.
- Image URLs re-hosted on Cloudinary (`res.cloudinary.com/dmukukwp6/...`) instead of the original Substack CDN — check position relative to surrounding text, not the URL itself.
- Subtitle, byline, and related-reading/job-post sections intentionally absent (confirm they're gone, not missing content).
- New forward/backlink markup added by `/suggest-links` wrapping existing text (not a wording change).

**What must NOT differ:** wording of any sentence, paragraph, or footnote; link anchor text and destination for external links; code/prompt block contents (character-for-character); footnote numbering and citation text; image position relative to the same surrounding sentence/heading.

Ask the subagent to go section by section and return a clear verdict (match / discrepancies found) with quotes proving any mismatch. If it finds real discrepancies, fix them and re-verify before moving on.

## Step 6: Report to the user

After all edits, report:

1. **Images** — confirm every image resolves, and name any still left as a placeholder (e.g. a hero the user never supplied) so it's clear what's outstanding. Flag any text error rendered into an image, since that needs the asset regenerated.
2. **Sections omitted** — confirm what Substack-only content was removed.
3. **Author slug** — flag if the author slug may not exist yet in the codebase (check with Grep for the slug in `contents/`).
4. **Deliberate divergences from the source** — call out anything that intentionally doesn't match Substack (a typo fixed at the author's request, a regenerated image). A reviewer comparing the two versions will otherwise read these as conversion errors.
