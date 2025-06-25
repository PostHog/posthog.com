import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import { FAQs } from 'components/Pricing/FAQs'
import { Quote } from 'components/Pricing/Quote'
import { SEO } from '../seo'
import cntl from 'cntl'
import { animateScroll as scroll } from 'react-scroll'
import SelfHostOverlay from 'components/Pricing/Overlays/SelfHost'
import { CTA as PlanCTA, PricingTiers } from './Plans'
import Link from 'components/Link'
import CTA from 'components/Home/CTA.js'
import { IconCheck, IconHandMoney, IconInfo, IconRocket } from '@posthog/icons'
import * as Icons from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import useProducts from 'hooks/useProducts'
import { graphql, useStaticQuery } from 'gatsby'
import { BillingProductV2Type, BillingV2FeatureType, BillingV2PlanType } from 'types'
import Tabs from 'components/Tabs'
import { CallToAction } from 'components/CallToAction'
import Tabbed from './PricingCalculator/Tabbed'
import { usePlatform } from './Platform/usePlatform'
import { motion } from 'framer-motion'

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
        title: 'Free',
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
        title: 'Pay-as-you-go',
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
        CTALink: '/talk-to-a-human',
    },
]

const Plan: React.FC<{ planData: PlanData }> = ({ planData }) => (
    <div>
        <h4 className="text-lg mb-2">{planData.title}</h4>
        <div className="flex flex-col h-full border border-primary bg-white dark:bg-accent-dark rounded">
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
                        type={planData.title === 'Pay-as-you-go' ? 'primary' : 'secondary'}
                        ctaText={planData.CTAText}
                        ctaLink={planData.CTALink}
                    />
                </div>
            </div>
        </div>
    </div>
)

const SectionLayout = ({ id = '', children }) => (
    <section id={id} className={`${section} mb-12 mt-8 md:px-4`}>
        {children}
    </section>
)

const SectionHeader = ({ children }) => <header className="border-b pb-1 border-primary">{children}</header>

const SectionColumns = ({ children }) => <div className="grid md:grid-cols-3 md:py-4">{children}</div>

const SectionMainCol = ({ children }) => <div className="md:col-span-2 pb-4 md:pb-0">{children}</div>

const SectionSidebar = ({ children, className = '' }) => (
    <div
        className={`col-span-1 flex flex-col gap-4 md:border-l border-primary border-t md:border-t-0 pt-4 md:pt-0 md:pl-8 md:ml-8 ${className}`}
    >
        {children}
    </div>
)

const SidebarList = ({ children }) => <ul className="tw-chevron-bullets flex flex-col gap-1 pl-4">{children}</ul>

const SidebarListItem = ({ children }) => <li className="leading-snug text-[15px]">{children}</li>

const Discounts = () => (
    <div className="max-w-sm">
        <h4>Discounts</h4>
        <ul className="list-none m-0 p-0 divide-y divide-primary">
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
                <strong>Nonprofit</strong>
                <p className="text-[15px] mb-2">
                    Are you a nonprofit? You can save more! Get in touch through the app after signing up and we'll give
                    you an additional discount.
                </p>
            </li>
        </ul>
    </div>
)

const getPlanPriceData = (plan) => {
    const data = {
        price: undefined,
        freeTier: undefined,
    }
    if (plan.flat_rate) {
        data.price = plan.unit_amount_usd
    } else {
        for (const [index, tier] of plan.tiers.entries()) {
            if (index === 0) {
                if (parseFloat(tier.flat_amount_usd) <= 0) {
                    data.freeTier = `First ${tier.up_to.toLocaleString()} ${plan.unit}s free every month`
                } else {
                    data.price = tier.unit_amount_usd
                    break
                }
            }
            if (index > 0) {
                data.price = tier.unit_amount_usd
                break
            }
        }
    }
    return data
}

const AddonContent = ({ name, description, plans }) => {
    const plan = plans[plans.length - 1]
    const { price, freeTier } = getPlanPriceData(plan)
    return (
        <div>
            <h5 className="m-0">{name}</h5>
            <p className="my-2">{description}</p>
            <h6 className="text-[15px] opacity-70 font-semibold m-0">Pricing</h6>
            <p className="m-0">
                <strong>${price}</strong>
                <span className="opacity-70 text-sm">/{plan.unit}</span>
            </p>
            {freeTier && <p className="opacity-70 text-sm m-0">{freeTier}</p>}
        </div>
    )
}

const AllAddons = () => {
    const platform = usePlatform()
    const { products } = useProducts()
    const platformAddons = platform.addons.filter((addon) => !addon.inclusion_only)
    const productAddons = products.flatMap((product) => product.billingData.addons)
    const allAddons = [...platformAddons, ...productAddons]
    const [activeTab, setActiveTab] = useState(0)
    const activeAddon = allAddons[activeTab]

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <Tabs
                vertical
                activeTab={activeTab}
                onClick={(_tab, index) => setActiveTab(index)}
                tabs={allAddons.map(({ name, icon_key, description }) => {
                    const Icon = Icons[icon_key]
                    return {
                        title: name,
                        icon: <Icon className="w-5 opacity-75" />,
                        tooltip: description,
                    }
                })}
            />
            <AddonContent {...activeAddon} />
        </div>
    )
}

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
                        legacy_product
                        features {
                            key
                            name
                            description
                            category
                            limit
                            note
                            entitlement_only
                            is_plan_default
                            unit
                        }
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
                                key
                                name
                                description
                                category
                                limit
                                note
                                entitlement_only
                                is_plan_default
                                unit
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
                    legacy_product
                    plans {
                        description
                        docs_url
                        features {
                            key
                            name
                            description
                            category
                            limit
                            note
                            entitlement_only
                            is_plan_default
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

const PricingExperiment = ({
    groupsToShow,
    currentProduct,
}: {
    groupsToShow: undefined | string[]
    currentProduct?: string | null
}): JSX.Element => {
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
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
            <SEO title="PostHog pricing" description="Find out how much it costs to use PostHog" />

            {/* This file is mostly just here for the graphql query until we refactor. */}
        </>
    )
}

export default PricingExperiment
