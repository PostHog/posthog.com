# Pricing/Platform

Platform packages — the paid add-ons that cover team management (SSO, audit logs, custom roles, project permissions) rather than product usage.

## Files

| File | What it is |
| --- | --- |
| `usePlatform.ts` | Hook. Returns the `platform_and_support` billing product, with `legacy_product` addons filtered out. |
| `PlatformPackageComparison.tsx` | The two blocks that answer "what's in a package": `PlatformPackageList` and `PlatformFeatureTable`. |

## `PlatformPackageComparison`

Two named exports, no default:

- **`PlatformPackageList`** — each package's name, description, and monthly price, in a grid.
- **`PlatformFeatureTable`** — an `OSTable` with one row per feature and one column per package.

### Why two components instead of one

Each caller introduces this content differently. `/platform-packages` gives each block a page-level `<h2>` ("Available packages", "Feature comparison"); the pricing page's inline reveal is already inside a card titled "Platform packages" and wants a lighter `<h4>` on just the table. A single component with a `showHeadings` boolean can't serve both, and threading heading levels through as props is worse than letting callers own their own headings.

### Consumers

| Consumer | Renders |
| --- | --- |
| `pages/platform-packages` | Both, under `<h2>`s, plus its own intro and "get started" copy |
| `Pricing/Redesign/MoreOptions` | Both, in the panel that expands under the three cards |

Anything price- or feature-related belongs here rather than in a consumer, or the two will drift.

## Data notes

**`inclusion_only` addons are filtered out.** They exist to be bundled into other packages and have no price of their own, so they'd show up as a nameless empty column.

**Enterprise is quote-only.** `PlatformPackageList` checks `addon.type === 'enterprise'` and renders a "Contact us" link to `/talk-to-a-human?edition=enterprise` where the other packages render a number.

**Support response time is left off the feature table.** It's the one feature that varies by degree rather than presence, and it's a support-tier question rather than a platform one.

**Feature descriptions are read from whichever package lists the feature first.** A given feature's description is the same everywhere it appears, so the table doesn't need to reconcile them.

## Container queries

`PlatformPackageList` declares its own `@container`. This is load-bearing: `ReaderView` only wraps **mdx** bodies in an unnamed `@container`, so a page that passes `children` — `/platform-packages` does — gives `@3xl:` nothing to resolve against, and the grid would silently stay single-column at every width.
