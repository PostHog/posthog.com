import React, { useEffect, useState } from 'react'
import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'
import { navigate } from 'gatsby'
import Link from 'components/Link'
import { RightArrow } from 'components/Icons'
import CommunityLayout from 'components/Community/Layout'
import useTopicsNav from '../../../navs/useTopicsNav'
import Select from 'components/Select'
import { useUser } from 'hooks/useUser'

interface ITopic {
    label: string
    slug: string
}

interface IProps {
    data: {
        squeakTopic: {
            id: string
            squeakId: number
            label: string
        }
    }
    pageContext: {
        id: string
        topics: ITopic[]
        slug: string
    }
}

export default function Questions({ location }: IProps) {
    const { isModerator } = useUser()
    const [sortBy, setSortBy] = useState<'newest' | 'activity' | 'popular'>('activity')
    const [helpful, setHelpful] = useState('all')
    const title = 'Max AI questions'

    const { questions, isLoading, fetchMore, hasMore } = useQuestions({
        limit: 20,
        sortBy,
        filters: {
            $and: [
                {
                    askedMax: {
                        $eq: true,
                    },
                    replies: {
                        profile: {
                            id: {
                                $eq: 28378,
                            },
                        },
                    },
                },
                {
                    ...(helpful === 'all'
                        ? null
                        : {
                              replies: {
                                  helpful: { $eq: helpful === 'helpful' },
                              },
                          }),
                },
            ],
        },
    })

    const topicsNav = useTopicsNav()
    const backTo = location?.state?.previous

    useEffect(() => {
        if (!isModerator) {
            navigate('/questions')
        }
    }, [isModerator])

    return (
        <CommunityLayout menu={topicsNav} title="Max AI">
            <section className="max-w-screen-4xl space-y-8 pb-12 -mx-3 lg:-mx-4 xl:-mx-10">
                <div className="w-full flex items-center">
                    <Link
                        to={backTo?.url || '/questions'}
                        className="inline-flex space-x-1 items-center relative px-2 pt-1.5 pb-1 mb-1 rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                    >
                        <RightArrow className="-scale-x-100 w-6" />
                        <span className="text-primary dark:text-primary-dark text-[15px]">
                            Back to {backTo?.title || 'questions'}
                        </span>
                    </Link>
                </div>
                <div className="w-full sm:flex sm:items-center mb-4 !mt-0">
                    <div className="flex space-x-4 items-baseline">
                        <h1 className="text-4xl m-0">{title}</h1>
                    </div>
                    <div className="ml-auto sm:mt-0 flex">
                        <Select
                            placeholder="Max helpful"
                            value={helpful}
                            onChange={setHelpful}
                            options={['All', 'Helpful', 'Unhelpful'].map((option) => ({
                                value: option.toLowerCase(),
                                label: option,
                            }))}
                        />
                        <Select
                            placeholder="Sort by"
                            value={sortBy}
                            onChange={setSortBy}
                            options={['Newest', 'Activity', 'Popular'].map((option) => ({
                                value: option.toLowerCase(),
                                label: option,
                            }))}
                        />
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <QuestionsTable
                        showStatus
                        showBody
                        hasMore={hasMore}
                        className="sm:grid-cols-4"
                        questions={questions}
                        isLoading={isLoading}
                        fetchMore={fetchMore}
                        sortBy={sortBy}
                        currentPage={{
                            title: 'Max AI',
                            url: `/questions/topic/max`,
                        }}
                    />
                </div>
            </section>
        </CommunityLayout>
    )
}
