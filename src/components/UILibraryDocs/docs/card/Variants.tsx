import React from 'react'
import { Card } from 'components/UI/Card'
import type { CardVariant } from 'components/UI/Card'

const variants: { variant: CardVariant; title: string; description: string }[] = [
    { variant: 'glass', title: 'Glass', description: 'Everyday content on the window.' },
    { variant: 'solid', title: 'Solid', description: 'An opaque surface that hides the wallpaper.' },
    { variant: 'dashed', title: 'Dashed', description: 'A later or optional step.' },
]

export default function CardVariants(): JSX.Element {
    return (
        <div className="grid gap-4 @xl:grid-cols-2">
            {variants.map(({ variant, title, description }) => (
                <Card.Root key={variant} variant={variant}>
                    <Card.Header>
                        <Card.Title>{title}</Card.Title>
                        <Card.Description>{description}</Card.Description>
                    </Card.Header>
                    <Card.Root padding="sm">
                        <Card.Title>Hogflix</Card.Title>
                        <Card.Description>A nested card becomes an inset well.</Card.Description>
                    </Card.Root>
                </Card.Root>
            ))}
        </div>
    )
}
