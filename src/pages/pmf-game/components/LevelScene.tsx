import React from 'react'
import { LevelData, Resource, LevelProgress } from '../data/types'
import PixelBorder from './PixelBorder'
import OSButton from 'components/OSButton'
import { IconArrowRight, IconBookmark } from '@posthog/icons'

interface LevelSceneProps {
    level: LevelData
    levelNumber: number
    progress: LevelProgress
    onSaveResource: (resource: Resource) => void
    onCompleteChecklist: (itemId: string) => void
}

function QuestCard({ quest }: { quest: LevelData['quest'] }) {
    return (
        <PixelBorder backgroundColor="#fefce8" className="p-6">
            <h3 className="font-game text-xl font-bold mb-2">{quest.title}</h3>
            <p className="text-sm mb-4">{quest.description}</p>
            {quest.command && (
                <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm rounded">
                    <code>{quest.command}</code>
                </div>
            )}
        </PixelBorder>
    )
}

function ContentCard({
    resource,
    onSave,
    actionLabel = 'Read now',
    saveLabel,
    label,
}: {
    resource: Resource
    onSave?: () => void
    actionLabel?: string
    saveLabel?: string
    label?: string
}) {
    return (
        <PixelBorder className="p-4 flex gap-4">
            <div className="w-24 h-24 bg-gray-200 border-2 border-black flex-shrink-0 flex items-center justify-center">
                {resource.type === 'video' && <span className="text-2xl">▶️</span>}
            </div>
            <div className="flex-1">
                {label && <div className="text-xs font-bold opacity-60 mb-1">{label}</div>}
                <h4 className="font-game font-bold text-orange-600 mb-1">{resource.title}</h4>
                <p className="text-sm opacity-70 line-clamp-2">{resource.description}</p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
                {saveLabel && onSave && (
                    <OSButton variant="secondary" size="sm" onClick={onSave}>
                        <IconBookmark className="size-4" /> {saveLabel}
                    </OSButton>
                )}
                <OSButton variant="secondary" size="sm" asLink to={resource.url}>
                    <IconArrowRight className="size-4" /> {actionLabel}
                </OSButton>
            </div>
        </PixelBorder>
    )
}

function CustomerStoryCard({ resource }: { resource: Resource }) {
    return (
        <PixelBorder className="p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <span className="font-bold">{resource.company}</span>
            </div>
            <h4 className="font-game font-bold mb-2">{resource.title}</h4>
            {resource.quote && <p className="text-sm italic opacity-70 mb-3 flex-1">{resource.quote}</p>}
            <OSButton variant="secondary" size="sm" asLink to={resource.url}>
                Read the story
            </OSButton>
        </PixelBorder>
    )
}

const SPRITE_SIZE = 80
const SPRITE_SHEET_WIDTH = SPRITE_SIZE * 8
const X_FRAMES = SPRITE_SHEET_WIDTH / SPRITE_SIZE
const FPS = 24

type AnimationName = 'wave' | 'flag' | 'phone'

const animations: Record<AnimationName, { img: string; frames: number }> = {
    wave: { img: 'wave', frames: 26 },
    flag: { img: 'flag', frames: 25 },
    phone: { img: 'phone', frames: 28 },
}

const INITIAL_DELAY = 3000

function MaxWisdom({ wisdom, animation = 'flag' }: { wisdom: string; animation?: AnimationName }) {
    const [frame, setFrame] = React.useState(0)
    const [hasPlayedInitial, setHasPlayedInitial] = React.useState(false)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const currentAnimation = animations[animation]

    React.useEffect(() => {
        // Reset when animation changes
        setFrame(0)
        setHasPlayedInitial(false)
        setIsPlaying(false)
    }, [animation])

    // Initial auto-play after delay (plays once)
    React.useEffect(() => {
        if (hasPlayedInitial) {
            return
        }

        const delayTimer = setTimeout(() => {
            setIsPlaying(true)
            setHasPlayedInitial(true)
        }, INITIAL_DELAY)
        return () => clearTimeout(delayTimer)
    }, [hasPlayedInitial])

    // Hover animation - plays once
    React.useEffect(() => {
        if (!isPlaying) {
            return
        }

        const timer = setInterval(() => {
            setFrame((f) => {
                const nextFrame = f + 1
                if (nextFrame >= currentAnimation.frames) {
                    clearInterval(timer)
                    setIsPlaying(false)
                    return 0
                }
                return nextFrame
            })
        }, 1000 / FPS)
        return () => clearInterval(timer)
    }, [isPlaying, currentAnimation.frames])

    const handleClick = () => {
        if (!isPlaying) {
            setFrame(0)
            setIsPlaying(true)
        }
    }

    return (
        <div className="flex items-end gap-2 items-center">
            <div
                className="w-16 h-16 rounded-full border-2 border-black bg-white flex-shrink-0 overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={handleClick}
            >
                <div
                    className="rendering-pixelated"
                    style={{
                        width: SPRITE_SIZE,
                        height: SPRITE_SIZE,
                        backgroundImage: `url(/images/pmf-game/${currentAnimation.img}.png)`,
                        backgroundPosition: `-${(frame % X_FRAMES) * SPRITE_SIZE}px -${
                            Math.floor(frame / X_FRAMES) * SPRITE_SIZE
                        }px`,
                        backgroundSize: `${SPRITE_SIZE * X_FRAMES}px auto`,
                        backgroundRepeat: 'no-repeat',
                        transform: 'scale(1.1) translateY(5%) translateX(-8%)',
                    }}
                />
            </div>
            <div
                className="p-2 text-sm max-w-xs bg-white border-2 border-black"
                dangerouslySetInnerHTML={{ __html: wisdom }}
            />
        </div>
    )
}

export default function LevelScene({
    level,
    levelNumber,
    progress,
    onSaveResource,
    onCompleteChecklist,
}: LevelSceneProps): JSX.Element {
    const blogs = level.resources.filter((r) => r.type === 'blog')
    const customerStories = level.resources.filter((r) => r.type === 'customer-story')
    const videos = level.resources.filter((r) => r.type === 'video')

    return (
        <div className="max-w-screen-lg mx-auto">
            {/* Hero Image with Overlaid Header */}
            <div className="relative w-full h-80 overflow-hidden">
                {level.illustration ? (
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${level.illustration})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-accent dark:bg-accent-dark" />
                )}

                {/* Dark overlay for text legibility */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Top left: Level number and name */}
                <div className="absolute top-0 left-0 w-1/2 flex flex-col items-start gap-2 p-6">
                    <PixelBorder as="button" className="px-4 py-2 font-game text-lg hover:bg-yellow-100 bg-white">
                        LEVEL {String(levelNumber).padStart(2, '0')} ▶
                    </PixelBorder>
                    <h1 className="font-game text-5xl font-bold text-white">{level.name}</h1>
                </div>

                {/* Bottom right: Max Wisdom */}
                {level.maxWisdom && (
                    <div className="absolute bottom-8 right-8">
                        <MaxWisdom wisdom={level.maxWisdom} />
                    </div>
                )}
            </div>

            <div className="p-8">
                {/* Quest Section */}
                <div className="mb-8">
                    <PixelBorder
                        inline
                        borderColor="#ef4444"
                        backgroundColor="#ef4444"
                        className="px-4 py-2 text-white font-game text-lg"
                    >
                        Quest
                    </PixelBorder>
                    <div className="mt-4">
                        <QuestCard quest={level.quest} />
                    </div>
                </div>

                {/* Resources Section */}
                {level.resources.length > 0 && (
                    <div className="mb-8">
                        <PixelBorder
                            inline
                            borderColor="#22c55e"
                            backgroundColor="#22c55e"
                            className="px-4 py-2 text-white font-game text-lg"
                        >
                            Resources
                        </PixelBorder>

                        {/* Blog Posts */}
                        {blogs.length > 0 && (
                            <div className="space-y-4 mb-6 mt-4">
                                {blogs.map((resource) => (
                                    <ContentCard
                                        key={resource.id}
                                        resource={resource}
                                        onSave={() => onSaveResource(resource)}
                                        label="Blog"
                                        actionLabel="Read now"
                                        saveLabel="Read later"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Customer Stories */}
                        {customerStories.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {customerStories.map((resource) => (
                                    <CustomerStoryCard key={resource.id} resource={resource} />
                                ))}
                            </div>
                        )}

                        {/* Videos */}
                        {videos.length > 0 && (
                            <div className="space-y-4">
                                {videos.map((resource) => (
                                    <ContentCard
                                        key={resource.id}
                                        resource={resource}
                                        onSave={() => onSaveResource(resource)}
                                        label="Video"
                                        actionLabel="Watch now"
                                        saveLabel="Watch later"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
