import React, { useState, useRef, useEffect, useMemo } from 'react'
import { IconGraph, IconRewindPlay, IconToggle, IconFlask, IconMessage, IconMinus, IconPlus } from '@posthog/icons'
import { motion } from 'framer-motion'
import useProducts from 'hooks/useProducts'
import { PricingTiers } from '../Plans'

export const tiers = [
    {
        icon: <IconGraph className="text-blue" />,
        title: 'Analytics',
        startsAt: (
            <>
                <strong className="text-sm">$0.00031</strong>
                <span className="text-secondary text-[13px]">/event</span>
            </>
        ),
        children: <>content</>,
    },
    {
        icon: <IconRewindPlay className="text-yellow" />,
        title: 'Session replay',
        startsAt: (
            <>
                <strong className="text-sm">$0.0050</strong>
                <span className="text-secondary text-[13px]">/recording</span>
            </>
        ),
        children: <>content</>,
    },
    {
        icon: <IconToggle className="text-seagreen" />,
        title: 'Feature flags',
        startsAt: (
            <>
                <strong className="text-sm">$0.0001</strong>
                <span className="text-secondary text-[13px]">/request</span>
            </>
        ),
        children: <>content</>,
    },
    {
        icon: <IconFlask className="text-purple" />,
        title: 'Experiments',
        children: <>content</>,
    },
    {
        icon: <IconMessage className="text-salmon" />,
        title: 'Surveys',
        startsAt: (
            <>
                <strong className="text-sm">$0.1000</strong>
                <span className="text-secondary text-[13px]">/response</span>
            </>
        ),
        children: <>content</>,
    },
]

const AccordionItem = ({
    isOpen,
    onClick,
    onAnimationComplete,
    Icon,
    name,
    color,
    billingData,
    billedWith,
    type,
    includeAddonRates,
    categoryName,
}) => {
    const contentRef = useRef(null)
    const displayName = categoryName || name
    const startsAt =
        !billedWith &&
        billingData?.plans?.[billingData.plans.length - 1]?.tiers?.find((tier) => tier?.unit_amount_usd !== '0')
            ?.unit_amount_usd
    const unit = billingData?.unit?.replace('survey ', '')

    const addonData =
        includeAddonRates && billingData?.addons
            ? billingData.addons.map((addon: any) => ({
                  name: addon.name,
                  billingData: addon,
                  type: addon.type,
              }))
            : []

    return (
        <li
            className={`border-t relative ${
                isOpen
                    ? 'active border-transparent bg-white dark:bg-accent-dark rounded shadow-lg z-10 overflow-hidden -mx-1'
                    : 'inactive border-primary first:border-transparent'
            }`}
        >
            <button
                onClick={!billedWith ? onClick : undefined}
                className={`text-left cursor-pointer w-full flex justify-between items-center transition-all rounded relative ${
                    isOpen
                        ? 'pt-2 pl-2 pr-3 pb-2 z-20'
                        : 'px-2 text-secondary hover:text-primary py-2 hover:bg-accent hover:scale-[1.0025] hover:top-[-.5px] active:scale-[.9999] active:top-[3px]'
                }`}
            >
                <div className="grid grid-cols-12 w-full gap-1 items-center">
                    <div className="col-span-6 md:col-span-5">
                        <div className="flex gap-1 items-center">
                            {Icon && (
                                <div className={isOpen ? 'size-6' : 'size-5'}>
                                    {<Icon className={`text-${color}`} />}
                                </div>
                            )}
                            <span
                                className={`transition-all leading-tight font-bold ${
                                    isOpen ? 'text-base @5xl:text-base' : 'text-sm @5xl:text-base'
                                }`}
                            >
                                {displayName}
                            </span>
                        </div>
                    </div>
                    <div className="col-span-5 md:col-span-6">
                        {billedWith ? (
                            <em className="font-normal text-secondary text-sm">
                                Billed with <span className="lowercase">{billedWith}</span>
                            </em>
                        ) : includeAddonRates ? (
                            <em className="font-normal text-secondary text-sm">Multiple resources</em>
                        ) : (
                            startsAt && (
                                <span>
                                    <span className="text-secondary text-[13px]">From</span>{' '}
                                    <strong className="text-sm">
                                        ${startsAt.length <= 3 ? Number(startsAt).toFixed(2) : startsAt}
                                    </strong>
                                    <span className="text-secondary text-[13px]">/{unit}</span>
                                </span>
                            )
                        )}
                    </div>
                    {!billedWith && (
                        <span className="text-right">
                            {isOpen ? (
                                <IconMinus className="size-4 inline-block transform rotate-180" />
                            ) : (
                                <IconPlus className="size-4 inline-block transform rotate-0" />
                            )}
                        </span>
                    )}
                </div>
            </button>
            {!billedWith && (
                <motion.div
                    onAnimationComplete={onAnimationComplete}
                    ref={contentRef}
                    initial={{ height: 0 }}
                    animate={{ height: isOpen ? 'auto' : 0, transition: { duration: 0.3, type: 'tween' } }}
                    className={isOpen ? '' : 'overflow-hidden'}
                >
                    <div className="px-3 pb-4">
                        {includeAddonRates && addonData.length > 0 ? (
                            <div className="space-y-6">
                                {/* Main product pricing */}
                                <div>
                                    <h5 className="text-sm font-semibold mb-3">{name}</h5>
                                    <PricingTiers plans={billingData?.plans} type={type} unit={unit} />
                                </div>
                                {/* Addon products pricing */}
                                {addonData.map((addon, index) => (
                                    <div key={index}>
                                        <h5 className="text-sm font-semibold mb-3">{addon.name}</h5>
                                        <PricingTiers
                                            plans={addon.billingData?.plans}
                                            type={addon.type}
                                            unit={addon.billingData?.unit}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <PricingTiers plans={billingData?.plans} type={type} unit={unit} />
                        )}
                    </div>
                </motion.div>
            )}
        </li>
    )
}

export const Accordion = ({ allExpanded, setAllExpanded }) => {
    const { products } = useProducts()
    const ref = useRef<HTMLOListElement>(null)
    const [openIndex, setOpenIndex] = useState(null)

    // Filter products to only show those with pricing
    const pricedProducts = useMemo(
        () =>
            products.filter((item) => {
                // Skip if explicitly hidden from pricing table
                if (item.hideFromPricingTable) return false

                // Include if billed with another product OR has its own billing data
                return item.billedWith || item.billingData
            }),
        [products]
    )

    const scrollToIndex = (index) => {
        if (ref.current && window.innerWidth <= 639) {
            const element = ref.current.children[index]
            const y = element.getBoundingClientRect().top + window.scrollY - 56
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        if (!allExpanded) {
            setOpenIndex(null)
        }
    }, [allExpanded])

    return (
        <ol ref={ref} className="not-prose space-y-px p-0 list-none">
            {pricedProducts.map((item, index) => (
                <AccordionItem
                    onAnimationComplete={({ height }) => {
                        if (height === 'auto') {
                            scrollToIndex(index)
                        }
                    }}
                    key={index}
                    isOpen={allExpanded || openIndex === index}
                    onClick={() => {
                        setAllExpanded(false)
                        setOpenIndex(openIndex === index ? null : index)
                    }}
                    {...item}
                />
            ))}
        </ol>
    )
}
