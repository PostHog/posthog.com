import { heading } from 'components/Home/classes'
import Layout from 'components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Squeak } from 'squeak-react'
import { CloudVsSelfHost } from 'components/Pricing/CloudVsSelfHost'
import { FAQs } from 'components/Pricing/FAQs'
import { PlanComparison } from 'components/Pricing/PlanComparison'
import { PricingTable } from 'components/Pricing/PricingTable'
import { Quote } from '../../components/Pricing/Quote'
import 'components/Pricing/styles/index.scss'
import { SEO } from '../../components/seo'
import cntl from 'cntl'
import Link from 'components/Link'
import { Check } from 'components/Icons/Icons'

const section = cntl`
    max-w-6xl
    mx-auto
    px-5
`

const Button = ({
    onClick,
    children,
    active,
}: {
    onClick?: () => void
    children: React.ReactNode
    active?: boolean
}) => {
    return (
        <button className="text-base font-bold flex items-center w-[150px] justify-between" onClick={onClick}>
            <span>{children}</span>
            <span>
                <Check className="w-[17px]" />
            </span>
        </button>
    )
}

const PricingNew = (): JSX.Element => {
    return (
        <Layout>
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
            <section>
                <div className={`grid grid-cols-2 mt-12 md:mt-18 gap-x-4 ${section}`}>
                    <div>
                        <h1 className="text-5xl m-0">
                            Pay per tracked event.
                            <br /> Get access to all features.
                        </h1>
                        <h2 className="text-lg text-blue mt-2">
                            <span className="text-black/50 m-0">Your first 1 million events are included.</span> Every
                            month.
                        </h2>
                    </div>
                    <div>
                        <StaticImage
                            alt="The cutest hedgehog you've ever seen driving a red tractor"
                            src="./images/tractor-hog.png"
                        />
                    </div>
                </div>
                <div className="border-y border-gray-accent-light border-dashed py-6">
                    <div className={section}>
                        <h3 className="m-0 text-lg">
                            Pricing starts at $0.000225
                            <span className="text-base font-medium text-black/50 ">/event</span> and is discounted up to
                            90% for large event volumes.
                        </h3>
                        <p className="m-0 text-[14px] font-bold text-black/50">
                            Need help <Link className="font-bold">estimating your event volume?</Link>
                        </p>
                    </div>
                </div>
            </section>
            <section className={`${section} my-12`}>
                <h2 className="text-xl m-0 mb-10">Calculate your monthly price</h2>
                <div>
                    <h3 className="m-0 text-lg">Do you need to self-host?</h3>
                    <p className="m-0 text-black/50 font-medium">
                        Customer data never leaves your infrastructure or private cloud.
                    </p>
                    <div>
                        <Button>Yes</Button>
                        <Button>No</Button>
                    </div>
                </div>
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
                        PostHog is the first analytics platform where{' '}
                        <span className="text-red">I can be 100% confident in the data.</span> I've finally got the data
                        insight platform I've always wanted as a Product person.
                    </span>
                }
            />
        </Layout>
    )
}

export default PricingNew
