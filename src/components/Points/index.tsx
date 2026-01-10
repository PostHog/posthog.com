import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Fieldset } from 'components/OSFieldset'
import Link from 'components/Link'
import { useUser } from 'hooks/useUser'
import RewardCard from './RewardCard'
import TransactionTitle from './TransactionTitle'
import type { Reward } from './types'

export default function Points() {
    const {
        allReward: { nodes: rewards },
    } = useStaticQuery<{ allReward: { nodes: Reward[] } }>(graphql`
        query {
            allReward {
                nodes {
                    id
                    handle
                    title
                    description
                    price
                    image
                    merchStoreHandle
                    discountAmount
                }
            }
        }
    `)
    const { user } = useUser()
    const transactions = user?.wallet?.transactions || []
    const total = user?.wallet?.balance || 0

    const [showHistory, setShowHistory] = useState(false)

    const nextReward = rewards.find((r) => r.price > total)
    const pointsToNext = nextReward ? nextReward.price - total : 0
    const progressToNext = nextReward ? (total / nextReward.price) * 100 : 100

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold tabular-nums text-green">{total.toLocaleString()}</span>
                        <span className="text-lg text-muted">points</span>
                    </div>
                    {nextReward && (
                        <p className="text-sm text-muted m-0">
                            <span className="font-bold text-green">{pointsToNext}</span> more for a{' '}
                            <strong className="text-primary">{nextReward.title}</strong>
                        </p>
                    )}
                </div>
                {nextReward && (
                    <div className="w-full bg-accent dark:bg-accent rounded-full h-2.5 border border-primary">
                        <div
                            className="bg-green h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(progressToNext, 100)}%` }}
                        />
                    </div>
                )}
                <div className="text-right !mt-1">
                    <Link
                        to="/community/achievements"
                        className="text-sm font-semibold text-red dark:text-yellow leading-none"
                        state={{ newWindow: true }}
                    >
                        How do I earn points?
                    </Link>
                </div>
            </div>

            <Fieldset legend="Redeem points">
                <div className="grid @md:grid-cols-2 @2xl:grid-cols-4 gap-3 pt-2">
                    {rewards.map((reward) => (
                        <RewardCard key={reward.handle} reward={reward} total={total} />
                    ))}
                </div>
            </Fieldset>

            {transactions.length > 0 && (
                <Fieldset legend="Recent activity">
                    <div className="pt-1">
                        {(() => {
                            const visibleCount = showHistory ? transactions.length : 3
                            const visibleTransactions = transactions.slice(0, visibleCount)
                            const hasMore = transactions.length > 3

                            return (
                                <>
                                    <div className="divide-y divide-primary/30">
                                        {visibleTransactions.map(
                                            ({
                                                id,
                                                amount,
                                                date,
                                                type,
                                                metadata,
                                            }: {
                                                id: number
                                                amount: number
                                                date: Date
                                                type: string
                                                metadata: any
                                            }) => (
                                                <div
                                                    key={id}
                                                    className="flex items-center py-2 first:pt-0 last:pb-0 gap-3"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <TransactionTitle
                                                            type={type}
                                                            metadata={metadata as any}
                                                            date={date}
                                                        />
                                                    </div>
                                                    <span
                                                        className={`font-mono font-bold text-base text-right shrink-0 whitespace-nowrap ${
                                                            amount > 0 ? 'text-green' : 'text-red'
                                                        }`}
                                                    >
                                                        {amount > 0 ? '+' : ''}
                                                        {amount.toLocaleString()}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {hasMore && (
                                        <button
                                            onClick={() => setShowHistory(!showHistory)}
                                            className="text-sm text-muted hover:text-primary transition-colors mt-2 w-full text-center py-1"
                                        >
                                            {showHistory ? 'Show less' : `View all ${transactions.length} transactions`}
                                        </button>
                                    )}
                                </>
                            )
                        })()}
                    </div>
                </Fieldset>
            )}
        </div>
    )
}
