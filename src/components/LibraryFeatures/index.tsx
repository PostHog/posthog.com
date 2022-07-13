import React from 'react'
import CheckIcon from '../../images/check.svg'
import MinusIcon from '../../images/x.svg'
import InfoIcon from '../InfoIcon/Index'
import Link from 'components/Link'

const features = [
    { key: 'eventCapture', name: 'Event capture', url: 'https://posthog.com/tutorials/event-tracking-guide' },
    {
        key: 'autoCapture',
        name: 'Autocapture',
        url: 'https://posthog.com/docs/user-guides/events#autocapture-event-tracking',
    },
    {
        key: 'userIdentification',
        name: 'User identification',
        url: 'https://posthog.com/docs/integrate/identifying-users',
    },
    { key: 'sessionRecording', name: 'Session recording', url: 'https://posthog.com/docs/user-guides/recordings' },
    { key: 'featureFlags', name: 'Feature flags', url: 'https://posthog.com/docs/user-guides/feature-flags' },
] as const

export type LibraryFeaturesProps = {
    availability?: Record<typeof features[number]['key'], boolean>
}

export const LibraryFeatures = ({ availability }: LibraryFeaturesProps) => {
    return availability ? (
        <div className="xl:border-t border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark xl:pt-4 pb-4 space-y-2 -mt-4 xl:mt-4 mb-4">
            <h6 className="text-gray !mt-0 pb-1 font-semibold text-sm">
                Which features are available in this library?
            </h6>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0 gap-x-2 gap-y-1">
                {features.map((feature) => (
                    <li key={feature.key} className="flex items-center">
                        {availability[feature.key] ? (
                            <img src={CheckIcon} alt="Available" className="h-4 w-4" aria-hidden="true" />
                        ) : (
                            <img src={MinusIcon} alt="Not available" className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span className="text-[15px] ml-2 mr-.5">{feature.name}</span>
                        <Link href={feature.url} className="hover:!bg-none active:!bg-none focus:!bg-none p-1 group">
                            <InfoIcon className="w-4 xl:w-3.5 h-4 xl:h-3.5 opacity-75 group-hover:opacity-100 relative transform transition-all group-hover:scale-[1.2] active:top-[1px] active:scale-[1.1]" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    ) : null
}

export default LibraryFeatures
