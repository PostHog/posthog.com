import React, { useState, useEffect } from 'react'
import WindowTabs from 'components/WindowTabs'
import { Fieldset } from 'components/OSFieldset'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { IconDay, IconLaptop, IconNight } from '@posthog/icons'

const colorModeOptions: ToggleOption[] = [
    {
        label: 'System',
        value: 'system',
        icon: <IconLaptop className="size-5" />,
    },
    {
        label: 'Light',
        value: 'light',
        icon: <IconDay className="size-5" />,
        default: true,
    },
    {
        label: 'Dark',
        value: 'dark',
        icon: <IconNight className="size-5" />,
    },
]

export default function DisplayOptions() {
    const [colorMode, setColorMode] = useState('system')
    const handleColorModeChange = (value: string) => {
        window.__setPreferredTheme(value)
        setColorMode(value)
    }

    useEffect(() => {
        const colorMode = localStorage.getItem('theme') || 'system'
        setColorMode(colorMode)
    }, [])
    return (
        <div className="w-full h-full bg-primary text-primary">
            <Fieldset legend="Display">
                <div className="grid grid-cols-2 gap-2">
                    <label className="pt-1.5 text-[15px]">Color mode</label>
                    <ToggleGroup
                        title="Color mode"
                        options={colorModeOptions}
                        onValueChange={handleColorModeChange}
                        value={colorMode}
                    />
                </div>
            </Fieldset>
        </div>
    )
}
