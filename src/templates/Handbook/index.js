import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Header from 'components/Header'
import Main from './Main'
import Footer from './Footer'
import MainSidebar from './MainSidebar'
import { push as Menu } from 'react-burger-menu'
import '../../styles/handbook.scss'

export default function Handbook({
    data: { post },
    pageContext: { menu, next, breadcrumb = [], breadcrumbBase, tableOfContents },
}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const {
        body,
        frontmatter,
        fields: { slug, contributors },
    } = post
    const { title, hideAnchor } = frontmatter
    const { parent } = post
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

    return (
        <div className="bg-white dark:bg-[#220f3f] handbook-container">
            <Header onPostPage className="max-w-screen-2xl mx-auto" />
            <div id="handbook-menu-wrapper">
                <Menu
                    width="80vw"
                    onClose={() => setMenuOpen(false)}
                    customBurgerIcon={false}
                    customCrossIcon={false}
                    styles={styles}
                    pageWrapId="handbook-content-menu-wrapper"
                    outerContainerId="handbook-menu-wrapper"
                    overlayClassName="backdrop-blur"
                    isOpen={menuOpen}
                >
                    <MainSidebar menu={menu} slug={slug} className="p-5 pb-32" />
                </Menu>
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
                        }}
                    />
                    <Footer title={title} filePath={filePath} contributors={contributors} />
                </div>
            </div>
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
