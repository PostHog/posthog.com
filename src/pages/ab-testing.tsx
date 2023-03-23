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
        featuresUsed.includes('a/b testing') &&
        author.company.name === 'Vendasta' &&
        author.name === 'Taric Santos de Andrade'
)

export default function FeatureTesting() {
    return (
        <Layout>
            <SEO title="A/B testing - PostHog" />
            <ProductLayout
                title="A/B testing"
                description={<p>A/B testing, multivariate testing, and statistical significance</p>}
                image={<StaticImage alt={'A/B testing'} src="../../../contents/images/apps/session-recording.png" />}
            >
                <Section className="max-w-screen-2xl" border borderPadding={false}>
                    <FeatureGrid>
                        {[
                            {
                                title: 'Built on Feature Flags',
                                description:
                                    'All the benefits of feature flags with added functionality around stat-sig experiments',
                            },
                            {
                                title: 'JSON payloads',
                                description: 'Modify website content per-variant without additional deployments',
                            },
                            {
                                title: 'Split testing',
                                description: 'Automatically split traffic between variants',
                            },
                            {
                                title: 'Multivariate testing',
                                description: 'Test up to 9 variants against a control',
                            },
                            {
                                title: 'Dynamic cohort support',
                                description: 'Add new users to an experiment automatically by setting a user property',
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
                            <StaticImage alt="A/B testing" src="../components/Home/Slider/images/ab-testing-hog.png" />
                        </div>
                    </TwoCol>
                </Section>
                <Section border>
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading
                                title="Customizable goals"
                                subtitle="Set the intended outcome that indicates a successful experiment"
                            />
                            <FeatureList
                                features={[
                                    {
                                        title: 'Goal types',
                                        description:
                                            'Choose your preferred outcome between a trend or conversion funnel',
                                    },
                                    {
                                        title: 'Secondary metrics',
                                        description:
                                            'Track multiple goals or check that your experiment doesn’t have unintended effects elsewhere',
                                    },
                                    {
                                        title: 'Statistical significance',
                                        description:
                                            'Set the minimum acceptable threshold required to declare a winning variant',
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
                                title="Targeting & exclusion rules"
                                subtitle="Run tests based on user location, user property, cohort, or group. You can also set exclusions to prevent groups of users from being shown an experiment."
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section border>
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading
                                title="Recommendations"
                                subtitle={
                                    'Based on your intended goal and level of statistical significance, PostHog can suggest an experiment’s duration, sample size, and confidence in a winning variant during a test.'
                                }
                            />
                        </div>
                        <div></div>
                    </TwoCol>
                </Section>
                <Section className="max-w-full">
                    <PairsWith
                        products={[
                            {
                                title: 'Product analytics',
                                description:
                                    'Run analysis based on the value of a test, or build a cohort of users from a test variant',
                            },
                            {
                                title: 'Session recording',
                                description:
                                    'Watch recordings of users in a variant to discover nuances in why they did or didn’t complete the goal',
                            },
                            {
                                title: 'Feature flags',
                                description:
                                    'Make changes to the feature flag the experiment uses - including JSON payload for each variant',
                            },
                        ]}
                    />
                </Section>
                <Section>
                    <Roadmap team={'Experimentation'} subtitle="Here's what the A/B testing Team is building next." />
                </Section>
                <Section>
                    <Questions />
                </Section>
                <Section>
                    <CTA
                        title="Try PostHog"
                        subtitle="First 1,000,000 events/mo are free."
                        image={
                            <StaticImage alt="A/B testing" src="../components/Home/Slider/images/ab-testing-hog.png" />
                        }
                    />
                </Section>
            </ProductLayout>
        </Layout>
    )
}
