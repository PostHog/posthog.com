import React from 'react'
import cntl from 'cntl'

export const heading = (size = 'lg', color = 'primary', classes = '') => {
    const options = {
        lg: 'text-[2.75rem] leading-[2.75rem] md:text-6xl',
        md: 'text-3xl lg:text-5xl',
        sm: 'text-[18px] md:text-[20px] leading-tight md:text-xl font-semibold mt-2 md:mt-3 opacity-75',
    }
    return cntl`
        m-0
        text-center
        ${options[size]}
        text-${color}
        ${classes}
    `
}

export const section = (className = '') => cntl`
    max-w-screen-2xl
    mx-auto
    my-16
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
