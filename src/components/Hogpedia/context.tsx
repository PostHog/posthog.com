import React, { createContext, useContext } from 'react'
import Slugger from 'github-slugger'

export type HogpediaArticle = {
    /** The article path, for example `/hogpedia/posthog`. */
    slug: string
    /** The file path under `contents/`, for example `hogpedia/posthog.mdx`. */
    filePath?: string
    /** True when a talk page exists, so the discussion tab can be a real link. */
    hasTalkPage: boolean
    /**
     * The article's reference ids, in the order they are listed.
     *
     * A footnote marker shows its 1-based position in this list, not its authored id, so the
     * marker and the numbered list can never disagree – and an id can be a name.
     */
    referenceIds?: string[]
    /**
     * Heading anchor to the page that section's content comes from, so `[edit]` opens the
     * handbook or docs page a correction belongs on. See `buildSectionSources`.
     */
    sectionSources?: Record<string, string>
    /** The article's first first-party source, used where a section cites none of its own. */
    primarySource?: string
}

const HogpediaContext = createContext<HogpediaArticle | null>(null)

export const HogpediaProvider = ({
    value,
    children,
}: {
    value: HogpediaArticle
    children: React.ReactNode
}): JSX.Element => <HogpediaContext.Provider value={value}>{children}</HogpediaContext.Provider>

export const useHogpediaArticle = (): HogpediaArticle | null => useContext(HogpediaContext)

const REPO = 'https://github.com/PostHog/posthog.com'

/**
 * The GitHub URLs behind the `[edit]`, "view source" and "history" controls.
 *
 * Every one of them opens a real page, which is what makes those controls worth having.
 * The URL shape matches the one `components/ReaderView` and `components/DocsPageSurvey`
 * already use for docs and handbook pages.
 */
export const articleSourceUrls = (filePath?: string): { edit: string; source: string; history: string } | null => {
    if (!filePath) {
        return null
    }
    return {
        edit: `${REPO}/edit/master/contents/${filePath}`,
        source: `${REPO}/blob/master/contents/${filePath}`,
        history: `${REPO}/commits/master/contents/${filePath}`,
    }
}

type Reference = { id: string; url: string }

/** Only a posthog.com page is somewhere a reader can actually fix a fact. */
const isFirstParty = (url?: string): boolean => !!url && url.startsWith('/')

/**
 * Maps each section heading to the page its content was taken from.
 *
 * A section already cites its source with `<Ref id="…" />`, so the first first-party
 * reference inside a section is the page a correction belongs on. That is what the
 * `[edit]` link beside the heading opens: editing the Hogpedia article would fix this
 * mirror and leave the handbook saying the old thing.
 *
 * The anchors are produced the same way `SectionHeading` produces them, so they match.
 */
export const buildSectionSources = (rawBody?: string, references?: Reference[]): Record<string, string> => {
    if (!rawBody || !references || references.length === 0) {
        return {}
    }
    const byId = new Map(references.map((reference) => [String(reference.id), reference.url]))
    const slugger = new Slugger()
    const sources: Record<string, string> = {}
    let anchor: string | null = null

    for (const line of rawBody.split('\n')) {
        const heading = /^#{2,4}\s+(.+?)\s*$/.exec(line)
        if (heading) {
            slugger.reset()
            anchor = slugger.slug(heading[1])
            continue
        }
        if (!anchor || sources[anchor]) {
            continue
        }
        const pattern = /<Ref id="([^"]+)"/g
        let match: RegExpExecArray | null
        while ((match = pattern.exec(line)) !== null) {
            const url = byId.get(match[1])
            if (isFirstParty(url)) {
                sources[anchor] = url as string
                break
            }
        }
    }
    return sources
}

/** The article's own source page, for a section that cites nothing of its own. */
export const primarySource = (references?: Reference[]): string | undefined =>
    (references || []).map((reference) => reference.url).find(isFirstParty)
