import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import { Heart } from 'components/Icons'
import Tooltip from 'components/Tooltip'

export default function LikeButton({ className = '', postID }: { postID: number }) {
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

    return (
        <button
            disabled={!user}
            className={`rounded-full flex justify-center items-center p-1.5 w-8 h-8 relative transition-all hover:scale-[1.01] hover:top-[-.5px] active:scale-[.98] active:top-[.5px] active:text-red active:bg-red/20 dark:active:text-red dark:active:bg-red/20 ${
                liked
                    ? 'text-red bg-red/20'
                    : 'bg-border/50 hover:bg-border/75 dark:bg-border-dark/50 dark:hover:bg-border-dark/75 text-primary/50 dark:text-primary-dark/50 hover:text-primary/75 dark:hover:text-primary-dark/75 disabled:opacity-60'
            } ${className}`}
            onClick={handleClick}
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
        </button>
    )
}
