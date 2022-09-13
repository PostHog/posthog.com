import React from 'react'
import cntl from 'cntl'

const sizes = {
    sm: 'border-1 w-12 h-12',
    md: 'border-2 w-16 h-16',
    lg: 'border-2 w-24 h-24',
    xl: 'border-3 w-32 h-32',
}

export const circle = (size = 'lg', className = '') => cntl`
    rounded-full 
    relative 
    border-gray-accent-light 
    border-solid 
    inline-block 
    bg-white
    ${sizes[size]}
    ${className}
`

export const Avatar = ({ size = 'lg', className = '' }) => {
    return (
        <div className={`absolute ${className}`}>
            <div className={`${circle(size)}`}>
                <div className="absolute -right-2 -bottom-1 bg-white w-8 h-8 rounded-full border-2 text-lg border-gray-accent-light border-solid flex items-center justify-center">
                    🇺🇸
                </div>
                <img
                    src="https://posthog.com/static/99172eb231efe4d9c969fd91dd0a7011/a7ca0/lottie.webp"
                    className="w-full h-full border border-solid border-white box-border rounded-full"
                />
            </div>
        </div>
    )
}
