import React, { useEffect, useState, useMemo, useRef } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { IconChevronRight, IconPlus, IconArrowUpRight } from '@posthog/icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from '@reach/router'
import { replacePath } from '../../../gatsby/utils'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'

interface MenuItem {
    name: string
    url?: string
    children?: MenuItem[]
    icon?: React.ReactNode
    /** Renders a trailing ↗ and opens in a new tab. Also inferred for `http(s)` URLs. */
    external?: boolean
    badge?: {
        title: string
        className?: string
    }
}

/** A flat list of `{name}` headers + `{name,url}` links grouped into sections. */
interface MenuSection {
    heading: string
    items: MenuItem[]
}

type TreeMenuVariant = 'grouped' | 'listed'

/**
 * `os` (default) renders links as `OSButton`s — the look used by every
 * existing TreeMenu (handbook, blog, data-stack, …). `sidebar` matches the
 * product Product/Pricing nav: text-only links with a stronger selected state,
 * lighter hover tint, and muted section labels.
 */
type TreeMenuAppearance = 'os' | 'sidebar'

const badgeClasses = 'bg-accent text-secondary text-xs font-medium rounded-sm px-1 py-0.5 inline-block leading-none'

const Badge = ({ badge }: { badge?: MenuItem['badge'] }) =>
    badge?.title ? <span className={`${badgeClasses} ${badge.className || ''}`}>{badge.title}</span> : null

interface TreeMenuProps {
    items: MenuItem[]
    activeItem?: MenuItem
    watchPath?: boolean
    /**
     * `listed` (default) renders every section header as a muted label with all
     * its links always visible. `grouped` renders each section header as a
     * `+`→`×` toggle that expands/collapses its links; only the section
     * containing the active item starts open.
     */
    variant?: TreeMenuVariant
    appearance?: TreeMenuAppearance
    /**
     * Section heading to treat as "root" — its links render as plain top-level
     * links with no section label or collapse (usually the product name).
     */
    rootHeading?: string
    activeUrl?: string
}

/** Genuinely off-site URL — opens in a new browser tab. */
const isHttpExternal = (url?: string): boolean => /^https?:\/\//.test(url || '')

/**
 * Shows the trailing ↗ "leaves this section" cue. Real `http(s)` links also
 * open in a new browser tab; `external`-flagged internal links keep in-app
 * (OS-window) navigation and only get the visual cue.
 */
const showsExternalArrow = (item: MenuItem): boolean => Boolean(item.external) || isHttpExternal(item.url)

const TreeLink = ({
    menuItem,
    index,
    onClick,
    activeItem,
}: {
    menuItem: MenuItem
    index: number
    onClick: (item: MenuItem) => void
    activeItem: MenuItem | undefined
}) => {
    const active = menuItem === activeItem
    const { siteSettings } = useApp()
    const httpExternal = isHttpExternal(menuItem.url)
    const arrow = showsExternalArrow(menuItem)

    return menuItem.url ? (
        <OSButton
            active={active}
            align="left"
            width="full"
            size="md"
            hover="background"
            asLink
            to={menuItem.url}
            external={httpExternal}
            className={`${index === 0 ? '' : `pl-${4 + index * 3}`} ${
                siteSettings.heaterMode
                    ? active
                        ? '!bg-dark/15 dark:!bg-light/15 hover:!bg-dark/15 dark:hover:!bg-light/15'
                        : 'hover:!bg-dark/10 dark:hover:!bg-light/10'
                    : active
                    ? '!bg-accent hover:!bg-accent'
                    : 'hover:!bg-accent/50'
            }`}
            onClick={() => onClick(menuItem)}
            icon={typeof menuItem.icon !== 'string' && menuItem.icon}
        >
            <span
                data-sidebar-label
                className={`inline-flex items-center gap-1.5${menuItem.badge?.title ? ' pr-1' : ''}`}
            >
                <span>{menuItem.name}</span>
                <Badge badge={menuItem.badge} />
                {arrow && !httpExternal && <IconArrowUpRight className="size-3.5 text-secondary shrink-0" />}
            </span>
        </OSButton>
    ) : (
        <div className={`text-muted text-sm py-0.5 !mt-2 ml-${2 + index} pl-${index * 4}`}>
            <span data-sidebar-label>{menuItem.name}</span>
        </div>
    )
}

/**
 * Truncates with an ellipsis at rest; on hover, if the label overflows, it
 * scrolls smoothly to reveal the full text (ping-pong ticker) instead of
 * clipping. `data-sidebar-label` lives on the outer span so the collapsed
 * sidebar can still hide it.
 */
/** Both-edge fade so the scrolling text dissolves at the edges instead of hard-clipping. */
const MARQUEE_MASK = 'linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%)'

const MarqueeLabel = ({
    children,
    hovering,
    className = '',
}: {
    children: React.ReactNode
    /** Driven by the parent link's hover so the whole row triggers the scroll, not just the text. */
    hovering: boolean
    className?: string
}) => {
    const outerRef = useRef<HTMLSpanElement>(null)
    const [distance, setDistance] = useState(0)

    useEffect(() => {
        if (!hovering) {
            setDistance(0)
            return
        }
        const outer = outerRef.current
        const text = outer?.querySelector('[data-marquee-text]') as HTMLElement | null
        const overflow = text ? text.scrollWidth - outer!.clientWidth : 0
        setDistance(overflow > 1 ? overflow : 0)
    }, [hovering])

    const animate = hovering && distance > 0
    // Scroll a little past the end so the last characters clear the right-edge fade.
    const travel = distance + 16

    return (
        <span
            ref={outerRef}
            data-sidebar-label
            className={`relative block min-w-0 flex-1 overflow-hidden ${className}`}
            style={animate ? { maskImage: MARQUEE_MASK, WebkitMaskImage: MARQUEE_MASK } : undefined}
        >
            {animate ? (
                <motion.span
                    data-marquee-text
                    className="block w-max whitespace-nowrap"
                    initial={{ x: 0 }}
                    animate={{ x: -travel }}
                    transition={{ duration: Math.max(travel / 45, 0.8), ease: 'linear' }}
                >
                    {children}
                </motion.span>
            ) : (
                <span data-marquee-text className="block truncate">
                    {children}
                </span>
            )}
        </span>
    )
}

/** ProductNav-matching link used by the `sidebar` appearance. */
const SidebarLink = ({
    menuItem,
    index,
    onClick,
    activeItem,
}: {
    menuItem: MenuItem
    index: number
    onClick: (item: MenuItem) => void
    activeItem: MenuItem | undefined
}) => {
    const active = menuItem === activeItem
    const { siteSettings } = useApp()
    const httpExternal = isHttpExternal(menuItem.url)
    const arrow = showsExternalArrow(menuItem)
    const [hovering, setHovering] = useState(false)

    return (
        <Link
            to={menuItem.url || ''}
            external={httpExternal}
            // Arrow (`external`-flagged) internal links open in a new PostHog OS window.
            state={arrow && !httpExternal ? { newWindow: true } : undefined}
            onClick={() => onClick(menuItem)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            // Hover stays lighter than the selected state so the current page remains dominant.
            // `outline-offset-[-2px]`: keep the focus ring inside the link so the scroll container doesn't clip it.
            className={`flex items-center gap-1 w-full min-w-0 px-2 py-1 rounded text-sm !no-underline focus-visible:outline-offset-[-2px] ${
                active
                    ? `${
                          siteSettings.heaterMode ? 'bg-dark/15 dark:bg-light/15' : 'bg-accent'
                      } !text-primary font-semibold`
                    : `!text-primary ${
                          siteSettings.heaterMode ? 'hover:bg-dark/10 dark:hover:bg-light/10' : 'hover:bg-accent/50'
                      }`
            }`}
            style={index > 0 ? { paddingLeft: 8 + index * 12 } : undefined}
        >
            <MarqueeLabel hovering={hovering}>{menuItem.name}</MarqueeLabel>
            {arrow && !httpExternal && <IconArrowUpRight className="size-3.5 shrink-0 opacity-60" />}
        </Link>
    )
}

/** Sentence-case section label used by the `sidebar` appearance. Inter-section spacing comes from the container's `gap`. */
const SidebarSectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="text-secondary/50 text-sm px-2 pb-0.5">
        <span data-sidebar-label>{children}</span>
    </div>
)

const renderSidebarItems = (
    items: MenuItem[],
    activeItem: MenuItem | undefined,
    onClick: (item: MenuItem) => void,
    index = 0
): React.ReactNode =>
    items.map((item, i) => {
        const key = `${item.name}-${i}-${item.url}`
        const hasChildren = item.children && item.children.length > 0

        // A link that also has children (e.g. "Install") renders as an expandable submenu.
        if (hasChildren && item.url) {
            return (
                <SidebarCollapsibleItem key={key} item={item} index={index} activeItem={activeItem} onClick={onClick} />
            )
        }

        return (
            <React.Fragment key={key}>
                {item.url ? (
                    <SidebarLink menuItem={item} index={index} onClick={onClick} activeItem={activeItem} />
                ) : (
                    <SidebarSectionLabel>{item.name}</SidebarSectionLabel>
                )}
                {hasChildren && renderSidebarItems(item.children as MenuItem[], activeItem, onClick, index + 1)}
            </React.Fragment>
        )
    })

/**
 * Expandable submenu for a `sidebar`-appearance link that has children (e.g.
 * "Install" → the per-language pages). The label navigates to the parent's main
 * page; a chevron toggles the children. Auto-opens when a child is active.
 */
function SidebarCollapsibleItem({
    item,
    index,
    activeItem,
    onClick,
}: {
    item: MenuItem
    index: number
    activeItem: MenuItem | undefined
    onClick: (item: MenuItem) => void
}) {
    const active = item === activeItem
    const { siteSettings } = useApp()
    // Only auto-expand when a child page is active (e.g. a specific language).
    // Clicking the parent's own page navigates without forcing the menu open.
    const childActive = sectionContainsActive(item.children || [], activeItem)
    const [open, setOpen] = useState(() => childActive)
    const [hovering, setHovering] = useState(false)

    // Depend on `childActive` (not pathname): `activeItem` may update a render
    // after the path changes, so this re-runs once it actually resolves.
    useEffect(() => {
        if (childActive) setOpen(true)
    }, [childActive])

    // When open, the nested submenu becomes an elevated white card (per wireframe).
    return (
        <div className={open ? 'rounded bg-white dark:bg-dark p-px shadow-lg' : ''}>
            <div className="flex items-center gap-px">
                <Link
                    to={item.url || ''}
                    onClick={() => onClick(item)}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    // `contextMenu={false}` avoids Link's inline <span> wrapper, which would
                    // otherwise size to content in this flex row and prevent `flex-1` from filling.
                    contextMenu={false}
                    className={`flex items-center gap-1 flex-1 min-w-0 px-2 py-1 rounded text-sm !no-underline focus-visible:outline-offset-[-2px] ${
                        active
                            ? `${
                                  siteSettings.heaterMode ? 'bg-dark/15 dark:bg-light/15' : 'bg-accent'
                              } !text-primary font-semibold`
                            : `!text-primary ${
                                  siteSettings.heaterMode
                                      ? 'hover:bg-dark/10 dark:hover:bg-light/10'
                                      : 'hover:bg-accent/50'
                              }`
                    }`}
                    style={index > 0 ? { paddingLeft: 8 + index * 12 } : undefined}
                >
                    <MarqueeLabel hovering={hovering}>{item.name}</MarqueeLabel>
                </Link>
                <button
                    type="button"
                    aria-expanded={open}
                    aria-label={`${open ? 'Collapse' : 'Expand'} ${item.name}`}
                    onClick={() => setOpen((prev) => !prev)}
                    className="ml-auto shrink-0 p-1 rounded text-primary hover:bg-accent"
                >
                    <motion.span
                        animate={{ rotate: open ? 45 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                        className="block"
                    >
                        <IconPlus className="size-4" />
                    </motion.span>
                </button>
            </div>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col gap-px pt-px">
                            {renderSidebarItems(item.children || [], activeItem, onClick, index + 1)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const getActiveItem = (items: MenuItem[], currentUrl: string): MenuItem | undefined => {
    const url = currentUrl.replace(/\/$/, '')
    for (const item of items) {
        if (item.url?.replace(/\/$/, '') === url && !getActiveItem(item.children || [], url)) {
            return item
        }
        if (item.children?.length) {
            const activeChild = getActiveItem(item.children, url)
            if (activeChild) {
                return activeChild
            }
        }
    }
    return undefined
}

/**
 * Splits a flat list of items into sections. A childless item without a `url`
 * starts a new section (it's a header); everything else falls under the
 * current section. Items appearing before the first header land in an
 * untitled (`''`) section.
 */
const buildSections = (items: MenuItem[]): MenuSection[] => {
    const sections: MenuSection[] = []
    let current: MenuSection = { heading: '', items: [] }
    let started = false

    items.forEach((item) => {
        const isHeader = !item.url && !(item.children && item.children.length > 0)
        if (isHeader) {
            if (started || current.items.length > 0) sections.push(current)
            current = { heading: item.name, items: [] }
            started = true
        } else {
            current.items.push(item)
        }
    })
    if (started || current.items.length > 0) sections.push(current)

    return sections
}

const renderSectionItems = (
    sectionItems: MenuItem[],
    activeItem: MenuItem | undefined,
    onClick: (item: MenuItem) => void
) =>
    sectionItems.map((item, childIndex) => {
        const key = `${item.name}-${childIndex}-${item.url}`
        const hasChildren = item.children && item.children.length > 0
        return hasChildren ? (
            <TreeMenuItem key={key} item={item} activeItem={activeItem} index={0} onClick={onClick} />
        ) : (
            <TreeLink key={key} menuItem={item} index={0} onClick={onClick} activeItem={activeItem} />
        )
    })

export function TreeMenu(props: TreeMenuProps) {
    const { watchPath = true, variant = 'listed', appearance = 'os', rootHeading, activeUrl } = props
    const { appWindow } = useWindow()
    const { pathname } = useLocation()
    const [activeItem, setActiveItem] = useState<MenuItem | undefined>(
        props.activeItem || getActiveItem(props.items || [], activeUrl ?? pathname)
    )

    const handleClick = (item: MenuItem) => {
        setActiveItem(item)
    }

    const items = useMemo(() => props.items, [])
    const sections = useMemo(() => buildSections(items || []), [items])

    useEffect(() => {
        if (watchPath) {
            setActiveItem(getActiveItem(items || [], activeUrl ?? appWindow?.path ?? pathname))
        }
    }, [appWindow?.path, activeUrl])

    if (!items?.length) {
        return <p className="text-sm">No posts available</p>
    }

    // ProductNav-matching look for product docs navs (index + interior pages).
    if (appearance === 'sidebar') {
        return (
            <div className="not-prose flex flex-col gap-4">
                {sections.map((section, index) => {
                    const isRoot = !section.heading || (rootHeading && section.heading === rootHeading)

                    if (isRoot) {
                        return (
                            <div key={`root-${index}`} className="flex flex-col gap-px">
                                {renderSidebarItems(section.items, activeItem, handleClick)}
                            </div>
                        )
                    }

                    if (variant === 'grouped') {
                        return (
                            <CollapsibleSection
                                key={`${section.heading}-${index}`}
                                section={section}
                                activeItem={activeItem}
                                onClick={handleClick}
                                appearance="sidebar"
                            />
                        )
                    }

                    return (
                        <div key={`${section.heading}-${index}`} className="flex flex-col gap-px">
                            <SidebarSectionLabel>{section.heading}</SidebarSectionLabel>
                            {renderSidebarItems(section.items, activeItem, handleClick)}
                        </div>
                    )
                })}
            </div>
        )
    }

    // `grouped` derives collapsible sections from the flat header/link structure.
    if (variant === 'grouped') {
        return (
            <div className="not-prose space-y-px">
                {sections.map((section, index) => {
                    const isRoot = !section.heading || (rootHeading && section.heading === rootHeading)

                    // Untitled / product-name section: links render flat, no header or collapse.
                    if (isRoot) {
                        return (
                            <div key={`root-${index}`} className="space-y-px">
                                {renderSectionItems(section.items, activeItem, handleClick)}
                            </div>
                        )
                    }

                    return (
                        <CollapsibleSection
                            key={`${section.heading}-${index}`}
                            section={section}
                            activeItem={activeItem}
                            onClick={handleClick}
                        />
                    )
                })}
            </div>
        )
    }

    // `listed` (default): original flat rendering — preserves every existing consumer.
    return (
        <div className="not-prose space-y-px">
            {items.map((item, index) => {
                const key = `${item.name}-${index}-${item.url}`
                const hasChildren = item.children && item.children.length > 0
                return hasChildren ? (
                    <TreeMenuItem key={key} item={item} activeItem={activeItem} index={0} onClick={handleClick} />
                ) : (
                    <TreeLink key={key} menuItem={item} index={0} onClick={handleClick} activeItem={activeItem} />
                )
            })}
        </div>
    )
}

const sectionContainsActive = (items: MenuItem[], activeItem: MenuItem | undefined): boolean => {
    if (!activeItem) return false
    return items.some(
        (item) => item === activeItem || (item.children ? sectionContainsActive(item.children, activeItem) : false)
    )
}

function CollapsibleSection({
    section,
    activeItem,
    onClick,
    appearance = 'os',
}: {
    section: MenuSection
    activeItem: MenuItem | undefined
    onClick: (item: MenuItem) => void
    appearance?: TreeMenuAppearance
}) {
    const containsActive = sectionContainsActive(section.items, activeItem)
    const [open, setOpen] = useState(() => containsActive)

    // Depend on `containsActive` (not pathname): `activeItem` may resolve a render
    // after the path changes, so this re-opens once it actually matches.
    useEffect(() => {
        if (containsActive) setOpen(true)
    }, [containsActive])

    // When open, the whole section becomes an elevated white card (per wireframe).
    return (
        <div className={open ? 'rounded bg-white dark:bg-dark p-px shadow-lg' : ''}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                className="group flex w-full items-center justify-between gap-2 px-2 py-1 text-left text-secondary/50 hover:text-secondary transition-colors hover:transition-none"
            >
                <span data-sidebar-label className="text-sm truncate">
                    {section.heading}
                </span>
                <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className="shrink-0 text-primary"
                    data-sidebar-label
                >
                    <IconPlus className="size-4" />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col gap-px pb-px">
                            {appearance === 'sidebar'
                                ? renderSidebarItems(section.items, activeItem, onClick)
                                : renderSectionItems(section.items, activeItem, onClick)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const isOpen = (children: MenuItem[], activeItem: MenuItem | undefined): boolean => {
    if (!activeItem) return false
    return (
        children &&
        children.some((child: MenuItem) => {
            return child === activeItem || (child.children && isOpen(child.children, activeItem))
        })
    )
}

function TreeMenuItem({
    item,
    activeItem,
    index = 0,
    onClick,
}: {
    item: MenuItem
    activeItem: MenuItem | undefined
    index: number
    onClick: (item: MenuItem) => void
}) {
    const [open, setOpen] = useState(false)
    const { siteSettings } = useApp()
    const hasChildren = item.children && item.children.length > 0
    const location = useLocation()
    const pathname = replacePath(location?.pathname)

    const handleOpenChange = (open: boolean) => {
        setOpen(open)
    }

    useEffect(() => {
        if (item.children && !open && activeItem) {
            setOpen(isOpen(item.children, activeItem))
        }
    }, [pathname])

    return (
        <Collapsible.Root open={open} onOpenChange={handleOpenChange}>
            <Collapsible.Trigger asChild>
                <OSButton
                    align="left"
                    width="full"
                    className={`${index === 0 ? '' : `pl-${2 + index * 4}`} ${
                        siteSettings.heaterMode
                            ? activeItem === item
                                ? '!bg-dark/15 dark:!bg-light/15 hover:!bg-dark/15 dark:hover:!bg-light/15'
                                : 'hover:!bg-dark/10 dark:hover:!bg-light/10'
                            : activeItem === item
                            ? '!bg-accent hover:!bg-accent'
                            : 'hover:!bg-accent/50'
                    }`}
                    active={activeItem === item}
                    to={item.url || item.children?.[0]?.url}
                    asLink
                    onClick={() => onClick(item)}
                    size="md"
                    hover="background"
                >
                    {hasChildren && (
                        <motion.div animate={{ rotate: open ? 90 : 0 }} data-sidebar-label>
                            <IconChevronRight className="size-4" />
                        </motion.div>
                    )}
                    <span
                        data-sidebar-label
                        className={`inline-flex items-center gap-1.5 ${open ? 'font-semibold' : ''}`}
                    >
                        <span>{item.name}</span>
                        <Badge badge={item.badge} />
                    </span>
                </OSButton>
            </Collapsible.Trigger>

            {hasChildren && (
                <Collapsible.Content>
                    <div className="space-y-px">
                        {item.children?.map((child, childIndex) => {
                            const key = `${child.name}-${childIndex}-${child.url}`
                            const hasChildren = child.children && child.children.length > 0
                            return hasChildren ? (
                                <TreeMenuItem
                                    key={key}
                                    item={child}
                                    activeItem={activeItem}
                                    index={index + 1}
                                    onClick={onClick}
                                />
                            ) : (
                                <TreeLink
                                    key={key}
                                    menuItem={child}
                                    index={index + 1}
                                    onClick={onClick}
                                    activeItem={activeItem}
                                />
                            )
                        })}
                    </div>
                </Collapsible.Content>
            )}
        </Collapsible.Root>
    )
}
