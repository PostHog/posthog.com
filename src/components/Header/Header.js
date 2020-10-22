import React from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import { useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'

function Header({ onPostPage, screenIsSmall, isBlogPage, isHomePage, isBlogArticlePage, isDocsPage, isHandbookPage }) {
    const { sidebarHide } = useValues(layoutLogic)

    return (
        <div
            className={'menuHeaderWrapper ' + (!isBlogPage && !sidebarHide && !screenIsSmall && onPostPage && 'noLogo')}
        >
            {/* Desktop Docs pages = (onPostPage && !screenIsSmall)
        They already have a logo on the sidebar - skip adding the logo to navbar */}
            {!(onPostPage && !screenIsSmall && (isDocsPage || isHandbookPage)) && (
                <Link id="logo" to="/">
                    <img alt="logo" id="logo-image-header" src={isHomePage || isBlogArticlePage ? whiteLogo : logo} />
                </Link>
            )}
            <Menu
                isBlogPage={isBlogPage}
                screenIsSmall={screenIsSmall}
                isHomePage={isHomePage}
                isPostPage={onPostPage}
            />
        </div>
    )
}

export default Header
