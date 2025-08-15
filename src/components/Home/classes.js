import React from 'react'
import cntl from 'cntl'

export const heading = (size = 'lg', color = 'primary', classes = '') => {
    const options = {
        lg: 'text-4xl md:text-5xl',
        md: 'text-3xl lg:text-4xl 2xl:text-4xl',
        subtitle: 'text-xl xl:text-2xl leading-tight font-semibold mt-2 md:mt-3 text-secondary',
        sm: 'text-base md:text-[18px] leading-tight md:text-xl font-medium mt-2 md:mt-3 text-secondary',
    }
    return cntl`
        m-0
        text-center
        ${options[size]}
        text-${color}
        dark:text-${color}-dark
        ${classes}
    `
}

export const section = (className = '') => cntl`
    max-w-screen-2xl
    mx-auto
    mt-4
    mb-8
    md:mb-16
    md:my-16
    px-4
    ${className}
`

export const gradientWrapper = cntl`
    relative
    before:bg-gradient-to-t
    before:from-primary
    before:absolute
    before:w-full
    before:h-1/3
    before:bottom-0
    before:left-0
    before:z-10
`
