import React from 'react'

// demo.mov ships as a pre-rendered isometric scene (a light/dark pair), not a glass
// glyph. Exported at 124×86 @2x, so it renders at 62×43.
const DEMO_LIGHT = 'https://res.cloudinary.com/dmukukwp6/image/upload/demo_light_2008b30494.png'
const DEMO_DARK = 'https://res.cloudinary.com/dmukukwp6/image/upload/demo_dark_6f25a1ecb2.png'

interface DemoIconProps {
    className?: string
}

/**
 * The demo.mov desktop icon. Unlike the glass glyph icons, this is a baked isometric
 * image shipped as a light/dark pair (swapped via Tailwind `dark:`). It sits in the
 * same 36px (`size-9`) slot as the glyph icons — so labels line up — but the artwork
 * is larger (62×43) and overflows the slot, centered. Matches the glyph icons' hover
 * pop (`group-hover:scale-[1.03]`).
 */
export default function DemoIcon({ className = '' }: DemoIconProps) {
    return (
        <span
            className={`relative inline-flex items-center justify-center size-9 transition-transform duration-200 ease-out group-hover:scale-[1.03] ${className}`}
        >
            <img
                src={DEMO_LIGHT}
                alt=""
                width={62}
                height={43}
                draggable={false}
                className="block max-w-none w-[62px] h-[43px] dark:hidden"
            />
            <img
                src={DEMO_DARK}
                alt=""
                width={62}
                height={43}
                draggable={false}
                className="hidden max-w-none w-[62px] h-[43px] dark:block"
            />
        </span>
    )
}
