import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'
import AskMax from 'components/AskMax'
import Intro from 'components/Docs/Intro'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import { ProductScreenshot } from 'components/ProductScreenshot'
type WebAnalyticsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
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
                <h3 className="mb-2 text-xl">FAQ</h3>
                <Link to="/docs/web-analytics/web-vs-product-analytics">
                    What's the difference between web and product analytics?
                </Link>
            </section>
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="Calculating session-based metrics"
                        description="Give an overview, then dive deeper into metrics like average session duration and time on site."
                        url="/tutorials/session-metrics"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up cross-domain tracking"
                        description="Track users accurately across multiple websites and domains."
                        url="/tutorials/cross-domain-tracking"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to do cookieless tracking"
                        description="Track users without cookies for compliance and privacy."
                        url="/tutorials/cookieless-tracking"
                    />
                </ul>
            </section>
        </>
    )
}

const WebAnalytics: React.FC<WebAnalyticsProps> = ({ data }) => {
    return (
        <ReaderView>
            <SEO title="Web analytics - Docs - PostHog" />

            <div className="mx-auto max-w-4xl">
                <Intro
                    subheader="Getting started"
                    title="Web analytics"
                    description="Track and monitor many of the most important metrics for your website."
                    buttonText="Installation guide"
                    buttonLink="/docs/web-analytics/installation"
                    imageColumnClasses="mt-4 md:-mt-8"
                    imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_hog_f6db3a01c9.png"
                    imageClasses="max-h-48 md:max-h-64"
                />

                <section className="mb-8">
                    <p>
                        Unlike <Link to="/docs/product-analytics">product analytics</Link>, web analytics offers a more
                        streamlined and focused experience. This is especially useful for marketers, content creators,
                        or anyone used to tools like{' '}
                        <Link to="/blog/google-analytics-to-posthog">Google Analytics</Link>. It includes a{' '}
                        <Link to="/docs/web-analytics/dashboard">dashboard</Link> that offers essential metrics, such as
                        visitors, views, sessions, session duration, bounce rate,{' '}
                        <Link to="/docs/web-analytics/conversion-goals">conversions</Link>, paths, referrers, and more.
                    </p>
                    <ProductScreenshot
                        imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_light_mode_2024_10_d830a26db4.png"
                        alt="Web analytics"
                        classes="rounded"
                        padding={true}
                    />
                </section>

                <AskMax
                    quickQuestions={[
                        'Do I need a cookie banner?',
                        'How do I track conversions?',
                        'Why do my metrics differ from other tools?',
                    ]}
                />

                <Content />
            </div>
        </ReaderView>
    )
}

export default WebAnalytics
