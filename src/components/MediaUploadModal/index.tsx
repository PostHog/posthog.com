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
import React, { useEffect, useState } from 'react'
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
                <img src={resource_type === 'video' ? previewUrl : generateCloudinaryUrl('orig-optimized')} loading="lazy" />
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
                    className={`flex items-center gap-1 py-1 px-2 rounded hover:bg-accent cursor-pointer ${node.type === 'file' ? 'draggable' : ''
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
    const [images, setImages] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isPasting, setIsPasting] = useState(false)
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
                    setImages((images) => [...images, uploadedImage])
                })
            ).catch((err) => console.error(err))
        }
    }

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Upload media')
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    // Filter images based on search query
    const allImages = [...images, ...((user?.profile as any)?.images || [])]

    const filteredImages = searchQuery
        ? allImages.filter((image) => image.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : allImages

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
                        description: `Pasted ${validFiles.length} image${validFiles.length > 1 ? 's' : ''
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
                                className={`flex-grow rounded-md bg-primary border-2 border-dashed border-input transition-colors ${isDragActive
                                        ? 'bg-input border-primary'
                                        : isPasting
                                            ? 'bg-input border-primary animate-pulse'
                                            : ''
                                    }`}
                            >
                                <div
                                    className={`flex flex-col justify-center items-center h-full p-8 ${isDragActive || isPasting ? '' : 'opacity-50'
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
                        <h3 className="m-0">Your uploads</h3>
                        <p className="text-sm text-secondary mt-1 mb-4">Recent uploads to Cloudinary</p>

                        <div className="relative mb-4">
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
