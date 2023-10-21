import React from 'react'
import { MenuItem } from 'components/PostLayout/Menu'
import Link from 'components/Link'

export const SmoothScroll = (): JSX.Element => {
    return (
        <section className="hidden md:block sticky top-[-1px] reasonable:top-[107px] bg-accent dark:bg-accent-dark border-y border-border dark:border-border-dark z-50 mb-12">
            <ul className="list-none flex gap-4 justify-center pt-1">
                <li>
                    <span className="inline-block text-sm py-2 px-3 border border-light dark:border-dark !border-b-transparent -mb-px font-bold bg-light dark:bg-dark rounded-tl-sm rounded-tr-md">
                        Features
                    </span>
                </li>
                <li>
                    <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                        Pricing
                    </span>
                </li>
                <li>
                    <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                        PostHog vs...
                    </span>
                </li>
                <li>
                    <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                        Installation
                    </span>
                </li>
                <li>
                    <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                        Docs
                    </span>
                </li>
                <li>
                    <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                        Meet the team
                    </span>
                </li>
                <li>
                    <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                        Roadmap &amp; changelog
                    </span>
                </li>
                <li>
                    <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                        Questions
                    </span>
                </li>
            </ul>
        </section>
    )
}
