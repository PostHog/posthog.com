import React from 'react'
import { useValues } from 'kea'
import { features } from './Plans'
import { Plan, Features, Section, Price } from './Plan'
import { pricingSliderLogic } from '../../PricingSlider/pricingSliderLogic'
import { PricingSlider } from '../../PricingSlider'
import { Close } from 'components/Icons/Icons'
import { CallToAction } from 'components/CallToAction'
import { Modal } from 'components/Modal'

export default function ScaleModal({ setOpen, open, hideActions, hideBadge }) {
    const { finalCost, eventNumber } = useValues(pricingSliderLogic)
    const eventNumberWithDelimiter = eventNumber.toLocaleString()
    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="absolute w-full max-w-[1045px] top-0 p-8 left-1/2 transform -translate-x-1/2 box-content">
                <div className="relative bg-white p-14 rounded-md shadow-lg">
                    <div className=" flex space-x-14 items-start">
                        <Plan
                            title="Scale"
                            subtitle="For large userbases or event volumes"
                            badge={!hideBadge && 'INCLUDES OPEN SOURCE FEATURES'}
                            className="pt-0 pb-0 pl-0 pr-0 flex-grow"
                        >
                            <Section title="Advanced features">
                                <Features features={features['Advanced features']} />
                            </Section>
                            <Section title="Collaboration">
                                <Features features={features['Collaboration']} />
                            </Section>
                            {!hideActions && (
                                <>
                                    <Section title="Pricing starts at" className="mt-auto">
                                        <Price>
                                            $2,000<span className="text-base opacity-50">/mo</span>
                                        </Price>
                                    </Section>
                                    <CallToAction className="mt-7 mb-3">Get started</CallToAction>
                                    <CallToAction type="outline" className="bg-white">
                                        Book a demo
                                    </CallToAction>
                                </>
                            )}
                        </Plan>
                        <Plan
                            title="Calculate your price"
                            subtitle="Pay based on the events you capture each month."
                            className="border border-dashed border-gray-accent-light rounded-sm flex-shrink-0"
                        >
                            <div className="mb-4">
                                <div className="flex justify-between items-center mt-7">
                                    <div className="mb-0 text-sm text-primary text-opacity-75">
                                        Monthly event volume
                                    </div>
                                    <div className="font-bold text-base">{eventNumberWithDelimiter}</div>
                                </div>

                                <PricingSlider
                                    marks={[8000000, 10000000, 100000000, 150000000]}
                                    min={8000000}
                                    max={150000000}
                                />
                            </div>

                            <div className="mb-4 border border-white border-opacity-10 rounded">
                                <div className="flex justify-between items-baseline p-2 rounded mb-1 bg-gray-accent-light">
                                    <div className="mb-0 text-xs text-almost-black text-opacity-75">Event volume</div>
                                    <div className="opacity-50 text-2xs text-right">Monthly price per event</div>
                                </div>
                                <dl className="flex justify-between mb-0 p-2">
                                    <dt className="mb-0 opacity-75 text-xs">First 10 million</dt>
                                    <dd className="mb-0 font-bold text-xs">$0.000225</dd>
                                </dl>
                                <dl className="flex justify-between mb-0 p-2">
                                    <dt className="mb-0 opacity-75 text-xs">10-100 million</dt>
                                    <dd className="mb-0 font-bold text-xs">$0.000045</dd>
                                </dl>
                                <dl className="flex justify-between mb-0 p-2">
                                    <dt className="mb-0 opacity-75 text-xs">100 million - 1 billion</dt>
                                    <dd className="mb-0 font-bold text-xs">$0.000009</dd>
                                </dl>
                                <dl className="flex justify-between mb-0 p-2 pb-3">
                                    <dt className="mb-0 opacity-75 text-xs">More than 1 billion</dt>
                                    <dd className="mb-0 font-bold text-xs">Even cheaper</dd>
                                </dl>
                            </div>

                            <div className="flex justify-between items-baseline">
                                <div className="mb-0 text-sm font-bold text-almost-black text-opacity-75">
                                    Monthly minimum price
                                </div>
                                <div className="mb-0 flex items-baseline">
                                    <div className="text-base">${finalCost}</div>
                                    <div className="opacity-50">/mo</div>
                                </div>
                            </div>

                            <hr className="border-gray-accent-light bg-transparent border-dashed border-r-0 border-b-0 border-left-0 my-2 border-t" />

                            <div className="flex justify-between items-baseline">
                                <div className="text-base mb-0 font-bold">Estimated price</div>
                                <div className="mb-0 font-bold flex items-baseline">
                                    <div className="text-base">${finalCost}</div>
                                    <div className="opacity-50">/mo</div>
                                </div>
                            </div>
                        </Plan>
                    </div>
                    <button onClick={() => setOpen(false)}>
                        <Close className="absolute top-6 right-6" />
                    </button>
                </div>
            </div>
        </Modal>
    )
}
