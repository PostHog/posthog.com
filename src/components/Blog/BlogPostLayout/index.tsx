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

            {featuredImage && (
                <div className="w-full h-full relative flex items-center justify-center blog-image">
                    <figure
                        className="bg-no-repeat"
                        style={{
                            backgroundImage: 'url(' + featuredImage + ')',
                        }}
                    ></figure>

                    <div className="absolute top-0 w-full left-0 bottom-0 leading-tight z-10 flex justify-center items-center flex-col ">
                        <time className="opacity-50 w-full max-w-xl mb-2">{blogDate}</time>
                        <Structure.SectionHeader
                            titleTag="h1"
                            title={pageTitle}
                            titleClassName="font-sans normal-case leading-tight w-full max-w-xl my-0"
                        />

                        {authorDetails?.handle && (
                            <div className="w-full max-w-xl mt-6">
                                <BlogAuthor authorDetails={authorDetails} />
                            </div>
                        )}
                    </div>
                </div>
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
