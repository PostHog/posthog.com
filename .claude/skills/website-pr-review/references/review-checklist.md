# Review checklist — full rule catalog

Every rule below is an established posthog.com convention — drawn from the project guides (`CLAUDE.md`, `agents/*`), the website engineering handbook, and the patterns reviewers consistently ask for. Following them is how a PR lands clean with little or no back-and-forth.

Each rule has a **severity**:

- **Must fix** — breaks the windowed UX, the build, or a hard project rule. Will definitely get sent back.
- **Should fix** — off-convention; the reviewer will very likely flag it.
- **Consider** — a judgment call (usually copy/design). Suggest, never auto-apply.

When scanning, grep to find candidates, then **read the surrounding code** — most rules have legitimate exceptions noted below.

**Two kinds of PR — figure out which you're reviewing first:**

- **Content PRs** — `.md`/`.mdx` files under `contents/` (blog posts, tutorials, docs, handbook, customers). This is the most common thing a product marketer ships. Focus on groups **I–M** (frontmatter, images, MDX components, SEO/structure, prose conventions) plus the link rules (A2/A3) and copy/tone (H).
- **Page / component PRs** — `.tsx`/`.ts` files under `src/`. Focus on groups **A–G** (windows, layout, colors, components, SSR safety).

Most PRs are one or the other; some touch both. Sources are cited inline (`CLAUDE.md`, the `agents/*` guides, and the website handbook under `contents/handbook/engineering/posthog-com/`).

## What tooling already handles (don't spend review effort here)

A pre-commit hook (`.husky/pre-commit` → lint-staged) and CI already cover pure formatting and typos, so focus your review on the *semantic* conventions below, not these:

- **Prettier** auto-formats `js/ts/tsx/json/yml/css` on commit: single quotes, no semicolons, 4-space indent, 120-char width. Don't flag code quote/semicolon style.
- **ESLint** runs on commit and **blocks** it on errors (notably unused vars — see F4).
- **markdownlint** auto-fixes `.md`/`.mdx` on commit and also blocks the PR in CI.
- **codespell** (CI) auto-commits plain typo fixes — ignore those.
- **Vale** (CI) is different: it enforces PostHog's *prose conventions* on website content and posts every finding as a PR comment. It's technically non-blocking, but a wall of Vale comments is exactly the noise this skill exists to prevent — so for content PRs, **pre-empt the Vale rules** (group M) rather than letting CI surface them. Run them locally with `pnpm vale:staged`. (Vale only lints `contents/`; internal docs like skills and `agents/` are excluded.)

## The official PR checklist (the merge gate)

Every PR ships with this checklist (`.github/pull_request_template.md`) — make sure the change satisfies it:

- [ ] Read the docs / content style guides
- [ ] American English spelling
- [ ] Relative URLs for internal links
- [ ] Checked the added/changed pages in the Vercel preview build
- [ ] Added a `vercel.json` redirect for any moved page

The rules below are the deeper conventions on top of that baseline.

---

## A. Links & new windows

### A1 — Cross-app links need `state={{ newWindow: true }}` *(Must fix)*

posthog.com is a desktop-style OS where pages are windows. A `<Link>` without `newWindow` **replaces the content of the window the user is currently in** (`replaceFocusedWindow` in `src/context/App.tsx`). If the link opens a *different app or page*, that makes the user's current page vanish. With `newWindow: true`, `App.tsx` appends a new window instead.

```tsx
// Good — opens a new window, current one stays put
<Link to="/code" state={{ newWindow: true }} className="font-semibold text-primary underline">PostHog Code</Link>

// Programmatic navigation
navigate('/products', { state: { newWindow: true } })

// Bad — replaces the window the user is reading
<Link to="/code">PostHog Code</Link>
```

**Judgment:** in-app navigation *within the same app* (e.g. a docs sidebar link moving between docs pages) correctly omits `newWindow` — that's intentional in-place navigation. Flag links that jump to a clearly different product/app/page. When unsure, ask.

### A2 — External links need `external`, `externalNoIcon`, or `target="_blank"` *(Must fix)*

Use the `<Link>` component's `external` prop (adds a ↗ icon) or `externalNoIcon` (no icon) for links leaving posthog.com. Raw `<a>` tags need `target="_blank" rel="noopener noreferrer"`.

```tsx
// Good
<Link to="https://app.posthog.com/signup" external>Sign up</Link>
<CallToAction to={CONNECT_SLACK_URL} size="sm" externalNoIcon>Connect Slack</CallToAction>
<a href={url} target="_blank" rel="noopener noreferrer">…</a>

// Bad — opens an external site in the same tab/window
<a href="https://example.com">…</a>
```

### A3 — No raw `<a href="/…">` for internal routes *(Should fix)*

Internal navigation must go through `<Link>` (from `components/Link`) so it participates in the window system, prefetch, and the right-click "Open in new PostHog window" menu. A raw `<a>` to an internal path does a full page reload and breaks the OS metaphor.

**Grep:** `<a [^>]*href="/` over the diff → each hit should be a `<Link to="…">`.

---

## B. Window sizing in App.tsx

### B1 — Don't add per-page window sizing that resizes on navigation *(Must fix · Ask first)*

`src/context/App.tsx` is core window management and is **"ask first"** per CLAUDE.md. Each path can have an `appSettings` entry with `size`/`position`. If sibling pages that users navigate between have *different* size settings, the window visibly jumps/resizes mid-navigation when clicking between nav pages — a frequent review flag.

New pages should fall through to the defaults (no `appSettings` entry → 90% of viewport via `getInitialSize`) or reuse the homepage (`/`) sizing. Flag any added/changed `appSettings` block **loudly** and ask whether it's intentional and consistent with neighboring pages.

`App.tsx`, `src/components/AppWindow/`, `gatsby/`, `api/`, and `plugins/` are **CODEOWNERS-gated** — any change there forces a mandatory review from the site owners. So if the diff touches them, call it out clearly: it will get extra scrutiny and should be deliberate, not incidental.

**Grep:** check whether `src/context/App.tsx` is in the diff at all; if so, read the `appSettings` change carefully.

---

## C. Responsive layout = container queries, never media queries

### C1 — Use `@container` queries, not viewport breakpoints *(Must fix)*

Every page is a resizable window, so the *viewport* width is irrelevant — what matters is the *window's* width. Stock Tailwind viewport breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) respond to the browser viewport and are therefore wrong. Use the `@`-prefixed container variants (`@md:`, `@lg:`, `@2xl:`), including named containers like `@lg/reader-content:`.

```tsx
// Good
<div className="grid grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-4 gap-x-1">

// Bad — responds to viewport, not the window
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
```

**Grep (broad — Rust regex has no lookbehind):** search for `(sm|md|lg|xl|2xl):` and then eyeball each hit for a leading `@`. Hits **without** a preceding `@` are bugs.

### C2 — Stack on narrow widths before going to columns *(Should fix)*

Default to a single stacked column and only break into side-by-side columns at a larger container breakpoint, so narrow windows stay readable. Multi-column layouts that kick in immediately get cramped when the window is small.

```tsx
// Good — single column until @2xl, then two columns
<div className="not-prose grid @2xl/reader-content:grid-cols-2 gap-4 mb-6">

// Bad — two columns immediately, cramped in a narrow window
<div className="grid grid-cols-2 gap-4">
```

### C3 — Float margins must be gated behind the same breakpoint as the float *(Should fix)*

A block's left/right margin should only apply once it switches to floating. If an element only floats at `@lg`, its float-side margin must also be `@lg`-gated — otherwise the margin pushes content around while the element is still full-width and stacked.

```tsx
// Good — float and its margin both turn on at @lg
<div className="@lg/reader-content:float-right @lg/reader-content:max-w-xs @lg/reader-content:ml-4 …">

// Bad — unconditional margin with a conditional float
<div className="@lg/reader-content:float-right ml-4 …">
```

---

## D. Colors & theming

### D1 — Only project color tokens; never stock Tailwind colors *(Must fix)*

Backgrounds, text, and borders use semantic tokens that auto-flip between light and dark mode (defined in `src/styles/global.css` + `tailwind.config.js`). Stock Tailwind colors (`bg-blue-500`, `text-gray-700`, `border-slate-200`) are banned — they don't theme and look wrong in dark mode.

Common tokens:
- Backgrounds: `bg-primary`, `bg-accent`, `bg-input`, or the literal pair `bg-light dark:bg-dark`
- Text: `text-primary`, `text-secondary`, `text-muted`
- Borders: `border-primary`, `border-input`

```tsx
// Good
<div className="bg-accent border border-primary rounded-md p-4">
<p className="text-secondary">…</p>

// Bad — stock colors, won't theme
<div className="bg-blue-500 text-gray-700 border-slate-200">
```

**Grep:** `(bg|text|border|ring|from|to|via)-(gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)\b`

The **numeric suffix is the tell.** The project defines suffix-*less* named colors (`text-green`, `bg-red`, `text-blue`) which are fine — it's `-blue-500` style stock colors that are banned.

Note `bg-light` / `bg-dark` are project-defined literal aliases (`#fff` / `#1e1f23`), used as the `bg-light dark:bg-dark` pair. That's allowed and is the one place `dark:` is expected.

### D2 — Image/figure blocks need a solid background for dark mode *(Should fix)*

A block (especially one wrapping a screenshot) needs a solid background so it works in dark mode. Screenshots taken in light mode look broken floating on a dark page without a `bg-light` panel behind them. Use `bg-light dark:bg-dark` or `bg-accent`.

```tsx
// Good — solid panel behind the image, works in both modes
<div className="bg-light rounded-md shadow-lg border border-primary overflow-hidden">
    <img … />
</div>
```

In **MDX content**, the equivalent is `<ProductScreenshot>` with a separate dark-mode image (see J2) — don't drop a raw `<img>` / `![]()` screenshot straight onto the page.

### D3 — Emphasized inline links: `text-primary` + `underline` *(Should fix)*

Prominent inline links (product names, key CTAs in body text) should be `text-primary` and underlined so they read as links without relying on color alone.

```tsx
// Good
<Link to="/code" state={{ newWindow: true }} className="font-semibold text-primary underline">PostHog Code</Link>
```

---

## E. Icons & emojis

### E1 — No Unicode emojis, ever *(Must fix)*

posthog.com content never uses Unicode emojis — use `@posthog/icons` instead. This applies to MDX content, JSX, and copy.

```tsx
// Good
import { IconCheck } from '@posthog/icons'
<IconCheck className="text-green" />

// Bad
<span>✅ Done</span>
```

**Grep:** sweep the diff for emoji codepoints, e.g. ripgrep `[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{2190}-\x{21FF}\x{2B00}-\x{2BFF}]`.

### E2 — Use icons intentionally, not decoratively *(Consider)*

Don't add icons that don't earn their place — posthog.com is information-dense, not a landing page, and decorative icon rows tend to be fragile or add no real meaning. Favor simple, consistent treatments for feature/benefit lists over icon-per-item flourishes. Any icon you keep should come from `@posthog/icons` and read cleanly in both light and dark mode.

---

## F. Imports, components & code conventions

### F1 — Prefer our RadixUI wrappers over importing `radix-ui` directly *(Should fix)*

Check `src/components/RadixUI/` for an existing wrapper before importing from the `radix-ui` package. Instances should import e.g. `import MenuBar from 'components/RadixUI/MenuBar'`, which internally sources the Radix primitive. New Radix wrappers go in `src/components/RadixUI/`; bespoke custom components go in `src/components/OS<Name>/` (source: `agents/components.md`).

### F2 — Use app templates and OS-prefixed shared components *(Should fix)*

Pages should use an app template (`<Editor>`, `<Reader>`, `<Presentation>`, `<Explorer>`, `<Inbox>`, `<Wizard>`, `<MediaPlayer>` — see `agents/apps.md`) rather than a bespoke full-page layout. Shared UI uses OS-prefixed components (`<OSButton>`, `<OSTable>`, `<OSTabs>`). Check `/components` (`src/pages/components/index.tsx`) for existing patterns before building new UI. Flag hand-rolled layout/components that duplicate an existing one.

### F3 — Forms use `OSForm` components, never raw `<input>` *(Should fix)*

Use `<OSInput>`, `<OSTextarea>`, `<OSSelect>` (with a required `label`) instead of raw HTML inputs or the legacy `INPUT_CLASSES` constant — they handle theming, labels, errors, and accessibility. When a form sits on a non-default background, pass `dataScheme` so the input colors adapt. Only set `touched` after user interaction so errors don't show prematurely. (Source: `src/components/OSForm/README.md`.)

### F4 — Imports use bare `src`-relative paths; no unused imports/vars *(Should fix)*

`tsconfig.json` sets `baseUrl: ./src`, so import from bare paths like `components/Link` or `hooks/useProduct` — not deep relative chains (`../../../components/Link`). TypeScript runs in `strict` mode with `noUnusedLocals`/`noUnusedParameters`, and ESLint runs in the pre-commit hook, so **unused imports, variables, or parameters will fail and block the commit** — flag them.

### F5 — Accessibility: alt text and reduced motion *(Should fix)*

Every image needs meaningful `alt` text (the `<ProductScreenshot>`/presentation image props require it). Any new animation, reveal, or transition must respect `prefers-reduced-motion` via the `usePrefersReducedMotion` hook and no-op when it returns `true`. (Source: presentation/Code component READMEs.)

### F6 — New component folders need a `README.md` *(Should fix)*

When adding a new component folder, include a `README.md` documenting its props and usage — this is an explicit project rule (`CLAUDE.md`). When *using* an existing component, check its folder for a `README.md` first.

### F7 — Guard browser globals — Gatsby server-renders at build time *(Must fix)*

This is the single most common way a new component silently breaks the build. Gatsby runs every component through SSR during `gatsby build`, where `window`, `document`, `localStorage`, and `navigator` **don't exist**. Touching them at module scope or in the render body throws and fails the (CI) build.

```tsx
// Bad — runs during SSR, crashes the build
const width = window.innerWidth
function Component() {
    const theme = localStorage.getItem('theme')
    ...
}

// Good — guarded, or deferred to the browser via useEffect
const width = typeof window !== 'undefined' ? window.innerWidth : 0
useEffect(() => {
    const theme = localStorage.getItem('theme')
}, [])
```

**Grep:** look for `window.`, `document.`, `localStorage`, `navigator.` in changed `.tsx`/`.ts` files, then check each is inside a `useEffect`, an event handler, or a `typeof window !== 'undefined'` guard. The codebase uses this guard pattern throughout — match it.

---

## G. Page hygiene

### G1 — Moving/renaming a page requires a redirect in `vercel.json` *(Must fix)*

Never move or rename a page without adding a redirect. After adding one, `pnpm test-redirects` should pass.

### G2 — Flag unrelated files swept into the diff *(Must fix)*

Compare every changed path against the stated purpose of the PR — accidentally committing unrelated files (e.g. translation files or generated assets picked up from a stale branch) is a common, easily-caught mistake. Watch for: unrelated translations/components, `pnpm-lock.yaml` churn that doesn't match the change, stray formatting-only edits to untouched files. Call these out so the user can `git restore` them before opening the PR.

### G3 — New pages should be linked from a menu *(Consider)*

A genuinely new page usually needs an entry in a relevant `src/components/TaskBarMenu/menuData.tsx` menu so it's reachable. Note if it's missing.

### G4 — `pnpm`, never `npm`; no new stock Tailwind utilities *(Must fix)*

Any added scripts, docs, or instructions must use `pnpm`. Adding new Tailwind utilities is "ask first" — flag it.

---

## H. Copy & tone *(Consider — suggest only, never auto-apply)*

This is the user's voice. Surface suggestions; don't rewrite without permission.

- **Style mechanics:** sentence case for headings, American English (the PR template and the `codespell`/Vale CI checks enforce this), and the Oxford comma. (Note: this is about prose. Code-string quote style is *not* a content concern — Prettier auto-formats code to single quotes, no semicolons.)
- **Avoid confusing/cute lines.** Clever wordplay (especially puns that hinge on a product name) often reads backwards or ambiguously. Flag phrasing that could be misread.
- **Avoid marketing fluff.** posthog.com is an information-dense resource for a technical audience (see `agents/apps.md` Style note), more Notion doc than landing page — favor substance over hype.
- **Preserve the author's voice.** Surface tone issues as suggestions; don't rewrite someone's copy into your own style.

---

# Content PRs (`.md` / `.mdx` under `contents/`)

The rules below apply to blog posts, tutorials, docs, handbook, and customer pages. Source: the website handbook (`developing-the-website.md`, `markdown.mdx`, `assets.mdx`, `mdx-setup.mdx`).

## I. Frontmatter

### I1 — Required frontmatter must be present and correctly typed *(Must fix)*

Missing or malformed frontmatter breaks the page or its listing. Required fields by content type:

- **Blog** (`contents/blog/`): `date` (ISO `YYYY-MM-DD`), `title`, `rootPage: /blog` (always exactly that), `author` (array), `category` (one of the defined categories), `featuredImage` (a Cloudinary URL — see J1). Recommended: `seo.metaTitle`, `seo.metaDescription`, `tags`.
- **Tutorials** (`contents/tutorials/`): `date`, `title`, `author` (array), `featuredImage`. Recommended: `tags`, `seo`.
- **Docs / handbook** (`contents/docs/`, `contents/handbook/`): `title`, plus `seo.metaTitle`/`seo.metaDescription`.
- **Customers** (`contents/customers/`): `title`, `customer`, `logo` (Cloudinary), `featuredImage` (Cloudinary), `industries`, `users`, `toolsUsed`, `seo`.

```yaml
# Good — blog post frontmatter
date: 2026-06-03
title: How we built X
rootPage: /blog
author: ["cory-watilo"]
category: Engineering
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/...
seo:
  metaTitle: How we built X
  metaDescription: ...
```

### I2 — `author` handles must exist in `src/data/authors.json` *(Must fix)*

Each entry in the `author` array must match an existing handle in `src/data/authors.json` (e.g. `cory-watilo`). A typo'd or missing handle breaks the byline. Verify every handle in the diff against that file.

### I3 — `category` / `tags` must be from the defined lists *(Should fix)*

Blog `category` must be one of the defined `CategoryData` values; arbitrary categories won't render correctly in the index. Tags should come from the existing tag list. Confirm against existing posts if unsure.

## J. Images & media

### J1 — Images and videos must be Cloudinary URLs, never committed to the repo *(Must fix)*

Assets are hosted on Cloudinary to keep build times down — they are **never** committed to `contents/` or `static/`. Upload via the PostHog.com uploader (profile → Moderator tools → Upload media), not the Cloudinary dashboard. Every image/video reference must be a URL like:

```
https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/...   # images
https://res.cloudinary.com/dmukukwp6/video/upload/posthog.com/contents/...   # videos
```

**Flag two things:**
- Any **added image/binary file** in the diff (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`, `.mp4`) under `contents/` or `static/` — it should be on Cloudinary instead.
- Any `featuredImage` / `logo` / `<img src>` / `![](…)` pointing at a relative path or non-Cloudinary host.

**Exception:** videos over 20 MB that can't go to Cloudinary use `<WistiaEmbed mediaId="…" />`.

### J2 — Screenshots use `<ProductScreenshot>` with a dark-mode image *(Should fix)*

Product screenshots should use `<ProductScreenshot>` so they're framed and distinguishable from the page background, and so they swap for dark mode. Plain Markdown images of UI look broken in dark mode (this is the content-side version of D2).

```mdx
<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/..."
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/..."
  alt="…"
  classes="rounded"
/>
```

`imageDark` is optional (omit → light image used for both), but a UI screenshot without one will look wrong in dark mode — flag it. Videos use `<ProductVideo videoLight={…} videoDark={…} />` where the URLs are `export const`s declared at the top of the file. Use `<Caption>` for captions, not plain text.

### J3 — YouTube embeds must use `youtube-nocookie.com` *(Should fix)*

Embeds (and the `featuredVideo` frontmatter field) must use the `-nocookie` domain for privacy compliance.

```
// Good
https://www.youtube-nocookie.com/embed/{VIDEO_ID}
// Bad
https://www.youtube.com/embed/{VIDEO_ID}
```

## K. MDX components & code blocks

### K1 — Internal links are relative; external/private links use the right component *(Must fix)*

(Content-side restatement of A2/A3.) Internal links must be relative (`/docs/feature-flags`), never `https://posthog.com/...`. External links use `<Link to="…" external>` (icon) or `externalNoIcon`. Private/confidential links (Slack, private GitHub) must use `<PrivateLink url="…">`, never a bare URL.

**Grep:** `https://(www\.)?posthog\.com/` in the diff → internal links that should be relative.

### K2 — Don't hardcode product / customer / competitor data *(Should fix)*

Data that lives in a hook must be sourced from it, not retyped inline:
- Product lists / cards → `<ProductList>` / `useProduct` (`src/hooks/useProduct.ts`). Always consume `useProduct` — it cascades to `useProducts.tsx` internally; don't import `useProducts.tsx` directly for product metadata.
- Customer quotes → `<OSQuote>` / `useCustomers` (add the customer to `src/hooks/useCustomers.tsx` first)
- Competitor comparison tables → `<ProductComparisonTable>`, with values in `src/hooks/competitorData/` and feature labels in `src/hooks/featureDefinitions/`. Don't add `features` arrays to product data files.

Hardcoded product names, icons, colors, or comparison rows go stale and get flagged.

Two `<ProductComparisonTable>` gotchas: a competitor cell set to `false` renders a red ✗, while an omitted/`undefined` value renders **blank** — they mean different things, so don't use one for the other. And in blog/MDX use the default `autoExpand={false}` (renders only the rows you list); `autoExpand={true}` is for product pages and dumps the full feature set. (Source: `src/components/ProductComparisonTable/README.md`.)

### K3 — Code-block fences follow the repo's param syntax *(Should fix)*

- Language tag immediately after the opening fence: ` ```json `.
- Filename/params are **unquoted** and space-delimited: ` ```yaml file=values.yaml `, ` ```js filename=index.js focusOnLines=4-14 `. Quotes around the filename break parsing.
- Multi-language examples use `<MultiLanguage>` with **blank lines** around the tag and between each snippet, or they won't render.

### K4 — Use `<ArrayCTA>` sparingly *(Consider)*

CTA blocks belong on high-intent pages (comparisons, product pages), not sprinkled through docs/blog. Flag overuse.

## L. SEO, structure & placement

### L1 — Every page/post needs SEO metadata *(Should fix)*

posthog.com lives or dies on organic search, so a new page or post without `seo.metaTitle` and `seo.metaDescription` is a real miss — flag it. `featuredImage` doubles as the social/OG share image, so a post without one shares as a blank card. A good `metaDescription` is a concise, ~150-char summary, not a truncated first sentence.

### L2 — Internal links *(Consider)*

PostHog content is heavily interlinked for SEO and navigation. A new blog post or doc that doesn't link out to any relevant existing docs/posts is usually under-linked — suggest adding a few relative-URL internal links to related content. The `suggest-links` skill can generate good candidates from the internal-linking resource.

### L3 — Put docs in the right repo *(Should fix)*

Most docs live here under `contents/docs/`, but content **tightly coupled to the product codebase** (engineering handbook pages, SDK-coupled product docs) lives in the monorepo's `docs/published/` and is pulled in at build time — it should *not* be added here. When reviewing a new docs page, ask: does this describe something internal to the monorepo codebase? If so, it likely belongs in the monorepo, not this repo (source: `CLAUDE.md`).

### L4 — Heading hierarchy *(Consider)*

Don't skip heading levels (h2 → h4) and don't introduce a second `<h1>` in body content — the page title is the h1. Clean hierarchy drives the on-page table of contents and SEO. (markdownlint catches some of this; structure it correctly anyway.)

### L5 — `src/navs/index.js` and docs sidebars are shared / "ask first" *(Must fix)*

`src/navs/index.js` feeds the docs and handbook sidebars and is **shared with the live site** — modifying it is an "ask-first" action. A new docs/handbook page still needs a sidebar entry to be reachable, so flag a new page that isn't wired into its nav, but treat editing the nav file itself as a deliberate, flagged change (filter on the front end during local dev rather than editing it casually).

## M. Prose conventions (Vale-enforced, content only)

These are objective rules the project's Vale linter enforces on `contents/` prose. Unlike subjective tone (group H), these are safe to fix directly. Pre-empting them keeps a content PR from coming back covered in linter comments. Run `pnpm vale:staged` locally to check. (Source: `.vale/styles/PostHogBase/`, PostHog style guide.)

### M1 — Use a spaced en dash, not an em dash or spaced hyphen *(Should fix)*

This is the most-flagged rule and counterintuitive: PostHog style uses a **spaced en dash ` – `** for parenthetical and range dashes — *not* an em dash (`—`) and not a spaced hyphen (` - `).

```
Good:  PostHog is fast – really fast.
Bad:   PostHog is fast — really fast.     (em dash)
Bad:   PostHog is fast - really fast.     (spaced hyphen)
```

**Grep:** `—` (em dash) or ` - ` (spaced hyphen) in `contents/` prose.

### M2 — Capitalize product and technology names correctly *(Should fix)*

Vale's term rules flag wrong casing. Common ones: **PostHog** (not "posthog"/"Posthog"), **GitHub** (not "github"), **JavaScript**, **TypeScript**, **PostgreSQL**, **PR**, **API**. Product names follow their canonical casing (e.g. "Feature Flags", "Session Replay" when used as product names).

### M3 — Headings in sentence case (product names keep their casing) *(Should fix)*

Headings are sentence case — only the first word and proper nouns/product names are capitalized. "Setting up feature flags", not "Setting Up Feature Flags".

### M4 — American English, Oxford comma, descriptive link text *(Should fix)*

Use American spelling ("color", "behavior", "analyze"), the Oxford comma, and descriptive link text — never "click here" or a bare URL as the anchor (Vale's `DescriptiveLinkText`). `[set up feature flags](/docs/feature-flags)`, not `[click here](/docs/feature-flags)`.
