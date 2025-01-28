import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState, useEffect } from 'react'
import { FAQs } from 'components/Pricing/FAQs'
import { Quote } from 'components/Pricing/Quote'
import 'components/Pricing/styles/index.scss'
import { SEO } from '../seo'
import cntl from 'cntl'
import { animateScroll as scroll } from 'react-scroll'
import SelfHostOverlay from 'components/Pricing/Overlays/SelfHost'
import { CTA as PlanCTA } from './Plans'
import Link from 'components/Link'
import CTA from 'components/Home/CTA.js'
import { IconHandMoney, IconRocket } from '@posthog/icons'
import * as Icons from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import Tabbed from './PricingCalculator/Tabbed'
import { PlanColumns } from './Test/PlanColumns'
import PlanContent from './Test/PlanContent'
import { section, SectionLayout, SectionHeader, SectionColumns, SectionMainCol, SectionSidebar } from './Test/Sections'
import { PaidPricing } from './Test/PaidPricing'
import { Addons } from './Test/Addons'
import { SimilarProducts } from './Test/SimilarProducts'
import { Reviews } from './Test/Reviews'
import ImageSlider from './Test/ImageSlider'
import Header from './Test/Header'
import { Link as ScrollLink } from 'react-scroll'
import PurchasedWith from './Test/PurchasedWith'
import { PRODUCT_COUNT } from '../../constants'

const SidebarList = ({ children }) => <ul className="tw-chevron-bullets flex flex-col gap-1 pl-4">{children}</ul>

const SidebarListItem = ({ children }) => <li className="leading-snug text-[15px]">{children}</li>

const Discounts = () => (
    <div className="max-w-sm">
        <h4>Discounts</h4>
        <ul className="list-none m-0 p-0 divide-y divide-light dark:divide-dark">
            <li className="relative pl-7">
                <IconRocket className="size-5 absolute left-0 top-0.5 opacity-50" />
                <strong>Startups</strong>
                <p className="text-[15px]">
                    If your startup has raised less than $5 million and is less than 2 years old, you may be interested
                    in our startup program.{' '}
                    <Link href="/startups" className="text-red dark:text-yellow font-semibold">
                        Learn more
                    </Link>
                </p>
            </li>
            <li className="relative pl-7 pt-4">
                <IconHandMoney className="size-5 absolute left-0 top-4.5 opacity-50" />
                <strong>Non-profits</strong>
                <p className="text-[15px] mb-2">
                    Most non-profits are eligible for 50% off. Get in touch through the app after signing up.
                </p>
            </li>
        </ul>
    </div>
)

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

export const allProductsData = graphql`
    query {
        allProductData {
            nodes {
                products {
                    description
                    docs_url
                    image_url
                    icon_key
                    inclusion_only
                    contact_support
                    addons {
                        contact_support
                        description
                        docs_url
                        image_url
                        icon_key
                        inclusion_only
                        name
                        type
                        unit
                        plans {
                            description
                            docs_url
                            image_url
                            name
                            plan_key
                            product_key
                            unit
                            flat_rate
                            unit_amount_usd
                            features {
                                description
                                key
                                name
                            }
                            tiers {
                                current_amount_usd
                                current_usage
                                flat_amount_usd
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                    name
                    type
                    unit
                    usage_key
                    plans {
                        description
                        docs_url
                        features {
                            description
                            key
                            limit
                            name
                            note
                            unit
                        }
                        free_allocation
                        image_url
                        included_if
                        name
                        plan_key
                        product_key
                        contact_support
                        unit_amount_usd
                        tiers {
                            current_amount_usd
                            current_usage
                            flat_amount_usd
                            unit_amount_usd
                            up_to
                        }
                        unit
                    }
                }
            }
        }
    }
`

const FreeTierItem = ({ icon, icon2, name, allocation, description }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-1 items-center leading-none">
                {icon}
                {icon2 && <>+ {icon2}</>}
            </div>
            <strong className="text-[15px] text-center leading-none mt-2 mb-1">{name}</strong>
            <div
                className={`text-sm text-center text-balance leading-none ${description ? 'opacity-75' : 'text-green'}`}
            >
                {description ? description : allocation}
            </div>
        </div>
    )
}

const morePricingReads = [
    // {
    //     href: '/events',
    //     icon: <Icons.IconCursorClick className="text-purple size-7" />,
    //     title: 'Event types',
    //     description: 'The cheapest events in the biz',
    // },
    // {
    //     href: '/addons',
    //     icon: <Icons.IconPuzzle className="text-seagreen size-7" />,
    //     title: 'Add-ons',
    //     description: 'Extra functionality if you need it',
    // },
    {
        href: '/pricing/philosophy',
        icon: <Icons.IconLightBulb className="text-yellow size-7" />,
        title: 'Pricing philosophy',
        description: "tl;dr: It's designed to make you happy.",
    },
    {
        href: '/sales',
        icon: <Icons.IconPercentage className="text-green size-7" />,
        title: 'How we do "sales"',
        description: "We don't sell you. You'll sell yourself.",
    },
]

const PricingExperiment = (): JSX.Element => {
    const [animateFreeTiers, setAnimateFreeTiers] = useState(false)
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const [activePlan, setActivePlan] = useState('free')

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const plan = params.get('plan')
        if (plan === 'free' || plan === 'paid') {
            setActivePlan(plan)
        }
    }, [])

    const handleFreePlanClick = () => {
        setActivePlan('free')
        window.history.pushState(null, '', '?plan=free')
    }

    const handlePaidPlanClick = () => {
        setActivePlan('paid')
        window.history.pushState(null, '', '?plan=paid')
    }

    return (
        <>
            <SelfHostOverlay open={currentModal === 'self host'} setOpen={setCurrentModal} />
            <SEO title="PostHog pricing" description="Find out how much it costs to use PostHog" />

            <div className="md:grid grid-cols-16 my-8 px-4 xl:px-8 2xl:px-12">
                <div className="col-span-8 lg:col-span-4 mb-4 md:mb-0 md:border-b border-light dark:border-dark">
                    <div className="md:hidden mb-2">
                        <Header />
                    </div>

                    {/* <div className="aspect-square bg-accent dark:bg-accent-dark w-full flex items-center justify-center">
                                image
                            </div> */}
                    <ImageSlider />
                </div>

                <div className="@container col-span-8 lg:col-span-7 lgxl:col-span-8 md:border-b border-light dark:border-dark md:pl-8 lg:pl-6 xl:pl-10 md:mr-8 lg:mr-6 xl:mr-10 pb-4">
                    <div className="hidden md:block">
                        <Header />
                    </div>

                    <p className="mb-4">
                        PostHog is designed to grow with you. Our <strong>{PRODUCT_COUNT}+ products</strong> (and
                        counting) will take you from idea to product-market fit to IPO and beyond. 🚀
                    </p>

                    <p className="mb-4">
                        Our generous free tier means{' '}
                        <strong>
                            <em>more than 90% of companies use PostHog for free.</em>
                        </strong>{' '}
                        Only add a card if you need more than the free tier limits, advanced features, or want more
                        projects. You still keep the same monthly free volume, even after upgrading.
                    </p>

                    <div className="inline-block">
                        <div className="flex justify-between items-end gap-4">
                            <div>
                                {activePlan === 'free' ? (
                                    <>
                                        <h3 className="mb-0 text-xl">Free</h3>
                                        <p className="text-sm mb-4">No credit card required</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm mb-0">From</p>
                                        <h3 className="mb-4 text-xl">
                                            $0<span className="opacity-70 font-normal text-base">/mo</span>
                                        </h3>
                                    </>
                                )}
                            </div>
                            <div>
                                <ScrollLink to="plans" offset={-120} smooth className="inline-block mb-4">
                                    <button className="text-red dark:text-yellow font-semibold cursor-pointer text-sm">
                                        Compare plans
                                    </button>
                                </ScrollLink>
                            </div>
                        </div>

                        <ul className="list-none flex flex-col @md:flex-row gap-2 p-0 -mx-4 px-4 md:mx-0 pb-1 md:pb-0 md:px-0 md:mb-6 overflow-x-auto">
                            <li>
                                <button
                                    onClick={handleFreePlanClick}
                                    className={`w-full flex flex-col py-2 px-4 rounded-md border-2 @md:min-w-56 ${
                                        activePlan === 'free'
                                            ? 'border-yellow bg-white dark:bg-white/5'
                                            : 'border-light hover:border-dark/50 dark:border-dark dark:hover:border-light/50 bg-transparent'
                                    }`}
                                >
                                    <strong className="whitespace-nowrap">Totally free</strong>
                                    <span className="text-sm opacity-75 whitespace-nowrap">
                                        Free - no credit card required
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handlePaidPlanClick}
                                    className={`w-full flex flex-col py-2 px-4 rounded-md border-2 @md:min-w-56 ${
                                        activePlan === 'free'
                                            ? 'border-light hover:border-dark/50 dark:border-dark dark:hover:border-light/50 bg-transparent'
                                            : 'border-yellow bg-white dark:bg-white/5'
                                    }`}
                                >
                                    <strong className="whitespace-nowrap">Ridiculously cheap</strong>
                                    <span className="text-sm opacity-75 whitespace-nowrap">Usage-based pricing</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="border-t border-light dark:border-dark mt-4 pt-4 h-px"></div>

                    <div
                        className={`@container transition-all rounded-md border ${
                            animateFreeTiers
                                ? 'animate-flash bg-[#FAE9CE] dark:bg-[#463B2A] border-yellow -mx-2 -mt-1 px-2 pt-1'
                                : 'bg-transparent border-transparent'
                        }`}
                        onAnimationEnd={() => setAnimateFreeTiers(false)}
                    >
                        <div className="flex items-baseline gap-1 mb-3">
                            <h4 className="mb-0 text-lg">Free tier on all plans</h4>
                            <span className="opacity-75 text-sm">(resets monthly)</span>
                        </div>

                        <div className="grid grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 mb-2 gap-4 @lg:gap-x-2 @lg:gap-y-2">
                            <FreeTierItem
                                name="Analytics"
                                allocation="1M events"
                                icon={<Icons.IconGraph className="text-blue size-5" />}
                                icon2={<Icons.IconPieChart className="text-green size-5" />}
                            />
                            <FreeTierItem
                                name="Session replay"
                                allocation="5K recordings"
                                icon={<Icons.IconRewindPlay className="text-yellow size-5" />}
                            />
                            <FreeTierItem
                                name="Feature flags"
                                allocation="1M requests"
                                icon={<Icons.IconToggle className="text-seagreen size-5" />}
                            />
                            <FreeTierItem
                                name="Experiments"
                                description="Billed with feature flags"
                                icon={<Icons.IconFlask className="text-purple size-5" />}
                            />
                            <FreeTierItem
                                name="Surveys"
                                allocation="250 responses"
                                icon={<Icons.IconMessage className="text-red size-5" />}
                            />
                            <FreeTierItem
                                name="Data warehouse"
                                allocation="1M rows"
                                icon={<Icons.IconDatabase className="text-purple size-5" />}
                            />
                        </div>
                    </div>
                </div>

                <aside className="md:col-span-16 lg:col-span-5 lgxl:col-span-4">
                    <div className="bg-white dark:bg-white/5 rounded-md border border-light dark:border-dark py-4 px-6 h-full">
                        <div className="flex flex-col md:grid grid-cols-2 lg:flex justify-between h-full">
                            <PlanContent activePlan={activePlan} onFreeTierClick={() => setAnimateFreeTiers(true)} />
                        </div>
                    </div>
                </aside>
            </div>

            <PaidPricing />

            <PlanColumns billingProducts={billingProducts} highlight="free" />

            <Addons />
            <SimilarProducts />
            <PurchasedWith />
            <Reviews />

            <SectionLayout id="calculator">
                <SectionHeader>
                    <h3>Pricing calculator</h3>
                </SectionHeader>

                <div className="flex flex-col lgxl:flex-row lgxl:gap-8 2xl:gap-12 items-start pt-4">
                    <Tabbed />

                    <div className="grid md:grid-cols-2 lgxl:grid-cols-1 gap-8 mt-12 lgxl:mt-0 max-w-6xl lgxl:max-w-xs 2xl:max-w-sm sticky top-4">
                        <div>
                            <h4 className="text-lg mb-2">How our pricing works</h4>
                            <SidebarList>
                                <SidebarListItem>Only pay for products you use</SidebarListItem>
                                <SidebarListItem>
                                    <strong className="bg-yellow/50 dark:bg-white/20 italic inline py-0.5">
                                        Generous free tier for each product (resets monthly)
                                    </strong>
                                </SidebarListItem>
                                <SidebarListItem>
                                    You can set billing limits per product so you never get a surprise bill
                                </SidebarListItem>
                                <SidebarListItem>
                                    We also offer{' '}
                                    <Tooltip content={() => <Discounts />} placement="top">
                                        <strong className="text-red dark:text-yellow border-b border-dashed border-light dark:border-dark cursor-help text-primary/75 dark:text-primary-dark/75">
                                            discounts
                                        </strong>
                                    </Tooltip>{' '}
                                    for startups and non-profits
                                </SidebarListItem>
                            </SidebarList>
                        </div>
                        <div>
                            <h4 className="text-lg mb-2">Estimating usage</h4>
                            <SidebarList>
                                <SidebarListItem>
                                    Not sure what your volume looks like? Add the tracking code to your site and check
                                    back in a few days – no credit card required.
                                </SidebarListItem>
                                <SidebarListItem>
                                    If something stupid happens and you get an unexpected bill (like if{' '}
                                    <Link href="/side-project-insurance">
                                        your side project unexpectedly goes viral
                                    </Link>{' '}
                                    or you’re unhappy), we’ll pretty much always refund it!
                                </SidebarListItem>
                                <SidebarListItem>
                                    We've also written{' '}
                                    <Link href="/docs/billing/estimating-usage-costs">this handy guide</Link> to help!
                                </SidebarListItem>
                            </SidebarList>
                        </div>
                    </div>
                </div>
            </SectionLayout>

            <SectionLayout>
                <div className="bg-accent dark:bg-accent-dark p-4 pb-6 md:pb-4 rounded border border-light dark:border-dark flex flex-col md:flex-row justify-between md:items-center gap-4 -mt-4">
                    <div>
                        <h3 className="mb-1 text-xl">Give PostHog a try</h3>
                        <p className="mb-0 text-[15px]">
                            No need to pick a plan - try our free version and decide if you want advanced features
                            later!
                        </p>
                    </div>
                    <div>
                        <PlanCTA />
                    </div>
                </div>
            </SectionLayout>

            <SectionLayout>
                <SectionHeader>
                    <h3 className="mb-2">More pricing reads</h3>
                    <p>
                        If you've made it this far, you might be interested in these other pages about how our pricing
                        works.
                    </p>
                </SectionHeader>
                <ul className="mt-4 list-none -mx-4 px-4 md:mx-0 md:px-0 xl:-mx-8 xl:px-8 2xl:-mx-12 2xl:px-12 pb-2 gap-4 grid grid-flow-col auto-cols-max overflow-x-auto">
                    {morePricingReads.map((item, index) => (
                        <li key={index} className="py-0.5">
                            <Link
                                href={item.href}
                                className="h-full bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md w-80 p-4 flex gap-3 transition-transform relative hover:scale-[1.01] hover:top-[-.5px] active:scale-[.99] active:top-[.5px] text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark"
                            >
                                <div>{item.icon}</div>
                                <div>
                                    <h4 className="m-0 text-lg pb-0.5">{item.title}</h4>
                                    <p className="m-0 text-[15px] opacity-75 leading-tight">{item.description}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SectionLayout>

            <section id="faq" className={`${section} mb-20 mt-12 md:px-4`}>
                <h2 className="text-2xl m-0 mb-6 pb-6 border-b border-light dark:border-dark">Pricing FAQ</h2>
                <FAQs />
                <p className="my-6 pt-6 relative before:w-48 before:absolute before:top-0 before:left-0 before:border-t before:border-light before:dark:border-dark before:h-px">
                    Have another pricing-related question?{' '}
                    <Link href="/questions/topic/pricing">Ask in our community forum</Link>
                </p>
            </section>

            <section className="relative">
                <CTA />
            </section>

            <section className="bg-primary my-12 md:px-4">
                <Quote
                    className="py-12 md:py-16 px-5 bg-primary"
                    name={<span className="text-white">Cat Li</span>}
                    title={<span className="text-white">Product & Engineering Lead, Y Combinator</span>}
                    image={
                        <CloudinaryImage
                            width={100}
                            height={100}
                            alt="Cat Li, Y Combinator"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/cat.jpeg"
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
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Pricing/images/vacation-hog.png"
                        alt="Vacation Hog"
                        width={252}
                        placeholder="none"
                    />
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
        </>
    )
}

export default PricingExperiment
