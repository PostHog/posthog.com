import React from 'react'
import Link from '../../Link'
import { RightArrow } from '../../Icons/Icons'
import SubmenuItemFooter from '../SubmenuItemFooter'
import { motion } from 'framer-motion'
import { submenu } from '../classes'

export default function SubmenuItem({ item }) {
    const { sections, title, link, footerLinks } = item
    const cols = sections.length
    const variants = {
        hidden: { y: -40, opacity: 0 },
        shown: { y: 0, opacity: 1, transition: { duration: 0.5, type: 'spring' } },
    }
    return (
        <motion.li variants={variants} className="lg:mt-12 mt-6 font-bold">
            <div className="flex items-center justify-between">
                <h2 className={submenu.section.title}>{title}</h2>
                {link && (
                    <Link
                        disablePrefetch
                        to={link.url}
                        className="flex items-center space-x-1 text-light-yellow hover:text-light-yellow"
                    >
                        <span>{link.title}</span>
                        <RightArrow className="w-5 h-5" />
                    </Link>
                )}
            </div>

            <div
                className={`grid grid-cols-1 xs:grid-cols-${
                    cols > 3 ? '2' : '1'
                } lg:grid-cols-${cols} lg:divide-x-1 divide-gray-accent-light bg-tan bg-opacity-50 dark:bg-opacity-20 divide-dashed rounded lg:py-0 py-5`}
            >
                {sections.map((section, index) => {
                    const { title, link, items } = section
                    const rows = Math.ceil(items.length / 2)
                    return (
                        <div key={index} className="px-5 py-2 lg:py-5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-[14px] m-0 font-bold opacity-50">{title}</h3>
                                {link && (
                                    <Link disablePrefetch className={submenu.section.link()} to={link.url}>
                                        {link.title}
                                    </Link>
                                )}
                            </div>
                            <ul
                                className={`list-none p-0 m-0 mt-4 grid lg:gap-x-4 ${
                                    cols > 3
                                        ? `grid-cols-1`
                                        : `grid-cols-1 xs:grid-cols-2 xs:grid-flow-col grid-rows-${rows}`
                                }`}
                            >
                                {items.map((item, index) => {
                                    const { icon, title, url } = item

                                    return (
                                        <li key={index}>
                                            <Link
                                                disablePrefetch
                                                className="text-almost-black hover:text-almost-black dark:text-white dark:hover:text-white font-semibold p-2 hover:bg-gray-accent-light dark:hover:bg-opacity-10 rounded flex items-center space-x-2 text-[14px]"
                                                to={url}
                                            >
                                                {icon && (
                                                    <svg className="w-5 h-5">
                                                        <use xlinkHref={`#${icon}`}></use>
                                                    </svg>
                                                )}
                                                <span>{title}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
                {footerLinks && <SubmenuItemFooter links={footerLinks} />}
            </div>
        </motion.li>
    )
}
