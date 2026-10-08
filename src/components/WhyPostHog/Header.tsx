import React from 'react'
import { IconLogomark } from '@posthog/icons'
import { useSidebarExpanded } from 'components/ReaderView'

/**
 * Static header for the "Why PostHog?" collection sidebar — rendered in
 * `ReaderView`'s `productSelect` slot (the same slot the product pages use for
 * `ProductSwitcher`). Unlike `ProductSwitcher` this is not interactive: just the
 * logomark and a label, no dropdown.
 *
 * Mirrors `ProductSwitcher`'s collapse behavior via `useSidebarExpanded()`:
 * - Collapsed: a centered icon (the wrapping motion.div in LeftSidebar is 32px
 *   wide, so `justify-center` lands the icon at panel center).
 * - Expanded: icon + bold "Why PostHog?" label. The label sits in a
 *   `data-sidebar-label` span so it fades in lockstep with the rest of the
 *   sidebar when the panel collapses.
 *
 * `min-h-7` matches the height ProductSwitcher uses so the column doesn't jump
 * vertically on hover/pin.
 */
const WhyPostHogHeader = (): JSX.Element => {
    const expanded = useSidebarExpanded()

    if (!expanded) {
        return (
            <div className="flex items-center justify-center min-h-7" aria-label="Why PostHog?">
                <IconLogomark className="size-5" />
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 pl-1.5 min-h-7 font-bold text-black dark:text-primary">
            <IconLogomark className="size-5 shrink-0" />
            <span data-sidebar-label className="whitespace-nowrap">
                Why PostHog?
            </span>
        </div>
    )
}

export default WhyPostHogHeader
