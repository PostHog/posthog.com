import { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import scoutSkillsData from '../../data/scout-skills.json'

import { InboxTemplate, ScoutSpec, UNCATEGORIZED } from './types'

interface ScoutSkillsData {
    skills: Record<string, { name: string; description: string; raw: string }> | null
}

/**
 * A guide that names an `appTemplate` shows a scout PostHog already ships, so its file is fetched
 * from the monorepo at build time (`gatsby/utils/fetchScoutSkills.ts`) rather than kept as a second
 * copy here. Guides with their own scout keep using their sibling `SKILL.md`.
 *
 * Returns undefined when the fetch failed, which leaves the scout figure unrendered rather than
 * showing a scout that may no longer match what the app creates.
 */
function scoutFromAppTemplate(appTemplate: string, schedule?: string): ScoutSpec | undefined {
    const skill = (scoutSkillsData as ScoutSkillsData).skills?.[appTemplate]
    if (!skill) {
        return undefined
    }
    return { name: skill.name, description: skill.description, raw: skill.raw, schedule, appTemplate }
}

export function useSelfDrivingTemplates(): InboxTemplate[] {
    const data = useStaticQuery(graphql`
        query SelfDrivingInboxQuery {
            guides: allMdx(filter: { fields: { slug: { regex: "/^/pocket-guides/self-driving//" } } }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        shortTitle
                        subtitle
                        filters {
                            type
                        }
                        premise
                        tldr
                        watches {
                            name
                            detail
                        }
                        requires {
                            label
                            level
                        }
                        category
                        schedule
                        appTemplate
                        report {
                            title
                            source
                            receivedAgo
                            body
                            suggestedAction
                            actionNote
                            affected
                        }
                    }
                }
            }
            # The scout is authored as a real SKILL.md beside its index.mdx, so it stays the file
            # format the monorepo uses instead of a markdown document flattened into YAML.
            # rawBody is the whole file including frontmatter, which is exactly what the page
            # displays – see components/SelfDrivingInbox/README.md.
            scouts: allMdx(filter: { fields: { slug: { regex: "//SKILL$/" } } }) {
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
        const nodes = data?.guides?.nodes || []

        // Keyed by the guide slug that owns each scout: /pocket-guides/x/SKILL -> /pocket-guides/x
        const scoutsByTemplate = new Map<string, any>(
            (data?.scouts?.nodes || []).map((node: any) => [node.fields.slug.replace(/\/SKILL$/, ''), node])
        )

        return (
            nodes
                .filter((node: any) => {
                    const types = node.frontmatter?.filters?.type || []
                    // `_`-prefixed directories are starter files to copy, not templates to browse.
                    if (/\/_/.test(node.fields.slug)) {
                        return false
                    }
                    // A template without a report can't appear in an inbox – it has nothing to show.
                    return (
                        types.some((t: string) => t?.toLowerCase() === 'self-driving') &&
                        node.frontmatter?.report?.title
                    )
                })
                .map((node: any) => {
                    const scoutNode = scoutsByTemplate.get(node.fields.slug)
                    return {
                        url: node.fields.slug,
                        category: node.frontmatter.category || UNCATEGORIZED,
                        templateTitle: node.frontmatter.title,
                        templateShortTitle: node.frontmatter.shortTitle,
                        templateSubtitle: node.frontmatter.subtitle,
                        report: node.frontmatter.report,
                        premise: node.frontmatter.premise,
                        tldr: node.frontmatter.tldr,
                        watches: node.frontmatter.watches,
                        requires: node.frontmatter.requires,
                        scout: node.frontmatter.appTemplate
                            ? scoutFromAppTemplate(node.frontmatter.appTemplate, node.frontmatter.schedule)
                            : scoutNode
                            ? {
                                  name: scoutNode.frontmatter?.name,
                                  description: scoutNode.frontmatter?.description,
                                  raw: scoutNode.rawBody,
                                  schedule: node.frontmatter.schedule,
                              }
                            : undefined,
                    }
                })
                // Alphabetical: severity sorted this once, but a rank nobody can see is unpredictable.
                .sort((a: InboxTemplate, b: InboxTemplate) => a.report.title.localeCompare(b.report.title))
        )
    }, [data])
}
