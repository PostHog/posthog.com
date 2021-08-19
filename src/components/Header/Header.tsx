import React, { useState } from 'react'
import { useValues } from 'kea'
import { Link } from 'gatsby'
import { layoutLogic } from '../../logic/layoutLogic'
import hamburgerIcon from '../../images/icons/hamburger.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import darkLogo from '../../images/posthog-logo-150x29.svg'
import './style.scss'
import { mergeClassList } from 'lib/utils'
import MainNav from '../MainNav'
import Sprites from './Sprites'

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
                    window.location.pathname = '/sign-up'
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
    const layoutWidth = onPostPage ? 'w-full' : 'w-11/12 mx-auto'
    const justify = logoOnly ? 'justify-center' : 'justify-between'

    return (
        <div
            style={{ zIndex: 1002 }}
            className={`px-4 header-wrapper primary-navbar py-6 relative z-50 ${
                transparentBackground ? 'transparent-background' : ''
            } ${blogArticleSlug ? 'blog-article-header' : ''}`}
        >
            <Sprites />
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
                <div className="lg:flex-1">
                    <Link id="logo" to="/" className="block">
                        <img alt="logo" src={logo} />
                    </Link>
                </div>
                {!logoOnly && (
                    <>
                        <nav>
                            <MainNav expanded={expanded} />
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

                        <button className="text-white lg:hidden" onClick={() => expandMenu(!expanded)}>
                            <div className="w-5 h-5 flex items-center">
                                <span
                                    className={`absolute block h-0.5 w-5 bg-white transform transition duration-150 ease-in-out ${
                                        expanded ? ' rotate-45' : '-translate-y-1.5'
                                    }`}
                                />
                                <span
                                    className={`absolute block h-0.5 w-5 bg-white transform transition duration-150 ease-in-out ${
                                        expanded ? 'opacity-0' : ''
                                    }`}
                                />
                                <span
                                    className={`absolute block h-0.5 w-5 bg-white transform  transition duration-150 ease-in-out  ${
                                        expanded ? ' -rotate-45' : 'translate-y-1.5'
                                    }`}
                                />
                            </div>
                        </button>
                    </>
                )}
            </header>
        </div>
    )
}
