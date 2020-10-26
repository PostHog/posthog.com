import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Header } from '../Header'
import Footer from '../Footer/Footer'
import './Layout.scss'
import ResponsiveSidebar from '../ResponsiveSidebar'
import Container from '../Container'
import ResponsiveAnchor from '../ResponsiveAnchor'
import ResponsiveTopBar from '../ResponsiveTopBar'
import { default as AntdLayout } from 'antd/lib/layout'
import NewsletterForm from '../NewsletterForm'
import { useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import { DocsSearch } from '../DocsSearch'

function Layout({
    onPostPage,
    pageTitle,
    isDocsPage,
    isHomePage,
    isBlogArticlePage,
    isHandbookPage,
    children,
    className,
    containerStyle = {},
}) {
    const { sidebarHide, anchorHide } = useValues(layoutLogic)

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
                    <>
                        <AntdLayout theme="light">
                            {onPostPage && !sidebarHide && !isBlogArticlePage && (
                                <AntdLayout.Sider width="300" theme="light" className="sideBar display-desktop">
                                    <ResponsiveSidebar />
                                </AntdLayout.Sider>
                            )}

                            <AntdLayout theme="light">
                                <AntdLayout.Header
                                    className={
                                        'menuHeader ' +
                                        (onPostPage && 'docsHeader ') +
                                        (isBlogArticlePage && 'blogHeader')
                                    }
                                    theme="light"
                                >
                                    <Header
                                        siteTitle={data.site.siteMetadata.title}
                                        onPostPage={onPostPage}
                                        isHomePage={isHomePage}
                                        isDocsPage={isDocsPage}
                                        isBlogArticlePage={isBlogArticlePage}
                                        isHandbookPage={isHandbookPage}
                                        theme="light"
                                    />
                                    {onPostPage && !isBlogArticlePage && (!anchorHide || !sidebarHide) && (
                                        <span className="display-mobile">
                                            <ResponsiveTopBar />
                                        </span>
                                    )}
                                    {isBlogArticlePage && (
                                        <div className="blogHeaderTitle display-desktop">
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
                                        (isBlogArticlePage ? 'blogPageLayout ' : '') +
                                        (isDocsPage && 'docs-only-layout')
                                    }
                                    theme="light"
                                >
                                    <AntdLayout.Content>
                                        {isBlogArticlePage && (
                                            <div className="display-mobile">
                                                <h1>{pageTitle}</h1>
                                                <br />
                                            </div>
                                        )}
                                        <Container
                                            onPostPage={onPostPage}
                                            className={className + ' container'}
                                            containerStyle={containerStyle}
                                        >
                                            {children}
                                        </Container>
                                    </AntdLayout.Content>

                                    {/* Sidebar right */}
                                    {onPostPage && !anchorHide && (
                                        <AntdLayout.Sider theme="light" className="rightBar display-desktop">
                                            <ResponsiveAnchor />
                                        </AntdLayout.Sider>
                                    )}
                                </AntdLayout>
                            </AntdLayout>
                        </AntdLayout>
                        <AntdLayout>
                            {isBlogArticlePage && <NewsletterForm />}
                            <Footer />
                        </AntdLayout>
                    </>
                )
            }}
        />
    )
}

export default Layout
