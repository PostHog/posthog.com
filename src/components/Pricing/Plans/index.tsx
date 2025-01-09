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
import { IconInfo } from '@posthog/icons'
import { formatUSD } from '../PricingSlider/pricingSliderLogic'

const Heading = ({ title, subtitle, className = '' }: { title?: string; subtitle?: string; className?: string }) => {
    return (
        <div className={className}>
            <h4 className="m-0 text-base opacity-70">{title}</h4>
            {subtitle && <p className="m-0 text-sm opacity-70">{subtitle}</p>}
        </div>
    )
}

const Row = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return <div className={`flex items-center gap-2 lg:gap-4 px-2 lg:px-4 py-1.5 ${className}`}>{children}</div>
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
    return <h5 className={`m-0 text-sm opacity-70 font-normal ${className}`}>{title}</h5>
}

export const InclusionOnlyRow = ({ plans }) => (
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

export const PricingTiers = ({ plans, unit, compact = false, type, test = false, showSubtotal = false }) => {
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

    useEffect(() => {
        set_tiers(plans[plans.length - 1]?.tiers)
    }, [plans])

    return (
        <>
            {showSubtotal && (
                <Row className="grid grid-cols-12">
                    <h4 className="m-0 col-span-3 text-base">Allocation</h4>
                    <h4 className="m-0 col-span-4 text-base">Price</h4>
                    <h4 className="m-0 col-span-3 text-base text-right">Your selection</h4>
                    <h4 className="m-0 col-span-2 text-base text-right">Subtotal</h4>
                </Row>
            )}
            {tiers.map(({ up_to, unit_amount_usd, eventsInThisTier, tierCost }, index) => {
                return compact && parseFloat(unit_amount_usd) <= 0 ? null : (
                    <Row
                        className={`!py-1 ${compact ? '!px-0 !space-x-0' : ''} ${
                            showSubtotal ? 'grid grid-cols-12' : ''
                        }`}
                        key={`type-${index}`}
                    >
                        <Title
                            className={`${compact ? 'text-sm' : ''} ${showSubtotal ? 'col-span-3' : 'flex-grow'}`}
                            title={
                                index === 0
                                    ? `First ${formatCompactNumber(up_to)} ${unit}s`
                                    : !up_to
                                    ? `${formatCompactNumber(plans[plans.length - 1].tiers[index - 1]?.up_to)}+`
                                    : `${
                                          formatCompactNumber(plans[plans.length - 1].tiers[index - 1]?.up_to).split(
                                              / |k/
                                          )[0]
                                      }-${formatCompactNumber(up_to)}`
                            }
                        />
                        <div
                            className={
                                showSubtotal
                                    ? `col-span-4`
                                    : `flex ${test ? 'shrink-0' : 'max-w-[25%] w-full min-w-[105px]'}`
                            }
                        >
                            <Title
                                className={`${compact ? 'text-sm' : ''}`}
                                title={
                                    plans[0].free_allocation === up_to ? (
                                        <strong>Free</strong>
                                    ) : type === 'product_analytics' && index === tiers.length - 1 ? (
                                        // last row
                                        <div className="flex items-center -mr-5">
                                            <strong>
                                                $
                                                {parseFloat(unit_amount_usd).toFixed(
                                                    Math.max(
                                                        ...plans[plans.length - 1].tiers.map(
                                                            (tier) => tier.unit_amount_usd.split('.')[1]?.length ?? 0
                                                        )
                                                    )
                                                )}
                                            </strong>
                                            /{unit}
                                            <Tooltip
                                                content={() => (
                                                    <div>
                                                        Custom pricing available for large volumes.
                                                        <Link to="/talk-to-a-human">
                                                            <Label
                                                                className="!m-0 !p-0 !text-sm !font-bold"
                                                                text="Get in touch"
                                                                style="orangeNoBg"
                                                            />
                                                        </Link>
                                                    </div>
                                                )}
                                                contentContainerClassName="max-w-xs"
                                            >
                                                <div>
                                                    <IconInfo className="w-4 h-4 ml-1 opacity-50" />
                                                </div>
                                            </Tooltip>
                                        </div>
                                    ) : (
                                        <>
                                            <strong>
                                                $
                                                {parseFloat(unit_amount_usd).toFixed(
                                                    Math.max(
                                                        ...plans[plans.length - 1].tiers.map(
                                                            (tier) => tier.unit_amount_usd.split('.')[1]?.length ?? 0
                                                        )
                                                    )
                                                )}
                                            </strong>
                                            /{unit}
                                        </>
                                    )
                                }
                            />
                            {!up_to && enterprise_flag_enabled && (
                                <Link to="/talk-to-a-human">
                                    <Label
                                        className="ml-2 !font-bold"
                                        text="Volume discounts available"
                                        style="orangeNoBg"
                                    />
                                </Link>
                            )}
                        </div>
                        {showSubtotal && (
                            <>
                                <div className={`col-span-3 text-right font-code text-sm`}>
                                    {eventsInThisTier.toLocaleString()}
                                </div>
                                <div className={`col-span-2 text-right text-sm font-bold`}>
                                    {formatUSD(
                                        tierCost,
                                        tiers.some((tier) => tier.tierCost % 1 !== 0)
                                    )}
                                </div>
                            </>
                        )}
                    </Row>
                )
            })}
        </>
    )
}

const formatCompactNumber = (number) => {
    const formatter = Intl.NumberFormat('en', {
        notation: 'compact',
        compactDisplay: number < 999999 ? 'short' : 'long',
    })
    return formatter.format(number).toLowerCase()
}

const AddonTooltipContent = ({ addon }: { addon: BillingProductV2Type }) => {
    const isInclusionOnly = addon.inclusion_only
    let referencePlan
    if (isInclusionOnly) {
        referencePlan = addon.plans.find((plan) => plan.included_if == 'has_parent_subscription')
    } else {
        referencePlan = addon.plans[0]
    }
    console.log(addon.name, 'referencePlan', referencePlan)
    const tiers = referencePlan?.tiers
    const isFirstTierFree = parseFloat(tiers?.[0].unit_amount_usd || '') === 0
    const [showDiscounts, setShowDiscounts] = useState(false)

    return (
        <div className="p-2 max-w-sm">
            <p className="font-bold text-[15px] mb-2">
                {addon.name} <Label className="ml-2" text="Add-on" />
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

export const CTA = ({
    type = 'primary',
    ctaText,
    ctaLink,
    intent = '',
    size = 'md',
    width = 'auto',
    className = '',
}: {
    type?: 'primary' | 'secondary'
    ctaText?: string
    ctaLink?: string
    intent?: string
    size?: string
    width?: string
    className?: string
}): JSX.Element => {
    const posthog = usePostHog()
    return (
        <TrackedCTA
            event={{
                name: `clicked Get started - free`,
                type: 'cloud',
                intent,
            }}
            type={type}
            size={size}
            width={width}
            className={`shadow-md !w-auto ${className}`}
            to={
                ctaLink
                    ? ctaLink
                    : `https://${
                          posthog?.isFeatureEnabled && posthog?.isFeatureEnabled('direct-to-eu-cloud') ? 'eu' : 'app'
                      }.posthog.com/signup`
            }
        >
            {ctaText ? ctaText : 'Get started - free'}
        </TrackedCTA>
    )
}

const allProductsData = graphql`
    query {
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
                            included_if
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
                            {addons.map((addon: BillingProductV2Type) => {
                                return (
                                    <Row className="hover:bg-accent/60 dark:hover:bg-accent-dark/70" key={addon.type}>
                                        <div className="flex-grow">
                                            <AddonTooltip addon={addon} parentProductName={name}>
                                                <Title
                                                    className="border-b border-dashed border-border dark:border-dark inline-block cursor-default"
                                                    title={addon.name}
                                                />
                                                <Label className="ml-2" text="Add-on" />
                                            </AddonTooltip>
                                        </div>
                                        {plans.map((plan, i) => {
                                            return (
                                                <div
                                                    className="max-w-[25%] w-full min-w-[105px]"
                                                    key={`${addon.type}-${plan.plan_key}`}
                                                >
                                                    {plan.free_allocation && !plan.included_if ? (
                                                        <Close opacity={1} className="text-red w-4" />
                                                    ) : plan.included_if == 'no_active_parent_subscription' ? (
                                                        <span>Included</span>
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
