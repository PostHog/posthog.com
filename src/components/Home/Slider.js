import React from 'react'
import { Analytics } from './Icons'

const slideButtons = [
    {
        title: 'Product analytics',
        Icon: Analytics,
    },
]

const SlideButton = ({ title, Icon }) => {
    return (
        <li>
            <button className="flex flex-col items-center justify-center space-y-3 p-4">
                <span>
                    <Icon />
                </span>
                <p className="text-sm font-semibold opacity-75">{title}</p>
            </button>
        </li>
    )
}

export default function Slider() {
    return (
        <div>
            <ul className="list-style-none m-0 p-0">
                {slideButtons.map((slide, index) => {
                    return <SlideButton key={index} {...slide} />
                })}
            </ul>
        </div>
    )
}
