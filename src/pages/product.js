import React from 'react'
import './styles/features.scss'
import Layout from '../components/Layout'
import { PageHeader } from '../components/PageHeader'
import { ProductFeature } from '../components/ProductFeature'
import { FeaturesComparisonTable } from '../components/FeaturesComparisonTable'
import { FeaturesNav } from '../components/FeaturesNav'
import { SEO } from '../components/seo'

function ProductPage() {
    return (
        <Layout>
            <SEO title="Product • PostHog" />
            <PageHeader
                title="Build better products"
                tagline="The only way to build something amazing is by understanding your users. That’s where we come in, with the only open source product analytics platform."
                styleKey="productFeatures"
                bgColor="navy"
            />

            <div className="flex flex-wrap justify-between bg-purple p-4">
                <ProductFeature
                    orientation="foo"
                    width="full"
                    categoryIcon=""
                    category="Open source"
                    name="Open source product analytics"
                    description="Check out our source code, request new features or get involved with the product directly."
                    docsUrl="#"
                    image="#"
                    klass=""
                />

                <ProductFeature
                    orientation="foo"
                    width="half"
                    categoryIcon=""
                    category="Event autocapture"
                    name="Track events automatically"
                    description="Define any clicks or pageviews retroactively and see historical data since you installed PostHog."
                    docsUrl="#"
                    image="#"
                    klass=""
                />

                <ProductFeature
                    orientation="foo"
                    width="half"
                    categoryIcon=""
                    category="Dashboards"
                    name="Monitor core metrics"
                    description="Build dashboards with everyday metrics like sign-ups, purchases and conversions."
                    docsUrl="#"
                    image="#"
                    klass=""
                />

                <div className="placeholder-pipelines-warehouse text-white" style={{ flex: '0 0 100%' }}>
                    pipelines/warehouse placeholder (2 items)
                </div>

                <div className="placeholder-hosting-flexibility text-white" style={{ flex: '0 0 100%' }}>
                    hosting flexibility placeholder (3 items)
                </div>

                <ProductFeature
                    orientation="foo"
                    width="half"
                    categoryIcon=""
                    category="Data privacy"
                    name="Compliance-friendly"
                    description="Rely on fewer third-party subprocessors. Host in any region on the planet. Optionally self-host to keeps customer data on your infrastructure. Reduce the burden when audit season rolls around."
                    docsUrl="#"
                    image="#"
                    klass=""
                />

                <ProductFeature
                    orientation="foo"
                    width="half"
                    categoryIcon=""
                    category="API"
                    name="Full access to your data"
                    description="Our API and direct SQL access allow full access to your production instance."
                    docsUrl="#"
                    image="#"
                    klass=""
                />
            </div>

            <FeaturesNav />
            <FeaturesComparisonTable />
        </Layout>
    )
}

export default ProductPage
