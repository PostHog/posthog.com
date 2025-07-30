import { IconCopy, IconUpload } from '@posthog/icons'
import Modal from 'components/Modal'
import uploadImage from 'components/Squeak/util/uploadImage'
import { useApp } from '../../context/App'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useWindow } from '../../context/Window'
import { useToast } from '../../context/Toast'
import Loading from 'components/Loading'

const Image = ({ name, previewUrl, provider_metadata: { public_id, resource_type }, ext, width, height }: any) => {
    const { addToast } = useToast()
    const [loadingSize, setLoadingSize] = useState<string | number | null>(null)

    const cloudinaryBase = `https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}`

    const isImage =
        resource_type === 'image' && ['png', 'jpg', 'jpeg', 'webp'].some((format) => ext.toLowerCase().includes(format))

    const resizeSizes = [200, 500, 800, 1000, 1600, 2000]
    const maxDimension = Math.max(width || 0, height || 0)

    const availableSizes = isImage ? resizeSizes.filter((size) => size < maxDimension) : []

    const generateCloudinaryUrl = (size: string | number) => {
        if (size === 'orig') {
            return `${cloudinaryBase}/${resource_type}/upload/${public_id}${ext}`
        } else if (size === 'orig-optimized') {
            return `${cloudinaryBase}/${resource_type}/upload/q_auto,f_auto/${public_id}${ext}`
        } else {
            const isPortrait = height > width
            const transformation = isPortrait ? `h_${size}` : `w_${size}`
            return `${cloudinaryBase}/${resource_type}/upload/${transformation},c_limit,q_auto,f_auto/${public_id}${ext}`
        }
    }

    const handleCopy = async (size: string | number) => {
        setLoadingSize(size)
        const url = generateCloudinaryUrl(size)

        try {
            await navigator.clipboard.writeText(url)
            const sizeText =
                size === 'orig' ? 'Original' : size === 'orig-optimized' ? 'Original (optimized)' : `${size}px`
            addToast({
                description: `${sizeText} image URL copied to clipboard`,
                duration: 3000,
            })
        } catch (err) {
            console.error('Failed to copy text: ', err)
            addToast({
                description: 'Failed to copy URL',
                error: true,
                duration: 3000,
            })
        }

        setTimeout(() => setLoadingSize(null), 500)
    }

    return (
        <li className="flex space-x-2 items-start">
            <div className="overflow-hidden size-16 flex flex-shrink-0 justify-center items-center bg-accent rounded-sm border border-input">
                <img src={resource_type === 'video' ? previewUrl : generateCloudinaryUrl('orig-optimized')} />
            </div>
            <div className="flex-grow">
                <p className="m-0 font-bold line-clamp-1">
                    {name}
                    {isImage && width && height && (
                        <span className="text-sm text-secondary font-normal ml-1">
                            ({width}x{height})
                        </span>
                    )}
                </p>
                {isImage ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {availableSizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => handleCopy(size)}
                                className="text-xs px-2 py-1 rounded bg-accent hover:bg-opacity-70 transition-colors flex items-center gap-1"
                                disabled={loadingSize === size}
                            >
                                {loadingSize === size ? <Loading className="size-3" /> : `${size}px`}
                            </button>
                        ))}
                        <button
                            onClick={() => handleCopy('orig-optimized')}
                            className="text-xs px-2 py-1 rounded bg-accent hover:bg-opacity-70 transition-colors flex items-center gap-1"
                            disabled={loadingSize === 'orig-optimized'}
                        >
                            {loadingSize === 'orig-optimized' ? <Loading className="size-3" /> : 'orig (optimized)'}
                        </button>
                        <button
                            onClick={() => handleCopy('orig')}
                            className="text-xs px-2 py-1 rounded bg-accent hover:bg-opacity-70 transition-colors flex items-center gap-1"
                            disabled={loadingSize === 'orig'}
                        >
                            {loadingSize === 'orig' ? <Loading className="size-3" /> : 'orig'}
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-2 items-center">
                        <p className="text-sm line-clamp-1 m-0" title={generateCloudinaryUrl('orig')}>
                            {generateCloudinaryUrl('orig')}
                        </p>
                        <button
                            onClick={() => handleCopy('orig')}
                            className="flex-shrink-0 size-5"
                            disabled={loadingSize === 'orig'}
                        >
                            {loadingSize === 'orig' ? <Loading className="size-3" /> : <IconCopy />}
                        </button>
                    </div>
                )}
            </div>
        </li>
    )
}

export default function MediaUploadModal() {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const { getJwt, user } = useUser()
    const [loading, setLoading] = useState(0)
    const [images, setImages] = useState<any[]>([])
    const isModerator = user?.role?.type === 'moderator'

    const onDrop = async (acceptedFiles: File[]) => {
        const profileID = user?.profile?.id
        const jwt = await getJwt()
        if (isModerator && profileID && jwt) {
            await Promise.all(
                acceptedFiles.map(async (file: File) => {
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

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Upload media')
        }
    }, [appWindow])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return isModerator ? (
        <div data-scheme="primary" className="bg-primary size-full">
            <div className="p-4 relative flex flex-col gap-4">
                <div className="flex flex-col">
                    <h2>Upload media</h2>
                    <p className="m-0 mt-1">
                        Add images or videos to our CDN (Cloudinary) that can be linked in docs or blog posts.
                    </p>
                    <div
                        {...getRootProps()}
                        data-scheme="secondary"
                        className={`mt-4 flex-grow w-full rounded-md bg-primary border border-dashed border-input ${
                            isDragActive ? 'bg-input' : ''
                        }`}
                    >
                        <p
                            className={`m-0 flex justify-center items-center font-bold space-x-1 text-sm h-full py-4 ${
                                isDragActive ? '' : 'opacity-70'
                            }`}
                        >
                            <IconUpload className="size-5" />
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
                                <li key={index} className="w-full h-20 bg-accent rounded-md animate-pulse mt-2" />
                            ))}
                        {images.map((image) => {
                            return <Image key={image.id} {...image} />
                        })}
                        {user?.profile?.images?.map((image: any) => {
                            return <Image key={image.id} {...image} />
                        })}
                    </ul>
                </div>
            </div>
        </div>
    ) : null
}
