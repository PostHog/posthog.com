import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { useLocation } from '@reach/router'
import { push as Menu } from 'react-burger-menu'
import { animateScroll as scroll } from 'react-scroll'
import { SEO } from 'components/seo'
import Main from './Main'
import ArticleFooter from './Footer'
import MainSidebar from './MainSidebar'
import Layout from 'components/Layout'
import Navigation from './Navigation'
import '../../styles/handbook.scss'

export default function Handbook({
    data: { post, questions },
    pageContext: { menu, next, previous, breadcrumb = [], breadcrumbBase, tableOfContents },
}) {
    const { hash } = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const {
        body,
        frontmatter,
        contributors,
        fields: { slug },
    } = post
    const { title, hideAnchor, description, featuredImage, hideLastUpdated } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`

    const styles = {
        bmOverlay: {
            background: 'transparent',
        },
    }

    const handleMobileMenuClick = () => {
        setMenuOpen(!menuOpen)
    }

    useEffect(() => {
        if (hash) {
            scroll.scrollMore(-50)
        }
    }, [])

    return (
        <>
            <SEO
                title={`${title} - Posthog ${breadcrumbBase.name}`}
                description={description || excerpt}
                article
                image={featuredImage?.publicURL}
            />
            <Layout>
                <div className="handbook-container px-4">
                    <div id="handbook-menu-wrapper">
                        <Menu
                            width="calc(100vw - 80px)"
                            onClose={() => setMenuOpen(false)}
                            customBurgerIcon={false}
                            customCrossIcon={false}
                            styles={styles}
                            pageWrapId="handbook-content-menu-wrapper"
                            outerContainerId="handbook-menu-wrapper"
                            overlayClassName="backdrop-blur"
                            isOpen={menuOpen}
                        >
                            <MainSidebar height={'auto'} menu={menu} slug={slug} className="p-5 pb-32 md:hidden" />
                        </Menu>
                        <Navigation
                            next={next}
                            previous={previous}
                            title={title}
                            filePath={filePath}
                            breadcrumb={breadcrumb}
                            breadcrumbBase={breadcrumbBase}
                            menuOpen={menuOpen}
                            handleMobileMenuClick={handleMobileMenuClick}
                        />
                        <div id="handbook-content-menu-wrapper">
                            <Main
                                {...{
                                    handleMobileMenuClick,
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
                                    previous,
                                    hideLastUpdated,
                                    questions: questions?.nodes,
                                }}
                            />
                        </div>
                    </div>
                    <ArticleFooter title={title} filePath={filePath} contributors={contributors} />
                </div>
            </Layout>
        </>
    )
}

export const query = graphql`
    query HandbookQuery($id: String!, $slug: String!) {
        post: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            contributors {
                url
                username
                avatar {
                    childImageSharp {
                        gatsbyImageData(width: 37, placeholder: BLURRED)
                    }
                }
            }
            frontmatter {
                title
                hideAnchor
                description
                hideLastUpdated
                featuredImage {
                    publicURL
                }
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
        questions: allQuestion(filter: { slug: { eq: $slug } }) {
            nodes {
                avatar
                body
                name
                slug
                replies {
                    avatar
                    body
                    name
                    authorData {
                        name
                        role
                        image
                        link_url
                    }
                }
            }
        }
    }
`
