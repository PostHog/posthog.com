import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import { IconCheck } from '@posthog/icons'
import Link from 'components/Link'
import { TreeMenu } from 'components/TreeMenu'
import { productOSNav } from 'hooks/useProductOSNavigation'

const LeftSidebarContent = () => {
    return <TreeMenu items={productOSNav.children} />
}

export default function Profiles() {
    const profilesProduct = useProduct({ handle: 'profiles' }) as any

    return (
        <>
            <SEO
                title="User profiles - PostHog"
                description="Track identified users with person profiles. Merge anonymous and identified users, store custom properties, and analyze user-specific behavior."
                image="/images/og/product-analytics.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="User profiles" hideTitle>
                <div className="space-y-8">
                    <div>
                        <h1>User profiles</h1>
                        <h2 className="!m-0 pb-2">Track and analyze identified users</h2>
                        <p>
                            Person profiles let you track specific, logged-in users across their entire journey—from
                            anonymous visitor to identified customer.
                        </p>
                    </div>

                    <section className="grid md:grid-cols-2 gap-8 pb-8">
                        <div>
                            <h3 className="mb-4">Anonymous events</h3>
                            <p className="opacity-70 mb-3">No individually-identifiable info, analyzed in aggregate</p>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Pricing/PricingCalculator/Tabs/event-anonymous.png"
                                alt="Anonymous event example"
                                className="mb-4 rounded-md border border-primary"
                            />
                            <p className="mb-2">
                                By default, events are anonymous. They come with info about the browser, device,
                                visitor's location, and UTM parameters.
                            </p>
                            <h4 className="text-base">With anonymous events, you can:</h4>
                            <ul className="list-none pl-0 mb-6 space-y-1">
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    See Google Analytics-style dashboards
                                </li>
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    Track anonymous users across sessions
                                </li>
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    Create aggregate insights
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4">Identified events</h3>
                            <p className="opacity-70 mb-3">
                                Track specific users with{' '}
                                <Link to="/docs/data/persons" external>
                                    person profiles
                                </Link>
                            </p>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Pricing/PricingCalculator/Tabs/event-identified.png"
                                alt="Identified event example"
                                className="mb-4 rounded-md border border-primary"
                            />
                            <p className="mb-2">
                                Identify users by email or ID, attach custom properties, and track their complete
                                journey.
                            </p>
                            <h4 className="text-base">In addition to anonymous capabilities:</h4>
                            <ul className="list-none pl-0 mb-6 space-y-1">
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    Merge anonymous and identified users
                                </li>
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    Store custom user properties
                                </li>
                                <li className="relative pl-8">
                                    <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                                    Create user-specific insights
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2>Key features</h2>

                        <div className="space-y-6">
                            <div>
                                <h3>Identity resolution</h3>
                                <p>
                                    Automatically merge anonymous sessions with identified users when they sign up or
                                    log in. Track users across devices and browsers with a single profile.
                                </p>
                            </div>

                            <div>
                                <h3>Custom properties</h3>
                                <p>
                                    Store any user attribute—company name, subscription tier, user role, or custom
                                    metadata. Use these properties to filter insights, create cohorts, and personalize
                                    experiences.
                                </p>
                            </div>

                            <div>
                                <h3>User timelines</h3>
                                <p>
                                    See every action a specific user has taken in chronological order. Combine with
                                    session replay to understand exactly how users interact with your product.
                                </p>
                            </div>

                            <div>
                                <h3>Cohort analysis</h3>
                                <p>
                                    Group users based on shared properties or behaviors. Analyze how different user
                                    segments use your product and track cohort retention over time.
                                </p>
                            </div>

                            <div>
                                <h3>Integration with all PostHog tools</h3>
                                <p>
                                    Person profiles work seamlessly with feature flags, experiments, surveys, and
                                    session replay. Target specific users or segments across all product tools.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2>Pricing</h2>
                        <div className="bg-accent rounded-md p-6">
                            <p className="m-0 text-sm opacity-70">Anonymous events start at</p>
                            <p className="m-0 text-2xl font-bold">
                                $0.00005<span className="opacity-70 text-sm">/event</span>
                            </p>
                            <p className="text-green m-0 text-sm font-semibold mb-4">First 1 million events/mo free</p>

                            <p className="m-0 text-sm opacity-70 mt-4">Identified events start at</p>
                            <p className="m-0 text-2xl font-bold">
                                $0.000248<span className="opacity-70 text-sm">/event</span>
                            </p>
                            <p className="text-green m-0 text-sm font-semibold">First 1 million events/mo free</p>
                        </div>
                    </section>
                </div>
            </ReaderView>
        </>
    )
}
