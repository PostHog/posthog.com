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
    filters?: {
        products?: string[]
        [key: string]: any
    }
    onSearchChange?: (query: string) => void
}

const toolbarElementsBase: ToolbarElement[] = [
    {
        type: 'multiple',
        label: 'Text formatting',
        items: [
            {
                value: 'undo',
                label: 'Undo',
                icon: <ReloadIcon className="scale-x-[-1]" />,
                disabled: true,
            },
            {
                value: 'redo',
                label: 'Redo',
                icon: <ReloadIcon />,
                disabled: true,
            },
        ],
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
        type: 'multiple',
        label: 'Text formatting',
        items: [
            {
                value: 'bold',
                label: 'Bold',
                icon: <FontBoldIcon />,
                disabled: true,
            },
            {
                value: 'italic',
                label: 'Italic',
                icon: <FontItalicIcon />,
                disabled: true,
            },
            {
                value: 'strikethrough',
                label: 'Strikethrough',
                icon: <StrikethroughIcon />,
                disabled: true,
            },
        ],
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
]

export function Editor({ title, type, children, filters, maxWidth = '3xl', onSearchChange }: EditorProps) {
    const [showFilters, setShowFilters] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const products = useProduct() as { slug: string; name: string; type: string }[]
    // take the product name passed in and check the useProduct hook to get the product's display name
    const getProductName = (type: string) => products.find((p) => p.type === type)?.name || type
    // if we're filtering to a product, show the filter button in an active/open state
    const filterKeys = filters
        ? Object.keys(filters).filter(
              (k) =>
                  filters[k] !== undefined &&
                  filters[k] !== null &&
                  (Array.isArray(filters[k]) ? filters[k].length > 0 : true)
          )
        : []

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }

    const closeSearch = () => {
        setShowSearch(false)
    }

    const toolbarElements = [
        ...toolbarElementsBase,
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
                    <OSButton
                        variant="ghost"
                        size="sm"
                        active={showFilters}
                        icon={<Icons.IconFilter />}
                        onClick={() => setShowFilters(!showFilters)}
                    />
                    <OSButton variant="primary" size="xs">
                        Share
                    </OSButton>
                </>
            ),
        },
    ]

    return (
        <SearchProvider onSearchChange={onSearchChange}>
            <div className="@container w-full h-full flex flex-col min-h-1">
                <aside data-scheme="secondary" className="bg-primary p-2 border-b border-border">
                    <Toolbar elements={toolbarElements} />
                </aside>
                <div className="flex flex-col flex-grow min-h-0">
                    <main data-scheme="primary" className="@container flex-1 bg-primary relative h-full">
                        <SearchBar visible={showSearch} onClose={closeSearch} />
                        {showFilters && (
                            <div className="bg-accent dark:bg-accent-dark p-2 text-sm border-b border-border dark:border-border-dark">
                                filters go here
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
