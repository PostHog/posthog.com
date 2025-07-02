import React, { useMemo, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import OSButton from 'components/OSButton'
import {
    IconHome,
    IconSidebarOpen,
    IconSidebarClose,
    IconChevronLeft,
    IconChevronRight,
    IconSearch,
    IconBook,
    IconTableOfContents,
    IconPlay,
    IconBookmark,
    IconBookmarkSolid,
} from '@posthog/icons'
import { useWindow } from '../../context/Window'
import SearchBar from 'components/Editor/SearchBar'
import Tooltip from 'components/RadixUI/Tooltip'
import Toast from 'components/RadixUI/Toast'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'
import Link from 'components/Link'

interface HeaderBarProps {
    isNavVisible?: boolean
    isTocVisible?: boolean
    onToggleNav?: () => void
    onToggleToc?: () => void
    showBack?: boolean
    showForward?: boolean
    showSearch?: boolean
    showToc?: boolean
    showSidebar?: boolean
    hasLeftSidebar?: boolean
    showFullScreen?: boolean
    onFullScreenClick?: () => void
    rightActionButtons?: React.ReactNode
    searchContentRef?: React.RefObject<HTMLElement>
    homeURL?: string
    bookmark?: {
        title: string
        description: string
    }
    onSearch?: (search: string) => void
}

export default function HeaderBar({
    isNavVisible,
    isTocVisible,
    onToggleNav,
    onToggleToc,
    showBack = false,
    showForward = false,
    showSearch = false,
    showToc = false,
    showSidebar = false,
    hasLeftSidebar = false,
    showFullScreen = false,
    onFullScreenClick,
    rightActionButtons,
    searchContentRef,
    homeURL,
    bookmark,
    onSearch,
}: HeaderBarProps) {
    const { user, addBookmark, removeBookmark } = useUser()
    const { addToast } = useToast()
    const { openSignIn } = useApp()
    const { goBack, goForward, canGoBack, canGoForward, appWindow } = useWindow()
    const [searchOpen, setSearchOpen] = useState(false)
    const currentURL = `https://posthog.com${appWindow?.path}`
    const isBookmarked = useMemo(
        () => typeof window !== 'undefined' && user?.profile?.bookmarks?.some((b) => b.url === currentURL),
        [user, appWindow?.path]
    )

    const toggleSearch = () => {
        setSearchOpen(!searchOpen)
    }

    const handleBookmark = async (add: boolean) => {
        if (!user) {
            openSignIn()
            return
        }

        if (bookmark) {
            if (add) {
                await addBookmark({ ...bookmark, url: currentURL })
                addToast({
                    title: 'Bookmark added',
                    description: (
                        <>
                            This page has been added to your{' '}
                            <Link to="/bookmarks" className="text-red dark:text-yellow font-bold">
                                bookmarks
                            </Link>
                            .
                        </>
                    ),
                    onUndo: () => {
                        handleBookmark(false)
                    },
                })
            } else {
                await removeBookmark({ url: currentURL })
                addToast({
                    title: 'Bookmark removed',
                    description: 'This page has been removed from your bookmarks.',
                    onUndo: () => handleBookmark(true),
                })
            }
        }
    }

    return (
        <div data-scheme="secondary" className="bg-primary flex w-full gap-px p-2 flex-shrink-0">
            <div>
                <motion.div
                    className={`flex-shrink-0 overflow-hidden flex items-center gap-px transition-all min-w-0 ${
                        hasLeftSidebar && isNavVisible ? '@2xl:min-w-[250px]' : 'w-auto'
                    }`}
                >
                    {homeURL && <OSButton variant="ghost" icon={<IconHome />} to={homeURL} asLink />}
                    <div className="hidden @2xl:block">
                        {hasLeftSidebar && (
                            <OSButton
                                onClick={onToggleNav}
                                variant="ghost"
                                active={isNavVisible}
                                icon={isNavVisible ? <IconSidebarOpen /> : <IconSidebarClose />}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
            <div className="flex-grow flex justify-between items-center">
                <div className="flex items-center gap-px">
                    {showBack && (
                        <OSButton disabled={!canGoBack} onClick={goBack} variant="ghost" icon={<IconChevronLeft />} />
                    )}
                    {showForward && (
                        <OSButton
                            disabled={!canGoForward}
                            onClick={goForward}
                            variant="ghost"
                            icon={<IconChevronRight />}
                        />
                    )}
                </div>
                <div className="flex items-center gap-px relative">
                    {rightActionButtons}
                    {showSearch && (searchContentRef || onSearch) && (
                        <Tooltip trigger={<OSButton variant="ghost" icon={<IconSearch />} onClick={toggleSearch} />}>
                            Search this page
                        </Tooltip>
                    )}
                    {bookmark?.title && bookmark?.description && (
                        <Tooltip
                            trigger={
                                <OSButton
                                    variant="ghost"
                                    icon={isBookmarked ? <IconBookmarkSolid /> : <IconBookmark />}
                                    onClick={() => handleBookmark(!isBookmarked)}
                                />
                            }
                        >
                            {isBookmarked ? 'Remove from bookmarks' : 'Bookmark this page'}
                        </Tooltip>
                    )}
                    {showSearch && (searchContentRef || onSearch) && (
                        <SearchBar
                            contentRef={searchContentRef}
                            visible={searchOpen}
                            onClose={toggleSearch}
                            onSearch={onSearch}
                            dataScheme="secondary"
                            className="-bottom-2 right-4 translate-y-full bg-primary"
                        />
                    )}
                </div>
            </div>
            {showSidebar && (
                <motion.div
                    className={`flex-shrink-0 flex justify-end transition-all min-w-0 ${
                        isTocVisible ? '@4xl:min-w-[250px]' : 'w-auto'
                    }`}
                    animate={isTocVisible ? 'open' : 'closed'}
                >
                    {showToc && (
                        <div className="hidden @4xl:block [&>span]:inline-block">
                            <Tooltip
                                trigger={
                                    <OSButton
                                        variant="ghost"
                                        icon={<IconTableOfContents />}
                                        active={isTocVisible}
                                        onClick={onToggleToc}
                                    />
                                }
                            >
                                {isTocVisible ? 'Hide' : 'Show'} table of contents
                            </Tooltip>
                        </div>
                    )}
                </motion.div>
            )}
            {showFullScreen && (
                <OSButton
                    onClick={onFullScreenClick}
                    variant="primary"
                    size="sm"
                    disabled={!onFullScreenClick}
                    icon={<IconPlay />}
                />
            )}
        </div>
    )
}
