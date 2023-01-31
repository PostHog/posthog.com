import Post from './Post'
import { PostProvider, defaultMenuWidth } from './context'
import { IProps } from './types'
import React from 'react'

export default function PostLayout({ children, ...other }: IProps & { children: React.ReactNode }) {
    return (
        <PostProvider value={other}>
            <Post>{children}</Post>
        </PostProvider>
    )
}
