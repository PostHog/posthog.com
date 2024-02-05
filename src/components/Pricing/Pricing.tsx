import Layout from 'components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import { FAQs } from 'components/Pricing/FAQs'
import { Quote } from 'components/Pricing/Quote'
import 'components/Pricing/styles/index.scss'
import { SEO } from '../seo'
import cntl from 'cntl'
import { animateScroll as scroll } from 'react-scroll'
import SelfHostOverlay from 'components/Pricing/Overlays/SelfHost'
import OtherOptions from './OtherOptions'
import { PricingCalculator } from './PricingCalculator'
import { useLocation } from '@reach/router'
import { pricingMenu } from '../../navs'
import tractorHog from '../../../static/lotties/tractor-hog.json'
import Lottie from 'react-lottie'
import Plans, { CTA } from './Plans'
import Link from 'components/Link'
import {
    IconGraph,
    IconChevronDown,
    IconRewindPlay,
    IconToggle,
    IconFlask,
    IconMessage,
    IconInfo,
    IconArrowRight,
} from '@posthog/icons'
import Tooltip from 'components/Tooltip'

const products = [
    {
        icon: <IconGraph className="w-5 h-6 text-blue" />,
        name: 'Product analytics',
        freeLimit: '1,000,000',
        denomination: 'event',
        price: '0.00031',
        link: '/pricing?product=product-analytics',
    },
    {
        icon: <IconRewindPlay className="w-5 h-6 text-yellow" />,
        name: 'Session replay',
        freeLimit: '15,000',
        denomination: 'recording',
        price: '0.0050',
        link: '/pricing?product=session-replay',
    },
    {
        icon: <IconToggle className="w-5 h-6 text-green" />,
        name: 'Feature flags',
        freeLimit: '1,000,000',
        denomination: 'request',
        price: '0.0001',
        link: '/pricing?product=feature-flags',
    },
    {
        icon: <IconFlask className="w-5 h-6 text-purple" />,
        name: 'A/B testing',
        freeLimit: '',
        denomination: '',
        price: '',
        link: '/pricing?product=ab-testing',
        message: <em className="font-normal opacity-75">Billed with feature flags</em>,
    },
    {
        icon: <IconMessage className="w-5 h-5 text-red" />,
        name: 'Surveys',
        freeLimit: '250',
        denomination: 'response',
        price: '0.2000',
        link: '/pricing?product=surveys',
    },
]

interface PlanData {
    title: string
    price: string
    priceSubtitle?: string | JSX.Element
    features: React.ReactNode[]
}

const plans: PlanData[] = [
    {
        title: 'Totally free',
        price: 'Free',
        priceSubtitle: '- no credit card required',
        features: [
            'Basic product features',
            '1 project',
            '1 year data retention',
            'Community support',
            'Usage capped at free tier limits',
        ],
    },
    {
        title: 'Usage-based',
        price: '$0',
        features: [
            'Advanced product features',
            '2 projects',
            '7 year data retention',
            'Email support',
            'Usage-based pricing after free tier',
        ],
    },
    {
        title: 'Usage based for teams',
        price: '$450',
        features: [
            <>
                <span className="relative">
                    Includes team features{' '}
                    <Tooltip content="Verified events, comments and taxonomy (tags and descriptions) on insights, events, properties">
                        <span className="relative -top-px">
                            <IconInfo className="inline-block w-4 h-4" />
                        </span>
                    </Tooltip>
                </span>
            </>,
            'Unlimited projects',
            '7 year data retention',
            'Priority support',
            'Usage-based pricing after free tier',
        ],
    },
    {
        title: 'Enterprise',
        price: 'Custom pricing',
        priceSubtitle: 'with fixed terms',
        features: [
            'Unlimited everything',
            'SAML enforcement',
            'Custom MSA',
            'Slack-based support',
            'Personalized onboarding & training',
        ],
    },
]

const Plan: React.FC<{ planData: PlanData }> = ({ planData }) => (
    <div>
        <h4 className="text-lg mb-2">{planData.title}</h4>
        <div className="flex flex-col border border-light dark:border-dark bg-white dark:bg-accent-dark rounded shrink-0 basis-[80vw] xs:basis-[55vw] sm:basis-[40vw]">
            <div className="flex flex-col h-full pt-3 px-4 xl:px-4 pb-6">
                <div className="mb-4">
                    <h4 className="inline text-lg">
                        {planData.price != 'Free' && planData.price != 'Custom pricing' && (
                            <span className="text-sm opacity-60 font-normal">Starts at</span>
                        )}{' '}
                        {planData.price}
                        {planData.price != 'Free' && planData.price != 'Custom pricing' && (
                            <span className="text-sm opacity-60 font-normal">/mo</span>
                        )}
                    </h4>
                    &nbsp;
                    <p className="inline opacity-75 text-sm">{planData.priceSubtitle}</p>
                </div>
                <ul className="p-0 pb-8 list-none flex flex-col gap-2 [&_li]:text-sm xl:[&_li]:text-[15px]">
                    {planData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                <div className="mt-auto">
                    <CTA width="full" />
                </div>
            </div>
        </div>
    </div>
)

export const section = cntl`
    max-w-6xl
    xl:max-w-7xl
    mx-auto
    px-4
`

export const gridCell = cntl`
    bg-white
    flex 
    flex-col 
    px-4
    xl:px-8
    shadow-xl 
`

export const gridCellTop = cntl`
    bg-white/40
    rounded-t-md
    pt-4 
    xl:pt-8 
`

export const gridCellMid = cntl`
    pt-4
    xl:pt-6
    pb-8 
`

export const gridCellBottom = cntl`
    mb-12 
    lg:mb-0 
    pb-4
    xl:pb-8
    rounded-b-md
`

const internalProductNames: {
    [key: string]: string
} = {
    'product-analytics': 'product_analytics',
    'session-replay': 'session_replay',
    'feature-flags': 'feature_flags',
    'ab-testing': 'ab_testing',
    surveys: 'surveys',
}

const pricingGroupsToShowOverride: {
    [key: keyof typeof internalProductNames]: string[]
} = {
    'ab-testing': ['feature_flags'],
}

const Pricing = (): JSX.Element => {
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
    const { search } = useLocation()
    const [groupsToShow, setGroupsToShow] = useState<undefined | string[]>()
    const [currentProduct, setCurrentProduct] = useState<string | null>()

    const getGroupsToShow = (): string[] | undefined => {
        const product = new URLSearchParams(search).get('product')
        setCurrentProduct(product ? internalProductNames[product] : null)
        const defaultGroupsToShow = product ? [internalProductNames[product]] : undefined
        const groupsToShowOverride = product ? pricingGroupsToShowOverride[product] : undefined
        return groupsToShowOverride || defaultGroupsToShow
    }

    useEffect(() => {
        setGroupsToShow(getGroupsToShow())
    }, [search])

    return (
        <Layout
            parent={pricingMenu}
            activeInternalMenu={
                pricingMenu.children[
                    Object.values(internalProductNames).findIndex((name) => name === currentProduct) + 1
                ]
            }
        >
            <SelfHostOverlay open={currentModal === 'self host'} setOpen={setCurrentModal} />
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
            <section className="w-screen overflow-x-hidden">
                <div
                    className={`grid md:grid-cols-12 md:mt-8 md:gap-x-12 lg:gap-x-8 xl:gap-x-4 gap-y-3 md:gap-y-0 mb-4 md:px-4 items-center ${section}`}
                >
                    <div className="col-span-5">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl mt-0 mb-4">Plans &amp; pricing</h1>
                        <p className="text-base font-medium opacity-60 leading-tight mb-4">
                            PostHog offers usage-based pricing, not{' '}
                            <Tooltip
                                content={() => (
                                    <div className="max-w-sm">
                                        <strong className="block">Why not value-based pricing?</strong>
                                        <p className="mb-0">
                                            Value-based pricing tries to see how much money you're willing to pay.
                                            Usage-based pricing is like a utility - where we continually seek to lower
                                            costs and make money through volume.
                                        </p>
                                    </div>
                                )}
                            >
                                <span className="border-b border-dashed border-primary/50 dark:primary-dark/50">
                                    value-based pricing
                                </span>
                            </Tooltip>
                            .
                        </p>
                        <p className="text-base font-medium opacity-60 leading-tight">
                            Starts at $0/mo with a generous free tier.
                        </p>
                        <CTA />
                    </div>
                    <div className="col-span-7">
                        <div className="border border-light dark:border-dark p-4 bg-white dark:bg-accent-dark">
                            <div>
                                <div className="col-span-4">
                                    <div className="hidden md:grid grid-cols-16 items-center text-sm opacity-60 mb-2">
                                        <div className="col-span-6">Products</div>
                                        <div className="col-span-5">Monthly free allowance</div>
                                        <div className="col-span-4">
                                            Then starts at...{' '}
                                            <Tooltip content="Price decreases exponentially with greater volume. Click a product to see the full price breakdown.">
                                                <span className="relative">
                                                    <IconInfo className="w-4 h-4 inline-block -top-px" />
                                                </span>
                                            </Tooltip>
                                        </div>
                                        <div className="col-span-1"></div>
                                    </div>

                                    <div className="divide-y space-y-0.5 divide-light dark:divide-dark">
                                        {products.map((product, index) => (
                                            <div key={index}>
                                                <Link
                                                    to={product.link}
                                                    className="group grid grid-cols-8 md:grid-cols-16 items-center text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark p-1 rounded hover:bg-accent dark:hover:bg-accent-dark relative hover:scale-[1.005] active:scale-[.995] active:top-[.0125px]"
                                                >
                                                    <div className="col-span-7 md:col-span-6 flex gap-2 items-center md:pl-1 mb-1 md:mb-0">
                                                        {product.icon}
                                                        <span className="font-semibold text-[15px]">
                                                            {product.name}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={`col-span-4 md:col-span-5 text-sm order-3 2xs:ml-8 md:ml-0 ${
                                                            product.price &&
                                                            'rounded-tl rounded-bl bg-accent dark:bg-accent-dark md:bg-transparent dark:md:bg-transparent p-2 md:p-0'
                                                        } md:order-none`}
                                                    >
                                                        {product.freeLimit ? (
                                                            <>
                                                                <div className="text-xs font-normal opacity-60 md:hidden">
                                                                    Monthly free allowance
                                                                </div>
                                                                {product.freeLimit} {product.denomination}s
                                                                <span className="opacity-50 font-medium text-[13px]">
                                                                    /mo
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>{product.message}</>
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`col-span-4 text-sm order-4 2xs:mr-8 h-full md:h-auto md:mr-0 md:order-none ${
                                                            product.price &&
                                                            'rounded-tr rounded-br bg-accent dark:bg-accent-dark md:bg-transparent dark:md:bg-transparent p-2 md:p-0'
                                                        }`}
                                                    >
                                                        {product.price && (
                                                            <>
                                                                <div className="text-xs font-normal opacity-60 md:hidden">
                                                                    Then pricing starts at
                                                                </div>
                                                                ${product.price}
                                                                <span className="opacity-50 font-medium text-[13px]">
                                                                    /{product.denomination}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="col-span-1 flex justify-end">
                                                        <IconChevronDown className="w-8 h-8 -rotate-90 opacity-50 group-hover:opacity-75" />
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="hidden md:grid grid-cols-16 items-center text-sm opacity-60 mb-2">
                                        <div className="col-span-6">
                                            <strong>Every month</strong>
                                        </div>
                                        <div className="col-span-5">
                                            <strong>Free</strong>
                                        </div>
                                        <div className="col-span-4">
                                            <span
                                                onClick={() => {
                                                    const element = document.getElementById('plan-comparison')
                                                    const headerHeight = document.getElementById('header').offsetHeight // replace 'header' with the id of your header
                                                    scroll.scrollTo(element.offsetTop - 20 - headerHeight, {
                                                        duration: 800,
                                                        delay: 0,
                                                        smooth: 'easeInOutQuart',
                                                    })
                                                }}
                                                className="cursor-pointer text-red dark:text-yellow font-semibold"
                                            >
                                                Estimate your monthly bill{' '}
                                                <IconArrowRight className="w-4 h-4 rotate-90 inline-block" />
                                            </span>
                                        </div>
                                        <div className="col-span-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {!currentProduct && (
                <>
                    <section className={`${section} mb-12 mt-8 md:px-4 overflow-auto`}>
                        <h3 className="border-b border-light dark:border-dark pb-2 mb-6">Plans</h3>
                        <div className="col-span-4 overflow-x">
                            <div className="flex mr-8 md:mr-0 md:grid grid-cols-4 gap-4 mb-8 [&>*:nth-child(2)_>div]:border-red [&>*:nth-child(2)_>div]:border-3">
                                {plans.map((plan, index) => (
                                    <Plan key={index} planData={plan} />
                                ))}
                            </div>
                            <p className="text-center text-[15px] text-primary/75 dark:text-primary-dark/75">
                                All plans include unlimited team members, and unlimited tracked users.{' '}
                                <span className="text-red dark:text-yellow font-semibold">
                                    See full plan comparison
                                </span>
                            </p>
                        </div>
                    </section>
                </>
            )}

            {currentProduct && (
                <section className={`${section} mb-12 mt-8 md:px-4 overflow-auto`}>
                    <Plans showTitle groupsToShow={groupsToShow} />
                </section>
            )}

            <PricingCalculator />

            <section className={`${section} mb-12 mt-12 md:mt-24 md:px-4`}>
                <h2 className="text-2xl m-0 flex items-center border-b border-light dark:border-dark pb-4">
                    <span>More options</span>
                </h2>
                <OtherOptions />
            </section>
            <section className={`${section} mb-12 mt-12 md:mt-24 md:px-4`}>
                <h2 className="text-2xl m-0 mb-6 pb-6 border-b border-light dark:border-dark">Questions</h2>
                <FAQs />
            </section>
            <section className="bg-primary my-12 md:px-4">
                <Quote
                    className="py-12 md:py-16 px-5 bg-primary"
                    name={<span className="text-white">Cat Li</span>}
                    title={<span className="text-white">Product & Engineering Lead, Y Combinator</span>}
                    image={
                        <StaticImage
                            width={100}
                            height={100}
                            alt="Cat Li, Y Combinator"
                            src="../../images/cat.jpeg"
                            placeholder="none"
                            className="rounded-full"
                        />
                    }
                    quote={
                        <span className="text-white">
                            You always need to find ways to improve.{' '}
                            <span className="text-yellow">
                                PostHog is central to how we do that at{' '}
                                <span className="inline-block">Y Combinator</span>.
                            </span>{' '}
                            It helps us try ideas, measure results, and build better products.
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

export default Pricing
