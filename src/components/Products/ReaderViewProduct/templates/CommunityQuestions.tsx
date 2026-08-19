import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IconArrowRight, IconArrowUpRight } from '@posthog/icons'
import CommunityQuestionsList from './CommunityQuestionsList'
import OSButton2 from 'components/OSButton/OSButton2'
import { useQuestions } from 'hooks/useQuestions'
import { SectionComponentProps } from '../types'
import { SectionHeading } from '../helpers'
import Link from 'components/Link'
import { useApp } from '../../../../context/App'
import SmallTeam from 'components/SmallTeam'
import { volumeById } from '../../../../constants/pocketGuides'

type CommunityStatsNode = {
    topicId: number | null
    questions: number
    resolved: number
    replies: number
    helpful: number
}

const CommunityQuestions = ({ id, productData }: SectionComponentProps) => {
    const forumTopicId = (productData as any)?.forumTopicId
    const slug = (productData as any)?.slug
    if (!forumTopicId || !slug) return null

    const { questions, isLoading } = useQuestions({
        topicId: forumTopicId,
        limit: 3,
        sortBy: 'activity',
    })

    const { allCommunityStats } = useStaticQuery(graphql`
        query CommunityQuestionsStats {
            allCommunityStats {
                nodes {
                    topicId
                    questions
                    resolved
                    replies
                    helpful
                }
            }
        }
    `)
    const stats: CommunityStatsNode | undefined = allCommunityStats.nodes.find(
        (node: CommunityStatsNode) => node.topicId === forumTopicId
    )

    const forumUrl = `/questions/topic/${slug}`
    const approxCount = (n: number) => {
        if (n >= 1000) return `With over ${(Math.floor(n / 1000) * 1000).toLocaleString()}`
        if (n >= 100) return `With over ${(Math.floor(n / 100) * 100).toLocaleString()}`
        return n.toLocaleString()
    }

    const { openNewChat } = useApp()

    // Only products that declare a volume get this; everyone else's Answers list is unchanged.
    // An announced-but-unwritten volume has no page, so it stays out rather than linking to a 404.
    const volume = volumeById((productData as any)?.pocketGuideVolume)
    const pocketGuide = volume?.comingSoon ? undefined : volume

    return (
        <section id={id} className="scroll-mt-20">
            <SectionHeading>Questions?</SectionHeading>

            <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4 @xl/reader-content:gap-8 @2xl/reader-content:gap-12">
                <div>
                    <h3 className="mb-2 text-secondary !text-lg font-semibold">Answers</h3>

                    <p className="text-base text-secondary leading-relaxed mb-6">
                        There are a few ways you can get answers to specific questions about {productData.name}.
                    </p>
                    <ol className="pl-6">
                        <li className="list-decimal">
                            <Link to={`/docs/${productData.slug}`} className="underline font-bold">
                                Check the docs
                            </Link>
                            <p className="text-secondary text-base">
                                We have an entire <SmallTeam slug="docs-wizard" /> dedicated to docs gardening.
                            </p>
                        </li>
                        {pocketGuide && (
                            <li className="list-decimal">
                                <Link to={`/pocket-guides/${pocketGuide.id}`} className="underline font-bold">
                                    Read the pocket guide
                                </Link>
                                <p className="text-secondary text-base">
                                    A use case book you read start to finish. Each chapter ends in something to go do.
                                </p>
                            </li>
                        )}
                        <li className="list-decimal">
                            <Link to={forumUrl} className="underline font-bold">
                                Search the community forums
                            </Link>
                            <p className="text-secondary text-base">
                                {stats && stats.questions > 0 ? (
                                    <>
                                        {approxCount(stats.questions)} discussions about {productData.name}, there's
                                    </>
                                ) : (
                                    "There's "
                                )}{' '}
                                a good chance your answer is already answered!
                            </p>
                        </li>
                        <li className="list-decimal">
                            <Link
                                to={`#`}
                                onClick={() =>
                                    openNewChat({
                                        path: `ask-max-/${productData.slug}`,
                                        context: [
                                            {
                                                type: 'page',
                                                value: { path: `/${productData.slug}`, label: productData.name },
                                            },
                                        ],
                                    })
                                }
                                className="underline font-bold"
                            >
                                Ask PostHog AI <IconArrowUpRight className="inline-block size-4 opacity-75" />
                            </Link>
                            <p className="text-secondary text-base">
                                It's an incredibly useful AI chat that understands the product, docs, community
                                questions, our codebase, GitHub issues, and industry knowledge.
                            </p>
                        </li>

                        <li className="list-decimal">
                            <Link to="/talk-to-a-human" className="underline font-bold" state={{ newWindow: true }}>
                                Talk to a human <IconArrowUpRight className="inline-block size-4 opacity-75" />
                            </Link>
                            <p className="text-secondary text-base">
                                Dedicated humans are standing by and ready to assist. Best for questions about volume
                                pricing, terms, and sexy legal stuff.
                            </p>
                        </li>
                    </ol>
                </div>

                <div>
                    <h3 className="mb-2 text-secondary !text-lg font-semibold">Recent discussions</h3>

                    <CommunityQuestionsList
                        questions={questions}
                        isLoading={isLoading}
                        forumUrl={forumUrl}
                        currentPage={{
                            title: productData.name,
                            url: `/${slug}`,
                        }}
                    />

                    <div className="mt-6">
                        <OSButton2 to={forumUrl} state={{ newWindow: true }}>
                            View all questions
                            <IconArrowRight className="size-4" />
                        </OSButton2>
                    </div>

                    {productData?.teamSlug && (
                        <div className="mt-8 not-prose">
                            <h3 className="mb-3 text-secondary !text-lg font-semibold">Who builds this?</h3>
                            {/* Tilted so the crest reads as a sticker slapped on the page. */}
                            <SmallTeam
                                slug={productData.teamSlug}
                                variant="crest"
                                crestClassName="size-20 @lg/reader-content:size-24 -rotate-6 group-hover:-rotate-3"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CommunityQuestions
