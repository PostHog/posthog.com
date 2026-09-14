import React from 'react'
import { IconPlayFilled } from '@posthog/icons'

const THUMB = 'https://res.cloudinary.com/dmukukwp6/image/upload/the_posthog_shining_thumb_781edacf00.jpg'

interface ThePostHogIconProps {
    className?: string
}

/**
 * The PostHog desktop icon. Same slot as the glass glyphs (`size-9`) so labels
 * line up, with a landscape poster thumb that overflows the slot like DemoIcon.
 * Chrome (rounded frame, play overlay) is CSS — Demo bakes that into its PNG.
 */
export default function ThePostHogIcon({ className = '' }: ThePostHogIconProps): JSX.Element {
    return (
        <span
            className={`relative inline-flex items-center justify-center size-9 transition-transform duration-200 ease-out group-hover:scale-[1.03] ${className}`}
        >
            <span className="relative block w-[62px] h-[43px] shrink-0 overflow-hidden rounded-md border border-white/80 shadow-md">
                <img
                    src={THUMB}
                    alt=""
                    width={62}
                    height={43}
                    draggable={false}
                    className="block size-full object-cover"
                />
                <IconPlayFilled className="absolute inset-0 m-auto size-5 text-white/90 drop-shadow pointer-events-none" />
            </span>
        </span>
    )
}
