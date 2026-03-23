import React, { useState, useRef, useEffect } from 'react'
import { IconSearch, IconGear, IconTextWidthFixed, IconTextWidth, IconRefresh } from '@posthog/icons'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Toolbar, ToolbarElement } from '../RadixUI/Toolbar'
import { SearchProvider } from './SearchProvider'
import { SearchBar } from './SearchBar'
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
    const [preferredMaxWidth, setPreferredMaxWidth] = useState(
        typeof window !== 'undefined'
            ? Number(localStorage.getItem('preferredMaxWidth')) || initialMaxWidth
            : initialMaxWidth
    )

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
}: ViewerProps) {
    const [showCher, setShowCher] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [isModifierKeyPressed, setIsModifierKeyPressed] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const searchContentRef = useRef(null)
    const { addWindow, focusedWindow, websiteMode } = useApp()
    const hasShareButton = !cta?.url || !cta?.label
    const { appWindow } = useWindow()
    const [maxWidth, setMaxWidth] = useState(initialMaxWidth ?? 768)
    const fullWidthContent = typeof maxWidth === 'string' && maxWidth === '100%'

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }

    const closeSearch = () => {
        setShowSearch(false)
    }

    const toolbarElements: ToolbarElement[] = [
        {
            type: 'container' as const,
            className: 'ml-auto flex items-center gap-px',
            children: (
                <>
                    <OSButton size="md" active={showSearch} icon={<IconSearch />} onClick={toggleSearch} />
                    {extraMenuOptions}
                    {bookmark && <BookmarkButton bookmark={bookmark} />}
                    <Options
                        fullWidthContent={fullWidthContent}
                        maxWidth={maxWidth}
                        setMaxWidth={setMaxWidth}
                        initialMaxWidth={initialMaxWidth}
                    />
                    <div
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="relative z-10"
                    >
                        <OSButton
                            variant="primary"
                            size="md"
                            {...(hasShareButton
                                ? showCher
                                    ? {
                                          onClick: () => {
                                              addWindow(
                                                  <MediaPlayer
                                                      newWindow
                                                      location={{ pathname: `cher` }}
                                                      key={`cher`}
                                                      videoId="nZXRV4MezEw"
                                                  />
                                              )
                                          },
                                      }
                                    : {
                                          onClick: () => {
                                              addWindow(
                                                  <Share
                                                      title={appWindow?.meta?.title}
                                                      location={{ pathname: `share` }}
                                                      key={`share`}
                                                      newWindow
                                                      url={`${window.location.origin}${appWindow?.path}`}
                                                  />
                                              )
                                          },
                                      }
                                : {
                                      to: cta?.url,
                                  })}
                            state={{ newWindow: true }}
                            asLink
                            className="ml-1 -my-0.5"
                        >
                            {hasShareButton ? (
                                showCher ? (
                                    <span className="relative">
                                        <CloudinaryImage
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/cher_hog_5cdafbe899.png"
                                            className="w-[38px] absolute left-0 translate-x-[-25%] translate-y-[-25%]"
                                        />
                                        <span className="inline-block ml-6">Cher</span>
                                    </span>
                                ) : (
                                    'Share'
                                )
                            ) : (
                                cta?.label
                            )}
                        </OSButton>
                    </div>
                </>
            ),
        },
    ]

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

    return (
        <SearchProvider onSearchChange={onSearchChange}>
            <div className="@container w-full h-full flex flex-col min-h-1">
                {/* {hideToolbar
                    ? null
                    : !websiteMode && (
                        <aside data-scheme="secondary" className="bg-primary p-2 border-b border-primary">
                            <Toolbar elements={toolbarElements} />
                        </aside>
                    )} */}
                <div className="flex flex-col flex-grow min-h-0">
                    <main
                        data-app="Viewer"
                        data-scheme="primary"
                        className="@container flex-1 relative h-full flex flex-col"
                    >
                        <SearchBar
                            visible={showSearch}
                            onClose={closeSearch}
                            contentRef={onSearchChange ? undefined : searchContentRef}
                            dataScheme="secondary"
                            className="bg-primary -top-px right-8"
                            onSearch={onSearchChange}
                        />

                        {hasTabs ? (
                            <div data-scheme="primary" className="bg-accent h-full">
                                <article
                                    data-scheme="primary"
                                    className={`${getProseClasses(proseSize)} h-full mx-auto transition-all ${
                                        fullWidthContent || websiteMode ? 'max-w-full' : 'max-w-3xl'
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
                                    )} py-4 px-4 @xl:p-8 mx-auto transition-all ${
                                        fullWidthContent || websiteMode ? 'max-w-full' : 'max-w-3xl'
                                    }`}
                                >
                                    {title && (
                                        <h1 className="text-2xl font-bold">
                                            {title}
                                            {type && <span className="opacity-40">.{type}</span>}
                                        </h1>
                                    )}
                                    <div className="relative">
                                        <div ref={searchContentRef}>{children}</div>
                                    </div>
                                </article>
                            </ScrollWrapper>
                        )}
                    </main>
                </div>
            </div>
        </SearchProvider>
    )
}

// Add default export for backward compatibility
export default Viewer
