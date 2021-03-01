import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
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
import './SkeletonLoading.css'
import './DarkMode.scss'
import { PosthogAnnouncement } from '../PosthogAnnouncement/PosthogAnnouncement'
import { GetStartedModal } from '../../components/GetStartedModal'
import { BlogFooter } from '../../components/BlogFooter'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

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
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window && posthog) {
            posthog.people.set({ preferred_theme: (window as any).__theme })
        }

        const skeletonLoaded = document.getElementsByClassName('skeleton-loading')

        for (var i = 0; i < skeletonLoaded.length; i++) {
            let el = skeletonLoaded[i]

            el.classList.remove('skeleton-loading--250')
            el.classList.remove('skeleton-loading--500')
            el.classList.remove('skeleton-loading--750')
            el.classList.remove('skeleton-loading--1000')
        }
    }, [])

    return (
        <>
            <Header
                onPostPage={onPostPage}
                isBlogArticlePage={isBlogArticlePage}
                isHomePage={isHomePage}
                isDocsPage={isDocsPage}
                menuActiveKey={menuActiveKey ? menuActiveKey : isDocsPage ? 'docs' : ''}
            />
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
                                className={className + ' max-w-none container'}
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
                <Footer isDocsPage={isDocsPage} onPostPage={onPostPage} />
            </AntdLayout>
            <PosthogAnnouncement />
            <GetStartedModal />
        </>
    )
}

export default Layout
export { Layout }
