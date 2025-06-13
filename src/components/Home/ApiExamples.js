import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'

const WelderHog = () => {
    const [ready, setReady] = useState(false)
    const [containerRef, inView] = useInView({ threshold: 0 })
    const videoRef = useRef(null)

    useEffect(() => {
        if (inView) {
            videoRef?.current?.play()
        } else {
            videoRef?.current?.pause()
        }
    }, [inView, ready])

    return (
        <div ref={containerRef}>
            <video
                ref={videoRef}
                onCanPlay={() => {
                    setReady(true)
                }}
                onEnded={() => {
                    if (videoRef?.current) {
                        videoRef.current.currentTime = 3
                        videoRef?.current?.play()
                    }
                }}
                playsInline
                muted
                preload="none"
                className="w-full"
            >
                <source src={`${process.env.GATSBY_CLOUDFRONT_URL}/welder-hog.webm`} type="video/webm" />
                <source src={`${process.env.GATSBY_CLOUDFRONT_URL}/welder-hog.mp4`} type="video/mp4" />
            </video>
        </div>
    )
}

const examples = [
    {
        title: 'User-facing analytics',
        endpoint: 'query',
        description:
            'Query data captured into PostHog to show analytics for your users. Create your own visualizations and let PostHog fill in the data.',
    },
    {
        title: 'Use event-based functionality',
        endpoint: 'capture',
        description:
            'Send events, track behavior, identify users, combine them, update person properties, modify groups, and more all via the API.',
    },
    {
        title: 'Evaluate feature flags anywhere',
        endpoint: 'flags',
        description: (
            <>
                Even if you don't use one of our <Link to="/docs/getting-started/install?tab=sdks">SDKs</Link>, you can
                get a flag status for a user from the API on-the-fly. Works for all types of flags from boolean to
                multi-variate.
            </>
        ),
    },
    {
        title: 'Migrate from other tools',
        endpoint: 'batch',
        description: (
            <>
                Batch events to move them en masse <Link to="/docs/migrate">from your old tool</Link> for use in PostHog
                (for free). Visualize them in PostHog alongside your newly captured events.
            </>
        ),
    },
    {
        title: 'Create custom reports',
        endpoint: 'query',
        description: (
            <>
                Show stats like <em>active users</em>, <em>pageviews</em>, or <em>daily signups</em> (like we use near
                the bottom of this page). Import data in <Link to="/docs/data-warehouse">our data warehouse</Link> and
                query together.
            </>
        ),
    },
    {
        title: 'Notate when a feature is released',
        endpoint: 'annotations',
        description:
            'Annotations are useful for understanding inflection points in insights. You can programmatically create annotations like when a PR is merged.',
    },
]

export default function ApiExamples() {
    return (
        <section className="px-5 mb-20 max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl mb-4">API</h2>
            <p className="text-lg md:font-semibold opacity-75 leading-tight">
                We built PostHog on our API. This means you get full access to anything you want with your event and
                customer data that's ingested by PostHog. Here are some examples<span className="md:hidden">.</span>
                <span className="hidden md:inline-block">:</span>
            </p>

            <div className="flex flex-col md:grid md:grid-cols-8">
                <div className="col-span-5 order-2 md:order-1">
                    <ul className="p-0 mb-4 md:mb-0">
                        {examples.map(({ title, endpoint, description }) => {
                            return (
                                <li
                                    className="list-none flex flex-col md:flex-row p-4 rounded odd:bg-accent dark:odd:bg-accent-dark"
                                    key={title}
                                >
                                    <div className="shrink md:basis-[200px] mb-2">
                                        <span className="font-code bg-red/10 text-red font-semibold rounded text-[13px] p-1">
                                            {endpoint}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="m-0 text-base font-bold">{title}</h4>
                                        <p className="text-primary/75 dark:text-primary-dark/75 text-sm m-0">
                                            {description}
                                        </p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <CallToAction to="/docs/api" type="secondary" className="">
                        Explore the API
                    </CallToAction>
                </div>
                <div className="col-span-3 order-1 md:order-2 text-center">
                    <div className="max-w-[371px] md:ml-8 relative after:bg-gradient-to-t after:from-tan after:via-tan/70 dark:after:from-dark dark:after:via-dark/70 after:to-transparent after:absolute after:bottom-0 after:left-0 after:h-10 after:w-full">
                        <WelderHog />
                    </div>
                </div>
            </div>
        </section>
    )
}
