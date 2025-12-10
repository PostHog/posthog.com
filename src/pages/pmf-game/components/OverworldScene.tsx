import React from 'react'
import { SceneId, LevelProgress } from '../data/types'
import { LEVELS } from '../data/levels'

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
    const progressPercent = progress?.progress || 0

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
                <h3 className="font-game text-lg font-bold">{level.name}</h3>
                <p className="text-sm opacity-70">{level.theme}</p>

                {isUnlocked && (
                    <div className="mt-2">
                        <div className="h-2 bg-gray-300 border border-black">
                            <div className="h-full bg-green-500" style={{ width: `${progressPercent}%` }} />
                        </div>
                        <div className="text-xs mt-1">{progressPercent}% complete</div>
                    </div>
                )}
            </div>
        </button>
    )
}

export default function OverworldScene({ levels, onSelectLevel }: OverworldSceneProps): JSX.Element {
    return (
        <div className="max-w-screen-lg mx-auto p-8">
            <div className="text-center mb-8">
                <h1 className="font-game text-4xl font-bold mb-2">World Map</h1>
                <p className="text-lg opacity-70">Select a level to continue your journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LEVELS.map((level, index) => (
                    <LevelCard
                        key={level.id}
                        level={level}
                        progress={levels[level.id]}
                        onSelect={() => onSelectLevel(level.id as SceneId)}
                    />
                ))}
            </div>

            {/* Decorative map illustration placeholder */}
            <div className="mt-12 p-8 border-4 border-dashed border-gray-300 text-center">
                <p className="text-gray-400 font-game">🗺️ Isometric world map illustration goes here</p>
            </div>
        </div>
    )
}
