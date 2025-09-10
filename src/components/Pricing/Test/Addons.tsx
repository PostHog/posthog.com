import React, { useState } from 'react'
import { SectionHeader, SectionLayout } from './Sections'
import useProducts from '../Products'
import * as Icons from '@posthog/icons'
import { PricingTiers } from '../Plans'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { pricingMenu } from 'navs'
import Layout from 'components/Layout'
import { IconAdvanced } from '@posthog/icons'
import { Link as ScrollLink } from 'react-scroll'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import groupBy from 'lodash.groupby'

import { Accordion } from 'components/RadixUI/Accordion'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
interface AddonProps {
    name: string
    icon_key: keyof typeof Icons
    description: string
    plans: any[]
    unit: string
    type: string
    [key: string]: any
}

interface AddonsProps {
    addons: any[]
}

interface Tier {
    unit_amount_usd: string
    up_to?: number
}

interface Feature {
    category?: string
    group?: string
    items?: any[]
}

interface Plan {
    flat_rate?: boolean
    unit_amount_usd: string
    tiers?: Tier[]
}

const EXCLUDED_ADDON_TYPES = ['mobile_replay', 'data_pipelines']

const predefinedAddons = [
    {
        name: 'Data pipelines',
        features: [
            {
                group: 'Benefits',
                items: [
                    {
                        name: 'Send event data to a data warehouse',
                        description:
                            'If you have a data lake or data warehouse, you can use destinations to send PostHog event data there, while ensuring you still have that data in PostHog to perform your analytics processes.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Enforce event schemas',
                        description:
                            'By default, PostHog does not enforce schemas on events it receives. However, a transformation could do so, preventing ingestion of events that do not match the specified schema in order to keep your data clean and following specific guidelines you need it to follow.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Label events',
                        description:
                            'To facilitate sorting through your events, you can use transformations to determine arbitrary logic to label an event (e.g. by setting a label property). This can help you tailor your metrics in PostHog, as well as facilitate data ordering if you ever use PostHog data elsewhere.',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Only pay for saved events',
                        description:
                            'PostHog only charges for events that are successfully saved to our platform - events filtered out or dropped by transformations are not counted towards billing quotas.',
                        icon: IconAdvanced,
                    },
                ],
            },
        ],
    },
    {
        name: 'Group analytics',
        features: [
            {
                group: 'Examples of how to use groups',
                items: [
                    {
                        name: 'B2B SaaS app',
                        description:
                            'Aggregate events at an account-level. Calculate metrics like:<ul><li>number of daily active companies</li><li>company churn rate</li><li>How many companies have adopted a new feature.</li></ul>',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Collaborative, project-based services',
                        description:
                            'For project-based products like Notion, Jira, or Figma, create a project group type to calculate:<ul><li>metrics at a project level</li><li>users per project</li><li>project engagement</li></ul>',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Communication-based apps',
                        description:
                            'For a product like Slack, you can create a channel group type to measure:<ul><li>the average number of messages per channel</li><li>the number of monthly active channels</li><li>total number of channel participants</li></ul>',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Social media apps',
                        description:
                            'For a social network-type product, create a post group type to measure:<ul><li>average number of replies per post</li><li>total count of unique posters per month</li></ul>',
                        icon: IconAdvanced,
                    },
                ],
            },
        ],
    },
    {
        name: 'Person profiles',
        features: [
            {
                group: 'What can I do with person profiles?',
                items: [
                    {
                        name: 'Merge anonymous users with their eventual identified user',
                        description:
                            "Like when they sign up for your product or use different devices - enables analyzing the user's path",
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Store custom properties on users',
                        description: 'Use these properties in cohorts, session replay, experiments, and feature flags',
                        icon: IconAdvanced,
                    },
                    {
                        name: 'Create user-specific insights in Product analytics',
                        description:
                            '<ul><li>How many times specific users click an element on a page</li><li>Group cohorts of users by device type, location, or property</li><li>Filter to interactions on a specific page by specific users</li></ul>',
                        icon: IconAdvanced,
                    },
                ],
            },
        ],
    },
]

const FeatureItem = ({ name, description, size }: { name: string; description: string; size?: string }) => (
    <div className="flex gap-2">
        <div className="flex-1">
            <h4 className="text-base my-1">{name}</h4>
            <p
                className={`${
                    size === 'small' ? 'text-sm [&_li]:text-sm' : 'text-[15px] [&_li]:text-[15px]'
                } text-secondary mb-0`}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    </div>
)

const Features = ({ title, addonName, features }: { title: string; addonName: string; features: any[] }) => {
    return (
        <React.Fragment>
            <fieldset>
                <legend>{title}</legend>

                <div
                    className={`grid @xl:grid-cols-2 gap-8 ${
                        addonName === 'Teams' ? '@lg:grid-cols-2' : '@lg:grid-cols-2'
                    }`}
                >
                    {features.map((feature, itemIndex) => (
                        <FeatureItem
                            key={`${addonName}-${title}-${itemIndex}`}
                            size={addonName === 'Teams' ? 'small' : ''}
                            {...feature}
                        />
                    ))}
                </div>
            </fieldset>
        </React.Fragment>
    )
}

const Addon = ({ name, icon_key, description, plans, unit, type, ...other }: AddonProps) => {
    const [showBreakdown, setShowBreakdown] = useState(false)
    const Icon = Icons[icon_key]
    const plan = plans[plans.length - 1]
    const freeAllocation = plan?.tiers?.find((tier: Tier) => tier.unit_amount_usd === '0')?.up_to
    return (
        <div
            key={name}
            className="bg-white dark:bg-white/5 border border-primary p-4 rounded max-w-xs w-full flex flex-col relative overflow-hidden"
        >
            <div className="flex gap-1 items-center mb-2">
                <Icon className="w-6 h-6 opacity-75" />
                <h5 className="font-bold m-0">{name}</h5>
            </div>
            <p className="text-[15px] mb-4 mt-0">{description}</p>
            <div className="mt-auto">
                <p className="m-0">
                    {plan?.flat_rate ? (
                        <span>
                            <strong>${plan.unit_amount_usd}</strong>
                            <span className="opacity-70 text-sm">/month</span>
                        </span>
                    ) : (
                        <>
                            <span className="opacity-70 text-sm">Pricing starts at</span>{' '}
                            <strong>
                                ${plan?.tiers?.find((tier: Tier) => tier.unit_amount_usd !== '0')?.unit_amount_usd}
                            </strong>
                            <span className="opacity-70 text-sm">/{unit}</span>
                        </>
                    )}
                </p>
                {freeAllocation && (
                    <p className="m-0 text-green text-sm">
                        First <strong>{freeAllocation?.toLocaleString()}</strong> {unit}s/mo free
                    </p>
                )}
                {!plan?.flat_rate && (
                    <button
                        onClick={() => setShowBreakdown(true)}
                        className="text-red dark:text-yellow font-bold text-sm"
                    >
                        Show breakdown
                    </button>
                )}
                <AnimatePresence>
                    {showBreakdown && (
                        <motion.div
                            initial={{ opacity: 0, translateY: '100%' }}
                            animate={{ opacity: 1, translateY: 0, transition: { type: 'tween', duration: 0.2 } }}
                            exit={{ opacity: 0, translateY: '100%' }}
                            className="absolute inset-0 bg-white dark:bg-accent-dark pt-4 rounded"
                        >
                            <PricingTiers plans={plans} type={type} unit={unit} test={true} />
                            <button
                                onClick={() => setShowBreakdown(false)}
                                className={`text-red dark:text-yellow font-bold text-sm px-2 lg:px-4`}
                            >
                                Hide breakdown
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export const Addons = (props: AddonsProps) => {
    const products = useProducts()
    const productAddons = products
        .flatMap((product) => product.addons)
        .filter((addon) => !EXCLUDED_ADDON_TYPES.includes(addon.type))
    const allAddons = productAddons

    const accordionItems = allAddons.map((addon: any) => {
        const { name, description, plans, unit, type, features } = addon
        const plan = plans[plans.length - 1]
        const freeAllocation = plan?.tiers?.find((tier: Tier) => tier.unit_amount_usd === '0')?.up_to
        const featuresByCategory = groupBy(features, (feature: Feature) => feature.category || 'Features')
        const customAddon = predefinedAddons.find((a) => a.name === name)

        return {
            value: name.toLowerCase().replace(/\s+/g, '-'),
            trigger: name,
            content: (
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 @4xl:col-span-3">
                        <p className="text-[15px] mb-4">{description}</p>
                        {plan?.flat_rate ? (
                            <div className="flex items-baseline">
                                <strong className="text-xl">${plan.unit_amount_usd.replace('.00', '')}</strong>
                                <span className="text-[15px] opacity-60">/mo</span>
                            </div>
                        ) : (
                            <>
                                <span className="opacity-70 text-sm">Pricing starts at</span>{' '}
                                <strong>
                                    ${plan?.tiers?.find((tier: Tier) => tier.unit_amount_usd !== '0')?.unit_amount_usd}
                                </strong>
                                <span className="opacity-70 text-sm">/{unit}</span>
                            </>
                        )}
                        {freeAllocation && (
                            <p className="m-0 text-green text-sm">
                                First <strong>{freeAllocation?.toLocaleString()}</strong> {unit}s/mo free
                            </p>
                        )}
                    </div>
                    <div className="col-span-12 @4xl:col-span-9">
                        <div className={` ${name === 'Teams' ? '' : ''}`}>
                            {customAddon
                                ? customAddon.features?.map((feature: Feature) => {
                                      return (
                                          <Features
                                              key={`${name}-${feature.group}`}
                                              addonName={name}
                                              features={feature.items || []}
                                              title={feature.group || ''}
                                          />
                                      )
                                  })
                                : Object.keys(featuresByCategory)
                                      .sort((feature) => (feature === 'Features' ? -1 : 1))
                                      ?.map((category) => {
                                          const features = featuresByCategory[category]
                                          return (
                                              <Features
                                                  key={`${name}-${category}`}
                                                  title={category}
                                                  addonName={name}
                                                  features={features}
                                              />
                                          )
                                      })}
                        </div>
                        {!plan?.flat_rate && (
                            <div data-scheme="secondary" className="max-w-[400px] mt-4">
                                <h5 className="mb-2 text-lg">Pricing breakdown</h5>
                                <div className="border border-primary rounded divide-y divide-primary bg-primary">
                                    <PricingTiers plans={plans} type={type} unit={unit} test />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ),
        }
    })

    return (
        <SectionLayout id="addons" className="not-prose mb-8 @3xl:mb-12">
            <SectionHeader>
                <h2>Add-ons</h2>
            </SectionHeader>

            <div className="grid @lg:grid-cols-3 gap-x-8">
                <div className="@lg:col-span-2 @4xl:col-span-full">
                    <p className="mb-6">
                        Specialized functionality are offered as add-ons so you never pay for things you don't need. You
                        can subscribe to them individually inside your PostHog account.
                    </p>
                </div>
                <aside className="justify-self-end @4xl:hidden">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/add_ons_a700ab577f.png"
                        alt="Add-ons"
                        className="object-contain -mt-4 @3xl:-mt-8"
                    />
                </aside>
                <Accordion
                    items={accordionItems}
                    className="@container col-span-full"
                    triggerClassName="px-2 @xl:px-4"
                    contentClassName="p-2 @xl:p-4"
                />
            </div>
        </SectionLayout>
    )
}
