import React from 'react'
import { IconVideoCamera } from '@posthog/icons'
import useProduct from 'hooks/useProduct'
import { learnTrackingVolume } from '../../constants/pocketGuides'
import usePostHog from 'hooks/usePostHog'
import LearnPage from './LearnPage'
import VideoCard from './LearnTV/VideoCard'
import { LEARN_VIDEOS } from './LearnTV/videos'

interface LearnVideosPageProps {
    /** `handle` from `src/hooks/productData/*`. Also selects the videos, by `LearnVideo.productHandle`. */
    productHandle: string
    productName: string
    /** The line under the subtitle, about what the product's lessons cover. */
    intro: string
}

/** A Learn hub's Videos page: the header, then a card for each of the product's videos. Each card opens Learn TV. */
export default function LearnVideosPage({ productHandle, productName, intro }: LearnVideosPageProps): JSX.Element {
    const posthog = usePostHog()
    const volume = learnTrackingVolume(useProduct({ handle: productHandle }) as any)
    const videos = LEARN_VIDEOS.filter((video) => video.productHandle === productHandle)
    return (
        <LearnPage
            productHandle={productHandle}
            title={`Watch ${productName} lessons – Learn – PostHog`}
            description={`Short video lessons on ${productName}, with captions and a transcript you can follow along.`}
        >
            <div className="not-prose @container min-w-0">
                <div className="mb-3 flex items-center gap-3">
                    {/* The same icon and color as Videos in the /learn sidebar. */}
                    <IconVideoCamera className="size-6 shrink-0 text-brand-tangerine" />
                    <h1 className="m-0 text-2xl font-bold">Watch {productName} lessons</h1>
                </div>
                <h2 className="mt-0 mb-4 text-base font-medium text-secondary">
                    Short lessons about PostHog products. For your viewing pleasure.
                </h2>
                <p className="m-0 leading-relaxed">{intro}</p>

                <ul className="m-0 mt-8 grid list-none gap-4 border-t border-primary p-0 pt-8 @md:grid-cols-2 @3xl:grid-cols-3">
                    {videos.map((video) => (
                        <li key={video.slug}>
                            <VideoCard
                                video={video}
                                onOpen={() =>
                                    // The same event and volume as the other hub pages, so clicks split by product.
                                    posthog?.capture('learn_resource_selected', {
                                        volume,
                                        resource: 'video',
                                        option: video.slug,
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
