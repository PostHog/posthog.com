import React from 'react'
import { Link } from 'react-scroll'

const menuItems: { label: string; id: string }[] = [
    {
        label: 'Features',
        id: 'features',
    },
    {
        label: 'Pricing',
        id: 'pricing',
    },
    {
        label: 'PostHog vs...',
        id: 'posthog-vs',
    },
    { label: 'Installation', id: 'installation' },
    { label: 'Docs', id: 'docs' },
    { label: 'Meet the team', id: 'team' },
    { label: 'Roadmap & changelog', id: 'roadmap' },
    { label: 'Questions', id: 'questions' },
]

export const SmoothScroll = (): JSX.Element => {
    return (
        <section className="hidden md:block sticky top-[-1px] reasonable:top-[107px] bg-accent dark:bg-accent-dark border-y border-border dark:border-border-dark z-50 mb-12">
            <ul className="list-none flex gap-4 justify-center pt-1">
                {menuItems.map(({ label, id }) => {
                    return (
                        <li key={id}>
                            <Link
                                offset={-149}
                                className="!text-inherit inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md cursor-pointer"
                                smooth
                                duration={300}
                                to={id}
                                hashSpy
                                spy
                                activeClass="border-light dark:border-dark !border-b-transparent font-bold bg-light dark:bg-dark rounded-tl-sm rounded-tr-md"
                            >
                                {label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
