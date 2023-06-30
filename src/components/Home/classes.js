import React from 'react'
import cntl from 'cntl'

export const heading = (size = 'lg', color = 'primary', classes = '') => {
    const options = {
        lg: 'text-5xl md:text-7xl',
        md: 'text-4xl lg:text-5xl 2xl:text-5xl',
        subtitle:
            'text-xl xl:text-2xl leading-tight font-semibold mt-2 md:mt-3 text-primary/80 dark:text-primary-dark/80',
        sm: 'text-[18px] md:text-[20px] leading-tight md:text-xl font-semibold mt-2 md:mt-3 opacity-75',
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
