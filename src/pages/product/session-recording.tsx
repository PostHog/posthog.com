import Layout from 'components/Layout'
import ProductLayout, {
    Feature,
    FeatureDescription,
    FeatureGrid,
    FeatureList,
    FeatureTitle,
    PairsWith,
    SectionHeading,
    Testimonial,
    TwoCol,
} from 'components/ProductLayout'
import SEO from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import testimonials from '../../data/testimonials.json'
import { Section } from 'components/ProductLayout'
import Link from 'components/Link'

const testimonial = testimonials.find(
    ({ featuresUsed, author }) => featuresUsed.includes('session recording') && author.name === 'Anubhuti Mishra'
)

export default function SessionRecording() {
    return (
        <Layout>
            <SEO title="Session recording - PostHog" />
            <ProductLayout
                title="Session recording"
                description={
                    <p>
                        <strong className="text-red">Watch recordings of visitors</strong> using your product or
                        website.
                    </p>
                }
                image={
                    <StaticImage alt={'Session recording'} src="../../../contents/images/apps/session-recording.png" />
                }
            >
                <Section border borderPadding={false}>
                    <FeatureGrid>
                        {[
                            {
                                title: 'Capture sessions without extra code',
                                description: 'Works with PostHog.js',
                            },
                            {
                                title: 'Automatic playlists',
                                description: 'Filter by user behavior or time',
                            },
                            {
                                title: 'Mobile session recording',
                                description: 'iOS library now in beta',
                            },
                            {
                                title: 'Download recordings',
                                description: 'Retain recordings beyond data retention limits',
                            },
                            {
                                title: 'Block sensitive data',
                                description: 'Disable capturing data from any DOM element with CSS',
                            },
                        ].map((feature) => {
                            const { title, description } = feature
                            return <Feature key={title} title={title} description={description} />
                        })}
                    </FeatureGrid>
                </Section>
                <Section className="max-w-5xl">
                    <TwoCol className="items-end">
                        <Testimonial {...testimonial} />
                        <div>
                            <StaticImage
                                alt="Session recording"
                                src="../../components/Home/Slider/images/session-recording-hog.png"
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section border className="max-w-5xl">
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading
                                title="Event timeline"
                                subtitle="History of everything that happened in a user's session"
                            />
                            <FeatureList
                                features={[
                                    {
                                        title: 'Filter',
                                        description:
                                            'By page, event type, or capture method. Limit playback to sessions that meet specific behavorial or event criteria.',
                                    },
                                    {
                                        title: 'Scrub',
                                        description:
                                            'Jump to any moment in a session. Control playback speed and skip over periods of inactivity.',
                                    },
                                    {
                                        title: 'Metadata',
                                        description:
                                            'Access loads of data sent with each event - like screen dimensions, device type or location.',
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <StaticImage
                                alt="Session recording"
                                src="../../components/Product/images/session-recording/timeline.png"
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section className="max-w-5xl">
                    <TwoCol className="items-center">
                        <div>
                            <StaticImage
                                alt="Session recording"
                                src="../../components/Product/images/session-recording/console-logs.png"
                            />
                        </div>
                        <div>
                            <SectionHeading
                                title="Built-in console logs"
                                subtitle="Debug issues faster with the console log - just like if you asked them to open Inspector."
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section border className="max-w-5xl">
                    <TwoCol className="items-center">
                        <div>
                            <SectionHeading title="Network tab" subtitle="Track network calls and performance." />
                            <p className="mb-2">
                                "The user seemed frustrated. Oh, there was a 5 second API request. That's
                                interesting..."
                            </p>
                            <p className="m-0">
                                <i>- How PostHog engineers use this feature</i>
                            </p>
                        </div>
                        <div>
                            <StaticImage
                                alt="Session recording"
                                src="../../components/Product/images/session-recording/network-tab.png"
                            />
                        </div>
                    </TwoCol>
                </Section>
                <Section>
                    <PairsWith products={[]} />
                </Section>
            </ProductLayout>
        </Layout>
    )
}
