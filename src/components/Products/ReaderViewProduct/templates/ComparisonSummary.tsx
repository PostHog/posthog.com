import React from 'react'
import Logo from 'components/Logo'
import { SectionComponentProps } from '../types'

interface ComparisonItem {
    title: string
    subtitle?: string
    subtitleUrl?: string
}

const ItemList = ({ items }: { items: ComparisonItem[] }) => (
    <ul className="list-none m-0 p-0">
        {items.map((item, index) => (
            <li key={index} className="m-0 py-2 border-b border-primary last:border-b-0">
                <span className="font-semibold text-primary">{item.title}</span>
                {item.subtitle && (
                    <span className="text-secondary ml-2 italic text-sm">
                        {item.subtitleUrl ? (
                            <a href={item.subtitleUrl} target="_blank" rel="noopener noreferrer" className="underline">
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
)

const ComparisonSummary = ({ id, productData }: SectionComponentProps) => {
    const summary = productData?.comparison?.summary
    if (!summary || (!summary.them?.length && !summary.us?.length)) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-4">PostHog vs...</h2>
            <p className="text-base text-secondary m-0 mb-4">An honest comparison.</p>
            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-bold text-primary mt-0 mb-2">
                        A competitor might suit you better <em>(for now)</em> if...
                    </h3>
                    <ItemList items={summary.them || []} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-primary mt-0 mb-2">
                        Reasons to choose <Logo noText fill="primary" className="h-6 inline-block -mb-1 mx-0.5" />{' '}
                        PostHog
                    </h3>
                    <ItemList items={summary.us || []} />
                </div>
            </div>
        </section>
    )
}

export default ComparisonSummary
