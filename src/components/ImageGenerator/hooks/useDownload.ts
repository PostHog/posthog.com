import { useCallback, useState } from 'react'
import { toJpeg } from 'html-to-image'
import type { GeneratorState } from '../types'
import { CANVAS_DIMENSIONS } from '../templates'

function slugify(input: string): string {
    return (
        input
            .toLowerCase()
            .replace(/<[^>]+>/g, ' ')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 60) || 'untitled'
    )
}

export function useDownload() {
    const [downloaded, setDownloaded] = useState(false)
    const [downloading, setDownloading] = useState(false)

    const download = useCallback(
        async (node: HTMLElement | null, state: GeneratorState) => {
            if (!node || downloading) return
            setDownloading(true)
            try {
                const { width, height } = CANVAS_DIMENSIONS[state.aspect]
                const dataURL = await toJpeg(node, {
                    quality: 1,
                    canvasWidth: width,
                    canvasHeight: height,
                    pixelRatio: 1,
                    skipFonts: true,
                })
                const link = document.createElement('a')
                link.download = `${state.template}-${state.aspect}-${slugify(state.title.content)}.jpeg`
                link.href = dataURL
                link.click()
                link.remove()
                setDownloaded(true)
                setTimeout(() => setDownloaded(false), 3000)
            } finally {
                setDownloading(false)
            }
        },
        [downloading]
    )

    return { download, downloaded, downloading }
}
