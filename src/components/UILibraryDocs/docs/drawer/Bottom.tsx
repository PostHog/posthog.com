import React from 'react'
import { Button } from 'components/UI/Button'
import { Drawer } from 'components/UI/Drawer'

const notifications = [
    { title: 'Max replied to your comment', time: '2 min ago' },
    { title: 'Your export of 12,408 events is ready', time: '1 hour ago' },
    { title: 'The billing-v2 flag rolled out to 100%', time: 'Yesterday' },
]

export default function DrawerBottom(): JSX.Element {
    return (
        <Drawer.Root>
            <Drawer.Trigger render={<Button />}>Open bottom drawer</Drawer.Trigger>
            <Drawer.Popup>
                <Drawer.Header>Notifications</Drawer.Header>
                <Drawer.Content className="flex flex-col gap-3">
                    <Drawer.Description>Swipe down, press Escape, or click outside to close.</Drawer.Description>
                    <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm">
                        {notifications.map((notification) => (
                            <li key={notification.title} className="flex items-baseline justify-between gap-3">
                                <span>{notification.title}</span>
                                <span className="shrink-0 text-[13px] text-muted">{notification.time}</span>
                            </li>
                        ))}
                    </ul>
                </Drawer.Content>
                <Drawer.Footer>
                    <Drawer.Close render={<Button appearance="raised" variant="primary" />}>
                        Mark all as read
                    </Drawer.Close>
                </Drawer.Footer>
            </Drawer.Popup>
        </Drawer.Root>
    )
}
