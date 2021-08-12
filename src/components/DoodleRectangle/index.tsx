import React from 'react'

interface DoodleRectangle {
    color?: string
    classes?: string
}

export const DoodleRectangle = ({ color, classes }: DoodleRectangleProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="68"
            height="742"
            fill="none"
            viewBox="0 0 68 742"
            className={`absolute ${classes}`}
        >
            <path
                stroke="url(#RectangleGradient)"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 1h55c5.523 0 10 4.477 10 10v720c0 5.523-4.477 10-10 10H1"
            ></path>
            <path
                fill={color}
                d="M64.5 253.5h3v3h-3zm0 9h3v3h-3zm0 9h3v3h-3zm0 9h3v3h-3zm0 9h3v3h-3zm0 9h3v3h-3zm0 9h3v3h-3z"
            ></path>
            <defs>
                <linearGradient
                    id="RectangleGradient"
                    x1="66.5"
                    x2="1.5"
                    y1="172.5"
                    y2="172.5"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color}></stop>
                    <stop offset="0.872" stopColor={color} stopOpacity="0"></stop>
                </linearGradient>
            </defs>
        </svg>
    )
}
