import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import { TableOfContents } from 'components/PostLayout/types'
import SEO from 'components/seo'
import React from 'react'
import Sidebar from './Sidebar'
import { communityMenu } from '../../navs'

interface IProps {
    children: React.ReactNode
    title: string
    tableOfContents?: TableOfContents[]
}

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    return <h2 className="m-0 mb-6">{children}</h2>
}

const Community = ({ children, title, tableOfContents, menu, contentWidth }: IProps) => {
    return (
        <PostLayout
            hideWidthToggle
            hideSurvey
            sidebar={<Sidebar />}
            tableOfContents={tableOfContents}
            title={title}
            menuWidth={{ right: 320 }}
            menu={menu}
            contentWidth={contentWidth}
        >
            {children}
        </PostLayout>
    )
}

export default function CommunityLayout({
    children,
    title,
    tableOfContents,
    parent,
    activeInternalMenu,
    menu,
    contentWidth,
}: IProps) {
    return (
        <Layout parent={parent || communityMenu} activeInternalMenu={activeInternalMenu || communityMenu.children[1]}>
            <SEO title={`${title} - PostHog`} />
            <Community menu={menu} title={title} tableOfContents={tableOfContents} contentWidth={contentWidth}>
                {children}
            </Community>
        </Layout>
    )
}
