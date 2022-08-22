import Layout from 'components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState, useRef, useEffect } from 'react'
import { FAQs } from 'components/Pricing/FAQs'
import { Quote } from '../../components/Pricing/Quote'
import 'components/Pricing/styles/index.scss'
import { SEO } from '../../components/seo'
import cntl from 'cntl'
import Link from 'components/Link'
import { GitHub, Info } from 'components/Icons/Icons'
import Calculator from 'components/Pricing/Calculator/index'
import { CloudIcon, SelfHostIcon } from 'components/Pricing/Calculator/index'
import ProductPillars from 'components/Pricing/ProductPillars/index'
import Features from 'components/Pricing/Features/index'
import AllPlans from 'components/Pricing/AllPlans'
import GitHubButton from 'react-github-btn'
import { animateScroll as scroll } from 'react-scroll'
import shape from './images/shape.svg'
import Modal from 'components/Modal'
import SelfHostOverlay from 'components/Pricing/Overlays/SelfHost'
import EnterpriseOverlay from 'components/Pricing/Overlays/Enterprise'
import WhyCloud from 'components/Pricing/Overlays/WhyCloud'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { useActions, useValues } from 'kea'
import { TrackedCTA } from 'components/CallToAction'
import { motion } from 'framer-motion'
import Enterprise from 'components/Pricing/Modals/Enterprise'
import { pricingSliderLogic } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { prettyInt, sliderCurve } from 'components/Pricing/PricingSlider/LogSlider'
import { pricing, pricingLabels } from 'components/Pricing/constants'

const Benefit = ({ children }) => {
    return (
        <li className="font-medium text-[15px] flex gap-x-1.5 items-start leading-tight">
            <span className="w-[24px] flex justify-center items-center flex-shrink-0 mt-[2px]">
                <Check />
            </span>
            <span>{children}</span>
        </li>
    )
}

const Check = () => {
    return (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.9947 5.52548L6.4635 8.99428L14.7025 0.75528C15.2095 0.24824 16.0369 0.24824 16.5439 0.75528L17.3259 1.53732C17.833 2.04436 17.833 2.8717 17.3259 3.37872L7.46034 13.2443C6.95566 13.749 6.13534 13.7521 5.62674 13.2521L0.389145 8.10213C0.126645 7.84509 -0.00381509 7.52713 8.49096e-05 7.15995C0.00399111 6.79277 0.141491 6.47791 0.408685 6.22635L1.18056 5.49979C1.69306 5.01775 2.49696 5.02947 2.99462 5.52714L2.9947 5.52548Z"
                fill="#BFBFBC"
            />
        </svg>
    )
}

export const section = cntl`
    max-w-6xl
    mx-auto
    px-4
    md:px-0
`

const Breakdown = ({ planName }) => {
    const breakdown = pricing[planName]
    return breakdown.map((price, index) => {
        const label = pricingLabels[price[0]]
        const included = price[1] === 0
        return (
            <>
                <div className="col-span-2">{label || '100 million - 1 billion'}</div>
                <strong className="text-right">
                    {included ? (
                        'Included'
                    ) : (
                        <>
                            {price[1]}
                            <span className="font-normal text-black/50">/event</span>
                        </>
                    )}
                </strong>
            </>
        )
    })
}

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
            className={`text-lg font-bold flex items-center flex-grow sm:flex-grow-0 sm:w-[186px] justify-between px-4 py-2 bg-white rounded-sm shadow-sm text-black/70 hover:text-black/95 relative active:top-[1px] active:scale-[.97] active:border-[2.5px] active:border-red transition-none ${
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

const B2C = () => {
    return (
        <div className="col-span-3 border-dashed border-gray-accent border py-2 mt-2 text-center px-4 bg-black bg-opacity-[2%]">
            B2C company with insane event volume?{' '}
            <Link to="/signup/b2c" className="font-bold text-orange inline-block">
                Apply for a discount
            </Link>
        </div>
    )
}

const PricingNew = (): JSX.Element => {
    const [selfHost, setSelfHost] = useState(false)
    const [enterprise, setEnterprise] = useState(false)
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [showVolumeDiscounts, setShowVolumeDiscounts] = useState(false)
    const [showPlanBuilder, setShowPlanBuilder] = useState(false)
    const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false)
    const [whyCloudOpen, setWhyCloudOpen] = useState(false)
    const builderRef = useRef<HTMLDivElement>()
    const { cloudCost, selfHostedCost, cloudEnterpriseCost, selfHostedEnterpriseCost, sliderValue } =
        useValues(pricingSliderLogic)
    const [enterpriseMode, setEnterpriseMode] = useState(false)
    const { setPricingOption } = useActions(pricingSliderLogic)

    const handleEnterpriseModeChange = (checked: boolean) => {
        setPricingOption(checked ? 'cloud-enterprise' : 'cloud')
        setEnterpriseMode(checked)
    }

    const handleInfo = (currentModal: string) => {
        setCurrentModal(currentModal)
    }

    useEffect(() => {
        if (showPlanBuilder) builderRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [showPlanBuilder])

    return (
        <Layout>
            <SelfHostOverlay open={currentModal === 'self host'} setOpen={setCurrentModal} />
            <EnterpriseOverlay open={currentModal === 'enterprise'} setOpen={setCurrentModal} />
            <WhyCloud open={whyCloudOpen} setOpen={setWhyCloudOpen} />
            <Enterprise open={enterpriseModalOpen} setOpen={setEnterpriseModalOpen} />
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
            <section>
                <div
                    className={`grid lg:grid-cols-2 lg:mt-12 md:mt-18 lg:gap-x-4 gap-y-3 lg:gap-y-0 mb-4 md:px-4 ${section}`}
                >
                    <div className="lg:order-2">
                        <StaticImage
                            alt="The cutest hedgehog you've ever seen driving a red tractor"
                            src="./images/tractor-hog.png"
                            className="lg:-mt-4 xl:-mt-12 max-w-screen-sm"
                            loading="eager"
                            placeholder="none"
                        />
                    </div>
                    <div className="lg:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl mt-0 mb-2">
                            Pay per tracked event.
                            <br />
                            Get the whole hog.
                        </h1>
                        <h3 className="text-xl text-black/50 font-bold">
                            Your first 1 million events are free. <span className="text-blue">Every month.</span>
                        </h3>
                    </div>
                </div>
            </section>

            <section className="border-dashed border-gray-accent-light border-t border-b mb-8 hidden md:block">
                <div className="max-w-6xl mx-auto flex items-center md:px-4">
                    <p className="font-semibold text-sm text-black/50 text-right m-0">
                        One price, <br />
                        full product suite:
                    </p>
                    <ProductPillars />
                </div>
            </section>

            <section className="flex flex-col md:flex-row gap-12 px-4 max-w-6xl mx-auto items-start">
                <div className="grow grid md:grid-cols-2 md:grid-rows-[1fr_max-content] gap-x-8 col-span-2">
                    <div className="order-1 bg-white px-8 pt-8 border-l-3 border-t-3 border-r-3 border-red border-solid rounded-tl rounded-tr shadow-xl relative pb-2 ">
                        <div className="mb-4">
                            <CloudIcon className="opacity-30 mb-3" />
                            <h2 className="text-xl mb-1 flex items-center">
                                {enterpriseMode ? (
                                    ' PostHog Enterprise Cloud'
                                ) : (
                                    <>
                                        PostHog Cloud{' '}
                                        <span className="absolute -top-[3px] right-3 bg-red inline-flex text-sm px-3 py-2 rounded-[3px] font-semibold ml-2 space-x-1">
                                            <span className="text-white font-bold">Recommended</span>
                                            <button onClick={() => setWhyCloudOpen(true)} className="text-white">
                                                <Info />
                                            </button>
                                        </span>
                                    </>
                                )}
                            </h2>
                            <p className="mb-2 text-sm text-black/50 leading-tight">
                                SaaS solution managed by the PostHog core team
                            </p>
                        </div>

                        <ul className="list-none p-0 m-0 grid gap-y-2">
                            <Benefit>Full product suite</Benefit>
                            <Benefit>Hosted & managed by PostHog</Benefit>
                            <Benefit>Always get the latest features</Benefit>
                        </ul>
                    </div>

                    <div className="order-3 md:order-2 bg-white px-8 pt-8 pb-2 rounded-md shadow-xl">
                        <div className="mb-4">
                            <SelfHostIcon className="opacity-30 mb-3" />
                            <h2 className="text-xl mb-1 flex items-center">
                                {enterpriseMode ? 'Self-hosted Enterprise' : 'Self-hosted'}
                            </h2>
                            <p className="mb-2 text-sm text-black/50 leading-tight">
                                Customer data never leaves your infrastructure
                            </p>
                        </div>

                        <ul className="list-none p-0 m-0 grid gap-y-2">
                            <Benefit>Full feature set of PostHog Cloud but on your infrastructure</Benefit>
                            <Benefit>Full access to your production instance</Benefit>
                            <Benefit>Paid deployment support available in the PostHog Marketplace</Benefit>
                        </ul>
                    </div>

                    <div className="order-2 relative mb-8 md:mb-0 md:order-3 bg-white px-8 pb-8 border-l-3 border-b-3 border-r-3 border-red border-solid rounded-bl rounded-br shadow-xl">
                        <div className="border-t border-dashed border-gray-accent flex justify-between pt-2 mt-4">
                            <div className="flex flex-col">
                                <strong className="text-[16px]">Monthly estimate</strong>
                                <span className="text-sm text-black/60">
                                    for {sliderValue ? prettyInt(sliderCurve(sliderValue)) : '1,000,000'} events/mo
                                </span>
                            </div>
                            <div>
                                <strong className="text-[18px] text-black">
                                    ${prettyInt(enterpriseMode ? cloudEnterpriseCost : cloudCost)}
                                </strong>
                                <span className="text-sm text-black/60">/mo</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <TrackedCTA
                                event={{
                                    name: `clicked Get started - free`,
                                    type: enterpriseMode ? 'cloud-enterprise' : 'cloud',
                                }}
                                type="primary"
                                width="full"
                                className="shadow-md"
                                to={
                                    enterpriseMode
                                        ? 'https://posthog.com/signup/cloud/enterprise'
                                        : 'https://app.posthog.com/signup'
                                }
                            >
                                {enterpriseMode ? 'Get in touch' : 'Get started - free'}
                            </TrackedCTA>
                        </div>
                    </div>

                    <div className="order-4 bg-white px-8 pb-8 rounded-bl rounded-br shadow-xl">
                        <div className="border-t border-dashed border-gray-accent flex justify-between pt-2 mt-4">
                            <div className="flex flex-col">
                                <strong className="text-[16px]">Monthly estimate</strong>
                                <span className="text-sm text-black/60">
                                    for {sliderValue ? prettyInt(sliderCurve(sliderValue)) : '1,000,000'} events/mo
                                </span>
                            </div>
                            <div>
                                <strong className="text-[18px] text-black">
                                    ${prettyInt(enterpriseMode ? selfHostedEnterpriseCost : selfHostedCost)}
                                </strong>
                                <span className="text-sm text-black/60">/mo</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <TrackedCTA
                                event={{
                                    name: `clicked Get started - free`,
                                    type: enterpriseMode ? 'self-hosted-enterprise' : 'self-hosted',
                                }}
                                type="primary"
                                width="full"
                                className="shadow-md"
                                to={
                                    enterpriseMode
                                        ? 'https://license.posthog.com/?price_id=price_1L1AeWEuIatRXSdzj0Y5ioOU'
                                        : 'https://license.posthog.com/'
                                }
                            >
                                Get started - free
                            </TrackedCTA>
                        </div>
                    </div>
                    <div className="md:col-span-2 mt-8 order-5">
                        <div className="mx-auto flex justify-center space-x-8 pb-4 mb-6 border-b border-dashed border-gray-accent-light">
                            <Link
                                to="/signup/self-host/get-in-touch#demo"
                                className="text-[15px] group font-semibold text-blue py-2 px-3 rounded-sm hover:text-blue hover:bg-blue/10 flex space-x-2 items-center"
                            >
                                <svg
                                    width="24"
                                    height="17"
                                    viewBox="0 0 24 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-black/30 group-hover:text-blue"
                                >
                                    <path
                                        d="M3.105 0.499996C2.21906 0.499996 1.5 1.22 1.5 2.105V13.9999H0V15.4558C0 16.308 0.691872 16.9999 1.54406 16.9999H22.3182C23.2473 16.9999 24.0001 16.2471 24.0001 15.318V13.9999H22.5001V2.05244C22.5001 1.19744 21.8026 0.499924 20.9476 0.499924L3.105 0.499996ZM3.105 2L20.9999 2.0525V13.9999H13.4737C13.4662 14.8249 12.7912 15.4999 11.9653 15.4999C11.1375 15.4999 10.4625 14.8268 10.4568 13.9999H3.00002V2.10506C3.00002 2.04693 3.0469 2.00006 3.10502 2.00006L3.105 2ZM12.0347 3.5C10.3744 3.5 9.0234 4.86406 9.0234 6.54416C9.0234 7.94854 9.97214 9.1232 11.25 9.47384C9.14246 9.68384 7.22155 10.7816 5.95867 12.4916H10.0161C10.2833 12.4869 10.557 12.486 10.8364 12.4916H13.3209C13.5037 12.4888 13.6847 12.4897 13.8628 12.4916H18.0169C16.7691 10.7994 14.8811 9.70544 12.7989 9.47672C14.0861 9.13172 15.0432 7.9542 15.0432 6.54416C15.0442 4.86416 13.6961 3.5 12.0358 3.5H12.0347Z"
                                        fill="currentColor"
                                    />
                                </svg>

                                <span>Schedule a demo</span>
                            </Link>
                            <Link
                                to="/signup/cloud/enterprise"
                                className="text-[15px] group font-semibold text-blue py-2 px-3 rounded-sm hover:text-blue hover:bg-blue/10 flex space-x-2 items-center"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-black/30 group-hover:text-blue"
                                >
                                    <path
                                        d="M18.7569 1.24141C18.4467 0.932806 17.9842 0.826566 17.5717 0.975786L1.6631 6.65779C1.23498 6.81013 0.938096 7.20389 0.910756 7.65779C0.883412 8.11247 1.12952 8.53825 1.53732 8.74295L6.74832 11.3475L13.4085 6.59055L8.65072 13.2523L11.2553 18.4633C11.4491 18.8493 11.8436 19.0907 12.2725 19.0907C12.2959 19.0907 12.3186 19.0899 12.3412 19.0883C12.7959 19.0618 13.1905 18.7657 13.3436 18.3368L19.0256 2.42658C19.1717 2.01408 19.0678 1.55158 18.7568 1.24142L18.7569 1.24141Z"
                                        fill="currentColor"
                                    />
                                </svg>

                                <span>Get in touch</span>
                            </Link>
                        </div>
                        <div>
                            <h4 className="text-[15px] mb-0 font-normal opacity-75">
                                <span className="font-bold">
                                    Looking for{' '}
                                    <Link
                                        className="border-b border-dashed border-gray-accent-light text-black"
                                        onClick={() =>
                                            posthog &&
                                            posthog.capture('clicked Browse on GitHub', { type: 'open-source' })
                                        }
                                        to="https://github.com/PostHog/posthog"
                                    >
                                        PostHog Open Source
                                    </Link>
                                    ?
                                </span>{' '}
                                (No credit card required)
                            </h4>
                            <p className="text-sm opacity-60">
                                Available with product analytics, feature flags, and session recordings – limited to 1
                                project and no user permissions
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink md:basis-96 box-border flex">
                    <div className="md:max-w-[290px] mx-auto">
                        <Calculator
                            enterpriseMode={enterpriseMode}
                            handleEnterpriseModeChange={handleEnterpriseModeChange}
                            enterprise={enterprise}
                            selfHost={selfHost}
                            setCurrentModal={setCurrentModal}
                        />
                    </div>
                </div>
            </section>
            <section className={`${section} mt-12 md:px-4`}>
                <h2 className="text-2xl m-0 flex items-center">What comes in PostHog?</h2>
                <p className="m-0 text-black/50 font-medium mb-7">Get access to all features and no plan limits.</p>
                <Features />
            </section>
            <section className={`${section} mb-12 mt-12 md:mt-24 md:px-4`}>
                <h2 className="text-2xl m-0 flex items-center border-b border-dashed border-gray-accent-light pb-4">
                    Compare all plans
                </h2>
                <AllPlans />
            </section>
            <section className={`${section} my-12  md:px-4`}>
                <h2 className="text-2xl m-0 mb-6 pb-6 border-b border-gray-accent-light border-dashed">Questions</h2>
                <FAQs />
            </section>
            <section className="bg-primary my-12 md:px-4">
                <Quote
                    className="py-12 md:py-16 px-5 bg-primary"
                    name={<span className="text-white">Jonathan Hyde</span>}
                    title={<span className="text-white">Former Head of Product, Legl</span>}
                    image={
                        <StaticImage
                            width={100}
                            height={100}
                            alt="Jonathan Hyde - Former Head of Product, Legl"
                            src="../../images/jonathan-hyde-plain.png"
                            placeholder="none"
                        />
                    }
                    quote={
                        <span className="text-white">
                            PostHog is the first analytics platform where{' '}
                            <span className="text-yellow">I can be 100% confident in the data.</span> I've finally got
                            the data insight platform I've always wanted as a Product person.
                        </span>
                    }
                />
            </section>
            <section className={`${section} mb-12 mt-16`}>
                <div className="sm:flex-row flex-col-reverse flex items-center sm:items-start justify-center">
                    <StaticImage src="./images/vacation-hog.png" alt="Vacation Hog" width={252} placeholder="none" />
                    <div className="text-center bg-[#2D2D2D] p-4 rounded-md relative sm:rotate-6 sm:-mr-8 flex-shrink-0">
                        <p className="text-white m-0 text-[18px] font-bold font-comic">
                            Looking for the signup button?
                        </p>
                        <p className="text-[15px] mt-0 mb-2 text-white font-comic">(I’ll take you there.)</p>
                        <button
                            onClick={() => scroll.scrollToTop()}
                            className="mx-auto flex space-x-2 items-center bg-red text-[15px] font-bold text-white px-3 py-2 rounded-sm relative active:top-[1px] active:scale-[.97]"
                        >
                            <span>Beam me up!</span>
                            <svg
                                width="17"
                                height="23"
                                viewBox="0 0 17 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.7211 16.9033V4.24645L14.1749 6.70024C14.6354 7.14428 15.366 7.13788 15.8183 6.6865C16.2697 6.23421 16.2761 5.50358 15.832 5.04306L11.3787 0.58972C10.9209 0.132854 10.1793 0.132854 9.72153 0.58972L5.26819 5.04306C4.82415 5.50358 4.83055 6.23421 5.28284 6.6865C5.73514 7.13789 6.46576 7.14428 6.92537 6.70024L9.37729 4.24645V16.9033C9.37729 18.5989 8.00301 19.9742 6.30636 19.9742C4.61072 19.9742 3.23637 18.599 3.23637 16.9033H0.892505C0.892505 18.8379 1.92434 20.6251 3.5999 21.592C5.27447 22.5597 7.33906 22.5597 9.01375 21.592C10.6892 20.6251 11.7211 18.8379 11.7211 16.9033H11.7211Z"
                                    fill="white"
                                />
                                <path d="M3.04878 15.0117V15.9493H0.70492V15.0117H3.04878Z" fill="white" />
                                <path d="M3.04878 13.1367V14.0743H0.70492V13.1367H3.04878Z" fill="white" />
                                <path d="M3.04878 7.51123V8.44878H0.70492V7.51123H3.04878Z" fill="white" />
                                <path d="M3.04878 9.38672V10.3243H0.70492V9.38672H3.04878Z" fill="white" />
                                <path d="M3.04878 11.2617V12.1993H0.70492V11.2617H3.04878Z" fill="white" />
                            </svg>
                        </button>
                        <svg
                            className="absolute right-2 sm:left-2 sm:right-auto -bottom-5 -scale-x-1"
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
                </div>
            </section>
        </Layout>
    )
}

export default PricingNew
