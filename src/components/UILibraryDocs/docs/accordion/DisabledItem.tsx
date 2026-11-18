import React from 'react'
import { Accordion } from 'components/UI/Accordion'

export default function AccordionDisabledItem(): JSX.Element {
    return (
        <Accordion.Root className="max-w-xl">
            <Accordion.Item value="profile">
                <Accordion.Header>
                    <Accordion.Trigger>Profile</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel>Your name, email, and avatar.</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="notifications">
                <Accordion.Header>
                    <Accordion.Trigger>Notifications</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel>Email and Slack alerts.</Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="billing" disabled>
                <Accordion.Header>
                    <Accordion.Trigger>Billing (admins only)</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel>Plans and invoices.</Accordion.Panel>
            </Accordion.Item>
        </Accordion.Root>
    )
}
