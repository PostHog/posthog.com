import React, { useState } from 'react'
import { useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import whiteLogo from '../../images/posthog-logo-white.svg'
import darkLogo from '../../images/posthog-logo-150x29.svg'
import './style.scss'
import { mergeClassList } from 'lib/utils'
import MainNav from '../MainNav'
import Sprites from './Sprites'
import Link from '../Link'
import AnimatedBurger from '../AnimatedBurger'

const PrimaryCta = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    const classList = `button-primary ${className} border-none px-4 py-2 ml-2 lg:ml-4 mt-4 lg:mt-0 transition-none hover:transition-none text-xs rounded-sm`

    return (
        <button
            onClick={() => {
                window.location.pathname = '/sign-up'
            }}
            className={classList}
        >
            {children}
        </button>
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
    transparentBackground = false,
    onBlogPage = false,
    blogArticleSlug,
    logoOnly = false,
    className,
}: HeaderProps): JSX.Element => {
    const [expanded, expandMenu] = useState(false)
    const { websiteTheme } = useValues(layoutLogic)

    const logo = (onPostPage || onBlogPage) && websiteTheme === 'light' ? darkLogo : whiteLogo
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
                        <MainNav expanded={expanded} />
                        <ul className="hidden lg:flex list-none justify-end items-center mb-0 text-xs p-0 flex-1">
                            <li className="leading-none">
                                <PrimaryCta>
                                    <span>Get Started</span>
                                </PrimaryCta>
                            </li>
                            <li className="leading-none">
                                <Link
                                    to="https://app.posthog.com/login"
                                    className="font-nav opacity-80 hover:opacity-100 px-4 py-2 text-xs dark:text-white dark:hover:text-white text-almost-black hover:text-almost-black"
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                        <AnimatedBurger className="lg:hidden" onClick={() => expandMenu(!expanded)} active={expanded} />
                    </>
                )}
            </header>
        </div>
    )
}
