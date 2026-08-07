# Pricing page redesign

Components for the redesigned pricing page, served on **`/pricing`** as two of the three arms of the `pricing-page-redesign` experiment. The page that assembles them is `Pricing/Experiment/RedesignPage`; see `Pricing/Experiment/README.md` for how a variant gets chosen and how to preview one.

The previous page (`PricingExperiment` and friends) is the experiment's control, and lives in `Pricing/Experiment/ControlPage`. The two share only `pages/pricing/philosophy`, `Pricing/FAQs`, and `Test/Sections` — everything in this folder belongs to the redesign alone, so editing it can't move the control.

These components used to have their own route at `/pricing/redesign`. It was removed when the experiment went in: the redesign now only ever renders through the flag.

## Why

The existing page tries to serve everyone at once and ends up making the visitor do the sorting. This one targets two audiences in order:

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

Kept and reused: `Test/FreeTier`, `Test/Calculator`, `FAQs`, and `pages/pricing/philosophy`.

- **`Test/Calculator`** — two optional props (`hideHeader`, `id`), both defaulting to its previous behavior.
- **`Test/FreeTier`** — its hard-coded list of products moved into `Test/freeTierData` and the component now maps over it. Pure refactor: same items, same order, same markup. It was extracted so `FreeTierModal` could render the same allowances in a different shape without a second copy of the numbers. **Update allowances there, not in a component.** Three places render it (`FreeTierTicker`, `PricingExperiment`, `Presentation/Templates/PricingTemplate`) plus the modal, so a stale duplicate would be hard to spot.

## Page order

1. `Hero`
2. `FreeTierTicker` — the free allowances, auto-scrolling in one row, with `Surfaces` as a one-line footnote under it
3. `PricingJourney` — the two billing stages, as a journey
4. `CustomerLogos`
5. `MoreOptions` — three cards, plus `CalculatorReveal` as a footnote in the `minimized` arm
6. `CalculatorSection` — the pricing calculator in its own section, in the `section` arm only
7. Philosophy note
8. FAQ
9. `Home/ShamelessCTA` — the homepage's boxed-software CTA, reused verbatim

`MoreOptions` comes before the philosophy note, not after: the note ends on a signup CTA, and following that with three "actually, maybe you need something else" cards undoes it. The note is the last word on the page before the FAQ.

`CustomerLogos` sits after `PricingJourney` rather than next to the free-tier row on purpose — see its section below. The calculator is intentionally late on the page (above the FAQ) so first-time visitors hit free-tier reassurance before an estimator.

The page passes `hideRightSidebar` to `ReaderView`, so there's no "Jump to" table of contents and the content column gets the full window width (~1017px at a maximized window vs ~730px with the sidebar). The page is short enough after the cuts that a TOC wasn't earning its space.

## Components

### `Hero`

Headline (`97% of companies use PostHog for free.`), the primary CTA, and the boxed-software graphic. The only display-sized type on the page — everything below is evidence for this one sentence.

The green highlight on "for free." uses `bg-green/25` with `text-green-dark` / `dark:text-lime-green`, and `box-decoration-clone` so the highlight wraps cleanly across lines at narrow container widths.

**Image:** the "PostHog 3000" box and CD, from Cloudinary, via the `HERO_ART` URL at the top of `Hero.tsx`.

The source is already transparent. Cloudinary trims its empty margins, caps it at 800px, and serves an optimized format. It stays a plain `<img>` because the transformation chain is part of the URL.

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

**Duration is derived from measured width** (`scrollWidth / PIXELS_PER_SECOND`) via a `ResizeObserver`, rather than counting items like ToolsTicker does. `FreeTier` renders the list itself, so item count isn't available to this component — and measuring also keeps the apparent speed constant when label lengths change. Currently ~43s per loop at 55px/s.

**Edge fades use CSS `mask-image`, not an overlaid gradient.** This is deliberate: `ScrollArea`'s `fadeX` prop paints a gradient in a fixed colour, which reads as a grey/white block against this section's translucent window backdrop. A mask makes the pixels genuinely transparent, so it works on any background and in both colour modes. Don't swap it back for `fadeX`.

Pauses on hover and focus. Under `prefers-reduced-motion: reduce` the animation is disabled and the row becomes a manually scrollable `overflow-x-auto` strip.

### `FreeTierModal`

Every product's monthly allowance as a plain two-column list — name on the left, allowance on the right, with the allowance carrying the bold. Opened from the phrase "free tier" in `PricingJourney`'s **Pay-as-you-go** card.

**It hangs off card 2, not the Free card.** On the Free card, "you get a free tier" is the expected claim and nobody stops to check it. On the pay-as-you-go card the same sentence is the surprising one — *"Same free tier every month"*, i.e. adding a card doesn't take it away — and that's the claim people want evidence for. The link sits where the doubt is.

**The ticker already shows these numbers, and that's the point.** The ticker is the glanceable version: it moves, it's masked at both edges, and you can't scan it for the one product you care about. This is the readable version. Both stay.

**No icons here.** The ticker uses them so products stay recognizable while scrolling past; in a static list they'd be a column that carries no information.

It opens through the window system (`addWindow` plus a `'pricing-free-tier'` entry in `context/App.tsx`), the same way the community sign-in modal does, so it gets the standard window chrome, title bar, and dismiss behavior rather than a hand-rolled dialog. It sizes itself instead of relying on the window `size` config, because `PageModal` renders into a Radix portal where the content sets the dialog's dimensions.

**Data comes from `Test/freeTierData`,** extracted out of `Test/FreeTier` so the ticker and this list can't drift. See below.

### `CustomerLogos`

Twelve high-profile customers as a horizontal rail on a tinted band, with the heading inline on the left. Data comes from `hooks/useCustomers` via `getCustomers()` — the same source as `/customers` and the homepage wall — so logos and light/dark variants stay in sync.

**Why a rail and not a grid:** the free-tier section is already an icon-and-label grid. A centered logo grid next to it read as the same component twice. One dense row also communicates "lots of companies" better than a tidy 3x4 matrix. It's placed after `PricingJourney` so it isn't adjacent to the free-tier grid at all.

Unlike `components/Home/Customers`, there's no shuffle button or breakdown labels: the job here is reassurance, not play.

**Note on logo heights:** customer records carry `height` as a Tailwind scale value. This component maps those to literal class names via `LOGO_HEIGHT_CLASSES` rather than interpolating `h-${n}`, because interpolated classes aren't in `safelist.txt` and only survive purge by coincidence elsewhere in the codebase. The rail uses one step smaller than `/customers` does, to keep the row compact.

### `pages/pricing/philosophy`

James's pricing note is shared by all three experiment arms and the standalone `/pricing/philosophy` route. His photo, name, and co-founder title lead the card so the attribution is clear before the note begins.

The copy is intentionally limited to four commitments: no loss leaders, cheapest-at-scale pricing, financial stability, and an MIT-licensed open source option. The old biographical sign-off and secondary FAQ/contact paragraph were removed so the note ends on its signup CTA.

**This is the one piece both variants render**, so a copy edit here changes `/pricing` too. That's intentional — the note is a company position, not a design — but it does mean the philosophy card isn't a fair thing to vary in a test. If it needs to differ per variant, split it into a `Redesign/Philosophy` first.

### `CalculatorSection` and `CalculatorReveal`

Two treatments of the same calculator, and **the only difference between the experiment's two redesign arms.** `RedesignPage`'s `calculator` prop picks one:

| Prop value  | Component           | Arm                             |
| ----------- | ------------------- | ------------------------------- |
| `section`   | `CalculatorSection` | `redesign`                      |
| `minimized` | `CalculatorReveal`  | `redesign-calculator-minimized` |

Keep everything else identical between the two — they're a two-arm test of calculator prominence, so any other difference is a confound.

**`CalculatorReveal` is the original design, and the hypothesis the third arm exists to test.** One sentence — `Most companies stay on the free tier. Calculate what you'd pay past it` — where the second half is a text link that expands the estimator in place and swaps to `Hide the calculator` once open. The argument: an estimator muddies this page's frame, turning "this is free for you" into "work out your bill," which is the wrong question for the ~97% who never pay. So it has no card, no fill, no border, and no heading, and it sits as a footnote *inside* the `more-options` section rather than as a section of its own. It owns `#calculator` in this mode, and the calculator only mounts once opened, so it costs everyone else nothing.

It's deliberately *not* built on `RadixUI/Accordion`, whose `AccordionContent` hardcodes `overflow-hidden` — that would break the calculator's `sticky` sidebar and clip its tooltips. Three details are load-bearing:

- **The panel animates `height: 0 → auto` with `initial={false}`** (framer-motion, same approach as `Home/Accordion`). `initial={false}` is what makes a `?calculator` deep link render open with no animation instead of unfurling on load. `useReducedMotion` drops the duration to zero.
- **`overflow` returns to `visible` once the open animation finishes**, because a permanent `overflow-hidden` breaks the sticky sidebar and clips tooltips. The same `settled` flag applies `invisible` when fully collapsed, keeping the mounted calculator out of the tab order.
- **The calculator stays mounted after the first open**, so volumes someone dialled in survive a hide/show.

Expanding fires `pricing_calculator_expanded`. **That event only exists in this arm** — the other two have nothing to expand — so it is not a cross-arm engagement metric. Use `pricing_calculator_interacted` for comparisons; see `Pricing/Experiment/README.md`.

**`CalculatorSection` is the plain treatment:** always visible, under a `Pricing calculator` heading like every other section on the page. The heading and the `#calculator` anchor live in `RedesignPage`, not in the component, so they match the sibling sections exactly.

**Nothing earlier in the page points at either.** `PricingJourney` step 2 used to link "at usage-based rates" down to `#calculator`; that link is gone and the detail is plain text like its three siblings. Worth keeping that way — the page has one signup CTA, and internal jump links compete with it.

`?calculator` in the URL scrolls to the calculator in both modes, and opens it in the minimized one, so an estimate can be shared as a link.

**Both render `Test/Calculator` with `hideHeader` and `id=""`.** `hideHeader` drops the calculator's own `<h2>Pricing calculator</h2>`, whose bordered, section-weight styling doesn't match this page; `id=""` stops `#calculator` existing twice in the DOM, since the page (or the reveal wrapper) owns that anchor.

Its `SectionLayout` margins and `@5xl:px-4` still need neutralizing, and that's done locally with `[&>section]:my-0 [&>section]:px-0` rather than a third prop. A `className` prop wouldn't work: `SectionLayout` appends caller classes after its own, and `my-0` loses to `mb-12` in Tailwind's cascade no matter the order in the attribute, so it takes a child selector to win on specificity.

### `MoreOptions`

Three quiet cards, in this order — Platform packages (`/platform-packages`), enterprise volume (`/talk-to-a-human`), and a paid onboarding call (`/merch?product=30-min-onboarding-consultation`).

These replace the cut Enterprise plan column. Styled as low-key cards rather than plan tiers so they don't compete with the single signup CTA above them.

**Platform packages leads** because it's the only one of the three that answers itself on this page — its CTA expands the comparison in place, and the other two send you somewhere else. The order also runs cheapest-commitment first.

**The startups card was cut, not moved.** `/startups` is its own program with its own page, and the $50k credits offer answers a different question than the three sections above it. The onboarding call took its slot: same shape of escape hatch (something outside the standard flow), but one that's about getting set up rather than about the bill. It's $80 via the merch store — see `ProfessionalServices`, which sells the same 30 minutes.

**"See what's included" expands in place instead of navigating.** "What's in a platform package" is a question you ask *while* comparing these three cards, so answering it on a separate page costs you your place — you have to come back to finish comparing. The other two cards are genuine destinations and still open as pages.

**The panel is full width below the row, not inside the card.** The feature table needs a label column plus one column per package, which won't fit in a third of the row; and growing one card would leave the other two standing short beside it. Opening it pushes the calculator section down, which is fine — nothing below is anchored to it.

**Two things tie the panel to its card,** because full width below a grid otherwise reads as a new section:

1. **It's styled as one of the cards** — same fill, border, radius, and padding. An early version separated it with a full-width `border-t`, which was actively wrong: that's how this page divides *sections*, so it said "unrelated" as loudly as possible.
2. **A caret notch points up at the first card.** A `size-3` square rotated 45° with `border-l border-t`, offset `-top-[7px]`; its fill covers the panel's own top border, so the edge reads as opening into the notch. Its `left` is `calc((100%-2rem)/6)` — three equal columns share `100% - 2rem` of a `gap-4` row, so the center of column 1 is a sixth of that. **If the cards are ever reordered, this has to move with the platform packages card** (it was `left-1/2` while that card was in the middle). Only true side by side, so the notch is `@2xl` only.

**The cards' borders never change** — no hover state, and no active state on the open card. The notch carries the connection on its own, so the row stays still.

The notch needs room above the panel or `overflow-hidden` clips it — that's what the panel wrapper's `mt-4` buys, and it happens to match the grid gap.

Same expand mechanics as `CalculatorReveal`: a Framer Motion `height: 0 ↔ auto` transition (not `RadixUI/Accordion`), content mounted only after the first open, and `invisible` once collapsed so its links leave the tab order.

**The CTA is still a `<Link to="/platform-packages">`** whose `onClick` calls `preventDefault`. Gatsby's `Link` skips navigating when the event is already default-prevented, so that's the whole opt-out — and because the `to` is real, cmd-click, middle-click, and the "Open in new PostHog window" context menu still open the page. It carries `aria-expanded` and `aria-controls` for the panel.

**Panel content comes from `Platform/PlatformPackageComparison`,** two components (`PlatformPackageList`, `PlatformFeatureTable`) extracted from the `/platform-packages` page so the prices and feature lists exist once. The page keeps its own intro and "get started" copy; the panel has neither, and doesn't link out to the page for them either. The panel answers the question the CTA asked and stops — the card's own CTA is the way to the page, for anyone who wants it.

The page renders `CalculatorReveal` immediately after this component, still inside the same `SectionLayout` — see that section. The cards component itself doesn't know about the calculator.

### `Surfaces`

One line under the ticker — *Used across any of these products: Web, Slack, MCP* — with an icon each and **no links**.

**It replaced a whole `SelfDrivingPricing` section** (deleted; see git history for the component). That section explained how self-driving is billed — models at cost plus ~27%, across four surfaces in a table — and it sat between the philosophy note and the FAQ. Two problems: it was the only thing on the page that didn't follow the page's one story (start free, add a card when you outgrow it), so it read as a second pitch at the exact point the page should be finishing; and most visitors will never touch that billing model. The part worth keeping was the *list of surfaces*, which belongs next to the allowances it applies to.

**So it's a footnote to `FreeTierTicker`, not a section.** "Which of these can I use my free tier from?" is a question about the row directly above it.

**Nothing here links out,** deliberately. These are labels on the allowances, not three more destinations — the top of the page has one CTA and this shouldn't compete with it. That also keeps it from turning back into a section.

Wording follows the [glossary](/manual/glossary)'s taxonomy, where Web, Slack, MCP, CLI, and Code are PostHog's *products* and analytics, replay, flags, and so on are its *tools*. Three of the five are listed because they're the three most people will use; the icons are `IconBrowser` (`@posthog/icons`) plus `IconSlack` and `IconMCP` from `OSIcons`.

### `Home/ShamelessCTA` (reused)

The homepage's boxed-software CTA — the PostHog Web "digital download", the fake cart banner, the Kim K sticker — dropped in below the FAQ, wrapped in a `SectionLayout` with a `Shameless CTA` heading to match the homepage's own.

**It's after the FAQ because almost nobody gets there,** which is the point: it costs the people actually deciding nothing, and it's a reward for anyone who read the whole page. This is also why the README's "no closing CTA" note is gone — the closing CTA is a joke, not a fourth ask.

Rendered as `<ShamelessCTA />` (which passes `headline={false} card` to `Home/CTA` and supplies its own subtitle), so the copy and layout can't drift from the homepage's. The section needs `overflow-x-hidden` like the homepage's wrapper does — the cart banner animates in from `-100vw` and the "haha bizzniss" doodle hangs off the top right.

**The block is wrapped in `pt-16`, and that padding is load-bearing.** The doodle is positioned `top-0 -translate-y-[60%]` against the CTA card, so it reaches well above the intro paragraph — about 50px past where this section's `SectionHeader` rule sits. Without the padding the border draws straight through the hedgehog, which reads as a bug. The padding moves the doodle down with the rest of the block and clears the rule by roughly 10px. It's tuned by eye against the current artwork; if the SVG is ever swapped for one with a different aspect ratio, re-check it. (The homepage doesn't need this — it renders the component under a plain heading with no rule to collide with.)

## Conventions

- All breakpoints are `@container` queries. Every one of these renders inside a resizable OS window, so media queries would break at window widths that don't match the viewport.
- **Calibrate container breakpoints against the real column width.** Each component here declares its own `@container`, which resets the query reference to that component's width — not the viewport's. With `hideRightSidebar`, the content column measures ~1017px at a maximized window and ~710–730px at a 1100–1440px viewport. So `@4xl` (896px) only fires when maximized and `@5xl`+ never fires. Breakpoints above `@4xl` in these components are dead code; verify by measuring rather than assuming.
- Colors are project tokens only (`bg-light dark:bg-accent`, `border-primary`, `text-secondary`, `text-green`).
- Section chrome comes from `Test/Sections` (`SectionLayout`, `SectionHeader`) to match the rest of the pricing pages.

## Open items

- **The hero art has no `srcset`.** It's delivered at a fixed 800px wide for a column that's at most 320px. `f_auto` keeps the payload small, but responsive variants are the next lever if needed.
- **The 97% stat** in `Hero` came from the original design mockup. Verify the real number before publishing this change.
- **The closing CTA is a fourth ask.** The hero, `PricingJourney`, and the philosophy note already carry three, and `Home/ShamelessCTA` now adds one below the FAQ. It's deliberately the joke version and it's past the fold that matters, but if the numbers say the FAQ is where people leave, this is the first thing to look at.
