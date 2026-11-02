import React from 'react'
import { Card } from 'components/UI/Card'
import { DemoLabel } from 'components/UILibraryDocs/DemoLayout'

export default function CardPadding(): JSX.Element {
    return (
        <div className="grid gap-4 @xl:grid-cols-3">
            {(['sm', 'md', 'lg'] as const).map((padding) => (
                <div key={padding} className="flex flex-col gap-2">
                    <DemoLabel>padding=&quot;{padding}&quot;</DemoLabel>
                    <Card.Root padding={padding}>
                        <Card.Title>Session replay</Card.Title>
                        <Card.Description>Watch how users move through your product.</Card.Description>
                    </Card.Root>
                </div>
            ))}
        </div>
    )
}
