import React from 'react'
import './styles/features.scss'
import Layout from '../components/Layout'
import { PageHeader } from '../components/PageHeader'
import { ProductFeature } from '../components/ProductFeature'
import { FeaturesComparisonTable } from '../components/FeaturesComparisonTable'
import { FeaturesNav } from '../components/FeaturesNav'
import { SEO } from '../components/seo'

import imageOpenSource from '../components/productFeature/images/screenshot-dashboard@2x.png'
import imageAutocapture from '../components/productFeature/images/feature-event-autocapture.svg'
import imageDashboards from '../components/productFeature/images/feature-dashboards.svg'
import imageDataInOut from '../components/productFeature/images/feature-data-in-out.svg'
import imageApi from '../components/productFeature/images/feature-api.svg'
import imageDataPrivacy from '../components/productFeature/images/feature-data-privacy.svg'

import imageTrends from '../components/productFeature/images/feature-trends@2x.png'
import imageFunnels from '../components/productFeature/images/placeholder@2x.png'
import imagePaths from '../components/productFeature/images/feature-paths@2x.png'
import imageCohorts from '../components/productFeature/images/feature-cohorts@2x.png'
import imageUserSessions from '../components/productFeature/images/feature-user-sessions@2x.png'
import imageRetention from '../components/productFeature/images/feature-retention@2x.png'
import imageRevenueTracking from '../components/productFeature/images/feature-revenue-tracking@2x.png'

// import imageFeatureFlags from '../components/productFeature/images/feature-feature-flags.svg'
// import imageAnnotations from '../components/productFeature/images/feature-annotations.svg'
// import imageHeatmaps from '../components/productFeature/images/feature-heatmaps.svg'
// import imageSessionRecordings from '../components/productFeature/images/feature-session-recordings.svg'

import imageFeatureFlags from '../components/productFeature/images/placeholder@2x.png'
import imageAnnotations from '../components/productFeature/images/placeholder@2x.png'
import imageHeatmaps from '../components/productFeature/images/placeholder@2x.png'
import imageSessionRecordings from '../components/productFeature/images/placeholder@2x.png'

import imageDataFiltering from '../components/productFeature/images/feature-data-filtering.svg'
import imageCustomPlugins from '../components/productFeature/images/feature-custom-plugins.svg'

import iconOpenSource from '../components/productFeature/images/icons/open-source.svg'
import iconEventAutocapture from '../components/productFeature/images/icons/event-autocapture.svg'
import iconDashboards from '../components/productFeature/images/icons/dashboards.svg'
import iconDataPipelines from '../components/productFeature/images/icons/data-pipelines.svg'
import iconDataWarehouse from '../components/productFeature/images/icons/data-warehouse.svg'
import iconHostingFlexibility from '../components/productFeature/images/icons/hosting-flexibility.svg'
import iconDataPrivacy from '../components/productFeature/images/icons/data-privacy.svg'
import iconApi from '../components/productFeature/images/icons/api.svg'

import iconTrends from '../components/productFeature/images/icons/trends.svg'
import iconFunnels from '../components/productFeature/images/icons/funnels.svg'
import iconPaths from '../components/productFeature/images/icons/paths.svg'
import iconCohorts from '../components/productFeature/images/icons/cohorts.svg'
import iconUserSessions from '../components/productFeature/images/icons/user-sessions.svg'
import iconRetention from '../components/productFeature/images/icons/retention.svg'
import iconRevenueTracking from '../components/productFeature/images/icons/revenue-tracking.svg'

import iconFeatureFlags from '../components/productFeature/images/icons/feature-flags.svg'
import iconAnnotations from '../components/productFeature/images/icons/annotations.svg'
import iconHeatmaps from '../components/productFeature/images/icons/heatmaps.svg'
import iconSessionRecordings from '../components/productFeature/images/icons/session-recordings.svg'

import iconDataExport from '../components/productFeature/images/icons/data-export.svg'
import iconDataFiltering from '../components/productFeature/images/icons/data-filtering.svg'
import iconCustomPlugins from '../components/productFeature/images/icons/custom-plugins.svg'
import iconDataEnrichment from '../components/productFeature/images/icons/data-enrichment.svg'

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

            <div className="features-grid two-column-grid md:grid md:grid-cols-2 md:gap-6 justify-between max-w-screen-2xl mx-auto p-4 bg-purple">
                <div className="product-feature text-white text-center feature-open-source">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconOpenSource}`}
                        featureName="Open source"
                        title="Open source product analytics"
                        description="Check out our source code, request new features or get involved with the product directly."
                        docsUrl="#"
                        image={`${imageOpenSource}`}
                        imageClasses="w-full max-w-screen-md -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-event-autocapture">
                    <ProductFeature
                        layout="standard"
                        featureIcon={`${iconEventAutocapture}`}
                        featureName="Event autocapture"
                        title="Track events automatically"
                        description="Define any clicks or pageviews retroactively and see historical data since you installed PostHog."
                        docsUrl="#"
                        image={`${imageAutocapture}`}
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-dashboards">
                    <ProductFeature
                        layout="standard"
                        featureIcon={`${iconDashboards}`}
                        featureName="Dashboards"
                        title="Monitor core metrics"
                        description="Build dashboards with everyday metrics like sign-ups, purchases and conversions."
                        docsUrl="#"
                        image={`${imageDashboards}`}
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-data-in-out">
                    <div className="md:grid grid-cols-2 gap-3 text-white py-12 px-8 relative">
                        <ProductFeature
                            layout="standard"
                            featureIcon={`${iconDataPipelines}`}
                            featureName="Data pipelines"
                            title="Ingest data from multiple sources"
                            description="Reliably ingest data at any scale, parsing and filtering to build a holistic view of your customers."
                            docsUrl="#"
                            classes=""
                        />

                        <ProductFeature
                            layout="standard"
                            featureIcon={`${iconDataWarehouse}`}
                            featureName="Export to data warehouse"
                            title="Normalize & push data anywhere"
                            description="Move data through PostHog to BigQuery, S3, Snowflake, or Redshift."
                            docsUrl="#"
                            classes=""
                        />
                    </div>
                    <div className="-mt-16 mx-12 mb-12 flex justify-center">
                        <img src={imageDataInOut} />
                    </div>
                </div>

                <div className="product-feature text-white text-center feature-hosting-flexibility py-12 px-4">
                    <div className="feature-name flex justify-center items-center gap-2 mb-2">
                        <img src={`${iconHostingFlexibility}`} alt="Hosting flexibility icon" />
                        <div className="font-bold text-pink">Hosting flexibility</div>
                    </div>
                    <div className="md:grid grid-cols-3 text-white">
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

                <div className="product-feature text-white text-center feature-data-privacy">
                    <ProductFeature
                        layout="standard"
                        featureIcon={`${iconDataPrivacy}`}
                        featureName="Data privacy"
                        title="Compliance-friendly"
                        description="Rely on fewer third-party subprocessors. Host in any region on the planet. Optionally self-host to keeps customer data on your infrastructure. Reduce the burden when audit season rolls around."
                        docsUrl="#"
                        image={`${imageDataPrivacy}`}
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-api">
                    <ProductFeature
                        layout="standard"
                        featureIcon={`${iconApi}`}
                        featureName="API"
                        title="Full access to your data"
                        description="<p>Our API and direct SQL access allow full access to your production instance.</p><p>Another paragraph!</p>"
                        docsUrl="#"
                        image={`${imageApi}`}
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-trends">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconTrends}`}
                        featureName="Trends"
                        title="Monitor engagement. <br />Create actionable insights."
                        description="<p>2 columns of text with HTML</p>"
                        docsUrl="#"
                        image={`${imageTrends}`}
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-funnels">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconFunnels}`}
                        featureName="Funnels"
                        title="Identify <strike>dropoff</strike> opportunity"
                        description="<p>Bucket groups of users who completed (or didn’t complete) a step. Switch over to another PostHog app for further analysis into a user segment.</p>"
                        docsUrl="#"
                        backgroundImage={`${imageFunnels}`}
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-paths">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconPaths}`}
                        featureName="Paths"
                        title="Visualize how traffic flows"
                        description="<p>See common user paths and discover how visitors arrived at their outcome.</p>"
                        docsUrl="#"
                        image={`${imagePaths}`}
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-cohorts">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconCohorts}`}
                        featureName="Cohorts"
                        title="Insights by association"
                        description="<p>Use common traits to identify inflection points.</p>"
                        docsUrl="#"
                        image={`${imageCohorts}`}
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-user-sessions">
                    <ProductFeature
                        layout="standard"
                        featureIcon={`${iconUserSessions}`}
                        featureName="User sessions"
                        title="See a timeline of a user's activity"
                        description="<p>User timelines offer a full history of what happened and how they got there - valuable for debugging issues and understanding context.</p>"
                        docsUrl="#"
                        image={`${imageUserSessions}`}
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-retention">
                    <ProductFeature
                        layout="standard"
                        featureIcon={`${iconRetention}`}
                        featureName="Retention"
                        title="Group users by lifecycle"
                        description="<p>Drill down into activity of individual users within a cohort. Further break down a bucket of users to identify root causes of behavior.</p>"
                        docsUrl="#"
                        image={`${imageRetention}`}
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-revenue-tracking">
                    <ProductFeature
                        layout="standard"
                        featureIcon={`${iconRevenueTracking}`}
                        featureName="Revenue tracking"
                        title="KPIs by LTV"
                        description="<p>By tracking revenue for individual users, you can attribute a dollar amount to feature usage. Coming soon.</p>"
                        docsUrl="#"
                        image={`${imageRevenueTracking}`}
                        classes=""
                    />
                </div>
            </div>

            <div className="features-grid three-column-grid md:grid md:grid-cols-3 md:gap-6 justify-between max-w-screen-2xl mx-auto p-4 bg-purple">
                <div className="product-feature text-white text-center feature-feature-flags">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconFeatureFlags}`}
                        featureName="Feature flags"
                        title="Roll out features strategically"
                        description="Toggle features for cohorts or individuals to test the impact."
                        docsUrl="#"
                        image={`${imageFeatureFlags}`}
                        imageClasses="w-full max-w-screen-md -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-annotations">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconAnnotations}`}
                        featureName="Annotations"
                        title="“Why did our traffic spike?”"
                        description="Mark new releases and more in your data, so you can understand their impact later."
                        docsUrl="#"
                        image={`${imageAnnotations}`}
                        imageClasses="w-full max-w-screen-md -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-heatmaps">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconHeatmaps}`}
                        featureName="Heatmaps"
                        title="Visualize what’s working"
                        description="Trace every click and see what catches users attention."
                        docsUrl="#"
                        image={`${imageHeatmaps}`}
                        imageClasses="w-full max-w-screen-md -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-session-recordings">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconSessionRecordings}`}
                        featureName="Session recordings"
                        title="See customers using your product"
                        description="Watch exactly what users are doing without infringing their privacy."
                        docsUrl="#"
                        image={`${imageSessionRecordings}`}
                        imageClasses="w-full max-w-screen-md -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-data-export">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconDataExport}`}
                        featureName="Data export"
                        title="Send data where you need it"
                        description="Export data for long-term storage or make your customer data available in other tools. list of integrations here"
                        docsUrl="#"
                        imageClasses="w-full max-w-screen-md -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-data-filtering">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconDataFiltering}`}
                        featureName="Data filtering"
                        title="Whip that data into shape"
                        description="Enforce schemas, parse data based on fields, and standardise taxonomies."
                        docsUrl="#"
                        image={`${imageDataFiltering}`}
                        imageClasses="w-full max-w-screen-md -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-custom-plugins">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconCustomPlugins}`}
                        featureName="Custom plugins"
                        title="Create your own plugins"
                        description="Our APIs make it easy to access your data to use it however you need it."
                        docsUrl="#"
                        image={`${imageCustomPlugins}`}
                        imageClasses="w-full max-w-screen-md -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                        classes=""
                    />
                </div>

                <div className="product-feature text-white text-center feature-data-enrichment">
                    <ProductFeature
                        layout="reversed"
                        featureIcon={`${iconDataEnrichment}`}
                        featureName="Data enrichment"
                        title="Enrich your data with external signals"
                        description="Ingest ancillary data from other sources that are helpful in creating a more complete picture of what happened and why. grid of sources goes here"
                        docsUrl="#"
                        imageClasses="w-full max-w-screen-md -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
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
