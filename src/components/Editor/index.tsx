import React, { useState, useRef, useEffect } from 'react'
import { Select } from '../RadixUI/Select'
import { IconSearch, IconMessage, IconFilter } from '@posthog/icons'
import { useLocation } from '@reach/router'
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

interface EditorProps {
    slug?: string
    title?: string
    type?: string
    maxWidth?: string
    children?: React.ReactNode
    availableFilters?: {
        label: string
        value?: string
        options: {
            label: string
            value: any
        }[]
        onChange?: (value: string) => void
        operator: string
        filter?: (obj: any, value: any) => boolean
        initialValue?: string
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
}

type EditorAction = 'bold' | 'italic' | 'strikethrough' | 'undo' | 'redo' | 'leftAlign' | 'centerAlign' | 'rightAlign'

type EditorActionButtons = Partial<Record<EditorAction, EditorActionButton>>

type EditorActionButton = {
    onClick: () => void
    active?: boolean
    disabled?: boolean
}

const filterData = (data: any, filters: any) => {
    return data.filter((obj: any) => {
        return Object.keys(filters).every((key) => {
            const { value, filter } = filters[key]
            if (value === null) {
                return true
            }
            return filter(obj, value)
        })
    })
}

export function Editor({
    title,
    type,
    children,
    availableFilters,
    maxWidth = '3xl',
    onSearchChange,
    showFilters: initialShowFilters = false,
    disableFilterChange = false,
    dataToFilter,
    onFilterChange,
    actionButtons,
    availableGroups,
    onGroupChange,
    sortOptions,
    onSortChange,
    defaultSortValue,
    proseSize = 'sm',
    cta,
    ...other
}: EditorProps) {
    const [showCher, setShowCher] = useState(false)
    const [showFilters, setShowFilters] = useState(initialShowFilters)
    const [showSearch, setShowSearch] = useState(false)
    const [filters, setFilters] = useState({})
    const [isModifierKeyPressed, setIsModifierKeyPressed] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const products = useProduct() as { slug: string; name: string; type: string }[]
    // take the product name passed in and check the useProduct hook to get the product's display name
    const getProductName = (type: string) => products.find((p) => p.type === type)?.name || type
    // if we're filtering to a product, show the filter button in an active/open state
    const searchContentRef = useRef(null)
    const { search } = useLocation()
    const { addWindow } = useApp()
    const hasShareButton = !cta?.url || !cta?.label
    const { appWindow } = useWindow()

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
            disabled: actionButtons?.undo?.disabled,
        },
        {
            type: 'button',
            label: 'Redo',
            icon: <ReloadIcon />,
            hideLabel: true,
            onClick: actionButtons?.redo?.onClick,
            active: actionButtons?.redo?.active,
            disabled: actionButtons?.redo?.disabled,
        },
        { type: 'separator' },
        {
            type: 'select',
            placeholder: 'Zoom',
            className: '!text-[13px] !pr-0 !py-0.5',
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
            disabled: actionButtons?.bold?.disabled,
        },
        {
            type: 'button',
            label: 'Italic',
            icon: <FontItalicIcon />,
            hideLabel: true,
            onClick: actionButtons?.italic?.onClick,
            active: actionButtons?.italic?.active,
            disabled: actionButtons?.italic?.disabled,
        },
        {
            type: 'button',
            label: 'Strikethrough',
            icon: <StrikethroughIcon />,
            hideLabel: true,
            onClick: actionButtons?.strikethrough?.onClick,
            active: actionButtons?.strikethrough?.active,
            disabled: actionButtons?.strikethrough?.disabled,
        },
        { type: 'separator' },
        {
            type: 'select',
            placeholder: 'Font',
            className: '!text-[13px] !pr-0 !py-0.5',
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
        { type: 'separator' },
        {
            type: 'button',
            label: 'Left',
            icon: <TextAlignLeftIcon />,
            onClick: actionButtons?.leftAlign?.onClick,
            active: actionButtons?.leftAlign?.active,
            hideLabel: true,
            disabled: actionButtons?.leftAlign?.disabled,
        },
        {
            type: 'button',
            label: 'Center',
            icon: <TextAlignCenterIcon />,
            onClick: actionButtons?.centerAlign?.onClick,
            active: actionButtons?.centerAlign?.active,
            hideLabel: true,
            disabled: actionButtons?.centerAlign?.disabled,
        },
        {
            type: 'button',
            label: 'Right',
            icon: <TextAlignRightIcon />,
            onClick: actionButtons?.rightAlign?.onClick,
            active: actionButtons?.rightAlign?.active,
            hideLabel: true,
            disabled: actionButtons?.rightAlign?.disabled,
        },

        { type: 'separator' },
        {
            type: 'button',
            icon: <IconLink />,
            label: 'Link',
            hideLabel: true,
            disabled: true,
        },
        {
            type: 'button',
            icon: <IconMessage />,
            label: 'Comment',
            hideLabel: true,
            disabled: true,
        },
        {
            type: 'container' as const,
            className: 'ml-auto flex items-center gap-px',
            children: (
                <>
                    <OSButton
                        variant="ghost"
                        size="sm"
                        active={showSearch}
                        icon={<IconSearch />}
                        onClick={toggleSearch}
                    />
                    {availableFilters && availableFilters.length > 0 && (
                        <OSButton
                            variant="ghost"
                            size="sm"
                            active={showFilters}
                            icon={<IconFilter />}
                            onClick={() => setShowFilters(!showFilters)}
                        />
                    )}
                    <div
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="relative z-10"
                    >
                        {hasShareButton && <Cher active={showCher} />}
                        <OSButton
                            variant="primary"
                            size="xs"
                            {...(hasShareButton
                                ? {
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
                        >
                            {hasShareButton ? 'Share' : cta?.label}
                        </OSButton>
                    </div>
                </>
            ),
        },
    ]

    const handleFilterChange = (key: string, value: any, filter: (obj: any, value: any) => boolean) => {
        const newFilters = { ...filters, [key]: { value, filter } }
        setFilters(newFilters)
        if (other.handleFilterChange) {
            other.handleFilterChange(newFilters)
        } else {
            const filteredData = filterData(dataToFilter, newFilters)
            onFilterChange?.(filteredData)
        }
    }

    useEffect(() => {
        if (availableFilters && availableFilters.length > 0) {
            const searchParams = new URLSearchParams(search)
            if (searchParams.size <= 0) return
            const newFilters = {}

            searchParams.forEach((value, key) => {
                const filter = availableFilters.find((f) => (f.value || f.label).toLowerCase() === key.toLowerCase())
                if (filter) {
                    newFilters[filter.value || filter.label] = { value, filter: filter.filter }
                }
            })
            setFilters(newFilters)
            if (other.handleFilterChange) {
                other.handleFilterChange(newFilters)
            } else {
                const filteredData = filterData(dataToFilter, newFilters)
                onFilterChange?.(filteredData)
            }
        }
    }, [availableFilters])

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

    useEffect(() => {
        setShowCher(isHovering && isModifierKeyPressed)
    }, [isHovering, isModifierKeyPressed])

    return (
        <SearchProvider onSearchChange={onSearchChange}>
            <div className="@container w-full h-full flex flex-col min-h-1">
                <aside data-scheme="secondary" className="bg-primary p-2 border-b border-primary">
                    <Toolbar elements={toolbarElements} />
                </aside>
                <div className="flex flex-col flex-grow min-h-0">
                    <main
                        data-app="Editor"
                        data-scheme="primary"
                        className="@container flex-1 bg-primary relative h-full"
                    >
                        <SearchBar
                            visible={showSearch}
                            onClose={closeSearch}
                            contentRef={onSearchChange ? undefined : searchContentRef}
                            dataScheme="secondary"
                            className="bg-primary -top-px right-8"
                        />

                        <ScrollArea>
                            {showFilters && availableFilters && availableFilters.length > 0 && (
                                <div className="bg-accent p-2 text-sm border-b border-primary flex gap-1 sticky top-0 z-10 flex-wrap">
                                    {availableFilters?.map((filter, index) => {
                                        return (
                                            <div key={filter.label} className="flex items-center gap-1">
                                                <span>{index === 0 ? 'where' : 'and'}</span>
                                                <span className="text-sm font-bold">{filter.label}</span>
                                                <span className="italic">{filter.operator}</span>
                                                <Select
                                                    disabled={disableFilterChange}
                                                    placeholder={filter.label}
                                                    defaultValue={filter.initialValue || filter.options[0].value}
                                                    key={filter.label}
                                                    groups={[
                                                        {
                                                            label: '',
                                                            items: filter.options.map((option) => ({
                                                                label: option.label,
                                                                value: option.value,
                                                            })),
                                                        },
                                                    ]}
                                                    onValueChange={(value) =>
                                                        handleFilterChange(
                                                            filter.value || filter.label,
                                                            value,
                                                            filter.filter
                                                        )
                                                    }
                                                />
                                            </div>
                                        )
                                    })}
                                    {availableGroups && availableGroups.length > 0 && (
                                        <div className="ml-auto flex items-center space-x-1">
                                            <span className="text-sm font-bold">Group by</span>
                                            <Select
                                                placeholder="Group by"
                                                defaultValue="none"
                                                groups={[
                                                    {
                                                        label: '',
                                                        items: [
                                                            { label: 'None', value: 'none' },
                                                            ...availableGroups.map((group) => ({
                                                                label: group.label,
                                                                value: group.value,
                                                            })),
                                                        ],
                                                    },
                                                ]}
                                                onValueChange={(value) => onGroupChange?.(value)}
                                            />
                                        </div>
                                    )}
                                    {sortOptions && sortOptions.length > 0 && (
                                        <div className="ml-auto flex items-center space-x-2">
                                            <span className="text-sm font-bold">Sort by:</span>
                                            <Select
                                                placeholder="Sort by"
                                                defaultValue={defaultSortValue}
                                                groups={[
                                                    {
                                                        label: '',
                                                        items: sortOptions.map((option) => ({
                                                            label: option.label,
                                                            value: option.value,
                                                        })),
                                                    },
                                                ]}
                                                onValueChange={(value) => onSortChange?.(value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            <article className={`${getProseClasses(proseSize)} p-4 mx-auto max-w-${maxWidth}`}>
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
                        </ScrollArea>
                    </main>
                </div>
            </div>
        </SearchProvider>
    )
}

// Add default export for backward compatibility
export default Editor
