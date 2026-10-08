import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconSidebarOpen, IconSidebarClose, IconSearch } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { InlineSearch } from 'components/Search/InlineSearch'
import { useSearch } from 'components/Editor/SearchProvider'
import { ViewerSearchResults } from './ViewerSearchResults'

interface ViewerSidebarProps {
    /** Static header shown at the top of the column / next to the mobile menu toggle (e.g. a product/collection label). */
    sidebarHeader?: React.ReactNode
    /** The navigation menu (e.g. `<TreeMenu appearance="sidebar" />`), shown when not searching. */
    nav: React.ReactNode
    /** The Viewer's article content ref — `InlineSearch` highlights matches inside it; results scroll it. */
    searchContentRef: React.RefObject<HTMLElement>
}

const COLLAPSE_KEY = 'viewerSidebarCollapsed'

/**
 * Viewer's left navigation sidebar.
 *
 * - **Wide (`@3xl`+):** a column that toggles between ~250px (header + search + nav/results) and a
 *   thin icon rail (expand + search icons). Collapsed state persists to localStorage.
 * - **Narrow:** a menu toggle that expands the same search + nav/results *downward*, animated with
 *   framer-motion.
 *
 * All toggle affordances sit on the **left** so they never collide with the window's top-right
 * min/max/close controls.
 *
 * The desktop column's `InlineSearch` is the single mark.js owner (it stays mounted — only CSS-hidden
 * — when collapsed or on mobile), so highlights persist and there's never a double-marking race. The
 * mobile accordion's input is markerless and just drives the shared query. Must be used inside
 * `components/Editor/SearchProvider`.
 */
export function ViewerSidebar({ sidebarHeader, nav, searchContentRef }: ViewerSidebarProps) {
    const [menuOpen, setMenuOpen] = useState(false) // mobile accordion
    const [collapsed, setCollapsed] = useState(false) // desktop icon rail
    const { searchQuery } = useSearch()
    const panelRef = useRef<HTMLDivElement>(null)
    const searching = searchQuery.trim().length >= 2

    useEffect(() => {
        try {
            if (localStorage.getItem(COLLAPSE_KEY) === '1') setCollapsed(true)
        } catch {
            /* localStorage unavailable */
        }
    }, [])

    const updateCollapsed = (value: boolean) => {
        setCollapsed(value)
        try {
            localStorage.setItem(COLLAPSE_KEY, value ? '1' : '0')
        } catch {
            /* localStorage unavailable */
        }
    }

    // Expanding via the collapsed search icon focuses the input once the panel is visible.
    const expandAndFocusSearch = () => {
        updateCollapsed(false)
        requestAnimationFrame(() => panelRef.current?.querySelector('input')?.focus())
    }

    const body = (mark: boolean) => (
        <>
            <InlineSearch contentRef={mark ? searchContentRef : undefined} />
            {searching ? <ViewerSearchResults contentRef={searchContentRef} /> : <div className="not-prose">{nav}</div>}
        </>
    )

    return (
        <div
            data-scheme="primary"
            className={`shrink-0 flex flex-col bg-primary border-secondary transition-[width] duration-300 @3xl:border-r ${
                collapsed ? '@3xl:w-12' : '@3xl:w-[250px]'
            }`}
        >
            {/* Mobile: toggle (left) + animated accordion — hidden once the desktop layout appears */}
            <div className="@3xl:hidden flex flex-col">
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-expanded={menuOpen}
                    className="flex items-center gap-2 w-full px-2 py-1.5 border-b border-secondary text-left text-primary"
                >
                    {menuOpen ? (
                        <IconSidebarOpen className="size-5 shrink-0 rotate-90 text-primary" />
                    ) : (
                        <IconSidebarClose className="size-5 shrink-0 rotate-90 text-primary" />
                    )}
                    <span className="min-w-0">
                        {sidebarHeader ?? <span className="font-semibold text-sm">Menu</span>}
                    </span>
                </button>
                <AnimatePresence initial={false}>
                    {menuOpen && (
                        <motion.div
                            key="mobile-panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden border-b border-secondary"
                        >
                            <div className="flex flex-col gap-2 p-2 max-h-[60vh] overflow-y-auto">{body(false)}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop collapsed icon rail */}
            <div className={`hidden ${collapsed ? '@3xl:flex' : '@3xl:hidden'} flex-col items-center gap-1 p-1`}>
                <OSButton
                    onClick={() => updateCollapsed(false)}
                    icon={<IconSidebarClose className="size-5 text-primary" />}
                    size="md"
                    tooltip="Expand sidebar"
                />
                <OSButton
                    onClick={expandAndFocusSearch}
                    icon={<IconSearch className="size-5 text-primary" />}
                    size="md"
                    tooltip="Search"
                />
            </div>

            {/* Desktop expanded column — stays mounted (CSS-hidden) when collapsed so its InlineSearch keeps highlighting */}
            <div className={`hidden ${collapsed ? '@3xl:hidden' : '@3xl:flex'} flex-col min-h-0 flex-1`}>
                <div className="flex items-center justify-between gap-1 px-2 py-1.5 border-b border-secondary shrink-0">
                    <span className="min-w-0">{sidebarHeader}</span>
                    <OSButton
                        onClick={() => updateCollapsed(true)}
                        icon={<IconSidebarOpen className="size-5 text-primary" />}
                        size="sm"
                        tooltip="Collapse sidebar"
                    />
                </div>
                <div ref={panelRef} className="flex flex-col gap-2 p-2 min-h-0 flex-1 overflow-y-auto">
                    {body(true)}
                </div>
            </div>
        </div>
    )
}

export default ViewerSidebar
