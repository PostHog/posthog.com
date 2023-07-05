import Logo from 'components/Logo'
import React from 'react'

export const CloudVsSelfHost = ({ className = '' }) => {
    return (
        <section
            id="self-host-vs-cloud"
            className={`${className} px-4 box-content grid md:grid-cols-2 grid-cols-1 md: max-w-screen-lg mx-auto relative md:gap-20 text-center font-bold text-primary dark:text-primary-dark`}
        >
            <div className="before:my-14 md:before:my-0 before:w-12 before:h-12 before:bg-primary before:rounded-full before:text-white md:before:absolute before:flex before:items-center before:justify-center md:before:left-1/2 md:before:-translate-x-1/2 before:text-2xl before:mx-auto md:before:content-['vs.'] before:content-['vs.']">
                <h3 className="sm:text-3xl md:mb-16 flex items-center justify-center space-x-2">
                    <span className="flex-grow-0">
                        <Logo noText />
                    </span>
                    <span className="flex-grow-1">PostHog Cloud</span>
                </h3>
                <ul className="list-none m-0 p-0">
                    <li className="py-4 sm:text-lg md:text-xl">Hosted & managed by PostHog</li>
                    <li className="py-4 sm:text-lg md:text-xl border-dashed border-gray-accent-light border border-l-0 border-r-0">
                        Start using immediately
                    </li>
                    <li className="pt-4 sm:text-lg md:text-xl">Automatic upgrades</li>
                </ul>
            </div>
            <div className="md:after:block after:hidden after:absolute after:h-[60%] after:border-dashed after:border-gray-accent-light after:border-l after:left-1/2 after:-translate-x-1/2 after:bottom-0">
                <h3 className="sm:text-3xl md:mb-16">Self-hosting</h3>
                <ul className="list-none m-0 p-0">
                    <li className="py-4 sm:text-lg md:text-xl">User data stays on your infrastructure</li>
                    <li className="py-4 sm:text-lg md:text-xl border-dashed border-gray-accent-light border border-l-0 border-r-0">
                        Full access to production instance
                    </li>
                    <li className="pt-4 sm:text-lg md:text-xl">
                        First-party cookies bypass privacy features & ad blockers
                    </li>
                </ul>
            </div>
        </section>
    )
}
