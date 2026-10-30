import React, { useState, useRef, useEffect } from 'react'
import { IconGear, IconTextWidthFixed, IconTextWidth, IconRefresh } from '@posthog/icons'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Toolbar, ToolbarElement } from '../RadixUI/Toolbar'
import { SearchProvider } from './SearchProvider'
import EditorSearchProvider from 'components/Editor/SearchProvider'
import { ViewerControls } from './ViewerControls'
import { ViewerSidebar } from './ViewerSidebar'
import { getProseClasses } from '../../constants/index'
import { useApp } from '../../context/App'
import Share from 'components/Share'
import { useWindow } from '../../context/Window'
import BookmarkButton from 'components/BookmarkButton'
import MediaPlayer from 'components/MediaPlayer'
import CloudinaryImage from 'components/CloudinaryImage'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { Popover } from 'components/RadixUI/Popover'
import Slider from 'components/RadixUI/Slider'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

interface ViewerProps {
    slug?: string
    title?: string
    type?: string
    maxWidth?: number | string
    children?: React.ReactNode
    hasTabs?: boolean
    onSearchChange?: (query: string) => void
    proseSize?: 'sm' | 'base' | 'lg'
    cta?: {
        url: string
        label: string
    }
    bookmark?: {
        title: string
        description: string
    }
    extraMenuOptions?: React.ReactNode
    articleRef?: React.RefObject<HTMLDivElement>
    hideToolbar?: boolean
    scrollable?: boolean
    /**
     * Where the control strip (search + tools) renders:
     * - `rail` (default): vertical left column on `@md`+ containers, collapsing to a top row below `@md`.
     * - `header`: horizontal row at the top-left of the content, mirroring the window controls.
     */
    controlsPlacement?: 'rail' | 'header'
    /** Surface the content-width (gear) control alongside search. */
    showOptions?: boolean
    /**
     * Navigation menu rendered in a left sidebar (persistent column on `@3xl`+ containers,
     * collapsing to a downward menu button on narrow ones). When set, the sidebar owns page
     * search and the `controlsPlacement` strip is not rendered.
     */
    leftSidebar?: React.ReactNode
    /** Static header shown atop the `leftSidebar` column / as its mobile menu trigger. */
    sidebarHeader?: React.ReactNode
}

const ScrollWrapper = ({ scrollable, children }: { scrollable: boolean; children: React.ReactNode }) =>
    scrollable ? <ScrollArea>{children}</ScrollArea> : <>{children}</>

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

const Options = ({
    fullWidthContent,
    maxWidth,
    setMaxWidth,
    ...other
}: {
    fullWidthContent: boolean
    maxWidth: number | string
    setMaxWidth: (value: number | string) => void
    initialMaxWidth: number | string
}) => {
    const { appWindow } = useWindow()
    const initialMaxWidth =
        typeof other.initialMaxWidth === 'number' ? other.initialMaxWidth : appWindow?.size?.width || 1000
    const [preferredMaxWidth, setPreferredMaxWidth] = useState(initialMaxWidth)

    useEffect(() => {
        const stored = Number(localStorage.getItem('preferredMaxWidth'))
        if (stored) setPreferredMaxWidth(stored)
    }, [])

    useEffect(() => {
        if (!fullWidthContent) {
            setMaxWidth(preferredMaxWidth)
            localStorage.setItem('preferredMaxWidth', preferredMaxWidth.toString())
        }
    }, [preferredMaxWidth, fullWidthContent])

    return (
        <Popover
            title="Options"
            dataScheme="secondary"
            trigger={
                <span>
                    <OSButton icon={<IconGear />} size="md" />
                </span>
            }
            contentClassName="w-80 p-2"
        >
            <ToggleGroup
                title="Content width"
                options={contentWidthOptions}
                value={fullWidthContent ? 'full' : 'fixed'}
                onValueChange={(value) => {
                    setMaxWidth(
                        value === 'full'
                            ? '100%'
                            : typeof preferredMaxWidth === 'number'
                            ? preferredMaxWidth
                            : appWindow?.size?.width || 1000
                    )
                }}
            />
            {typeof preferredMaxWidth === 'number' && typeof maxWidth === 'number' && (
                <div className="flex items-center space-x-1">
                    <div className="flex-grow">
                        <Slider
                            defaultValue={preferredMaxWidth}
                            max={appWindow?.size?.width}
                            step={1}
                            min={400}
                            value={[preferredMaxWidth]}
                            label="Line height"
                            onValueChange={(value) => setPreferredMaxWidth(value[0])}
                        />
                    </div>
                    <OSButton
                        onClick={() => setPreferredMaxWidth(initialMaxWidth)}
                        icon={<IconRefresh className="size-5" />}
                    />
                </div>
            )}
        </Popover>
    )
}

export function Viewer({
    title,
    type,
    hasTabs = false,
    children,
    maxWidth: initialMaxWidth,
    onSearchChange,
    proseSize = 'sm',
    cta,
    bookmark,
    extraMenuOptions,
    articleRef,
    hideToolbar = false,
    scrollable = true,
    controlsPlacement = 'rail',
    showOptions = false,
    leftSidebar,
    sidebarHeader,
}: ViewerProps) {
    const hasLeftSidebar = Boolean(leftSidebar)
    const [showCher, setShowCher] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [isModifierKeyPressed, setIsModifierKeyPressed] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const searchContentRef = useRef<HTMLDivElement>(null)
    const { addWindow, focusedWindow } = useApp()
    const { appWindow } = useWindow()
    const [maxWidth, setMaxWidth] = useState(initialMaxWidth ?? 768)
    const fullWidthContent = typeof maxWidth === 'string' && maxWidth === '100%'

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }

    const closeSearch = () => {
        setShowSearch(false)
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) {
                setIsModifierKeyPressed(true)
            }
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            if (!event.ctrlKey && !event.metaKey) {
                setIsModifierKeyPressed(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    // Add Shift+F keyboard shortcut for search
    useEffect(() => {
        const handleSearchKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.shadowRoot ||
                (target instanceof HTMLElement && target.closest('.mdxeditor'))
            ) {
                return
            }
            // Only handle Shift+F if this window is the focused/active window
            if (e.key === 'F' && e.shiftKey && focusedWindow === appWindow) {
                e.preventDefault()
                setShowSearch(true)
            }
        }

        document.addEventListener('keydown', handleSearchKeyDown)
        return () => {
            document.removeEventListener('keydown', handleSearchKeyDown)
        }
    }, [focusedWindow, appWindow])

    useEffect(() => {
        setShowCher(isHovering && isModifierKeyPressed)
    }, [isHovering, isModifierKeyPressed])

    // Controls beyond search. When any are present, search + these collapse into a single
    // combo button (see ViewerControls); otherwise the strip shows a lone search icon.
    const otherControls: React.ReactNode[] = []
    if (showOptions) {
        otherControls.push(
            <Options
                key="options"
                fullWidthContent={fullWidthContent}
                maxWidth={maxWidth}
                setMaxWidth={setMaxWidth}
                initialMaxWidth={initialMaxWidth ?? 768}
            />
        )
    }
    if (cta?.url && cta?.label) {
        otherControls.push(<Share key="share" url={cta.url} title={title ?? cta.label} />)
    }
    if (bookmark) {
        otherControls.push(<BookmarkButton key="bookmark" bookmark={bookmark} />)
    }
    if (extraMenuOptions) {
        otherControls.push(<React.Fragment key="extra">{extraMenuOptions}</React.Fragment>)
    }

    return (
        <SearchProvider onSearchChange={onSearchChange}>
            <div className="@container w-full h-full flex flex-col min-h-1">
                <div className="flex flex-col flex-grow min-h-0">
                    <main
                        data-app="Viewer"
                        data-scheme="primary"
                        className={`@container flex-1 relative h-full flex ${
                            hasLeftSidebar
                                ? 'flex-col @3xl:flex-row'
                                : controlsPlacement === 'header'
                                ? 'flex-col'
                                : 'flex-col @md:flex-row'
                        }`}
                    >
                        {hasLeftSidebar ? (
                            <EditorSearchProvider>
                                <ViewerSidebar
                                    sidebarHeader={sidebarHeader}
                                    nav={leftSidebar}
                                    searchContentRef={searchContentRef}
                                />
                            </EditorSearchProvider>
                        ) : (
                            <ViewerControls
                                placement={controlsPlacement}
                                showSearch={showSearch}
                                toggleSearch={toggleSearch}
                                closeSearch={closeSearch}
                                searchContentRef={searchContentRef}
                                onSearchChange={onSearchChange}
                                otherControls={otherControls}
                            />
                        )}

                        <div className="@container flex-1 min-h-0 [mask-image:linear-gradient(to_bottom,transparent_0,black_2rem,black_calc(100%_-_2rem),transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_1rem,black_calc(100%_-_1rem),transparent_100%)]">
                            {hasTabs ? (
                                <div data-scheme="primary" className="bg-accent h-full">
                                    <article
                                        data-scheme="primary"
                                        className={`${getProseClasses(proseSize)} h-full mx-auto transition-all ${
                                            fullWidthContent ? 'max-w-full' : 'max-w-5xl'
                                        }`}
                                    >
                                        {title && (
                                            <h1 className="text-2xl font-bold">
                                                {title}
                                                {type && <span className="opacity-40">.{type}</span>}
                                            </h1>
                                        )}
                                        <div className="relative h-full" ref={searchContentRef}>
                                            {children}
                                        </div>
                                    </article>
                                </div>
                            ) : (
                                <ScrollWrapper scrollable={scrollable}>
                                    <article
                                        ref={articleRef ?? undefined}
                                        className={`${getProseClasses(
                                            proseSize
                                        )} py-4 px-4 @xl:p-8 @2xl:px-12 @3xl:px-16 mx-auto transition-all ${
                                            fullWidthContent ? 'max-w-full' : 'max-w-5xl'
                                        }`}
                                    >
                                        {title && (
                                            <h1 className="text-2xl font-bold">
                                                {title}
                                                {type && <span className="opacity-40">.{type}</span>}
                                            </h1>
                                        )}
                                        <div className="relative" ref={searchContentRef}>
                                            {children}
                                        </div>
                                    </article>
                                </ScrollWrapper>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </SearchProvider>
    )
}

export default Viewer
