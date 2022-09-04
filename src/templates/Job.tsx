import { CallToAction } from 'components/CallToAction'
import Layout from 'components/Layout'
import PostLayout, { ShareLinks, SidebarSection } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import React from 'react'

const JobSidebar = () => {
    return (
        <>
            <SidebarSection>
                <ShareLinks />
            </SidebarSection>
        </>
    )
}

export default function Job({
    data: {
        ashbyJob: { title, departmentName, info },
    },
    pageContext: { slug },
}) {
    return (
        <Layout>
            <SEO title={`${title} - PostHog`} />
            <PostLayout hideSurvey sidebar={<JobSidebar />} title="careers">
                <div className="mb-8 overflow-hidden relative">
                    <div>
                        <h1 className="m-0 text-5xl">{title}</h1>
                        <h2 className="m-0 text-2xl text-black/50 dark:text-white/50 font-normal">{departmentName}</h2>
                        <div
                            className="job-content mt-12"
                            dangerouslySetInnerHTML={{ __html: info?.descriptionHtml }}
                        />
                        <CallToAction to={`/${slug}/apply`}>Apply</CallToAction>
                    </div>
                </div>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query JobQuery($id: String!) {
        ashbyJob(id: { eq: $id }) {
            title
            departmentName
            info {
                descriptionHtml
            }
        }
    }
`
