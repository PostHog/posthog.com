import { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

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
    const data = useStaticQuery(graphql`
        query PocketGuideSkillFilesQuery {
            skills: allMdx(filter: { fields: { slug: { regex: "//SKILL$/" } } }) {
                nodes {
                    rawBody
                    fields {
                        slug
                    }
                    frontmatter {
                        name
                        description
                    }
                }
            }
        }
    `)

    return useMemo(() => {
        return new Map(
            (data?.skills?.nodes || []).map((node: any) => [
                normalizeUrl(node.fields.slug.replace(/\/SKILL$/, '')),
                {
                    name: node.frontmatter?.name,
                    description: node.frontmatter?.description,
                    raw: node.rawBody,
                },
            ])
        )
    }, [data])
}
