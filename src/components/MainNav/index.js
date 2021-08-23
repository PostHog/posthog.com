import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MenuItem from './MenuItem'
import { motion } from 'framer-motion'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

export default function MainNav({ expanded }) {
    const data = useStaticQuery(graphql`
        query MainNavQuery {
            navsJson {
                main {
                    title
                    url
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
    return (
        (expanded || !breakpoints.md) && (
            <motion.nav
                className="lg:static absolute lg:w-auto w-full left-0 top-full lg:overflow-visible overflow-hidden hidden lg:block"
                variants={breakpoints.md && variants}
                initial="hidden"
                animate="shown"
            >
                <ul className="z-50 flex justify-between lg:items-center items-start flex-col lg:flex-row lg:space-x-14 space-x-0 lg:space-y-0 space-y-6 bg-[#220f3f] lg:bg-transparent list-none  mb-0 font-nav lg:px-0 px-5 lg:py-0 py-5 text-white lg:dark:text-white lg:text-almost-black">
                    {menu.map((menuItem, index) => (
                        <MenuItem key={index} menuItem={menuItem} />
                    ))}
                </ul>
            </motion.nav>
        )
    )
}
