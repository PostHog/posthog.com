import React, { useState } from 'react'
import { section, SectionHeader } from './Sections'
import * as Icons from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { Accordion } from './PricingAccordion'
import ScrollToElement from 'components/ScrollToElement'

export const PaidPricing = () => {
    const [expanded, setExpanded] = useState(false)

    return (
        <section id="rates" className={`${section} `}>
            <div className="grid @4xl:grid-cols-2 gap-12">
                <div>
                    <div className="@4xl:max-w-lg">
                        <div className="@4xl:hidden">
                            <SectionHeader>
                                <h2>Usage-based pricing</h2>
                            </SectionHeader>
                        </div>

                        <h3 className="hidden @4xl:block text-2xl font-bold">Usage-based pricing</h3>
                        <p>
                            If your usage goes beyond the free tier limits, we offer{' '}
                            <strong>usage-based pricing.</strong> You can set a billing limit for each product so you
                            never get an unexpected bill.
                        </p>

                        <p className="mb-3">
                            <strong>
                                Add a{' '}
                                <Icons.IconCreditCard className="size-6 inline-block -rotate-6 relative -top-0.5" />{' '}
                                credit card and also get:
                            </strong>
                        </p>

                        <ul className="mb-4 pl-6">
                            <li>
                                <s>1 project</s>{' '}
                                <span className="bg-highlight p-0.5 font-bold text-[15px] italic text-red dark:text-yellow">
                                    6 projects
                                </span>
                            </li>
                            <li>
                                <s>1-year data retention</s>{' '}
                                <span className="bg-highlight p-0.5 font-bold text-[15px] italic text-red dark:text-yellow">
                                    7-year data retention
                                </span>
                            </li>
                            <li>
                                <s>Community support</s>{' '}
                                <span className="bg-highlight p-0.5 font-bold text-[15px] italic text-red dark:text-yellow">
                                    Email support
                                </span>
                            </li>
                        </ul>

                        <ScrollToElement
                            targetId="calculator"
                            offset={-20}
                            as="div"
                            className="inline-block mb-4 cursor-pointer"
                        >
                            <CallToAction size="sm" type="secondary">
                                Pricing calculator
                            </CallToAction>
                        </ScrollToElement>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col md:flex-row justify-between">
                        <div>
                            <h4 className="mb-0 tracking-tight">Rates (after the monthly free tier)</h4>
                            <p className="text-sm opacity-60 mb-2">Prices reduce with scale</p>
                        </div>
                        <div className="hidden md:block">
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="text-sm text-red dark:text-order font-bold"
                            >
                                {expanded ? 'Collapse' : 'Expand'} all
                            </button>
                        </div>
                    </div>

                    <Accordion allExpanded={expanded} setAllExpanded={setExpanded} />
                </div>
            </div>
        </section>
    )
}
