import Slider from 'components/Slider'
import React, { useState } from 'react'
import { Link } from 'react-scroll'

type MenuItem = {
    label: string
    id: string
}

const menuItems: MenuItem[] = [
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
    { label: 'Tutorials', id: 'tutorials' },
    { label: 'Installation', id: 'installation' },
    { label: 'Docs', id: 'docs' },
    { label: 'Meet the team', id: 'team' },
    { label: 'Roadmap & changelog', id: 'roadmap' },
    { label: 'Questions', id: 'questions' },
]

export const SmoothScroll = ({ exclude = [], ...other }: { menuItems: MenuItem[] }): JSX.Element => {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <div className="hidden md:block sticky top-[-1px] reasonable:top-[107px] z-50 bg-accent dark:bg-accent-dark mb-12">
            <section>
                <Slider className="list-none flex gap-4 pt-1 ![justify-content:_safe_center] border-t border-border dark:border-dark">
                    {(other?.menuItems ?? menuItems)
                        .filter(({ label }) => !exclude.includes(label))
                        .map(({ label, id }, index) => {
                            return (
                                <Link
                                    key={id}
                                    offset={-169}
                                    className={`whitespace-nowrap text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark inline-block text-sm py-2 px-3 border border-transparent border-b-transparent hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md cursor-pointer ${index === activeTab
                                        ? '!border-border dark:!border-dark !border-b-bg-light !dark:border-b-bg-dark font-bold bg-light dark:bg-dark rounded-tl-sm rounded-tr-md text-opacity-100'
                                        : 'text-opacity-60'
                                        }`}
                                    smooth
                                    duration={300}
                                    to={id}
                                    hashSpy
                                    spy
                                    onSetActive={() => setActiveTab(index)}
                                >
                                    {label}
                                </Link>
                            )
                        })}
                </Slider>
                <div className="w-full border-t border-border dark:border-dark -mt-px" />
            </section>
        </div>
    )
}
