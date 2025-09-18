import React from 'react'
import useProducts from 'hooks/useProducts'
import { LogSlider, inverseCurve, sliderCurve } from '../PricingSlider/Slider'
import { formatUSD } from '../PricingSlider/pricingSliderLogic'
import { PricingTiers } from '../Plans'
import { NumericFormat } from 'react-number-format'
import AutosizeInput from 'react-input-autosize'

export default function SingleProductPricing({ productType }: { productType: string }) {
    const { products, setVolume } = useProducts()
    const activeProduct = products.find((product) => product.type === productType) || products[0]
    const { type, cost, volume, billingData, slider, costByTier } = activeProduct

    return (
        <div className="w-full flex-1 max-w-4xl">
            <div className="mb-6">
                <div className="grid grid-cols-8">
                    <div className="col-span-6">
                        <p className="mb-2">
                            <NumericFormat
                                inputClassName="bg-transparent text-center focus:ring-0 focus:border-red dark:focus:border-yellow focus:bg-white dark:focus:bg-accent-dark font-code max-w-[103px] text-sm border border-light hover:border-button dark:border-dark rounded-sm py-1 px-0 min-w-[25px] px-1"
                                value={volume}
                                thousandSeparator=","
                                onValueChange={({ floatValue }) => setVolume(type, floatValue || 0)}
                                customInput={AutosizeInput}
                            />{' '}
                            <span className="opacity-70 text-sm">{billingData.unit}s/month</span>
                        </p>
                    </div>
                    <div className="col-span-2 text-right pr-3">
                        <p className="font-semibold mb-0">{formatUSD(cost)}</p>
                    </div>
                    {slider && (
                        <div className="col-span-full pr-1.5">
                            <LogSlider
                                stepsInRange={100}
                                marks={slider.marks}
                                min={slider.min}
                                max={slider.max}
                                onChange={(value) => setVolume(type, sliderCurve(value))}
                                value={inverseCurve(volume || 0)}
                            />
                        </div>
                    )}
                </div>

                <div className="mt-8 p-1 border border-border dark:border-dark rounded-md hidden @md:block">
                    <PricingTiers plans={[{ tiers: costByTier }]} unit={billingData.unit} type={type} showSubtotal />
                </div>
            </div>
        </div>
    )
}
