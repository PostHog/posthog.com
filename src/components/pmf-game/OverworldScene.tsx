import React, { useState } from 'react'
import { SceneId, LevelProgress, HoverCharacter } from '../../data/pmf-game/types'
import { LEVELS } from '../../data/pmf-game/levels'

const SHOW_HOVER_CHARACTERS = true // Toggle to enable/disable hover characters

interface OverworldSceneProps {
    levels: Record<string, LevelProgress>
    onSelectLevel: (levelId: SceneId) => void
}

function LevelCard({
    level,
    progress,
    onSelect,
    hoverCharacter,
}: {
    level: { id: string; name: string; theme: string; description: string }
    progress: LevelProgress | undefined
    onSelect: () => void
    hoverCharacter?: HoverCharacter
}) {
    const [isHovered, setIsHovered] = useState(false)
    const isUnlocked = progress?.unlocked || false
    const isCompleted = progress?.completed || false

    // Calculate progress from checklist items
    const checklistItems = progress?.checklistItems || []
    const completedCount = checklistItems.filter((item) => item.completed).length
    const totalCount = checklistItems.length
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

    return (
        <div className="relative">
            {/* Hover character - slides up from behind the card */}
            {SHOW_HOVER_CHARACTERS && hoverCharacter && (
                <>
                    <div
                        className={`absolute left-4 z-0 transition-all duration-300 ease-out ${
                            isHovered ? '-top-16 opacity-100' : 'top-0 opacity-0'
                        }`}
                    >
                        <img src={hoverCharacter.image} alt="" className="w-20 h-20 object-contain" />
                    </div>
                    {/* Dialogue bubble - appears with character */}
                    <div
                        className={`absolute -top-16 left-24 z-20 transition-all duration-300 ease-out ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className="p-2 text-sm bg-white border-2 border-black max-w-[200px] relative">
                            {hoverCharacter.name && <div className="font-bold text-xs mb-1">{hoverCharacter.name}</div>}
                            {hoverCharacter.dialogue}
                            {/* Speech bubble tail - pointing left toward sprite */}
                            <div className="absolute top-4 -left-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-black" />
                            <div className="absolute top-[17px] -left-1 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-white" />
                        </div>
                    </div>
                </>
            )}
            <button
                onClick={onSelect}
                disabled={!isUnlocked}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative z-10 p-4 border-4 border-black text-left transition-all w-full ${
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
                                <div
                                    className="h-full bg-green transition-all"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <div className="text-xs mt-1">{progressPercent}% complete</div>
                        </div>
                    )}
                </div>
            </button>
        </div>
    )
}

const OVERWORLD_BG_URL = 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Group_10017_8103dadb0f.png'

export default function OverworldScene({ levels, onSelectLevel }: OverworldSceneProps): JSX.Element {
    return (
        <div className="relative pb-24">
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
                <div className="text-center mb-20">
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="line-through italic">Your office</span> World map
                    </h1>
                    <p className="text-lg opacity-70">Select a level to continue your journey towards PMF</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20">
                    {LEVELS.map((level) => (
                        <LevelCard
                            key={level.id}
                            level={level}
                            progress={levels[level.id]}
                            onSelect={() => onSelectLevel(level.id as SceneId)}
                            hoverCharacter={level.hoverCharacter}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
