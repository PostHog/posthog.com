import React, { useState, useRef, useEffect } from 'react'
import * as Icons from '@posthog/icons'
import Slugger from 'github-slugger'
import Scrollspy from 'react-scrollspy'

export interface QuestLogItemProps {
    title: string
    subtitle?: string
    icon?: string
    children: React.ReactNode
}

export const QuestLog: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const SCROLLSPY_OFFSET = 0
    const MOBILE_SCROLLSPY_OFFSET = 125
    const SCROLL_OFFSET_REM = 8
    const MOBILE_SCROLL_OFFSET_REM = 15
    const STICKY_LIST_OFFSET_REM = 8

    // Corner bracket SVG constants
    const TOP_LEFT_CORNER_SVG = (
        <svg
            className="absolute -top-[0.45rem] -left-[0.45rem] w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M2 12V6C2 3.79086 3.79086 2 6 2H12" stroke="orange" strokeWidth="2" />
        </svg>
    )

    const TOP_RIGHT_CORNER_SVG = (
        <svg
            className="absolute -top-[0.45rem] -right-[0.45rem] w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M22 12V6C22 3.79086 20.2091 2 18 2H12" stroke="orange" strokeWidth="2" />
        </svg>
    )

    const BOTTOM_LEFT_CORNER_SVG = (
        <svg
            className="absolute -bottom-[0.45rem] -left-[0.45rem] w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M2 12V18C2 20.2091 3.79086 22 6 22H12" stroke="orange" strokeWidth="2" />
        </svg>
    )

    const BOTTOM_RIGHT_CORNER_SVG = (
        <svg
            className="absolute -bottom-[0.45rem] -right-[0.45rem] w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M22 12V18C22 20.2091 20.2091 22 18 22H12" stroke="orange" strokeWidth="2" />
        </svg>
    )

    const [selectedQuest, setSelectedQuest] = useState(0)
    const [bracketPosition, setBracketPosition] = useState({ top: 0, height: 0 })
    const [hasInitialAnimated, setHasInitialAnimated] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const questRefs = useRef<(HTMLDivElement | null)[]>([])
    const dropdownRef = useRef<HTMLDivElement>(null)
    const spriteRef = useRef<HTMLDivElement>(null)
    const isFirstRender = useRef(true)
    const isProgrammaticScroll = useRef(false)

    const questItems = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<
        QuestLogItemProps & {
            index?: number
            isSelected?: boolean
            questRef?: React.Ref<HTMLDivElement>
            onSelect?: () => void
        }
    >[]

    const slugger = new Slugger()

    const scrollToElementWithOffset = (element: HTMLElement, offsetRem = 0) => {
        const offsetPx = offsetRem * parseFloat(getComputedStyle(document.documentElement).fontSize)
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
            top: elementTop - offsetPx,
            behavior: 'smooth',
        })
    }

    const generateQuestSlug = (title: string) => {
        slugger.reset() // Reset for each use to ensure consistency
        return slugger.slug(title)
    }

    const restartSpriteAnimation = () => {
        if (spriteRef.current) {
            spriteRef.current.classList.remove('quest-log-sprite-animate')
            void spriteRef.current.offsetWidth // Force reflow
            spriteRef.current.classList.add('quest-log-sprite-animate')
        }
    }

    const selectQuestFromHash = () => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash
            const match = hash.match(/^#quest-item-(.+)$/)
            if (match) {
                const slug = match[1]
                const questIndex = questItems.findIndex((item) => generateQuestSlug(item.props.title) === slug)
                if (questIndex >= 0) {
                    setSelectedQuest(questIndex)
                    return
                }
            }
            setSelectedQuest(0) // Default to first quest if no valid hash
        }
    }

    const questIds = questItems.map((item) => `quest-item-${generateQuestSlug(item.props.title)}`)

    const handleScrollspyUpdate = (el: HTMLElement | null) => {
        // Skip scrollspy updates during programmatic scrolling
        if (isProgrammaticScroll.current) {
            return
        }

        if (el && el.id) {
            const questIndex = questIds.findIndex((id) => id === el.id)
            if (questIndex >= 0 && questIndex !== selectedQuest) {
                setSelectedQuest(questIndex)
            }
        }
    }

    const handleQuestSelect = (index: number) => {
        const questId = questIds[index]
        const element = document.getElementById(questId)

        if (element) {
            // Set flag to prevent Scrollspy from triggering during programmatic scroll
            isProgrammaticScroll.current = true

            // Use mobile offset for mobile, desktop offset for desktop
            const offsetRem = isMobile ? MOBILE_SCROLL_OFFSET_REM : SCROLL_OFFSET_REM
            scrollToElementWithOffset(element, offsetRem)

            // Update URL hash for sharing
            if (typeof window !== 'undefined') {
                const slug = generateQuestSlug(questItems[index]?.props.title || '')
                const newUrl = `${window.location.pathname}${window.location.search}#quest-item-${slug}`
                window.history.replaceState(null, '', newUrl)
            }

            // Clear flag after scroll animation completes (smooth scroll typically takes ~500-1000ms)
            setTimeout(() => {
                isProgrammaticScroll.current = false
            }, 1000)
        }

        setSelectedQuest(index)
    }

    // Initial delay animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasInitialAnimated(true)
            restartSpriteAnimation()
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    // Handle URL hash changes
    useEffect(() => {
        selectQuestFromHash()
        window.addEventListener('hashchange', selectQuestFromHash)
        return () => window.removeEventListener('hashchange', selectQuestFromHash)
    }, [])

    // Update bracket position on quest change
    useEffect(() => {
        const updateBracketPosition = () => {
            const selectedElement = questRefs.current[selectedQuest]
            if (selectedElement) {
                const rect = selectedElement.getBoundingClientRect()
                const containerRect = selectedElement.parentElement?.getBoundingClientRect()
                if (containerRect) {
                    setBracketPosition({
                        top: selectedElement.offsetTop,
                        height: rect.height,
                    })
                }
            }
        }

        updateBracketPosition()
        window.addEventListener('resize', updateBracketPosition)
        return () => window.removeEventListener('resize', updateBracketPosition)
    }, [selectedQuest])

    // Trigger sprite animation on quest change
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        restartSpriteAnimation()
    }, [selectedQuest])

    // Handle dropdown outside clicks
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [dropdownOpen])

    // Handle responsive sticky top offset
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        handleResize() // Set initial value
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const progressPercentage = hasInitialAnimated ? ((selectedQuest + 1) / questItems.length) * 100 : 0
    const spritePosition = hasInitialAnimated
        ? `calc(${((selectedQuest + 1) / questItems.length) * 100}% - 32px)`
        : 'calc(0% - 10px)'

    return (
        <>
            <div className="max-w-7xl mx-auto @container">
                <div className="flex gap-5 flex-col @lg:flex-row">
                    {/* Quest List - Sticky Container */}
                    <div
                        className="w-full @lg:w-auto @lg:max-w-[33.33%] @lg:flex-shrink-0 sticky self-start mt-3 pt-6 @lg:pt-0 bg-light dark:bg-dark z-50"
                        style={{
                            top: isMobile ? '3rem' : `${STICKY_LIST_OFFSET_REM}rem`,
                        }}
                    >
                        {/* Progress Indicator - Outside both Scrollspy instances */}
                        <div className="mt-3 mb-6 px-1">
                            <div className="flex justify-start text-xs md:text-sm text-primary/40 dark:text-primary-dark/40 mb-2">
                                <span>
                                    {selectedQuest + 1}/{questItems.length}
                                </span>
                            </div>
                            <div className="w-full bg-accent rounded-full h-1.5 relative">
                                <div
                                    className="bg-red dark:bg-yellow h-1.5 rounded-full transition-all duration-[2s] ease-in-out"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                                {/* Sprite Animation */}
                                <div
                                    ref={spriteRef}
                                    className={`absolute w-[48px] pointer-events-none transition-all duration-[2s] ease-in-out`}
                                    style={{
                                        left: spritePosition,
                                        backgroundImage: 'url(/images/game-walk.png)',
                                        backgroundSize: '528px 48px',
                                        backgroundRepeat: 'no-repeat',
                                        height: '48px',
                                        top: '-48px',
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Desktop Navigation - Its own Scrollspy */}
                        <div className="hidden @lg:block space-y-4 relative">
                            {/* Moving Corner Brackets - Outside Scrollspy */}
                            <div
                                className="absolute inset-x-0 pointer-events-none transition-all duration-500 ease-in-out"
                                style={{
                                    top: `${bracketPosition.top}px`,
                                    height: `${bracketPosition.height}px`,
                                }}
                            >
                                {TOP_LEFT_CORNER_SVG}
                                {TOP_RIGHT_CORNER_SVG}
                                {BOTTOM_LEFT_CORNER_SVG}
                                {BOTTOM_RIGHT_CORNER_SVG}
                            </div>

                            <Scrollspy
                                items={questIds}
                                currentClassName="active"
                                offset={SCROLLSPY_OFFSET}
                                onUpdate={handleScrollspyUpdate}
                                className="space-y-4"
                                style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}
                                rootEl="#content-menu-wrapper"
                            >
                                {questItems.map((child, index) =>
                                    React.cloneElement(child, {
                                        key: index,
                                        index,
                                        isSelected: selectedQuest === index,
                                        questRef: (el: HTMLDivElement | null) => (questRefs.current[index] = el),
                                        onSelect: () => handleQuestSelect(index),
                                    })
                                )}
                            </Scrollspy>
                        </div>

                        {/* Mobile Navigation - Separate Scrollspy */}
                        <div className="block @lg:hidden">
                            <Scrollspy
                                items={questIds}
                                currentClassName="active"
                                offset={MOBILE_SCROLLSPY_OFFSET}
                                onUpdate={handleScrollspyUpdate}
                                style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}
                            >
                                <MobileQuestLogItem
                                    questItems={questItems}
                                    selectedQuest={selectedQuest}
                                    onQuestSelect={handleQuestSelect}
                                    dropdownOpen={dropdownOpen}
                                    onDropdownToggle={setDropdownOpen}
                                    dropdownRef={dropdownRef}
                                />
                            </Scrollspy>
                        </div>
                    </div>

                    {/* Quest Details */}
                    <div className="w-full @lg:flex-1 @lg:min-w-0">
                        <div className="bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-sm overflow-hidden shadow-sm">
                            <div className="divide-y divide-light dark:divide-dark">
                                {questItems.map((questItem, index) => (
                                    <div key={index} className="p-4 md:p-6">
                                        <h2 id={questIds[index]} className={`!mt-0 text-lg md:text-xl font-bold mb-4`}>
                                            {questItem.props.title}
                                        </h2>

                                        {questItem.props.children || (
                                            <div>
                                                <h3 className="text-base md:text-lg font-semibold text-orange mb-2 md:mb-3">
                                                    Overview
                                                </h3>
                                                <p className="text-primary/40 dark:text-primary-dark/40 leading-relaxed text-sm md:text-base">
                                                    Quest details will appear here.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const QuestLogItem: React.FC<
    QuestLogItemProps & {
        index?: number
        isSelected?: boolean
        questRef?: React.Ref<HTMLDivElement>
        onSelect?: () => void
    }
> = ({ title, subtitle, icon, isSelected = false, questRef, onSelect }) => {
    const Icon = Icons[icon] || Icons.IconInfo

    return (
        <div
            ref={questRef}
            className={`relative bg-white dark:bg-accent-dark rounded-sm px-2.5 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-orange/50 active:transition-all active:duration-100 ${
                isSelected
                    ? 'border border-orange shadow-md opacity-100 bg-orange/10 dark:bg-orange/10'
                    : 'border border-light dark:border-dark opacity-65 bg-white dark:bg-accent-dark shadow-sm hover:translate-y-[-2px] active:translate-y-[-1px]'
            }`}
            onClick={onSelect}
        >
            <div className={`flex items-center space-x-2.5 py-2 ${isSelected ? 'text-red dark:text-yellow' : ''}`}>
                <div className={`flex-shrink-0 w-5 h-5 ${isSelected ? 'text-red dark:text-yellow' : ''}`}>
                    {Icon && <Icon className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                    <strong
                        className={`text-sm md:text-base font-bold leading-tight ${
                            isSelected ? 'text-red dark:text-yellow' : ''
                        }`}
                    >
                        {title}
                    </strong>
                    {subtitle && (
                        <div className="text-xs md:text-sm text-primary/40 dark:text-primary-dark leading-tight">
                            <strong>
                                <em>{subtitle}</em>
                            </strong>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export const MobileQuestLogItem: React.FC<{
    questItems: React.ReactElement<QuestLogItemProps>[]
    selectedQuest: number
    onQuestSelect: (index: number) => void
    dropdownOpen: boolean
    onDropdownToggle: (open: boolean) => void
    dropdownRef: React.RefObject<HTMLDivElement>
}> = ({ questItems, selectedQuest, onQuestSelect, dropdownOpen, onDropdownToggle, dropdownRef }) => {
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="w-full flex items-center justify-between p-3 bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-sm shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => onDropdownToggle(!dropdownOpen)}
            >
                <div className="flex items-center space-x-2.5">
                    <div className="flex-shrink-0 w-5 h-5 text-red dark:text-yellow">
                        {(() => {
                            const selectedItem = questItems[selectedQuest]
                            const Icon = Icons[selectedItem?.props.icon] || Icons.IconInfo
                            return <Icon className="w-5 h-5" />
                        })()}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                        <strong className="text-sm font-bold text-red dark:text-yellow leading-tight block">
                            {questItems[selectedQuest]?.props.title}
                        </strong>
                        {questItems[selectedQuest]?.props.subtitle && (
                            <div className="text-xs text-primary/40 dark:text-primary-dark leading-tight">
                                <strong>
                                    <em>{questItems[selectedQuest].props.subtitle}</em>
                                </strong>
                            </div>
                        )}
                    </div>
                </div>
                <Icons.IconChevronDown
                    className={`w-7 h-7 text-primary/40 dark:text-primary-dark/40 transition-transform duration-200 ${
                        dropdownOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-sm shadow-lg z-10 max-h-60 overflow-y-auto">
                    {questItems.map((child, index) => (
                        <div
                            key={index}
                            className={`p-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-light dark:border-dark last:border-b-0 ${
                                selectedQuest === index ? 'bg-orange/10 dark:bg-orange/10' : ''
                            }`}
                            onClick={() => {
                                onQuestSelect(index)
                                onDropdownToggle(false)
                            }}
                        >
                            <div className="flex items-center space-x-2.5">
                                <div
                                    className={`flex-shrink-0 w-5 h-5 ${
                                        selectedQuest === index ? 'text-red dark:text-yellow' : ''
                                    }`}
                                >
                                    {(() => {
                                        const Icon = Icons[child.props.icon] || Icons.IconInfo
                                        return <Icon className="w-5 h-5" />
                                    })()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <strong
                                        className={`text-sm font-bold leading-tight block ${
                                            selectedQuest === index ? 'text-red dark:text-yellow' : ''
                                        }`}
                                    >
                                        {child.props.title}
                                    </strong>
                                    {child.props.subtitle && (
                                        <div className="text-xs text-primary/40 dark:text-primary-dark/40 leading-tight">
                                            <strong>
                                                <em>{child.props.subtitle}</em>
                                            </strong>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
