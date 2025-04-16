import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useQuestions } from 'hooks/useQuestions'
import HeaderBar from 'components/OSChrome/HeaderBar'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { TreeMenu } from 'components/TreeMenu'
import useProduct from 'hooks/useProduct'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'components/Link'
import { Question } from 'components/Squeak'
import { useLocation } from '@reach/router'
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
    const { pathname } = useLocation()
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
    const [topHeight, setTopHeight] = useState(50)

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
                        <div style={{ height: permalink ? `${topHeight}%` : '100%' }} className="min-h-0">
                            <ScrollArea className="h-full">
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
                                        const active = `/questions/${permalink}` === pathname
                                        return (
                                            <Link
                                                to={`/questions/${permalink}`}
                                                key={question.id}
                                                className={`flex items-center px-4 py-3 border-b border-primary text-sm w-full text-left hover:bg-accent-2/50 !text-inherit ${
                                                    active ? '!bg-accent-2' : ''
                                                }`}
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
                            </ScrollArea>
                        </div>

                        {permalink && (
                            <div style={{ height: `${100 - topHeight}%` }} className="min-h-0 relative">
                                <motion.div
                                    data-scheme="tertiary"
                                    className="h-1.5 cursor-ns-resize top-0 left-0 !transform-none absolute z-10 w-full hover:bg-accent active:bg-accent"
                                    drag="y"
                                    dragMomentum={false}
                                    dragConstraints={{ top: 0, bottom: 0 }}
                                    onDrag={(_event, info) => {
                                        const newTopHeight = Math.min(
                                            Math.max(topHeight + (info.delta.y / window.innerHeight) * 100, 20),
                                            80
                                        )
                                        setTopHeight(newTopHeight)
                                    }}
                                />
                                <ScrollArea className="h-full">
                                    <div>
                                        <div className="bg-accent px-4 py-2">
                                            <button className="font-bold text-sm">Reply</button>
                                        </div>
                                        <div className="p-5">
                                            <Question id={permalink} />
                                        </div>
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
