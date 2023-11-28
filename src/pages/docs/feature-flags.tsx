import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'

export const quickLinks = [
    {
        icon: 'GraduationCap',
        name: 'Start here',
        to: '/docs/feature-flags/hey',
        color: 'red',
    },
    {
        name: 'Product manual',
        to: '/docs/feature-flags/manual',
        description: 'Learn how to use feature flags.',
    },
    {
        name: 'Bootstrapping & local evaluation',
        to: '/docs/feature-flags/bootstrapping-and-local-evaluation',
        description: 'Bootstrap and evaluate flags locally when you need an immediate response.',
    },
    {
        name: 'Multivariate flags',
        to: '/docs/feature-flags/multivariate-flags',
        description: 'Test features with multiple variants.',
    },
    {
        name: 'Payloads',
        to: '/docs/feature-flags/payloads',
        description: 'Add configuration data to your feature flags with JSON payloads',
    },
    {
        name: 'Early access feature management',
        to: '/docs/feature-flags/early-access-feature-management',
        description: 'Give your users the ability to opt-in to early access features',
    },
    {
        name: 'Common questions',
        to: '/docs/feature-flags/common-questions',
        description: 'Common questions about feature flags and how to solve them.',
    },
]

type FeatureFlagsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Intro = ({ image = true }) => (
    <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded flex flex-col items-center md:flex-row gap-8 pt-2 mb-8">
        <div className="p-4 md:p-8">
            <h1 className="text-4xl mt-0 mb-2">Feature flags</h1>
            <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                Toggle features for cohorts or individuals to test the impact before rolling out to everyone.
            </h3>
            <CallToAction to="/docs/feature-flags/installation">Create your first feature flag</CallToAction>
        </div>

        {image && (
            <figure className="m-0 p-0">
                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className=""
                    src="../../components/Home/Slider/images/feature-flags-hog.png"
                />
            </figure>
        )}
    </div>
)

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && <QuickLinks items={docsMenu.children[3].children} />}
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="Feature flags API"
                        description="Evaluate and update with the /decide/ endpoint"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        }
                        url="/tutorials/api-feature-flags"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Canary releases"
                        description="Gradual rollouts to a subset of users"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        }
                        url="/tutorials/canary-release"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Bootstrapping feature flags in React"
                        description="Available at client-side load time"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        }
                        url="/tutorials/bootstrap-feature-flags-react"
                    />
                    <ResourceItem
                        type="Article"
                        title="Best practices for feature flags"
                        description="Contains 8 examples"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        }
                        url="/blog/feature-flag-best-practices"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up one-time feature flags"
                        description="Show a component or content just once"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        }
                        url="/tutorials/one-time-feature-flags"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Cookie-based feature flags"
                        description="Storing feature flag values locally"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        }
                        url="/tutorials/one-time-feature-flags"
                    />
                </ul>
                <CallToAction
                    to="/tutorials/categories/feature-flags"
                    type="custom"
                    size="md"
                    className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                    childClassName="text-primary/75 dark:text-primary-dark/75 group-hover:text-primary/100 dark:group-hover:text-primary-dark/100 !bg-white dark:!bg-dark !border-light dark:!border-dark"
                    width="[calc(100%_+_3px)]"
                >
                    Explore guides
                </CallToAction>
            </section>

            <section>
                <h3 className="mb-1 text-xl">Nifty things you can do with feature flags</h3>
                <p className="text-[15px]">Some use cases you may not have thought of</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        title="Add popups to a React app"
                        description="Using payloads to send arbitrary data to your frontend"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        }
                        url="/tutorials/react-popups"
                    />
                    <ResourceItem
                        title="Location-based site banner"
                        description="Regional announcements or country-based alerts"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        }
                        url="/tutorials/location-based-banner"
                    />
                    <ResourceItem
                        title="Sampling with feature flags and local evaluation"
                        description="Use flags to capture a subset of events for analysis"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        }
                        url="/tutorials/track-high-volume-apis"
                    />
                </ul>
            </section>
        </>
    )
}

const FeatureFlags: React.FC<FeatureFlagsProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="Feature flags - Docs - PostHog" />

            <PostLayout title={'Feature flags'} hideSurvey hideSidebar>
                <Intro />
                <Content />

                <div className="pt-8">
                    <CallToAction to="/docs/feature-flags/manual" width="full">
                        Visit the manual
                    </CallToAction>
                </div>
            </PostLayout>
        </Layout>
    )
}

export default FeatureFlags
