import {
    IconCopy,
    IconUpload,
    IconFolder,
    IconDocument,
    IconChevronRight,
    IconChevronDown,
    IconX,
} from '@posthog/icons'
import Modal from 'components/Modal'
import uploadImage from 'components/Squeak/util/uploadImage'
import { useApp } from '../../context/App'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useWindow } from '../../context/Window'
import { useToast } from '../../context/Toast'
import Loading from 'components/Loading'
import ScrollArea from 'components/RadixUI/ScrollArea'

// File System Access API types
declare global {
    interface Window {
        showDirectoryPicker(): Promise<FileSystemDirectoryHandle>
    }

    interface FileSystemDirectoryHandle {
        values(): AsyncIterableIterator<FileSystemHandle>
    }
}

const Image = ({
    name,
    previewUrl,
    provider_metadata: { public_id, resource_type },
    ext,
    width,
    height,
    tags: initialTags = [],
}: any) => {
    const { addToast } = useToast()
    const { getJwt } = useUser()
    const [loadingSize, setLoadingSize] = useState<string | number | null>(null)
    const [library, setLibrary] = useState<string>('Uncategorized')
    const [tags, setTags] = useState<string>(Array.isArray(initialTags) ? initialTags.join(', ') : '')
    const [savingMetadata, setSavingMetadata] = useState(false)
    const [metadataLoaded, setMetadataLoaded] = useState(false)

    const cloudinaryBase = `https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}`

    const isImage =
        resource_type === 'image' && ['png', 'jpg', 'jpeg', 'webp'].some((format) => ext.toLowerCase().includes(format))

    const resizeSizes = [200, 500, 800, 1000, 1600, 2000]
    const maxDimension = Math.max(width || 0, height || 0)

    const availableSizes = isImage ? resizeSizes.filter((size) => size < maxDimension) : []

    const libraryOptions = ['Uncategorized', 'Creative library', 'Docs/handbook screenshots', 'Post images']

    // Load metadata when component mounts
    useEffect(() => {
        const loadMetadata = async () => {
            try {
                const jwt = await getJwt()
                const response = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/cloudinary-metadata/metadata?publicId=${public_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    setLibrary(data.library || 'Uncategorized')
                    setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '')
                    setMetadataLoaded(true)
                }
            } catch (err) {
                console.error('Failed to load metadata:', err)
            }
        }

        loadMetadata()
    }, [public_id])

    const handleSaveMetadata = async () => {
        setSavingMetadata(true)
        try {
            const jwt = await getJwt()
            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/cloudinary-metadata/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    publicId: public_id,
                    library,
                    tags: tags
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean),
                }),
            })

            if (response.ok) {
                addToast({
                    description: 'Metadata saved successfully',
                    duration: 3000,
                })
            } else {
                throw new Error('Failed to save metadata')
            }
        } catch (err) {
            console.error('Failed to save metadata:', err)
            addToast({
                description: 'Failed to save metadata',
                error: true,
                duration: 3000,
            })
        } finally {
            setSavingMetadata(false)
        }
    }

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

                {/* Metadata fields */}
                <div className="mt-3 space-y-2 pt-2 border-t border-input">
                    <div className="flex gap-2 items-end">
                        <div className="flex-grow">
                            <label className="text-xs text-secondary mb-1 block">Library</label>
                            <select
                                value={library}
                                onChange={(e) => setLibrary(e.target.value)}
                                className="text-xs w-full rounded"
                            >
                                {libraryOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-secondary mb-1 block">Tags (comma-separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="tag1, tag2, tag3"
                            className="text-xs w-full rounded"
                        />
                    </div>
                    <button
                        onClick={handleSaveMetadata}
                        disabled={savingMetadata}
                        className="text-xs px-3 py-1.5 rounded bg-orange text-white hover:bg-opacity-90 transition-colors disabled:opacity-50 w-full flex items-center justify-center gap-1"
                    >
                        {savingMetadata ? (
                            <>
                                <Loading className="size-3" />
                                Saving...
                            </>
                        ) : (
                            'Save metadata'
                        )}
                    </button>
                </div>
            </div>
        </li>
    )
}

interface FileNode {
    name: string
    type: 'file' | 'directory'
    handle: FileSystemHandle
    children?: FileNode[]
    expanded?: boolean
    lastModified?: number
}

const FileExplorer = ({ onFileDrop }: { onFileDrop: (files: File[]) => void }) => {
    const [rootDirectory, setRootDirectory] = useState<FileNode | null>(null)
    const [loading, setLoading] = useState(false)
    const { addToast } = useToast()

    const openDirectory = async () => {
        try {
            const dirHandle = await window.showDirectoryPicker()
            const rootNode: FileNode = {
                name: dirHandle.name,
                type: 'directory',
                handle: dirHandle,
                expanded: true,
            }
            await loadDirectoryContents(rootNode)
            setRootDirectory(rootNode)
        } catch (err) {
            console.error('Error opening directory:', err)
        }
    }

    const loadDirectoryContents = async (node: FileNode) => {
        if (node.type !== 'directory') return

        const dirHandle = node.handle as FileSystemDirectoryHandle
        const children: FileNode[] = []

        for await (const entry of dirHandle.values()) {
            const fileNode: FileNode = {
                name: entry.name,
                type: entry.kind as 'file' | 'directory',
                handle: entry,
                expanded: false,
            }

            // Get last modified time for files
            if (entry.kind === 'file') {
                try {
                    const fileHandle = entry as FileSystemFileHandle
                    const file = await fileHandle.getFile()
                    fileNode.lastModified = file.lastModified
                } catch (err) {
                    console.error('Error getting file info:', err)
                }
            }

            children.push(fileNode)
        }

        // Sort: directories first, then by most recent modification date for files
        node.children = children.sort((a, b) => {
            if (a.type !== b.type) return a.type === 'directory' ? -1 : 1

            // For files, sort by most recent first
            if (a.type === 'file' && b.type === 'file') {
                const aTime = a.lastModified || 0
                const bTime = b.lastModified || 0
                return bTime - aTime // Descending order (most recent first)
            }

            // For directories, keep alphabetical
            return a.name.localeCompare(b.name)
        })
    }

    const toggleDirectory = async (node: FileNode) => {
        if (node.type !== 'directory') return

        if (!node.expanded && !node.children) {
            await loadDirectoryContents(node)
        }

        node.expanded = !node.expanded
        setRootDirectory({ ...rootDirectory! })
    }

    const handleFileDrag = async (e: React.DragEvent, node: FileNode) => {
        if (node.type !== 'file') return

        const fileHandle = node.handle as FileSystemFileHandle
        const file = await fileHandle.getFile()

        // Create a DataTransfer object
        const dt = new DataTransfer()
        dt.items.add(file)
        e.dataTransfer = dt
        e.dataTransfer.effectAllowed = 'copy'
    }

    const handleFileClick = async (node: FileNode) => {
        if (node.type !== 'file') return

        const supportedFormats = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'mp4', 'mov']
        const extension = node.name.split('.').pop()?.toLowerCase()

        if (!extension || !supportedFormats.includes(extension)) {
            addToast({
                description: 'Unsupported file format',
                error: true,
                duration: 3000,
            })
            return
        }

        setLoading(true)
        try {
            const fileHandle = node.handle as FileSystemFileHandle
            const file = await fileHandle.getFile()
            onFileDrop([file])
        } catch (err) {
            console.error('Error uploading file:', err)
            addToast({
                description: 'Failed to upload file',
                error: true,
                duration: 3000,
            })
        } finally {
            setLoading(false)
        }
    }

    const renderNode = (node: FileNode, level = 0) => {
        const isImage =
            node.type === 'file' &&
            ['png', 'jpg', 'jpeg', 'webp', 'gif'].some((ext) => node.name.toLowerCase().endsWith(`.${ext}`))

        // Format the last modified date
        const formatDate = (timestamp?: number) => {
            if (!timestamp) return ''
            const date = new Date(timestamp)
            const now = new Date()
            const diffMs = now.getTime() - date.getTime()
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

            if (diffHours < 1) {
                const diffMins = Math.floor(diffMs / (1000 * 60))
                return `${diffMins}m ago`
            } else if (diffHours < 24) {
                return `${diffHours}h ago`
            } else if (diffHours < 168) {
                // 7 days
                const diffDays = Math.floor(diffHours / 24)
                return `${diffDays}d ago`
            } else {
                return date.toLocaleDateString()
            }
        }

        return (
            <div key={node.name} style={{ paddingLeft: `${level * 16}px` }}>
                <div
                    className={`flex items-center gap-1 py-1 px-2 rounded hover:bg-accent cursor-pointer ${
                        node.type === 'file' ? 'draggable' : ''
                    }`}
                    onClick={() => (node.type === 'directory' ? toggleDirectory(node) : handleFileClick(node))}
                    draggable={node.type === 'file'}
                    onDragStart={(e) => handleFileDrag(e, node)}
                >
                    {node.type === 'directory' ? (
                        <>
                            {node.expanded ? (
                                <IconChevronDown className="size-3" />
                            ) : (
                                <IconChevronRight className="size-3" />
                            )}
                            <IconFolder className="size-4" />
                        </>
                    ) : (
                        <div className="ml-4">
                            <IconDocument className="size-4" />
                        </div>
                    )}
                    <span className={`text-sm flex-grow ${isImage ? 'font-medium' : ''}`}>{node.name}</span>
                    {node.type === 'file' && node.lastModified && (
                        <span className="text-xs text-secondary ml-2">{formatDate(node.lastModified)}</span>
                    )}
                    {loading && <Loading className="size-3 ml-2" />}
                </div>
                {node.type === 'directory' && node.expanded && node.children && (
                    <div>{node.children.map((child) => renderNode(child, level + 1))}</div>
                )}
            </div>
        )
    }

    return (
        <div className="border border-input rounded-md p-4 h-[200px] overflow-auto">
            {!rootDirectory ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-sm text-secondary mb-1">Select a folder to browse local files</p>
                    <p className="text-xs text-muted mb-4">(Only works in supported browsers)</p>
                    <button
                        onClick={openDirectory}
                        className="px-4 py-2 bg-accent rounded hover:bg-opacity-70 transition-colors text-sm"
                    >
                        Open folder
                    </button>
                </div>
            ) : (
                <div>
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-input">
                        <span className="text-sm font-medium">{rootDirectory.name}</span>
                        <button
                            onClick={openDirectory}
                            className="text-xs px-2 py-1 bg-accent rounded hover:bg-opacity-70"
                        >
                            Change folder
                        </button>
                    </div>
                    {renderNode(rootDirectory)}
                </div>
            )}
        </div>
    )
}

export default function MediaUploadModal() {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const { getJwt, user } = useUser()
    const [loading, setLoading] = useState(0)
    const [userImages, setUserImages] = useState<any[]>([])
    const [allImages, setAllImages] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isPasting, setIsPasting] = useState(false)
    const [showAllUploads, setShowAllUploads] = useState(false)
    const [selectedTag, setSelectedTag] = useState<string>('')
    const [availableTags, setAvailableTags] = useState<string[]>([])
    const { addToast } = useToast()
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
                    setUserImages((userImages) => [...userImages, uploadedImage])
                })
            ).catch((err) => console.error(err))
        }
    }

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Upload media')
        }
    }, [])

    // Fetch all images when showAllUploads is enabled
    useEffect(() => {
        const fetchAllImages = async () => {
            if (!showAllUploads) {
                setAllImages([])
                return
            }

            try {
                const jwt = await getJwt()
                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/cloudinary-metadata/images`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setAllImages(data)
                }
            } catch (err) {
                console.error('Failed to fetch all images:', err)
                addToast({
                    description: 'Failed to load all uploads',
                    error: true,
                    duration: 3000,
                })
            }
        }

        fetchAllImages()
    }, [showAllUploads])

    // Fetch available tags
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const jwt = await getJwt()
                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/cloudinary-metadata/tags`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setAvailableTags(data.tags || [])
                }
            } catch (err) {
                console.error('Failed to fetch tags:', err)
            }
        }

        fetchTags()
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    // Filter images based on search query and tag
    const displayImages = showAllUploads ? allImages : [...userImages, ...((user?.profile as any)?.images || [])]

    const filteredImages = useMemo(() => {
        return displayImages.filter(
            (image) =>
                (!searchQuery || image.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (!selectedTag || image.tags.includes(selectedTag))
        )
    }, [displayImages, searchQuery, selectedTag])

    // Handle ESC key to clear search and paste events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSearchQuery('')
            }
        }

        const handlePaste = async (e: ClipboardEvent) => {
            const items = e.clipboardData?.items
            if (!items) return

            const imageItems = Array.from(items).filter((item) => item.type.startsWith('image/'))
            if (imageItems.length === 0) return

            e.preventDefault()
            setIsPasting(true)

            try {
                const files = await Promise.all(
                    imageItems.map(async (item) => {
                        const blob = item.getAsFile()
                        if (!blob) return null

                        // Create a proper filename with extension
                        const extension = blob.type.split('/')[1] || 'png'
                        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
                        const fileName = `pasted-image-${timestamp}.${extension}`

                        // Create a new File object with the proper name
                        return new File([blob], fileName, { type: blob.type })
                    })
                )

                const validFiles = files.filter((f): f is File => f !== null)
                if (validFiles.length > 0) {
                    await onDrop(validFiles)
                    addToast({
                        description: `Pasted ${validFiles.length} image${
                            validFiles.length > 1 ? 's' : ''
                        } from clipboard`,
                        duration: 3000,
                    })
                }
            } catch (err) {
                console.error('Error pasting image:', err)
                addToast({
                    description: 'Failed to paste image from clipboard',
                    error: true,
                    duration: 3000,
                })
            } finally {
                setIsPasting(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('paste', handlePaste)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('paste', handlePaste)
        }
    }, [onDrop, addToast])

    return isModerator ? (
        <ScrollArea className="w-full">
            <div data-scheme="primary" className="bg-primary text-primary size-full">
                <div className="p-4 relative space-y-4 w-full">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <h3 className="m-0">Local files</h3>
                            <p className="text-sm text-secondary mt-1 mb-4">Click a filename to upload instantly</p>
                            <FileExplorer onFileDrop={onDrop} />
                        </div>

                        <div className="flex flex-col">
                            <h3 className="m-0">Upload media</h3>
                            <p className="text-sm text-secondary mt-1 mb-4">Drag files here or paste from clipboard</p>
                            <div
                                {...getRootProps()}
                                data-scheme="secondary"
                                className={`flex-grow rounded-md bg-primary border-2 border-dashed border-input transition-colors ${
                                    isDragActive
                                        ? 'bg-input border-primary'
                                        : isPasting
                                        ? 'bg-input border-primary animate-pulse'
                                        : ''
                                }`}
                            >
                                <div
                                    className={`flex flex-col justify-center items-center h-full p-8 ${
                                        isDragActive || isPasting ? '' : 'opacity-50'
                                    }`}
                                >
                                    {isPasting ? (
                                        <Loading className="size-12 mb-4" />
                                    ) : (
                                        <IconUpload className="size-12 mb-4" />
                                    )}
                                    <p className="text-center font-medium m-0">
                                        {isPasting
                                            ? 'Pasting image...'
                                            : isDragActive
                                            ? 'Drop files here'
                                            : 'Drop files or paste to upload'}
                                    </p>
                                    <p className="text-sm text-secondary text-center mt-2 m-0">
                                        {isPasting
                                            ? 'Processing clipboard image...'
                                            : 'PNG, JPG, WEBP, GIF, MP4, MOV, PDF, SVG'}
                                    </p>
                                    <p className="text-xs text-muted text-center mt-2 m-0">
                                        Cmd+V / Ctrl+V to paste from clipboard
                                    </p>
                                </div>
                                <input {...getInputProps()} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h3 className="m-0">{showAllUploads ? 'All uploads' : 'Your uploads'}</h3>
                                <p className="text-sm text-secondary mt-1">Recent uploads to Cloudinary</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowAllUploads(false)}
                                    className={`text-sm px-3 py-1.5 rounded transition-colors ${
                                        !showAllUploads ? 'bg-orange text-white' : 'bg-accent hover:bg-opacity-70'
                                    }`}
                                >
                                    My uploads
                                </button>
                                <button
                                    onClick={() => setShowAllUploads(true)}
                                    className={`text-sm px-3 py-1.5 rounded transition-colors ${
                                        showAllUploads ? 'bg-orange text-white' : 'bg-accent hover:bg-opacity-70'
                                    }`}
                                >
                                    All uploads
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    className="w-full pr-8 rounded"
                                    placeholder="Search filenames..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                                        aria-label="Clear search"
                                    >
                                        <IconX className="size-4" />
                                    </button>
                                )}
                            </div>

                            <div className="relative">
                                <select
                                    value={selectedTag}
                                    onChange={(e) => setSelectedTag(e.target.value)}
                                    className="rounded pr-8 min-w-[150px]"
                                >
                                    <option value="">All tags</option>
                                    {availableTags.map((tag) => (
                                        <option key={tag} value={tag}>
                                            {tag}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex-grow border border-input rounded-md p-4 overflow-auto">
                            <ul className="list-none m-0 p-0 space-y-2">
                                {loading > 0 &&
                                    Array.from({ length: loading }).map((_, index) => (
                                        <li
                                            key={index}
                                            className="w-full h-20 bg-accent rounded-md animate-pulse mt-2"
                                        />
                                    ))}
                                {filteredImages.map((image) => {
                                    return <Image key={image.id} {...image} />
                                })}
                                {filteredImages.length === 0 && !loading && searchQuery && (
                                    <li className="text-center text-secondary py-4">
                                        No files matching "{searchQuery}"
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    ) : null
}
