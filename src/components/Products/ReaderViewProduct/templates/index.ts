import React from 'react'
import { SectionComponentProps } from '../types'
import Overview from './Overview'
import Customers from './Customers'
import Eli5 from './Eli5'
import UseCases from './UseCases'
import Demo from './Demo'
import Applications from './Applications'
import TopFeatures from './TopFeatures'
import Features from './Features'
import AI from './AI'
import AskAnything from './AskAnything'
import Installation from './Installation'
import PostHogOnPostHog from './PostHogOnPostHog'
import Pricing from './Pricing'
import ComparisonSummary from './ComparisonSummary'
import FeatureComparison from './FeatureComparison'
import PairsWith from './PairsWith'
import GettingStarted from './GettingStarted'
import PricingCalculator from './PricingCalculator'
import Plans from './Plans'
import PricingFooterCTA from './PricingFooterCTA'
import Roadmap from './Roadmap'
import Changelog from './Changelog'
import CommunityQuestions from './CommunityQuestions'
import Team from './Team'

/**
 * Registry of available section templates, keyed by the `template` string on
 * a `ProductNavItem` (or by the item's `slug` when `template` is omitted).
 * To add a new template: create a component under this folder and register it
 * here.
 */
export const templateRegistry: Record<string, React.ComponentType<SectionComponentProps>> = {
    overview: Overview,
    customers: Customers,
    eli5: Eli5,
    'use-cases': UseCases,
    demo: Demo,
    applications: Applications,
    'top-features': TopFeatures,
    features: Features,
    ai: AI,
    'ask-anything': AskAnything,
    installation: Installation,
    'posthog-on-posthog': PostHogOnPostHog,
    pricing: Pricing,
    'comparison-summary': ComparisonSummary,
    'feature-comparison': FeatureComparison,
    'pairs-with': PairsWith,
    'getting-started': GettingStarted,
    calculator: PricingCalculator,
    plans: Plans,
    'pricing-cta': PricingFooterCTA,
    roadmap: Roadmap,
    changelog: Changelog,
    community: CommunityQuestions,
    team: Team,
}

export {
    Overview,
    Customers,
    Eli5,
    UseCases,
    Demo,
    Applications,
    TopFeatures,
    Features,
    AI,
    AskAnything,
    Installation,
    PostHogOnPostHog,
    Pricing,
    ComparisonSummary,
    FeatureComparison,
    PairsWith,
    GettingStarted,
    PricingCalculator,
    Plans,
    PricingFooterCTA,
    Roadmap,
    Changelog,
    CommunityQuestions,
    Team,
}
