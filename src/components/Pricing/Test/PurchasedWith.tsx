import React from 'react'
import { SectionHeader, section } from './Sections'
import ScrollArea from 'components/RadixUI/ScrollArea'

const purchasedWith = [
    {
        name: 'Digital Ocean',
        description: 'Cloud infrastructure for developers',
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/DO_Logo_icon_blue_0ade9109b2.svg',
    },
    {
        name: 'Vercel',
        description: 'Build and deploy web experiences',
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/vercel_icon_dark_1023f19025.svg',
    },
    {
        name: 'Ashby',
        description: 'All-in-one recruiting software for ambitious teams.',
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/ashby_e4a768e087.svg',
    },
    {
        name: 'Algolia',
        description: 'AI-powered search and discovery',
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/Algolia_mark_blue_f25812a7a2.svg',
    },
]

export default function PurchasedWith() {
    return (
        <section className={`not-prose mb-8 @2xl:mb-12 ${section}`}>
            <SectionHeader>
                <h2>Frequently purchased with...</h2>
            </SectionHeader>
            <p>
                These are some products that pair well with PostHog to help you find product-market fit and maybe even
                get to an IPO. (In fact, we use them ourselves!)
            </p>
            <ScrollArea className="-mx-4">
                <ul className="mt-4 list-none !px-4 pb-4 gap-4 grid grid-flow-col auto-cols-max scroll-snap-x snap-mandatory">
                    {purchasedWith.map((product, index) => {
                        const { name, description, logo } = product
                        return (
                            <li
                                key={index}
                                className="bg-white dark:bg-accent-dark border border-primary rounded-md w-80 p-4"
                            >
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="size-8 relative">
                                        <img className="inset-0 absolute object-contain" src={logo} />
                                    </div>
                                    <h5 className="m-0">{name}</h5>
                                </div>
                                <p className="m-0 text-[15px] opacity-75 leading-tight">{description}</p>
                            </li>
                        )
                    })}
                </ul>
            </ScrollArea>
        </section>
    )
}
