import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'gatsby-link'
import { Link as ScrollLink } from 'react-scroll'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { CallToAction } from 'components/CallToAction'
import ResourceItem from 'components/Docs/ResourceItem'
import List from 'components/List'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'

type ProductAnalyticsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

const articles = [
    {
      "subtitle": "PostHog 101",
      "pages": [
        {
          "title": "Complete guide to event tracking",
          "path": "#"
        },
        {
          "title": "An introductory guide to identifying users in PostHog",
          "path": "#"
        },
        {
          "title": "What to do after installing PostHog in 5 steps",
          "path": "#"
        },
        {
          "title": "A non-technical guide to understanding data in PostHog",
          "path": "#"
        },
        {
          "title": "The basics of using regex in PostHog",
          "path": "#"
        },
      ]
    },
    {
      "subtitle": "PostHog for",
      "role": "product engineers",
      "pages": [
        {
          "title": "How to build your own app in PostHog",
          "path": "#"
        },
        {
          "title": "Canary releases with feature flags",
          "path": "#"
        },
        {
          "title": "How to use session replays to get a deeper understanding of user behavior",
          "path": "#"
        },
        {
          "title": "How to discover features that drive user retention",
          "path": "#"
        },
        {
          "title": "Multiple environments (dev, staging, prod)",
          "path": "#"
        },
        {
          "title": "Running experiments on new users",
          "path": "#"
        },
        {
          "title": "Correlate errors with product performance using Sentry",
          "path": "#"
        },
      ]
    },
    {
      "subtitle": "PostHog for",
      "role": "product managers",
      "pages": [
        {
          "title": "How to calculate and lower churn with PostHog",
          "path": "#"
        },
        {
          "title": "How to use session replays to get a deeper understanding of user behavior",
          "path": "#"
        },
        {
          "title": "How to discover features that drive user retention",
          "path": "#"
        },
        {
          "title": "Get feedback and book user interviews with surveys",
          "path": "#"
        },
      ]
    },
    {
      "subtitle": "PostHog for",
      "role": "front end developers",
      "pages": [
        {
          "title": "How to build a site app",
          "path": "#"
        },
        {
          "title": "Cookieless tracking with PostHog",
          "path": "#"
        },
        {
          "title": "How to add popups to your React app with feature flags",
          "path": "#"
        },
        {
          "title": "Testing front-end feature flags with React, Jest, & PostHog",
          "path": "#"
        },
        {
          "title": "Building a Vue cookie consent banner",
          "path": "#"
        },
      ]
    },
]



export const Intro = () => (
    <header className="pb-2">
        <h1 className="text-4xl mt-0 mb-2">Product analytics</h1>
        <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
        New to PostHog analytics? Here are some good places to start.
        </h3>
    </header>
)

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            <Intro />

            <div className="bg-accent dark:bg-accent-dark p-4 mb-4 rounded-md border border-light dark:border-dark">
                <p className="mb-2 opacity-70">Table of contents</p>
                <ol>
                    <li>
                        <ScrollLink
                            to="posthog-101"
                            smooth={true}
                            duration={300}
                            offset={-100}
                            className="cursor-pointer"
                        >
                            PostHog 101
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="product-engineers"
                            smooth={true}
                            duration={300}
                            offset={-100}
                            className="cursor-pointer"
                        >
                            PostHog for <span className="text-red dark:text-yellow font-semibold">product engineers</span>
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="product-managers"
                            smooth={true}
                            duration={300}
                            offset={-100}
                            className="cursor-pointer"
                        >
                            PostHog for <span className="text-red dark:text-yellow font-semibold">product managers</span>
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="front-end-developers"
                            smooth={true}
                            duration={300}
                            offset={-100}
                            className="cursor-pointer"
                        >
                            PostHog for <span className="text-red dark:text-yellow font-semibold">front end developers</span>
                        </ScrollLink>
                    </li>
                </ol>
            </div>

            {articles.map((group, i) => (
                <div id={group.role ? 
                    group.role.toLowerCase().replace(/\s+/g, '-') : 
                    group.subtitle.toLowerCase().replace(/\s+/g, '-')
                } key={i}>
                    <h3 className="mb-2">{group.subtitle} {group.role && <span className="text-red dark:text-yellow font-bold">{group.role}</span>}</h3>
                    <ul className="space-y-1 text-sm mb-6">
                        {group.pages.map((page, j) => (
                        <li key={j} className="first:font-bold first:text-base">
                            <Link
                                href={page.path}
                                className="text-primary dark:text-primary-dark hover:text-red dark:hover:text-yellow border-b border-dark dark:border-light hover:border-red dark:hover:border-yellow"
                            >
                            {page.title}
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>
            ))}

            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'product analytics')?.children}
                />
            )}

            
            <section className="mb-12">
                <h3 className="mb-1 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="The complete guide to event tracking"
                        description="Set up your analytics foundation"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/event-tracking-guide"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Track performance marketing"
                        description="Optimize ads and marketing channels"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/performance-marketing"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Reduce churn"
                        description="The bread and butter of long-term growth"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/churn-rate"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Track new and returning users"
                        description="Build cohorts and compare users"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/track-new-returning-users"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Identify and analyze power users"
                        description="Find and understand your most engaged users"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/power-users"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Calculate DAU/MAU ratio"
                        description="Popular engagement metrics that measure stickiness"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/dau-mau-ratio"
                    />
                </ul>
                <CallToAction
                    to="/docs/product-analytics/tutorials"
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
                <h3 className="mb-1 text-xl">Dashboard templates</h3>
                <p className="text-[15px]">Choose from a variety of pre-built templates for your stage of growth.</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        title="Product analytics"
                        description="Active users, feature flags, growth accounting, traffic sources"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages/docs/images/template-product-analytics.png"
                            />
                        }
                        url="/templates/product-analytics"
                    />
                    <ResourceItem
                        title="Website traffic"
                        description="User, sessions, content performance"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages/docs/images/template-website-traffic.png"
                            />
                        }
                        url="/templates/website-dashboard"
                    />
                    <ResourceItem
                        title="Realtime analytics"
                        description="Live users, sessions, traffic, sources"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages/docs/images/template-realtime-analytics.png"
                            />
                        }
                        url="/templates/real-time-dashboard"
                    />
                </ul>
                <CallToAction
                    to="/templates"
                    type="custom"
                    size="md"
                    className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                    childClassName="text-primary/75 dark:text-primary-dark/75 group-hover:text-primary/100 dark:group-hover:text-primary-dark/100 !bg-white dark:!bg-dark !border-light dark:!border-dark"
                    width="[calc(100%_+_3px)]"
                >
                    Browse templates
                </CallToAction>
            </section>
        </>
    )
}

const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="Product analytics - Documentation - PostHog" />

            <PostLayout title={'Product Analytics'} hideSurvey hideSidebar>
                <Content />
            </PostLayout>
        </Layout>
    )
}

export default ProductAnalytics
