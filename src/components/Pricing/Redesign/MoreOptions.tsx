import React, { useState } from 'react'
import { IconHandMoney, IconRocket, IconShield } from '@posthog/icons'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'components/Link'
import { PlatformPackageList, PlatformFeatureTable } from 'components/Pricing/Platform/PlatformPackageComparison'

const PANEL_ID = 'platform-packages-panel'

const ctaClasses = 'text-[15px] font-semibold text-red dark:text-yellow'

/**
 * The three escape hatches for people the standard flow doesn't fit: startups
 * who want credits, larger teams who need platform features, and anyone big
 * enough to want a human on the phone.
 *
 * These replace the cut Enterprise plan column. Kept as quiet cards rather than
 * plan tiers so they don't compete with the single signup CTA above.
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
            icon: <IconRocket className="size-6 text-blue" />,
            title: 'PostHog for Startups',
            description:
                'Raised less than $5M and under 2 years old? Get $50,000 in credits, plus free tickets to events and merch.',
            cta: 'Check eligibility',
            url: '/startups',
        },
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
    ]

    return (
        <div className="@container not-prose">
            <div className="grid @2xl:grid-cols-3 gap-4">
                {options.map(({ icon, title, description, cta, url, onClick, expanded }) => (
                    <div
                        key={title}
                        // An open card holds the hover border, so the row shows which of the three
                        // the panel below belongs to even after the cursor has moved away.
                        className={`flex flex-col border rounded-md p-5 bg-light dark:bg-accent transition-colors ${
                            expanded ? 'border-input' : 'border-primary hover:border-input'
                        }`}
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
                {/* Same fill, radius, and padding as the cards, so it reads as one of the family
                    rather than page content, and the same `border-input` as the open card so the
                    two are a matched pair. `mt-4` matches the grid gap and also leaves the notch
                    below room to poke out without `overflow-hidden` clipping it. */}
                <div className="relative mt-4 border border-input rounded-md p-5 bg-light dark:bg-accent">
                    {/* Points at the card that opened this. A square rotated 45° with two borders
                        makes the arrowhead; its fill covers the panel's own top border, so the
                        edge reads as opening into the notch. Centered because the middle column of
                        an evenly-gapped 3-up grid is centered too — which stops being true once
                        the cards stack, hence `@2xl` only. */}
                    <div
                        aria-hidden
                        className="hidden @2xl:block absolute left-1/2 -top-1.5 size-3 -translate-x-1/2 rotate-45 border-l border-t border-input bg-light dark:bg-accent"
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
