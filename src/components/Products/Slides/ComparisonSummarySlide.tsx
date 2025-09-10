import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Logo from 'components/Logo'

interface ComparisonItem {
    title: string
    subtitle?: string
    subtitleUrl?: string
}

interface ComparisonSummarySlideProps {
    them: ComparisonItem[]
    us: ComparisonItem[]
}

export default function ComparisonSummarySlide({ them, us }: ComparisonSummarySlideProps) {
    return (
        <div className="h-full p-8">
            <div className="rounded-lg shadow-2xl flex flex-col justify-between items-center relative overflow-hidden min-h-96 mb-6 before:absolute before:inset-0 before:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/compare_bg_0ffcd7a4d0.jpg')] before:bg-cover before:bg-center before:bg-no-repeat after:absolute after:inset-0 after:bg-gradient-to-b after:from-[rgba(0,0,0,.5)] after:via-[rgba(0,0,0,.2)] after:to-[rgba(0,0,0,0)]">
                <div className="relative z-20 pt-8">
                    <h2 className="text-4xl font-bold text-white mb-2 text-center">PostHog vs...</h2>
                    <p className="text-xl text-white max-w-4xl mx-auto mb-8 text-center">An honest comparison tl;dr:</p>
                </div>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/mascots_e1d975b193.png"
                    alt="Mascots"
                    className="relative z-10"
                    imgClassName="max-h-[218px]"
                />
            </div>

            {/* Comparison Summary */}
            <div className="grid @2xl:grid-cols-2 gap-8 mb-8">
                <div className="">
                    <h3 className="text-2xl font-bold text-primary mb-4">
                        A competitor might suit you better <em>(for now)</em> if...
                    </h3>
                    <ul className="p-0 mb-2 list-none">
                        {them.map((item: ComparisonItem, index: number) => (
                            <li key={index} className="border-b-2 last:border-b-0 border-primary py-2">
                                <span className="font-semibold text-lg text-primary">{item.title}</span>
                                {item.subtitle && (
                                    <span className="text-secondary ml-2 italic">
                                        {/* Update:{' '} */}
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

                <div className="">
                    <h3 className="text-2xl font-bold text-primary mb-4">
                        Reasons to choose <Logo noText fill="primary" className="h-12 inline-block -mt-5 mx-1 -mb-2" />{' '}
                        PostHog
                    </h3>
                    <ul className="p-0 mb-2 list-none">
                        {us.map((item: ComparisonItem, index: number) => (
                            <li key={index} className="border-b-2 last:border-b-0 border-primary py-2">
                                <span className="font-semibold text-lg text-primary">{item.title}</span>
                                {item.subtitle && <span className="text-secondary ml-1">{item.subtitle}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
