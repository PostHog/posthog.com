import React from 'react'
import Logo from 'components/Logo'
import { SectionComponentProps } from '../types'
import CloudinaryImage from 'components/CloudinaryImage'

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
            <div className="rounded-lg shadow-2xl flex flex-col justify-between items-center relative overflow-hidden min-h-64 mb-6 before:absolute before:inset-0 before:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/compare_bg_0ffcd7a4d0.jpg')] before:bg-cover before:bg-center before:bg-no-repeat after:absolute after:inset-0 after:bg-gradient-to-b after:from-[rgba(0,0,0,.5)] after:via-[rgba(0,0,0,.2)] after:to-[rgba(0,0,0,0)]">
                <div className="relative z-20 pt-8">
                    <h2 className="text-4xl font-bold text-white mb-2 text-center">PostHog vs...</h2>
                    <p className="text-xl text-white max-w-4xl mx-auto mb-8 text-center">An honest comparison tl;dr:</p>
                </div>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/mascots_e1d975b193.png"
                    alt="PostHog's mascot and what competitor's mascots would look like if they had Lottie"
                    className="relative z-10"
                    imgClassName="max-h-[218px]"
                />
            </div>
            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-bold text-primary mt-0 mb-2">Choose a competitor if...</h3>
                    <ItemList items={summary.them || []} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-primary mt-0 mb-2">
                        Go with{' '}
                        <Logo
                            wordmark={false}
                            variant="mono"
                            color="primary"
                            className="h-6 inline-block -mb-1 mx-0.5"
                        />{' '}
                        if...
                    </h3>
                    <ItemList items={summary.us || []} />
                </div>
            </div>
        </section>
    )
}

export default ComparisonSummary
