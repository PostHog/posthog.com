import React from 'react'
import { motion, Variants } from 'framer-motion'
import OSButton from 'components/OSButton'
import { IconTableOfContents } from 'components/OSIcons'

import {
    IconHome,
    IconSidebarOpen,
    IconSidebarClose,
    IconChevronLeft,
    IconChevronRight,
    IconSearch,
    IconBook,
} from '@posthog/icons'
import { useWindow } from '../../context/Window'
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
}: HeaderBarProps) {
    const { goBack, goForward, canGoBack, canGoForward } = useWindow()
    return (
        <div
            data-scheme="secondary"
            className="bg-primary border-t border-primary flex w-full gap-px p-2 flex-shrink-0"
        >
            <div>
                <motion.div
                    className={`flex-shrink-0 overflow-hidden flex items-center gap-px transition-all min-w-0 ${
                        isNavVisible ? '@2xl:min-w-[250px]' : 'w-auto'
                    }`}
                >
                    {showHome && <OSButton variant="ghost" icon={<IconHome />} />}
                    <div className="hidden @2xl:block">
                        {showSidebar && (
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
                <div className="flex items-center gap-px">
                    {showSearch && <OSButton variant="ghost" icon={<IconSearch />} />}
                    {showBookmark && <OSButton variant="ghost" icon={<IconBook />} />}
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
                        <div className="hidden @4xl:block">
                            <OSButton
                                variant="ghost"
                                active={isTocVisible}
                                icon={<IconTableOfContents />}
                                onClick={onToggleToc}
                            />
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    )
}
