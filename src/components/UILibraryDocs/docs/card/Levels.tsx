import React from 'react'
import { Button } from 'components/UI/Button'
import { Card } from 'components/UI/Card'
import { Field } from 'components/UI/Field'
import { Meter } from 'components/UI/Meter'
import { Section } from 'components/UI/Section'

export default function CardLevels(): JSX.Element {
    return (
        <Section.Root>
            <Section.Header>
                <Section.Title>A section</Section.Title>
                <Section.Description>
                    A border on the window. It marks a region of a page, and it does not change the card levels.
                </Section.Description>
            </Section.Header>
            <Card.Root>
                <Card.Header>
                    <Card.Title>Level 1: a card</Card.Title>
                    <Card.Description>A raised pane of glass with a small shadow.</Card.Description>
                </Card.Header>
                <Field.Root>
                    <Field.Label>Project name</Field.Label>
                    <Field.Control defaultValue="Hogflix" />
                </Field.Root>
                <Card.Root padding="sm">
                    <Meter.Root value={62}>
                        <Meter.Label>Events this month</Meter.Label>
                        <Meter.Value />
                        <Meter.Track>
                            <Meter.Indicator />
                        </Meter.Track>
                    </Meter.Root>
                    <Card.Description>Level 2: an inset well inside the card.</Card.Description>
                </Card.Root>
                <Card.Footer>
                    <Button>Cancel</Button>
                    <Button variant="primary">Save</Button>
                </Card.Footer>
            </Card.Root>
        </Section.Root>
    )
}
