import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { LinkGrid } from 'components/Docs/LinkGrid'
import Link from 'components/Link'

export const quickLinks = [
    {
        name: 'Docusaurus v2',
        to: '/docs/libraries/docusaurus',
    },
    {
        name: 'Gatsby',
        to: '/docs/libraries/gatsby',
    },
    {
        name: 'Google Tag Manager',
        to: '/docs/libraries/google-tag-manager',
    },
    {
        name: 'Next.js',
        to: '/docs/libraries/next-js',
    },
    {
        name: 'Nuxt.js',
        to: '/docs/libraries/nuxt-js',
    },
    {
        name: 'Retool',
        to: '/docs/libraries/retool',
    },
    {
        name: 'RudderStack',
        to: '/docs/libraries/rudderstack',
    },
    {
        name: 'Segment',
        to: '/docs/libraries/segment',
    },
    {
        name: 'Sentry',
        to: '/docs/libraries/sentry',
    },
    {
        name: 'Slack',
        to: '/docs/libraries/slack',
    },
    {
        name: 'Shopify',
        to: '/docs/libraries/shopify',
    },
    {
        name: 'WordPress',
        to: '/docs/libraries/wordpress',
    },
]

type IntegrationsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

const Integrations: React.FC = () => {
    return (
        <>
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                src="../../Home/Slider/images/product-analytics-hog.png"
            />
            <h1 className="text-4xl mb-2 mt-6">Integrations</h1>
            <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                PostHog works with most popular web frameworks and services.
            </h3>

            {/* Quick links */}
            <section className="my-12 clear-both">
                <h3 className="mb-6 mt-0">Library</h3>
                <LinkGrid links={quickLinks} />
            </section>

            <hr />

            <p>
                Interested in building an integration? <Link to="/docs/apps/build">Learn more</Link>
            </p>
        </>
    )
}

export default Integrations
