import React from 'react'
import PricingPageExperiment from 'components/Pricing/Experiment'

/**
 * `/pricing` — the entry point for the `pricing-page-redesign` experiment.
 *
 * The page body moved into `components/Pricing/Experiment`: `ControlPage` is what used to live
 * here, and the two redesign arms come from `RedesignPage`. This file is deliberately a
 * one-liner so the experiment can be unwound by pointing it at a single component.
 *
 * Don't read the flag anywhere else — see the note in `Experiment/index.tsx` on exposure.
 */
export default function Pricing(): JSX.Element {
    return <PricingPageExperiment />
}
