import React, { useState } from 'react'
import { useValues } from 'kea'
import { Link } from 'gatsby'
import { layoutLogic } from '../../logic/layoutLogic'
import hamburgerIcon from '../../images/icons/hamburger.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import darkLogo from '../../images/posthog-logo-150x29.svg'
import './style.scss'
import { mergeClassList } from 'lib/utils'

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
    const classList = `button-primary ${className} border-none px-4 py-2 ml-2 lg:ml-4 mt-4 lg:mt-0 transition-none hover:transition-none text-xs rounded-sm`

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

export interface HeaderProps {
    onPostPage: boolean
    onHomePage?: boolean
    onBlogPage?: boolean
    transparentBackground?: boolean
    blogArticleSlug?: string
    logoOnly?: boolean
    className?: string
}

export const Header = ({
    onPostPage,
    onHomePage = false,
    transparentBackground = false,
    onBlogPage = false,
    blogArticleSlug,
    logoOnly = false,
    className,
}: HeaderProps): JSX.Element => {
    const [expanded, expandMenu] = useState(false)
    const { websiteTheme } = useValues(layoutLogic)

    const logo = onPostPage && websiteTheme === 'light' && !blogArticleSlug ? darkLogo : whiteLogo
    const textLight =
        !onPostPage ||
        (onPostPage && websiteTheme === 'dark') ||
        transparentBackground ||
        onHomePage ||
        onBlogPage ||
        !!blogArticleSlug
    const layoutWidth = onPostPage ? 'w-full px-4' : 'w-11/12 mx-auto'
    const justify = logoOnly ? 'justify-center' : 'justify-between'

    return (
        <div
            className={`header-wrapper primary-navbar py-6 relative z-20 ${
                transparentBackground ? 'transparent-background' : ''
            } ${blogArticleSlug ? 'blog-article-header' : ''}`}
        >
            <header
                className={mergeClassList(
                    layoutWidth,
                    justify,
                    className,
                    logoOnly && 'opacity-50',
                    'flex',
                    'items-center'
                )}
            >
                <div className="flex-1">
                    <Link id="logo" to="/" className="block">
                        <img alt="logo" src={logo} />
                    </Link>
                </div>
                {!logoOnly && (
                    <>
                        <nav>
                            <ul className="hidden lg:flex list-none justify-between items-center mb-0 font-nav p-0">
                                <NavbarLink to="/product" textLight={textLight}>
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
                        </nav>
                        <ul className="hidden lg:flex list-none justify-end items-center mb-0 text-xs p-0 flex-1">
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
                    </>
                )}
            </header>

            {expanded ? (
                <ul className="w-11/12 mx-auto mt-8 block lg:hidden list-none p-0">
                    <NavbarLink
                        to="/product"
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

                    <PrimaryCta className="mt-4">Get Started</PrimaryCta>
                </ul>
            ) : null}
        </div>
    )
}
