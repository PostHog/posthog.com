import { IconCheck, IconChevronDown } from '@posthog/icons'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import React, { useState } from 'react'
import { CTA as PlanCTA } from '../Plans'
import { section, SectionHeader, SectionLayout } from './Sections'
import { BillingV2PlanType, BillingProductV2Type, BillingV2FeatureType } from 'types'
import ScrollArea from 'components/RadixUI/ScrollArea'

interface FeatureItem {
    name: string
    description?: string
}

interface PlanData {
    title: string
    subtitle: string
    pricePreface?: string
    price: string
    priceSubtitle?: string | JSX.Element
    features: FeatureItem[]
    projects: number | 'Unlimited'
    dataRetention: string
    CTAText?: string
    CTALink?: string
    intent: 'free' | 'paid' | 'enterprise'
}

const Plan: React.FC<{ planData: PlanData }> = ({ planData }) => {
    return (
        <>
            <div className="not-prose flex-1 flex flex-col h-full border border-primary bg-white dark:bg-accent-dark rounded-md relative">
                {planData.title === 'Free' && (
                    <div className="absolute -top-6 right-4 !border-2 border-yellow bg-light dark:bg-dark rounded-sm text-center py-1 px-2">
                        <strong className="block text-yellow text-sm">Just pick this one!</strong>
                        <p className="text-xs mb-0 text-opacity-75">You can upgrade later.</p>
                    </div>
                )}
                <div className="flex flex-col h-full gap-4 pt-3 px-4 xl:px-4 pb-6">
                    <div>
                        <h3 className="text-xl my-0">
                            <em>{planData.title}</em>
                        </h3>
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
                                    <p className="my-0 opacity-70 text-sm">{feature.description}</p>
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

const planSummary: PlanData[] = [
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
        intent: 'free' as const,
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
        intent: 'paid' as const,
    },
]

const AllPlansInclude = () => {
    return (
        <div className="@container w-full text-primary">
            <p className="font-bold text-[15px] mb-2">All plans include:</p>
            <ul className="prose dark:prose-invert grid @xl:grid-cols-2 gap-x-4">
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

interface PlanColumnsProps {
    billingProducts: BillingProductV2Type[]
    highlight?: 'free' | 'paid'
}

export const PlanColumns: React.FC<PlanColumnsProps> = ({ billingProducts, highlight = 'paid' }) => {
    const platformAndSupportProduct = billingProducts.find(
        (product: BillingProductV2Type) => product.type === 'platform_and_support'
    )

    const [isPlanComparisonVisible, setIsPlanComparisonVisible] = useState(false)

    const mainPlans = platformAndSupportProduct?.plans?.filter((p: BillingV2PlanType) => !p.contact_support)
    const highestSupportPlan = mainPlans?.slice(-1)[0]
    const highestPlanFeatures = highestSupportPlan?.features?.filter(
        (f: BillingV2FeatureType) => f.entitlement_only !== true
    )

    return (
        <>
            <SectionLayout id="plans" className={`mt-8 !mb-12`}>
                <SectionHeader>
                    <h2>Compare plans</h2>
                </SectionHeader>
                <div className="mt-4 -mx-4 @2xl:-mx-6 @5xl:mx-0 px-4 @5xl:px-0 mb-4 @5xl:mb-0">
                    <ScrollArea>
                        <div className="pt-6 pb-2">
                            <div
                                className={`flex flex-wrap @4xl:grid grid-cols-[repeat(2,1fr)__minmax(200px,_400px)] gap-4 @4xl:gap-8 mb-4 ${
                                    highlight === 'free'
                                        ? '[&>*:nth-child(1)_>div]:border-yellow [&>*:nth-child(1)_>div]:border-3'
                                        : '[&>*:nth-child(2)_>div]:border-yellow [&>*:nth-child(2)_>div]:border-3'
                                }`}
                            >
                                {planSummary.map((plan, index) => (
                                    <Plan key={index} planData={plan} />
                                ))}
                                <div className="flex-[1_0_100%] max-w-2xl mx-auto @4xl:mx-4">
                                    <AllPlansInclude />
                                    <div className="mt-4 mb-0">
                                        <p className="font-bold text-[15px] mb-2">
                                            <em>But wait, there's more...</em>
                                        </p>
                                        <ul className="prose dark:prose-invert">
                                            <li className="text-[15px]">
                                                <Link to="/platform-packages" state={{ newWindow: true }}>
                                                    Platform packages
                                                </Link>
                                                <br />
                                                <p className="my-0 opacity-90 text-sm">
                                                    Choose from extra features, like dedicated support, RBAC and SSO
                                                    enforcement.
                                                </p>
                                            </li>
                                            <li className="text-[15px]">
                                                <Link
                                                    to="/services"
                                                    className="underline font-semibold hover:text-red dark:hover:text-yellow transition-colors"
                                                    state={{ newWindow: true }}
                                                >
                                                    Setup &amp; training
                                                    <br />
                                                </Link>
                                                <p className="my-0 opacity-90 text-sm">
                                                    Our engineers can set everything up for you and train your team.{' '}
                                                    <em>Includes free merch!</em>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
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
                            ? 'visible max-h-full opacity-1 mb-12 mt-2 @3xl:px-4'
                            : 'overflow-y-hidden invisible max-h-0 opacity-0'
                    } transition duration-500 ease-in-out transform`}
                >
                    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                        <div className="grid grid-cols-12 mb-1 min-w-min not-prose">
                            <div className="col-span-4 px-3 py-1">&nbsp;</div>
                            {mainPlans?.map((plan: BillingV2PlanType, index: number) => (
                                <div
                                    className="col-span-4 px-3 py-1"
                                    key={plan.key || plan.plan_key || `plan-${index}`}
                                >
                                    <strong className="text-sm opacity-75">{plan.name}</strong>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-12 mb-2 border-l border-primary bg-white dark:bg-dark [&>div]:border-t [&>div]:border-primary min-w-min">
                            <div data-scheme="secondary" className="col-span-4 bg-primary px-3 py-2 text-sm">
                                <strong className="text-primary">Base price</strong>
                            </div>
                            {/* Header */}
                            {mainPlans?.map((plan: BillingV2PlanType, idx: number) => {
                                // Add border-r to the last plan column (Pay-as-you-go)
                                const isLast = idx === mainPlans.length - 1
                                const planKey = plan.key || plan.plan_key || `plan-${idx}`
                                return (
                                    <div
                                        className={`main col-span-4 px-3 py-2 text-sm${
                                            isLast ? ' border-r border-primary' : ''
                                        }`}
                                        key={`${planKey}-base-price`}
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
                            {/* Rows */}
                            {highestPlanFeatures?.map((feature: BillingV2FeatureType, idx_outer: number) => (
                                <React.Fragment key={`feature-${feature.key}-${idx_outer}`}>
                                    {/* Feature names */}
                                    <div
                                        data-scheme="secondary"
                                        className={`col-span-4 bg-primary px-3 py-2 text-sm ${
                                            idx_outer === highestPlanFeatures?.length - 1
                                                ? 'border-b border-primary'
                                                : ''
                                        }`}
                                    >
                                        {feature.description ? (
                                            <Tooltip content={feature.description}>
                                                <strong className="border-b border-dashed border-primary cursor-help text-primary">
                                                    {feature.name}
                                                </strong>
                                            </Tooltip>
                                        ) : (
                                            <strong className="text-primary">{feature.name}</strong>
                                        )}
                                    </div>
                                    {/* Feature values */}
                                    {mainPlans?.map((plan: BillingV2PlanType, idx_inner: number) => {
                                        const planFeature = plan?.features?.find((f) => f.key === feature.key)
                                        const isLastColumn = idx_inner === mainPlans.length - 1
                                        const isLastRow = idx_outer === highestPlanFeatures?.length - 1
                                        const planKey = plan.key || plan.plan_key || `plan-${idx_inner}`
                                        return (
                                            <div
                                                className={`inside col-span-4 px-3 py-2 text-sm ${
                                                    isLastColumn ? 'border-r border-primary' : ''
                                                } ${isLastRow ? 'border-b border-primary' : ''}`}
                                                key={`${planKey}-${feature.key}-${idx_inner}`}
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
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="border border-primary bg-accent px-4 mt-2 mb-4 rounded">
                        <p className="">
                            The table above compares <span className="bg-yellow/25 p-0.5">platform features</span>{' '}
                            between plans.
                        </p>
                        <p className="">
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
            </SectionLayout>
        </>
    )
}
