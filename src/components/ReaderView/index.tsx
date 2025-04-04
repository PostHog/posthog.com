import React, { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OSButton from 'components/OSButton'
import {
    IconHome,
    IconSidebarOpen,
    IconSidebarClose,
    IconChevronLeft,
    IconChevronRight,
    IconSearch,
    IconPencil,
    IconX,
    IconPullRequest,
    IconTextWidth,
    IconGear,
    IconInfo,
} from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { IconClockRewind, IconTextWidthFixed } from 'components/OSIcons'
import { Select } from '../RadixUI/Select'
import { Popover } from '../RadixUI/Popover'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { useLayoutData } from 'components/Layout/hooks'
import Link from 'components/Link'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import InternalSidebarLink from 'components/Docs/InternalSidebarLink'
import HeaderBar from 'components/OSChrome/HeaderBar'
import ElementScrollLink, { ScrollSpyProvider } from 'components/ElementScrollLink'
import { useLocation } from '@reach/router'
import menu from '../../navs'
import { TreeMenu } from 'components/TreeMenu'
import { Fieldset } from 'components/OSFieldset'
import SliderDemo from 'components/RadixUI/Slider'
import TooltipDemo from 'components/RadixUI/Tooltip'

interface SidebarState {
    isOpen: boolean
    width: number
}

const leftSidebarWidth = '250px'

const sidebarVariants = {
    open: (width: string) => ({
        width: width,
        transition: {
            width: { duration: 0.2 },
        },
    }),
    closed: {
        width: 'auto',
        transition: {
            width: { duration: 0.2 },
        },
    },
}

interface ReaderViewProps {
    body: {
        type: 'mdx' | 'plain'
        content: string
    }
    title: string
    tableOfContents: any
    mdxComponents?: any
}

const selectOptions = [
    {
        label: 'Products',
        items: [
            { value: 'product-os', label: 'Product OS' },
            { value: 'product-analytics', label: 'Product Analytics' },
            { value: 'web-analytics', label: 'Web Analytics' },
            { value: 'session-replay', label: 'Session Replay' },
            { value: 'feature-flags', label: 'Feature Flags' },
            { value: 'experiments', label: 'Experiments' },
            { value: 'surveys', label: 'Surveys' },
            { value: 'data-warehouse', label: 'Data Warehouse' },
            { value: 'cdp', label: 'Data Pipelines' },
            { value: 'ai-engineering', label: 'LLM Observability' },
            { value: 'error-tracking', label: 'Error Tracking' },
        ],
    },
    {
        label: 'Roadmap',
        items: [
            { value: 'product-tours', label: 'Product Tours', disabled: true },
            { value: 'revenue-analytics', label: 'Revenue Analytics', disabled: true },
            { value: 'crm', label: 'CRM', disabled: true },
            { value: 'messaging', label: 'Messaging', disabled: true },
        ],
    },
]

function recursiveSearch(array, value) {
    for (let i = 0; i < array?.length || 0; i++) {
        const element = array[i]

        if (typeof element === 'string' && element.split('?')[0] === value) {
            return true
        }

        if (typeof element === 'object' && element !== null) {
            const found = recursiveSearch(Object.values(element), value)
            if (found) {
                return true
            }
        }
    }

    return false
}

const backgroundImageOptions: ToggleOption[] = [
    {
        label: 'None',
        value: 'none',
        // icon: <IconLaptop className="size-5" />,
        default: true,
    },
    {
        label: '2',
        value: '2',
        // icon: <IconDay className="size-5" />,
    },
    {
        label: '3',
        value: '3',
        // icon: <IconNight className="size-5" />,
    },
]

const AppOptionsButton = () => {
    return (
        <Popover
            title="Options"
            dataScheme="secondary"
            trigger={<IconGear className="size-5" />}
            contentClassName="w-80"
        >
            <div className="w-full h-full bg-primary text-primary space-y-2">
                <Fieldset legend="Paragraphs">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="text-[15px]">Line height</label>
                        <SliderDemo />
                    </div>
                </Fieldset>

                <Fieldset legend="Why not?">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="pt-1.5 text-[15px]">Background image</label>
                        <ToggleGroup title="Background image" options={backgroundImageOptions} />
                    </div>
                </Fieldset>

                <p className="text-[13px]">
                    Toggle light/dark mode in{' '}
                    <span className="inline-flex items-center gap-0.5">
                        <button className="font-semibold underline">desktop settings</button>
                        <TooltipDemo trigger={<IconInfo className="size-4" />}>Lower right!</TooltipDemo>
                    </span>
                </p>
            </div>
        </Popover>
    )
}

const textWidthOptions: ToggleOption[] = [
    {
        label: 'Fixed width',
        value: 'fixed',
        icon: <IconTextWidthFixed className="size-5 inline-block" />,
        default: true,
    },
    {
        label: 'Full width',
        value: 'full',
        icon: <IconTextWidth className="size-5" />,
    },
]

export default function ReaderView({ body, title, tableOfContents, mdxComponents }: ReaderViewProps) {
    const [isNavVisible, setIsNavVisible] = useState(true)
    const [isTocVisible, setIsTocVisible] = useState(true)
    const contentRef = useRef(null)
    const { fullWidthContent } = useLayoutData()
    const { pathname, search } = useLocation()

    const toggleNav = useCallback(() => {
        setIsNavVisible((prev) => !prev)
    }, [])

    const toggleToc = useCallback(() => {
        setIsTocVisible((prev) => !prev)
    }, [])

    const parent = menu.find(({ children, url }) => {
        const currentURL = pathname
        return currentURL === url.split('?')[0] || recursiveSearch(children, currentURL)
    })

    const internalMenu = parent?.children

    const [activeInternalMenu, setActiveInternalMenu] = useState(
        internalMenu?.find((menuItem) => {
            const currentURL = pathname
            return currentURL === menuItem.url?.split('?')[0] || recursiveSearch(menuItem.children, currentURL)
        })
    )

    return (
        <div className="@container w-full h-full flex flex-col">
            <DebugContainerQuery />
            {/* First row - Header */}
            <HeaderBar
                sidebarVariants={sidebarVariants}
                leftSidebarWidth={leftSidebarWidth}
                isNavVisible={isNavVisible}
                isTocVisible={isTocVisible}
                onToggleNav={toggleNav}
                onToggleToc={toggleToc}
                showHome
                showBack
                showForward
                showSearch
                showBookmark
                showToc
                showSidebar
            />
            {/* Second row - Main Content */}
            <div data-scheme="secondary" className="bg-primary flex w-full gap-2 min-h-0 flex-grow">
                <AnimatePresence>
                    {isNavVisible && (
                        <motion.div
                            id="nav"
                            className="flex-shrink-0 overflow-hidden mb-[-53px]"
                            initial={{ width: leftSidebarWidth }}
                            animate={{
                                width: leftSidebarWidth,
                                transition: { duration: 0.2 },
                            }}
                            exit={{
                                width: 0,
                                transition: { duration: 0.2, delay: 0.05 },
                            }}
                        >
                            <motion.div
                                className="h-full"
                                initial={{ opacity: 1 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.05, delay: 0.2 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.05 },
                                }}
                            >
                                <ScrollArea className="px-4">
                                    <Select
                                        groups={[
                                            {
                                                label: null,
                                                items: parent.children?.map((menuItem) => {
                                                    return {
                                                        value: menuItem,
                                                        label: menuItem.name,
                                                        icon: menuItem.icon,
                                                        color: menuItem.color,
                                                    }
                                                }),
                                            },
                                        ]}
                                        placeholder="Select..."
                                        ariaLabel="Products"
                                        className="w-full mb-2"
                                        value={activeInternalMenu}
                                        onValueChange={(value) => setActiveInternalMenu(value)}
                                    />
                                    <TreeMenu items={activeInternalMenu.children} />
                                </ScrollArea>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <ScrollArea dataScheme="primary" className="bg-primary border border-primary flex-grow rounded">
                    <div
                        ref={contentRef}
                        className={`p-4 mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-xl'}`}
                    >
                        <h2>{title}</h2>
                        <div
                            data-scheme="secondary"
                            className="@4xl:hidden p-4 mb-4 bg-primary rounded border border-primary"
                        >
                            inline table of contents
                        </div>
                        {body.type === 'mdx' ? (
                            <div className={'article-content'}>
                                <MDXProvider components={mdxComponents}>
                                    <MDXRenderer>{body.content}</MDXRenderer>
                                </MDXProvider>
                            </div>
                        ) : (
                            body.content
                        )}
                    </div>
                </ScrollArea>
                <AnimatePresence>
                    {isTocVisible && (
                        <motion.div
                            id="toc"
                            className="hidden @4xl:block flex-shrink-0 overflow-hidden"
                            initial={{ width: '300px' }}
                            animate={{
                                width: '300px',
                                transition: { duration: 0.2 },
                            }}
                            exit={{
                                width: 0,
                                transition: { duration: 0.2, delay: 0.05 },
                            }}
                        >
                            <motion.div
                                className="h-full"
                                initial={{ opacity: 1 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.05, delay: 0.2 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.05 },
                                }}
                            >
                                <ScrollArea className="px-4" fadeOverflow>
                                    {tableOfContents && tableOfContents?.length > 0 && (
                                        <ScrollSpyProvider>
                                            <div>
                                                <h4 className="font-semibold text-muted m-0 mb-1 text-sm">Jump to:</h4>
                                                <ul className="list-none m-0 p-0 flex flex-col">
                                                    {tableOfContents.map((navItem) => {
                                                        return (
                                                            <li className="relative leading-none m-0" key={navItem.url}>
                                                                <ElementScrollLink
                                                                    id={navItem.url}
                                                                    label={navItem.value}
                                                                    className={`text-sm text-muted hover:text-primary py-1 block relative active:top-px active:scale-[.99]`}
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
                                    )}
                                </ScrollArea>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Third row - Footer */}
            <div data-scheme="secondary" className="bg-primary flex w-full gap-px p-2 flex-shrink-0">
                <motion.div
                    className="flex-shrink-0"
                    variants={sidebarVariants}
                    custom={leftSidebarWidth}
                    animate={isNavVisible ? 'open' : 'closed'}
                    initial={{ width: leftSidebarWidth }}
                >
                    {/* this space intentionally left blank */}
                </motion.div>
                <div className="flex-grow flex justify-between items-center">
                    <div>Questions?</div>
                    <div>
                        <AppOptionsButton />
                    </div>
                </div>
                <motion.div
                    className={`flex-shrink-0 flex justify-end transition-all min-w-0 ${
                        isTocVisible ? '@4xl:min-w-[300px]' : 'w-auto'
                    }`}
                    animate={isTocVisible ? 'open' : 'closed'}
                >
                    <OSButton variant="ghost" icon={<IconPencil />} />

                    <Popover
                        trigger={
                            <span>
                                <OSButton variant="ghost" icon={<IconClockRewind />} />
                            </span>
                        }
                        title="Edit history"
                        dataScheme="secondary"
                        contentClassName="w-[260px]"
                    >
                        <div className="flex gap-2 justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="size-8 bg-accent rounded-full" />
                                </div>
                                <div className="text-sm">
                                    <Link to="#">Ian Vanagas</Link>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <div className="text-xs opacity-60">2 days ago</div>
                                <div>
                                    <Link to="#" externalNoIcon>
                                        <IconPullRequest className="size-4 relative top-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Popover>
                </motion.div>
            </div>
        </div>
    )
}
