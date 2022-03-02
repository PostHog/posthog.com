import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs from 'components/Breadcrumbs'
import { Reply } from 'components/CommunityQuestions/Question'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import PostLayout, { Contributors, SidebarSection, Text } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { CodeBlock } from '../components/CodeBlock'

const QuestionSidebar = ({ question, location, title, pageViews, categories, slugs }) => {
    const days = Number(question.ts)
    return (
        <>
            <SidebarSection title={`Asked by`}>
                <Contributors
                    className="flex flex-col space-y-2"
                    contributors={[{ name: question.name, image: question.avatar }]}
                />
            </SidebarSection>
            <SidebarSection>
                <Text>
                    Posted {days} day{days === 1 ? '' : 's'} ago
                </Text>
            </SidebarSection>
            {slugs && (
                <SidebarSection title={`Appears on`}>
                    <ul className="list-none m-0 p-0 flex flex-col space-y-2">
                        {slugs.map((slug) => {
                            return (
                                <li key={slug}>
                                    <Link to={slug}>{slug}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </SidebarSection>
            )}
        </>
    )
}

export default function Question({
    data: {
        question: { childrenReply, id, slug },
    },
}) {
    const question = childrenReply[0]
    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        img: ZoomImage,
    }
    return (
        <Layout>
            <SEO title={'Questions - PostHog'} />
            <Breadcrumbs
                crumbs={[
                    { title: 'Questions', url: '/questions' },
                    { title: `${question.name}'s question`, truncate: true },
                ]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />
            <PostLayout article={false} sidebar={<QuestionSidebar slugs={slug} question={question} />}>
                <div className="bg-white dark:bg-gray-accent-dark p-5 rounded-md shadow-lg article-content questions-content">
                    <MDXProvider components={components}>
                        <MDXRenderer>{question.childMdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
                <div className="mt-6">
                    {childrenReply.length > 1 &&
                        childrenReply
                            .slice(1)
                            .map((reply, index) => (
                                <Reply className="!bg-transparent !py-2" parentId={id} key={index} {...reply} />
                            ))}
                </div>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query QuestionQuery($id: String!) {
        question(id: { eq: $id }) {
            id
            slug
            childrenReply {
                id
                name
                ts(difference: "days")
                childMdx {
                    body
                }
                avatar {
                    childImageSharp {
                        gatsbyImageData(width: 37, height: 37)
                    }
                }
                teamMember {
                    frontmatter {
                        name
                        jobTitle
                        headshot {
                            childImageSharp {
                                gatsbyImageData(width: 37, height: 37)
                            }
                        }
                    }
                }
            }
        }
    }
`
