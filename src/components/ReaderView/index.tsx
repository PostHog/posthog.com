import React, { useEffect, useRef, useState } from 'react'
import OSButton from 'components/OSButton'
import {
    IconPencil,
    IconPullRequest,
    IconTextWidth,
    IconGear,
    IconRefresh,
    IconClockRewind,
    IconTextWidthFixed,
    IconSidebarClose,
    IconSidebarOpen,
    IconTableOfContents,
    IconX,
} from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Popover } from '../RadixUI/Popover'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import Tooltip from 'components/RadixUI/Tooltip'
import Link from 'components/Link'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import ElementScrollLink, { ScrollSpyProvider } from 'components/ElementScrollLink'
import { TreeMenu } from 'components/TreeMenu'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Fieldset } from 'components/OSFieldset'
import Slider from 'components/RadixUI/Slider'
import { ReaderViewProvider, useReaderView } from './context/ReaderViewContext'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import CloudinaryImage from 'components/CloudinaryImage'
import * as PostHogIcons from '@posthog/icons'
import * as OSIcons from '../OSIcons/Icons'
import { getLogo } from '../../constants/logos'
import SearchProvider, { useSearch } from 'components/Editor/SearchProvider'
import Mark from 'mark.js'
import debounce from 'lodash/debounce'
import { useLocation } from '@reach/router'
import { getProseClasses, isMarkdownContentPath } from '../../constants'
import { useWindow } from '../../context/Window'
import { MenuItem, useApp } from '../../context/App'
import { Questions } from 'components/Squeak'
import { DocsPageSurvey } from 'components/DocsPageSurvey'
import CopyMarkdownActionsDropdown, { useMarkdownUrlExists } from 'components/MarkdownActionsDropdown'
import CustomerMetadata from './CustomerMetadata'
import { getVideoClasses } from '../../constants'
import { Blockquote } from 'components/BlockQuote'

dayjs.extend(relativeTime)

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
    isEditing?: boolean
    onSearch?: (query: string) => void
    showSurvey?: boolean
    parent?: MenuItem
    showQuestions?: boolean
    showAbout?: boolean
    sourceInstanceName?: string
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

const LineHeightSlider = ({ lineHeightMultiplier, onValueChange }) => {
    return (
        <div className="flex items-center space-x-1">
            <div className="flex-grow">
                <Slider
                    defaultValue={lineHeightMultiplier}
                    max={3}
                    step={0.25}
                    min={1}
                    value={[lineHeightMultiplier]}
                    label="Line height"
                    onValueChange={onValueChange}
                />
            </div>
            <OSButton onClick={() => onValueChange([1])} icon={<IconRefresh className="size-5" />} />
        </div>
    )
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

const AppOptionsButton = ({ lineHeightMultiplier, handleLineHeightChange }) => {
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
                    <OSButton icon={<IconGear className="size-5" />} size="md" />
                </span>
            }
            contentClassName="w-80"
        >
            <div className="w-full h-full bg-primary text-primary space-y-2">
                <Fieldset legend="Paragraphs">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="text-[15px]">Line height</label>
                        <LineHeightSlider
                            lineHeightMultiplier={lineHeightMultiplier}
                            onValueChange={handleLineHeightChange}
                        />

                        <ToggleGroup
                            title="Content width"
                            options={contentWidthOptions}
                            value={fullWidthContent ? 'full' : 'fixed'}
                            onValueChange={handleContentWidthChange}
                        />
                    </div>
                </Fieldset>

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
}: ReaderViewProps) {
    return (
        <ReaderViewProvider>
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
                if (url) icon = <img src={url} className="size-full" />
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

    const parent = props.parent || windowParent
    const activeInternalMenu = windowActiveInternalMenu || parent?.children?.[0]

    if (!parent) return null

    return <TreeMenu key={activeInternalMenu?.url} items={resolveMenuIcons(activeInternalMenu?.children)} />
}

/**
 * Always-visible inline search input rendered in the LeftSidebar. Mirrors the
 * Editor SearchBar's mark.js highlighting behavior (clones contentRef into a
 * sibling container that gets marked) but without the open/close toggle and
 * absolute positioning. Cleans up the duplicate when the query is empty or
 * the component unmounts.
 */
const InlineSearch = ({
    contentRef,
    onSearch,
    placeholder = 'Search this page...',
}: {
    contentRef?: React.RefObject<HTMLElement>
    onSearch?: (search: string) => void
    placeholder?: string
}) => {
    const { searchQuery, setSearchQuery } = useSearch()
    const [inputValue, setInputValue] = useState(searchQuery)
    const markedRef = useRef<any>(null)
    const duplicateContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setInputValue(searchQuery)
    }, [searchQuery])

    const teardownDuplicate = () => {
        if (duplicateContainerRef.current) {
            duplicateContainerRef.current.remove()
            duplicateContainerRef.current = null
        }
        if (contentRef?.current) {
            contentRef.current.style.display = ''
        }
        markedRef.current = null
    }

    useEffect(() => {
        if (!contentRef?.current) return
        if (!inputValue) {
            teardownDuplicate()
            return
        }
        if (!duplicateContainerRef.current) {
            const duplicate = document.createElement('div')
            const clone = contentRef.current.cloneNode(true) as HTMLElement
            duplicate.appendChild(clone)
            duplicate.className = 'highlight-container'
            contentRef.current.parentElement?.appendChild(duplicate)
            contentRef.current.style.display = 'none'
            duplicateContainerRef.current = duplicate
            markedRef.current = new Mark(duplicate)
        }
        markedRef.current?.unmark()
        markedRef.current?.mark(inputValue)
    }, [inputValue])

    useEffect(() => {
        return () => {
            teardownDuplicate()
        }
    }, [])

    const debouncedSetSearchQuery = React.useCallback(
        debounce((value: string) => {
            setSearchQuery(value)
        }, 200),
        []
    )

    useEffect(() => {
        debouncedSetSearchQuery(inputValue)
    }, [inputValue, debouncedSetSearchQuery])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        onSearch?.(value)
    }

    const handleClear = () => {
        onSearch?.('')
        setSearchQuery('')
        setInputValue('')
    }

    return (
        <div className="flex items-center gap-1">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full p-1 rounded border border-input text-primary text-sm bg-light dark:bg-dark"
                value={inputValue}
                onChange={handleInputChange}
            />
            {inputValue && (
                <OSButton size="xs" icon={<IconX />} onClick={handleClear} className="rounded-full !p-1.5" />
            )}
        </div>
    )
}

interface LeftSidebarProps {
    isNavVisible: boolean
    toggleNav: () => void
    isEditing?: boolean
    lineHeightMultiplier: number
    handleLineHeightChange: (value: number) => void
    filePath?: string
    sourceInstanceName?: string
    commits?: any[]
    pageUrl: string | undefined
    rightActionButtons?: React.ReactNode
    productSelect?: React.ReactNode
    inlineSearch?: React.ReactNode
    menuTabs?: MenuTab[]
    children: React.ReactNode
}

const LeftSidebar = ({
    isNavVisible,
    toggleNav,
    isEditing,
    lineHeightMultiplier,
    handleLineHeightChange,
    filePath,
    sourceInstanceName,
    commits,
    pageUrl,
    rightActionButtons,
    productSelect,
    inlineSearch,
    menuTabs,
    children,
}: LeftSidebarProps) => {
    const hasTabs = !!menuTabs && menuTabs.length > 0
    const initialTab = hasTabs ? menuTabs!.find((t) => t.default)?.value || menuTabs![0].value : ''
    const [activeTab, setActiveTab] = useState(initialTab)
    const activeMenu = hasTabs ? menuTabs!.find((t) => t.value === activeTab)?.menu : null

    return (
        <aside
            data-scheme="secondary"
            className={`flex-shrink-0 bg-dark/10 dark:bg-light/10 border-r border-primary transition-[basis,flex-basis] duration-300 overflow-hidden flex flex-col min-h-0 ${
                isNavVisible ? 'basis-[250px]' : 'basis-12'
            }`}
        >
            <div className="flex flex-col items-center gap-px p-1 flex-shrink-0">
                <ConditionalMarkdownDropdown pageUrl={pageUrl} />
                <EditHistoryPopover commits={commits || []} />
                {rightActionButtons}
            </div>
            {isNavVisible && (
                <div className="flex-1 min-h-0 flex flex-col w-[250px]">
                    {productSelect && <div className="px-2 pb-2 flex-shrink-0">{productSelect}</div>}
                    {!isEditing && inlineSearch && <div className="px-2 pb-2 flex-shrink-0">{inlineSearch}</div>}
                    {hasTabs && (
                        <div className="px-2 pb-2 flex-shrink-0">
                            <ToggleGroup
                                title="Sidebar mode"
                                hideTitle
                                options={menuTabs!.map((t) => ({
                                    label: t.label,
                                    value: t.value,
                                    default: t.default,
                                }))}
                                value={activeTab}
                                onValueChange={(v) => {
                                    if (v) setActiveTab(v)
                                }}
                            />
                        </div>
                    )}
                    <ScrollArea className="px-2 pb-2">{hasTabs ? activeMenu : children}</ScrollArea>
                </div>
            )}
            <div
                className={`flex-shrink-0 p-1 border-t border-primary ${
                    isNavVisible ? 'flex justify-between items-center' : 'flex flex-col items-center gap-px'
                }`}
            >
                <Tooltip
                    trigger={
                        <OSButton
                            size="md"
                            onClick={toggleNav}
                            active={isNavVisible}
                            icon={isNavVisible ? <IconSidebarOpen /> : <IconSidebarClose />}
                        />
                    }
                    side="right"
                >
                    {isNavVisible ? 'Hide' : 'Show'} sidebar
                </Tooltip>
                <div className={isNavVisible ? 'flex items-center gap-px' : 'contents'}>
                    <EditOnGitHubButton filePath={filePath} sourceInstanceName={sourceInstanceName} />
                    <AppOptionsButton
                        lineHeightMultiplier={lineHeightMultiplier}
                        handleLineHeightChange={handleLineHeightChange}
                    />
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
    maxHeight: number
}

/**
 * Lives INSIDE the article column's ScrollArea so it shares the article's scrolling
 * context. `position: sticky` keeps it pinned to the top of the visible viewport as
 * the article scrolls beneath it. `maxHeight` is set to the live height of the
 * scroll viewport so the TOC never extends past the visible area; an inner
 * ScrollArea handles overflow within that height.
 */
const FloatingTOC = ({ isTocVisible, toggleToc, tableOfContents, contentRef, maxHeight }: FloatingTOCProps) => {
    return (
        <aside
            data-scheme="secondary"
            className={`sticky top-0 self-start flex-shrink-0 z-10 flex flex-col pt-10 bg-dark/10 dark:bg-light/10 border-l border-primary transition-[width] duration-300 overflow-hidden ${
                isTocVisible ? 'w-[250px]' : 'w-12'
            }`}
            style={maxHeight ? { maxHeight } : undefined}
        >
            <div className="flex justify-center p-1 flex-shrink-0">
                <Tooltip
                    trigger={
                        <OSButton size="md" icon={<IconTableOfContents />} active={isTocVisible} onClick={toggleToc} />
                    }
                    side="left"
                >
                    {isTocVisible ? 'Hide' : 'Show'} table of contents
                </Tooltip>
            </div>
            {isTocVisible && (
                <div className="flex-1 min-h-0 flex flex-col w-[250px]">
                    <ScrollArea className="px-2 pb-2" fadeOverflow>
                        <TableOfContents tableOfContents={tableOfContents} contentRef={contentRef} />
                    </ScrollArea>
                </div>
            )}
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
}: ReaderViewProps) {
    const { compact, websiteMode } = useApp()
    const { appWindow, activeInternalMenu } = useWindow()
    const { hash } = useLocation()
    const contentRef = useRef<HTMLDivElement>(null)
    const articleColumnRef = useRef<HTMLDivElement>(null)
    const [tocMaxHeight, setTocMaxHeight] = useState(0)

    // Check if this is a customer page and get customer key
    const isCustomerPage = appWindow?.path?.startsWith('/customers/')
    const customerSlug = isCustomerPage ? appWindow.path.split('/').pop() : null
    // Handle slug-to-key mapping (e.g., great-expectations → greatexpectations)
    const customerKey = customerSlug ? customerSlug.replace(/-/g, '') : null

    const {
        isNavVisible,
        isTocVisible,
        lineHeightMultiplier,
        fullWidthContent,
        backgroundImage,
        toggleNav,
        toggleToc,
        handleLineHeightChange,
    } = useReaderView()

    const showSidebar = tableOfContents && tableOfContents?.length > 0 && !hideRightSidebar
    const renderLeftSidebar = !compact && !hideLeftSidebar

    const selectedBackgroundOption = backgroundImage
        ? backgroundImageOptions.find((option) => option.value === backgroundImage)
        : null

    // Track the article column's visible height so the floating TOC can cap its
    // own max-height and never overflow past the viewport.
    useEffect(() => {
        const node = articleColumnRef.current
        if (!node || typeof ResizeObserver === 'undefined') return
        const update = () => setTocMaxHeight(node.clientHeight)
        update()
        const ro = new ResizeObserver(update)
        ro.observe(node)
        return () => ro.disconnect()
    }, [])

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
                className={`@container/app-reader w-full h-full flex min-h-0 ${
                    websiteMode ? 'max-w-7xl mx-auto' : 'max-w-full'
                }`}
            >
                {renderLeftSidebar && (
                    <LeftSidebar
                        isNavVisible={isNavVisible}
                        toggleNav={toggleNav}
                        isEditing={isEditing}
                        lineHeightMultiplier={lineHeightMultiplier}
                        handleLineHeightChange={handleLineHeightChange}
                        filePath={filePath}
                        sourceInstanceName={sourceInstanceName}
                        commits={commits}
                        pageUrl={appWindow?.path}
                        rightActionButtons={rightActionButtons}
                        productSelect={productSelect}
                        inlineSearch={
                            <InlineSearch contentRef={onSearch ? undefined : contentRef} onSearch={onSearch} />
                        }
                        menuTabs={menuTabs}
                    >
                        {leftSidebar || <Menu parent={parent as MenuItem} />}
                    </LeftSidebar>
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
                    <ScrollArea
                        dataScheme="primary"
                        className="flex-1 min-h-0 relative [mask-image:linear-gradient(to_bottom,transparent_0,black_2rem,black_calc(100%_-_2rem),transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_1rem,black_calc(100%_-_1rem),transparent_100%)]"
                    >
                        <div className="flex items-start min-h-full">
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
                                            className={`mx-auto transition-all ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? 'max-w-full'
                                                    : contentMaxWidthClass || 'max-w-2xl'
                                            }`}
                                        >
                                            {title}
                                        </h1>
                                    )}
                                    {(body?.date || body?.contributors || body?.tags) && (
                                        <div
                                            className={`flex items-center space-x-2 mb-4 flex-wrap mx-auto transition-all ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? 'max-w-full'
                                                    : contentMaxWidthClass || 'max-w-2xl'
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
                                                className={`@4xl/app-reader:hidden mt-4 mx-auto transition-all ${
                                                    fullWidthContent || body?.type !== 'mdx'
                                                        ? 'max-w-full'
                                                        : contentMaxWidthClass || 'max-w-2xl'
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
                                            <Blockquote>
                                                PostHog is an all-in-one developer platform for building successful
                                                products. We provide <a href="/product-analytics">product analytics</a>,{' '}
                                                <a href="/web-analytics">web analytics</a>,{' '}
                                                <a href="/session-replay">session replay</a>,{' '}
                                                <a href="/error-tracking">error tracking</a>,{' '}
                                                <a href="/feature-flags">feature flags</a>,{' '}
                                                <a href="/experiments">experiments</a>, <a href="/surveys">surveys</a>,{' '}
                                                <a href="/llm-analytics">LLM analytics</a>, <a href="/logs">logs</a>,{' '}
                                                <a href="/workflows">workflows</a>, <a href="/endpoints">endpoints</a>,{' '}
                                                <a href="/data-warehouse">data warehouse</a>, <a href="/cdp">CDP</a>,
                                                and an <a href="/ai">AI product assistant</a> to help debug your code,
                                                ship features faster, and keep all your usage and customer data in one
                                                stack.
                                            </Blockquote>
                                        </div>
                                    )}
                                    {showQuestions && (
                                        <div
                                            className={`mt-8 mx-auto transition-all ${
                                                fullWidthContent || body?.type !== 'mdx'
                                                    ? 'max-w-full'
                                                    : contentMaxWidthClass || 'max-w-2xl'
                                            }`}
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
                            {showSidebar && (
                                <FloatingTOC
                                    isTocVisible={isTocVisible}
                                    toggleToc={toggleToc}
                                    tableOfContents={tableOfContents}
                                    contentRef={contentRef}
                                    maxHeight={tocMaxHeight}
                                />
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </SearchProvider>
    )
}
