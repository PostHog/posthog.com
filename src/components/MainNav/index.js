import AnimatedBurger from 'components/AnimatedBurger'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { Search } from 'components/Icons/Icons'
import { useSearch } from 'components/Search/SearchContext'
import { motion } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import React, { useState } from 'react'
import MenuItem from './MenuItem'
import { OrgProvider, UserProvider } from 'squeak-react'

export default function MainNav() {
    const data = useStaticQuery(graphql`
        query MainNavQuery {
            navsJson {
                main {
                    title
                    url
                    classes
                    hideBorder
                    sub {
                        component
                    }
                }
            }
        }
    `)

    const [expanded, expandMenu] = useState(false)
    const [referenceElement, setReferenceElement] = useState(null)
    const menu = data?.navsJson?.main
    const breakpoints = useBreakpoint()
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    const menuLength = menu.length
    const halfMenu = Math.floor(menuLength / 2)

    const { open } = useSearch()

    return (
        <OrgProvider
            value={{
                organizationId: 'a898bcf2-c5b9-4039-82a0-a00220a8c626',
                apiHost: 'https://squeak.cloud',
            }}
        >
            <UserProvider>
                <div className="flex justify-between items-center max-w-screen-3xl mx-auto lg:relative">
                    <button
                        className="active:top-[0.5px] active:scale-[.98] lg:hidden bg-gray-accent-light dark:bg-gray-accent-dark w-[36px] h-[36px] flex items-center justify-center rounded-full"
                        onClick={() => open('mobile-header')}
                    >
                        <Search className="w-[16px] h-[16px]" />
                    </button>
                    <Link
                        className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark block lg:hidden"
                        to="/"
                    >
                        <Logo />
                    </Link>
                    <AnimatedBurger
                        className="active:top-[0.5px] active:scale-[.98] bg-gray-accent-light dark:bg-gray-accent-dark lg:hidden w-[36px] h-[36px] flex items-center justify-center rounded-full"
                        onClick={() => expandMenu(!expanded)}
                        active={expanded}
                    />
                    {(expanded || !breakpoints.md) && (
                        <motion.nav
                            className="lg:static absolute w-full left-0 top-full lg:overflow-visible overflow-hidden hidden lg:block"
                            variants={breakpoints.md && variants}
                            initial="hidden"
                            animate="shown"
                        >
                            <div
                                ref={setReferenceElement}
                                className="z-50 flex justify-between lg:items-center items-start flex-col lg:flex-row bg-white dark:bg-gray-accent-dark lg:bg-transparent lg:dark:bg-transparent font-nav lg:py-0 py-5 text-white lg:dark:text-white lg:text-almost-black max-w-screen-3xl mx-auto lg:-mx-3"
                            >
                                <ul className="flex-1 flex flex-col lg:flex-row list-none m-0 p-0 w-full space-x-[1px] lg:w-auto">
                                    {menu.slice(0, halfMenu).map((menuItem, index) => {
                                        return (
                                            <MenuItem
                                                referenceElement={referenceElement}
                                                key={index}
                                                menuItem={menuItem}
                                            />
                                        )
                                    })}
                                </ul>
                                {!breakpoints.md && (
                                    <Link
                                        className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark hidden lg:block 
                                relative
                                hover:scale-[1.01]
                                active:top-[0.5px]
                                active:scale-[.99]"
                                        to="/"
                                    >
                                        <Logo />
                                    </Link>
                                )}
                                <ul className="flex-1 flex flex-col lg:flex-row list-none m-0 p-0 w-full lg:w-auto justify-end">
                                    {menu.slice(halfMenu, menu.length).map((menuItem, index) => {
                                        return (
                                            <MenuItem
                                                referenceElement={referenceElement}
                                                key={index}
                                                menuItem={menuItem}
                                            />
                                        )
                                    })}
                                </ul>
                            </div>
                        </motion.nav>
                    )}
                </div>
            </UserProvider>
        </OrgProvider>
    )
}
