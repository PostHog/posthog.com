import React from 'react'
import { Link } from 'gatsby'
import { Header } from '../../Header/Header'
import { Footer } from '../../Footer/Footer'
import { PosthogAnnouncement } from '../../PosthogAnnouncement/PosthogAnnouncement'
import { GetStartedModal } from '../../GetStartedModal'
import { BlogFooter } from '../../BlogFooter'
import { Structure } from '../../Structure'
import { DarkModeToggle } from '../../DarkModeToggle'

interface BlogPostLayoutProps {
    pageTitle: string
    children: any
    featuredImage?: string | null | undefined
}

export const BlogPostLayout = ({ pageTitle, children, featuredImage }: BlogPostLayoutProps) => {
    return (
        <div className="bg-offwhite-purple text-gray-900 dark:bg-darkmode-purple dark:text-white">
            <Header onPostPage={true} transparentBackground={true} />
            <div className="flex justify-between items-center w-full px-4 mb-12">
                <div className="flex-grow">
                    <Link
                        to="/blog"
                        className="text-gray-900 hover:text-gray-900 dark:text-white dark:hover:text-white hover:underline"
                    >
                        Back to blog
                    </Link>
                </div>
                <DarkModeToggle />
            </div>
            <Structure.Section width="xl">
                <Structure.SectionHeader titleTag="h1" title={pageTitle} titleClassName="text-center" />
                <p className="text-center">Share buttons</p>
            </Structure.Section>

            {featuredImage && (
                <Structure.Section width="3xl">
                    <img src={featuredImage} className="w-full rounded-lg shadow-lg" alt={pageTitle} />
                </Structure.Section>
            )}

            <Structure.Section width="xl">{children}</Structure.Section>

            <PosthogAnnouncement />
            <GetStartedModal />
            <BlogFooter />
            <Footer onPostPage={true} />
        </div>
    )
}
