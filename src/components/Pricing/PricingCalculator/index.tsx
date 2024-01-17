import cntl from 'cntl'
import { Discount } from 'components/NotProductIcons'
import { LogSlider } from 'components/Pricing/PricingSlider/LogSlider'
import {
    FIFTY_MILLION,
    MAX_PRODUCT_ANALYTICS,
    MILLION,
    TEN_MILLION,
    pricingSliderLogic,
} from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { Analytics, SessionRecording, FeatureFlags, Surveys } from 'components/ProductIcons'
import { useActions, useValues } from 'kea'
import React, { useEffect } from 'react'
import Link from 'components/Link'
import { ExternalLink } from 'components/Icons'

export const section = cntl`
    max-w-6xl
    xl:max-w-7xl
    mx-auto
    px-4
`

export const PricingCalculator = () => {
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
        productAnalyticsEventsMaxed,
        surveyResponseSliderValue,
        surveyResponseNumber,
        enterpriseLevelSpend,
        surveyResponseCost,
        showAnnualBilling,
        showHighVolCTA,
    } = useValues(pricingSliderLogic)
    const {
        toggleAnnualBilling,
        setSessionRecordingSliderValue,
        setProductAnalyticsSliderValue,
        setFeatureFlagSliderValue,
        setSurveyResponseSliderValue,
        toggleHighVolCTA,
    } = useActions(pricingSliderLogic)

    useEffect(() => {
        setProductAnalyticsSliderValue(13.815510557964274)
    }, [])

    const anyProductMaxed = productAnalyticsEventsMaxed

    return (
        <section className={`${section} mb-12`}>
            <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
                <div className="col-span-2">
                    <h4 className="mb-1">Pricing calculator</h4>
                    <p className="text-sm">
                        <Link
                            to="/docs/billing/estimating-usage-costs"
                            external={true}
                            className="flex items-center gap-x-1"
                        >
                            How do I estimate my usage? <ExternalLink className="!h-4 !w-4" />
                        </Link>
                    </p>

                    <div className="rounded-md bg-accent dark:bg-accent-dark border border-light dark:border-dark grid grid-cols-4">
                        <div className="font-semibold opacity-70 text-sm border-b border-border dark:border-dark col-span-3 px-4 py-2">
                            Product
                        </div>
                        <div className="font-semibold opacity-70 text-sm border-b border-border dark:border-dark px-4 py-2 text-center">
                            Subtotal
                        </div>
                        <div className="border-b border-light dark:border-dark col-span-3 p-2 pl-10 relative">
                            <span className="w-5 h-5 flex absolute top-3 left-3">{<Analytics />}</span>
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                <strong>Product analytics + data stack</strong>
                                <span>
                                    <span className="text-lg font-bold">{eventNumber.toLocaleString()}</span>{' '}
                                    <span className="opacity-60 text-sm">events</span>
                                </span>
                            </div>
                            <div className="pt-4 pb-6">
                                <LogSlider
                                    stepsInRange={100}
                                    marks={[MILLION, TEN_MILLION, FIFTY_MILLION]}
                                    min={MILLION}
                                    max={MAX_PRODUCT_ANALYTICS}
                                    onChange={(value) => setProductAnalyticsSliderValue(value)}
                                    value={productAnalyticsSliderValue}
                                />
                            </div>
                        </div>
                        <div className="border-b border-border dark:border-dark p-2 text-center">
                            <span className="text-lg font-bold">
                                {productAnalyticsEventsMaxed
                                    ? 'Contact us'
                                    : `$${productAnalyticsCost.toLocaleString()}`}{' '}
                            </span>
                        </div>
                        <div className="border-b border-light dark:border-dark col-span-3 p-2 pl-10 relative">
                            <span className="w-5 h-5 flex absolute top-3 left-3">{<SessionRecording />}</span>
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                <strong>Session replay</strong>
                                <span>
                                    <span className="text-lg font-bold">
                                        {sessionRecordingEventNumber.toLocaleString()}
                                    </span>{' '}
                                    <span className="opacity-60 text-sm">recordings</span>
                                </span>
                            </div>
                            <div className="pt-4 pb-6">
                                <LogSlider
                                    stepsInRange={100}
                                    marks={[5000, 25000, 120000, 500000]}
                                    min={5000}
                                    max={500000}
                                    onChange={(value) => setSessionRecordingSliderValue(value)}
                                    value={sessionRecordingSliderValue}
                                />
                            </div>
                        </div>
                        <div className="border-b border-border dark:border-dark p-2 text-center">
                            <span className="text-lg font-bold">${sessionRecordingCost.toLocaleString()}</span>
                        </div>
                        <div className="border-b border-light dark:border-dark col-span-3 p-2 pl-10 relative">
                            <span className="w-5 h-5 flex absolute top-3 left-3">{<FeatureFlags />}</span>
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                <strong>Feature flags</strong>
                                <span>
                                    <span className="text-lg font-bold">{featureFlagNumber.toLocaleString()}</span>{' '}
                                    <span className="opacity-60 text-sm">requests</span>
                                </span>
                            </div>
                            <div className="pt-4 pb-6">
                                <LogSlider
                                    stepsInRange={100}
                                    marks={[1000000, 10000000, 100000000, 1000000000]}
                                    min={1000000}
                                    max={1000000000}
                                    onChange={(value) => setFeatureFlagSliderValue(value)}
                                    value={featureFlagSliderValue}
                                />
                            </div>
                        </div>
                        <div className="border-b border-border dark:border-dark p-2 text-center">
                            <span className="text-lg font-bold">${featureFlagCost.toLocaleString()}</span>
                        </div>
                        <div className="border-b border-light dark:border-dark col-span-3 p-2 pl-10 relative">
                            <span className="w-5 h-5 flex absolute top-3 left-3">{<Surveys />}</span>
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                <strong>Surveys</strong>
                                <span>
                                    <span className="text-lg font-bold">{surveyResponseNumber.toLocaleString()}</span>{' '}
                                    <span className="opacity-60 text-sm">responses</span>
                                </span>
                            </div>
                            <div className="pt-4 pb-6">
                                <LogSlider
                                    stepsInRange={100}
                                    marks={[250, 2000, 15000, 100000]}
                                    min={250}
                                    max={100000}
                                    onChange={(value) => setSurveyResponseSliderValue(value)}
                                    value={surveyResponseSliderValue}
                                />
                            </div>
                        </div>
                        <div className="border-b border-border dark:border-dark p-2 text-center">
                            <span className="text-lg font-bold">${surveyResponseCost.toLocaleString()}</span>
                        </div>
                        {anyProductMaxed ? (
                            <>
                                <div className="col-span-3 p-4">
                                    <strong>
                                        We've got special deals for customers who require larger volumes.{' '}
                                        <div>
                                            <Link to="mailto:sales@posthog.com">Get in touch</Link>
                                        </div>
                                    </strong>
                                </div>
                                <div className="p-4 text-center self-center">
                                    {showHighVolCTA ? (
                                        <button className="text-sm" onClick={() => toggleHighVolCTA()}>
                                            Show me the price!
                                        </button>
                                    ) : (
                                        <>
                                            <span className="text-lg font-bold">
                                                $
                                                {showAnnualBilling
                                                    ? (monthlyTotal * 0.8).toLocaleString()
                                                    : monthlyTotal.toLocaleString()}
                                            </span>
                                            <span className="opacity-60">
                                                /mo <p className="text-sm mb-0">paid annually</p>
                                            </span>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-span-3 p-4">
                                    <strong>
                                        <button>
                                            {enterpriseLevelSpend && showAnnualBilling ? 'Annual' : 'Monthly'}
                                        </button>{' '}
                                        estimate{' '}
                                        {enterpriseLevelSpend &&
                                            showAnnualBilling &&
                                            `(20% annual savings of $${(
                                                monthlyTotal * 2.4
                                            ).toLocaleString()} included)`}
                                    </strong>
                                    <br />
                                    <p className="opacity-60 text-sm mb-0">
                                        Cost with billing limits set at your selections
                                    </p>
                                </div>
                                <div className="p-4 text-center">
                                    {enterpriseLevelSpend ? (
                                        <>
                                            <span className="text-lg font-bold">
                                                $
                                                {showAnnualBilling
                                                    ? (monthlyTotal * 0.8).toLocaleString()
                                                    : monthlyTotal.toLocaleString()}
                                            </span>
                                            <span className="opacity-60">
                                                /mo {showAnnualBilling && <p className="text-sm mb-0">paid annually</p>}
                                            </span>
                                            <button className="text-sm" onClick={() => toggleAnnualBilling()}>
                                                Switch to {showAnnualBilling ? 'monthly' : 'annual'} billing
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-lg font-bold">${monthlyTotal.toLocaleString()}</span>
                                            <span className="opacity-60">/mo</span>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div>
                    <h4 className="border-b border-border dark:border-dark pb-2 mb-3">Discounts</h4>

                    <div className="pl-10 relative mb-4">
                        <span className="w-6 h-6 absolute top-0 left-1">
                            <Discount />
                        </span>

                        <h5 className="text-base mb-0">Non-profits</h5>
                        <p className="text-[15px] mb-1">50% off in most cases. Get in touch after signing up.</p>
                    </div>

                    <div className="pl-10 relative mb-4">
                        <span className="w-6 h-6 absolute top-0 left-1">
                            <Discount />
                        </span>

                        <h5 className="text-base mb-0">Startups</h5>
                        <p className="text-[15px] mb-1">
                            If your startup is under two years old and has raised less than $5m, check out our{' '}
                            <Link to="/startups">startup program</Link>.
                        </p>
                    </div>

                    {enterpriseLevelSpend && (
                        <div className="pl-10 relative mb-4">
                            <span className="w-6 h-6 absolute top-0 left-1">
                                <Discount />
                            </span>

                            <h5 className="text-base mb-0">Annual plan</h5>
                            <p className="text-[15px] mb-1">
                                Take 20% off your bill by switching to up-front annual billing.{' '}
                                <Link to="mailto:sales@posthog.com"> Contact us</Link> to learn more.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
