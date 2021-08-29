import React from 'react'
import { Link } from 'gatsby'
import { Header } from '../../Header/Header'
import { Footer } from '../../Footer/Footer'
import { PosthogAnnouncement } from '../../PosthogAnnouncement/PosthogAnnouncement'
import { GetStartedModal } from '../../GetStartedModal'
import { BlogFooter } from '../../BlogFooter'
import { BlogShareButtons } from '../BlogShareButtons'
import { Structure } from '../../Structure'
import { DarkModeToggle } from '../../DarkModeToggle'
import { AuthorsData } from 'types'
import { BlogIntro } from '../BlogIntro'

interface BlogPostLayoutProps {
    pageTitle: string
    children: React.ReactNode
    featuredImage?: string | null | undefined
    featuredImageType?: string
    blogArticleSlug: string
    blogDate?: string
    authorDetails?: AuthorsData
}

export function BlogPostLayout({
    pageTitle,
    children,
    featuredImage,
    featuredImageType,
    blogArticleSlug,
    blogDate,
    authorDetails,
}: BlogPostLayoutProps): JSX.Element {
    return (
        <div className="bg-offwhite-purple text-gray-900 bg-gradient-to-b dark:from-darkmode-purple dark:to-footer dark:text-white">
            <Header onPostPage blogArticleSlug={blogArticleSlug} />
            <div className="flex justify-between items-center w-full px-4 mb-4 mt-6 lg:mt-4">
                <div className="flex-grow">
                    <Link
                        to="/blog"
                        className="text-gray-900 hover:text-gray-900 dark:text-white dark:hover:text-white hover:underline"
                    >
                        &larr; Back to blog
                    </Link>
                </div>
                <DarkModeToggle />
            </div>

            <BlogIntro
                authorDetails={authorDetails}
                featuredImageType={featuredImageType}
                featuredImage={featuredImage}
                pageTitle={pageTitle}
                blogDate={blogDate}
            />

            <div className="max-w-xl mx-auto relative pt-12 blog-post-content">
                <BlogShareButtons />
                <Structure.Section>{children}</Structure.Section>
            </div>

            <PosthogAnnouncement />
            <GetStartedModal />
            <BlogFooter blogArticleSlug={blogArticleSlug} />
            <Footer onPostPage />
        </div>
    )
}
