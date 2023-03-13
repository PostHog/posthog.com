import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import docs from 'sidebars/docs.json'

import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import { LinkGrid } from 'components/Docs/LinkGrid'
import { graphql, PageProps } from 'gatsby'

const quickLinks = [
    {
        icon: 'insights',
        name: 'Product analytics',
        to: '/docs/product-analytics',
        description: 'Better understand your users and build better products',
    },
    {
        icon: 'session-recording',
        name: 'Session recording',
        to: '/docs/session-recording',
        description: 'Play back sessions to diagnose UI issues and get inspired',
    },
    {
        icon: 'feature-flags',
        name: 'Feature flags',
        to: '/docs/feature-flags',
        description: 'Toggle features to test the impact before rolling out',
    },
    {
        icon: 'experimentation',
        name: 'Experiments',
        to: '/docs/experiments',
        description: 'A/B test UI changes and new features',
    },
    {
        icon: 'selfHost',
        name: 'Data',
        to: '/docs/data',
        description: 'Get a complete picture of all your data',
    },
    {
        icon: 'apps',
        name: 'Apps',
        to: '/docs/apps',
        description: 'Extend PostHog by adding your own functionality',
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
            { name: 'Notifications & alerts', to: '/manual/notifications-and-alerts' },
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
            className="text-almost-black hover:text-almost-black dark:text-white dark:hover:text-white font-semibold p-2 hover:bg-gray-accent/40 active:hover:bg-gray-accent/60 dark:hover:bg-gray-accent/10 dark:active:bg-gray-accent/5 rounded flex items-center space-x-2 text-[14px]"
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
    apps: {
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
    const { gettingStarted, sdks, apps } = data

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
                <div className="space-y-16 lg:space-y-20 lg:-mt-12 mb-8">
                    <section>
                        <div className="w-full z-20">
                            <StaticImage
                                src="../../../contents/images/search-hog-3.png"
                                alt="This hog has an answer"
                                width={400}
                                placeholder="blurred"
                                className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                            />
                            <h1 className="font-bold text-5xl mb-2">Documentation</h1>
                            <h5 className="opacity-60 font-semibold leading-tight mb-8">
                                In-depth tutorials, references, and <br className="hidden md:block xl:hidden" />
                                examples for everything PostHog
                            </h5>
                        </div>

                        <LinkGrid links={quickLinks} />
                    </section>

                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="font-bold mb-1">Quick links</h2>
                            <p className="text-gray font-medium">
                                Get up and running <i>fast</i>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-4 rounded xl:rounded-none overflow-hidden">
                            <div className="bg-gray-accent-light dark:bg-gray-accent-dark lg:rounded px-6 py-4">
                                <div>
                                    <h4 className="font-bold mb-0">
                                        <span className="text-gray text-lg"></span> Getting started
                                    </h4>
                                    <p className="text-sm text-gray">Complete guide to getting set-up</p>
                                </div>

                                <ul className="grid grid-cols-2 xl:grid-cols-1 w-full list-none m-0 p-0 space-y-1">
                                    {gettingStartedLinks.map((step, index) => {
                                        return (
                                            <li className="flex-grow" key={step.fields.slug}>
                                                <ImportantLink to={step.fields.slug} title={step.frontmatter.title}>
                                                    <div className="bg-red text-white w-5 h-5 flex items-center justify-center rounded opacity-60 text-xs">
                                                        <span>{index + 1}</span>
                                                    </div>
                                                </ImportantLink>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="bg-gray-accent-light dark:bg-gray-accent-dark xl:rounded px-6 py-4">
                                <div>
                                    <h4 className="font-bold mb-0">
                                        <span className="text-gray text-lg"></span> Popular SDKs
                                    </h4>
                                    <p className="text-sm text-gray">Integrate with your favoriate language</p>
                                </div>
                                <ul className="grid grid-cols-2 xl:grid-cols-1 w-full list-none m-0 p-0 space-y-1">
                                    {sdks.nodes.map((sdk) => {
                                        return (
                                            <li className="flex-grow" key={sdk.fields.slug}>
                                                <ImportantLink
                                                    to={sdk.fields.slug}
                                                    title={sdk.frontmatter.title}
                                                    icon={sdk.frontmatter.icon?.publicURL}
                                                    badge={undefined}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="bg-gray-accent-light dark:bg-gray-accent-dark xl:rounded px-6 py-4">
                                <h4 className="font-bold mb-0">
                                    <span className="text-gray text-lg"></span> Popular apps
                                </h4>
                                <p className="text-sm text-gray">Import, transform, and export data</p>
                                <ul className="grid grid-cols-2 xl:grid-cols-1 w-full list-none m-0 p-0 space-y-1">
                                    {apps.nodes.map((app) => {
                                        return (
                                            <li className="flex-grow" key={app.fields.slug}>
                                                <ImportantLink
                                                    to={app.fields.slug}
                                                    title={app.frontmatter.title}
                                                    icon={app.frontmatter.thumbnail?.publicURL}
                                                    badge={undefined}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="font-bold mb-1">Important links</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                            {otherLinks.map((category) => {
                                return (
                                    <div
                                        key={category.name}
                                        className="space-y-2 py-4 md:py-6 px-4 md:px-8 border-dashed border-b border-r border-gray-accent-light dark:border-gray-accent-dark"
                                    >
                                        <h4 className="mb-0">{category.name}</h4>
                                        <ul className="p-0 space-y-1">
                                            {category.links.map((link) => {
                                                return (
                                                    <li key={link.to} className="list-none">
                                                        <Link to={link.to}>{link.name}</Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>
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
            filter: { slug: { regex: "/^docs/sdks/(js|node|python|react|ios|android)/$/" } }
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
        apps: allMdx(
            filter: { slug: { regex: "/^docs/apps/(?!build)\\w+/" } }
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
