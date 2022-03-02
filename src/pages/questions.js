import { DocSearchModal } from '@docsearch/react'
import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs from 'components/Breadcrumbs'
import { CodeBlock } from 'components/CodeBlock'
import AskAQuestion from 'components/CommunityQuestions/AskAQuestion'
import Avatar from 'components/CommunityQuestions/Avatar'
import { Days } from 'components/CommunityQuestions/Question'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import React, { useState } from 'react'
import slugify from 'slugify'

const Search = () => {
    const [value, setValue] = useState('')
    const [modal, setModal] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (value.trim()) {
            setModal(true)
        }
    }
    return (
        <>
            {modal && (
                <DocSearchModal
                    searchParameters={{ facetFilters: [`tags:questions`] }}
                    onClose={() => setModal(false)}
                    initialQuery={value}
                    appId="B763I3AO0D"
                    indexName="posthog"
                    apiKey="f1386529b9fafc5c3467e0380f19de4b"
                />
            )}
            <form onSubmit={handleSubmit} className="flex space-x-3 m-0">
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    name="faq-search"
                    placeholder="Search hundreds of answers..."
                    className="px-4 py-3 bg-white dark:bg-gray-accent-dark shadow-md rounded-md max-w-[477px] w-full"
                />

                <button className="px-6 py-3 bg-red shadow-md rounded-md text-white font-bold">Search</button>
            </form>
            <p className="text-[13px] opacity-50 m-0 mt-3">
                Try product questions, or anything about installation or self-hosting.
            </p>
            <p className="text-[14px] opacity-70 m-0 mt-3 mb-4">
                Can't find the answer you're looking for?{' '}
                <button className="text-red" onClick={() => setShowForm(!showForm)}>
                    Ask us anything
                </button>
                .
            </p>
            {showForm && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}>
                    <AskAQuestion />
                </motion.div>
            )}
        </>
    )
}

const Question = ({ question }) => {
    const replies = question.childrenReply
    const { user, created_at, childMdx } = replies[0]

    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        img: ZoomImage,
    }

    const slug = slugify(question.subject, { lower: true })

    return (
        <li className="mt-9 first:mt-7">
            <div className="flex space-x-2">
                <Avatar image={user?.avatar} />
                <p className="text-black dark:text-white m-0 text-[13px] font-semibold opacity-50 flex space-x-2">
                    {user?.first_name || 'Contributor'} <Days created={created_at} url={`/questions/${slug}`} />
                </p>
            </div>
            <div className="artcle-content my-2">
                <p className="m-0">{childMdx.excerpt}</p>
            </div>
            <Link className="text-red hover:red m-0 text-[14px] font-semibold" to={`/questions/${slug}`}>
                {replies.length - 1} response{replies.length - 1 === 1 ? '' : 's'}
            </Link>
        </li>
    )
}

export default function FAQ({
    data: {
        questions: { nodes },
    },
}) {
    return (
        <Layout>
            <SEO title={'Questions - PostHog'} />
            <Breadcrumbs
                crumbs={[{ title: 'Questions' }]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />
            <section className="max-w-[884px] mx-auto my-12 px-5">
                <h1>Questions &amp; answers</h1>
                <p>
                    We've been asked hundreds of questions, so we decided to compile the answers here. (We hope this
                    helps you find what you're looking for even faster!)
                </p>
                <Search />
                <div className="questions-content">
                    <ul className="list-none p-0 m-0">
                        {nodes.map((question, index) => (
                            <Question key={index} question={question} />
                        ))}
                    </ul>
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
    query AllQuestionsQuery {
        questions: allQuestion(sort: { fields: childReply___created_at, order: DESC }, limit: 20) {
            nodes {
                id
                subject
                childrenReply {
                    id
                    user {
                        first_name
                        last_name
                        avatar
                    }
                    childMdx {
                        excerpt
                        rawBody
                    }
                    created_at
                    body
                    teamMember {
                        frontmatter {
                            name
                            jobTitle
                            headshot {
                                childImageSharp {
                                    gatsbyImageData(width: 20, height: 20)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
