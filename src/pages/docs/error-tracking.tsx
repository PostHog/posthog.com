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

type ErrorTrackingProps = {
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
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'error tracking')?.children}
                />
            )}

            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="How to correlate errors with product performance using Sentry"
                        description="Learn how to combine Sentry errors with PostHog data"
                        url="/tutorials/sentry-plugin-tutorial"
                    />
                    <ResourceItem
                        type="Article"
                        title="In-depth: PostHog vs Sentry"
                        description="Get a full overview of how PostHog and Sentry compare"
                        url="/blog/posthog-vs-sentry"
                    />
                    <ResourceItem
                        type="Article"
                        title="What is real user monitoring (and how to set it up)"
                        description="How to set up RUM to get more context on errors"
                        url="/product-engineers/real-user-monitoring"
                    />
                </ul>
            </section>
        </>
    )
}

const ErrorTracking: React.FC<ErrorTrackingProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="Error tracking - Docs - PostHog" />

            <PostLayout title={'Error tracking'} hideSurvey hideSidebar>
                <Intro
                    subheader="Getting started"
                    title="Error tracking"
                    description="Track and monitor errors and exceptions in your code."
                    buttonText="Installation guide"
                    buttonLink="/docs/error-tracking/installation"
                    imageColumnClasses="mt-4 md:-mt-8"
                    imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/error_f2df714c47.png"
                    imageClasses="max-h-48 md:max-h-64"
                />

                <AskMax
                    quickQuestions={[
                        'How do I see what the most common errors are?',
                        'How do I custom error groups?',
                        'How do I assign someone an error?',
                    ]}
                />

                <Content />

                <div className="">
                    <CallToAction to="/docs/error-tracking/installation" width="full">
                        Visit the manual
                    </CallToAction>
                </div>
            </PostLayout>
        </Layout>
    )
}

export default ErrorTracking
