import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.scss'
import { ResponsiveSidebar } from '../ResponsiveSidebar'
import Container from '../Container'
import ResponsiveAnchor from '../ResponsiveAnchor'
import ResponsiveTopBar from '../ResponsiveTopBar'
import MediaQuery from 'react-responsive'
import { default as AntdLayout } from 'antd/lib/layout'
import NewsletterForm from '../NewsletterForm'
import { useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import { DocsSearch } from '../DocsSearch'

function Layout({
    onPostPage,
    isBlogPage,
    pageTitle,
    isDocsPage,
    isHomePage,
    isBlogArticlePage,
    isHandbookPage,
    children,
    className,
    isFeaturesPage,
    containerStyle = {},
}) {
    const { sidebarHide, anchorHide } = useValues(layoutLogic)

    const links = [
        {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/docsearch.js@{{docSearchJSVersion}}/dist/cdn/docsearch.min.css',
        },
    ]

    return (
        <StaticQuery
            query={graphql`
                query SiteTitleQuery {
                    site {
                        siteMetadata {
                            title
                        }
                    }
                }
            `}
            render={(data) => {
                return (
                    <MediaQuery maxWidth={1076}>
                        {(screenIsSmall) => (
                            <>
                                <Helmet
                                    title={data.site.siteMetadata.title}
                                    meta={[
                                        { name: 'description', content: 'Sample' },
                                        { name: 'keywords', content: 'sample, something' },
                                    ]}
                                    links={links}
                                >
                                    <html lang="en" />
                                </Helmet>
                                <AntdLayout id="antd-main-layout-wrapper" data-theme="test">
                                    {!screenIsSmall && onPostPage && !sidebarHide && !isBlogPage && (
                                        <AntdLayout.Sider
                                            width="300"
                                            className="sideBar"
                                            id="docs-sidebar"
                                            style={{ background: '#f9f9f9' }}
                                        >
                                            <ResponsiveSidebar />
                                        </AntdLayout.Sider>
                                    )}
                                    <AntdLayout id="ant-layout-content-wrapper" style={{ background: '#ffffff' }}>
                                        <AntdLayout.Header
                                            className={
                                                'menuHeader ' +
                                                (onPostPage && 'docsHeader ') +
                                                (isBlogPage && 'blogHeader')
                                            }
                                            id="menu-header"
                                            style={{ background: '#ffffff' }}
                                        >
                                            <Header
                                                siteTitle={data.site.siteMetadata.title}
                                                onPostPage={onPostPage}
                                                screenIsSmall={screenIsSmall}
                                                isBlogPage={isBlogPage}
                                                isHomePage={isHomePage}
                                                isDocsPage={isDocsPage}
                                                isBlogArticlePage={isBlogArticlePage}
                                                isHandbookPage={isHandbookPage}
                                            />
                                            {screenIsSmall &&
                                                onPostPage &&
                                                !isBlogPage &&
                                                (!anchorHide || !sidebarHide) && <ResponsiveTopBar />}
                                            {isBlogPage && !screenIsSmall && (
                                                <div className="blogHeaderTitle">
                                                    <h1>{pageTitle}</h1>
                                                </div>
                                            )}
                                        </AntdLayout.Header>

                                        {isDocsPage && <DocsSearch />}

                                        {/* content */}
                                        <AntdLayout
                                            className={
                                                'layout ' +
                                                (onPostPage ? 'docsPageLayout ' : 'notDocsLayout ') +
                                                (isBlogPage ? 'blogPageLayout ' : '') +
                                                (isFeaturesPage ? 'featuresPageLayout ' : '') +
                                                (isDocsPage && 'docs-only-layout')
                                            }
                                            id={onPostPage ? 'docs-content-wrapper' : ''}
                                            style={{ backgroundColor: '#ffffff' }}
                                        >
                                            <AntdLayout.Content>
                                                {isBlogPage && screenIsSmall && (
                                                    <div>
                                                        <h1>{pageTitle}</h1>
                                                        <br />
                                                    </div>
                                                )}
                                                <Container
                                                    sidebarDocked={!screenIsSmall}
                                                    onPostPage={onPostPage}
                                                    className={className + ' container'}
                                                    containerStyle={containerStyle}
                                                >
                                                    {children}
                                                </Container>
                                            </AntdLayout.Content>

                                            {/* Sidebar right */}
                                            {onPostPage && !anchorHide && !screenIsSmall && (
                                                <AntdLayout.Sider
                                                    className="rightBar"
                                                    id="right-navbar"
                                                    style={{ background: '#ffffff' }}
                                                >
                                                    <ResponsiveAnchor />
                                                </AntdLayout.Sider>
                                            )}
                                        </AntdLayout>
                                    </AntdLayout>
                                </AntdLayout>
                                <AntdLayout>
                                    {isBlogPage && <NewsletterForm />}
                                    <Footer />
                                </AntdLayout>
                            </>
                        )}
                    </MediaQuery>
                )
            }}
        />
    )
}

export default Layout
