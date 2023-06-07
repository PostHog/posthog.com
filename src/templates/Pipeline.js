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

const PipelineSidebar = ({ filters: { type, maintainer } }) => {
    return (
        <>
            {maintainer && (
                <SidebarSection title="Maintainer">
                    <Topics
                        topics={[
                            {
                                name: capitalizeFirstLetter(maintainer),
                                url: `/cdp?filter=maintainer&value=${maintainer}`,
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
                            url: `/cdp?filter=type&value=${type}`,
                        }))}
                    />
                </SidebarSection>
            ) : null}
        </>
    )
}

export default function Pipeline({ data, pageContext: { next, previous } }) {
    const { pageData, documentation } = data
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
        <Layout>
            <SEO
                image={`/images/cdp/${slug.split('/')[2]}.png`}
                title={`${title} - PostHog`}
                description={description || excerpt}
            />
            <PostLayout
                searchFilter="cdp"
                sidebar={<PipelineSidebar filters={filters} />}
                menu={[
                    {
                        name: 'CDP',
                    },
                    {
                        name: 'All',
                        url: '/cdp',
                    },
                    {
                        name: 'Data-in',
                        url: '/cdp?filter=type&value=data-in',
                    },
                    {
                        name: 'Data-out',
                        url: '/cdp?filter=type&value=data-out',
                    },
                    {
                        name: 'Ingestion-filtering',
                        url: '/cdp?filter=type&value=ingestion-filtering',
                    },
                    {
                        name: 'Other',
                        url: '/cdp?filter=type&value=other',
                    },
                    {
                        name: 'Official',
                        url: '/cdp?filter=maintainer&value=official',
                    },
                    {
                        name: 'Community',
                        url: '/cdp?filter=maintainer&value=community',
                    },
                ]}
                breadcrumb={[{ name: 'CDP', url: '/cdp' }, { name: title }]}
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
                <div className="mt-12">
                    <SectionLinks next={next} previous={previous} />
                </div>
                <div className="mb-12">
                    <FooterCTA />
                </div>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query Pipeline($id: String!, $documentation: String!) {
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
    }
`
