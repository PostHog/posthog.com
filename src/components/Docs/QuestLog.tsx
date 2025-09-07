import React, { useState, useRef, useEffect } from 'react'
import * as Icons from '@posthog/icons'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Slugger from 'github-slugger'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Scrollspy from 'react-scrollspy'

export interface QuestLogItemProps {
    title: string
    subtitle?: string
    icon?: string
    children: React.ReactNode
}

export const QuestLog: React.FC<{
    children: React.ReactNode
    firstSpeechBubble?: string
    lastSpeechBubble?: string
}> = ({
    children,
    firstSpeechBubble = "We're going on an adventure!",
    lastSpeechBubble = "You're ready to start building!",
}) => {
    const SCROLLSPY_OFFSET = -50
    const MOBILE_SCROLLSPY_OFFSET = 125

    // Animation timing constants
    const INITIAL_LOAD_DELAY = 1000
    const SPEECH_BUBBLE_SHOW_DELAY = 200
    const SPEECH_BUBBLE_AUTO_HIDE_DELAY = 3000
    const SMOOTH_SCROLL_DURATION = 1000

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
    const [hasInitialLoadSettled, setHasInitialLoadSettled] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    // Removed unused headerHeight state
    const [speechText, setSpeechText] = useState('')
    const [showSpeechBubble, setShowSpeechBubble] = useState(false)
    const [isSmoothScrolling, setIsSmoothScrolling] = useState(false)

    const questRefs = useRef<(HTMLDivElement | null)[]>([])
    const dropdownRef = useRef<HTMLDivElement>(null)
    const spriteRef = useRef<HTMLDivElement>(null)
    const isFirstRender = useRef(true)

    const questItems = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<
        QuestLogItemProps & {
            index?: number
            isSelected?: boolean
            questRef?: React.Ref<HTMLDivElement>
            onSelect?: () => void
        }
    >[]

    const slugger = new Slugger()

    const generateQuestSlug = (title: string) => {
        slugger.reset() // Reset for each use to ensure consistency
        return slugger.slug(title)
    }

    // Reusable smooth scroll function
    const handleSmoothScroll = (questId: string, callback?: () => void) => {
        const element = document.getElementById(questId)
        if (element) {
            setIsSmoothScrolling(true)
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            window.history.pushState(null, '', `#${questId}`)
            // Re-enable scrollspy after smooth scroll completes
            setTimeout(() => {
                setIsSmoothScrolling(false)
            }, SMOOTH_SCROLL_DURATION)
            // Execute optional callback
            callback?.()
        }
    }

    // Desktop navigation click handler
    const handleDesktopNavClick = (e: React.MouseEvent, questId: string) => {
        e.preventDefault()
        handleSmoothScroll(questId)
    }

    // Mobile navigation click handler
    const handleMobileNavClick = (e: React.MouseEvent, questId: string, onDropdownToggle: (open: boolean) => void) => {
        e.preventDefault()
        handleSmoothScroll(questId, () => {
            onDropdownToggle(false)
        })
    }

    const shouldShowSpeechBubble = (questIndex: number, totalQuests: number) => {
        // Show only at first and last quest
        const firstQuest = 0
        const lastQuest = totalQuests - 1

        return questIndex === firstQuest || questIndex === lastQuest
    }

    const restartSpriteAnimation = () => {
        if (spriteRef.current) {
            spriteRef.current.classList.remove('quest-log-sprite-animate')
            void spriteRef.current.offsetWidth // Force reflow
            spriteRef.current.classList.add('quest-log-sprite-animate')

            // Only show speech bubble for specific quests
            if (shouldShowSpeechBubble(selectedQuest, questItems.length)) {
                // Update speech bubble - use first message for first quest, last message for last quest
                const message =
                    selectedQuest === questItems.length - 1
                        ? lastSpeechBubble // Last quest message
                        : firstSpeechBubble // First quest message
                setSpeechText(message)
                setShowSpeechBubble(false)

                // Show new speech bubble after brief delay
                setTimeout(() => {
                    setShowSpeechBubble(true)

                    // Auto-hide speech bubble after delay
                    setTimeout(() => {
                        setShowSpeechBubble(false)
                    }, SPEECH_BUBBLE_AUTO_HIDE_DELAY)
                }, SPEECH_BUBBLE_SHOW_DELAY)
            } else {
                // Hide speech bubble for other quests
                setShowSpeechBubble(false)
            }
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

    // Restore Scrollspy onUpdate for both desktop and mobile
    const handleScrollspyUpdate = (el: HTMLElement | null) => {
        // Only allow scrollspy updates after user has actually interacted with the page
        if (!hasInitialLoadSettled) return

        // Prevent updates during smooth scrolling
        if (isSmoothScrolling) return

        if (el && el.id) {
            const questIndex = questIds.findIndex((id) => id === el.id)
            if (questIndex >= 0 && questIndex !== selectedQuest) {
                setSelectedQuest(questIndex)
                window.history.replaceState(null, '', `#${el.id}`)
            }
        }
    }

    useEffect(() => {
        // Run on mount and whenever the hash changes
        const onHashChange = () => selectQuestFromHash()
        window.addEventListener('hashchange', onHashChange)
        selectQuestFromHash()
        return () => window.removeEventListener('hashchange', onHashChange)
    }, [questItems])

    // Initial page load delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasInitialLoadSettled(true)
            restartSpriteAnimation()

            // Show initial speech bubble only if first quest should show it (it should, since it's index 0)
            if (questItems.length === 0 || shouldShowSpeechBubble(0, questItems.length)) {
                setSpeechText(firstSpeechBubble) // Set initial message
                setShowSpeechBubble(true)

                // Auto-hide initial speech bubble after delay
                setTimeout(() => {
                    setShowSpeechBubble(false)
                }, SPEECH_BUBBLE_AUTO_HIDE_DELAY)
            }
        }, INITIAL_LOAD_DELAY)
        return () => clearTimeout(timer)
    }, [])

    // Process initial hash on mount
    useEffect(() => {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            selectQuestFromHash()
        }, 0)

        window.addEventListener('hashchange', selectQuestFromHash)
        return () => {
            clearTimeout(timer)
            window.removeEventListener('hashchange', selectQuestFromHash)
        }
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

    // Handle initial scroll after images load
    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleInitialScroll = () => {
            const hash = window.location.hash
            if (hash) {
                // Small delay to ensure DOM is settled
                setTimeout(() => {
                    const element = document.getElementById(hash.substring(1))
                    if (element) {
                        setIsSmoothScrolling(true)
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        // Re-enable scrollspy after smooth scroll completes
                        setTimeout(() => {
                            setIsSmoothScrolling(false)
                        }, SMOOTH_SCROLL_DURATION)
                    }
                }, 100)
            }
        }

        // If page is already loaded, run immediately
        if (document.readyState === 'complete') {
            handleInitialScroll()
        } else {
            // Wait for all resources (including images) to load
            window.addEventListener('load', handleInitialScroll)
            return () => window.removeEventListener('load', handleInitialScroll)
        }
    }, [])

    const progressPercentage = hasInitialLoadSettled ? ((selectedQuest + 1) / questItems.length) * 100 : 0
    const spritePosition = hasInitialLoadSettled
        ? `calc(${((selectedQuest + 1) / questItems.length) * 100}% - 32px)`
        : 'calc(0% - 10px)'

    return (
        <>
            <div className="max-w-7xl mx-auto pb-6 quest-log-container">
                <div
                    id={questIds[0]}
                    style={{ position: 'absolute', top: 0, height: 0, width: 0 }}
                    aria-hidden="true"
                />
                <div className="quest-main-content">
                    {/* Quest Details */}
                    <div className="quest-details">
                        <div className="space-y-4">
                            {questItems.map((questItem, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-accent-dark border border-primary dark:border-primary rounded-sm shadow-sm p-4 md:p-6"
                                >
                                    {index === 0 ? (
                                        <h2 className="!mt-0 text-lg md:text-xl font-bold mb-4 scroll-mt-64 sm:scroll-mt-32">
                                            {questItem.props.title}
                                        </h2>
                                    ) : (
                                        <h2
                                            id={questIds[index]}
                                            className="!mt-0 text-lg md:text-xl font-bold mb-4 scroll-mt-64 sm:scroll-mt-32"
                                        >
                                            {questItem.props.title}
                                        </h2>
                                    )}
                                    {questItem.props.children || (
                                        <div>
                                            <p className="text-primary/40 dark:text-primary-dark/40 leading-relaxed text-sm md:text-base">
                                                Quest details will appear here.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quest List - Sticky Container */}
                    <div className="quest-sidebar z-30 bg-primary">
                        {/* Progress Indicator */}
                        <div className="mt-3 mb-3 px-1">
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
                                {/* Sprite Animation with Speech Bubble */}
                                <div
                                    className="absolute transition-all duration-[2s] ease-in-out"
                                    style={{
                                        left: spritePosition,
                                        top: '-48px',
                                        width: '48px',
                                        height: '48px',
                                    }}
                                >
                                    {/* Walking Sprite */}
                                    <div
                                        ref={spriteRef}
                                        className={`quest-log-sprite-animate w-[48px] h-[48px] pointer-events-none transition-all duration-[2s] ease-in-out`}
                                        style={{
                                            backgroundImage: 'url(/images/game-walk.png)',
                                            backgroundSize: '528px 48px',
                                            backgroundRepeat: 'no-repeat',
                                            height: '48px',
                                        }}
                                    />

                                    {/* Speech Bubble */}
                                    <div
                                        className={`absolute ${
                                            selectedQuest === questItems.length - 1 ? 'right-full mr-2' : 'left-full'
                                        } top-[calc(50%-3px)] transform -translate-y-[calc(50%)] transition-all duration-300 ease-out ${
                                            showSpeechBubble
                                                ? 'opacity-100 translate-x-0 scale-100'
                                                : selectedQuest === questItems.length - 1
                                                ? 'opacity-0 translate-x-2 scale-95'
                                                : 'opacity-0 -translate-x-2 scale-95'
                                        }`}
                                        style={{
                                            animation: showSpeechBubble
                                                ? selectedQuest === questItems.length - 1
                                                    ? 'speechBounceLeft 0.5s ease-out'
                                                    : 'speechBounce 0.5s ease-out'
                                                : 'none',
                                            zIndex: 60, // Higher than your sticky nav
                                        }}
                                    >
                                        {/* Speech Bubble Container */}
                                        <div className="relative bg-white dark:bg-accent-dark rounded-lg shadow-md border-1 border-white dark:border-dark px-1 py-1 min-w-[120px] max-w-[175px]">
                                            {/* Speech Text */}
                                            <div className="text-xs font-medium text-primary dark:text-primary-dark text-center">
                                                <span className="inline-block">{speechText}</span>
                                            </div>

                                            {/* Speech Bubble Tail */}
                                            <div
                                                className={`absolute ${
                                                    selectedQuest === questItems.length - 1 ? 'left-full' : 'right-full'
                                                } top-1/2 transform -translate-y-1/2`}
                                            >
                                                <div
                                                    className={`w-0 h-0 border-t-[7px] border-b-[7px] ${
                                                        selectedQuest === questItems.length - 1
                                                            ? 'border-l-[10px] border-l-white dark:border-l-dark'
                                                            : 'border-r-[10px] border-r-white dark:border-r-dark'
                                                    } border-t-transparent border-b-transparent`}
                                                ></div>
                                                <div
                                                    className={`absolute ${
                                                        selectedQuest === questItems.length - 1
                                                            ? '-left-[8px] border-l-[8px] border-l-white dark:border-l-accent-dark'
                                                            : '-right-[8px] border-r-[8px] border-r-white dark:border-r-accent-dark'
                                                    } top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-t-transparent border-b-transparent`}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="quest-desktop-nav space-y-4 relative">
                            {/* Moving Corner Brackets */}
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
                                className="space-y-4"
                                style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}
                                // Try different rootEl selectors in this order of priority:
                                rootEl="[data-scheme='primary'] [data-radix-scroll-area-viewport]"
                                // Alternative 1: rootEl="[data-radix-scroll-area-viewport]"
                                // Alternative 2: rootEl=".size-full"
                                // Alternative 3: rootEl="article"
                                // Alternative 4: rootEl=".reader-content-container"
                                // Alternative 5: Remove rootEl completely to use window scroll
                                onUpdate={handleScrollspyUpdate}
                            >
                                {questItems.map((child, index) => (
                                    <a
                                        key={index}
                                        href={`#${questIds[index]}`}
                                        className="block no-underline"
                                        style={{ textDecoration: 'none' }}
                                        onClick={(e) => {
                                            handleDesktopNavClick(e, questIds[index])
                                        }}
                                    >
                                        {React.cloneElement(child, {
                                            index,
                                            isSelected: selectedQuest === index,
                                            questRef: (el: HTMLDivElement | null) => (questRefs.current[index] = el),
                                        })}
                                    </a>
                                ))}
                            </Scrollspy>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="quest-mobile-nav">
                            <Scrollspy
                                items={questIds}
                                currentClassName="active"
                                offset={MOBILE_SCROLLSPY_OFFSET}
                                componentTag="div"
                                // Use same selector as desktop version (try alternatives if this doesn't work)
                                rootEl="[data-scheme='primary'] [data-radix-scroll-area-viewport]"
                                onUpdate={handleScrollspyUpdate}
                            >
                                <MobileQuestLogItem
                                    questItems={questItems}
                                    selectedQuest={selectedQuest}
                                    dropdownOpen={dropdownOpen}
                                    onDropdownToggle={setDropdownOpen}
                                    dropdownRef={dropdownRef}
                                    questIds={questIds}
                                    onNavClick={handleMobileNavClick}
                                />
                            </Scrollspy>
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
    const Icon = Icons[icon as keyof typeof Icons] || Icons.IconInfo

    return (
        <div
            ref={questRef}
            className={`relative rounded-sm px-2.5 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-orange/50 active:transition-all active:duration-100 ${
                isSelected
                    ? 'border border-orange shadow-md opacity-100 bg-orange/10 dark:bg-orange/10'
                    : 'border border-primary dark:border-primary opacity-80 bg-white dark:bg-accent-dark shadow-sm hover:translate-y-[-2px] active:translate-y-[-1px]'
            }`}
        >
            <div className={`flex items-center space-x-2.5 py-2 ${isSelected ? 'text-red dark:text-yellow' : ''}`}>
                <div
                    className={`flex-shrink-0 w-5 h-5 ${
                        isSelected ? 'text-red dark:text-yellow' : 'text-primary/40 dark:text-primary-dark'
                    }`}
                >
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

type MobileQuestLogItemProps = {
    questItems: React.ReactElement<QuestLogItemProps>[]
    selectedQuest: number
    dropdownOpen: boolean
    onDropdownToggle: (open: boolean) => void
    dropdownRef: React.RefObject<HTMLDivElement>
    questIds: string[]
    onNavClick: (e: React.MouseEvent, questId: string, onDropdownToggle: (open: boolean) => void) => void
}

export const MobileQuestLogItem: React.FC<MobileQuestLogItemProps> = ({
    questItems,
    selectedQuest,
    dropdownOpen,
    onDropdownToggle,
    dropdownRef,
    questIds,
    onNavClick,
}) => {
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="w-full flex items-center justify-between p-3 bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-sm shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => onDropdownToggle(!dropdownOpen)}
            >
                <div className="flex items-center space-x-2.5">
                    <div className="flex-shrink-0 w-5 h-5 text-red dark:text-yellow">
                        {(() => {
                            const selectedItem = Number.isFinite(selectedQuest) ? questItems[selectedQuest] : undefined
                            const Icon = selectedItem?.props.icon
                                ? Icons[selectedItem.props.icon as keyof typeof Icons] || Icons.IconInfo
                                : Icons.IconInfo
                            return <Icon className="w-5 h-5" />
                        })()}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                        <strong className="text-sm font-bold text-red dark:text-yellow leading-tight block">
                            {Number.isFinite(selectedQuest) ? questItems[selectedQuest]?.props.title || '' : ''}
                        </strong>
                        {Number.isFinite(selectedQuest) && questItems[selectedQuest]?.props.subtitle && (
                            <div className="text-xs leading-tight">
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
                        <a
                            key={index}
                            href={`#${questIds[index]}`}
                            className={`block p-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-light dark:border-dark last:border-b-0 ${
                                selectedQuest === index ? 'bg-orange/10 dark:bg-orange/10' : ''
                            }`}
                            onClick={(e) => {
                                onNavClick(e, questIds[index], onDropdownToggle)
                            }}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="flex items-center space-x-2.5">
                                <div
                                    className={`flex-shrink-0 w-5 h-5 ${
                                        selectedQuest === index ? 'text-red dark:text-yellow' : ''
                                    }`}
                                >
                                    {(() => {
                                        const item = Number.isFinite(index) ? questItems[index] : undefined
                                        const Icon = item?.props.icon
                                            ? Icons[item.props.icon as keyof typeof Icons] || Icons.IconInfo
                                            : Icons.IconInfo
                                        return <Icon className="w-5 h-5" />
                                    })()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <strong
                                        className={`text-sm font-bold leading-tight block ${
                                            selectedQuest === index
                                                ? 'text-red dark:text-yellow'
                                                : 'text-primary dark:text-primary-dark'
                                        }`}
                                    >
                                        {Number.isFinite(index) ? questItems[index]?.props.title || '' : ''}
                                    </strong>
                                    {Number.isFinite(index) && questItems[index]?.props.subtitle && (
                                        <div className="text-xs text-primary/40 dark:text-primary-dark/40 leading-tight">
                                            <strong>
                                                <em>{questItems[index].props.subtitle}</em>
                                            </strong>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}
