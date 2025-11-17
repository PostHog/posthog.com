import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import { IconRewindPlay, IconGraph, IconPieChart, IconMessage } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import Editor from 'components/Editor'

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
            className="flex items-center gap-2 font-bold text-primary hover:text-red dark:hover:text-yellow"
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
        <Editor
            // title="Founder stack"
            type="mdx"
            slug="/founder-stack"
            bookmark={{
                title: 'Founder stack',
                description: 'PostHog is designed to grow with you.',
            }}
        >
            <div className="prose mt-4 @xl:mt-12 pb-6 @xl:pb-20">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/computer_fbcb8c1c5d.png"
                    alt="Hogzilla coding"
                    className="@xl:float-right max-w-sm"
                />
                <h1 className="!text-4xl">
                    The product stack for <span className="text-red dark:text-yellow">founders</span>
                </h1>
                <h2>PostHog is designed to grow with you.</h2>
                <p>
                    Just start with one product. PostHog is a wide product platform, but you don't need to use it all
                    from the beginning. Here's how we recommend setting up PostHog if you're just starting out.
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                    <CallToAction to="https://app.posthog.com/signup" className="mt-2">
                        Get started - free
                    </CallToAction>
                </div>
            </div>

            <div className="grid @xl:grid-cols-2 gap-y-4 @xl:gap-y-8 pb-8">
                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    1. See how people use your product
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
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
                        Mobile app? <Link to="/docs/libraries/react-native">We've got you, too.</Link>
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    2. Get some user numbers and data
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                        <span>Activate</span>
                        <ProductLink
                            link="/product-analytics"
                            icon={IconGraph}
                            productName="Product analytics"
                            color="blue"
                        />
                    </strong>
                    <p className="m-0">
                        This will tell you how many users you have, which features they use, who they are and if they're
                        coming back. Product analytics comes with auto capture, so you don't need to waste time
                        instrumenting tracking.
                    </p>
                    <p className="mt-2">
                        Optionally <Link to="/docs/libraries">add a back-end library</Link> to send server-side events.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    3. Discover how people find your product
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                        <span>Enable</span>
                        <ProductLink
                            link="/web-analytics"
                            icon={IconPieChart}
                            productName="Web analytics"
                            color="[#36C46F]"
                        />
                    </strong>
                    <p className="m-0">
                        Since PostHog.js is already installed, just activate your new Google Analytics replacement to
                        see traffic sources and trends.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    4. Get feedback
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                        <span>Add</span>
                        <ProductLink link="/surveys" icon={IconMessage} productName="Surveys" color="salmon" />
                    </strong>
                    <p className="m-0">
                        Trigger on-page surveys based on product activity – like people who use a feature or visit a
                        certain page.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    5. Apply for our startup program
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <p className="m-0">
                        Now that you're outgrowing our free tier, it's time to{' '}
                        <Link to="/startups">apply for our startup program</Link> that gets you $50k in PostHog credit,
                        free merch, and even more credits through our partners.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary mb-0">
                    6. Learn from our journey
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <div className="flex flex-col gap-2">
                        <p className="m-0">
                            Co-founder James Hawkins wrote a book about how to get to product-market fit. (Get a free
                            copy when you're accepted into our startup program!)
                        </p>
                        <p className="m-0">
                            Don't have time to read the book?{' '}
                            <Link to="/founders/product-market-fit-game">Play the product-market fit game</Link>.
                        </p>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 ">7. Get some new clothes</h3>
                <div className="max-w-md">
                    <p className="m-0">
                        Our threads have become social currency in Silicon Valley and beyond. You might be interested in
                        our <Link to="/merch?product=copy-pasta-t-shirt">Copy/Pasta shirt</Link> or{' '}
                        <Link to="/merch?product=copy-pasta-hoodie">hoodie</Link>, or perhaps you want to go a bit
                        nerdier with the{' '}
                        <Link to="/merch?product=data-warehouse-t-shirt">My other home is a data warehouse</Link> shirt.
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-16">
                <CallToAction to="https://app.posthog.com/signup" className="mt-2">
                    Get started - free
                </CallToAction>
            </div>
        </Editor>
    )
}

export default FounderStack
