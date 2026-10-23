import React from 'react'
import { Card } from 'components/UI/Card'

const stats = [
    { label: 'Pageviews', value: '1.2M' },
    { label: 'Visitors', value: '318K' },
    { label: 'Bounce rate', value: '41%' },
]

export default function CardNested(): JSX.Element {
    return (
        <Card.Root>
            <Card.Header>
                <Card.Title>Web analytics</Card.Title>
                <Card.Description>A card inside a card becomes level 2 without a prop.</Card.Description>
            </Card.Header>
            <div className="grid gap-3 @lg:grid-cols-3">
                {stats.map(({ label, value }) => (
                    <Card.Root key={label} padding="sm">
                        <span className="text-[13px] text-secondary">{label}</span>
                        <span className="text-xl font-bold">{value}</span>
                    </Card.Root>
                ))}
            </div>
        </Card.Root>
    )
}
