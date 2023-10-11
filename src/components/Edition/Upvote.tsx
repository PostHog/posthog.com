import React, { useContext } from 'react'
import LikeButton from './LikeButton'
import { PostContext } from './Posts'

export default function Upvote({ children, className = '' }: { children: React.ReactNode }) {
    const { postID } = useContext(PostContext)

    return (
        <div className="mx-2 gap-1 flex items-center relative px-2 pt-1.5 pb-1 mb-4 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all">
            {postID && <LikeButton className="flex-shrink-0" postID={postID} />}
            <span className="text-sm">Like this post?</span>
        </div>
    )
}
