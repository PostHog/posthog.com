import React from 'react'
import { Badge } from 'components/UI/Badge'
import type { ColorName } from 'components/UI/colors'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const colors: ColorName[] = ['gray', 'blue', 'green', 'tangerine']

export default function Variants(): JSX.Element {
    return (
        <DemoRows>
            {(['solid', 'soft'] as const).map((appearance) => (
                <DemoRow key={appearance} label={appearance}>
                    {colors.map((color) => (
                        <Badge key={color} color={color} appearance={appearance}>
                            {color}
                        </Badge>
                    ))}
                </DemoRow>
            ))}
        </DemoRows>
    )
}
