import { heading } from 'components/Home/classes'
import Layout from 'components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
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
            <section className="mt-12 md:mt-24 px-5">
                <h1 className={heading()}>Pricing</h1>
                <h2 className="my-12 text-lg text-center">
                    <span className="opacity-50">All plans include</span> event autocapture, tracked users,{' '}
                    <span className="opacity-50">and</span> teammates.
                </h2>

                <PricingTable />
            </section>
            <CloudVsSelfHost className="mb-28 md:pt-28 md:pb-14" />
            <h3 className="relative text-almost-black text-center mb-6">Compare plans</h3>
            <PlanComparison className="mx-4 mb-28" />
            {/* <Savings /> */}
            <FAQs className="mx-auto px-5" />
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
