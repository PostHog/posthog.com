import React from 'react'
import { GameState, GameActions } from '../../../data/pmf-game/types'
import { LEVELS } from '../../../data/pmf-game/levels'

interface SidenavProps {
    gameState: GameState
    actions: GameActions
}

function NavButton({
    icon,
    iconUrl,
    title,
    subtitle,
    onClick,
    active = false,
}: {
    icon?: string
    iconUrl?: string
    title: string
    subtitle: string
    onClick?: () => void
    active?: boolean
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left py-1 px-2 border-2 border-black bg-white transition-all ${
                active ? '' : 'hover:scale-[1.02]'
            }`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <div className={`font-bold text-sm ${active ? 'text-orange' : ''}`}>{title}</div>
                    <div className="text-xs opacity-70">{subtitle}</div>
                </div>

                {iconUrl ? (
                    <img src={iconUrl} alt="" className="m-0 ml-auto" />
                ) : (
                    <span className="text-2xl ml-auto">{icon}</span>
                )}
            </div>
        </button>
    )
}

function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-4 bg-gray-200 border-2 border-black overflow-hidden">
                <div className="h-full bg-green transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs font-bold">{progress}%</span>
        </div>
    )
}

function Lives({ count }: { count: number }) {
    return (
        <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
                <span key={i} className={i < count ? 'text-red-500' : 'text-gray-300'}>
                    ❤️
                </span>
            ))}
        </div>
    )
}

function ChecklistItem({
    item,
    isLast,
    onClick,
}: {
    item: { id: string; label: string; completed: boolean }
    isLast: boolean
    onClick: () => void
}) {
    return (
        <div className="flex">
            {/* Checkbox column with connecting line */}
            <div className="flex flex-col items-center mr-2 w-4">
                <button
                    onClick={onClick}
                    className={`w-4 h-4 border-2 border-black flex-shrink-0 cursor-pointer hover:bg-red-200 transition-colors ${
                        item.completed ? 'bg-red' : 'bg-white'
                    }`}
                />
                {/* Connecting line to next item */}
                {!isLast && <div className="w-0.5 flex-1 min-h-6 bg-black" />}
            </div>
            {/* Label */}
            <div className="text-sm leading-4">
                <span className={item.completed ? 'line-through opacity-50' : ''}>{item.label}</span>
            </div>
        </div>
    )
}

export default function Sidenav({ gameState, actions }: SidenavProps): JSX.Element {
    const { currentScene, levels, lives } = gameState
    const isInLevel = currentScene.startsWith('level')
    const currentLevelId = isInLevel ? currentScene : null
    const currentLevel = currentLevelId ? LEVELS.find((l) => l.id === currentLevelId) : null

    // Calculate current level progress based on completed checklist items
    const currentLevelProgress = (() => {
        if (!currentLevelId || !currentLevel) return 0
        const checklistItems = levels[currentLevelId]?.checklistItems || []
        const completedCount = checklistItems.filter((item) => item.completed).length
        const totalCount = checklistItems.length
        return totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
    })()

    return (
        <div className="flex flex-col h-full">
            <button
                onClick={() => actions.navigateToScene('title')}
                className="p-2 text-sm font-bold flex items-center gap-2 text-left opacity-50 hover:opacity-100 transition-opacity"
            >
                ← Exit game
            </button>

            <div className="flex flex-col gap-2 p-2">
                <NavButton
                    iconUrl="https://res.cloudinary.com/dmukukwp6/image/upload/map_d480208b70.svg"
                    title="World Map"
                    subtitle="Select another track"
                    onClick={() => actions.navigateToOverworld()}
                    active={currentScene === 'overworld'}
                />
                <NavButton
                    iconUrl="https://res.cloudinary.com/dmukukwp6/image/upload/folder_b86a35bb72.svg"
                    title="Inventory"
                    subtitle="Open your saved resources"
                />
                <NavButton
                    iconUrl="https://res.cloudinary.com/dmukukwp6/image/upload/classic_5f0ab23b3d.svg"
                    title="Character"
                    subtitle="Change your hedgehog skin"
                />
                <NavButton
                    iconUrl="https://res.cloudinary.com/dmukukwp6/image/upload/compass2_1b70fa4b99.svg"
                    title="You are here"
                    subtitle="Jump ahead at any time"
                />
            </div>

            <div className="flex-1 overflow-auto">
                {isInLevel && currentLevel ? (
                    // In level: Show checklist
                    <div className="p-2">
                        <div className="font-semibold text-sm opacity-50 mb-2">Checklist</div>
                        {currentLevel.checklistItems.map((item, index) => (
                            <ChecklistItem
                                key={item.id}
                                item={levels[currentLevelId!]?.checklistItems[index] || item}
                                isLast={index === currentLevel.checklistItems.length - 1}
                                onClick={() => actions.completeChecklistItem(currentLevelId!, item.id)}
                            />
                        ))}
                    </div>
                ) : null}
            </div>

            {isInLevel && (
                <div className="p-3 space-y-2">
                    <ProgressBar progress={currentLevelProgress} />
                    <Lives count={lives} />
                    <div className="text-xs opacity-60">{currentLevelProgress}% complete</div>
                </div>
            )}
        </div>
    )
}
