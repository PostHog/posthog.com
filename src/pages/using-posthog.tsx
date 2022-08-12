import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import { docs } from '../sidebars/sidebars.json'
import { graphql } from 'gatsby'
import ProductIcons from 'components/ProductIcons'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import SearchBox from 'components/SearchBox'
import { Close } from 'components/Icons/Icons'
import Modal from 'components/Modal'

const categories: {
    name: string
    manuals: {
        name: string
        url: string
        category: string
        description: string
        icon: typeof ProductIcons[keyof typeof ProductIcons]
    }[]
}[] = [
    {
        name: '1. Product analytics',
        manuals: [
            {
                name: 'Insights',
                url: '/manual/insights',
                category: 'insights',
                description: 'Visualize your events and actions',
                icon: ProductIcons.analytics,
            },
            {
                name: 'Group analytics',
                url: '/manual/group-analytics',
                category: 'group analytics',
                description: 'Track and analyze objects other than users',
                icon: ProductIcons.groupAnalytics,
            },
            {
                name: 'Graphs & trends',
                url: '/manual/trends',
                category: 'trends',
                description: 'Plot data from people, events, and properties',
                icon: ProductIcons.trends,
            },
            {
                name: 'Dashboards',
                url: '/manual/dashboards',
                category: 'dashboards',
                description: 'Group and track important metrics',
                icon: ProductIcons.dashboards,
            },
            {
                name: 'Funnels',
                url: '/manual/funnels',
                category: 'funnels',
                description: 'Inspect the journey of a user through your app',
                icon: ProductIcons.funnels,
            },
            {
                name: 'Lifecycle',
                url: '/manual/lifecycle',
                category: 'lifecycle',
                description: 'Understand when users drop-off',
                icon: ProductIcons.lifecycle,
            },
            {
                name: 'Path analysis',
                url: '/manual/paths',
                category: 'paths',
                description: 'Inspect how users journey through your product',
                icon: ProductIcons.pathAnalysis,
            },
            {
                name: 'Stickiness',
                url: '/manual/stickiness',
                category: 'stickiness',
                description: 'See your most engaged users',
                icon: ProductIcons.stickiness,
            },
            {
                name: 'Retention',
                url: '/manual/retenion',
                category: 'retention',
                description: 'Track how many of your users return',
                icon: ProductIcons.retention,
            },
        ],
    },
    {
        name: '2. Visualize',
        manuals: [
            {
                name: 'Session recording',
                url: '/manual/recordings',
                category: 'session recording',
                description: 'Playback sessions from your users',
                icon: ProductIcons.sessionRecording,
            },
            {
                name: 'Heatmaps',
                url: '/manual/heatmaps',
                category: 'heatmaps',
                description: 'Find the most popular areas within your app',
                icon: ProductIcons.heatmaps,
            },
        ],
    },
    {
        name: '3. Optimization',
        manuals: [
            {
                name: 'Feature flags',
                url: '/manual/feature-flags',
                category: 'feature flags',
                description: 'Safely deploy and rollback new features',
                icon: ProductIcons.featureFlags,
            },
            {
                name: 'Experimentation',
                url: '/manual/experimentation',
                category: 'experimentation',
                description: 'A/B test new changes to your product',
                icon: ProductIcons.experiments,
            },
            {
                name: 'Correlation analysis',
                url: '/manual/correlation',
                category: 'correlation analysis',
                description: 'Automatically highlight factors that affect conversion',
                icon: ProductIcons.correlationAnalysis,
            },
        ],
    },
    {
        name: '4. Data',
        manuals: [
            {
                name: 'Actions',
                url: '/manual/actions',
                category: 'actions',
                description: 'Combine multiple events into one',
                icon: ProductIcons.actions,
            },
            {
                name: 'Annotations',
                url: '/manual/annotations',
                category: 'annotations',
                description: 'Leave notes on your charts for significant events and releases',
                icon: ProductIcons.annotations,
            },
            {
                name: 'Cohorts',
                url: '/manual/cohorts',
                category: 'cohorts',
                description: 'Create a list of users who have something in common',
                icon: ProductIcons.cohorts,
            },
            {
                name: 'Events',
                url: '/manual/events',
                category: 'events',
                description: 'An events is any action a users takes in your product',
                icon: ProductIcons.events,
            },
            {
                name: 'Data management',
                url: '/manual/data-management',
                category: 'data management',
                description: 'Keep events and properties organized',
                icon: ProductIcons.dataManagement,
            },
            {
                name: 'Persons',
                url: '/manual/persons',
                category: 'persons',
                description: 'Track and segment individual users',
                icon: ProductIcons.persons,
            },
            {
                name: 'Sessions',
                url: '/manual/sessions',
                category: 'sessions',
                description: 'View all events a user performed across their visit',
                icon: ProductIcons.sessions,
            },
            {
                name: 'UTM segmentation',
                url: '/manual/utm-segmentation',
                category: 'utm segmentation',
                description: 'Track the effectiveness of campaigns',
                icon: ProductIcons.utm,
            },
        ],
    },
    {
        name: '5. Project settings',
        manuals: [
            {
                name: 'Team collaboration',
                url: '/manual/organizations-and-projects',
                category: 'team collaboration',
                description: 'Manage users within your organization',
                icon: ProductIcons.teamCollaboration,
            },
            {
                name: 'SSO (SAML)',
                url: '/manual/sso',
                category: 'sso',
                description: 'One-click login with single sign-on (SSO)',
                icon: ProductIcons.sso,
            },
            {
                name: 'Organizations and projects',
                url: '/manual/organizations-and-projects',
                category: 'organizations and projects',
                description: 'Organize your data and control access',
                icon: ProductIcons.projects,
            },
            {
                name: 'Settings',
                url: '/manual/settings',
                category: 'settings',
                description: 'Organization controls, billing, and project configuration',
                icon: ProductIcons.settings,
            },
            {
                name: 'Toolbar',
                url: '/manual/toolbar',
                category: 'toolbar',
                description: "Like 'Inspect Element' but for user behavior",
                icon: ProductIcons.toolbar,
            },
            {
                name: 'Notifications and alerts',
                url: '/manual/subscriptions',
                category: 'notifications and alerts',
                description: 'Receive updates from your insights an dashboards',
                icon: ProductIcons.notifications,
            },
        ],
    },
]

export const UsingPostHog: React.FC<{ data: any }> = ({ data }) => {
    const { tutorials, featuredTutorials } = data

    const tutorialsByCategory = tutorials.group.reduce((acc, curr) => {
        return {
            ...acc,
            [curr.category]: curr.nodes,
        }
    }, {})

    const [currentModal, setCurrentModal] = React.useState<string | undefined>(undefined)

    return (
        <Layout>
            <SEO title="Using PostHog - PostHog" />

            <PostLayout article={false} survey={false} title={'Docs'} menu={docs} hideSidebar>
                <div className="space-y-12">
                    <section className="px-1">
                        <h1 className="text-5xl">Using PostHog</h1>
                        <p className="max-w-2xl">
                            This section covers everything you need to know about using PostHog. If you're looking for
                            help tracking events or deploying a self-host version of PostHog,{' '}
                            <a href="/docs">visit the docs</a>.
                        </p>

                        <div className="my-4">
                            <SearchBox placeholder="Search..." />
                        </div>

                        <p>
                            If you don't find the answer you're looking for,{' '}
                            <a href="/questions">ask a question</a>.
                        </p>
                    </section>

                    <section>
                        <h3 className="px-1 font-bold text-3xl mb-4">Product manual</h3>
                        {categories.map((category) => {
                            return (
                                <div key={category.name}>
                                    <h4 className="pb-2 border-b border-dashed border-gray px-1 font-bold mt-4">
                                        {category.name}
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 px-1 my-6">
                                        {category.manuals.map((manual) => {
                                            const tutorials = tutorialsByCategory[manual.category]

                                            return (
                                                <li key={manual.name} className="list-none">
                                                    <Link
                                                        className="flex items-start h-full space-x-3 rounded relative hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark active:top-[0.5px] active:scale-[.99] px-3 py-4"
                                                        to={manual.url}
                                                    >
                                                        <span className="w-6 h-6 text-gray shrink-0">
                                                            {manual.icon}
                                                        </span>
                                                        <div>
                                                            <span className="text-red font-bold">{manual.name}</span>
                                                            <p className="text-gray m-0 font-normal text-sm">
                                                                {manual.description}
                                                            </p>

                                                            {tutorialsByCategory[manual.category] ? (
                                                                <button
                                                                    onClick={(event) => {
                                                                        event.preventDefault()
                                                                        setCurrentModal(manual.category)
                                                                    }}
                                                                    className="relative mt-2 inline-block bg-black/10 rounded-md text-xs px-2 py-1 text-gray font-semibold z-50 hover:bg-red hover:text-white"
                                                                >
                                                                    {tutorials.length}{' '}
                                                                    {tutorials.length > 1 ? 'tutorials' : 'tutorial'}
                                                                </button>
                                                            ) : null}
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </section>

                    <Modal open={currentModal !== undefined} setOpen={() => setCurrentModal(undefined)}>
                        <div className="bg-white dark:bg-primary w-full max-w-md h-screen ml-auto relative z-10 flex flex-col overflow-hidden">
                            <div className="flex items-center justify-between shrink-0 px-8 pt-8">
                                <h2 className="text-xl m-0">Related tutorials</h2>
                                <button onClick={() => setCurrentModal(undefined)}>
                                    <Close className="w-4 h-4 text-gray" />
                                </button>
                            </div>

                            <div className="w-full overflow-y-scroll mt-6 flex-grow">
                                <ul className="list-none m-0 p-0 space-y-6 px-8">
                                    {currentModal &&
                                        tutorialsByCategory[currentModal].map((tutorial) => (
                                            <li key={tutorial.fields.slug} className="bg-tan dark:bg-gray-accent-dark">
                                                <Link to={tutorial.fields.slug}>
                                                    <GatsbyImage image={getImage(tutorial.frontmatter.featuredImage)} />
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div className="py-4 px-8 shrink-0">
                                <Link
                                    to="/tutorials"
                                    className="block border-2 border-gray-accent-light text-gray rounded py-2 w-full text-center relative active:top-[0.5px] active:scale-[.98]"
                                >
                                    Browse all tutorials
                                </Link>
                            </div>
                        </div>
                    </Modal>

                    <section className="px-1 space-y-6">
                        <div className="space-y-3">
                            <h3 className="font-bold mb-0">Featured tutorials</h3>
                            <p>Here's where we highlight interesting things you can do with PostHog</p>
                            <Link
                                to="/tutorials"
                                className="inline-block bg-white dark:bg-gray-accent-dark rounded border-2 border-gray-accent-light dark:border-white/20 px-8 py-2 text-gray dark:text-white font-semibold relative active:top-[0.5px] active:scale-[.98]"
                            >
                                Browse tutorials
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mt-8 max-w-sm sm:max-w-2xl">
                            {featuredTutorials.nodes.map((tutorial) => {
                                return (
                                    <Link
                                        key={tutorial.id}
                                        to={tutorial.fields.slug}
                                        className="bg-gray-accent-light dark:bg-gray-accent-dark rounded"
                                    >
                                        <GatsbyImage image={getImage(tutorial.frontmatter.featuredImage)} />
                                    </Link>
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
    {
        tutorials: allMdx(filter: { slug: { glob: "tutorials/*" } }) {
            group(field: frontmatter___topics) {
                category: fieldValue
                nodes {
                    frontmatter {
                        title
                        featuredImage {
                            childImageSharp {
                                gatsbyImageData(placeholder: NONE)
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        featuredTutorials: allMdx(
            filter: {
                slug: {
                    in: [
                        "tutorials/cookieless-tracking"
                        "tutorials/survey"
                        "tutorials/experiments"
                        "tutorials/how-to-embed-shared-dashboard"
                    ]
                }
            }
        ) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    featuredImage {
                        childImageSharp {
                            gatsbyImageData(placeholder: NONE)
                        }
                    }
                }
            }
        }
    }
`

export default UsingPostHog
