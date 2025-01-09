import React, { useState } from 'react'
import { IconCheck, IconChevronDown } from '@posthog/icons'
import cntl from 'cntl'
import Tooltip from 'components/Tooltip'
import Plans, { CTA as PlanCTA, PricingTiers } from '../Plans'
import { section, SectionHeader } from './Sections'
import Link from 'components/Link'

interface PlanData {
    title: string
    subtitle: string
    pricePreface?: string
    price: string
    priceSubtitle?: string | JSX.Element
    features: React.ReactNode[]
    projects: number
    dataRetention: string
    CTAText?: string
    CTALink?: string
    intent: 'free' | 'paid' | 'enterprise'
}

const Plan: React.FC<{ planData: PlanData }> = ({ planData }) => {
    return (
        <>
            <div className="flex flex-col h-full border border-light dark:border-dark bg-white dark:bg-accent-dark rounded-md relative">
                {planData.title === 'Totally free' && (
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
                                {planData.projects} project{planData.projects > 1 && 's'}
                            </p>
                            <p className="mb-0 font-bold text-sm">{planData.dataRetention} data retention</p>
                        </div>
                        <PlanCTA
                            type={planData.title === 'Totally free' ? 'primary' : 'secondary'}
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
        title: 'Totally free',
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
        title: 'Ridiculously cheap',
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
        projects: '6',
        dataRetention: '7-year',
        intent: 'paid',
    },
    {
        title: 'Starship enterprise',
        subtitle: 'Usage-based pricing after free tier',
        pricePreface: 'From',
        price: '$2,000',
        features: [
            {
                name: 'SAML SSO',
            },
            {
                name: 'Custom MSA',
            },
            {
                name: 'Dedicated support',
            },
            {
                name: 'Training & onboarding',
            },
            {
                name: 'Advanced permissions',
            },
            {
                name: 'Audit logs',
            },
        ],
        projects: 'Unlimited',
        dataRetention: 'Custom',
        CTAText: 'Talk to a human',
        CTALink: '/talk-to-a-human',
        intent: 'enterprise',
    },
]

const AllPlansInclude = () => {
    return (
        <div className="inline-flex xl:inline-flex w-full flex-col md:flex-row xl:flex-col md:gap-12 lg:gap-6 xl:gap-2 xl:pl-6">
            <p className="font-bold text-[15px] xl:mt-4 mb-2 lg:mb-0">All plans include:</p>
            <ul className="flex-1 list-none pl-0 xs:grid grid-cols-2 lg:flex gap-x-4 xs:gap-x-2 md:gap-x-6 xl:gap-x-4 gap-y-2 xl:gap-1 xl:flex-col">
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
    const highestSupportPlan = platformAndSupportProduct?.plans?.slice(-1)[0]

    const [isPlanComparisonVisible, setIsPlanComparisonVisible] = useState(false)
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
                                    ? '[&>*:nth-child(1)_>div]:border-yellow [&>*:nth-child(1)_>div]:border-3'
                                    : '[&>*:nth-child(2)_>div]:border-yellow [&>*:nth-child(2)_>div]:border-3'
                            }`}
                        >
                            {planSummary.map((plan, index) => (
                                <Plan key={index} planData={plan} />
                            ))}
                            <div className="hidden xl:flex justify-center col-span-3 md:col-span-1">
                                <AllPlansInclude />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:hidden mb-8">
                    <AllPlansInclude />
                </div>
                <p
                    className="text-red dark:text-yellow font-bold cursor-pointer flex items-center mb-0"
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
                            ? 'visible max-h-full opacity-1 mb-12 mt-8 md:px-4'
                            : 'overflow-y-hidden invisible max-h-0 opacity-0'
                    } transition duration-500 ease-in-out transform`}
                >
                    <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark px-4 py-3 mb-4 rounded">
                        <p className="mb-2 text-[15px]">
                            The table below compares <span className="bg-yellow/25 p-0.5">platform features</span>{' '}
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
                                        <div className="col-span-4 px-3 py-2 text-sm" key={`${plan.key}-base-price`}>
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
                                                const planFeature = plan?.features?.find((f) => f.key === feature.key)
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
                </div>
            </section>
        </>
    )
}
