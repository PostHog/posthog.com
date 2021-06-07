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
    children: any
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
            <div className="flex justify-between items-center w-full px-4 mb-12">
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
                    <img src={featuredImage} className="w-full rounded-lg shadow-lg" alt={pageTitle} />
                </Structure.Section>
            )}

            <Structure.Section width="xl" className="text-center leading-tight mb-6">
                <Structure.SectionHeader
                    titleTag="h1"
                    title={pageTitle}
                    titleClassName="text-center leading-tight"
                    leadText={blogDate}
                />
                <BlogShareButtons />
            </Structure.Section>

            {authorDetails?.handle && (
                <Structure.Section width="xl">
                    <BlogAuthor authorDetails={authorDetails} />
                </Structure.Section>
            )}

            <Structure.Section width="xl">{children}</Structure.Section>

            <PosthogAnnouncement />
            <GetStartedModal />
            <BlogFooter blogArticleSlug={blogArticleSlug} />
            <Footer onPostPage />
        </div>
    )
}
