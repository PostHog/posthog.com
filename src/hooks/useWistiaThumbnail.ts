import { useState, useEffect } from 'react'

export const useWistiaThumbnail = (mediaId: string) => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!mediaId) {
            setIsLoading(false)
            return
        }

        const fetchThumbnail = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const videoUrl = `https://home.wistia.com/medias/${mediaId}`
                const oembedUrl = `https://fast.wistia.net/oembed?url=${encodeURIComponent(videoUrl)}`

                const response = await fetch(oembedUrl)
                if (!response.ok) {
                    throw new Error(`Failed to fetch thumbnail: ${response.status}`)
                }

                const data = await response.json()
                setThumbnailUrl(data.thumbnail_url || null)
            } catch (err) {
                setError(err as Error)
                console.error('Error fetching Wistia thumbnail:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchThumbnail()
    }, [mediaId])

    return { thumbnailUrl, isLoading, error }
}
