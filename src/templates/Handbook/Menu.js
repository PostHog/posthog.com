import React, { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { Link } from 'gatsby'

function MenuItem({ item, slug }) {
    const isActive = (children) => {
        return (
            children &&
            children.some((child) => {
                return child.url === slug || isActive(child.children)
            })
        )
    }
    const opacity = item.url === slug || isActive(item.children) ? '1' : '40'
    const [open, setOpen] = useState(isActive(item.children))
    const handleClick = () => setOpen(!open)
    const height = open ? 'auto' : 0
    return (
        <li>
            <div className="flex items-center justify-between space-x-16">
                {item.url ? (
                    <Link
                        className={`transition-opacity text-[#200935] hover:text-[#200935] dark:text-white dark:hover:text-white opacity-${opacity} hover:opacity-75 ${
                            item.children ? 'font-bold' : 'text-[15px]'
                        }`}
                        to={item.url}
                    >
                        {item.name}
                    </Link>
                ) : (
                    <button
                        onClick={handleClick}
                        className={`dark:text-white dark:hover:text-white font-bold opacity-${opacity} hover:opacity-75 transition-opacity`}
                    >
                        {item.name}
                    </button>
                )}

                {item.children && (
                    <button onClick={handleClick}>
                        <svg
                            style={{ transform: `rotate(${open ? '180deg' : '0deg'})` }}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform opacity-${opacity} hover:opacity-75 transition-opacity`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <AnimateHeight duration={150} height={height}>
                <Menu slug={slug} className="mt-2" menu={item.children} sub />
            </AnimateHeight>
        </li>
    )
}

export default function Menu({ menu, sub, className, slug }) {
    return (
        <ul className={`${className} flex flex-col space-y-2 list-none p-0 my-0 ${sub ? 'ml-2' : ''}`}>
            {menu &&
                menu.map((item, index) => {
                    return <MenuItem key={index} slug={slug} item={item} />
                })}
        </ul>
    )
}
