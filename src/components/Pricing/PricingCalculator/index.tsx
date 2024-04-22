import cntl from 'cntl'
import { pricingSliderLogic } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { IconExternal, IconInfo } from '@posthog/icons'
import { useValues } from 'kea'
import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import useProducts from './../Products'
import Toggle from 'components/Toggle'

export const section = cntl`
    max-w-6xl
    xl:max-w-7xl
    mx-auto
    px-4
`

export const PricingCalculator = () => {
    const products = useProducts()
    const { monthlyTotal } = useValues(pricingSliderLogic)
    const [annualPriceAvailable, setAnnualPriceAvailable] = useState(false)
    const [showAnnualPrice, setShowAnnualPrice] = useState(true)
    const [annualTotal, setAnnualTotal] = useState<string | null>(null)
    const [annualTotalPaidMonthly, setAnnualTotalPaidMonthly] = useState<string | null>(null)

    useEffect(() => {
        if (monthlyTotal > 2000) {
            setAnnualPriceAvailable(true)
        } else {
            setAnnualPriceAvailable(false)
        }
        const annualTotal = Math.round(monthlyTotal * 0.8 * 12)
        const annualTotalPaidMonthly = Math.round(monthlyTotal * 0.8)
        const formattedAnnualTotal = new Intl.NumberFormat('en-US').format(annualTotal)
        const formattedAnnualTotalPaidMonthly = new Intl.NumberFormat('en-US').format(annualTotalPaidMonthly)
        setAnnualTotal(formattedAnnualTotal)
        setAnnualTotalPaidMonthly(formattedAnnualTotalPaidMonthly)
    }, [monthlyTotal])

    return (
        <section id="calculator" className={`${section} mb-12`}>
            <h4 className="mb-0">
                Estimate your bill
                <span>
                    <Tooltip
                        placement="top"
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
                    <span className="relative">
                        Pricing starts at...{' '}
                        <Tooltip
                            contentContainerClassName="max-w-[360px]"
                            placement="top"
                            content={() => (
                                <p className="mb-0 text-sm">
                                    <strong>Prices decrease exponentially with greater volume.</strong>
                                    <br />
                                    Click a product name to see the full price breakdown and feature availability broken
                                    down by plan.
                                </p>
                            )}
                        >
                            <span className="inline-block relative top-0.5">
                                <IconInfo className="w-4 h-4" />
                            </span>
                        </Tooltip>
                    </span>
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

            <div className="grid grid-cols-16 md:[&>div]:border-t [&>div:nth-child(1)]:border-none [&>div:nth-child(2)]:border-none [&>div:nth-child(3)]:border-none [&>div:nth-child(4)]:border-none [&>div:nth-child(5)]:border-none [&>div]:border-light dark:[&>div]:border-dark mb-2">
                {products.map((product, index) => (
                    <React.Fragment key={index}>
                        <div className="col-span-16 sm:col-span-8 border-t md:border-t-0 border-light dark:border-dark md:col-span-3 pt-4 md:pb-4 md:pr-4">
                            <div className="col-span-7 @md:col-span-6 sm:pl-0 md:pl-2 mb-1 @md:mb-0">
                                <Link
                                    to={`/pricing?product=${product.slug}`}
                                    className="inline-flex md:flex-col mdlg:flex-row gap-2 md:gap-1 mdlg:gap-2 mdlg:items-center hover:bg-accent dark:bg-accent-dark rounded p-1 text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark"
                                >
                                    {product.icon}
                                    <span className="font-semibold text-[15px]">{product.name}</span>
                                </Link>
                            </div>
                        </div>
                        <div
                            className={`col-span-16 sm:col-span-8 sm:border-t border-light dark:border-dark md:border-t-0 md:col-span-4 pl-7 sm:pl-0 pb-6 md:pl-0 sm:pt-4 md:pb-4 md:pr-8 ${
                                !product.price && 'flex items-center'
                            }`}
                        >
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
                        <div
                            className={`col-span-16 pr-2 md:col-span-4 xl:col-span-5 pl-7 sm:pl-0 pb-8 md:pt-5 md:pb-4 md:pr-8 md:pl-0 empty:py-0 product-${product.slug}`}
                        >
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
            <div className="grid grid-cols-16 p-2 px-4 md:px-2 bg-accent dark:bg-accent-dark md:bg-transparent md:p-0">
                <div className="col-span-16 flex flex-col justify-center md:col-span-8 md:p-3 opacity-75 mb-2 bg-accent dark:bg-accent-dark rounded-tl rounded-bl h-full text-balance">
                    <strong>Monthly estimate for usage-based plans</strong>
                    <span className="text-sm">with billing limits at your selections</span>
                </div>
                <div className="col-span-16 md:col-span-8 p-1 md:pr-4 flex flex-col md:items-end justify-center text-sm opacity-75 mb-2 bg-accent dark:bg-accent-dark rounded-tr rounded-br md:text-right h-full gap-x-4">
                    <div className="flex md:justify-end items-center">
                        {annualPriceAvailable && showAnnualPrice ? (
                            <div>
                                <div className="flex items-baseline">
                                    <Tooltip
                                        content={() => (
                                            <>
                                                <b>${annualTotal}</b> paid yearly
                                            </>
                                        )}
                                        placement="left"
                                    >
                                        <span className={`text-lg font-bold`}>${annualTotalPaidMonthly}</span>
                                    </Tooltip>
                                    <span className="opacity-60 mr-1">/mo</span>
                                    <span className="opacity-60">paid yearly</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-baseline">
                                    <span className={`text-lg font-bold`}>${monthlyTotal.toLocaleString()}</span>
                                    <span className="opacity-60 mr-1">/mo</span>
                                    {annualPriceAvailable && <span className="opacity-60">paid monthly</span>}
                                </div>
                            </div>
                        )}
                    </div>
                    {annualPriceAvailable && (
                        <div className="flex justify-between gap-x-4 shrink-0 border border-light dark:border-dark rounded p-2 pr-4 mt-2 md:mt-1">
                            <p className="text-sm opacity-75 m-0">With 20% annual discount</p>
                            <Toggle checked={showAnnualPrice} onChange={() => setShowAnnualPrice(!showAnnualPrice)} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
