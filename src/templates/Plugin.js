import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import React from 'react'

export default function Integration({ data }) {
    const {
        pluginData: { name, category, maintainer, description, markdown, logo },
    } = data
    return (
        <>
            <SEO title={`${name} - PostHog`} description={description} image={logo?.publicURL} />
            <Layout>
                <div className="px-4 sticky top-[-2px] bg-tan dark:bg-primary z-10">
                    <Breadcrumbs
                        crumbs={[
                            {
                                title: 'Integrations',
                                url: '/integrations',
                            },
                            {
                                title: name,
                            },
                        ]}
                        darkModeToggle
                    />
                </div>
                <div className="max-w-screen-sm mx-auto px-4 flex flex-col md:flex-row items-start mt-16 md:mt-20">
                    <section className="article-content">
                        <div dangerouslySetInnerHTML={{ __html: markdown?.childMarkdownRemark?.html }} />
                    </section>
                </div>
            </Layout>
        </>
    )
}

export const query = graphql`
    query Plugin($id: String!) {
        pluginData: plugin(id: { eq: $id }) {
            name
            category: type
            maintainer
            description
            markdown {
                childMarkdownRemark {
                    html
                }
            }
            logo {
                publicURL
                childImageSharp {
                    gatsbyImageData
                }
            }
        }
    }
`
