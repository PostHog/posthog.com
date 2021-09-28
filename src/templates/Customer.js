import { MDXProvider } from '@mdx-js/react'
import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'

const Tags = ({ title, tags }) => {
    return (
        <li className="border-b border-dashed border-gray-accent-light">
            <h4 className="text-gray m-0 text-[15px]">{title}</h4>
            <ul className="list-none m-0 p-0 text-base flex flex-wrap">
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

export default function Customer({ data }) {
    const {
        customerData: {
            body,
            frontmatter: { title, customer, logo, description, industries, users, toolsUsed, featuredImage },
        },
    } = data
    return (
        <Layout>
            <div className="max-w-screen-2xl mx-auto px-4 flex items-start">
                <aside className="mr-9 sticky top-0">
                    {logo && <img className="w-full" src={logo.publicURL} />}
                    <ul className="list-none flex-col flex space-y-8 p-0 mt-10 min-w-[250px]">
                        <Tags title="Industry" tags={industries} />
                        <Tags title="Users" tags={users} />
                        <Tags title="Tools used" tags={toolsUsed} />
                    </ul>
                </aside>
                <section className="customer-content">
                    <h1>{title}</h1>
                    <MDXProvider components={shortcodes}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </section>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query Customer($id: String!) {
        customerData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            frontmatter {
                title
                customer
                logo {
                    publicURL
                }
                description
                industries
                users
                toolsUsed
                featuredImage {
                    publicURL
                }
            }
        }
    }
`
