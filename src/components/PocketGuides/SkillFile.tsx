import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import ScoutFile from 'components/SelfDrivingInbox/ScoutFile'

import { useEntry } from './bookContext'
import { SkillNode, skillsByOwner } from './skillFiles'

/**
 * `<SkillFile />` – the SKILL.md authored beside this page's index.mdx, clipped with a copy button
 * and a "Show full example" toggle.
 *
 * Renders through `ScoutFile`, which is the shared view for "here is a file, take it with you" –
 * a scout and a skill are the same artifact to a reader, so they get the same treatment. The
 * self-driving pages reach theirs through the scout template pipeline, which only matches that
 * volume; this resolves the sibling by slug, so any page in any volume can ship one.
 */
export default function SkillFile(): JSX.Element | null {
    const data = useStaticQuery(graphql`
        query PocketGuideSkillFiles {
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

    const url = useEntry()?.entry?.url
    const skill = url ? skillsByOwner(data?.skills?.nodes as SkillNode[]).get(url.replace(/\/$/, '')) : undefined
    if (!skill?.rawBody) {
        return null
    }

    return (
        <ScoutFile
            scout={{
                name: skill.frontmatter?.name || 'SKILL',
                description: skill.frontmatter?.description || '',
                raw: skill.rawBody,
            }}
        />
    )
}
