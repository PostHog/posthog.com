import { Login } from 'components/Community/Sidebar'
import ContentViewer from 'components/ContentViewer'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Modal from 'components/Modal'
import { Chat } from '@posthog/icons'
import PostLayout from 'components/PostLayout'
import SidebarSection from 'components/PostLayout/SidebarSection'
import Tooltip from 'components/Tooltip'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import { graphql, useStaticQuery } from 'gatsby'
import { useQuestions } from 'hooks/useQuestions'
import { useUser } from 'hooks/useUser'
import { QuestionData, StrapiResult } from 'lib/strapi'
import React, { useState } from 'react'
import Posts from 'components/Edition/Posts'

const Questions = ({ questions }: { questions: Omit<StrapiResult<QuestionData[]>, 'meta'> }) => {
    return (
        <ul className="list-none m-0 p-0">
            {questions.data.map((question) => {
                const {
                    id,
                    attributes: { subject, topics, numReplies, activeAt, permalink },
                } = question
                return (
                    <li className="text-yellow mt-4 first:mt-0" key={id}>
                        <Link to={`/questions/${permalink}`} className="text-yellow hover:text-yellow">
                            <span className="flex justify-between items-center">
                                <span className="text-base overflow-hidden text-ellipsis whitespace-nowrap">
                                    {subject}
                                </span>
                                <span className="flex-shrink-0 text-black dark:text-white text-xs flex space-x-1 items-center opacity-70">
                                    <span className="w-4">
                                        <Chat />
                                    </span>
                                    <span>{numReplies}</span>
                                </span>
                            </span>
                            <span className="flex justify-between items-center">
                                <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap text-black dark:text-white opacity-70">
                                    {topics?.data[0].attributes.label}
                                </span>
                                <span className="flex-shrink-0 text-black dark:text-white text-xs flex space-x-1 items-center opacity-70">
                                    <span>{dayjs(activeAt).fromNow()}</span>
                                </span>
                            </span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

const Sidebar = () => {
    const { user } = useUser()
    const { questions: subscribedQuestions } = useQuestions({
        limit: 5,
        sortBy: 'activity',
        filters: {
            resolved: {
                $ne: true,
            },
            profileSubscribers: {
                id: {
                    $eq: user?.profile?.id,
                },
            },
        },
    })

    const { questions: newestQuestions } = useQuestions({
        limit: 5,
        sortBy: 'newest',
    })

    return (
        <div className="ml-6 max-w-[350px]">
            {user && (
                <SidebarSection title="Subscribed threads">
                    <Questions questions={subscribedQuestions} />
                </SidebarSection>
            )}
            <SidebarSection title="Latest community questions">
                <Questions questions={newestQuestions} />
            </SidebarSection>
        </div>
    )
}

export default function Edition() {
    const data = useStaticQuery(graphql`
        {
            notes: allMdx(
                filter: {
                    isFuture: { eq: false }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/notes/" } }
                }
                limit: 10
                sort: { fields: frontmatter___date, order: DESC }
            ) {
                nodes {
                    frontmatter {
                        title
                        date
                        authorData {
                            name
                        }
                    }
                    body
                }
            }
            blogPosts: allMdx(
                filter: {
                    isFuture: { eq: false }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/blog/" } }
                }
                limit: 10
                sort: { fields: frontmatter___date, order: DESC }
            ) {
                nodes {
                    frontmatter {
                        title
                        date
                        authorData {
                            name
                        }
                    }
                    body
                }
            }
            allRoadmap(sort: { fields: publishedAt, order: DESC }, limit: 10) {
                nodes {
                    title
                    publishedAt
                    description
                }
            }
        }
    `)
    const { user, logout } = useUser()
    const name = [user?.profile.firstName, user?.profile.lastName].filter(Boolean).join(' ')
    const [loginModalOpen, setLoginModalOpen] = useState(false)

    const blogPosts = data.blogPosts.nodes.map((post) => {
        const {
            frontmatter: { authorData, title, date },
            body,
        } = post
        return {
            title,
            body,
            author: authorData && authorData[0]?.name,
            type: 'Blog post',
            date: new Date(date),
        }
    })

    const roadmaps = data.allRoadmap.nodes.map((roadmap) => {
        const { title, description, publishedAt } = roadmap
        return {
            title,
            body: description,
            type: 'Changelog summary',
            bodyType: 'markdown',
            date: new Date(publishedAt),
        }
    })

    const notes = data.notes.nodes.map((note) => {
        const {
            frontmatter: { authorData, title, date },
            body,
        } = note
        return {
            title,
            body,
            author: authorData && authorData[0]?.name,
            type: 'Note',
            date: new Date(date),
        }
    })

    const content = [...blogPosts, ...roadmaps, ...notes].sort((a, b) => b.date - a.date)

    return (
        <Layout>
            <Modal open={loginModalOpen} setOpen={setLoginModalOpen}>
                <div className="p-4 max-w-[450px] mx-auto relative rounded-md dark:bg-dark bg-light mt-12">
                    <Login onSubmit={() => setLoginModalOpen(false)} />
                </div>
            </Modal>
            <div className="px-5 mt-8 mb-12 max-w-screen-2xl mx-auto">
                <section>
                    <div className="py-2 border-y border-border dark:border-dark text-center flex justify-between items-center sticky top-[-1px]">
                        <p className="m-0">The latest from the PostHog community</p>
                        <div className="flex space-x-6 items-center">
                            <p className="m-0">{dayjs().format('MMM D, YYYY')}</p>
                            {user ? (
                                <span className="flex">
                                    <p className="m-0 pr-2 mr-2 border-r border-border dark:border-dark">
                                        Signed in as{' '}
                                        <Link
                                            className="text-yellow hover:text-yellow"
                                            to={`/community/profiles/${user?.profile.id}`}
                                        >
                                            {name}
                                        </Link>
                                    </p>
                                    <button className="text-yellow font-semibold" onClick={() => logout()}>
                                        Logout
                                    </button>
                                </span>
                            ) : (
                                <button onClick={() => setLoginModalOpen(true)} className="text-yellow font-semibold">
                                    Sign in
                                </button>
                            )}
                        </div>
                    </div>
                </section>
                <section>
                    <Posts />
                </section>
            </div>
        </Layout>
    )
}
