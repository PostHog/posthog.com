import React from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import { useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'

interface HeaderProps {
    onPostPage: boolean
    isBlogArticlePage: boolean
    isHomePage: boolean
}

export const Header = ({ onPostPage, isBlogArticlePage, isHomePage }: HeaderProps) => {
    const { sidebarHide } = useValues(layoutLogic)

    return (
        <div className={'menuHeaderWrapper ' + (!isBlogArticlePage && !sidebarHide && onPostPage && 'noLogo ')}>
            <Link id="logo" to="/" className={onPostPage && !isBlogArticlePage ? 'display-mobile ' : ''}>
                <img alt="logo" id="logo-image-header" src={isHomePage || isBlogArticlePage ? whiteLogo : logo} />
            </Link>
            <Menu isBlogArticlePage={isBlogArticlePage} isHomePage={isHomePage} />
        </div>
    )
}

