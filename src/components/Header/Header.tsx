import React, { useState } from 'react'
import { useValues } from 'kea'
import { Link } from 'gatsby'
import { layoutLogic } from '../../logic/layoutLogic'
import hamburgerIcon from '../../images/icons/hamburger.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import darkLogo from '../../images/posthog-logo-150x29.svg'

interface NavbarLinkProps {
    to?: string
    href?: string
    children: any
    textLight: boolean
    className?: string
}

const NavbarLink = ({ to, href, children, textLight, className = '' }: NavbarLinkProps) => {
    const baseClasses = 'opacity-80 hover:opacity-100 px-4 py-2 text-xs '.concat(className)
    const classList = textLight
        ? `text-white hover:text-white ${baseClasses}`
        : `text-black hover:text-black ${baseClasses}`

    return (
        <li className="leading-none">
            {to ? (
                <Link to={to} className={classList}>
                    {children}
                </Link>
            ) : (
                <a href={href} className={classList}>
                    {children}
                </a>
            )}
        </li>
    )
}

const PrimaryCta = ({ children, className = '' }: { children: any; className?: string }) => {
    const classList = `button-primary ${className} border-none`

    return (
        <li className="leading-none">
            <button
                onClick={() => {
                    window.location.href = 'https://app.posthog.com/signup?src=header'
                }}
                className={classList}
            >
                {children}
            </button>
        </li>
    )
}

export const Header = ({
    onPostPage,
    transparentBackground = false,
}: {
    onPostPage: boolean
    transparentBackground?: boolean
}) => {
    const [expanded, expandMenu] = useState(false)
    const { websiteTheme } = useValues(layoutLogic)

    const themeSupportedColor = websiteTheme === 'light' ? 'bg-lightmode-gray' : 'bg-darkmode-purple'
    const backgroundColor = onPostPage ? themeSupportedColor : 'bg-purple-gradient'
    const logo = onPostPage && websiteTheme === 'light' ? darkLogo : whiteLogo
    const textLight = !onPostPage || websiteTheme === 'dark'
    const layoutWidth = onPostPage ? 'w-full px-4' : 'w-11/12 mx-auto'

    return (
        <div
            className={`primary-navbar py-6 ${
                transparentBackground ? 'bg-transparent' : backgroundColor
            } relative z-20`}
        >
            <div className={`${layoutWidth} flex justify-between items-center`}>
                <Link id="logo" to="/" className="block">
                    <img alt="logo" src={logo} />
                </Link>

                <ul className="hidden lg:flex list-none justify-between items-center mb-0 font-nav">
                    <NavbarLink to="/product-features" textLight={textLight}>
                        Product
                    </NavbarLink>
                    <NavbarLink to="/docs" textLight={textLight}>
                        Docs
                    </NavbarLink>
                    <NavbarLink to="/handbook/company/story" textLight={textLight}>
                        Company
                    </NavbarLink>
                    <NavbarLink to="/pricing" textLight={textLight}>
                        Pricing
                    </NavbarLink>
                    <NavbarLink href="https://github.com/posthog/posthog" textLight={textLight}>
                        GitHub
                    </NavbarLink>
                </ul>

                <ul className="hidden lg:flex list-none flex justify-between items-center mb-0 text-2xs">
                    <PrimaryCta>
                        <span>Get Started</span>
                    </PrimaryCta>
                    <NavbarLink
                        href="https://app.posthog.com/login"
                        textLight={textLight}
                        className="font-nav opacity-80 hover:opacity-100 px-4 py-2 text-xs"
                    >
                        Login
                    </NavbarLink>
                </ul>

                <button className="text-white h-4 w-4 lg:hidden mt-1" onClick={() => expandMenu(!expanded)}>
                    <img src={hamburgerIcon} className="block" />
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
                        to="/blog"
                        textLight={textLight}
                        className="block my-2 py-2 border-b border-white border-opacity-10"
                    >
                        Blog
                    </NavbarLink>
                    <NavbarLink
                        href="https://github.com/posthog/posthog"
                        textLight={textLight}
                        className="block my-2 py-2 border-b border-white border-opacity-10"
                    >
                        GitHub
                    </NavbarLink>
                    <NavbarLink
                        href="https://app.posthog.com/login"
                        textLight={textLight}
                        className="block my-2 py-2 border-b border-white border-opacity-10"
                    >
                        Login
                    </NavbarLink>

                    <PrimaryCta className="my-2 ml-4 transition-none hover:transition-none">Get Started</PrimaryCta>
                </ul>
            ) : null}
        </div>
    )
}
