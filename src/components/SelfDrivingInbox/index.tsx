import scoutSkillsData from '../../data/scout-skills.json'
import selfDrivingGuidesJson from '@data/content-self-driving-guides.json'
import skillFilesJson from '@data/content-skill-files.json'
import type { SelfDrivingGuides, SkillFiles } from '~/data-layer/queries/content'

import { InboxTemplate, ScoutSpec } from './types'

interface ScoutSkillsData {
    skills: Record<string, { name: string; description: string; raw: string }> | null
}

/**
 * A guide that names an `appTemplate` shows a scout PostHog already ships, so its file is fetched
 * from the monorepo at build time (`src/data-layer/artifacts.ts`) rather than kept as a second
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
    return templates
}

// The scout is authored as a real SKILL.md beside its index.mdx, so it stays the file format the
// monorepo uses instead of a markdown document flattened into YAML. `raw` is the whole file
// including frontmatter, which is exactly what the page displays – see README.md.
const scoutsByTemplate = new Map((skillFilesJson as SkillFiles).map((skill) => [skill.slug, skill]))

const templates: InboxTemplate[] = (selfDrivingGuidesJson as SelfDrivingGuides)
    .map((guide) => {
        const scoutFile = scoutsByTemplate.get(guide.url)
        return {
            url: guide.url,
            category: guide.category,
            templateTitle: guide.title,
            templateShortTitle: guide.shortTitle,
            templateSubtitle: guide.subtitle,
            report: guide.report,
            premise: guide.premise,
            tldr: guide.tldr,
            watches: guide.watches,
            requires: guide.requires,
            scout: guide.appTemplate
                ? scoutFromAppTemplate(guide.appTemplate, guide.schedule)
                : scoutFile
                  ? {
                        name: scoutFile.name ?? '',
                        description: scoutFile.description ?? '',
                        raw: scoutFile.raw,
                        schedule: guide.schedule,
                    }
                  : undefined,
        }
    })
    // Alphabetical: severity sorted this once, but a rank nobody can see is unpredictable.
    .sort((a, b) => a.report.title.localeCompare(b.report.title))
