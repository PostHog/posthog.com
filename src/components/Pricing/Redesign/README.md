# Pricing redesign

Components for the redesigned pricing page, live at **`/pricing/redesign`** (`src/pages/pricing/redesign.tsx`).

This is a **mockup route**. The existing `/pricing` page (`src/pages/pricing/index.tsx`) is untouched, so the two can be compared side by side before anything is swapped over.

## Why

The old page tried to serve everyone at once and ended up making the visitor do the sorting. The redesign targets two audiences in order:

1. **People trying something out** — usually small, don't know what they want yet. They need to be assured of zero risk and easy setup. Answered by the hero, the free-tier grid, and a single no-card CTA.
2. **People sizing PostHog up for scale** — already large or getting there. They need a credible estimate and a human. Answered by the calculator, the FAQ, and `MoreOptions`.

## What was cut from `/pricing`

| Removed | Component | Reason |
| --- | --- | --- |
| Usage-based pricing / rates | `Test/PaidPricing` (rates accordion) | Per-product rate tables ahead of the calculator. The calculator answers the same question better. |
| Compare plans | `Test/PlanColumns` | Three plan columns implied a decision that doesn't exist at signup. Replaced by `PricingJourney`. |
| "Give PostHog a try" | inline in `PricingExperiment` | Redundant mid-page CTA. |
| Y Combinator quote | `Pricing/Quote` | Single-quote social proof, replaced by `CustomerLogos`. |
| Product comparisons | `Test/SimilarProducts` | Competitor feature grid — a different question than "what will this cost me". |
| Add-ons | `Test/Addons` | Detail for existing customers, not people deciding. Still on `/platform-packages` and `/addons`. |
| Frequently purchased with | `Test/PurchasedWith` | Logo carousel of unrelated tools. |
| Product screenshot slider | `Test/ImageSlider` | Didn't fit alongside a full-width headline, and screenshots aren't a pricing question. |
| "Jump to" table of contents | `ReaderView` right sidebar | Suppressed with `hideRightSidebar`; buys ~290px of content width. |

Kept as-is and reused: `Test/FreeTier`, `Test/Calculator`, `FAQs`, `pages/pricing/philosophy`.

## Page order

1. `Hero`
2. `FreeTierTicker` — the free allowances, auto-scrolling in one row
3. `PricingJourney` — the two billing stages, as a journey
4. `Calculator`
5. `CustomerLogos`
6. `MoreOptions`
7. Philosophy note
8. FAQ

`CustomerLogos` sits after the calculator rather than next to the free-tier row on purpose — see its section below.

The page passes `hideRightSidebar` to `ReaderView`, so there's no "Jump to" table of contents and the content column gets the full window width (~1017px at a maximized window vs ~730px with the sidebar). The page is short enough after the cuts that a TOC wasn't earning its space.

## Components

### `Hero`

Headline (`Start free, scale when you need.`) plus the 97%-use-it-free framing, the primary CTA, and a hedgehog graphic. The only display-sized type on the page — everything below is evidence for this one sentence.

The green highlight on "when you need." uses `bg-green/25` with `text-green-dark` / `dark:text-lime-green`, and `box-decoration-clone` so the highlight wraps cleanly across lines at narrow container widths.

**Image:** `src/images/pricing-hero-desk.png` — a **temporary placeholder** (see Open items). It's a transparent-background PNG, which is why it sits cleanly on the dotted panel.

It renders as a plain `<img>` with a direct webpack import (`import HeroDesk from '../../../images/pricing-hero-desk.png'`), matching the pattern in `components/Squeak/components/Classic/*`. **Do not reach for `StaticImage` or `GatsbyImage` here.** This repo lists `gatsby-plugin-image` in `gatsby-config.js` but *not* `gatsby-plugin-sharp`, so any use of those components fails the build with `ERROR #11321 – Gatsby-plugin-sharp wasn't setup correctly`. Several files import `StaticImage` without ever rendering it, which makes it look supported when it isn't. `src/custom.d.ts` already declares `*.png` so the direct import type-checks.

**Backdrop:** the dotted panel uses the `.paper-desk` class added at the bottom of `src/styles/global.css`, ported from the `.PaperDesk` rule on the PostHog app's login screen — a non-repeating warm glow layered over a repeating 16px dot grid. It's plain CSS rather than Tailwind because a two-layer background with per-layer `background-repeat` and `background-size` is unreadable as arbitrary utilities, and it needs a `.dark` override (light dots on dark instead of dark dots on light).

### `PricingJourney`

Free and pay-as-you-go as **two numbered stops on a journey**, not two plans in a table.

This replaced an `OSTable` delta table. The table was accurate but framed the two modes as a choice to make at signup, and they aren't one: everybody starts on the left, and the right side is something that happens later, from inside the product. Numbering the states and pointing an arrow between them says that without a caption.

Three details carry most of the meaning:

- **Step 2 is additive, not alternative.** It opens with "Everything in Free, plus" and every item is a delta (`6 projects – up from 1`), so the load-bearing claim of the page — adding a card doesn't take the free tier away — is structural rather than a footnote.
- **Only step 1 has a CTA.** Step 2's action lives in PostHog's billing settings, so a button there would imply a second decision today. Its footer says "Nothing to do today" instead. The section therefore has exactly one signup link.
- **Step 1 is solid and badged in yellow; step 2 has a dashed border and an outlined badge.** Weight signals "now" vs. "later" before any of the copy is read.

**The connector deliberately has no connecting rule.** Side by side the middle column is only ~112px wide, so a horizontal line would be a few pixels either side of the chip; and a line running *behind* the chip would need an opaque background to mask it, which this section can't provide — it sits on the window's translucent backdrop, so no fixed colour matches. The badges plus a `rotate-90 @2xl:rotate-0` arrow (down when stacked, right when side by side) carry the sequence instead.

Breakpoint is `@2xl` (672px), not `@3xl` — see the container-width note under Conventions.

### `FreeTierTicker`

The monthly free-tier allowances as a **single-row, auto-scrolling marquee** wrapping `Test/FreeTier`.

Reuses the technique from [`components/Home/ToolsTicker`](../../Home/ToolsTicker/README.md): the strip renders twice inside a `flex w-max` track, and the shared `tools-ticker-marquee` keyframe (in `global.css`) animates it `translateX(0)` → `translateX(-50%)`, i.e. exactly one copy's width, so the loop is seamless for any number of items. The duplicate is `aria-hidden` so AT encounters each item once.

**The seam depends on `STRIP_GAP_CLASS` and `STRIP_TRAILING_CLASS` matching** (`gap-12` / `pr-12`). The trailing padding stands in for the gap between the last item of one copy and the first of the next. Change one without the other and a visible hitch appears once per loop.

**Duration is derived from measured width** (`scrollWidth / PIXELS_PER_SECOND`) via a `ResizeObserver`, rather than counting items like ToolsTicker does. `FreeTier` owns its own list here, so item count isn't available to this component — and measuring also keeps the apparent speed constant when label lengths change. Currently ~43s per loop at 55px/s.

**Edge fades use CSS `mask-image`, not an overlaid gradient.** This is deliberate: `ScrollArea`'s `fadeX` prop paints a gradient in a fixed colour, which reads as a grey/white block against this section's translucent window backdrop. A mask makes the pixels genuinely transparent, so it works on any background and in both colour modes. Don't swap it back for `fadeX`.

Pauses on hover and focus. Under `prefers-reduced-motion: reduce` the animation is disabled and the row becomes a manually scrollable `overflow-x-auto` strip.

### `CustomerLogos`

Twelve high-profile customers as a horizontal rail on a tinted band, with the heading inline on the left. Data comes from `hooks/useCustomers` via `getCustomers()` — the same source as `/customers` and the homepage wall — so logos and light/dark variants stay in sync.

**Why a rail and not a grid:** the free-tier section is already an icon-and-label grid. A centered logo grid next to it read as the same component twice. One dense row also communicates "lots of companies" better than a tidy 3x4 matrix. It's placed after the calculator so it isn't adjacent to the free-tier grid at all.

Unlike `components/Home/Customers`, there's no shuffle button or breakdown labels: the job here is reassurance, not play.

**Note on logo heights:** customer records carry `height` as a Tailwind scale value. This component maps those to literal class names via `LOGO_HEIGHT_CLASSES` rather than interpolating `h-${n}`, because interpolated classes aren't in `safelist.txt` and only survive purge by coincidence elsewhere in the codebase. The rail uses one step smaller than `/customers` does, to keep the row compact.

### `SignupBlock`

Cloud region picker + the single `Get started - free` CTA + today's signup count.

This duplicates the region/CTA/count block currently inlined at the bottom of `Test/PlanContent.tsx`. It was extracted here rather than shared, deliberately: `PlanContent` is on the live `/pricing` page and this is an unapproved mockup. **If the redesign ships, delete the inlined copy in `PlanContent` and import this instead.**

### `MoreOptions`

Three quiet cards — Startups (`/startups`), Platform packages (`/platform-packages`), and enterprise volume (`/talk-to-a-human`).

These replace the cut Enterprise plan column. Styled as low-key cards rather than plan tiers so they don't compete with the single signup CTA above them.

## Conventions

- All breakpoints are `@container` queries. Every one of these renders inside a resizable OS window, so media queries would break at window widths that don't match the viewport.
- **Calibrate container breakpoints against the real column width.** Each component here declares its own `@container`, which resets the query reference to that component's width — not the viewport's. With `hideRightSidebar`, the content column measures ~1017px at a maximized window and ~710–730px at a 1100–1440px viewport. So `@4xl` (896px) only fires when maximized and `@5xl`+ never fires. Breakpoints above `@4xl` in these components are dead code; verify by measuring rather than assuming.
- Colors are project tokens only (`bg-light dark:bg-accent`, `border-primary`, `text-secondary`, `text-green`).
- Section chrome comes from `Test/Sections` (`SectionLayout`, `SectionHeader`) to match the rest of the pricing pages.

## Open items

- **The hero image is a placeholder.** `src/images/pricing-hero-desk.png` was dropped in as a stand-in ("for the time being") and is an unoptimized 1.1MB PNG committed to the repo. Before shipping, either replace it with the final art or move it to Cloudinary and use `CloudinaryImage` like the rest of the site's imagery, so it isn't shipped raw in the bundle.
- **The 97% stat** in `Hero` is taken from the design mockup. The live page says "more than 90%". Verify the real number before this ships.
- **No closing CTA.** The page ends on the FAQ. `components/Home/CTA` (the "PostHog Web / digital download" box) was left off because the hero, `PricingJourney`, and the philosophy note already carry three CTAs. Easy to add back at the bottom of the page if the drop-off says otherwise.
- **If this replaces `/pricing`**, add a redirect for `/pricing/redesign` in `vercel.json` and check that `?plan=free` / `?plan=paid` inbound links (previously handled by the plan toggle) still land somewhere sensible — the toggle no longer exists.
