import { kea } from 'kea'
import { inverseCurve, sliderCurve } from './Slider'
import {
    MAX_FEATURE_FLAGS,
    MAX_PRODUCT_ANALYTICS,
    MAX_SESSION_REPLAY,
    MAX_SURVEYS,
    MILLION,
    pricingLogic,
} from '../pricingLogic'

import type { pricingSliderLogicType } from './pricingSliderLogicType'

const getTiers = (pricingOption) => {
    const tiers = pricingSliderLogic.values.availableProducts
        .find((product) => product.type === pricingOption)
        ?.plans.find((plan) => plan.tiers)?.tiers
    return tiers
}

export const formatUSD = (number, trailingZeros = false) => {
    const usd = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    return usd.format(number).replace('.00', trailingZeros ? '.00' : '')
}

export const calculatePrice = (eventNumber: number, tiers): { total: number; costByTier: any } => {
    let finalCost = 0
    let alreadyCountedEvents = 0

    if (!tiers) {
        return 0
    }
    const costByTier = []
    for (const { up_to, unit_amount_usd, ...rest } of tiers) {
        const remainingEvents = Math.max(eventNumber - alreadyCountedEvents, 0)
        const eventsInThisTier = up_to
            ? remainingEvents < up_to - alreadyCountedEvents
                ? remainingEvents
                : up_to - alreadyCountedEvents
            : remainingEvents
        const tierCost = eventsInThisTier * parseFloat(unit_amount_usd)
        finalCost = finalCost + tierCost
        // the last tier has null up_to so we set it to an arbitrarily high number
        alreadyCountedEvents = up_to ?? 10000000000

        costByTier.push({ ...rest, up_to, unit_amount_usd, tierCost, eventsInThisTier })
    }

    return { total: Math.round(finalCost), costByTier }
}

export type PricingOptionType = 'product_analytics' | 'session_replay' | 'feature_flags' | 'surveys'

export const pricingSliderLogic = kea<pricingSliderLogicType>({
    connect: {
        values: [pricingLogic, ['availableProducts']],
        actions: [pricingLogic, ['loadAvailableProducts']],
    },
    actions: {
        setEventNumber: (value: number) => ({ value }),
        setInputValue: (value: number) => ({ value }),
        setProductAnalyticsSliderValue: (value: number, sliderCurve?: (x: number) => number) => ({
            value,
            sliderCurve,
        }),
        setPricingOption: (option: PricingOptionType) => ({ option }),
        setSessionRecordingSliderValue: (value: number, sliderCurve?: (x: number) => number) => ({
            value,
            sliderCurve,
        }),
        setSessionRecordingInputValue: (value: number) => ({ value }),
        setFeatureFlagSliderValue: (value: number, sliderCurve?: (x: number) => number) => ({ value, sliderCurve }),
        setFeatureFlagInputValue: (value: number) => ({ value }),
        setSurveyResponseSliderValue: (value: number, sliderCurve?: (x: number) => number) => ({ value, sliderCurve }),
        setSurveyResponseInputValue: (value: number) => ({ value }),
        toggleAnnualBilling: true,
        toggleHighVolCTA: true,
    },
    reducers: {
        surveyResponseNumber: [
            250,
            {
                setSurveyResponseSliderValue: (
                    _: null,
                    { value, sliderCurve }: { value: number; sliderCurve?: (x: number) => number }
                ) => {
                    return Math.round(sliderCurve ? sliderCurve(value) : value)
                },
                setSurveyResponseInputValue: (_: null, { value }: { value: number }) => value * 1000000,
            },
        ],
        featureFlagNumber: [
            1000000,
            {
                setFeatureFlagSliderValue: (
                    _: null,
                    { value, sliderCurve }: { value: number; sliderCurve?: (x: number) => number }
                ) => Math.round(sliderCurve ? sliderCurve(value) : value),
                setFeatureFlagInputValue: (_: null, { value }: { value: number }) => value * 1000000,
            },
        ],
        sessionRecordingEventNumber: [
            5000,
            {
                setSessionRecordingSliderValue: (
                    _: null,
                    { value, sliderCurve }: { value: number; sliderCurve?: (x: number) => number }
                ) => Math.round(sliderCurve ? sliderCurve(value) : value),
                setSessionRecordingInputValue: (_: null, { value }: { value: number }) => value * 1000000,
            },
        ],
        eventNumber: [
            MILLION,
            {
                setProductAnalyticsSliderValue: (
                    _: null,
                    { value, sliderCurve }: { value: number; sliderCurve?: (x: number) => number }
                ) => Math.round(sliderCurve ? sliderCurve(value) : value),
                setInputValue: (_: null, { value }: { value: number }) => value * 1000000,
            },
        ],
        productAnalyticsSliderValue: [
            null,
            {
                setProductAnalyticsSliderValue: (_: null, { value }: { value: number }) => value,
                setInputValue: (_: null, { value }: { value: number }) => inverseCurve(value * 1000000),
            },
        ],
        inputValue: [
            1,
            {
                setProductAnalyticsSliderValue: (_: null, { value }: { value: number }) =>
                    Math.round(sliderCurve(value) / 1000000),
                setInputValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        sessionRecordingSliderValue: [
            null,
            {
                setSessionRecordingSliderValue: (_: null, { value }: { value: number }) => value,
                setSessionRecordingInputValue: (_: null, { value }: { value: number }) => inverseCurve(value * 1000000),
            },
        ],
        sessionRecordingInputValue: [
            1,
            {
                setSessionRecordingSliderValue: (_: null, { value }: { value: number }) =>
                    Math.round(sliderCurve(value) / 1000000),
                setSessionRecordingInputValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        surveyResponseSliderValue: [
            null,
            {
                setSurveyResponseSliderValue: (_: null, { value }: { value: number }) => value,
                setSurveyResponseInputValue: (_: null, { value }: { value: number }) => inverseCurve(value * 1000000),
            },
        ],
        surveyResponseInputValue: [
            1,
            {
                setSurveyResponseSliderValue: (_: null, { value }: { value: number }) =>
                    Math.round(sliderCurve(value) / 1000000),
                setSurveyResponseInputValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        featureFlagSliderValue: [
            null,
            {
                setFeatureFlagSliderValue: (_: null, { value }: { value: number }) => value,
                setFeatureFlagInputValue: (_: null, { value }: { value: number }) => inverseCurve(value * 1000000),
            },
        ],
        featureFlagInputValue: [
            1,
            {
                setFeatureFlagSliderValue: (_: null, { value }: { value: number }) =>
                    Math.round(sliderCurve(value) / 1000000),
                setFeatureFlagInputValue: (_: null, { value }: { value: number }) => value,
            },
        ],
        pricingOption: [
            'product-analytics',
            {
                setPricingOption: (_: null, { option }: { option: string }) => option,
            },
        ],
        showAnnualBilling: [
            true,
            {
                toggleAnnualBilling: (state) => !state,
            },
        ],
        showHighVolCTA: [true, { toggleHighVolCTA: (state) => !state }],
    },
    selectors: ({ actions, values }) => ({
        finalCost: [
            (s) => [s.eventNumber, s.pricingOption],
            (eventNumber: number, pricingOption: PricingOptionType) => {
                return calculatePrice(eventNumber, getTiers(pricingOption))
            },
        ],
        sessionRecordingCost: [
            (s) => [s.sessionRecordingEventNumber],
            (sessionRecordingEventNumber: number) => {
                return calculatePrice(sessionRecordingEventNumber, getTiers('session_replay'))
            },
        ],
        productAnalyticsCost: [
            (s) => [s.eventNumber],
            (eventNumber: number) => {
                return calculatePrice(eventNumber, getTiers('product_analytics'))
            },
        ],
        featureFlagCost: [
            (s) => [s.featureFlagNumber],
            (featureFlagNumber: number) => {
                return calculatePrice(featureFlagNumber, getTiers('feature_flags'))
            },
        ],
        surveyResponseCost: [
            (s) => [s.surveyResponseNumber],
            (surveyResponseNumber: number) => {
                return calculatePrice(surveyResponseNumber, getTiers('surveys'))
            },
        ],
        monthlyTotal: [
            (s) => [s.sessionRecordingEventNumber, s.eventNumber, s.featureFlagNumber, s.surveyResponseNumber],
            (
                sessionRecordingEventNumber: number,
                eventNumber: number,
                featureFlagNumber: number,
                surveyResponseNumber: number
            ) => {
                return (
                    calculatePrice(eventNumber, getTiers('product_analytics')) +
                    calculatePrice(sessionRecordingEventNumber, getTiers('session_replay')) +
                    calculatePrice(featureFlagNumber, getTiers('feature_flags')) +
                    calculatePrice(surveyResponseNumber, getTiers('surveys'))
                )
            },
        ],
        enterpriseLevelSpend: [
            (s) => [s.monthlyTotal],
            (monthlyTotal: number) => {
                return monthlyTotal > 1667
            },
        ],
        productAnalyticsEventsMaxed: [
            (s) => [s.eventNumber],
            (eventNumber: number) => {
                return eventNumber >= MAX_PRODUCT_ANALYTICS
            },
        ],
        sessionReplayRecordingsMaxed: [
            (s) => [s.sessionRecordingEventNumber],
            (recordings: number) => {
                return recordings >= MAX_SESSION_REPLAY
            },
        ],
        featureFlagsRequestsMaxed: [
            (s) => [s.featureFlagNumber],
            (requests: number) => {
                return requests >= MAX_FEATURE_FLAGS
            },
        ],
        surveyResponsesMaxed: [
            (s) => [s.surveyResponseNumber],
            (responses: number) => {
                return responses >= MAX_SURVEYS
            },
        ],
        finalMonthlyCost: [
            (s) => [s.finalCost],
            (finalCost: number) => {
                return finalCost.toLocaleString()
            },
        ],
        finalAnnualCost: [
            (s) => [s.finalCost],
            (finalCost: number) => {
                const finalAnnualCost = finalCost * 10.8
                return finalAnnualCost.toLocaleString()
            },
        ],
    }),
    events: ({ actions }) => ({
        afterMount: () => {
            actions.loadAvailableProducts()
        },
    }),
})
export { MAX_FEATURE_FLAGS, MAX_PRODUCT_ANALYTICS, MAX_SESSION_REPLAY, MAX_SURVEYS, MILLION }
