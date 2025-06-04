import React from 'react'
import Layout from 'components/Layout'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import ProductSidebar from 'components/Explorer/ProductSidebar'
import Product from 'components/Explorer/Product'
import Screenshot from 'components/Screenshot'
import { IconRewindPlay } from '@posthog/icons'

export default function SessionReplay(): JSX.Element {
    return (
        <>
            <SEO
                title="Session Replay - PostHog"
                description="Watch people use your product to diagnose issues and understand user behavior"
                image={`/images/og/session-replay.jpg`}
            />
            <Explorer
                template="product"
                slug="session-replay"
                title="Watch people use your product"
                sidebarContent={<ProductSidebar type="session_replay" />}
            >
                <p className="max-w-lg">
                    Play back sessions to diagnose UI issues, improve support, and get context on nuanced user behavior.
                </p>

                <p className="flex gap-2">
                    <CallToAction href="/signup" type="primary" size="md">
                        Get started
                    </CallToAction>
                    <CallToAction href="/talk-to-a-human" type="secondary" size="md">
                        Talk to a human
                    </CallToAction>
                </p>

                <Screenshot
                    product="Session replay"
                    slug="session-replay"
                    icon={<IconRewindPlay className="text-yellow" />}
                    order={1}
                    className={``}
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/session_replay_d838142e05.png"
                />

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
            </Explorer>
        </>
    )
}
