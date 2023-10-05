import React, { useContext } from 'react'
import LikeButton from './LikeButton'
import { PostContext } from './Posts'

export default function Title({ children, className = '' }: { children: React.ReactNode }) {
    const { postID } = useContext(PostContext)

    return (
        <div className="flex space-x-2 items-center mb-1 md:mb-4 mt-6 lg:mt-1">
            {postID && <LikeButton className="flex-shrink-0" postID={postID} />}
            <h1 className={`text-3xl md:text-4xl lg:text-4xl m-0 ${className}`}>{children}</h1>
        </div>
    )
}
