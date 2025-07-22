import React, { useState, useRef, useEffect } from 'react'
import * as Icons from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'

// CSS styles for the QuestLog component
const questLogStyles = {
    questLogContainer: {
        containerType: 'inline-size' as const,
    },
    questContainer: {
        flexDirection: 'column' as const,
    },
    questList: {
        width: '100%',
    },
    questDetails: {
        width: '100%',
    },
    questListDesktop: {
        display: 'none',
    },
    questDropdownMobile: {
        display: 'block',
    },
    questDetailsSticky: {},
} as const

// Container query CSS
const containerQueryCSS = `
  /* Container query setup */
  .quest-log-container {
    container-type: inline-size;
  }
  
  /* Default mobile-first styles */
  .quest-container {
    flex-direction: column;
  }
  
  .quest-list {
    width: 100%;
  }
  
  .quest-details {
    width: 100%;
  }
  
  .quest-list-desktop {
    display: none;
  }
  
  .quest-dropdown-mobile {
    display: block;
  }
  
  /* Desktop styles when container is wide enough */
  @container (min-width: 601px) {
    .quest-container {
      flex-direction: row;
    }
    
    .quest-list {
      width: auto;
      max-width: 33.33%;
      flex-shrink: 0;
    }
    
    .quest-details {
      flex: 1;
      min-width: 0;
    }
    
    .quest-list-desktop {
      display: block;
    }
    
    .quest-dropdown-mobile {
      display: none;
    }
    
    .quest-details-sticky {
      position: sticky;
      top: 2rem;
    }
  }
`

export interface QuestLogItemProps {
    title: string
    subtitle?: string
    icon?: string
    children: React.ReactNode
}

export const QuestLog: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedQuest, setSelectedQuest] = useState(0)
    const [bracketPosition, setBracketPosition] = useState({ top: 0, height: 0 })
    const [animationKey, setAnimationKey] = useState(0)
    const [hasInitialAnimated, setHasInitialAnimated] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const questRefs = useRef<(HTMLDivElement | null)[]>([])
    const dropdownRef = useRef<HTMLDivElement>(null)
    const isFirstRender = useRef(true)

    const questItems = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<
        QuestLogItemProps & {
            index?: number
            isSelected?: boolean
            questRef?: React.Ref<HTMLDivElement>
            onSelect?: () => void
        }
    >[]

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

    // Handle URL parameters
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search)
            const questTitle = params.get('quest-item')
            if (questTitle) {
                const questIndex = questItems.findIndex((item) => item.props.title === questTitle)
                if (questIndex >= 0) {
                    setSelectedQuest(questIndex)
                }
            }
        }
    }, [questItems])

    // Trigger sprite animation on quest change
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return // Skip animation on first render
        }
        setAnimationKey((prev) => prev + 1)
    }, [selectedQuest])

    // Initial delay animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasInitialAnimated(true)
            setAnimationKey((prev) => prev + 1) // Trigger sprite animation when loading bar starts
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownOpen])

    const handleQuestSelect = (index: number) => {
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href)
            url.searchParams.set('quest-item', questItems[index]?.props.title || '')
            window.history.pushState({}, '', url)
        }
        setSelectedQuest(index)
    }

    // Inject container query CSS once
    useEffect(() => {
        const styleId = 'quest-log-container-queries'
        if (!document.getElementById(styleId)) {
            const styleElement = document.createElement('style')
            styleElement.id = styleId
            styleElement.textContent = containerQueryCSS
            document.head.appendChild(styleElement)
        }
    }, [])

    const progressPercentage = hasInitialAnimated ? ((selectedQuest + 1) / questItems.length) * 100 : 0
    const spritePosition = hasInitialAnimated
        ? `calc(${((selectedQuest + 1) / questItems.length) * 100}% - 32px)`
        : 'calc(0% - 10px)'

    // Dynamic sprite animation CSS
    const spriteAnimationCSS = `
        @keyframes walk-sprite-${animationKey} {
            0% { background-position: 0 0; }
            100% { background-position: -528px 0; }
        }
    `

    return (
        <>
            <style>{spriteAnimationCSS}</style>
            <div className="max-w-7xl mx-auto quest-log-container">
                <div className="flex gap-5 quest-container">
                    {/* Quest List */}
                    <div className="quest-list mt-3">
                        {/* Progress Indicator */}
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
                                    className={`absolute w-[48px] pointer-events-none transition-all duration-[2s] ease-in-out`}
                                    style={{
                                        left: spritePosition,
                                        backgroundImage: 'url(/images/game-walk.png)',
                                        backgroundSize: '528px 48px',
                                        backgroundRepeat: 'no-repeat',
                                        height: '48px',
                                        top: '-48px',
                                        animation:
                                            animationKey > 0 ? `walk-sprite-${animationKey} 0.25s steps(11) 7` : 'none',
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Desktop Quest List */}
                        <div className="quest-list-desktop space-y-4 relative">
                            {/* Moving Corner Brackets */}
                            <div
                                className="absolute inset-x-0 pointer-events-none transition-all duration-500 ease-in-out"
                                style={{
                                    top: `${bracketPosition.top}px`,
                                    height: `${bracketPosition.height}px`,
                                }}
                            >
                                {/* Top Left Corner */}
                                <svg
                                    className="absolute -top-[0.45rem] -left-[0.45rem] w-7 h-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 12V6C2 3.79086 3.79086 2 6 2H12" stroke="orange" strokeWidth="2" />
                                </svg>
                                {/* Top Right Corner */}
                                <svg
                                    className="absolute -top-[0.45rem] -right-[0.45rem] w-7 h-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M22 12V6C22 3.79086 20.2091 2 18 2H12" stroke="orange" strokeWidth="2" />
                                </svg>
                                {/* Bottom Left Corner */}
                                <svg
                                    className="absolute -bottom-[0.45rem] -left-[0.45rem] w-7 h-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 12V18C2 20.2091 3.79086 22 6 22H12" stroke="orange" strokeWidth="2" />
                                </svg>
                                {/* Bottom Right Corner */}
                                <svg
                                    className="absolute -bottom-[0.45rem] -right-[0.45rem] w-7 h-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22 12V18C22 20.2091 20.2091 22 18 22H12"
                                        stroke="orange"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>

                            {questItems.map((child, index) =>
                                React.cloneElement(child, {
                                    key: index,
                                    index,
                                    isSelected: selectedQuest === index,
                                    questRef: (el: HTMLDivElement | null) => (questRefs.current[index] = el),
                                    onSelect: () => handleQuestSelect(index),
                                })
                            )}
                        </div>

                        {/* Mobile Dropdown */}
                        <MobileQuestLogItem
                            questItems={questItems}
                            selectedQuest={selectedQuest}
                            onQuestSelect={handleQuestSelect}
                            dropdownOpen={dropdownOpen}
                            onDropdownToggle={setDropdownOpen}
                            dropdownRef={dropdownRef}
                        />
                    </div>

                    {/* Quest Details */}
                    <div className="quest-details">
                        <div className="bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-sm overflow-hidden shadow-sm quest-details-sticky">
                            <div className="p-4 md:p-6">
                                <h2 className="!mt-0 text-lg md:text-xl font-bold">
                                    {questItems[selectedQuest]?.props.title}
                                </h2>

                                {questItems[selectedQuest]?.props.children || (
                                    <div>
                                        <h3 className="text-base md:text-lg font-semibold text-orange mb-2 md:mb-3">
                                            Overview
                                        </h3>
                                        <p className="text-primary/40 dark:text-primary-dark/40 leading-relaxed text-sm md:text-base">
                                            Select a quest to view details.
                                        </p>
                                    </div>
                                )}

                                <div className="pt-3 md:pt-4 border-t border-light dark:border-dark">
                                    <div className="items-stretch sm:items-center gap-3 sm:gap-4">
                                        {selectedQuest < questItems.length - 1 && (
                                            <CallToAction
                                                type="primary"
                                                size="md"
                                                className="flex space-x-2"
                                                onClick={() => {
                                                    const nextIndex = selectedQuest + 1
                                                    handleQuestSelect(nextIndex)
                                                }}
                                            >
                                                <>
                                                    Next step
                                                    <Icons.IconArrowRight className="size-5 inline-block ml-1" />
                                                </>
                                            </CallToAction>
                                        )}
                                    </div>
                                </div>
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
        <div className="quest-dropdown-mobile relative" ref={dropdownRef}>
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
