import React from 'react'
import { IconArrowLeft, IconArrowRight, IconMinus, IconPlus, IconSparkles } from '@posthog/icons'
import { FloatingButton, FloatingButtonGroup, FloatingIconButton } from 'components/UI/FloatingButton'

const imageLight =
    'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_35_2x_42e293fddd.png'
const imageDark =
    'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_50_2x_8d74438a4a.png'

export default function OverContent(): JSX.Element {
    return (
        <div className="relative h-72 overflow-hidden rounded-md border border-[rgb(var(--text-primary)/0.12)]">
            <img src={imageLight} alt="" className="m-0 block size-full object-cover object-left-top dark:hidden" />
            <img src={imageDark} alt="" className="m-0 hidden size-full object-cover object-left-top dark:block" />
            <FloatingIconButton
                aria-label="Previous screenshot"
                icon={<IconArrowLeft />}
                className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <FloatingIconButton
                aria-label="Next screenshot"
                icon={<IconArrowRight />}
                className="absolute right-3 top-1/2 -translate-y-1/2"
            />
            <FloatingButtonGroup size="sm" aria-label="Zoom" className="absolute left-3 top-3">
                <FloatingIconButton aria-label="Zoom out" icon={<IconMinus />} />
                <FloatingIconButton aria-label="Zoom in" icon={<IconPlus />} />
            </FloatingButtonGroup>
            <FloatingButton icon={<IconSparkles />} className="absolute bottom-3 right-3">
                Ask Max
            </FloatingButton>
        </div>
    )
}
