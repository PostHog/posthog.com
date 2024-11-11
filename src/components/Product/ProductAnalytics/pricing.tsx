import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import CTA from 'components/Home/CTA'
import { FAQ } from 'components/Products/FAQ'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import Plans from 'components/Pricing/Plans'
import ProductCTA from 'components/Products/CTA'
import { IconCheck } from '@posthog/icons'
import ProductBar from 'components/Products/ProductBar'

const product = {
    slug: 'product-analytics',
    lowercase: 'product analytics',
    capitalized: 'Product analytics',
    freeTier: '1,000,000 events',
}

const team = 'Product Analytics'
const teamSlug = '/teams/product-analytics'

import {
    IconBolt,
    IconGraph,
    IconFlask,
    IconToggle,
    IconPieChart,
    IconPeople,
    IconNotification,
    IconRewindPlay,
    IconAI,
} from '@posthog/icons'

const faqs = [
    {
        question: 'How do I know what my event volume is?',
        children:
            "The easiest way is to sign up for the Free plan - no credit card required. You'll get an accurate volume projection after just a few days.",
    },
    {
        question: 'Do I pay anything for stored events?',
        children:
            'No, you only pay the fee per captured event in a given month (i.e. you only pay when each event is first received). There are no additional costs or fees.',
    },
    {
        question: 'How long do you retain event data?',
        children:
            'Data is guaranteed to be retained for 7 years on any paid plan and 1 year on a free plan. After 1 year, data may be moved into cold storage so queries may run more slowly.',
    },
    {
        question: 'Is there a free trial on paid plans?',
        children:
            'We have a generous free tier on every paid plan so you can try out the features before paying any money. (You\'ll need to enter your credit card info, but you can set a billing limit). If you have additional needs, such as enterprise features, please <a href="/talk-to-a-human">get in touch</a>.',
    },
    {
        question: 'What currency are your prices in?',
        children: 'All prices are in US Dollars (USD), excluding taxes.',
    },
    {
        question: 'Do you offer a discount for non-profits?',
        children:
            'Yes in most cases - 25% off any plan. Create your account, then email <a href="mailto:sales@posthog.com?subject=Non-profit%20discount">sales@posthog.com</a> from the same email address with some basic details on your organization. We will then apply a discount.',
    },
    {
        question: 'Are there any minimums or annual commitments?',
        children:
            'Nope. We can, however, offer annual commitments (for example, to maintain pricing) if you need them as part of an enterprise agreement.',
    },
]

export const ProductProductAnalyticsPricing = () => {
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="Product analytics pricing - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />

            <div className="@container bg-white/50 dark:bg-dark pb-8">

                <ProductBar
                    color="blue"
                    icon={<IconGraph />}
                    product={product.capitalized}
                    beta={false}
                />

                <section
                    id="pricing"
                    className={`${fullWidthContent ? 'max-w-full' : 'max-w-7xl'} py-8 px-4 @2xl:px-6 @4xl:px-8 transition-all`}
                >
                  <h1 className="mb-2">First 1,000,000 events <span className="text-green">free – <em>every month</em></span></h1>
                  <p className="mb-4 text-[15px]">After that, pricing starts at <strong className="font-semibold">$0.00005</strong>/event.</p>
                  <ProductCTA />


                    <div className="@5xl:flex justify-between items-start gap-8 @6xl:gap-12 -mx-5 md:mx-0">
                        <div className="flex-1 px-5 md:px-0">
                            <Plans showHeaders={false} showCTA={false} groupsToShow={['product_analytics']} />
                        </div>
                        <div className="px-5 md:px-0 lg:mt-4 flex flex-col @3xl:flex-row @5xl:flex-col @5xl:flex-[0_0_300px] @6xl:flex-[0_0_350px] gap-8">

                          <div className="@3xl:flex-[0_0_300px] @5xl:flex-[0_0_auto]">
                            <h4>Things you should know</h4>
                            <ul className="list-none p-0 space-y-1 [&_li]:text-[15px]">
                              <li className="relative pl-6">
                                <IconCheck className="text-green absolute top-0.5 left-0 inline-block size-5" />
                                Usage-based pricing per product
                              </li>
                              <li className="relative pl-6">
                                <IconCheck className="text-green absolute top-0.5 left-0 inline-block size-5" />
                                Get access to all products, but only use what you want.
                              </li>
                              <li className="relative pl-6">
                                <IconCheck className="text-green absolute top-0.5 left-0 inline-block size-5" />
                                Each product has a generous free tier, but you can set billing limits to avoid an unexpected bill.
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-3xl">FAQs</h4>
                            {faqs.map((faq, index) => {
                                return <FAQ {...faq} key={index} />
                            })}
                          </div>
                        </div>
                    </div>
                </section>

            <div className="max-w-7xl mx-auto relative">
                <section className="mb-20">
                    <CTA />
                </section>
            </div>
            </div>
        </>
    )
}

export default ProductProductAnalyticsPricing
