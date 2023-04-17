import { ISidebarAction } from './types'
import React from 'react'
import Tooltip from 'components/Tooltip'
import Link from 'components/Link'
import slugify from 'slugify'

export const sidebarButtonClasses =
    'hover:bg-gray-accent-light rounded-[3px] h-8 w-8 flex justify-center items-center hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark my-1 mx-1 space-x-[1px] transition-colors dark:text-white/50 dark:hover:text-white/100 text-black/50 hover:text-black/100 transition active:top-[0.5px] active:scale-[.9]'

export default function SidebarAction({ children, title, width, className = '', href, onClick }: ISidebarAction) {
    return (
        <li style={width ? { width } : {}} className={`flex items-center justify-center ${className}`}>
            <Tooltip className="flex" content={title}>
                <span className="relative flex">
                    {href ? (
                        <Link
                            data-action-name={slugify(title, { lower: true })}
                            className={sidebarButtonClasses}
                            to={href}
                        >
                            {children}
                        </Link>
                    ) : onClick ? (
                        <button
                            data-action-name={slugify(title, { lower: true })}
                            className={sidebarButtonClasses}
                            onClick={onClick}
                        >
                            {children}
                        </button>
                    ) : (
                        children
                    )}
                </span>
            </Tooltip>
        </li>
    )
}
