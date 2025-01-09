import React from 'react'
import { useActions, useValues } from 'kea'
import { pricingSliderLogic } from 'components/Pricing/PricingSlider/pricingSliderLogic'

import {
    IconGraph,
    IconChevronDown,
    IconRewindPlay,
    IconToggle,
    IconFlask,
    IconMessage,
    IconInfo,
    IconArrowRight,
    IconArrowRightDown,
} from '@posthog/icons'

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
} from './pricingLogic'

import { LinearSlider, LogSlider, sliderCurve } from 'components/Pricing/PricingSlider/Slider'
import { useStaticQuery } from 'gatsby'
import { allProductsData } from './Pricing'

export const useProducts = () => {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

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
        productAnalyticsGroupAnalytics,
    } = useValues(pricingSliderLogic)
    const {
        setSessionRecordingSliderValue,
        setProductAnalyticsSliderValue,
        setFeatureFlagSliderValue,
        setSurveyResponseSliderValue,
    } = useActions(pricingSliderLogic)

    return [
        {
            icon: <IconGraph className="w-5 h-6 text-blue" />,
            name: 'Product analytics',
            type: 'product_analytics',
            slug: 'product-analytics',
            freeLimit: '1,000,000',
            denomination: 'event',
            price: '0.00005',
            volume: eventNumber,
            calcVolume: <>{eventNumber.toLocaleString()}</>,
            calcCost: <>{productAnalyticsCost.toLocaleString()}</>,
            slider: (
                <LogSlider
                    stepsInRange={100}
                    marks={[MILLION, TEN_MILLION, FIFTY_MILLION, MAX_PRODUCT_ANALYTICS]}
                    min={MILLION}
                    max={MAX_PRODUCT_ANALYTICS}
                    onChange={(value) => setProductAnalyticsSliderValue(value, sliderCurve)}
                    value={productAnalyticsSliderValue}
                />
            ),
            addons: billingProducts.find((product) => product.type === 'product_analytics')?.addons,
        },
        {
            icon: <IconRewindPlay className="w-5 h-6 text-yellow" />,
            name: 'Session replay',
            type: 'session_replay',
            slug: 'session-replay',
            freeLimit: '5,000',
            denomination: 'recording',
            price: '0.005',
            volume: sessionRecordingEventNumber,
            calcVolume: <>{sessionRecordingEventNumber.toLocaleString()}</>,
            calcCost: <>{sessionRecordingCost.toLocaleString()}</>,
            slider: (
                <LogSlider
                    stepsInRange={100}
                    marks={[5000, 25000, 120000, 500000]}
                    min={5000}
                    max={500000}
                    onChange={(value) => setSessionRecordingSliderValue(value, sliderCurve)}
                    value={sessionRecordingSliderValue}
                />
            ),
            addons: billingProducts.find((product) => product.type === 'session_replay')?.addons,
        },
        {
            icon: <IconToggle className="w-5 h-6 text-green" />,
            name: 'Feature flags',
            type: 'feature_flags',
            slug: 'feature-flags',
            freeLimit: '1,000,000',
            denomination: 'request',
            price: '0.0001',
            volume: featureFlagNumber,
            calcVolume: <>{featureFlagNumber.toLocaleString()}</>,
            calcCost: <>{featureFlagCost.toLocaleString()}</>,
            slider: (
                <LogSlider
                    stepsInRange={100}
                    marks={[1000000, 10000000, 100000000, 1000000000]}
                    min={1000000}
                    max={1000000000}
                    onChange={(value) => setFeatureFlagSliderValue(value, sliderCurve)}
                    value={featureFlagSliderValue}
                />
            ),
            addons: billingProducts.find((product) => product.type === 'feature_flags')?.addons,
        },
        {
            icon: <IconFlask className="w-5 h-6 text-purple" />,
            name: 'Experiments',
            type: 'feature_flags',
            slug: 'experiments',
            freeLimit: '',
            denomination: '',
            price: '',
            volume: '',
            calcVolume: '',
            calcCost: '',
            message: <em className="font-normal opacity-75">Billed with feature flags</em>,
            slider: '',
            addons: billingProducts.find((product) => product.type === 'feature_flags')?.addons,
        },
        {
            icon: <IconMessage className="w-5 h-5 text-red" />,
            name: 'Surveys',
            type: 'surveys',
            slug: 'surveys',
            freeLimit: '250',
            denomination: 'response',
            price: '0.2000',
            volume: surveyResponseNumber,
            calcVolume: <>{surveyResponseNumber.toLocaleString()}</>,
            calcCost: <>{surveyResponseCost.toLocaleString()}</>,
            slider: (
                <LogSlider
                    stepsInRange={100}
                    marks={[250, 2000, 15000, 100000]}
                    min={250}
                    max={100000}
                    onChange={(value) => setSurveyResponseSliderValue(value, sliderCurve)}
                    value={surveyResponseSliderValue}
                />
            ),
            addons: billingProducts.find((product) => product.type === 'surveys')?.addons,
        },
    ]
}

export default useProducts
