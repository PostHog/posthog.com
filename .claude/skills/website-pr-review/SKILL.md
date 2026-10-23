---
name: website-pr-review
description: Review a posthog.com website change against the project's conventions before it goes up for review — new-window link state, stock Tailwind colors, viewport media queries instead of container queries, per-page window sizing in App.tsx, dark-mode image backgrounds, content frontmatter, Cloudinary-hosted images, unrelated files swept into the diff, and copy/tone. Use when someone has built or edited a posthog.com page or content file (often with Claude) and wants to self-check it before opening or updating a pull request, or when they pass a PR number/URL to review.
---

# Website PR review

Self-review a posthog.com change **before** opening it for review, so it lands clean and comes back with little or no feedback. This skill encodes the project's established conventions — things that are obvious once you know this codebase but easy for an AI-generated diff to miss.

**Audience:** anyone shipping to posthog.com — often a product marketer who built a page or wrote a post with Claude and isn't a full-time engineer. So: explain *why* each issue matters in plain language, don't just assert a rule.

**How to run it:** `/website-pr-review` reviews your current branch; `/website-pr-review <PR-number-or-URL>` reviews an existing PR. No setup needed.

**Golden rule: auto-fix the mechanical, propose the substantive.** Purely mechanical issues — formatting, typos, en dashes, term casing (Prettier + group M) — have no judgment involved, so just fix them and note what changed. Everything substantive (missing `newWindow`, color tokens, layout, SSR guards, and especially copy/tone) is reported first and only applied after the user accepts. Never silently rewrite copy, layout, or design.

## Step 1 — Figure out what to review

Default scope is **everything on the current branch**: committed changes vs `master` plus anything still in the working tree.

```bash
git rev-parse --abbrev-ref HEAD          # current branch (warn if this is master)
git diff master...HEAD --stat            # committed on this branch
git diff --stat                          # unstaged working-tree changes
git diff --staged --stat                 # staged but uncommitted
```

If the user passes a **PR number or URL** (e.g. "review #17240" or a github.com/PostHog/posthog.com/pull/N link), review that PR instead. `gh` is **not** installed — use raw git:

```bash
git fetch origin refs/pull/<N>/head:pr-<N>
git diff master...pr-<N> --stat
```

List the changed files back to the user and note the apparent purpose of the change (from the branch name, PR title, or just ask). You'll use that purpose in Step 2 to spot unrelated files.

Read the full diff for each changed file before judging — `git diff master...HEAD -- <file>`. Context matters; many rules below require judgment, not blind pattern-matching.

## Step 2 — Scan against the checklist

Load `references/review-checklist.md` for the full rule catalog with good/bad code examples and the exact grep sweeps. Work through every changed file against it.

First decide **which kind of PR** this is — it changes which rules matter:
- **Content PR** — `.md`/`.mdx` under `contents/` (blog, tutorial, docs, customers). The common case for marketers. Check frontmatter, images, MDX components, links, SEO/structure, prose conventions, tone (checklist groups I, J, K, L, M, A2/A3, H).
- **Page/component PR** — `.tsx`/`.ts` under `src/`. Check windows, layout, colors, components, SSR safety (groups A–G).

Use grep to find candidates fast, then **read the surrounding code** before flagging — most rules have legitimate exceptions:

For **content PRs**:
- Committed image/video files: any added `.png`/`.jpg`/`.jpeg`/`.gif`/`.webp`/`.svg`/`.mp4` under `contents/` or `static/` — assets must be Cloudinary URLs, never committed.
- Non-Cloudinary asset URLs: `featuredImage`/`logo`/`<img src>`/`![]()` not pointing at `res.cloudinary.com`.
- Absolute internal links: `https://(www\.)?posthog\.com/` — should be relative (`/docs/...`).
- Raw YouTube embeds: `youtube.com/embed` without `-nocookie`.
- Frontmatter: required fields present for the content type; every `author` handle exists in `src/data/authors.json`; `category` is a real category; `seo.metaTitle`/`metaDescription` present.
- Plain UI screenshots (`<img>`/`![]()`) that should be `<ProductScreenshot>` with a dark-mode variant.
- Under-linked content (few/no internal links to related docs/posts); a new docs page that may actually belong in the monorepo (`docs/published/`); skipped heading levels.
- Vale-enforced prose conventions (group M): em dashes (`—`) or spaced hyphens that should be spaced en dashes (` – `), miscapitalized terms (`posthog`/`github`), title-case headings, non-American spelling, "click here" links. Pre-empt these so CI doesn't bury the PR in comments.

For **page/component PRs**:

- Unguarded browser globals (`window`, `document`, `localStorage`, `navigator`) at module scope or in render — breaks the Gatsby SSR build. Must be in `useEffect`/handlers or behind `typeof window !== 'undefined'`.
- Stock Tailwind colors (`bg-blue-500`, `text-gray-700`) — banned; only project tokens allowed.
- Viewport media queries (`md:`, `lg:`…) instead of `@container` queries (`@md:`, `@lg:`) — apps are resizable windows.
- Internal links opening a different page without `state={{ newWindow: true }}` — the current window vanishes.
- External links missing `external`/`externalNoIcon` or `target="_blank"`.
- Raw `<a href="/…">` for internal routes instead of `<Link>`.
- Unicode emojis anywhere — use `@posthog/icons`.
- `appSettings` edited in `src/context/App.tsx` — usually causes windows to resize when navigating between pages.
- Missing dark-mode background on image/figure blocks, or images without `alt` text.
- Raw `<input>`/`INPUT_CLASSES` instead of `OSForm` components; deep relative imports (`../../../`) instead of bare `src`-relative paths; unused imports/vars (will block the commit).
- **CODEOWNERS-gated paths** touched (`src/context/App.tsx`, `src/components/AppWindow/`, `gatsby/`, `api/`, `plugins/`) — these force a mandatory owner review; flag clearly.
- **Unrelated files** swept into the diff (translation files, generated assets, unrelated components, lockfile churn that doesn't match the change's purpose) — a common accident when branching off stale work. Always check this.
- Moved/renamed page without a redirect in `vercel.json`.
- `npm` instead of `pnpm` in any added scripts/docs.
- Copy/tone: confusing or "marketing-y" lines, non-sentence-case headings, non-American spelling.

Don't hand-review pure code formatting (quotes, semicolons, indentation) — the pre-commit hook (Prettier + ESLint + markdownlint) auto-handles it. Plain typos are caught by codespell (CI) and this skill's own mechanical pass (group M). Spend your attention on the semantic conventions instead. The checklist preamble lists exactly what's auto-handled and mirrors the repo's official PR-template merge gate.

## Step 3 — Report, grouped by severity

```
## Review: <branch or PR #N>
<N> files changed · <M> findings

### Must fix (breaks UX or build)
- src/pages/foo/index.tsx:42 — Cross-app link is missing `state={{ newWindow: true }}`.
  Why: clicking it replaces the window the user is in instead of opening a new one, so their previous page disappears.
  Fix: add `state={{ newWindow: true }}` to `<Link to="/products">`.

### Should fix (off-convention, will likely get flagged)
- ...

### Consider (copy / design — your call)
- ...
```

Every finding = `file:line` + a one-line plain-language *why* + the concrete fix. If there are zero findings in a section, omit it. If the diff is clean, say so plainly.

End with: **"Want me to apply the Must and Should fixes? Copy and design items I'll leave to you unless you tell me otherwise."**

## Step 4 — Fix

**Auto-fix the mechanical class right away** (no need to ask — these are judgment-free) and report what you changed:

- **Formatting** — run `pnpm format` (Prettier) on touched files.
- **Prose conventions (group M)** on content prose — convert em dashes / spaced hyphens to spaced en dashes (` – `), fix term casing (PostHog, GitHub, PR), make headings sentence case, correct American spelling and obvious typos, replace "click here" link text.

**Apply substantive fixes only after the user accepts** — windowed-UI, colors, layout, SSR guards (groups A–G), and copy/tone (group H). Copy/tone is the user's voice; surface it as suggestions and never auto-apply.

Then verify:

1. Re-run the grep sweeps from `references/review-checklist.md` to confirm the anti-patterns are gone.
2. If `vercel.json` or any page path changed, run `pnpm test-redirects`.
3. For content PRs, run `pnpm vale:staged` to confirm the prose conventions (group M) pass before CI does.
4. Report what you changed and what still needs a human decision.

## Step 5 — Confirm it actually works

Static review can't see a broken render, and the PR template explicitly requires checking the change in the preview. For anything visual or interactive, confirm it in a browser before shipping:

- Open the page in the **Vercel preview** (or run the dev server locally — the `dev-server` skill starts it) and check the browser console for errors.
- View it in **both light and dark mode**, and **resize the window** from narrow to wide to confirm the container-query layout reflows cleanly (groups C, D).
- For content, proofread the **rendered** page, not just the diff — MDX components, images, and links render differently than the source.

Do **not** run `pnpm build` or `pnpm check-links-post-build` as part of review — they need ~16GB RAM and are too slow for an interactive loop. Only run them if the user explicitly asks.

**Heads-up to pass on for content PRs:** PR preview deploys use a minimal build, so listing pages (`/blog`, `/tutorials`, `/posts`), tag/category pages, and Algolia search **don't** reflect branch content. To check a new post in preview, open its **direct URL** (e.g. `/blog/your-post-slug`), not the index. If a preview build is broken on stale cache, add the `no-cache` label to the PR to force a clean build (remove it after).
