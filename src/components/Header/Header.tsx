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

const PrimaryCta = ({ children, className = '' }: { children: any; className?: string }) => {
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

    return (
        <>
            <Sprites />
            <header className="relative z-50 p-5">
                <MainNav expanded={expanded} />
                <AnimatedBurger className="lg:hidden" onClick={() => expandMenu(!expanded)} active={expanded} />
            </header>
        </>
    )
}
