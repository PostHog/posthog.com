import { heading } from 'components/Home/classes'
import Layout from 'components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Squeak } from 'squeak-react'
import { CloudVsSelfHost } from '../components/Pricing/CloudVsSelfHost'
import { FAQs } from '../components/Pricing/FAQs'
import { PlanComparison } from '../components/Pricing/PlanComparison'
import { PricingTable } from '../components/Pricing/PricingTable'
import { Quote } from '../components/Pricing/Quote'
import '../components/Pricing/styles/index.scss'
import { SEO } from '../components/seo'

const PricingNew = (): JSX.Element => {
    return (
        <Layout>
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
            <section className="mt-12 md:mt-18 px-5">
                <h1 className={heading()}>Pricing</h1>
                <h2 className="mt-4 mb-12 text-lg text-center">
                    <span className="opacity-50">All plans include</span> event autocapture{' '}
                    <span className="opacity-50">and</span> no limits <span className="opacity-50">on</span> tracked
                    users <span className="opacity-50">and</span> teammates.
                </h2>

                <PricingTable />
            </section>
            <CloudVsSelfHost className="mb-28 md:pt-28 md:pb-14" />
            <h3 className="relative text-primary text-center mb-6">Compare plans</h3>
            <PlanComparison className="mx-4 mb-28" />
            {/* <Savings /> */}
            <FAQs className="mx-auto px-5" />
            <div className="mx-auto px-5 max-w-screen-md mt-12">
                <Squeak
                    apiHost="https://squeak.cloud"
                    apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXBrcXV2d3FhYXVudXpqb2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MjE3ODUsImV4cCI6MTk2NTI5Nzc4NX0.SxdOpxHjVwap7sDUptK2TFJl7WK3v3HLuKbzb0JKeKg"
                    url="https://pxipkquvwqaaunuzjoge.supabase.co"
                    organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                />
            </div>
            <Quote
                className="my-24 md:my-32 px-5"
                name="Jonathan Hyde"
                title="Former Head of Product, Legl"
                image={
                    <StaticImage
                        width={100}
                        height={100}
                        alt="Jonathan Hyde - Former Head of Product, Legl"
                        src="../images/jonathan-hyde-plain.png"
                    />
                }
                quote={
                    <span>
                        Posthog is the first analytics platform where{' '}
                        <span className="text-red">I can be 100% confident in the data.</span> I've finally got the data
                        insight platform I've always wanted as a Product person.
                    </span>
                }
            />
        </Layout>
    )
}

export default PricingNew
