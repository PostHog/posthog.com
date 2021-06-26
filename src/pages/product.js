import React from 'react'
import './styles/features.scss'
import Layout from '../components/Layout'
import { PageHeader } from '../components/PageHeader'
import { ProductFeature } from '../components/ProductFeature'
import { FeaturesComparisonTable } from '../components/FeaturesComparisonTable'
import { FeaturesNav } from '../components/FeaturesNav'
import { SEO } from '../components/seo'

import imageOpenSource from '../images/features/screenshot-dashboard@2x.png'
import imageAutocapture from '../images/features/feature-event-autocapture.svg'
import imageDashboards from '../images/features/feature-dashboards.svg'
import imageDataInOut from '../images/features/feature-data-in-out.svg'
import imageApi from '../images/features/feature-api.svg'
import imageDataPrivacy from '../images/features/feature-data-privacy.svg'

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
                        layout="reversed"
                        featureIcon=""
                        featureName="Open source"
                        title="Open source product analytics"
                        description="Check out our source code, request new features or get involved with the product directly."
                        docsUrl="#"
                        image={`${imageOpenSource}`}
                        imageClasses="max-w-screen-md -mb-16 border-white border-16 border-solid rounded-tl-3xl rounded-tr-3xl"
                        classes=""
                    />
                </div>

                <div className="productFeature text-white text-center feature-event-autocapture">
                    <ProductFeature
                        layout="standard"
                        featureIcon=""
                        featureName="Event autocapture"
                        title="Track events automatically"
                        description="Define any clicks or pageviews retroactively and see historical data since you installed PostHog."
                        docsUrl="#"
                        image={`${imageAutocapture}`}
                        classes=""
                    />
                </div>

                <div className="productFeature text-white text-center feature-dashboards">
                    <ProductFeature
                        layout="standard"
                        featureIcon=""
                        featureName="Dashboards"
                        title="Monitor core metrics"
                        description="Build dashboards with everyday metrics like sign-ups, purchases and conversions."
                        docsUrl="#"
                        image={`${imageDashboards}`}
                        classes=""
                    />
                </div>

                <div className="productFeature text-white text-center feature-data-in-out">
                    <div className="grid grid-cols-2 gap-3 text-white py-12 px-8 relative">
                        <ProductFeature
                            layout="standard"
                            featureIcon=""
                            featureName="Export to data warehouse"
                            title="Normalize & push data anywhere"
                            description="Move data through PostHog to BigQuery, S3, Snowflake, or Redshift."
                            docsUrl="#"
                            classes=""
                        />

                        <ProductFeature
                            layout="standard"
                            featureIcon=""
                            featureName="Data pipelines"
                            title="Ingest data from multiple sources"
                            description="Reliably ingest data at any scale, parsing and filtering to build a holistic view of your customers."
                            docsUrl="#"
                            classes=""
                        />
                    </div>
                    <div className="-mt-16 mx-12 mb-12">
                        <img src={imageDataInOut} />
                    </div>
                </div>

                <div className="productFeature text-white text-center feature-hosting-flexibility py-12 px-4">
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <div>(i)</div>
                        <div className="font-bold text-pink">Hosting flexibility</div>
                    </div>
                    <div className="grid grid-cols-3 text-white">
                        <ProductFeature
                            layout="standard"
                            title="Managed cloud hosting"
                            description="PostHog Cloud is our hosted solution that scales to billions of events per month, receives automatic upgrades, and is managed by our team."
                            classes=""
                        />

                        <div className="py-12 px-0">
                            <h3 className="mb-2 font-osiris font-normal text-2xl">Private cloud deployment</h3>
                            <div className="text-white text-opacity-70">
                                <p>
                                    Run PostHog on your own private cloud with one of our install scripts, or get
                                    running on Heroku with a one-click install.
                                </p>
                            </div>

                            <div>hosting options</div>
                        </div>

                        <ProductFeature
                            layout="standard"
                            title="Host on your infrastructure"
                            description="<p>Customer data stays on your servers. You’re in total control of your PostHog instance.</p><p>With self-hosting, you can also circumvent ad blockers and browser privacy features.</p>"
                            classes=""
                        />
                    </div>
                </div>

                <div className="productFeature text-white text-center feature-data-privacy">
                    <ProductFeature
                        layout="standard"
                        featureIcon=""
                        featureName="Data privacy"
                        title="Compliance-friendly"
                        description="Rely on fewer third-party subprocessors. Host in any region on the planet. Optionally self-host to keeps customer data on your infrastructure. Reduce the burden when audit season rolls around."
                        docsUrl="#"
                        image={`${imageDataPrivacy}`}
                        classes=""
                    />
                </div>

                <div className="productFeature text-white text-center feature-api">
                    <ProductFeature
                        layout="standard"
                        featureIcon=""
                        featureName="API"
                        title="Full access to your data"
                        description="<p>Our API and direct SQL access allow full access to your production instance.</p><p>Another paragraph!</p>"
                        docsUrl="#"
                        image={`${imageApi}`}
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
