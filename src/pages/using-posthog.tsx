import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import { docs } from '../sidebars/sidebars.json'
import ProductIcons from 'components/ProductIcons'

const categories: {
    name: string
    manuals: {
        name: string
        url: string
        description: string
        icon: typeof ProductIcons[keyof typeof ProductIcons]
    }[]
}[] = [
    {
        name: 'Product analytics',
        manuals: [
            {
                name: 'Insights',
                url: '/manuals/insights',
                description: 'Visualize your events and actions',
                icon: ProductIcons.analytics,
            },
            {
                name: 'Group analytics',
                url: '/manuals/group-analytics',
                description: 'Track and analyze objects other than users',
                icon: ProductIcons.groupAnalytics,
            },
            {
                name: 'Graphs & trends',
                url: '/manuals/trends',
                description: 'Plot data from people, events, and properties',
                icon: ProductIcons.trends,
            },
            {
                name: 'Dashboards',
                url: '/manuals/dashboards',
                description: 'Group and track important metrics',
                icon: ProductIcons.dashboards,
            },
            {
                name: 'Funnels',
                url: '/manuals/funnels',
                description: 'inspect the journey of a user through your app',
                icon: ProductIcons.funnels,
            },
            {
                name: 'Lifecycle',
                url: '/manuals/lifecycle',
                description: 'Understand when users drop-off',
                icon: ProductIcons.lifecycle,
            },
            {
                name: 'Path analysis',
                url: '/manuals/paths',
                description: 'Inspect how users journey through your product',
                icon: ProductIcons.pathAnalysis,
            },
            {
                name: 'Stickiness',
                url: '/manuals/stickiness',
                description: 'See your most engaged users',
                icon: ProductIcons.stickiness,
            },
            {
                name: 'Retention',
                url: '/manuals/retenion',
                description: 'Track how many of your users return',
                icon: ProductIcons.retention,
            },
        ],
    },
    {
        name: 'Visualize',
        manuals: [
            {
                name: 'Session recording',
                url: '/manuals/recordings',
                description: 'Playback sessions from your users',
                icon: ProductIcons.sessionRecording,
            },
            {
                name: 'Heatmaps',
                url: '/manuals/heatmaps',
                description: 'Find the most popular areas within your app',
                icon: ProductIcons.heatmaps,
            },
        ],
    },
    {
        name: 'Optimization',
        manuals: [
            {
                name: 'Feature flags',
                url: '/manuals/feature-flags',
                description: 'Safely deploy and rollback new features',
                icon: ProductIcons.featureFlags,
            },
            {
                name: 'Experimentation',
                url: '/manuals/experimentation',
                description: 'A/B test new changes to your product',
                icon: ProductIcons.experiments,
            },
            {
                name: 'Correlation analysis',
                url: '/manuals/correlation',
                description: 'Automatically highlight factors that affect conversion',
                icon: ProductIcons.correlationAnalysis,
            },
        ],
    },
    {
        name: 'Data',
        manuals: [
            {
                name: 'Actions',
                url: '/manuals/actions',
                description: 'Combine multiple events into one',
                icon: ProductIcons.actions,
            },
            {
                name: 'Annotations',
                url: '/manuals/annotations',
                description: 'Leave notes on your charts for significant events and releases',
                icon: ProductIcons.annotations,
            },
            {
                name: 'Cohorts',
                url: '/manuals/cohorts',
                description: 'Create a list of users who have something in common',
                icon: ProductIcons.cohorts,
            },
            {
                name: 'Events',
                url: '/manuals/events',
                description: 'An events is any action a users takes in your product',
                icon: ProductIcons.events,
            },
            {
                name: 'Data management',
                url: '/manuals/data-management',
                description: 'Keep events and properties organized',
                icon: ProductIcons.dataManagement,
            },
            {
                name: 'Persons',
                url: '/manuals/persons',
                description: 'Track and segment individual users',
                icon: ProductIcons.persons,
            },
            {
                name: 'Sessions',
                url: '/manuals/sessions',
                description: 'View all events a user performed across their visit',
                icon: ProductIcons.sessions,
            },
            {
                name: 'UTM segmentation',
                url: '/manuals/utm-segmentation',
                description: 'Track the effectiveness of campaigns',
                icon: ProductIcons.utm,
            },
        ],
    },
    {
        name: 'Project settings',
        manuals: [
            {
                name: 'Team collaboration',
                url: '/manuals/organizations-and-projects',
                description: 'Manage users within your organization',
                icon: ProductIcons.teamCollaboration,
            },
            {
                name: 'SSO (SAML)',
                url: '/manuals/sso',
                description: 'One-click login with single sign-on (SSO)',
                icon: ProductIcons.sso,
            },
            {
                name: 'Organizations and projects',
                url: '/manuals/organizations-and-projects',
                description: 'Organize your data and control access',
                icon: ProductIcons.projects,
            },
            {
                name: 'Settings',
                url: '/manuals/settings',
                description: 'Organization controls, billing, and project configuration',
                icon: ProductIcons.settings,
            },
            {
                name: 'Toolbar',
                url: '/manuals/toolbar',
                description: "Like 'Inspect Element' but for user behavior",
                icon: ProductIcons.toolbar,
            },
            {
                name: 'Notifications and alerts',
                url: '/manuals/subscriptions',
                description: 'Receive updates from your insights an dashboards',
                icon: ProductIcons.notifications,
            },
        ],
    },
]

export const UsingPostHog: React.FC = () => {
    return (
        <Layout>
            <SEO title="Using PostHog - PostHog" />

            <PostLayout article={false} survey={false} title={'Docs'} menu={docs} hideSidebar>
                <section className="px-1">
                    <h1>Using PostHog</h1>
                    <p className="max-w-2xl">
                        This section covers everything you need to know about using PostHog. If you're looking for help
                        tracking events or deploying a self-host version of PostHog, <a href="/docs">visit the docs</a>
                    </p>
                </section>

                <section>
                    <h3 className="px-1 font-bold">Product manuals</h3>
                    {categories.map((category) => {
                        return (
                            <div key={category.name}>
                                <h4 className="pb-2 border-b border-dashed border-gray px-1 font-bold">
                                    {category.name}
                                </h4>
                                <ul className="grid grid-cols-2 px-1">
                                    {category.manuals.map((manual) => {
                                        return (
                                            <li key={manual.name} className="flex items-start space-x-3">
                                                <span className="w-6 h-6 text-gray">{manual.icon}</span>
                                                <div>
                                                    <Link className="text-red font-semibold" to={manual.url}>
                                                        {manual.name}
                                                    </Link>
                                                    <p>{manual.description}</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </section>
            </PostLayout>
        </Layout>
    )
}

export default UsingPostHog
