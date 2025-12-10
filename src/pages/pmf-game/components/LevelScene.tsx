import React from 'react'
import { LevelData, Resource, LevelProgress } from '../data/types'

interface LevelSceneProps {
    level: LevelData
    levelNumber: number
    progress: LevelProgress
    onSaveResource: (resource: Resource) => void
    onCompleteChecklist: (itemId: string) => void
}

function QuestCard({ quest }: { quest: LevelData['quest'] }) {
    return (
        <div className="border-4 border-black bg-yellow-50 p-6">
            <h3 className="font-game text-xl font-bold mb-2">{quest.title}</h3>
            <p className="text-sm mb-4">{quest.description}</p>
            {quest.command && (
                <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm rounded">
                    <code>{quest.command}</code>
                </div>
            )}
        </div>
    )
}

function BlogCard({ resource, onSave }: { resource: Resource; onSave: () => void }) {
    return (
        <div className="border-4 border-black bg-white p-4 flex gap-4">
            <div className="w-24 h-24 bg-gray-200 border-2 border-black flex-shrink-0" />
            <div className="flex-1">
                <div className="text-xs font-bold opacity-60 mb-1">Blog</div>
                <h4 className="font-game font-bold text-orange-600 mb-1">{resource.title}</h4>
                <p className="text-sm opacity-70 line-clamp-2">{resource.description}</p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                    onClick={onSave}
                    className="px-3 py-1 border-2 border-black bg-white hover:bg-yellow-100 text-sm flex items-center gap-1"
                >
                    📑 Read later
                </button>
                <a
                    href={resource.url}
                    className="px-3 py-1 border-2 border-black bg-white hover:bg-yellow-100 text-sm flex items-center gap-1"
                >
                    → Read now
                </a>
            </div>
        </div>
    )
}

function CustomerStoryCard({ resource }: { resource: Resource }) {
    return (
        <div className="border-4 border-black bg-white p-4">
            <div className="flex items-center gap-2 mb-2">
                <span className="font-bold">{resource.company}</span>
            </div>
            <h4 className="font-game font-bold mb-2">{resource.title}</h4>
            {resource.quote && <p className="text-sm italic opacity-70 mb-3">{resource.quote}</p>}
            <a
                href={resource.url}
                className="inline-block px-3 py-1 border-2 border-black bg-white hover:bg-yellow-100 text-sm"
            >
                Read the story
            </a>
        </div>
    )
}

function VideoCard({ resource }: { resource: Resource }) {
    return (
        <div className="border-4 border-black bg-white p-4 flex gap-4">
            <div className="w-24 h-24 bg-gray-200 border-2 border-black flex-shrink-0 flex items-center justify-center">
                <span className="text-2xl">▶️</span>
            </div>
            <div className="flex-1">
                <div className="text-xs font-bold opacity-60 mb-1">Video</div>
                <h4 className="font-game font-bold text-orange-600 mb-1">{resource.title}</h4>
                <p className="text-sm opacity-70 line-clamp-2">{resource.description}</p>
            </div>
            <div className="flex-shrink-0">
                <a
                    href={resource.url}
                    className="px-3 py-1 border-2 border-black bg-white hover:bg-yellow-100 text-sm flex items-center gap-1"
                >
                    → Watch now
                </a>
            </div>
        </div>
    )
}

function MaxWisdom({ wisdom }: { wisdom: string }) {
    return (
        <div className="absolute bottom-4 right-4 flex items-end gap-2">
            <div className="bg-white border-2 border-black p-2 rounded-lg text-sm max-w-xs">{wisdom}</div>
            <div className="w-12 h-12 bg-gray-200 border-2 border-black rounded-full flex items-center justify-center">
                🦔
            </div>
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
        <div className="max-w-screen-lg mx-auto p-8">
            {/* Level Header */}
            <div className="mb-6">
                <button className="px-4 py-2 bg-white border-4 border-black font-game text-lg hover:bg-yellow-100">
                    LEVEL {String(levelNumber).padStart(2, '0')} ▶
                </button>
            </div>

            {/* Level Illustration */}
            <div className="relative mb-8 border-4 border-black bg-gradient-to-b from-blue-200 to-green-200 h-64 flex items-center justify-center">
                <h2 className="font-game text-4xl font-bold text-center drop-shadow-lg">{level.name}</h2>
                {level.maxWisdom && <MaxWisdom wisdom={level.maxWisdom} />}
            </div>

            {/* Quest Section */}
            <div className="mb-8">
                <div className="inline-block px-4 py-2 bg-red-500 text-white font-game text-lg border-4 border-black mb-4 -rotate-2">
                    Quest
                </div>
                <QuestCard quest={level.quest} />
            </div>

            {/* Resources Section */}
            {level.resources.length > 0 && (
                <div className="mb-8">
                    <div className="inline-block px-4 py-2 bg-green-500 text-white font-game text-lg border-4 border-black mb-4 -rotate-2">
                        Resources
                    </div>

                    {/* Blog Posts */}
                    {blogs.length > 0 && (
                        <div className="space-y-4 mb-6">
                            {blogs.map((resource) => (
                                <BlogCard
                                    key={resource.id}
                                    resource={resource}
                                    onSave={() => onSaveResource(resource)}
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
                                <VideoCard key={resource.id} resource={resource} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
