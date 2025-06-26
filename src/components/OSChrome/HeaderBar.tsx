import React, { useState } from 'react'
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

interface HeaderBarProps {
    isNavVisible?: boolean
    isTocVisible?: boolean
    onToggleNav?: () => void
    onToggleToc?: () => void
    showHome?: boolean
    showBack?: boolean
    showForward?: boolean
    showSearch?: boolean
    showBookmark?: boolean
    showToc?: boolean
    showSidebar?: boolean
    hasLeftSidebar?: boolean
    showFullScreen?: boolean
    onFullScreenClick?: () => void
    rightActionButtons?: React.ReactNode
    searchContentRef?: React.RefObject<HTMLElement>
}

export default function HeaderBar({
    isNavVisible,
    isTocVisible,
    onToggleNav,
    onToggleToc,
    showHome = false,
    showBack = false,
    showForward = false,
    showSearch = false,
    showBookmark = false,
    showToc = false,
    showSidebar = false,
    hasLeftSidebar = false,
    showFullScreen = false,
    onFullScreenClick,
    rightActionButtons,
    searchContentRef,
}: HeaderBarProps) {
    const { goBack, goForward, canGoBack, canGoForward } = useWindow()
    const [searchOpen, setSearchOpen] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    const toggleSearch = () => {
        setSearchOpen(!searchOpen)
    }

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked)
    }

    const handleUndo = () => {
        setIsBookmarked(!isBookmarked)
    }

    return (
        <div data-scheme="secondary" className="bg-primary flex w-full gap-px p-2 flex-shrink-0">
            <div>
                <motion.div
                    className={`flex-shrink-0 overflow-hidden flex items-center gap-px transition-all min-w-0 ${
                        hasLeftSidebar && isNavVisible ? '@2xl:min-w-[250px]' : 'w-auto'
                    }`}
                >
                    {showHome && <OSButton variant="ghost" icon={<IconHome />} />}
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
                    {showSearch && searchContentRef && (
                        <Tooltip trigger={<OSButton variant="ghost" icon={<IconSearch />} onClick={toggleSearch} />}>
                            Search this page
                        </Tooltip>
                    )}
                    {showBookmark && (
                        <Toast
                            description={() =>
                                !isBookmarked
                                    ? 'This page has been saved to your bookmarks.'
                                    : 'This page has been removed from your bookmarks.'
                            }
                            onUndo={handleUndo}
                        >
                            <Tooltip
                                trigger={
                                    <OSButton
                                        variant="ghost"
                                        icon={isBookmarked ? <IconBookmarkSolid /> : <IconBookmark />}
                                        onClick={handleBookmark}
                                    />
                                }
                            >
                                {isBookmarked ? 'Remove from bookmarks' : 'Bookmark this page'}
                            </Tooltip>
                        </Toast>
                    )}
                    {showSearch && searchContentRef && (
                        <SearchBar
                            contentRef={searchContentRef}
                            visible={searchOpen}
                            onClose={toggleSearch}
                            dataScheme="secondary"
                            className="-bottom-2 right-4 translate-y-full bg-primary"
                        />
                    )}
                </div>
            </div>
            {showSidebar && (
                <motion.div
                    className={`flex-shrink-0 flex justify-end transition-all min-w-0 ${
                        isTocVisible ? '@4xl:min-w-[300px]' : 'w-auto'
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
