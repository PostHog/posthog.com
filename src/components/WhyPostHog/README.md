# WhyPostHog

Shared layout for the **"Why PostHog?"** page collection — a handful of
narrative pages that share one left-sidebar navigation.

`WhyPostHogViewer` wraps the [`Viewer`](../Viewer) template (the same template the
homepage uses) and injects the collection's sidebar. Each nav entry is its own
**individual page** (like the docs nav), not an anchor-scroll section.

> The homepage (`/`) is **not** in this collection — it renders `Viewer` directly
> with `controlsPlacement="header"` and no nav sidebar. It stays an entry in
> `whyPostHogNav` only as a link target from the other pages' nav.

## What it renders

`WhyPostHogViewer` passes two props to `Viewer`:

- **`sidebarHeader`** → [`Header.tsx`](./Header.tsx): a static `IconLogomark` +
  "Why PostHog?" label (no dropdown, not a link).
- **`leftSidebar`** → [`TreeMenu`](../TreeMenu) with `appearance="sidebar"`, fed by
  [`whyPostHogNav`](../../navs/whyPostHog.ts). The current page is highlighted
  automatically from the pathname.

The `Viewer` renders these as a persistent ~250px sidebar column (header + page
search + nav) on `@3xl`+ containers, collapsing to a menu button that expands the
search + nav **downward** on narrow ones. Page search (mark.js highlight) is
provided by `Viewer`'s sidebar (`InlineSearch`), wrapped in
[`components/Editor/SearchProvider`](../Editor/SearchProvider.tsx).

`proseSize` defaults to `lg`; all other `Viewer` props pass through (SEO is set by
the page).

## Usage

```tsx
import WhyPostHogViewer from 'components/WhyPostHog'
import SEO from 'components/seo'

export default function MyPage() {
    return (
        <>
            <SEO title="My page – PostHog" />
            <WhyPostHogViewer>
                <h1>My page</h1>
                {/* narrative prose */}
            </WhyPostHogViewer>
        </>
    )
}
```

## Adding a page to the collection

1. Add a `{ name, url }` entry to [`src/navs/whyPostHog.ts`](../../navs/whyPostHog.ts).
2. Create the page in `src/pages/` rendering `WhyPostHogViewer`.
3. If the URL replaces or moves an existing page, add a redirect in `vercel.json`.

## Pages in the collection

| Page | URL |
| --- | --- |
| What is PostHog? | `/101` |
| Works with your agents | `/workflow` |
| Why we exist | `/why` |
| Why people like us | `/moat` |
| How to get started | `/start` |
