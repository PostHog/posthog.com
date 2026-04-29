# CarouselSlide

Renders the body of a `TabbedCarousel` tab from a structured `CarouselSlide` config. Designed so per-product carousel content (Applications, TopFeatures, etc.) can live in product-data hook files like [`session_replay.tsx`](../../../hooks/productData/session_replay.tsx) instead of being inlined as JSX in templates — making the templates themselves product-agnostic and reusable across products.

## What this component is for

The two product-page templates that use `TabbedCarousel` ([Applications](templates/Applications.tsx) and [TopFeatures](templates/TopFeatures.tsx)) used to define their tab content inline as ~125 lines of JSX. Each new product would have to fork the templates to swap copy, screenshots, and styling.

`<CarouselSlide>` lifts that content into a structured schema so every per-product detail (heading, description, screenshot, layout) lives in a `CarouselSlide[]` array on the page. The template receives `slides` as a prop, maps the array to `<TabbedCarousel>` tabs, and hands each one to `<CarouselSlide>`.

```tsx
// In a template
<TabbedCarousel
    tabs={slides.map((s) => ({
        value: s.slug,
        label: s.label,
        icon: s.icon,
        color: s.color,
        activeText: s.activeText,
        progressBar: s.progressBar,
        content: <CarouselSlide slide={s} productData={productData} />,
    }))}
/>
```

## Layouts

Two layout primitives. Pick via `layout: 'stack' | 'float'` on the slide.

### `stack` — image below content

Heading + description + bullets render in a padded prose block, then the image renders below in a framed wrapper that spans the slide's full width.

```
┌────────────────────────────────────┐
│  Heading                           │
│                                    │
│  Description paragraph...          │
│                                    │
│  • Bullet one                      │
│  • Bullet two                      │
├────────────────────────────────────┤  ← framed wrapper (bg-tan + border-t)
│  ┌──────────────────────────┐      │
│  │      [screenshot]        │      │
│  └──────────────────────────┘      │
└────────────────────────────────────┘
```

Best for landscape/wide screenshots where the image is best showcased at the slide's full width. Image is left-aligned by default within its container.

### `float` — image floats right at wide widths

At narrow container sizes the image stacks above the prose. At `@2xl/reader-content` and above the image floats right and the prose flows around it.

```
narrow:                          wide (@2xl/reader-content+):
┌──────────────────┐             ┌────────────────────────────────────┐
│  [screenshot]    │             │  Heading                           │
└──────────────────┘             │                                ┌─┐ │
┌──────────────────┐             │  Description that flows around │ │ │
│  Heading         │             │  the floating screenshot...    │ │ │
│  Description...  │             │                                │ │ │
│  • Bullets       │             │  • Bullets here too            │ │ │
└──────────────────┘             │                                └─┘ │
                                 └────────────────────────────────────┘
```

Best for portrait or smaller screenshots where text-wrapping reads well. Optional `<Glow>` halo around the image, opt-in via `image.glow`.

## Props

```tsx
<CarouselSlide slide={slide} productData={productData} />
```

| Prop | Type | Notes |
|---|---|---|
| `slide` | `CarouselSlide` | The slide config (see schema below). |
| `productData` | `any` | Used for resolving `image` string refs (`productData.screenshots[key]`), default glow color (`productData.color`), and the image alt fallback (`productData.name`). |

## Schema: `CarouselSlide`

Defined in [types.ts](types.ts). All fields:

### Tab strip

These are passed through to `TabbedCarouselTab` by the template — they're on the slide config so a productData author defines everything in one place.

| Field | Type | Required | Notes |
|---|---|---|---|
| `slug` | `string` | yes | Becomes the carousel tab's `value`; used as the React key and the tab anchor. Should be unique within the carousel. |
| `label` | `React.ReactNode` | yes | Tab-strip text. Plain string in most cases. |
| `icon` | `React.ReactNode` | no | Tab-strip icon. Imported as JSX in productData (e.g. `<IconList className="size-5" />`). The shared `TabbedCarousel` auto-detects icon presence and switches to a stacked icon-above-label layout when any tab has one. |
| `color` | `string` | yes | Tailwind background class for the active tab (e.g. `'bg-white'`, `'bg-white dark:bg-dark'`). |
| `activeText` | `string` | yes | Tailwind text color for the active tab (e.g. `'text-primary'`). |
| `progressBar` | `string` | yes | Tailwind background class for the active tab's auto-advance progress bar (e.g. `'bg-yellow'`). |

### Layout

| Field | Type | Required | Notes |
|---|---|---|---|
| `layout` | `'stack' \| 'float'` | yes | See [Layouts](#layouts) above. |

### Body content

| Field | Type | Required | Notes |
|---|---|---|---|
| `heading` | `string` | no | Renders as `<h3>`. Omit for image-only or prose-without-heading slides. |
| `description` | `string \| React.ReactNode` | no | Strings are wrapped in `<p>`. Pass `ReactNode` (typically a `<>...</>` Fragment) for complex bodies that need multiple paragraphs, inline links, inline icons, or bullets-in-the-middle layouts (see [Trailing prose pattern](#trailing-prose-pattern)). |
| `bullets` | `SlideBullet[]` | no | Renders below the description as a `<ul className="space-y-4 mb-4">`. Each bullet is `<strong>{title}</strong> {description}`. Omit if bullets need to live inside the description (e.g. when prose follows them). |

### Image

| Field | Type | Required | Notes |
|---|---|---|---|
| `image` | `string \| ImageConfig` | no | String shorthand resolves `productData.screenshots[key]`. Object form lets you carry overrides (`maxWidth`, `containerClassName`, `imgClassName`, `glow`, `frameless`). Omit for prose-only slides. See [Image config](#image-config-imageconfig). |

### Overrides

| Field | Type | Required | Notes |
|---|---|---|---|
| `className` | `string` | no | Extra classes on the slide root. Appended after the default `@container p-4 @2xl/reader-content:p-8 @4xl/reader-content:p-10` padding. Use Tailwind's `!` prefix for `!important` overrides (e.g. `'!p-0'` to nuke default padding). |

## Image config (`ImageConfig`)

Used when `slide.image` is an object instead of a string shorthand.

| Field | Type | Default | Notes |
|---|---|---|---|
| `src` | `string` | required *(unless `ref` is set)* | Light-mode source URL (typically Cloudinary). Mutually exclusive with `ref`. |
| `srcDark` | `string` | none | Dark-mode source URL. When present and the site theme is dark, this is used instead of `src`. Falls through to `src` when omitted. |
| `ref` | `string` | none | Lookup key into `productData.screenshots`. The matching entry's `src`/`srcDark`/`alt` are merged in as defaults; any other fields on this object override them. **Use this when you want the screenshots catalog to remain the single source of truth for image URLs but you need to override styling on this slide.** |
| `alt` | `string` | catalog `alt` → `productData.name` | Alt text for the `<img>`. |
| `maxWidth` | `string` | layout-dependent | Tailwind max-width class. `stack` defaults to `@2xl/reader-content:max-w-3xl`; `float` defaults to `max-w-md @2xl:max-w-sm @3xl:max-w-md`. Override examples: `'max-w-none'` (full width), `'max-w-2xl'`. |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Alignment of the image within its container (only meaningful when `maxWidth` is narrower than container). |
| `frameless` | `boolean` | `false` | `stack` layout only. When `true`, skips the default `bg-tan dark:bg-dark p-4 border-t border-primary` framed wrapper. Useful for full-bleed images that should butt against the slide bottom. |
| `containerClassName` | `string` | none | Extra classes on the wrapper div around the image. Appended after the renderer's defaults so later utilities can override earlier ones. Example: `'pb-0 leading-[0]'`. |
| `imgClassName` | `string` | none | Extra classes on the `<img>` element itself. Appended after the defaults. The `stack` default applies `h-auto border border-secondary rounded-md`; pass `'border-0 rounded-none'` to drop the border. |
| `glow` | `boolean \| GlowColor` | `undefined` | `float` layout only. `true` wraps the image in `<Glow>` using `productData.color`; pass a specific `GlowColor` (`'red'`, `'blue'`, etc.) to override. Ignored in `stack` layout. |

### Image source: three modes

```tsx
// 1. String shorthand — resolves productData.screenshots.filters with no overrides
image: 'filters'

// 2. Catalog ref + overrides — pulls src/srcDark from screenshots.filters, but lets this
//    particular slide override styling. Recommended when an image is in the catalog but
//    you need to tweak how it renders on one slide.
image: { ref: 'filters', imgClassName: 'border-0 rounded-none' }

// 3. Direct URLs — for true one-offs that aren't in the screenshots catalog
image: {
    src: 'https://res.cloudinary.com/.../foo.png',
    srcDark: 'https://res.cloudinary.com/.../foo_dark.png',
    maxWidth: 'max-w-none',
}
```

The `ref` form keeps the screenshots catalog as the single source of truth for URLs — you don't have to duplicate the URLs in the slide config when you only need to add styling overrides.

**Class merging:** `containerClassName`, `imgClassName`, and `slide.className` are appended after the renderer's defaults using plain template-string composition. Later utilities sit later in the className string, so they win on Tailwind's "last wins" rule for utilities of the same property. For overrides where source order isn't enough (e.g. nuking the default padding), use Tailwind's `!` prefix (`'!p-0'`).

## Bullets (`SlideBullet`)

```tsx
{ title: string; description?: React.ReactNode | string }
```

Rendered as `<li><strong>{title}</strong> {description}</li>`. The bullet list itself uses `space-y-4 mb-4` and is unstyled-disc (browser default).

## What comes free (defaults you don't have to specify)

- **Slide padding**: `@container p-4 @2xl/reader-content:p-8 @4xl/reader-content:p-10` on the prose container (`stack`) or root (`float`). Override via `slide.className`.
- **Stack image framing**: `bg-tan dark:bg-dark p-4 border-t border-primary` wrapper + `h-auto border border-secondary rounded-md` on the img. Bypass with `image.frameless: true` or override with `image.containerClassName` / `image.imgClassName`.
- **Stack image max-width**: `@2xl/reader-content:max-w-3xl` (left-aligned within its container). Good for landscape screenshots.
- **Float image position**: floats right at `@2xl/reader-content` with margin offsets that escalate at `@2xl` / `@3xl` / `@4xl/reader-content`. Stacks above prose at narrower sizes.
- **Float image max-width**: `max-w-md @2xl:max-w-sm @3xl:max-w-md` (responsive — narrower when wedged into the float position).
- **Theme-aware image**: when `siteSettings.theme === 'dark'` and `image.srcDark` exists, `srcDark` is used. Otherwise falls through to `src`.
- **Image alt fallback**: `image.alt` ⟶ `productData.name`.
- **Float glow color fallback**: `productData.color` (the product's brand color).

## Common recipes

### Simple stack slide with a default-framed image

```tsx
{
    slug: 'filter',
    label: 'Find something specific',
    icon: <IconTarget className="size-5" />,
    color: 'bg-white dark:bg-dark',
    activeText: 'text-primary',
    progressBar: 'bg-blue',
    layout: 'stack',
    heading: 'Find something specific',
    description: "You can search by a user's info like email address, location, or organization.",
    image: 'filters',
}
```

### Full-bleed image (no bottom padding, edge-to-edge with rounded top only)

```tsx
{
    slug: 'explore',
    label: 'Just want to explore?',
    icon: <IconCoffee className="size-5" />,
    color: 'bg-white dark:bg-dark',
    activeText: 'text-primary',
    progressBar: 'bg-yellow',
    layout: 'stack',
    heading: 'Just want to explore?',
    description: "Crack open the app and you'll see a list of recent sessions...",
    image: {
        ref: 'recordings',                                     // pulls URLs from productData.screenshots.recordings
        maxWidth: 'max-w-none',
        containerClassName: 'pb-0 leading-[0]',                // appended after defaults; later utilities win
        imgClassName: 'border-b-0 rounded-b-none',
    },
}
```

### Borderless image inside the framed wrapper (keeps bg + top border, drops the img border)

```tsx
{
    slug: 'research',
    layout: 'stack',
    // ... other fields ...
    image: { ref: 'chat', imgClassName: 'border-0 rounded-none' },
}
```

### Floating image with brand-color glow

```tsx
{
    slug: 'event-timeline',
    label: 'Event timeline',
    icon: <IconList className="size-5" />,
    color: 'bg-white',
    activeText: 'text-primary',
    progressBar: 'bg-yellow',
    layout: 'float',
    heading: 'Event timeline',
    description: '...',
    image: { ref: 'overview', glow: true },                    // glow color comes from productData.color
}
```

### Floating image with a specific glow color

```tsx
image: { ref: 'overview', glow: 'purple' }                     // any GlowColor: yellow|blue|red|green|purple|orange|teal|seagreen|black|white
```

### Centered image (less than full-width, centered)

```tsx
image: { ref: 'screenshot', maxWidth: 'max-w-md', align: 'center' }
```

## Trailing prose pattern

The renderer's body order is `heading → description → bullets`. There's no built-in `afterBullets` slot. If you need prose **after** the bullets (e.g. the TopFeatures Event timeline pattern), put the entire body inside `description` as a Fragment and skip the `bullets` field:

```tsx
{
    layout: 'float',
    heading: 'Event timeline',
    description: (
        <>
            <p>Lead paragraph that introduces the bullets...</p>
            <ul className="space-y-4 mb-4">
                <li><strong>Item one</strong> describes the first thing.</li>
                <li><strong>Item two</strong> describes the second thing.</li>
            </ul>
            <p>Trailing paragraph after the bullets, with inline icons or links here.</p>
        </>
    ),
    // bullets is omitted — they live inside description
}
```

This keeps the schema simple at the cost of one slightly-clunky JSX block in productData. For the simpler "paragraph + bullets" case, use the structured fields:

```tsx
description: 'Plain paragraph.',
bullets: [
    { title: 'Item one', description: 'first thing' },
    { title: 'Item two', description: 'second thing' },
],
```

## Where slide arrays live

Slide arrays live in the **page file** alongside the rest of the page-owned menu. Each menu item that uses a carousel template carries its slides via `props: { slides }`, which the [`ProductReaderView`](index.tsx) shell passes through to the rendered component. Templates take `slides: CarouselSlide[]` directly as a prop — they no longer read from productData.

```tsx
// src/pages/session-replay/index.tsx
import { IconTarget, IconBolt, IconCursorClick, IconSparkles /* ... */ } from '@posthog/icons'
import type { CarouselSlide, ProductNavItem } from 'components/Products/ReaderViewProduct/types'
import { Applications, TopFeatures /* ... */ } from 'components/Products/ReaderViewProduct/templates'

const applications: CarouselSlide[] = [
    {
        slug: 'filter',
        label: 'Find something specific',
        icon: <IconTarget className="size-5" />,
        // ... etc
    },
    // ...
]

const topFeatures: CarouselSlide[] = [/* ... */]

export const productMenu: ProductNavItem[] = [
    // ... other items ...
    {
        slug: 'applications',
        name: 'How do I use it?',
        group: 'divided',
        icon: <IconCursorClick className="size-4" />,
        component: Applications,
        props: { slides: applications },
    },
    {
        slug: 'top-features',
        name: 'Top features',
        group: 'divided',
        icon: <IconSparkles className="size-4" />,
        component: TopFeatures,
        props: { slides: topFeatures },
    },
]
```

### Why the page (not the productData hook)

Slide content is dense JSX (icons, Fragments for trailing prose, links, inline icons) that would drown out the rest of the product config in the hook file — addons, sliders, comparison tables, FAQs, etc. Keeping slides in the page colocates them with the menu item that uses them, makes the productData hook readable, and means slide content can use page-level imports (icons, Link, etc.) without polluting the hook's import block.

If a future product genuinely needs to share identical slide content across multiple pages, you can lift the array into the productData hook and import it into each page that needs it — but pass it through the menu item's `props` either way. The shell does not auto-pull slides from productData.

## Adding the same carousel to a new product

1. Define `applications: CarouselSlide[]` and/or `topFeatures: CarouselSlide[]` in the new product's page file.
2. If using the `image: 'key'` shorthand or `image: { ref: 'key', ... }`, make sure those keys exist in `productData.screenshots` on the hook file.
3. Add a menu item to the product's `productMenu` with `component: Applications` (or `TopFeatures`) and `props: { slides: applications }` (or `topFeatures`). The `slug` is just the section anchor — it can be anything.
4. No template/component code changes needed.

## Out of scope

- The **homepage hero** ([`HeroCarousel/slides.tsx`](../../Home/HeroCarousel/slides.tsx)) intentionally stays bespoke — its slides do graphql fetching, custom positioning systems, and multi-column layouts that don't fit the schema. They're not in productData and don't need to be.
- Per-product **section title and intro paragraph** (the `<h2>How do I use it?</h2>` and intro `<p>` above the carousel in templates) are still hardcoded in the templates. Promote to productData if/when a second product needs different copy.
