import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import React from 'react'
import Sidebar from './Sidebar'
import { useNav } from './useNav'

interface IProps {
    children: React.ReactNode
    title: string
}

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    return <h2 className="m-0 mb-6">{children}</h2>
}

const Community = ({ children, title }: IProps) => {
    const { user } = useUser()
    const nav = useNav(user)

    return (
        <PostLayout
            fullWidthContent
            hideWidthToggle
            hideSurvey
            menu={nav}
            sidebar={<Sidebar />}
            title={title}
            menuWidth={{ right: 320 }}
        >
            {children}
        </PostLayout>
    )
}

export default function CommunityLayout({ children, title }: IProps) {
    return (
        <Layout>
            <SEO title={`${title} - PostHog`} />
            <Community title={title}>{children}</Community>
        </Layout>
    )
}
