import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { ResponsiveSidebar } from '../ResponsiveSidebar'
import { Container } from '../Container'
import ResponsiveAnchor from '../ResponsiveAnchor'
import ResponsiveTopBar from '../ResponsiveTopBar'
import { default as AntdLayout } from 'antd/lib/layout'
import { useValues } from 'kea'
import { layoutLogic } from '../../logic/layoutLogic'
import { DocsSearch } from '../DocsSearch'
import { DarkModeToggle } from '../../components/DarkModeToggle'
import { Spacer } from '../../components/Spacer'
import './Layout.scss'
import './DarkMode.scss'
import { PosthogAnnouncement } from '../PosthogAnnouncement/PosthogAnnouncement'
import { GetStartedModal } from '../../components/GetStartedModal'
import { BlogFooter } from '../../components/BlogFooter'

interface LayoutProps {
    pageTitle?: string
    onPostPage?: boolean
    isDocsPage?: boolean
    isHomePage?: boolean
    isBlogArticlePage?: boolean
    children?: any
    className?: string
    containerStyle?: Object
    menuActiveKey?: string
}

const Layout = ({
    onPostPage = false,
    pageTitle = '',
    isDocsPage = false,
    isHomePage = false,
    isBlogArticlePage = false,
    children,
    className = '',
    containerStyle = {},
    menuActiveKey = '',
}: LayoutProps) => {
    const { sidebarHide, anchorHide } = useValues(layoutLogic)

    return (
        <>
            <AntdLayout id="antd-main-layout-wrapper" hasSider>
                {onPostPage && !sidebarHide && !isBlogArticlePage && (
                    <AntdLayout.Sider
                        width="300"
                        className="sideBar display-desktop"
                        id="docs-sidebar"
                        style={{ background: '#f9f9f9' }}
                    >
                        <ResponsiveSidebar />
                    </AntdLayout.Sider>
                )}
                <AntdLayout id="ant-layout-content-wrapper" style={{ background: '#ffffff' }}>
                    <AntdLayout.Header
                        className={'menuHeader ' + (onPostPage && 'docsHeader ') + (isBlogArticlePage && 'blogHeader')}
                        id="menu-header"
                        style={{ background: '#ffffff' }}
                    >
                        <Header
                            onPostPage={onPostPage}
                            isBlogArticlePage={isBlogArticlePage}
                            isHomePage={isHomePage}
                            menuActiveKey={menuActiveKey ? menuActiveKey : isDocsPage ? 'docs' : ''}
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

                    {onPostPage &&
                        (!isBlogArticlePage ? (
                            <div className="post-page-sub-header">
                                <div className="post-page-sub-header-inner">
                                    <span style={{ paddingRight: isDocsPage ? 5 : 30 }}>
                                        <DarkModeToggle />
                                    </span>
                                    {isDocsPage && <DocsSearch />}
                                </div>
                            </div>
                        ) : (
                            <Spacer onlyDesktop={true} />
                        ))}

                    {/* content */}
                    <AntdLayout
                        className={
                            'layout ' +
                            (onPostPage ? 'docsPageLayout ' : 'notDocsLayout ') +
                            (isBlogArticlePage ? 'blogPageLayout ' : '') +
                            (isDocsPage && 'docs-only-layout')
                        }
                        id={onPostPage ? 'docs-content-wrapper' : ''}
                        style={{ backgroundColor: '#ffffff' }}
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
                            <AntdLayout.Sider
                                className="rightBar display-desktop"
                                id="right-navbar"
                                style={{ background: '#ffffff' }}
                            >
                                <ResponsiveAnchor />
                            </AntdLayout.Sider>
                        )}
                    </AntdLayout>
                </AntdLayout>
            </AntdLayout>
            <AntdLayout style={{ background: '#ffffff' }}>
                {isBlogArticlePage && <BlogFooter />}
                <Footer onPostPage={onPostPage} />
            </AntdLayout>
            <PosthogAnnouncement />
            <GetStartedModal />
        </>
    )
}

export default Layout
export { Layout }
