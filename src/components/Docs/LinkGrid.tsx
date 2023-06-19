import React from 'react'
import Link from 'components/Link'
import * as ProductIcons from '../ProductIcons'

type LinkGridProps = {
    links: { name: string; to: string; description: string; icon?: string }[]
}

export const LinkGrid: React.FC<LinkGridProps> = ({ links }) => {
    return (
        <ul className="p-0 m-0 grid md:grid-cols-2 gap-[1px]">
            {links.map((link) => {
                const Icon = link.icon && ProductIcons[link.icon]
                return (
                    <li key={link.name} className="list-none">
                        <Link
                            to={link.to}
                            key={link.name}
                            disablePrefetch
                            className="group flex items-center relative px-2 py-0.5 mb-1 gap-2 rounded  border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                        >
                            {Icon && (
                                <Icon className="w-10 h-10 p-2 text-primary dark:text-primary-dark bg-accent dark:bg-accent-dark group-hover:bg-accent dark:group-hover:bg-accent-dark rounded-sm mt-1 lg:mt-0.5 shrink-0" />
                            )}
                            <div>
                                <h3 className="text-base font-semibold m-0">{link.name}</h3>
                                {/* {link.description} */}
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
