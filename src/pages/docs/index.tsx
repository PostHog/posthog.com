import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import { CallToAction } from 'components/CallToAction'
import { LightBulb } from '@posthog/icons'
import KeyboardShortcut from 'components/KeyboardShortcut'

const quickLinks = [
    {
        icon: 'Graph',
        name: 'Product analytics',
        to: '/docs/product-analytics',
        description: 'Better understand your users and build better products',
        color: 'blue',
    },
    {
        icon: 'RewindPlay',
        name: 'Session recording',
        to: '/docs/session-replay',
        description: 'Play back sessions to diagnose UI issues and get inspired',
        color: 'yellow',
    },
    {
        icon: 'Toggle',
        name: 'Feature flags',
        to: '/docs/feature-flags',
        description: 'Toggle features to test the impact before rolling out',
        color: 'seagreen',
    },
    {
        icon: 'Flask',
        name: 'A/B testing',
        to: '/docs/experiments',
        description: 'A/B test UI changes and new features',
        color: 'purple',
    },
    {
        icon: 'Person',
        name: 'CDP',
        to: '/docs/cdp',
        description: 'Get a complete picture of all your data',
        color: 'yellow',
    },
    {
        icon: 'Server',
        name: 'Data warehouse',
        to: '/docs/data-warehouse',
        description: 'Extend PostHog by adding your own functionality',
        color: 'teal',
    },
]

export const DocsIndex = () => {
    return (
        <Layout>
            <SEO title="Documentation - PostHog" />

            <PostLayout article={false} title={'Docs'} hideSidebar hideSurvey>
                <section className="mb-4 flex flex-col-reverse lg:flex-row gap-4 lg:gap-8">
                    <div className="flex-1 text-center sm:text-left">
                        <h2>New to PostHog?</h2>
                        <p className="text-[15px]">
                            The getting started guide covers adding PostHog to your app or site, sending events,
                            identifying users, creating actions and insights, and assigning properties to users and
                            users to groups.
                        </p>
                        <CallToAction
                            to="/docs/getting-started/install"
                            type="primary"
                            size="md"
                            className="!w-full sm:!w-auto"
                        >
                            Get started
                        </CallToAction>
                    </div>
                    <aside>
                        <figure className="m-0">
                            <StaticImage
                                objectFit="contain"
                                src="../../../contents/images/adventure-hog.png"
                                alt="This hog knows where he's headed"
                                width={342}
                                placeholder="blurred"
                                className="w-full sm:w-[345px]"
                            />
                        </figure>
                    </aside>
                </section>

                <div className="flex gap-1 items-center mb-8">
                    <LightBulb className="w-6 h-6 text-primary dark:text-primary-dark opacity-50" />
                    <p className="text-sm m-0">
                        <strong>Tip:</strong> Open search with <KeyboardShortcut text="/" /> , then{' '}
                        <KeyboardShortcut text="Tab" size="sm" /> to search docs
                    </p>
                </div>

                <section className="@container">
                    <div className="flex flex-col @3xl:grid md:grid-cols-3 gap-4 mb-8">
                        <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                            <h3 className="text-xl mb-2">Data</h3>
                            <p className="text-[15px]">
                                Learn how to manage events and customer data for use with all PostHog products.
                            </p>
                            <CallToAction to="/docs/data" type="outline" size="md" className="!w-full sm:!w-auto">
                                Explore
                            </CallToAction>
                        </div>
                        <div className="@container border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                            <h3 className="text-xl mb-2">Apps</h3>
                            <p className="text-[15px]">
                                Extend functionality with third-party apps that integrate into the PostHog ecosystem.
                            </p>
                            <div className="flex flex-col @[14rem]:flex-row  items-start @[14rem]:items-center gap-4">
                                <CallToAction to="/docs/apps" type="outline" size="md" className="!w-full sm:!w-auto">
                                    Explore
                                </CallToAction>
                                <Link to="/apps" className="text-sm">
                                    Browse apps
                                </Link>
                            </div>
                        </div>
                        <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                            <h3 className="text-xl mb-2">API</h3>
                            <p className="text-[15px]">
                                Push or pull data to build custom functionality or create bespoke views for your
                                business needs.
                            </p>
                            <CallToAction to="/docs/api" type="outline" size="md" className="!w-full sm:!w-auto">
                                Explore
                            </CallToAction>
                        </div>
                    </div>
                </section>

                <section className="mb-4 lg:flex-row gap-4 lg:gap-8">
                    <h2>Products</h2>
                    <List
                        className="grid md:grid-cols-2 gap-1"
                        items={quickLinks.map(({ icon, name, to, description, color }) => ({
                            label: name,
                            url: to,
                            icon,
                            description,
                            iconColor: color,
                        }))}
                    />
                </section>
            </PostLayout>
        </Layout>
    )
}

export default DocsIndex
