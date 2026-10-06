import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconChevronDown, IconTriangleUp, IconTriangleUpFilled } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { useForumPost } from './hooks'

// Post upvotes. The count updates at once and takes the server's value when the request returns.
export default function VoteBox({
    postId,
    numUpvotes = 0,
    hasUpvoted = false,
    inline = false,
}: {
    postId: number
    numUpvotes?: number
    hasUpvoted?: boolean
    // A text button for the row under a post. The default is the tall box beside a post.
    inline?: boolean
}) {
    const { user } = useUser()
    const { openSignIn } = useApp()
    const { setUpvote } = useForumPost()
    const [vote, setVote] = useState({ numUpvotes, hasUpvoted })
    const [loading, setLoading] = useState(false)

    useEffect(() => setVote({ numUpvotes, hasUpvoted }), [numUpvotes, hasUpvoted])

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!user) return openSignIn()
        if (loading) return
        const upvote = !vote.hasUpvoted
        // A failed request (for example, a throttled one) goes back to the state before this click, not to the
        // state the page first loaded with.
        const previous = vote
        setLoading(true)
        setVote({ hasUpvoted: upvote, numUpvotes: vote.numUpvotes + (upvote ? 1 : -1) })
        try {
            setVote(await setUpvote(postId, upvote))
        } catch {
            setVote(previous)
        }
        setLoading(false)
    }

    // An upvote rolls the number up and a removed vote rolls it down; the box pops a little on each click.
    const direction = vote.hasUpvoted ? 1 : -1

    if (inline) {
        return (
            <button
                onClick={handleClick}
                aria-pressed={vote.hasUpvoted}
                aria-label={vote.hasUpvoted ? 'Remove upvote' : 'Upvote'}
                className={`inline-flex items-center gap-1 rounded px-1.5 py-1 text-sm hover:bg-accent ${
                    vote.hasUpvoted ? 'text-red dark:text-yellow' : 'text-secondary'
                }`}
            >
                <IconChevronDown className="size-4 rotate-180" />
                <span className="tabular-nums">{vote.numUpvotes}</span>
            </button>
        )
    }

    return (
        <motion.button
            onClick={handleClick}
            whileTap={{ scale: 0.92 }}
            aria-pressed={vote.hasUpvoted}
            aria-label={vote.hasUpvoted ? 'Remove upvote' : 'Upvote'}
            className={`w-11 shrink-0 self-start flex flex-col items-center rounded border py-1 transition-colors ${
                vote.hasUpvoted
                    ? 'border-red text-red dark:border-yellow dark:text-yellow'
                    : 'border-primary text-muted hover:border-secondary'
            }`}
        >
            <motion.span
                key={String(vote.hasUpvoted)}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 600, damping: 18 }}
                className="flex"
            >
                {vote.hasUpvoted ? <IconTriangleUpFilled className="size-3" /> : <IconTriangleUp className="size-3" />}
            </motion.span>
            <span className="relative h-5 overflow-hidden">
                <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                    <motion.span
                        key={vote.numUpvotes}
                        custom={direction}
                        variants={{
                            enter: (d: number) => ({ y: d * 12, opacity: 0 }),
                            center: { y: 0, opacity: 1 },
                            exit: (d: number) => ({ y: d * -12, opacity: 0 }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className={`block text-sm font-bold leading-5 ${vote.hasUpvoted ? '' : 'text-primary'}`}
                    >
                        {vote.numUpvotes}
                    </motion.span>
                </AnimatePresence>
            </span>
        </motion.button>
    )
}
