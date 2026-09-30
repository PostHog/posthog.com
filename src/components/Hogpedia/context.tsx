import React, { createContext, useContext } from 'react'

export type HogpediaArticle = {
    /** The article path, for example `/hogpedia/posthog`. */
    slug: string
    /** The file path under `contents/`, for example `hogpedia/posthog.mdx`. */
    filePath?: string
    /** True when a talk page exists, so the discussion tab can be a real link. */
    hasTalkPage: boolean
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
