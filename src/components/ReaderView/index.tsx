import React, { useState, useCallback } from 'react'
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
} from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { IconTextWidth } from '@posthog/icons'
import { IconTextWidthFixed, IconTableOfContents, IconClockRewind } from 'components/OSIcons'
import { ToggleGroup, Popover } from 'radix-ui'
import { useLayoutData } from 'components/Layout/hooks'
import Link from 'components/Link'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

interface SidebarState {
    isOpen: boolean
    width: number
}

const leftSidebarWidth = '250px'
const rightSidebarWidth = '300px'

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

const toggleGroupItemClasses =
    'flex p-1 aspect-square items-center justify-center bg-white leading-4 text-primary dark:text-primary-dark rounded hover:bg-accent-2 dark:hover:bg-accent-dark focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none data-[state=on]:bg-accent-2 data-[state=on]:bg-accent-2'

const TextWidthToggleGroup = () => (
    <ToggleGroup.Root
        className="inline-flex space-x-px rounded p-1 bg-white dark:bg-accent-dark border border-light dark:border-dark"
        type="single"
        defaultValue="fixed"
        aria-label="Content width"
    >
        <ToggleGroup.Item className={toggleGroupItemClasses} value="fixed" aria-label="Fixed width">
            <IconTextWidthFixed className="size-5 inline-block" />
        </ToggleGroup.Item>
        <ToggleGroup.Item className={toggleGroupItemClasses} value="full" aria-label="Full width">
            <IconTextWidth className="size-5" />
        </ToggleGroup.Item>
    </ToggleGroup.Root>
)

interface ReaderViewProps {
    body: {
        type: 'mdx' | 'plain'
        content: string
    }
    title: string
}

export default function ReaderView({ body, title }: ReaderViewProps) {
    const [isNavVisible, setIsNavVisible] = useState(true)
    const [isTocVisible, setIsTocVisible] = useState(true)
    const { fullWidthContent } = useLayoutData()

    const toggleNav = useCallback(() => {
        setIsNavVisible((prev) => !prev)
    }, [])

    const toggleToc = useCallback(() => {
        setIsTocVisible((prev) => !prev)
    }, [])

    return (
        <div className="@container w-full h-full flex flex-col bg-light dark:bg-dark min-h-1">
            <DebugContainerQuery />
            {/* First row - Header */}
            <div className="flex w-full gap-px p-2 flex-shrink-0">
                <motion.div
                    className="flex-shrink-0 overflow-hidden flex items-center gap-px"
                    variants={sidebarVariants}
                    custom={leftSidebarWidth}
                    animate={isNavVisible ? 'open' : 'closed'}
                >
                    <OSButton variant="ghost" icon={<IconHome />} />
                    <OSButton
                        onClick={toggleNav}
                        variant="ghost"
                        active={isNavVisible}
                        icon={isNavVisible ? <IconSidebarOpen /> : <IconSidebarClose />}
                    />
                </motion.div>
                <div className="flex-grow dark:bg-accent-dark flex justify-between items-center">
                    <div className="flex items-center gap-px">
                        <OSButton variant="ghost" icon={<IconChevronLeft />} />
                        <OSButton variant="ghost" icon={<IconChevronRight />} />
                    </div>
                    <div>
                        <OSButton variant="ghost" icon={<IconSearch />} />
                    </div>
                </div>
                <motion.div
                    className="flex-shrink-0 flex justify-end"
                    variants={sidebarVariants}
                    custom={rightSidebarWidth}
                    animate={isTocVisible ? 'open' : 'closed'}
                >
                    <div className="hidden @4xl:block">
                        <OSButton
                            variant="ghost"
                            active={isTocVisible}
                            icon={<IconTableOfContents />}
                            onClick={toggleToc}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Second row - Main Content */}
            <div className="flex w-full gap-2 min-h-0 flex-grow overflow-hidden">
                <AnimatePresence>
                    {isNavVisible && (
                        <motion.div
                            id="nav"
                            className="flex-shrink-0 overflow-hidden"
                            initial={{ width: 0 }}
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
                                initial={{ opacity: 0 }}
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
                                    <p>
                                        In ut tortor eget enim posuere tristique. Sed tortor orci, dignissim at diam eu,
                                        dictum mattis arcu. Pellentesque vel condimentum nulla, at pretium augue. Mauris
                                        pellentesque bibendum cursus. Phasellus vitae mauris vehicula, condimentum diam
                                        sit amet, condimentum nisi. Suspendisse eleifend ante consequat odio euismod,
                                        non ultricies ipsum sagittis. Maecenas quis nisi rutrum, feugiat nunc eget,
                                        convallis velit.
                                    </p>
                                    <p>
                                        In ut tortor eget enim posuere tristique. Sed tortor orci, dignissim at diam eu,
                                        dictum mattis arcu. Pellentesque vel condimentum nulla, at pretium augue. Mauris
                                        pellentesque bibendum cursus. Phasellus vitae mauris vehicula, condimentum diam
                                        sit amet, condimentum nisi. Suspendisse eleifend ante consequat odio euismod,
                                        non ultricies ipsum sagittis. Maecenas quis nisi rutrum, feugiat nunc eget,
                                        convallis velit.
                                    </p>
                                </ScrollArea>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <ScrollArea className="flex-grow bg-white dark:bg-accent-dark rounded">
                    <div className={`p-4 mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-xl'}`}>
                        <h2>{title}</h2>
                        <div className="@4xl:hidden bg-tan p-4 mb-4 rounded border border-light dark:border-dark">
                            inline table of contents
                        </div>
                        {body.type === 'mdx' ? (
                            <div className={'article-content'}>
                                <MDXProvider components={{}}>
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
                            initial={{ width: 0 }}
                            animate={{
                                width: rightSidebarWidth,
                                transition: { duration: 0.2 },
                            }}
                            exit={{
                                width: 0,
                                transition: { duration: 0.2, delay: 0.05 },
                            }}
                        >
                            <motion.div
                                className="h-full"
                                initial={{ opacity: 0 }}
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
                                    <p>
                                        In ut tortor eget enim posuere tristique. Sed tortor orci, dignissim at diam eu,
                                        dictum mattis arcu. Pellentesque vel condimentum nulla, at pretium augue. Mauris
                                        pellentesque bibendum cursus. Phasellus vitae mauris vehicula, condimentum diam
                                        sit amet, condimentum nisi. Suspendisse eleifend ante consequat odio euismod,
                                        non ultricies ipsum sagittis. Maecenas quis nisi rutrum, feugiat nunc eget,
                                        convallis velit.
                                    </p>
                                    <p>
                                        In ut tortor eget enim posuere tristique. Sed tortor orci, dignissim at diam eu,
                                        dictum mattis arcu. Pellentesque vel condimentum nulla, at pretium augue. Mauris
                                        pellentesque bibendum cursus. Phasellus vitae mauris vehicula, condimentum diam
                                        sit amet, condimentum nisi. Suspendisse eleifend ante consequat odio euismod,
                                        non ultricies ipsum sagittis. Maecenas quis nisi rutrum, feugiat nunc eget,
                                        convallis velit.
                                    </p>
                                </ScrollArea>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Third row - Footer */}
            <div className="flex w-full gap-px p-2 flex-shrink-0">
                <motion.div
                    className="flex-shrink-0"
                    variants={sidebarVariants}
                    custom={leftSidebarWidth}
                    animate={isNavVisible ? 'open' : 'closed'}
                >
                    home, sidebar
                </motion.div>
                <div className="flex-grow dark:bg-accent-dark flex justify-between">
                    <div>Questions?</div>
                    <div>
                        <TextWidthToggleGroup />
                    </div>
                </div>
                <motion.div
                    className="flex-shrink-0 flex justify-end"
                    variants={sidebarVariants}
                    custom={rightSidebarWidth}
                    animate={isTocVisible ? 'open' : 'closed'}
                >
                    <OSButton variant="ghost" icon={<IconPencil />} />

                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <button
                                className="inline-flex size-[35px] cursor-default items-center justify-center outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                                aria-label="Update dimensions"
                            >
                                <OSButton variant="ghost" icon={<IconClockRewind />} />
                            </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content
                                className="w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                                sideOffset={5}
                            >
                                <div className="flex flex-col gap-2.5">
                                    <p className="mb-0">Edit history</p>

                                    <div className="flex gap-2 justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <div className="size-8 bg-accent rounded-full" />
                                            </div>
                                            <div className="text-sm">
                                                <Link href="#">Ian Vanagas</Link>
                                            </div>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <div className="text-xs opacity-60">2 days ago</div>
                                            <div>
                                                <Link href="#" externalNoIcon>
                                                    <IconPullRequest className="size-4 relative top-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Popover.Close
                                    className="absolute right-[5px] top-[5px] inline-flex size-[25px] cursor-default items-center justify-center rounded-full text-violet11 outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
                                    aria-label="Close"
                                >
                                    <IconX />
                                </Popover.Close>
                                <Popover.Arrow className="fill-white" />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </motion.div>
            </div>
        </div>
    )
}
