import React from 'react'
import { CallToAction } from '../CallToAction'

interface VisitLibraryProps {
    name: string
    to: string
    official?: boolean
}

export const VisitLibrary = ({ name, to, official }: VisitLibraryProps) => {
    return (
        <div className="md:flex justify-between items-center w-full p-6 rounded bg-accent mb-5">
            <p className="text-center md:text-left md:mb-0 md:mr-4" style={{ lineHeight: '1.5' }}>
                This is the{' '}
                <strong>
                    {official ? 'official' : ''} PostHog library for {name}
                </strong>{' '}
                to capture and send events to any PostHog instance.
            </p>

            <CallToAction icon="none" href={to} className="whitespace-nowrap w-full !block md:!inline-block md:md-auto">
                View on GitHub
            </CallToAction>
        </div>
    )
}
