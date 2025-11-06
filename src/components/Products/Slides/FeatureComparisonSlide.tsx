import ScrollArea from 'components/RadixUI/ScrollArea'
import React from 'react'
import ProductComparisonTable from 'components/ProductComparisonTable'

interface FeatureComparisonSlideProps {
    competitors: string[]
    rows: any[]
    excludedSections?: string[]
    requireCompleteData?: boolean
}

export default function FeatureComparisonSlide({
    competitors,
    rows,
    excludedSections,
    requireCompleteData,
}: FeatureComparisonSlideProps) {
    if (!competitors || !rows || competitors.length === 0 || rows.length === 0) {
        return (
            <div className="h-full p-8 flex items-center justify-center">
                <p className="text-xl text-secondary">No feature comparison available</p>
            </div>
        )
    }

    return (
        <div className="h-full text-primary flex flex-col">
            <ScrollArea className="min-h-0 h-full">
                <ProductComparisonTable
                    competitors={competitors}
                    rows={rows}
                    width="full"
                    autoExpand={true}
                    excludedSections={excludedSections}
                    requireCompleteData={requireCompleteData}
                />
            </ScrollArea>
        </div>
    )
}
