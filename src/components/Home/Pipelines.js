import React from 'react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import Icon from './Icon'
import { section, heading } from './classes'

const Chip = ({ icon, title, className }) => {
    return (
        <div className={`bg-gray-accent-light flex space-x-2 py-2 px-4 rounded-lg items-center mt-2 ${className}`}>
            <Icon className="w-4 h-4" name={icon} />
            <span className="text-sm sm:text-[16px] font-bold">{title}</span>
        </div>
    )
}

const PipelineGraphic = () => {
    return (
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-3 mt-16 col-span-3 w-1/4 lg:w-auto">
            <div className="flex justify-center items-center lg:flex-col">
                <Icon className="h-5 w-5" name="bullet" />
                <div className="lg:w-[1px] w-full lg:h-28 h-[1px] relative border-t-2 lg:border-l-2 border-gray-accent-light border-dashed" />
                <div className="h-1/2 lg:w-1/2  w-[1px] lg:h-[1px] border-l-2 lg:border-t-2 self-end border-gray-accent-light border-dashed" />
            </div>
            <div className="flex justify-center items-center lg:flex-col">
                <Icon className="h-5 w-5" name="bullet" />
                <div className="lg:w-[1px] w-full lg:h-28 h-[1px] relative border-t-2 lg:border-l-2 border-gray-accent-light border-dashed" />
                <div className="lg:w-full w-[1px] lg:h-[1px] h-full lg:border-t-2 border-l-2 self-end lg:self-start border-gray-accent-light border-dashed" />
            </div>
            <div className="flex justify-center items-center lg:flex-col">
                <Icon className="h-5 w-5" name="bullet" />
                <div className="w-full lg:w-[1px] h-1[px] lg:h-28 relative border-t-2 lg:border-l-2 border-gray-accent-light border-dashed" />
                <div className="w-[1px] lg:w-1/2 h-full lg:h-[1px] border-l-2 lg:border-t-2 self-start border-gray-accent-light border-dashed" />
            </div>
            <div className="flex justify-center items-center lg:flex-col relative lg:col-span-3">
                <div className="absolute left-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-full -top-8 z-10">
                    <Icon name="logo-bullet" className="w-16 h-16 mx-auto" />
                    <h5 className="text-2xl font-bold lg:block hidden">
                        Self-serve product analytics for 90% of your product questions
                    </h5>
                </div>

                <div className="w-full lg:w-[1px] h-[1px] lg:h-28 relative border-t-2 lg:border-l-2 border-gray-accent-light border-dashed" />
                <div className="block lg:hidden w-[1px] lg:w-1/2 h-1/2 lg:h-[1px] border-l-2 lg:border-t-2 self-start border-gray-accent-light border-dashed" />
                <Icon className="h-5 w-5 order-first lg:order-last" name="bullet" />
            </div>
        </div>
    )
}

export default function Pipelines() {
    const breakpoints = useBreakpoint()

    return (
        <section className={section('text-center')}>
            <h2 className={heading()}>Event pipelines</h2>
            <h3 className={heading('sm')}>
                Reliably ingest data at any scale to build a holistic view of your customers.
            </h3>
            <div className="lg:block flex">
                <div className="grid lg:grid-cols-3 mt-8 lg:mt-16 mb-8 gap-8 lg:gap-0 w-full sm:w-3/4 lg:w-auto">
                    <div>
                        <h4 className="text-2xl m-0 text-blue">Push from data warehouse</h4>
                        <p className="text-base font-semibold">from BigQuery, Snowflake, S3 or Redshift</p>
                        <div className="flex space-x-2 justify-center items-center flex-wrap max-w-xs mx-auto">
                            <Chip icon="snowflake" title="Snowflake" />
                            <Chip icon="bigquery" title="BigQuery" />
                            <Chip icon="s3" title="S3" />
                            <Chip icon="redshift" title="Redshift" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-2xl m-0 text-red">Push from data warehouse</h4>
                        <p className="text-base font-semibold">JavaScript, server-side and mobile SDKs</p>
                        <div className="flex space-x-2 justify-center items-center flex-wrap">
                            <Chip icon="pageviews" title="Pageviews" />
                            <Chip icon="clicks" title="Clicks" />
                            <Chip icon="tap" title="Taps" />
                            <Chip icon="mobile-sdk" title="Mobile SDKs" />
                            <Chip icon="react" title="React" />
                            <Chip icon="forms" title="Forms" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-2xl m-0 text-yellow">Integrate your ecosystem</h4>
                        <p className="text-base font-semibold">PostHog plugins pipe data between your stack</p>
                        <div className="flex space-x-2 justify-center items-center flex-wrap">
                            <Chip icon="hubspot" title="HubSpot" />
                            <Chip icon="salesforce" title="Salesforce" />
                            <Chip icon="sendgrid" title="Sendgrid" />
                        </div>
                    </div>
                    {!breakpoints.md && <PipelineGraphic />}
                    <div className="lg:mt-6 lg:col-span-3">
                        <h4 className="text-2xl m-0 text-blue">Push to data warehouse</h4>
                        <p className="text-base font-semibold">
                            An actionable data schema sets you up for further analysis
                        </p>
                        <div className="flex space-x-2 justify-center items-center flex-wrap max-w-xs mx-auto">
                            <Chip icon="snowflake" title="Snowflake" />
                            <Chip icon="bigquery" title="BigQuery" />
                            <Chip icon="s3" title="S3" />
                            <Chip icon="redshift" title="Redshift" />
                        </div>
                    </div>
                </div>
                {breakpoints.md && <PipelineGraphic />}
            </div>
        </section>
    )
}
