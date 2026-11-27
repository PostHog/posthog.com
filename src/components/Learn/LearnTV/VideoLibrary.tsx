import React from 'react'
import useProduct from 'hooks/useProduct'
import usePostHog from 'hooks/usePostHog'
import VideoCard from './VideoCard'
import { LEARN_VIDEOS } from './videos'

/** The Videos section of the Learn home: every Learn TV video as a poster card, grouped by product. */
export default function VideoLibrary(): JSX.Element {
    const posthog = usePostHog()
    const products = useProduct() as any[]
    const handles = Array.from(new Set(LEARN_VIDEOS.map((video) => video.productHandle)))
    return (
        <section>
            <h2 className="m-0 text-xl font-bold">Videos</h2>
            <p className="mb-0 mt-1 text-secondary">Short lessons about PostHog products. For your viewing pleasure.</p>
            {handles.map((handle) => {
                // The same heading as the prompt library: the product's icon and color from the Products menu.
                const product = products.find((p) => p.handle === handle)
                return (
                    <div key={handle} className="mt-8">
                        <h3 className="m-0 flex items-center gap-2 text-lg font-bold">
                            {product?.Icon && <product.Icon className={`size-5 shrink-0 text-${product.color}`} />}
                            {product?.name}
                        </h3>
                        <ul className="m-0 mt-3 grid list-none gap-4 p-0 @md:grid-cols-2 @3xl:grid-cols-3">
                            {LEARN_VIDEOS.filter((video) => video.productHandle === handle).map((video) => (
                                <li key={video.slug}>
                                    <VideoCard
                                        video={video}
                                        onOpen={() =>
                                            posthog?.capture('learn_resource_selected', {
                                                resource: 'video',
                                                option: video.slug,
                                                surface: 'learn_home',
                                            })
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            })}
        </section>
    )
}
