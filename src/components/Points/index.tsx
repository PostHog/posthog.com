import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IconShieldLock } from '@posthog/icons'
import { Fieldset } from 'components/OSFieldset'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import { useUser } from 'hooks/useUser'
import RewardCard from './RewardCard'
import TransactionTitle from './TransactionTitle'
import type { Reward, Wallet } from './types'

interface PointsProps {
    /** The wallet to display. Only read when `readOnly` is set. */
    wallet?: Wallet | null
    /** Moderator view of someone else's balance: hides the redeem section. */
    readOnly?: boolean
    /** Used in the read-only empty state. */
    firstName?: string
}

export default function Points({ wallet: walletProp, readOnly = false, firstName }: PointsProps = {}) {
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
    // Keyed off `readOnly` rather than `walletProp` presence: members who've never earned
    // points have no wallet at all, and falling back would show the moderator their own balance.
    const wallet = readOnly ? walletProp : user?.wallet
    const transactions = wallet?.transactions || []
    const total = wallet?.balance || 0

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
                        {readOnly && (
                            <Tooltip
                                delay={0}
                                className="inline-flex items-center text-secondary"
                                trigger={<IconShieldLock className="size-4" />}
                            >
                                Only visible to moderators
                            </Tooltip>
                        )}
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
                {!readOnly && (
                    <div className="text-right !mt-1">
                        <Link
                            to="/community/achievements"
                            className="text-sm font-semibold text-red dark:text-yellow leading-none"
                            state={{ newWindow: true }}
                        >
                            How do I earn points?
                        </Link>
                    </div>
                )}
            </div>

            {!readOnly && (
                <Fieldset legend="Redeem points">
                    <div className="grid @md:grid-cols-2 @2xl:grid-cols-4 gap-3 pt-2">
                        {rewards.map((reward) => (
                            <RewardCard key={reward.handle} reward={reward} total={total} />
                        ))}
                    </div>
                </Fieldset>
            )}

            {transactions.length <= 0 && readOnly && (
                <Fieldset legend="Recent activity">
                    <p className="text-sm text-muted m-0 py-1">
                        {firstName ? `${firstName} hasn't earned any points yet` : 'No activity yet'}
                    </p>
                </Fieldset>
            )}

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
                                        {visibleTransactions.map(({ id, amount, date, type, metadata }) => (
                                            <div key={id} className="flex items-center py-2 first:pt-0 last:pb-0 gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <TransactionTitle type={type} metadata={metadata} date={date} />
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
                                        ))}
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
