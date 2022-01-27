import AnimatedBurger from 'components/AnimatedBurger'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { motion } from 'framer-motion'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import React, { useState } from 'react'
import MenuItem from './MenuItem'

export default function MainNav() {
    const [expanded, expandMenu] = useState(false)
    const menu = data?.navsJson?.main
    const breakpoints = useBreakpoint()
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    const menuLength = menu.length
    const halfMenu = Math.floor(menuLength / 2)
    return (
        <div className="flex justify-between items-center">
            <Link
                className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark block lg:hidden"
                to="/"
            >
                <Logo />
            </Link>
            {(expanded || !breakpoints.md) && (
                <motion.nav
                    className="lg:static absolute w-full left-0 top-full lg:overflow-visible overflow-hidden hidden lg:block"
                    variants={breakpoints.md && variants}
                    initial="hidden"
                    animate="shown"
                >
                    <div className="z-50 flex justify-between lg:items-center items-start flex-col lg:flex-row bg-white dark:bg-gray-accent-dark lg:bg-transparent lg:dark:bg-transparent font-nav lg:py-0 py-5 text-white lg:dark:text-white lg:text-almost-black max-w-screen-3xl mx-auto">
                        <ul className="flex-1 flex flex-col lg:flex-row list-none m-0 p-0 w-full lg:w-auto">
                            {menu.slice(0, halfMenu).map((menuItem, index) => {
                                return <MenuItem key={index} menuItem={menuItem} />
                            })}
                        </ul>
                        {!breakpoints.md && (
                            <Link
                                className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark hidden lg:block"
                                to="/"
                            >
                                <Logo />
                            </Link>
                        )}
                        <ul className="flex-1 flex flex-col lg:flex-row list-none m-0 p-0 w-full lg:w-auto justify-end">
                            {menu.slice(halfMenu, menu.length).map((menuItem, index) => {
                                return <MenuItem key={index} menuItem={menuItem} />
                            })}
                        </ul>
                    </div>
                </motion.nav>
            )}
            <AnimatedBurger className="lg:hidden" onClick={() => expandMenu(!expanded)} active={expanded} />
        </div>
    )
}
