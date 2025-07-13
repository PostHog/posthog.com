import ScrollArea from 'components/RadixUI/ScrollArea'
import React from 'react'

interface ComparisonFeature {
    feature: string
    companies: Record<string, boolean | string>
}

interface FeatureComparisonSlideProps {
    features: ComparisonFeature[]
}

export default function FeatureComparisonSlide({ features }: FeatureComparisonSlideProps) {
    if (!features || features.length === 0) {
        return (
            <div className="h-full p-8 flex items-center justify-center">
                <p className="text-xl text-secondary">No feature comparison available</p>
            </div>
        )
    }

    const companies = Object.keys(features[0]?.companies || {})

    return (
        <div className="h-full text-primary flex flex-col">
            <h2 className="text-4xl font-bold text-primary p-8 text-center shrink-0">Feature comparison</h2>

            <div className="max-w-6xl mx-auto flex-1 w-full min-h-0">
                <ScrollArea className="">
                    <table className="w-full border-collapse border border-primary">
                        <thead>
                            <tr className="bg-accent">
                                <th className="border border-primary px-2 py-1.5 text-left font-semibold">Feature</th>
                                {companies.map((company: string) => (
                                    <th
                                        key={company}
                                        className="border border-primary px-2 py-1.5 text-center font-semibold min-w-[100px]"
                                    >
                                        {company}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature: ComparisonFeature, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-primary' : 'bg-accent'}>
                                    <td className="border border-primary px-2 py-1.5 font-medium">{feature.feature}</td>
                                    {Object.entries(feature.companies).map(([company, supported]) => (
                                        <td key={company} className="border border-primary px-2 py-1.5 text-center">
                                            {typeof supported === 'boolean' ? (
                                                supported ? (
                                                    <span className="text-green font-bold">✓</span>
                                                ) : (
                                                    <span className="text-red font-bold">✗</span>
                                                )
                                            ) : (
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: supported as string,
                                                    }}
                                                />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ScrollArea>
            </div>
        </div>
    )
}
