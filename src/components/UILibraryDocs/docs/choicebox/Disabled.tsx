import React from 'react'
import { Choicebox } from 'components/UI/Choicebox'

export default function Disabled(): JSX.Element {
    return (
        <Choicebox.Group aria-label="Availability" defaultValue="available">
            <Choicebox.Item value="available">
                <Choicebox.Title>Available plan</Choicebox.Title>
                <Choicebox.Description>Select this plan.</Choicebox.Description>
            </Choicebox.Item>
            <Choicebox.Item value="unavailable" disabled>
                <Choicebox.Title>Unavailable plan</Choicebox.Title>
                <Choicebox.Description>This plan does not accept new accounts.</Choicebox.Description>
            </Choicebox.Item>
        </Choicebox.Group>
    )
}
