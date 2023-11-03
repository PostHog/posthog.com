import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import Tooltip from 'components/Tooltip'
import { IconTriangleUp, IconTriangleUpFilled } from '@posthog/icons'

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
            className={`w-full flex justify-center items-center h-full relative transition-all hover:scale-[1.01] hover:top-[-.5px] active:scale-[.98] active:top-[.5px] ${
                liked ? '' : 'disabled:opacity-60'
            } ${className}`}
            onClick={handleClick}
        >
            <span className="w-5">
                {user ? (
                    liked ? (
                        <IconTriangleUpFilled />
                    ) : (
                        <IconTriangleUp />
                    )
                ) : (
                    <Tooltip content="Sign in to like this post">
                        <span className="relative">
                            <IconTriangleUp />
                        </span>
                    </Tooltip>
                )}
            </span>
        </button>
    )
}
