import React from 'react'
import { IconPlayFilled } from '@posthog/icons'
import { FloatingButton, FloatingIconButton } from 'components/UI/FloatingButton'

const imageLight =
    'https://res.cloudinary.com/dmukukwp6/image/upload/w_800,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_35_2x_42e293fddd.png'
const imageDark =
    'https://res.cloudinary.com/dmukukwp6/image/upload/w_800,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_50_2x_8d74438a4a.png'

export default function Sizes(): JSX.Element {
    return (
        <div className="relative overflow-hidden rounded-md">
            <img src={imageLight} alt="" className="absolute inset-0 m-0 size-full object-cover dark:hidden" />
            <img src={imageDark} alt="" className="absolute inset-0 m-0 hidden size-full object-cover dark:block" />
            <div className="relative flex flex-wrap items-center gap-3 p-4">
                {(['sm', 'md', 'lg'] as const).map((size) => (
                    <React.Fragment key={size}>
                        <FloatingIconButton size={size} aria-label={`Play, size ${size}`} icon={<IconPlayFilled />} />
                        <FloatingButton size={size}>Size {size}</FloatingButton>
                    </React.Fragment>
                ))}
                <FloatingButton disabled>Disabled</FloatingButton>
                <FloatingButton loading>Ask Max</FloatingButton>
            </div>
        </div>
    )
}
