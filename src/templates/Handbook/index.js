import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Header from 'components/Header'
import SearchBar from './SearchBar'
import Main from './Main'
import ArticleFooter from './Footer'
import Footer from 'components/Footer'
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
                    <MainSidebar menu={menu} slug={slug} className="p-5 pb-32" />
                </Menu>
                <SearchBar
                    menuOpen={menuOpen}
                    handleMobileMenuClick={handleMobileMenuClick}
                    filePath={filePath}
                    title={title}
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
                        }}
                    />
                </div>
            </div>
            <ArticleFooter title={title} filePath={filePath} contributors={contributors} />
            <Footer />
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
