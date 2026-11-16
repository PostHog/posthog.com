import React, { useState } from 'react'
import { Button } from 'components/UI/Button'
import { Menu } from 'components/UI/Menu'

export default function MenuCheckboxItems(): JSX.Element {
    const [showGrid, setShowGrid] = useState(true)
    const [showLegend, setShowLegend] = useState(false)

    return (
        <Menu.Root>
            <Menu.Trigger render={<Button />}>View</Menu.Trigger>
            <Menu.Popup>
                <Menu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
                    Show grid
                </Menu.CheckboxItem>
                <Menu.CheckboxItem checked={showLegend} onCheckedChange={setShowLegend}>
                    Show legend
                </Menu.CheckboxItem>
            </Menu.Popup>
        </Menu.Root>
    )
}
