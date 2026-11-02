import React from 'react'
import { Card } from 'components/UI/Card'
import { Sparkline } from 'components/UI/Chart'

const stats = [
    { label: 'Pageviews', value: '1.2M', data: [22, 28, 26, 38, 45, 52, 66, 71, 88] },
    { label: 'Sessions', value: '310K', data: [40, 36, 44, 38, 50, 46, 58, 54, 62] },
    { label: 'Bounce rate', value: '38%', data: [70, 66, 62, 58, 55, 49, 46, 41, 38] },
]

export default function ChartSparklines(): JSX.Element {
    return (
        <div className="grid gap-3 @lg:grid-cols-3">
            {stats.map((stat) => (
                <Card.Root key={stat.label} padding="sm">
                    <div className="text-caption text-secondary">{stat.label}</div>
                    <div className="text-heading-lg">{stat.value}</div>
                    <Sparkline className="mt-2" height={40} data={stat.data} />
                </Card.Root>
            ))}
        </div>
    )
}
