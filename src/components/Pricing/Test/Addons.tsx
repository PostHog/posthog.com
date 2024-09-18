import React, { useState } from 'react'
import { section, SectionHeader } from './Sections'
import { usePlatform } from '../Platform/usePlatform'
import useProducts from '../Products'
import * as Icons from '@posthog/icons'
import { PricingTiers } from '../Plans'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'components/Link'

const Addon = ({ name, icon_key, description, plans, unit, type, ...other }) => {
    const [showBreakdown, setShowBreakdown] = useState(false)
    const Icon = Icons[icon_key]
    const plan = plans[plans.length - 1]
    const freeAllocation = plan?.tiers?.find((tier) => tier.unit_amount_usd === '0')?.up_to
    return (
        <div
            key={name}
            className="bg-white dark:bg-white/5 border border-light dark:border-dark p-4 rounded max-w-xs w-full flex flex-col relative overflow-hidden"
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
                                ${plan?.tiers?.find((tier) => tier.unit_amount_usd !== '0')?.unit_amount_usd}
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

export const Addons = (props) => {
    const addons = props.addons

    const platform = usePlatform()
    const products = useProducts()
    const platformAddons = platform.addons.filter((addon) => !addon.inclusion_only)
    const productAddons = products.flatMap((product) => product.addons)
    const allAddons = [...platformAddons, ...productAddons]

    return (
        <section className={`${section} mb-12 mt-8 md:px-4`}>
            <SectionHeader>
                <h3 className="mb-2">Add-ons</h3>
                <p>We've moved specialized functionality into add-ons so you never pay for things you don't need.</p>
            </SectionHeader>
            <div className="mt-4 -mx-4 px-4 xl:-mx-8 xl:px-8 2xl:-mx-12 2xl:px-12 overflow-x-auto">
                <div className="grid grid-flow-col auto-cols-max gap-4 mb-4">
                    {allAddons.map((addon) => (
                        <Addon key={addon.type} {...addon} />
                    ))}
                </div>
            </div>
            <Link to="/addons" className="font-bold">Explore add-ons</Link>
        </section>
    )
}
