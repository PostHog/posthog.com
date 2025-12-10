import React from 'react'
import { SceneId, LevelProgress } from '../../../data/pmf-game/types'
import { LEVELS } from '../../../data/pmf-game/levels'

interface OverworldSceneProps {
    levels: Record<string, LevelProgress>
    onSelectLevel: (levelId: SceneId) => void
}

function LevelCard({
    level,
    progress,
    onSelect,
}: {
    level: { id: string; name: string; theme: string; description: string }
    progress: LevelProgress | undefined
    onSelect: () => void
}) {
    const isUnlocked = progress?.unlocked || false
    const isCompleted = progress?.completed || false

    // Calculate progress from checklist items
    const checklistItems = progress?.checklistItems || []
    const completedCount = checklistItems.filter((item) => item.completed).length
    const totalCount = checklistItems.length
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

    return (
        <button
            onClick={onSelect}
            disabled={!isUnlocked}
            className={`relative p-4 border-4 border-black text-left transition-all ${
                isUnlocked
                    ? 'bg-white hover:bg-yellow-100 hover:shadow-[4px_4px_0_0_#000] cursor-pointer'
                    : 'bg-gray-200 opacity-60 cursor-not-allowed'
            } ${isCompleted ? 'border-green-500' : ''}`}
        >
            {/* Lock overlay */}
            {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="text-4xl">🔒</span>
                </div>
            )}

            {/* Completed badge */}
            {isCompleted && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 text-xs font-bold border-2 border-black">
                    ✓ Complete
                </div>
            )}

            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{level.name}</h3>
                <p className="text-sm opacity-70">{level.description}</p>

                {isUnlocked && (
                    <div className="mt-2">
                        <div className="h-2 bg-gray-200 border border-black overflow-hidden">
                            <div className="h-full bg-green transition-all" style={{ width: `${progressPercent}%` }} />
                        </div>
                        <div className="text-xs mt-1">{progressPercent}% complete</div>
                    </div>
                )}
            </div>
        </button>
    )
}

const OVERWORLD_BG_URL = 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Group_10017_8103dadb0f.png'

export default function OverworldScene({ levels, onSelectLevel }: OverworldSceneProps): JSX.Element {
    return (
        <div className="relative pb-16">
            {/* Background image - absolute positioned */}
            <div
                className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none"
                style={{
                    backgroundImage: `url(${OVERWORLD_BG_URL})`,
                    backgroundPosition: 'center 30%',
                    backgroundSize: '100% 120%',
                }}
            />
            {/* Content */}
            <div className="relative max-w-screen-lg mx-auto p-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="line-through italic">Your office</span> World map
                    </h1>
                    <p className="text-lg opacity-70">Select a level to continue your journey towards PMF</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
                    {LEVELS.map((level, index) => (
                        <LevelCard
                            key={level.id}
                            level={level}
                            progress={levels[level.id]}
                            onSelect={() => onSelectLevel(level.id as SceneId)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
