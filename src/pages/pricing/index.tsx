import { heading } from 'components/Home/classes'
import Layout from 'components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState, useEffect } from 'react'
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
import { motion } from 'framer-motion'
import Calculator from 'components/Pricing/PricingTable/Calculator'
import { useActions, useValues } from 'kea'
import { pricingSliderLogic } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import Features from 'components/Pricing/Features/index'

export const section = cntl`
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
        <button
            className={`text-base font-bold flex items-center w-[186px] justify-between px-4 py-2 bg-white rounded-sm shadow-sm text-black/70 hover:text-black/95 relative active:top-[1px] active:scale-[.97] active:border-[2.5px] active:border-red transition-none ${
                active ? 'border-red' : 'border-white'
            } border-[2.5px] transition-colors`}
            onClick={onClick}
        >
            <span>{children}</span>

            <svg
                className={`${active ? 'opacity-100' : 'opacity-0'} transition-none`}
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.9947 5.52548L6.4635 8.99428L14.7025 0.75528C15.2095 0.24824 16.0369 0.24824 16.5439 0.75528L17.3259 1.53732C17.833 2.04436 17.833 2.8717 17.3259 3.37872L7.46034 13.2443C6.95566 13.749 6.13534 13.7521 5.62674 13.2521L0.389145 8.10213C0.126645 7.84509 -0.00381509 7.52713 8.49096e-05 7.15995C0.00399111 6.79277 0.141491 6.47791 0.408685 6.22635L1.18056 5.49979C1.69306 5.01775 2.49696 5.02947 2.99462 5.52714L2.9947 5.52548Z"
                    fill="#F54E00"
                />
            </svg>
        </button>
    )
}

const PricingNew = (): JSX.Element => {
    const [selfHost, setSelfHost] = useState(false)
    const [enterprise, setEnterprise] = useState(false)

    return (
        <Layout>
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
            <section>
                <div className={`grid lg:grid-cols-2 lg:mt-12 md:mt-18 lg:gap-x-4 gap-y-3 lg:gap-y-0 mb-4 ${section}`}>
                    <div className="lg:order-2">
                        <StaticImage
                            alt="The cutest hedgehog you've ever seen driving a red tractor"
                            src="./images/tractor-hog.png"
                            className="lg:-mt-4 xl:-mt-12 max-w-screen-sm"
                        />
                    </div>
                    <div className="lg:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl m-0">
                            Pay per tracked event.
                            <br /> Get access to all features.
                        </h1>
                        <h2 className="text-lg text-blue mt-2 leading-tight">
                            <span className="text-black/50 m-0">Your first 1 million events are included.</span>{' '}
                            <span className="inline-block">Every month.</span>
                        </h2>
                    </div>
                </div>
                <div className="border-y border-gray-accent-light border-dashed py-6">
                    <div className={section}>
                        <h3 className="m-0 mb-1 text-lg leading-tight">
                            Pricing starts at <span className="font-black">$0.000225</span>
                            <span className="text-sm font-semibold text-black/50">/event</span> and is discounted{' '}
                            <span className="font-black">up to 90%</span> for large event volumes.
                        </h3>
                        <p className="m-0 text-[14px] font-bold text-black/50">
                            Need help{' '}
                            <Link to="/blog/calculating-events-from-users" className="font-bold">
                                estimating your event volume?
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
            <section className={`${section} my-8 md:my-12 grid md:grid-cols-2 md:gap-y-0 gap-y-12 md:gap-x-4 gap-x-0`}>
                <div>
                    <h2 className="text-xl m-0 mb-6 md:mb-8">Calculate your monthly price</h2>
                    <div>
                        <h3 className="m-0 mb-1 text-[18px]">Do you need to self-host?</h3>
                        <p className="m-0 text-black/50 font-medium text-sm">
                            Customer data never leaves your infrastructure or private cloud.
                        </p>
                        <div className="flex space-x-3 mt-3">
                            <Button onClick={() => setSelfHost(true)} active={selfHost}>
                                Yes
                            </Button>
                            <Button onClick={() => setSelfHost(false)} active={!selfHost}>
                                No
                            </Button>
                        </div>
                        <h3 className="m-0 mb-1 text-[18px] mt-9">Are you an enterprise?</h3>
                        <p className="m-0 text-black/50 font-medium text-sm">
                            Advanced permissioning, proactive support, training, SSO/SAML & more
                        </p>
                        <div className="flex space-x-3 mt-3">
                            <Button onClick={() => setEnterprise(true)} active={enterprise}>
                                Yes
                            </Button>
                            <Button onClick={() => setEnterprise(false)} active={!enterprise}>
                                No
                            </Button>
                        </div>
                    </div>
                </div>
                <Calculator enterprise={enterprise} selfHost={selfHost} />
            </section>
            <section className={section}>
                <h2 className="text-xl m-0 flex items-center after:ml-6 after:flex-grow after:border-t after:border-gray-accent-light after:border-dashed">
                    What comes in PostHog?
                </h2>
                <p className="m-0 text-black/50 font-medium mb-7">Get access to all features and no plan limits.</p>
                <Features />
            </section>
        </Layout>
    )
}

export default PricingNew
