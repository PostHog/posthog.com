import React from 'react'
import HeroAnimation720x1300 from './svgs/hero-720x1300.svg'
import HeroAnimation1920x1080 from './svgs/hero-1920x1080.svg'
import HeroAnimation1920x720 from './svgs/hero-1920x720.svg'
import { useMediaQuery } from 'react-responsive'

function HeroImage() {
    const isSm = useMediaQuery({ query: '(max-width: 640px)' })
    const isLg = useMediaQuery({ query: '(max-width: 1024px)' })

    return isSm ? (
        <HeroAnimation720x1300 className="absolute h-full w-full top-0 left-0" />
    ) : isLg ? (
        <HeroAnimation1920x720 className="absolute h-full w-full top-0 left-0" />
    ) : (
        <HeroAnimation1920x1080 className="absolute h-full w-full top-0 left-0" />
    )
}

export default HeroImage
