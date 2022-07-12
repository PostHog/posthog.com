import React from 'react'
import CheckIcon from '../../images/check.svg'
import MinusIcon from '../../images/x.svg'
import InfoIcon from '../InfoIcon'
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
        <div className="border-t border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark py-4 space-y-2 my-4">
            <h6 className="text-gray !mt-0 pb-1 font-semibold text-sm">
                Which features are available in this library?
            </h6>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0 gap-2">
                {features.map((feature) => (
                    <li key={feature.key} className="flex items-center">
                        {availability[feature.key] ? (
                            <img
                                src={CheckIcon}
                                alt="Available"
                                width="18"
                                height="18"
                                className="h-5 w-5 text-green-500"
                                aria-hidden="true"
                            />
                        ) : (
                            <img
                                src={MinusIcon}
                                alt="Not available"
                                width="18"
                                height="18"
                                className="h-5 w-5 text-green-500"
                                aria-hidden="true"
                            />
                        )}
                        <span className="text-[15px] ml-2 mr-.5">{feature.name}</span>
                        <Link href={feature.url} className="hover:!bg-none active:!bg-none focus:!bg-none p-1 group">
                            <InfoIcon className="h-4 opacity-75 group-hover:opacity-100 relative transform transition-all group-hover:scale-[1.2] active:top-[1px] active:scale-[1.1]" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    ) : null
}

export default LibraryFeatures
