import React from 'react'
import { Progress } from 'components/UI/Progress'
import type { ColorName } from 'components/UI/colors'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const colors: ColorName[] = ['yellow', 'blue', 'green', 'gray']

export default function Colors(): JSX.Element {
    return (
        <DemoRows>
            {colors.map((color) => (
                <DemoRow key={color} label={color}>
                    <div className="grid w-full gap-4 @lg:grid-cols-2">
                        <Progress.Root value={60} color={color} aria-label={`${color} progress`}>
                            <Progress.Track>
                                <Progress.Indicator />
                            </Progress.Track>
                        </Progress.Root>
                        <Progress.Root value={null} color={color} aria-label={`${color} loading`}>
                            <Progress.Track>
                                <Progress.Indicator />
                            </Progress.Track>
                        </Progress.Root>
                    </div>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
