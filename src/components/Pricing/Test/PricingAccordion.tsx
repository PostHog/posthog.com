import React, { useState, useRef, useEffect } from 'react'
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
                <span className="opacity-60 text-[13px]">/event</span>
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
                <span className="opacity-60 text-[13px]">/recording</span>
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
                <span className="opacity-60 text-[13px]">/request</span>
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
                <strong className="text-sm">$0.2000</strong>
                <span className="opacity-60 text-[13px]">/response</span>
            </>
        ),
        children: <>content</>,
    },
]

const AccordionItem = ({ isOpen, onClick, onAnimationComplete, Icon, name, color, billingData, billedWith, type }) => {
    const contentRef = useRef(null)
    const startsAt =
        !billedWith &&
        billingData?.plans?.[billingData.plans.length - 1]?.tiers?.find((tier) => tier?.unit_amount_usd !== '0')
            ?.unit_amount_usd
    const unit = billingData?.unit?.replace('survey ', '')
    return (
        <li
            className={`border-t relative ${
                isOpen
                    ? 'active border-transparent bg-white dark:bg-accent-dark rounded shadow-lg z-10 overflow-hidden -mx-1'
                    : 'inactive border-light dark:border-dark first:border-transparent'
            }`}
        >
            <button
                onClick={onClick}
                className={`text-left cursor-pointer w-full flex justify-between items-center transition-all rounded relative ${
                    isOpen
                        ? 'pt-2 pl-2 pr-3 pb-2 z-20'
                        : 'px-2 text-primary/90 hover:text-primary/100 dark:text-primary-dark/90 dark:hover:text-primary-dark/100 py-2 hover:bg-accent/80 dark:hover:bg-accent/5 hover:scale-[1.0025] hover:top-[-.5px] active:scale-[.9999] active:top-[3px]'
                }`}
            >
                <div className="grid grid-cols-12 w-full gap-1 items-center">
                    <div className="col-span-6 md:col-span-5">
                        <div className="flex gap-1 items-center">
                            <div className={isOpen ? 'size-6' : 'size-5'}>{<Icon className={`text-${color}`} />}</div>
                            <span
                                className={`transition-all leading-tight font-bold ${
                                    isOpen ? 'text-base md:text-base' : 'text-sm md:text-base'
                                }`}
                            >
                                {name}
                            </span>
                        </div>
                    </div>
                    <div className="col-span-5 md:col-span-6">
                        {billedWith ? (
                            <em className="font-normal opacity-75 text-sm">
                                Billed with <span className="lowercase">{billedWith}</span>
                            </em>
                        ) : (
                            startsAt && (
                                <span>
                                    <span className="opacity-60 text-[13px]">From</span>{' '}
                                    <strong className="text-sm">
                                        ${startsAt.length <= 3 ? Number(startsAt).toFixed(2) : startsAt}
                                    </strong>
                                    <span className="opacity-60 text-[13px]">/{unit}</span>
                                </span>
                            )
                        )}
                    </div>
                    <span className="text-right">
                        {isOpen ? (
                            <IconMinus className="size-4 inline-block transform rotate-180" />
                        ) : (
                            <IconPlus className="size-4 inline-block transform rotate-0" />
                        )}
                    </span>
                </div>
            </button>
            <motion.div
                onAnimationComplete={onAnimationComplete}
                ref={contentRef}
                initial={{ height: 0 }}
                animate={{ height: isOpen ? 'auto' : 0, transition: { duration: 0.3, type: 'tween' } }}
                className={isOpen ? '' : 'overflow-hidden'}
            >
                <div className="px-3 pb-4">
                    <PricingTiers plans={billingData?.plans} type={type} unit={unit} />
                </div>
            </motion.div>
        </li>
    )
}

export const Accordion = ({ allExpanded, setAllExpanded }) => {
    const { products } = useProducts()
    const ref = useRef<HTMLOListElement>(null)
    const [openIndex, setOpenIndex] = useState(null)

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
        <ol ref={ref} className="space-y-px p-0 list-none">
            {products.map((item, index) => (
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
