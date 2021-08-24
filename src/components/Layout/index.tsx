import React, { useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { ResponsiveSidebar } from '../ResponsiveSidebar'
import { Container } from '../Container'
import ResponsiveAnchor from '../ResponsiveAnchor'
import ResponsiveTopBar from '../ResponsiveTopBar'
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
    const { posthog } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window && posthog) {
            posthog.people.set({ preferred_theme: (window as any).__theme })
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
            <Header />
            <div>{children}</div>
            <Footer />
            <PosthogAnnouncement />
            <GetStartedModal />
        </>
    )
}

export default Layout
export { Layout }
