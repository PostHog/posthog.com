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
import { Check, GitHub } from 'components/Icons/Icons'
import { motion } from 'framer-motion'
import Calculator from 'components/Pricing/PricingTable/Calculator'
import { useActions, useValues } from 'kea'
import { pricingSliderLogic } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import Features from 'components/Pricing/Features/index'
import AllPlans from 'components/Pricing/AllPlans'
import GitHubButton from 'react-github-btn'
import AnimateIntoView from 'components/AnimateIntoView'
import { CallToAction } from 'components/CallToAction'

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
            className={`text-base font-bold flex items-center w-[186px] justify-between px-[16px] py-[12px] bg-white rounded-sm ${
                active ? 'border-red' : 'border-white'
            } border-[2.5px] transition-colors`}
            onClick={onClick}
        >
            <span>{children}</span>

            <svg
                className={`${active ? 'opacity-100' : 'opacity-0'} transition-opacity`}
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
                <div className={`grid lg:grid-cols-2 mt-12 md:mt-18 lg:gap-x-4 lg:gap-y-0 gap-y-6 ${section}`}>
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl m-0">
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
            <section className={`${section} my-8 md:my-12 grid md:grid-cols-2 md:gap-y-0 gap-y-12 md:gap-x-4 gap-x-0`}>
                <div>
                    <h2 className="text-xl m-0 mb-6 md:mb-10">Calculate your monthly price</h2>
                    <div>
                        <h3 className="m-0 text-lg">Do you need to self-host?</h3>
                        <p className="m-0 text-black/50 font-medium">
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
                        <h3 className="m-0 text-lg mt-9">Are you an enterprise?</h3>
                        <p className="m-0 text-black/50 font-medium">
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
            <section className={`${section} mb-12 mt-24`}>
                <h2 className="text-xl m-0 flex items-center after:ml-6 after:flex-grow after:border-t after:border-gray-accent-light after:border-dashed">
                    Compare all plans
                </h2>
                <AllPlans />
            </section>
            <section className={`${section} mb-12 mt-24`}>
                <h2 className="text-xl m-0 mb-6 pb-6 border-b border-gray-accent-light border-dashed">
                    PostHog open source
                </h2>
                <div className="grid lg:grid-cols-2 gap-x-4">
                    <div>
                        <p>
                            Our original open source product is available for self-hosting, and ships with product
                            analytics, feature flags, and session recordings.
                        </p>
                        <Link
                            className="p-2 max-w-[250px] bg-primary flex items-center justify-center space-x-4 rounded-sm text-white text-[15px] font-bold"
                            to="https://github.com/PostHog/posthog"
                        >
                            <GitHub />
                            <span>Browse on GitHub</span>
                        </Link>
                        <p className="text-[15px] opacity-50 mt-2">Limited to one project and community support</p>
                    </div>

                    <div className="sm:flex-row flex-col flex items-center sm:items-start justify-center mt-6 lg:-mt-10">
                        <div className="text-center bg-[#2D2D2D] p-4 rounded-md relative sm:-rotate-6 sm:-mr-8 flex-shrink-0">
                            <p className="text-white mb-2 mt-0">Wnat to be our next star?</p>
                            <span className="h-[28px] w-[125px]">
                                <GitHubButton
                                    href="https://github.com/posthog/posthog"
                                    data-size="large"
                                    data-show-count="true"
                                    aria-label="Star posthog/posthog on GitHub"
                                >
                                    Star
                                </GitHubButton>
                            </span>
                            <svg
                                className="absolute left-2 sm:left-auto sm:right-2 -bottom-5"
                                width="35"
                                height="29"
                                viewBox="0 0 35 29"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M34.0329 28.7305L28.9422 2.03952L0.169405 0.617765C0.169405 0.617765 12.4378 8.50347 18.738 13.9774C25.0381 19.4513 34.0329 28.7305 34.0329 28.7305Z"
                                    fill="#2D2D2D"
                                />
                            </svg>
                        </div>

                        <StaticImage src="./images/star-hog.png" width={242} alt="Star Hog" />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default PricingNew
