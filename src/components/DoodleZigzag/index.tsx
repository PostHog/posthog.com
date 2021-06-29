import React from 'react'

interface DoodleZigzag {
    color?: string
    classes?: string
}

export const DoodleZigzag = ({ color, classes }: DoodleZigzagProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="117"
            height="461"
            fill="none"
            viewBox="0 0 117 461"
            className={`absolute ${classes}`}
        >
            <path
                stroke="url(#ZigzagGradient)"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1.5 1v226h114v233"
            ></path>
            <path
                fill={color}
                d="M114 259h3v3h-3zm0 9h3v3h-3zm0 9h3v3h-3zm0 9h3v3h-3zm0 9h3v3h-3zm0 9h3v3h-3zm0 9h3v3h-3zM0 144h3v3H0zm0 9h3v3H0zm0 9h3v3H0zm0 9h3v3H0zm0 9h3v3H0zm0 9h3v3H0zm0 9h3v3H0z"
            ></path>
            <defs>
                <linearGradient id="ZigzagGradient" x1="58.5" x2="58.5" y1="1" y2="460" gradientUnits="userSpaceOnUse">
                    <stop stopColor={color} stopOpacity="0"></stop>
                    <stop offset="0.502" stopColor={color}></stop>
                    <stop offset="1" stopColor={color} stopOpacity="0"></stop>
                </linearGradient>
            </defs>
        </svg>
    )
}
