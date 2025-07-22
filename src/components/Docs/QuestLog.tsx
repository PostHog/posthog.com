import React, { useState, useRef, useEffect } from 'react'
import * as Icons from '@posthog/icons'

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
    const questRefs = useRef<(HTMLDivElement | null)[]>([])
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

    const progressPercentage = hasInitialAnimated ? ((selectedQuest + 1) / questItems.length) * 100 : 0
    const spritePosition = hasInitialAnimated
        ? `calc(${((selectedQuest + 1) / questItems.length) * 100}% - 32px)`
        : 'calc(0% - 10px)'

    return (
        <>
            <style>
                {`
          @keyframes walk-sprite-${animationKey} {
            0% { background-position: 0 0; }
            100% { background-position: -528px 0; }
          }
        `}
            </style>
            <div className="max-w-7xl mx-auto py-4 pb-8">
                <div className="flex md:flex-row gap-5">
                    {/* Quest List */}
                    <div className="w-full md:w-auto md:max-w-[40%] md:flex-shrink-0">
                        {/* Progress Indicator */}
                        <div className="mt-3 mb-6">
                            <div className="flex justify-start text-xs md:text-sm text-gray-600 mb-2">
                                <span>
                                    {selectedQuest + 1}/{questItems.length}
                                </span>
                            </div>
                            <div className="w-full bg-accent rounded-full h-1.5 relative">
                                <div
                                    className="bg-red h-1.5 rounded-full transition-all duration-[2s] ease-in-out"
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
                        <div className="space-y-4 relative">
                            {/* Moving Corner Brackets */}
                            <div
                                className="absolute inset-x-0 pointer-events-none transition-all duration-500 ease-out"
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
                                    onSelect: () => setSelectedQuest(index),
                                })
                            )}
                        </div>
                    </div>

                    {/* Quest Details */}
                    <div className="w-full md:flex-1 md:min-w-0">
                        <div className="bg-white border border-light dark:border-dark rounded-sm overflow-hidden md:sticky md:top-8 shadow-sm">
                            <div className="bg-orange/10 border-b border-light dark:border-dark p-3 md:p-4">
                                <div className="flex items-center space-x-3">
                                    <span className="text-red text-base md:text-lg">⚠</span>
                                    <h2 className="text-lg md:text-xl font-bold text-orange truncate">
                                        {questItems[selectedQuest]?.props.title}
                                    </h2>
                                </div>
                                {questItems[selectedQuest]?.props.subtitle && (
                                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                                        {questItems[selectedQuest].props.subtitle}
                                    </p>
                                )}
                            </div>

                            <div className="p-4 md:p-6 space-y-6">
                                {questItems[selectedQuest]?.props.children || (
                                    <div>
                                        <h3 className="text-base md:text-lg font-semibold text-orange mb-2 md:mb-3">
                                            Overview
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                            Select a quest to view details.
                                        </p>
                                    </div>
                                )}

                                <div className="pt-3 md:pt-4 border-t border-light dark:border-dark">
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                                        <button className="bg-orange hover:bg-orange/80 active:bg-orange/90 px-4 md:px-6 py-3 md:py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 text-sm md:text-base text-white">
                                            <Icons.IconPlay className="w-4 h-4" />
                                            <span>Begin Quest</span>
                                        </button>
                                        <span className="text-xs md:text-sm text-gray-600 text-center sm:text-left">
                                            Estimated time: 15-30 minutes
                                        </span>
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
            className={`relative rounded-sm shadow-sm bg-white px-2.5 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-orange/50 ${
                isSelected
                    ? 'border border-orange shadow-md opacity-100'
                    : 'border border-light dark:border-dark opacity-65 bg-white'
            }`}
            onClick={onSelect}
        >
            <div className={`flex items-center space-x-2.5 py-2 ${isSelected ? 'text-red' : ''}`}>
                <div className={`flex-shrink-0 w-5 h-5 ${isSelected ? 'text-red' : ''}`}>
                    {Icon && <Icon className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                    <strong
                        className={`text-sm md:text-base font-bold truncate leading-tight ${
                            isSelected ? 'text-red' : ''
                        }`}
                    >
                        {title}
                    </strong>
                    {subtitle && (
                        <div className="text-xs md:text-sm text-gray-600 leading-tight text-primary/40 dark:text-primary-dark/r0">
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
