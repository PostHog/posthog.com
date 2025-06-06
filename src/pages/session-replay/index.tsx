import React, { useState } from 'react'
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
import useProducts from 'hooks/useProducts'
import { Tabs } from 'radix-ui'
import ImageSlider from 'components/Pricing/Test/ImageSlider'

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
            <div className="aspect-video bg-primary border border-primary group-hover:border-primary rounded-sm overflow-hidden relative @container">
                {/* 
                  Responsive thumbnail scaling using container queries:
                  
                  MATH: width/height = (100 / scale) to ensure content fits exactly
                  - scale-[0.15] needs w-[666.67%] h-[666.67%] (100/0.15 = 666.67)
                  - scale-[0.2]  needs w-[500%]    h-[500%]    (100/0.2  = 500)
                  - scale-[0.25] needs w-[400%]    h-[400%]    (100/0.25 = 400)
                  - scale-[0.3]  needs w-[333.33%] h-[333.33%] (100/0.3  = 333.33)
                  
                  BREAKPOINTS:
                  - Default (< 150px): 15% scale - very small thumbnails
                  - @[150px] (≥ 150px): 20% scale - small thumbnails  
                  - @[200px] (≥ 200px): 25% scale - medium thumbnails
                  - @2xs (≥ 256px): 30% scale - large thumbnails
                  
                  TO MODIFY: Add new breakpoint like @[300px]:scale-[0.35] @[300px]:w-[285.71%] @[300px]:h-[285.71%]
                  Calculate width/height: Math.round((100 / scale_factor) * 100) / 100
                */}
                <div className="absolute inset-0 origin-top-left scale-[0.15] w-[666.67%] h-[666.67%] @[150px]:scale-[0.2] @[150px]:w-[500%] @[150px]:h-[500%] @[200px]:scale-[0.25] @[200px]:w-[400%] @[200px]:h-[400%] @2xs:scale-[0.3] @2xs:w-[333.33%] @2xs:h-[333.33%] pointer-events-none">
                    {slide.content}
                </div>
                {/* Transparent overlay to capture clicks and prevent interaction with thumbnail content */}
                <div className="absolute inset-0 z-10" />
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

// Features component using tab UI
const FeaturesTab = () => {
    const { products } = useProducts()
    const sessionReplayProduct = products.find(product => product.type === 'session_replay')
    const featuresContent = sessionReplayProduct?.features || []
    const [currentTab, setCurrentTab] = useState(0)

    if (featuresContent.length === 0) {
        return <div className="p-4">No features available</div>
    }

    return (
        <Tabs.Root
            className="flex w-full h-full items-start bg-accent"
            defaultValue={`tab-${currentTab}`}
            value={`tab-${currentTab}`}
            onValueChange={(value) => setCurrentTab(parseInt(value.split('-')[1]))}
            orientation="horizontal"
        >
            <Tabs.List className="flex flex-col p-1 gap-0.5 w-sm" aria-label="Features">
                {featuresContent.map((item, index) => (
                    <Tabs.Trigger
                        className={`flex h-[45px] flex-1 gap-2 cursor-default select-none items-center bg-white text-[15px] leading-none text-primary rounded outline-none hover:text-primary hover:bg-accent data-[state=active]:font-bold data-[state=active]:bg-accent data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black group ${item.icon ? `p-1` : 'px-3 py-2'
                            }`}
                        key={index}
                        value={`tab-${index}`}
                    >
                        {item.icon && (
                            <span
                                className={`bg-${item.color}/10 p-1 rounded size-7 text-${item.color} group-hover:bg-${item.color}/25 group-data-[state=active]:bg-${item.color} group-data-[state=active]:text-white`}
                            >
                                {item.icon}
                            </span>
                        )}
                        {item.title}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
            {featuresContent.map((item, index) => (
                <Tabs.Content
                    className="flex-1 bg-primary border-l border-primary grow rounded px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black h-full"
                    key={index}
                    value={`tab-${index}`}
                >
                    <div className="pb-4">
                        <h2 className="text-xl mb-0">{item.title}</h2>
                        <p className="text-sm">{item.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {item.features &&
                            item.features.map((feature, index) => (
                                <div key={index}>
                                    <h3 className="text-base mb-1">{feature.title}</h3>
                                    <p className="text-sm">{feature.description}</p>
                                </div>
                            ))}
                    </div>
                    {item.images && item.images.length > 0 && (
                        <div className="max-w-lg mx-auto">
                            <ImageSlider images={item.images} id={`feature-${index}`} />
                        </div>
                    )}
                </Tabs.Content>
            ))}
        </Tabs.Root>
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
                <div className="h-full" style={{ backgroundImage: 'url(https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10127_b7362fd913.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <FeaturesTab />
                </div>
            )
        },
        {
            name: "Answers",
            content: (
                <div className="text-center">
                    <h3>What can I discover with session replay?</h3>
                    <p>Content for slide 3</p>
                </div>
            )
        },
        {
            name: "Pricing",
            content: (
                <div className="text-center">
                    <h3>Pricing</h3>
                    <p>Content for slide 3</p>
                </div>
            )
        },
        {
            name: "Getting started",
            content: (
                <div className="text-center">
                    <h3>Get started</h3>
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
                slides={slides}
            >
                <div data-scheme="primary" className="bg-accent grid grid-cols-1 gap-2 [&_div:first-child_>span]:hidden [&_div:first-child_div]:border-t-0 p-4">
                    {slides.map((slide, index) => (
                        <div key={index} className="flex flex-col justify-center bg-accent">
                            <span data-scheme="secondary" className="slideName inline-flex mx-auto bg-accent rounded-sm px-4 py-0.5 text-sm font-semibold text-primary my-2">
                                {slide.name}
                            </span>
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
