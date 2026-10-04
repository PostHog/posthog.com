import CloudinaryImage from 'components/CloudinaryImage'
import Avatar from 'components/CommunityQuestions/Avatar'
import Link from 'components/Link'
import Toggle from 'components/Toggle'
import React from 'react'
import { ResponsiveImage } from 'components/Image'
import type { PostCard } from '../../lib/content/posts'

interface IPost extends Omit<PostCard, 'id'> {
    imgClassName?: string
}

export const Post = ({ featuredImage: image, slug, title, category, date, authors, imgClassName }: IPost) => {
    return (
        <div className="relative rounded-md overflow-hidden z-10 h-full w-full">
            <Link className="!text-white !hover:text-white cta" to={slug}>
                {image ? (
                    <ResponsiveImage alt={title} className={imgClassName ?? 'w-full'} image={image} />
                ) : (
                    <CloudinaryImage
                        className={imgClassName ?? 'w-full'}
                        alt={title}
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Blog/images/default.jpg"
                    />
                )}
                <div className="bg-gradient-to-b from-black/50 via-black/20  to-black/50 absolute inset-0 px-4 py-3 md:p-5 flex flex-col h-full w-full">
                    {category && <p className="m-0 text-sm opacity-80">{category}</p>}
                    <h3 className="m-0 leading-tight md:leading-7 [text-shadow:0_2px_10px_rgba(0,0,0,0.4)] line-clamp-3 !mt-0 text-xl md:text-2xl">
                        {title}
                    </h3>
                    <p className="m-0 !text-sm font-light mt-1">{date}</p>
                    <ul className="list-none m-0 p-0 mt-auto space-x-4 hidden md:flex">
                        {authors?.slice(0, 2).map(({ name, avatar }) => {
                            return (
                                <li className="flex space-x-2 items-center" key={name}>
                                    <Avatar url={avatar} image={undefined} />
                                    <span>{name}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </Link>
        </div>
    )
}

export const Posts = ({
    posts,
    title,
    action,
    titleBorder,
}: {
    posts: PostCard[]
    title?: React.ReactNode
    action?: React.ReactNode
    titleBorder?: boolean
}) => {
    return (
        <section className="mb-6">
            {title && (
                <div
                    className={
                        titleBorder
                            ? 'pb-2 mb-5 flex justify-between items-center'
                            : 'pb-2 mb-2 flex justify-between items-center'
                    }
                >
                    <h4 className="text-lg m-0">{title}</h4>
                    <div>{action}</div>
                </div>
            )}
            <ul className="list-none m-0 p-0 grid md:grid-cols-2 gap-4">
                {posts.map(({ id, date, title, featuredImage, authors, category, slug }) => {
                    return (
                        <li
                            className="relative active:top-[1px] active:scale-[.99] shadow-lg after:rounded-md after:-inset-1.5 after:absolute"
                            key={id}
                        >
                            <Post
                                date={date}
                                title={title}
                                featuredImage={featuredImage}
                                authors={authors}
                                category={category}
                                slug={slug}
                            />
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export const PostToggle = ({ onChange, checked }) => {
    return (
        <Toggle
            iconLeft={<span className="text-sm">Latest</span>}
            iconRight={<span className="text-sm">Popular</span>}
            onChange={onChange}
            checked={checked}
        />
    )
}
