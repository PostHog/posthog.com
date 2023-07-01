import React from 'react'
import { SectionWrapper } from './Section'
import { IPairGridProps, IPairItem } from './types'
import * as ProductIcons from 'components/ProductIcons'
import * as NotProductIcons from 'components/NotProductIcons'
import Link from 'components/Link'
import { FeatureDescription, FeatureTitle } from './Feature'
import { getTailwindGridCol } from './util'

const PairItem = ({ title, description, className = '', icon, url }: IPairItem) => {
    const Icon = ProductIcons[icon] || NotProductIcons[icon]
    return (
        <li className={` ${className}`}>
            <Link
                to={url ?? ''}
                className="block h-full text-primary hover:text-primary p-6 pb-8 bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded-md md:mx-4 relative hover:scale-[1.02] hover:top-[-.25px] active:top-[.5px] active:scale-[1]"
            >
                {Icon && <Icon className="w-8 h-8 mb-4 opacity-75 text-primary dark:text-primary-dark" />}
                <FeatureTitle className="text-red">{title}</FeatureTitle>
                <FeatureDescription className="text-primary/75 dark:text-primary-dark/75">
                    {description}
                </FeatureDescription>
            </Link>
        </li>
    )
}

export default function PairGrid({ features, className = '' }: IPairGridProps) {
    const length = features?.length ?? 1
    return (
        <SectionWrapper className="max-w-full">
            <ul
                className={`md:grid list-none m-0 max-w-screen-4xl mx-auto p-0 space-y-4 md:space-y-0 ${getTailwindGridCol(
                    length
                )} ${className}`}
            >
                {features.map((feature) => {
                    return <PairItem key={feature.title} {...feature} />
                })}
            </ul>
        </SectionWrapper>
    )
}
