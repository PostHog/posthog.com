import React from 'react'
import Icon from 'components/SupportImages/Icon'
import Link from 'components/Link'

type LinkGridProps = {
    links: { name: string; to: string; description: string; icon?: string }[]
}

export const LinkGrid: React.FC<LinkGridProps> = ({ links }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 border-l border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark">
            {links.map((link) => {
                return (
                    <Link
                        to={link.to}
                        key={link.name}
                        disablePrefetch
                        className="border-b border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark px-8 py-4 flex items-start space-x-3 hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark"
                    >
                        {link.icon && <Icon className="w-6 h-6 text-gray mt-1 lg:mt-0.5 shrink-0" name={link.icon} />}
                        <div>
                            <h3 className="text-lg font-bold text-red mb-0.5">{link.name}</h3>
                            <p className="text-black dark:text-white font-medium mb-2 text-gray-accent-dark text-sm">
                                {link.description}
                            </p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
