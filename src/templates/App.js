import { MDXProvider } from '@mdx-js/react'
import FooterCTA from 'components/FooterCTA'
import { RightArrow } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import TutorialsSlider from 'components/TutorialsSlider'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import GithubSlugger from 'github-slugger'
import { graphql } from 'gatsby'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'
import SectionLinks from 'components/SectionLinks'
import PostLayout from 'components/PostLayout'
import SidebarSection from 'components/PostLayout/SidebarSection'
import Topics from 'components/PostLayout/Topics'
import { capitalizeFirstLetter } from '../../src/utils'
import { communityMenu } from '../navs'

const AppSidebar = ({ filters: { type, maintainer } }) => {
    return (
        <>
            {maintainer && (
                <SidebarSection title="Maintainer">
                    <Topics
                        topics={[
                            {
                                name: capitalizeFirstLetter(maintainer),
                                url: `/apps?filter=maintainer&value=${maintainer}`,
                            },
                        ]}
                    />
                </SidebarSection>
            )}
            {type?.length > 0 ? (
                <SidebarSection title={`Type${type?.length === 1 ? '' : 's'}`}>
                    <Topics
                        topics={type?.map((type) => ({
                            name: capitalizeFirstLetter(type),
                            url: `/apps?filter=type&value=${type}`,
                        }))}
                    />
                </SidebarSection>
            ) : null}
        </>
    )
}

export default function App({ data }) {
    const { pageData, documentation, apps } = data
    const {
        body,
        excerpt,
        fields: { slug },
    } = pageData
    const { title, subtitle, thumbnail, description, filters } = pageData?.frontmatter
    const slugger = new GithubSlugger()
    const Documentation = () => {
        return documentation ? (
            <>
                <h4 className="mt-6 mb-2">{title} documentation</h4>
                <ul className="m-0 p-0 list-none">
                    {documentation.headings?.map((heading) => {
                        const id = slugger.slug(heading.value)
                        return (
                            <li key={id}>
                                <Link
                                    className="text-[18px] group font-semibold pb-3 mb-3 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark flex justify-between items-center"
                                    to={`${documentation.fields?.slug}#${id}`}
                                >
                                    <span>{heading.value}</span>
                                    <RightArrow className="w-6 h-6 text-gray bounce" />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </>
        ) : null
    }

    return (
        <Layout parent={communityMenu}>
            <SEO
                image={`/images/apps/${slug.split('/')[2]}.png`}
                title={`${title} - PostHog`}
                description={description || excerpt}
            />
            <PostLayout
                searchFilter="apps"
                sidebar={<AppSidebar filters={filters} />}
                menu={[
                    {
                        name: 'Apps',
                    },
                    ...apps.nodes.map(({ frontmatter: { title }, fields: { slug } }) => ({ name: title, url: slug })),
                ]}
                breadcrumb={[{ name: 'Apps', url: '/apps' }, { name: title }]}
            >
                {thumbnail?.publicURL && (
                    <figure className="m-0 text-center">
                        <img src={thumbnail.publicURL} alt={title} className="h-24 mx-auto mb-6" />
                    </figure>
                )}
                <h1 className="text-center mt-0 mb-12 hidden lg:block">{title}</h1>
                <article>
                    <MDXProvider components={{ ...shortcodes, Section, TutorialsSlider, Documentation }}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </article>
                <div className="mb-12">
                    <FooterCTA />
                </div>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query App($id: String!, $documentation: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                description
                filters {
                    type
                    maintainer
                }
                thumbnail {
                    publicURL
                }
            }
        }
        documentation: mdx(fields: { slug: { eq: $documentation } }) {
            fields {
                slug
            }
            headings {
                depth
                value
            }
        }
        apps: allMdx(filter: { fields: { slug: { regex: "/^/apps/" } } }) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                }
            }
        }
    }
`
