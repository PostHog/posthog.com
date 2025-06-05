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
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'

const slideClasses = 'bg-primary aspect-video relative border-y first:border-t-0 last:border-b-0 border-primary shadow-lg'

// Component for individual slide thumbnail with proper scaling
const SlideThumb = ({ slide, index }: { slide: any; index: number }) => {
    return (
        <div
            data-scheme="primary"
            className="group cursor-pointer"
            onClick={() => {
                // Scroll to slide
                const slideElement = document.querySelector(`[data-slide="${index}"]`)
                slideElement?.scrollIntoView({ behavior: 'smooth' })
            }}
        >
            <div className="aspect-video bg-primary border border-primary group-hover:border-primary rounded-sm overflow-hidden relative">
                <div
                    style={{
                        transform: 'scale(0.25)',
                        transformOrigin: 'top left',
                        width: '400%',
                        height: '400%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {slide.content}
                </div>
            </div>
            <div className="text-xs text-secondary mt-1 text-center font-medium">
                {slide.name}
            </div>
        </div>
    )
}

// Component for rendering slide thumbnails
const SlideThumbnails = ({ slides }: { slides: any[] }) => {
    return (
        <div className="space-y-3 p-1">
            <h3 className="text-sm text-center font-semibold text-secondary mb-3">Slides</h3>
            {slides.map((slide, index) => (
                <SlideThumb key={index} slide={slide} index={index} />
            ))}
        </div>
    )
}

export default function SessionReplay(): JSX.Element {
    // Get session replay product data and customers
    const sessionReplayProduct = useProduct({ type: 'session_replay' }) as any
    const { getCustomers } = useCustomers()

    // Get customer slugs from session replay product and retrieve customer data
    const customerSlugs = sessionReplayProduct?.customers ? Object.keys(sessionReplayProduct.customers) : []
    const customers = getCustomers(customerSlugs)

    // Define slides as data
    const slides = [
        {
            name: "Overview",
            content: (
                <>
                    <div className="grid grid-cols-12 grid-rows-8 h-full">
                        <div className="col-span-8 row-span-5 mb-4">
                            <Screenshot
                                product="Session replay"
                                slug="session-replay"
                                icon={<IconRewindPlay className="text-yellow" />}
                                order={1}
                                className={``}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/session_replay_d838142e05.png"
                            />
                        </div>
                        <div className="@container col-span-4 row-span-5 col-start-9 p-6 mb-4">
                            <div className="flex items-center mb-4" style={{ gap: '0.25rem' }}>
                                <IconRewindPlay className="text-yellow size-6" />
                                <strong className="font-semibold">Session replay</strong>
                            </div>
                            <h1 className="">Watch people use your product</h1>
                            <p className="max-w-lg mx-auto">
                                Play back sessions to diagnose UI issues, improve support, and get context on nuanced user behavior.
                            </p>
                            <div className="flex flex-col @sm:flex-row justify-center gap-2 mb-12">
                                <CallToAction href="https://app.posthog.com/signup" type="primary">
                                    Get started - free
                                </CallToAction>
                                <CallToAction href="/talk-to-a-human" type="secondary">
                                    Talk to a human
                                </CallToAction>
                            </div>
                        </div>
                        {customers.slice(0, 4).map((customer, index) => {
                            const customerData = sessionReplayProduct?.customers?.[customer.slug]
                            return (
                                <div key={customer.slug} className={`col-span-3 row-span-3 ${index === 0 ? 'row-start-6' : index === 1 ? 'col-start-4 row-start-6' : index === 2 ? 'col-start-7 row-start-6' : 'col-start-10 row-start-6'} flex flex-col p-4`}>
                                    <div className="mb-3 flex">
                                        {customer.logo ? (
                                            <>
                                                <img
                                                    src={customer.logo.light}
                                                    alt={customer.name}
                                                    className="h-6 w-auto object-contain dark:hidden"
                                                />
                                                <img
                                                    src={customer.logo.dark}
                                                    alt={customer.name}
                                                    className="h-6 w-auto object-contain hidden dark:block"
                                                />
                                            </>
                                        ) : (
                                            <span className="text-sm font-semibold">{customer.name}</span>
                                        )}
                                    </div>
                                    {customerData && (
                                        <>
                                            <h3 className="text-sm font-semibold mb-2">{customerData.headline}</h3>
                                            <p className="text-xs text-secondary">{customerData.description}</p>
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
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
