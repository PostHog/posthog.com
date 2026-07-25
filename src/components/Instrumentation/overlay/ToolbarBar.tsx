import React from 'react'
import { Logo } from '@posthog/brand/logo'
import { IconRevert, IconSearch } from '@posthog/icons'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import { TOOLS } from './tools'
import { ToolKey } from './types'

interface ToolbarBarProps {
    inspecting: boolean
    onToggleInspect: () => void
    filter: ToolKey | null
    onFilter: (filter: ToolKey | null) => void
    /** Puts the demo back to how it loaded: first page, no filter, nothing selected. */
    onReset: () => void
    /** How many touchpoints each tool has on the page being viewed. */
    counts: Partial<Record<ToolKey, number>>
}

const BUTTON = 'flex items-center justify-center size-8 rounded-md transition-colors'
const IDLE = 'text-white/70 hover:text-white hover:bg-white/10'
const ACTIVE = 'bg-white/20 text-white'
const EMPTY = 'text-white/30 cursor-default'
const DIVIDER = 'w-px h-6 bg-white/15 mx-1'

/**
 * A stand-in for the real PostHog toolbar, the thing you'd use to poke at a live
 * site: it loads on your own product, only for you, and Inspect highlights the
 * elements PostHog knows about.
 *
 * Styled like the real toolbar (dark bar, logomark, icon-only buttons) but docked
 * as the sidebar's nav rather than floating over the demo, where it competed with
 * the markers for attention and got lost against the page.
 *
 * Every button does something: the logomark opens the toolbar docs, Inspect toggles
 * the markers, each tool button filters them to what that tool instruments here,
 * and reset puts the demo back to how it loaded.
 */
export default function ToolbarBar({
    inspecting,
    onToggleInspect,
    filter,
    onFilter,
    onReset,
    counts,
}: ToolbarBarProps): JSX.Element {
    return (
        <div className="flex items-center flex-wrap gap-0.5 px-1.5 py-1.5 bg-dark shrink-0">
            <Tooltip
                trigger={
                    /* Docs open in a real browser tab so the demo is left exactly as it
                       was. `state={{ newWindow: true }}` would open an OS window on top
                       of it instead. Both props are needed: Link decides GatsbyLink vs
                       <a> from the URL alone, so disablePrefetch is what gets us an
                       anchor, and externalNoIcon is what puts target="_blank" on it
                       without appending an external-link arrow. */
                    <Link
                        to="/docs/toolbar"
                        disablePrefetch
                        externalNoIcon
                        aria-label="PostHog toolbar docs"
                        className={`${BUTTON} shrink-0 ${IDLE}`}
                    >
                        <Logo layout="logomark" variant="mono" color="currentColor" size={18} />
                    </Link>
                }
            >
                This is the PostHog toolbar. Read its docs.
            </Tooltip>

            <span className={DIVIDER} aria-hidden />

            <Tooltip
                trigger={
                    <button
                        type="button"
                        onClick={onToggleInspect}
                        aria-pressed={inspecting}
                        aria-label="Inspect"
                        className={`${BUTTON} ${inspecting ? ACTIVE : IDLE}`}
                    >
                        <IconSearch className="size-5" />
                    </button>
                }
            >
                {inspecting ? 'Hide instrumentation' : 'Show instrumentation'}
            </Tooltip>

            <span className={DIVIDER} aria-hidden />

            {Object.values(TOOLS).map((tool) => {
                const count = counts[tool.key] || 0
                const { Icon } = tool
                const isActive = filter === tool.key
                const disabled = !count || !inspecting
                return (
                    <Tooltip
                        key={tool.key}
                        trigger={
                            <button
                                type="button"
                                disabled={disabled}
                                aria-pressed={isActive}
                                aria-label={tool.name}
                                onClick={() => onFilter(isActive ? null : tool.key)}
                                className={`${BUTTON} ${disabled ? EMPTY : isActive ? ACTIVE : IDLE}`}
                            >
                                <Icon className="size-5" />
                            </button>
                        }
                    >
                        {!inspecting
                            ? `${tool.name} (show instrumentation first)`
                            : !count
                            ? `${tool.name} (nothing on this page)`
                            : isActive
                            ? `${tool.name}: showing ${count} of them`
                            : `${tool.name}: ${count} here, click to isolate`}
                    </Tooltip>
                )
            })}

            <span className={DIVIDER} aria-hidden />

            <Tooltip
                trigger={
                    <button type="button" onClick={onReset} aria-label="Reset" className={`${BUTTON} ${IDLE}`}>
                        <IconRevert className="size-5" />
                    </button>
                }
            >
                Reset the demo
            </Tooltip>
        </div>
    )
}
