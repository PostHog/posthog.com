import React from 'react'
import OSTable from 'components/OSTable'
import Logo from 'components/Logo'
import { LOGOS } from 'constants/logos'
import { useApp } from '../../../context/App'

// Small building blocks for the comparison cells
const Check = () => <span className="text-green text-lg font-bold">✓</span>
const Cross = () => <span className="text-red text-lg font-bold">✗</span>
const CheckWith = ({ note }: { note: string }) => (
    <span>
        <span className="text-green text-lg font-bold">✓</span> <span className="text-secondary">({note})</span>
    </span>
)

const CompetitorLogo = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={`h-6 mx-auto w-auto max-w-full object-contain ${className}`} />
)

export default function TracesComparisonTable(): JSX.Element {
    const { siteSettings } = useApp()
    const isDark = siteSettings?.theme === 'dark'

    const columns = [
        { name: '', align: 'left' as const, width: 'minmax(180px, 1.6fr)' },
        {
            name: <CompetitorLogo src="/images/competitors/betterstack.png" alt="Better Stack" />,
            align: 'center' as const,
            width: '1fr',
        },
        {
            name: (
                <CompetitorLogo
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/datadog_db7bb8e269.jpeg"
                    alt="Datadog"
                    className="rounded"
                />
            ),
            align: 'center' as const,
            width: '1fr',
        },
        {
            name: <CompetitorLogo src={LOGOS.sentry} alt="Sentry" />,
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
        featureRow('Distributed tracing', [<Check />, <Check />, <Check />, <CheckWith note="alpha" />]),
        featureRow('Native OpenTelemetry ingestion', [
            <Check />,
            <span>Converts to its own format</span>,
            <CheckWith note="beta" />,
            <Check />,
        ]),
        featureRow('No proprietary SDK required', [
            <Check />,
            <span>
                <code>dd-trace</code> for full features
            </span>,
            <span>SDK is the mature path</span>,
            <Check />,
        ]),
        sectionRow('One platform'),
        featureRow('Errors, logs & session replay alongside traces', [<Check />, <Check />, <Check />, <Check />]),
        featureRow('Product analytics on the same data', [<Cross />, <Check />, <Cross />, <Check />]),
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
        <div className="h-full text-primary bg-primary overflow-auto p-4 @md:p-8">
            <OSTable columns={columns} rows={rows} width="full" size="sm" rowAlignment="center" editable={false} />
        </div>
    )
}
