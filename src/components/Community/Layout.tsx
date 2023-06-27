import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import { TableOfContents } from 'components/PostLayout/types'
import SEO from 'components/seo'
import React from 'react'
import Sidebar from './Sidebar'
import { useNav } from './useNav'
import { communityMenu } from '../../navs'

interface IProps {
    children: React.ReactNode
    title: string
    tableOfContents?: TableOfContents[]
}

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    return <h2 className="m-0 mb-6">{children}</h2>
}

const Community = ({ children, title, tableOfContents }: IProps) => {
    return (
        <PostLayout
            fullWidthContent
            hideWidthToggle
            hideSurvey
            sidebar={<Sidebar />}
            tableOfContents={tableOfContents}
            title={title}
            menuWidth={{ right: 320 }}
        >
            {children}
        </PostLayout>
    )
}

export default function CommunityLayout({ children, title, tableOfContents, parent, activeInternalMenu }: IProps) {
    return (
        <Layout parent={parent || communityMenu} activeInternalMenu={activeInternalMenu || communityMenu.children[1]}>
            <SEO title={`${title} - PostHog`} />
            <Community title={title} tableOfContents={tableOfContents}>
                {children}
            </Community>
        </Layout>
    )
}
