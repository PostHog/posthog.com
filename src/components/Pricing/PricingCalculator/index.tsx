import cntl from 'cntl'
import { Discount } from 'components/NotProductIcons'
import { LinearSlider, LogSlider, sliderCurve } from 'components/Pricing/PricingSlider/Slider'
import { pricingSliderLogic } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { IconGraph, IconRewindPlay, IconToggle, IconMessage, IconExternal, IconPercentage } from '@posthog/icons'
import { useActions, useValues } from 'kea'
import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import Toggle from 'components/Toggle'
import useProducts from './../Products'
import {
    FIVE_MILLION,
    TWENTY_FIVE_MILLION,
    FIFTY_MILLION,
    MAX_FEATURE_FLAGS,
    MAX_PRODUCT_ANALYTICS,
    MAX_SESSION_REPLAY,
    MAX_SURVEYS,
    MILLION,
    TEN_MILLION,
    HUNDRED_MILLION,
    BILLION,
} from '../pricingLogic'
import { button } from 'components/CallToAction'
import usePostHog from 'hooks/usePostHog'

export const section = cntl`
    max-w-6xl
    xl:max-w-7xl
    mx-auto
    px-4
`

const ENTERPRISE_PRICING_TABLE = 'enterprise-pricing-table'

export const PricingCalculator = () => {
    const products = useProducts()
    const {
        productAnalyticsCost,
        sessionRecordingCost,
        productAnalyticsSliderValue,
        sessionRecordingSliderValue,
        monthlyTotal,
        sessionRecordingEventNumber,
        eventNumber,
        featureFlagSliderValue,
        featureFlagNumber,
        featureFlagCost,
        surveyResponseNumber,
        surveyResponseCost,
    } = useValues(pricingSliderLogic)

    const posthog = usePostHog()
    const [enterprise_flag_enabled, set_enterprise_flag_enabled] = useState(false)

    useEffect(() => {
        posthog?.onFeatureFlags(() => {
            if (posthog.getFeatureFlag(ENTERPRISE_PRICING_TABLE) === 'test') {
                set_enterprise_flag_enabled(true)
            } else {
                set_enterprise_flag_enabled(false)
            }
        })
    }, [posthog])

    return (
        <section id="calculator" className={`${section} mb-12`}>
            <h4 className="mb-0">Estimate your bill</h4>
            <div className="flex justify-between">
                <p className="text-sm opacity-75">You can set a billing limit so you never get a surprise bill.</p>
                <p className="text-sm opacity-75">Subscribe to products individually after creating an account.</p>
            </div>

            <div className="grid grid-cols-16">
                <div className="col-span-3 !border-t-0 p-1 text-sm opacity-75 bg-accent dark:bg-accent-dark rounded-tl rounded-bl"></div>
                <div className="col-span-4 !border-t-0 py-1 text-sm opacity-75 bg-accent dark:bg-accent-dark">
                    Pricing starts at...
                </div>
                <div className="col-span-4 xl:col-span-5 !border-t-0 py-1 text-sm opacity-75 pr-8 bg-accent dark:bg-accent-dark">
                    Calculate your price
                </div>
                <div className="col-span-3 !border-t-0 py-1 text-sm opacity-75 bg-accent dark:bg-accent-dark">
                    Estimated usage
                </div>
                <div className="col-span-2 xl:col-span-1 text-right !border-t-0 py-1 pr-2 text-sm opacity-75 bg-accent dark:bg-accent-dark rounded-tr rounded-br">
                    Subtotal
                </div>
            </div>

            <div className="grid grid-cols-16 [&>div]:border-t [&>div:nth-child(1)]:border-none [&>div:nth-child(2)]:border-none [&>div:nth-child(3)]:border-none [&>div:nth-child(4)]:border-none [&>div:nth-child(5)]:border-none [&>div]:border-light">
                {products.map((product, index) => (
                    <React.Fragment key={index}>
                        <div className="col-span-3 pt-4 pb-4 pr-4">
                            <div className="col-span-7 @lg:col-span-6 flex gap-2 items-center pl-2 mb-1 @lg:mb-0">
                                {product.icon}
                                <span className="font-semibold text-[15px]">{product.name}</span>
                            </div>
                        </div>
                        <div className="col-span-4 pt-4 pb-4 pr-8">
                            {product.price && (
                                <>
                                    <p className="mb-0.5">
                                        <strong>${product.price}</strong>
                                        <span className="opacity-50 font-medium text-[13px]">
                                            /{product.denomination}s
                                        </span>
                                    </p>
                                    <p className="opacity-70 leading-tight font-medium text-[13px] mb-0">
                                        <em>
                                            First {product.freeLimit} {product.denomination}s free every month
                                        </em>
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="col-span-4 xl:col-span-5 pt-5 pb-4 pr-8">{product.slider}</div>
                        <div className="col-span-3 pt-4 pb-4">
                            <strong>{product.calcVolume}</strong>{' '}
                            <span className="opacity-60 text-sm">{product.denomination}s/mo</span>
                        </div>
                        <div className="col-span-2 xl:col-span-1 pt-4 px-2 pb-4 text-right">
                            <span className="font-bold">${product.calcCost}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className="grid grid-cols-16">
                <div className="col-span-8 p-1 text-sm opacity-75 mb-2 bg-accent dark:bg-accent-dark rounded-tl rounded-bl">
                    <strong>Monthly estimate based on usage-based plans</strong>
                    <br />
                    if you set billing limits at your selections
                </div>
                <div className="col-span-8 p-1 text-sm opacity-75 mb-2 bg-accent dark:bg-accent-dark rounded-tr rounded-br text-right">
                    <span className="text-lg font-bold">${monthlyTotal.toLocaleString()}</span>
                    <span className="opacity-60">/mo</span>
                </div>
            </div>

            <Link to="/docs/billing/estimating-usage-costs" external={true} className="flex items-center gap-x-1">
                How do I estimate my usage? <IconExternal className="w-4 h-4" />
            </Link>

            <br />
            <br />
            <br />
            <br />

            <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
                <div>
                    <h4 className="border-b border-border dark:border-dark pb-2 mb-3">Discounts</h4>

                    <div className="pl-10 relative mb-4">
                        <span className="w-6 h-6 absolute top-0 left-1 opacity-50">
                            <IconPercentage />
                        </span>

                        <h5 className="text-base mb-0">Non-profits</h5>
                        <p className="text-[15px] mb-1">50% off in most cases. Get in touch after signing up.</p>
                    </div>

                    <div className="pl-10 relative mb-4">
                        <span className="w-6 h-6 absolute top-0 left-1 opacity-50">
                            <IconPercentage />
                        </span>

                        <h5 className="text-base mb-0">Startups</h5>
                        <p className="text-[15px] mb-1">
                            If your startup is under two years old and has raised less than $5m, check out our{' '}
                            <Link to="/startups">startup program</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
