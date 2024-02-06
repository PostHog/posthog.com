import cntl from 'cntl'
import { Discount } from 'components/NotProductIcons'
import { LinearSlider, LogSlider, sliderCurve } from 'components/Pricing/PricingSlider/Slider'
import { pricingSliderLogic } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import {
    IconGraph,
    IconRewindPlay,
    IconToggle,
    IconMessage,
    IconExternal,
    IconPercentage,
    IconInfo,
} from '@posthog/icons'
import { useActions, useValues } from 'kea'
import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import useProducts from './../Products'
import usePostHog from 'hooks/usePostHog'

export const section = cntl`
    max-w-6xl
    xl:max-w-7xl
    mx-auto
    px-4
`

export const PricingCalculator = () => {
    const products = useProducts()
    const { monthlyTotal } = useValues(pricingSliderLogic)

    const posthog = usePostHog()

    return (
        <section id="calculator" className={`${section} mb-12`}>
            <h4 className="mb-0">
                Estimate your bill
                <span>
                    <Tooltip
                        content={() => (
                            <>
                                Learn how to{' '}
                                <Link
                                    to="/docs/billing/estimating-usage-costs"
                                    external={true}
                                    className="inline-flex items-center gap-x-1 font-semibold text-red dark:text-yellow"
                                >
                                    estimate your usage <IconExternal className="w-4 h-4" />
                                </Link>
                            </>
                        )}
                    >
                        <span className="relative -top-px">
                            <IconInfo className="w-5 h-5 ml-1 inline-block opacity-75" />
                        </span>
                    </Tooltip>
                </span>
            </h4>
            <div className="md:flex flex-col md:flex-row justify-between pb-4 md:pb-0">
                <p className="inline md:inline-flex text-sm opacity-75 mb-2 md:mb-0">
                    You can set a billing limit so you never get a surprise bill.
                </p>{' '}
                <p className="inline md:inline-flex text-sm opacity-75">
                    Subscribe to products individually after creating an account.
                </p>
                <p className="md:hidden mt-4 text-sm bg-accent dark:bg-accent-dark p-4 rounded mb-0">
                    <strong>To estimate your bill,</strong> drag the sliders to your estimated volume for each product,
                    then scroll down to see the total.
                </p>
            </div>

            <div className="grid grid-cols-16">
                <div className="col-span-16 md:col-span-3 !border-t-0 p-1 text-sm opacity-75 bg-accent dark:bg-accent-dark rounded-tl rounded-bl">
                    <strong className="md:hidden">Products</strong>
                </div>
                <div className="hidden md:block md:col-span-4 !border-t-0 py-1 text-sm opacity-75 bg-accent dark:bg-accent-dark">
                    Pricing starts at...
                </div>
                <div className="hidden md:block md:col-span-4 xl:col-span-5 !border-t-0 py-1 text-sm opacity-75 pr-8 bg-accent dark:bg-accent-dark">
                    Calculate your price
                </div>
                <div className="hidden md:block md:col-span-3 !border-t-0 py-1 text-sm opacity-75 bg-accent dark:bg-accent-dark">
                    Estimated usage
                </div>
                <div className="hidden md:block md:col-span-2 xl:col-span-1 text-right !border-t-0 py-1 pr-2 text-sm opacity-75 bg-accent dark:bg-accent-dark rounded-tr rounded-br">
                    Subtotal
                </div>
            </div>

            <div className="grid grid-cols-16 md:[&>div]:border-t [&>div:nth-child(1)]:border-none [&>div:nth-child(2)]:border-none [&>div:nth-child(3)]:border-none [&>div:nth-child(4)]:border-none [&>div:nth-child(5)]:border-none [&>div]:border-light mb-2">
                {products.map((product, index) => (
                    <React.Fragment key={index}>
                        <div className="col-span-16 sm:col-span-8 border-t md:border-t-0 border-light dark:border-dark md:col-span-3 pt-4 md:pb-4 md:pr-4">
                            <div className="col-span-7 @md:col-span-6 flex md:flex-col mdlg:flex-row gap-2 md:gap-1 mdlg:gap-2 mdlg:items-center sm:pl-0 md:pl-2 mb-1 @md:mb-0">
                                {product.icon}
                                <span className="font-semibold text-[15px]">{product.name}</span>
                            </div>
                        </div>
                        <div className="col-span-16 sm:col-span-8 sm:border-t border-light dark:border-dark md:border-t-0 md:col-span-4 pl-7 sm:pl-0 pb-6 md:pl-0 sm:pt-4 md:pb-4 md:pr-8">
                            {product.price ? (
                                <>
                                    <p className="mb-0.5">
                                        <strong>${product.price}</strong>
                                        <span className="opacity-50 font-medium text-[13px]">
                                            /{product.denomination}
                                        </span>
                                    </p>
                                    <p className="opacity-70 leading-tight font-medium text-[13px] mb-0">
                                        <em>
                                            First {product.freeLimit} {product.denomination}s free every month
                                        </em>
                                    </p>
                                </>
                            ) : (
                                <p className="text-sm mb-0">{product.message}</p>
                            )}
                        </div>
                        <div className="col-span-16 pr-2 md:col-span-4 xl:col-span-5 pl-7 sm:pl-0 pb-8 md:pt-5 md:pb-4 md:pr-8 md:pl-0 empty:py-0">
                            {product.slider}
                        </div>
                        <div className="col-span-10 md:col-span-3 pl-7 sm:pl-0 md:pt-4 pb-4 empty:py-0">
                            {product.price && (
                                <>
                                    <strong>{product.calcVolume}</strong>{' '}
                                    <span className="opacity-60 text-sm">{product.denomination}s/mo</span>
                                </>
                            )}
                        </div>
                        <div className="col-span-6 md:col-span-2 xl:col-span-1 pl-7 pr-2 sm:pl-0 md:pt-4 md:px-2 md:pb-4 md:pl-0 text-right">
                            {product.price && (
                                <>
                                    <span className="opacity-75 text-sm md:hidden">Subtotal: </span>
                                    <span className="font-bold">${product.calcCost}</span>
                                </>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className="grid grid-cols-16 p-2 bg-accent dark:bg-accent-dark md:bg-transparent md:p-0">
                <div className="col-span-13 flex flex-col justify-center md:col-span-8 p-3 opacity-75 mb-2 bg-accent dark:bg-accent-dark rounded-tl rounded-bl h-full text-balance">
                    <strong>Monthly estimate for usage-based plans</strong>
                    <span className="text-sm">with billing limits at your selections</span>
                </div>
                <div className="col-span-3 md:col-span-8 p-1 pr-4 flex justify-end items-center text-sm opacity-75 mb-2 bg-accent dark:bg-accent-dark rounded-tr rounded-br text-right h-full">
                    <div className="flex items-baseline">
                        <span className="text-lg font-bold">${monthlyTotal.toLocaleString()}</span>
                        <span className="opacity-60">/mo</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
