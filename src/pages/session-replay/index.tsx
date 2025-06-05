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

// Component for rendering slide thumbnails
const SlideThumbnails = ({ slides }: { slides: any[] }) => {
    return (
        <div className="space-y-2 p-4">
            <h3 className="text-sm font-semibold text-secondary mb-3">Slides</h3>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    data-scheme="primary"
                    className="bg-primary border border-input rounded-md p-2 cursor-pointer hover:border-primary"
                    onClick={() => {
                        // Scroll to slide
                        const slideElement = document.querySelector(`[data-slide="${index}"]`)
                        slideElement?.scrollIntoView({ behavior: 'smooth' })
                    }}
                >
                    <div className="aspect-video bg-accent rounded text-xs overflow-hidden">
                        <div className="p-2 scale-50 origin-top-left w-[200%] h-[200%]">
                            {slide.content}
                        </div>
                    </div>
                    <div className="text-xs text-secondary mt-1 text-center">
                        {slide.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function SessionReplay(): JSX.Element {
    // Define slides as data
    const slides = [
        {
            name: "Overview",
            content: (
                <>
                    <div className="flex items-center justify-center gap-1 mb-4">
                        <IconRewindPlay className="text-yellow size-6" />
                        <strong className="font-semibold">Session replay</strong>
                    </div>
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
                </>
            )
        },
        {
            name: "Features",
            content: (
                <div className="text-center h-full" style={{ backgroundImage: 'url(https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10127_b7362fd913.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <h3>Slide 2</h3>
                    <p>Content for slide 2</p>
                </div>
            )
        },
        {
            name: "Getting started",
            content: (
                <div className="text-center">
                    <h3>Slide 3</h3>
                    <p>Content for slide 3</p>
                </div>
            )
        }
    ]

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
                sidebarContent={<SlideThumbnails slides={slides} />}
            >
                <div data-scheme="primary" className="bg-accent grid grid-cols-1 gap-2 [&_div:first-child_h2]:hidden [&_div:first-child_div]:border-t-0">
                    {slides.map((slide, index) => (
                        <div key={index} className="flex flex-col justify-center">
                            <h2 data-scheme="secondary" className="inline-flex mx-auto bg-accent rounded-sm px-2 py-0.5 text-sm font-semibold text-primary my-2">
                                {slide.name}
                            </h2>
                            <div
                                className={slideClasses}
                                data-slide={index}
                            >
                                {slide.content}
                            </div>
                        </div>
                    ))}
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
