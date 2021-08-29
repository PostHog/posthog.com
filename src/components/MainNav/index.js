import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MenuItem from './MenuItem'
import { motion } from 'framer-motion'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import Link from 'components/Link'
import Logo from 'components/Logo'

export default function MainNav({ expanded }) {
    const data = useStaticQuery(graphql`
        query MainNavQuery {
            navsJson {
                main {
                    title
                    url
                    classes
                    sub {
                        title
                        description
                        items {
                            title
                            link {
                                title
                                url
                            }
                            sections {
                                link {
                                    title
                                    url
                                }
                                title
                                items {
                                    icon
                                    title
                                    url
                                }
                            }
                            footerLinks {
                                title
                                url
                            }
                        }
                    }
                }
            }
        }
    `)
    const menu = data?.navsJson?.main
    const breakpoints = useBreakpoint()
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    const menuLength = menu.length
    const halfMenu = Math.ceil(menuLength / 2)
    return (
        (expanded || !breakpoints.md) && (
            <motion.nav
                className="lg:static absolute w-full left-0 top-full lg:overflow-visible overflow-hidden hidden lg:block"
                variants={breakpoints.md && variants}
                initial="hidden"
                animate="shown"
            >
                <ul className="z-50 flex justify-between lg:items-center items-start flex-col lg:flex-row lg:space-y-0 space-y-6 bg-white dark:bg-gray-accent-dark lg:bg-transparent lg:dark:bg-transparent list-none mb-0 font-nav lg:px-0 px-5 lg:py-0 py-5 text-white lg:dark:text-white lg:text-almost-black max-w-screen-3xl -ml-4 3xl:mx-auto">
                    {menu.map((menuItem, index) => {
                        return (
                            <>
                                <MenuItem key={index} menuItem={menuItem} />
                                {index + 1 === halfMenu && (
                                    <li style={{ margin: '0 auto' }} className="w-[30%] justify-center hidden lg:flex">
                                        <Link
                                            className="text-almost-black hover:text-almost-black dark:text-white dark:hover:text-white"
                                            to="/"
                                        >
                                            <Logo />
                                        </Link>
                                    </li>
                                )}
                            </>
                        )
                    })}
                </ul>
            </motion.nav>
        )
    )
}
