import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { IconBook, IconChevronLeft, IconChevronRight, IconList } from '@posthog/icons'

import Link from 'components/Link'

export interface BookTab {
    label: string
    url: string
    /** Printed after the label – a folio number, or `i` for the front matter. */
    number?: string
    active?: boolean
}

interface BookReaderProps {
    /** The orientation bar's center: title plus page position. */
    head?: { title: string; page?: number; total: number }
    /** Volume color token for the spine edge, matching the shelf cover. */
    token: string
    /** The scrolling body: the page's MDX, interleaved by the reader's wrapper. */
    children: React.ReactNode
    /** Pinned below the page, so a reader convinced early can act without scrolling back. */
    actionBar?: React.ReactNode
    prev?: { url: string; label: string }
    next?: { url: string; label: string }
    /** The contents popover's entries, one per page you can turn to. */
    tabs?: BookTab[]
    /** The way out – in the bar and the page foot, so leaving the book is always one click. */
    shelf?: { url: string; label: string }
    /** Reading size in px, applied to the body so the em-based prose scales. */
    fontSize?: number
    onFontSize?: (delta: number) => void
    fontSizes?: readonly number[]
}

/** The reading-size control, inside the Aa pop-out. */
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

/** The contents list: dotted leaders and folio numbers, styled as the book's own ToC page. */
function ContentsList({ tabs }: { tabs: BookTab[] }): JSX.Element {
    return (
        <>
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
                                <span className="shrink-0 text-[10px] tabular-nums opacity-70">{tab.number}</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

/** Click-to-turn zone in the page margin, so the chevron never lands on text. */
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
 * The e-reader: one scrolling page with figures inline where the prose cites them. On phones
 * it's a plain page; wider, a framed page with the volume's spine and click-to-turn margins.
 */
export default function BookReader({
    head,
    token,
    children,
    actionBar,
    prev,
    next,
    tabs,
    shelf,
    fontSize,
    onFontSize,
    fontSizes,
}: BookReaderProps): JSX.Element {
    const reducedMotion = useReducedMotion()
    const [openPanel, setOpenPanel] = useState<'contents' | 'type' | null>(null)
    const toggle = (panel: 'contents' | 'type') => setOpenPanel((current) => (current === panel ? null : panel))

    const turnLinkClasses =
        'flex size-9 shrink-0 items-center justify-center rounded text-secondary hover:bg-accent hover:text-primary dark:hover:bg-accent-dark'
    const barToggleClasses = (active: boolean) =>
        `${turnLinkClasses} ${active ? 'bg-accent text-primary dark:bg-accent-dark' : ''}`

    return (
        <div className="mx-auto flex h-full min-h-0 w-full max-w-[52rem] flex-col">
            <article className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-primary @xl:rounded-sm @xl:border @xl:border-primary @xl:shadow-xl">
                {/* The spine, carried over from the shelf cover so the page still reads as this volume. */}
                <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 z-10 hidden w-1.5 bg-${token} @xl:block`}
                />

                {/* Orientation bar: the way out, a turn each way, where you are, contents, and type. */}
                <nav
                    aria-label="Pocket guide navigation"
                    className="relative z-30 flex shrink-0 items-center gap-0.5 border-b border-primary bg-primary px-1.5 py-1 @xl:pl-3"
                >
                    {shelf && (
                        <Link to={shelf.url} aria-label={shelf.label} title={shelf.label} className={turnLinkClasses}>
                            <IconBook className="size-4" />
                        </Link>
                    )}
                    {prev ? (
                        <Link to={prev.url} aria-label={prev.label} className={turnLinkClasses}>
                            <IconChevronLeft className="size-5" />
                        </Link>
                    ) : (
                        <span aria-hidden="true" className="size-9 shrink-0" />
                    )}
                    <span className="flex min-w-0 flex-1 items-baseline justify-center gap-1.5 text-xs">
                        <span className="truncate font-semibold text-primary">{head?.title}</span>
                        {head?.page && (
                            <span className="shrink-0 tabular-nums text-secondary">
                                p. {head.page} of {head.total}
                            </span>
                        )}
                    </span>
                    {next ? (
                        <Link to={next.url} aria-label={next.label} className={turnLinkClasses}>
                            <IconChevronRight className="size-5" />
                        </Link>
                    ) : (
                        <span aria-hidden="true" className="size-9 shrink-0" />
                    )}
                    {tabs && tabs.length > 0 && (
                        <button
                            type="button"
                            onClick={() => toggle('contents')}
                            aria-expanded={openPanel === 'contents'}
                            aria-label="Contents"
                            title="Contents"
                            className={barToggleClasses(openPanel === 'contents')}
                        >
                            <IconList className="size-4" />
                        </button>
                    )}
                    {fontSize && onFontSize && fontSizes && (
                        <button
                            type="button"
                            onClick={() => toggle('type')}
                            aria-expanded={openPanel === 'type'}
                            aria-label="Reading settings"
                            title="Reading settings"
                            className={barToggleClasses(openPanel === 'type')}
                        >
                            <span className="text-[13px] font-bold leading-none">Aa</span>
                        </button>
                    )}

                    {openPanel === 'contents' && tabs && (
                        <motion.nav
                            aria-label="Pocket guide contents"
                            className="absolute right-1.5 top-full z-30 mt-1 w-64 overflow-hidden rounded-md border border-primary bg-primary shadow-xl"
                            initial={reducedMotion ? false : { y: -6, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                            <ContentsList tabs={tabs} />
                        </motion.nav>
                    )}
                    {openPanel === 'type' && fontSize && onFontSize && fontSizes && (
                        <div className="absolute right-1.5 top-full z-30 mt-1 rounded-md border border-primary bg-primary p-3 shadow-xl">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-xs font-semibold text-secondary">Font size</span>
                                <BookControls fontSize={fontSize} sizes={fontSizes} onStep={onFontSize} />
                            </div>
                        </div>
                    )}
                </nav>

                <div className="relative min-h-0 flex-1">
                    {prev && <PageTurnZone to={prev.url} label={prev.label} direction="prev" />}
                    {next && <PageTurnZone to={next.url} label={next.label} direction="next" />}
                    <div className="h-full overflow-y-auto">
                        {/* min-h-full + mt-auto: on a short page the nav pins to the page's
                            foot instead of floating mid-page above empty paper. */}
                        <div className="flex min-h-full flex-col">
                            <div style={{ fontSize }}>{children}</div>
                            <nav
                                aria-label="Pocket guide pages"
                                className="mt-auto flex items-baseline justify-between gap-4 px-5 pb-8 text-sm @xl:px-12"
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
                    </div>
                </div>
                {actionBar && <div className="shrink-0">{actionBar}</div>}
            </article>
        </div>
    )
}
