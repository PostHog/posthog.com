import React from 'react'
import { Badge } from 'components/UI/Badge'
import { colorNames } from 'components/UI/colors'

export default function Colors(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-2">
            {colorNames.map((color) => (
                <Badge key={color} color={color}>
                    {color}
                </Badge>
            ))}
        </div>
    )
}
