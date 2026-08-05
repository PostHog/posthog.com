import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { IconBook, IconChevronLeft, IconChevronRight, IconGear } from '@posthog/icons'

import Link from 'components/Link'

export interface BookTab {
    label: string
    url: string
    /** Printed before the label – a folio number, or `i` for the front matter. */
    number?: string
    active?: boolean
}

interface BookSpreadProps {
    /** One-column plain-page mode for phones and narrow windows – no book furniture. */
    single?: boolean
    /** Volume color token for the spine edge, matching the shelf cover. */
    token: string
    /** Running heads, repeated at the top of each page. */
    heads: { left: React.ReactNode; right: React.ReactNode }
    /** Folio lines at the foot of each page. */
    folios: { left: React.ReactNode; right: React.ReactNode }
    /** The scrolling body: the page's `<LeftPage>` and `<RightPage>` columns from its MDX. */
    children: React.ReactNode
    /** Pinned above the folios, so a reader convinced early can act without scrolling back. */
    actionBar?: React.ReactNode
    prev?: { url: string; label: string }
    next?: { url: string; label: string }
    /** Index tabs pinned left of the book, one per page you can turn to. */
    tabs?: BookTab[]
    /** The way out – rendered above the tabs, so leaving the book is always one click. */
    shelf?: { url: string; label: string }
    /** Reading size in px, applied to the body so the em-based prose scales. */
    fontSize?: number
    onFontSize?: (delta: number) => void
    fontSizes?: readonly number[]
}

const HEAD_CLASSES =
    'flex items-baseline justify-between gap-3 border-b border-primary px-5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-secondary @4xl:px-11'
const FOLIO_CLASSES =
    'flex items-baseline justify-between gap-3 border-t border-primary px-5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-secondary @4xl:px-11'

/** The reading-size control, inside the settings pop-out. */
function BookControls({
    fontSize,
    sizes,
    onStep,
}: {
    fontSize: number
    sizes: readonly number[]
    onStep: (delta: number) => void
}): JSX.Element {
    const index = sizes.indexOf(fontSize)
    const buttonClasses =
        'flex h-7 w-8 items-center justify-center text-secondary transition-colors hover:bg-accent hover:text-primary disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-secondary dark:hover:bg-accent-dark'

    return (
        <div className="flex items-center gap-2">
            <div
                className="flex items-center overflow-hidden rounded border border-primary"
                role="group"
                aria-label="Reading size"
            >
                <button
                    type="button"
                    onClick={() => onStep(-1)}
                    disabled={index <= 0}
                    aria-label="Smaller text"
                    className={buttonClasses}
                >
                    <span className="text-[11px] font-bold leading-none">A</span>
                </button>
                <span aria-hidden="true" className="h-7 w-px bg-[var(--border)] opacity-60" />
                <button
                    type="button"
                    onClick={() => onStep(1)}
                    disabled={index >= sizes.length - 1}
                    aria-label="Larger text"
                    className={buttonClasses}
                >
                    <span className="text-[16px] font-bold leading-none">A</span>
                </button>
            </div>
        </div>
    )
}

/** Click-to-turn zone, exactly the fore-edge margin's width so the chevron never lands on text. */
function PageTurnZone({
    to,
    label,
    direction,
}: {
    to: string
    label: string
    direction: 'prev' | 'next'
}): JSX.Element {
    const Icon = direction === 'prev' ? IconChevronLeft : IconChevronRight
    return (
        <Link
            to={to}
            aria-label={label}
            // Stops short of the running head and folio so their own links stay clickable.
            className={`group absolute bottom-12 top-12 z-20 hidden w-11 items-center justify-center @4xl:flex ${
                direction === 'prev' ? 'left-0' : 'right-0'
            }`}
        >
            <span className="flex size-7 items-center justify-center rounded-full text-secondary opacity-0 transition-all duration-200 group-hover:bg-accent group-hover:text-primary group-hover:opacity-100 dark:group-hover:bg-accent-dark">
                <Icon className="size-4" />
            </span>
        </Link>
    )
}

/**
 * One open spread: spine, two pages joined at a full-height gutter, running heads, folios, and
 * click-to-turn margins. One shared scroller, so a figure keeps pace with the passage beside it.
 */
export default function BookSpread({
    single = false,
    token,
    heads,
    folios,
    children,
    actionBar,
    prev,
    next,
    tabs,
    shelf,
    fontSize,
    onFontSize,
    fontSizes,
}: BookSpreadProps): JSX.Element {
    const reducedMotion = useReducedMotion()
    // Which pop-out is open. Declared before the single-page branch – hooks must match across modes.
    const [openPanel, setOpenPanel] = useState<'contents' | 'type' | null>(null)
    const toggle = (panel: 'contents' | 'type') => setOpenPanel((current) => (current === panel ? null : panel))

    // The plain single-page read: interleaved content, pinned action bar, plain prev/next links.
    if (single) {
        return (
            <div className="mx-auto flex h-full min-h-0 w-full max-w-2xl flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto">
                    <div style={{ fontSize }}>{children}</div>
                    <nav
                        aria-label="Pocket guide pages"
                        className="flex items-baseline justify-between gap-4 px-5 pb-8 text-sm"
                    >
                        {prev ? (
                            <Link to={prev.url} className="min-w-0 truncate text-secondary hover:text-primary">
                                ‹ {prev.label}
                            </Link>
                        ) : (
                            <span />
                        )}
                        {shelf && (
                            <Link to={shelf.url} className="shrink-0 text-secondary hover:text-primary">
                                All guides
                            </Link>
                        )}
                        {next ? (
                            <Link
                                to={next.url}
                                className="min-w-0 truncate text-right text-secondary hover:text-primary"
                            >
                                {next.label} ›
                            </Link>
                        ) : (
                            <span />
                        )}
                    </nav>
                </div>
                {actionBar && <div className="shrink-0">{actionBar}</div>}
            </div>
        )
    }

    const railTabClasses = (active: boolean) =>
        `rounded-l-md border border-r-0 border-primary px-1.5 py-3 text-[10px] font-bold uppercase tracking-wide no-underline transition-colors [writing-mode:vertical-rl] ${
            active ? 'bg-primary text-primary' : 'bg-accent text-secondary hover:text-primary dark:bg-accent-dark'
        }`
    const panelClasses =
        'absolute left-full top-0 z-30 rounded-r-md rounded-bl-md border border-primary bg-primary p-2 shadow-xl'

    return (
        <div className="@container relative mx-auto flex h-full min-h-0 w-full max-w-[92rem]">
            {/* Index tabs on the book's edge; below @4xl the folios carry navigation instead. */}
            {tabs && tabs.length > 0 && (
                <div className="relative z-30 hidden shrink-0 @4xl:block">
                    {/* Contents at the head of the rail, settings gear at its foot. */}
                    <div className="flex h-full flex-col justify-between pb-10 pt-10">
                        <div className="flex flex-col gap-1">
                            {/* The way out: back to the shelf, one click, always visible. */}
                            {shelf && (
                                <Link
                                    to={shelf.url}
                                    aria-label={shelf.label}
                                    title={shelf.label}
                                    className="flex items-center justify-center rounded-l-md border border-r-0 border-primary bg-accent p-1.5 text-secondary transition-colors hover:text-primary dark:bg-accent-dark"
                                >
                                    <IconBook className="size-4" />
                                </Link>
                            )}
                            <button
                                type="button"
                                onClick={() => toggle('contents')}
                                aria-expanded={openPanel === 'contents'}
                                className={railTabClasses(openPanel === 'contents')}
                            >
                                Contents
                            </button>
                        </div>
                        {fontSize && onFontSize && fontSizes && (
                            <button
                                type="button"
                                onClick={() => toggle('type')}
                                aria-expanded={openPanel === 'type'}
                                aria-label="Reading settings"
                                className={`flex items-center justify-center rounded-l-md border border-r-0 border-primary p-1.5 transition-colors ${
                                    openPanel === 'type'
                                        ? 'bg-primary text-primary'
                                        : 'bg-accent text-secondary hover:text-primary dark:bg-accent-dark'
                                }`}
                            >
                                <IconGear className="size-4" />
                            </button>
                        )}
                    </div>

                    {openPanel === 'contents' && (
                        // Styled as the book's own contents page: running head, dotted leaders, folio foot.
                        <motion.nav
                            aria-label="Pocket guide contents"
                            className={`${panelClasses} top-10 w-64 overflow-hidden p-0`}
                            initial={reducedMotion ? false : { x: -8, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                            <p className="m-0 border-b border-primary px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-secondary">
                                Contents
                            </p>
                            <ul className="m-0 list-none space-y-1 p-3">
                                {tabs.map((tab) => (
                                    <li key={tab.url}>
                                        <Link
                                            to={tab.url}
                                            aria-current={tab.active ? 'page' : undefined}
                                            className={`flex items-baseline gap-2 rounded px-1.5 py-1 text-xs no-underline hover:text-primary ${
                                                tab.active ? 'font-bold text-primary' : 'text-secondary'
                                            }`}
                                        >
                                            <span className="min-w-0 truncate">{tab.label}</span>
                                            <span
                                                aria-hidden="true"
                                                className="min-w-4 flex-1 border-b border-dotted border-primary opacity-50"
                                            />
                                            {tab.number && (
                                                <span className="shrink-0 text-[10px] tabular-nums opacity-70">
                                                    {tab.number}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.nav>
                    )}

                    {openPanel === 'type' && fontSize && onFontSize && fontSizes && (
                        <div className={`${panelClasses} bottom-10 top-auto rounded-r-md rounded-tl-md p-3`}>
                            {/* One labelled row per setting, so the panel scales as settings move in. */}
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-xs font-semibold text-secondary">Font size</span>
                                <BookControls fontSize={fontSize} sizes={fontSizes} onStep={onFontSize} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
                <article className="relative flex min-h-0 flex-1 overflow-hidden rounded-sm border border-primary bg-primary shadow-xl">
                    {/* The spine, carried over from the shelf cover so open and closed match. */}
                    <span aria-hidden="true" className={`w-2 shrink-0 bg-${token} @4xl:w-3`} />

                    {/* Heads and folios are fixed furniture; only the page body scrolls. */}
                    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
                        {prev && <PageTurnZone to={prev.url} label={prev.label} direction="prev" />}
                        {next && <PageTurnZone to={next.url} label={next.label} direction="next" />}

                        <div className="flex shrink-0">
                            <header className={`${HEAD_CLASSES} min-w-0 flex-1`}>{heads.left}</header>
                            <header className={`${HEAD_CLASSES} hidden min-w-0 flex-1 @4xl:flex`}>{heads.right}</header>
                        </div>

                        {/* The columns flip themselves (PageColumn); this wrapper is scroll, size, and depth. */}
                        <div className="min-h-0 flex-1 overflow-y-auto [perspective:2000px]">
                            <div style={{ fontSize }} className="flex min-h-full flex-col @4xl:flex-row">
                                {children}
                            </div>
                        </div>

                        {/* The action bar belongs to the right page, so it spans only that half. */}
                        {actionBar && (
                            <div className="relative z-10 flex shrink-0">
                                <div aria-hidden="true" className="hidden min-w-0 flex-1 @4xl:block" />
                                <div className="min-w-0 flex-1">{actionBar}</div>
                            </div>
                        )}

                        <div className="flex shrink-0 flex-col @4xl:flex-row">
                            <footer className={`${FOLIO_CLASSES} min-w-0 flex-1`}>{folios.left}</footer>
                            <footer className={`${FOLIO_CLASSES} min-w-0 flex-1`}>{folios.right}</footer>
                        </div>

                        {/* The gutter, drawn once at full height so the seam never breaks mid-scroll. */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/[0.045] to-transparent @4xl:block dark:via-black/25"
                        />
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-[var(--border)] @4xl:block"
                        />
                    </div>
                </article>
            </div>
        </div>
    )
}
