import { DocSearch } from '@docsearch/react'
import { CallToAction } from 'components/CallToAction'
import { Chevron, Docs, Pricing, Product, SearchMenu } from 'components/Icons/Icons'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect, useState } from 'react'
import './style.scss'

const Nav = () => {
    const { navsJson } = useStaticQuery(query)

    return (
        <div className="md:block hidden">
            <Link
                className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark block"
                to="/"
            >
                <Logo />
            </Link>
            <nav className="h-full flex flex-col">
                {navsJson?.main.map(({ title, children }, index) => {
                    return (
                        <div key={index} className="mt-8 last:mt-auto">
                            {title && (
                                <p className="text-[14px] font-semibold text-primary opacity-25 m-0 mb-3">{title}</p>
                            )}
                            <ul className="list-none p-0 m-0 flex flex-col space-y-2">
                                {children.map(({ title, url }) => {
                                    return (
                                        <li key={title}>
                                            <Link
                                                className="text-base text-black hover:text-black dark:text-white dark:hover:text-white hover:opacity-100 opacity-50 transition-opacity font-semibold text-sm"
                                                to={url}
                                            >
                                                {title}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </nav>
        </div>
    )
}

const mobileNavTabs = [
    {
        title: 'Product',
        url: '/product',
        Icon: Product,
    },
    {
        title: 'Pricing',
        url: '/pricing',
        Icon: Pricing,
    },
    {
        title: 'Docs',
        url: '/docs',
        Icon: Docs,
    },
]

const MobileNavTabs = ({ handleMobileMenu }): JSX.Element => {
    return (
        <nav>
            <ul className="list-none m-0 p-0 grid grid-cols-4 items-end md:hidden">
                {mobileNavTabs.map(({ title, url, Icon }) => {
                    return (
                        <li key={title}>
                            <Link
                                className="text-black hover:text-black flex flex-col justify-center items-center"
                                to={url}
                            >
                                <Icon />
                                <span className="opacity-50 font-semibold text-[14px] mt-2 leading-none">{title}</span>
                            </Link>
                        </li>
                    )
                })}
                <button
                    className="text-black hover:text-black flex flex-col justify-center items-center"
                    onClick={handleMobileMenu}
                >
                    <SearchMenu />
                    <span className="opacity-50 font-semibold text-[14px] mt-2 leading-none">Menu</span>
                </button>
            </ul>
        </nav>
    )
}

const mobileNav = [
    {
        children: [
            {
                title: 'Home',
                url: '/',
            },
            {
                title: 'Pricing',
                url: '/pricing',
            },
            {
                title: 'Product',
                url: '/product',
            },
            {
                title: 'Customers',
                url: '/customers',
            },
            {
                title: 'Community',
                url: '/contributors',
            },
            {
                title: 'Product',
                url: '/product',
            },
        ],
    },
    {
        title: 'Resources',
        column: true,
        children: [
            {
                title: 'Docs',
                url: '/docs',
            },
            {
                title: 'User guides',
                url: '/user-guides',
            },
            {
                title: 'Tutorials',
                url: '/tutorials',
            },
            {
                title: 'API',
                url: '/api',
            },
        ],
    },
    {
        title: 'Company',
        column: true,
        children: [
            {
                title: 'About',
                url: '/handbook/our-story',
            },
            {
                title: 'Blog',
                url: '/blog',
            },
            {
                title: 'Handbook',
                url: '/handbook',
            },
            {
                title: 'Careers',
                url: '/careers',
            },
        ],
    },
]

const MobileNav = ({ handleMobileMenu, open }) => {
    const y = useMotionValue(0)
    const input = [0, 200]
    const output = [1, 0]
    const opacity = useTransform(y, input, output)
    const [yState, setYState] = useState(y.get())

    useEffect(() => {
        const unsubscribe = y.onChange(setYState)
        return unsubscribe
    }, [])

    const handleDragEnd = () => {
        if (yState < 200) {
            y.stop()
            y.set(0)
        } else {
            handleMobileMenu()
        }
    }

    return (
        <motion.div
            onDragEnd={handleDragEnd}
            drag="y"
            className="fixed bottom-0 left-0 h-full w-full z-[99999] bg-tan px-5 "
            dragConstraints={{ top: 0 }}
            style={{ y, opacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                initial={{ translateY: '100%' }}
                animate={{ translateY: 0 }}
                exit={{ translateY: '100%' }}
                className="flex flex-col h-full"
            >
                <div className="flex-grow-0 bg-white rounded-md px-4 py-3 mt-5 mb-4">
                    <DocSearch
                        translations={{
                            button: {
                                buttonText: `Search...`,
                                buttonAriaLabel: 'Search',
                            },
                        }}
                        appId="B763I3AO0D"
                        indexName="posthog"
                        apiKey="f1386529b9fafc5c3467e0380f19de4b"
                    />
                </div>
                <ul className="list-none m-0 p-0 overflow-auto">
                    {mobileNav.map(({ column, children, title }) => {
                        return (
                            <li key={title}>
                                <h5 className="text-[14px] font-normal m-0 text-black opacity-50 mt-4 -mb-1">
                                    {title}
                                </h5>
                                <ul className={`list-none m-0 p-0 ${column ? 'grid grid-cols-2' : ''}`}>
                                    {children.map(({ url, title }) => {
                                        return (
                                            <li className="mt-2" key={title}>
                                                <Link className="text-black hover:text-black flex flex-col" to={url}>
                                                    <span className="opacity-50 font-semibold text-[16px]">
                                                        {title}
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
                <div className="mt-auto">
                    <a
                        className="text-red hover:text-red inline-block py-3 border-t border-b border-dashed border-gray-accent-light w-full font-bold my-4"
                        href="https://app.posthog.com"
                    >
                        Login to PostHog
                    </a>
                    <div className="grid grid-cols-2 gap-2">
                        <CallToAction
                            type="custom"
                            className="bg-red border-red text-white hover:text-white w-full"
                            size="md"
                            to="/get-started"
                        >
                            Get started
                        </CallToAction>
                        <CallToAction
                            size="md"
                            type="outline"
                            className="text-red hover:text-red w-full"
                            to="/get-started"
                        >
                            Book a demo
                        </CallToAction>
                    </div>
                    <div className="pt-4 pb-6 text-center flex justify-center">
                        <button
                            onClick={handleMobileMenu}
                            className="text-[14px] text-black opacity-50 flex flex-col justify-center items-center w-full"
                        >
                            <span>Close menu</span>
                            <Chevron className="w-4 h-4 mt-2" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export const Header = (): JSX.Element => {
    const [mobileMenuOpen, setmobileMenuOpen] = useState(false)

    const handleMobileMenu = () => {
        setmobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <header className="z-[9999] px-7 py-4 flex-shrink-0 md:w-[230px] md:h-screen md:sticky md:top-0 border-r border-dashed dark:border-gray-accent-dark fixed bottom-0 w-full bg-tan md:border-t-0 border-t border-gray-accent-light border">
            <div className="flex flex-col h-full">
                <Nav />
                <MobileNavTabs handleMobileMenu={handleMobileMenu} />
            </div>

            <AnimatePresence>
                {mobileMenuOpen && <MobileNav open={mobileMenuOpen} handleMobileMenu={handleMobileMenu} />}
            </AnimatePresence>
        </header>
    )
}

const query = graphql`
    query NavQuery {
        navsJson {
            main {
                title
                children {
                    title
                    url
                }
            }
        }
    }
`
