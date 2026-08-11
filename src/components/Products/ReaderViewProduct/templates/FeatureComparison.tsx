import React from 'react'
import ProductComparisonTable from 'components/ProductComparisonTable'
import { SectionComponentProps } from '../types'

const FeatureComparison = ({ id, productData }: SectionComponentProps) => {
    const comparison = productData?.comparison
    if (!comparison?.companies?.length || !comparison?.rows?.length) return null

    let competitors = comparison.companies.map((c: any) => c.key)
    const posthogIndex = competitors.indexOf('posthog')
    if (posthogIndex > 0) {
        competitors = ['posthog', ...competitors.filter((c: string) => c !== 'posthog')]
    }

    // Always exclude platform sections here — product feature pages don't need them.
    // Products can add more via comparison.excluded_sections.
    const excludedSections = ['platform', ...(comparison.excluded_sections || [])]

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-4">Feature comparison</h2>
            <ProductComparisonTable
                competitors={competitors}
                rows={comparison.rows}
                autoExpand
                excludedSections={excludedSections}
                requireCompleteData={comparison.require_complete_data}
            />
        </section>
    )
}

export default FeatureComparison
