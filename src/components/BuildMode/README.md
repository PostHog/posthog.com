# BuildMode

The newsletter-specific building blocks for `/newsletter` (`src/pages/newsletter.tsx`) — the
newsletter's rebranded home. The page itself is only the `ReaderView` shell, the layout, and the
GraphQL query; what it renders lives here and in `src/components/PostsIndex/`, which holds the
generic posts-index pieces (featured post, gallery, tag filter, search/sort) shared with `/blog`.
See that folder's README for those files and the shared conventions.

These components live under `src/components/` rather than beside the page because **every file under
`src/pages/` becomes a route in Gatsby** — a colocated `Hero.tsx` would ship as
`/newsletter/Hero`.

## The page, top to bottom

| Section | Components |
| --- | --- |
| Header | `HeroHeader` (wordmark; also repeated as the page footer with subscribe), `Hero` (the statement: tagline as display type + pitch + subscribe), and `FeaturedPost` (from `PostsIndex/` — the newest post, taped up) |
| Everything else | `PostsGallery` (from `PostsIndex/`) — Recent/Popular dropdown + expanding search + `TagFilter` over a paginated grid of `GalleryCard`s (12 per page). The featured (newest) post is omitted from this list. |
| Footer | A second `HeroHeader` (`placement="build-mode-footer"`) after the gallery |

## Files

| File | Purpose |
| --- | --- |
| `Masthead.tsx` | The build mode wordmark and standing tagline (also exports `LOGO_SRC`). Currently unused by the page — superseded by `Hero` unless a variant brings it back. |
| `Wordmark.tsx` | The wordmark as a button: clicking it fires the hammer burst (see below). Skipped under `prefers-reduced-motion`. |
| `hammerBurst.ts` | `fireHammerSwarm` — the hammers, dust, sparks, chips, and the wordmark's own squash (see below). |
| `hammerSound.ts` | `fireKnocks` — the taps, synthesized with Web Audio so the effect needs no audio asset. |
| `wordmarkFire.ts` | `igniteWordmark` — six clicks in quick succession and the wordmark catches fire, ignoring further clicks until it's out (see below). |
| `tokenColors.ts` | `resolveTokenColors` — reads colors off project token classes, shared by the burst and the fire. |
| `Hero.tsx` | `HeroHeader` — wordmark, plus an optional subscribe row when given `placement` (used as the footer). `SubscribeForm` fires `newsletter_subscribed` with a per-instance `placement`, and carries the same "we'll share your email with Substack" disclosure as `NewsletterForm`, since that event is what subscribes the reader. `Hero` is the statement headline (static `bg-highlight` on "product builders") with the pitch as its deck and subscribe below. |
| `RecentPosts.tsx` | The scrollable pinboard row of swinging `PinnedPostCard`s. Currently unused by the page. |
| `PinnedPostCard.tsx` | One pinned card — pushpin, square thumbnail, resting angle, caption. Currently unused by the page. |
| `usePinnedCardSwing.ts` | The swing physics (see below). Currently unused by the page. |
| `useScrollEdges.ts` | Tracks whether a scroller has content off either edge; also exposes `scrollByPage`. Currently unused by the page. |

## The wordmark's hammer burst

Clicking the wordmark gets it **worked on** — the video-game "something is being built" vibe. Hammers
drop in along the wordmark's top edge, hold station while they strike it, then peel away; the wordmark
squashes under the blows; knocks play. The hammers are a temporary `position: fixed` layer of 🔨 emoji
animated with the Web Animations API, each one holding position (outer element) while swinging from its
grip (inner element). The layer removes itself once every animation settles.

**The hammers hit the wordmark rather than flying away from it**, which is the whole point: hammers
fanning outward while the logo squashes reads as unrelated particles near a button, because nothing
appears to make contact. That's why the burst is laid out against the wordmark's bounding rect and not
just its center, and why `HAMMER_COUNT` is low — they have to fit along one edge and stay legible.
Each hammer gets a random phase offset so they don't strike in unison.

Each swing lands a strike, and a strike throws off dust (always, two staggered circles), a sparkle
(often), and chips (nought to two, rolled individually). Those are deliberately probabilistic — every
strike emitting the same set reads as mechanical, and five hammers swinging three times each adds up.

The wordmark reacts twice over: `popTarget` squashes it once on the click, and `joltTarget` knocks it
back on **every** strike. The jolts use **`composite: 'add'`**, which is load-bearing — strikes land
every ~50ms or so across all the hammers, and a replacing animation would cancel whichever jolt was
still recovering (along with the squash), so hits would snap instead of accumulating. Adding layers
them over each other and over the squash, which is what makes it read as being pummeled.

Puffs are **spawned on the strike and parked in viewport coordinates**, not parented to the hammer —
otherwise they inherit its transform and trail it around, which reads as a smoke trail rather than
dust. Where a puff belongs can't be computed up front (the arc is an eased multi-keyframe path), so
each strike is scheduled with a timer that measures the hammer's position when it fires. That's why
cleanup waits on a list of promises instead of a fixed list of animations: puffs don't exist yet when
the burst starts.

None of this could be canvas particles, which is why it's DOM. canvas-confetti particles only ever
tumble and never resize, so a deliberate swing and dust that billows aren't expressible on the canvas —
an all-canvas version (hammers as a `confetti.shapeFromText` shape) reads as hammers _spinning_. The
burst did also throw confetti at one point; it was cut for reading as celebration rather than work.

Colors (`text-border` for dust, `text-yellow` for sparkles, `text-red-2` for chips) are read off
a probe element carrying those token classes, so there are no color literals here. **The probe has to be mounted inside the clicked
element's subtree**: semantic tokens resolve through `--text-*` custom properties scoped to a
`[data-scheme]` ancestor, so a probe on `document.body` sits outside the theme and silently resolves
to whatever `body` inherits. The hammer layer is on `document.body` and therefore can't use
`currentColor` for the same reason — it gets the resolved value instead. Dust uses `--border` rather
than `--text-muted` because a mid-gray puff at high opacity reads as soot rather than construction
dust; `--border` is lighter but still resolves to something visible in both light and dark themes.
Chips take `--red-2` to match the orange button they're being knocked off. The button face is `#ED7136`,
and a chip is only a few pixels across, so it wants the button's hue but a step lighter and heavily
saturated — at that size anything at or below the button's own value reads as a brown speck.
`--red-2` (hue 16°, saturation 0.92, a little lighter than the button) does that; `--burnt-orange` is
nearest in raw RGB but too dull, and `--red` — which in this palette is PostHog's orange, not a red —
has the hue exactly but sits darker. `--orange` is an amber and doesn't apply.

Travel and fade are split across the two nested elements deliberately: the outer element animates
transform only, and the hammer owns the fade. Fading the outer element would multiply down the
dust puffs nested inside it, which is exactly what made the first version's dust invisible.

The burst reuses `useCopyConfettiZIndex` from `PlatformInstall`, which solves the same "paint above
windows and the taskbar" problem.

The button carries `select-none`, because anything you're meant to click repeatedly will otherwise trip
the browser's double-click select and paint the logo and its neighbours blue mid-mash.

### Setting it on fire

Six clicks with no more than 400ms between them and `igniteWordmark` takes over: flames catch along the
top edge (staggered, so the fire spreads rather than appearing whole), embers and black smoke pour off
it, and the logo picks up a flickering warm glow. The gap between clicks is the gate, not the total
time: at 400ms it takes real mashing (a comfortable rate is 4–6 clicks a second), where a generous gap
would let idle clicking get there eventually. The count resets rather than accumulating across a visit,
and it's tracked in refs because nothing renders from it.

It burns for 2.4s and then dies down over another 0.9s. **Clicks during a fire are ignored** — no
hammers, no second fire — so the blaze plays start to finish rather than being restarted or stacked on
top of itself. The button stays enabled and focusable while that's true, rather than going `disabled`:
it's an easter egg, and taking a logo out of the tab order for three seconds isn't worth it. That's why
`igniteWordmark` resolves only once the last ember is gone, since that resolution is what makes the
button live again.

Ignored clicks also sit out the run bookkeeping, which resets the run for free — the burn is far longer
than the 400ms gap, so by the time it's out the last counted click has expired and a masher starts over
rather than re-lighting instantly. They're still reported to PostHog, though, with a `clicks_in_run` of
0 (the counter is zeroed at ignition), which is exactly what "this click wasn't part of a run" means.

The flames and the glow loop rather than running one envelope from ignition to burnout, so the burn
length lives in one constant instead of being spread across every keyframe list. Looping animations
are cancelled at cleanup instead of awaited, since `finished` never resolves for them. Dying down
waits on everything still in the air, which is safe because spawning stops first and nothing new can
appear after it.

Unlike the hammer burst, the fire **tracks the wordmark every frame** in an anchor element it parents
everything to. An effect lasting seconds has time for the page to scroll or the window to be dragged,
which would otherwise leave the fire burning where the logo used to be. The hammer burst gets away
with viewport coordinates fixed at click time because it's over in about a second.

Every glow frame is built by `glowAt`, so the `drop-shadow` structure is identical throughout — only
blur, offset, and brightness move — because filter lists have to match to interpolate; at zero
intensity it collapses to a shadow that hides behind the logo. The fade runs without `fill` so no
permanent `filter` (and no stacking context) is left behind on an element React owns.

### What it reports

| Event | When | Properties |
| --- | --- | --- |
| `build_mode_wordmark_clicked` | Every click. | `clicks_in_run` — clicks so far in this run, reset by a pause over 400ms and by ignition. |
| `build_mode_wordmark_ignited` | A click that lights the fire. | — |

The click is captured **before** the `prefers-reduced-motion` bail, since the interaction happened
whether or not anything moved; ignition is captured after, because under reduced motion there's no
fire to report. `clicks_in_run` is what separates someone idly clicking the logo from someone going at
it, so the mash doesn't need an event of its own. Neither event distinguishes the header wordmark from
the footer one — if that's ever worth knowing, `Wordmark` would need a `placement` prop like
`SubscribeForm` has.

### The knock

`hammerSound.ts` synthesizes the taps instead of loading a file: `static/sounds/` only holds the tape
player's samples, and a knock is just a bandpassed noise burst (the contact) over a fast-decaying
sine (the wood). Frequencies are jittered per tap so a run doesn't sound like one sample repeated,
and the caller passes its swing timing in so the taps land with the hammers on screen. There are
fewer taps than strikes on purpose — one per strike would be a machine gun — and each is nudged off
the beat so a run doesn't sound like a metronome.

One `AudioContext` is created on the first click and reused. There's no site-wide sound preference to
respect, so the guardrails are that it only ever plays from a real click and is skipped under
`prefers-reduced-motion` along with the rest of the burst. `GAIN` is the single volume dial. If it
ever needs more character than a synthesized knock can give, a real sample in `static/sounds/` played
through `Audio` would be the way.

## How the swing works

Each pinned card is a pendulum hanging inside an accelerating frame (the scroll container). Torque
comes mostly from scroll _acceleration_ — cards lean back as the row speeds up and swing forward as a
smooth scroll brakes — plus a small velocity term so steady scrolling gives a slight lean. Measured
velocity is low-passed so discrete wheel steps read as one continuous motion. Constants are derived
per index from `rand`, so cards drift out of phase; moving the cursor onto a card adds a small kick.

`usePinnedCardSwing` writes the resulting angles to the **container** as `--tilt-{index}` custom
properties, and each card composes its own into a `rotate(calc(...))`. Nothing re-renders while the
row is in motion, and because the angles are derived from a deterministic `rand`, SSR and hydration
agree. The rAF loop stops once every pendulum settles and input has been quiet for 200ms.

The motion is decorative, so `usePinnedCardSwing` gates it on `usePrefersReducedMotion` and never
starts the loop when the preference is set. It has to be gated in JS: the angles are written as inline
custom properties rather than a CSS animation, so `motion-reduce:` can't reach them.

## Conventions

- Only project color tokens (`bg-primary`, `bg-accent`, `text-primary`, `text-secondary`,
  `text-muted`, `border-primary`, `border-input`, `text-red`) — no stock Tailwind colors.
- `@container` queries for responsiveness (the window is resizable), never `md:` media queries.
- Post links pass `state={{ newWindow: true }}` so posts open in their own window.
