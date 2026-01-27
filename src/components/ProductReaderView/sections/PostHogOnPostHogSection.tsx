import React from 'react'
import WistiaCustomPlayer from 'components/WistiaCustomPlayer'

interface PostHogOnPostHogSectionProps {
    productData: any
}

export default function PostHogOnPostHogSection({ productData }: PostHogOnPostHogSectionProps): JSX.Element {
    const postHogOnPostHog = productData?.postHogOnPostHog
    const videoId = productData?.videos?.overview?.wistia

    if (!postHogOnPostHog) {
        return <></>
    }

    return (
        <section id="posthog-on-posthog" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{postHogOnPostHog.title || 'How PostHog uses PostHog'}</h2>

            {postHogOnPostHog.description && <p className="text-secondary mb-6">{postHogOnPostHog.description}</p>}

            <div className="flex flex-col @xl:flex-row gap-8">
                {/* Video player */}
                {videoId && (
                    <div className="flex-1">
                        <div className="rounded-lg overflow-hidden bg-black">
                            <WistiaCustomPlayer theme="dark" mediaId={videoId} />
                        </div>
                    </div>
                )}

                {/* Benefits list */}
                {postHogOnPostHog.benefits && postHogOnPostHog.benefits.length > 0 && (
                    <div className={videoId ? '@xl:w-80' : 'w-full'}>
                        <ul className="space-y-4 list-none pl-0">
                            {postHogOnPostHog.benefits.map(
                                (benefit: { title: string; description: string }, index: number) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-yellow mr-3 mt-0.5">•</span>
                                        <div>
                                            <strong className="font-medium text-primary">{benefit.title}</strong>
                                            <span className="text-secondary ml-1">{benefit.description}</span>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    )
}
