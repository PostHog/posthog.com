import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import SEO from 'components/seo'
import React from 'react'
import community from 'sidebars/community.json'
import Sidebar from './Sidebar'

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    return <h2 className="m-0 mb-6">{children}</h2>
}

export default function CommunityLayout({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <Layout>
            <SEO title={`${title} - PostHog`} />
            <PostLayout hideSurvey menu={community} sidebar={<Sidebar />} title={title}>
                {children}
            </PostLayout>
        </Layout>
    )
}
