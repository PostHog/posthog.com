import React, { useContext, useEffect, useState } from 'react'
import { PostContext, PostsContext } from './Posts'
import { Heart } from 'components/Icons'
import { useUser } from 'hooks/useUser'
import { IconTriangleUp, IconTriangleUpFilled } from '@posthog/icons'

export default function Upvote({ className = '' }: { children: React.ReactNode }) {
    const { postID } = useContext(PostContext)
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

    return postID ? (
        <button
            onClick={handleClick}
            className={`gap-1 flex items-center relative px-2 pt-1.5 pb-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all group space-x-1 ${className}`}
        >
            <span
                className={`relative w-5 transition-all group-hover:scale-[1.01] group-hover:top-[-.5px] group-active:scale-[.98] group-active:top-[.5px] ${
                    liked ? '' : 'group-disabled:opacity-60'
                }`}
            >
                {liked ? <IconTriangleUpFilled /> : <IconTriangleUp />}
            </span>
            <span className="text-sm">{liked ? 'Liked' : 'Like this post?'}</span>
        </button>
    ) : null
}
