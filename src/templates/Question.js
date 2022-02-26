import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs from 'components/Breadcrumbs'
import { Days, Reply } from 'components/CommunityQuestions/Question'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import PostLayout, { Contributors, SidebarSection, Text } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { graphql } from 'gatsby'
import moment from 'moment'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { CodeBlock } from '../components/CodeBlock'

const QuestionSidebar = ({ question, location, title, pageViews, categories, slugs }) => {
    const now = moment()
    const days = now.diff(question.created_at, 'days')
    return (
        <>
            <SidebarSection title={`Asked by`}>
                <Contributors
                    className="flex flex-col space-y-2"
                    contributors={[
                        { name: question.user?.first_name || 'Contributor', imageURL: question.user?.avatar },
                    ]}
                />
            </SidebarSection>
            <SidebarSection>
                <Text>
                    Posted <Days className="!font-semibold !opacity-90 !ml-1 lowercase" created={question.created} />
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
                    { title: `${question.user?.first_name || 'Contributor'}'s question`, truncate: true },
                ]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />
            <PostLayout article={false} sidebar={<QuestionSidebar slugs={slug} question={question} />}>
                <div className="bg-white dark:bg-gray-accent-dark p-5 rounded-md shadow-lg article-content questions-content">
                    <ReactMarkdown>{question.childMdx.rawBody}</ReactMarkdown>
                </div>
                <div className="mt-6">
                    {childrenReply.length > 1 &&
                        childrenReply
                            .slice(1)
                            .map((reply, index) => (
                                <Reply
                                    className="!bg-transparent !py-2"
                                    parentId={id}
                                    key={index}
                                    {...reply}
                                    body={reply.childMdx.rawBody}
                                />
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
                user {
                    first_name
                    last_name
                    avatar
                }
                created_at
                childMdx {
                    rawBody
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
