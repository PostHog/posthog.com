import './StoriesModal.scss'

import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useActions, useValues } from 'kea'
import Stories from 'react-insta-stories'
import { Story } from 'react-insta-stories/dist/interfaces'
import posthog from 'posthog-js'

import { storiesLogic } from './storiesLogic'
import type { story } from './storiesMap'
import Modal from 'components/Modal'

const STORY_INTERVAL = 3000
const MAX_VIDEO_DURATION_MS = 1000000

interface StoryEndEventProps extends StoryEndEventPropsExtraProps {
    reason: string
    story_id: string
    story_title: string
    story_thumbnail_url: string
    time_spent_ms: number
    time_spent_seconds: number
    story_group_id: string
    story_group_title: string
    story_watched_percentage?: number
}

interface StoryEndEventPropsExtraProps {
    next_story_id?: string
    next_story_title?: string
    next_story_thumbnail_url?: string
}

export const StoriesModal = (): JSX.Element | null => {
    const { openStoriesModal, activeGroup, activeStoryIndex, activeStory } = useValues(storiesLogic)
    const { setOpenStoriesModal, setActiveStoryIndex, markStoryAsViewed } = useActions(storiesLogic)
    const storyStartTimeRef = useRef<number>(Date.now())

    // Mark story as viewed when it becomes active
    useEffect(() => {
        if (activeStory && openStoriesModal) {
            markStoryAsViewed(activeStory.id)
        }
    }, [activeStory, markStoryAsViewed, openStoriesModal])

    const maxStoryIndex = useMemo(() => {
        return activeGroup?.stories.length || 0
    }, [activeGroup])

    const sendStoryEndEvent = useCallback(
        (reason: string, extraProps?: StoryEndEventPropsExtraProps) => {
            const timeSpentMs = Date.now() - storyStartTimeRef.current
            const props: StoryEndEventProps = {
                reason: reason,
                story_id: activeGroup?.stories[activeStoryIndex].id,
                story_title: activeGroup?.stories[activeStoryIndex].title,
                story_thumbnail_url: activeGroup?.stories[activeStoryIndex].thumbnailUrl,
                story_group_id: activeGroup?.id,
                story_group_title: activeGroup?.title,
                time_spent_ms: timeSpentMs,
                time_spent_seconds: Math.round(timeSpentMs / 1000),
                story_watched_percentage:
                    activeStory?.durationMs && activeStory?.durationMs > 0
                        ? Math.round((timeSpentMs / activeStory.durationMs) * 100)
                        : undefined,
                ...(extraProps || {}),
            }
            posthog.capture('posthog.com_story_ended', props)
        },
        [activeGroup, activeStoryIndex]
    )

    const handleClose = useCallback(
        (forceClose: boolean) => {
            const timeSpentMs = Date.now() - storyStartTimeRef.current
            posthog.capture('posthog.com_story_closed', {
                reason: forceClose ? 'force_close' : 'natural_close',
                story_id: activeGroup?.stories[activeStoryIndex].id,
                story_title: activeGroup?.stories[activeStoryIndex].title,
                story_thumbnail_url: activeGroup?.stories[activeStoryIndex].thumbnailUrl,
                story_group_id: activeGroup?.id,
                story_group_title: activeGroup?.title,
                time_spent_ms: timeSpentMs,
                time_spent_seconds: Math.round(timeSpentMs / 1000),
            })
            setOpenStoriesModal(false)
        },
        [setOpenStoriesModal, activeGroup, activeStoryIndex]
    )

    const handlePrevious = useCallback(() => {
        if (activeStoryIndex > 0) {
            sendStoryEndEvent('previous')
            setActiveStoryIndex(activeStoryIndex - 1)
        }
    }, [activeStoryIndex, setActiveStoryIndex, sendStoryEndEvent])

    const handleStoryStart = useCallback(
        (index: number) => {
            storyStartTimeRef.current = Date.now()
            posthog.capture('posthog.com_story_started', {
                event: 'started',
                story_id: activeGroup?.stories[index].id,
                story_title: activeGroup?.stories[index].title,
                story_thumbnail_url: activeGroup?.stories[index].thumbnailUrl,
                story_group_id: activeGroup?.id,
                story_group_title: activeGroup?.title,
            })
            setActiveStoryIndex(index)
        },
        [setActiveStoryIndex, activeGroup]
    )

    if (!openStoriesModal || !activeGroup) {
        return null
    }

    const stories = activeGroup.stories.map(
        (story: story): Story => ({
            url: story.mediaUrl,
            type: story.type,
            header: {
                heading: story.title,
                subheading: story.description || '',
                profileImage: story.thumbnailUrl,
            },
            seeMore: () =>
                story.link
                    ? (() => {
                          sendStoryEndEvent('see_more')
                          window.open(story.link, '_self')
                          return <></>
                      })()
                    : undefined,
            preloadResource: true,
        })
    )

    return (
        <Modal
            open={openStoriesModal}
            setOpen={(value: boolean) => {
                setOpenStoriesModal(value)
                if (!value) {
                    handleClose(true)
                }
            }}
        >
            <div className="flex items-center justify-center w-full h-full StoriesModal__modal">
                <Stories
                    stories={stories}
                    defaultInterval={activeStory?.type === 'video' ? MAX_VIDEO_DURATION_MS : STORY_INTERVAL}
                    width="100%"
                    height="100%"
                    currentIndex={activeStoryIndex}
                    onNext={() => {
                        sendStoryEndEvent('next')
                        setActiveStoryIndex(Math.min(activeStoryIndex + 1, maxStoryIndex))
                    }}
                    onPrevious={handlePrevious}
                    onAllStoriesEnd={() => {
                        handleClose(false)
                    }}
                    onStoryEnd={() => {
                        sendStoryEndEvent('ended_naturally')
                        setActiveStoryIndex(Math.min(activeStoryIndex + 1, maxStoryIndex))
                    }}
                    onStoryStart={handleStoryStart}
                    storyContainerStyles={{
                        maxWidth: '390px',
                        minWidth: '390px',
                        maxHeight: '700px',
                        minHeight: '700px',
                    }}
                />
            </div>
        </Modal>
    )
}
