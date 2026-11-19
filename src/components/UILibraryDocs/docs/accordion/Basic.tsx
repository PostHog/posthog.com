import React from 'react'
import { Accordion } from 'components/UI/Accordion'

const faqs = [
    {
        value: 'what',
        question: 'What is PostHog?',
        answer: 'An all-in-one suite of product tools for engineers.',
    },
    {
        value: 'free',
        question: 'Is there a free tier?',
        answer: 'Yes. Every product has a generous free tier.',
    },
    { value: 'self-host', question: 'Can I self-host?', answer: 'Yes, with the open source hobby deployment.' },
]

export default function AccordionBasic(): JSX.Element {
    return (
        <Accordion.Root className="max-w-xl" defaultValue={['what']}>
            {faqs.map((item) => (
                <Accordion.Item key={item.value} value={item.value}>
                    <Accordion.Header>
                        <Accordion.Trigger>{item.question}</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>{item.answer}</Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    )
}
