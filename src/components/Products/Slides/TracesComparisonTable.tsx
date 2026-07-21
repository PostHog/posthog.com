import React from 'react'
import OSTable from 'components/OSTable'
import Logo from 'components/Logo'
import { useApp } from '../../../context/App'

// Small building blocks for the comparison cells
const Check = () => <span className="text-green text-lg font-bold">✓</span>
const Cross = () => <span className="text-red text-lg font-bold">✗</span>
const CheckWith = ({ note }: { note: string }) => (
    <span>
        <span className="text-green text-lg font-bold">✓</span> <span className="text-secondary">({note})</span>
    </span>
)

const CompetitorName = ({ children }: { children: React.ReactNode }) => (
    <span className="text-base font-bold text-primary">{children}</span>
)

export default function TracesComparisonTable(): JSX.Element {
    const { siteSettings } = useApp()
    const isDark = siteSettings?.theme === 'dark'

    const columns = [
        { name: '', align: 'left' as const, width: 'minmax(180px, 1.6fr)' },
        {
            name: <CompetitorName>Better Stack</CompetitorName>,
            align: 'center' as const,
            width: '1fr',
        },
        {
            name: <CompetitorName>Datadog</CompetitorName>,
            align: 'center' as const,
            width: '1fr',
        },
        {
            name: <CompetitorName>Sentry</CompetitorName>,
            align: 'center' as const,
            width: '1fr',
        },
        {
            name: <Logo className="h-5 mx-auto w-auto max-w-full" fill={isDark ? 'white' : ''} />,
            align: 'center' as const,
            width: '1fr',
        },
    ]

    // Section header row spanning the full width
    const sectionRow = (label: string) => ({
        cells: [
            {
                content: <strong>{label}</strong>,
                className: 'col-span-full !items-start text-left bg-accent font-bold',
            },
        ],
    })

    // Feature row: label + one cell per competitor (Better Stack, Datadog, Sentry, PostHog)
    const featureRow = (label: React.ReactNode, values: React.ReactNode[]) => ({
        cells: [{ content: label, className: '!items-start text-left font-semibold' }, ...values.map((content) => ({ content }))],
    })

    const rows = [
        sectionRow('Tracing'),
        featureRow('Distributed trace waterfall', [<Check />, <Check />, <Check />, <Check />]),
        featureRow('Service / dependency map', [<Check />, <Check />, <Cross />, <Cross />]),
        featureRow('Code-level profiling (flame graphs)', [<Cross />, <Check />, <Check />, <Cross />]),
        featureRow('Sampling & retention controls', [
            <Check />,
            <Check />,
            <span>Head sampling only</span>,
            <span>Via OTel SDK</span>,
        ]),
        sectionRow('Standards & setup'),
        featureRow('Native OpenTelemetry ingestion', [
            <Check />,
            <CheckWith note="maps to its own model" />,
            <CheckWith note="beta" />,
            <Check />,
        ]),
        featureRow('No proprietary SDK required', [<Check />, <span>Partial</span>, <span>Partial</span>, <Check />]),
        featureRow('Instrumentation', [
            <span>eBPF</span>,
            <span>Agent</span>,
            <span>SDK</span>,
            <span>OpenTelemetry</span>,
        ]),
        sectionRow('One platform'),
        featureRow('Errors, logs & session replay alongside traces', [<Check />, <Check />, <Check />, <Check />]),
        sectionRow('AI & self-driving'),
        featureRow('AI opens a code fix PR', [<Cross />, <Cross />, <CheckWith note="beta" />, <Check />]),
        featureRow('Fix a bug and open a PR from Slack', [<Cross />, <Cross />, <CheckWith note="beta" />, <Check />]),
        sectionRow('Pricing & licensing'),
        featureRow('Pricing model', [
            <span>Per GB ingested</span>,
            <span>Per host + per span</span>,
            <span>Per span</span>,
            <span>Usage-based, no per-host fee</span>,
        ]),
        featureRow('Free tier', [<Check />, <span>Trial only</span>, <Check />, <Check />]),
        featureRow('Open source', [<Cross />, <Cross />, <span>Source-available (FSL)</span>, <Check />]),
    ]

    return (
        <div className="h-full text-primary bg-primary overflow-auto p-4 @md:p-6 [&_.OSTable]:mb-0">
            <OSTable columns={columns} rows={rows} width="full" size="md" rowAlignment="center" editable={false} />
        </div>
    )
}
