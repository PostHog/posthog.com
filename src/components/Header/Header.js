import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Menu from '../Menu'
import logo from '../../images/posthog-logo-150x29.svg'
import whiteLogo from '../../images/posthog-logo-white.svg'
import { useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
/*import docsearch from 'docsearch.js'*/
import 'docsearch.js/dist/cdn/docsearch.min.css/'

function Header({ onPostPage, screenIsSmall, isBlogPage, isHomePage, isBlogArticlePage, isDocsPage, isHandbookPage }) {
    const { sidebarHide } = useValues(layoutLogic)

    useEffect(() => {
        if (window && isDocsPage) {
            import('docsearch.js').then(({ default: docsearch }) => {
                docsearch({
                    apiKey: '45e80dec3e5b55c400663a5cba911c4c',
                    indexName: 'posthog',
                    inputSelector: '#doc-search',
                })
            })
        }
    })

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
            <div className="docSearchWrapper">
                <input id="doc-search" placeholder="Search..."></input>
            </div>
            <Menu isBlogPage={isBlogPage} screenIsSmall={screenIsSmall} isHomePage={isHomePage} />
        </div>
    )
}

export default Header
