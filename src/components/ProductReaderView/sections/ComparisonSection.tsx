import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Logo from 'components/Logo'
import ProductComparisonTable from 'components/ProductComparisonTable'

interface ComparisonItem {
    title: string
    subtitle?: string
    subtitleUrl?: string
}

interface ComparisonSectionProps {
    productData: any
}

export default function ComparisonSection({ productData }: ComparisonSectionProps): JSX.Element {
    const comparison = productData?.comparison
    const summary = comparison?.summary

    if (!comparison) {
        return <></>
    }

    // Get comparison data for the feature table
    const companies = comparison?.companies || []
    let competitors = companies.map((c: any) => c.key)

    // Put PostHog first in the comparison
    const posthogIndex = competitors.indexOf('posthog')
    if (posthogIndex > 0) {
        competitors = ['posthog', ...competitors.filter((c: string) => c !== 'posthog')]
    }

    const rows = comparison?.rows
    const excludedSections = comparison?.excluded_sections
    const requireCompleteData = comparison?.require_complete_data

    return (
        <section id="comparison" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">PostHog vs...</h2>

            {/* Comparison Summary */}
            {summary && (summary.them?.length > 0 || summary.us?.length > 0) && (
                <div className="mb-8">
                    {/* Hero image */}
                    <div className="rounded-lg shadow-xl flex flex-col justify-between items-center relative overflow-hidden min-h-48 mb-6 before:absolute before:inset-0 before:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/compare_bg_0ffcd7a4d0.jpg')] before:bg-cover before:bg-center before:bg-no-repeat after:absolute after:inset-0 after:bg-gradient-to-b after:from-[rgba(0,0,0,.5)] after:via-[rgba(0,0,0,.2)] after:to-[rgba(0,0,0,0)]">
                        <div className="relative z-20 pt-6">
                            <p className="text-lg text-white max-w-4xl mx-auto text-center">
                                An honest comparison tl;dr:
                            </p>
                        </div>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/mascots_e1d975b193.png"
                            alt="Mascots"
                            className="relative z-10"
                            imgClassName="max-h-[160px]"
                        />
                    </div>

                    {/* Comparison lists */}
                    <div className="grid @lg:grid-cols-2 gap-8">
                        {summary.them && summary.them.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-primary mb-4">
                                    A competitor might suit you better <em>(for now)</em> if...
                                </h3>
                                <ul className="p-0 mb-2 list-none">
                                    {summary.them.map((item: ComparisonItem, index: number) => (
                                        <li key={index} className="border-b last:border-b-0 border-primary py-2">
                                            <span className="font-semibold text-primary">{item.title}</span>
                                            {item.subtitle && (
                                                <span className="text-secondary ml-2 italic text-sm">
                                                    {item.subtitleUrl ? (
                                                        <a
                                                            href={item.subtitleUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="underline"
                                                        >
                                                            {item.subtitle}
                                                        </a>
                                                    ) : (
                                                        item.subtitle
                                                    )}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {summary.us && summary.us.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-1">
                                    Reasons to choose{' '}
                                    <Logo noText fill="primary" className="h-8 inline-block -mt-2 mx-1 -mb-1" /> PostHog
                                </h3>
                                <ul className="p-0 mb-2 list-none">
                                    {summary.us.map((item: ComparisonItem, index: number) => (
                                        <li key={index} className="border-b last:border-b-0 border-primary py-2">
                                            <span className="font-semibold text-primary">{item.title}</span>
                                            {item.subtitle && (
                                                <span className="text-secondary ml-1 text-sm">{item.subtitle}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Feature Comparison Table */}
            {competitors.length > 0 && rows && rows.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold mb-4">Feature comparison</h3>
                    <ProductComparisonTable
                        competitors={competitors}
                        rows={rows}
                        width="full"
                        autoExpand={true}
                        excludedSections={excludedSections}
                        requireCompleteData={requireCompleteData}
                    />
                </div>
            )}
        </section>
    )
}
