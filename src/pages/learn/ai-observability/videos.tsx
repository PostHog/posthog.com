import React from 'react'
import { IconVideoCamera } from '@posthog/icons'
import LearnPage from 'components/Learn/LearnPage'
import VideoCard from 'components/Learn/LearnTV/VideoCard'
import { LEARN_VIDEOS } from 'components/Learn/LearnTV/videos'
import usePostHog from 'hooks/usePostHog'

const videos = LEARN_VIDEOS.filter((video) => video.productHandle === 'ai_observability')

/** AI Observability's Videos page: a header, then a card per lesson. Each card opens the Learn TV window. */
export default function AiObservabilityVideos(): JSX.Element {
    const posthog = usePostHog()
    return (
        <LearnPage
            productHandle="ai_observability"
            title="Watch AI Observability lessons – Learn – PostHog"
            description="Short video lessons on AI Observability, with captions and a transcript you can follow along."
        >
            <div className="not-prose @container min-w-0">
                <div className="mb-3 flex items-center gap-3">
                    {/* The same icon and color as Videos in the /learn sidebar. */}
                    <IconVideoCamera className="size-6 shrink-0 text-brand-tangerine" />
                    <h1 className="m-0 text-2xl font-bold">Watch AI Observability lessons</h1>
                </div>
                <h2 className="mt-0 mb-4 text-base font-medium text-secondary">
                    Short lessons about PostHog products. For your viewing pleasure.
                </h2>
                <p className="m-0 leading-relaxed">
                    Each lesson covers a real problem in one of Twig's AI features and solves it in PostHog, step by
                    step.
                </p>

                <ul className="m-0 mt-8 grid list-none gap-4 border-t border-primary p-0 pt-8 @md:grid-cols-2 @3xl:grid-cols-3">
                    {videos.map((video) => (
                        <li key={video.slug}>
                            <VideoCard
                                video={video}
                                onOpen={() =>
                                    posthog?.capture('learn_resource_selected', {
                                        resource: 'video',
                                        option: video.slug,
                                        surface: 'ai_observability_videos',
                                    })
                                }
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </LearnPage>
    )
}
