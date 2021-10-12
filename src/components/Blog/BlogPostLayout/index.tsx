import Breadcrumbs from 'components/Breadcrumbs'
import React from 'react'
import { AuthorsData } from 'types'
import { BlogFooter } from '../../BlogFooter'
import { GetStartedModal } from '../../GetStartedModal'
import { PosthogAnnouncement } from '../../PosthogAnnouncement/PosthogAnnouncement'
import { Structure } from '../../Structure'
import { BlogIntro } from '../BlogIntro'
import { BlogShareButtons } from '../BlogShareButtons'
import { Crumb } from '../../Breadcrumbs'

interface BlogPostLayoutProps {
    pageTitle: string
    children: React.ReactNode
    featuredImage?: string | null | undefined
    featuredImageType?: string
    blogArticleSlug: string
    blogDate?: string
    authorDetails?: AuthorsData
    categories: { title: string; url: string }[]
}

export function BlogPostLayout({
    pageTitle,
    children,
    featuredImage,
    featuredImageType,
    blogArticleSlug,
    blogDate,
    authorDetails,
    categories,
}: BlogPostLayoutProps): JSX.Element {
    return (
        <div className="text-primary dark:text-primary-dark">
            <div className="px-4 mt-4 mb-9">
                <Breadcrumbs className="overflow-auto sm:overflow-visible" darkModeToggle>
                    <Crumb title="Blog" url="/blog" />
                    <li>
                        <ul className="list-none p-0 m-0 flex ">
                            {categories.map((category, index) => {
                                const { title, url } = category
                                return (
                                    <Crumb
                                        key={index}
                                        title={title}
                                        url={url}
                                        className="whitespace-nowrap border-r-0 last:border-r flex dark:even:before:content-['\002C'] even:before:content-['\002C'] even:before:ml-[-10px] items-baseline"
                                    />
                                )
                            })}
                        </ul>
                    </li>
                    <Crumb className="whitespace-nowrap" title={pageTitle} truncate />
                </Breadcrumbs>
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
