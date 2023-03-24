import Layout from 'components/Layout'
import ProductLayout, {
    Feature,
    FeatureGrid,
    FeatureList,
    PairsWith,
    SectionHeading,
    Testimonial,
    TwoCol,
} from 'components/ProductLayout'
import SEO from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import testimonials from '../data/testimonials.json'
import { Section } from 'components/ProductLayout'
import { BlogPosts, CTA, PostHogVS, Questions, Roadmap } from '../components/ProductLayout'
import { graphql, useStaticQuery } from 'gatsby'

const testimonial = testimonials.find(
    ({ featuresUsed, author }) => featuresUsed.includes('funnels') && author.name === 'Tiffany Wong'
)

export default function SessionRecording() {
    const { blogPosts } = useStaticQuery(graphql`
        query {
            blogPosts: allMdx(filter: { frontmatter: { tags: { in: "Product analytics" } } }, limit: 6) {
                edges {
                    node {
                        ...BlogFragment
                    }
                }
            }
        }
    `)

    return (
        <Layout>
            <SEO title="Product analytics - PostHog" />
            <ProductLayout
                title="Product analytics"
                description={<p>Funnels, path analysis, trend charts, retention graphs, and more</p>}
                image={
                    <StaticImage alt={'Session recording'} src="../../../contents/images/apps/session-recording.png" />
                }
            >
                <Section className="max-w-screen-2xl" border borderPadding={false}>
                    <FeatureGrid>
                        {[
                            {
                                title: 'Autocapture',
                                description:
                                    'Add PostHog.js to your website or web app to track all event data and retroactively define events',
                            },
                            {
                                title: 'Dataviz',
                                description: 'Filter data by user property, group data, and use formulas in queries',
                            },
                            {
                                title: 'SQL',
                                description:
                                    'Use PostHog’s filtering interface or switch into SQL mode for more powerful querying',
                            },
                            {
                                title: 'Dashboards and insight subscriptions',
                                description: 'Share insights with teams, and get updates when results change',
                            },
                            {
                                title: 'Group analytics',
                                description: 'Analyze users within the context of their organization',
                            },
                        ].map((feature) => {
                            const { title, description } = feature
                            return <Feature key={title} title={title} description={description} />
                        })}
                    </FeatureGrid>
                </Section>
                <Section>
                    <TwoCol className="items-end">
                        <Testimonial {...testimonial} />
                        <div>
                            <StaticImage
                                alt="Session recording"
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section border>
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading title="Funnels" subtitle="Find drop-off across a series of actions" />
                            <FeatureList
                                features={[
                                    {
                                        title: 'Filtering',
                                        description:
                                            'Set filters for individual steps – or the entire funnel – by user property, group or cohort, or event property',
                                    },
                                    {
                                        title: 'Graph types',
                                        description:
                                            'Track user progression between steps, conversion time between each step, and how a funnel’s conversion rate changes over time',
                                    },
                                    {
                                        title: 'Step ordering',
                                        description:
                                            'Choose between a sequential series of steps, a strict order, or any order of steps that lead to conversion',
                                    },
                                    {
                                        title: 'Granular controls',
                                        description:
                                            'Set conversion window limit, add exclusionary steps, set attribution type, and see the relative conversion rate between each step',
                                    },
                                ]}
                            />
                        </div>
                        <div></div>
                    </TwoCol>
                </Section>
                <Section>
                    <TwoCol className="items-center">
                        <div></div>
                        <div>
                            <SectionHeading
                                title="Graphs & trends"
                                subtitle="Visualize user data with graphs, tables, charts, maps, and more"
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section border>
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading title="User paths" subtitle="User paths" />
                            <FeatureList
                                features={[
                                    {
                                        title: 'Step insights',
                                        description:
                                            'See who dropped off at each step, who did or didn’t complete a step, and the drop-off rate',
                                    },
                                    {
                                        title: 'Wildcard groups',
                                        description:
                                            'Group similar steps into a mega-step (where any of a group of events can trigger a step)',
                                    },
                                    {
                                        title: 'Exclusion events',
                                        description: 'Prevent specific events from appearing in a path',
                                    },
                                    {
                                        title: 'Granular controls',
                                        description:
                                            'Visualize any sequence of page views, screen views or events, with up to 20 steps',
                                    },
                                ]}
                            />
                        </div>
                        <div></div>
                    </TwoCol>
                </Section>
                <Section>
                    <TwoCol className="items-center">
                        <div></div>
                        <div>
                            <SectionHeading
                                title="More insight types"
                                subtitle="Retention, stickiness, and lifecycle views"
                            />
                            <FeatureList
                                features={[
                                    {
                                        title: 'Retention',
                                        description:
                                            'See how many users return on subsequent days after first visiting your site or product',
                                    },
                                    {
                                        title: 'Stickiness',
                                        description:
                                            'Learn how many times users perform a specific event in a period of time',
                                    },
                                    {
                                        title: 'Lifecycle',
                                        description:
                                            'Discover how your active users break down, highlighting those who have recently stopped being active or those who have just become active for the first time',
                                    },
                                ]}
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section border>
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading title="Dashboards" />
                            <FeatureList
                                features={[
                                    {
                                        title: 'Dashboard filtering',
                                        description:
                                            'Filter saved insights on a dashboard by anything - event properties, user properties, cohorts - even if a feature flag was active during a user’s session',
                                    },
                                    {
                                        title: 'Embeddable dashboards with auto-refresh',
                                        description:
                                            'Embed a dashboard iframe and always have near-realtime data - great for showing KPIs on a TV',
                                    },
                                    {
                                        title: 'Weekly updates by Slack or email',
                                        description:
                                            'Send dashboard updates to a Slack channel or to colleagues via email at any recurring frequency',
                                    },
                                    {
                                        title: 'Access restrictions',
                                        description:
                                            'Limit dashboard access with role-based permissions or using private projects',
                                    },
                                    {
                                        title: 'Customizable layouts',
                                        description: 'Configure how many insights appear per row or column',
                                    },
                                ]}
                            />
                        </div>
                        <div></div>
                    </TwoCol>
                </Section>
                <Section>
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading
                                title="Groups"
                                subtitle="Analyze usage of multi-seat customers by rolling up individual user activity to the account level"
                            />
                        </div>
                        <div></div>
                    </TwoCol>
                </Section>
                <Section className="max-w-full">
                    <PairsWith
                        products={[
                            {
                                title: 'Session recording',
                                description:
                                    'Jump into a playlist of session recordings directly from any point in a graph, or segment of a funnel',
                            },
                            {
                                title: 'Feature flags',
                                description: 'See which feature flags were enabled for a user during a session',
                            },
                            {
                                title: 'A/B testing',
                                description:
                                    'Filter data down to users within an active experiment, whether part of a control group or a test variant',
                            },
                        ]}
                    />
                </Section>
                <Section>
                    <BlogPosts posts={blogPosts?.edges} title="Blog posts that mention product analytics" />
                </Section>
                <Section>
                    <Roadmap
                        team={'Product Analytics'}
                        subtitle="Here's what the Product Analytics Team is building next."
                    />
                </Section>
                <Section>
                    <Questions />
                </Section>
                <Section>
                    <CTA
                        title="Try PostHog"
                        subtitle="First 1,000,000 events/mo are free."
                        image={
                            <StaticImage
                                alt="Session recording"
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                    />
                </Section>
            </ProductLayout>
        </Layout>
    )
}
