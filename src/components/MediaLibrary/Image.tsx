import { IconCopy, IconSpinner } from '@posthog/icons'
import { useToast } from '../../context/Toast'
import React, { useEffect, useState } from 'react'
import CreatableMultiSelect from 'components/CreatableMultiSelect'
import { useUser } from 'hooks/useUser'
import Link from 'components/Link'

const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}`

export default function Image({
    name,
    previewUrl,
    provider_metadata,
    ext,
    width,
    height,
    allTags,
    fetchTags,
    id,
    profiles = [],
    ...other
}: any) {
    const { public_id, resource_type } = provider_metadata || {}
    const { addToast } = useToast()
    const { getJwt, fetchUser } = useUser()
    const [loadingSize, setLoadingSize] = useState<string | number | null>(null)
    const [tags, setTags] = useState<any[]>(other.tags || [])
    const [availableOptions, setAvailableOptions] = useState<any[]>(allTags)
    const [uploader] = profiles

    useEffect(() => {
        setAvailableOptions(allTags)
    }, [allTags])

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

    const addTagToMedia = async (tagId: any, jwt: string) => {
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-tags/add-media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
            body: JSON.stringify({ mediaId: id, tagId }),
        })
        await fetchUser()
    }

    const removeTagFromMedia = async (tagId: any, jwt: string) => {
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-tags/remove-media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
            body: JSON.stringify({ mediaId: id, tagId }),
        })
        await fetchUser()
    }

    const handleChangeTags = async (tagIds: any[]) => {
        const oldTagIds = tags.map((tag) => tag.id)
        const addedTagIds = tagIds.filter((id) => !oldTagIds.includes(id))
        const removedTagIds = oldTagIds.filter((id) => !tagIds.includes(id))

        const newTags = tagIds.map((tagId) => availableOptions.find((t) => t.id === tagId)).filter(Boolean)
        setTags(newTags)

        const jwt = await getJwt()
        if (!jwt) return

        for (const tagId of addedTagIds) {
            try {
                await addTagToMedia(tagId, jwt)
                addToast({ description: 'Tag added', duration: 3000 })
            } catch (error) {
                console.error('Failed to add tag:', error)
                addToast({ description: 'Failed to add tag', error: true, duration: 3000 })
            }
        }

        for (const tagId of removedTagIds) {
            try {
                await removeTagFromMedia(tagId, jwt)
                addToast({ description: 'Tag removed', duration: 3000 })
            } catch (error) {
                console.error('Failed to remove tag:', error)
                addToast({ description: 'Failed to remove tag', error: true, duration: 3000 })
            }
        }
    }

    const handleCreateTag = async (label: string) => {
        try {
            const jwt = await getJwt()
            if (!jwt) return

            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-tags`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
                body: JSON.stringify({ data: { label } }),
            })

            if (response.ok) {
                const { data } = await response.json()

                setAvailableOptions((prev) => [...prev, data])

                setTags((prev) => [...prev, data])

                await addTagToMedia(data.id, jwt)

                fetchTags()
            }
        } catch (error) {
            console.error('Failed to create tag:', error)
            addToast({ description: 'Failed to create tag', error: true, duration: 3000 })
        }
    }

    return (
        <li className="flex space-x-2 items-start">
            <div
                className={`overflow-hidden flex flex-shrink-0 justify-center items-center bg-accent rounded-sm border border-input ${
                    uploader ? 'size-[115px]' : 'size-[96px]'
                }`}
            >
                <img
                    src={resource_type === 'video' ? previewUrl : generateCloudinaryUrl('orig-optimized')}
                    loading="lazy"
                />
            </div>
            <div className="flex-grow">
                <p className="m-0 font-bold line-clamp-1 text-ellipsis max-w-xl leading-none">
                    {name}
                    {isImage && width && height && (
                        <span className="text-sm text-secondary font-normal ml-1">
                            ({width}x{height})
                        </span>
                    )}
                </p>
                {isImage ? (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                        {availableSizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => handleCopy(size)}
                                className="text-xs px-2 py-1 rounded bg-accent hover:bg-opacity-70 transition-colors flex items-center gap-1"
                                disabled={loadingSize === size}
                            >
                                {loadingSize === size ? <IconSpinner className="size-3 animate-spin" /> : `${size}px`}
                            </button>
                        ))}
                        <button
                            onClick={() => handleCopy('orig-optimized')}
                            className="text-xs px-2 py-1 rounded bg-accent hover:bg-opacity-70 transition-colors flex items-center gap-1"
                            disabled={loadingSize === 'orig-optimized'}
                        >
                            {loadingSize === 'orig-optimized' ? (
                                <IconSpinner className="size-3 animate-spin" />
                            ) : (
                                'orig (optimized)'
                            )}
                        </button>
                        <button
                            onClick={() => handleCopy('orig')}
                            className="text-xs px-2 py-1 rounded bg-accent hover:bg-opacity-70 transition-colors flex items-center gap-1"
                            disabled={loadingSize === 'orig'}
                        >
                            {loadingSize === 'orig' ? <IconSpinner className="size-3 animate-spin" /> : 'orig'}
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
                            {loadingSize === 'orig' ? <IconSpinner className="size-3 animate-spin" /> : <IconCopy />}
                        </button>
                    </div>
                )}
                <div className="mt-2">
                    <CreatableMultiSelect
                        label="Add a tag..."
                        placeholder="Search tags..."
                        options={availableOptions.map((tag) => ({ label: tag.attributes.label, value: tag.id }))}
                        value={tags.map((tag) => tag.id)}
                        allowCreate
                        onChange={handleChangeTags}
                        onCreate={handleCreateTag}
                        hideLabel
                    />
                </div>
                {uploader && (
                    <p className="text-xs text-secondary m-0 mt-1">
                        Uploaded by{' '}
                        <Link
                            className="text-red dark:text-yellow font-semibold"
                            to={`/community/profiles/${uploader.id}`}
                            state={{ newWindow: true }}
                        >
                            {[uploader.firstName, uploader.lastName].filter(Boolean).join(' ')}
                        </Link>
                    </p>
                )}
            </div>
        </li>
    )
}
