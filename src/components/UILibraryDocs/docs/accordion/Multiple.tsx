import React from 'react'
import { Accordion } from 'components/UI/Accordion'

const products = [
    {
        value: 'analytics',
        name: 'Product analytics',
        summary: 'Trends, funnels, and retention for the events that you capture.',
    },
    { value: 'replay', name: 'Session replay', summary: 'Watch recordings of real user sessions.' },
    { value: 'flags', name: 'Feature flags', summary: 'Release a feature to some of your users first.' },
]

export default function AccordionMultiple(): JSX.Element {
    return (
        <Accordion.Root className="max-w-xl" multiple defaultValue={['analytics', 'replay']}>
            {products.map((item) => (
                <Accordion.Item key={item.value} value={item.value}>
                    <Accordion.Header>
                        <Accordion.Trigger>{item.name}</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>{item.summary}</Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    )
}
