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

interface HeaderBarProps {
    sidebarVariants?: Variants
    leftSidebarWidth?: string
    rightSidebarWidth?: string
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
}

export default function HeaderBar({
    sidebarVariants,
    leftSidebarWidth,
    rightSidebarWidth,
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
}: HeaderBarProps) {
    return (
        <div className="flex w-full gap-px p-2 flex-shrink-0">
            <motion.div
                className="flex-shrink-0 overflow-hidden flex items-center gap-px"
                variants={sidebarVariants}
                custom={leftSidebarWidth}
                animate={isNavVisible ? 'open' : 'closed'}
            >
                {showHome && <OSButton variant="ghost" icon={<IconHome />} />}
                <OSButton
                    onClick={onToggleNav}
                    variant="ghost"
                    active={isNavVisible}
                    icon={isNavVisible ? <IconSidebarOpen /> : <IconSidebarClose />}
                />
            </motion.div>
            <div className="flex-grow flex justify-between items-center">
                <div className="flex items-center gap-px">
                    {showBack && <OSButton variant="ghost" icon={<IconChevronLeft />} />}
                    {showForward && <OSButton variant="ghost" icon={<IconChevronRight />} />}
                </div>
                <div className="flex items-center gap-px">
                    {showSearch && <OSButton variant="ghost" icon={<IconSearch />} />}
                    {showBookmark && <OSButton variant="ghost" icon={<IconBook />} />}
                </div>
            </div>
            <motion.div
                className="flex-shrink-0 flex justify-end"
                variants={sidebarVariants}
                custom={rightSidebarWidth}
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
        </div>
    )
}
