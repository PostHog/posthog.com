import React from 'react'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { productMenu } from '../../navs'
import { Accordion } from '../RadixUI/Accordion'
import { useWindow } from '../../context/Window'
import { getProseClasses } from '../../constants'

interface AccordionItem {
    title: string
    content: React.ReactNode
}

interface ExplorerProps {
    template: 'generic' | 'product' | 'feature'
    slug: string
    title: string
    accentImage?: React.ReactNode
    sidebarContent?: React.ReactNode | AccordionItem[]
    children?: React.ReactNode
    fullScreen?: boolean
    showTitle?: boolean
    padding?: boolean
}

const SidebarContent = ({ content }: { content: React.ReactNode | AccordionItem[] }) => {
    if (!content) return null

    if (Array.isArray(content)) {
        return content.map((item, index) => (
            <Accordion
                key={index}
                data-scheme="primary"
                className=""
                defaultValue="item-0"
                items={[
                    {
                        trigger: item.title,
                        content: item.content,
                    },
                ]}
            />
        ))
    }

    return content
}

export default function Explorer({
    template,
    slug,
    title,
    accentImage,
    sidebarContent,
    children,
    fullScreen = false,
    showTitle = true,
    padding = true,
}: ExplorerProps) {
    const { appWindow } = useWindow()
    const currentPath = appWindow?.path?.replace(/^\//, '') // Remove leading slash

    // Get the base product slug (everything before the first slash)
    const baseSlug = slug.split('/')[0]

    const selectOptions = [
        {
            label: 'Products',
            items: [
                { value: 'products', label: 'Products', icon: productMenu.icon, color: productMenu.color },
                ...productMenu.children.flatMap((item) => {
                    // Add the base product
                    const options = [
                        {
                            value: item.slug,
                            label: item.name,
                            icon: item.icon,
                            color: item.color,
                        },
                    ]

                    // Add subpage option if this is the current product and we're on a subpage
                    if (template === 'product' && item.slug === baseSlug && title && currentPath !== item.slug) {
                        options.push({
                            value: currentPath,
                            label: `${item.name} → ${title}`,
                            icon: item.icon,
                            color: item.color,
                        })
                    }

                    return options
                }),
            ],
        },
    ]

    const handleValueChange = (value: string) => {
        navigate(`/${value}`)
    }

    const ContentWrapper = appWindow?.size?.width && appWindow.size.width <= 768 ? ScrollArea : React.Fragment

    return (
        <div className="@container w-full h-full flex flex-col min-h-1">
            {!fullScreen && (
                <>
                    <HeaderBar showHome showBack showForward showSearch />
                    <div data-scheme="secondary" className="bg-primary px-2 pb-2 border-b border-primary">
                        <Select
                            groups={selectOptions}
                            placeholder="Select..."
                            ariaLabel="Products"
                            defaultValue={currentPath}
                            onValueChange={handleValueChange}
                            className="w-full"
                            dataScheme="primary"
                        />
                    </div>
                </>
            )}
            {/* <DebugContainerQuery /> */}
            <ContentWrapper>
                <div
                    data-scheme="secondary"
                    className={`flex flex-col @3xl:flex-row-reverse flex-grow min-h-0 ${
                        fullScreen ? 'border-t border-primary' : ''
                    }`}
                >
                    <main
                        data-app="Explorer"
                        data-scheme="primary"
                        className="@container flex-1 bg-primary relative h-full"
                    >
                        {fullScreen ? (
                            children
                        ) : (
                            <ScrollArea className="h-full">
                                {/* <DebugContainerQuery /> */}
                                {accentImage && (
                                    <div className="absolute right-0 top-6">
                                        <div className="relative max-w-md @4xl:max-w-lg @5xl:max-w-xl @6xl:max-w-2xl transition-all duration-700 ease-out opacity-25 @xl:opacity-50">
                                            {accentImage}
                                            <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[var(--bg)] to-[color-mix(in_srgb,var(--bg)_0%,transparent)]" />
                                            <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-b from-[color-mix(in_srgb,var(--bg)_0%,transparent)] to-[var(--bg)]" />
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`${getProseClasses()} max-w-none h-full ${
                                        padding ? 'relative p-4' : ''
                                    }`}
                                >
                                    {!fullScreen && showTitle && <h1>{title}</h1>}
                                    {children}
                                </div>
                            </ScrollArea>
                        )}
                    </main>
                    {sidebarContent && (
                        <aside data-scheme="secondary" className="w-64 bg-primary border-r border-primary h-full">
                            <ScrollArea className="p-2">
                                <div className="space-y-3">
                                    <SidebarContent content={sidebarContent} />
                                </div>
                            </ScrollArea>
                        </aside>
                    )}
                </div>
            </ContentWrapper>
        </div>
    )
}
