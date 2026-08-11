import React, { useState } from 'react'
import ProductComparisonTable from 'components/ProductComparisonTable'
import OSButton from 'components/OSButton'
import { SectionComponentProps } from '../types'

const FeatureComparison = ({ id, productData }: SectionComponentProps) => {
    const comparison = productData?.comparison
    // Opt-in via `comparison.collapsible` on the product data: long tables render
    // collapsed to one screenful with a "Show full comparison" toggle. Products
    // without the flag are untouched.
    const collapsible = !!comparison?.collapsible
    const [expanded, setExpanded] = useState(false)
    const collapsed = collapsible && !expanded

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
            <div className={collapsed ? 'relative max-h-[700px] overflow-hidden' : undefined}>
                <ProductComparisonTable
                    competitors={competitors}
                    rows={comparison.rows}
                    autoExpand
                    excludedSections={excludedSections}
                    requireCompleteData={comparison.require_complete_data}
                />
                {collapsed && (
                    <div className="absolute inset-x-0 bottom-0 flex h-40 items-end justify-center bg-gradient-to-t from-light via-light/70 to-transparent pb-4 dark:from-dark dark:via-dark/70">
                        <OSButton variant="secondary" size="md" aria-expanded={false} onClick={() => setExpanded(true)}>
                            Show full comparison
                        </OSButton>
                    </div>
                )}
            </div>
            {collapsible && expanded && (
                <div className="mt-4 flex justify-center">
                    <OSButton variant="secondary" size="md" aria-expanded onClick={() => setExpanded(false)}>
                        Show less
                    </OSButton>
                </div>
            )}
        </section>
    )
}

export default FeatureComparison
