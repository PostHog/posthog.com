import React from 'react'

interface DoodleTriangle {
    color?: string
    classes?: string
}

export const DoodleTriangle = ({ color, classes }: DoodleTriangleProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="208"
            height="219"
            fill="none"
            viewBox="0 0 208 219"
            className={`absolute ${classes}`}
        >
            <path
                fill={color}
                d="M90.175 69.241l2.563 1.558-1.558 2.564-2.563-1.558zM85.5 76.932l2.564 1.558-1.558 2.564-2.563-1.558zm-4.674 7.691l2.563 1.558-1.558 2.564-2.563-1.559zm-4.674 7.69l2.564 1.558-1.558 2.564-2.564-1.558zm-4.675 7.691l2.564 1.558-1.558 2.564-2.564-1.558zm-4.674 7.691l2.564 1.558-1.559 2.564-2.563-1.558zm-4.675 7.691l2.564 1.558-1.558 2.564-2.564-1.559z"
            ></path>
            <path stroke="url(#TriangleGradient1)" strokeLinecap="round" d="M.834 218.313L133.313 1.166"></path>
            <path stroke="url(#TriangleGradient2)" strokeLinecap="round" d="M133.678 1.2L207.2 136.322"></path>
            <defs>
                <linearGradient
                    id="TriangleGradient1"
                    x1="133.999"
                    x2="1"
                    y1="1"
                    y2="219"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color}></stop>
                    <stop offset="1" stopColor={color} stopOpacity="0"></stop>
                </linearGradient>
                <linearGradient id="TriangleGradient2" x1="133" x2="207" y1="1" y2="137" gradientUnits="userSpaceOnUse">
                    <stop stopColor={color}></stop>
                    <stop offset="1" stopColor={color} stopOpacity="0"></stop>
                </linearGradient>
            </defs>
        </svg>
    )
}
