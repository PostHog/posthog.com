import pocketGuidesJson from '@data/content-pocket-guides.json'
import type { PocketGuidePages } from '~/data-layer/queries/content'
import { volumeById } from '../constants/pocketGuides'

/** Numbered guides per volume, with an explicit opt-in for orientation-only volumes. */
export default function usePocketGuideCounts(): Record<string, number> {
    const counts: Record<string, number> = {}
    for (const node of pocketGuidesJson as PocketGuidePages) {
        const [, , volume, guide] = node.slug.split('/')
        // Skip sibling SKILL.md files, `_`-prefixed starters, and untitled drafts.
        if (!volume || guide?.startsWith('_') || !node.title) {
            continue
        }

        const order = node.pocketGuideOrder
        const includeOrientationPages = volumeById(volume)?.countOrientationPages
        const shouldCount = includeOrientationPages
            ? typeof order === 'number' && order >= 0
            : Boolean(guide && typeof order === 'number' && order > 0 && !node.isPrimer)

        if (shouldCount) {
            counts[volume] = (counts[volume] ?? 0) + 1
        }
    }
    return counts
}
