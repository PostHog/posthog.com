import { useLocation } from '@reach/router'
import { Auth } from '@supabase/ui'
import AnimatedBurger from 'components/AnimatedBurger'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { motion } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { supabase } from 'lib/supabase'
import React, { useEffect, useState } from 'react'
import { link, menuItem as menuItemClass } from './classes'
import MenuItem from './MenuItem'

const Login = ({ setLoginOpen, view, setLoginView }) => {
    const handleClose = () => {
        setLoginOpen(false)
    }

    return (
        <motion.div
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-50"
        >
            <div onClick={(e) => e.stopPropagation()} className="max-w-[400px] w-full bg-tan rounded-md">
                <div className="p-6 pb-4">
                    {(view === 'sign_in' || view === 'sign_up') && (
                        <div className="pb-2 mb-6 grid items-center grid-cols-2 text-center text-md font-semibold relative">
                            <Link
                                onClick={() => setLoginView('sign_in')}
                                className={view === 'sign_in' ? 'text-red hover:text-red' : ''}
                            >
                                Login
                            </Link>
                            <Link
                                onClick={() => setLoginView('sign_up')}
                                className={view === 'sign_up' ? 'text-red hover:text-red' : ''}
                            >
                                Sign up
                            </Link>
                            <div
                                className={`transition-all rounded-full absolute w-1/2 h-[2px] transform left-0 bg-red bottom-0 ${
                                    view === 'sign_in' ? 'translate-x-0' : 'translate-x-full'
                                }`}
                            />
                        </div>
                    )}
                    <Auth view={view} magicLink supabaseClient={supabase} />
                    {view !== 'magic_link' && (
                        <div className="pt-4 text-center">
                            <Link className="text-red hover:text-red" onClick={() => setLoginView('magic_link')}>
                                Sign in by email link
                            </Link>
                        </div>
                    )}
                    {view === 'magic_link' && (
                        <div className="pt-4 text-center">
                            <Link className="text-red hover:text-red" onClick={() => setLoginView('sign_in')}>
                                Sign in with password
                            </Link>
                        </div>
                    )}
                </div>
                <div className="py-4 border-t border-dashed border-gray-accent-light">
                    <p className="m-0 text-center text-[14px] font-semibold">
                        Looking to sign into{' '}
                        <Link className="text-red hover:text-red" to="https://app.posthog.com/login">
                            PostHog Cloud
                        </Link>
                        ?
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default function MainNav() {
    const data = useStaticQuery(graphql`
        query MainNavQuery {
            navsJson {
                main {
                    title
                    url
                    cta
                    classes
                    hideBorder
                    sub {
                        title
                        description
                        component
                        items {
                            title
                            description
                            component {
                                position
                                name
                            }
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
                                    badge
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
    const { user } = Auth.useUser()
    const [expanded, expandMenu] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const [loginView, setLoginView] = useState('sign_in')
    const menu = data?.navsJson?.main
    const breakpoints = useBreakpoint()
    const location = useLocation()
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    const menuLength = menu.length
    const halfMenu = Math.floor(menuLength / 2) + 1

    const handleClick = () => {
        if (user) {
            supabase.auth.signOut()
        } else {
            setLoginOpen(true)
        }
    }

    useEffect(() => {
        if (typeof window === 'undefined') return
        const { data: authListener } = supabase.auth.onAuthStateChange((e) => {
            switch (e) {
                case 'PASSWORD_RECOVERY':
                    setLoginView('update_password')
                    setLoginOpen(true)
                    break
                default:
                    setLoginView(undefined)
                    setLoginOpen(false)
            }
        })

        return () => {
            authListener.unsubscribe()
        }
    }, [])
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
                            <li className={menuItemClass(true)}>
                                <span className="flex justify-between items-center">
                                    <Link onClick={handleClick} className={link('w-full text-center')}>
                                        {user ? 'Logout' : 'Login'}
                                    </Link>
                                </span>
                            </li>
                        </ul>
                    </div>
                </motion.nav>
            )}
            <AnimatedBurger className="lg:hidden" onClick={() => expandMenu(!expanded)} active={expanded} />
            {loginOpen && <Login setLoginView={setLoginView} view={loginView} setLoginOpen={setLoginOpen} />}
        </div>
    )
}
