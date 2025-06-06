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
import ScalableSlide from 'components/Presentation/ScalableSlide'
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'
import useProducts from 'hooks/useProducts'
import Tabs from 'components/RadixUI/Tabs'
import ImageSlider from 'components/Pricing/Test/ImageSlider'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import OSTable from 'components/OSTable'

const slideClasses = 'bg-primary aspect-video relative border-y first:border-t-0 last:border-b-0 border-primary shadow-lg'

// Component for individual slide thumbnail with proper scaling
const SlideThumb = ({ slide, index, isActive }: { slide: any; index: number; isActive: boolean }) => {
    return (
        <div
            data-scheme="primary"
            className="group cursor-pointer"
            onClick={() => {
                // Scroll to slide container (includes title and content)
                const slideElement = document.querySelector(`[data-slide="${index}"]`)
                slideElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
        >
            <div className={`aspect-video bg-primary border rounded-sm overflow-hidden relative ${isActive ? 'border-blue outline outline-blue' : 'border-primary group-hover:border-primary'}`}>
                <ScalableSlide mode="thumbnail" baseWidth={1280} baseHeight={720}>
                    {slide.thumbnailContent || slide.rawContent || slide.content}
                </ScalableSlide>
                {/* Transparent overlay to capture clicks and prevent interaction with thumbnail content */}
                <div className="absolute inset-0 z-10" />
            </div>
            <div className={`text-xs text-secondary mt-1 text-center ${isActive ? 'font-bold' : 'font-medium'}`}>
                {slide.name}
            </div>
        </div>
    )
}

// Component for rendering slide thumbnails
const SlideThumbnails = ({ slides, activeSlideIndex }: { slides: any[]; activeSlideIndex: number }) => {
    return (
        <div className="space-y-3 p-1">
            <h3 className="text-sm text-center font-semibold text-secondary mb-3">Slides</h3>
            {slides.map((slide, index) => (
                <SlideThumb
                    key={index}
                    slide={slide}
                    index={index}
                    isActive={index === activeSlideIndex}
                />
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
            size="lg"
        >
            <Tabs.List className="flex flex-col p-1 gap-0.5 w-64" aria-label="Features">
                {featuresContent.map((item, index) => (
                    <Tabs.Trigger
                        key={index}
                        value={`tab-${index}`}
                        icon={(item as any).icon}
                        color={(item as any).color}
                    >
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
                    <div className="p-4">

                        <h2 className="text-3xl text-center mb-0">{item.headline}</h2>
                        {item.description && <p className="mt-1 text-center text-xl">{item.description}</p>}
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
                    {(item as any).children && (
                        <div className="p-4">
                            {(item as any).children}
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
    const { getCustomers, hasCaseStudy } = useCustomers()

    // Get customer slugs from session replay product and retrieve customer data
    const customerSlugs = sessionReplayProduct?.customers ? Object.keys(sessionReplayProduct.customers) : []
    const customers = getCustomers(customerSlugs)

    // Create table structure for customers
    const customerTableColumns = [
        { name: '', width: 'minmax(auto,100px)', align: 'center' as const },
        { name: 'Company', width: 'minmax(150px,300px)', align: 'center' as const },
        { name: '', width: 'minmax(auto,1fr)', align: 'left' as const },
        { name: 'Case study', width: 'minmax(auto,100px)', align: 'center' as const }
    ]

    const customerTableRows = customers.filter(customer => {
        return sessionReplayProduct?.customers?.[customer.slug]
    }).map((customer, index) => {
        const customerData = sessionReplayProduct?.customers?.[customer.slug]

        return {
            cells: [
                { content: index + 1 },
                {
                    content: customer.logo ? (
                        <>
                            <img
                                src={customer.logo.light}
                                alt={customer.name}
                                className="w-auto object-contain dark:hidden"
                            />
                            <img
                                src={customer.logo.dark}
                                alt={customer.name}
                                className="w-auto object-contain hidden dark:block"
                            />
                        </>
                    ) : (
                        <span>{customer.name}</span>
                    ),
                    className: '!p-4'
                },
                {
                    content: (
                        <>
                            <strong>...{customerData.headline}</strong>
                            <span className="text-lg italic">"{customerData.description}"</span>
                        </>
                    ),
                    className: 'text-xl !px-8 !py-4'
                },
                {
                    content: hasCaseStudy(customer.slug) ? <Link to={`/customers/${customer.slug}`} state={{ newWindow: true }}>Link</Link> : null,
                    className: 'text-lg'
                }
            ]
        }
    })

    // Define raw slide content
    const rawSlides = [
        {
            name: "Overview",
            content: (
                <div className="h-full p-12 flex flex-col relative">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/replay_screenshot_de8cb3a4ed.jpg"
                        alt="Session replay"
                        className="absolute bottom-0 left-0 max-w-[525px] shadow-xl rounded-tr"
                    />
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/replay_hog_20fc000c14.png"
                        alt="Session replay"
                        className="absolute bottom-0 right-0 max-w-[698px]"
                    />
                    <div className="pt-12 pr-12 pb-1/2 pl-1/2">
                        <div className="inline-flex items-center gap-3 text-primary mb-4">
                            <IconRewindPlay className="size-7 text-yellow" />
                            <span className="text-xl font-bold">Session replay</span>
                        </div>
                        <h1 className="text-5xl font-bold text-primary mb-4 leading-tight">
                            Watch people use your product
                        </h1>
                        <p className="text-xl text-secondary mb-8 leading-relaxed">
                            Play back sessions to diagnose UI issues, improve support, and get context on nuanced user behavior in your product, website, or mobile app.
                        </p>
                        {/* 

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

                         */}
                    </div>
                </div>
            )
        },
        {
            name: "Customers",
            content: (
                <div className="h-full p-12">
                    <h2 className="text-4xl font-bold text-primary mb-6 text-center">Customers who love session replay</h2>
                    <OSTable columns={customerTableColumns} rows={customerTableRows} />
                </div>
            ),
        },
        {
            name: "Features",
            content: (
                <div className="h-full">
                    <FeaturesTab />
                </div>
            ),
            // Simplified version for thumbnails (avoid FeaturesTab which has ImageSlider)
            thumbnailContent: (
                <div className="h-full p-12 flex flex-col justify-center" style={{ backgroundImage: 'url(https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10127_b7362fd913.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-bold text-primary mb-6">Features</h2>
                        <p className="text-xl text-secondary">
                            Event timeline, Console logs, Network monitoring and more
                        </p>
                    </div>
                </div>
            )
        },
        {
            name: "Answers",
            content: (
                <div className="h-full p-12 flex flex-col justify-center text-center">
                    <h2 className="text-4xl font-bold text-primary mb-6">What can I discover with session replay?</h2>
                    <p className="text-xl text-secondary max-w-4xl mx-auto">
                        Understand user behavior, identify friction points, and improve your product experience
                    </p>
                </div>
            )
        },
        {
            name: "Pricing",
            content: (
                <div className="h-full p-12 flex flex-col justify-center text-center">
                    <h2 className="text-4xl font-bold text-primary mb-6">Pricing</h2>
                    <p className="text-xl text-secondary max-w-4xl mx-auto">
                        Start free, pay as you scale
                    </p>
                </div>
            )
        },
        {
            name: "Getting started",
            content: (
                <div className="h-full p-12 flex flex-col justify-center text-center">
                    <h2 className="text-4xl font-bold text-primary mb-6">Get started</h2>
                    <p className="text-xl text-secondary max-w-4xl mx-auto mb-8">
                        Ready to see how users interact with your product?
                    </p>
                    <div className="flex gap-4 justify-center">
                        <CallToAction href="/signup" type="primary" size="lg">
                            Get started - free
                        </CallToAction>
                        <CallToAction href="/talk-to-a-human" type="secondary" size="lg">
                            Talk to a human
                        </CallToAction>
                    </div>
                </div>
            )
        }
    ]

    // Create slides with both raw content and wrapped content for different contexts
    const slides = rawSlides.map(slide => ({
        ...slide,
        // Wrapped content for editor view
        content: (
            <ScalableSlide mode="editor" baseWidth={1280} baseHeight={720}>
                {slide.content}
            </ScalableSlide>
        ),
        // Raw content for presentation mode
        rawContent: slide.content,
        // Simplified content for thumbnails (avoids complex components)
        thumbnailContent: slide.thumbnailContent || slide.content
    }))

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
                sidebarContent={(activeSlideIndex) => <SlideThumbnails slides={slides} activeSlideIndex={activeSlideIndex} />}
                slides={slides}
            >
                <div data-scheme="primary" className="bg-accent grid grid-cols-1 gap-2 [&>div:first-child_>span]:hidden [&_div:first-child_div]:border-t-0 p-4">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center bg-accent"
                            data-slide={index}
                        >
                            <span data-scheme="secondary" className="slideName inline-flex mx-auto bg-accent rounded-sm px-4 py-0.5 text-sm font-semibold text-primary my-2">
                                {slide.name}
                            </span>
                            <div className={slideClasses}>
                                {slide.content}
                            </div>
                        </div>
                    ))}
                </div>
            </Presentation>
        </>
    )
}
