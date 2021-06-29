import React from 'react'

interface DoodleCircle {
    color?: string
    classes?: string
}

export const DoodleCircle = ({ color, classes }: DoodleCircleProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="313"
            height="282"
            fill="none"
            viewBox="0 0 313 282"
            className={`absolute ${classes}`}
        >
            <path
                fill={color}
                d="M59 144.934L61.293 143l1.934 2.293-2.293 1.934zm4.803 6.88l2.293-1.934 1.934 2.293-2.293 1.934zm6.197 7.12L72.293 157l1.934 2.293-2.293 1.934zm6 8L78.293 165l1.934 2.293-2.293 1.934zm7 8L85.293 173l1.934 2.293-2.293 1.934zm7 7L92.293 180l1.934 2.293-2.293 1.934zm7 7L99.293 187l1.934 2.293-2.293 1.934z"
            ></path>
            <path
                stroke="url(#CircleGradient)"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 1c21.5 141 148 280 311.5 280"
            ></path>
            <defs>
                <linearGradient
                    id="CircleGradient"
                    x1="95.5"
                    x2="157"
                    y1="232"
                    y2="141.5"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color}></stop>
                    <stop offset="0.872" stopColor={color} stopOpacity="0"></stop>
                </linearGradient>
            </defs>
        </svg>
    )
}
