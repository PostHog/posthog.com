import React from 'react'
import { heading, section } from './classes'
import AppsList from '../AppsList'
import { CallToAction } from '../CallToAction'

const Listing = ({ name, image, url }) => {
    return (
        <li className="border-t border-l border-dashed border-gray-accent-light">
            <a href={url} className="flex flex-col items-center text-center px-2 py-6 hover:bg-gray-accent-light">
                <img className="icon w-8 h-8 mb-2" src={image} />
                <span className="text-primary">{name}</span>
            </a>
        </li>
    )
}

export default function Apps() {
    return (
        <section className={section('mt-4 md:mt-8')}>
            <h2 className={heading('lg')}>
                Do more with your data with the <br className="hidden lg:block" />
                <span className="text-blue">PostHog App Store</span>
            </h2>
            <p className="my-6 mx-auto text-center text-base md:text-lg font-semibold mt-2 lg:mt-4 text-primary max-w-2xl opacity-75">
                40+ apps available
            </p>
            <div className="mt-8 md:mt-12">
                <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 border-b border-r border-dashed border-gray-accent-light">
                    <AppsList />
                    <li className="border-t border-l border-dashed border-gray-accent-light">
                        <a
                            href="/docs/plugins/build"
                            className="flex flex-col h-full items-center justify-center px-2 py-6 hover:bg-gray-accent-light"
                        >
                            <span className="text-red">Build your own app</span>
                        </a>
                    </li>
                </ul>

                <footer className="text-center">
                    <CallToAction to="/apps" type="outline" className="mt-8">
                        Browse 40+ apps
                    </CallToAction>
                </footer>
            </div>
        </section>
    )
}
