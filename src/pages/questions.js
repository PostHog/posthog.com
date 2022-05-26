import { DocSearchModal } from '@docsearch/react'
import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs from 'components/Breadcrumbs'
import { CodeBlock } from 'components/CodeBlock'
import { Days } from 'components/CommunityQuestions/Question'
import { Check } from 'components/Icons/Icons'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import Icon from 'components/SupportImages/Icon'
import { ZoomImage } from 'components/ZoomImage'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { Form, Squeak } from 'squeak-react'

const TopLink = ({ title, description, link, icon }) => {
    return (
        <li className="w-full">
            <a
                href={link}
                className="flex flex-col items-center justify-center text-center text-black hover:text-black opacity-80 hover:opacity-100 hover:bg-gray-accent dark:hover:bg-gray-accent-dark hover:bg-opacity-20 px-4 py-5"
            >
                <Icon className="w-6 h-6 mb-2 text-gray" name={icon} />
                <h3 className="font-bold text-base mb-1">{title}</h3>
                <p className="text-xs text-gray dark:text-white dark:text-opacity-75 mb-0">{description}</p>
            </a>
        </li>
    )
}

const Guide = ({ title, link, icon }) => {
    return (
        <li className="border-b border-dashed border-gray first:border-l">
            <Link
                to={link}
                className="flex justify-start items-center w-full h-full text-black hover:text-black hover:bg-gray-accent dark:hover:bg-gray-accent-dark hover:bg-opacity-20 opacity-80 hover:opacity-100 p-4 space-x-2"
            >
                <Icon className="w-4 h-4 text-gray" name={icon} />
                <h3 className="font-bold text-sm mb-0">{title}</h3>
            </Link>
        </li>
    )
}

const Search = () => {
    const [value, setValue] = useState('')
    const [modal, setModal] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [formValues, setFormValues] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (value.trim()) {
            setModal(true)
        }
    }
    const handleSqueakSubmit = (values) => {
        setFormValues(values)
    }
    return (
        <>
            {modal && (
                <DocSearchModal
                    onClose={() => setModal(false)}
                    initialQuery={value}
                    appId="B763I3AO0D"
                    indexName="posthog"
                    apiKey="f1386529b9fafc5c3467e0380f19de4b"
                />
            )}
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 m-0">
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    name="faq-search"
                    placeholder="Search anything product, installation, or company-related..."
                    className="px-4 py-3 text-base bg-white dark:bg-gray-accent-dark shadow-md rounded-sm w-full"
                />

                <button className="px-6 py-3 bg-red shadow-md rounded-sm text-white font-bold">Search</button>
            </form>
            {showForm && (
                <motion.div className="mt-4 max-w-[450px]" initial={{ height: 0 }} animate={{ height: 'auto' }}>
                    {formValues ? (
                        <div>
                            <p className="flex items-center space-x-1 font-semibold text-[#43AF79]">
                                <span className=" w-[24px] h-[24px] bg-[#43AF79] rounded-full flex justify-center items-center">
                                    <Check className="w-[12px] h-[12px] text-white" />
                                </span>
                                <span>Question sent. Thread will be posted here.</span>
                            </p>
                        </div>
                    ) : (
                        <Form
                            onSubmit={handleSqueakSubmit}
                            apiHost="https://squeak.cloud"
                            apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXBrcXV2d3FhYXVudXpqb2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MjE3ODUsImV4cCI6MTk2NTI5Nzc4NX0.SxdOpxHjVwap7sDUptK2TFJl7WK3v3HLuKbzb0JKeKg"
                            url="https://pxipkquvwqaaunuzjoge.supabase.co"
                            organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                        />
                    )}
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
            <section className="px-4">
                <div className="max-w-4xl mx-auto my-12">
                    <h1>Questions?</h1>
                    <Search />
                    <p className="mt-3 text-sm text-gray">
                        Can't find the answer you're looking for?{' '}
                        <button className="text-red font-semibold" onClick={() => setShowForm(!showForm)}>
                            Ask a question
                        </button>
                    </p>
                </div>

                <div className="border-t border-b border-dashed border-gray mb-12 -mx-4">
                    <div className="max-w-4xl w-full mx-auto">
                        <ol className="list-none m-0 p-0 md:grid md:grid-cols-5 justify-center divide-y md:divide-y-0 md:divide-x divide-dashed divide-gray">
                            <TopLink
                                title="Self-hosting"
                                description="Deployment options"
                                link="/docs/self-host#deployment-options"
                                icon="selfHost"
                            />
                            <TopLink
                                title="Partners"
                                description="Hosting & support"
                                link="/marketplace"
                                icon="partners"
                            />
                            <TopLink title="FAQ" description="Deployment options" link="/faq" icon="faq2" />
                            <TopLink
                                title="Report an issue"
                                description="via GitHub"
                                link="https://github.com/PostHog/posthog/issues"
                                icon="issue2"
                            />
                            <TopLink title="API" description="Apps, data I/O" link="/docs/api" icon="api" />
                        </ol>
                    </div>
                </div>

                <div className="max-w-4xl w-full mx-auto">
                    <h3>Product manuals</h3>
                </div>

                <div className="max-w-4xl w-full mx-auto">
                    <ol className="list-none m-0 p-0 grid md:grid-flow-col grid-cols-2 md:grid-cols-4 md:grid-rows-3 divide-x divide-dashed divide-gray justify-center border-t border-r border-dashed border-gray">
                        <Guide title="Trends" link="/docs/user-guides/trends" icon="trendz" />
                        <Guide title="Funnels" link="/docs/user-guides/funnels" icon="funnels" />
                        <Guide title="User paths" link="/docs/user-guides/paths" icon="user-paths" />
                        <Guide
                            title="Correlation analysis"
                            link="/docs/user-guides/correlation"
                            icon="correlation-analysis"
                        />
                        <Guide title="Session recording" link="/docs/user-guides/recordings" icon="session-recording" />
                        <Guide title="Feature flags" link="/docs/user-guides/feature-flags" icon="feature-flags" />
                        <Guide
                            title="Experimentation"
                            link="/docs/user-guides/experimentation"
                            icon="experimentation"
                        />
                        <Guide title="Heatmaps" link="/docs/user-guides/toolbar#toolbar-features" icon="heatmaps" />
                        <Guide title="Apps" link="/docs/apps" icon="apps" />
                        <Guide title="Toolbar" link="/docs/user-guides/toolbar" icon="toolbar" />
                        <Guide title="Insights" link="/docs/user-guides/insights" icon="insights" />
                        <Guide
                            title="Group Analytics"
                            link="/docs/user-guides/group-analytics"
                            icon="group-analytics"
                        />
                    </ol>
                    <a
                        href="/docs/user-guides"
                        className="border border-t-0 border-dashed border-gray p-3 text-base font-semibold flex justify-center hover:bg-gray-accent dark:hover:bg-gray-accent-dark hover:bg-opacity-20"
                    >
                        View all (23)
                    </a>
                </div>

                <div className="max-w-4xl mx-auto my-12">
                    <h3>Recent questions</h3>
                    <Squeak
                        slug={null}
                        apiHost="https://squeak.cloud"
                        apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXBrcXV2d3FhYXVudXpqb2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MjE3ODUsImV4cCI6MTk2NTI5Nzc4NX0.SxdOpxHjVwap7sDUptK2TFJl7WK3v3HLuKbzb0JKeKg"
                        url="https://pxipkquvwqaaunuzjoge.supabase.co"
                        organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                    />
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
                childrenReply {
                    id
                    subject
                    name
                    ts: created_at(difference: "days")
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
