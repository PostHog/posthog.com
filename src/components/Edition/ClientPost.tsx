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

export default function ClientPost({
    id,
    title,
    featuredImage,
    date,
    body,
    CTA,
    publishedAt,
    post_category,
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
                    }}
                    onSubmit={handleNewPostSubmit}
                />
            </Modal>
            <SEO title={title + ' - PostHog'} />
            {imageURL && (
                <div className="max-w-lg">
                    <ZoomImage>
                        {imageURL?.endsWith('.mp4') ? (
                            <video className="w-full rounded-md" autoPlay src={imageURL} />
                        ) : (
                            <img className="w-full rounded-md" src={imageURL} />
                        )}
                    </ZoomImage>
                </div>
            )}
            <div className={`flex flex-col py-4`}>
                <p className="m-0 opacity-70 order-last lg:order-first">
                    {dayjs(date || publishedAt).format('MMM DD, YYYY')}
                </p>
                <h1 className={`text-3xl md:text-4xl lg:text-4xl mb-1 mt-6 lg:mt-1`}>{title}</h1>
            </div>
            <div className="my-2 article-content">
                <Markdown>{body}</Markdown>
            </div>
            {CTA?.label && CTA?.url && (
                <CallToAction size="md" type="outline" to={CTA.url}>
                    {CTA.label}
                </CallToAction>
            )}
            {isModerator && (
                <div className="mt-6 flex space-x-2">
                    <button onClick={() => setEditPostModalOpen(true)} className="text-red dark:text-yellow font-bold">
                        Edit post
                    </button>
                    <button onClick={handleDeletePost} className="text-red font-bold">
                        {confirmDelete ? 'Click again to confirm' : 'Delete post'}
                    </button>
                </div>
            )}
        </>
    )
}
