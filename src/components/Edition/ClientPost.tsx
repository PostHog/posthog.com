import { CallToAction } from 'components/CallToAction'
import Modal from 'components/Modal'
import Markdown from 'components/Squeak/components/Markdown'
import { ZoomImage } from 'components/ZoomImage'
import SEO from 'components/seo'
import dayjs from 'dayjs'
import { useUser } from 'hooks/useUser'
import React, { useContext, useState } from 'react'
import NewPost from './NewPost'
import { navigate } from 'gatsby'
import { PostsContext } from './Posts'
import Title from './Title'

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
}) {
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

    return (
        <>
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
            <div className={`flex flex-col py-4`}>
                <Title>{title}</Title>
                <p className="m-0">
                    <span className="opacity-70">{dayjs(date || publishedAt).format('MMM DD, YYYY')}</span>

                    {isModerator && (
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
                    )}
                </p>
            </div>
            <div className="my-2 article-content">
                <Markdown>{body}</Markdown>
            </div>
            {CTA?.label && CTA?.url && (
                <CallToAction size="md" type="outline" to={CTA.url}>
                    {CTA.label}
                </CallToAction>
            )}
        </>
    )
}
