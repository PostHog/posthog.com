import React from 'react'
import './styles/features.scss'
import Layout from '../components/Layout'
import { ProductHero } from '../components/ProductHero'
import { ProductFooter } from '../components/ProductFooter'
import { ProductFeature } from '../components/ProductFeature'
import ProductImage from '../components/ProductFeature/ProductImage'
import { ProductFeaturePlugin } from '../components/ProductFeaturePlugin'
import { HostingOption } from '../components/HostingOption'
import { ProductAnchorNavbar } from '../components/ProductAnchorNavbar'
import { ProductSectionHeader } from '../components/ProductSectionHeader'

import { Doodle } from '../components/Doodle'

import { FeaturesComparisonTable } from '../components/FeaturesComparisonTable'
import { FeaturesNav } from '../components/FeaturesNav'
import { SEO } from '../components/seo'

function ProductPage() {
    return (
        <Layout>
            <SEO title="Product • PostHog" />
            <div className="bg-purple">
                <ProductHero
                    preTitle="The all-in-one platform to"
                    title="Build better products"
                    tagline="The only way to build something amazing is by understanding your users. That’s where we come in, with the only open source product analytics platform."
                    componentKey="productHero"
                    disclaimer="<p class='text-xs'>*Demos are provided by actual PostHog engineers! You can also <a href='#' class='text-orange'>request a sales call</a>.</p>"
                    bgColor="navy"
                />
                <ProductAnchorNavbar />
                <div className="features-grid two-column-grid md:grid md:grid-cols-2 md:gap-6 justify-between max-w-screen-2xl mx-auto p-4 mt[-50]">
                    <ProductSectionHeader name="Platform" id="platform" />
                    <div className="product-feature text-white text-center feature-open-source">
                        {/* Platform section starts here */}
                        <ProductFeature
                            layout="reversed"
                            featureIcon="open-source"
                            featureName="Open source"
                            title="Open source product analytics"
                            description="<p>Check out our source code, request new features or get involved with the product directly.</p>"
                            figureClasses="-mb-12"
                            image="screenshot-dashboard@2x.png"
                            imageClasses="relative z-10 w-full max-w-screen-md border-white border-12 border-b-0 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                            classes=""
                        />

                        <Doodle type="rectangle" color="#5D96C4" classes="hidden md:block top-12 left-0" />
                        <Doodle type="circle" color="#FEB7A2" classes="hidden md:block -top-12 -right-24" />
                        <Doodle
                            type="triangle"
                            color="#E5C47D"
                            classes="hidden md:block bottom-0 -right-12 transform -rotate-31"
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-event-autocapture">
                        <ProductFeature
                            layout="standard"
                            featureIcon="event-autocapture"
                            featureName="Event autocapture"
                            title="Track events automatically"
                            description="Define any clicks or pageviews retroactively and see historical data since you installed PostHog."
                            docsUrl="/docs/features/events#autocapture-event-tracking"
                            figureClasses="mb-8"
                            image="feature-event-autocapture.svg"
                            imageWidth="253"
                            imageHeight="147"
                            classes=""
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-dashboards">
                        <ProductFeature
                            layout="standard"
                            featureIcon="dashboards"
                            featureName="Dashboards"
                            title="Monitor core metrics"
                            description="Build dashboards with everyday metrics like sign-ups, purchases and conversions."
                            docsUrl="/docs/features/dashboards"
                            figureClasses="mb-8"
                            image="feature-dashboards.svg"
                            imageWidth="234"
                            imageHeight="141"
                            classes=""
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-data-in-out">
                        <div className="md:grid grid-cols-2 gap-3 text-white py-6 px-4 md:py-12 md:px-8 relative">
                            <ProductFeature
                                layout="standard"
                                featureIcon="data-pipelines"
                                featureName="Data pipelines"
                                title="Ingest data from multiple sources"
                                description="Reliably ingest data at any scale, parsing and filtering to build a holistic view of your customers."
                                docsUrl="/docs/libraries"
                                classes=""
                            />

                            <ProductFeature
                                layout="standard"
                                featureIcon="data-warehouse"
                                featureName="Export to data warehouse"
                                title="Normalize & push data anywhere"
                                description="Move data through PostHog to BigQuery, S3, Snowflake, or Redshift."
                                docsUrl="/docs/features/plugins#example-use-cases"
                                classes=""
                            />
                        </div>
                        <div className="-mt-16 mx-12 mb-12 flex justify-center">
                            <ProductImage imageName="feature-data-in-out.svg" />
                        </div>
                    </div>

                    <div className="product-feature text-white text-center feature-hosting-flexibility pt-12 px-4">
                        <div className="feature-name flex justify-center items-start gap-2 -mb-6">
                            <ProductImage imageName="hosting-flexibility.svg" alt="Hosting flexibility icon" isIcon />
                            <div className="font-bold text-pink">Hosting flexibility</div>
                        </div>
                        <div className="md:grid grid-cols-3 gap-4 text-white">
                            <ProductFeature
                                layout="standard"
                                title="Managed cloud hosting"
                                description="PostHog Cloud is our hosted solution that scales to billions of events per month, receives automatic upgrades, and is managed by our team."
                                classes=""
                            />

                            <div className="py-12 px-2">
                                <h3 className="mb-2 font-osiris font-normal text-2xl">Private cloud deployment</h3>
                                <div className="text-white text-opacity-70">
                                    <p>
                                        Run PostHog on your own private cloud with one of our install scripts, or get
                                        running on Heroku with a one-click install.
                                    </p>
                                </div>
                                <ul className="flex justify-center flex-wrap p-0 list-none text-center">
                                    <HostingOption name="Heroku" handle="heroku" url="/docs/deployment/deploy-heroku" />
                                    <HostingOption name="AWS" handle="aws" url="/docs/deployment/deploy-aws" />
                                    <HostingOption
                                        name="Google Cloud"
                                        handle="google-cloud"
                                        url="/docs/deployment/deploy-gcs"
                                    />
                                    <HostingOption name="Docker" handle="aws" url="/docs/deployment/deploy-docker" />
                                    <HostingOption name="Azure" handle="azure" url="/docs/deployment/deploy-azure" />
                                    <HostingOption
                                        name="Source"
                                        handle="source-code"
                                        url="/docs/deployment/deploy-source"
                                    />
                                    <HostingOption name="More" handle="more" url="/docs/deployment" />
                                </ul>
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
                            featureIcon="data-privacy"
                            featureName="Data privacy"
                            title="Compliance-friendly"
                            description="<p>Rely on fewer third-party subprocessors. Host in any region on the planet. Optionally self-host to keeps customer data on your infrastructure. Reduce the burden when audit season rolls around.</p>"
                            figureClasses="md:h-48"
                            image="feature-data-privacy.svg"
                            classes=""
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-api">
                        <ProductFeature
                            layout="standard"
                            featureIcon="api"
                            featureName="API"
                            title="Full access to your data"
                            description="Our API and direct SQL access allow full access to your production instance."
                            docsUrl="/docs/api/overview"
                            figureClasses="md:h-48"
                            image="feature-api.svg"
                            classes=""
                        />
                    </div>

                    <ProductSectionHeader name="Analytics" id="analytics" />

                    <div className="product-feature text-white text-center feature-trends">
                        {/* Analytics section starts here */}
                        <ProductFeature
                            layout="reversed"
                            featureIcon="trends"
                            featureName="Trends"
                            title="Monitor engagement. <br />Create actionable insights."
                            description="
                                <div class='md:grid gap-12 grid-cols-2 max-w-screen-md mx-auto mt-8 mb-4'>
                                    <div class='top-hr mt-4'>
                                        <strong class='text-white mb-1'>Segmentation</strong>
                                        <p class='text-sm'>Monitor the impact of product changes - by customer plan, traffic source, or any other user property.</p>
                                    </div>
                                    <div class='top-hr mt-4'>
                                        <strong class='text-white mb-1'>Annotations</strong>
                                        <p class='text-sm'>No longer will ask, “Why did this chart spike?”
                                        App-wide annotations provide context to the data you’re analyzing.</p>
                                    </div>
                                </div>
                            "
                            docsUrl="/docs/features/trends"
                            image="feature-trends@2x.png"
                            figureClasses="-mb-12"
                            imageWidth="1051"
                            imageHeight="576"
                            imageClasses="w-screen-md max-w-content rounded-tl-xl rounded-tr-xl relative z-20"
                            classes=""
                        />

                        <Doodle
                            type="rectangle"
                            color="#5D96C4"
                            classes="hidden md:block top-12 right-3 transform -scale-x-1"
                        />
                        <Doodle
                            type="circle"
                            color="#FEB7A2"
                            classes="hidden md:block -top-12 -left-24 transform -scale-x-1 rotate-180"
                        />
                        <Doodle
                            type="triangle"
                            color="#E5C47D"
                            classes="hidden md:block bottom-0 -left-12 transform -rotate-31"
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-funnels">
                        {/*
                        style={{  
                            backgroundImage: "url(" + `${imageFunnels}` + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            display: 'flex',
                            alignItems: 'flex-start'
                        }}
                        */}
                        <ProductFeature
                            layout="reversed"
                            featureIcon="funnels"
                            featureName="Funnels"
                            title="Identify <strike class='opacity-50'>dropoff</strike> opportunity"
                            description="<p>Bucket groups of users who completed (or didn’t complete) a step. Switch over to another PostHog app for further analysis into a user segment.</p>"
                            docsUrl="/docs/features/funnels"
                            //bgImage={`${imageFunnels}`}
                            bgImagePosition="bottom center / 100%"
                            classes=""
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-paths">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="paths"
                            featureName="Paths"
                            title="Visualize how traffic flows"
                            description="<p>See common user paths and discover how visitors arrived at their outcome.</p>"
                            docsUrl="/docs/features/paths"
                            image="feature-paths@2x.png"
                            imageWidth="320"
                            imageHeight="620"
                            classes=""
                        />
                        <Doodle
                            type="rectangle"
                            color="#5D96C4"
                            classes="hidden md:block bottom-6 left-6 transform -scale-x-1"
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-cohorts">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="cohorts"
                            featureName="Cohorts"
                            title="Insights by association"
                            description="Use common traits to identify inflection points."
                            docsUrl="/docs/features/cohorts"
                            figureClasses="-mb-8"
                            image="feature-cohorts@2x.png"
                            imageWidth="479"
                            imageHeight="284"
                            classes=""
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-user-sessions">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="user-sessions"
                            featureName="User sessions"
                            title="See a timeline of a user's activity"
                            description="User timelines offer a full history of what happened and how they got there - valuable for debugging issues and understanding context."
                            docsUrl="/docs/features/sessions"
                            figureClasses="-mb-12"
                            image="feature-user-sessions@2x.png"
                            imageWidth="1410"
                            imageHeight="914"
                            imageClasses="w-full relative z-20 max-w-screen-lg border-white border-12 border-b-0 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                            classes=""
                        />
                        <Doodle type="zigzag" color="#FFCF72" classes="hidden md:block -top-4 left-6" />
                        <Doodle type="circle" color="#5D96C4" classes="hidden md:block -top-24 -right-32" />
                    </div>

                    <div className="product-feature text-white text-center feature-retention">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="retention"
                            featureName="Retention"
                            title="Group users by lifecycle"
                            description="Drill down into activity of individual users within a cohort. Further break down a bucket of users to identify root causes of behavior."
                            docsUrl="/docs/features/retention"
                            figureClasses="mb-0"
                            image="feature-retention@2x.png"
                            imageWidth="455"
                            imageHeight="210"
                            classes=""
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-revenue-tracking">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="revenue-tracking"
                            featureName="Revenue tracking"
                            title="KPIs by LTV"
                            description="By tracking revenue for individual users, you can attribute a dollar amount to feature usage. Coming soon."
                            figureClasses=""
                            image="feature-revenue-tracking@2x.png"
                            imageWidth="253"
                            imageHeight="136"
                            classes=""
                        />
                    </div>
                </div>

                <ProductSectionHeader name="Insights" id="insights" />

                <div className="features-grid three-column-grid md:grid md:grid-cols-3 md:gap-6 justify-between max-w-screen-2xl mx-auto p-4 bg-purple">
                    <div className="product-feature text-white text-center feature-feature-flags flex items-center justify-start pr-50">
                        {/* Insights section starts here */}
                        <ProductFeature
                            layout="standard"
                            featureIcon="feature-flags"
                            featureName="Feature flags"
                            title="Roll out features <br />strategically"
                            description="Toggle features for cohorts or individuals to test the impact."
                            docsUrl="/docs/features/feature-flags#"
                            figureClasses=""
                            classes="-mb-4"
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-annotations flex items-end">
                        <ProductFeature
                            layout="standard"
                            featureIcon="annotations"
                            featureName="Annotations"
                            title="“Why did our traffic spike?”"
                            description="Mark new releases and more in your data, so you can understand their impact later."
                            docsUrl="/docs/features/annotations"
                            classes="relative -mb-4"
                        />
                    </div>

                    <div className="product-feature text-white text-center flex items-center feature-heatmaps pr-24 xl:pr-32">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="heatmaps"
                            featureName="Heatmaps"
                            title="Visualize what’s working"
                            description="Trace every click and see what catches users attention."
                            docsUrl="/docs/tutorials/toolbar"
                            //image={`${imageHeatmaps}`}
                            classes="relative "
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-session-recordings">
                        <ProductFeature
                            layout="standard"
                            featureIcon="session-recordings"
                            featureName="Session recordings"
                            title="See customers using your product"
                            description="Watch exactly what users are doing without infringing their privacy."
                            docsUrl="/docs/features/session-recording"
                            figureClasses="mb-8"
                            image="feature-session-recordings@2x.png"
                            imageWidth="356"
                            imageHeight="174"
                            imageClasses="w-screen-md max-w-content"
                            classes=""
                        />
                    </div>

                    <ProductSectionHeader name="Plugins" id="plugins" />

                    <div className="product-feature text-white text-center feature-data-export">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="data-export"
                            featureName="Data export"
                            title="Send data where you need it"
                            description="Export data for long-term storage or make your customer data available in other tools. list of integrations here"
                            docsUrl="/docs/plugins/overview"
                            imageClasses="w-screen-md max-w-content -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                            classes=""
                        />

                        <ul className="inline-grid grid-cols-2 md:grid-cols-5 grid-rows-auto gap-8 p-0 list-none text-center">
                            <ProductFeaturePlugin name="S3" handle="s3" />
                            <ProductFeaturePlugin name="PostgreSQL" handle="postgresql" />
                            <ProductFeaturePlugin name="BigQuery" handle="bigquery" />
                            <ProductFeaturePlugin name="Redshift" handle="redshift" />
                            <ProductFeaturePlugin name="Snowflake" handle="snowflake" />

                            <ProductFeaturePlugin name="Hubspot" handle="hubspot" />
                            <ProductFeaturePlugin name="Customer.io" handle="customerio" />
                            <ProductFeaturePlugin name="Sendgrid" handle="sendgrid" />
                            <ProductFeaturePlugin name="Pagerduty" handle="pagerduty" />
                            <ProductFeaturePlugin name="Replicator" handle="replicator" />
                        </ul>
                    </div>

                    <div className="product-feature text-white text-center feature-data-filtering">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="data-filtering"
                            featureName="Data filtering"
                            title="Whip that data into shape"
                            description="Enforce schemas, parse data based on fields, and standardise taxonomies."
                            docsUrl="/docs/plugins/overview"
                            figureClasses="text-right"
                            image="feature-data-filtering.svg"
                            imageWidth="352"
                            imageHeight="126"
                            imageClasses="w-screen-md max-w-content -mr-8"
                            classes=" "
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-custom-plugins min-h-[350px]">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="custom-plugins"
                            featureName="Custom plugins"
                            title="Create your own plugins"
                            description="Our APIs make it easy to access your data to use it however you need it."
                            docsUrl="/docs/plugins/build/overview"
                            classes="relative"
                        />
                    </div>

                    <div className="product-feature text-white text-center feature-data-enrichment">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="data-enrichment"
                            featureName="Data enrichment"
                            title="Enrich your data with external signals"
                            description="Ingest ancillary data from other sources that are helpful in creating a more complete picture of what happened and why. grid of sources goes here"
                            docsUrl="/docs/plugins/overview"
                            imageClasses="w-screen-md max-w-content -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                            classes=""
                        />

                        <ul className="inline-grid grid-cols-2 md:grid-cols-4 grid-rows-auto gap-x-8 gap-y-4 p-0 mb-8 list-none text-center">
                            <ProductFeaturePlugin name="GeoIP" handle="geoip" />
                            <ProductFeaturePlugin name="Twitter" handle="twitter" />
                            <ProductFeaturePlugin name="Email scoring" handle="email-scoring" />
                            <ProductFeaturePlugin name="User agent enhancer" handle="user-agent" />

                            <ProductFeaturePlugin name="GitHub star sync" handle="github-star" />
                            <ProductFeaturePlugin name="GitHub release tracker" handle="github-release" />
                            <ProductFeaturePlugin name="GitLab release tracker" handle="gitlab-release" />
                            <ProductFeaturePlugin name="Bitbucket release tracker" handle="bitbucket-release" />
                        </ul>

                        <Doodle type="rectangle" classes="hidden md:block top-12 -left-6" />
                        <Doodle type="circle" color="#5D96C4" classes="hidden md:block -top-24 -right-32" />
                    </div>
                </div>

                <ProductFooter
                    title="Start building better products"
                    tagline="The only way to build something amazing is by understanding your users. That’s where we come in, with the only open source product analytics platform."
                    componentKey="productFooter"
                    disclaimer="<p class='text-xs'>*Demos are provided by actual PostHog engineers! You can also <a href='#' class='text-orange'>request a sales call</a>.</p>"
                    bgColor="navy"
                />
            </div>
        </Layout>
    )
}

export default ProductPage
