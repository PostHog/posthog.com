import React from 'react'
import OSTable from 'components/OSTable'

type Feature = {
    title: string
    description: string
    status?: 'available' | 'coming_soon'
}

interface FeatureTableProps {
    features: Feature[]
}

export default function FeatureTable({ features }: FeatureTableProps): JSX.Element {
    const columns = [
        { name: 'Feature', width: 'minmax(150px, 1fr)', align: 'left' as const },
        { name: 'Description', width: 'minmax(300px, 2fr)', align: 'left' as const },
        { name: '', width: '60px', align: 'center' as const },
    ]

    const featureRows = features?.map((feature) => ({
        cells: [
            { content: <span className="font-bold">{feature.title}</span> },
            { content: feature.description, className: 'text-sm' },
            {
                content:
                    feature.status === 'coming_soon' ? (
                        <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">
                            Coming soon
                        </span>
                    ) : (
                        '✅'
                    ),
                className: 'text-xl',
            },
        ],
    }))

    return <OSTable columns={columns} rows={featureRows} editable={false} />
}
