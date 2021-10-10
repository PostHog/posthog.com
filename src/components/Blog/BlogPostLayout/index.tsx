import Breadcrumbs from 'components/Breadcrumbs'
import React from 'react'
import { AuthorsData } from 'types'
import { BlogFooter } from '../../BlogFooter'
import { CrumbProps } from '../../Breadcrumbs'
import { GetStartedModal } from '../../GetStartedModal'
import { PosthogAnnouncement } from '../../PosthogAnnouncement/PosthogAnnouncement'
import { Structure } from '../../Structure'
import { BlogIntro } from '../BlogIntro'
import { BlogShareButtons } from '../BlogShareButtons'

interface BlogPostLayoutProps {
    pageTitle: string
    children: React.ReactNode
    featuredImage?: string | null | undefined
    featuredImageType?: string
    blogArticleSlug: string
    blogDate?: string
    authorDetails?: AuthorsData
    category: CrumbProps
}

export function BlogPostLayout({
    pageTitle,
    children,
    featuredImage,
    featuredImageType,
    blogArticleSlug,
    blogDate,
    authorDetails,
    category,
}: BlogPostLayoutProps): JSX.Element {
    const crumbs = [
        { title: 'Blog', url: '/blog' },
        ...(category ? [{ ...category, truncate: true }] : []),
        { title: pageTitle, truncate: true },
    ]
    return (
        <div className="text-primary dark:text-primary-dark">
            <div className="px-4 mt-4 mb-9">
                <Breadcrumbs crumbs={crumbs} darkModeToggle />
            </div>
            <BlogIntro
                authorDetails={authorDetails}
                featuredImageType={featuredImageType}
                featuredImage={featuredImage}
                pageTitle={pageTitle}
                blogDate={blogDate}
            />
            <div className="max-w-xl mx-auto relative pt-12 article-content blog-content">
                <BlogShareButtons />
                <Structure.Section>{children}</Structure.Section>
            </div>
            <PosthogAnnouncement />
            <GetStartedModal />
            <BlogFooter blogArticleSlug={blogArticleSlug} />
        </div>
    )
}
