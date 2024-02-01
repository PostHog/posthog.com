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
import { IconGraph, IconChevronDown, IconRewindPlay, IconToggle, IconFlask, IconMessage } from '@posthog/icons'

interface PlanData {
    title: string
    subtitle: string
    price: string
    priceSubtitle: string | JSX.Element
    features: string[]
}

const plans: PlanData[] = [
    {
        title: 'Totally free',
        subtitle: 'No credit card required',
        price: 'Free',
        priceSubtitle: (
            <span>
                Usage limits vary by product
                <br />
                <br />
            </span>
        ),
        features: ['Community support', '1 project', '1 year data retention'],
    },
    {
        title: 'Free with card',
        subtitle: 'Enter card to unlock extra features',
        price: '$0',
        priceSubtitle: 'Free up to product usage limits, then billed per use by product',
        features: ['Email support', '2 projects', '7 year data retention', 'Set billing limits', 'Team features (?)'],
    },
    {
        title: 'Pro',
        subtitle: 'Advanced security & compliance',
        price: '$450/mo',
        priceSubtitle: '+ usage-based pricing by product after monthly free allotment',
        features: [
            'Slack-based support',
            'Unlimited projects',
            '7 year data retention',
            'Set billing limits',
            'Team features (?)',
            'SSO, MFA + enforcement',
            'Audit logs',
            'Remove PostHog branding',
        ],
    },
]

const products = [
    {
        icon: <IconGraph className="w-6 h-6 text-blue" />,
        name: 'Product analytics',
        freeLimit: '1,000,000',
        denomination: 'event',
        price: '0.00031',
        link: '/pricing?product=product-analytics',
    },
    {
        icon: <IconRewindPlay className="w-6 h-6 text-yellow" />,
        name: 'Session replay',
        freeLimit: '15,000',
        denomination: 'recording',
        price: '0.0050',
        link: '/pricing?product=session-replay',
    },
    {
        icon: <IconToggle className="w-6 h-6 text-green" />,
        name: 'Feature flags',
        freeLimit: '1,000,000',
        denomination: 'request',
        price: '0.0001',
        link: '/pricing?product=feature-flags',
    },
    {
        icon: <IconFlask className="w-6 h-6 text-purple" />,
        name: 'A/B testing',
        freeLimit: '',
        denomination: '',
        price: '',
        link: '/pricing?product=ab-testing',
        message: <em className="font-normal opacity-75">Billed with feature flags</em>,
    },
    {
        icon: <IconMessage className="w-6 h-6 text-red" />,
        name: 'Surveys',
        freeLimit: '250',
        denomination: 'response',
        price: '0.2000',
        link: '/pricing?product=surveys',
    },
]

const Plan: React.FC<{ planData: PlanData }> = ({ planData }) => (
    <div className="flex flex-col border border-light dark:border-dark bg-white dark:bg-accent-dark text-center rounded shrink-0 basis-[80vw]">
        <div className="bg-light/50 dark:bg-dark/50 px-8 py-4">
            <h4 className="mb-1">{planData.title}</h4>
            <p className="opacity-75 text-sm mb-0">{planData.subtitle}</p>
        </div>
        <div className="flex flex-col h-full pt-4 px-8 pb-8">
            <h4 className="mb-1">{planData.price}</h4>
            <p className="opacity-75 text-sm">{planData.priceSubtitle}</p>
            <ul className="p-0 pb-8 list-none flex flex-col gap-2 [&_li]:text-[15px]">
                {planData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <div className="mt-auto">
                <CTA />
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
                    className={`grid md:grid-cols-2 md:mt-8 md:gap-x-12 lg:gap-x-8 xl:gap-x-4 gap-y-3 md:gap-y-0 mb-4 md:px-4 items-center ${section}`}
                >
                    <div className="md:order-2">
                        <div className="scale-[1.75] sm:scale-[1.4] md:scale-[1.1] lg:scale-[1.1] py-8 pl-20 sm:pl-28 md:p-0 md:scale-110 -mr-0 md:-mr-56 lg:-mr-64 xl:-mr-80 ">
                            <Lottie
                                options={{
                                    loop: false,
                                    autoplay: true,
                                    animationData: tractorHog,
                                }}
                            />
                        </div>
                    </div>
                    <div className="md:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl mt-0 mb-4">Pricing</h1>
                        <p className="text-base font-medium opacity-60 leading-tight mb-4">It's as easy as 1, 2.</p>
                        <p className="text-base font-medium opacity-60 leading-tight text-balance pr-12">
                            PostHog products carry usage-based pricing. Each product is billed separately. Pick a plan
                            and choose the products you want to use.
                        </p>
                        <CTA />
                    </div>
                </div>
            </section>

            {!currentProduct && (
                <>
                    <section className={`${section} mb-12 mt-8 md:px-4 overflow-auto`}>
                        <div className="md:grid grid-cols-5 gap-4 pb-8 md:pb-0">
                            <div>
                                <h3 className="mt-8 mb-1 text-xl">1. Pick a plan</h3>
                                <p className="text-sm opacity-75">
                                    The PostHog platform (Product OS) is free to use, or upgrade for extra features that
                                    work across our suite of products.
                                </p>
                            </div>
                            <div className="col-span-4 overflow-x">
                                <div className="flex mr-8 md:mr-0 md:grid grid-cols-3 gap-4 mb-8">
                                    {plans.map((plan, index) => (
                                        <Plan key={index} planData={plan} />
                                    ))}
                                </div>
                                <p className="text-center text-[15px] text-primary/75 dark:text-primary-dark/75">
                                    Need a custom MSA, SAML, priority support, and training? Do you have an in-house
                                    legal team? <Link to="/contact-sales">Talk to a human</Link>
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className={`${section} mb-24 mt-8 md:px-4 overflow-auto`}>
                        <div className="md:grid grid-cols-5 gap-4 pb-8 md:pb-0">
                            <div>
                                <h3 className="mt-8 mb-1 text-xl">2. Choose products</h3>
                                <p className="text-sm opacity-75">
                                    Usage-based pricing after a generous free tier. Set a billing limit so you never pay
                                    more than expected.
                                </p>
                            </div>
                            <div className="col-span-4">
                                <div className="grid grid-cols-10 items-center text-sm opacity-60 mb-2">
                                    <div className="col-span-3"></div>
                                    <div className="col-span-3">Monthly free allowance</div>
                                    <div className="col-span-3">Then pricing starts at...</div>
                                    <div className="col-span-1"></div>
                                </div>

                                <div className="divide-y space-y-0.5 divide-light dark:divide-dark">
                                    {products.map((product, index) => (
                                        <Link
                                            to={product.link}
                                            key={index}
                                            className="group grid grid-cols-10 items-center text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark p-1 rounded hover:bg-accent dark:hover:bg-accent-dark relative hover:scale-[1.005] active:scale-[.995] active:top-[.0125px]"
                                        >
                                            <div className="col-span-3 flex gap-2 items-center pl-1">
                                                {product.icon}
                                                <span className="font-semibold text-[15px]">{product.name}</span>
                                            </div>
                                            <div className="col-span-3 text-sm ">
                                                {product.freeLimit ? (
                                                    <>
                                                        {product.freeLimit} {product.denomination}s
                                                        <span className="opacity-50 font-medium text-[13px]">/mo</span>
                                                    </>
                                                ) : (
                                                    <>{product.message}</>
                                                )}
                                            </div>
                                            <div className="col-span-3 text-sm">
                                                {product.price && (
                                                    <>
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
                                    ))}
                                </div>
                            </div>
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
