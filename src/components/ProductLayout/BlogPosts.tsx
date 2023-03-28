import React from 'react'
import { IBlogPosts } from './types'
import { Post } from '../Blog'
import { SectionWrapper } from './Section'

export default function BlogPosts({ posts, title }: IBlogPosts) {
    return (
        posts &&
        posts?.length > 0 && (
            <SectionWrapper>
                <div className="max-w-2xl mx-auto">
                    <h3>{title}</h3>
                    <ul className="list-none m-0 p-0 space-y-4">
                        {posts.map((post: any) => {
                            const {
                                node: {
                                    id,
                                    frontmatter: { date, title, featuredImage, authors, category },
                                    fields: { slug },
                                },
                            } = post

                            return (
                                <li
                                    className="relative hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99] shadow-lg after:border-0 hover:after:border-1 after:border-black/25 after:rounded-md after:-inset-1.5 after:absolute"
                                    key={id}
                                >
                                    <Post
                                        date={date}
                                        title={title}
                                        featuredImage={featuredImage}
                                        authors={authors}
                                        category={category}
                                        slug={slug}
                                        imgClassName="w-full"
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </SectionWrapper>
        )
    )
}
