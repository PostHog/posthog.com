import React from 'react'
import { useValues } from 'kea'
import { Link } from 'gatsby'
import { layoutLogic } from '../../logic/layoutLogic'
import whiteLogo from '../../images/posthog-logo-white.svg'
import darkLogo from '../../images/posthog-logo-150x29.svg'

const NavbarLink = ({ to, children, textLight }) => {
    const baseClasses = 'opacity-80 hover:opacity-100 px-4 py-2 font-semibold tracking-wider'
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

function Header({ isDocsPage }) {
    const { websiteTheme } = useValues(layoutLogic)
    const themeSupportedColor = websiteTheme === 'light' ? 'bg-gray-100' : 'bg-dark-gray'
    const backgroundColor = isDocsPage ? themeSupportedColor : 'bg-purple-gradient'
    const logo = isDocsPage && websiteTheme === 'light' ? darkLogo : whiteLogo

    const textLight = !isDocsPage || websiteTheme === 'dark'

    return (
        <div className={`primary-navbar py-6 ${backgroundColor}`}>
            <div className="w-11/12 mx-auto flex justify-between items-center">
                <Link id="logo" to="/" className="block">
                    <img alt="logo" src={logo} />
                </Link>

                <ul className="list-none flex justify-between items-center mb-0">
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

                <ul className="list-none flex justify-between items-center mb-0">
                    <li className="leading-none">
                        <a
                            href=""
                            className="px-4 py-2 bg-primary rounded font-semibold tracking-widest text-white hover:text-white uppercase"
                        >
                            Get started
                        </a>
                    </li>
                    <NavbarLink to="" textLight={textLight}>
                        LOGIN
                    </NavbarLink>
                </ul>
            </div>
        </div>
    )
}

export default Header
