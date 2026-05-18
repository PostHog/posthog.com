import React from 'react'
import {
    IconActivity,
    IconTerminal,
    IconWarning,
    IconReceipt,
    IconRewindPlay,
    IconGraph,
    IconFunnels,
    IconToggle,
    IconFlask,
    IconMessage,
    IconSupport,
    IconStack,
    IconMicrophone,
} from '@posthog/icons'

const signals = [
    { label: 'In-app activity', icon: IconActivity, color: 'text-red' },
    { label: 'Logs', icon: IconTerminal, color: 'text-red' },
    { label: 'Errors', icon: IconWarning, color: 'text-yellow' },
    { label: 'Payments', icon: IconReceipt, color: 'text-green' },
    { label: 'Session recordings', icon: IconRewindPlay, color: 'text-orange' },
    { label: 'Traces', icon: IconGraph, color: 'text-blue' },
    { label: 'Funnel dropoff', icon: IconFunnels, color: 'text-red' },
    { label: 'Feature flags', icon: IconToggle, color: 'text-blue' },
    { label: 'Experiment results', icon: IconFlask, color: 'text-purple' },
    { label: 'Internal threads', icon: IconMessage, color: 'text-blue' },
    { label: 'Support tickets', icon: IconSupport, color: 'text-green' },
    { label: 'Backlog', icon: IconStack, color: 'text-green' },
    { label: 'Transcriptions', icon: IconMicrophone, color: 'text-purple' },
]

interface SignalsCalloutProps {
    className?: string
}

export function SignalsCallout({ className = '' }: SignalsCalloutProps) {
    return (
        <div
            data-scheme="secondary"
            className={`relative border border-primary rounded-sm bg-primary p-1 shadow-2xl rotate-1 ${className}`}
        >
            <div className="bg-blue text-center rounded py-1 text-sm font-bold uppercase text-white font-squeak">
                Signals
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 p-4">
                {signals.map(({ label, icon: Icon, color }) => (
                    <div key={label} className="flex items-center gap-1.5 text-[13px] text-primary">
                        <Icon className={`size-4 shrink-0 ${color}`} />
                        <span className="whitespace-nowrap">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
