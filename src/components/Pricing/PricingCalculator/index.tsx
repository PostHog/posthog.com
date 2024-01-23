import cntl from 'cntl'
import { Discount } from 'components/NotProductIcons'
import { LinearSlider, LogSlider, sliderCurve } from 'components/Pricing/PricingSlider/Slider'
import { pricingSliderLogic } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { Analytics, SessionRecording, FeatureFlags, Surveys } from 'components/ProductIcons'
import { useActions, useValues } from 'kea'
import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import { ExternalLink } from 'components/Icons'
import Toggle from 'components/Toggle'
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
        sessionReplayRecordingsMaxed,
        featureFlagsRequestsMaxed,
        surveyResponsesMaxed,
    } = useValues(pricingSliderLogic)
    const {
        toggleAnnualBilling,
        setSessionRecordingSliderValue,
        setProductAnalyticsSliderValue,
        setFeatureFlagSliderValue,
        setSurveyResponseSliderValue,
        toggleHighVolCTA,
    } = useActions(pricingSliderLogic)

    const posthog = usePostHog()
    const [enterprise_flag_enabled, set_enterprise_flag_enabled] = useState(false)

    useEffect(() => {
        posthog?.onFeatureFlags(() => {
            if (posthog.getFeatureFlag(ENTERPRISE_PRICING_TABLE) === 'test') {
                set_enterprise_flag_enabled(true)
            }
        })
    }, [posthog])

    const anyProductMaxed =
        enterprise_flag_enabled &&
        (productAnalyticsEventsMaxed ||
            sessionReplayRecordingsMaxed ||
            featureFlagsRequestsMaxed ||
            surveyResponsesMaxed)

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
                                {enterprise_flag_enabled ? (
                                    <LinearSlider
                                        stepsInRange={100}
                                        marks={[MILLION, TEN_MILLION, TWENTY_FIVE_MILLION, FIFTY_MILLION]}
                                        min={MILLION}
                                        max={MAX_PRODUCT_ANALYTICS}
                                        onChange={(value) => setProductAnalyticsSliderValue(value, (x: number) => x)}
                                        value={productAnalyticsSliderValue}
                                    />
                                ) : (
                                    <LogSlider
                                        stepsInRange={100}
                                        marks={[MILLION, TEN_MILLION, HUNDRED_MILLION, BILLION]}
                                        min={MILLION}
                                        max={BILLION}
                                        onChange={(value) => setProductAnalyticsSliderValue(value, sliderCurve)}
                                        value={productAnalyticsSliderValue}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="border-b border-border dark:border-dark p-2 text-center">
                            <span className="text-lg font-bold">
                                {productAnalyticsEventsMaxed && enterprise_flag_enabled
                                    ? 'Contact us'
                                    : `$${productAnalyticsCost.toLocaleString()}`}
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
                                {enterprise_flag_enabled ? (
                                    <LinearSlider
                                        stepsInRange={100}
                                        marks={[5000, 50000, 100000, MAX_SESSION_REPLAY]}
                                        min={5000}
                                        max={MAX_SESSION_REPLAY}
                                        onChange={(value) => setSessionRecordingSliderValue(value)}
                                        value={sessionRecordingSliderValue}
                                    />
                                ) : (
                                    <LogSlider
                                        stepsInRange={100}
                                        marks={[5000, 25000, 120000, 500000]}
                                        min={5000}
                                        max={500000}
                                        onChange={(value) => setSessionRecordingSliderValue(value, sliderCurve)}
                                        value={sessionRecordingSliderValue}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="border-b border-border dark:border-dark p-2 text-center">
                            <span className="text-lg font-bold">
                                {sessionReplayRecordingsMaxed && enterprise_flag_enabled
                                    ? 'Contact us'
                                    : `$${sessionRecordingCost.toLocaleString()}`}
                            </span>
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
                                {enterprise_flag_enabled ? (
                                    <LinearSlider
                                        stepsInRange={100}
                                        marks={[MILLION, FIVE_MILLION, MAX_FEATURE_FLAGS]}
                                        min={MILLION}
                                        max={MAX_FEATURE_FLAGS}
                                        onChange={(value) => setFeatureFlagSliderValue(value)}
                                        value={featureFlagSliderValue}
                                    />
                                ) : (
                                    <LogSlider
                                        stepsInRange={100}
                                        marks={[1000000, 10000000, 100000000, 1000000000]}
                                        min={1000000}
                                        max={1000000000}
                                        onChange={(value) => setFeatureFlagSliderValue(value, sliderCurve)}
                                        value={featureFlagSliderValue}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="border-b border-border dark:border-dark p-2 text-center">
                            <span className="text-lg font-bold">
                                {featureFlagsRequestsMaxed && enterprise_flag_enabled
                                    ? 'Contact us '
                                    : `$${featureFlagCost.toLocaleString()}`}
                            </span>
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
                                {enterprise_flag_enabled ? (
                                    <LinearSlider
                                        stepsInRange={100}
                                        marks={[250, 5000, MAX_SURVEYS]}
                                        min={250}
                                        max={MAX_SURVEYS}
                                        onChange={(value) => setSurveyResponseSliderValue(value)}
                                        value={surveyResponseSliderValue}
                                    />
                                ) : (
                                    <LogSlider
                                        stepsInRange={100}
                                        marks={[250, 2000, 15000, 100000]}
                                        min={250}
                                        max={100000}
                                        onChange={(value) => setSurveyResponseSliderValue(value, sliderCurve)}
                                        value={surveyResponseSliderValue}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="border-b border-border dark:border-dark p-2 text-center">
                            <span className="text-lg font-bold">
                                {surveyResponsesMaxed && enterprise_flag_enabled
                                    ? 'Contact us'
                                    : `$${surveyResponseCost.toLocaleString()}`}
                            </span>
                        </div>
                        {anyProductMaxed ? (
                            <>
                                <div className="col-span-3 p-4">
                                    <strong>
                                        We've got special deals for customers who require larger volumes.{' '}
                                        <div className="text-sm">
                                            <Link to="/contact-sales">Get in touch</Link>
                                        </div>
                                    </strong>
                                </div>
                                <div className="p-3 text-center self-center">
                                    {showHighVolCTA ? (
                                        <button
                                            className={`${button('secondary', 'auto', '', 'md')} self-center`}
                                            onClick={() => toggleHighVolCTA()}
                                        >
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
                                                /mo
                                                <div className="text-sm mb-0 flex justify-evenly ">
                                                    paid annually
                                                    <Toggle
                                                        checked={showAnnualBilling}
                                                        onChange={() => toggleAnnualBilling()}
                                                    />
                                                </div>
                                            </span>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-span-3 p-4">
                                    <div className="flex gap-2">
                                        <strong>
                                            <button>
                                                {enterpriseLevelSpend && showAnnualBilling && enterprise_flag_enabled
                                                    ? 'Annual'
                                                    : 'Monthly'}
                                            </button>{' '}
                                            estimate{' '}
                                            {enterpriseLevelSpend &&
                                                showAnnualBilling &&
                                                enterprise_flag_enabled &&
                                                `(20% annual savings of $${(
                                                    monthlyTotal * 2.4
                                                ).toLocaleString()} included)`}
                                        </strong>
                                    </div>
                                    <p className="opacity-60 text-sm mb-0">
                                        Cost with billing limits set at your selections
                                    </p>
                                </div>
                                <div className="p-3 text-center">
                                    {enterpriseLevelSpend && enterprise_flag_enabled ? (
                                        <>
                                            <span className="text-lg font-bold">
                                                $
                                                {showAnnualBilling
                                                    ? (monthlyTotal * 0.8).toLocaleString()
                                                    : monthlyTotal.toLocaleString()}
                                            </span>
                                            <span className="opacity-60">
                                                /mo
                                                {enterprise_flag_enabled && (
                                                    <div className="text-sm mb-0 flex justify-evenly ">
                                                        paid annually
                                                        {enterpriseLevelSpend && (
                                                            <Toggle
                                                                checked={showAnnualBilling}
                                                                onChange={() => toggleAnnualBilling()}
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </span>
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

                    {(enterpriseLevelSpend || anyProductMaxed) && enterprise_flag_enabled && (
                        <div className="pl-10 relative mb-4">
                            <span className="w-6 h-6 absolute top-0 left-1">
                                <Discount />
                            </span>

                            <h5 className="text-base mb-0">Annual plan</h5>
                            <p className="text-[15px] mb-1">
                                Take 20% off your bill by switching to up-front annual billing.{' '}
                                <Link to="/contact-sales"> Contact us</Link> to learn more.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
