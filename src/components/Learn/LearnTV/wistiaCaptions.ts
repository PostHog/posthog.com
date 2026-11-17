import { useEffect, useState } from 'react'

/** One caption cue. The transcript shows one line for each cue. */
export interface TranscriptLine {
    id: string
    /** Seconds. */
    start: number
    /** Seconds. */
    end: number
    text: string
}

/** The English WebVTT captions uploaded to a Wistia media. Wistia serves the file with CORS for any origin. */
export const wistiaCaptionsUrl = (mediaId: string): string =>
    `https://fast.wistia.net/embed/captions/${mediaId}.vtt?language=eng`

const toSeconds = (timestamp: string): number => {
    const parts = timestamp.trim().split(':').map(Number)
    return parts.reduce((total, part) => total * 60 + part, 0)
}

/** Parses WebVTT text into cues, by start time. Multi-line cue text joins with spaces, and inline tags are removed. */
export function parseVtt(vtt: string): TranscriptLine[] {
    const lines: TranscriptLine[] = []
    const blocks = vtt.replace(/\r\n?/g, '\n').split(/\n\s*\n/)
    for (const block of blocks) {
        const rows = block.split('\n').filter((row) => row.trim() !== '')
        const timing = rows.findIndex((row) => row.includes('-->'))
        if (timing === -1) continue
        const [start, end] = rows[timing].split('-->').map((part) => toSeconds(part.trim().split(/\s+/)[0]))
        const text = rows
            .slice(timing + 1)
            .join(' ')
            .replace(/<[^>]+>/g, '')
            .trim()
        if (text) lines.push({ id: String(lines.length), start, end, text })
    }
    return lines.sort((a, b) => a.start - b.start)
}

/** Loads the captions of a Wistia media for the transcript. `lines` stays empty while loading or after an error. */
export function useWistiaCaptions(mediaId: string): { lines: TranscriptLine[]; failed: boolean } {
    const [lines, setLines] = useState<TranscriptLine[]>([])
    const [failed, setFailed] = useState(false)
    useEffect(() => {
        let cancelled = false
        setFailed(false)
        fetch(wistiaCaptionsUrl(mediaId))
            .then((response) => {
                if (!response.ok) throw new Error(`Captions request failed: ${response.status}`)
                return response.text()
            })
            .then((text) => !cancelled && setLines(parseVtt(text)))
            .catch(() => !cancelled && setFailed(true))
        return () => {
            cancelled = true
        }
    }, [mediaId])
    return { lines, failed }
}

/** The cues on screen at a time. Overlapping cues can both be active. */
export const activeLineIds = (lines: TranscriptLine[], seconds: number): string[] =>
    lines.filter((line) => seconds >= line.start && seconds < line.end).map((line) => line.id)
