import React from 'react'
import { CallToAction } from '../CallToAction'

interface VisitLibraryProps {
    name: string
    to: string
    official?: string
}

export const VisitLibrary = ({ name, to, official }: VisitLibraryProps) => {
    return (
        <div className="flex space-between items-center w-full">
            <p>
                The {official} {name} library is hosted on GitHub.
            </p>

            <CallToAction icon="none" href={to} className="mb-4">
                View on GitHub
            </CallToAction>
        </div>
    )
}
