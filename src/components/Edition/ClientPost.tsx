import { CallToAction } from 'components/CallToAction'
import Modal from 'components/Modal'
import ClientPostMarkdown from 'components/Squeak/components/ClientPostMarkdown'
import { ZoomImage } from 'components/ZoomImage'
import SEO from 'components/seo'
import dayjs from 'dayjs'
import { useUser } from 'hooks/useUser'
import React, { useContext, useState } from 'react'
import NewPost from './NewPost'
import { navigate } from 'gatsby'
import { PostsContext } from './Posts'
import Title from './Title'
import { useLayoutData } from 'components/Layout/hooks'
import Upvote from './Upvote'
import { QuestionForm } from 'components/Squeak'
import { useLocation } from '@reach/router'
import { Contributors } from '../../templates/BlogPost'

export const Post = ({ imageURL, title, date, belowTitle, body, cta, transformImageUri }) => {
    return (
        <>
            {imageURL && (
                <div className="rounded bg-accent dark:bg-accent-dark leading-none max-h-96 text-center">
                    <ZoomImage>
                        {imageURL?.endsWith('.mp4') ? (
                            <video className="max-w-full max-h-96 rounded-md" autoPlay src={imageURL} />
                        ) : (
                            <img className="max-w-full max-h-96 rounded-md" src={imageURL} />
                        )}
                    </ZoomImage>
                </div>
            )}
            <div className={`flex flex-col`}>
                <Title>{title}</Title>
                <p className="!mb-0">
                    <span className="opacity-70">{dayjs(date).format('MMM DD, YYYY')}</span>

                    {belowTitle?.()}
                </p>
            </div>
            <div className="my-2 article-content">
                <ClientPostMarkdown transformImageUri={transformImageUri}>{body}</ClientPostMarkdown>
            </div>
            {cta?.label && cta?.url && (
                <CallToAction size="md" type="outline" externalNoIcon to={cta.url}>
                    {cta.label}
                </CallToAction>
            )}
        </>
    )
}

export default function ClientPost({
    id,
    title,
    featuredImage,
    date,
    body,
    CTA,
    publishedAt,
    post_category,
    excerpt,
    getPost,
    authors,
}: {
    title: string
    featuredImage?: { url: string }
    date: string
    body: string
    CTA?: { url: string; label: string }
    publishedAt: string
    post_category: { data: { id: number } }
    id: number
    excerpt: string
    getPost: () => Promise<void>
    authors: any
}) {
    const { pathname } = useLocation()
    const { fullWidthContent } = useLayoutData()
    const { mutate } = useContext(PostsContext)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [editPostModalOpen, setEditPostModalOpen] = useState(false)
    const { getJwt, isModerator } = useUser()
    const imageURL = featuredImage?.image?.data?.attributes?.url || featuredImage?.url
    const handleNewPostSubmit = () => {
        setEditPostModalOpen(false)
        getPost()
    }
    const handleDeletePost = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true)
        } else {
            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${await getJwt()}`,
                },
            })
            await mutate?.()
            navigate('/posts')
        }
    }
    const author = authors?.data?.[0]

    return (
        <div className="@container">
            <div className="flex flex-col-reverse @3xl:flex-row">
                <div className={`article-content flex-1 transition-all md:pt-8 w-full overflow-auto`}>
                    <div
                        className={`mx-auto transition-all ${
                            fullWidthContent ? 'max-w-full' : 'max-w-3xl'
                        }  md:px-8 2xl:px-12`}
                    >
                        <Modal open={editPostModalOpen} setOpen={setEditPostModalOpen}>
                            <NewPost
                                postID={id}
                                initialValues={{
                                    title,
                                    featuredImage: imageURL,
                                    body,
                                    ctaURL: CTA?.url,
                                    ctaLabel: CTA?.label,
                                    category: post_category?.data?.id,
                                    excerpt,
                                }}
                                onSubmit={handleNewPostSubmit}
                            />
                        </Modal>
                        <SEO title={title + ' - PostHog'} />
                        <article>
                            <Post
                                imageURL={null}
                                title={title}
                                date={date || publishedAt}
                                belowTitle={() =>
                                    isModerator ? (
                                        <div className="ml-3 text-sm inline-flex space-x-2 text-primary/50 dark:text-primary-dark/50">
                                            <button
                                                onClick={() => setEditPostModalOpen(true)}
                                                className="text-red dark:text-yellow font-semibold"
                                            >
                                                Edit post
                                            </button>
                                            <span>|</span>
                                            <button onClick={handleDeletePost} className="text-red font-semibold">
                                                {confirmDelete ? 'Click again to confirm' : 'Delete post'}
                                            </button>
                                        </div>
                                    ) : null
                                }
                                body={body}
                                cta={CTA}
                            />
                            <Upvote className="mt-6" />
                            <div className={`mt-12 mx-auto pb-20 ${fullWidthContent ? 'max-w-full' : 'max-w-4xl'}`}>
                                <QuestionForm
                                    disclaimer={false}
                                    subject={false}
                                    buttonText="Leave a comment"
                                    slug={pathname}
                                />
                            </div>
                        </article>
                    </div>
                </div>
                <aside
                    className={`shrink-0 basis-72 @3xl:reasonable:sticky @3xl:reasonable:overflow-auto max-h-64 overflow-auto @3xl:max-h-[calc(100vh_-_108px)] @3xl:top-[108px] w-full border-x border-border dark:border-dark pt-4 xl:block hidden`}
                >
                    <Upvote className="px-4 mb-4" />
                    {author && (
                        <Contributors
                            contributors={[
                                {
                                    profile_id: author.id,
                                    image:
                                        author.attributes?.avatar?.data?.attributes?.url ||
                                        author.attributes.gravatarURL,
                                    name: [author.attributes?.firstName, author.attributes?.lastName]
                                        .filter(Boolean)
                                        .join(' '),
                                },
                            ]}
                        />
                    )}
                </aside>
            </div>
        </div>
    )
}
