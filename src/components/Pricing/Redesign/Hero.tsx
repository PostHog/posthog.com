import React from 'react'
import { CTA as PlanCTA } from 'components/Pricing/Plans'
import GrassAngled from '../../../images/grass-tuft-angled.png'
import GrassFolded from '../../../images/grass-tuft-folded.png'
import GrassFan from '../../../images/grass-tuft-fan.png'

/**
 * Transparent "PostHog 3000" art, trimmed and capped at 800px by Cloudinary.
 * Kept as a plain `<img>` because the transformation chain is part of the URL.
 */
const HERO_ART =
    'https://res.cloudinary.com/dmukukwp6/image/upload/e_trim/w_800,c_limit,q_auto,f_auto/posthog_3000_left_facing_transparent_b87ac905bf.png'

/**
 * Origami grass tufts dressing the hero panel, in three depth bands: behind the box art, on the
 * panel floor, and one in front. Depth is sold with more than size — tufts further back are smaller,
 * sit *higher* (nearer the horizon), and are more faded.
 *
 * Only the small, faded background tufts are mirrored: each PNG has a baked-in shadow falling to the
 * right, and flipping one reverses its light direction. That's invisible at 40% opacity but obvious on
 * the big foreground pieces, which are never flipped. Those baked shadows are also why no extra
 * shadow is applied here.
 *
 * All of it is hidden below `@2xl`, where the layout stacks and there's no room for scenery.
 */
const Tuft = ({ src, flip, className }: { src: string; flip?: boolean; className: string }): JSX.Element => (
    <img src={src} alt="" aria-hidden className={`absolute h-auto ${flip ? 'scale-x-[-1] ' : ''}${className}`} />
)

/**
 * Foreground tufts. Anchored to the art column rather than the panel, so they stay pinned to the box
 * at any width instead of drifting to the panel's corners, and layered above it so they paint over the
 * art — the band that closes the scene. Both hang past the art's bottom edge, and the panel's
 * `overflow-hidden` crops anything that runs past the panel.
 *
 * Neither is flipped: these are the large, fully opaque pieces, so their baked-in shadows have to fall
 * the same way as the box art's.
 */
const FRONT_TUFTS = [
    { src: GrassFan, className: '-left-20 @3xl:-left-24 -bottom-5 @3xl:-bottom-6 w-24 @3xl:w-32 -rotate-3' },
    {
        src: GrassAngled,
        className: '-right-6 @3xl:-right-9 -bottom-5 @3xl:-bottom-6 w-16 @4xl:w-20 opacity-85 rotate-2',
    },
]

/**
 * Tufts anchored to the art column instead of the panel, so they stay with the box whatever the
 * layout does, and paint *behind* it — the cue that makes the art look planted in the scene rather
 * than parked on a lawn.
 *
 * `bottom` is the fiddly part. Anchored near the art's baseline these vanish: the box and its CD are
 * opaque, so a short tuft down there is completely covered and you just get a row of grass along the
 * floor instead. Each one has to start high enough up the column that its tips clear the artwork into
 * the transparent background.
 */
const BEHIND_TUFTS = [
    // Only two, and both set outside the art's edges — pushed in any closer and they land on the
    // opaque box front and never show at all. The slight negative inset keeps enough overlap to
    // still read as behind the box.
    { src: GrassFolded, flip: true, className: '-left-[7%] bottom-[19%] w-10 opacity-60 rotate-2' },
    { src: GrassAngled, flip: true, className: '-right-[8%] bottom-[23%] w-9 opacity-50 rotate-1' },
]

/** Shared by both bands — only the tuft list and the layer's z-index differ. */
const TuftLayer = ({ tufts, className }: { tufts: typeof FRONT_TUFTS; className: string }): JSX.Element => (
    <div className={`absolute inset-0 pointer-events-none select-none ${className}`} aria-hidden>
        {tufts.map((t, i) => (
            <Tuft key={i} {...t} />
        ))}
    </div>
)

/**
 * Page-level hero for pricing.
 *
 * The headline is the whole pitch: you start free, and paying is something you
 * opt into later. Everything else on the page is evidence for that sentence, so
 * this is deliberately the only place with display-sized type.
 *
 * The dotted backdrop comes from `.paper-desk` in global.css, ported from the
 * PostHog app's login screen so the first thing you see here matches the first
 * thing you see after signing up.
 */
export default function Hero(): JSX.Element {
    return (
        <div className="@container not-prose mb-8 @3xl:mb-12">
            <div className="paper-desk border border-primary rounded-md overflow-hidden relative">
                {/* `flex-col-reverse` puts the art above the copy once the layout stacks, while leaving
                    the DOM order headline-first for screen readers and tab order. */}
                <div className="relative z-10 flex flex-col-reverse @2xl:flex-row @2xl:items-center gap-6 @2xl:gap-8 p-6 @2xl:p-8 @4xl:p-10">
                    <div className="flex-1">
                        <h1 className="text-3xl @lg:text-4xl @2xl:text-5xl @4xl:text-6xl font-bold tracking-tight leading-[1.05] text-balance mb-4 @2xl:mb-5">
                            97% of companies use PostHog{' '}
                            <span className="bg-green/25 text-green-dark dark:text-lime-green rounded-sm px-1.5 box-decoration-clone">
                                for free.
                            </span>
                        </h1>

                        <p className="text-[15px] @lg:text-base max-w-xl mb-5">
                            One day we’d like your money, but not today. Only add a card if you need more than the free
                            tier limits, advanced features, or want more projects. Your free allowance renews every
                            month. Yes, for everything. Yes, forever.
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <PlanCTA intent="free" size="lg" />
                            <span className="text-sm text-secondary">No credit card required</span>
                        </div>
                    </div>

                    {/* Plain <img>: this repo has gatsby-plugin-image but NOT gatsby-plugin-sharp,
                        so StaticImage/GatsbyImage will fail the build. Intrinsic dimensions are set
                        so the column reserves the right height before the remote art loads. */}
                    <div className="shrink-0 self-center w-56 @2xl:w-64 @4xl:w-80 relative">
                        <TuftLayer tufts={BEHIND_TUFTS} className="z-0" />

                        <img
                            src={HERO_ART}
                            width={720}
                            height={688}
                            alt="A boxed copy of PostHog 3000, 1990s shrink-wrapped software style, with its CD-ROM leaning against it"
                            className="w-full h-auto relative z-10"
                        />

                        <TuftLayer tufts={FRONT_TUFTS} className="z-20" />
                    </div>
                </div>
            </div>
        </div>
    )
}
