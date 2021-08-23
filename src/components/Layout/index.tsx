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
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { BlogPostLayout } from '../Blog/BlogPostLayout'
import { AuthorsData } from 'types'

interface LayoutProps {
    pageTitle?: string
    onPostPage?: boolean
    isDocsPage?: boolean
    isHomePage?: boolean
    blogArticleSlug?: string
    children?: React.ReactNode
    className?: string
    containerStyle?: Record<string, any>
    menuActiveKey?: string
    featuredImage?: string | null
    featuredImageType?: string
    headerBackgroundTransparent?: boolean
    onBlogPage?: boolean
    blogDate?: string
    authorDetails?: AuthorsData
}

const BlogHeaderContent = ({ title }: { title: string }): JSX.Element => (
    <>
        <h1 className="text-gray-900 center">{title}</h1>
        <p className="text-gray-900 text-base center w-5/6">
            PostHog is an open source product analytics platform designed to help you understand customers, quantify
            value, and ship new features faster.
        </p>
    </>
)

const Layout = ({
    onPostPage = false,
    pageTitle = '',
    isDocsPage = false,
    blogArticleSlug,
    children,
    className = '',
    containerStyle = {},
    featuredImage = '',
    featuredImageType = '',
    headerBackgroundTransparent = false,
    onBlogPage = false,
    blogDate = '',
    authorDetails,
}: LayoutProps): JSX.Element => {
    const { sidebarHide, anchorHide } = useValues(layoutLogic)
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window && posthog) {
            posthog.people.set({ preferred_theme: (window as any).__theme })
        }

        const skeletonLoaded = document.getElementsByClassName('skeleton-loading')

        for (let i = 0; i < skeletonLoaded.length; i++) {
            const el = skeletonLoaded[i]

            el.classList.remove('skeleton-loading--250')
            el.classList.remove('skeleton-loading--500')
            el.classList.remove('skeleton-loading--750')
            el.classList.remove('skeleton-loading--1000')
        }
    }, [])

    return blogArticleSlug ? (
        <BlogPostLayout
            blogDate={blogDate}
            pageTitle={pageTitle}
            featuredImage={featuredImage}
            featuredImageType={featuredImageType}
            blogArticleSlug={blogArticleSlug}
            authorDetails={authorDetails}
        >
            {children}
        </BlogPostLayout>
    ) : (
        <>
            <Header
                onPostPage={onPostPage}
                transparentBackground={headerBackgroundTransparent}
                onBlogPage={!!blogArticleSlug || onBlogPage}
            />
            <AntdLayout id="antd-main-layout-wrapper" hasSider>
                {onPostPage && !sidebarHide && !blogArticleSlug && (
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
                    {onPostPage && !blogArticleSlug && (!anchorHide || !sidebarHide) && (
                        <span className="display-mobile">
                            <ResponsiveTopBar />
                        </span>
                    )}
                    {blogArticleSlug && (
                        <>
                            <div className="blogHeaderTitle display-desktop">
                                <BlogHeaderContent title={pageTitle} />
                            </div>
                        </>
                    )}

                    {onPostPage &&
                        (!blogArticleSlug ? (
                            <div className="post-page-sub-header">
                                <div className="post-page-sub-header-inner">
                                    <span style={{ paddingRight: isDocsPage ? 5 : 30 }}>
                                        <DarkModeToggle />
                                    </span>
                                    {isDocsPage && <DocsSearch />}
                                </div>
                            </div>
                        ) : (
                            <Spacer onlyDesktop={true} height={5} />
                        ))}

                    {/* content */}
                    <AntdLayout
                        className={
                            'layout ' +
                            (onPostPage ? 'docsPageLayout ' : 'notDocsLayout ') +
                            (blogArticleSlug ? 'blogPageLayout ' : '') +
                            (isDocsPage && 'docs-only-layout')
                        }
                        id={onPostPage ? 'docs-content-wrapper' : ''}
                        style={{ backgroundColor: '#ffffff' }}
                    >
                        <AntdLayout.Content>
                            {blogArticleSlug && (
                                <div className="display-mobile">
                                    <BlogHeaderContent title={pageTitle} />
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
            <AntdLayout>
                <Footer />
            </AntdLayout>
            <PosthogAnnouncement />
            <GetStartedModal />
        </>
    )
}

export default Layout
export { Layout }
