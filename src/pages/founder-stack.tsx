import CloudinaryImage from 'components/CloudinaryImage'
import Layout from 'components/Layout'
import React from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import {
    IconRewindPlay,
    IconGraph,
    IconPieChart,
    IconMessage,
    IconArrowRight,
    IconBook,
    IconExternal,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'

interface ProductLinkProps {
    link: string
    icon: React.ComponentType<{ className?: string }>
    productName: string
    color: string
}

function ProductLink({ link, icon: Icon, productName, color }: ProductLinkProps) {
    return (
        <Link
            to={`https://posthog.com/${link}`}
            className="flex items-center gap-2 border border-light dark:border-dark rounded-sm px-1 py-0.5 font-bold text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark bg-accent/50 dark:bg-accent-dark/50 hover:bg-accent dark:hover:bg-accent-dark hover:border-border dark:hover:border-border-dark"
            external
        >
            <span className="flex items-center gap-1">
                <Icon className={`size-6 text-${color}`} />
                <span>{productName}</span>
            </span>
        </Link>
    )
}

function FounderStack() {
    return (
        <Layout>
            <SEO
                title="Founder stack"
                description="PostHog is designed to grow with you."
                image={`/images/og/founder-stack.png`}
            />
            <div className="max-w-5xl mx-auto px-5">
                <div className="mt-4 md:mt-12 pb-6 md:pb-20">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/computer_fbcb8c1c5d.png"
                        alt="Hogzilla coding"
                        className="md:float-right max-w-sm"
                    />
                    <h1 className="text-5xl md:text-[64px] leading-none mt-0 mb-5">
                        The product stack for <span className="text-red dark:text-yellow">founders</span>
                    </h1>
                    <h2 className="text-lg md:text-xl opacity-70 mb-2">PostHog is designed to grow with you.</h2>
                    <p className="max-w-3xl">
                        Just start with one product. PostHog is a wide product platform, but you don't need to use it
                        all from the beginning. Here's how we recommend setting up PostHog if you're just starting out.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                        <CallToAction to="/signup" className="mt-2">
                            Get started - free
                        </CallToAction>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-y-4 md:gap-y-8 pb-8  max-w-5xl mx-auto">
                    <h3 className="text-xl font-bold mt-0 md:pr-12 border-b border-light dark:border-dark pb-4 md:pb-8 mb-0">
                        1. See how people use your product
                    </h3>
                    <div className="md:border-b border-light dark:border-dark pb-8">
                        <strong className="flex items-center gap-1.5 mb-2 text-[17px] md:text-lg">
                            <span>Set up</span>
                            <ProductLink
                                link="/session-replay"
                                icon={IconRewindPlay}
                                productName="Session replay"
                                color="yellow"
                            />
                        </strong>
                        <p className="m-0">
                            It's like watching a screen recording of someone using your product. Just add{' '}
                            <Link to="/docs/getting-started/install">PostHog.js</Link> and enable session replay.
                        </p>
                        <p className="mt-2">
                            Mobile app? <Link to="/docs/libraries/react-native">We've got you, too</Link>
                        </p>
                    </div>

                    <h3 className="text-xl font-bold mt-0 md:pr-12 border-b border-light dark:border-dark pb-4 md:pb-8 mb-0">
                        2. Get some user numbers and data
                    </h3>
                    <div className="md:border-b border-light dark:border-dark pb-8">
                        <strong className="flex items-center gap-1.5 mb-2 text-[17px] md:text-lg">
                            <span>Activate</span>
                            <ProductLink
                                link="/product-analytics"
                                icon={IconGraph}
                                productName="Product analytics"
                                color="blue"
                            />
                        </strong>
                        <p className="m-0">
                            This will tell you how many users you have, which features they use, who they are and if
                            they're coming back. Product analytics comes with auto capture, so you don't need to waste
                            time instrumenting tracking.
                        </p>
                        <p className="mt-2">
                            Optionally <Link to="/docs/libraries">add a back-end library</Link> to send server-side
                            events.
                        </p>
                    </div>

                    <h3 className="text-xl font-bold mt-0 md:pr-12 border-b border-light dark:border-dark pb-4 md:pb-8 mb-0">
                        3. Discover how people find your product
                    </h3>
                    <div className="md:border-b border-light dark:border-dark pb-8">
                        <strong className="flex items-center gap-1.5 mb-2 text-[17px] md:text-lg">
                            <span>Enable</span>
                            <ProductLink
                                link="/web-analytics"
                                icon={IconPieChart}
                                productName="Web analytics"
                                color="[#36C46F]"
                            />
                        </strong>
                        <p className="m-0">
                            Since PostHog.js is already installed, just activate your new Google Analytics replacement
                            to see traffic sources and trends.
                        </p>
                    </div>

                    <h3 className="text-xl font-bold mt-0 md:pr-12 border-b border-light dark:border-dark pb-4 md:pb-8 mb-0">
                        4. Get feedback
                    </h3>
                    <div className="md:border-b border-light dark:border-dark pb-8">
                        <strong className="flex items-center gap-1.5 mb-2 text-[17px] md:text-lg">
                            <span>Add</span>
                            <ProductLink link="/surveys" icon={IconMessage} productName="Surveys" color="salmon" />
                        </strong>
                        <p className="m-0">
                            Trigger on-page surveys based on product activity – like people who use a feature or visit a
                            certain page.
                        </p>
                    </div>

                    <h3 className="text-xl font-bold mt-0 md:pr-12 border-b border-light dark:border-dark pb-4 md:pb-8 mb-0">
                        5. Apply for our startup program
                    </h3>
                    <div className="md:border-b border-light dark:border-dark pb-8">
                        <p className="m-0">
                            Now that you're outgrowing our free tier, it's time to{' '}
                            <Link to="/startups">apply for our startup program</Link> that gets you $50k in PostHog
                            credit, free merch, and even more credits through our partners.
                        </p>
                    </div>

                    <h3 className="text-xl font-bold mt-0 md:pr-12 border-b border-light dark:border-dark mb-0">
                        6. Learn from our journey
                    </h3>
                    <div className="md:border-b border-light dark:border-dark pb-8">
                        <div className="flex flex-col gap-2">
                            <p className="m-0">
                                Co-founder James Hawkins wrote a book about how to get to product-market fit. (Get a
                                free copy when you're accepted into our startup program!)
                            </p>
                            <p className="m-0">
                                Don't have time to read the book?{' '}
                                <Link to="/founders/product-market-fit-game">Play the product-market fit game</Link>.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mt-0 md:pr-12 ">7. Get some new clothes</h3>
                    <div className="max-w-md">
                        <p className="m-0">
                            Our threads have become social currency in Silicon Valley and beyond. You might be
                            interested in our <Link to="/merch?product=copy-pasta-t-shirt">Copy/Pasta shirt</Link> or{' '}
                            <Link to="/merch?product=copy-pasta-hoodie">hoodie</Link>, or perhaps you want to go a bit
                            nerdier with the{' '}
                            <Link to="/merch?product=data-warehouse-t-shirt">My other name is a data warehouse</Link>{' '}
                            shirt.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-16">
                    <CallToAction to="/signup" className="mt-2">
                        Get started - free
                    </CallToAction>
                </div>
            </div>
        </Layout>
    )
}

export default FounderStack
