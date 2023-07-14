import { StaticImage } from 'gatsby-plugin-image'
import React, { useRef } from 'react'

const cards = [
    {
        top: 'You enjoy “jumping on a quick call” with sales',
        bottom: (
            <>
                Sorry, we don’t have a sales team. But you can <span className="text-blue">watch a recorded demo</span>{' '}
                (at your own page) or <span className="text-blue">request a personalized demo</span> if you like.
            </>
        ),
        color: '#FFD89E',
        Image: <StaticImage quality={100} placeholder="none" src="./images/1.png" />,
    },
]

export default function NoHatingAllowed() {
    const listRef = useRef<HTMLUListElement>(null)

    return (
        <div className="relative">
            <ul
                ref={listRef}
                className="list-none m-0 p-0 flex space-x-12 w-full px-5 snap-x overflow-x-auto overflow-y-hidden py-12"
            >
                {cards.map(({ top, bottom, Image, color }, index) => {
                    return (
                        <li
                            style={{ backgroundColor: color || 'white' }}
                            className="h-[400px] w-[300px] flex flex-col justify-between p-5 rounded-md relative even:rotate-3 odd:-rotate-3 flex-shrink-0 md:first:ml-[20vw]"
                            key={index}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full">
                                {Image}
                            </div>
                            <h5 className="m-0 text-2xl text-black relative">{top}</h5>
                            <p className="text-sm text-black m-0 relative">{bottom}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
