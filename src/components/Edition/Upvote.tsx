import React, { useContext, useEffect, useState } from 'react'
import LikeButton from './LikeButton'
import { PostContext } from './Posts'
import { Heart } from 'components/Icons'
import Tooltip from 'components/Tooltip'
import { useUser } from 'hooks/useUser'

export default function Upvote({ children, className = '' }: { children: React.ReactNode }) {
    const { postID } = useContext(PostContext)
    const [liked, setLiked] = useState(false)
    const { likePost, user } = useUser()

    const handleClick = (e) => {
        e.preventDefault()
        setLiked(!liked)
        likePost(postID, liked)
    }

    useEffect(() => {
        setLiked(user?.profile?.postLikes?.some((post) => post.id === postID))
    }, [user, postID])

    return postID ? (
        <button
            disabled={!user}
            onClick={handleClick}
            className="mx-2 gap-1 flex items-center relative px-2 pt-1.5 pb-1 mb-4 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
        >
            <span
                className={`rounded-full flex justify-center items-center p-1.5 w-8 h-8 relative transition-all hover:scale-[1.01] hover:top-[-.5px] active:scale-[.98] active:top-[.5px] active:text-red active:bg-red/20 dark:active:text-red dark:active:bg-red/20 ${
                    liked
                        ? 'text-red bg-red/20'
                        : 'bg-border/50 hover:bg-border/75 dark:bg-border-dark/50 dark:hover:bg-border-dark/75 text-primary/50 dark:text-primary-dark/50 hover:text-primary/75 dark:hover:text-primary-dark/75 disabled:opacity-60'
                } ${className}`}
            >
                {user ? (
                    <Heart className="w-full h-auto" active={liked} />
                ) : (
                    <Tooltip content="Sign in to like this post">
                        <span className="relative">
                            <Heart className="w-full h-auto" active={liked} />
                        </span>
                    </Tooltip>
                )}
            </span>
            {!liked && <span className="text-sm">Like this post?</span>}
        </button>
    ) : null
}
