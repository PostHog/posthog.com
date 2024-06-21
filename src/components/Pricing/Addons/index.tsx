import React, { useMemo } from 'react'
import Tooltip from 'components/Tooltip'
import cntl from 'cntl'
import * as Icons from '@posthog/icons'

export const section = cntl`
    max-w-6xl
    xl:max-w-7xl
    mx-auto
    px-4
`

const tooltipLookup: Record<string, JSX.Element> = {
    teams: (
        <>
            <h3 className="mb-1 text-base">Team features</h3>
            <ul className="list-none p-0 divide-y divide-light dark:divide-dark">
                <li className="py-1.5 text-sm">Verified events</li>
                <li className="py-1.5 text-sm">Comments on dashboards and insights</li>
                <li className="py-1.5 text-sm">Data taxonomy (tags and descriptions)</li>
            </ul>
        </>
    ),
}

export function getProductIcon(iconKey: string | null, className?: string): JSX.Element {
    const Icon = Icons[iconKey || 'IconLogomark']
    return <Icon className={className} />
}

interface AddonsProps {
    billingProducts: any
}

export const Addons = ({ billingProducts }: AddonsProps) => {
    const addons = useMemo(() => {
        return billingProducts
            ?.map((product: any) => {
                return product.addons
            })
            .flat()
    }, [billingProducts])

    const getAddonPrice = (addon: any): number | null => {
        const isInclusionOnly = addon.inclusion_only
        let tiers
        if (isInclusionOnly) {
            tiers = addon.plans.find((plan) => plan.included_if == 'has_parent_subscription')?.tiers
        } else {
            tiers = addon.plans[0]?.tiers
        }
        if (tiers?.length > 0) {
            // If the first tier is free, return the second tier price
            if (+tiers[0].flat_amount_usd === 0) {
                return tiers[1]?.unit_amount_usd
            }
            return tiers[0]?.unit_amount_usd
        }
        // If there are no tiers, return the plan price
        return addon.plans[0]?.unit_amount_usd
    }

    const getAddonFreeAllocation = (addon: any): number | null => {
        const isInclusionOnly = addon.inclusion_only
        let tiers
        if (isInclusionOnly) {
            tiers = addon.plans.find((plan) => plan.included_if == 'has_parent_subscription')?.tiers
        } else {
            tiers = addon.plans[0]?.tiers
        }
        if (tiers?.length > 0) {
            // If the first tier is free, return the it's allocation
            if (+tiers[0].flat_amount_usd === 0) {
                return tiers[0]?.up_to
            }
            return 0
        }
        // If there are no tiers, return null
        return null
    }

    return (
        <section id="addons" className={`${section} mb-12`}>
            <h4 className="mb-0">Add-ons</h4>
            <p className="text-sm opacity-75 mb-2 md:mb-0">
                We've packaged special functionality as add-ons to keep our core pricing as low as possible. Only pay
                for what you need.
            </p>

            <div className="grid grid-cols-16 mt-2 items-center md:[&>div]:border-t [&>div:nth-child(1)]:border-none [&>div:nth-child(2)]:border-none md:[&>div:nth-child(3)]:border-none [&>div]:border-light dark:[&>div]:border-dark">
                {addons.map((addon, index) => (
                    <React.Fragment key={index}>
                        <div className="col-span-8 md:col-span-3 lg:col-span-3 flex items-center gap-2 md:border-t-0 h-full border-light dark:border-dark pt-4 md:pb-4">
                            {getProductIcon(addon.icon_key, 'opacity-60 w-6 h-6')}
                            <span className="font-semibold text-[15px]">{addon.name}</span>
                        </div>
                        <div className="col-span-8 md:col-span-5 lg:col-span-4 md:border-t-0 h-full border-light dark:border-dark pt-4 md:pb-4 flex items-center px-2">
                            <p className="mb-0">
                                <span className="space-x-0.5">
                                    <strong>${getAddonPrice(addon)?.toLocaleString()}</strong>
                                    <span className="opacity-50 font-medium text-[13px]">/</span>
                                    <span className="opacity-50 font-medium text-[13px]">
                                        {addon.unit || addon.plans[0].unit}
                                    </span>
                                </span>
                                {!addon?.plans[0].flat_rate && (
                                    <p className="mt-0.5 opacity-70 leading-tight font-medium text-[13px] mb-0">
                                        <em>
                                            First {getAddonFreeAllocation(addon)?.toLocaleString()} {addon.unit}s free
                                            every month
                                        </em>
                                    </p>
                                )}
                            </p>
                        </div>
                        <div className="col-span-16 md:col-span-8 lg:col-span-9 pl-8 md:pl-0 border-b md:border-b-0 md:border-t-0 h-full border-light dark:border-dark pt-2 md:pt-4 pb-4">
                            <p className="text-sm mb-0">
                                <span>{addon.description}</span>
                                {tooltipLookup[addon.type] && (
                                    <Tooltip placement="top" content={() => tooltipLookup[addon.type]}>
                                        <span className="relative -top-px">
                                            <Icons.IconInfo className="w-5 h-5 ml-1 inline-block opacity-75" />
                                        </span>
                                    </Tooltip>
                                )}
                            </p>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </section>
    )
}
