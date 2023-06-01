import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import { TableOfContents } from 'components/PostLayout/types'
import SEO from 'components/seo'
import React from 'react'
import Sidebar from './Sidebar'
import { useNav } from './useNav'

interface IProps {
    children: React.ReactNode
    title: string
    tableOfContents?: TableOfContents[]
}

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    return <h2 className="m-0 mb-6">{children}</h2>
}

const Community = ({ children, title, tableOfContents }: IProps) => {
    const nav = useNav()
    return (
        <PostLayout
            fullWidthContent
            hideWidthToggle
            hideSurvey
            menu={nav}
            sidebar={<Sidebar />}
            tableOfContents={tableOfContents}
            title={title}
            menuWidth={{ right: 320 }}
        >
            {children}
        </PostLayout>
    )
}

export default function CommunityLayout({ children, title, tableOfContents }: IProps) {
    return (
        <Layout>
            <SEO title={`${title} - PostHog`} />
            <Community title={title} tableOfContents={tableOfContents}>
                {children}
            </Community>
        </Layout>
    )
}
