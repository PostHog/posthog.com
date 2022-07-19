import { useLocation } from '@reach/router'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { push as Menu } from 'react-burger-menu'
import { animateScroll as scroll } from 'react-scroll'
import DocsLayout from 'components/Docs/Layout'
import MainSidebar from 'components/Docs/MainSidebar'
import ArticleFooter from 'components/Docs/Footer'
import Navigation from 'components/Docs/Navigation'

import '../styles/handbook.scss'

export default function Library({
    data: { post },
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
    const { title, hideAnchor, github, features, description, featuredImage, hideLastUpdated } = frontmatter
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
                title={`${title} - PostHog ${breadcrumbBase.name}`}
                description={description || excerpt}
                article
                image={`/og-images/${slug.replace(/\//g, '')}.jpeg`}
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
                            <DocsLayout
                                title={title}
                                slug={slug}
                                github={github}
                                features={features}
                                menu={menu}
                                lastUpdated={lastUpdated}
                                hideAnchor={hideAnchor}
                                tableOfContents={tableOfContents}
                                body={body}
                                next={next}
                                previous={previous}
                                hideLastUpdated={hideLastUpdated}
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
    query LibraryQuery($id: String!) {
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
                github
                features {
                    eventCapture
                    userIdentification
                    autoCapture
                    sessionRecording
                    featureFlags
                    groupAnalytics
                }
                hideLastUpdated
                featuredImage {
                    publicURL
                }
                github
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
