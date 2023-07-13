import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import docs from 'sidebars/docs.json'

import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import { graphql, PageProps } from 'gatsby'
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

const otherLinks = [
    {
        name: 'Integrate PostHog',
        links: [
            { name: 'Send events', to: '/docs/getting-started/send-events' },
            { name: 'Historical events', to: '/docs/integrate/ingest-historic-data' },
            { name: 'Identifying users', to: '/docs/integrate/identifying-users' },
            { name: 'Libraries', to: '/docs/integrate/libraries' },
            { name: 'Proxying events', to: '/docs/integrate/proxy' },
        ],
    },
    {
        name: 'Self-host',
        links: [
            { name: 'Deployment', to: '/docs/self-host' },
            { name: 'Runbook', to: '/docs/runbook' },
            { name: 'Environment variables', to: '/docs/self-host/configure/environment-variables' },
            { name: 'Monitoring', to: '/docs/self-host/configure/monitoring-with-grafana' },
            { name: 'Upgrading', to: '/docs/runbook/upgrading-posthog' },
            { name: 'Troubleshooting', to: '/docs/self-host/deploy/troubleshooting' },
        ],
    },
    {
        name: 'Apps',
        links: [
            { name: 'Explore app library', to: '/apps' },
            { name: 'Use cases', to: '/docs/apps' },
            { name: 'Building an app', to: '/docs/apps/build' },
            { name: 'Developer reference', to: '/docs/apps/build/reference' },
        ],
    },
    {
        name: 'Data management',
        links: [
            { name: 'Organizations & projects', to: '/manual/organizations-and-projects' },
            { name: 'UTM parameters', to: '/manual/utm-segmentation' },
            { name: 'Events', to: '/manual/events' },
            { name: 'Annotations', to: '/manual/annotations' },
        ],
    },
    {
        name: 'Developers',
        links: [
            { name: 'REST API', to: '/docs/api' },
            { name: 'Developing locally', to: '/handbook/engineering/developing-locally' },
            { name: 'Contributing', to: '/docs/contribute' },
            { name: 'How PostHog works', to: '/docs/how-posthog-works' },
        ],
    },
    {
        name: 'Privacy & compliance',
        links: [
            { name: 'GDPR', to: '/docs/privacy/gdpr-compliance' },
            { name: 'HIPAA', to: '/docs/privacy/hipaa-compliance' },
            { name: 'CCPA', to: '/docs/privacy/ccpa-compliance' },
            { name: 'Data deletion', to: '/docs/privacy/data-deletion' },
        ],
    },
]

type ImportantLinkProps = {
    to: string
    icon?: string
    title: string
    badge?: 'new' | 'beta' | undefined
    children?: React.ReactNode
}

const ImportantLink: React.FC<ImportantLinkProps> = ({ to, icon, title, badge, children }) => {
    const badgeClass = badge === 'new' ? 'success' : badge === 'beta' ? 'warning' : null

    return (
        <Link
            className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark font-semibold p-2 hover:bg-gray-accent/40 active:hover:bg-gray-accent/50 dark:hover:bg-gray-accent/10 dark:active:bg-gray-accent/5 rounded flex items-center space-x-2 text-[14px]"
            to={to}
        >
            {icon ? <img src={icon} className="w-5 h-5" /> : children || null}
            <span>{title}</span>
            {badge && <span className={`lemon-tag ${badgeClass}`}>{badge}</span>}
        </Link>
    )
}

type DocsData = {
    gettingStarted: {
        nodes: {
            fields: {
                slug: string
            }
            frontmatter: {
                title: string
                icon?: {
                    publicURL: string
                }
            }
        }[]
    }
    sdks: {
        nodes: {
            fields: {
                slug: string
            }
            frontmatter: {
                title: string
                icon?: {
                    publicURL: string
                }
            }
        }[]
    }
    pipelines: {
        nodes: {
            fields: {
                slug: string
            }
            frontmatter: {
                title: string
                thumbnail?: {
                    publicURL: string
                }
            }
        }[]
    }
}

export const DocsIndex = ({ data }: PageProps<DocsData>) => {
    const { gettingStarted, sdks, pipelines } = data

    const gettingStartedLinks = React.useMemo(() => {
        const gettingStartedSection = docs.find((section) => section.name === 'Getting started')?.children || []
        return gettingStarted.nodes.sort(
            (a, b) =>
                gettingStartedSection?.findIndex((link) => link.url === a.fields.slug) -
                gettingStartedSection?.findIndex((link) => link.url === b.fields.slug)
        )
    }, [])

    return (
        <Layout>
            <SEO title="Documentation - PostHog" />

            <PostLayout article={false} title={'Docs'} menu={docs} hideSidebar hideSurvey>
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

                <section className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                        <h3 className="text-xl mb-2">Data</h3>
                        <p className="text-[15px]">
                            Learn how to manage events and customer data for use with all PostHog products.
                        </p>
                        <CallToAction to="/docs/data" type="outline" size="md" className="!w-full sm:!w-auto">
                            Get started
                        </CallToAction>
                    </div>
                    <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                        <h3 className="text-xl mb-2">Apps</h3>
                        <p className="text-[15px]">
                            Extend functionality with third-party apps that integrate into the PostHog ecosystem.
                        </p>
                        <div className="flex items-center gap-4">
                            <CallToAction to="/docs/apps" type="outline" size="md" className="!w-full sm:!w-auto">
                                Get started
                            </CallToAction>
                            <Link to="/apps" className="text-sm">
                                Browse apps
                            </Link>
                        </div>
                    </div>
                    <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                        <h3 className="text-xl mb-2">API</h3>
                        <p className="text-[15px]">
                            Push or pull data to build custom functionality or create bespoke views for your business
                            needs.
                        </p>
                        <CallToAction to="/docs/api" type="outline" size="md" className="!w-full sm:!w-auto">
                            Explore
                        </CallToAction>
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

export const query = graphql`
    query PopularLinks {
        gettingStarted: allMdx(
            filter: { slug: { regex: "/^docs/getting-started/(?!start-here)[\\w\\-]+$/" } }
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    icon {
                        publicURL
                    }
                }
            }
        }
        sdks: allMdx(
            filter: { slug: { regex: "/^docs/libraries/(js|node|python|react|ios|android)/$/" } }
            sort: { fields: fields___pageViews, order: DESC }
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    icon {
                        publicURL
                    }
                }
            }
        }
        pipelines: allMdx(
            filter: { slug: { regex: "/^docs/cdp/(?!build)\\w+/" } }
            sort: { fields: fields___pageViews, order: DESC }
            limit: 6
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    thumbnail {
                        publicURL
                    }
                }
            }
        }
    }
`

export default DocsIndex
