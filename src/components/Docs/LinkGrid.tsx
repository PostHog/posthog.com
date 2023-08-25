import React from 'react'
import Link from 'components/Link'
import * as NewIcons from '@posthog/icons'

type LinkGridProps = {
    links: { name: string; to: string; description: string; icon?: string; color?: string }[]
}

export const LinkGrid: React.FC<LinkGridProps> = ({ links }) => {
    return (
        <ul className="p-0 m-0 grid md:grid-cols-2 gap-[1px]">
            {links.map((link) => {
                const Icon = link.icon && NewIcons[link.icon]
                const Color = link.color
                return (
                    <li key={link.name} className="list-none">
                        <Link
                            to={link.to}
                            key={link.name}
                            disablePrefetch
                            className="group flex items-center relative px-2 py-1 mb-1 gap-2 rounded  border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                        >
                            {Icon && (
                                <Icon
                                    className={`w-10 h-10 p-2 text-primary  text-${Color} dark:text-${Color} bg-accent dark:bg-accent-dark group-hover:bg-accent dark:group-hover:bg-accent-dark rounded-sm shrink-0`}
                                />
                            )}
                            <div>
                                <h3 className="text-base text-primary dark:text-primary-dark font-semibold m-0">
                                    {link.name}
                                </h3>
                                {/* {link.description} */}
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
