import React from 'react'
import { graphql } from 'gatsby'
import Header from 'components/Header'
import Main from './Main'
import Footer from './Footer'
import '../../styles/handbook.scss'

export default function Handbook({
    data: { post },
    pageContext: { menu, next, breadcrumb = [], breadcrumbBase, tableOfContents },
}) {
    const {
        body,
        frontmatter,
        fields: { slug, contributors },
    } = post
    const { title, hideAnchor } = frontmatter
    const { parent } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`

    return (
        <div className="bg-white dark:bg-[#220f3f] handbook-container">
            <Header onPostPage className="max-w-screen-2xl mx-auto" />
            <Main
                {...{
                    filePath,
                    title,
                    lastUpdated,
                    menu,
                    slug,
                    breadcrumb,
                    breadcrumbBase,
                    hideAnchor,
                    tableOfContents,
                    body,
                    next,
                }}
            />
            <Footer title={title} filePath={filePath} contributors={contributors} />
        </div>
    )
}

export const query = graphql`
    query HandbookQuery($id: String!) {
        post: mdx(id: { eq: $id }) {
            id
            body
            fields {
                slug
                contributors {
                    author {
                        avatar_url
                        html_url
                        login
                    }
                }
            }
            frontmatter {
                title
                hideAnchor
            }
            parent {
                ... on File {
                    relativePath
                    fields {
                        gitLogLatestDate(formatString: "MMM D, YYYY")
                    }
                }
            }
        }
    }
`
