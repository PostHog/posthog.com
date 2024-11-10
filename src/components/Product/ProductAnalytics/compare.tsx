import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import CTA from 'components/Home/CTA'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import ProductCTA from 'components/Products/CTA'
import { IconCheck, IconX } from '@posthog/icons'
import ProductBar from 'components/Products/ProductBar'

const product = {
    slug: 'product-analytics',
    lowercase: 'product analytics',
    capitalized: 'Product analytics',
    freeTier: '1,000,000 events',
}

const team = 'Product Analytics'
const teamSlug = '/teams/product-analytics'

import {
    IconBolt,
    IconGraph,
    IconFlask,
    IconToggle,
    IconPieChart,
    IconPeople,
    IconNotification,
    IconRewindPlay,
    IconAI,
} from '@posthog/icons'
import Comparison from '../Comparison'
import { VsCompetitor } from 'components/Products/Competitor'
import { VsPostHog } from 'components/Products/Competitor/VsPostHog'

const comparisonColumnCount = 6
const comparison = [
    {
        feature: '<strong>Funnels</strong>',
        companies: {
            Amplitude: '',
            Mixpanel: '',
            Heap: '',
            Pendo: '',
            PostHog: '',
        },
    },
    {
        feature: 'Conversion funnels',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Historical trends',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Time to convert insights',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Sequential step order',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Strict step order',
        companies: {
            Amplitude: true,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Any step order',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Exclusion events',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Conversion windows',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Reveal user paths between steps',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Anomaly detection',
        companies: {
            Amplitude: true,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Filter internal and test users',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Filter by cohort',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Filter by person property',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Breakdown by person property',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Correlation analysis',
        companies: {
            Amplitude: true,
            Mixpanel: false,
            Heap: true,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: '<strong>Path analysis</strong>',
        companies: {
            Amplitude: '',
            Mixpanel: '',
            Heap: '',
            Pendo: '',
            PostHog: '',
        },
    },
    {
        feature: 'Reveal paths from a start point',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Reveal paths from an end point',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Reveal paths between points',
        companies: {
            Amplitude: false,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Reveal paths within funnels',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Zoom in/out',
        companies: {
            Amplitude: true,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: false,
        },
    },
    {
        feature: 'Define number of users on path',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Track pageviews',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Track custom events',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Filter internal and test users',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Filter by cohort',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Filter by events or person property',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Include and exclude Wildcards',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Exclusion events',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Hide repeating steps',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Regex for path cleaning',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Max number of steps',
        companies: {
            Amplitude: '50',
            Mixpanel: '120+',
            Heap: '10',
            Pendo: '20',
            PostHog: '20',
        },
    },
    {
        feature: '<strong>Dashboards</strong>',
        companies: {
            Amplitude: '',
            Mixpanel: '',
            Heap: '',
            Pendo: '',
            PostHog: '',
        },
    },
    {
        feature: 'User-level permissions',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Project-level permissions',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Dashboard-level permissions',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Share dashboards externally',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Embed dashboards anywhere',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Subscribe to dashboards',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Pinned dashboards',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: '',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Dashboard & insight tags',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Webhooks',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Annotations',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Private insights',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: false,
        },
    },
    {
        feature: 'Apps / integrations',
        companies: {
            Amplitude: '70+',
            Mixpanel: '50+',
            Heap: '40+',
            Pendo: '40+',
            PostHog: '50+',
        },
    },
]

export const ProductProductAnalyticsCompare = () => {
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="Product analytics pricing - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />

                <ProductBar
                    color="blue"
                    icon={<IconGraph />}
                    product={product.capitalized}
                    beta={false}
                />

                <section
                    className={`@container ${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl px-5'} py-8 transition-all`}
                >
                  <h1 className="mb-2">PostHog vs...</h1>
                  <p className="mb-4 text-[15px]">At minimum, PostHog aims for feature parity with other analytics products. If you don't see what you're looking for, <Link href="/roadmap">vote on our roadmap</Link> or <Link href="https://github.com/posthog/posthog/issues">request a feature</Link>.</p>
                  <p><strong>PostHog is fundamentally different in a few ways.</strong></p>

                  <h3>Built for engineers</h3>
                  <p className="mb-2">What does this mean?</p>

                  <ul className="mb-6">
                    <li>
                      <Link href="#">We ship fast</Link> and iterate based on user feedback.
                    </li>
                    <li>
                      Engineers do support – all product teams have <Link href="#">a weekly support hero</Link>.
                    </li>
                    <li>
                      We have extensive <Link href="#">public and private API endpoints</Link>, and <Link href="#">a powerful SQL query builder</Link>.
                    </li>
                    <li>
                      We built <Link href="#">SDKs</Link> for all popular (and many unpopular) client-side, backend, and mobile languages and frameworks.
                    </li>
                    <li>
                      We make it easy to <Link href="#">test in production</Link>, conduct <Link href="#">phased rollouts</Link>, <Link href="#">run beta programs</Link>, and so much more.
                    </li>
                  </ul>

                  <h3>All-in-one platform</h3>
                  <p className="mb-2">Most product we're typically compared to only offer a subset of products. This means you need to adopt additional tools for things like feature management, experiments, and surveys. They're all built into PostHog – we even have a built-in data warehouse that <Link href="#">integrates with Stripe</Link> and <Link href="#">Hubspot</Link>.</p>

                  <p><strong>You can replace half a dozen tools with PostHog, save money, and get more from your data.</strong></p>

                  <h3>We're totally transparent</h3>
                  <ul className="mb-6">
                    <li>How much will PostHog cost? <Link href="#">Use our pricing calculator.</Link></li>
                    <li>What are we working on? It's on <Link href="#">our public roadmap</Link>.</li>
                    <li>How does sales work? We have <Link href="#">a whole page on it</Link>.</li>
                    <li>What do we care about? We explain everything <Link href="#">in our public company handbook</Link>.</li>
                    <li>How do we make money? That's <Link href="#">in the handbook, too</Link>.</li>
                    <li>We're open source, too. You can <Link href="#">peek at our code on GitHub</Link>.</li>
                  </ul>

                  <div className="border-y border-light dark:border-dark py-4 mb-8">
                    <h3>Is PostHog right for you?</h3>
                    <p>Rather than forcing you to try to parse through marketing-speak, we've summarized the main reasons to choose PostHog or somebody else.</p>

            
                      <div className="mb-8 mx-5 md:mx-0 grid md:grid-cols-2 gap-4">
                          <VsCompetitor
                              title="Reasons a competitor may be best for you (for now...)"
                              image={
                                  <CloudinaryImage
                                      src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/competitors-pa.png"
                                      className="max-w-[171px]"
                                  />
                              }
                          >
                              <ul>
                                  <li>
                                      Time-based analysis for web analytics (e.g. time on page)
                                      <ul className="pl-6">
                                          <li className="text-sm">
                                              (We're <Link to="/teams/web-analytics">working on this</Link>!)
                                          </li>
                                      </ul>
                                  </li>
                                  <li>Natural language processing for creating insights</li>
                                  <li>Predictive analytics for extrapolating events into the future</li>
                                  <li>Alerting for when events move beyond set thresholds</li>
                              </ul>
                          </VsCompetitor>
                          <VsPostHog>
                              <ul>
                                  <li>
                                      Linking between analytics and other features, so you can jump from a graph to a
                                      relevant recording
                                  </li>
                                  <li>Wide range of insight types for analyzing data</li>
                                  <li>Formula mode and SQL access to enable deeper analysis</li>
                                  <li>Automatic correlation analysis to find significant events</li>
                                  <li>Group analytics for teams with B2B customers</li>
                              </ul>
                          </VsPostHog>
                      </div>

                      <p className="text-center text-sm font-medium">
                          Have questions about PostHog? <br className="md:hidden" />
                          <Link to={`/questions/${product.slug}`}>Ask the community</Link> or{' '}
                          <Link to="/talk-to-a-human">book a demo</Link>.
                      </p>

                  </div>

                  <h3 className="mb-1">Compare features</h3>
                  <p>Explore how PostHog compares for platform benefits, product analytics features, and other products.</p>

                  <Comparison comparison={comparison} columnCount={comparisonColumnCount} truncate />
                    
                </section>

            <div className="max-w-7xl mx-auto relative">
                <section className="mb-20">
                    <CTA />
                </section>
            </div>
        </>
    )
}

export default ProductProductAnalyticsCompare
