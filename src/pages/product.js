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

            <div className="grid features-grid justify-between bg-purple p-4">
                <ProductFeature
                    layout="standard"
                    featureIcon=""
                    featureName="Open source"
                    title="Open source product analytics"
                    description="Check out our source code, request new features or get involved with the product directly."
                    docsUrl="#"
                    image="#"
                    classes=""
                />

                <ProductFeature
                    layout="reversed"
                    featureIcon=""
                    featureName="Event autocapture"
                    title="Track events automatically"
                    description="Define any clicks or pageviews retroactively and see historical data since you installed PostHog."
                    docsUrl="#"
                    image="#"
                    classes=""
                />

                <ProductFeature
                    layout="standard"
                    featureIcon=""
                    featureName="Dashboards"
                    title="Monitor core metrics"
                    description="Build dashboards with everyday metrics like sign-ups, purchases and conversions."
                    docsUrl="#"
                    image="#"
                    classes=""
                />

                <div className="placeholder-pipelines-warehouse text-white" style={{ flex: '0 0 100%' }}>
                    pipelines/warehouse placeholder (2 items)
                </div>

                <div className="placeholder-hosting-flexibility text-white" style={{ flex: '0 0 100%' }}>
                    hosting flexibility placeholder (3 items)
                </div>

                <ProductFeature
                    layout="standard"
                    featureIcon=""
                    featureName="Data privacy"
                    title="Compliance-friendly"
                    description="Rely on fewer third-party subprocessors. Host in any region on the planet. Optionally self-host to keeps customer data on your infrastructure. Reduce the burden when audit season rolls around."
                    docsUrl="#"
                    image="#"
                    classes=""
                />

                <ProductFeature
                    layout="reversed"
                    featureIcon=""
                    featureName="API"
                    title="Full access to your data"
                    description="<p>Our API and direct SQL access allow full access to your production instance.</p><p>Another paragraph!</p>"
                    docsUrl="#"
                    bgImage="#"
                    classes=""
                />
            </div>

            <FeaturesNav />
            <FeaturesComparisonTable />
        </Layout>
    )
}

export default ProductPage
