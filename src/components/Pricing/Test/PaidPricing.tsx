import React, { useState } from 'react'
import { section } from './Sections'
import * as Icons from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { Accordion } from './PricingAccordion'
import { Link as ScrollLink } from 'react-scroll'

export const PaidPricing = () => {
    const [expanded, setExpanded] = useState(false)

    return (
        <section className={`${section} `}>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <div className="max-w-lg">
                        <h4 className="text-2xl">Usage-based pricing</h4>
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

                        <ScrollLink to="calculator" offset={-120} smooth className="inline-block mb-4">
                            <CallToAction size="sm" type="secondary">
                                Pricing calculator
                            </CallToAction>
                        </ScrollLink>
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
