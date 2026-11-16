import React from 'react'
import { Chip } from 'components/UI/Chip'
import { colorNames } from 'components/UI/colors'

export default function ChipColors(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-2">
            {(['white', ...colorNames] as const).map((color) => (
                <Chip key={color} color={color}>
                    {color}
                </Chip>
            ))}
        </div>
    )
}
