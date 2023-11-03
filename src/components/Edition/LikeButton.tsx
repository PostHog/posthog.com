import { useUser } from 'hooks/useUser'
import React, { useContext, useEffect, useState } from 'react'
import Tooltip from 'components/Tooltip'
import { IconTriangleUp, IconTriangleUpFilled } from '@posthog/icons'
import { PostsContext } from './Posts'

export default function LikeButton({ className = '', postID }: { postID: number }) {
    const { setLoginModalOpen } = useContext(PostsContext)
    const [liked, setLiked] = useState(false)
    const { likePost, user } = useUser()

    const handleClick = (e) => {
        e.preventDefault()
        if (!user) {
            setLoginModalOpen(true)
        } else {
            setLiked(!liked)
            likePost(postID, liked)
        }
    }

    useEffect(() => {
        setLiked(user?.profile?.postLikes?.some((post) => post.id === postID))
    }, [user, postID])

    return (
        <button
            className={`w-full flex justify-center items-center h-full relative transition-all hover:scale-[1.01] hover:top-[-.5px] active:scale-[.98] active:top-[.5px] ${className}`}
            onClick={handleClick}
        >
            <span className="w-5">{liked ? <IconTriangleUpFilled /> : <IconTriangleUp />}</span>
        </button>
    )
}
