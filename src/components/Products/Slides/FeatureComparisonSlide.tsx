import ScrollArea from 'components/RadixUI/ScrollArea'
import Link from 'components/Link'
import Logo from 'components/Logo'
import React from 'react'
import { IconArrowUpRight } from '@posthog/icons'

interface ComparisonFeature {
    feature: string
    companies: Record<string, boolean | string>
    type?: 'header' | 'feature'
}

interface CompanyMetadata {
    name: string
    key: string
    link?: string
}

interface FeatureComparisonSlideProps {
    features: ComparisonFeature[]
    companies?: CompanyMetadata[]
}

export default function FeatureComparisonSlide({ features, companies }: FeatureComparisonSlideProps) {
    if (!features || features.length === 0) {
        return (
            <div className="h-full p-8 flex items-center justify-center">
                <p className="text-xl text-secondary">No feature comparison available</p>
            </div>
        )
    }

    // Use provided companies metadata or fallback to extracting from first feature
    const companyList = companies || Object.keys(features[0]?.companies || {}).map((key) => ({ name: key, key }))

    return (
        <div className="h-full text-primary flex flex-col">
            <h2 className="text-4xl font-bold text-primary p-8 text-center shrink-0">Feature comparison</h2>

            <div className="max-w-6xl mx-auto flex-1 w-full min-h-0">
                <ScrollArea className="">
                    <table className="w-full border-collapse border border-primary">
                        <thead className="sticky top-0">
                            <tr className="bg-accent align-top">
                                <th className="border border-primary px-2 py-1.5 text-left font-semibold">Feature</th>
                                {companyList.map((company: CompanyMetadata) => (
                                    <th
                                        key={company.key}
                                        className="border border-primary px-2 py-1.5 text-center font-semibold min-w-[100px] leading-[1.1rem]"
                                    >
                                        {company.link ? (
                                            <>
                                                {company.name}
                                                <br />
                                                <Link
                                                    to={company.link}
                                                    className="underline text-[13px] opacity-75 hover:opacity-100 ml-3"
                                                    state={{ newWindow: true }}
                                                >
                                                    compare
                                                    <IconArrowUpRight className="inline-block size-3" />
                                                </Link>
                                            </>
                                        ) : company.key === 'postHog' ? (
                                            <Logo className="h-5 mx-auto" />
                                        ) : (
                                            company.name
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature: ComparisonFeature, index: number) => {
                                if (feature.type === 'header') {
                                    return (
                                        <tr key={index} className="bg-primary">
                                            <td
                                                className="border border-primary px-2 py-1.5 font-bold"
                                                colSpan={companyList.length + 1}
                                            >
                                                {feature.feature}
                                            </td>
                                        </tr>
                                    )
                                }

                                return (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-primary' : 'bg-accent'}>
                                        <td className="border border-primary px-2 py-1.5 font-medium">
                                            {feature.feature}
                                        </td>
                                        {companyList.map((company) => {
                                            const supported = feature.companies[company.key]
                                            return (
                                                <td
                                                    key={company.key}
                                                    className="border border-primary px-2 py-1.5 text-center"
                                                >
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
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </ScrollArea>
            </div>
        </div>
    )
}
