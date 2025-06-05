import React from 'react'
import Layout from 'components/Layout'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import ProductSidebar from 'components/Explorer/ProductSidebar'
import Product from 'components/Explorer/Product'
import Screenshot from 'components/Screenshot'
import { IconRewindPlay } from '@posthog/icons'
import Presentation from 'components/Presentation'

const slideClasses = 'bg-primary aspect-video p-6 relative border-y first:border-t-0 last:border-b-0 border-primary shadow-lg'

export default function SessionReplay(): JSX.Element {
    return (
        <>
            <SEO
                title="Session Replay - PostHog"
                description="Watch people use your product to diagnose issues and understand user behavior"
                image={`/images/og/session-replay.jpg`}
            />
            <Presentation
                template="generic"
                slug="session-replay"
                title=""
                sidebarContent={<ProductSidebar type="session_replay" />}
            >
                <div className="bg-accent grid grid-cols-1 gap-4">
                    <div className={slideClasses}>
                        <h1 className="text-center">Watch people use your product</h1>
                        <p className="text-center max-w-lg mx-auto">
                            Play back sessions to diagnose UI issues, improve support, and get context on nuanced user behavior.
                        </p>

                        <Screenshot
                            product="Session replay"
                            slug="session-replay"
                            icon={<IconRewindPlay className="text-yellow" />}
                            order={1}
                            className={``}
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/session_replay_d838142e05.png"
                        />

                    </div>
                    <div className={slideClasses}>
                        slide 2
                    </div>
                    <div className={slideClasses}>
                        slide 3
                    </div>
                </div>

                <p className="flex gap-2">
                    <CallToAction href="/signup" type="primary" size="md">
                        Get started
                    </CallToAction>
                    <CallToAction href="/talk-to-a-human" type="secondary" size="md">
                        Talk to a human
                    </CallToAction>
                </p>

                <Product
                    type="session_replay"
                    indexLinks={[
                        'features',
                        'pricing',
                        'customers',
                        'comparison',
                        'docs',
                        'tutorials',
                        'questions',
                        'team',
                        'roadmap',
                        'changelog',
                    ]}
                />
            </Presentation>
        </>
    )
}
