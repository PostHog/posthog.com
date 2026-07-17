import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconInfo } from '@posthog/icons'
import { HedgehogSailorHog } from '@posthog/brand/hoggies'

export const Image = ({ src, className = '', alt = '' }: { src: string; className?: string; alt?: string }) => (
    <CloudinaryImage src={src} alt={alt} className={className} />
)

export const HomeHappyHog = () => (
    <img
        src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
        alt="happy hog"
        className="@xl:float-right @xl:ml-2 max-w-[400px] max-h-48 -mt-2 -mr-2"
    />
)

export const ImageDW = () => (
    <HedgehogSailorHog
        size={220}
        className="relative -top-[12px] ml-auto @lg:-right-5 -mb-[85px] -scale-x-100 @lg:ml-12"
    />
)

export const ImageMoney = () => (
    <CloudinaryImage
        src="https://res.cloudinary.com/dmukukwp6/image/upload/hogmillionaire_6a6c2c958d.png"
        className="float-right max-w-[120px] @sm:max-w-[280px] w-full @lg:ml-12 @sm:ml-4 mb-2 @sm:-mt-4"
    />
)

export const ImageReading1 = () => (
    <Image
        src="https://res.cloudinary.com/dmukukwp6/image/upload/reading_at_night_8397c5198c.png"
        className="@md:hidden @xl:block @lg:float-right max-w-full @xl:max-w-xs rotate-1 shadow-2xl rounded border-4 border-white dark:border-primary -mb-2 @lg:mb-2 @lg:ml-4 @lg:-mt-2"
    />
)

export const ImageReading2 = () => (
    <Image
        src="https://res.cloudinary.com/dmukukwp6/image/upload/reading_at_night_8397c5198c.png"
        className="hidden @md:block @md:float-right @xl:hidden @md:max-w-60 @xl:max-w-xs @sm:ml-4 @sm:mb-2 rotate-1 shadow-2xl rounded border-4 border-white dark:border-primary"
    />
)

export const TooltipDW = () => (
    <Tooltip
        trigger={
            <span>
                <IconInfo className="size-4 inline-block relative -top-px" />
            </span>
        }
        delay={0}
    >
        <p className="text-sm mb-0">You can also connect your own!</p>
    </Tooltip>
)
