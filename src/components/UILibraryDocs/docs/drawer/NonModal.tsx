import React from 'react'
import { Drawer } from 'components/UI/Drawer'
import { Button } from 'components/UI/Button'

const insightTypes = [
    { name: 'Trends', body: 'Count events and users over time.' },
    { name: 'Funnels', body: 'See where users drop off between steps.' },
    { name: 'Retention', body: 'See how many users come back.' },
]

export default function NonModal(): JSX.Element {
    return (
        <Drawer.Root modal={false} swipeDirection="right" disablePointerDismissal>
            <Drawer.Trigger render={<Button appearance="raised" />}>Insight reference</Drawer.Trigger>
            <Drawer.Popup className="w-80">
                <Drawer.Header>Insight reference</Drawer.Header>
                <Drawer.Content className="flex flex-col gap-3">
                    <Drawer.Description>
                        The page stays active. Keep this panel open while you build your dashboard.
                    </Drawer.Description>
                    <dl className="m-0 flex flex-col gap-2 text-sm">
                        {insightTypes.map((type) => (
                            <div key={type.name}>
                                <dt className="font-semibold">{type.name}</dt>
                                <dd className="m-0 text-secondary">{type.body}</dd>
                            </div>
                        ))}
                    </dl>
                </Drawer.Content>
            </Drawer.Popup>
        </Drawer.Root>
    )
}
