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

            <div className="features-grid grid grid-cols-2 gap-6 justify-between bg-purple p-4">
                <div className="productFeature text-white text-center feature-open-source">
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
                </div>

                <div className="productFeature text-white text-center feature-event-autocapture">
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
                </div>

                <div className="productFeature text-white text-center feature-dashboards">
                    <ProductFeature
                        layout="reversed"
                        featureIcon=""
                        featureName="Dashboards"
                        title="Monitor core metrics"
                        description="Build dashboards with everyday metrics like sign-ups, purchases and conversions."
                        docsUrl="#"
                        image="#"
                        classes=""
                    />
                </div>

                <div className="productFeature text-white text-center feature-data-in-out">
                    <div className="grid grid-cols-2 gap-6 text-white py-6 px-4">
                        <ProductFeature
                            layout="standard"
                            featureIcon=""
                            featureName="Export to data warehouse"
                            title="Normalize & push data anywhere"
                            description="Move data through PostHog to BigQuery, S3, Snowflake, or Redshift."
                            docsUrl="#"
                            image="#"
                            classes=""
                        />

                        <ProductFeature
                            layout="standard"
                            featureIcon=""
                            featureName="Data pipelines"
                            title="Ingest data from multiple sources"
                            description="Reliably ingest data at any scale, parsing and filtering to build a holistic view of your customers."
                            docsUrl="#"
                            image="#"
                            classes=""
                        />
                    </div>
                </div>

                <div className="productFeature text-white text-center feature-hosting-flexibility">
                    <div className="grid grid-cols-3 gap-6 text-white py-6 px-4">
                        <ProductFeature
                            layout="standard"
                            featureIcon=""
                            featureName="Export to data warehouse"
                            title="Managed cloud hosting"
                            description="PostHog Cloud is our hosted solution that scales to billions of events per month, receives automatic upgrades, and is managed by our team."
                            docsUrl="#"
                            image="#"
                            classes=""
                        />

                        <ProductFeature
                            layout="standard"
                            featureIcon=""
                            featureName="Data pipelines"
                            title="Private cloud deployment"
                            description="Run PostHog on your own private cloud with one of our install scripts, or get running on Heroku with a one-click install."
                            docsUrl="#"
                            image="#"
                            classes=""
                        />

                        <ProductFeature
                            layout="standard"
                            featureIcon=""
                            featureName="Data pipelines"
                            title="Host on your infrastructure"
                            description="Customer data stays on your servers. You’re in total control of your PostHog instance.

                            With self-hosting, you can also circumvent ad blockers and browser privacy features."
                            docsUrl="#"
                            image="#"
                            classes=""
                        />
                    </div>
                </div>

                <div className="productFeature text-white text-center feature-data-privacy">
                    <ProductFeature
                        layout="reversed"
                        featureIcon=""
                        featureName="Data privacy"
                        title="Compliance-friendly"
                        description="Rely on fewer third-party subprocessors. Host in any region on the planet. Optionally self-host to keeps customer data on your infrastructure. Reduce the burden when audit season rolls around."
                        docsUrl="#"
                        image="#"
                        classes=""
                    />
                </div>

                <div className="productFeature text-white text-center feature-api">
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
            </div>

            <FeaturesNav />
            <FeaturesComparisonTable />
        </Layout>
    )
}

export default ProductPage
