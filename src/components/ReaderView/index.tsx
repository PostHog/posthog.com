import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OSButton from 'components/OSButton'
import {
    IconPencil,
    IconPullRequest,
    IconTextWidth,
    IconGear,
    IconClockRewind,
    IconTextWidthFixed,
    IconSidebarClose,
    IconSidebarOpen,
    IconTableOfContents,
} from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Popover } from '../RadixUI/Popover'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import Tooltip from 'components/RadixUI/Tooltip'
import Link from 'components/Link'
import { navigate } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import ElementScrollLink, { ScrollSpyProvider } from 'components/ElementScrollLink'
import { TreeMenu } from 'components/TreeMenu'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Fieldset } from 'components/OSFieldset'
import { ReaderViewProvider, useReaderView } from './context/ReaderViewContext'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import CloudinaryImage from 'components/CloudinaryImage'
import * as PostHogIcons from '@posthog/icons'
import * as OSIcons from '../OSIcons/Icons'
import { getLogo, getDarkClassForLogo } from '../../constants/logos'
import SearchProvider, { useSearch } from 'components/Editor/SearchProvider'
import { InlineSearch } from 'components/Search/InlineSearch'
import { algoliaIndexName, algoliaSearchClient } from 'lib/algoliaSearch'
import { useLocation } from '@reach/router'
import { getProseClasses, isMarkdownContentPath } from '../../constants'
import { useWindow } from '../../context/Window'
import { MenuItem, useApp } from '../../context/App'
import { useActiveFeatureFlags, filterMenuByFlags } from '../../hooks/useActiveFeatureFlags'
import { Questions } from 'components/Squeak'
import { DocsPageSurvey } from 'components/DocsPageSurvey'
import CopyMarkdownActionsDropdown, { useMarkdownUrlExists } from 'components/MarkdownActionsDropdown'
import CustomerMetadata from './CustomerMetadata'
import { getVideoClasses } from '../../constants'
import AboutPostHog from 'components/AboutPostHog'

dayjs.extend(relativeTime)

// Frosted chrome applied to the sidebar / ToC when background/tocBackground is `true`.
// The border is intentionally NOT included here — it always stays on the asides.
const FROSTED_BG = 'bg-primary/75 dark:bg-primary backdrop-blur'

const resolveBackground = (value?: boolean | string): string =>
    value === true ? FROSTED_BG : typeof value === 'string' ? value : ''

// Wrapper component that conditionally renders CopyMarkdownActionsDropdown based on whether the markdown URL exists
const ConditionalMarkdownDropdown = ({ pageUrl }: { pageUrl: string | undefined }) => {
    const isAllowedPath = pageUrl && isMarkdownContentPath(pageUrl)
    const markdownExists = useMarkdownUrlExists(isAllowedPath ? pageUrl : '')

    if (!isAllowedPath || markdownExists !== true) {
        return null
    }

    return <CopyMarkdownActionsDropdown pageUrl={pageUrl} />
}

/**
 * A swappable menu tab for the LeftSidebar. When `menuTabs` is provided to
 * ReaderView, a ToggleGroup is rendered above the menu and clicking a tab
 * swaps which `menu` is shown. Tab state is local to the sidebar — switching
 * tabs never navigates; only clicking a link inside a `menu` does.
 */
export interface MenuTab {
    label: React.ReactNode
    value: string
    menu: React.ReactNode
    /** When true, this tab is active on first render. */
    default?: boolean
    /**
     * Optional icon for this tab. Used by the LeftSidebar's collapsed-state
     * vertical icon stack so the user can recognize / switch tabs without
     * expanding the sidebar. The pinned `ToggleGroup` already renders whatever
     * `label` you pass (so embed the icon in the label JSX if you want both).
     */
    icon?: React.ReactNode
    /** If set, clicking this tab navigates to the given path instead of only switching local state. */
    href?: string
}

interface ReaderViewProps {
    body?: {
        type: 'mdx' | 'plain'
        content: string
        featuredImage?: any
        featuredImageCaption?: string
        contributors?: any[]
        date?: string
        featuredVideo?: string
        tags?: { label: string; url: string }[]
    }
    title?: string
    header?: React.ReactNode
    hideTitle?: boolean
    tableOfContents?: any
    hideMobileTableOfContents?: boolean
    mdxComponents?: any
    commits?: any[]
    filePath?: string
    children?: React.ReactNode
    leftSidebar?: React.ReactNode
    hideLeftSidebar?: boolean
    hideRightSidebar?: boolean
    contentMaxWidthClass?: string
    padding?: boolean
    proseSize?: 'sm' | 'base' | 'lg'
    rightActionButtons?: React.ReactNode
    /** Hide the sidebar's app-options (gear) button. Defaults to false. */
    hideAppOptions?: boolean
    isEditing?: boolean
    onSearch?: (query: string) => void
    showSurvey?: boolean
    parent?: MenuItem
    showQuestions?: boolean
    showAbout?: boolean
    sourceInstanceName?: string
    defaultNavVisible?: boolean
    /**
     * When true, wraps the article column with a white background, border, and rounded corners.
     * Defaults to false (transparent, no border) to match the Viewer aesthetic.
     */
    chrome?: boolean
    /**
     * When provided, the LeftSidebar renders a ToggleGroup tab strip and shows
     * the active tab's `menu` instead of `leftSidebar`/`children`. The first
     * tab marked `default: true` is selected on mount; otherwise the first tab.
     */
    menuTabs?: MenuTab[]
    /**
     * Optional element rendered at the top of the LeftSidebar (above the
     * inline search and menu). Typical use is a product switcher; see
     * `ProductSwitcher` from `components/Products/ReaderViewProduct`.
     */
    productSelect?: React.ReactNode
    hideMenu?: boolean
    /**
     * Background for the LeftSidebar panel. Defaults to transparent (no bg) so the
     * desktop wallpaper shows through. Pass `true` for the frosted default
     * (`bg-primary/75 dark:bg-primary backdrop-blur`), or a string of custom classes
     * (e.g. `"bg-accent/50"`). The border always stays regardless.
     */
    background?: boolean | string
    /**
     * Background for the FloatingTOC column. Same shape as `background`, controlled
     * separately. Defaults to transparent.
     */
    tocBackground?: boolean | string
    className?: string
}

interface BackgroundImageOption {
    label: string
    value: string
    backgroundImage: string
    backgroundPosition?: string
    backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'
    backgroundSize?: string
}

const contentWidthOptions: ToggleOption[] = [
    {
        label: 'Fixed',
        value: 'fixed',
        icon: <IconTextWidthFixed className="size-5 inline-block" />,
        default: true,
    },
    {
        label: 'Full',
        value: 'full',
        icon: <IconTextWidth className="size-5" />,
    },
]

const backgroundImageOptions: (BackgroundImageOption & ToggleOption)[] = [
    {
        label: 'None',
        value: 'none',
        backgroundImage: 'none',
        default: true,
    },
    {
        label: '2',
        value: 'james',
        icon: (
            <img
                src="https://res.cloudinary.com/dmukukwp6/image/upload/v1738943658/James_H_5cb4c53d9a.png"
                className="size-5"
            />
        ),
        backgroundImage: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1738943658/James_H_5cb4c53d9a.png',
        backgroundRepeat: 'repeat',
        backgroundSize: '10%',
    },
    {
        label: '3',
        value: 'godzilla',
        icon: (
            <img
                src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10127_b7362fd913.png"
                className="size-5"
            />
        ),
        backgroundImage: 'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10127_b7362fd913.png',
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
]

const ContributorsSmall = ({ contributors }) => {
    return contributors?.[0] ? (
        <div className="not-prose">
            <ul className="flex space-x-2">
                {contributors.map(({ profile_id, name, profile, ...other }) => {
                    const image = profile?.avatar?.url || other?.image
                    const color = profile?.color
                    const url = profile_id && `/community/profiles/${profile_id}`
                    const Container = url ? Link : 'div'
                    const gatsbyImage = image && getImage(image)
                    return (
                        <li className="!mb-0" key={name}>
                            <Container
                                className="flex space-x-2 items-center"
                                {...(url ? { to: url, state: { newWindow: true } } : {})}
                            >
                                {typeof image === 'string' ? (
                                    <CloudinaryImage
                                        width={50}
                                        className={`w-6 h-6 border border-primary rounded-full overflow-hidden bg-${
                                            color ? color : 'red'
                                        }`}
                                        src={image}
                                    />
                                ) : gatsbyImage ? (
                                    <GatsbyImage
                                        image={gatsbyImage}
                                        alt={name}
                                        className={`w-6 h-6 border border-primary rounded-full overflow-hidden bg-${
                                            color ? color : 'red'
                                        }`}
                                    />
                                ) : (
                                    ''
                                )}
                                <span className="text-sm font-semibold">{name}</span>
                            </Container>
                        </li>
                    )
                })}
            </ul>
        </div>
    ) : null
}

const EditOnGitHubButton = ({ filePath, sourceInstanceName }: { filePath?: string; sourceInstanceName?: string }) => {
    if (!filePath) {
        return null
    }

    return (
        <Tooltip
            trigger={
                <OSButton
                    asLink
                    to={`https://github.com/PostHog/${
                        sourceInstanceName === 'posthog-main-repo'
                            ? 'posthog/blob/master'
                            : 'posthog.com/blob/master/contents'
                    }/${filePath}`}
                    icon={<IconPencil />}
                    size="md"
                />
            }
            side="right"
        >
            Edit on GitHub
        </Tooltip>
    )
}

const EditHistoryPopover = ({ commits }: { commits: any[] }) => {
    if (!commits?.length || commits.length === 0) {
        return null
    }

    return (
        <Popover
            trigger={
                <span>
                    <OSButton icon={<IconClockRewind />} size="md" />
                </span>
            }
            title="Edit history"
            dataScheme="secondary"
            contentClassName="w-[260px]"
        >
            <ul className="list-none m-0 p-0 space-y-2 max-h-[200px] overflow-y-auto">
                {commits
                    .filter((commit) => !!commit.author)
                    .map((commit) => (
                        <li key={commit.url} className="flex gap-2 justify-between items-center">
                            <Link to={commit.author.html_url} className="flex items-center gap-2" externalNoIcon>
                                <div>
                                    <div className="size-7 bg-accent rounded-full relative">
                                        <img
                                            src={commit.author.avatar_url}
                                            alt={commit.author.login}
                                            className="size-full rounded-full object-cover"
                                        />
                                    </div>
                                </div>
                                <p className="text-sm m-0">{commit.author.login}</p>
                            </Link>
                            <div className="flex items-center gap-2">
                                <p className="text-xs opacity-60 m-0">{dayjs(commit.date).fromNow()}</p>
                                <Link to={commit.url} externalNoIcon>
                                    <IconPullRequest className="size-4" />
                                </Link>
                            </div>
                        </li>
                    ))}
            </ul>
        </Popover>
    )
}

const AppOptionsButton = ({ isMdx }: { isMdx: boolean }) => {
    const { fullWidthContent, setFullWidthContent, setBackgroundImage, backgroundImage } = useReaderView()

    const selectedOption =
        backgroundImageOptions.find((option) => option.value === backgroundImage) || backgroundImageOptions[0]

    const handleContentWidthChange = (value: string) => {
        const isFullWidth = value === 'full'
        setFullWidthContent(isFullWidth)
        localStorage.setItem('full-width-content', isFullWidth.toString())
    }

    return (
        <Popover
            title="Options"
            dataScheme="secondary"
            trigger={
                <span>
                    <OSButton icon={<IconGear />} size="md" />
                </span>
            }
            contentClassName="w-80"
        >
            <div className="w-full h-full bg-primary text-primary space-y-2">
                {isMdx && (
                    <Fieldset legend="Paragraphs">
                        <div className="grid grid-cols-2 gap-2">
                            <ToggleGroup
                                title="Content width"
                                options={contentWidthOptions}
                                value={fullWidthContent ? 'full' : 'fixed'}
                                onValueChange={handleContentWidthChange}
                            />
                        </div>
                    </Fieldset>
                )}

                <Fieldset legend="Why not?">
                    <div className="grid grid-cols-2 gap-2">
                        <ToggleGroup
                            title="Background image"
                            options={backgroundImageOptions}
                            value={selectedOption.value}
                            onValueChange={(value) => {
                                setBackgroundImage(value === 'none' ? null : value)
                            }}
                        />
                    </div>
                </Fieldset>

                <p className="text-[13px]">
                    Toggle light/dark mode in{' '}
                    <span className="inline-flex items-center gap-0.5">
                        <Link to="/display-options" state={{ newWindow: true }} className="font-semibold underline">
                            desktop settings
                        </Link>
                    </span>
                </p>
            </div>
        </Popover>
    )
}

interface TableOfContentsProps {
    tableOfContents: any[]
    contentRef: React.RefObject<HTMLDivElement>
    title?: string
    className?: string
}

const TableOfContents = ({ tableOfContents, contentRef, title = 'Jump to:', className = '' }: TableOfContentsProps) => {
    if (!tableOfContents || tableOfContents.length === 0) {
        return null
    }

    return (
        <ScrollSpyProvider>
            <div className={`not-prose ${className}`}>
                {title && <h4 className="font-semibold text-muted m-0 mb-1 text-sm">{title}</h4>}
                <ul className="list-none m-0 p-0 flex flex-col">
                    {tableOfContents.map((navItem) => {
                        return (
                            <li className="relative leading-none m-0" key={navItem.url}>
                                <ElementScrollLink
                                    id={navItem.url}
                                    label={navItem.value}
                                    className="hover:underline"
                                    element={contentRef}
                                    style={{
                                        paddingLeft: `${navItem.depth || 0}rem`,
                                    }}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </ScrollSpyProvider>
    )
}

export default function ReaderView({
    body = {} as ReaderViewProps['body'],
    title,
    header,
    hideTitle = false,
    tableOfContents,
    hideMobileTableOfContents = false,
    mdxComponents,
    commits,
    filePath,
    children,
    leftSidebar,
    hideLeftSidebar = false,
    hideRightSidebar = false,
    contentMaxWidthClass,
    padding = true,
    proseSize = 'sm',
    rightActionButtons,
    hideAppOptions = false,
    isEditing,
    onSearch,
    showSurvey = false,
    parent,
    showQuestions = true,
    showAbout = false,
    sourceInstanceName,
    defaultNavVisible,
    chrome = false,
    menuTabs,
    productSelect,
    hideMenu = false,
    background = false,
    tocBackground = false,
    className = '',
}: ReaderViewProps) {
    return (
        <ReaderViewProvider defaultNavVisible={defaultNavVisible}>
            <ReaderViewContent
                body={body}
                title={title}
                header={header}
                hideTitle={hideTitle}
                tableOfContents={tableOfContents}
                hideMobileTableOfContents={hideMobileTableOfContents}
                mdxComponents={mdxComponents}
                commits={commits}
                filePath={filePath}
                leftSidebar={leftSidebar}
                hideLeftSidebar={hideLeftSidebar}
                hideRightSidebar={hideRightSidebar}
                contentMaxWidthClass={contentMaxWidthClass}
                padding={padding}
                proseSize={proseSize}
                rightActionButtons={rightActionButtons}
                hideAppOptions={hideAppOptions}
                isEditing={isEditing}
                onSearch={onSearch}
                showSurvey={showSurvey}
                parent={parent}
                showQuestions={showQuestions}
                showAbout={showAbout}
                sourceInstanceName={sourceInstanceName}
                chrome={chrome}
                menuTabs={menuTabs}
                productSelect={productSelect}
                hideMenu={hideMenu}
                background={background}
                tocBackground={tocBackground}
                className={className}
            >
                {children}
            </ReaderViewContent>
        </ReaderViewProvider>
    )
}

const sortAlpha = (items: MenuItem[]): MenuItem[] =>
    [...items].sort((a, b) => (a.name === 'Overview' ? -1 : b.name === 'Overview' ? 1 : a.name.localeCompare(b.name)))

const resolveMenuIcons = (items: MenuItem[] | undefined, resolveIcons = false): MenuItem[] | undefined => {
    return items?.map((item) => {
        let icon = item.icon
        if (resolveIcons) {
            if (item.platformLogo) {
                const url = getLogo(item.platformLogo)
                if (url) icon = <img src={url} className={`size-full ${getDarkClassForLogo(url)}`} />
            } else if (typeof icon === 'string') {
                const IconComponent = (PostHogIcons as any)[icon] || (OSIcons as any)[icon]
                if (IconComponent) icon = <IconComponent className="size-full" />
            }
        }
        const shouldShowChildrenIcons = item.showChildrenIcons || resolveIcons
        const children = item.sortChildrenAlpha && item.children ? sortAlpha(item.children) : item.children
        return {
            ...item,
            ...(resolveIcons ? { icon } : {}),
            children: children ? resolveMenuIcons(children, shouldShowChildrenIcons) : undefined,
        }
    })
}

const Menu = (props: { parent: MenuItem }) => {
    const { activeInternalMenu: windowActiveInternalMenu, parent: windowParent } = useWindow()
    const activeFlags = useActiveFeatureFlags()

    const parent = props.parent || windowParent

    if (!parent) return null

    // Hide any flag-gated products/pages the current user can't see.
    const visibleChildren = filterMenuByFlags(parent.children, activeFlags)
    const activeInternalMenu = windowActiveInternalMenu || visibleChildren?.[0]
    const visibleActiveChildren = filterMenuByFlags(activeInternalMenu?.children, activeFlags)

    return <TreeMenu key={activeInternalMenu?.url} items={resolveMenuIcons(visibleActiveChildren)} />
}

/**
 * Always-visible inline search input rendered in the LeftSidebar. Uses mark.js
 * to highlight matches directly in the article content. When the query is
 * cleared or the component unmounts, highlights are removed.
 */

interface OnPageMatch {
    id: string
    snippet: string
    heading: string | null
    element: HTMLElement
}

const extractOnPageMatches = (contentEl: HTMLElement, query: string): OnPageMatch[] => {
    if (!query || query.length < 2) return []

    const matches: OnPageMatch[] = []
    const lowerQuery = query.toLowerCase()
    const headings = Array.from(contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    const blocks = contentEl.querySelectorAll('p, li, td, th, dt, dd, pre, h1, h2, h3, h4, h5, h6')

    let matchId = 0

    blocks.forEach((block) => {
        const text = block.textContent || ''
        const lowerText = text.toLowerCase()
        if (!lowerText.includes(lowerQuery)) return

        const idx = lowerText.indexOf(lowerQuery)
        const contextRadius = 60
        const start = Math.max(0, idx - contextRadius)
        const end = Math.min(text.length, idx + query.length + contextRadius)
        let snippet = text.slice(start, end).trim()
        if (start > 0) snippet = '...' + snippet
        if (end < text.length) snippet = snippet + '...'

        const isHeading = /^H[1-6]$/.test(block.tagName)
        let heading: string | null = null
        if (!isHeading) {
            for (let j = headings.length - 1; j >= 0; j--) {
                const pos = block.compareDocumentPosition(headings[j])
                if (pos & Node.DOCUMENT_POSITION_PRECEDING) {
                    heading = headings[j].textContent?.trim() || null
                    break
                }
            }
        }

        matches.push({
            id: `m${matchId++}`,
            snippet,
            heading: isHeading ? text.trim() : heading,
            element: block as HTMLElement,
        })
    })

    return matches
}

const HighlightedSnippet = ({ text, query }: { text: string; query: string }) => {
    const lowerText = text.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const parts: React.ReactNode[] = []

    let lastIdx = 0
    let idx = lowerText.indexOf(lowerQuery)
    let key = 0

    while (idx !== -1) {
        if (idx > lastIdx) {
            parts.push(
                <span key={key++} className="text-secondary">
                    {text.slice(lastIdx, idx)}
                </span>
            )
        }
        parts.push(
            <mark key={key++} className="bg-yellow/40 dark:bg-yellow/30 text-primary rounded-sm px-0.5 font-medium">
                {text.slice(idx, idx + query.length)}
            </mark>
        )
        lastIdx = idx + query.length
        idx = lowerText.indexOf(lowerQuery, lastIdx)
    }

    if (lastIdx < text.length) {
        parts.push(
            <span key={key++} className="text-secondary">
                {text.slice(lastIdx)}
            </span>
        )
    }

    return <span className="text-xs leading-relaxed">{parts}</span>
}

const SidebarSearchResults = ({
    contentRef,
    currentPath,
    onResultClick,
}: {
    contentRef?: React.RefObject<HTMLElement>
    currentPath?: string
    onResultClick?: () => void
}) => {
    const { searchQuery } = useSearch()
    const [onPageMatches, setOnPageMatches] = useState<OnPageMatch[]>([])
    const [algoliaHits, setAlgoliaHits] = useState<any[]>([])
    const [algoliaLoading, setAlgoliaLoading] = useState(false)

    useEffect(() => {
        if (!searchQuery || searchQuery.length < 2 || !contentRef?.current) {
            setOnPageMatches([])
            return
        }
        const matches = extractOnPageMatches(contentRef.current, searchQuery)
        setOnPageMatches(matches.slice(0, 20))
    }, [searchQuery])

    useEffect(() => {
        if (!searchQuery || searchQuery.length < 2) {
            setAlgoliaHits([])
            setAlgoliaLoading(false)
            return
        }

        let cancelled = false
        setAlgoliaLoading(true)

        const doSearch = async () => {
            try {
                const index = algoliaSearchClient.initIndex(algoliaIndexName)
                const { hits } = await index.search(searchQuery, { hitsPerPage: 8 })
                if (!cancelled) {
                    const filtered = currentPath
                        ? hits.filter((h: any) => {
                              const slug = h.fields?.slug || `/${h.slug}`
                              return slug !== currentPath
                          })
                        : hits
                    setAlgoliaHits(filtered)
                    setAlgoliaLoading(false)
                }
            } catch {
                if (!cancelled) setAlgoliaLoading(false)
            }
        }

        doSearch()
        return () => {
            cancelled = true
        }
    }, [searchQuery, currentPath])

    const scrollToMatch = (element: HTMLElement) => {
        const scrollEl = contentRef?.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement
        if (!scrollEl) return

        const scrollRect = scrollEl.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        const targetTop = elementRect.top - scrollRect.top + scrollEl.scrollTop - 100

        scrollEl.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })

        element.classList.add('search-scroll-target')
        setTimeout(() => element.classList.remove('search-scroll-target'), 2000)
    }

    if (!searchQuery || searchQuery.length < 2) return null

    const groupedByHeading: Record<string, OnPageMatch[]> = {}
    onPageMatches.forEach((match) => {
        const key = match.heading || ''
        if (!groupedByHeading[key]) groupedByHeading[key] = []
        groupedByHeading[key].push(match)
    })

    return (
        <div className="text-sm space-y-3 pt-2" data-sidebar-label>
            {onPageMatches.length > 0 && (
                <div>
                    <h4 className="text-[11px] font-semibold text-muted uppercase tracking-wide m-0 mb-1 px-1">
                        On this page
                        <span className="ml-1.5 text-muted/60 font-normal normal-case tracking-normal">
                            {onPageMatches.length} {onPageMatches.length === 1 ? 'match' : 'matches'}
                        </span>
                    </h4>
                    <ul className="list-none m-0 p-0">
                        {Object.entries(groupedByHeading).map(([heading, matches]) => (
                            <li key={heading} className="mb-1">
                                {heading && (
                                    <span className="block text-[11px] font-medium text-muted px-2 pt-1 truncate">
                                        {heading}
                                    </span>
                                )}
                                <ul className="list-none m-0 p-0">
                                    {matches.map((match) => (
                                        <li key={match.id}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    scrollToMatch(match.element)
                                                    onResultClick?.()
                                                }}
                                                className="w-full text-left px-2 py-1 rounded hover:bg-accent transition-colors cursor-pointer"
                                            >
                                                <HighlightedSnippet text={match.snippet} query={searchQuery} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {onPageMatches.length === 0 && (
                <div>
                    <h4 className="text-[11px] font-semibold text-muted uppercase tracking-wide m-0 mb-1 px-1">
                        On this page
                    </h4>
                    <p className="px-2 py-1 text-xs text-muted m-0">No matches</p>
                </div>
            )}

            <div className="border-t border-secondary pt-2">
                <h4 className="text-[11px] font-semibold text-muted uppercase tracking-wide m-0 mb-1 px-1">
                    Other pages
                </h4>
                {algoliaLoading ? (
                    <div className="px-2 py-3 space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="space-y-1">
                                <div className="h-3.5 bg-accent rounded animate-pulse w-3/4" />
                                <div className="h-3 bg-accent rounded animate-pulse w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : algoliaHits.length > 0 ? (
                    <ul className="list-none m-0 p-0">
                        {algoliaHits.map((hit: any) => (
                            <li key={hit.objectID}>
                                <Link
                                    to={hit.fields?.slug || `/${hit.slug}`}
                                    state={{ newWindow: true }}
                                    onClick={() => onResultClick?.()}
                                    className="block px-2 py-1.5 rounded hover:bg-accent transition-colors group"
                                >
                                    <span className="block text-[13px] font-medium text-primary truncate">
                                        {hit.title}
                                    </span>
                                    <span className="block text-[11px] text-muted truncate">
                                        posthog.com{hit.fields?.slug || `/${hit.slug}`}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="px-2 py-1 text-xs text-muted m-0">No results</p>
                )}
            </div>
        </div>
    )
}

interface LeftSidebarProps {
    isNavVisible: boolean
    toggleNav: () => void
    isEditing?: boolean
    filePath?: string
    sourceInstanceName?: string
    commits?: any[]
    pageUrl: string | undefined
    rightActionButtons?: React.ReactNode
    hideAppOptions?: boolean
    productSelect?: React.ReactNode
    inlineSearch?: React.ReactNode
    menuTabs?: MenuTab[]
    children: React.ReactNode
    contentRef?: React.RefObject<HTMLElement>
    currentPath?: string
    isMdx?: boolean
    background?: boolean | string
    /** On narrow windows the sidebar renders as an off-canvas drawer instead
     *  of an inline column, driven by the props below. */
    mobile?: boolean
    mobileOpen?: boolean
    onMobileClose?: () => void
}

const SIDEBAR_CSS_TRANSITION = 'width 300ms cubic-bezier(0.32, 0.72, 0, 1)'

/**
 * Tracks whether the LeftSidebar is currently expanded (pinned, hovered, or
 * search-focused). Slotted components like `ProductSwitcher` consume this so
 * they can render a compact, icon-only variant when collapsed and the full
 * widget when expanded — without the call sites having to pass two props.
 *
 * Outside the sidebar there's no Provider, so the default `true` keeps
 * everything rendering normally.
 */
export const SidebarExpandedContext = React.createContext<boolean>(true)
export const useSidebarExpanded = (): boolean => React.useContext(SidebarExpandedContext)

interface SidebarTabButtonProps {
    tab: MenuTab
    active: boolean
    showLabel: boolean
    /** Pinned mode renders the tab with icon stacked above label (horizontal row). */
    stacked: boolean
    onClick: () => void
}

const SidebarTabButton = ({ tab, active, showLabel, stacked, onClick }: SidebarTabButtonProps) => {
    const { siteSettings } = useApp()
    // Manual FLIP for the icon: capture position on every commit, then on the
    // next commit — IF the structural layout changed (`layoutKey`) — animate
    // the icon from its old position to its new one. Click-only re-renders
    // don't change `layoutKey`, so they never trigger an animation (which is
    // the bug we keep hitting with framer's `motion.span layout="position"`,
    // since v4 measures on every render and any sub-pixel delta animates).
    const iconRef = useRef<HTMLSpanElement>(null)
    const prevPosRef = useRef<DOMRect | null>(null)
    const layoutKey = `${stacked ? 1 : 0}-${showLabel ? 1 : 0}`
    const prevKeyRef = useRef(layoutKey)

    useLayoutEffect(() => {
        const el = iconRef.current
        if (!el) return
        const curr = el.getBoundingClientRect()
        if (prevPosRef.current && prevKeyRef.current !== layoutKey) {
            const dx = prevPosRef.current.left - curr.left
            const dy = prevPosRef.current.top - curr.top
            if ((dx || dy) && typeof el.animate === 'function') {
                el.getAnimations?.().forEach((a) => a.cancel())
                el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }], {
                    duration: 320,
                    easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
                })
            }
        }
        prevPosRef.current = curr
        prevKeyRef.current = layoutKey
    })

    // The active highlight just fades in/out on the active button. Position
    // follows the button via CSS (`inset-0`), so when the layout reflows
    // (hover/pin), the highlight stays glued to its button instead of trying
    // to animate from a stale position.
    const button = (
        <button
            type="button"
            onClick={onClick}
            role="tab"
            aria-selected={active}
            className={`relative rounded text-sm leading-tight flex ${
                stacked
                    ? 'flex-1 flex-col items-center text-center gap-1 px-2 py-1.5'
                    : // Icon-only AND with-label both use justify-start so
                      // the icon stays at button x=8 regardless of button
                      // width. `justify-center` tied icon x to width and
                      // made the icon jut as the wrapper shrank during a
                      // hover→collapse transition.
                      `min-h-7 items-center justify-start ${showLabel ? 'gap-2' : ''} px-2 py-1`
            } ${
                active
                    ? 'text-primary'
                    : `text-secondary hover:text-primary ${
                          siteSettings.heaterMode ? 'hover:bg-dark/10 dark:hover:bg-light/10' : 'hover:bg-accent/50'
                      }`
            }`}
        >
            <AnimatePresence initial={false}>
                {active && (
                    <motion.span
                        key="indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className={`absolute inset-0 -z-10 rounded ${
                            siteSettings.heaterMode ? 'bg-dark/15 dark:bg-light/15' : 'bg-accent'
                        }`}
                    />
                )}
            </AnimatePresence>
            <span ref={iconRef} className="inline-flex items-center justify-center shrink-0">
                {tab.icon}
            </span>
            <AnimatePresence initial={false}>
                {showLabel && (
                    <motion.span
                        key="label"
                        initial={stacked ? { opacity: 0 } : { opacity: 0, width: 0 }}
                        animate={stacked ? { opacity: 1 } : { opacity: 1, width: 'auto' }}
                        exit={stacked ? { opacity: 0 } : { opacity: 0, width: 0 }}
                        transition={{ duration: 0.18 }}
                        className={stacked ? '' : 'overflow-hidden whitespace-nowrap'}
                    >
                        {tab.label}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    )

    return showLabel ? (
        button
    ) : (
        <Tooltip side="right" trigger={button}>
            {tab.label}
        </Tooltip>
    )
}

/**
 * Module-level so the sidebar scroll position survives `ReaderView` remounting
 * on every in-window navigation. Keyed by product/section so the nav feels like
 * switching tabs instead of reloading from the top on each page.
 */
const SIDEBAR_SCROLL_MEMORY = new Map<string, number>()

const sidebarScrollKeyFromPath = (path?: string): string => {
    if (!path) return 'default'
    const segs = path.split(/[?#]/)[0].split('/').filter(Boolean)
    if (segs[0] === 'docs') return `docs:${segs[1] ?? ''}`
    return segs[0] ?? 'root'
}

const LeftSidebar = ({
    isNavVisible,
    toggleNav,
    isEditing,
    filePath,
    sourceInstanceName,
    commits,
    pageUrl,
    rightActionButtons,
    hideAppOptions = false,
    productSelect,
    inlineSearch,
    menuTabs,
    children,
    contentRef,
    currentPath,
    isMdx = false,
    background = false,
    mobile = false,
    mobileOpen = false,
    onMobileClose,
}: LeftSidebarProps) => {
    const { searchQuery } = useSearch()
    const { hasMounted } = useReaderView()
    const hasActiveSearch = !!searchQuery && searchQuery.length >= 2

    // Persist/restore the menu scroll position across navigations (ReaderView
    // remounts each page). Keyed by product/section so unrelated sections start fresh.
    const menuViewportRef = useRef<HTMLDivElement>(null)
    const sidebarScrollKey = sidebarScrollKeyFromPath(currentPath)
    useLayoutEffect(() => {
        const vp = menuViewportRef.current
        if (!vp) return
        const saved = SIDEBAR_SCROLL_MEMORY.get(sidebarScrollKey)
        if (saved != null) vp.scrollTop = saved
        const onScroll = () => SIDEBAR_SCROLL_MEMORY.set(sidebarScrollKey, vp.scrollTop)
        vp.addEventListener('scroll', onScroll, { passive: true })
        return () => vp.removeEventListener('scroll', onScroll)
    }, [sidebarScrollKey])
    const hasTabs = !!menuTabs && menuTabs.length > 0
    const initialTab = hasTabs ? menuTabs!.find((t) => t.default)?.value || menuTabs![0].value : ''
    const [activeTab, setActiveTab] = useState(initialTab)
    const activeMenu = hasTabs ? menuTabs!.find((t) => t.value === activeTab)?.menu : null

    // `isPinned` is the persisted user preference (toggled via the bottom-row
    // toggle button, written to localStorage in ReaderViewContext). When NOT
    // pinned the inner panel collapses to 48px and only expands as an overlay
    // when the user hovers it OR clicks the search icon (`searchFocused`).
    // We track hover in JS (rather than CSS group-hover) so the CSS width
    // transitions and icon-row → icon-column layout flip share the same boolean.
    const isPinned = isNavVisible
    const [searchFocused, setSearchFocused] = useState(false)
    const [hovered, setHovered] = useState(false)
    // On mobile the panel is a drawer: it's fully expanded whenever open and
    // fully hidden otherwise, so pin/hover state is bypassed entirely.
    const expanded = mobile ? mobileOpen : isPinned || searchFocused || hovered

    // `displayExpanded` mirrors `expanded` instantly when growing, but only
    // flips to false AFTER the panel's shrink transition finishes (driven by
    // `onTransitionEnd` below). Things that should appear on expand but only
    // disappear once the wrapper is fully collapsed — the product switcher
    // swap, the menu's label-hide rule — read this instead of `expanded`.
    // Wrapper widths still use `expanded` so they transition with the
    // hover/blur immediately.
    const [displayExpanded, setDisplayExpanded] = useState(expanded)
    useEffect(() => {
        if (expanded) setDisplayExpanded(true)
    }, [expanded])

    // The tab strip wrapper transitions its width 32 ↔ 234 in lockstep
    // with the panel. If the user pins WHILE that transition is mid-flight
    // (e.g. they hover then immediately click pin), the tab strip's flex
    // layout would flip from column to row before the wrapper has reached
    // 234 — the FLIP measurement in SidebarTabButton would capture
    // mid-transition positions, so the icons appear to snap rather than
    // glide to their final spots.
    //
    // `appliedPinned` defers the visual stacked switch until the wrapper
    // settles. `tabsAnimating` is set true whenever the width target
    // changes (a new transition will run) and back to false on the
    // wrapper's `onTransitionEnd`. While animating, pin/unpin updates are
    // queued and applied only when the wrapper is settled.
    const tabsWidthTarget = isPinned || expanded ? 234 : 32
    const tabsWidthTargetRef = useRef(tabsWidthTarget)
    const [tabsAnimating, setTabsAnimating] = useState(false)
    useEffect(() => {
        if (tabsWidthTarget !== tabsWidthTargetRef.current) {
            tabsWidthTargetRef.current = tabsWidthTarget
            setTabsAnimating(true)
        }
    }, [tabsWidthTarget])

    // Going TO pinned (false → true) is deferred so the FLIP captures
    // stable positions; going FROM pinned (true → false) is applied
    // immediately so the tab strip reflows out of `flex-row` BEFORE the
    // wrapper shrinks (otherwise the icons get squished while waiting).
    const [appliedPinned, setAppliedPinned] = useState(isPinned)
    useEffect(() => {
        if (!isPinned) {
            setAppliedPinned(false)
            return
        }
        if (!tabsAnimating) setAppliedPinned(true)
    }, [isPinned, tabsAnimating])

    const handleSearchFocus = () => setSearchFocused(true)

    const handleSearchBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setSearchFocused(false)
        }
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') setSearchFocused(false)
    }

    const handleMouseEnter = () => {
        if (!isPinned && !mobile) setHovered(true)
    }
    const handleMouseLeave = () => {
        setHovered(false)
    }

    // Wrap toggleNav so unpin clears `appliedPinned` in the SAME render batch
    // as the toggle. Without this, React commits one intermediate render with
    // `isPinned=false` but `appliedPinned=true` (the `useEffect` that flips
    // `appliedPinned` runs in a later cycle) — that frame shows the tab strip
    // stuck in `flex-row` while the wrapper has already started shrinking,
    // squishing the buttons before the layout finally flips.
    const handleToggleNav = () => {
        if (isPinned) setAppliedPinned(false)
        toggleNav()
    }

    return (
        <aside
            data-scheme="secondary"
            className={`relative flex-shrink-0 ${hasMounted && !mobile ? 'transition-[flex-basis] duration-300' : ''} ${
                mobile ? 'basis-0' : isPinned ? 'basis-[250px]' : 'basis-12'
            }`}
        >
            <div
                onTransitionEnd={(e) => {
                    if (e.propertyName === 'width' && e.target === e.currentTarget && !expanded) {
                        setDisplayExpanded(false)
                    }
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-scheme="secondary"
                style={{
                    width: mobile ? 250 : expanded ? 250 : 48,
                    transform: mobile && !mobileOpen ? 'translateX(-110%)' : undefined,
                    transition: hasMounted
                        ? mobile
                            ? 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)'
                            : SIDEBAR_CSS_TRANSITION
                        : 'none',
                }}
                className={`absolute inset-y-0 left-0 flex flex-col min-h-0 overflow-hidden border-r border-primary will-change-[transform,backdrop-filter] transform-gpu ${
                    // On mobile the panel is always an overlay drawer above the
                    // content; it just slides off-screen when closed.
                    mobile
                        ? `z-50 shadow-2xl ${resolveBackground(background) || FROSTED_BG} ${
                              mobileOpen ? '' : 'pointer-events-none'
                          }`
                        : // When collapsed and hover-expanded, the panel floats as an
                        // overlay above the content — it always needs an opaque
                        // background so the menu is readable, even when the caller
                        // didn't pass one. Otherwise fall back to the caller's value.
                        !isPinned && expanded
                        ? `z-50 shadow-2xl ${resolveBackground(background) || FROSTED_BG}`
                        : `z-30 ${resolveBackground(background)}`
                }`}
            >
                {/* Middle content — always rendered so the bottom row stays
                    anchored. The single fade rule on this container reaches
                    every `[data-sidebar-label]` descendant — product name,
                    menu items, anything else — so they all fade in lockstep
                    when the user mouses out, keeping the disappearance
                    smooth instead of an abrupt cut. */}
                <SidebarExpandedContext.Provider value={displayExpanded}>
                    <div
                        className={`flex-1 min-h-0 flex flex-col w-[250px] pt-2 [&_[data-sidebar-label]]:transition-opacity [&_[data-sidebar-label]]:duration-200 ${
                            expanded
                                ? ''
                                : '[&_[data-sidebar-label]]:opacity-0 [&_a]:!bg-transparent [&_button]:!bg-transparent [&_a]:!border-transparent [&_button]:!border-transparent'
                        }`}
                    >
                        {/* Product slot: width-animates 32 ↔ 234 like the search
                        and tab strip. When collapsed, ProductSwitcher renders
                        a centered icon that lands at panel center; on
                        hover/pin it swaps in the full searchable dropdown.
                        Two scoped fade rules cover the OSSelect chrome that
                        isn't a `data-sidebar-label`:
                        - the chevron (`button > svg:last-child`)
                        - the product name span (the second span inside the
                          trigger's content wrapper — see OSSelect markup)
                        Both fade in lockstep with the menu labels so the
                        whole expanded view dissolves smoothly. */}
                        {productSelect && (
                            <div
                                style={{
                                    width: expanded ? 234 : 32,
                                    transition: hasMounted ? SIDEBAR_CSS_TRANSITION : 'none',
                                }}
                                className={`mx-2 pb-2 flex-shrink-0 [&_button>svg:last-child]:transition-opacity [&_button>svg:last-child]:duration-200 [&_button>span>span>span:nth-child(2)]:transition-opacity [&_button>span>span>span:nth-child(2)]:duration-200 ${
                                    expanded
                                        ? ''
                                        : '[&_button>svg:last-child]:opacity-0 [&_button>span>span>span:nth-child(2)]:opacity-0'
                                }`}
                            >
                                {productSelect}
                            </div>
                        )}

                        {/* Inline search: always rendered with the magnifying-glass
                        icon inside the input itself. The wrapper width animates
                        in lockstep with the panel (32 ↔ 234) so when collapsed
                        only the icon is visible — no row appears/disappears,
                        keeping the vertical layout perfectly stable. Focusing
                        the input triggers `searchFocused` to expand the panel. */}
                        {!isEditing && inlineSearch && (
                            <div
                                className="mx-2 mb-2 flex-shrink-0"
                                onFocus={handleSearchFocus}
                                onBlur={handleSearchBlur}
                                onKeyDown={handleSearchKeyDown}
                            >
                                <div
                                    style={{
                                        width: expanded ? 234 : 32,
                                        transition: hasMounted ? SIDEBAR_CSS_TRANSITION : 'none',
                                    }}
                                    className={`overflow-hidden [&_input]:transition-colors [&_input]:duration-200 ${
                                        expanded ? '' : '[&_input]:!bg-transparent [&_input]:!border-transparent'
                                    }`}
                                >
                                    {inlineSearch}
                                </div>
                            </div>
                        )}

                        {/* Tab strip:
                        - Pinned: horizontal row, each tab icon-stacked-above-label.
                        - Otherwise (collapsed OR hover-expanded): vertical
                          icon-only column. We deliberately don't reflow on
                          hover — tabs only rotate axes when the user pins. */}
                        {hasTabs && !hasActiveSearch && (
                            // Single container across all states (pinned, hover,
                            // collapsed) so SidebarTabButton instances stay
                            // mounted — required for the icon FLIP animation to
                            // know each icon's previous position when the layout
                            // flips between row/column.
                            // Width animates in lockstep with the panel so the
                            // border-y always stays inside the visible area
                            // rather than overflowing the 250px content box.
                            <div
                                style={{
                                    width: tabsWidthTarget,
                                    transition: hasMounted ? SIDEBAR_CSS_TRANSITION : 'none',
                                }}
                                onTransitionEnd={(e) => {
                                    if (e.propertyName === 'width' && e.target === e.currentTarget) {
                                        setTabsAnimating(false)
                                        setAppliedPinned(isPinned)
                                    }
                                }}
                                className={`mx-2 flex gap-px flex-shrink-0 ${
                                    appliedPinned ? 'flex-row' : 'flex-col items-stretch py-2 border-y border-secondary'
                                }`}
                                role="tablist"
                                aria-label="Sidebar mode"
                            >
                                {menuTabs!.map((t) => (
                                    <SidebarTabButton
                                        key={t.value}
                                        tab={t}
                                        active={t.value === activeTab}
                                        showLabel={expanded}
                                        stacked={appliedPinned}
                                        onClick={() => {
                                            if (t.href && t.value !== activeTab) {
                                                navigate(t.href)
                                            } else {
                                                setActiveTab(t.value)
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="flex-1 min-h-0 flex flex-col">
                            <ScrollArea
                                className="px-2 [mask-image:linear-gradient(to_bottom,transparent_0,black_0.75rem)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_0.75rem)]"
                                viewportClasses="pt-3"
                                viewportRef={menuViewportRef}
                            >
                                {hasActiveSearch ? (
                                    <SidebarSearchResults contentRef={contentRef} currentPath={currentPath} />
                                ) : hasTabs ? (
                                    activeMenu
                                ) : (
                                    children
                                )}
                            </ScrollArea>
                        </div>
                    </div>
                </SidebarExpandedContext.Provider>

                {/* Bottom action row: single flex-row layout in every
                    state. The pin button is pushed to panel x=24 via
                    `pl-2.5` so its icon center aligns with every other
                    icon-only element when collapsed AND stays put when the
                    sidebar expands. Edit/gear ride along on the right via
                    `ml-auto` and only mount once `displayExpanded` is true,
                    so they appear/disappear cleanly without nudging the
                    pin. */}
                <div className="flex-shrink-0 border-t border-primary py-1 pl-2.5 pr-1 flex items-center">
                    <Tooltip
                        trigger={
                            <OSButton
                                size="md"
                                onClick={mobile ? onMobileClose : handleToggleNav}
                                active={!mobile && isPinned}
                                icon={
                                    mobile ? <IconSidebarOpen /> : isPinned ? <IconSidebarOpen /> : <IconSidebarClose />
                                }
                            />
                        }
                        side="right"
                    >
                        {mobile ? 'Close' : isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
                    </Tooltip>
                    {displayExpanded && (
                        <div className="ml-auto flex items-center gap-px">
                            <ConditionalMarkdownDropdown pageUrl={pageUrl} />
                            <EditHistoryPopover commits={commits || []} />
                            <EditOnGitHubButton filePath={filePath} sourceInstanceName={sourceInstanceName} />
                            {!hideAppOptions && <AppOptionsButton isMdx={isMdx} />}
                            {rightActionButtons}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}

interface FloatingTOCProps {
    isTocVisible: boolean
    toggleToc: () => void
    tableOfContents: any
    contentRef: React.RefObject<HTMLDivElement>
    background?: boolean | string
}

/**
 * Lives INSIDE the article column's ScrollArea so it shares the article's scrolling
 * context. `position: sticky` keeps it pinned to the top of the visible viewport as
 * the article scrolls beneath it. `maxHeight` is set to the live height of the
 * scroll viewport so the TOC never extends past the visible area; an inner
 * ScrollArea handles overflow within that height.
 */
const FloatingTOC = ({
    isTocVisible,
    toggleToc,
    tableOfContents,
    contentRef,
    background = false,
}: FloatingTOCProps) => {
    const { hasMounted } = useReaderView()
    return (
        <aside
            data-scheme="secondary"
            className={`flex-shrink-0 hidden @4xl/app-reader:flex flex-col border-l border-primary ${
                hasMounted ? 'transition-[width] duration-300' : ''
            } overflow-hidden ${resolveBackground(background)} ${isTocVisible ? 'w-[250px]' : 'w-12'} `}
        >
            <div className="flex-1 min-h-0 flex flex-col w-[250px]">
                {isTocVisible && (
                    <ScrollArea className="px-2 pb-2 pt-8 flex-1 min-h-0">
                        <TableOfContents tableOfContents={tableOfContents} contentRef={contentRef} />
                    </ScrollArea>
                )}
            </div>
            <div className="flex-shrink-0 border-t border-primary py-1 px-2.5 flex items-center">
                <Tooltip
                    trigger={
                        <OSButton size="md" icon={<IconTableOfContents />} active={isTocVisible} onClick={toggleToc} />
                    }
                    side="left"
                >
                    {isTocVisible ? 'Hide' : 'Show'} table of contents
                </Tooltip>
            </div>
        </aside>
    )
}

function ReaderViewContent({
    body,
    title,
    header,
    hideTitle = false,
    tableOfContents,
    hideMobileTableOfContents = false,
    mdxComponents,
    commits,
    filePath,
    children,
    leftSidebar,
    hideLeftSidebar = false,
    hideRightSidebar = false,
    contentMaxWidthClass,
    padding = true,
    proseSize,
    rightActionButtons,
    hideAppOptions = false,
    isEditing,
    onSearch,
    showSurvey = false,
    parent,
    showQuestions = true,
    showAbout = false,
    sourceInstanceName,
    chrome = false,
    menuTabs,
    productSelect,
    hideMenu = false,
    background = false,
    tocBackground = false,
    className = '',
}: ReaderViewProps) {
    const { compact } = useApp()
    const { appWindow, activeInternalMenu } = useWindow()
    const { hash } = useLocation()
    const contentRef = useRef<HTMLDivElement>(null)
    const articleColumnRef = useRef<HTMLDivElement>(null)

    // Check if this is a customer page and get customer key
    const isCustomerPage = appWindow?.path?.startsWith('/customers/')
    const customerSlug = isCustomerPage ? appWindow.path.split('/').pop() : null
    // Handle slug-to-key mapping (e.g., great-expectations → greatexpectations)
    const customerKey = customerSlug ? customerSlug.replace(/-/g, '') : null

    const { isNavVisible, isTocVisible, isNarrow, fullWidthContent, backgroundImage, toggleNav, toggleToc } =
        useReaderView()

    const showSidebar = tableOfContents && tableOfContents?.length > 0 && !hideRightSidebar
    const renderLeftSidebar = !compact && !hideLeftSidebar
    // On narrow windows the left rail is hidden and replaced by a floating
    // control cluster that opens the sidebar as an off-canvas drawer.
    const showMobileNav = renderLeftSidebar && isNarrow
    const [mobileNavOpen, setMobileNavOpen] = useState(false)

    // Close the drawer whenever the reader navigates to a new page.
    useEffect(() => {
        setMobileNavOpen(false)
    }, [appWindow?.path])

    const selectedBackgroundOption = backgroundImage
        ? backgroundImageOptions.find((option) => option.value === backgroundImage)
        : null

    useEffect(() => {
        const scrollElement = contentRef.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement
        if (!scrollElement) return

        const waitForImagesAndScroll = async () => {
            const images = contentRef.current?.querySelectorAll('img') || []
            const imageLoadPromises = Array.from(images).map((img: HTMLImageElement) => {
                return new Promise<void>((resolve) => {
                    if (img.complete) {
                        resolve()
                    } else {
                        img.addEventListener('load', () => resolve())
                        img.addEventListener('error', () => resolve())
                    }
                })
            })
            await Promise.all(imageLoadPromises)
            await new Promise((resolve) => setTimeout(resolve, 100))
            const targetElement = document.getElementById(hash.replace('#', ''))
            if (targetElement) {
                const detailsParent = targetElement.closest('details')
                if (detailsParent) {
                    detailsParent.open = true
                }
                scrollElement.scrollTo({
                    top: targetElement.offsetTop || 0,
                    behavior: 'smooth',
                })
            }
        }

        if (hash) {
            waitForImagesAndScroll()
        } else {
            scrollElement.scrollTo({
                top: 0,
            })
        }
    }, [appWindow?.path, hash])

    const articleColumnClasses = [
        'flex-1',
        'min-w-0',
        'min-h-0',
        'flex',
        'flex-col',
        'relative',
        chrome ? 'bg-primary border border-primary rounded m-2' : '',
        selectedBackgroundOption && selectedBackgroundOption.value !== 'none'
            ? 'before:absolute before:inset-0 before:bg-primary before:opacity-75 before:pointer-events-none'
            : '',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <SearchProvider>
            <div
                data-scheme="secondary"
                data-app="ReaderView"
                className={`@container/app-reader relative w-full h-full flex min-h-0 max-w-full ${className}`}
            >
                {renderLeftSidebar && (
                    <LeftSidebar
                        isNavVisible={isNavVisible}
                        toggleNav={toggleNav}
                        mobile={showMobileNav}
                        mobileOpen={mobileNavOpen}
                        onMobileClose={() => setMobileNavOpen(false)}
                        isEditing={isEditing}
                        filePath={filePath}
                        sourceInstanceName={sourceInstanceName}
                        commits={commits}
                        pageUrl={appWindow?.path}
                        rightActionButtons={rightActionButtons}
                        hideAppOptions={hideAppOptions}
                        productSelect={productSelect}
                        inlineSearch={
                            <InlineSearch contentRef={onSearch ? undefined : contentRef} onSearch={onSearch} />
                        }
                        menuTabs={menuTabs}
                        contentRef={onSearch ? undefined : contentRef}
                        currentPath={appWindow?.path}
                        isMdx={body?.type === 'mdx'}
                        background={background}
                    >
                        {leftSidebar || (!hideMenu && <Menu parent={parent as MenuItem} />)}
                    </LeftSidebar>
                )}

                {showMobileNav && (
                    <div
                        aria-hidden
                        onClick={() => setMobileNavOpen(false)}
                        className={`absolute inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
                            mobileNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    />
                )}

                <div
                    ref={articleColumnRef}
                    data-scheme="primary"
                    className={articleColumnClasses}
                    style={
                        selectedBackgroundOption && selectedBackgroundOption.value !== 'none'
                            ? {
                                  backgroundImage: `url(${selectedBackgroundOption.backgroundImage})`,
                                  backgroundRepeat: selectedBackgroundOption.backgroundRepeat || 'repeat',
                                  backgroundSize: selectedBackgroundOption.backgroundSize || 'auto',
                                  backgroundPosition: selectedBackgroundOption.backgroundPosition || 'center',
                              }
                            : undefined
                    }
                >
                    {showMobileNav && (
                        <button
                            type="button"
                            aria-label="Open navigation"
                            onClick={() => setMobileNavOpen(true)}
                            className={`absolute bottom-4 right-4 z-30 flex size-11 items-center justify-center rounded-full border border-primary text-primary shadow-lg transition-opacity duration-200 hover:bg-accent ${FROSTED_BG} ${
                                mobileNavOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                            }`}
                        >
                            <IconSidebarClose className="size-5" />
                        </button>
                    )}
                    <div className="flex flex-1 min-h-0">
                        <ScrollArea
                            dataScheme="primary"
                            className="flex-1 min-w-0 min-h-0 relative [mask-image:linear-gradient(to_bottom,transparent_0,black_2rem,black_calc(100%_-_2rem),transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_1rem,black_calc(100%_-_1rem),transparent_100%)]"
                        >
                            <article
                                className={`reader-view-content-container @container/reader-content-container ${getProseClasses(
                                    proseSize
                                )} max-w-none relative flex-1 min-w-0`}
                            >
                                {header && (
                                    <header className="relative">
                                        <CloudinaryImage
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                                            className="dark:hidden absolute inset-0"
                                            imgClassName="h-full w-full"
                                        />
                                        <CloudinaryImage
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                                            className="hidden dark:block absolute inset-0"
                                            imgClassName="h-full w-full"
                                        />
                                        <div className="relative flex flex-col items-center w-full">{header}</div>
                                    </header>
                                )}
                                <div
                                    ref={contentRef}
                                    className={`@container/reader-content relative ${
                                        chrome ? '' : 'font-medium pt-12'
                                    } ${
                                        padding
                                            ? 'p-4 @md/reader-content-container:px-6 @lg/reader-content-container:px-8 @xl/reader-content-container:px-12 @2xl/reader-content-container:px-16 @3xl/reader-content-container:px-20'
                                            : ''
                                    }`}
                                >
                                    {body?.featuredImage && !body?.featuredVideo && (
                                        <div className="not-prose mb-6 relative">
                                            <div className="text-center">
                                                <GatsbyImage
                                                    image={getImage(body.featuredImage)}
                                                    alt={title}
                                                    className="rounded"
                                                />
                                            </div>
                                            {body.featuredImageCaption && (
                                                <div className="absolute right-0 bottom-0 m-2 text-sm text-white bg-black bg-opacity-75 font-medium py-1 px-2 rounded-sm italic text-right">
                                                    {body.featuredImageCaption}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {title && !hideTitle && (
                                        <h1
                                            className={`transition-all ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? 'max-w-full'
                                                    : contentMaxWidthClass
                                                    ? contentMaxWidthClass
                                                    : 'mx-auto max-w-2xl'
                                            }`}
                                        >
                                            {title}
                                        </h1>
                                    )}
                                    {(body?.date || body?.contributors || body?.tags) && (
                                        <div
                                            className={`flex items-center space-x-2 mb-4 flex-wrap transition-all ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? 'max-w-full'
                                                    : contentMaxWidthClass
                                                    ? contentMaxWidthClass
                                                    : 'mx-auto max-w-2xl'
                                            }`}
                                        >
                                            {body?.contributors && (
                                                <ContributorsSmall contributors={body.contributors} />
                                            )}
                                            {body?.date && <p className="text-sm text-secondary m-0">{body.date}</p>}
                                            {body?.tags && (
                                                <ul className="m-0 p-0 list-none text-sm flex flex-wrap gap-1">
                                                    {body.tags.map((tag, index) => {
                                                        const isLast = index === body.tags.length - 1
                                                        return (
                                                            <li key={tag.url} className="p-0">
                                                                <Link to={tag.url}>{tag.label}</Link>
                                                                {!isLast && ', '}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                    {tableOfContents &&
                                        tableOfContents.length > 0 &&
                                        !hideMobileTableOfContents &&
                                        !hideRightSidebar && (
                                            <div
                                                id="mobile-toc"
                                                data-scheme="secondary"
                                                className={`@4xl/app-reader:hidden mt-4 transition-all ${
                                                    fullWidthContent || body?.type !== 'mdx'
                                                        ? 'max-w-full'
                                                        : contentMaxWidthClass
                                                        ? contentMaxWidthClass
                                                        : 'mx-auto max-w-2xl'
                                                }`}
                                            >
                                                <TableOfContents
                                                    tableOfContents={tableOfContents}
                                                    contentRef={contentRef}
                                                    title="Contents"
                                                />
                                            </div>
                                        )}
                                    {body?.featuredVideo && (
                                        <iframe
                                            src={body.featuredVideo}
                                            className={getVideoClasses(fullWidthContent)}
                                        />
                                    )}
                                    <div className="reader-content-container">
                                        {body?.type === 'mdx' ? (
                                            <div
                                                className={`@container [&>*:not(.OSTable):not(.Table)]:mx-auto [&>*:not(.OSTable):not(.Table)]:transition-all [&>span:not(.OSTable):not(.Table)]:block ${
                                                    fullWidthContent || body?.type !== 'mdx'
                                                        ? '[&>*:not(.OSTable):not(.Table)]:max-w-full'
                                                        : contentMaxWidthClass ||
                                                          '[&>*:not(.OSTable):not(.Table)]:max-w-2xl'
                                                }`}
                                            >
                                                {isCustomerPage && customerKey && (
                                                    <CustomerMetadata customerKey={customerKey} />
                                                )}

                                                <MDXProvider components={mdxComponents}>
                                                    <MDXRenderer>{body.content}</MDXRenderer>
                                                </MDXProvider>
                                            </div>
                                        ) : (
                                            children
                                        )}
                                    </div>
                                    {showAbout && (
                                        <div
                                            className={`mt-8 mx-auto transition-all ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? 'max-w-full'
                                                    : contentMaxWidthClass || 'max-w-2xl'
                                            }`}
                                        >
                                            <AboutPostHog />
                                        </div>
                                    )}
                                    {showQuestions && (
                                        <div
                                            className={`mt-8 mx-auto transition-all ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? 'max-w-full'
                                                    : contentMaxWidthClass || 'max-w-2xl'
                                            } overflow-x-hidden`}
                                        >
                                            <h3 id="squeak-questions" className="mb-4">
                                                Community questions
                                            </h3>
                                            <Questions
                                                slug={appWindow?.path}
                                                parentName={activeInternalMenu?.name}
                                                className={`mx-auto transition-all ${
                                                    fullWidthContent || body?.type !== 'mdx'
                                                        ? 'max-w-full'
                                                        : contentMaxWidthClass || 'max-w-2xl'
                                                }`}
                                            />
                                        </div>
                                    )}
                                    {showSurvey && (
                                        <div
                                            className={`mt-8 mx-auto transition-all ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? 'max-w-full'
                                                    : contentMaxWidthClass || 'max-w-2xl'
                                            }`}
                                        >
                                            <DocsPageSurvey filePath={filePath} />
                                        </div>
                                    )}
                                </div>
                            </article>
                        </ScrollArea>
                        {showSidebar && (
                            <FloatingTOC
                                isTocVisible={isTocVisible}
                                toggleToc={toggleToc}
                                tableOfContents={tableOfContents}
                                contentRef={contentRef}
                                background={tocBackground}
                            />
                        )}
                    </div>
                </div>
            </div>
        </SearchProvider>
    )
}
