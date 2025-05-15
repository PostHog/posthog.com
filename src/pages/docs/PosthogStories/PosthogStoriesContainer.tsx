import React from 'react'
import { useActions, useValues } from 'kea'

import { storiesLogic } from './storiesLogic'
import type { storyGroup } from './storiesMap'
import { StoriesModal } from './StoriesModal'
import ImageSlider from 'components/ImageSlider'

interface PosthogStoriesContainerProps {
    groupId: string
}

export const PosthogStoriesContainer = ({ groupId }: PosthogStoriesContainerProps): JSX.Element => {
    const { stories, isStoryViewed } = useValues(storiesLogic)
    const { setActiveGroupIndex, setOpenStoriesModal, setActiveStoryIndex } = useActions(storiesLogic)

    const filteredStoryGroup = stories.find((group: storyGroup) => group.id === groupId)

    if (!filteredStoryGroup) {
        return <></>
    }

    const groupIndex = stories.findIndex((group: storyGroup) => group.id === groupId)

    return (
        <>
            <div className="PosthogStoriesContainer w-full max-w-4xl mx-auto">
                <ImageSlider slidesToShow={4} slidesToScroll={1}>
                    {filteredStoryGroup.stories.map((story, storyIndex) => {
                        const hasStoryBeenViewed = isStoryViewed(story.id)
                        return (
                            <div
                                key={story.id}
                                className={`relative cursor-pointer group transition-opacity ${hasStoryBeenViewed ? 'opacity-60' : ''}`}
                                onClick={() => {
                                    setActiveStoryIndex(storyIndex)
                                    setActiveGroupIndex(groupIndex)
                                    setOpenStoriesModal(true)
                                }}
                            >
                                <img
                                    src={story.thumbnailUrl}
                                    alt={story.title}
                                    className="w-[180px] h-[320px] object-cover rounded-lg border border-light dark:border-dark shadow-md group-hover:scale-[1.03] transition-transform duration-200"
                                />
                                {story.type === 'video' && (
                                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded flex items-center gap-1 opacity-70">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <span className="text-xs">Video</span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </ImageSlider>
            </div>
            <StoriesModal />
        </>
    )
}
