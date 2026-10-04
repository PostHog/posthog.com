import { useMemo } from 'react'
import skillFilesJson from '@data/content-skill-files.json'
import type { SkillFiles } from '~/data-layer/queries/content'

import { normalizeUrl } from './bookModel'

export interface SkillFile {
    name?: string
    description?: string
    /** The verbatim SKILL.md, frontmatter included, so the page shows the file and not a copy. */
    raw: string
}

/**
 * Every `SKILL.md` under a pocket guide, keyed by the slug of the page it sits beside – the same
 * pairing self-driving's scouts use (see `SelfDrivingInbox/index.tsx`), decoupled from that
 * product's report/inbox machinery so any guide can show its own skill file as a figure.
 */
export function useSkillFiles(): Map<string, SkillFile> {
    return useMemo(
        () =>
            new Map(
                (skillFilesJson as SkillFiles).map(({ slug, name, description, raw }) => [
                    normalizeUrl(slug),
                    { name, description, raw },
                ])
            ),
        []
    )
}
