import React from 'react'
import { Emphasis } from 'components/UI/Emphasis'
import { colorNames } from 'components/UI/colors'

export default function Tones(): JSX.Element {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-heading-md">
                {colorNames.map((color) => (
                    <Emphasis key={color} color={color}>
                        {color}
                    </Emphasis>
                ))}
            </div>
            <p className="!m-0 max-w-[20ch] text-heading-lg">
                Build with <Emphasis color="violet">analytics, replays, and product context</Emphasis>
            </p>
        </div>
    )
}
