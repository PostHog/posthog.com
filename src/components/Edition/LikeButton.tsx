import { useUser } from 'hooks/useUser'
import React, { useContext, useEffect, useState } from 'react'
import Tooltip from 'components/Tooltip'
import { IconTriangleUpFilled } from '@posthog/icons'
import { PostsContext } from './Posts'

export default function LikeButton({ className = '', postID, slug }: { postID: number; slug: string }) {
    const { setLoginModalOpen } = useContext(PostsContext)
    const [liked, setLiked] = useState(false)
    const { likePost, user } = useUser()

    const handleClick = (e) => {
        e.preventDefault()
        if (!user) {
            setLoginModalOpen(true)
        } else {
            setLiked(!liked)
            likePost(postID, liked, slug)
        }
    }

    useEffect(() => {
        setLiked(user?.profile?.postLikes?.some((post) => post.id === postID))
    }, [user, postID])

    return (
        <button
            className={`w-full flex justify-center items-center h-full relative p-1.5 transition-all hover:scale-[1.01] hover:top-[-.5px] active:scale-[.98] active:top-[.5px] ${className}`}
            onClick={handleClick}
        >
            <span className="w-4">
                {liked ? (
                    <IconTriangleUpFilled className="text-red" />
                ) : (
                    <Tooltip content="Upvote this post">
                        <span className="relative">
                            <IconTriangleUpFilled className="opacity-50 hover:opacity-75" />
                        </span>
                    </Tooltip>
                )}
            </span>
        </button>
    )
}
