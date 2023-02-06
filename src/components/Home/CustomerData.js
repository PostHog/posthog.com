import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import ProductIcons from 'components/ProductIcons'
import NotProductIcons from 'components/NotProductIcons'

const features = [
    {
        icon: NotProductIcons.privacy,
        title: 'Privacy controls',
        description: 'Track users without cookies, anonymize users, configure a reverse proxy',
    },
    {
        icon: ProductIcons.selfHosting,
        title: 'Choose your hosting location',
        description: 'Store user data in the US or EU depending on your needs',
    },
    {
        icon: ProductIcons.api,
        title: 'Full access to customer data',
        description: 'API offers total access to customer and event data',
    },
    {
        icon: NotProductIcons.code,
        title: 'Check out the source code',
        description: 'Audit the entire PostHog codebase on GitHub for compliance or just peace of mind',
    },
]

export default function CustomerData() {
    return (
        <section className="my-24 px-5">
            <div className="max-w-screen-2xl mx-auto">
                <h2 className="text-4xl sm:text-5xl lg:text-7xl 2xl:text-8xl m-0 text-center mb-6 sm:mb-16">
                    <span className="text-red">Full control</span> of your customer data
                </h2>
                <div className="flex justify-center">
                    <ul className="m-0 p-0 list-none inline-grid sm:grid-cols-2 justify-evenly">
                        {features.map(({ icon, title, description }) => {
                            return (
                                <li
                                    className="relative md:max-w-md py-4 md:py-8 pl-16 pr-2 md:pl-20 md:pr-6 border-t first:border-t-0 md:border-t-0 md:first:border-b md:last:border-t md:even:border-l border-dashed border-gray-accent-light"
                                    key={title}
                                >
                                    <span className="absolute left-4 md:left-8 top-4.5 md:top-6.5 inline-block w-8 h-8 text-gray">
                                        {icon}
                                    </span>
                                    <h5 className="text-xl font-extrabold m-0 pb-1 pr-4">{title}</h5>
                                    <p className="m-0 text-[15px]">{description}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="relative mt-12 lg:mt-8">
                    <div className="grid grid-cols-2 relative lg:top-10 w-full max-w-md mx-auto lg:mb-0 mb-6">
                        <div className="grid md:grid-cols-6 space-y-3 md:space-y-0 md:space-x-3 justify-center">
                            <div className="col-span-1">
                                <ReactCountryFlag
                                    style={{ width: 33, height: 'auto' }}
                                    width={33}
                                    svg
                                    countryCode="US"
                                />
                            </div>
                            <div className="col-span-5">
                                <h6 className="text-base m-0 leading-none">US Cloud</h6>
                                <p className="m-0 text-sm md:text-[15px]">Hosted in Virginia</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-6 space-y-3 md:space-y-0 md:space-x-3 justify-center">
                            <div className="col-span-1">
                                <ReactCountryFlag
                                    style={{ width: 33, height: 'auto' }}
                                    width={33}
                                    svg
                                    countryCode="EU"
                                />
                            </div>
                            <div className="col-span-5">
                                <h6 className="text-base m-0 leading-none">EU Cloud</h6>
                                <p className="m-0 text-sm md:text-[15px]">Hosted in Frankfurt</p>
                            </div>
                        </div>
                    </div>
                    <StaticImage src="./images/host-hogs.png" className="-mx-8 md:mx-0" />
                </div>
            </div>
        </section>
    )
}
