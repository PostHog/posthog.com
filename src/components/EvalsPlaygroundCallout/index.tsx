/**
 * Callout that sends readers to the online and offline evals playground.
 */
import React from 'react'
import { HedgehogJudge } from '@posthog/brand/hoggies'
import HoggieCallout from 'components/HoggieCallout'

export default function EvalsPlaygroundCallout({ className = '' }: { className?: string }): JSX.Element {
    return (
        <HoggieCallout
            hoggie={HedgehogJudge}
            hoggieTitle="A hedgehog judge in a robe and lace collar, raising a gavel"
            hoggieAlign="bottom"
            hoggieBreakout={false}
            ariaLabel="Evals playground"
            title="Before you ship, or after?"
            description="Learn the differences between offline and online evals in our live playground."
            buttonLabel="Evals playground"
            to="/learn/ai-observability/live-playground/online-and-offline-evals"
            className={className}
        />
    )
}
