import React from 'react'
import * as PostHogIcons from '@posthog/icons'
import { IFeature, IFeatureGridProps } from '../../../types'

export const FeatureTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-[17px] mb-1 leading-tight ${className}`}>{children}</h3>
)

export const FeatureDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <p className={`m-0 text-[15px] ${className}`}>
        <div dangerouslySetInnerHTML={{ __html: children }} />
    </p>
)

export const Subfeature = ({ title, description, className = '', icon }: IFeature): JSX.Element => {
    const Icon = PostHogIcons[icon]
    return (
        <li className={`bg-accent dark:bg-accent-dark rounded-lg p-4 sm:p-6 sm:pb-8  ${className}`}>
            {icon && <span className="inline-block w-10 h-10 mb-4 opacity-50">{icon}</span>}
            <FeatureTitle>{title}</FeatureTitle>
            <FeatureDescription>{description}</FeatureDescription>
        </li>
    )
}
