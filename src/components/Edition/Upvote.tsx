import React, { useContext, useEffect, useState } from 'react'
import { PostsContext } from './Posts'
import { useUser } from 'hooks/useUser'
import { IconTriangleUpFilled } from '@posthog/icons'

export default function Upvote({ className = '', id, slug }: { id: number; slug: string; className?: string }) {
    const { setLoginModalOpen } = useContext(PostsContext)
    const [liked, setLiked] = useState(false)
    const { likePost, user } = useUser()

    const handleClick = (e) => {
        e.preventDefault()
        if (!user) {
            setLoginModalOpen(true)
        } else {
            setLiked(!liked)
            likePost(id, liked, slug)
        }
    }

    useEffect(() => {
        setLiked(user?.profile?.postLikes?.some((post) => post.id === id))
    }, [user, id])

    return id ? (
        <div className={className}>
            <div className="pb-1">
                <strong className="text-sm">Was this post useful?</strong>
            </div>
            <button
                onClick={handleClick}
                className={`flex items-center relative px-2 pt-1.5 pb-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent  active:transition-all group space-x-1 md:border-light dark:md:border-dark ${
                    liked ? '' : ' hover:translate-y-[-1px] active:translate-y-[1px]'
                }`}
            >
                <span
                    className={`group relative w-4 transition-all ${
                        liked
                            ? ''
                            : 'group-hover:scale-[1.01] group-hover:top-[-.5px] group-active:scale-[.98] group-active:top-[.5px] group-disabled:opacity-60'
                    }`}
                >
                    {liked ? (
                        <IconTriangleUpFilled className="text-red" />
                    ) : (
                        <IconTriangleUpFilled className="opacity-50 group-hover:opacity-75" />
                    )}
                </span>
                <span className="text-sm font-medium">{liked ? 'Upvoted' : 'Upvote this post'}</span>
            </button>
        </div>
    ) : null
}
