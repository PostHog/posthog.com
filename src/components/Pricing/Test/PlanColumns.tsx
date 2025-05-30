import { IconCheck, IconChevronDown } from '@posthog/icons'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import React, { useState } from 'react'
import { CTA as PlanCTA } from '../Plans'
import { section, SectionHeader } from './Sections'
import { BillingV2PlanType } from 'types'

interface PlanData {
    title: string
    subtitle: string
    pricePreface?: string
    price: string
    priceSubtitle?: string | JSX.Element
    features: React.ReactNode[]
    projects: number | 'Unlimited'
    dataRetention: string
    CTAText?: string
    CTALink?: string
    intent: 'free' | 'paid' | 'enterprise'
}

const Plan: React.FC<{ planData: PlanData }> = ({ planData }) => {
    return (
        <>
            <div className="flex flex-col h-full border border-light dark:border-dark bg-white dark:bg-accent-dark rounded-md relative">
                {planData.title === 'Free' && (
                    <div className="absolute -top-6 right-4 !border-2 border-yellow bg-white dark:bg-dark rounded-sm text-center py-1 px-2">
                        <strong className="block text-yellow text-sm">Just pick this one!</strong>
                        <p className="text-xs mb-0 text-opacity-75">You can upgrade later.</p>
                    </div>
                )}
                <div className="flex flex-col h-full gap-4 pt-3 px-4 xl:px-4 pb-6">
                    <div>
                        <h4 className="text-lg mb-0">
                            <em>{planData.title}</em>
                        </h4>
                        <p className="text-[15px] mb-0 opacity-70">{planData.subtitle}</p>
                    </div>
                    <div>
                        <h4 className="inline text-lg">
                            {planData.price != 'Free' && (
                                <span className="text-sm opacity-60 font-normal">{planData.pricePreface}</span>
                            )}{' '}
                            {planData.price}
                            {planData.price != 'Free' && <span className="text-sm opacity-60 font-normal">/mo</span>}
                        </h4>
                        &nbsp;
                        <p className="inline opacity-75 text-sm">{planData.priceSubtitle}</p>
                    </div>
                    <ul className="p-0 list-none flex flex-col gap-2 [&_li]:text-sm xl:[&_li]:text-[15px]">
                        {planData.features.map((feature, index) => (
                            <li key={index} className="flex flex-col relative pl-7">
                                <IconCheck className="size-5 text-green absolute top-0 left-0" />
                                <strong>{feature.name}</strong>
                                {feature.description && (
                                    <p className="mb-0 opacity-70 text-sm">{feature.description}</p>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto">
                        <div className="space-y-2 mb-4">
                            <p className="mb-0 font-bold text-sm">
                                {planData.projects} {planData.projects === 1 ? 'project' : 'projects'}
                            </p>
                            <p className="mb-0 font-bold text-sm">{planData.dataRetention} data retention</p>
                        </div>
                        <PlanCTA
                            type={planData.title === 'Free' ? 'primary' : 'secondary'}
                            ctaText={planData.CTAText}
                            ctaLink={planData.CTALink}
                            width="full"
                            intent={planData.intent}
                            className="!block"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const planSummary = [
    {
        title: 'Free',
        subtitle: 'No credit card required',
        price: 'Free',
        features: [
            {
                name: 'Generous free monthly tier',
                description: 'Usage capped at free tier limits',
            },
            {
                name: 'Like, totally free',
                description: 'Almost all product features, no credit card required',
            },
            {
                name: 'Community support',
                description: 'Support via community forum',
            },
        ],
        projects: 1,
        dataRetention: '1-year',
        intent: 'free',
    },
    {
        title: 'Pay-as-you-go',
        subtitle: 'Usage-based pricing after free tier',
        pricePreface: 'Starts at',
        price: '$0',
        features: [
            {
                name: 'Generous free monthly tier',
                description: 'Pay nothing if below free tier limits',
            },
            {
                name: 'Usage-based pricing',
                description: 'Set billing limits per product so you never pay more than expected.',
            },
            {
                name: 'Standard support',
                description: 'Support via email, Slack-based over $2k/mo',
            },
        ],
        projects: 6,
        dataRetention: '7-year',
        intent: 'paid',
    },
]

const AllPlansInclude = () => {
    return (
        <div className="inline-flex lg:inline-flex w-full flex-col md:flex-row lg:flex-col md:gap-12 lg:gap-4 lg:pl-6">
            <p className="font-bold text-[15px] lg:mt-4 mb-2 lg:mb-0">All plans include:</p>
            <ul className="flex-1 list-none pl-0 xs:grid grid-cols-2 lg:flex gap-x-4 xs:gap-x-2 md:gap-x-6 lg:gap-x-4 gap-y-2 lg:gap-1 lg:flex-col">
                <li className="flex gap-1 items-start text-[15px]">
                    <IconCheck className="w-5 h-5 text-green relative top-0.5" />
                    Unlimited team members
                </li>
                <li className="flex gap-1 items-start text-[15px]">
                    <IconCheck className="w-5 h-5 text-green relative top-0.5" />
                    No limits on tracked users
                </li>
                <li className="flex gap-1 items-start text-[15px]">
                    <IconCheck className="w-5 h-5 text-green relative top-0.5" />
                    API access
                </li>
                <li className="flex gap-1 items-start text-[15px]">
                    <IconCheck className="w-5 h-5 text-green relative top-0.5" />
                    Google, Github, and Gitlab SSO
                </li>
            </ul>
        </div>
    )
}

export const PlanColumns = ({ billingProducts, highlight = 'paid' }) => {
    const platformAndSupportProduct = billingProducts.find(
        (product: BillingProductV2Type) => product.type === 'platform_and_support'
    )

    const [isPlanComparisonVisible, setIsPlanComparisonVisible] = useState(false)

    const mainPlans = platformAndSupportProduct?.plans?.filter((p) => !p.contact_support)
    const highestSupportPlan = mainPlans.slice(-1)[0]
    const highestPlanFeatures = highestSupportPlan?.features?.filter(
        (f: BillingV2FeatureType) => f.entitlement_only !== true
    )

    return (
        <>
            <section id="plans" className={`${section} mt-8 !mb-12 md:px-4`}>
                <SectionHeader>
                    <h3>Compare plans</h3>
                </SectionHeader>
                <div className="mt-4 -mx-4 lg:mx-0 px-4 lg:px-0 mb-4 lg:mb-0 overflow-x-auto">
                    <div className="pt-6 pb-2">
                        <div
                            className={`grid grid-cols-[repeat(3,_minmax(300px,_1fr))] md:grid-cols-[repeat(3,_minmax(300px,_1fr))_1fr] gap-4 mb-4 ${
                                highlight === 'free'
                                    ? '[&>*:nth-child(2)_>div]:border-yellow [&>*:nth-child(2)_>div]:border-3'
                                    : '[&>*:nth-child(3)_>div]:border-yellow [&>*:nth-child(3)_>div]:border-3'
                            }`}
                        >
                            <div className="hidden lg:block col-span-3 md:col-span-1">
                                <AllPlansInclude />
                                <div className="md:gap-12 xl:pl-6 mt-6">
                                    <p className="font-bold text-[15px] xl:mt-4 mb-2">
                                        Looking for features for larger teams?
                                    </p>
                                    <Link to="/platform-addons">Check out our platform add-ons.</Link>
                                </div>
                            </div>
                            {planSummary.map((plan, index) => (
                                <Plan key={index} planData={plan} />
                            ))}
                            <div className="col-span-0 sm:col-span-1 hidden lg:block"></div>
                        </div>
                    </div>
                </div>
                <div className="lg:hidden mb-8">
                    <AllPlansInclude />
                    <div className="md:gap-12 xl:pl-6 mt-6">
                        <p className="font-bold text-[15px] xl:mt-4 mb-2">Looking for features for larger teams?</p>
                        <Link to="/platform-addons">Check out our platform add-ons.</Link>
                    </div>
                </div>
                <p
                    className="text-red dark:text-yellow font-bold cursor-pointer flex items-center justify-center mb-0"
                    onClick={() => setIsPlanComparisonVisible(!isPlanComparisonVisible)}
                >
                    {isPlanComparisonVisible ? (
                        <>
                            <IconChevronDown className="w-8 rotate-0 transition-all" />
                            Hide full plan comparison
                        </>
                    ) : (
                        <>
                            <IconChevronDown className="w-8 -rotate-90 transition-all" />
                            Show full plan comparison
                        </>
                    )}
                </p>

                <div
                    className={`${
                        isPlanComparisonVisible
                            ? 'visible max-h-full opacity-1 mb-12 mt-2 md:px-4'
                            : 'overflow-y-hidden invisible max-h-0 opacity-0'
                    } transition duration-500 ease-in-out transform`}
                >
                    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                        <div className="grid grid-cols-12 sm:grid-cols-16 mb-1 min-w-[1000px]">
                            <div className="col-span-4 px-3 py-1">&nbsp;</div>
                            {mainPlans.map((plan: BillingV2PlanType) => (
                                <div className="col-span-4 px-3 py-1" key={plan.key}>
                                    <strong className="text-sm opacity-75">{plan.name}</strong>
                                </div>
                            ))}
                            <div
                                key="empty-cell-plan-names"
                                className="col-span-0 sm:col-span-4 hidden sm:block px-3 py-2 text-sm empty-cell"
                            ></div>
                        </div>

                        <div className="grid grid-cols-12 sm:grid-cols-16 mb-2 border-l border-light dark:border-dark bg-white dark:bg-accent-dark [&>div]:border-t [&>div]:border-light dark:[&>div]:border-dark min-w-[1000px]">
                            <div className="col-span-4 bg-accent/50 dark:bg-black/75 px-3 py-2 text-sm">
                                <strong className="text-primary/75 dark:text-primary-dark/75">Base price</strong>
                            </div>
                            {/* Header */}
                            {mainPlans.map((plan: BillingV2PlanType, idx: number) => {
                                // Add border-r to the last plan column (Pay-as-you-go)
                                const isLast = idx === mainPlans.length - 1
                                return (
                                    <div
                                        className={`main col-span-4 px-3 py-2 text-sm${
                                            isLast ? ' border-r border-light dark:border-dark' : ''
                                        }`}
                                        key={`${plan.key}-base-price`}
                                    >
                                        {plan.included_if === 'no_active_subscription' ? (
                                            <span>Free forever</span>
                                        ) : plan.included_if === 'has_subscription' ? (
                                            <span>$0</span>
                                        ) : plan.unit_amount_usd ? (
                                            `$${parseFloat(plan.unit_amount_usd).toFixed(0)}/mo`
                                        ) : (
                                            'Contact us'
                                        )}
                                    </div>
                                )
                            })}
                            <div
                                key="empty-cell-header"
                                className="col-span-0 sm:col-span-4 hidden sm:block px-3 py-2 text-sm empty-cell bg-[#eeefe9] dark:bg-[#1d1f27] !border-none"
                            ></div>
                            {/* Rows */}
                            {highestPlanFeatures.map((feature: BillingV2FeatureType, idx_outer: number) => (
                                <>
                                    {/* Feature names */}
                                    <div
                                        className={`col-span-4 bg-accent/50 dark:bg-black/75 px-3 py-2 text-sm ${
                                            idx_outer === highestPlanFeatures?.length - 1
                                                ? 'border-b border-light dark:border-dark'
                                                : ''
                                        }`}
                                    >
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
                                    {/* Feature values */}
                                    {mainPlans.map((plan: BillingV2PlanType, idx_inner: number) => {
                                        const planFeature = plan?.features?.find((f) => f.key === feature.key)
                                        const isLastColumn = idx_inner === mainPlans.length - 1
                                        const isLastRow = idx_outer === highestPlanFeatures?.length - 1
                                        return (
                                            <div
                                                className={`inside col-span-4 px-3 py-2 text-sm ${
                                                    isLastColumn ? 'border-r border-light dark:border-dark' : ''
                                                } ${isLastRow ? 'border-b border-light dark:border-dark' : ''}`}
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
                                    <div
                                        key={`empty-cell-${feature.key}`}
                                        className="col-span-0 sm:col-span-4 hidden sm:block px-3 py-2 text-sm empty-cell bg-[#eeefe9] dark:bg-[#1d1f27] !border-none"
                                    ></div>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark px-4 py-3 mt-2 mb-4 rounded">
                        <p className="mb-2 text-[15px]">
                            The table above compares <span className="bg-yellow/25 p-0.5">platform features</span>{' '}
                            between plans.
                        </p>
                        <p className="mb-0 text-[15px]">
                            <strong>
                                Looking to compare <span className="bg-yellow/25 p-0.5">product features</span>{' '}
                                availability?
                            </strong>{' '}
                            Visit the product comparison pages:{' '}
                            <Link to="/product-analytics#pricing">Product analytics</Link> |{' '}
                            <Link to="/session-replay#pricing">Session replay</Link> |{' '}
                            <Link to="/feature-flags#pricing">Feature flags</Link> |{' '}
                            <Link to="/experiments#pricing">Experiments</Link> |{' '}
                            <Link to="/surveys#pricing">Surveys</Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}
