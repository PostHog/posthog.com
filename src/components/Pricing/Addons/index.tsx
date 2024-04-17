import { IconExternal, IconInfo, IconGroups, IconProfile, IconDecisionTree, IconBuilding } from '@posthog/icons'
import { useValues } from 'kea'
import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import cntl from 'cntl'

export const section = cntl`
    max-w-6xl
    xl:max-w-7xl
    mx-auto
    px-4
`

const addons = [
    {
        icon: <IconGroups className="w-6 h-6" />,
        name: 'Group analytics',
        price: 0.000071,
        priceType: 'request',
        freeAllocation: 1000000,
        description:
            'Associate events with a group or entity - such as a company, community, or project. Analyze these events as if they were sent by that entity itself. Great for B2B, marketplaces, and more.',
    },
    {
        icon: <IconProfile className="w-6 h-6" />,
        name: 'Person profiles',
        price: 0.00002,
        priceType: 'event',
        freeAllocation: 1000000,
        description:
            "Save custom user properties that can be used in deeper analysis that isn't needed for aggregate analysis (like in Web Analytics).",
    },
    {
        icon: <IconDecisionTree className="w-6 h-6" />,
        name: 'Data pipelines',
        price: 0.000062,
        priceType: 'event',
        freeAllocation: 1000000,
        description:
            'Get your PostHog data into your data warehouse or other tools like BigQuery, Redshift, Customer.io, and more.',
    },
    {
        icon: <IconBuilding className="w-6 h-6" />,
        name: 'Teams',
        price: 450,
        priceType: 'fixed',
        description: 'Priority support, unlimited projects, and features for collaboration with team members',
        descriptionTooltip:
            '<h3 class="mb-1 text-base">Team features</h3><ul class="list-none p-0 divide-y divide-light dark:divide-dark"><li class="py-1.5 text-sm">Verified events</li><li class="py-1.5 text-sm">Comments on dashboards and insights</li><li class="py-1.5 text-sm">Data taxonomy (tags and descriptions)</li></ul>',
    },
]

export const Addons = () => {
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
                        <div className="col-span-8 md:col-span-4 lg:col-span-3 flex items-center gap-2 md:border-t-0 h-full border-light dark:border-dark pt-4 md:pb-4">
                            <span className="opacity-60">{addon.icon}</span>
                            <span className="font-semibold text-[15px]">{addon.name}</span>
                        </div>
                        <div className="col-span-8 md:col-span-3 lg:col-span-3 md:border-t-0 h-full border-light dark:border-dark pt-4 md:pb-4 flex items-center">
                            <p className="mb-0">
                                <strong>${addon.price}</strong>
                                <span className="opacity-50 font-medium text-[13px]">
                                    /{addon.priceType === 'fixed' ? 'mo' : addon.priceType}
                                </span>
                            </p>
                            {!addon.priceType === 'fixed' && (
                                <p className="mt-0.5 opacity-70 leading-tight font-medium text-[13px] mb-0">
                                    <em>
                                        First {addon.freeAllocation}/{addon.priceType} free every month
                                    </em>
                                </p>
                            )}
                        </div>
                        <div className="col-span-16 md:col-span-9 lg:col-span-10 pl-8 md:pl-0 border-b md:border-b-0 md:border-t-0 h-full border-light dark:border-dark pt-1 md:pt-4 pb-4">
                            <p className="text-sm mb-0">
                                <span dangerouslySetInnerHTML={{ __html: addon.description }} />
                                {addon.descriptionTooltip && (
                                    <Tooltip
                                        placement="top"
                                        content={() => (
                                            <>
                                                <span dangerouslySetInnerHTML={{ __html: addon.descriptionTooltip }} />
                                            </>
                                        )}
                                    >
                                        <span className="relative -top-px">
                                            <IconInfo className="w-5 h-5 ml-1 inline-block opacity-75" />
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
