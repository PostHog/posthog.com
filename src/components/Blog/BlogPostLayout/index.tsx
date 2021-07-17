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
import BlogAuthor from '../BlogAuthor'

interface BlogPostLayoutProps {
    pageTitle: string
    children: React.ReactNode
    featuredImage?: string | null | undefined
    blogArticleSlug: string
    blogDate?: string
    authorDetails?: AuthorsData
}

export function BlogPostLayout({
    pageTitle,
    children,
    featuredImage,
    blogArticleSlug,
    blogDate,
    authorDetails,
}: BlogPostLayoutProps): JSX.Element {
    return (
        <div className="bg-offwhite-purple text-gray-900 bg-gradient-to-b dark:from-darkmode-purple dark:to-footer dark:text-white">
            <Header onPostPage blogArticleSlug={blogArticleSlug} />
            <div className="flex justify-between items-center w-full px-4 mb-12 mt-6 lg:mt-4">
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

            {featuredImage && (
                <Structure.Section width="3xl -mt-6 md:-mt-2">
                    <img src={featuredImage} className="w-full shadow-lg" alt={pageTitle} />
                </Structure.Section>
            )}

            <Structure.Section width="xl" className="text-center leading-tight mb-6">
                <p className="mt-8 mb-2 opacity-50">{blogDate}</p>
                <Structure.SectionHeader titleTag="h1" title={pageTitle} titleClassName="text-center leading-tight" />
            </Structure.Section>

            {authorDetails?.handle && (
                <Structure.Section width="xl" className="mb-12">
                    <BlogAuthor authorDetails={authorDetails} />
                </Structure.Section>
            )}

            <div className="max-w-xl mx-auto relative">
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
