import Layout from 'components/Layout'
import ProductLayout, {
    Feature,
    FeatureDescription,
    FeatureGrid,
    FeatureList,
    FeatureTitle,
    Footer,
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
import { BlogPosts, CTA, PostHogVS, Questions, Roadmap } from '../../components/ProductLayout'
import { Check as CheckIcon, Close as CloseIcon } from '../../components/Icons'
import { graphql, useStaticQuery } from 'gatsby'
import { Squeak } from 'squeak-react'

const Check = () => <CheckIcon className="w-5" />
const Close = () => <CloseIcon className="w-5" />

const ComparisonTable = () => {
    return (
        <table>
            <thead>
                <tr>
                    <td className="w-3/12"></td>
                    <td className="w-2/12 text-center">Hotjar</td>
                    <td className="w-2/12 text-center">Logrocket</td>
                    <td className="w-2/12 text-center">Matomo</td>
                    <td className="w-3/12 text-center bg-gray-accent bg-opacity-50">
                        <strong>PostHog</strong>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <strong>Platform</strong>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="bg-gray-accent bg-opacity-50">&nbsp;</td>
                </tr>
                <tr>
                    <td>Free plan</td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Open source</td>
                    <td className="text-center">
                        <span className="text-red text-lg">
                            <Close />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-red text-lg">
                            <Close />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Cloud hosting</td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Product analytics</td>
                    <td className="text-center">
                        <span className="text-red text-lg">
                            <Close />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Session Recording</strong>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="bg-gray-accent bg-opacity-50">&nbsp;</td>
                </tr>
                <tr>
                    <td>Single-page app support</td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Mobile app recordings</td>
                    <td className="text-center">
                        <span className="text-red text-lg">
                            <Close />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-red text-lg">
                            <Close />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-red text-lg">
                            <Close />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Identity detection</td>
                    <td className="text-center">
                        <span className="text-red text-lg">
                            <Close />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Target recordings by URL</td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Target by sample size</td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-red text-lg">
                            <Close />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Filter recordings by user or event</td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Rage-click detection</td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-red text-lg">
                            <Close />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Privacy masking for sensitive content</td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Export recordings</td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-red text-lg">
                            <Close />
                        </span>
                    </td>
                    <td className="text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <span className="text-green text-lg">
                            <Check />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Retention policy for recordings</td>
                    <td className="text-center">1 year</td>
                    <td className="text-center">1 month</td>
                    <td className="text-center">24 months</td>
                    <td className="bg-gray-accent bg-opacity-50 text-center">
                        <strong>PostHog Cloud:</strong> 3 weeks
                        <br />
                        <strong>Self-hosted:</strong> No limit
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

const testimonial = testimonials.find(
    ({ featuresUsed, author }) => featuresUsed.includes('session recording') && author.name === 'Anubhuti Mishra'
)

export default function SessionRecording() {
    const { blogPosts } = useStaticQuery(graphql`
        query {
            blogPosts: allMdx(filter: { frontmatter: { tags: { in: "Session recording" } } }) {
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
                <Section className="max-w-screen-2xl" border borderPadding={false}>
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
                <Section>
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
                <Section border>
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
                <Section>
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
                <Section border>
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
                <Section className="max-w-full">
                    <PairsWith
                        products={[
                            {
                                title: 'Product analytics',
                                description:
                                    'Jump into a playlist of session recordings directly from any time series in a graph',
                            },
                            {
                                title: 'Feature flags',
                                description: "See which feature flags are enabled for a user's session",
                            },
                            {
                                title: 'A/B testing',
                                description:
                                    'Generate a playlist of recordings limited to an A/B test or specific group within a multivariate experiment.',
                            },
                        ]}
                    />
                </Section>
                <Section>
                    <PostHogVS description="How does PostHog session recording compare?">
                        <ComparisonTable />
                    </PostHogVS>
                </Section>
                <Section>
                    <BlogPosts posts={blogPosts?.edges} title="Blog posts that mention session recording" />
                </Section>
                <Section>
                    <Roadmap
                        team={'Session Recording'}
                        subtitle="Here's what the Session Recording Team is building next."
                    />
                </Section>
                <Section>
                    <Questions />
                </Section>
                <Section>
                    <CTA
                        title="Try session recording"
                        subtitle="First 15,000 sessions/mo are free."
                        image={
                            <StaticImage
                                alt="Session recording"
                                src="../../components/Home/Slider/images/session-recording-hog.png"
                            />
                        }
                    />
                </Section>
            </ProductLayout>
        </Layout>
    )
}
