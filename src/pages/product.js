import Chip from 'components/Chip'
import { AWS, Azure, GCS, GitHub, Heroku, More } from 'components/Icons/Icons'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Layout from '../components/Layout'
import { ProductAnchorNavbar } from '../components/ProductAnchorNavbar'
import { ProductFeature } from '../components/ProductFeature'
import ProductImage from '../components/ProductFeature/ProductImage'
import { ProductFeaturePlugin } from '../components/ProductFeaturePlugin'
import { ProductFooter } from '../components/ProductFooter'
import { ProductSectionHeader } from '../components/ProductSectionHeader'
import { SEO } from '../components/seo'
import './styles/features.scss'

function ProductPage() {
    return (
        <Layout>
            <SEO title="Product • PostHog" />
            <div className="text-primary">
                <div className="text-center mb-12 mx-4 lg:mx-0">
                    <StaticImage
                        className="product-hero-image relative z-10 w-full max-w-screen-lg mt-6 mx-auto"
                        src="../components/ProductFeature/images/feature-dashboard.png"
                    />
                    <h1 className="mb-4">Open source product analytics</h1>
                    <h5 className="text-primary text-opacity-70 font-semibold">
                        PostHog keeps you in control of customer data. Works with your event pipelines and data
                        warehouse.
                    </h5>
                </div>

                <ProductAnchorNavbar />

                <div className="features-grid two-column-grid md:grid md:grid-cols-2 justify-between max-w-screen-2xl mx-auto mt[-50]">
                    <ProductSectionHeader name="Platform" id="platform" />

                    <div className="feature-event-autocapture">
                        <ProductFeature
                            layout="standard"
                            featureIcon="event-autocapture"
                            featureName="Event autocapture"
                            title="Track events automatically"
                            description="Define any clicks or pageviews retroactively and see historical data since you installed PostHog."
                            docsUrl="/docs/user-guides/events#autocapture-event-tracking"
                            figureClasses="mb-8"
                            image="feature-event-autocapture.svg"
                            imageWidth="439"
                            imageHeight="90"
                            classes="max-w-md mx-auto"
                        />
                    </div>

                    <div className="feature-dashboards">
                        <ProductFeature
                            layout="standard"
                            featureIcon="dashboards"
                            featureName="Dashboards"
                            title="Monitor core metrics"
                            description="Build dashboards with everyday metrics like sign-ups, purchases and conversions."
                            docsUrl="/docs/user-guides/dashboards"
                            figureClasses="mb-8"
                            image="feature-dashboards.svg"
                            imageWidth="234"
                            imageHeight="141"
                            classes="max-w-md mx-auto"
                        />
                    </div>

                    <div className="feature-data-in-out">
                        <div className="md:grid grid-cols-2 gap-3 pt-6 px-4 md:pt-12 md:px-8 relative border-gray-accent-light border-dashed border-t">
                            <ProductFeature
                                layout="standard"
                                featureIcon="data-pipelines"
                                featureName="Data pipelines"
                                title="Ingest data from multiple sources"
                                description="Reliably ingest data at any scale, parsing and filtering to build a holistic view of your customers."
                                docsUrl="/docs/integrate/overview"
                                classes="max-w-md mx-auto"
                            />

                            <ProductFeature
                                layout="standard"
                                featureIcon="data-warehouse"
                                featureName="Export to data warehouse"
                                title="Normalize & push data anywhere"
                                description="Move data through PostHog to BigQuery, S3, Snowflake, or Redshift."
                                docsUrl="/docs/user-guides/plugins#example-use-cases"
                                classes="max-w-md mx-auto"
                            />
                        </div>

                        <div className="mx-1 md:mx-12 mb-6 flex justify-center">
                            <ProductImage imageName="feature-data-in-out.svg" />
                        </div>
                    </div>

                    <div className="feature-hosting-flexibility mt-4 pt-12 border-gray-accent-light border-dashed border-t border-b">
                        <div className="feature-name flex items-start gap-2 border-gray-accent-light border-dashed border-b pb-2 mb-4 flex items-center mx-4">
                            <ProductImage
                                imageName="hosting-flexibility.svg"
                                alt="Hosting options icon"
                                isIcon
                                className="opacity-50"
                            />
                            <div className="font-semibold text-base text-black text-opacity-40">Hosting options</div>
                        </div>

                        <div className="md:grid grid-cols-3 gap-4">
                            <ProductFeature
                                layout="standard"
                                title="PostHog Cloud"
                                description="Our hosted solution scales to billions of events per month, receives automatic upgrades, and is managed by our team."
                                classes="max-w-sm mx-auto"
                            />

                            <div className="py-0 md:py-8 md:px-2 mx-4 max-w-sm md:mx-auto">
                                <h3 className="mb-2 text-2xl">Private cloud deployment</h3>
                                <div className="text-opacity-70">
                                    <p>
                                        Run PostHog on your own private cloud with one of our install scripts, or get
                                        running on Heroku with a one-click install.
                                    </p>
                                </div>
                                <ul className="flex flex-wrap p-0 list-none text-center">
                                    <Chip
                                        className="m-1"
                                        text="Heroku"
                                        icon={<Heroku className="w-5 h-5" />}
                                        href="/docs/self-host/deploy/heroku"
                                    />
                                    <Chip
                                        className="m-1"
                                        text="AWS"
                                        icon={<AWS className="w-5 h-5" />}
                                        href="/docs/self-host/deploy/aws"
                                    />
                                    <Chip
                                        className="m-1"
                                        text="Google Cloud"
                                        icon={<GCS className="w-5 h-5" />}
                                        href="/docs/self-host/deploy/gcs"
                                    />
                                    <Chip
                                        className="m-1"
                                        text="Azure"
                                        icon={<Azure className="w-5 h-5" />}
                                        href="/docs/self-host/deploy/azure"
                                    />
                                    <Chip
                                        className="m-1"
                                        text="Source"
                                        icon={<GitHub className="w-5 h-5" />}
                                        href="/docs/self-host/deploy/source"
                                    />
                                    <Chip
                                        className="m-1"
                                        text="More"
                                        icon={<More className="w-5 h-5" />}
                                        href="/docs/deployment"
                                    />
                                </ul>
                            </div>

                            <ProductFeature
                                layout="standard"
                                title="Keep data on your infrastructure"
                                description={
                                    <>
                                        <p>
                                            Customer data stays on your servers. You’re in total control of your PostHog
                                            instance.
                                        </p>
                                        <p>
                                            With self-hosting, you can also circumvent ad blockers and browser privacy
                                            features.
                                        </p>
                                    </>
                                }
                                classes="max-w-sm mx-auto"
                            />
                        </div>
                    </div>

                    <div className="feature-data-privacy border-gray-accent-light border-dashed md:border-r">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="data-privacy"
                            featureName="Data privacy"
                            title="Compliance-friendly"
                            description="Rely on fewer third-party subprocessors. Host in any region on the planet. Optionally self-host to keeps customer data on your infrastructure. Reduce the burden when audit season rolls around."
                            figureClasses="md:h-48"
                            image="feature-data-privacy.svg"
                            classes="px-4 py-8 standard max-w-md mx-auto"
                        />
                    </div>

                    <div className="feature-api">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="api"
                            featureName="API"
                            title="Full access to your data"
                            description="Our API and direct SQL access allow full access to your production instance."
                            docsUrl="/docs/api/overview"
                            figureClasses="md:h-48"
                            image="feature-api.svg"
                            classes="px-4 py-8 standard max-w-md mx-auto"
                        />
                    </div>

                    <ProductSectionHeader name="Analytics" id="analytics" />

                    <div className="feature-trends flex flex-col md:flex-row mt-4 items-center border-gray-accent-light border-dashed border-b">
                        {/* Analytics section starts here */}

                        <div className="product-hero-image relative">
                            <StaticImage
                                className="w-full max-w-screen-lg relative z-20 mx-auto"
                                src="../components/ProductFeature/images/feature-insights.png"
                            />
                        </div>

                        <ProductFeature
                            layout="standard"
                            featureIcon="trends"
                            featureName="Trends"
                            title={<span>Monitor the impact of product changes</span>}
                            description="Group data by customer plan, traffic source, or any other user property."
                            docsUrl="/docs/user-guides/trends"
                            classes="md:px-16 md:pt-16"
                        />
                    </div>

                    <div className="feature-funnels border-gray-accent-light border-dashed border-b">
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
                            title={
                                <span>
                                    Identify <strike className="opacity-50">dropoff</strike> opportunity
                                </span>
                            }
                            description="Bucket groups of users who completed (or didn’t complete) a step. Switch over to another PostHog app for further analysis into a user segment."
                            docsUrl="/docs/user-guides/funnels"
                            //bgImage={`${imageFunnels}`}
                            bgImagePosition="bottom center / 100%"
                            classes="relative max-w-md mx-auto pt-16"
                        />
                    </div>

                    <div className="feature-paths border-gray-accent-light border-dashed border-l">
                        <ProductFeature
                            layout="standard"
                            featureIcon="paths"
                            featureName="Paths"
                            title="Visualize how traffic flows"
                            description="See common user paths and discover how visitors arrived at their outcome."
                            docsUrl="/docs/user-guides/paths"
                            staticImage={
                                <StaticImage
                                    className="max-w-[320px] mx-auto mt-6"
                                    src="../components/ProductFeature/images/feature-paths@2x.png"
                                />
                            }
                            imageWidth="320"
                            imageHeight="620"
                            classes="justify-between h-full max-w-md mx-auto pt-16"
                        />
                    </div>

                    <div className="feature-cohorts">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="cohorts"
                            featureName="Cohorts"
                            title="Insights by association"
                            description="Use common traits to identify inflection points."
                            docsUrl="/docs/user-guides/cohorts"
                            staticImage={
                                <StaticImage
                                    className="max-w-[479px] -mb-8 mx-auto"
                                    src="../components/ProductFeature/images/feature-cohorts@2x.png"
                                />
                            }
                            classes="md:mt-16 max-w-md mx-auto"
                        />
                    </div>

                    <div className="feature-user-sessions flex flex-col md:flex-row items-center md:p-8 pb-0 md:pb-0 border-gray-accent-light border-dashed border-t border-b">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="user-sessions"
                            featureName="User sessions"
                            title="See a timeline of a user's activity"
                            description="User timelines offer a full history of what happened and how they got there - valuable for debugging issues and understanding context."
                            docsUrl="/docs/user-guides/sessions"
                            classes="pb-0 md:pb-8"
                        />

                        <div className="mx-4 leading-[0]">
                            <StaticImage
                                className="mt-6 md:mx-auto w-full relative z-20 max-w-screen-lg border-white border-12 border-b-0 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:ml-4 md:rounded-tr-3xl"
                                src="../components/ProductFeature/images/feature-user-sessions@2x.png"
                            />
                        </div>
                    </div>

                    <div className="feature-retention border-gray-accent-light border-dashed border-r mb-8 md:mb-0">
                        <ProductFeature
                            layout="standard"
                            featureIcon="retention"
                            featureName="Retention"
                            title="Group users by lifecycle"
                            description="Drill down into activity of individual users within a cohort. Further break down a bucket of users to identify root causes of behavior."
                            docsUrl="/docs/user-guides/retention"
                            staticImage={
                                <StaticImage
                                    className="mt-6 max-w-[455px]"
                                    src="../components/ProductFeature/images/feature-retention@2x.png"
                                />
                            }
                            classes="max-w-md mx-auto"
                        />
                    </div>

                    <div className="feature-revenue-tracking mb-8 md:mb-0">
                        <ProductFeature
                            layout="standard"
                            featureIcon="revenue-tracking"
                            featureName="Revenue tracking"
                            title="KPIs by LTV"
                            description="By tracking revenue for individual users, you can attribute a dollar amount to feature usage. Coming soon."
                            staticImage={
                                <StaticImage
                                    className="mt-6 mb-6 max-w-[253px]"
                                    src="../components/ProductFeature/images/feature-revenue-tracking@2x.png"
                                />
                            }
                            classes="max-w-md mx-auto"
                        />
                    </div>
                </div>

                <ProductSectionHeader name="Insights" id="insights" />

                <div className="features-grid three-column-grid md:grid md:grid-cols-3 justify-between max-w-screen-2xl mx-auto">
                    <div className="feature-feature-flags flex items-center justify-start md:pl-4 md:pr-64 border-gray-accent-light border-dashed md:border-r border-b">
                        {/* Insights section starts here */}
                        <ProductFeature
                            layout="standard"
                            featureIcon="feature-flags"
                            featureName="Feature flags"
                            title={<span>Roll out features safely</span>}
                            description="Toggle features for cohorts or individuals to test the impact."
                            docsUrl="/docs/user-guides/feature-flags#"
                            figureClasses=""
                            //classes="-mb-4"
                            classes="max-w-md relative"
                        />
                    </div>

                    <div className="feature-annotations flex items-end md:p-4 border-gray-accent-light border-dashed border-b">
                        <ProductFeature
                            layout="standard"
                            featureIcon="annotations"
                            featureName="Annotations"
                            title="“Why did our traffic spike?”"
                            description="Mark new releases and more in your data, so you can understand their impact later."
                            docsUrl="/docs/user-guides/annotations"
                            classes="max-w-md mx-auto relative"
                            //classes="-mb-4"
                        />
                    </div>

                    <div className="flex items-center feature-heatmaps my-8 md:my-0 pr-24 xl:pr-32 border-gray-accent-light border-dashed md:border-r border-b md:border-b-0">
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

                    <div className="feature-session-recordings md:px-8">
                        <ProductFeature
                            layout="standard"
                            featureIcon="session-recordings"
                            featureName="Session recordings"
                            title="See customers using your product"
                            description="Watch exactly what users are doing without infringing their privacy."
                            docsUrl="/docs/user-guides/session-recording"
                            imageClasses="bg-white rounded p-4 mt-4"
                            staticImage={
                                <StaticImage
                                    className="max-w-[356px]"
                                    src="../components/ProductFeature/images/feature-session-recordings@2x.png"
                                />
                            }
                        />
                    </div>

                    <ProductSectionHeader name="Plugins" id="plugins" />

                    <div className="feature-data-export border-gray-accent-light border-dashed md:border-r border-b md:px-4 md:pb-8 flex flex-col justify-center">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="data-export"
                            featureName="Data export"
                            title="Send data where you need it"
                            description="Export data for long-term storage or make your customer data available in other tools."
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

                    <div className="feature-data-filtering md:px-4 border-gray-accent-light border-dashed border-b">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="data-filtering"
                            featureName="Data filtering"
                            title="Get your data into shape"
                            description="Enforce schemas, parse data based on fields, and standardise taxonomies."
                            docsUrl="/docs/plugins/overview"
                            figureClasses="text-right -mr-8"
                            image="feature-data-filtering.svg"
                            imageWidth="352"
                            imageHeight="126"
                            imageClasses="w-screen-md max-w-content -mr-8"
                            classes=" "
                        />
                    </div>

                    <div className="feature-custom-plugins min-h-[350px] border-gray-accent-light border-dashed md:border-r border-b md:px-4 my-8 md:my-0">
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

                    <div className="feature-data-enrichment border-gray-accent-light border-dashed border-b md:px-8 flex flex-col justify-center">
                        <ProductFeature
                            layout="reversed"
                            featureIcon="data-enrichment"
                            featureName="Data enrichment"
                            title="Enrich your data with external signals"
                            description="Ingest ancillary data from other sources that are helpful in creating a more complete picture of what happened and why."
                            docsUrl="/docs/plugins/overview"
                            imageClasses="w-screen-md max-w-content -mb-16 border-white border-12 md:border-16 border-solid rounded-tl-xl rounded-tr-xl md:rounded-tl-3xl md:rounded-tr-3xl"
                            classes=""
                        />

                        <ul className="inline-grid grid-cols-2 md:grid-cols-4 grid-rows-auto gap-x-8 gap-y-4 p-0 mx-auto mb-8 list-none text-center">
                            <ProductFeaturePlugin name="GeoIP" handle="geoip" />
                            <ProductFeaturePlugin name="Twitter" handle="twitter" />
                            <ProductFeaturePlugin name="Email scoring" handle="email-scoring" />
                            <ProductFeaturePlugin name="User agent enhancer" handle="user-agent" />

                            <ProductFeaturePlugin name="GitHub star sync" handle="github-star" />
                            <ProductFeaturePlugin name="GitHub release tracker" handle="github-release" />
                            <ProductFeaturePlugin name="GitLab release tracker" handle="gitlab-release" />
                            <ProductFeaturePlugin name="Bitbucket release tracker" handle="bitbucket-release" />
                        </ul>
                    </div>
                </div>

                <ProductFooter
                    title="Start building better products"
                    tagline="The only way to build something amazing is by understanding your users. That’s where we come in, with the only open source product analytics platform."
                    componentKey="productFooter"
                    disclaimer={
                        <span>
                            Demos are provided by actual PostHog engineers! You can also{' '}
                            <a href="mailto:sales@posthog.com?subject=Scale%20deployment" className="text-orange">
                                request a sales call
                            </a>
                            .
                        </span>
                    }
                />
            </div>
        </Layout>
    )
}

export default ProductPage
