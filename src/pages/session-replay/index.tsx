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
import { Accordion } from 'components/RadixUI/Accordion'
import { useStaticQuery, graphql } from 'gatsby'
import { Markdown } from 'components/Squeak/components/Markdown'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import Logo from 'components/Logo'
import { docsMenu } from '../../navs'
import { DocLinks } from 'components/Products/DocsLinks'
import ZoomHover from 'components/ZoomHover'

const slideClasses =
    'bg-primary aspect-video relative border-y first:border-t-0 last:border-b-0 border-primary shadow-lg'

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
            <div
                className={`aspect-video bg-primary border rounded-sm overflow-hidden relative ${
                    isActive ? 'border-blue outline outline-blue' : 'border-primary group-hover:border-primary'
                }`}
            >
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
                <SlideThumb key={index} slide={slide} index={index} isActive={index === activeSlideIndex} />
            ))}
        </div>
    )
}

// Features component using tab UI
const FeaturesTab = () => {
    const { products } = useProducts()
    const sessionReplayProduct = products.find((product) => product.type === 'session_replay')
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
            <div data-scheme="secondary" className="w-64 h-full bg-primary">
                <Tabs.List className="flex flex-col p-1 gap-0.5" aria-label="Features">
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
            </div>
            {featuresContent.map((item, index) => (
                <Tabs.Content
                    className="flex-1 bg-primary before:absolute before:inset-0 before:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/bg_replay_5775c24ad4.jpg')] before:bg-cover before:bg-center before:opacity-20 border-l border-primary grow rounded px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black h-full relative "
                    key={index}
                    value={`tab-${index}`}
                >
                    <div className="relative">
                        <div className="px-8 pt-12 pb-8">
                            <h2 className="text-5xl text-center mb-0">{item.headline}</h2>
                            {item.description && <p className="mt-4 text-center text-xl">{item.description}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4 px-8">
                            {item.features &&
                                item.features.map((feature, index) => (
                                    <div key={index}>
                                        <h3 className="text-2xl mb-1">{feature.title}</h3>
                                        <p className="text-lg">{feature.description}</p>
                                    </div>
                                ))}
                        </div>
                        {item.images && item.images.length > 0 && (
                            <div className="max-w-3xl mx-auto">
                                <ImageSlider images={item.images} id={`feature-${index}`} />
                            </div>
                        )}
                        {(item as any).children && <div className="p-4">{(item as any).children}</div>}
                    </div>
                </Tabs.Content>
            ))}
        </Tabs.Root>
    )
}

// Questions tabs component sourcing data from useProducts
const QuestionsTabs = () => {
    const { products } = useProducts()
    const sessionReplayProduct = products.find((product) => product.type === 'session_replay')
    const questions = sessionReplayProduct?.questions || []
    const [currentTab, setCurrentTab] = useState(0)

    // GraphQL query to fetch tutorial content from URLs
    const tutorialData = useStaticQuery(graphql`
        query {
            allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    rawBody
                    frontmatter {
                        title
                        description
                    }
                }
            }
        }
    `)

    // Helper function to get content for a question URL
    const getContentForUrl = (url?: string) => {
        if (!url) return 'No additional content available.'

        // Extract slug and hash fragment from URL
        const [slug, hashFragment] = url.split('#')
        const tutorialNode = tutorialData.allMdx.nodes.find((node: any) => node.fields.slug === slug)

        if (!tutorialNode) return 'Content not found.'

        // Use frontmatter description first, if available (only if no hash fragment)
        if (!hashFragment && tutorialNode.frontmatter?.description) {
            return tutorialNode.frontmatter.description
        }

        // Process rawBody to get content
        if (tutorialNode.rawBody) {
            let content = tutorialNode.rawBody

            // If there's a hash fragment, find the corresponding header and start from there
            if (hashFragment) {
                // Convert hash fragment to potential header formats
                // e.g., "1-first-contentful-paint" -> "1. First Contentful Paint"
                let headerText = hashFragment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

                // Handle numbered sections by adding period after number
                headerText = headerText.replace(/^(\d+)\s/, '$1. ')

                // Look for the header in the content (try different formats and case variations)
                const headerPatterns = [
                    `## ${headerText}`,
                    `### ${headerText}`,
                    `# ${headerText}`,
                    headerText,
                    // Try lowercase variations for case-insensitive matching
                    `## ${headerText.toLowerCase()}`,
                    `### ${headerText.toLowerCase()}`,
                    `# ${headerText.toLowerCase()}`,
                ]

                let startIndex = -1
                for (const pattern of headerPatterns) {
                    // Case-insensitive search
                    const lowerContent = content.toLowerCase()
                    const lowerPattern = pattern.toLowerCase()
                    const index = lowerContent.indexOf(lowerPattern)
                    if (index !== -1) {
                        startIndex = index
                        break
                    }
                }

                // If we found the header, start content from there
                if (startIndex !== -1) {
                    content = content.substring(startIndex)
                }
            }

            // Split by double newlines to get paragraphs
            const paragraphs = content.split('\n\n')
            // Take first few paragraphs, skip frontmatter, export statements, and images
            const contentParagraphs = paragraphs
                .filter((p: string) => !p.startsWith('---') && !p.startsWith('export ') && p.trim().length > 50)
                .map((p: string) => {
                    // If paragraph starts with a header, remove just the header line but keep the rest
                    if (p.startsWith('#')) {
                        const lines = p.split('\n')
                        // Remove the first line (header) but keep the rest
                        const contentLines = lines.slice(1).join('\n').trim()
                        return contentLines
                    }

                    // Remove image references ![alt](url) and standalone image lines
                    return p
                        .replace(/!\[.*?\]\(.*?\)/g, '')
                        .replace(/^\s*<.*?>\s*$/gm, '')
                        .trim()
                })
                .filter((p: string) => p.length > 0) // Remove empty paragraphs after image removal
                .slice(0, 5)
                .join('\n\n')

            // Limit to reasonable length
            return contentParagraphs.length > 900 ? contentParagraphs.substring(0, 900) + '...' : contentParagraphs
        }

        return 'No preview available.'
    }

    if (questions.length === 0) {
        return <div className="p-4">No questions available</div>
    }

    return (
        <Tabs.Root
            className="flex-1 flex w-full min-h-0 items-start bg-accent rounded"
            defaultValue={`tab-${currentTab}`}
            value={`tab-${currentTab}`}
            onValueChange={(value) => setCurrentTab(parseInt(value.split('-')[1]))}
            orientation="horizontal"
            size="md"
        >
            <div data-scheme="secondary" className="w-96 h-full bg-primary rounded">
                <ScrollArea className="h-full">
                    <Tabs.List className="flex flex-col p-1 gap-0.5" aria-label="Questions">
                        {questions.map((question, index) => (
                            <Tabs.Trigger key={index} value={`tab-${index}`} className="text-left">
                                {question.question}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                </ScrollArea>
            </div>
            {questions.map((question, index) => (
                <Tabs.Content
                    className="flex-1 bg-primary grow px-5 py-2 outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black h-full"
                    key={index}
                    value={`tab-${index}`}
                >
                    <div className="px-4">
                        <h2 className="text-3xl mb-4">{question.question}</h2>
                        <div className="prose max-w-none [&_p]:!text-lg [&_li]:!text-lg">
                            <Markdown>{getContentForUrl(question.url)}</Markdown>
                        </div>
                        {question.url && (
                            <div className="mt-6">
                                <OSButton
                                    to={question.url}
                                    variant="secondary"
                                    size="lg"
                                    asLink
                                    state={{ newWindow: true }}
                                >
                                    Read full tutorial →
                                </OSButton>
                            </div>
                        )}
                    </div>
                </Tabs.Content>
            ))}
        </Tabs.Root>
    )
}

export default function SessionReplay(): JSX.Element {
    // Get session replay product data and customers
    const sessionReplayProduct = useProduct({ type: 'session_replay' }) as any
    const { products } = useProducts()
    const sessionReplayFromProducts = products.find((product: any) => product.type === 'session_replay')
    const { getCustomers, hasCaseStudy } = useCustomers()

    // Get all products for pairsWith lookup
    const allProducts = useProduct() as any[]

    // Get customer slugs from session replay product and retrieve customer data
    const customerSlugs = sessionReplayProduct?.customers ? Object.keys(sessionReplayProduct.customers) : []
    const customers = getCustomers(customerSlugs)

    // Create table structure for customers
    const customerTableColumns = [
        { name: '', width: 'minmax(auto,100px)', align: 'center' as const },
        { name: 'Company', width: 'minmax(150px,300px)', align: 'center' as const },
        { name: '', width: 'minmax(auto,1fr)', align: 'left' as const },
        { name: 'Case study', width: 'minmax(auto,100px)', align: 'center' as const },
    ]

    const customerTableRows = customers
        .filter((customer) => {
            return sessionReplayProduct?.customers?.[customer.slug]
        })
        .map((customer, index) => {
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
                        className: '!p-4',
                    },
                    {
                        content: (
                            <>
                                <strong>...{customerData.headline}</strong>
                                <span className="text-lg italic">"{customerData.description}"</span>
                            </>
                        ),
                        className: 'text-xl !px-8 !py-4',
                    },
                    {
                        content: hasCaseStudy(customer.slug) ? (
                            <Link to={`/customers/${customer.slug}`} state={{ newWindow: true }}>
                                Link
                            </Link>
                        ) : null,
                        className: 'text-lg',
                    },
                ],
            }
        })

    // Define raw slide content
    const rawSlides = [
        {
            name: 'Overview',
            content: (
                <div className="h-full p-12 flex flex-col relative bg-yellow text-white">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/replay_screenshot_de8cb3a4ed.jpg"
                        alt="Session replay"
                        className="absolute bottom-0 left-0 max-w-[525px] rounded-tr-md overflow-hidden shadow-2xl"
                    />
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/replay_hog_20fc000c14.png"
                        alt="Session replay"
                        className="absolute bottom-0 right-0 max-w-[698px]"
                    />
                    <div className="pt-12 pr-12 pb-1/2 pl-1/2">
                        <div className="inline-flex items-center gap-3 text-primary mb-4">
                            <IconRewindPlay className="size-7 text-black" />
                            <span className="text-xl font-bold text-black">Session replay</span>
                        </div>
                        <h1 className="text-5xl font-bold text-black mb-4 leading-tight">
                            Watch people use your product
                        </h1>
                        <p className="text-xl text-black mb-8 leading-relaxed">
                            Play back sessions to diagnose UI issues, improve support, and get context on nuanced user
                            behavior in your product, website, or mobile app.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            name: 'Customers',
            content: (
                <div className="h-full p-12">
                    <h2 className="text-4xl font-bold text-primary mb-6 text-center">
                        Customers who love session replay
                    </h2>
                    <OSTable columns={customerTableColumns} rows={customerTableRows} />
                </div>
            ),
        },
        {
            name: 'Features',
            content: (
                <div className="h-full">
                    <FeaturesTab />
                </div>
            ),

            //     // Simplified version for thumbnails (avoid FeaturesTab which has ImageSlider)
            //     thumbnailContent: (
            //         <div
            //             className="h-full p-12 flex flex-col justify-center"
            //             style={{
            //                 backgroundImage:
            //                     'url(https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10127_b7362fd913.png)',
            //                 backgroundSize: 'cover',
            //                 backgroundPosition: 'center',
            //                 backgroundRepeat: 'no-repeat',
            //             }}
            //         >
            //             <div className="max-w-2xl">
            //                 <h2 className="text-4xl font-bold text-primary mb-6">Features</h2>
            //                 <p className="text-xl text-secondary">
            //                     Event timeline, Console logs, Network monitoring and more
            //                 </p>
            //             </div>
            //         </div>
            //     ),
        },
        {
            name: 'Answers',
            content: (
                <div className="h-full flex flex-col p-4">
                    <div className="flex-0">
                        <h2 className="text-4xl font-bold text-primary my-2 text-center">
                            What can I discover with session replay?
                        </h2>
                        <p className="text-xl text-secondary max-w-4xl mx-auto mb-8 text-center">
                            Understand user behavior, identify friction points, and improve your product experience
                        </p>
                    </div>
                    <QuestionsTabs />
                </div>
            ),
        },
        {
            name: 'Pricing',
            content: (
                <div className="h-full p-12 flex flex-col justify-center text-center">
                    <h2 className="text-4xl font-bold text-primary mb-6">Pricing</h2>
                    <p className="text-xl text-secondary max-w-4xl mx-auto">Start free, pay as you scale</p>
                </div>
            ),
        },
        {
            name: 'PostHog vs... (the tl;dr)',
            content: (
                <div className="h-full p-8">
                    <div className="rounded-lg shadow-2xl flex flex-col justify-between items-center relative overflow-hidden min-h-96 mb-6 before:absolute before:inset-0 before:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/compare_bg_0ffcd7a4d0.jpg')] before:bg-cover before:bg-center before:bg-no-repeat after:absolute after:inset-0 after:bg-gradient-to-b after:from-[rgba(0,0,0,.5)] after:via-[rgba(0,0,0,.2)] after:to-[rgba(0,0,0,0)]">
                        <div className="relative z-20 pt-8">
                            <h2 className="text-4xl font-bold text-white mb-2 text-center">PostHog vs...</h2>
                            <p className="text-xl text-white max-w-4xl mx-auto mb-8 text-center">
                                An honest comparison tl;dr:
                            </p>
                        </div>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/mascots_e1d975b193.png"
                            alt="Mascots"
                            className="relative z-10"
                            imgClassName="max-h-[218px]"
                        />
                    </div>

                    {/* Comparison Summary */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="">
                            <h3 className="text-2xl font-bold text-primary mb-4">
                                Reasons a competitor might suit you better<sup>*</sup>
                            </h3>
                            <ul className="p-0 mb-2 list-none">
                                {sessionReplayFromProducts?.comparison?.summary?.them?.map(
                                    (item: any, index: number) => (
                                        <li key={index} className="border-b-2 border-primary py-2">
                                            <span className="font-semibold text-lg">{item.title}</span>
                                            {item.subtitle && (
                                                <span className="text-secondary ml-2 italic">
                                                    Update:{' '}
                                                    {item.subtitleUrl ? (
                                                        <a
                                                            href={item.subtitleUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="underline"
                                                        >
                                                            {item.subtitle}
                                                        </a>
                                                    ) : (
                                                        item.subtitle
                                                    )}
                                                </span>
                                            )}
                                        </li>
                                    )
                                )}
                            </ul>
                            <strong className="text-secondary italic">*for now!</strong>
                        </div>

                        <div className="">
                            <h3 className="text-2xl font-bold text-primary mb-4">
                                Choose <Logo noText color="primary" className="h-12 inline-block -mt-5 mx-1 -mb-2" />{' '}
                                PostHog if you want:
                            </h3>
                            <ul className="p-0 mb-2 list-none">
                                {sessionReplayFromProducts?.comparison?.summary?.us?.map((item: any, index: number) => (
                                    <li key={index} className="border-b-2 border-primary py-2">
                                        <span className="font-semibold text-lg">{item.title}</span>
                                        {item.subtitle && <span className="text-secondary ml-1">{item.subtitle}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            name: 'Feature comparison',
            content: (
                <div className="h-full p-8">
                    <h2 className="text-4xl font-bold text-primary mb-10 text-center">Feature comparison</h2>

                    <div className="max-w-6xl mx-auto">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-primary">
                                <thead>
                                    <tr className="bg-accent">
                                        <th className="border border-primary px-2 py-1.5 text-left font-semibold">
                                            Feature
                                        </th>
                                        {Object.keys(
                                            sessionReplayFromProducts?.comparison?.features?.[0]?.companies || {}
                                        ).map((company: string) => (
                                            <th
                                                key={company}
                                                className="border border-primary px-2 py-1.5 text-center font-semibold min-w-[100px]"
                                            >
                                                {company}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sessionReplayFromProducts?.comparison?.features?.map(
                                        (feature: any, index: number) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-primary' : 'bg-accent'}>
                                                <td className="border border-primary px-2 py-1.5 font-medium">
                                                    {feature.feature}
                                                </td>
                                                {Object.entries(feature.companies).map(([company, supported]) => (
                                                    <td
                                                        key={company}
                                                        className="border border-primary px-2 py-1.5 text-center"
                                                    >
                                                        {typeof supported === 'boolean' ? (
                                                            supported ? (
                                                                <span className="text-green font-bold">✓</span>
                                                            ) : (
                                                                <span className="text-red font-bold">✗</span>
                                                            )
                                                        ) : (
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: supported as string,
                                                                }}
                                                            />
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            name: 'Docs',
            content: (
                <div className="h-full p-8">
                    <h2 className="text-4xl font-bold text-primary mb-2 text-center">Explore the docs</h2>
                    <p className="text-xl text-secondary max-w-4xl mx-auto mb-8 text-center">
                        Get a more technical overview of how everything works{' '}
                        <Link to="/docs/session-replay" state={{ newWindow: true }}>
                            in our docs
                        </Link>
                        .
                    </p>
                    <DocLinks
                        menu={
                            docsMenu.children.find(({ name }) => name.toLowerCase() === 'session replay')?.children ||
                            []
                        }
                    />
                </div>
            ),
        },
        {
            name: 'Pairs with...',
            content: (
                <div className="h-full p-12 flex flex-col justify-center text-center bg-light dark:bg-dark">
                    <h2 className="text-4xl font-bold text-primary mb-2">Pairs with...</h2>
                    <p className="text-xl text-secondary max-w-4xl mx-auto mb-12">
                        Session replay pairs with other products to give you a complete picture of your product.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        {sessionReplayFromProducts?.pairsWith?.map((pair: any) => {
                            // Find the product details by slug
                            const productDetails = allProducts.find((product: any) => product.slug === pair.slug)
                            if (!productDetails) return null

                            return (
                                <ZoomHover key={productDetails.name}>
                                    <div className="flex flex-col items-center border border-primary rounded p-4 bg-primary">
                                        <span
                                            className={`inline-block size-8 my-4 ${
                                                productDetails.color
                                                    ? 'text-' + productDetails.color
                                                    : 'text-primary dark:text-primary-dark opacity-50'
                                            }`}
                                        >
                                            {productDetails.Icon && <productDetails.Icon />}
                                        </span>
                                        <h3 className="text-2xl font-bold text-primary mb-2">{productDetails.name}</h3>
                                        <p className="text-lg text-secondary">{pair.description}</p>
                                    </div>
                                </ZoomHover>
                            )
                        })}
                    </div>
                </div>
            ),
        },
        {
            name: 'Getting started',
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
            ),
        },
    ]

    // Create slides with both raw content and wrapped content for different contexts
    const slides = rawSlides.map((slide) => ({
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
        thumbnailContent: (slide as any).thumbnailContent || slide.content,
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
                sidebarContent={(activeSlideIndex) => (
                    <SlideThumbnails slides={slides} activeSlideIndex={activeSlideIndex} />
                )}
                slides={slides}
            >
                <div
                    data-scheme="primary"
                    className="bg-accent grid grid-cols-1 gap-2 [&>div:first-child_>span]:hidden [&_div:first-child_div]:border-t-0 p-4"
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="flex flex-col justify-center bg-accent" data-slide={index}>
                            <span
                                data-scheme="secondary"
                                className="slideName inline-flex mx-auto bg-accent rounded-sm px-4 py-0.5 text-sm font-semibold text-primary my-2"
                            >
                                {slide.name}
                            </span>
                            <div className={slideClasses}>{slide.content}</div>
                        </div>
                    ))}
                </div>
            </Presentation>
        </>
    )
}
