import { IconCheck, IconCopy, IconUpload, IconX } from '@posthog/icons'
import Modal from 'components/Modal'
import uploadImage from 'components/Squeak/util/uploadImage'
import { useUser } from 'hooks/useUser'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const Image = ({ name, previewUrl, provider_metadata: { public_id, resource_type }, ext }) => {
    const [copied, setCopied] = useState(false)
    const mediaURL = `https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}/${resource_type}/upload/${public_id}${ext}`
    const handleClick = () => {
        setCopied(true)
        navigator.clipboard.writeText(mediaURL)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }
    return (
        <li className="flex space-x-2 items-center">
            <div className="overflow-hidden size-16 flex flex-shrink-0 justify-center items-center bg-accent dark:bg-accent-dark rounded-sm border border-border dark:border-dark">
                <img src={resource_type === 'video' ? previewUrl : mediaURL} />
            </div>
            <div className="flex-grow line-clamp-1">
                <p className="m-0 font-bold line-clamp-1">{name}</p>
                <div className="flex space-x-2">
                    <p className="text-sm line-clamp-1 m-0" title={mediaURL}>
                        {mediaURL}
                    </p>
                    <button onClick={handleClick} className="flex-shrink-0 size-5">
                        {copied ? <IconCheck className="text-green" /> : <IconCopy />}
                    </button>
                </div>
            </div>
        </li>
    )
}

export default function MediaUploadModal({ open, setOpen }) {
    const { getJwt, user } = useUser()
    const [loading, setLoading] = useState(0)
    const [images, setImages] = useState([])
    const isModerator = user?.role?.type === 'moderator'

    const onDrop = async (acceptedFiles) => {
        const profileID = user?.profile?.id
        const jwt = await getJwt()
        if (isModerator && profileID && jwt) {
            await Promise.all(
                acceptedFiles.map(async (file) => {
                    setLoading((loadingNumber) => loadingNumber + 1)
                    const uploadedImage = await uploadImage(file, jwt, {
                        field: 'images',
                        id: profileID,
                        type: 'api::profile.profile',
                    })
                    setLoading((loadingNumber) => loadingNumber - 1)
                    setImages((images) => [...images, uploadedImage])
                })
            ).catch((err) => console.error(err))
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return isModerator ? (
        <Modal open={open} setOpen={setOpen}>
            {open && (
                <div className="max-w-6xl w-full mx-auto relative p-5 pt-12">
                    <div className="bg-white dark:bg-dark p-4 rounded-md border border-border dark:border-dark relative grid grid-cols-2 gap-x-6">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-0 top-0 bg-white dark:bg-accent-dark rounded-full p-2 border border-border dark:border-dark translate-x-1/2 -translate-y-1/2"
                        >
                            <IconX className="size-4 opacity-70 hover:opacity-100 click" />
                        </button>
                        <div className="flex flex-col">
                            <h3 className="m-0">Upload media</h3>
                            <p className="m-0 mt-1">
                                Add images or videos to our CDN (Cloudinary) that can be linked in docs or blog posts.
                            </p>
                            <div
                                {...getRootProps()}
                                className={`mt-4 flex-grow w-full rounded-md border border-dashed border-border dark:border-dark ${
                                    isDragActive ? 'bg-accent/70 dark:bg-accent-dark/70' : ''
                                }`}
                            >
                                <p
                                    className={`m-0 flex justify-center items-center font-bold space-x-1 h-full text-lg ${
                                        isDragActive ? '' : 'opacity-70'
                                    }`}
                                >
                                    <IconUpload className="size-7" />
                                    <span>{isDragActive ? 'Drop' : 'Drag'} media</span>
                                </p>
                                <input {...getInputProps()} />
                            </div>
                        </div>
                        <div>
                            <h3>Your uploads</h3>
                            <ul className="list-none m-0 p-0 space-y-2 overflow-auto pr-4 flex-grow max-h-[450px]">
                                {loading > 0 &&
                                    Array.from({ length: loading }).map((_, index) => (
                                        <li
                                            key={index}
                                            className="w-full h-20 bg-accent dark:bg-accent-dark rounded-md animate-pulse mt-2"
                                        />
                                    ))}
                                {images.map((image) => {
                                    return <Image key={image.id} {...image} />
                                })}
                                {user?.profile?.images?.map((image) => {
                                    return <Image key={image.id} {...image} />
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    ) : null
}
