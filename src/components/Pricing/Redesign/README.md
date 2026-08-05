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

Kept and reused: `Test/FreeTier`, `Test/Calculator`, `FAQs`, `pages/pricing/philosophy`. Of these, only `Test/Calculator` was modified — two optional props (`hideHeader`, `id`), both defaulting to its previous behavior, so `/pricing` renders identically.

## Page order

1. `Hero`
2. `FreeTierTicker` — the free allowances, auto-scrolling in one row
3. `PricingJourney` — the two billing stages, as a journey
4. `CustomerLogos`
5. Philosophy note
6. `MoreOptions` — three cards, then `CalculatorReveal` as a quiet footnote in the same section
7. FAQ

`CustomerLogos` sits after `PricingJourney` rather than next to the free-tier row on purpose — see its section below. The calculator is intentionally late on the page (above the FAQ) so first-time visitors hit free-tier reassurance before an estimator.

The page passes `hideRightSidebar` to `ReaderView`, so there's no "Jump to" table of contents and the content column gets the full window width (~1017px at a maximized window vs ~730px with the sidebar). The page is short enough after the cuts that a TOC wasn't earning its space.

## Components

### `Hero`

Headline (`Start free, scale when you need.`) plus the 97%-use-it-free framing, the primary CTA, and the boxed-software graphic. The only display-sized type on the page — everything below is evidence for this one sentence.

The green highlight on "when you need." uses `bg-green/25` with `text-green-dark` / `dark:text-lime-green`, and `box-decoration-clone` so the highlight wraps cleanly across lines at narrow container widths.

**Image:** the "PostHog 3000" box and CD, from Cloudinary, via the `HERO_ART` URL at the top of `Hero.tsx`.

The source asset (`product_os_df65018ac1.png`) has an **opaque white background**, which reads as a white square on the `#eef0e7` panel and is glaring in dark mode, so the URL carries a transformation chain:

```
/upload/e_background_removal/e_trim/w_720/f_auto,q_auto:good/product_os_df65018ac1.png
```

- `e_background_removal` cuts out the white, keeping the soft floor shadow. Cloudinary's cheaper `e_make_transparent` is **not** a substitute: the box front is a near-white grey, so any tolerance high enough to clear the background also eats the box.
- `e_trim` crops the transparent margins the source has baked in, so the art fills its column instead of floating in padding. The trimmed art is 720x688, which is why `<img>` carries those intrinsic dimensions.
- `f_auto` ships ~20KB of AVIF to browsers that take it, versus 148KB as PNG, with alpha intact.

Derived assets are cached by Cloudinary after the first request, so the background-removal add-on isn't hit per page view.

**It's a plain `<img>` with a URL string, not `CloudinaryImage`, and that's deliberate.** `CloudinaryImage` treats everything after `/upload/` as the public ID and hands it to `cloudinary-core`, which inserts a version segment in front of it — `/upload/v1/e_background_removal/…` — and Cloudinary 404s on that. It can only serve bare public IDs, so any transformed asset has to bypass it.

**Also don't reach for `StaticImage` or `GatsbyImage` here.** This repo lists `gatsby-plugin-image` in `gatsby-config.js` but *not* `gatsby-plugin-sharp`, so any use of those components fails the build with `ERROR #11321 – Gatsby-plugin-sharp wasn't setup correctly`. Several files import `StaticImage` without ever rendering it, which makes it look supported when it isn't. (The grass tufts still use direct webpack imports from `src/images/`; `src/custom.d.ts` declares `*.png` so those type-check.)

**Backdrop:** the dotted panel uses the `.paper-desk` class added at the bottom of `src/styles/global.css`, ported from the `.PaperDesk` rule on the PostHog app's login screen — a non-repeating warm glow layered over a repeating 16px dot grid. It's plain CSS rather than Tailwind because a two-layer background with per-layer `background-repeat` and `background-size` is unreadable as arbitrary utilities, and it needs a `.dark` override (light dots on dark instead of dark dots on light).

### `PricingJourney`

Free and pay-as-you-go as **two numbered stops on a journey**, not two plans in a table.

This replaced an `OSTable` delta table. The table was accurate but framed the two modes as a choice to make at signup, and they aren't one: everybody starts on the left, and the right side is something that happens later, from inside the product. Numbering the states and pointing an arrow between them says that without a caption.

Three details carry most of the meaning:

- **Step 2 is additive, not alternative.** It opens with "Everything in Free, plus" and every item is a delta (`6 projects – up from 1`), so the load-bearing claim of the page — adding a card doesn't take the free tier away — is structural rather than a footnote.
- **Only step 1 has a CTA, and the section links nowhere else.** Step 2's action lives in PostHog's billing settings, so a button there would imply a second decision today. Its footer says "Nothing to do today" instead. "at usage-based rates" was briefly a link down to the calculator; it isn't any more, because offering an estimator here reframes the section from "you probably won't pay" to "work out what you'll pay". The section has exactly one link, and it's the signup.
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

**Why a rail and not a grid:** the free-tier section is already an icon-and-label grid. A centered logo grid next to it read as the same component twice. One dense row also communicates "lots of companies" better than a tidy 3x4 matrix. It's placed after `PricingJourney` so it isn't adjacent to the free-tier grid at all.

Unlike `components/Home/Customers`, there's no shuffle button or breakdown labels: the job here is reassurance, not play.

**Note on logo heights:** customer records carry `height` as a Tailwind scale value. This component maps those to literal class names via `LOGO_HEIGHT_CLASSES` rather than interpolating `h-${n}`, because interpolated classes aren't in `safelist.txt` and only survive purge by coincidence elsewhere in the codebase. The rail uses one step smaller than `/customers` does, to keep the row compact.

### `CalculatorReveal`

Wraps `Test/Calculator` so the full estimator is **hidden until asked for**, and kept as the quietest thing on the page: one sentence — `Most companies stay on the free tier. Calculate what you'd pay past it` — where the second half is a text link that expands the estimator below it, and swaps to `Hide the calculator` once open.

**It lives inside the `more-options` section, not as its own.** Rendered after the three cards in `redesign.tsx`, as a footnote under them. That keeps the cards and the calculator under one section break before the FAQ, and means this component has no `SectionLayout` of its own — just a `div` with `id="calculator"` and `mt-6`. The section heading ("Startups, bigger teams, and discounts") doesn't name the calculator; footnotes don't need to be in the title.

**The understatement is the whole point, and it should survive future edits.** An estimator muddies this page's frame: it turns "this is free for you" into "work out your bill," which is the wrong question for the ~97% who never pay. So this deliberately has no card, no fill, no border, and no heading. Earlier versions gave it a tinted, bordered card with an `<h2>` and a CTA-styled button, which made it a visual peer of the three `MoreOptions` cards — a fourth card in that family, which is exactly the prominence it shouldn't have. Other earlier versions gave it its own section and then faked attachment with a negative margin; putting it inside `more-options` makes that relationship structural.

For the same reason, **nothing earlier in the page points at it.** `PricingJourney` step 2 used to link "at usage-based rates" down to `#calculator`; that link is gone and the detail is plain text like its three siblings.

**Two ways in, both opt-in:**

1. The text link
2. `?calculator` in the URL, which renders it already open and scrolls to `#calculator`

**The sentence stays put on open, rather than being replaced by the calculator.** Expanding in place keeps the toggle where your cursor already is, and makes hiding it as discoverable as opening it.

It's deliberately *not* built on `RadixUI/Accordion`, whose `AccordionContent` hardcodes `overflow-hidden` — that would break the calculator's `sticky` sidebar and clip its tooltips.

**It renders `Test/Calculator` with `hideHeader` and `id=""`.** Those two props were added to the shared component for this caller and both default to the old behavior, so the live `/pricing` page is byte-identical. `hideHeader` drops its `<h2>Pricing calculator</h2>` — a bordered, section-weight heading inside a one-line footnote reintroduces exactly the prominence this component exists to avoid — and `id=""` stops `#calculator` existing twice in the DOM once the panel is open, since this component's wrapper owns that anchor.

Its `SectionLayout` margins and `@5xl:px-4` still need neutralizing, and that's done locally with `[&>section]:my-0 [&>section]:px-0` rather than a third prop. A `className` prop wouldn't work: `SectionLayout` appends caller classes after its own, and `my-0` loses to `mb-12` in Tailwind's cascade no matter the order in the attribute, so it takes a child selector to win on specificity.

Three implementation details are load-bearing:

- **The panel animates `height: 0 → auto` with `initial={false}`** (framer-motion, the same approach as `Home/Accordion`). `initial={false}` is what makes a `?calculator` deep link render open with no animation instead of unfurling on load. `useReducedMotion` drops the duration to zero.
- **`overflow` returns to `visible` once the open animation finishes.** A permanent `overflow-hidden` would break the calculator's `sticky top-4` sidebar and clip its tooltips. The same `settled` flag applies `invisible` when fully collapsed, which keeps the mounted calculator out of the tab order. It's set false by the toggle and true by `onAnimationComplete`, which is safe because the deep-link path never animates and never leaves it false.
- **The calculator stays mounted after the first open.** Hiding it only collapses the panel, so volumes someone dialled in survive a hide/show.

### `SignupBlock`

Cloud region picker + the single `Get started - free` CTA + today's signup count.

This duplicates the region/CTA/count block currently inlined at the bottom of `Test/PlanContent.tsx`. It was extracted here rather than shared, deliberately: `PlanContent` is on the live `/pricing` page and this is an unapproved mockup. **If the redesign ships, delete the inlined copy in `PlanContent` and import this instead.**

### `MoreOptions`

Three quiet cards — Startups (`/startups`), Platform packages (`/platform-packages`), and enterprise volume (`/talk-to-a-human`).

These replace the cut Enterprise plan column. Styled as low-key cards rather than plan tiers so they don't compete with the single signup CTA above them.

The page renders `CalculatorReveal` immediately after this component, still inside the same `SectionLayout` — see that section. The cards component itself doesn't know about the calculator.

## Conventions

- All breakpoints are `@container` queries. Every one of these renders inside a resizable OS window, so media queries would break at window widths that don't match the viewport.
- **Calibrate container breakpoints against the real column width.** Each component here declares its own `@container`, which resets the query reference to that component's width — not the viewport's. With `hideRightSidebar`, the content column measures ~1017px at a maximized window and ~710–730px at a 1100–1440px viewport. So `@4xl` (896px) only fires when maximized and `@5xl`+ never fires. Breakpoints above `@4xl` in these components are dead code; verify by measuring rather than assuming.
- Colors are project tokens only (`bg-light dark:bg-accent`, `border-primary`, `text-secondary`, `text-green`).
- Section chrome comes from `Test/Sections` (`SectionLayout`, `SectionHeader`) to match the rest of the pricing pages.

## Open items

- **`src/images/pricing-hero-desk.png` is now unused** — it was the placeholder hero art before the box render, and it's an unoptimized 1.4MB PNG. Safe to delete.
- **The hero art has no `srcset`.** It's delivered at a fixed 720px wide (`w_720`) for a column that's at most 320px, so ~2x on retina and oversized below that. `f_auto` keeps the payload small enough (~20KB) that this hasn't been worth a `srcset` of `w_` variants, but that's the next lever if the hero ever needs it.
- **The 97% stat** in `Hero` is taken from the design mockup. The live page says "more than 90%". Verify the real number before this ships.
- **No closing CTA.** The page ends on the FAQ. `components/Home/CTA` (the "PostHog Web / digital download" box) was left off because the hero, `PricingJourney`, and the philosophy note already carry three CTAs. Easy to add back at the bottom of the page if the drop-off says otherwise.
- **If this replaces `/pricing`**, add a redirect for `/pricing/redesign` in `vercel.json` and check that `?plan=free` / `?plan=paid` inbound links (previously handled by the plan toggle) still land somewhere sensible — the toggle no longer exists.
