import React from 'react'
import { Chip } from 'components/UI/Chip'
import type { ColorName } from 'components/UI/colors'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const colors: ColorName[] = ['gray', 'blue', 'green', 'tangerine']

const labels = { solid: 'solid · one standout label', soft: 'soft · many labels' }

export default function ChipVariants(): JSX.Element {
    return (
        <DemoRows>
            {(['solid', 'soft'] as const).map((appearance) => (
                <DemoRow key={appearance} label={labels[appearance]}>
                    {colors.map((color) => (
                        <Chip key={color} color={color} appearance={appearance}>
                            {color}
                        </Chip>
                    ))}
                </DemoRow>
            ))}
        </DemoRows>
    )
}
