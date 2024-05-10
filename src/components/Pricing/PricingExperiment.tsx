import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { FAQs } from 'components/Pricing/FAQs'
import { Quote } from 'components/Pricing/Quote'
import 'components/Pricing/styles/index.scss'
import { SEO } from '../seo'
import cntl from 'cntl'
import { animateScroll as scroll } from 'react-scroll'
import SelfHostOverlay from 'components/Pricing/Overlays/SelfHost'
import { PricingCalculator } from './PricingCalculator'
import { Addons } from './Addons'
import tractorHog from '../../../static/lotties/tractor-hog.json'
import Lottie from 'react-lottie'
import Plans, { InclusionOnlyRow, CTA as PlanCTA, PricingTiers } from './Plans'
import Link from 'components/Link'
import CTA from 'components/Home/CTA.js'
import {
    IconCalendar,
    IconCheck,
    IconChevronDown,
    IconHandMoney,
    IconInfo,
    IconRocket,
    IconShield,
    IconArrowRightDown,
} from '@posthog/icons'
import * as Icons from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import useProducts from './Products'
import { graphql, useStaticQuery } from 'gatsby'
import { BillingProductV2Type, BillingV2FeatureType, BillingV2PlanType } from 'types'
import Tabs from 'components/Tabs'
import { CallToAction } from 'components/CallToAction'

interface PlanData {
    title: string
    price: string
    priceSubtitle?: string | JSX.Element
    features: React.ReactNode[]
    CTAText?: string
    CTALink?: string
}

const planSummary = [
    {
        title: 'Totally free',
        price: 'Free',
        priceSubtitle: '- no credit card required',
        features: [
            'Generous usage limits on all products',
            'Basic product features',
            '1 project',
            '1 year data retention',
            'Community support',
        ],
    },
    {
        title: 'Ridiculously cheap',
        price: '$0',
        features: [
            'Generous free tier on all products',
            'Advanced product features',
            '6 projects',
            '7 year data retention',
            'Email support',
            'Pay only for what you use',
            <>
                <span className="opacity-60 text-sm">* Included with any product subscription</span>
            </>,
        ],
    },
    {
        title: 'Enterprise',
        price: 'Custom pricing',
        priceSubtitle: 'w/ fixed terms',
        features: [
            'Unlimited everything',
            'SAML SSO',
            'Custom MSA',
            'Dedicated support',
            'Personalized onboarding & training',
            'Advanced permissions & audit logs',
        ],
        CTAText: 'Get in touch',
        CTALink: '/contact-sales',
    },
]

const Plan: React.FC<{ planData: PlanData }> = ({ planData }) => (
    <div>
        <h4 className="text-lg mb-2">{planData.title}</h4>
        <div className="flex flex-col h-full border border-light dark:border-dark bg-white dark:bg-accent-dark rounded">
            <div className="flex flex-col h-full gap-4 pt-3 px-4 xl:px-4 pb-6">
                <div>
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
                <ul className="p-0 list-none flex flex-col gap-2 [&_li]:text-sm xl:[&_li]:text-[15px]">
                    {planData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                <div className="mt-auto">
                    <PlanCTA
                        type={planData.title === 'Ridiculously cheap' ? 'primary' : 'secondary'}
                        ctaText={planData.CTAText}
                        ctaLink={planData.CTALink}
                    />
                </div>
            </div>
        </div>
    </div>
)

const SectionLayout = ({ children }) => <section className={`${section} mb-12 mt-8 md:px-4`}>{children}</section>

const SectionHeader = ({ children }) => (
    <header className="border-b pb-1 border-light dark:border-dark">{children}</header>
)

const SectionColumns = ({ children }) => <div className="grid md:grid-cols-3 py-4">{children}</div>

const SectionMainCol = ({ children }) => <div className="md:col-span-2 pb-4 md:pb-0">{children}</div>

const SectionSidebar = ({ children, className = '' }) => (
    <div
        className={`col-span-1 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-light dark:border-dark pt-8 md:pt-0 md:pl-8 ${className}`}
    >
        {children}
    </div>
)

const SidebarList = ({ children }) => <ul className="flex flex-col gap-1">{children}</ul>

const SidebarListItem = ({ children }) => <li className="leading-snug">{children}</li>

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
                <p className="text-[15px]">
                    Most non-profits are eligible for 50% off. Get in touch through the app after signing up.
                </p>
            </li>
        </ul>
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

const allProductsData = graphql`
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

const Pricing = ({ type, plans, unit, inclusion_only, className = '' }) => {
    return (
        <div className={`${className} w-full max-w-[500px]`}>
            <h3 className="text-lg">Monthly pricing</h3>
            <div className="flex flex-col divide-light dark:divide-dark gap-1">
                {inclusion_only ? (
                    <InclusionOnlyRow plans={plans} />
                ) : (
                    <PricingTiers plans={plans} unit={unit} type={type} test={true} />
                )}
            </div>
        </div>
    )
}

const TabAddons = (props) => {
    const addons = props.addons.filter(({ inclusion_only }) => !inclusion_only)
    const [activeTab, setActiveTab] = useState(0)
    const activeAddon = addons[activeTab]
    return (
        <div className={props.className ?? ''}>
            <h3 className="text-lg">{props.title ?? 'Add-ons'}</h3>
            <div className="flex flex-col md:flex-row space-x-4">
                <div>
                    <Tabs
                        onClick={(_tab, index) => setActiveTab(index)}
                        activeTab={activeTab}
                        vertical
                        size="sm"
                        className=""
                        tabs={addons.map(({ name, icon_key, description }) => {
                            const Icon = Icons[icon_key]
                            return { title: name, icon: <Icon className="w-5" />, tooltip: description }
                        })}
                    />
                </div>
                <div className="flex-grow">
                    {activeAddon.inclusion_only ? (
                        <InclusionOnlyRow plans={activeAddon.plans} />
                    ) : (
                        <PricingTiers
                            plans={activeAddon.plans}
                            unit={activeAddon.unit}
                            type={activeAddon.type}
                            key={activeAddon.type}
                            test={true}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

const TabPA = (props) => {
    return (
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
            <Pricing {...props} className="flex-shrink-0" />
            <TabAddons addons={props.addons} className="flex-grow" title="Product analytics add-ons" />
        </div>
    )
}

const TabSR = (props) => {
    return (
        <div>
            <Pricing {...props} />
        </div>
    )
}

const TabFF = (props) => {
    return (
        <div>
            <Pricing {...props} />
        </div>
    )
}

const TabSurveys = (props) => {
    return (
        <div>
            <Pricing {...props} />
        </div>
    )
}

const tabContent = {
    'Product analytics': TabPA,
    'Session replay': TabSR,
    'Feature flags': TabFF,
    'A/B testing': TabFF,
    Surveys: TabSurveys,
}

const ProductTabs = ({ billingProducts }) => {
    const [activeTab, setActiveTab] = useState()
    const products = useProducts()
    const activeProduct = products[activeTab ?? 0]
    const productData = billingProducts.find(({ type }) => type === activeProduct?.type)

    return (
        <div>
            <Tabs
                activeTab={activeTab}
                onClick={(_tab, index) => setActiveTab(index)}
                size="sm"
                className="overflow-x-auto"
                tabs={products.map(({ name, icon, price, denomination, message }) => ({
                    title: name,
                    subtitle: price ? (
                        <>
                            <strong>${price}</strong>
                            <span className="opacity-75 text-sm">/{denomination}</span>
                        </>
                    ) : (
                        message
                    ),
                    icon: icon,
                }))}
            />
            {activeTab !== undefined && (
                <div className="my-8">{tabContent[activeProduct.name]({ ...productData })}</div>
            )}
            <div className="text-center mt-4 flex space-x-1 justify-center">
                {activeTab !== undefined && (
                    <p className="m-0 text-sm opacity-75">Prices descrease exponentially with scale.</p>
                )}
                <button
                    onClick={() => setActiveTab(activeTab === undefined ? 0 : undefined)}
                    className="text-red dark:text-yellow font-semibold text-sm cursor-pointer"
                >
                    {activeTab === undefined ? 'Show' : 'Hide'} pricing breakdown
                </button>
            </div>
        </div>
    )
}

const PlansTabs = () => {
    const plans = [
        {
            name: 'Totally free',
            description: 'No credit card required',
            html: (
                <>
                    <h4>Use PostHog free forever, with some limits</h4>
                    <div className="grid grid-cols-5 pb-4 text-[15px] [&>*:nth-child(3)]:opacity-60">
                        <div className="px-2 pb-2 border-b border-light dark:border-dark">&nbsp;</div>
                        <div className="col-span-2 pl-1 pb-2 border-b border-light dark:border-dark">
                            <strong>Totally free</strong>
                        </div>
                        <div className="col-span-2 pl-2 pb-2 border-b border-light dark:border-darkopacity-70">
                            <strong>Ridiculously cheap</strong>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-x-4 gap-y-2 text-[15px] [&>*:nth-child(3n+1)]:opacity-70 [&>*:nth-child(3n+3)]:opacity-70">
                        <div>Price</div>
                        <div className="col-span-2">Free forever</div>
                        <div className="col-span-2">Starts at $0/mo</div>

                        <div>Volume limits</div>
                        <div className="col-span-2">
                            Limited to free monthly allowance{' '}
                            <Tooltip content={() => <Discounts />} placement="top">
                                <IconInfo className="size-4 inline-block" />
                            </Tooltip>
                        </div>
                        <div className="col-span-2">Unlimited</div>

                        <div>Product features</div>
                        <div className="col-span-2">
                            Basic limits{' '}
                            <Tooltip content={() => <Discounts />} placement="top">
                                <IconInfo className="size-4 inline-block" />
                            </Tooltip>
                        </div>
                        <div className="col-span-2">All features</div>

                        <div>Support</div>
                        <div className="col-span-2">Community forums</div>
                        <div className="col-span-2">Email</div>

                        <div>
                            Add-ons{' '}
                            <Tooltip content={() => <Discounts />} placement="top">
                                <IconInfo className="size-4 inline-block" />
                            </Tooltip>
                        </div>
                        <div className="col-span-2">Not available</div>
                        <div className="col-span-2">Add-ons</div>
                    </div>
                </>
            ),
        },
        {
            name: 'Ridiculously cheap',
            description: 'Starts at $0/mo',
            html: (
                <>
                    <h4 className="mb-0">The "ridiculously cheap" plan</h4>
                    <p className="text-[15px] opacity-60">86% of customers use this plan</p>
                    <ul className="columns-2">
                        <li>Usage-based pricing</li>
                        <li>Generous monthly free tier</li>
                        <li>Up to 10 projects</li>
                        <li>7-year data retention</li>
                        <li>Email and community support</li>
                        <li>Unlimited team members</li>
                        <li>Unlimited tracked users</li>
                    </ul>
                </>
            ),
        },
        {
            name: 'Enterprise mode',
            description: '$20k/yr minimum spend',
            html: (
                <>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div>
                                <strong>
                                    Everything in <em>Ridiculously cheap</em> plus:
                                </strong>
                            </div>
                            <ul>
                                <li>SAML SSO enforcement</li>
                                <li>Teams add-on included</li>
                                <li>Custom MSA</li>
                                <li>Priority training, support</li>
                                <li>Advanced permissions</li>
                                <li>Audit logs</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>Starts at $20k/year w/ fixed annual terms</li>
                                <li>Annual contract with minimum commitment</li>
                                <li>No upcharge on usage-based prices</li>
                            </ul>
                            <div className="pt-4">
                                <CallToAction href="/contact-sales" size="sm">
                                    Talk to a customer engineer
                                </CallToAction>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
    ]

    const [activeTab, setActiveTab] = useState(1)
    const activePlan = plans[activeTab]

    return (
        <div className="md:pr-8">
            <Tabs
                activeTab={activeTab}
                onClick={(_tab, index) => setActiveTab(index)}
                size="sm"
                className="overflow-x-auto"
                tabs={plans.map(({ name, description, html }) => ({
                    title: name,
                    subtitle: description,
                    html: html,
                }))}
            />
            {activeTab !== undefined && <div className="my-8">{[activePlan.html]}</div>}
        </div>
    )
}

const PricingExperiment = ({
    groupsToShow,
    currentProduct,
}: {
    groupsToShow: undefined | string[]
    currentProduct?: string | null
}): JSX.Element => {
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
    const products = useProducts()
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const platformAndSupportProduct = billingProducts.find(
        (product: BillingProductV2Type) => product.type === 'platform_and_support'
    )
    const highestSupportPlan = platformAndSupportProduct?.plans?.slice(-1)[0]

    const [isPlanComparisonVisible, setIsPlanComparisonVisible] = useState(false)

    return (
        <>
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
                        <h1 className="text-3xl sm:text-4xl md:text-5xl mt-0 mb-4">
                            {currentProduct
                                ? billingProducts.find((p: BillingProductV2Type) => p.type === currentProduct)?.name ||
                                  (currentProduct == 'ab_testing' && 'A/B testing') ||
                                  'Product'
                                : 'Usage-based'}{' '}
                            pricing
                        </h1>
                        <p className="text-base font-medium opacity-60 leading-tight mb-4">
                            PostHog offers usage-based pricing, not{' '}
                            <Tooltip
                                content={() => (
                                    <div className="max-w-sm">
                                        <strong className="block">Why not value-based pricing?</strong>
                                        <p className="mb-2 text-sm">
                                            Value-based pricing is geared around testing how much money you're willing
                                            to pay.
                                        </p>
                                        <p className="mb-0 text-sm">
                                            Usage-based pricing is like a utility - where we continually seek to lower
                                            costs and make money through volume.
                                        </p>
                                    </div>
                                )}
                            >
                                <span className="border-b border-dashed border-primary/50 dark:border-primary-dark/50">
                                    value-based pricing
                                </span>
                            </Tooltip>
                            .
                        </p>
                        <p className="text-base font-medium opacity-60 leading-tight">
                            Starts at $0/mo with a generous free tier.
                        </p>
                        <PlanCTA />
                    </div>
                </div>
            </section>

            {!currentProduct && (
                <>
                    <section className={`${section} mb-12 mt-8 md:px-4`}>
                        <ProductTabs billingProducts={billingProducts} />
                    </section>

                    <SectionLayout>
                        <SectionHeader>
                            <h3>Pricing calculator</h3>
                        </SectionHeader>

                        <SectionColumns>
                            <SectionMainCol>tabs n stuff</SectionMainCol>
                            <SectionSidebar>
                                <div>
                                    <h4 className="text-lg mb-2">How it works</h4>
                                    <SidebarList>
                                        <SidebarListItem>Only pay for products you use</SidebarListItem>
                                        <SidebarListItem>
                                            <strong className="bg-yellow/50 italic">
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
                                            Not sure what your volume looks like? Add the tracking code to your site and
                                            check back in a few days – no credit card required.
                                        </SidebarListItem>
                                        <SidebarListItem>
                                            If something stupid happens, like you get an unexpected bill and you’re
                                            unhappy, we’ll pretty much always refund it.
                                        </SidebarListItem>
                                    </SidebarList>
                                </div>
                            </SectionSidebar>
                        </SectionColumns>
                    </SectionLayout>

                    <SectionLayout>
                        <SectionHeader>
                            <h3>One plan for most customers</h3>
                        </SectionHeader>

                        <SectionColumns>
                            <SectionMainCol>
                                <PlansTabs />
                            </SectionMainCol>
                            <SectionSidebar className="justify-between">
                                <div>
                                    <h4 className="text-lg mb-2">Plan FYIs</h4>
                                    <SidebarList>
                                        <SidebarListItem>
                                            Self-serve, no upsells, no need to "talk to sales"
                                        </SidebarListItem>
                                        <SidebarListItem>
                                            We don't do outbound sales. Everyone pays the same rates.
                                        </SidebarListItem>
                                        <SidebarListItem>
                                            You can set billing limits per product so you never get a surprise bill
                                        </SidebarListItem>
                                        <SidebarListItem>
                                            90% of our customers don't pay anything to use PostHog!
                                            <Tooltip
                                                content={() => (
                                                    <div className="max-w-[300px]">
                                                        <p className="mb-1">
                                                            <strong>... and we're cool with it!</strong>
                                                        </p>
                                                        <p className="text-[15px] mb-0">
                                                            Use PostHog for free within our generous free tier limits.
                                                            Exceed the free tier limits and you'll only pay for what you
                                                            use.
                                                        </p>
                                                    </div>
                                                )}
                                                placement="bottom"
                                            >
                                                <IconInfo className="size-4 inline-block ml-1" />
                                            </Tooltip>{' '}
                                        </SidebarListItem>
                                    </SidebarList>
                                </div>
                                <div>
                                    <span className="text-red dark:text-yellow font-semibold cursor-pointer">
                                        Show full plan comparison
                                    </span>
                                </div>
                            </SectionSidebar>
                        </SectionColumns>
                    </SectionLayout>

                    <section
                        className={`${section} ${
                            isPlanComparisonVisible
                                ? 'visible max-h-full opacity-1 mb-12 mt-8 md:px-4'
                                : 'overflow-y-hidden invisible max-h-0 opacity-0'
                        } transition duration-500 ease-in-out transform`}
                    >
                        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                            <div className="grid grid-cols-16 mb-1 min-w-[1000px]">
                                <div className="col-span-4 px-3 py-1">&nbsp;</div>
                                {platformAndSupportProduct?.plans
                                    ?.filter((plan: BillingV2PlanType) => plan.name !== 'Teams') // This is a temporary addition until the teams addon is shipped and the teams plan is removed
                                    ?.map((plan: BillingV2PlanType) => (
                                        <div className="col-span-4 px-3 py-1" key={plan.key}>
                                            <strong className="text-sm opacity-75">{plan.name}</strong>
                                        </div>
                                    ))}
                            </div>

                            <div className="grid grid-cols-16 mb-2 border-x border-b border-light dark:border-dark bg-white dark:bg-accent-dark [&>div]:border-t [&>div]:border-light dark:[&>div]:border-dark min-w-[1000px]">
                                <div className="col-span-4 bg-accent/50 dark:bg-black/75 px-3 py-2 text-sm">
                                    <strong className="text-primary/75 dark:text-primary-dark/75">Base price</strong>
                                </div>
                                {platformAndSupportProduct?.plans
                                    ?.filter((plan: BillingV2PlanType) => plan.name !== 'Teams') // This is a temporary addition until the teams addon is shipped and the teams plan is removed
                                    ?.map((plan: BillingV2PlanType) => {
                                        return (
                                            <div
                                                className="col-span-4 px-3 py-2 text-sm"
                                                key={`${plan.key}-base-price`}
                                            >
                                                {plan.included_if === 'no_active_subscription' ? (
                                                    <span>Free forever</span>
                                                ) : plan.included_if === 'has_subscription' ? (
                                                    <span>$0</span>
                                                ) : plan.unit_amount_usd ? (
                                                    `$${parseFloat(plan.unit_amount_usd).toFixed(0)}/mo`
                                                ) : plan.contact_support ? (
                                                    'Contact us'
                                                ) : (
                                                    'Contact us'
                                                )}
                                            </div>
                                        )
                                    })}
                                {highestSupportPlan?.features
                                    ?.filter(
                                        (f: BillingV2FeatureType) =>
                                            ![
                                                // TODO: this shouldn't be necessary, update billing products api to include entitlement_only info
                                                'role_based_access',
                                                'project_based_permissioning',
                                                'ingestion_taxonomy',
                                                'tagging',
                                            ].includes(f.key)
                                    )
                                    .map((feature: BillingV2FeatureType) => (
                                        <>
                                            <div className="col-span-4 bg-accent/50 dark:bg-black/75 px-3 py-2 text-sm">
                                                {feature.description ? (
                                                    <Tooltip content={feature.description}>
                                                        <strong className="border-b border-dashed border-light dark:border-dark cursor-help text-primary/75 dark:text-primary-dark/75">
                                                            {feature.name}
                                                        </strong>
                                                    </Tooltip>
                                                ) : (
                                                    <strong className="text-primary/75 dark:text-primary-dark/75">
                                                        {feature.name}
                                                    </strong>
                                                )}
                                            </div>
                                            {platformAndSupportProduct?.plans
                                                ?.filter((plan: BillingV2PlanType) => plan.name !== 'Teams') // This is a temporary addition until the teams addon is shipped and the teams plan is removed
                                                ?.map((plan: BillingV2PlanType) => {
                                                    const planFeature = plan?.features?.find(
                                                        (f) => f.key === feature.key
                                                    )
                                                    return (
                                                        <div
                                                            className="col-span-4 px-3 py-2 text-sm"
                                                            key={`${plan.key}-${feature.key}`}
                                                        >
                                                            {planFeature ? (
                                                                <div className="flex gap-x-2">
                                                                    {planFeature.note ?? (
                                                                        <IconCheck className="w-5 h-5 text-green" />
                                                                    )}
                                                                    {planFeature.limit && (
                                                                        <span className="opacity-75">
                                                                            <>
                                                                                {planFeature.limit} {planFeature.unit}
                                                                            </>
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                        </>
                                    ))}
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

            {!currentProduct && (
                <>
                    <PricingCalculator />

                    <Addons billingProducts={billingProducts} />

                    <section className={`${section} my-12 md:my-24 md:px-4`}>
                        <h2 className="text-xl m-0 flex gap-2 pl-1 mb-4 items-center border-b border-light dark:border-dark pb-2">
                            <span>Available discounts</span>
                        </h2>
                        <ul className="list-none p-0 grid md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-12 xl:gap-6">
                            <li>
                                <div className="flex items-center gap-2">
                                    <IconCalendar className="w-7 h-7 opacity-75" />
                                    <strong>Annual payment</strong>
                                </div>
                                <p className="pl-9 text-[15px]">
                                    <b>20% off</b> for customers who pay annually. Available for customers spending over
                                    $2k/mo. Get in touch through the app after signing up.
                                </p>
                            </li>
                            <li>
                                <div className="flex items-center gap-2">
                                    <IconRocket className="w-7 h-7 opacity-75" />
                                    <strong>Startups</strong>
                                </div>
                                <p className="pl-9 text-[15px] mb-3">
                                    If your startup has raised less than $5 million and is less than 2 years old, you
                                    may be interested in our startup program. <Link to="/startups">Learn more.</Link>
                                </p>
                            </li>
                            <li>
                                <div className="flex items-center gap-2">
                                    <IconHandMoney className="w-7 h-7 opacity-75" />
                                    <strong>Non-profits</strong>
                                </div>
                                <p className="pl-9 text-[15px]">
                                    50% off in most cases. Get in touch through the app after signing up.
                                </p>
                            </li>
                            <li>
                                <div className="flex items-center gap-2">
                                    <IconShield className="w-7 h-7 opacity-75" />
                                    <strong>Side project insurance</strong>
                                </div>
                                <p className="pl-9 text-[15px]">
                                    Unexpectedly go viral with your side project and get sticker shock? Get in touch and
                                    we'll help cover your first bill.
                                </p>
                            </li>
                        </ul>
                    </section>
                    <section className="relative">
                        <CTA />
                    </section>

                    <section className={`${section} mb-12 mt-12 md:px-4`}>
                        <h2 className="text-2xl m-0 mb-6 pb-6 border-b border-light dark:border-dark">Questions</h2>
                        <FAQs />
                    </section>
                </>
            )}

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
        </>
    )
}

export default PricingExperiment
