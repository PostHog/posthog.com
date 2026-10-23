import React from 'react'
import { Button } from 'components/UI/Button'
import { Card } from 'components/UI/Card'

export default function CardBasic(): JSX.Element {
    return (
        <Card.Root className="max-w-md">
            <Card.Header>
                <Card.Title>Session replay</Card.Title>
                <Card.Description>
                    Watch recordings of real user sessions to see where people get stuck.
                </Card.Description>
            </Card.Header>
            <Card.Footer>
                <Button>Learn more</Button>
                <Button variant="primary">Turn on</Button>
            </Card.Footer>
        </Card.Root>
    )
}
