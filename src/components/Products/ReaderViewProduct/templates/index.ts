import React from 'react'
import { SectionComponentProps } from '../types'
import Overview from './Overview'
import Customers from './Customers'
import Features from './Features'
import AI from './AI'
import PostHogOnPostHog from './PostHogOnPostHog'
import Answers from './Answers'
import Pricing from './Pricing'
import ComparisonSummary from './ComparisonSummary'
import FeatureComparison from './FeatureComparison'
import Docs from './Docs'
import PairsWith from './PairsWith'
import GettingStarted from './GettingStarted'
import PricingCalculator from './PricingCalculator'
import Plans from './Plans'

/**
 * Registry of available section templates, keyed by the `template` string on
 * a `MarketingNavItem` (or by the item's `slug` when `template` is omitted).
 * To add a new template: create a component under this folder and register it
 * here.
 */
export const templateRegistry: Record<string, React.ComponentType<SectionComponentProps>> = {
    overview: Overview,
    customers: Customers,
    features: Features,
    ai: AI,
    'posthog-on-posthog': PostHogOnPostHog,
    answers: Answers,
    pricing: Pricing,
    'comparison-summary': ComparisonSummary,
    'feature-comparison': FeatureComparison,
    docs: Docs,
    'pairs-with': PairsWith,
    'getting-started': GettingStarted,
    calculator: PricingCalculator,
    plans: Plans,
}

export {
    Overview,
    Customers,
    Features,
    AI,
    PostHogOnPostHog,
    Answers,
    Pricing,
    ComparisonSummary,
    FeatureComparison,
    Docs,
    PairsWith,
    GettingStarted,
    PricingCalculator,
    Plans,
}
