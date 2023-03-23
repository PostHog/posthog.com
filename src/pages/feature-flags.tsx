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
    ({ featuresUsed, author }) =>
        featuresUsed.includes('feature flags') &&
        author.company.name === 'Phantom' &&
        author.name === 'Francesco Agosti'
)

export default function FeatureFlags() {
    const { blogPosts } = useStaticQuery(graphql`
        query {
            blogPosts: allMdx(filter: { frontmatter: { tags: { in: "Feature flags" } } }, limit: 6) {
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
            <SEO title="Feature flags - PostHog" />
            <ProductLayout
                title="Feature flags"
                description={<p>Safely roll out features to select users or cohorts</p>}
                image={<StaticImage alt={'Feature flags'} src="../../../contents/images/apps/session-recording.png" />}
            >
                <Section className="max-w-screen-2xl" border borderPadding={false}>
                    <FeatureGrid>
                        {[
                            {
                                title: 'History & activity feed',
                                description:
                                    'See who hit a feature flag, the flag’s value, and which page they were on',
                            },
                            {
                                title: 'Local evaluation',
                                description: 'Improves speed by caching a flag’s value on initial load',
                            },
                            {
                                title: 'Instant rollbacks',
                                description: 'Disable a feature without touching your codebase',
                            },
                            {
                                title: 'Bootstrappings',
                                description: 'Get flags and values to trigger changes immediately on page load',
                            },
                            {
                                title: 'Persist flags across authentication steps',
                                description: 'Make sure users have a consistent experience after login',
                            },
                            {
                                title: 'Flag administration',
                                description:
                                    'See the history of a feature flag or control who can modify flags with user roles',
                            },
                            {
                                title: 'SDKs or API',
                                description:
                                    'Copy code snippets for your library of choice, or implement yourself with the API',
                            },
                            {
                                title: 'Multi-environment support',
                                description:
                                    'Test flags in local development or staging by using the same flag key across PostHog projects',
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
                                alt="Feature flags"
                                src="../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section border>
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading
                                title="Choose who gets access to features"
                                subtitle="Customize your release strategy based on your goals with release conditions."
                            />
                            <FeatureList
                                features={[
                                    {
                                        title: 'By percentage of traffic',
                                        description: 'Roll out a feature to a percentage of all visitors',
                                    },
                                    {
                                        title: 'By user or group properties',
                                        description:
                                            'Choose specific people, or allow access by user or group property (like organization or multi-seat account)',
                                    },
                                    {
                                        title: 'By cohort',
                                        description: 'Cohorts can dynamically update with user properties',
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
                                title="Multivariate feature flags"
                                subtitle="Simultaneously test multiple versions against a control group."
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section border>
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading
                                title="Test changes without touching your codebase"
                                subtitle={
                                    <>
                                        <p>
                                            After a feature flag is installed, JSON payloads let you make changes to
                                            your product or website without subsequent deployments.
                                        </p>
                                        <p>This includes text, visuals, or even entire blocks of code.</p>
                                    </>
                                }
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
                                title="Automated usage reports"
                                subtitle="Insights are automatically created for each feature flag, including overall flag usage and usage by specific users"
                            />
                        </div>
                    </TwoCol>
                </Section>

                <Section className="max-w-full">
                    <PairsWith
                        products={[
                            {
                                title: 'Product analytics',
                                description:
                                    'Run any insight filtered by a flag’s value, or group by flag to see usage across a flag’s variants',
                            },
                            {
                                title: 'Product analytics: User paths',
                                description: 'See how a flag’s value influenced an intended outcome',
                            },
                            {
                                title: 'Session recording',
                                description:
                                    'Filter recordings down to only when a feature flag was called, or to a specific value of a flag',
                            },
                        ]}
                    />
                </Section>
                <Section>
                    <BlogPosts posts={blogPosts?.edges} title="Blog posts that mention feature flags" />
                </Section>
                <Section>
                    <Roadmap team={'Experimentation'} subtitle="Here's what the Feature Flags Team is building next." />
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
                                alt="Feature flags"
                                src="../components/Home/Slider/images/feature-flags-hog.png"
                            />
                        }
                    />
                </Section>
            </ProductLayout>
        </Layout>
    )
}
