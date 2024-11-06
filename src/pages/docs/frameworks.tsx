import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import Link from 'components/Link'
import List from 'components/List'

type QuickLinks = {
    name: string
    to: string
}[]

export const quickLinks: QuickLinks = [
    {
        name: 'Angular',
        to: '/docs/libraries/angular',
    },
    {
        name: 'Astro',
        to: '/docs/libraries/astro',
    },
    {
        name: 'Bubble',
        to: '/docs/libraries/bubble',
    },
    {
        name: 'Django',
        to: '/docs/libraries/django',
    },
    {
        name: 'Docusaurus',
        to: '/docs/libraries/docusaurus',
    },
    {
        name: 'Flask',
        to: '/docs/libraries/flask',
    },
    {
        name: 'Framer',
        to: '/docs/libraries/framer',
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
        name: 'Laravel',
        to: '/docs/libraries/laravel',
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
        name: 'n8n',
        to: '/docs/libraries/n8n',
    },
    {
        name: 'Remix',
        to: '/docs/libraries/remix',
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
        name: 'Svelte',
        to: '/docs/libraries/svelte',
    },
    {
        name: 'Vue.js',
        to: '/docs/libraries/vue-js',
    },
    {
        name: 'Webflow',
        to: '/docs/libraries/webflow',
    },
    {
        name: 'WooCommerce',
        to: '/docs/libraries/woocommerce',
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

const Integrations: React.FC<IntegrationsProps> = () => {
    return (
        <Layout>
            <SEO title="Frameworks - Documentation - PostHog" />

            <PostLayout title={'Integrations'} hideSurvey hideSidebar>
                <CloudinaryImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                />
                <h1 className="text-4xl mt-0 mb-2">Framework guides</h1>
                <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                    PostHog works with most popular web frameworks and services.
                </h3>

                {/* Quick links */}
                <section className="my-12 clear-both">
                    <h3 className="mb-6 mt-0">Library</h3>
                    <List
                        className="grid md:grid-cols-2 gap-1"
                        items={quickLinks.map(({ color, icon, name, to, description }) => ({
                            label: name,
                            url: to,
                            icon,
                            iconColor: color,
                            description,
                        }))}
                    />
                </section>

                <hr />

                <p>
                    Interested in writing a framework guide?{' '}
                    <Link to="https://github.com/posthog/posthog.com" external>
                        Submit a PR to our website repo on GitHub.
                    </Link>
                </p>
            </PostLayout>
        </Layout>
    )
}

export default Integrations
