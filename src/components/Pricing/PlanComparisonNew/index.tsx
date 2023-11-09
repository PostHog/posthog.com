import { useStaticQuery } from 'gatsby'
import { capitalize } from 'instantsearch.js/es/lib/utils'
import React from 'react'
import { AddonTooltipContent, allProductsData } from '../PlanComparison'
import { Check2, Close, Close2 } from 'components/Icons'
import Tooltip from 'components/Tooltip'
import { TrackedCTA } from 'components/CallToAction'
import usePostHog from 'hooks/usePostHog'
import Label from 'components/Label'

const Heading = ({ title, subtitle, className = '' }: { title?: string; subtitle?: string; className?: string }) => {
    return (
        <div className={className}>
            <h4 className="m-0 text-base opacity-70">{title}</h4>
            {subtitle && <p className="m-0 text-sm opacity-70">{subtitle}</p>}
        </div>
    )
}

const Row = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return <div className={`grid grid-cols-4 items-center gap-x-4 p-2 rounded ${className}`}>{children}</div>
}

const Feature = ({ feature }) => {
    return feature ? (
        feature?.limit || feature?.note ? (
            <p className="m-0 text-base opacity-70">
                {feature.note || `${feature.limit.toLocaleString()} ${feature.unit}`}
            </p>
        ) : (
            <Check2 className="text-green w-5" />
        )
    ) : (
        <Close opacity={1} className="text-red w-4" />
    )
}

const Title = ({ title, className = '' }: { title: string; className?: string }) => {
    return <h5 className={`m-0 text-base opacity-70 font-medium ${className}`}>{title}</h5>
}

export default function PlanComparisonNew({ groupsToShow }): JSX.Element {
    const {
        allProductData: {
            nodes: [{ products }],
        },
    } = useStaticQuery(allProductsData)
    const posthog = usePostHog()
    console.log(products)
    return products
        .filter(({ type }) => groupsToShow.includes(type))
        .map(({ type, plans, unit, addons, name }) => {
            return (
                <div className="grid gap-y-1" key={type}>
                    <Row className="bg-accent dark:bg-accent-dark">
                        <Heading title="Plans" className="col-span-2" />
                        {plans.map(({ free_allocation, plan_key }) => {
                            return (
                                <Heading
                                    title={free_allocation ? 'Free' : 'Unlimited'}
                                    subtitle={
                                        free_allocation ? 'No credit card required' : 'All features, no limitations'
                                    }
                                    className="flex-shrink-0"
                                    key={plan_key}
                                />
                            )
                        })}
                    </Row>
                    <Row>
                        <Title className="col-span-2" title={capitalize(`${unit}s`)} />
                        {plans.map(({ free_allocation, plan_key }) => {
                            return (
                                <p key={plan_key} className="m-0 text-base opacity-70">
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
                    <Row className="bg-accent dark:bg-accent-dark">
                        <Heading title="Features" className="col-span-4" />
                    </Row>
                    <div>
                        {plans[plans.length - 1].features.map((feature, index) => {
                            return (
                                <Row className="hover:bg-accent/60 dark:hover:bg-accent-dark/70" key={feature.key}>
                                    <div className="col-span-2">
                                        <Tooltip
                                            placement="right-end"
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
                                    {plans.map((plan) => (
                                        <Feature key={`${feature.key}-${type}`} feature={plan.features?.[index]} />
                                    ))}
                                </Row>
                            )
                        })}
                        {addons.map((addon) => {
                            return (
                                <Row className="hover:bg-accent/60 dark:hover:bg-accent-dark/70" key={addon.type}>
                                    <div className="col-span-2">
                                        <Tooltip
                                            placement="right-end"
                                            content={() => (
                                                <div className="max-w-sm">
                                                    <AddonTooltipContent addon={addon} parentProductName={name} />
                                                </div>
                                            )}
                                        >
                                            <span className="relative inline-flex space-x-2 items-baseline">
                                                <Title
                                                    className="border-b border-dashed border-border dark:border-dark inline-block cursor-default"
                                                    title={addon.name}
                                                />
                                                <Label text="Addon" />
                                            </span>
                                        </Tooltip>
                                    </div>
                                    {plans.map((plan) => {
                                        return plan.free_allocation ? (
                                            <Close opacity={1} className="text-red w-4" />
                                        ) : (
                                            <Tooltip
                                                placement="right-end"
                                                content={() => (
                                                    <div className="max-w-sm">
                                                        <AddonTooltipContent addon={addon} parentProductName={name} />
                                                    </div>
                                                )}
                                            >
                                                <span className="relative">
                                                    <Title
                                                        className="border-b border-dashed border-border dark:border-dark inline-block cursor-default"
                                                        title="Available"
                                                    />
                                                </span>
                                            </Tooltip>
                                        )
                                    })}
                                </Row>
                            )
                        })}
                    </div>
                    <Row className="bg-accent dark:bg-accent-dark">
                        <Heading title="Monthly pricing" className="col-span-4" />
                    </Row>
                    <div>
                        {plans[1].tiers.map(({ up_to, unit_amount_usd }, index) => {
                            return (
                                <Row key={`type-${index}`}>
                                    <Title
                                        className="col-span-2"
                                        title={
                                            index === 0
                                                ? `First ${up_to.toLocaleString()} ${unit}s`
                                                : !up_to
                                                ? `${plans[1].tiers[index - 1].up_to.toLocaleString()}+`
                                                : `${(
                                                      plans[1].tiers[index - 1].up_to + 1
                                                  ).toLocaleString()} - ${up_to.toLocaleString()}`
                                        }
                                    />
                                    <Title
                                        className="font-bold"
                                        title={plans[0].free_allocation === up_to ? 'Free' : '-'}
                                    />
                                    <Title
                                        className="font-bold"
                                        title={
                                            plans[0].free_allocation === up_to
                                                ? 'Free'
                                                : `$${parseFloat(unit_amount_usd).toFixed(
                                                      Math.max(
                                                          ...plans[1].tiers.map((tier) => tier.unit_amount_usd.length)
                                                      ) - 1
                                                  )}`
                                        }
                                    />
                                </Row>
                            )
                        })}
                    </div>
                    <Row>
                        <div className="col-span-2" />
                        {Array.from(Array(2)).map((_, i) => (
                            <TrackedCTA
                                key={`cta-${i}`}
                                event={{
                                    name: `clicked Get started - free`,
                                    type: 'cloud',
                                }}
                                type="primary"
                                size="sm"
                                className="shadow-md !w-auto"
                                to={`https://${
                                    posthog?.isFeatureEnabled && posthog?.isFeatureEnabled('direct-to-eu-cloud')
                                        ? 'eu'
                                        : 'app'
                                }.posthog.com/signup`}
                            >
                                Get started - free
                            </TrackedCTA>
                        ))}
                    </Row>
                </div>
            )
        })
}
