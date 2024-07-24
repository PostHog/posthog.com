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
        logo: '',
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
            </SectionHeader>
            <ul className="mt-4 list-none m-0 p-0 gap-4 grid grid-flow-col auto-cols-max overflow-x-auto">
                {purchasedWith.map((product, index) => {
                    const { name, description, logo } = product
                    return (
                        <li
                            key={index}
                            className="bg-white dark:bg-white/5 border border-light dark:border-dark p-4 rounded w-80"
                        >
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="size-8 relative">
                                    <img className="inset-0 absolute object-contain" src={logo} />
                                </div>
                                <h5 className="m-0">{name}</h5>
                            </div>
                            <p className="m-0">{description}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
