import React, { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { Link } from 'gatsby'

function MenuItem({ item, slug, topLevel }) {
    const isActive = (children) => {
        return (
            children &&
            children.some((child) => {
                return child.url === slug || isActive(child.children)
            })
        )
    }
    const { name, url, children } = item
    const currentPage = url === slug
    const isCurrent = currentPage || isActive(children) ? 'current' : 'not-current'
    const [open, setOpen] = useState(isActive(children))
    const handleClick = () => setOpen(!open)
    const height = open ? 'auto' : 0
    const linkClasses = `flex-grow text-left text-primary hover:text-almost-black dark:text-white dark:hover:text-white ${
        topLevel || children || currentPage ? 'font-bold' : 'text-[15px]'
    }`
    return (
        <li>
            <div className={`${isCurrent} flex items-center justify-between text-primary dark:text-white group`}>
                {url ? (
                    <Link className={linkClasses} to={url}>
                        {name}
                    </Link>
                ) : (
                    <button onClick={handleClick} className={linkClasses}>
                        <span>{name}</span>
                    </button>
                )}

                {children && (
                    <button onClick={handleClick}>
                        <svg
                            style={{ transform: `rotate(${open ? '180deg' : '0deg'})` }}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform`}
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

export default function Menu({ menu, sub, className = '', slug, topLevel }) {
    return (
        <ul className={`${className} chapters-menu flex flex-col space-y-2 list-none p-0 my-0 ${sub ? 'ml-2' : ''}`}>
            {menu &&
                menu.map((item, index) => {
                    return <MenuItem key={index} slug={slug} item={item} topLevel={topLevel} />
                })}
        </ul>
    )
}
