import React, { useState } from 'react'
import { Button } from 'components/UI/Button'
import { Menu } from 'components/UI/Menu'

export default function MenuRadioItems(): JSX.Element {
    const [sort, setSort] = useState('newest')

    return (
        <Menu.Root>
            <Menu.Trigger render={<Button />}>Sort</Menu.Trigger>
            <Menu.Popup>
                <Menu.Group>
                    <Menu.GroupLabel>Sort by</Menu.GroupLabel>
                    <Menu.RadioGroup value={sort} onValueChange={setSort}>
                        <Menu.RadioItem value="newest">Newest</Menu.RadioItem>
                        <Menu.RadioItem value="oldest">Oldest</Menu.RadioItem>
                    </Menu.RadioGroup>
                </Menu.Group>
            </Menu.Popup>
        </Menu.Root>
    )
}
