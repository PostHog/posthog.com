import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import Apps from 'components/Product/Apps'
import FeatureWrapper, { IProps } from 'components/Product/FeatureWrapper'
import Hero from 'components/Product/Hero'
import { ProductIcons } from 'components/ProductIcons/ProductIcons'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const features: IProps[] = [
    {
        title: 'Product analytics',
        disclaimer: 'Alternative to Amplitude, Heap, Mixpanel',
        image: <StaticImage src="../components/Product/images/product-analytics.png" alt="Product analytics" />,
        features: [
            {
                title: 'Funnels',
                icon: ProductIcons?.funnels,
                url: '/product/funnels',
            },
            {
                title: 'Graphs & trends',
                icon: ProductIcons?.trends,
                url: '/product/trends',
            },
            {
                title: 'User paths',
                icon: ProductIcons?.pathAnalysis,
                url: '/product/user-paths',
            },
            {
                title: 'Dashboards & collaboration',
                icon: ProductIcons?.dashboards,
                url: '/product/dashboards',
            },
        ],
    },
    {
        title: 'Session recording',
        cta: { title: 'Learn more', url: '/product/session-recording' },
        icon: ProductIcons.sessionRecording,
        subtitle: 'with console logs',
        image: <StaticImage src="../components/Product/images/session-recording.png" alt="Session recording" />,
        disclaimer: 'Alternative to Hotjar, Logrocket, Matomo',
    },
    {
        title: 'A/B tests & experiments',
        disclaimer: 'Alternative to Optimizely, VWO, Google Optimize',
        image: <StaticImage src="../components/Product/images/experimentation.png" alt="A/B tests & experiments" />,
        features: [
            {
                title: 'Experimentation Suite',
                icon: ProductIcons.experiments,
                url: '/product/experimentation',
            },
            {
                title: 'Correlation Analysis',
                icon: ProductIcons.correlationAnalysis,
                url: '/product/correlation-analysis',
            },
        ],
    },
    {
        title: 'Feature flags',
        cta: { title: 'Learn more', url: '/product/feature-flags' },
        icon: ProductIcons.featureFlags,
        subtitle: 'with multivariate testing',
        image: <StaticImage src="../components/Product/images/feature-flags.png" alt="Feature flags" />,
        disclaimer: 'Alternative to LaunchDarkly',
    },
]

export default function Product() {
    return (
        <Layout>
            <Hero />
            <PostLayout
                title="Product"
                hideSidebar
                hideSearch
                hideSurvey
                menu={[{ name: 'Overview', url: '/product' }]}
                menuTitle={false}
                article={false}
            >
                <h1 className="text-5xl m-0">Top features</h1>
                <p className="text-xl text-black/50 font-semibold m-0 mt-3 max-w-[700px]">
                    Product analytics was the trojan horse, but PostHog also ships with session recording, feature
                    flags, A/B testing, and more.
                </p>
                <div>
                    {features.map((feature, index) => (
                        <FeatureWrapper key={index} {...feature} />
                    ))}
                </div>
                <Apps />
            </PostLayout>
        </Layout>
    )
}
