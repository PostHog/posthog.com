import React from 'react'
import { Button } from 'components/UI/Button'
import { Drawer } from 'components/UI/Drawer'
import { Field } from 'components/UI/Field'

export default function DrawerSidePanel(): JSX.Element {
    return (
        <Drawer.Root swipeDirection="right">
            <Drawer.Trigger render={<Button />}>Open side panel</Drawer.Trigger>
            <Drawer.Popup>
                <Drawer.Header>Insight settings</Drawer.Header>
                <Drawer.Content className="flex flex-col gap-4">
                    <Drawer.Description>Swipe right or press Escape to close this panel.</Drawer.Description>
                    <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Field.Control defaultValue="Weekly active users" />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Description</Field.Label>
                        <Field.Control defaultValue="Users with at least one pageview in 7 days" />
                    </Field.Root>
                </Drawer.Content>
                <Drawer.Footer separator>
                    <Drawer.Close render={<Button />}>Cancel</Drawer.Close>
                    <Drawer.Close render={<Button variant="primary" />}>Save</Drawer.Close>
                </Drawer.Footer>
            </Drawer.Popup>
        </Drawer.Root>
    )
}
