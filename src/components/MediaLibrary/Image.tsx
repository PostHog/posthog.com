import { IconCopy } from '@posthog/icons'
import Loading from 'components/Loading'
import { useToast } from '../../context/Toast'
import React, { useState } from 'react'
import CreatableMultiSelect from 'components/CreatableMultiSelect'
import { useUser } from 'hooks/useUser'

const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}`

export default function Image({
    name,
    previewUrl,
    provider_metadata: { public_id, resource_type },
    ext,
    width,
    height,
    allTags,
    id,
    ...other
}: any) {
    const { addToast } = useToast()
    const { getJwt } = useUser()
    const [loadingSize, setLoadingSize] = useState<string | number | null>(null)
    const [tags, setTags] = useState<any[]>(other.tags || [])

    const isImage =
        resource_type === 'image' && ['png', 'jpg', 'jpeg', 'webp'].some((format) => ext.toLowerCase().includes(format))

    const resizeSizes = [200, 500, 800, 1000, 1600, 2000]
    const maxDimension = Math.max(width || 0, height || 0)

    const availableSizes = isImage ? resizeSizes.filter((size) => size < maxDimension) : []

    const generateCloudinaryUrl = (size: string | number) => {
        if (size === 'orig') {
            return `${CLOUDINARY_BASE}/${resource_type}/upload/${public_id}${ext}`
        } else if (size === 'orig-optimized') {
            return `${CLOUDINARY_BASE}/${resource_type}/upload/q_auto,f_auto/${public_id}${ext}`
        } else {
            const isPortrait = height > width
            const transformation = isPortrait ? `h_${size}` : `w_${size}`
            return `${CLOUDINARY_BASE}/${resource_type}/upload/${transformation},c_limit,q_auto,f_auto/${public_id}${ext}`
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

    const handleAddTag = async (tagId: any) => {
        const existingTag = allTags.find((t) => t.id === tagId)
        if (existingTag) {
            try {
                const jwt = await getJwt()
                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-tags/add-media`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                        mediaId: id,
                        tagId: tagId,
                    }),
                })
                if (response.ok) {
                    addToast({
                        description: 'Tag added',
                        duration: 3000,
                    })
                } else {
                    throw new Error('Failed to add tag')
                }
            } catch (error) {
                console.error('Failed to add tag:', error)
                addToast({
                    description: 'Failed to add tag',
                    error: true,
                    duration: 3000,
                })
            }
        }
    }

    const handleRemoveTag = async (tagId: any) => {
        try {
            const jwt = await getJwt()
            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-tags/remove-media`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    mediaId: id,
                    tagId: tagId,
                }),
            })
            if (response.ok) {
                addToast({
                    description: 'Tag removed',
                    duration: 3000,
                })
            } else {
                throw new Error('Failed to remove tag')
            }
        } catch (error) {
            console.error('Failed to remove tag:', error)
            addToast({
                description: 'Failed to remove tag',
                error: true,
                duration: 3000,
            })
        }
    }

    const handleChangeTags = (tags: any[]) => {
        const newTags = tags.map((tag) => allTags.find((t) => t.id === tag))
        setTags(newTags)
    }

    return (
        <li className="flex space-x-2 items-start">
            <div className="overflow-hidden size-16 flex flex-shrink-0 justify-center items-center bg-accent rounded-sm border border-input">
                <img
                    src={resource_type === 'video' ? previewUrl : generateCloudinaryUrl('orig-optimized')}
                    loading="lazy"
                />
            </div>
            <div className="flex-grow">
                <p className="m-0 font-bold line-clamp-1 text-ellipsis max-w-xl">
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
                        <p
                            className="text-sm line-clamp-1 m-0 text-ellipsis max-w-sm"
                            title={generateCloudinaryUrl('orig')}
                        >
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
                {allTags.length > 0 && (
                    <div className="mt-2">
                        <CreatableMultiSelect
                            label="Add a tag..."
                            options={allTags.map((tag) => ({ label: tag.attributes.label, value: tag.id }))}
                            value={tags?.map((tag) => tag.id) ?? []}
                            allowCreate={false}
                            onChange={handleChangeTags}
                            onAdd={handleAddTag}
                            onRemove={handleRemoveTag}
                            hideLabel
                        />
                    </div>
                )}
            </div>
        </li>
    )
}
