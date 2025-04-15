import React, { useEffect, useState } from 'react'
import { useQuestions } from 'hooks/useQuestions'
import HeaderBar from 'components/OSChrome/HeaderBar'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { TreeMenu } from 'components/TreeMenu'
import useProduct from 'hooks/useProduct'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'components/Link'
import { Question } from 'components/Squeak'
dayjs.extend(relativeTime)

const Menu = () => {
    const products = useProduct()
    return (
        <TreeMenu
            items={[
                {
                    name: 'Products',
                    children: products.map((product) => {
                        return {
                            name: product.name,
                            url: `/questions/topic${product.slug}`,
                        }
                    }),
                },
            ]}
        />
    )
}

export default function Inbox(props) {
    const { data, params } = props
    const initialTopicID = data?.topic?.squeakId
    const permalink = params?.permalink
    const [topicID, setTopicID] = useState(initialTopicID)
    const { questions, isLoading, fetchMore, hasMore, refresh } = useQuestions({
        limit: 20,
        sortBy: 'activity',
        topicId: topicID,
        filters: {
            subject: {
                $ne: '',
            },
            slugs: {
                slug: {
                    $notContainsi: '/community/profiles',
                },
            },
        },
    })

    useEffect(() => {
        if (initialTopicID && initialTopicID !== topicID) {
            setTopicID(initialTopicID)
        }
    }, [initialTopicID])

    return (
        <div className="@container w-full h-full flex flex-col">
            <HeaderBar showHome showBack showForward showSearch />
            <div data-scheme="secondary" className="flex flex-grow border-t border-primary min-h-0">
                <aside data-scheme="secondary" className="w-64 bg-primary border-r border-primary h-full p-2">
                    <Menu />
                </aside>
                <main data-scheme="secondary" className="flex-1 bg-primary">
                    <div className="flex flex-col h-full">
                        <ScrollArea>
                            <div className="h-1/2">
                                <div className="flex items-center px-4 py-2 border-b border-primary font-semibold bg-secondary text-sm bg-accent-2 sticky top-0">
                                    <div className="flex-1">Subject</div>
                                    <div className="w-24 text-center">Replies</div>
                                    <div className="w-36 text-center">Last updated</div>
                                    <div className="w-32 text-center">Latest activity</div>
                                </div>
                                <div>
                                    {questions.data?.map((question) => {
                                        const {
                                            attributes: { subject, numReplies, activeAt, replies, profile, permalink },
                                        } = question
                                        const latestAuthor =
                                            replies?.data?.[replies.data.length - 1]?.attributes?.profile || profile
                                        return (
                                            <Link
                                                to={`/questions/${permalink}`}
                                                key={question.id}
                                                className="flex items-center px-4 py-3 border-b border-primary text-sm w-full text-left hover:bg-accent-2/50 !text-inherit"
                                            >
                                                <div className="flex-1">{subject}</div>
                                                <div className="w-24 text-center">{numReplies}</div>
                                                <div className="w-36 text-center">{dayjs(activeAt).fromNow()}</div>
                                                <div className="w-32 text-center">
                                                    {latestAuthor?.data.attributes.firstName}
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </ScrollArea>
                        {permalink && (
                            <ScrollArea>
                                <div className="h-1/2 p-5">
                                    <Question id={permalink} />
                                </div>
                            </ScrollArea>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
