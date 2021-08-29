import React from 'react'
import { SEO } from '../components/seo'
import { CallToAction } from 'components/CallToAction'
import { PricingHero } from '../components/Pricing/PricingHero'
import { PricingTable } from '../components/Pricing/PricingTable'
import { CloudVsSelfHost } from '../components/Pricing/CloudVsSelfHost'
import { PlanComparison } from '../components/Pricing/PlanComparison'
import { Savings } from '../components/Pricing/Savings'
import { FAQs } from '../components/Pricing/FAQs'
import { Quote } from '../components/Pricing/Quote'
import { Footer } from '../components/Footer'
import { useLocation } from '@reach/router'
import '../components/Pricing/styles/index.scss'
import Layout from 'components/Layout'
import { StaticImage } from 'gatsby-plugin-image'

const PricingNew = (): JSX.Element => {
    const { hash } = useLocation()
    const SHOW_SCALE_HASH = '#scale'
    return (
        <Layout>
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
            <section className="mt-24 px-5">
                <h1 className="text-center mt-0 mb-4">Pricing</h1>
                <h2 className="text-center text-lg m-0 mb-7 opacity-75">
                    Pay per event after a free allocation every month.
                </h2>

                <PricingTable showScaleByDefault={hash === SHOW_SCALE_HASH} />
            </section>
            <CloudVsSelfHost className="mt-28 md:mt-40 mb-28 md:pt-28 md:pb-14" />
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
                        src="../../../images/jonathan-hyde-plain.png"
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
