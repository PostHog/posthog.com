import React, { useState } from 'react'
import { useValues, useActions } from 'kea'
import { Link } from 'gatsby'
import { layoutLogic } from '../../logic/layoutLogic'
import whiteLogo from '../../images/posthog-logo-white.svg'
import darkLogo from '../../images/posthog-logo-150x29.svg'

const NavbarLink = ({ to, children, textLight, className }) => {
    const baseClasses = 'opacity-80 hover:opacity-100 px-4 py-2 font-semibold tracking-wider '.concat(className)
    const classes = textLight
        ? `text-white hover:text-white ${baseClasses}`
        : `text-black hover:text-black ${baseClasses}`

    return (
        <li className="leading-none">
            <Link to={to} className={classes}>
                {children}
            </Link>
        </li>
    )
}

const PrimaryCta = ({ children, className }) => {
    const { setIsGetStartedModalOpen } = useActions(layoutLogic)

    const classes = `button-primary ${className}`

    return (
        <li className="leading-none">
            <button onClick={() => setIsGetStartedModalOpen(true)} className={classes}>
                {children}
            </button>
        </li>
    )
}

function Header({ isDocsPage }) {
    const [expanded, expandMenu] = useState(false)
    const { websiteTheme } = useValues(layoutLogic)

    const themeSupportedColor = websiteTheme === 'light' ? 'bg-lightmode-gray' : 'bg-darkmode-gray'
    const backgroundColor = isDocsPage ? themeSupportedColor : 'bg-purple-gradient'
    const logo = isDocsPage && websiteTheme === 'light' ? darkLogo : whiteLogo
    const textLight = !isDocsPage || websiteTheme === 'dark'
    const layoutWidth = isDocsPage ? 'w-full px-4' : 'w-11/12 mx-auto'

    return (
        <div className={`primary-navbar py-6 ${backgroundColor}`}>
            <div className={`${layoutWidth} flex justify-between items-center`}>
                <Link id="logo" to="/" className="block">
                    <img alt="logo" src={logo} />
                </Link>

                <ul className="hidden lg:flex list-none justify-between items-center mb-0">
                    <NavbarLink to="/product-features" textLight={textLight}>
                        Product
                    </NavbarLink>
                    <NavbarLink to="/docs" textLight={textLight}>
                        Docs
                    </NavbarLink>
                    <NavbarLink to="https://github.com/posthog/posthog" textLight={textLight}>
                        Community
                    </NavbarLink>
                    <NavbarLink to="/handbook/company/story" textLight={textLight}>
                        Company
                    </NavbarLink>
                    <NavbarLink to="/pricing" textLight={textLight}>
                        Pricing
                    </NavbarLink>
                </ul>

                <ul className="hidden lg:flex list-none flex justify-between items-center mb-0">
                    <PrimaryCta href="">Get Started</PrimaryCta>
                    <NavbarLink to="https://app.posthog.com/login" textLight={textLight} className="uppercase">
                        Login
                    </NavbarLink>
                </ul>

                <button className="text-white lg:hidden" onClick={() => expandMenu(!expanded)}>
                    <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        className=""
                        data-icon="menu"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                    </svg>
                </button>
            </div>

            {expanded ? (
                <ul className="w-11/12 mx-auto mt-8 block lg:hidden list-none">
                    <NavbarLink
                        to="/product-features"
                        textLight={textLight}
                        className="block my-2 py-2 border-b border-white border-opacity-10"
                    >
                        Product
                    </NavbarLink>
                    <NavbarLink
                        to="/docs"
                        textLight={textLight}
                        className="block my-2 py-2 border-b border-white border-opacity-10"
                    >
                        Docs
                    </NavbarLink>
                    <NavbarLink
                        to="https://github.com/posthog/posthog"
                        textLight={textLight}
                        className="block my-2 py-2 border-b border-white border-opacity-10"
                    >
                        Community
                    </NavbarLink>
                    <NavbarLink
                        to="/handbook/company/story"
                        textLight={textLight}
                        className="block my-2 py-2 border-b border-white border-opacity-10"
                    >
                        Company
                    </NavbarLink>
                    <NavbarLink
                        to="/pricing"
                        textLight={textLight}
                        className="block my-2 py-2 border-b border-white border-opacity-10"
                    >
                        Pricing
                    </NavbarLink>
                    <NavbarLink
                        to="https://app.posthog.com/login"
                        textLight={textLight}
                        className="block my-2 py-2 border-b border-white border-opacity-10"
                    >
                        Login
                    </NavbarLink>

                    <PrimaryCta href="" className="my-2 ml-4">
                        Get Started
                    </PrimaryCta>
                </ul>
            ) : null}
        </div>
    )
}

export default Header
