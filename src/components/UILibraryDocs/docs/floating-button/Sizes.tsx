import React from 'react'
import { IconPlayFilled } from '@posthog/icons'
import { FloatingButton, FloatingIconButton } from 'components/UI/FloatingButton'
import { DemoLabel } from 'components/UILibraryDocs/DemoLayout'

const imageLight =
    'https://res.cloudinary.com/dmukukwp6/image/upload/w_800,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_35_2x_42e293fddd.png'
const imageDark =
    'https://res.cloudinary.com/dmukukwp6/image/upload/w_800,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_50_2x_8d74438a4a.png'

const samples = [
    { label: 'sm', node: <FloatingButton size="sm">Play</FloatingButton> },
    { label: 'md', node: <FloatingButton size="md">Play</FloatingButton> },
    { label: 'lg', node: <FloatingButton size="lg">Play</FloatingButton> },
    {
        label: 'Icon',
        node: <FloatingIconButton aria-label="Play" icon={<IconPlayFilled />} />,
    },
    { label: 'Disabled', node: <FloatingButton disabled>Play</FloatingButton> },
    { label: 'Loading', node: <FloatingButton loading>Ask Max</FloatingButton> },
]

export default function Sizes(): JSX.Element {
    return (
        <div className="relative overflow-hidden rounded-md">
            <img src={imageLight} alt="" className="absolute inset-0 m-0 size-full object-cover blur-sm dark:hidden" />
            <img
                src={imageDark}
                alt=""
                className="absolute inset-0 m-0 hidden size-full object-cover blur-sm dark:block"
            />
            <div className="relative grid grid-cols-3 gap-6 p-6 @lg:grid-cols-6">
                {samples.map(({ label, node }) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                        <div className="flex h-12 items-center">{node}</div>
                        <DemoLabel className="rounded bg-primary/80 px-1.5">{label}</DemoLabel>
                    </div>
                ))}
            </div>
        </div>
    )
}
