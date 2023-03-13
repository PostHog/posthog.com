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
                            className="group px-2 py-2 rounded-sm flex items-center space-x-3 hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark relative
                            hover:scale-[1.01] hover:top-[-.5px] active:top-[0.25px] active:scale-[.99]"
                        >
                            {Icon && (
                                <Icon className="w-10 h-10 p-2 text-primary dark:text-primary-dark bg-gray-accent-light group-hover:bg-gray-accent/50 dark:bg-gray-accent-dark grou-hover:bg-gray-accent/50 rounded-sm mt-1 lg:mt-0.5 shrink-0" />
                            )}
                            <div>
                                <h3 className="text-base font-semibold text-red m-0">{link.name}</h3>
                                {/* {link.description} */}
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
