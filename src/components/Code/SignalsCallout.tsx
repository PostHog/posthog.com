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
        <div className={`relative border border-primary rounded-sm bg-accent/50 py-3 px-4 ${className}`}>
            {/* Vertical "SIGNALS" label on the right edge */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 rotate-90 origin-center">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-red opacity-80">Signals</span>
            </div>

            <div className="grid grid-cols-2 @2xl:grid-cols-3 gap-x-4 gap-y-2">
                {signals.map(({ label, icon: Icon, color }) => (
                    <div key={label} className="flex items-center gap-1.5 text-sm text-primary whitespace-nowrap">
                        <Icon className={`size-4 shrink-0 ${color}`} />
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
