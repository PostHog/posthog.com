import React from 'react'
import { AuthorsData } from 'types'
import { BlogFooter } from '../../BlogFooter'
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
    blogUpdatedDate?: string
    authorDetails?: AuthorsData
    tags: { title: string; url: string }[]
}

export function BlogPostLayout({
    pageTitle,
    children,
    featuredImage,
    featuredImageType,
    blogArticleSlug,
    blogDate,
    blogUpdatedDate,
    authorDetails,
    tags,
}: BlogPostLayoutProps): JSX.Element {
    return (
        <div className="text-primary dark:text-primary-dark">
            <div className="px-4 mt-4 mb-9"></div>
            <BlogIntro
                authorDetails={authorDetails}
                featuredImageType={featuredImageType}
                featuredImage={featuredImage}
                pageTitle={pageTitle}
                blogDate={blogDate}
                blogUpdatedDate={blogUpdatedDate}
            />
            <div className="max-w-xl mx-auto relative pt-12 article-content blog-content">
                <BlogShareButtons />
                <Structure.Section>{children}</Structure.Section>
            </div>
            <BlogFooter blogArticleSlug={blogArticleSlug} />
        </div>
    )
}
