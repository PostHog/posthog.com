import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import { colorNames } from 'components/UI/colors'

export default function InlineColors(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-2 text-15">
            <Snippet.Inline color="white">white</Snippet.Inline>
            {colorNames.map((color) => (
                <Snippet.Inline key={color} color={color}>
                    {color}
                </Snippet.Inline>
            ))}
        </div>
    )
}
