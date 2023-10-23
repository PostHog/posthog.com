import React from 'react'
import { MenuItem } from 'components/PostLayout/Menu'
import Link from 'components/Link'

export const DocLinks = ({ menu }) => {
    const organized = {}
    let currentMenu
    menu.forEach((menuItem) => {
        const { name } = menuItem
        if (!('url' in menuItem)) {
            currentMenu = name
            organized[name] = []
        } else if (currentMenu) {
            organized[currentMenu].push(menuItem)
        }
    })

    const menuOrganized = Object.keys(organized)

    return (
        <ul className={`list-none m-0 p-0 flex flex-col md:flex-row justify-center gap-4 md:gap-20`}>
            {menuOrganized.map((title) => {
                return (
                    <li key={title}>
                        <p className="opacity-50 m-0 font-semibold">{title}</p>
                        <ul className="list-none m-0 p-0 mt-2 flex flex-col">
                            {organized[title].map(({ name, icon, color, url, badge }) => {
                                return (
                                    <li key={name + url} to={url}>
                                        <Link
                                            to={url}
                                            className="flex items-center relative px-2 pt-1.5 pb-1 mb-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                                        >
                                            <MenuItem badge={badge} color={color} icon={icon} name={name} />
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}
