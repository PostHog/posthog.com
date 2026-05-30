import React, { useState, useEffect } from 'react'
import { LevelData, Resource, LevelProgress } from '../../data/pmf-game/types'
import PixelBorder from './PixelBorder'
import OSButton from 'components/OSButton'
import * as Icons from '@posthog/icons'

const { IconArrowRight, IconBookmark, IconCheck } = Icons

const HANDBOOK_SHOWN_KEY = 'posthog-pmf-game-handbook-shown'

interface LevelSceneProps {
    level: LevelData
    levelNumber: number
    progress: LevelProgress
    onSaveResource: (resource: Resource) => void
    onCompleteChecklist: (itemId: string) => void
    savedResourceIds: string[]
}

function HandbookPopup({ onAccept, onClose }: { onAccept: () => void; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <PixelBorder className="bg-white max-w-md p-6 text-center">
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Classic_99d80b3b01.png"
                    alt="Handbook"
                    className="w-20 h-20 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">It's dangerous to go alone!</h2>
                <p className="text-lg mb-4">Take this.</p>
                <p className="text-sm opacity-70 mb-6">
                    The PostHog Handbook contains everything you need to know about building products, running a
                    startup, and finding product-market fit.
                </p>
                <div className="flex flex-col gap-2">
                    <OSButton variant="primary" size="lg" width="full" onClick={onAccept}>
                        Add to inventory
                    </OSButton>
                    <button onClick={onClose} className="text-sm opacity-50 hover:opacity-100 transition-opacity">
                        No thanks
                    </button>
                </div>
            </PixelBorder>
        </div>
    )
}

function QuestCard({ quest }: { quest: LevelData['quest'] }) {
    return (
        <PixelBorder className="p-6">
            <h3 className=" text-xl font-bold mb-2">{quest.title}</h3>
            <div className="mb-4" dangerouslySetInnerHTML={{ __html: quest.description }} />
        </PixelBorder>
    )
}

function ContentCard({
    resource,
    onSave,
    actionLabel = 'Read now',
    saveLabel,
    label,
    isSaved = false,
}: {
    resource: Resource
    onSave?: () => void
    actionLabel?: string
    saveLabel?: string
    label?: string
    isSaved?: boolean
}) {
    return (
        <PixelBorder className="p-4 flex gap-4">
            <div className="w-32 h-20 bg-gray-200 border-2 border-black flex-shrink-0 flex items-center justify-center overflow-hidden">
                {resource.image ? (
                    <img src={resource.image} alt="" className="w-full h-full object-cover" />
                ) : resource.type === 'video' ? (
                    <div className="w-full h-full bg-dark flex items-center justify-center">
                        <span className="text-3xl">▶️</span>
                    </div>
                ) : (
                    <div className="w-full h-full bg-accent flex items-center justify-center">
                        <span className="text-2xl">📄</span>
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                {label && <div className="text-xs font-bold opacity-60">{label}</div>}
                <h4 className="font-bold text-orange-600">{resource.title}</h4>
                <p className="text-sm opacity-70 line-clamp-2 mt-0.5">{resource.description}</p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
                {saveLabel && onSave && !isSaved && (
                    <OSButton variant="secondary" size="sm" onClick={onSave}>
                        <IconBookmark className="size-4" /> {saveLabel}
                    </OSButton>
                )}
                {isSaved && (
                    <span className="text-sm text-green font-medium flex items-center gap-1">
                        <IconCheck className="size-4" /> Saved
                    </span>
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
            <h4 className=" font-bold mb-2">{resource.title}</h4>
            {resource.quote && <p className="text-sm italic opacity-70 mb-3 flex-1">{resource.quote}</p>}
            <OSButton variant="secondary" size="sm" asLink to={resource.url}>
                Read the story
            </OSButton>
        </PixelBorder>
    )
}

function ProductCard({ resource }: { resource: Resource }) {
    const Icon = resource.icon
        ? (Icons as Record<string, React.ComponentType<{ className?: string }>>)[resource.icon]
        : null

    return (
        <PixelBorder className="p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                {Icon && <Icon className={`size-6 ${resource.iconColor || ''}`} />}
                <span className="text-md font-bold">{resource.title}</span>
            </div>
            {resource.description && (
                <div className="text-sm mb-3 flex-1" dangerouslySetInnerHTML={{ __html: resource.description }} />
            )}
            <OSButton variant="secondary" size="sm" asLink to={resource.url}>
                Learn more
            </OSButton>
        </PixelBorder>
    )
}

const SPRITE_SIZE = 80
const SPRITE_SHEET_WIDTH = SPRITE_SIZE * 8
const X_FRAMES = SPRITE_SHEET_WIDTH / SPRITE_SIZE
const FPS = 24

type AnimationName = 'wave' | 'flag' | 'phone'
type AnimationOption = AnimationName | 'random'

const animations: Record<AnimationName, { img: string; frames: number }> = {
    wave: { img: 'wave', frames: 26 },
    flag: { img: 'flag', frames: 25 },
    phone: { img: 'phone', frames: 28 },
}

const animationNames: AnimationName[] = ['wave', 'flag', 'phone']

const getRandomAnimation = (): AnimationName => {
    return animationNames[Math.floor(Math.random() * animationNames.length)]
}

const INITIAL_DELAY = 5000

function MaxWisdom({ wisdom, animation = 'random' }: { wisdom: string; animation?: AnimationOption }) {
    const [frame, setFrame] = React.useState(0)
    const [hasPlayedInitial, setHasPlayedInitial] = React.useState(false)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [currentAnimationName, setCurrentAnimationName] = React.useState<AnimationName>(
        animation === 'random' ? getRandomAnimation() : animation
    )
    const currentAnimation = animations[currentAnimationName]

    React.useEffect(() => {
        if (animation !== 'random') {
            setCurrentAnimationName(animation)
        }
    }, [animation])

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
            if (animation === 'random') {
                setCurrentAnimationName(getRandomAnimation())
            }
            setFrame(0)
            setIsPlaying(true)
        }
    }

    // Typewriter effect - character by character
    const [displayedChars, setDisplayedChars] = React.useState(0)
    const [hasStartedTyping, setHasStartedTyping] = React.useState(false)
    const plainText = React.useMemo(() => {
        // Strip HTML tags for character counting
        // Use iterative replacement to handle nested/malformed tags (for CodeQL security)
        let text = wisdom
        let previous = ''
        while (text !== previous) {
            previous = text
            text = text.replace(/<[^>]*>/g, '')
        }
        return text
    }, [wisdom])

    React.useEffect(() => {
        if (hasStartedTyping) return

        const delayTimer = setTimeout(() => {
            setHasStartedTyping(true)
        }, 1000)
        return () => clearTimeout(delayTimer)
    }, [hasStartedTyping])

    React.useEffect(() => {
        if (!hasStartedTyping || displayedChars >= plainText.length) return

        const charTimer = setTimeout(() => {
            setDisplayedChars((c) => c + 1)
        }, 30) // 30ms per character
        return () => clearTimeout(charTimer)
    }, [hasStartedTyping, displayedChars, plainText.length])

    // Build the displayed HTML by counting visible characters
    const displayedHtml = React.useMemo(() => {
        if (displayedChars >= plainText.length) return wisdom

        let visibleCount = 0
        let result = ''
        let inTag = false

        for (let i = 0; i < wisdom.length; i++) {
            const char = wisdom[i]
            if (char === '<') {
                inTag = true
                result += char
            } else if (char === '>') {
                inTag = false
                result += char
            } else if (inTag) {
                result += char
            } else {
                if (visibleCount < displayedChars) {
                    result += char
                    visibleCount++
                } else {
                    break
                }
            }
        }
        return result
    }, [wisdom, displayedChars, plainText.length])

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
            <div className="p-2 text-sm bg-white border-2 border-black" style={{ width: '20rem' }}>
                <div dangerouslySetInnerHTML={{ __html: displayedHtml }} />
            </div>
        </div>
    )
}

const HANDBOOK_RESOURCE: Resource = {
    id: 'posthog-handbook',
    type: 'handbook',
    title: 'The PostHog Handbook',
    description: 'Everything you need to know about building products and finding PMF.',
    url: '/handbook',
    image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Classic_99d80b3b01.png',
}

export default function LevelScene({
    level,
    levelNumber,
    progress,
    onSaveResource,
    onCompleteChecklist,
    savedResourceIds,
}: LevelSceneProps): JSX.Element {
    const [showHandbookPopup, setShowHandbookPopup] = useState(false)

    // Show handbook popup on first visit to level 1
    useEffect(() => {
        if (levelNumber === 1 && typeof window !== 'undefined') {
            const hasSeenPopup = localStorage.getItem(HANDBOOK_SHOWN_KEY)
            if (!hasSeenPopup) {
                // Small delay so it feels intentional
                const timer = setTimeout(() => setShowHandbookPopup(true), 500)
                return () => clearTimeout(timer)
            }
        }
    }, [levelNumber])

    const handleAcceptHandbook = () => {
        onSaveResource(HANDBOOK_RESOURCE)
        localStorage.setItem(HANDBOOK_SHOWN_KEY, 'true')
        setShowHandbookPopup(false)
    }

    const handleCloseHandbook = () => {
        localStorage.setItem(HANDBOOK_SHOWN_KEY, 'true')
        setShowHandbookPopup(false)
    }

    const blogs = level.resources.filter((r) => r.type === 'blog')
    const customerStories = level.resources.filter((r) => r.type === 'customer-story')
    const videos = level.resources.filter((r) => r.type === 'video')
    const products = level.products || []

    return (
        <>
            {showHandbookPopup && <HandbookPopup onAccept={handleAcceptHandbook} onClose={handleCloseHandbook} />}
            <div className="max-w-screen-xl mx-auto">
                {/* Hero Image with Overlaid Header */}
                <div className="relative w-full h-96 overflow-hidden">
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
                    <div className="absolute top-0 left-0 w-1/2 flex flex-col items-start gap-2 pl-10 py-14">
                        <PixelBorder as="button" className="px-4 py-2 text-lg hover:bg-yellow-100 bg-white">
                            LEVEL {String(levelNumber).padStart(2, '0')} ▶
                        </PixelBorder>
                        <h1 className=" text-5xl font-bold text-white">{level.name}</h1>
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
                            className="px-4 py-2 text-white  text-lg"
                        >
                            Quest
                        </PixelBorder>
                        <div className="mt-4">
                            <QuestCard quest={level.quest} />
                        </div>
                    </div>

                    {/* Products */}
                    {products.length > 0 && (
                        <div className="mb-8">
                            <PixelBorder
                                inline
                                borderColor="#3b82f6"
                                backgroundColor="#3b82f6"
                                className="px-4 py-2 text-white  text-lg"
                            >
                                Dev tools
                            </PixelBorder>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-4">
                                {products.map((resource) => (
                                    <ProductCard key={resource.id} resource={resource} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Resources Section */}
                    {level.resources.length > 0 && (
                        <div className="mb-8">
                            <PixelBorder
                                inline
                                borderColor="#22c55e"
                                backgroundColor="#22c55e"
                                className="px-4 py-2 text-white  text-lg"
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
                                            isSaved={savedResourceIds.includes(resource.id)}
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
                                            isSaved={savedResourceIds.includes(resource.id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
