import React, { useState, useEffect, useCallback } from 'react'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import * as Icons from '@posthog/icons'
import { Link, navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { productMenu } from '../../navs'
import { Accordion } from '../RadixUI/Accordion'
import { FileMenu } from '../RadixUI/FileMenu'
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
import { IconSearch, IconMessage, IconX } from '@posthog/icons'
import { IconLink } from '../OSIcons/Icons'
import useProduct from 'hooks/useProduct'
import { SearchProvider } from './SearchProvider'
import { SearchBar } from './SearchBar'

interface EditorProps {
    slug?: string
    title: string
    type?: string
    maxWidth?: string
    children?: React.ReactNode
    availableFilters?: {
        label: string
        options: {
            label: string
            value: any
        }[]
        onChange?: (value: string) => void
        operator: string
        filter: (obj: any, key: string, value: any) => boolean
    }[]
    onSearchChange?: (query: string) => void
    showFilters?: boolean
    disableFilterChange?: boolean
    dataToFilter?: any
    onFilterChange?: (data: any) => void
    onUndo?: () => void
    onRedo?: () => void
    actionButtons?: EditorActionButtons
}

type EditorAction = 'bold' | 'italic' | 'strikethrough' | 'undo' | 'redo'

type EditorActionButtons = Partial<Record<EditorAction, EditorActionButton>>

type EditorActionButton = {
    onClick: () => void
    active?: boolean
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
    onUndo,
    onRedo,
    actionButtons,
}: EditorProps) {
    const [showFilters, setShowFilters] = useState(initialShowFilters)
    const [showSearch, setShowSearch] = useState(false)
    const [filters, setFilters] = useState({})
    const products = useProduct() as { slug: string; name: string; type: string }[]
    // take the product name passed in and check the useProduct hook to get the product's display name
    const getProductName = (type: string) => products.find((p) => p.type === type)?.name || type
    // if we're filtering to a product, show the filter button in an active/open state

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
        },
        {
            type: 'button',
            label: 'Redo',
            icon: <ReloadIcon />,
            hideLabel: true,
            onClick: actionButtons?.redo?.onClick,
            active: actionButtons?.redo?.active,
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
        },
        {
            type: 'button',
            label: 'Italic',
            icon: <FontItalicIcon />,
            hideLabel: true,
            onClick: actionButtons?.italic?.onClick,
            active: actionButtons?.italic?.active,
        },
        {
            type: 'button',
            label: 'Strikethrough',
            icon: <StrikethroughIcon />,
            hideLabel: true,
            onClick: actionButtons?.strikethrough?.onClick,
            active: actionButtons?.strikethrough?.active,
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
            type: 'single',
            label: 'Text alignment',
            defaultValue: 'left',
            items: [
                {
                    value: 'left',
                    label: 'Left',
                    icon: <TextAlignLeftIcon />,
                    disabled: true,
                },
                {
                    value: 'center',
                    label: 'Center',
                    icon: <TextAlignCenterIcon />,
                    disabled: true,
                },
                {
                    value: 'right',
                    label: 'Right',
                    icon: <TextAlignRightIcon />,
                    disabled: true,
                },
            ],
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
                        icon={<Icons.IconSearch />}
                        onClick={toggleSearch}
                    />
                    {availableFilters && availableFilters.length > 0 && (
                        <OSButton
                            variant="ghost"
                            size="sm"
                            active={showFilters}
                            icon={<Icons.IconFilter />}
                            onClick={() => setShowFilters(!showFilters)}
                        />
                    )}
                    <OSButton variant="primary" size="xs">
                        Share
                    </OSButton>
                </>
            ),
        },
    ]

    const handleFilterChange = (key: string, value: any, filter: (obj: any, value: any) => boolean) => {
        const newFilters = { ...filters, [key]: { value, filter } }
        setFilters(newFilters)
        const filteredData = filterData(dataToFilter, newFilters)
        onFilterChange?.(filteredData)
    }

    return (
        <SearchProvider onSearchChange={onSearchChange}>
            <div className="@container w-full h-full flex flex-col min-h-1">
                <aside data-scheme="secondary" className="bg-primary p-2 border-b border-border">
                    <Toolbar elements={toolbarElements} />
                </aside>
                <div className="flex flex-col flex-grow min-h-0">
                    <main data-scheme="primary" className="@container flex-1 bg-primary relative h-full">
                        <SearchBar visible={showSearch} onClose={closeSearch} />
                        {showFilters && availableFilters && availableFilters.length > 0 && (
                            <div className="bg-accent dark:bg-accent-dark p-2 text-sm border-b border-border dark:border-border-dark flex gap-1">
                                {availableFilters?.map((filter, index) => {
                                    return (
                                        <div key={filter.label} className="flex items-center gap-1">
                                            <span>{index === 0 ? 'where' : 'and'}</span>
                                            <span className="text-sm font-bold">{filter.label}</span>
                                            <span className="italic">{filter.operator}</span>
                                            <Select
                                                disabled={disableFilterChange}
                                                placeholder={filter.label}
                                                defaultValue={filter.options[0].value}
                                                key={filter.label}
                                                groups={[
                                                    {
                                                        label: filter.label,
                                                        items: filter.options.map((option) => ({
                                                            label: option.label,
                                                            value: option.value,
                                                        })),
                                                    },
                                                ]}
                                                onValueChange={(value) =>
                                                    handleFilterChange(filter.label, value, filter.filter)
                                                }
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        <ScrollArea>
                            <div className={`p-4 mx-auto max-w-${maxWidth}`}>
                                <h1 className="text-2xl font-bold">
                                    {title}
                                    {type && <span className="opacity-40">.{type}</span>}
                                </h1>
                                {children}
                            </div>
                        </ScrollArea>
                    </main>
                </div>
            </div>
        </SearchProvider>
    )
}

// Add default export for backward compatibility
export default Editor
