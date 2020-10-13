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

    /*if (isDocsPage && window) {
            docsearch({
                apiKey: '45e80dec3e5b55c400663a5cba911c4c',
                indexName: 'posthog',
                inputSelector: '#doc-search',
            })
        }*/

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

/* 
    componentDidMount() {
        if ({ isDocsPage }) {
            docsearch({
                apiKey: '45e80dec3e5b55c400663a5cba911c4c',
                indexName: 'posthog',
                inputSelector: '#doc-search',
            })
<script src="https://cdn.jsdelivr.net/npm/docsearch.js@{{docSearchJSVersion}}/dist/cdn/docsearch.min.js"></script>
<script>
  docsearch({
    // Your apiKey and indexName will be given to you once
    // we create your config
    apiKey: '<API_KEY>',
    indexName: '<INDEX_NAME>',
    //appId: '<APP_ID>', // Should be only included if you are running DocSearch on your own.
    // Replace inputSelector with a CSS selector
    // matching your search input
    inputSelector: '<YOUR_CSS_SELECTOR>',
    // Set debug to true to inspect the dropdown
    debug: false,
  });
</script>
        }
    }
*/

export default Header
