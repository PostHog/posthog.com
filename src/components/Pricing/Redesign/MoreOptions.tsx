import React, { useState } from 'react'
import { IconHandMoney, IconHeadset, IconShield } from '@posthog/icons'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'components/shared/ui/Link'
import { PlatformPackageList, PlatformFeatureTable } from 'components/Pricing/Platform/PlatformPackageComparison'

const PANEL_ID = 'platform-packages-panel'

const ctaClasses = 'text-[15px] font-semibold text-red dark:text-yellow'

/**
 * The three escape hatches for people the standard flow doesn't fit: larger
 * teams who need platform features, anyone big enough to want a discount, and
 * anyone who'd rather be walked through setup.
 *
 * These replace the cut Enterprise plan column. Kept as quiet cards rather than
 * plan tiers so they don't compete with the single signup CTA above.
 *
 * Platform packages leads because it's the one with an answer on this page —
 * its CTA expands the comparison in place, and the other two send you elsewhere.
 */
export default function MoreOptions(): JSX.Element {
    const [open, setOpen] = useState(false)
    // The panel stays mounted once opened. It's the expensive one of the three (a table built
    // from every feature of every package), so it shouldn't be rebuilt on each toggle.
    const [hasOpened, setHasOpened] = useState(false)
    // Tracks whether the expand/collapse has finished, so a collapsed panel can be taken out
    // of the tab order — `height: 0` alone still leaves its links focusable.
    const [settled, setSettled] = useState(true)
    const reduceMotion = useReducedMotion()

    const togglePackages = (e: React.MouseEvent) => {
        // Cmd-click, middle-click, and the context menu never reach here, so those still open
        // /platform-packages as a page.
        e.preventDefault()
        setOpen(!open)
        setHasOpened(true)
        setSettled(false)
    }

    // Inside the component so an option can close over the panel state. Every option is a real
    // `url`; an `onClick` that calls `preventDefault` is how one opts out of navigating.
    const options = [
        {
            icon: <IconShield className="size-6 text-purple" />,
            title: 'Platform packages',
            description:
                'SSO, audit logs, custom roles, and project permissions for teams that need to manage access as they grow.',
            // Expands in place rather than navigating: "what's included" is a question you ask
            // while comparing these three cards, and answering it on a separate page means
            // losing your place to come back to.
            cta: open ? "Hide what's included" : "See what's included",
            url: '/platform-packages',
            onClick: togglePackages,
            expanded: open,
        },
        {
            icon: <IconHandMoney className="size-6 text-green" />,
            title: 'Doing serious volume?',
            description:
                'Annual plans and volume discounts are available. Talk to a technical account exec – no SDRs, no discovery calls.',
            cta: 'Talk to a human',
            url: '/talk-to-a-human',
        },
        {
            icon: <IconHeadset className="size-6 text-blue" />,
            title: 'Book an onboarding call',
            description: 'Get 30 minutes with a PostHog expert for $80 – they’ll get your setup right the first time.',
            cta: 'Book a call',
            url: '/merch?product=30-min-onboarding-consultation',
        },
    ]

    return (
        <div className="@container not-prose">
            <div className="grid @2xl:grid-cols-3 gap-4">
                {options.map(({ icon, title, description, cta, url, onClick, expanded }) => (
                    <div
                        key={title}
                        className="flex flex-col border border-primary rounded-md p-5 bg-light dark:bg-accent"
                    >
                        <div className="mb-3">{icon}</div>
                        <h3 className="text-base mb-1">{title}</h3>
                        <p className="text-sm text-secondary mb-4">{description}</p>
                        <div className="mt-auto">
                            <Link
                                to={url}
                                state={{ newWindow: true }}
                                onClick={onClick}
                                aria-expanded={expanded}
                                aria-controls={expanded === undefined ? undefined : PANEL_ID}
                                className={ctaClasses}
                            >
                                {cta}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full width below the row rather than inside the card: the feature table needs one
                column per package plus a label column, which won't fit in a third of the row —
                and growing one card would leave the other two short next to it. */}
            <motion.div
                id={PANEL_ID}
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                onAnimationComplete={() => setSettled(true)}
                className={`overflow-hidden ${settled && !open ? 'invisible' : ''}`}
            >
                {/* Same fill, border, radius, and padding as the cards, so it reads as one of the
                    family rather than page content. `mt-4` matches the grid gap and also leaves
                    the notch below room to poke out without `overflow-hidden` clipping it. */}
                <div className="relative mt-4 border border-primary rounded-md p-5 bg-light dark:bg-accent">
                    {/* Points at the card that opened this — the first one. A square rotated 45°
                        with two borders makes the arrowhead; its fill covers the panel's own top
                        border, so the edge reads as opening into the notch. The `-top-[7px]` is
                        fussy by a pixel either way: lower and the arms' ends poke through the
                        panel edge as stray diagonals, higher and they lift off it. The `left`
                        lands on the center of column 1 of a 3-up `gap-4` grid — three equal
                        columns share `100% - 2rem` of the row, so that center is a sixth of it.
                        Only true while the cards are side by side, hence `@2xl` only. */}
                    <div
                        aria-hidden
                        className="hidden @2xl:block absolute left-[calc((100%-2rem)/6)] -top-[7px] size-3 -translate-x-1/2 rotate-45 border-l border-t border-primary bg-light dark:bg-accent"
                    />
                    {hasOpened && (
                        <>
                            <PlatformPackageList />

                            <h4 className="text-base mt-8 mb-3">What's included</h4>
                            <PlatformFeatureTable />
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
