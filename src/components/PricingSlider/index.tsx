import React from 'react'
import { useValues, useActions } from 'kea'
import { pricingSliderLogic } from './pricingSliderLogic'
import { LogSlider } from './LogSlider'

export const PricingSlider = () => {
    const { finalCost, additionalUnitPrice, pricingOption } = useValues(pricingSliderLogic)
    const { setSliderValue } = useActions(pricingSliderLogic)

    return (
        <>
            <div className="main-price">
                {pricingOption === 'self-hosted' ? (
                    <div>
                        First <b>8,000,000</b> events are included every single month.
                    </div>
                ) : (
                    <div>
                        First <b>1,000,000 events are free</b> every single month.
                    </div>
                )}
            </div>
            <br />
            <br />
            <div>
                <LogSlider
                    min={10000}
                    max={150000000}
                    marks={[10000, 100000, 1000000, 10000000, 100000000]}
                    stepsInRange={100}
                    onChange={(value) => setSliderValue(value)}
                />
                <br />
                <br />
                <div>
                    {pricingOption === 'self-hosted' ? `$${additionalUnitPrice}` : '$0.000225'}
                    <span>/additional event ingested</span>
                    {pricingOption === 'self-hosted' ? (
                        <span>
                            {' '}
                            - <strong>decreases as volume grows</strong>. Try it with the slider.
                        </span>
                    ) : null}
                </div>
                <br />
                <br />
                <div style={{ fontSize: '1rem', textAlign: 'right' }}>
                    <span className="text-muted">Price:</span> <b>${finalCost}</b>/month
                </div>
            </div>
        </>
    )
}
