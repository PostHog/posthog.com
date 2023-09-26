import React from 'react'
import { IFeature, IFeatureGridProps } from './types'
import * as PostHogIcons from '@posthog/icons'
import * as ProductIcons from 'components/ProductIcons'
import * as NotProductIcons from 'components/NotProductIcons'
import * as PostHogIcons from '@posthog/icons'
import { SectionWrapper } from './Section'
import { getTailwindGridCol } from './util'

export const MainFeatures = (props: IFeatureGridProps) => {
    return (
        <ul className="p-0" id="features">
            <FeatureGrid {...props} />
        </ul>
    )
}

export const FeatureList = ({ features }: { features: IFeature[] }) => {
    return (
        <ul className="list-none m-0 mb-4 p-0 space-y-6">
            {features.map(({ title, description }) => {
                return (
                    <li key={title}>
                        <FeatureTitle>{title}</FeatureTitle>
                        <FeatureDescription>{description}</FeatureDescription>
                    </li>
                )
            })}
        </ul>
    )
}

export const FeatureGrid = ({ features, className = '' }: IFeatureGridProps) => {
    const length = features?.length ?? 1
    return (
        <SectionWrapper className="max-w-full">
            <ul
                className={`grid list-none m-0 max-w-screen-4xl mx-auto p-0 gap-4 ${getTailwindGridCol(
                    length
                )} ${className}`}
            >
                {features.map((feature) => {
                    return <Feature key={feature.title} {...feature} />
                })}
            </ul>
        </SectionWrapper>
    )
}

export const FeatureTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-[17px] mb-1 leading-tight ${className}`}>{children}</h3>
)

export const FeatureDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <p className={`m-0 text-[15px] ${className}`}>
        <div dangerouslySetInnerHTML={{ __html: children }} />
    </p>
)

export const Feature = ({ title, description, className = '', icon }: IFeature) => {
    const Icon = ProductIcons[icon] || NotProductIcons[icon] || PostHogIcons[icon]
    return (
        <li className={`bg-accent dark:bg-accent-dark rounded-lg sm:p-6 sm:pb-8  ${className}`}>
            {Icon && <Icon className="w-10 h-10 mb-4 opacity-50" />}
            <FeatureTitle>{title}</FeatureTitle>
            <FeatureDescription>{description}</FeatureDescription>
        </li>
    )
}
