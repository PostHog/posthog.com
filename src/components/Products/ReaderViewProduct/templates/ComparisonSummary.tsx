import React from 'react'
import { IconCheck } from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import { SectionComponentProps } from '../types'
import CloudinaryImage from 'components/shared/media/CloudinaryImage'

interface ComparisonItem {
    title: string
    subtitle?: string
    subtitleUrl?: string
}

const ItemList = ({ items, iconClassName }: { items: ComparisonItem[]; iconClassName: string }) => (
    <ul className="list-none m-0 p-0 divide-y divide-primary">
        {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0">
                <IconCheck className={`size-5 shrink-0 mt-0.5 ${iconClassName}`} />
                <div>
                    <span className="font-semibold text-primary leading-snug">{item.title}</span>
                    {item.subtitle && (
                        <span className="block text-secondary text-sm mt-0.5">
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
                </div>
            </li>
        ))}
    </ul>
)

const ComparisonSummary = ({ id, productData }: SectionComponentProps) => {
    const summary = productData?.comparison?.summary
    if (!summary || (!summary.them?.length && !summary.us?.length)) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl @md/reader-content:text-4xl font-bold text-primary m-0 leading-tight">
                PostHog vs...
            </h2>
            <p className="text-secondary mt-1 mb-6">An honest comparison, tl;dr:</p>
            <div className="@container">
                <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-4 items-start">
                    <div className="border border-primary rounded bg-primary p-5">
                        <h3 className="text-lg font-bold text-primary mt-0 mb-3">Choose a competitor if...</h3>
                        <ItemList items={summary.them || []} iconClassName="text-muted" />
                    </div>
                    <div className="border border-primary rounded bg-primary p-5">
                        <h3 className="text-lg font-bold text-primary mt-0 mb-3">
                            Go with{' '}
                            <Logo
                                layout="logomark"
                                variant="mono"
                                color="currentColor"
                                className="text-primary h-6 w-auto inline-block -mb-1 mx-0.5"
                                width="auto"
                            />{' '}
                            if...
                        </h3>
                        <ItemList items={summary.us || []} iconClassName="text-green" />
                    </div>
                </div>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/mascots_e1d975b193.png"
                    alt="PostHog's mascot and what competitor's mascots would look like if they had Lottie"
                    className="block mx-auto mt-6"
                    imgClassName="max-h-32 @2xl:max-h-40"
                />
            </div>
        </section>
    )
}

export default ComparisonSummary
