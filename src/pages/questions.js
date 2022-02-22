import { DocSearchModal } from '@docsearch/react'
import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs from 'components/Breadcrumbs'
import { CodeBlock } from 'components/CodeBlock'
import AskAQuestion from 'components/CommunityQuestions/AskAQuestion'
import { Days } from 'components/CommunityQuestions/Question'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'

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
            <p className="text-[14px] opacity-70 m-0 mt-3">
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
    const { avatar, name, ts, childMdx } = replies[0]

    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        img: ZoomImage,
    }
    return (
        <li className="mt-9 first:mt-7">
            <div className="flex space-x-2">
                {avatar ? (
                    <GatsbyImage className="rounded-full overflow-hidden" image={getImage(avatar)} />
                ) : (
                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                            fill="#BFBFBC"
                        />
                        <path
                            d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                            fill="#BFBFBC"
                        />
                    </svg>
                )}
                <p className="text-black dark:text-white m-0 text-[13px] font-semibold opacity-50 flex space-x-2">
                    {name} <Days ts={ts} url={`/questions/${question.id}`} />
                </p>
            </div>
            <div className="artcle-content my-2">
                <p className="m-0">{childMdx.excerpt}</p>
            </div>
            <Link className="text-red hover:red m-0 text-[14px] font-semibold" to={`/questions/${question.id}`}>
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
        questions: allQuestion(sort: { fields: childReply___ts, order: DESC }, limit: 20) {
            nodes {
                id
                childrenReply {
                    id
                    name
                    ts(difference: "days")
                    childMdx {
                        body
                        excerpt(pruneLength: 400)
                    }
                    avatar {
                        childImageSharp {
                            gatsbyImageData(width: 20, height: 20)
                        }
                    }
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
