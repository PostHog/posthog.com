import React from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import { useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'

function Header({ onPostPage, isBlogPage, isHomePage, isBlogArticlePage }) {
    const { sidebarHide } = useValues(layoutLogic)

    return (
        <div className={'menuHeaderWrapper ' + (!isBlogPage && !sidebarHide && onPostPage && 'noLogo ')}>
            <Link id="logo" to="/" className={onPostPage ? 'display-mobile ' : ''}>
                <img alt="logo" id="logo-image-header" src={isHomePage || isBlogArticlePage ? whiteLogo : logo} />
            </Link>
            <Menu isBlogPage={isBlogPage} isHomePage={isHomePage} />
        </div>
    )
}

export default Header
