import { graphql, useStaticQuery } from 'gatsby'
import { capitalize } from 'instantsearch.js/es/lib/utils'
import React, { useEffect, useState } from 'react'
import { Check2, Close } from 'components/Icons'
import Tooltip from 'components/Tooltip'
import { TrackedCTA } from 'components/CallToAction'
import usePostHog from 'hooks/usePostHog'
import Label from 'components/Label'
import { BillingProductV2Type, BillingV2FeatureType } from 'types'
import { product_type_to_max_events } from '../pricingLogic'
import { Discount } from 'components/NotProductIcons'
import Link from 'components/Link'

const Heading = ({ title, subtitle, className = '' }: { title?: string; subtitle?: string; className?: string }) => {
    return (
        <div className={className}>
            <h4 className="m-0 text-base opacity-70">{title}</h4>
            {subtitle && <p className="m-0 text-sm opacity-70">{subtitle}</p>}
        </div>
    )
}

const Row = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return <div className={`flex items-center space-x-4 px-2 lg:px-4 py-1.5 rounded ${className}`}>{children}</div>
}

const Feature = ({ feature }: { feature: BillingV2FeatureType }) => {
    return feature ? (
        feature?.limit || feature?.note ? (
            <p className="m-0 text-base opacity-70">
                {feature.note || `${feature.limit.toLocaleString()} ${feature.unit}`}
            </p>
        ) : (
            <>
                <Check2 className="text-green w-5" />
                <span className="sr-only">Included</span>
            </>
        )
    ) : (
        <>
            <Close opacity={1} className="text-red w-4" />
            <span className="sr-only">Not included</span>
        </>
    )
}

const Title = ({ title, className = '' }: { title: string; className?: string }) => {
    return <h5 className={`m-0 text-[15px] opacity-70 font-medium ${className}`}>{title}</h5>
}

const InclusionOnlyRow = ({ plans }) => (
    <Row className="!py-1">
        <div className="flex-grow" />
        {plans.map(({ included_if, plan_key }, index) => (
            <Title
                key={`inclusion-only-${plan_key}-${index}`}
                title={included_if === 'no_active_subscription' ? 'Free' : 'Paid'}
                className="font-bold max-w-[25%] w-full min-w-[105px]"
            />
        ))}
    </Row>
)

const ENTERPRISE_PRICING_TABLE = 'enterprise-pricing-table'

const PricingTiers = ({ plans, unit, compact = false, type }) => {
    const posthog = usePostHog()
    const [enterprise_flag_enabled, set_enterprise_flag_enabled] = useState(false)

    const [tiers, set_tiers] = useState(plans[plans.length - 1]?.tiers)

    useEffect(() => {
        posthog?.onFeatureFlags(() => {
            if (posthog.getFeatureFlag(ENTERPRISE_PRICING_TABLE) === 'test') {
                set_enterprise_flag_enabled(true)
                // Filter out tiers above the max number of units we want to display
                set_tiers(
                    plans[plans.length - 1]?.tiers?.filter(({ up_to }) => up_to <= product_type_to_max_events[type])
                )
            } else {
                set_enterprise_flag_enabled(false)
            }
        })
    }, [posthog])

    return tiers.map(({ up_to, unit_amount_usd }, index) => {
        return compact && parseFloat(unit_amount_usd) <= 0 ? null : (
            <Row className={`!py-1 ${compact ? '!px-0 !space-x-0' : ''}`} key={`type-${index}`}>
                <Title
                    className={`flex-grow ${compact ? 'text-sm' : ''}`}
                    title={
                        index === 0
                            ? `First ${formatCompactNumber(up_to)} ${unit}s`
                            : !up_to
                            ? `${formatCompactNumber(plans[plans.length - 1].tiers[index - 1].up_to)}+`
                            : `${
                                  formatCompactNumber(plans[plans.length - 1].tiers[index - 1].up_to).split(/ |k/)[0]
                              }-${formatCompactNumber(up_to)}`
                    }
                />
                {!compact && (
                    <Title
                        className="font-bold max-w-[25%] w-full min-w-[105px]"
                        title={plans[0].free_allocation === up_to ? 'Free' : '-'}
                    />
                )}
                <div className="flex max-w-[25%] w-full min-w-[105px]">
                    <Title
                        className={`font-bold  ${compact ? 'text-sm' : ''}`}
                        title={
                            plans[0].free_allocation === up_to ? (
                                'Free'
                            ) : enterprise_flag_enabled && index === tiers.length - 1 ? (
                                <s>
                                    $
                                    {parseFloat(unit_amount_usd).toFixed(
                                        Math.max(
                                            ...plans[plans.length - 1].tiers.map(
                                                (tier) => tier.unit_amount_usd.split('.')[1]?.length ?? 0
                                            )
                                        )
                                    )}
                                </s>
                            ) : (
                                `$${parseFloat(unit_amount_usd).toFixed(
                                    Math.max(
                                        ...plans[plans.length - 1].tiers.map(
                                            (tier) => tier.unit_amount_usd.split('.')[1]?.length ?? 0
                                        )
                                    )
                                )}`
                            )
                        }
                    />
                    {!up_to && enterprise_flag_enabled && (
                        <Link to="/contact-sales">
                            <Label className="ml-2 !font-bold" text="Volume discounts available" style="orangeNoBg" />
                        </Link>
                    )}
                </div>
            </Row>
        )
    })
}

const formatCompactNumber = (number) => {
    const formatter = Intl.NumberFormat('en', {
        notation: 'compact',
        compactDisplay: number < 999999 ? 'short' : 'long',
    })
    return formatter.format(number).toLowerCase()
}

const AddonTooltipContent = ({ addon }) => {
    const referencePlan = addon.plans?.[0]
    const tiers = referencePlan?.tiers
    const isFirstTierFree = parseFloat(tiers?.[0].unit_amount_usd || '') === 0
    const [showDiscounts, setShowDiscounts] = useState(false)

    return (
        <div className="p-2 max-w-sm">
            <p className="font-bold text-[15px] mb-2">
                {addon.name} <Label className="ml-2" text="Addon" />
            </p>
            <p className="text-sm mb-3">{addon.description}</p>
            <p className="text-sm opacity-70 mb-3">
                {isFirstTierFree &&
                    `First ${formatCompactNumber(tiers?.[0].up_to)} ${referencePlan.unit}s/mo free, then `}
                <span className="font-bold text-base text-primary dark:text-primary-dark/75">
                    ${parseFloat((isFirstTierFree ? tiers?.[1]?.unit_amount_usd : tiers?.[0]?.unit_amount_usd) || '')}
                </span>
            </p>
            {showDiscounts ? (
                <PricingTiers compact unit={addon.unit} plans={addon.plans} type={addon.type} />
            ) : (
                <button onClick={() => setShowDiscounts(true)} className="text-red dark:text-yellow font-bold">
                    Show volume discounts
                </button>
            )}
        </div>
    )
}

const AddonTooltip = ({ children, addon }: { children: React.ReactNode; addon: BillingProductV2Type }) => {
    return (
        <Tooltip placement="right" content={() => <AddonTooltipContent addon={addon} />}>
            <span className="relative">{children}</span>
        </Tooltip>
    )
}

export const CTA = () => {
    const posthog = usePostHog()
    return (
        <TrackedCTA
            event={{
                name: `clicked Get started - free`,
                type: 'cloud',
            }}
            type="primary"
            size="md"
            className="shadow-md !w-auto"
            to={`https://${
                posthog?.isFeatureEnabled && posthog?.isFeatureEnabled('direct-to-eu-cloud') ? 'eu' : 'app'
            }.posthog.com/signup`}
        >
            Get started - free
        </TrackedCTA>
    )
}

const allProductsData = graphql`
    query GetAllProductData {
        allProductData {
            nodes {
                products {
                    description
                    docs_url
                    image_url
                    inclusion_only
                    contact_support
                    addons {
                        contact_support
                        description
                        docs_url
                        image_url
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

const planNames = {
    'Product analytics + data stack': 'Product analytics',
}

export default function Plans({
    groupsToShow,
    showTitle,
}: {
    groupsToShow?: string[]
    showTitle?: boolean
}): JSX.Element {
    const {
        allProductData: {
            nodes: [{ products }],
        },
    } = useStaticQuery(allProductsData)
    return (groupsToShow?.length > 0 ? products.filter(({ type }) => groupsToShow.includes(type)) : products).map(
        ({ type, plans, unit, addons, name, inclusion_only }: any) => {
            return (
                <div className="grid gap-y-2 min-w-[450px] mb-20" key={type}>
                    <div className="border border-light dark:border-dark rounded pb-2">
                        {plans.some(({ free_allocation }) => free_allocation) ? (
                            <div>
                                <Row className="bg-accent dark:bg-accent-dark mb-2">
                                    <div className="flex-grow">
                                        {showTitle && <h4 className="text-lg mb-0">{planNames[name] || name}</h4>}
                                    </div>

                                    {plans.map(({ free_allocation, plan_key }) => {
                                        return (
                                            <Heading
                                                title={free_allocation ? 'Free' : 'All other plans'}
                                                subtitle={
                                                    free_allocation
                                                        ? 'No credit card required'
                                                        : 'All features, no limitations'
                                                }
                                                className="max-w-[25%] w-full min-w-[105px]"
                                                key={plan_key}
                                            />
                                        )
                                    })}
                                </Row>
                                <Row>
                                    <Title className="flex-grow" title={capitalize(`${unit}s`)} />
                                    {plans.map(({ free_allocation, plan_key }) => {
                                        return (
                                            <p
                                                key={`${type}-${plan_key}`}
                                                className="m-0 text-base opacity-70 max-w-[25%] w-full min-w-[105px]"
                                            >
                                                {free_allocation ? (
                                                    <>
                                                        <strong>{free_allocation.toLocaleString()}</strong>
                                                        <span className="text-xs">/mo</span>
                                                    </>
                                                ) : (
                                                    <strong>Unlimited</strong>
                                                )}
                                            </p>
                                        )
                                    })}
                                </Row>
                            </div>
                        ) : (
                            <div>
                                <Row className="bg-accent dark:bg-accent-dark mb-2">
                                    <div className="flex-grow">
                                        {showTitle && <h4 className="text-lg mb-0">{planNames[name] || name}</h4>}
                                    </div>
                                </Row>
                            </div>
                        )}
                        <div>
                            <Row className="bg-accent dark:bg-accent-dark my-2">
                                <Heading title="Features" />
                            </Row>
                            {plans[plans.length - 1].features.map((feature, index) => {
                                return (
                                    <Row
                                        className="hover:bg-accent/60 dark:hover:bg-accent-dark/70"
                                        key={`${type}-${feature.key}`}
                                    >
                                        <div className="flex-grow">
                                            <Tooltip
                                                placement="right"
                                                content={() => (
                                                    <div className="p-2 max-w-sm">
                                                        <p className="font-bold text-[15px] mb-1">{feature.name}</p>
                                                        <p className="mb-0 text-sm">{feature.description}</p>
                                                    </div>
                                                )}
                                            >
                                                <span className="relative">
                                                    <Title
                                                        className="border-b border-dashed border-border dark:border-dark inline-block cursor-default"
                                                        title={feature.name}
                                                    />
                                                </span>
                                            </Tooltip>
                                        </div>
                                        {plans.map((plan, i) => (
                                            <div
                                                key={`${feature.key}-${type}-${i}`}
                                                className="max-w-[25%] w-full min-w-[105px]"
                                            >
                                                <Feature
                                                    feature={plan.features?.find(({ key }) => key === feature.key)}
                                                />
                                            </div>
                                        ))}
                                    </Row>
                                )
                            })}
                            {addons.map((addon) => {
                                return (
                                    <Row className="hover:bg-accent/60 dark:hover:bg-accent-dark/70" key={addon.type}>
                                        <div className="flex-grow">
                                            <AddonTooltip addon={addon} parentProductName={name}>
                                                <Title
                                                    className="border-b border-dashed border-border dark:border-dark inline-block cursor-default"
                                                    title={addon.name}
                                                />
                                                <Label className="ml-2" text="Addon" />
                                            </AddonTooltip>
                                        </div>
                                        {plans.map((plan) => {
                                            return (
                                                <div
                                                    className="max-w-[25%] w-full min-w-[105px]"
                                                    key={`${addon.type}-${plan.plan_key}`}
                                                >
                                                    {plan.free_allocation ? (
                                                        <Close opacity={1} className="text-red w-4" />
                                                    ) : (
                                                        <AddonTooltip addon={addon} parentProductName={name}>
                                                            <Title
                                                                className="border-b border-dashed border-border dark:border-dark inline-block cursor-default"
                                                                title="Available"
                                                            />
                                                        </AddonTooltip>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </Row>
                                )
                            })}
                        </div>
                        <div>
                            <Row className="bg-accent dark:bg-accent-dark my-2">
                                <Heading title="Monthly pricing" />
                            </Row>
                            <div>
                                {inclusion_only ? (
                                    <InclusionOnlyRow plans={plans} />
                                ) : (
                                    <PricingTiers plans={plans} unit={unit} type={type} />
                                )}
                            </div>
                        </div>
                    </div>
                    <Row>
                        <div className="flex-grow" />
                        {plans.map((plan, index) => (
                            <div className="max-w-[25%] w-full min-w-[105px]" key={`cta-${plan.product_key}-${index}`}>
                                <CTA />
                            </div>
                        ))}
                    </Row>
                </div>
            )
        }
    )
}
