import React, { useState, useRef, useEffect } from 'react'
import {
    IconSearch,
    IconMessage,
    IconFilter,
    IconGear,
    IconTextWidthFixed,
    IconTextWidth,
    IconRefresh,
    IconPlus,
} from '@posthog/icons'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Toolbar, ToolbarElement } from '../RadixUI/Toolbar'
import {
    StrikethroughIcon,
    TextAlignLeftIcon,
    TextAlignCenterIcon,
    TextAlignRightIcon,
    FontBoldIcon,
    FontItalicIcon,
    ReloadIcon,
} from '@radix-ui/react-icons'
import { IconLink } from '../OSIcons/Icons'
import useProduct from 'hooks/useProduct'
import { SearchProvider } from './SearchProvider'
import { SearchBar } from './SearchBar'
import { getProseClasses } from '../../constants/index'
import { useApp } from '../../context/App'
import Share from 'components/Share'
import { useWindow } from '../../context/Window'
import Cher from 'components/Cher'
import BookmarkButton from 'components/BookmarkButton'
import MediaPlayer from 'components/MediaPlayer'
import CloudinaryImage from 'components/CloudinaryImage'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { Popover } from 'components/RadixUI/Popover'
import Slider from 'components/RadixUI/Slider'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import ViewerFilters from 'components/Viewer/ViewerFilters'

interface EditorProps {
    slug?: string
    title?: string
    type?: string
    maxWidth?: number | string
    children?: React.ReactNode
    hasTabs?: boolean
    hasPadding?: boolean
    availableFilters?: {
        label: string
        value?: any
        options: {
            label: string
            value: any
        }[]
        onChange?: (value: string) => void
        operator: string
        filter?: (obj: any, value: any) => boolean
        initialValue?: any
    }[]
    onSearchChange?: (query: string) => void
    showFilters?: boolean
    disableFilterChange?: boolean
    dataToFilter?: any
    onFilterChange?: (data: any) => void
    actionButtons?: EditorActionButtons
    handleFilterChange?: (filters: any) => void
    availableGroups?: {
        label: string
        value: string
    }[]
    onGroupChange?: (group: string) => void
    sortOptions?: {
        label: string
        value: string
        icon?: string
        color?: string
    }[]
    onSortChange?: (sort: string) => void
    defaultSortValue?: string
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
    /** Grey out the text-formatting buttons (undo/redo/bold/italic/strikethrough/align) for read-only content */
    disableFormatting?: boolean
    scrollable?: boolean
    className?: string
}

type EditorAction = 'bold' | 'italic' | 'strikethrough' | 'undo' | 'redo' | 'leftAlign' | 'centerAlign' | 'rightAlign'

type EditorActionButtons = Partial<Record<EditorAction, EditorActionButton>>

type EditorActionButton = {
    onClick: () => void
    active?: boolean
    disabled?: boolean
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

export function Editor({
    title,
    type,
    hasTabs = false,
    children,
    availableFilters,
    maxWidth: initialMaxWidth,
    onSearchChange,
    showFilters: initialShowFilters = false,
    disableFilterChange = false,
    dataToFilter,
    onFilterChange,
    handleFilterChange,
    actionButtons,
    availableGroups,
    onGroupChange,
    sortOptions,
    onSortChange,
    defaultSortValue,
    proseSize = 'sm',
    hasPadding = true,
    cta,
    bookmark,
    extraMenuOptions,
    articleRef,
    hideToolbar = false,
    disableFormatting = false,
    scrollable = true,
    className = '',
}: EditorProps) {
    const [showCher, setShowCher] = useState(false)
    const [showFilters, setShowFilters] = useState(initialShowFilters)
    const [showSearch, setShowSearch] = useState(false)
    const [isModifierKeyPressed, setIsModifierKeyPressed] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const products = useProduct() as { slug: string; name: string; type: string }[]
    // take the product name passed in and check the useProduct hook to get the product's display name
    const getProductName = (type: string) => products.find((p) => p.type === type)?.name || type
    // if we're filtering to a product, show the filter button in an active/open state
    const searchContentRef = useRef(null)
    const { addWindow, focusedWindow } = useApp()
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
            type: 'button',
            label: 'Undo',
            icon: <ReloadIcon className="scale-x-[-1]" />,
            hideLabel: true,
            onClick: actionButtons?.undo?.onClick,
            active: actionButtons?.undo?.active,
            disabled: disableFormatting || actionButtons?.undo?.disabled,
        },
        {
            type: 'button',
            label: 'Redo',
            icon: <ReloadIcon />,
            hideLabel: true,
            onClick: actionButtons?.redo?.onClick,
            active: actionButtons?.redo?.active,
            disabled: disableFormatting || actionButtons?.redo?.disabled,
        },
        { type: 'separator', className: 'hidden @2xl:block' },
        {
            type: 'select',
            placeholder: 'Zoom',
            className: '!text-[13px] !pr-0 !py-0.5 hidden @2xl:inline-flex',
            disabled: true,
            groups: [
                {
                    label: 'Zoom Levels',
                    items: [
                        { value: '50', label: '50%', disabled: true },
                        { value: '75', label: '75%', disabled: true },
                        { value: '100', label: '100%', disabled: true },
                        { value: '150', label: '150%', disabled: true },
                        { value: '200', label: '200%', disabled: true },
                    ],
                },
            ],
        },
        { type: 'separator' },
        {
            type: 'button',
            label: 'Bold',
            icon: <FontBoldIcon />,
            hideLabel: true,
            onClick: actionButtons?.bold?.onClick,
            active: actionButtons?.bold?.active,
            disabled: disableFormatting || actionButtons?.bold?.disabled,
        },
        {
            type: 'button',
            label: 'Italic',
            icon: <FontItalicIcon />,
            hideLabel: true,
            onClick: actionButtons?.italic?.onClick,
            active: actionButtons?.italic?.active,
            disabled: disableFormatting || actionButtons?.italic?.disabled,
        },
        {
            type: 'button',
            label: 'Strikethrough',
            icon: <StrikethroughIcon />,
            hideLabel: true,
            onClick: actionButtons?.strikethrough?.onClick,
            active: actionButtons?.strikethrough?.active,
            disabled: disableFormatting || actionButtons?.strikethrough?.disabled,
            className: 'hidden @md:inline-flex',
        },
        { type: 'separator', className: 'hidden @3xl:block' },
        {
            type: 'select',
            placeholder: 'Font',
            className: '!text-[13px] !pr-0 !py-0.5 hidden @3xl:inline-flex',
            disabled: true,
            groups: [
                {
                    label: 'Fonts',
                    items: [
                        { value: 'arial', label: 'Arial', disabled: true },
                        { value: 'times', label: 'Times New Roman', disabled: true },
                        { value: 'courier', label: 'Courier New', disabled: true },
                    ],
                },
            ],
        },
        { type: 'separator', className: 'hidden @lg:block' },
        {
            type: 'button',
            label: 'Left',
            icon: <TextAlignLeftIcon />,
            onClick: actionButtons?.leftAlign?.onClick,
            active: actionButtons?.leftAlign?.active,
            hideLabel: true,
            disabled: disableFormatting || actionButtons?.leftAlign?.disabled,
            className: 'hidden @lg:inline-flex',
        },
        {
            type: 'button',
            label: 'Center',
            icon: <TextAlignCenterIcon />,
            onClick: actionButtons?.centerAlign?.onClick,
            active: actionButtons?.centerAlign?.active,
            hideLabel: true,
            disabled: disableFormatting || actionButtons?.centerAlign?.disabled,
            className: 'hidden @lg:inline-flex',
        },
        {
            type: 'button',
            label: 'Right',
            icon: <TextAlignRightIcon />,
            onClick: actionButtons?.rightAlign?.onClick,
            active: actionButtons?.rightAlign?.active,
            hideLabel: true,
            disabled: disableFormatting || actionButtons?.rightAlign?.disabled,
            className: 'hidden @lg:inline-flex',
        },

        { type: 'separator', className: 'hidden @xl:block' },
        {
            type: 'button',
            icon: <IconLink />,
            label: 'Link',
            hideLabel: true,
            disabled: true,
            className: 'hidden @xl:inline-flex',
        },
        {
            type: 'button',
            icon: <IconMessage />,
            label: 'Comment',
            hideLabel: true,
            disabled: true,
            className: 'hidden @xl:inline-flex',
        },
        {
            type: 'container' as const,
            className: 'ml-auto flex items-center gap-px',
            children: (
                <>
                    <OSButton size="md" active={showSearch} icon={<IconSearch />} onClick={toggleSearch} />
                    {availableFilters && availableFilters.length > 0 && (
                        <OSButton
                            size="md"
                            active={showFilters}
                            icon={<IconFilter />}
                            onClick={() => setShowFilters(!showFilters)}
                        />
                    )}
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
            <div className={`@container w-full h-full flex flex-col min-h-1 ${className}`}>
                <div className="flex flex-col flex-grow min-h-0">
                    <main
                        data-app="Editor"
                        data-scheme="primary"
                        className="@container/editor flex-1 relative h-full flex flex-col"
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
                                        fullWidthContent ? 'max-w-full' : 'max-w-4xl'
                                    }`}
                                >
                                    {title && (
                                        <h1 className="text-2xl font-bold">
                                            {title}
                                            {type && <span className="opacity-40">.{type}</span>}
                                        </h1>
                                    )}
                                    {availableFilters && availableFilters.length > 0 && (
                                        <div className="mb-2 mt-4">
                                            <ViewerFilters
                                                availableFilters={availableFilters}
                                                dataToFilter={dataToFilter}
                                                onFilterChange={onFilterChange}
                                                handleFilterChange={handleFilterChange}
                                                disableFilterChange={disableFilterChange}
                                                availableGroups={availableGroups}
                                                onGroupChange={onGroupChange}
                                                sortOptions={sortOptions}
                                                onSortChange={onSortChange}
                                                defaultSortValue={defaultSortValue}
                                            />
                                        </div>
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
                                    className={`${getProseClasses(proseSize)} ${
                                        hasPadding ? 'py-4 px-4 @xl:px-8' : ''
                                    } mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-4xl'}`}
                                >
                                    {title && (
                                        <h1 className="text-2xl font-bold">
                                            {title}
                                            {type && <span className="opacity-40">.{type}</span>}
                                        </h1>
                                    )}
                                    {availableFilters && availableFilters.length > 0 && (
                                        <div className="mb-2 mt-4">
                                            <ViewerFilters
                                                availableFilters={availableFilters}
                                                dataToFilter={dataToFilter}
                                                onFilterChange={onFilterChange}
                                                handleFilterChange={handleFilterChange}
                                                disableFilterChange={disableFilterChange}
                                                availableGroups={availableGroups}
                                                onGroupChange={onGroupChange}
                                                sortOptions={sortOptions}
                                                onSortChange={onSortChange}
                                                defaultSortValue={defaultSortValue}
                                            />
                                        </div>
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
export default Editor
