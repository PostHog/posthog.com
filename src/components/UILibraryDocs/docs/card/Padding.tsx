import React from 'react'
import { Card } from 'components/UI/Card'

export default function CardPadding(): JSX.Element {
    return (
        <div className="grid gap-4 @xl:grid-cols-3">
            {(['sm', 'md', 'lg'] as const).map((padding) => (
                <Card.Root key={padding} padding={padding}>
                    <Card.Title>padding=&quot;{padding}&quot;</Card.Title>
                    <Card.Description>The padding also sets the gap between the parts of the card.</Card.Description>
                </Card.Root>
            ))}
        </div>
    )
}
