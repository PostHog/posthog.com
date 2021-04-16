import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Header } from '../../Header/Header'
import { Footer } from '../../Footer/Footer'
import { PosthogAnnouncement } from '../../PosthogAnnouncement/PosthogAnnouncement'
import { GetStartedModal } from '../../GetStartedModal'
import { BlogFooter } from '../../BlogFooter'
import { Structure } from '../../Structure'
import { DarkModeToggle } from '../../DarkModeToggle'

import twitterIcon from '../../../images/icons/twitter.svg'
import linkedInIcon from '../../../images/icons/linkedin.svg'

interface BlogPostLayoutProps {
    pageTitle: string
    children: any
    featuredImage?: string | null | undefined
}

export const BlogPostLayout = ({ pageTitle, children, featuredImage }: BlogPostLayoutProps) => {
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        if (window?.location?.href) {
            setCurrentUrl(window.location.href)
        }
    }, [])

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
            <Structure.Section width="xl" className="text-center">
                <Structure.SectionHeader titleTag="h1" title={pageTitle} titleClassName="text-center" />
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={linkedInIcon} alt="share on LinkedIn" className="inline-block" />
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                    target="_blank"
                    className="ml-4"
                    rel="noreferrer"
                >
                    <img src={twitterIcon} alt="share on Twitter" className="inline-block" />
                </a>
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
