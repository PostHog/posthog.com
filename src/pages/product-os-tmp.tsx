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
        featuresUsed.includes('data warehouse') && author.company.name === 'Feedr' && author.name === 'Nick Booth'
)

export default function ProductOS() {
    return (
        <Layout>
            <SEO title="Product OS - PostHog" />
            <ProductLayout
                title="Customer data infrastructure"
                description={<p>The Product OS is the foundation that all PostHog products are built on.</p>}
                image={
                    <StaticImage alt={'Feature testing'} src="../../../contents/images/apps/session-recording.png" />
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
                                title: 'Annotations',
                                description: 'Add context around product updates ship or when website traffic spikes',
                            },
                            {
                                title: 'Webhooks',
                                description: 'Get notifications for PostHog events in Slack, Teams, and more',
                            },
                            {
                                title: 'Reverse proxy',
                                description: 'Send events to PostHog Cloud using your own domain',
                            },
                            {
                                title: 'Warehouse sync',
                                description:
                                    "Sync data with Segment or Rudderstack – or use PostHog's built in warehouse",
                            },
                            {
                                title: 'Toolbar',
                                description: 'Add meaning to clicks and pageviews with a point and click',
                            },
                            {
                                title: 'Synthetic events',
                                description: 'Retroactive merge multiple event definitions into a single action',
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
                                alt="Product OS"
                                src="../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section border>
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading
                                title="Data warehouse"
                                subtitle={
                                    <>
                                        <p>Use ours (powered by ClickHouse) or bring your own.</p>
                                        <p>PostHog syncs with BigQuery, Snowflake, or Redshift with a couple clicks.</p>
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
                                title="Event pipelines"
                                subtitle={
                                    <>
                                        <p>PostHog ships with SDKs and a JavaScript snippet (with autocapture).</p>
                                        <p>
                                            Pipelines make it possible to ingest data from sources like Salesforce,
                                            Hubspot, and Zendesk – and there’s loads more you can do with a Zapier app.
                                        </p>
                                    </>
                                }
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section border>
                    <SectionHeading
                        title="API"
                        subtitle={'Build custom functionality or create bespoke views specific to your business needs'}
                    />
                    <TwoCol className="items-center">
                        <div>
                            <FeatureList
                                features={[
                                    {
                                        title: 'Data transformations',
                                        description:
                                            'Capture the live event stream and do something with it - like munge PII or add geolocation.',
                                    },
                                    {
                                        title: 'Data out',
                                        description: 'Access data from dashboards or metrics from saved insights.',
                                    },
                                    {
                                        title: 'Data augmentation',
                                        description:
                                            'Augment event data coming into PostHog with more context and detail',
                                    },
                                    {
                                        title: 'Reverse ETL',
                                        description:
                                            'Update and feed context to external products like Hubspot or Salesforce',
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <FeatureList
                                features={[
                                    {
                                        title: 'Build apps',
                                        description:
                                            'Develop custom functionality or choose from the 50ish apps in our 3rd party app library',
                                    },
                                    {
                                        title: 'Marketing or product automation',
                                        description:
                                            'Activate drip campaign or a push notification based on customer activity',
                                    },
                                    {
                                        title: 'Exclusion events',
                                        description: 'Prevent specific events from appearing in a path',
                                    },
                                    {
                                        title: 'Customer Data Platform (CDP)',
                                        description:
                                            'Create a singular customer view by combining event and customer data in one place.',
                                    },
                                ]}
                            />
                        </div>
                    </TwoCol>
                </Section>
                {/* <Section className="max-w-full">
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
                    <Roadmap
                        team={'Experimentation'}
                        subtitle="Here's what the Feature Testing Team is building next."
                    />
                </Section> */}
                <Section>
                    <Questions />
                </Section>
                <Section>
                    <CTA
                        title="Try PostHog"
                        subtitle="First 1,000,000 events/mo are free."
                        image={
                            <StaticImage
                                alt="Product OS"
                                src="../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                    />
                </Section>
            </ProductLayout>
        </Layout>
    )
}
