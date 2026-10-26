import React from 'react'
import { Card } from 'components/UI/Card'
import type { CardAppearance } from 'components/UI/Card'

const appearances: { appearance: CardAppearance; title: string; description: string }[] = [
    { appearance: 'glass', title: 'Glass', description: 'Everyday content on the window.' },
    { appearance: 'solid', title: 'Solid', description: 'An opaque surface that hides the wallpaper.' },
    { appearance: 'dashed', title: 'Dashed', description: 'A later or optional step.' },
]

export default function CardAppearances(): JSX.Element {
    return (
        <div className="grid gap-4 @xl:grid-cols-2">
            {appearances.map(({ appearance, title, description }) => (
                <Card.Root key={appearance} appearance={appearance}>
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
