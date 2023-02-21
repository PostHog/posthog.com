import { MDXProvider } from '@mdx-js/react'
import { BorderWrapper } from 'components/BorderWrapper'
import Breadcrumbs from 'components/Breadcrumbs'
import { Caption } from 'components/Caption'
import { FloatedImage } from 'components/FloatedImage'
import { ImageBlock } from 'components/ImageBlock'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'
import Link from 'components/Link'
import FooterCTA from 'components/FooterCTA'
import PostLayout from 'components/PostLayout'
import SidebarSection from 'components/PostLayout/SidebarSection'
import Topics from 'components/PostLayout/Topics'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

const components = {
    ...shortcodes,
    BorderWrapper,
    Caption,
    ImageBlock,
    FloatedImage,
    a: A,
}

const Tags = ({ tags }) => {
    return (
        <li className="border-b border-dashed border-gray-accent-light">
            <ul className="list-none m-0 p-0 text-lg flex flex-wrap">
                {tags.map((tag, index) => {
                    return (
                        <li key={index} className="font-bold after:content-['\002C\00A0'] last:after:content-['']">
                            {tag}
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

const CustomerSidebar = ({ industries, users, toolsUsed, logo }) => {
    return (
        <>
            <SidebarSection>{logo && <img className="w-full max-w-[200px]" src={logo.publicURL} />}</SidebarSection>
            <SidebarSection title="Industry">
                <Topics topics={industries.map((industry) => ({ name: industry }))} />
            </SidebarSection>
            <SidebarSection title="Users">
                <Topics topics={users.map((user) => ({ name: user }))} />
            </SidebarSection>
            <SidebarSection title="Tools used">
                <Topics topics={toolsUsed.map((toolUsed) => ({ name: toolUsed }))} />
            </SidebarSection>
        </>
    )
}

export default function Customer({ data, pageContext: { tableOfContents } }) {
    const {
        allCustomers,
        customerData: {
            body,
            excerpt,
            fields: { logo },
            ogImage,
            frontmatter: { title, customer, description, industries, users, toolsUsed, featuredImage },
        },
    } = data

    return (
        <>
            <SEO title={`${title} - PostHog`} description={description || excerpt} article image={ogImage?.publicURL} />
            <Layout>
                <PostLayout
                    tableOfContents={tableOfContents}
                    hideSearch
                    menu={[
                        { name: 'Customers' },
                        ...allCustomers?.nodes?.map(({ fields: { slug }, frontmatter: { customer } }) => ({
                            name: customer,
                            url: slug,
                        })),
                    ]}
                    title={title}
                    hideSurvey
                    sidebar={
                        <CustomerSidebar logo={logo} industries={industries} toolsUsed={toolsUsed} users={users} />
                    }
                    breadcrumb={[
                        {
                            name: 'Customers',
                            url: '/customers',
                        },
                        {
                            name: customer,
                        },
                    ]}
                >
                    <section className="article-content customer-content">
                        <h1 className="text-5xl leading-none mt-0">{title}</h1>
                        <MDXProvider components={components}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </section>
                    <FooterCTA />
                </PostLayout>
            </Layout>
        </>
    )
}

export const query = graphql`
    query Customer($id: String!) {
        allCustomers: allMdx(
            filter: { fields: { slug: { regex: "/^/customers/" } } }
            sort: { fields: frontmatter___customer, order: ASC }
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    customer
                }
            }
        }
        customerData: mdx(id: { eq: $id }) {
            ogImage {
                publicURL
            }
            body
            excerpt(pruneLength: 150)
            fields {
                slug
                logo {
                    publicURL
                }
            }
            frontmatter {
                title
                customer
                description
                industries
                users
                toolsUsed
            }
        }
    }
`
