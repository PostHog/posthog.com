import React from 'react'
import { GameState, GameActions, SceneId } from '../data/types'
import { LEVELS } from '../data/levels'

interface SidenavProps {
    gameState: GameState
    actions: GameActions
}

function NavButton({
    icon,
    title,
    subtitle,
    onClick,
    active = false,
}: {
    icon: string
    title: string
    subtitle: string
    onClick?: () => void
    active?: boolean
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-2 border-2 border-black bg-white hover:bg-yellow-100 transition-colors ${
                active ? 'bg-yellow-200' : ''
            }`}
        >
            <div className="flex items-center gap-2">
                <span className="text-2xl">{icon}</span>
                <div>
                    <div className="font-bold text-sm font-game">{title}</div>
                    <div className="text-xs opacity-70">{subtitle}</div>
                </div>
            </div>
        </button>
    )
}

function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-4 bg-gray-300 border-2 border-black">
                <div className="h-full bg-green-500 transition-all" style={{ width: `${progress}%` }} />
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

function LevelListItem({
    level,
    isUnlocked,
    isCompleted,
    isCurrent,
    onClick,
}: {
    level: { id: string; name: string }
    isUnlocked: boolean
    isCompleted: boolean
    isCurrent: boolean
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            disabled={!isUnlocked}
            className={`w-full text-left p-2 flex items-center gap-2 text-sm transition-colors ${
                isCurrent
                    ? 'bg-yellow-200 font-bold'
                    : isUnlocked
                    ? 'hover:bg-yellow-100'
                    : 'opacity-50 cursor-not-allowed'
            }`}
        >
            <span>{isCompleted ? '■' : isCurrent ? '▶' : isUnlocked ? '□' : '🔒'}</span>
            <span>{level.name}</span>
        </button>
    )
}

function ChecklistItem({
    item,
    isCurrent,
}: {
    item: { id: string; label: string; completed: boolean }
    isCurrent: boolean
}) {
    return (
        <div className={`p-2 flex items-center gap-2 text-sm ${isCurrent ? 'bg-yellow-200 font-bold' : ''}`}>
            <span>{item.completed ? '■' : '□'}</span>
            <span>{item.label}</span>
        </div>
    )
}

export default function Sidenav({ gameState, actions }: SidenavProps): JSX.Element {
    const { currentScene, levels, lives } = gameState
    const isInLevel = currentScene.startsWith('level')
    const currentLevelId = isInLevel ? currentScene : null
    const currentLevel = currentLevelId ? LEVELS.find((l) => l.id === currentLevelId) : null

    // Calculate overall progress
    const totalLevels = LEVELS.length
    const completedLevels = Object.values(levels).filter((l) => l.completed).length
    const overallProgress = Math.round((completedLevels / totalLevels) * 100)

    // Calculate current level progress
    const currentLevelProgress = currentLevelId ? levels[currentLevelId]?.progress || 0 : 0

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
                    icon="🗺️"
                    title="World Map"
                    subtitle="Select another track"
                    onClick={() => actions.navigateToOverworld()}
                    active={currentScene === 'overworld'}
                />
                <NavButton icon="📦" title="Inventory" subtitle="Open your saved resources" />
                <NavButton icon="🦔" title="Character" subtitle="Change your hedgehog skin" />
                <NavButton icon="📍" title="You are here" subtitle="Jump ahead at any time" />
            </div>

            <div className="flex-1 overflow-auto">
                {currentScene === 'overworld' ? (
                    // Overworld: Show level list
                    <div className="p-2">
                        {LEVELS.map((level) => (
                            <LevelListItem
                                key={level.id}
                                level={level}
                                isUnlocked={levels[level.id]?.unlocked || false}
                                isCompleted={levels[level.id]?.completed || false}
                                isCurrent={false}
                                onClick={() => {
                                    if (levels[level.id]?.unlocked) {
                                        actions.navigateToScene(level.id as SceneId)
                                    }
                                }}
                            />
                        ))}
                    </div>
                ) : isInLevel && currentLevel ? (
                    // In level: Show checklist
                    <div className="p-2">
                        <div className="font-semibold text-sm opacity-50">Checklist</div>
                        {currentLevel.checklistItems.map((item, index) => (
                            <ChecklistItem
                                key={item.id}
                                item={levels[currentLevelId!]?.checklistItems[index] || item}
                                isCurrent={index === 0} // First uncompleted item is current
                            />
                        ))}
                    </div>
                ) : null}
            </div>

            <div className="p-3 space-y-2">
                <ProgressBar progress={isInLevel ? currentLevelProgress : overallProgress} />
                <Lives count={lives} />
                <div className="text-xs opacity-60">
                    {isInLevel ? `${currentLevelProgress}% complete` : `${overallProgress}% complete`}
                </div>
            </div>
        </div>
    )
}
