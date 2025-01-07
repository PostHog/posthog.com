import CloudinaryImage from 'components/CloudinaryImage'
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

type WebAnalyticsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Intro = ({ image = true }) => {
    return (
        <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded flex flex-col items-center md:flex-row md:gap-4 pt-2 mb-8">
            <div className="p-4 md:p-8">
                <h1 className="text-4xl mt-0 mb-2">Web analytics</h1>
                <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                    Track and monitor many of the most important metrics for your website.
                </h3>
                <CallToAction to="/docs/web-analytics/installation">Get started with web analytics</CallToAction>
            </div>

            {image && (
                <figure className="m-0 mt-auto p-0">
                    <CloudinaryImage
                        alt=""
                        quality={100}
                        className=""
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/webhog2_7b3ca93610.png"
                    />
                </figure>
            )}
        </div>
    )
}

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'web analytics')?.children}
                />
            )}
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="Calculating session-based metrics"
                        description="Give an overview, then dive deeper into metrics like average session duration and time on site."
                        Image={
                            <CloudinaryImage
                                alt=""
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/webhog2_7b3ca93610.png"
                            />
                        }
                        url="/tutorials/session-metrics"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up cross-domain tracking"
                        description="Track users accurately across multiple websites and domains."
                        Image={
                            <CloudinaryImage
                                alt=""
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/webhog2_7b3ca93610.png"
                            />
                        }
                        url="/tutorials/cross-domain-tracking"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to do cookieless tracking"
                        description="Track users without cookies for compliance and privacy."
                        Image={
                            <CloudinaryImage
                                alt=""
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/webhog2_7b3ca93610.png"
                            />
                        }
                        url="/tutorials/cookieless-tracking"
                    />
                </ul>
                <CallToAction
                    to="/docs/web-analytics/web-vs-product-analytics"
                    type="custom"
                    size="md"
                    className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                    childClassName="text-primary/75 dark:text-primary-dark/75 group-hover:text-primary/100 dark:group-hover:text-primary-dark/100 !bg-white dark:!bg-dark !border-light dark:!border-dark"
                    width="[calc(100%_+_3px)]"
                >
                    Learn the differences between web and product analytics
                </CallToAction>
            </section>
        </>
    )
}

const WebAnalytics: React.FC<WebAnalyticsProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="Web analytics - Docs - PostHog" />

            <PostLayout title={'Web analytics'} hideSurvey hideSidebar>
                <Intro />
                <Content />

                <div className="">
                    <CallToAction to="/docs/web-analytics/installation" width="full">
                        Visit the installation guide
                    </CallToAction>
                </div>
            </PostLayout>
        </Layout>
    )
}

export default WebAnalytics
