import React, { useEffect } from 'react'
import { PRODUCT_COUNT } from '../../../constants'
import Header from '../Test/Header'
import PlanContent from './PlanContent'

interface PricingHeroProps {
    activePlan: string
    setActivePlan: (plan: string) => void
    onFreeTierClick: () => void
}

const PricingHero = ({ activePlan, setActivePlan, onFreeTierClick }: PricingHeroProps): JSX.Element => {
    const handleFreePlanClick = () => {
        setActivePlan('free')
        window.history.pushState(null, '', '?plan=free')
    }

    const handlePaidPlanClick = () => {
        setActivePlan('paid')
        window.history.pushState(null, '', '?plan=paid')
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const plan = params.get('plan')
        if (plan === 'free' || plan === 'paid') {
            setActivePlan(plan)
        }
    }, [setActivePlan])

    return (
        <>
            <div className="hidden md:block">
                <Header />
            </div>

            <p className="mb-4">
                PostHog is designed to grow with you. Our <strong>{PRODUCT_COUNT}+ products</strong> (and counting) will
                take you from idea to product-market fit to IPO and beyond. 🚀
            </p>

            <p className="mb-4">
                Our generous free tier means{' '}
                <strong>
                    <em>more than 90% of companies use PostHog for free.</em>
                </strong>{' '}
                Only add a card if you need more than the free tier limits, advanced features, or want more projects.
                You still keep the same monthly free volume, even after upgrading.
            </p>

            <div className="not-prose max-w-xs @sm:min-w-2xs @md:max-w-none @md:inline-block">
                <div className="flex justify-between items-end gap-4">
                    <div>
                        {activePlan === 'free' ? (
                            <>
                                <h3 className="mb-0 text-xl">Free</h3>
                                <p className="text-sm mb-4">No credit card required</p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm mb-0">From</p>
                                <h3 className="mb-4 text-xl">
                                    $0<span className="opacity-70 font-normal text-base">/mo</span>
                                </h3>
                            </>
                        )}
                    </div>
                    <div>
                        <a href="#plans" className="inline-block mb-4">
                            <button className="cursor-pointer text-sm font-semibold underline">Compare plans</button>
                        </a>
                    </div>
                </div>

                <ul className="list-none flex flex-col @md:flex-row gap-2 p-0 -mx-4 px-4 md:mx-0 pb-1 md:pb-0 md:px-0 md:mb-6 overflow-x-auto">
                    <li>
                        <button
                            onClick={handleFreePlanClick}
                            className={`w-full flex flex-col py-2 px-4 rounded-md border-2 items-start @md:min-w-56 ${
                                activePlan === 'free'
                                    ? 'border-yellow bg-white dark:bg-white/5'
                                    : 'border-primary bg-accent hover:bg-primary'
                            }`}
                        >
                            <strong className="whitespace-nowrap">Free</strong>
                            <span className="text-sm opacity-75 whitespace-nowrap">Free - no credit card required</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handlePaidPlanClick}
                            className={`w-full flex flex-col py-2 px-4 rounded-md border-2 items-start @md:min-w-56 ${
                                activePlan === 'free'
                                    ? 'border-primary bg-accent hover:bg-primary'
                                    : 'border-yellow bg-white dark:bg-white/5'
                            }`}
                        >
                            <strong className="whitespace-nowrap">Pay-as-you-go</strong>
                            <span className="text-sm opacity-75 whitespace-nowrap">Usage-based pricing</span>
                        </button>
                    </li>
                </ul>
            </div>

            <div className="@5xl/reader-content:hidden not-prose border border-primary rounded-md p-4 bg-light dark:bg-accent">
                <PlanContent activePlan={activePlan} onFreeTierClick={onFreeTierClick} isMainColumn />
            </div>
        </>
    )
}

export default PricingHero
