import React from 'react'
import { SectionHeader, section } from './Sections'

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
        <section className={section}>
            <SectionHeader>
                <h3 className="mb-2">Frequently purchased with...</h3>
                <p>
                    These are some products that pair well with PostHog to help you find product-market fit and maybe
                    even get to an IPO. (In fact, we use them ourselves!)
                </p>
            </SectionHeader>
            <ul className="mt-4 list-none -mx-4 px-4 md:mx-0 md:px-0 xl:-mx-8 xl:px-8 2xl:-mx-12 2xl:px-12 pb-2 gap-4 grid grid-flow-col auto-cols-max overflow-x-auto">
                {purchasedWith.map((product, index) => {
                    const { name, description, logo } = product
                    return (
                        <li
                            key={index}
                            className="bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md w-80 p-4"
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
        </section>
    )
}
